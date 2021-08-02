<template>
  <v-col class="fill-height" align="center" justify="center">
    <v-row class="darktone--text font-m" justify="center" align="center">
        <img
        class="ma-5"
          alt="iCertus DataHub Manager"
          src="/logo.png"
          style="height: 128px"
        >
      <div class="pa-6" style="width: 15rem">
        O <b>Mapa da CPI</b> é um sistema open-source criado e mantido pela comunidade para auxiliar na investigação dos documentos públicos recebidos pela CPI da Covid-19.
      </div>
    </v-row>
    <v-row class="hightone darktone--text pa-8 font-bold" justify="center" align="start">
      INTRODUÇÃO
    </v-row>
    <v-row class="hightone darktone--text px-8 pb-8 font-italic" justify="center" align="start">
        Esse sistema foi criado na tentativa de otimizar o processo de investigação da enorme quantidade de informação recebida pela CPI Covid-19.<br>
        A principal função do sistema é catalogar o conteúdo dos documentos disponíveis publicamente e facilitar a busca por termos.<br>
        <br>
        O processo de catálogo é feito através de um bot em Python, que baixa os arquivos PDF (ignora os outros) e extrai o texto usando dois métodos:<br>
        - copia os dados textuais salvos diretamente no PDF;<br>
        - interpreta o texto de imagens escaneadas através de OCR.<br>
    </v-row>
    <v-row class="secondary darktone--text pa-8 font-bold" justify="center" align="start">
      COMO CONTRIBUIR
    </v-row>
    <v-row class="secondary darktone--text px-8 pb-8 font-italic" justify="center" align="start">
        Não é preciso ser programador para contribuir para o Mapa da CPI.<br>
        Estamos precisando de designers, advogados, linguistas e pessoas que possam ajudar a revisar dados manualmente.<br>
        <br>
        Entre no nosso GitHub e abra um Pull Request!<br>
    </v-row>
  </v-col>
</template>

<script>
export default {
  layout: 'home',
  data: () => ({
    menu_items: [
      {icon: 'mdi-doctor',
       title: 'DOCTOR',
       route: '/#'},
      {icon: 'mdi-hubspot',
       title: 'ÁRVORE SEMÃNTICA',
       route: '/semantics'},
      {icon: 'mdi-book-open-outline',
       title: 'DICIONÁRIO',
       route: '/#'},
    ]
  }),
}
</script>

<style>
</style>
