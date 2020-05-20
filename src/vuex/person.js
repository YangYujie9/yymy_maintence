/*用户信息 企业信息*/
import Vue from 'vue'
import Cookies from 'js-cookie'
import { Notification } from 'element-ui'
const state = {
  //用户信息
  userInfo: {

  },
  //用户企业信息
  userCompany: {},
  pageDict: [],
  staffVO: {
    cid: '',
    uid: '',
    token: ''
  },
  powers: [], 
  isCollapse: false 
}

const getters = {
  
  userInfo: state => {
    return state.userInfo
  },
  isCollapse: state => {
    return state.isCollapse
  },
  userCompany: state => {
    return state.userCompany
  },
  getpageDict: state => {
    
    return state.pageDict
  },
  getstaffVO: state => {
    
    return state.staffVO
  },
  getpowers: state => {
    
    return state.powers
  },
  getflagdemand(state, data) {

    return state.flag.demand

    
  }
  
}

const mutations = {
  setUserInfo(state, data) {
    state.userInfo = data
  },
  setisCollapse(state) {
    state.isCollapse = !state.isCollapse
  },
  setstaffVO(state, data) {
    state.staffVO.cid = data.cid
    state.staffVO.uid = data.uid
    state.staffVO.token = data.token


  },
  setpowers(state, data) {

    if (data && data.length) {
      state.powers = data.split(',')
    }
    
  },
  setUserCompany(state, data) {

    state.userCompany = data
  },
  setpageDict(state, data) {

    state.pageDict = data

    
  },
  
  setflagdemand(state, data) {

    state.flag.demand = data

    
  }

}



//console.info(fStartWebsocket)
const actions = {
//获取所有用户信息
  
  getUserBaseInfo(context, router) {
    Vue.$http.get('dic/show_dic')
    .then((data) => {

        if (data.code === 200) {

          
          context.commit('setpageDict', data.data)

          context.commit('setstaffVO', {cid: Cookies.get('cid'),uid: Cookies.get('uid'),token: Cookies.get('token')})
        }
      
    })

    Vue.$http.get('staff/get_staff_detail')
    .then((data) => {

        if (data.code === 200) {
          
          context.commit('setUserInfo', data.data[0])
          context.commit('setpowers', data.data[0].powerIds)



          



        } else {
          Cookies.remove('cid')
          Cookies.remove('uid')
          Cookies.remove('token')


          router.push('/login')
        }
      
    })


  },
  
}

export default {
  state,
  getters,
  mutations,
  actions
}
