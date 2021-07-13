<template>
  <v-app dark>
    <v-navigation-drawer
      app
      color="lowtone"
      mini-variant
    >
    <v-layout column fill-height>
      <v-row align="center" justify="center" class="mx-0 my-2 flex-grow-0">
        <v-tooltip right color="lowtone">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="var(--v-secondary-base)"
                fab
                small
                v-bind="attrs"
                v-on="on"
                to="/"
                active-class="default__nav_btn--active"
              >
                <v-icon>mdi-home</v-icon>
            </v-btn>
          </template>
          <span class="default__navbar_tooltip">Home</span>
        </v-tooltip>
      </v-row>
      <v-row align="center" justify="center" class="mx-0 my-2 flex-grow-0">
        <v-tooltip right color="lowtone">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="var(--v-secondary-base)"
                fab
                small
                v-bind="attrs"
                v-on="on"
                to="/search"
                active-class="default__nav_btn--active"
              >
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </template>
          <span class="default__navbar_tooltip">Pesquisar por Palavra</span>
        </v-tooltip>
      </v-row>
      <v-row align="center" justify="center" class="mx-0 my-2 flex-grow-0">
        <v-tooltip right color="lowtone">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="var(--v-secondary-base)"
                fab
                small
                v-bind="attrs"
                v-on="on"
                to="/map"
                active-class="default__nav_btn--active"
              >
                <v-icon>mdi-hubspot</v-icon>
            </v-btn>
          </template>
          <span class="default__navbar_tooltip">Árvore de Palavras</span>
        </v-tooltip>
      </v-row>
    </v-layout>
    </v-navigation-drawer>
    <v-main>
        <nuxt />
    </v-main>

  </v-app>
</template>

<script>
export default {

}
</script>

<style>

.default__navbar_tooltip {
  color: var(--v-white-base);
  font-size: 1.2rem;
  font-weight: 600;
  font-family:'Barlow';
}

.default__nav_btn--active {
  border: var(--v-secondary-base) 3px solid !important;
}

.default__nav_btn--active .v-icon{
  color: var(--v-secondary-base) !important;
}

</style>

<style scoped>
.theme--dark.v-application {
  background-color: var(--v-darktone-base);
}
</style>
