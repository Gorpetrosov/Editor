import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import vuetify from './plugins/vuetify'
import './plugins/base'
import './plugins/vee-validate'
import VueGtag from 'vue-gtag';

if (process.env.NODE_ENV == 'production') {
  Vue.use(VueGtag, {
    config: { id: 'G-X2LQJGC8QE' }
  }, router);
}

Vue.config.productionTip = false

store.dispatch('init');

new Vue({
  router,
  store,
  vuetify,
  mounted: async function() {
    if(store.state.auth.jwt){
      await this.$store.dispatch('profile');
      await this.$store.dispatch('projects/getProjects');
    }
  },
  data: function() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL
    }
  },
  render: h => h(App)
}).$mount('#app')
