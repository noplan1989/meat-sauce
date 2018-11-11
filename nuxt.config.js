require('dotenv').config()

const isProduction = process.env.NODE_ENV === 'production'

const proxy = isProduction ? {} : { '/api/': { target: process.env.PREDICTION_URL, pathRewrite: { '^/api/': '' } } }

module.exports = {
  mode: 'universal',
  head: {
    title: 'ミートソースかボロネーゼ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'ミートソースかボロネーゼかわからないときに役立つかもしれません。'
      }
    ]
  },
  loading: false,
  srcDir: 'app',
  generate: {
    dir: 'app/dist'
  },
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    ['nuxt-sass-resources-loader', ['@/assets/scss/_variables.scss', '@/assets/scss/_mixin.scss']]
  ],
  axios: {
    baseURL: isProduction ? process.env.HOSTING_URL : 'http://localhost:3000',
    proxy: !isProduction
  },
  proxy
}
