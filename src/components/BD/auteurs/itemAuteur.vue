<template>
  <v-list-item @click="$emit('click')">
    <avatar-profil :id="id" />
    <v-list-item-content>
      <span>
        <p class="mb-2 mx-2">{{ couper(nom, 25) }}</p>

        <v-chip
          v-if="!accepté"
          class="mx-2"
          outlined
          label
          small
          color="secondary"
          >Invité</v-chip
        >
        <v-chip v-if="mod" class="mx-2" outlined label small color="success"
          >Modérateur</v-chip
        >
      </span>
    </v-list-item-content>
    <v-list-item-action>
      <lien-orbite :lien="id" />
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import avatarProfil from "@/components/commun/avatarProfil";
import lienOrbite from "@/components/commun/lienOrbite";

import { traduireNom, couper } from "@/utils";
import mixinLangues from "@/mixins/langues";
import mixinIPA from "@/mixins/ipa";

export default {
  name: "itemAuteur",
  props: ["id", "mod", "accepté"],
  mixins: [mixinLangues, mixinIPA],
  components: { avatarProfil, lienOrbite },
  data: function () {
    return {
      dialogue: false,
      nomsAuteur: {},
    };
  },
  computed: {
    nom: function () {
      return Object.keys(this.nomsAuteur).length
        ? traduireNom(this.nomsAuteur, this.languesPréférées)
        : this.id;
    },
  },
  methods: {
    couper,
    effacerTableau: async function () {
      await this.$ipa.bds.effacerTableauBD(this.idBD, this.idTableau);
    },
    initialiserSuivi: async function () {
      const oublierNoms = await this.$ipa.réseau.suivreNomsMembre(
        this.id,
        (noms) => {
          this.nomsAuteur = noms;
        }
      );
      this.suivre([oublierNoms]);
    },
  },
};
</script>

<style></style>
