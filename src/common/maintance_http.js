/*
* 创建Axios 实例
 */

import axios from 'axios'
import { promaintanceUrl as urlConfig} from '@/common/config/url-config'
//import * as userConfig from './userHtppt'

//console.info(axios.get)




let erpAxios = axios.create()
erpAxios.defaults.baseURL = urlConfig.domain





import Cookies from 'js-cookie'


/**
 * 发送请求之前
 */




erpAxios.interceptors.request.use(function (config) {
  config.headers['cid'] = Cookies.get('cid')
  config.headers['uid'] = Cookies.get('uid')
  config.headers['token'] = Cookies.get('token')


  

  //config.headers['cid'] = urlConfig.cid

  //config.headers['uid'] = urlConfig.uid
  //config.headers['token'] = urlConfig.token
  //console.log(config);
  
  return config;
}, function (error) {
  return Promise.reject(error);
});


/**
 * 响应拦截器
 */
erpAxios.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  return Promise.reject(error);
})

export default erpAxios
