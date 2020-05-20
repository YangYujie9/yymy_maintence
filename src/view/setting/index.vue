<template>
  <div class="setting">

    
    <div class="wrap">
		    	
    	<!--设置路由-->
    	<div class="wrap-top">
    		<span class="pointer" style="padding-right: 80px;">用户管理</span>
    		<span class="pointer">角色管理</span>
    	</div>
    	<router-view class="right boxshadow"/>
        
    	
    </div>

    
  </div>
</template>

<script>

  export default {
    name: "system-setting",
    data(){
      return{
        category:[
          {
            name:'权限设置',
            link:'/setting/auth-setting',
            choose: false
          }
        ]
      }
    },
    created() {
        for (let i=0; i<this.category.length; i++) {
          if (this.$route.path == this.category[i].link) {
            this.category[i].choose = true
          } else {
            this.category[i].choose = false
          }
        }
    },
    mounted(){ 
      
    },
    methods:{
      //选择档期
      changeRouter(index){
      	  	for (let i=0; i<this.category.length; i++) {
	          	this.category[i].choose = false
	      	}
	      	this.category[index].choose = true

        this.$router.push(this.category[index].link)
      },
    },
  }
</script>

<style scoped lang="less">
.setting {
    width:100%;
    font-size:14px; 
    

    .wrap {
    	background: #ffffff;
    	border: 1px solid #c9c9c9;
    	margin: 8px;
    	

    	.wrap-top {
    		height: 60px;
    		line-height: 60px;
    		padding-left: 40px;
    		span {
    			padding-right: 30px;
    			font-size: 16px;
    		}

    	}

    	

    }
}
  
</style>
