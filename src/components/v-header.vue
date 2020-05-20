<template>
  <div class="header">

    <p class="left-title"> 
      <img style="width: 50px;" src="../../static/myicon-.png"/>数据中心

      <i style="font-size: 64px;" class="iconfont icontianmaoxingxiang2"></i>
    </p>
    <div class="person">
          
          <el-button style="padding: 3px 10px;">
            <img class="head" v-if="getstaffVO.headImg" :src="getstaffVO.headImg" />
            <img class="head" v-else src="../assets/head-o.png" />
            {{userInfo.staffName}}
          </el-button>
    </div>
  </div>
</template>

<script>
  import Cookies from "js-cookie"
  import { mapGetters } from 'vuex'
export default {
  name: 'vHeader',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'getstaffVO',
      'userInfo',
      'getpowers',
      'getreadlist',
      'getreadcount'
    ]),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.header {
	height: 64px;
	background: #3f3f3f;
	position: relative;


  .left-title {
    font-size: 32px;
    color: #ffffff;
    padding-left: 16px;
    line-height: 64px;
    position: relative;


    img {
      position: relative;
      padding-right: 10px;
      top: 8px;
    }

    i {
      position: absolute;
      left: 250px;


    }
  }

  
  .person {
      position: absolute;
      text-align: left;
      right: 30px;
      top: 15px;
      font-size: 12px;

      .person-p {
        margin-bottom: 12px;
      }


      .head {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        vertical-align: middle;
        background: #e2e2e2;
        padding: 4px;
      }

      span {
        padding-left: 2px;

      }

    }
    


  
}
</style>
