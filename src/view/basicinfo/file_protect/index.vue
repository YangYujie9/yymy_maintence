<template>
  <div class="setting">
    <div class="setting_top">

      <div class="el-tabs__active-bar" style="background: rgb(51, 204, 0)"  :style="{width: tabwidth+'px', transform: 'translateX('+translateX + 'px)'}"></div>
      <div ref="tabs" @click="change(index)" :class="{active: item.choose}" v-for="(item, index) in headList" class="list cursor">
              {{item.label}}
          </div>
    </div>
    <div class="setting_warp">
      <router-view class="right boxshadow"/>
    </div>

    
  </div>
</template>

<script>

  export default {
    name: "system-setting",
    data(){
      return{
        activeName:'',
        headList:[{
          label:'店铺&账号管理',
          name:'pb',
          choose:true,
          link:'/basic/file_protect'
        },{
          label:'分组&员工管理',
          name:'dp',
          choose:false,

          link:'/basic/staff_management'

        }],
        tabwidth: 200,
        translateX: 0,

      }
    },
    created() {

    },
    mounted(){ 

      if(this.$route.fullPath.indexOf('file_protect')>0){
        this.change_two(0)
      } else if(this.$route.fullPath.indexOf('staff_management')>0){
        this.change_two(1)
      }



      
    },
    methods:{
      change(index) {

          this.tabwidth = this.$refs.tabs[index].offsetWidth


          this.translateX = this.$refs.tabs[index].offsetLeft


          for (var i = this.headList.length - 1; i >= 0; i--) {
             this.headList[i].choose = false
          }

          this.headList[index].choose = true


          this.$router.push(this.headList[index].link)
  

      },

      change_two(index) {

          this.tabwidth = this.$refs.tabs[index].offsetWidth


          this.translateX = this.$refs.tabs[index].offsetLeft


          for (var i = this.headList.length - 1; i >= 0; i--) {
             this.headList[i].choose = false
          }

          this.headList[index].choose = true

          

      }

    },
  }
</script>

<style scoped lang="less">
.setting {
    width:100%;
    min-width: 800px;
    font-size:14px; 
    position: relative;
    .cursor{
      cursor: pointer;
    }

    &_title{
      height: 40px;
      line-height: 40px;
      background-color: rgb(242, 242, 242);

      span{
        padding-left: 20px;
        color: rgb(153, 153, 153);

      }
    }

    &_top{
      height: 40px;
      margin-top: 20px;
      border-bottom: 1px solid #e2e2e2;
      //padding-left: 30px;
      //margin-right: 30px;
      position: relative;
      left: 20px;
      //width: calc(100vw - 310px);
      width: 100%;

        .list {
          display: inline-block;
          min-width: 60px;
          width: 200px;
          line-height: 34px;
          height: 100%;
          text-align: center;
          margin-right: 30px;
          padding-left: 6px;
          padding-right: 6px;

          &.active {
              color: rgb(51, 204, 0);
          }
          
      }

    }

    &_warp{
      height: calc(100vh - 165px);
      //width:calc(100vw - 270px);
      width: 100%;



    }
}
  
</style>
