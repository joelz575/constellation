import { EventEmitter, once } from "events";
import { v4 as uuidv4 } from "uuid";
import Semaphore from "@chriscdn/promise-semaphore";
import initOrbite from "./orbitdb";
import initSFIP from "./ipfs";
import { Signature } from "./nuée";
import OrbitDB, {
  Store,
  FeedStore,
  KeyValueStore,
  isValidAddress,
  élémentFeedStore,
} from "orbit-db";
import AccessController from "orbit-db-access-controllers/src/access-controller-interface";
import uint8ArrayConcat from "uint8arrays/concat";

import Compte from "./compte";
import BDs from "./bds";
import Tableaux from "./tableaux";
import Variables from "./variables";
import Réseau from "./réseau";
import Favoris from "./favoris";
import Projets from "./projets";
import MotsClefs from "./motsClefs";
import Nuée from "./nuée";

import { itérateurÀFlux } from "./utils";
import ContrôleurConstellation, {
  OptionsContrôleurConstellation,
  objRôles,
  nomType as nomTypeContrôleurConstellation,
} from "./accès/contrôleurConstellation";
import { MEMBRE, MODÉRATEUR } from "./accès/consts";

type FileContent =
  | string
  | ArrayBufferView
  | ArrayBuffer
  | Blob
  | Iterable<ArrayBuffer | ArrayBufferView>
  | AsyncIterable<ArrayBuffer | ArrayBufferView>;

export type schémaFonctionSuivi<T> = (x: T) => void;

export type schémaFonctionOublier = () => void;

type schémaFonctionRéduction<T, U> = (branches: T) => U;

type orbitDbStoreTypes =
  | "counter"
  | "eventlog"
  | "feed"
  | "docstore"
  | "keyvalue"
  | "kvstore";

export type élémentsBd =
  | number
  | boolean
  | string
  | { [key: string]: élémentsBd }
  | Array<élémentsBd>;

export interface élémentBdListe<T = élémentsBd> {
  payload: {
    value: T;
  };
  hash: string;
}

export interface pairSFIP {
  addr: Uint8Array;
  peer: Uint8Array;
}

export type infoAccès = {
  idBdRacine: string;
  rôle: keyof objRôles;
};

// Identique à it-to-buffer, mais avec option de maximum de taille
async function toBuffer(
  stream: AsyncIterable<Uint8Array> | Iterable<Uint8Array>,
  max?: number
): Promise<Uint8Array | null> {
  let buffer = new Uint8Array(0);

  for await (const buf of stream) {
    buffer = uint8ArrayConcat([buffer, buf], buffer.length + buf.length);
    if (max !== undefined && buffer.length > max) return null;
  }

  return buffer;
}

const verrouOuvertureBd = new Semaphore();

export function adresseOrbiteValide(adresse: unknown): boolean {
  return (
    typeof adresse === "string" &&
    adresse.startsWith("/orbitdb/") &&
    isValidAddress(adresse)
  );
}

export default class ClientConstellation extends EventEmitter {
  _dir: string;
  optionsAccès?: { [key: string]: any };
  bdRacine?: KeyValueStore;
  _bds: { [key: string]: any };
  orbite?: OrbitDB;
  sfip: any;
  idNodeSFIP?: { [key: string]: any };
  compte?: Compte;
  bds?: BDs;
  tableaux?: Tableaux;
  variables?: Variables;
  réseau?: Réseau;
  favoris?: Favoris;
  projets?: Projets;
  nuée?: Nuée;
  motsClefs?: MotsClefs;
  pret: boolean;

  constructor(dir = "./sfip-cnstl") {
    super();
    this._dir = dir;
    this._bds = {};
    this.pret = false;
  }

  async initialiser() {
    this.sfip = await initSFIP(this._dir);
    this.idNodeSFIP = await this.sfip.id();
    for (const é of ["peer:connect", "peer:disconnect"]) {
      this.sfip.libp2p.connectionManager.on(é, () => {
        this.emit("changementConnexions");
      });
    }

    this.orbite = await initOrbite(this.sfip);

    const optionsAccèsRacine = {
      type: "controlleur-constellation",
      premierMod: this.orbite!.identity.id,
      nom: "racine",
    };
    const idBdRacine = await this.créerBdIndépendante(
      "kvstore",
      optionsAccèsRacine,
      "racine"
    );
    this.bdRacine = (await this.ouvrirBd(idBdRacine)) as KeyValueStore;
    await this.bdRacine.load();

    const accès = this.bdRacine.access as unknown as ContrôleurConstellation;
    this.optionsAccès = {
      type: "controlleur-constellation",
      adresseBd: accès.bd!.address,
    };

    const idBdCompte = await this.obtIdBd("compte", this.bdRacine, "kvstore");
    this.compte = new Compte(this, idBdCompte!);

    const idBdBDs = await this.obtIdBd("bds", this.bdRacine, "feed");
    this.bds = new BDs(this, idBdBDs!);

    this.tableaux = new Tableaux(this);

    const idBdVariables = await this.obtIdBd(
      "variables",
      this.bdRacine,
      "feed"
    );
    this.variables = new Variables(this, idBdVariables!);

    const idBdRéseau = await this.obtIdBd("réseau", this.bdRacine, "feed");
    this.réseau = new Réseau(this, idBdRéseau!);

    const idBdFavoris = await this.obtIdBd("favoris", this.bdRacine, "feed");
    this.favoris = new Favoris(this, idBdFavoris!);

    const idBdProjets = await this.obtIdBd("projets", this.bdRacine, "feed");
    this.projets = new Projets(this, idBdProjets!);

    const idBdMotsClefs = await this.obtIdBd(
      "motsClefs",
      this.bdRacine,
      "feed"
    );
    this.motsClefs = new MotsClefs(this, idBdMotsClefs!);

    this.nuée = new Nuée(this);

    this.pret = true;
    this.emit("pret");

    //On commence par épingler notre compte (de manière récursive)
    //afin de le rendre disponible
    await this.épinglerBd(idBdRacine);
  }

  async signer(message: string): Promise<Signature> {
    const id = this.orbite!.identity;
    const signature = await this.orbite!.identity.provider.sign(id, message);
    const clefPublique = this.orbite!.identity.publicKey;
    return { signature, clefPublique };
  }

  async vérifierSignature(
    signature: Signature,
    message: string
  ): Promise<boolean> {
    return await this.orbite!.identity.provider.verify(
      signature.signature,
      signature.clefPublique,
      message
    );
  }

  async suivreConnexionsPostes(
    f: schémaFonctionSuivi<pairSFIP[]>
  ): Promise<schémaFonctionOublier> {
    const dédoublerConnexions = (connexions: pairSFIP[]): pairSFIP[] => {
      const adrDéjàVues: string[] = [];
      const dédupliquées: pairSFIP[] = [];
      for (const c of connexions) {
        if (!adrDéjàVues.includes(c.addr.toString())) {
          adrDéjàVues.push(c.addr.toString());
          dédupliquées.push(c);
        }
      }
      return dédupliquées;
    };
    const fFinale = async () => {
      const connexions = await this.sfip.swarm.peers();
      // Enlever les doublons (pas trop sûr ce qu'ils font ici)
      const connexionsUniques = dédoublerConnexions(connexions);
      f(connexionsUniques);
    };

    this.on("changementConnexions", fFinale);
    fFinale();

    const oublier = () => {
      this.off("changementConnexions", fFinale);
    };
    return oublier;
  }

  async suivreDispositifs(
    f: schémaFonctionSuivi<string[]>,
    idBdRacine?: string
  ): Promise<schémaFonctionOublier> {
    if (!this.bdRacine) await once(this, "pret");
    idBdRacine = idBdRacine || this.bdRacine!.id;
    const bd = await this.ouvrirBd(idBdRacine);
    const accès = bd.access;
    const faisRien = () => {
      // Rien à faire
    };

    const typeAccès = (accès.constructor as unknown as AccessController).type;
    if (typeAccès === "ipfs") {
      f(accès.write);
      return faisRien;
    } else if (typeAccès === "controlleur-constellation") {
      const fFinale = () => {
        const mods = (accès as unknown as ContrôleurConstellation).rôles[
          MODÉRATEUR
        ];
        f(mods);
      };
      accès.on("updated", fFinale);
      fFinale();
      return () => {
        accès.off("updated", fFinale);
      };
    } else {
      return faisRien;
    }
  }

  async ajouterDispositif(identité: string) {
    if (!this.bdRacine) await once(this, "pret");
    const accès = this.bdRacine!.access as unknown as ContrôleurConstellation;
    accès.grant(MODÉRATEUR, identité);
  }

  async enleverDispositif(identité: string) {
    if (!this.bdRacine) await once(this, "pret");
    const accès = this.bdRacine!.access as unknown as ContrôleurConstellation;
    await accès.revoke(MODÉRATEUR, identité);
  }

  async rejoindreCompte() {
    console.error("Non implémenté");
  }

  async donnerAccès(id: string, identité: string): Promise<void> {
    const bd = await this.ouvrirBd(id);
    const accès = bd.access;
    const typeAccès = (accès.constructor as unknown as AccessController).type;
    if (typeAccès === nomTypeContrôleurConstellation) {
      (accès as unknown as ContrôleurConstellation).grant(MEMBRE, identité);
    }
  }

  async suivreAccès(
    id: string,
    f: schémaFonctionSuivi<objRôles>
  ): Promise<schémaFonctionOublier> {
    const bd = await this.ouvrirBd(id);
    const accès = bd.access as unknown as ContrôleurConstellation;
    const fFinale = () => {
      const autorisés = accès.rôles;
      f(autorisés);
    };
    accès.on("updated", fFinale);
    return () => {
      accès.off("updated", fFinale);
    };
  }

  async copierContenuBdListe(
    bdBase: KeyValueStore,
    nouvelleBd: KeyValueStore,
    clef: string
  ): Promise<void> {
    const idBdListeInit = await bdBase.get(clef);
    if (!idBdListeInit) return;

    const bdListeInit = (await this.ouvrirBd(idBdListeInit)) as FeedStore;

    const idNouvelleBdListe = await nouvelleBd.get(clef);
    if (!idNouvelleBdListe) throw "La nouvelle Bd n'existait pas";

    const nouvelleBdListe = (await this.ouvrirBd(
      idNouvelleBdListe
    )) as FeedStore;

    const données = ClientConstellation.obtÉlémentsDeBdListe(bdListeInit);
    données.forEach(async (d) => {
      await nouvelleBdListe.add(d);
    });
  }

  async suivreBd(
    id: string,
    f: schémaFonctionSuivi<Store>,
    événements: string[] = ["write", "replicate", "replicated", "ready"]
  ): Promise<schémaFonctionOublier> {
    const bd = await this.ouvrirBd(id);
    const fFinale = () => f(bd);
    for (const é of événements) {
      bd.events.on(é, fFinale);
    }
    fFinale();
    const oublier = () => {
      événements.forEach((é) => {
        bd.events.off(é, fFinale);
      });
    };
    return oublier;
  }

  async suivreBdDeClef<T>(
    id: string,
    clef: string,
    f: schémaFonctionSuivi<T | undefined>,
    fSuivre?: (
      id: string,
      f: schémaFonctionSuivi<any>
    ) => Promise<schémaFonctionOublier>
  ) {
    if (!fSuivre) {
      fSuivre = (id, f) => this.suivreBd(id, f);
    }

    let oublierFSuivre: schémaFonctionOublier | undefined;
    let idBdCible: string | undefined;

    const oublierBdRacine = await this.suivreBd(id, async (bd: Store) => {
      const nouvelIdBdCible = await (bd as KeyValueStore).get(clef);

      if (nouvelIdBdCible !== idBdCible) {
        idBdCible = nouvelIdBdCible;
        if (oublierFSuivre) oublierFSuivre();
        if (idBdCible) {
          oublierFSuivre = await fSuivre!(idBdCible, f);
        } else {
          f(undefined);
          oublierFSuivre = undefined;
        }
      }
    });

    return () => {
      oublierBdRacine();
      if (oublierFSuivre) oublierFSuivre();
    };
  }

  async suivreBdDicDeClef<T extends élémentsBd>(
    id: string,
    clef: string,
    f: schémaFonctionSuivi<{ [key: string]: T }>
  ): Promise<schémaFonctionOublier> {
    const fFinale = async (bd?: KeyValueStore) => {
      const valeurs = bd ? ClientConstellation.obtObjetdeBdDic<T>(bd) : {};
      f(valeurs);
    };
    return await this.suivreBdDeClef(id, clef, fFinale);
  }

  static obtObjetdeBdDic<T extends élémentsBd>(
    bd: KeyValueStore
  ): { [key: string]: T } {
    const valeurs = bd.all;
    return Object.fromEntries(
      Object.keys(valeurs).map((x) => {
        return [x, valeurs[x]];
      })
    );
  }

  async suivreBdListeDeClef<T extends élémentsBd>(
    id: string,
    clef: string,
    f: schémaFonctionSuivi<T[]>,
    renvoyerValeur?: true
  ): Promise<schémaFonctionOublier>;
  async suivreBdListeDeClef<T extends élémentsBd>(
    id: string,
    clef: string,
    f: schémaFonctionSuivi<élémentBdListe<T>[]>,
    renvoyerValeur: false
  ): Promise<schémaFonctionOublier>;
  async suivreBdListeDeClef<T extends élémentsBd>(
    id: string,
    clef: string,
    f: schémaFonctionSuivi<T[] | élémentBdListe<T>[]>,
    renvoyerValeur = true
  ): Promise<schémaFonctionOublier> {
    const fFinale = async (bd?: FeedStore) => {
      const éléments = bd
        ? ClientConstellation.obtÉlémentsDeBdListe<T>(bd, renvoyerValeur)
        : [];
      f(éléments);
    };
    return await this.suivreBdDeClef(id, clef, fFinale);
  }

  async suivreBdListe<T extends élémentsBd>(
    id: string,
    f: schémaFonctionSuivi<T[]>,
    renvoyerValeur?: true
  ): Promise<schémaFonctionOublier>;
  async suivreBdListe<T extends élémentsBd>(
    id: string,
    f: schémaFonctionSuivi<élémentBdListe<T>[]>,
    renvoyerValeur: false
  ): Promise<schémaFonctionOublier>;
  async suivreBdListe<T extends élémentsBd>(
    id: string,
    f: schémaFonctionSuivi<T[] | élémentBdListe<T>[]>,
    renvoyerValeur = true
  ): Promise<schémaFonctionOublier> {
    return await this.suivreBd(id, async (bd) => {
      const éléments = ClientConstellation.obtÉlémentsDeBdListe<T>(
        bd as FeedStore,
        renvoyerValeur
      );
      f(éléments);
    });
  }

  static obtÉlémentsDeBdListe<T extends élémentsBd>(
    bd: FeedStore,
    renvoyerValeur?: true
  ): T[];
  static obtÉlémentsDeBdListe<T extends élémentsBd>(
    bd: FeedStore,
    renvoyerValeur: false
  ): élémentBdListe<T>[];
  static obtÉlémentsDeBdListe<T extends élémentsBd>(
    bd: FeedStore,
    renvoyerValeur?: boolean
  ): T[] | élémentBdListe<T>[];
  static obtÉlémentsDeBdListe<T extends élémentsBd>(
    bd: FeedStore,
    renvoyerValeur = true
  ): T[] | élémentBdListe<T>[] {
    return bd
      .iterator({ limit: -1 })
      .collect()
      .map((e: élémentBdListe<T>) => (renvoyerValeur ? e.payload.value : e));
  }

  obtÉlémentBdListeSelonEmpreinte(bd: FeedStore, empreinte: string): any {
    return bd
      .iterator({ limit: -1 })
      .collect()
      .find((e: { [key: string]: any }) => e.hash === empreinte).payload.value;
  }

  async suivreBdsDeBdListe<T extends élémentsBd, U, V>(
    id: string,
    f: schémaFonctionSuivi<V[]>,
    fBranche: (
      id: string,
      f: schémaFonctionSuivi<U>,
      branche?: T
    ) => Promise<schémaFonctionOublier | undefined>,
    fIdBdDeBranche: (b: T) => string = (b) => b as string,
    fRéduction: schémaFonctionRéduction<U[], V[]> = (branches: U[]) =>
      [...new Set(branches.flat())] as unknown as V[],
    fCode: (é: T) => string = (é) => é as string
  ): Promise<schémaFonctionOublier> {
    const fListe = async (
      fSuivreRacine: (éléments: T[]) => Promise<void>
    ): Promise<schémaFonctionOublier> => {
      return await this.suivreBdListe(id, fSuivreRacine);
    };
    return await this.suivreBdsDeFonctionListe(
      fListe,
      f,
      fBranche,
      fIdBdDeBranche,
      fRéduction,
      fCode
    );
  }

  async suivreBdsDeFonctionListe<T extends élémentsBd, U, V>(
    fListe: (
      fSuivreRacine: (éléments: T[]) => Promise<void>
    ) => Promise<schémaFonctionOublier>,
    f: schémaFonctionSuivi<V[]>,
    fBranche: (
      id: string,
      f: schémaFonctionSuivi<U>,
      branche?: T
    ) => Promise<schémaFonctionOublier | undefined>,
    fIdBdDeBranche: (b: T) => string = (b) => b as string,
    fRéduction: schémaFonctionRéduction<U[], V[]> = (branches: U[]) =>
      [...new Set(branches.flat())] as unknown as V[],
    fCode: (é: T) => string = (é) => é as string
  ): Promise<schémaFonctionOublier> {
    interface InterfaceBranches {
      données?: U;
      fOublier?: schémaFonctionOublier;
    }
    const arbre: { [key: string]: InterfaceBranches } = {};
    const dictBranches: { [key: string]: T } = {};

    const fFinale = () => {
      const listeDonnées = Object.values(arbre)
        .map((x) => x.données)
        .filter((d) => d !== undefined) as U[];
      const réduits = fRéduction(listeDonnées);
      f(réduits);
    };

    const fSuivreRacine = async (éléments: Array<T>) => {
      if (éléments.some((x) => typeof fCode(x) !== "string"))
        throw "Définir fCode si les éléments ne sont pas en format texte (chaînes).";
      const dictÉléments = Object.fromEntries(
        éléments.map((é) => [fCode(é), é])
      );
      const existants = Object.keys(arbre);
      const nouveaux = Object.keys(dictÉléments).filter(
        (é) => !existants.includes(é)
      );
      const disparus = existants.filter(
        (é) => !Object.keys(dictÉléments).includes(é)
      );
      const changés = Object.entries(dictÉléments)
        .filter((é) => {
          return dictBranches[é[0]] !== é[1];
        })
        .map((é) => é[0]);
      nouveaux.push(...changés);

      for (const c of changés) {
        if (arbre[c]) {
          const fOublier = arbre[c].fOublier;
          if (fOublier) fOublier();
          delete arbre[c];
        }
      }

      for (const d of disparus) {
        const fOublier = arbre[d].fOublier;
        if (fOublier) fOublier();
        delete arbre[d];
        fFinale();
      }

      nouveaux.map(async (n: string) => {
        arbre[n] = { données: undefined };
        const élément = dictÉléments[n];
        dictBranches[n] = élément;

        const idBdBranche = fIdBdDeBranche(élément);
        const fSuivreBranche = (données: U) => {
          arbre[n].données = données;
          fFinale();
        };
        const fOublier = await fBranche(idBdBranche, fSuivreBranche, élément);
        arbre[n].fOublier = fOublier;
      });
    };
    fFinale();
    const oublierBdRacine = await fListe(fSuivreRacine);

    const oublier = () => {
      oublierBdRacine();
      Object.values(arbre).map((x) => (x.fOublier ? x.fOublier() : null));
    };
    return oublier;
  }

  async rechercherBdListe<T>(
    id: string,
    f: (e: élémentFeedStore<T>) => boolean
  ): Promise<any> {
    const bd = (await this.ouvrirBd(id)) as FeedStore;
    const élément = bd
      .iterator({ limit: -1 })
      .collect()
      .find((e: élémentFeedStore<T>) => f(e));
    return élément;
  }

  async obtFichierSFIP(id: string, max?: number): Promise<Uint8Array | null> {
    return await toBuffer(this.sfip.cat(id), max);
  }

  obtFluxSFIP(id: string): ReadableStream {
    const itér = this.sfip.cat(id);
    const flux = itérateurÀFlux(itér);
    return flux;
  }

  async ajouterÀSFIP(fichier: FileContent): Promise<string> {
    const résultat = await this.sfip.add(fichier);
    return résultat.cid.toString();
  }

  async ouvrirBd(id: string): Promise<Store> {
    if (!adresseOrbiteValide(id)) throw new Error(`Adresse ${id} non valide.`);

    //Nous avons besoin d'un verrou afin d'éviter la concurrence
    await verrouOuvertureBd.acquire(id);
    const existante = this._bds[id];
    if (existante) {
      verrouOuvertureBd.release(id);
      return existante;
    }
    const bd = await this.orbite!.open(id);
    await bd.load();
    this._bds[id] = bd;

    //Maintenant que la BD a été créée, on peut relâcher le verrou
    verrouOuvertureBd.release(id);
    return bd;
  }

  async obtIdBd(
    nom: string,
    racine: string | KeyValueStore,
    type?: orbitDbStoreTypes,
    optionsAccès?: OptionsContrôleurConstellation
  ): Promise<string | undefined> {
    let bdRacine: KeyValueStore;
    if (typeof racine === "string") {
      bdRacine = (await this.ouvrirBd(racine)) as KeyValueStore;
    } else {
      bdRacine = racine;
    }
    let idBd = await bdRacine.get(nom);

    // Nous devons confirmer que la base de données spécifiée était du bon genre
    if (idBd && type) {
      try {
        await this.orbite![type](idBd);
        return idBd;
      } catch {
        idBd = undefined;
      }
    }

    const permission = await this.permissionÉcrire(bdRacine.id);
    if (!idBd && permission && type) {
      idBd = await this.créerBdIndépendante(type, optionsAccès);
      await bdRacine.set(nom, idBd);
    }
    return idBd;
  }

  async créerBdIndépendante(
    type: orbitDbStoreTypes,
    optionsAccès?: OptionsContrôleurConstellation,
    nom?: string
  ): Promise<string> {
    optionsAccès = Object.assign({}, this.optionsAccès, optionsAccès || {});
    const options: any = {
      accessController: optionsAccès,
    };
    const bd = await this.orbite![type](nom || uuidv4(), options);
    await bd.load();
    return bd.id;
  }

  async _générerBd(type: orbitDbStoreTypes, nom: string): Promise<Store> {
    if (adresseOrbiteValide(nom) && this._bds[nom]) return this._bds[nom];
    const bd = await this.orbite![type](nom);
    this._bds[bd.id] = bd;
    return bd;
  }

  async effacerBd(id: string): Promise<void> {
    const bd = await this.orbite!.open(id);
    await bd.drop();
    delete this._bds[id];
  }

  async obtOpsAccès(idBd: string): Promise<OptionsContrôleurConstellation> {
    const bd = await this.ouvrirBd(idBd);
    const accès = bd.access as unknown as ContrôleurConstellation;
    return {
      adresseBd: accès.bd!.address,
    };
  }

  async permissionÉcrire(id: string): Promise<boolean> {
    const moi = this.orbite!.identity.id;
    const bd = await this.ouvrirBd(id);
    const accès = bd.access;
    const typeAccès = (accès.constructor as unknown as AccessController).type;

    if (typeAccès === "ipfs") {
      return accès.write.includes(moi);
    } else if (typeAccès === nomTypeContrôleurConstellation) {
      return (accès as unknown as ContrôleurConstellation).estAutorisé(moi);
    }
    return false;
  }

  async suivreAccèsBd(
    id: string,
    f: schémaFonctionSuivi<infoAccès[]>
  ): Promise<schémaFonctionOublier> {
    const bd = await this.ouvrirBd(id);
    const accès = bd.access as unknown as AccessController;
    const typeAccès = (accès.constructor as unknown as AccessController).type;

    const faisRien = () => {
      //Rien à faire
    };
    if (typeAccès === "ipfs") {
      const listeAccès: infoAccès[] = accès.write.map((id) => {
        return {
          idBdRacine: id,
          rôle: MODÉRATEUR,
        };
      });
      f(listeAccès);
    } else if (typeAccès === nomTypeContrôleurConstellation) {
      const fOublier = await (
        accès as ContrôleurConstellation
      ).suivreUtilisateursAutorisés(f);
      return fOublier;
    }
    return faisRien;
  }

  async épinglerBd(id: string, déjàVus: string[] = []) {
    if (déjàVus.includes(id)) return;
    const bd = await this.ouvrirBd(id);
    déjàVus.push(id);
    const épinglerSiAdresseValide = (x: unknown) => {
      if (adresseOrbiteValide(x)) {
        this.épinglerBd(x as string, déjàVus);
      }
    };

    //Cette fonction détectera les éléments d'une liste ou d'un dictionnaire
    //(à un niveau de profondeur) qui représentent une adresse de BD Orbit.
    const analyserItem = (x: unknown) => {
      if (typeof x === "object") {
        Object.values(x as { [key: string]: unknown }).forEach((y: unknown) =>
          épinglerSiAdresseValide(y)
        );
      } else if (Array.isArray(x)) {
        x.forEach((y) => épinglerSiAdresseValide(y));
      } else {
        épinglerSiAdresseValide(x);
      }
    };
    if (bd.type === "keyvalue") {
      const items = Object.values(
        ClientConstellation.obtObjetdeBdDic(bd as KeyValueStore)
      );
      items.forEach(analyserItem);
    } else if (bd.type === "feed") {
      const items = ClientConstellation.obtÉlémentsDeBdListe(bd as FeedStore);
      items.forEach(analyserItem);
    }
  }

  static async créer() {
    const client = new ClientConstellation();
    await client.initialiser();
    return client;
  }
}
