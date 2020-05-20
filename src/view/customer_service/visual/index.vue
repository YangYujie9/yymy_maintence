<template>
	<div class="data_setting">
	    <div class="data_setting_top">
	    	客服部大数据看板
	    	
	    </div>
	    <div class="data_setting_warp">
	    	<router-view class="right boxshadow"/>
	    	
	    </div>
		
	
		
	</div>
	
</template>

<script>
import { mapGetters } from 'vuex'

  export default {
    name: "system-setting",
    data(){
      return{



      }
    },
    created() {

    },
    computed:{
      ...mapGetters([
          'getpageDict',
      ]),




    },
    mounted(){ 






      
      
    },
    methods:{



      fmtDate(obj){
        var date =  new Date(obj*1000);
        var y = 1900+date.getYear();
        var m = "0"+(date.getMonth()+1);
        var d = "0"+date.getDate();
        //var h = date.getHours();
        //console.info(h)
        return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
        //return y+"-"+m.substring(m.length-2,m.length);
      },






    },
  }
</script>
<style lang="less">

</style>



<style scoped lang="less">
.data_setting {

    font-size:14px; 
    position: relative;
    height: calc(100vh - 65px);
    background: url("../../../assets/top_bg.png") no-repeat top;
    
    background-size: 100% 65px;
    //background-size: contain;
    //margin: 10px 20px 0 10px;

    //background-color: rgb(21, 29, 61);
    background-color:#262f50;

    &_top {
    	width: 500px;
    	margin: 0 auto;
    	height: 60px;
    	line-height: 60px;
    	color: #ffffff;
    	font-size: 2.2rem;
    	text-align: center;

    }


    &_warp{

      height: calc(100vh - 165px);
      //height: 100%;
      margin: 25px;
      //background-color:red;


      .cursor{
        cursor: pointer;
      }




  }
}
  
</style>
