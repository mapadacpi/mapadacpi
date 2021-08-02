import colors from 'vuetify/es5/util/colors'
require("dotenv").config();

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'O Mapa da CPI',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'layouts/global.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/konva.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // API Endpoints
  serverMiddleware: {
    "/api" : "~/api/rest.js"
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    ['@nuxtjs/axios', {
      baseURL: 'http://'+process.env.AXIOS_HOST+':'+process.env.AXIOS_PORT
    }]
  ],

  // Host settings
  target: 'static',
  server: {
    host: process.env.NUXT_HOST // default: localhost
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        options: {
          customProperties: true
        },
        dark: {
          darktone: '#1a1a1a',
          primary: '#5fd35f',
          secondary: '#2ab3be',
          hightone: '#a8f9f5',
          error: '#ff5555',
        }
      }
    }
  },

  // Disable Server-Side Rendering
  ssr: false,
  render: {
     static: {
       setHeaders(res) {
         res.setHeader('Access-Control-Allow-Origin', '*')
         res.setHeader('Access-Control-Allow-Methods', 'GET')
         res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
       }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
