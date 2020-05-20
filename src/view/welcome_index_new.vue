<template>
  <div class="welcome_index">

  	<div class="main">
    <div class="header">
        <div class="nav">
            <div class="entry">
                
                <span class="state">{{userInfo.staffName}}，欢迎进入数据中心，祝你开心每一天！</span>

				
				
                
            </div>
            <div class="entrytwo">
                
                <span class="state">在线人数：{{onLineCount}}</span>
                
                
                
            </div>
        </div>
    </div>
    <div class="container">
        <div class="content">
            <div class="wrap">
                <div class="sloganone">
                    <div class="sloganone_div">
                        <ul >
                           <li style="background: url('http://yy-data.oss-cn-beijing.aliyuncs.com/lALPDgQ9rWHzKhPNBsDNCyQ_2852_1728.png') no-repeat 0 0;background-size: cover;filter: blur(1px);"></li> 
                           <li style="background:url('http://yy-data.oss-cn-beijing.aliyuncs.com/lALPDgQ9rWH1fuLNBorNCu4_2798_1674.png') no-repeat 0 0;background-size: cover;filter: blur(1px);"></li> 
                           
                           <li style="background: url('http://yy-data.oss-cn-beijing.aliyuncs.com/lALPDgQ9rWH1fvrNBszNCyg_2856_1740.png') no-repeat 0 0;background-size: cover;filter: blur(1px);"></li> 
                           <li style="background: url('http://yy-data.oss-cn-beijing.aliyuncs.com/lALPDgQ9rWH1xSHNBsbNCyY_2854_1734.png') no-repeat 0 0;background-size: cover;filter: blur(1px);"></li> 
                           <li style="background: url('http://yy-data.oss-cn-beijing.aliyuncs.com/lALPDgQ9rWH1xTrNBr7NCyQ_2852_1726.png') no-repeat 0 0;background-size: cover;filter: blur(1px);"></li> 
                           <li style="background: url('http://yy-data.oss-cn-beijing.aliyuncs.com/lALPDgQ9rWHzKfzNBhDNCxA_2832_1552.png') no-repeat 0 0;background-size: cover;filter: blur(1px);"></li> 
                           <li style="background: url('http://yy-data.oss-cn-beijing.aliyuncs.com/lALPDgQ9rWH1fvrNBszNCyg_2856_1740.png') no-repeat 0 0;background-size: cover;filter: blur(1px);"></li> 
                        </ul>
                    </div>
                    
                </div>
                <div class="slogan"></div>
                <div class="mid">
                    <div class="main-entry">
                        <a href="javascript:;" @click.stop="informVO_dialogVisible = true" class="developer-login"><span class="title"><i
                                class="developer"></i>最新通知</span><s></s></a>
                        <a @click.stop="copy_dialogVisible = true" class="personal-login"><span class="title"><i
                                class="personal"></i>版本介绍</span><s></s></a>
                        <a   @click.stop="advice_show"  class="personal-login"><span class="title"><i
                                class="personal"></i>使用建议</span><s></s></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="back">
 			
            <div class="items">
                <div class="item item1"
                     style="background:url('http://yy-data.oss-cn-beijing.aliyuncs.com/lADPDgQ9rWHzKo_NDdfNG68_7087_3543.jpg'); background-size: contain;"></div>
                <!--<div class="item item2"
                     style="background-image:url(https://img.alicdn.com/tps/TB1pfG4IFXXXXc6XXXXXXXXXXXX.jpg)"></div>
                <div class="item item3"
                     style="background-image:url(https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg)"></div>-->
            </div>
          	
        </div>
    </div>
   
</div>

<el-dialog
	  title="数据中心建议"
	  :visible.sync="advice_dialogVisible"
	  width="600px"
	  >
	  <div>
	  	<el-input
          type="textarea"
          :rows="8"
          resize="none"
          placeholder="请输入您对数据中心的建议或者需要改进的和新增的功能，我们会及时改进"
          v-model="memo">
        </el-input>
	  </div>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="advice_dialogVisible = false">取 消</el-button>
	    <el-button type="primary"@click="add_advice">提交</el-button>
	  </span>
</el-dialog>
<el-dialog
	  title="通知"
	  :visible.sync="informVO_dialogVisible"
	  width="540px"
	  >
	  <div slot="title">
	  	<p style="font-size: 20px;color: #66a2c2;
              line-height: 36px;
              margin-top: 2px;
              font-weight: 800;" class="left_wel_right_title">
          {{informVO.informTitle}}
      	</p>
	  </div>
	  <div style="width: 500px;position: relative;height: 200px;">
	  	
	    <p style="font-size: 14px;
              line-height: 26px;" 
              class="left_wel_right_content">{{informVO.informMemo}}</p>
	    <p style="font-size: 14px;
              position: absolute;
              bottom: 20px;
              right: 10px;" 
        class="left_wel_right_time">
	    	发布时间： 
	    {{fmtDateftm(informVO.createTime)}}</p>
	  </div>
	  
</el-dialog>

<el-dialog
	  title="版本通知"
	  :visible.sync="copy_dialogVisible"
	  width="540px"
	  >
	  <div slot="title">
	  	<p style="font-size: 20px;color: #66a2c2;
              line-height: 36px;
              margin-top: 2px;
              font-weight: 800;" class="left_wel_right_title">
          	版本：1.0.0
      	</p>
	  </div>
	  <div style="width: 500px;position: relative;height: 200px;">
	  	
	    <p style="font-size: 14px;
              line-height: 26px;" 
              class="left_wel_right_content">
              1.新增客服部报表和数据统计功能<br/>
              2.淘课数据报表功能
          </p>
	    <p style="font-size: 14px;
              position: absolute;
              bottom: 20px;
              right: 10px;" 
        class="left_wel_right_time">
	    	发布时间： 
	    2019-12-02
		</p>
	  </div>
	  
</el-dialog>
  	
  	
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import axios from 'axios'


export default {
	data(){
	    return{
	    	copy_dialogVisible: false,
	    	informVO_dialogVisible: false,
	    	advice_dialogVisible: false,
	        weaimg: {
	          xue: 'iconxue',
	          lei: 'iconlei',
	          shachen: 'iconshachen',
	          wu: 'icontianqizitiku43',
	          bingbao: 'iconbingbao',
	          yun: 'iconicon-test',
	          yu: 'iconyu',
	          yin: 'iconqing',
	          qing: 'iconqing',
	        },
        week: {
          '星期一':'Monday',
          '星期二': 'Tuesday',
          '星期三': 'Wednesday',
          '星期四': 'Thursday',
          '星期五': 'Friday',
          '星期六': 'Saturday',
          '星期日': 'Sunday',
        },
        weather_data: [],
        memo: '',
        informVO: {
          
        },
        onLineCount: 0
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
  },
  mounted() {
    //this.get_weather()
    this.main_show()
    //this.show_advice()
  },
	methods: {
    
		advice_show() {
			this.memo = ''
			this.advice_dialogVisible = true

		},
    show_advice() {
      this.$maintancehttp.get('main/show_advice?pageNum=1&pageSize=5')
             .then((data)=>{
                console.info(data)
                
                  
              })
             .catch(()=>{
              this.$message({
                message: '接口报错',
                type: 'error'
              })
          })
    },
      fmtDateftm(obj){
          var date =  new Date(obj*1000);

          var y = 1900+date.getYear();
          var m = "0"+(date.getMonth()+1);
          var d = "0"+date.getDate();
          return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
      },
      main_show() {
        this.$maintancehttp.get('main/main_show')
             .then((data)=>{
                //console.info(data)
                this.informVO = data.data.informVO
                this.onLineCount = data.data.onLineCount
                  
              })
             .catch(()=>{
              this.$message({
                message: '接口报错',
                type: 'error'
              })
          })
      },
      add_advice() {
            this.$maintancehttp.post('main/add_advice',{
              memo: this.memo
            })
             .then((data)=>{
                //console.info(data)
                this.advice_dialogVisible = false
                this.memo = ''
                this.$message({
                  message: data.msg,
                  type: 'success'
                })
                  
              })
             .catch(()=>{
              this.$message({
                message: '接口报错',
                type: 'error'
              })
          })
      },
	  	get_weather() {
        axios.get('https://www.tianqiapi.com/api/?version=v1&city=杭州&appid=79279256&appsecret=dtR1MzP8"')
        .then((data)=>{

          this.weather_data = data.data.data

        })
      },
	}
}
</script>
<style>
  .welcome_tea .el-textarea__inner {
    border: 0px;
  }
</style>
<style scoped lang="less"> 
.welcome_index {
	position: relative;
	height: calc(100vh - 66px);
	
   .header {
   			position: absolute;
            width: 100%;
            top: 20px;
            left: 0px;
            z-index: 999;
        }

        .nav {
            width: 92%;
            height: 30px;
            line-height: 60px;
            color: #ffffff;
            margin: 0 auto;
        }


        

        .entry {
            color: #ffffff;
            float: left;
        }

        .entry .state {
        	color: #ffffff;
        }

        .entrytwo {
            color: #fff;
            float: right;
        }

        .entrytwo .state {
            color: #ffffff;
        }


        
        .container {
            width: 100%;
            height: 100%;
            background-color: #fff;
        }

        .content {
            width: 1200px;
            height: 100%;
            margin: 0 auto;;
        }

        .wrap {
            position: absolute;
            left: 0;
            top: 14%;
            width: 100%;
            text-align: center;
            z-index: 2;
        }

        .slogan {
            width: 600px;
            height: 200px;
            background: url(https://img.alicdn.com/tps/TB1POhqIFXXXXXbXFXXXXXXXXXX.png) no-repeat 0 0;
            background-size: 600px;
            margin: auto;
        }

        .sloganone {
            width: 590px;
            height: 370px;
            background: url(../assets/mockup_notebook.png) no-repeat 0 0;
            background-size: 600px;
            margin: auto;
            padding: 26px 30px 30px 76px;
            

        }

        .sloganone_div {
            width: 450px;
            height: 294px; 
            overflow: hidden;
        }

        .sloganone ul {
            width: 3600px;
            height: 400px;
            animation: myani 15s linear infinite; 
            -ms-animation: myani 15s linear infinite; 
            -moz-animation: myani 15s linear infinite; 
            -webkit-animation: myani 15s linear infinite; 

        }

        

        .sloganone ul li {
            width: 450px;
            height: 294px;
            float: left;
            list-style: none;
            
        }


        /* 对动画的关键帧进行设置*/
        @keyframes myani {
            0%{
                margin-left:0;
            }
            8%{
                margin-left:0; 
            }
            /*总共用10秒，0%到30% 也是3.333秒第一张图片停留位置后面以此类推*/
            13%{
                margin-left:-450px;
            }
            23%{
                margin-left:-450px;
            }
            33%{
                margin-left:-900px;
            }
            43%{
                margin-left:-900px;
            }
            53%{
                margin-left:-1350px;
            }
            63%{
                margin-left:-1350px;
            }
            73%{
                margin-left:-1800px;
            }
            83%{
                margin-left:-1800px;
            }
            100%{
                margin-left:-2250px;
            }
            
        }


        .mid {
            width: 100%;
        }

        .main-entry {
            width: 550px;
            height: 50px;
            margin: 15px auto 0;
        }

        .main-entry a {
            display: block;
            text-decoration: none;
            float: left;
            text-align: center;
            cursor: pointer;
            border-radius: 8px;
            font-size: 14px;
            letter-spacing: 1px;
            height: 50px;
            width: 170px;
            color: #ffffff;
            line-height: 50px;
            position: relative;
            overflow: hidden;
        }

        .main-entry a .title {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2;
            padding-left: 18px;
        }

        .main-entry a .title i {
            position: absolute;
            left: 20px;
            top: 14px;
            background: url(https://img.alicdn.com/tps/TB1uh30IpXXXXXKXVXXXXXXXXXX.png) no-repeat 0 0;
            display: block;
            width: 24px;
            height: 24px;
            background-size: 24px;
        }

        .main-entry a .title .seller {
            background-image: url(https://img.alicdn.com/tps/TB12JNkIFXXXXXBXXXXXXXXXXXX.png);
        }

        .main-entry a .title .developer {
            background-image: url(https://zos.alipayobjects.com/rmsportal/neqhNGwxBXBmhVY.png);
        }

        .main-entry s {
            background-color: #00a3ee;
            opacity: .9;
            display: block;
            border-radius: 8px;
            height: 100%;
            width: 100%;
            position: absolute;
            top: 0;
        }

        .main-entry a:hover s {
            background-color: #00aaee;
            opacity: 1;
        }

        a.personal-login,
        a.seller-login
        {
            margin-left: 20px;
            transition: all .3s ease-in-out;
            -webkit-transition: all .3s ease-in-out;
            -moz-transition: all .3s ease-in-out;
            -o-transition: all .3s ease-in-out;
        }
        a.seller-login .seller-entry {
            display: none;
            z-index: 2;
            position: relative;
            height: 50px;
        }
        a.seller-login .inerval-line {
            display: none;
            width: 150px;
            margin: 0 auto;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            position: relative;
            height: 0;
            z-index: 2;
        }
        a.seller-login:hover{
            height: 100px;
            margin-top: -25px;
        }
        a.seller-login:hover .title{
            display: none;
        }
        a.seller-login:hover .seller-entry,
        a.seller-login:hover .inerval-line
        {
            display: block;
        }

        .alipay-app {
            text-align: center;
            position: absolute;
            bottom: 70px;
            left: 0;
            z-index: 3;
            width: 100%;
        }

        .alipay-app .ma {
            width: 600px;
            margin: 0 auto;
        }

        .alipay-app img {
            width: 60px;
            height: 60px;
        }

        .alipay-app p {
            line-height: 30px;
            height: 30px;
            color: #ffffff;
            margin: 5px 0 10px;
        }

        

        .ownership {
            text-align: center;
            height: 20px;
            line-height: 25px;
        }

        .nav-icons {
            width: 250px;
            height: 30px;
            margin: 0 auto;
            text-align: center;
        }

        .nav-icons a {
            width: 20px;
            display: block;
            float: left;
            margin-right: 5px;
            height: 28px;
            background: url(https://img.alicdn.com/tps/TB1.cMTIpXXXXbLXVXXXXXXXXXX.png) no-repeat 0 0;
        }

        


      	#ServerNum,#ServerNum p {
			line-height: 10px;
			text-align: center;
			color: white;
			height: 10px;
		}


        /*slide*/
        .front, .items, .item {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }

        .back {
            bottom: 0px;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            overflow: hidden;
        }

        .items {
            overflow: visible;
        }

        .item {
            background: url(https://img.alicdn.com/tps/TB1h9xxIFXXXXbKXXXXXXXXXXXX.jpg) no-repeat 0 0;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
        }


}
</style>
