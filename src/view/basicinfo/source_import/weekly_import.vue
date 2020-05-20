<template>
  <div v-if="power" ref="import_data" class="import_data">
  	<div  ref="data_top" style="position: relative;" class="import_data-top">
<!--   		<div style="display: inline-block;" class="el-checkbox-group">

          <label @click="changestatus(list)" v-for="list in shop_list"  class="el-checkbox-button el-checkbox-button--small">
            <span :class="{'is-checkeda': list.check}"  class="el-checkbox-button__inner">{{list.label}}</span>
          </label>
        
        </div> 
        <div style="display: inline-block;" class="el-checkbox-group">

          <label @click="changestatus_group(list)" v-for="list in group_list"  class="el-checkbox-button el-checkbox-button--small">
            <span :class="{'is-checkeda': list.check}"  class="el-checkbox-button__inner">{{list.label}}</span>
          </label>
        
        </div>-->
        <p>
        	<el-date-picker
	  		  style="display: inline-block;position: relative;top: 3px;"
		      v-model="time"
        	  @change="get_import_status"
		      size="small"
		      type="week"
		      :format="format()" 
		      placeholder="选择日期"
		      :picker-options="pickerOptions">
	       </el-date-picker>
	    </p> 



	   
  	</div>
  	<div v-if="power" v-loading="loading"
    :element-loading-text="loading_text"
    element-loading-spinner="el-icon-loading"
     :style="{height: wrap_height + 'px'}" class="import_data-wrap">

		<el-card style="width: 48%; display: inline-block;margin-bottom: 10px;margin-right: 3%;" class="box-card">
		  <div slot="header" class="clearfix">
		    <span>周度数据</span>
		    <el-button v-if="import_weekly_flag" style="float: right; padding: 0px 10px" type="text" @click="del_weekly">删除</el-button>
	<!-- 	    <i class="el-icon-delete icon_delete pointer" style="float: right; padding-right: 10px;color: red;font-size: 24px;" @click=""></i> -->
		  </div>
		  <div style="display: flex" class="text item">
		  	<div style="width: 166px;padding-left: 12px;color: #adadad;font-size: 14px;border-right: 1px solid #EBEEF5">
		  		<p style="line-height: 34px;margin-top: 20px;">姓名：{{userInfo.staffName}}</p>
		  		<!--<p style="margin-top: 36px;">部门：{{groupName}}</p> -->
		  		<p style="line-height: 50px;margin-top: 36px;">时间：{{timeformat}}</p>
		  	</div>

		  	<div style="flex: 1">

			    <p style="text-align: center;position: relative;top:-10px;">
				    <i v-show="!import_weekly_flag" style="font-size: 120px;color: #3259ce;position: relative;" class="el-icon-upload">
				    	
				    	<input style="left:0px" type="file" @change="import_weekly_data" class="inpucus-datacenter pointer"  />
				    </i>

<!-- 				    <i v-show="!shopId" style="font-size: 120px;color: #8a8a8a;position: relative;" class="el-icon-timer">
				    	
				    	
				    </i> -->


				    <i v-show="import_weekly_flag" style="font-size: 120px;color: #67c23a;position: relative;" class="el-icon-success">
				    </i>
				</p>




			    <p v-show="!import_weekly_flag" style="text-align: center">
			    	请上传文件
			    </p>

<!-- 			    <p v-show="!shopId" style="text-align: center">
			    	等待上传
			    </p> -->


			    <p v-show="import_weekly_flag" style="text-align: center">
			    	上传成功
			    </p>
			</div>


		  </div>
		</el-card>















		
		


  	</div>
  </div>
</template>

<script>
import XLSX from 'xlsx'
  import { mapGetters } from 'vuex'

export default {
	data(){
      return{
      	pickerOptions:{
      		disabledDate(time) {
            //return time.getTime() > Date.now() - 24*60*60*1000;
            },
            'firstDayOfWeek': 1
      	},
      	loading: false,
      	loading_text: '上传中',
      	time: new Date(new Date().getTime()-3600 * 1000 * 24 * 1),
      	weekStartDate:'',
      	weekEndDate:'',
      	wrap_height: 100,
      	list: {},
      	import_weekly_flag: false,
      	get_data_from_shop_flag: false,
      	power: true
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
    	timeformat() {

	        var y = 1900+this.time.getYear()
	        var m = "0"+(this.time.getMonth()+1)
	        var d = "0"+this.time.getDate()
	        return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length)
    	},
    	deletedataflag() {

    		let choosedate = new Date(this.time).getTime()

    		let nowdate = new Date().getTime()

    		let end = new Date(nowdate - 3600 * 1000 * 24 * 7).getTime()

    		if (end > choosedate) {
    			return false
    		} else {
    			return  true
    		}


    		






    		
    	},
    },
    mounted(){

	    this.$nextTick(()=>{

            this.wrap_height = this.$refs.import_data.offsetHeight - this.$refs.data_top.offsetHeight - 20

            
        })
      	
        this.get_import_status()
       

    },
    methods: {

    	get_import_status(){

    		this.$http.post(`hydate/get_import_status`,{
    			tableName:'周数据统计',
    			time:this.weekStartDate.getTime().toString().substr(0, 10),

    		})

    		.then((data)=>{
    			if(data.code == '200'){

    				this.import_weekly_flag = false

    				if(data.data) {
    					this.import_weekly_flag = true
    				}




    			} else {
    				return this.$message({
    					message:data.msg,
    					type:error
    				})
    			}
    		})


    	},


	    fmtDate(obj){
	        var date =  new Date(obj*1000);
	        var y = date.getFullYear();
	        var m = "0"+(date.getMonth()+1);
	        var d = "0"+date.getDate();
	        //var h = date.getHours();
	        //console.info(h)
	        return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
	        //return y+"-"+m.substring(m.length-2,m.length);
	    },

	    formatDate(obj){
	        //var date =  new Date(obj*1000);
	        var y = obj.getFullYear();
	        var m = "0"+(obj.getMonth()+1);
	        var d = "0"+obj.getDate();
	        //var h = date.getHours();
	        //console.info(h)
	        return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
	        //return y+"-"+m.substring(m.length-2,m.length);
	    },



      format(){

    		let weekDate = this.getWeekStartAndEnd(this.time)

    		return weekDate
    	},




    	        // 获取指定日期的那一周的开始、结束日期

        getWeekStartAndEnd(val) {

            let now = '';

            if(val) {

                now = new Date(val); // 日期

            } else {

                now = new Date(); // 日期

            }

            
            let nowDayOfWeek = now.getDay(); // 本周的第几天

            let nowDay = now.getDate(); // 当前日

            let nowMonth = now.getMonth(); // 当前月

            let nowYear = now.getFullYear(); // 当前年

            //console.info(nowDayOfWeek,nowDay,nowMonth,nowYear)
            



            let weekStart = this.getWeekStartDate(nowYear, nowMonth, nowDay, nowDayOfWeek)
            console.info(nowYear, nowMonth, nowDay, nowDayOfWeek)

            let weekEnd = this.getWeekEndDate(nowYear, nowMonth, nowDay, nowDayOfWeek)

            //this.weekFormat = weekStart + '~' + weekEnd

            return weekStart + '~' + weekEnd


        },

        // 获得某一周的开始日期

        getWeekStartDate(nowYear, nowMonth, nowDay, nowDayOfWeek) {

            let weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1)

            this.weekStartDate = weekStartDate

            return this.formatDate(weekStartDate)

        },

        // 获得某一周的结束日期

        getWeekEndDate(nowYear, nowMonth, nowDay, nowDayOfWeek) {

            let weekEndDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek))

            this.weekEndDate = weekEndDate

            return this.formatDate(weekEndDate)

        },


    	changestatus_group(list){
    		this.groupId = ''

    		for(let i=0;i<this.group_list.length;i++){
    			this.group_list[i].check = false
    		}

    		list.check = true
    		this.groupId = list.value
    		this.groupName = list.label
    		this.get_import_status()
    	},


    	import_weekly_data(event){

    		let obj = event.target

    		if(!obj.files){
    			return
    		}

    		let f = obj.files[0]

    		this.loading = true


    		let formData = new FormData()

    		formData.append('file',f)


            this.$http({
              url:  `hydate/import_weekly_date?start=${this.weekStartDate.getTime().toString().substr(0, 10)}&end=${this.weekEndDate.getTime().toString().substr(0, 10)}`,
              method: 'POST',
              data: formData,
              headers: {'Content-Type': 'multipart/form-data'},
              onUploadProgress (a){

              },
            }).then((res) => {
              //保存图片到数据库

              event.target.value = ''

              this.get_import_status()

              
              
              this.$message({
                message: res.msg,
                type: 'success'
              })

             this.loading = false

              
            })

    	},


    	del_weekly(){

    		let year = new Date(this.time).getFullYear()

    		let month = new Date(this.time).getMonth()

    		let day = new Date(this.time).getDate()

    		let date = new Date(year,month,day,0,0,0).getTime().toString().substr(0, 10)

    		this.$http.get(`hydate/del_weekly?time=${date}&groupId=${this.groupId}`)

    		.then((data)=>{
    			if(data.code == '200'){

    				this.get_import_status()

    			}
    		})
    		.catch(()=>{
				return this.$message({
					message:'接口报错',
					type:error
				})	
    		})
    		
    	}




  	}
}
</script>
<style>
	.is-checkeda {
	  border: 1px solid #67c23a !important;
	  color: #67c23a !important;
	}
	.el-checkbox-button, .el-checkbox-button__inner {
		margin-bottom: 4px;
	}
	.inpucus-datacenter {
	    opacity: 0;
	    background: red;
	    width: 120px;
	    height: 120px;
	    z-index: 10;
	    position: absolute;
	    left: 240px;
	    top: 0px;

	    
	}
</style>
<style scoped lang="less">
.import_data {
	height: calc(100vh - 90px);

	&-top {
		margin-bottom: 10px;
		margin-top: 16px;
		margin-left: 12px;
	}

	&-wrap {
		margin: 0 12px;
		border: 1px solid #c9c9c9;
		padding: 16px 20px;
		overflow-y: auto;

	}
}

</style>
