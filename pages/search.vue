<template>
  <v-col class="fill-height" align="center" justify="center">
    <v-row class="pa-6 darktone--text font-m" justify="center" align="center" style="width: 30rem">
      <v-text-field
        solo
        hide-details
        color="darktone"
        v-model="search_ui">
      </v-text-field>
      <v-btn
        class="ml-4"
        color="primary"
        fab small
        @click="onSearch">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-row>
    <v-row class="darktone--text font-m" justify="center" align="center"
      v-for="(item, key) in docs" :key="key">
      <v-btn class="mx-9 my-1" style="height: auto; width: 80vw"
        color="hightone"
        :style="item.links.length==0?'background-color: #777 !important':''"
        :disabled="item.links.length==0"
        @click="openModal(item)">
        <v-col class="pa-0" style="width: 80vw">
          <v-row class="ma-0 darktone--text" justify="center">
            <v-col class="pa-1 flex-grow-0 font-bold">
              #{{ item.id }}
            </v-col>
            <v-col class="pa-1 flex-grow-0 font-italic">
              {{ item.date }}
            </v-col>
            <v-spacer/>
            <v-col class="pa-1 flex-grow-0 font-bold">
              {{ item.sender }}
            </v-col>
          </v-row>
          <v-divider color="#333"/>
          <v-row class="ma-0 darktone--text">
            <v-col class="pa-2 font-italic" style="text-align: justify; overflow: hidden">
              {{ item.description[0] }}
            </v-col>
          </v-row>
        </v-col>
      </v-btn>
    </v-row>
    <v-row class="py-6" justify="center">
      <v-btn
        class="ml-4"
        color="secondary"
        fab small
        @click="limit += 10">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>

    <!-- "Document" Modal -->
    <v-dialog
      v-model="modal.show"
      width="900"
    >
      <template v-slot:activator="{ on, attrs }">
      </template>

      <v-card color="darktone" class="round-none">
        <v-tabs
          v-model="modal.view"
          height="32"
          fixed-tabs
          hide-slider
        >
          <v-tabs-slider></v-tabs-slider>

          <v-tab
            v-for="item in [
              ['ORIGINAL','#a8f9f5'],
              ['TEXTO','#5fd35f'],
              ['OCR','#2ab3be']]"
            class="font-bold darktone--text"
            :style="`background-color: ${item[1]}`"
            :key="item[0]"
          >
            {{ item[0] }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="modal.view">
          <v-tab-item
            style="background-color: #a8f9f5"
            class="pa-2"
          >
            <v-col class="pa-2 justify-center darktone">
              <v-row class="ma-0 justify-center py-2 font-m"
                v-for="(link, key) in (modal.doc)?modal.doc.links:[]"
                :key="key">
                <v-btn
                  class="darktone--text"
                  color="hightone"
                  :href="link[1]">
                  {{ link[0] }}
                </v-btn>
              </v-row>
            </v-col>
          </v-tab-item>
          <v-tab-item
            style="background-color: #5fd35f"
            class="pa-2"
            justify="center"
          >
            <v-col class="pa-2 justify-center darktone">
              <v-row class="ma-0 justify-center py-2 flex-grow-0" style="width: 15rem" justify="center">
                <v-select
                  :items="modal.doc?(modal.doc.links.map(l => l[0])):[]"
                  label="Documento"
                  dense
                  @change="onTextChange"
                ></v-select>
              </v-row>
              <v-row class="ma-0 justify-center py-2 font-m">
                <pre style="width: 100%">
                  {{ modal.text?doc_text:'' }}
                </pre>
              </v-row>
            </v-col>
          </v-tab-item>
          <v-tab-item
            style="background-color: #2ab3be"
            class="pa-2"
            justify="center"
          >
            <v-col class="pa-2 justify-center darktone">
              <v-row class="ma-0 justify-center py-2 flex-grow-0" style="width: 15rem" justify="center">
                <v-select
                  :items="modal.doc?(modal.doc.links.map(l => l[0])):[]"
                  label="Documento"
                  dense
                  @change="onOCRChange"
                ></v-select>
              </v-row>
              <v-row class="ma-0 justify-center py-2 font-m">
                <pre style="width: 100%">
                  {{ modal.ocr?doc_ocr:'' }}
                </pre>
              </v-row>
            </v-col>
          </v-tab-item>
        </v-tabs-items>

      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
export default {
  data: () => ({
    search_ui: "",
    search_query: "",
    modal: {
      show: false,
      view: 0,
      doc: null,
      text: false,
      ocr: false,
    },
    limit: 10
  }),
  async fetch() {
    this.$store.dispatch('docs/dict');
  },
  methods: {
    onSearch() {
      this.search_query = this.search_ui;
      this.limit = 10;
    },
    onTextChange(value) {
      this.$store.dispatch('docs/text', this.modal.doc.id+'_'+value).then(() => {
        this.modal.text = true;
      });
    },
    onOCRChange(value) {
      this.$store.dispatch('docs/ocr', this.modal.doc.id+'_'+value).then(() => {
        this.modal.ocr = true;
      });
    },
    openModal(doc) {
      this.modal.doc = doc;
      this.modal.show = true;
      this.modal.text = false;
      this.modal.ocr = false;
    }
  },
  computed: {
    docs() {
      let data = this.$store.state.docs.dict;
      let filtered = [];
      for (let d in data) {
          if (data[d].sender.toLowerCase().includes(this.search_query) ||
              ('dict' in data[d] && data[d].dict.includes(this.search_query)))
            filtered.push(data[d]);
      }
      return filtered.slice(0,this.limit);
    },
    doc_text() {
      return this.$store.state.docs.text;
    },
    doc_ocr() {
      return this.$store.state.docs.ocr;
    }
  }
}
</script>

<style>
</style>
