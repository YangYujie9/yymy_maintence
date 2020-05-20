<template>
  <div v-if="power" ref="import_data" class="import_data">
  	<div  ref="data_top" style="position: relative;" class="import_data-top">
      <el-button class="monbtn" @click="dialogVisible = true">添加供应链</el-button>
<!--   		<div style="display: inline-block;" class="el-checkbox-group">

          <label @click="changestatus(list)" v-for="list in shop_list"  class="el-checkbox-button el-checkbox-button--small">
            <span :class="{'is-checkeda': list.check}"  class="el-checkbox-button__inner">{{list.label}}</span>
          </label>
        
        </div>
        <div style="display: inline-block;" class="el-checkbox-group">

          <label @click="changestatus_group(list)" v-for="list in group_list"  class="el-checkbox-button el-checkbox-button--small">
            <span :class="{'is-checkeda': list.check}"  class="el-checkbox-button__inner">{{list.label}}</span>
          </label>
        
        </div> -->
<!--         <p>
        	<el-date-picker
	  		  style="display: inline-block;position: relative;top: 3px;"
		      v-model="time"
		      @change="get_import_status"
		      size="small"
		      type="date"
		      placeholder="选择日期"
		      :picker-options="pickerOptions">
	       </el-date-picker>
	    </p> -->
	    
<!-- 	    <el-button v-if="" @click="" style="position: absolute;bottom: 10px;right: 16px;" type="primary">删除数据</el-button> -->


	   
  	</div>
  	<div v-if="power" v-loading="loading"
    :element-loading-text="loading_text"
    element-loading-spinner="el-icon-loading"
     :style="{height: wrap_height + 'px'}" class="import_data-wrap">

		<el-card style="width: 48%; display: inline-block;margin-bottom: 10px;margin-right: 3%;" class="box-card">
		  <div slot="header" class="clearfix">
		    <span>月度数据</span>
		    <el-button v-if="import_monthly_flag" style="float: right; padding: 0px 10px" type="text" @click="del_monthly">删除</el-button>
	<!-- 	    <i class="el-icon-delete icon_delete pointer" style="float: right; padding-right: 10px;color: red;font-size: 24px;" @click=""></i> -->
		  </div>
		  <div style="display: flex" class="text item">
		  	<div style="width: 166px;padding-left: 12px;color: #adadad;font-size: 14px;border-right: 1px solid #EBEEF5">
		  		<p style="line-height: 34px;margin-top: 20px;">姓名：{{userInfo.staffName}}</p>
		  		<!-- <p style="margin-top: 36px;">{{shopId?'店铺':'部门'}}：{{shopName}}</p> -->
		  		<!-- <p style="line-height: 50px;margin-top: 36px;">时间：{{timeformat}}</p> -->
		  	</div>

		  	<div style="flex: 1">

			    <p style="text-align: center;position: relative;top:-10px;">
				    <i v-show="!import_monthly_flag" style="font-size: 120px;color: #3259ce;position: relative;" class="el-icon-upload">
				    	
				    	<input style="left:0px" type="file" @change="import_moneyly_date" class="inpucus-datacenter pointer"  />
				    </i>

<!-- 				    <i v-show="!shopId" style="font-size: 120px;color: #8a8a8a;position: relative;" class="el-icon-timer">
				    	
				    	
				    </i> -->


				    <i v-show="import_monthly_flag" style="font-size: 120px;color: #67c23a;position: relative;" class="el-icon-success">
				    </i>
				</p>




			    <p v-show="!import_monthly_flag" style="text-align: center">
			    	请上传文件
			    </p>

<!-- 			    <p v-show="!shopId" style="text-align: center">
			    	等待上传
			    </p> -->


			    <p v-show="import_monthly_flag" style="text-align: center">
			    	上传成功
			    </p>
			</div>


		  </div>
		</el-card>


    <el-dialog
      title="添加供应链"
      :visible.sync="dialogVisible"
      width="500px">
      <div style="width: 200px;margin: 0 auto">
        <el-select v-model="groupId" @change="get_group_supply"  style="text-align-last: center;">
          <el-option v-for="list in group_list"
           :key="list.value"
           :value="list.value"
           :label="list.label"></el-option>
        </el-select>
        <div style="margin-top: 10px;border: 1px solid #eee;text-align: center;">
          <ul>
            <li v-for="list in supply_list" style="height: 30px;line-height: 30px;">{{list.label}}</li>
            <li @click="adddialogVisible = true" style="height: 36px;line-height: 36px;"><i class="iconfont iconzengjia" style="color: #409EFF;cursor: pointer;font-size: 22px;"></i></li>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        
      </span>
    </el-dialog>

    <el-dialog
      title="新增供应链"
      :visible.sync="adddialogVisible"
      width="500px">
      <div style="width: 400px;margin: 0 auto">
        <span>供应链名称:</span>
        <el-input v-model="supplyName" style="width: 230px;"></el-input>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="adddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add_supply">确 定</el-button>
      </span>
    </el-dialog>






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
      	},

      	loading: false,
      	loading_text: '上传中',
      	time: new Date(new Date().getTime()-3600 * 1000 * 24),
      	//new Date([new Date().getFullYear(),new Date().getMonth()+1,new Date().getDate()-1].join('-'))
      	wrap_height: 100,
      	list: {},
      	import_monthly_flag: false,
      	get_data_from_shop_flag: false,
      	power: true,
        dialogVisible: false,
        adddialogVisible: false,
        supply_list:[],
        groupId: 1,
        supplyName:'',
        group_list: [{
          value:1,
          label:'生产一部',
        },{
          value:2,
          label:'生产二部',
        },{
          value:3,
          label:'生产三部',
        },{
          value:4,
          label:'生产四部',
        }],
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

      groupName() {
        let name = ''
        for(let i=0;i<this.group_list.length;i++) {
          if(this.group_list[i].value == this.groupId) {
            name = this.group_list[i].label
          }
        }

        return name
      }
    },
    mounted(){

	    this.$nextTick(()=>{

            this.wrap_height = this.$refs.import_data.offsetHeight - this.$refs.data_top.offsetHeight - 20

            
        })
      	
        this.get_import_status()

        this.get_group_supply()
       

    },
    methods: {

    	get_import_status(){

    		let year = new Date(this.time).getFullYear()

    		let month = new Date(this.time).getMonth()

    		let day = new Date(this.time).getDate()

    		let date = new Date(year,month,day,0,0,0).getTime().toString().substr(0, 10)

    		this.$http.post(`hydate/get_import_status`,{
    			tableName:'月数据统计',
    			time:date

    		})

    		.then((data)=>{
    			if(data.code == '200'){

    				this.import_monthly_flag = false

    				if(data.data) {
    					this.import_monthly_flag = true
    				}



    				


    			} else {
    				return this.$message({
    					message:data.msg,
    					type:error
    				})
    			}
    		})
    		.catch(()=>{
				return this.$message({
					message:'接口报错',
					type:error
				})	
    		})
    	},



    	import_moneyly_date(event){

    		let obj = event.target
    		if(!obj.files) {
    			return
    		}

    		let f = obj.files[0]
    		this.loading = true

    	 //    let year = new Date(this.time).getFullYear()

    		// let month = new Date(this.time).getMonth()

    		// let day = new Date(this.time).getDate()

    		// let date = new Date(year,month,day,0,0,0).getTime().toString().substr(0, 10)

    		let formData = new FormData()

    		formData.append('file',f)




            this.$http({
              url:  `hydate/import_moneyly_date?`,
              method: 'POST',
              data: formData,
              headers: {'Content-Type': 'multipart/form-data'},
              onUploadProgress (a){

              },
            })
            .then((res) => {
              //保存图片到数据库

              event.target.value = ''
              this.get_import_status()


              
              
              this.$message({
                message: res.msg,
                type: 'success'
              })

             this.loading = false

              
            })
    		.catch(()=>{
				return this.$message({
					message:'接口报错',
					type:error
				})	
    		})

    	},


      get_group_supply(){



            this.$http.post(`hydate/get_group_supply`,{
              groupId: this.groupId
            })


            .then((data)=>{
              if(data.code == '200'){

                let arr = []


                //arr.push({value:'',label:'合计'})



                for(let i=0;i<data.data[0].list.length;i++) {
                  arr.push({
                    value: data.data[0].list[i].supplyId,
                    label: data.data[0].list[i].supplyName,
                  })
                }
                

     
                this.supply_list = arr

                //console.info(this.supply_list)

                


              } else {
                return this.$message({
                  message:data.msg,
                  type:'error'
                })
              }
            })
            .catch(()=>{
              return this.$message({
                message:'接口报错',
                type:'error'
              })  
            })
       

      },



    	del_monthly(){


    	    let year = new Date(this.time).getFullYear()

    		let month = new Date(this.time).getMonth()

    		let day = new Date(this.time).getDate()

    		let date = new Date(year,month,day,0,0,0).getTime().toString().substr(0, 10)

    		this.$http.get(`hydate/del_moneyLy?time=${date}`)

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

    	},


      add_supply() {


        this.$http.post(`/hydate/add_supply`,{
          supplyName: this.supplyName,
          groupId: this.groupId,
          groupName: this.groupName
        })
        .then((data)=>{
          if(data.code == '200'){

            this.supplyName = ''
            this.get_group_supply()

            this.$message({
              message:'新增成功',
              type:'success'
            })  

          }
        })
        .catch(()=>{
          return this.$message({
            message:'接口报错',
            type:'error'
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


  .monbtn{
    position: absolute;
    right: 20px;
    //width:180px;
    background-color: rgb(140, 206, 173);
    color: #fff; 
  }

	&-top {
		margin-bottom: 10px;
		margin-top: 16px;
		margin-left: 12px;
    position: relative;
    height: 40px;



	}

	&-wrap {
		margin: 0 12px;
		border: 1px solid #c9c9c9;
		padding: 16px 20px;
		overflow-y: auto;

	}
}

</style>
