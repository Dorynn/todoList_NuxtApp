export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Todo List - Welcome',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href:"https://fonts.googleapis.com"},
      { rel: 'preconnect', href:"https://fonts.gstatic.com", crossorigin:''},
      { rel: 'stylesheet', href:"https://fonts.googleapis.com/css2?family=Delicious+Handrawn&family=Encode+Sans+Expanded:wght@300&family=Jost:wght@200;300&family=Open+Sans&family=Shadows+Into+Light&display=swap"},
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/globalCss.css',
    '~/assets/css/tooltip.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src:'~/plugins/toast_notif.js', mode:'client'},
    {src:'~/plugins/v-tooltip.js', mode:'client'},
    {src:'~/plugins/click_outside.js', mode:'client'},


  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/fontawesome',
  ],
  fontawesome: {
    icons: {
      solid: true,
      brands: true,
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/i18n'
  ],
  // i18n:{
  //   locales: ['en', 'vi'],
  //   defaultLocale: 'en',
  //   vueI18n:{
  //     fallbackLocale:'en',
  //     messages:{
  //       en:{
  //         welcome:'Welcome'
  //       },
  //       vi:{
  //         welcome:'xin chào'
  //       }
  //     }
  //   }
  // },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},
  // ssr: false,

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders:{
      sass:{
        implementation: require('sass'),
      },
      scss:{
        implementation: require('sass'),
      },
    }
  },

  server:{
    port: 8000
  }
}
