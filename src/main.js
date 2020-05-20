// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './reset.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import erpAxios from './common/http'
import maintanceAxios from './common/maintance_http.js'
import store from './vuex'
import exportAxios from './common/exporthttp' 
import sale_exportAxios from './common/sale_exporthttp' 
import data_exporthttp from './common/data_exporthttp'


Vue.use(ElementUI)
import Cookies from 'js-cookie'


Vue.$http = Vue.prototype.$http = erpAxios
Vue.$maintancehttp = Vue.prototype.$maintancehttp = maintanceAxios 
Vue.$exporthttp = Vue.prototype.$exporthttp = exportAxios
Vue.$sale_exportAxios = Vue.prototype.$sale_exportAxios = sale_exportAxios
Vue.$data_exporthttp = Vue.prototype.$data_exporthttp = data_exporthttp




//路由拦截
router.beforeEach((to, from, next) => { 


  

    if (to.query.cid) {


      
        Cookies.remove('cid')
        Cookies.remove('uid')
        Cookies.remove('token')

        Cookies.set("token", to.query.token);
        Cookies.set("cid", to.query.cid);
        Cookies.set("uid", to.query.uid);





        router.replace(to.path)
    }

    if (from.query.cid) {
        Cookies.remove('cid')
        Cookies.remove('uid')
        Cookies.remove('token')
        Cookies.set("token", from.query.token);
        Cookies.set("cid", from.query.cid);
        Cookies.set("uid", from.query.uid);

        router.replace(from.path)
    }


   

    


    if (store.state.person.staffVO.uid) {

      
    } else {


      store.dispatch('getUserBaseInfo')
    }

    next()

    
 
})

Vue.$isInArray = Vue.prototype.$isInArray = (value) => {
    for(var i = 0; i < store.state.person.powers.length; i++){
        if(value == store.state.person.powers[i]){

            return true;
        }
    }
    return false;
}


/*router.beforeEach((to, from, next) => { 
	store.dispatch('getUserBaseInfo',router)

	next()
})*/

//console.info(erpAxios.get)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>' 
}) 
