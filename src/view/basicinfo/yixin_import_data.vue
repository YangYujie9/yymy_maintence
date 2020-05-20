<template>
  <div v-if="power" ref="import_data" class="import_data">
  	<div  ref="data_top" style="position: relative;" class="import_data-top">
  		<div style="display: inline-block;" class="el-checkbox-group">

          <label @click="changestatus(list)" v-for="list in tableData"  class="el-checkbox-button el-checkbox-button--small">
            <span :class="{'is-checkeda': list.check}"  class="el-checkbox-button__inner">{{list.shopName}}</span>
          </label>
        
        </div>
        <p>
        	<el-date-picker
	  		  style="display: inline-block;position: relative;top: 3px;"
		      v-model="time"
		      @change="get_import_status"
		      size="small"
		      type="date"
		      placeholder="选择日期"
		      :picker-options="pickerOptions">
	       </el-date-picker>
	    </p>
	    
	    <el-button v-if="import_inventory_magic_flag && deletedataflag" @click="delete_import_data" style="position: absolute;bottom: 10px;right: 16px;" type="primary">删除数据</el-button>


	   
  	</div>
  	<div v-if="power" v-loading="loading" 
    :element-loading-text="loading_text"
    element-loading-spinner="el-icon-loading"
     :style="{height: wrap_height + 'px'}" class="import_data-wrap">
  		<el-card style="width: 48%; display: inline-block;margin-right: 3%;margin-bottom: 10px" class="box-card">
		  <div slot="header" class="clearfix">
		    <span>魔镜</span>
		  </div>
		  
		  <div style="display: flex" class="text item">
		  	<div style="width: 166px;padding-left: 12px;color: #adadad;font-size: 14px;border-right: 1px solid #EBEEF5">
		  		<p style="line-height: 34px;">姓名：{{userInfo.staffName}}</p>
		  		<p style="margin-top: 36px;">店铺：{{list.shopName}}</p>
		  		<p style="line-height: 50px;">时间：{{timeformat}}</p>
		  	</div>

		  	<div style="flex: 1">
			    <p style="text-align: center;position: relative;top:-10px;">
			    	<i v-show="!import_inventory_magic_flag && !import_business_staff_flag" style="font-size: 120px;color: #3259ce;position: relative;" class="el-icon-upload">
			    	
				    	<input style="left:0px" type="file" @change="importf" class="inpucus-datacenter-a pointer"  />
				    </i>
				    <i v-show="import_inventory_magic_flag && !import_business_staff_flag" style="font-size: 120px;color: #67c23a;position: relative;" class="el-icon-success">
				    	<input style="left:0px" type="file" @change="importf" class="inpucus-datacenter-a pointer"  />
			    	</i>
			    	<i v-show="import_inventory_magic_flag && import_business_staff_flag" style="font-size: 120px;color: #67c23a;position: relative;" class="el-icon-success">
			    		<input style="left:0px" type="file" @change="importf" class="inpucus-datacenter-a pointer"  />
			    	</i>
				</p>
			    <p v-show="!import_inventory_magic_flag && !import_business_staff_flag" style="text-align: center">
		    	请上传文件
			    </p>

			    <p v-show="import_inventory_magic_flag && !import_business_staff_flag" style="text-align: center">
			    	上传成功
			    </p>

			    <p v-show="import_inventory_magic_flag && import_business_staff_flag" style="text-align: center">
			    	上传成功
			    </p>
			</div>


		  </div>
		</el-card>
		<el-card style="width: 48%; display: inline-block;margin-bottom: 10px" class="box-card">
		  <div slot="header" class="clearfix">
		    <span>生意参谋</span>
		  </div>
		  <div style="display: flex" class="text item">
		  	<div style="width: 166px;padding-left: 12px;color: #adadad;font-size: 14px;border-right: 1px solid #EBEEF5">
		  		<p style="line-height: 34px;">姓名：{{userInfo.staffName}}</p>
		  		<p style="margin-top: 36px;">店铺：{{list.shopName}}</p>
		  		<p style="line-height: 50px;">时间：{{timeformat}}</p>
		  	</div>

		  	<div style="flex: 1">

			    <p style="text-align: center;position: relative;top:-10px;">
				    <i v-show="!import_business_staff_flag && import_inventory_magic_flag" style="font-size: 120px;color: #3259ce;position: relative;" class="el-icon-upload">
				    	
				    	<input style="left:0px" type="file" @change="import_business" class="inpucus-datacenter-a pointer"  />
				    </i>

				    <i v-show="!import_through_train_flag && !import_inventory_magic_flag" style="font-size: 120px;color: #8a8a8a;position: relative;" class="el-icon-timer">
				    	
				    	
				    </i>

				    <i v-show="import_business_staff_flag" style="font-size: 120px;color: #67c23a;position: relative;" class="el-icon-success">
				    </i>
				</p>


			    <p v-show="!import_business_staff_flag && import_inventory_magic_flag" style="text-align: center">
			    	请上传文件
			    </p>

			    <p v-show="!import_through_train_flag && !import_inventory_magic_flag" style="text-align: center">
			    	等待上传
			    </p>

			    <p v-show="import_business_staff_flag" style="text-align: center">
			    	上传成功
			    </p>
			</div>


		  </div>
		</el-card>

  		<el-card style="width: 48%; display: inline-block;margin-right: 3%;margin-bottom: 10px" class="box-card">
		  <div slot="header" class="clearfix">
		    <span>直通车</span>
		  </div>
		  <div style="display: flex" class="text item">
		  	<div style="width: 166px;padding-left: 12px;color: #adadad;font-size: 14px;border-right: 1px solid #EBEEF5">
		  		<p style="line-height: 34px;">姓名：{{userInfo.staffName}}</p>
		  		<p style="margin-top: 36px;">店铺：{{list.shopName}}</p>
		  		<p style="line-height: 50px;">时间：{{timeformat}}</p>
		  	</div>

		  	<div style="flex: 1">
			  	<p style="text-align: center;position: relative;top:-10px;">
				    <i v-show="!import_through_train_flag && import_business_staff_flag" style="font-size: 120px;color: #3259ce;position: relative;" class="el-icon-upload">
				    	
				    	<input style="left:0px" type="file" @change="import_through" class="inpucus-datacenter-a pointer"  />
				    </i>

				    <i v-show="!import_through_train_flag && !import_business_staff_flag" style="font-size: 120px;color: #8a8a8a;position: relative;" class="el-icon-timer">
				    	
				    	
				    </i>


				    <i v-show="import_through_train_flag" style="font-size: 120px;color: #67c23a;position: relative;" class="el-icon-success">
				    </i>
				</p>

				
			    <p v-show="!import_through_train_flag && import_business_staff_flag" style="text-align: center">
			    	请上传文件
			    </p>
			    <p v-show="!import_through_train_flag && !import_business_staff_flag" style="text-align: center">
			    	等待上传
			    </p>

			    <p v-show="import_through_train_flag" style="text-align: center">
			    	上传成功
			    </p>
			</div>

		    

		  </div>
		</el-card>

		<el-card style="width: 48%; display: inline-block;margin-bottom: 10px" class="box-card">
		  <div slot="header" style="position: relative;" class="clearfix">
		    <span>商品维度</span>
		    <a href="https://yy-data.oss-cn-beijing.aliyuncs.com/%E5%95%86%E5%93%81%E7%BB%B4%E5%BA%A6%E5%AF%BC%E5%85%A5%E6%A8%A1%E7%89%88-2019_9_27.xlsx" style="position: absolute;right: 0px;">下载模版</a>
		  </div>
		  <div style="display: flex" class="text item">
		  	<div style="width: 166px;padding-left: 12px;color: #adadad;font-size: 14px;border-right: 1px solid #EBEEF5">
		  		<p style="line-height: 34px;">姓名：{{userInfo.staffName}}</p>
		  		<p style="margin-top: 36px;">店铺：{{list.shopName}}</p>
		  		<p style="line-height: 50px;">时间：{{timeformat}}</p>
		  	</div>

		  	<div style="flex: 1">
			    <p style="text-align: center;position: relative;top:-10px;">
				    <i v-show="!get_data_from_ware_id_flag && import_business_staff_flag" style="font-size: 120px;color: #3259ce;position: relative;" class="el-icon-upload">
				    	
				    	<input style="left:0px" type="file" @change="import_get_data_from_ware_id" class="inpucus-datacenter-a pointer"  />
				    </i>

				    <i v-show="!get_data_from_ware_id_flag && !import_business_staff_flag" style="font-size: 120px;color: #8a8a8a;position: relative;" class="el-icon-timer">
				    	
				    	
				    </i>


				    <i v-show="get_data_from_ware_id_flag" style="font-size: 120px;color: #67c23a;position: relative;" class="el-icon-success">
				    	<input style="left:0px" type="file" @change="import_get_data_from_ware_id" class="inpucus-datacenter-a pointer"  />
				    </i>
				</p>
			    <p v-show="!get_data_from_ware_id_flag && import_business_staff_flag" style="text-align: center">
			    	请上传文件
			    </p>

			    <p v-show="!get_data_from_ware_id_flag && !import_business_staff_flag" style="text-align: center">
			    	等待上传
			    </p>


			    <p v-show="get_data_from_ware_id_flag" style="text-align: center">
			    	上传成功
			    </p>
			</div>


		  </div>
		</el-card>


		<el-card style="width: 48%; display: inline-block;margin-right: 3%;margin-bottom: 10px" class="box-card">
		  <div slot="header" style="position: relative;" class="clearfix">
		    <span>店铺维度</span>
		    <a href="https://yy-data.oss-cn-beijing.aliyuncs.com/%E5%BA%97%E9%93%BA%E7%BB%B4%E5%BA%A6%E5%AF%BC%E5%85%A5%E6%A8%A1%E7%89%88_2019_9_27.xlsx" style="position: absolute;right: 0px;">下载模版</a>
		  </div>
		  <div style="display: flex" class="text item">
		  	<div style="width: 166px;padding-left: 12px;color: #adadad;font-size: 14px;border-right: 1px solid #EBEEF5">
		  		<p style="line-height: 34px;">姓名：{{userInfo.staffName}}</p>
		  		<p style="margin-top: 36px;">店铺：{{list.shopName}}</p>
		  		<p style="line-height: 50px;">时间：{{timeformat}}</p>
		  	</div>
		  	<div style="flex: 1">
			  	<p style="text-align: center;position: relative;top:-10px;">
				    <i v-show="!get_data_from_shop_flag && import_business_staff_flag" style="font-size: 120px;color: #3259ce;position: relative;" class="el-icon-upload">
				    	
				    	<input style="left:0px" type="file" @change="import_data_from_shop" class="inpucus-datacenter-a pointer"  />
				    </i>

				    <i v-show="!get_data_from_shop_flag && !import_business_staff_flag" style="font-size: 120px;color: #8a8a8a;position: relative;" class="el-icon-timer">
				    	
				    	
				    </i>


				    <i v-show="get_data_from_shop_flag" style="font-size: 120px;color: #67c23a;position: relative;" class="el-icon-success">
				    	<input style="left:0px" type="file" @change="import_data_from_shop" class="inpucus-datacenter-a pointer"  />

				    </i>
				</p>

				
			    <p v-show="!get_data_from_shop_flag && import_business_staff_flag" style="text-align: center">
			    	请上传文件
			    </p>
			    <p v-show="!get_data_from_shop_flag && !import_business_staff_flag" style="text-align: center">
			    	等待上传
			    </p>

			    <p v-show="get_data_from_shop_flag" style="text-align: center">
			    	上传成功
			    </p>
			</div>


		  	


		  </div>
		</el-card>


		


		<el-card style="width: 48%; display: inline-block;margin-bottom: 10px;" class="box-card">
		  <div style="position: relative;" slot="header" class="clearfix">
		    <span>上新表</span>
		    <!--<a href="http://hzyymy.cn/hunting/%E4%B8%8A%E6%96%B0%E8%A1%A8%E5%AF%BC%E5%85%A5%E6%A8%A1%E7%89%88.xlsx" style="position: absolute;right: 0px;">下载模版</a>-->
		  </div>
		  <div style="display: flex" class="text item">
		  	<div style="width: 166px;padding-left: 12px;color: #adadad;font-size: 14px;border-right: 1px solid #EBEEF5">
		  		<p style="line-height: 34px;">姓名：{{userInfo.staffName}}</p>
		  		<p style="margin-top: 36px;">店铺：{{list.shopName}}</p>
		  		<p style="line-height: 50px;">时间：{{timeformat}}</p>
		  	</div>

		  	<div style="flex: 1">
			    <p style="text-align: center;position: relative;top:-10px;">
				    <i style="font-size: 120px;color: #3259ce;position: relative;" class="el-icon-upload">
				    	
				    	<input style="left:0px" type="file" @change="update_ware" class="inpucus-datacenter-a pointer"  />
				    </i>

				   
				</p>
			    <p style="text-align: center">
			    	请上传文件
			    </p>

			    
			</div>


		  </div>
		</el-card>

		<el-card style="width: 48%; display: inline-block;margin-bottom: 10px;margin-right: 3%;" class="box-card">
		  <div style="position: relative;" slot="header" class="clearfix">
		    <span>退货率</span>
		    <!--<a href="http://hzyymy.cn/hunting/%E9%80%80%E8%B4%A7%E7%8E%87%E5%AF%BC%E5%85%A5%E6%A8%A1%E7%89%88.xlsx" style="position: absolute;right: 0px;">下载模版</a>-->
		  </div>
		  <div style="display: flex" class="text item">
		  	<div style="width: 166px;padding-left: 12px;color: #adadad;font-size: 14px;border-right: 1px solid #EBEEF5">
		  		<p style="line-height: 34px;">姓名：{{userInfo.staffName}}</p>
		  		<p style="margin-top: 36px;">店铺：{{list.shopName}}</p>
		  		<p style="line-height: 50px;">时间：{{timeformat}}</p>
		  	</div>

		  	<div style="flex: 1">
			    <p style="text-align: center;position: relative;top:-10px;">
				    <i style="font-size: 120px;color: #3259ce;position: relative;" class="el-icon-upload">
				    	
				    	<input style="left:0px" type="file" @change="refund_rate" class="inpucus-datacenter-a pointer"  />
				    </i>

				   
				</p>
			    <p style="text-align: center">
			    	请上传文件
			    </p>

			    
			</div>


		  </div>
		</el-card>

		<el-card style="width: 48%; display: inline-block;margin-bottom: 10px;" class="box-card">
		  <div slot="header" style="position: relative;" class="clearfix">
		    <span>超级推荐</span>
		    <el-button v-show="!import_super_recommend_flag" type="primary" size="mini" style="position: absolute;right: 0px;" @click="deal_error">未知错误处理</el-button>
		  </div>
		  <div style="display: flex" class="text item">
		  	<div style="width: 166px;padding-left: 12px;color: #adadad;font-size: 14px;border-right: 1px solid #EBEEF5">
		  		<p style="line-height: 34px;">姓名：{{userInfo.staffName}}</p>
		  		<p style="margin-top: 36px;">店铺：{{list.shopName}}</p>
		  		<p style="line-height: 50px;">时间：{{timeformat}}</p>
		  	</div>

		  	<div style="flex: 1">
			    <p style="text-align: center;position: relative;top:-10px;">
				    <i v-show="!import_super_recommend_flag && import_business_staff_flag" style="font-size: 120px;color: #3259ce;position: relative;" class="el-icon-upload">
				    	
				    	<input style="left:0px" type="file" @change="import_super_recommend" class="inpucus-datacenter-a pointer"  />
				    </i>

				    <i v-show="!import_super_recommend_flag && !import_business_staff_flag" style="font-size: 120px;color: #8a8a8a;position: relative;" class="el-icon-timer">
				    	
				    	
				    </i>


				    <i v-show="import_super_recommend_flag" style="font-size: 120px;color: #67c23a;position: relative;" class="el-icon-success">

				    </i>
				</p>
			    <p v-show="!import_super_recommend_flag && import_business_staff_flag" style="text-align: center">
			    	请上传文件
			    </p>

			    <p v-show="!import_super_recommend_flag && !import_business_staff_flag" style="text-align: center">
			    	等待上传
			    </p>


			    <p v-show="import_super_recommend_flag" style="text-align: center">
			    	上传成功
			    </p>
			</div>


		  </div> 
		</el-card>


		<el-card style="width: 48%; display: inline-block;margin-bottom: 10px;margin-right: 3%;" class="box-card">
		  <div style="position: relative;" slot="header" class="clearfix">
		    <span>图片上传</span>
		    
		  </div>
		  <div style="display: flex" class="text item">
		  	<div style="width: 166px;padding-left: 12px;color: #adadad;font-size: 14px;border-right: 1px solid #EBEEF5">
		  		<p style="line-height: 34px;">姓名：{{userInfo.staffName}}</p>
		  		<p style="margin-top: 36px;">店铺：{{list.shopName}}</p>
		  		<p style="line-height: 50px;">时间：{{timeformat}}</p>
		  	</div>

		  	<div style="flex: 1">
			    <p style="text-align: center;position: relative;top:-10px;">
				    <i @click="ywpicupload.dialogVisible = true" style="font-size: 120px;color: #3259ce;position: relative;" class="el-icon-upload">
				    	
				    	
				    </i>

				   
				</p>
			    <p style="text-align: center">
			    	请上传图片
			    </p>

			    
			</div>


		  </div>
		</el-card>


		


  	</div>


  	<el-dialog
          title="业务图片上传"
          :visible.sync="ywpicupload.dialogVisible"
          width="700px"

          :close-on-click-modal="false"
          >
          <div  style="position: relative;" slot="title">
            业务图片上传
            
            <el-upload
              style="display: inline-block;position: absolute;right: 40px;top: -6px;"
              class="upload-demo"
              :http-request="ywuploadpicture"
              multiple

              :limit="1000"
              action="http://upload-z2.qiniup.com/"
              >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>



          </div>
          <div class="filethird_body" style="hight: 500px;overflow: scroll;">
            <p  v-for="(list,index) in ywpicupload.filelist">
              

<!--               <img  @dblclick="openBigImg(`http://yy-data.oss-cn-beijing.aliyuncs.com/${list.filePath}`)" style="width: 50px;" :src="`http://yy-data.oss-cn-beijing.aliyuncs.com/${list.filePath}`"/> -->
              <i class="el-icon-circle-check" style="font-size: 36px;color: #4caf50"></i>

              <br/>

              <span style="color: #1890ff">{{list.fileName}}</span>
              

<!--               <a :download="`${list.fileName}`" target="_blank" :href="`http://yy-data.oss-cn-beijing.aliyuncs.com/${list.filePath}`" >{{list.fileName}}</a> -->
              
            </p>
            
            
          </div>
          
        </el-dialog>
  </div>
</template>

<script>
import XLSX from 'xlsx'
  import { mapGetters } from 'vuex'

export default {
	data(){
      return{
      	ywpicupload: {
          dialogVisible: false,
          filelist: []
        },
      	njsubmit: {
      		payment: '',
      		payQty: ''
      	},
      	pickerOptions:{
      		disabledDate(time) {
             return time.getTime() > Date.now() - 24*60*60*1000;
          },
      	},
      	
      	loading: false,
      	loading_text: '上传中',
      	time: new Date(new Date().getTime()-3600 * 1000 * 24),
      	//
      	shopvalue: '', 
      	wrap_height: 100,
      	tableData: [],
      	list: {},
      	get_data_from_shop_edit: false,
      	import_business_staff_flag: true,
      	import_through_train_flag: false,
      	import_inventory_magic_flag: true,
      	get_data_from_shop_flag: false,
      	get_data_from_ware_id_flag: false,
      	import_update_ware_flag: false,
      	import_super_recommend_flag: false,
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
      	
        this.shop_show()

    },
    methods: {
    	async ywuploadpicture(filestatus,type) { 
        	console.info(filestatus)

        

        	let wareId = filestatus.file.name.split('.')[0]



          
          

	          let newfile = filestatus.file
	          console.info(newfile)

	          filestatus.newfile = newfile

	          filestatus.progressa = 0

	          filestatus.status = false

	          const formData = new FormData()
	          //formData.append('token', token)
	          formData.append('file', newfile)
	          


          let that = this
            this.$maintancehttp({
              url: 'file/yx_submit_ware_pic',
              method: 'post',
              data: formData,
              headers: {'Content-Type': 'multipart/form-data'},
              onUploadProgress (a){
                
              },
            })
        

          
            .then((res) => {
              //保存图片到数据库
              
              	that.ywpicupload.filelist.push({
               		fileName: wareId,
            	})



              
              
              
            })
        },
    	edit_nj_sell_report() {
    		let year = new Date(this.time).getFullYear()

    		let month = new Date(this.time).getMonth()

    		let day = new Date(this.time).getDate()

    		let date = new Date(year,month,day,0,0,0).getTime().toString().substr(0, 10)

    		this.$http.post('yx_import/edit_nj_sell_report',{
                shopId: this.list.id,
                date: date,
                payment: this.njsubmit.payment,
                payQty: this.njsubmit.payQty,

              })
             .then((data)=>{
                this.$message({
                  message: data.msg,
                  type: 'info'
                })

                this.get_data_from_shop_edit = false

                

                  
              })
             .catch(()=>{
	            this.$message({
	              message: '接口报错',
	              type: 'error'
	            })
	       	})
    	},
    	delete_import_data() {

    		let that = this

    		let year = new Date(this.time).getFullYear()

    		let month = new Date(this.time).getMonth()

    		let day = new Date(this.time).getDate()



    		this.$confirm(`确认删除${year}-${month}-${day}导入${this.list.shopName}店铺的数据?`)
          		.then(_ => {
		            that.delete_import_data_true()
		          })
		        .catch(_ => {});

    		
    	},
    	delete_import_data_true() {
    		

    		let year = new Date(this.time).getFullYear()

    		let month = new Date(this.time).getMonth()

    		let day = new Date(this.time).getDate()

    		let date = new Date(year,month,day,0,0,0).getTime().toString().substr(0, 10)




    		this.$http.post(`yx_import/delete_import_data`,{
                shopId: this.list.id,
                time: date
              })
            .then((data)=>{
                this.$message({
                  message: data.msg,
                  type: 'info'
                })

                this.get_import_status()

                

                  
              })
            .catch(()=>{
	            this.$message({
	              message: '接口报错',
	              type: 'error'
	            })
	       	})
    	},

    	refund_rate(event) {
    		let obj = event.target
	        if (!obj.files) {
	            return;
	        }

	        let that = this

	        that.loading = true
	        that.loading_text = '退货率解析中'



	        let a = new Date().getTime()

	        var wb;//读取完成的数据
	        var rABS = false; //是否将文件读取为二进制字符串
	        var f = obj.files[0];
	        var reader = new FileReader();
	        reader.onload = function (e) {
	            var data = e.target.result;
	            if (rABS) {
	                wb = XLSX.read(btoa(that.fixdata(data)), {//手动转化
	                    type: 'base64'
	                });
	            } else {
	                wb = XLSX.read(data, {
	                    type: 'binary'
	                });
	            }


	            let arr = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])

	            let arr1 = []

	            //console.info(arr)

	            for (let i=0; i<arr.length;i++) {
                    arr1[i]={}
                    let j=0
                    for(var key in arr[i]) {
                        arr1[i]['h'+j] = arr[i][key]
                        j++
                    }
                }

	            console.info((new Date().getTime()-a)/1000)




	            //console.info(arr1)
	            that.import_refund_rate(arr1)

	            event.target.value = ''

	            //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
	            //wb.Sheets[Sheet名]获取第一个Sheet的数据
	            //document.getElementById("demo").innerHTML = JSON.stringify(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
	        };
	        if (rABS) {
	            reader.readAsArrayBuffer(f);
	        } else {
	            reader.readAsBinaryString(f);
	        }
    	},

    	import_refund_rate(data) {
    		this.loading_text = '退货率上传中'
    		console.info(this.time)

    		let year = new Date(this.time).getFullYear()

    		let month = new Date(this.time).getMonth()

    		let day = new Date(this.time).getDate()

    		let date = new Date(year,month,day,0,0,0).getTime().toString().substr(0, 10)




    		this.$http.post('yx_import/import_refund_rate',{
                data: data,
                shopId: this.list.id,
                //time: date
              })
             .then((data)=>{
                this.$message({
                  message: data.msg,
                  type: 'info'
                })

                this.get_import_status()

                this.loading = false
	        	this.loading_text = '退货率导入中'

                  
              })
             .catch(()=>{
	            this.$message({
	              message: '接口报错',
	              type: 'error'
	            })
	       	})
    	},
    	update_ware(event) {
    		let obj = event.target
	        if (!obj.files) {
	            return;
	        }

	        let that = this

	        that.loading = true
	        that.loading_text = '上新表解析中'



	        let a = new Date().getTime()

	        var wb;//读取完成的数据
	        var rABS = false; //是否将文件读取为二进制字符串
	        var f = obj.files[0];
	        var reader = new FileReader();
	        reader.onload = function (e) {
	            var data = e.target.result;

	            if (rABS) {
	                wb = XLSX.read(btoa(that.fixdata(data)), {//手动转化
	                    type: 'base64'
	                });
	            } else {
	                wb = XLSX.read(data, {
	                    type: 'binary'
	                });
	            }



	            let arr = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])

	            let arr1 = []

	            //console.info(arr)

	            for (let i=0; i<arr.length;i++) {
                    arr1[i]={}
                    let j=0
                    for(var key in arr[i]) {
                        arr1[i]['h'+j] = arr[i][key]
                        j++
                    }
                }

	            console.info((new Date().getTime()-a)/1000)




	            //console.info(arr1)
	            that.import_update_ware(arr1)

	            event.target.value = ''

	            //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
	            //wb.Sheets[Sheet名]获取第一个Sheet的数据
	            //document.getElementById("demo").innerHTML = JSON.stringify(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
	        };
	        if (rABS) {
	            reader.readAsArrayBuffer(f);
	        } else {
	            reader.readAsBinaryString(f);
	        }
    	},

    	import_update_ware(data) {
    		this.loading_text = '上新表上传中'
    		//console.info(this.time)

    		let year = new Date(this.time).getFullYear()

    		let month = new Date(this.time).getMonth()

    		let day = new Date(this.time).getDate()

    		let date = new Date(year,month,day,0,0,0).getTime().toString().substr(0, 10)




    		this.$http.post('import/import_update_ware',{
                data: data,
                shopId: this.list.id,
                type: 1
                //time: date
              })
             .then((data)=>{
                this.$message({
                  message: data.msg,
                  type: 'info'
                })

                this.get_import_status()

                this.loading = false
	        	this.loading_text = '上新表导入中'

                  
              })
             .catch(()=>{
	            this.$message({
	              message: '接口报错',
	              type: 'error'
	            })
	       	})
    	},
    	import_through(event) {
    		let obj = event.target
	        if (!obj.files) {
	            return;
	        }

	        let that = this

	        console.info(this.time)

    		let year = new Date(this.time).getFullYear()

    		let month = new Date(this.time).getMonth()

    		let day = new Date(this.time).getDate()

    		let date = new Date(year,month,day,0,0,0).getTime().toString().substr(0, 10)


	        that.loading = true
	        that.loading_text = '直通车解析中'
	        var f = obj.files[0]
	        const formData = new FormData()
	        formData.append('file', f)

	            this.$http({
	              url:  `import/import_through_train?shopId=${this.list.id}&time=${date}&type=1`,
	              method: 'POST',
	              data: formData,
	              headers: {'Content-Type': 'multipart/form-data'},
	              onUploadProgress (a){

	              },
	            }).then((res) => {
	              //保存图片到数据库

	              event.target.value = ''

	              
	              
	              this.$message({
	                message: res.msg,
	                type: 'success'
	              })

	             that.loading = false
	        	that.loading_text = '直通车解析中'

	        	this.get_import_status()
	              
	              //this.savereource(res)
	            })




    	},


    	import_super_recommend(event) {
    		let obj = event.target
	        if (!obj.files) {
	            return;
	        }

	        let that = this

	        //console.info(this.time)

    		let year = new Date(this.time).getFullYear()

    		let month = new Date(this.time).getMonth()

    		let day = new Date(this.time).getDate()

    		let date = new Date(year,month,day,0,0,0).getTime().toString().substr(0, 10)


	        that.loading = true
	        that.loading_text = '超级推荐上传中'
	        var f = obj.files[0]
	        const formData = new FormData()
	        formData.append('file', f)

	            this.$http({
	              url: `import/import_super_recommend?shopId=${this.list.id}&time=${date}&type=1`,
	              method: 'POST',
	              data: formData,
	              headers: {'Content-Type': 'multipart/form-data'},
	              onUploadProgress (a){

	              },
	            }).then((res) => {
	              //保存图片到数据库

	              event.target.value = ''

	              
	              
	              this.$message({
	                message: res.msg,
	                type: 'success'
	              })

	             that.loading = false
	        	//that.loading_text = '直通车解析中'

	        	this.get_import_status()
	              
	              //this.savereource(res)
	            })




    	},


    	import_get_data_from_ware_id() {
    		let obj = event.target
	        if (!obj.files) {
	            return;
	        }

	        let that = this

	        that.loading = true
	        that.loading_text = '生意参谋解析中'



	        let a = new Date().getTime()

	        var wb;//读取完成的数据
	        var rABS = false; //是否将文件读取为二进制字符串
	        var f = obj.files[0];
	        var reader = new FileReader();
	        reader.onload = function (e) {
	            var data = e.target.result;
	            if (rABS) {
	                wb = XLSX.read(btoa(that.fixdata(data)), {//手动转化
	                    type: 'base64'
	                });
	            } else {
	                wb = XLSX.read(data, {
	                    type: 'binary'
	                });
	            }


	            let arr = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])

	            let arr1 = []

	            //console.info(arr)

	            for (let i=0; i<arr.length;i++) {
	                    arr1[i] = {
	                    	h1: '', 
	                    	h2: '',
	                    	h3: '',
	                    	h4: '',
	                    	h5: '',
	                    	h6: '',
	                    	h7: '',
	                    	h8: '',
	                    	h9: '',
	                    	h10: '',
	                    }
	                    
	                    for(var key in arr[i]) {



	                        if (key == '商品id') {
	                            arr1[i]['h1'] = arr[i][key]
	                        }

	                        if (key == '同款链接') {
	                            arr1[i]['h2'] = arr[i][key]
	                        }
	                        if (key == '开车价') {
	                            arr1[i]['h3'] = arr[i][key]
	                        }
	                        if (key == '预测花费') {
	                            arr1[i]['h4'] = arr[i][key]
	                        }
	                        if (key == '淘金币') {
	                            arr1[i]['h5'] = arr[i][key]
	                        }
	                        if (key == '手淘搜索UV') {
	                            arr1[i]['h6'] = arr[i][key]
	                        }
	                        if (key == '手淘首页UV') {
	                            arr1[i]['h7'] = arr[i][key]
	                        }
	                        if (key == '福利笔数') {
	                            arr1[i]['h8'] = arr[i][key]
	                        }
	                        if (key == '福利件数') {
	                            arr1[i]['h9'] = arr[i][key]
	                        }
	                        if (key == '福利金额') {
	                            arr1[i]['h10'] = arr[i][key]
	                        }
	                        
	                        
	                    }

	                   
	                
	            }

	            console.info((new Date().getTime()-a)/1000)




	            //console.info(arr1)
	            that.get_data_from_ware_id(arr1)

	            event.target.value = ''


	            console.info(arr1)

	            //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
	            //wb.Sheets[Sheet名]获取第一个Sheet的数据
	            //document.getElementById("demo").innerHTML = JSON.stringify(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
	        };
	        if (rABS) {
	            reader.readAsArrayBuffer(f);
	        } else {
	            reader.readAsBinaryString(f);
	        }
    	},
    	get_data_from_ware_id(data) {
    		this.loading_text = '商品维度数据上传中'
    		console.info(this.time)

    		let year = new Date(this.time).getFullYear()

    		let month = new Date(this.time).getMonth()

    		let day = new Date(this.time).getDate()

    		let date = new Date(year,month,day,0,0,0).getTime().toString().substr(0, 10)


    		this.$http.post('import/get_data_from_ware_id',{
                data: data,
                shopId: this.list.id,
                time: date,
                type: 1
              })
             .then((data)=>{
                this.$message({
                  message: data.msg,
                  type: 'info'
                })

                this.get_import_status()

                this.loading = false
	        	this.loading_text = '商品维度导入中'

                  
              })
             .catch(()=>{
	            this.$message({
	              message: '接口报错',
	              type: 'error'
	            })
	       	})
    	},
    	import_business(event) {
    		let obj = event.target
	        if (!obj.files) {
	            return;
	        }

	        let that = this

	        that.loading = true
	        that.loading_text = '生意参谋解析中'



	        let a = new Date().getTime()

	        var wb;//读取完成的数据
	        var rABS = false; //是否将文件读取为二进制字符串
	        var f = obj.files[0];
	        var reader = new FileReader();
	        reader.onload = function (e) {
	            var data = e.target.result;
	            if (rABS) {
	                wb = XLSX.read(btoa(that.fixdata(data)), {//手动转化
	                    type: 'base64'
	                });
	            } else {
	                wb = XLSX.read(data, {
	                    type: 'binary'
	                });
	            }


	            let arr = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])

	            let arr1 = []

	            //console.info(arr)

	            for (let i=0; i<arr.length;i++) {
                    arr1[i]={}
                    let j=1
                    for(var key in arr[i]) {
                        arr1[i]['h'+j] = arr[i][key]
                        j++
                    }
                }

	            console.info((new Date().getTime()-a)/1000)




	            //console.info(arr1)
	            that.import_business_staff(arr1)

	            event.target.value = ''

	            //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
	            //wb.Sheets[Sheet名]获取第一个Sheet的数据
	            //document.getElementById("demo").innerHTML = JSON.stringify(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
	        };
	        if (rABS) {
	            reader.readAsArrayBuffer(f);
	        } else {
	            reader.readAsBinaryString(f);
	        }
    	},

    	import_business_staff(data) {
    		this.loading_text = '生意参谋上传中'
    		console.info(this.time)

    		let year = new Date(this.time).getFullYear()

    		let month = new Date(this.time).getMonth()

    		let day = new Date(this.time).getDate()

    		let date = new Date(year,month,day,0,0,0).getTime().toString().substr(0, 10)




    		this.$http.post('import/import_business_staff',{
                data: data,
                shopId: this.list.id,
                time: date,
                type: 1
              })
             .then((data)=>{
                this.$message({
                  message: data.msg,
                  type: 'info'
                })

                this.get_import_status()

                this.loading = false
	        	this.loading_text = '生意参谋导入中'

                  
              })
             .catch(()=>{
	            this.$message({
	              message: '接口报错',
	              type: 'error'
	            })
	       	})
    	},
    	shop_show() {
    		this.$http.get(`yx_shop/show_shop`)
                .then((data)=>{

                	if (data.data.length) {
                		for (let i=0; i<data.data.length; i++) {
	                    	data.data[i].check = false
	                    }
	                    this.tableData = data.data
	                    this.tableData[0].check = true

	                    this.list = this.tableData[0]
	                    this.get_import_status()
                	} else {

                		this.power = false
                		this.$message({
			              message: '您没有任何权限导入数据',
			              type: 'warning'
			            })
                	}

                	this.$nextTick(()=>{

			            this.wrap_height = this.$refs.import_data.offsetHeight - this.$refs.data_top.offsetHeight - 20

			            
			        })


                    
                    
                })
                .catch(()=>{
                    this.$message({
                      message: '接口报错',
                      type: 'error'
                    })
                })
    	},
    	changestatus(list) {
    		//console.info(value)
    		for (let i=0; i<this.tableData.length;i++) {
    			this.tableData[i].check = false
    		}
    		list.check = true 
    		this.list = list
    		this.get_import_status()
    	},
    	import_data_from_shop(event) {
    		let obj = event.target
	        if (!obj.files) {
	            return;
	        }

	        let that = this

	        console.info(this.time)

    		let year = new Date(this.time).getFullYear()

    		let month = new Date(this.time).getMonth()

    		let day = new Date(this.time).getDate()

    		let date = new Date(year,month,day,0,0,0).getTime().toString().substr(0, 10)


	        that.loading = true
	        that.loading_text = '店铺导入数据解析中'
	        var f = obj.files[0]
	        const formData = new FormData()
	        formData.append('file', f)

	            this.$http({
	              url:  `import/get_data_from_shop?shopId=${this.list.id}&time=${date}&type=1`,
	              method: 'POST',
	              data: formData,
	              headers: {'Content-Type': 'multipart/form-data'},
	              onUploadProgress (a){

	              },
	            }).then((res) => {
	              //保存图片到数据库

	              event.target.value = ''

	              
	              
	              this.$message({
	                message: res.msg,
	                type: 'success'
	              })

	             	that.loading = false
	        		that.loading_text = '店铺导入数据解析中'

	        		this.get_import_status()
	              
	              //this.savereource(res)
	            })




    	},
    	//店铺维度导入
    	
    	importf(event) {//导入

	        let obj = event.target
	        if (!obj.files) {
	            return;
	        }

	        let that = this

	        that.loading = true
	        that.loading_text = '库存魔镜解析中'


	        let a = new Date().getTime()

	        var wb;//读取完成的数据
	        var rABS = false; //是否将文件读取为二进制字符串
	        var f = obj.files[0];
	        var reader = new FileReader();
	        reader.onload = function (e) {
	            var data = e.target.result;
	            if (rABS) {
	                wb = XLSX.read(btoa(that.fixdata(data)), {//手动转化
	                    type: 'base64'
	                });
	            } else {
	                wb = XLSX.read(data, {
	                    type: 'binary'
	                });
	            }


	            

	            //console.info(wb)

	            //console.info(data)

	            let arr = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
	            let arr1 = []

	            //if (arr[0]["商家编码"])
	            let jiance = 0

            	for(var key in arr[0]) {



                    if (key == '商家编码') {
                        jiance++
                    }

                    if (key == '宝贝ID') {
                        jiance++
                    }
                    if (key == '宝贝标题') {
                        jiance++
                    }
                    
                    
                }

                if (jiance<2) {

	        		that.loading = false
	        
	        
					return that.$message({
	                  message: '请检查魔镜表',
	                  type: 'info'
	                })

                }



	            //console.info(arr)

	            for (let i=0; i<arr.length;i++) {
	                    arr1[i] = {h0: '', h1: '',h2: '', h3: ''}
	                    
	                    for(var key in arr[i]) {



	                        if (key == '商家编码') {
	                            arr1[i]['h2'] = arr[i][key]
	                        }

	                        if (key == '宝贝SKU') {
	                            arr1[i]['h3'] = arr[i][key]
	                        }

	                        if (key == '宝贝ID') {
	                            arr1[i]['h1'] = arr[i][key]
	                        }
	                        if (key == '宝贝标题') {
	                            arr1[i]['h0'] = arr[i][key]
	                        }
	                        
	                        
	                    }

	                   
	                
	            }

	            //console.info((new Date().getTime()-a)/1000)




	            //console.info(arr1)
	            that.import_inventory_magic(arr1)




	            event.target.value = ''

	            //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
	            //wb.Sheets[Sheet名]获取第一个Sheet的数据
	            //document.getElementById("demo").innerHTML = JSON.stringify(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
	        };
	        if (rABS) {
	            reader.readAsArrayBuffer(f);
	        } else {
	            reader.readAsBinaryString(f);
	        }
	      },
	      fixdata(data) { //文件流转BinaryString
	        var o = "",
	            l = 0,
	            w = 10240;
	        for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
	        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
	        return o;
	      }, 
    	import_inventory_magic(data) {

    		this.loading_text = '库存魔镜上传中'


    		let year = new Date(this.time).getFullYear()

    		let month = new Date(this.time).getMonth()

    		let day = new Date(this.time).getDate()

    		let date = new Date(year,month,day,0,0,0).getTime().toString().substr(0, 10)


    		this.$http.post('import/import_inventory_magic',{
                data: data,
                shopId: this.list.id,
                time: date,
                type: 1

              })
             .then((data)=>{
                this.$message({
                  message: data.msg,
                  type: 'info'
                })

                this.get_import_status()

                this.loading = false
	        	this.loading_text = '库存魔镜导入中'

                  
              })
             .catch(()=>{
	            this.$message({
	              message: '接口报错',
	              type: 'error'
	            })
	       	})
    	},
    	get_import_status() {
    		if(!this.time){
    			return this.$message({
    				message:'请输入要导入的日期',
    				type:'warning'
    			})
    		}


    		let year = new Date(this.time).getFullYear()

    		let month = new Date(this.time).getMonth()

    		let day = new Date(this.time).getDate()




    		let date = new Date(year,month,day,0,0,0).getTime().toString().substr(0, 10)




    		this.$http.get(`yx_import/get_import_status?shopId=${this.list.id}&time=${date}`)
                .then((data)=>{
                	this.import_business_staff_flag = false
			      	this.import_through_train_flag = false
			      	this.import_inventory_magic_flag = false
			      	this.get_data_from_shop_flag = false
			      	this.get_data_from_ware_id_flag = false
			      	this.import_update_ware_flag = false
			      	this.import_super_recommend_flag = false
                	

                	if (!data.data.length) {
                		this.import_business_staff_flag = false
				      	this.import_through_train_flag = false
				      	this.get_data_from_shop_flag = false
				      	this.import_inventory_magic_flag = false
				      	this.get_data_from_ware_id_flag = false
				      	this.import_update_ware_flag = false
				      	this.import_super_recommend_flag = false
                	}



                	if (data.data.length) {
                		for (let i=0;i<data.data.length;i++) {

                			if (data.data[i].tableName == '库存魔镜') {
                				this.import_inventory_magic_flag = true
                				
                			}


                			if (data.data[i].tableName == '生意参谋') {
                				this.import_business_staff_flag = true
                				
                			}

                			if (data.data[i].tableName == '直通车') {
                				this.import_through_train_flag = true
                				
                			}

                			if (data.data[i].tableName == '店铺维度报表') {
                				this.get_data_from_shop_flag = true
                				
                			}

                			if (data.data[i].tableName == '货号维度报表') {
                				this.get_data_from_ware_id_flag = true
                				
                			}

                			if (data.data[i].tableName == '上新表') {
                				this.import_update_ware_flag = true
                				
                			}

                			if (data.data[i].tableName == '超级推荐') {
                				this.import_super_recommend_flag = true
                				
                			}                		
                		}
                	}
                    


                    

                })
                .catch(()=>{
                    this.$message({
                      message: '接口报错',
                      type: 'error'
                    })
                })
    	},
    	deal_error(){
         	console.info(this.time)
         	console.info(this.list.id)
         	let year = new Date(this.time).getFullYear()

    		let month = new Date(this.time).getMonth()

    		let day = new Date(this.time).getDate()

    		let date = new Date(year,month,day,0,0,0).getTime().toString().substr(0, 10)

         	this.$http.get(`import/delete_wrong_super?type=${"1"}&time=${date}&shopId=${this.list.id}`)
                .then((data)=>{
                	console.info("666")
                })
            	.catch(()=>{
		            this.$message({
		              message: '接口报错',
		              type: 'error'
		            })
		       	})	
         },
  	}
}
</script>

<style>
.el-upload-list{
      display: none;
    }

	.is-checkeda {
	  border: 1px solid #67c23a !important;
	  color: #67c23a !important;
	}
	.el-checkbox-button, .el-checkbox-button__inner {
		margin-bottom: 4px;
	}
	.inpucus-datacenter-a {
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
.filethird_body {
  font-size: 12px;
  min-height: 400px;

  p {
    float: left;
    width: 70px;
    text-align: center;

    position: relative;

    &:hover {
      .iconerror {
        display: block;
      }
    }

    .doc {
      color: #f7d673; 
      font-size: 50px;
      
    }

    .iconerror {
      display: none;
    }
  }
}
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
		overflow-y: scroll;

	}
}

</style>
