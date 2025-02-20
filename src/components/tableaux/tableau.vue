<template>
  <span>
    <p class="mb-0 text-overline">
      Données
      <dialogue-nouvelle-colonne
        :permissionModifier="permissionÉcrire"
        @sauvegarder="creerColonne"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-on="on"
            v-bind="attrs"
            icon
            small
            :disabled="!permissionÉcrire"
          >
            <v-icon small>mdi-table-column-plus-after</v-icon>
          </v-btn>
        </template>
      </dialogue-nouvelle-colonne>
      <v-btn
        icon
        small
        :disabled="!permissionÉcrire || !colonnes || !colonnes.length"
        :color="nouvelleLigne ? 'success' : 'secondary'"
        @click="nouvelleLigne = !nouvelleLigne"
      >
        <v-icon small>mdi-table-row-plus-after</v-icon>
      </v-btn>
      <v-btn
        icon
        small
        :disabled="!permissionÉcrire || !colonnes || !colonnes.length"
        :color="éditer ? 'primary' : 'secondary'"
        @click="éditer = !éditer"
      >
        <v-icon small>{{ éditer ? "mdi-pencil" : "mdi-pencil-off" }}</v-icon>
      </v-btn>
    </p>

    <v-skeleton-loader v-if="colonnes === null" type="image" />

    <v-data-table
      v-else
      :headers="entête"
      :items="éléments"
      dense
      class="elevation-1"
    >
      <template v-slot:no-data>
        <div class="text-center my-3">
          <p class="text-h5 mt-5">{{ $t("tableau.vide") }}</p>
          <div v-if="permissionÉcrire">
            <dialogue-nouvelle-colonne
              :permissionModifier="permissionÉcrire"
              @sauvegarder="creerColonne"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-on="on"
                  v-bind="attrs"
                  color="primary"
                  class="mx-2"
                  outlined
                  text
                >
                  <v-icon left>mdi-table-column-plus-after</v-icon>
                  Ajouter une colonne
                </v-btn>
              </template>
            </dialogue-nouvelle-colonne>
            <v-btn
              v-if="colonnes.length"
              color="primary"
              class="mx-2"
              outlined
              text
              @click="nouvelleLigne === true"
            >
              <v-icon left>mdi-table-row-plus-after</v-icon>
              Ajouter une rangée
            </v-btn>
          </div>
        </div>
      </template>
      <template v-for="c in entête" v-slot:[`header.${c.value}`]="{ header }">
        <titreEntêteTableau
          v-if="c.value !== 'actions'"
          :key="c.value"
          :idVariable="header.text"
          :idColonne="header.value"
        />
        <span v-else :key="c.value"> {{ c.text }} </span>
      </template>
      <template v-for="c in entête" v-slot:[`item.${c.value}`]="{ item }">
        <span v-if="c.value === 'actions'" :key="c.value">
          <v-btn
            v-if="item.premièreLigne"
            color="success"
            icon
            small
            @click="() => ajouterÉlément()"
          >
            <v-icon>mdi-check</v-icon>
          </v-btn>
          <v-btn
            v-else
            color="error"
            icon
            small
            @click="() => effacerÉlément(item.empreinte)"
          >
            <v-icon small>mdi-delete</v-icon>
          </v-btn>
        </span>
        <celluleDate
          v-else-if="c.catégorie === 'date'"
          :key="c.value"
          :val="item[c.value]"
          :couleurActive="item.premièreLigne ? 'success' : 'primary'"
          :editer="éditer || item.premièreLigne"
          @edite="(e) => valÉditée(item.empreinte, c.value, e.val)"
        />
        <celluleDateEtHeure
          v-else-if="c.catégorie === 'dateEtHeure'"
          :key="c.value"
          :val="item[c.value]"
          :couleurActive="item.premièreLigne ? 'success' : 'primary'"
          :editer="éditer || item.premièreLigne"
          @edite="(e) => valÉditée(item.empreinte, c.value, e.val)"
        />
        <celluleHeure
          v-else-if="c.catégorie === 'heure'"
          :key="c.value"
          :val="item[c.value]"
          :couleurActive="item.premièreLigne ? 'success' : 'primary'"
          :editer="éditer || item.premièreLigne"
          @edite="(e) => valÉditée(item.empreinte, c.value, e.val)"
        />
        <celluleNumérique
          v-else-if="c.catégorie === 'numérique'"
          :key="c.value"
          :val="item[c.value]"
          :couleurActive="item.premièreLigne ? 'success' : 'primary'"
          :editer="éditer || item.premièreLigne"
          @edite="(e) => valÉditée(item.empreinte, c.value, e.val)"
        />
        <celluleBooléenne
          v-else-if="c.catégorie === 'booléen'"
          :key="c.value"
          :val="item[c.value]"
          :couleurActive="item.premièreLigne ? 'success' : 'primary'"
          :editer="éditer || item.premièreLigne"
          @edite="(e) => valÉditée(item.empreinte, c.value, e.val)"
        />
        <celluleChaîne
          v-else-if="c.catégorie === 'chaîne'"
          :key="c.value"
          :val="item[c.value]"
          :empreinte="item.empreinte"
          :couleurActive="item.premièreLigne ? 'success' : 'primary'"
          :editer="éditer || item.premièreLigne"
          @edite="(e) => valÉditée(item.empreinte, c.value, e.val)"
        />
        <celluleGéoJSON
          v-else-if="c.catégorie === 'géojson'"
          :key="c.value"
          :val="item[c.value]"
          :couleurActive="item.premièreLigne ? 'success' : 'primary'"
          :editer="éditer || item.premièreLigne"
          @edite="(e) => valÉditée(item.empreinte, c.value, e.val)"
        />
        <celluleCatégorique
          v-else-if="c.catégorie === 'catégorique'"
          :key="c.value"
          :val="item[c.value]"
          :couleurActive="item.premièreLigne ? 'success' : 'primary'"
          :editer="éditer || item.premièreLigne"
          @edite="(e) => valÉditée(item.empreinte, c.value, e.val)"
        />
        <celluleFichier
          v-else-if="
            ['fichier', 'vidéo', 'photo', 'audio'].includes(c.catégorie)
          "
          :key="c.value"
          :val="item[c.value]"
          :type="c.catégorie"
          :couleurActive="item.premièreLigne ? 'success' : 'primary'"
          :editer="éditer || item.premièreLigne"
          @edite="(e) => valÉditée(item.empreinte, c.value, e.val)"
        />
      </template>
    </v-data-table>
  </span>
</template>

<script>
import titreEntêteTableau from "@/components/tableaux/titreEntêteTableau";
import dialogueNouvelleColonne from "@/components/tableaux/colonnes/dialogueNouvelleColonne";

import celluleBooléenne from "@/components/tableaux/celluleBooléenne";
import celluleNumérique from "@/components/tableaux/celluleNumérique";
import celluleChaîne from "@/components/tableaux/celluleChaîne";
import celluleGéoJSON from "@/components/tableaux/celluleGéoJSON";
import celluleCatégorique from "@/components/tableaux/celluleCatégorique";
import celluleFichier from "@/components/tableaux/celluleFichier";
import celluleDate from "@/components/tableaux/celluleDate";
import celluleDateEtHeure from "@/components/tableaux/celluleDateEtHeure";
import celluleHeure from "@/components/tableaux/celluleHeure";

import mixinIPA from "@/mixins/ipa";
import mixinLangues from "@/mixins/langues";

export default {
  name: "tableau",
  props: ["idTableau"],
  components: {
    dialogueNouvelleColonne,
    titreEntêteTableau,
    celluleBooléenne,
    celluleNumérique,
    celluleChaîne,
    celluleGéoJSON,
    celluleCatégorique,
    celluleFichier,
    celluleDate,
    celluleDateEtHeure,
    celluleHeure,
  },
  mixins: [mixinLangues, mixinIPA],
  data: function () {
    return {
      permissionÉcrire: false,
      colonnes: null,
      données: null,
      nouvelleLigne: false,
      éditer: false,
      valsNouvelleLigne: {},
    };
  },
  computed: {
    entête: function () {
      const cols = this.colonnes || [];
      const entêtes = cols.map((x) => {
        return {
          text: x.variable,
          value: x.id,
          catégorie: x.catégorie,
        };
      });
      if (this.permissionÉcrire) {
        entêtes.push({
          text: "",
          value: "actions",
          sortable: false,
        });
      }
      return entêtes;
    },
    éléments: function () {
      const données = (this.données || []).sort((x, y) =>
        x.id > y.id ? 1 : -1
      );

      if (this.nouvelleLigne) {
        const premièreLigne = {};
        Object.assign(
          premièreLigne,
          { premièreLigne: true, empreinte: -1 },
          this.valsNouvelleLigne
        );
        return [premièreLigne, ...données];
      } else {
        return données;
      }
    },
  },
  methods: {
    creerColonne: async function ({ idVariable, règles }) {
      const idColonne = await this.$ipa.tableaux.ajouterColonneTableau(
        this.idTableau,
        idVariable
      );
      if (règles.length) {
        await this.$ipa.tableaux.ajouterRèglesColonne(
          this.idTableau,
          idColonne,
          règles
        );
      }
    },

    valÉditée: function (empreinte, variable, val) {
      if (empreinte === -1) {
        this.valsNouvelleLigne = Object.assign({}, this.valsNouvelleLigne, {
          [variable]: val,
        });
      } else {
        this.$ipa.tableaux.modifierÉlément(
          this.idTableau,
          { [variable]: val },
          empreinte
        );
      }
    },

    ajouterÉlément: function () {
      this.$ipa.tableaux.ajouterÉlément(this.idTableau, this.valsNouvelleLigne);
      this.nouvelleLigne = false;
      this.valsLigneActive = {};
    },

    effacerÉlément: async function (empreinte) {
      await this.$ipa.tableaux.effacerÉlément(this.idTableau, empreinte);
    },

    initialiserSuivi: async function () {
      this.permissionÉcrire = await this.$ipa.permissionÉcrire(this.idTableau);

      const oublierColonnes = await this.$ipa.tableaux.suivreColonnes(
        this.idTableau,
        (cols) => {
          this.colonnes = cols;
        }
      );
      const oublierDonnées = await this.$ipa.tableaux.suivreDonnées(
        this.idTableau,
        (données) => {
          this.données = données;
        }
      );

      this.suivre([oublierColonnes, oublierDonnées]);
    },
  },
};
</script>

<style></style>
