<template>
  <v-app>
    <ops-langue />
    <v-main>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
      <Navigation />
    </v-main>
  </v-app>
</template>

<script>
import Vue from "vue";
import Navigation from "@/components/Navigation.vue";
import opsLangue from "@/components/OpsLangue.vue";
import mixinLangue from "@/mixins/langues";

export default Vue.extend({
  name: "App",

  components: {
    Navigation,
    opsLangue,
  },

  data: () => ({
    //
  }),

  mixins: [mixinLangue],

  mounted: function () {
    const langue = this.$store.state.paramètres.langue;
    if (langue) this.changerLangue(langue);
    const thèmeNuit = this.$store.state.paramètres.thèmeNuit;
    this.$vuetify.theme.dark = thèmeNuit;
  },
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
