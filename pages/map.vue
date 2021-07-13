<template>
  <v-row class="ma-0 fill-height" align="center" justify="center">

    <v-navigation-drawer
      app
      right
      width="16rem"
      color="#2ab3be"
      v-model="navbar_search"
      :permanent="!($vuetify.breakpoint.mobile)"
      touchless
    >
    <v-col class="pa-0" fill-height>
      <v-row class="ma-2">
        <v-text-field
          solo
          hide-details
          color="darktone"
          v-model="search_word">
        </v-text-field>
      </v-row>
      <v-row class="ma-2" justify="center">
        <v-btn
          class="ml-4"
          color="primary"
          fab small
          @click="onSearch">
          <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-row>

      <!-- Tradução -->
      <v-divider class="mt-3 smtree__menu_divider"/>
      <v-row class="mx-3 mt-1 mb-3 justify-end font-italic font-s white--text">
        Tradução
      </v-row>

    </v-col>
    </v-navigation-drawer>

    <!-- Semantic Tree (Konva) -->
    <v-progress-circular
      v-if="loading"
      indeterminate
      size="64"
      style="position: absolute; top: 0; bottom: 0; margin: auto;"
    ></v-progress-circular>



    <v-snackbar
      v-model="snackbar.show"
      color="var(--v-red-base)"
      timeout="3000"
    >
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="var(--v-tone_white-base)"
          text
          v-bind="attrs"
          @click="snackbar.show = false"
        >
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>

<script>

export default {
  data: () => ({
    navbar_search: false,
    snackbar: {
      show: false,
      text: ''
    },
    loading: false,
    search_word: ''
  }),
  async fetch() {
    this.$store.dispatch('docs/dict');
  },
  computed: {
    dict() {
      return this.$store.state.docs.dict;
    }
  },
  methods: {
    onSearch() {
      
    },
    openSnackbar(text) {
      this.snackbar.text = text;
      this.snackbar.show = true;
    }
  }
}
</script>

<style>

</style>
