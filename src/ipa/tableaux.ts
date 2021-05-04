import { v4 as uuidv4 } from "uuid";
import ClientConstellation, {
  schémaFonctionSuivi,
  schémaFonctionOublier
} from "./client";

export default class Tableaux {
  client: ClientConstellation;

  constructor(client: ClientConstellation) {
    this.client = client;
  }

  async créerTableau(): Promise<string> {
    const idBdTableau = await this.client.créerBDIndépendante("kvstore");
    return idBdTableau;
  }

  async suivreDonnées(
    idTableau: string,
    f: schémaFonctionSuivi
  ): Promise<schémaFonctionOublier> {
    const idBdDonnées = await this.client.obtIdBd("données", idTableau, "feed");
    return await this.client.suivreBdListe(idBdDonnées, f, false);
  }

  async ajouterÉlément(
    idTableau: string,
    vals: {[key: string]: any}
  ): Promise<string> {
    const idBdDonnées = await this.client.obtIdBd(
      "données",
      idTableau,
      "feed"
    );
    const bdDonnées = await this.client.ouvrirBD(idBdDonnées);
    return await bdDonnées.add(vals);
  }

  async modifierÉlément(
    idTableau: string,
    vals: {[key: string]: any},
    empreintePrécédente: string
  ): Promise<string> {
    console.error("À faire")
    await this.effacerÉlément(empreintePrécédente)
  }

  async effacerÉlément(
    idTableau: string,
    empreinteÉlément: string
  ): Promise<void> {
    const idBdDonnées = await this.client.obtIdBd(
      "données",
      idTableau,
      "feed"
    );
    const bdDonnées = await this.client.ouvrirBD(idBdDonnées);
    console.log({idTableau, idBdDonnées, bdDonnées, empreinteÉlément})
    await bdDonnées.remove(empreinteÉlément)
  }

  async ajouterNomsTableau(id: string, noms: { [key: string]: string }) {
    const idBdNoms = await this.client.obtIdBd("noms", id, "kvstore");
    const bdNoms = await this.client.ouvrirBD(idBdNoms);
    for (const lng in noms) {
      await bdNoms.set(lng, noms[lng]);
    }
  }

  async sauvegarderNomTableau(id: string, langue: string, nom: string) {
    const idBdNoms = await this.client.obtIdBd("noms", id, "kvstore");
    const bdNoms = await this.client.ouvrirBD(idBdNoms);
    await bdNoms.set(langue, nom);
  }

  async effacerNomTableau(id: string, langue: string) {
    const idBdNoms = await this.client.obtIdBd("noms", id, "kvstore");
    const bdNoms = await this.client.ouvrirBD(idBdNoms);
    await bdNoms.del(langue);
  }

  async suivreNomsTableau(
    id: string,
    f: schémaFonctionSuivi
  ): Promise<schémaFonctionOublier> {
    return await this.client.suivreBdDic(id, "noms", f);
  }

  async ajouterColonneTableau(idTableau: string, idVariable: string) {
    const idBdColonnes = await this.client.obtIdBd(
      "colonnes",
      idTableau,
      "feed"
    );
    const bdColonnes = await this.client.ouvrirBD(idBdColonnes);
    const entrée = {
      id: uuidv4(),
      variable: idVariable
    };
    await bdColonnes.add(entrée);
  }

  async suivreColonnes(
    id: string,
    f: schémaFonctionSuivi
  ): Promise<schémaFonctionOublier> {
    const idBdListe = await this.client.obtIdBd("colonnes", id, "feed");
    // return await this.client.suivreBdListe(idBdListe, f);
    const fRacine = async (fSuivi: schémaFonctionSuivi) => {
      return await this.client.suivreBdListe(idBdListe, fSuivi);
    };
    interface InfoCol {
      id: string,
      variable: string
    }
    const fBranche = async (infoCol: InfoCol, fSuivi: schémaFonctionSuivi) => {
      const { variable } = infoCol
      const catégorie = await this.client.variables!.obtCatégorieVariable(variable)
      const col = Object.assign({catégorie}, infoCol)
      await fSuivi(col)
    };
    return await this.client.suivreBdsEmboîtées(
      fRacine,
      fBranche,
      f
    );
  }

  async suivreVariables(
    id: string,
    f: schémaFonctionSuivi
  ): Promise<schémaFonctionOublier> {
    return await this.suivreColonnes(id, async liste => {
      const variables = liste.map((x: any) => x.variable);
      return f(variables);
    });
  }

  async effacerTableau(id: string) {
    // Effacer toutes les composantes du tableau
    for (const clef in ["noms"]) {
      const idBd = await this.client.obtIdBd(clef, id);
      if (idBd) await this.client.effacerBD(idBd);
    }
    // Effacer le tableau lui-même
    await this.client.effacerBD(id);
  }
}
