<template>
  <v-app :dark="goDark">
<!--     <v-app-bar app color="primary" dark>
      <v-toolbar-title>Festival Unimed do Sudoeste de Música</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="goDark = !goDark">
        <v-icon>mdi-brightness-6</v-icon>
      </v-btn>
    </v-app-bar>
 -->
    <v-main>
      <Main />
    </v-main>
  </v-app>
</template>

<script>
import Main from "./components/Main";

export default {
  name: "App",

  components: {
    Main,
  },

  data: () => ({
    goDark: false,
  }),
  watch: {
    goDark: function (val) {
      this.$vuetify.theme.dark = val;
    },
  },
};
</script>
<style scoped>
</style>
