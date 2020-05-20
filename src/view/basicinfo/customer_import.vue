<template>
  <div v-if="power" ref="import_data" class="import_data">
  	<div  ref="data_top" style="position: relative;" class="import_data-top">
  		<div style="display: inline-block;" class="el-checkbox-group">

          <label @click="changestatus(list)" v-for="list in shop_list"  class="el-checkbox-button el-checkbox-button--small">
            <span :class="{'is-checkeda': list.check}"  class="el-checkbox-button__inner">{{list.label}}</span>
          </label>
        
        </div>
        <div style="display: inline-block;" class="el-checkbox-group">

          <label @click="changestatus_group(list)" v-for="list in group_list"  class="el-checkbox-button el-checkbox-button--small">
            <span :class="{'is-checkeda': list.check}"  class="el-checkbox-button__inner">{{list.label}}</span>
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
	    
<!-- 	    <el-button v-if="" @click="" style="position: absolute;bottom: 10px;right: 16px;" type="primary">删除数据</el-button> -->


	   
  	</div>
  	<div v-if="power" v-loading="loading"
    :element-loading-text="loading_text"
    element-loading-spinner="el-icon-loading"
     :style="{height: wrap_height + 'px'}" class="import_data-wrap">

		<el-card style="width: 48%; display: inline-block;margin-bottom: 10px;margin-right: 3%;" class="box-card" v-show="shopId">
		  <div slot="header" class="clearfix">
		    <span>赤兔遵时率</span>
		    <el-button v-if="adherence_table" style="float: right; padding: 0px 10px" type="text" @click="delete_import_data('zsl')">删除</el-button>
	<!-- 	    <i class="el-icon-delete icon_delete pointer" style="float: right; padding-right: 10px;color: red;font-size: 24px;" @click=""></i> -->
		  </div>
		  <div style="display: flex" class="text item">
		  	<div style="width: 166px;padding-left: 12px;color: #adadad;font-size: 14px;border-right: 1px solid #EBEEF5">
		  		<p style="line-height: 34px;">姓名：{{userInfo.staffName}}</p>
		  		<p style="margin-top: 36px;">{{shopId?'店铺':'部门'}}：{{shopName}}</p>
		  		<p style="line-height: 50px;">时间：{{timeformat}}</p>
		  	</div>

		  	<div style="flex: 1">

			    <p style="text-align: center;position: relative;top:-10px;">
				    <i v-show="!adherence_table" style="font-size: 120px;color: #3259ce;position: relative;" class="el-icon-upload">
				    	
				    	<input style="left:0px" type="file" @change="analyze_adherence_table" class="inpucus-datacenter pointer"  />
				    </i>

<!-- 				    <i v-show="!shopId" style="font-size: 120px;color: #8a8a8a;position: relative;" class="el-icon-timer">
				    	
				    	
				    </i> -->


				    <i v-show="adherence_table" style="font-size: 120px;color: #67c23a;position: relative;" class="el-icon-success">
				    </i>
				</p>




			    <p v-show="!adherence_table" style="text-align: center">
			    	请上传文件
			    </p>

<!-- 			    <p v-show="!shopId" style="text-align: center">
			    	等待上传
			    </p> -->


			    <p v-show="adherence_table" style="text-align: center">
			    	上传成功
			    </p>
			</div>


		  </div>
		</el-card>

  		<el-card style="width: 48%; display: inline-block;margin-bottom: 10px" class="box-card" v-show="shopId">
		  <div slot="header" class="clearfix">
		    <span>赤兔分时接待</span>
		    <el-button v-if="time_sharing" style="float: right; padding: 0px 10px" type="text" @click="delete_import_data('fs')">删除</el-button>
		  </div>
		  <div style="display: flex" class="text item">
		  	<div style="width: 166px;padding-left: 12px;color: #adadad;font-size: 14px;border-right: 1px solid #EBEEF5">
		  		<p style="line-height: 34px;">姓名：{{userInfo.staffName}}</p>
		  		<p style="margin-top: 36px;">{{shopId?'店铺':'部门'}}：{{shopName}}</p>
		  		<p style="line-height: 50px;">时间：{{timeformat}}</p>
		  	</div>

		  	<div style="flex: 1">
			  	<p style="text-align: center;position: relative;top:-10px;">
				    <i  v-show="!time_sharing" style="font-size: 120px;color: #3259ce;position: relative;" class="el-icon-upload">
				    	
				    	<input style="left:0px" type="file" @change="analyze_time_sharing" class="inpucus-datacenter pointer"  />
				    </i>
<!-- 				    <i v-show="!shopId" style="font-size: 120px;color: #8a8a8a;position: relative;" class="el-icon-timer">
				    	
				    	
				    </i> -->




				    <i v-show="time_sharing" style="font-size: 120px;color: #67c23a;position: relative;" class="el-icon-success">
				    </i>
				</p>

				
			    <p  v-show="!time_sharing"  style="text-align: center">
			    	请上传文件
			    </p>
<!-- 			    <p v-show="!shopId" style="text-align: center">
			    	等待上传
			    </p> -->


			    <p v-show="time_sharing" style="text-align: center">
			    	上传成功
			    </p>
			</div>

		    

		  </div>
		</el-card>

  		<el-card style="width: 48%; display: inline-block;margin-right: 3%;margin-bottom: 10px" class="box-card" v-show="groupId">
		  <div slot="header" class="clearfix">
		    <span>赤兔售前明细</span>
		    <el-button v-if="ct_detail" style="float: right; padding: 0px 10px" type="text" @click="delete_import_data('sq')">删除</el-button>
		  </div>
		  
		  <div style="display: flex" class="text item">
		  	<div style="width: 166px;padding-left: 12px;color: #adadad;font-size: 14px;border-right: 1px solid #EBEEF5">
		  		<p style="line-height: 34px;">姓名：{{userInfo.staffName}}</p>
		  		<p style="margin-top: 36px;">{{shopId?'店铺':'部门'}}：{{shopName}}</p>
		  		<p style="line-height: 50px;">时间：{{timeformat}}</p>
		  	</div>

		  	<div style="flex: 1">
			    <p style="text-align: center;position: relative;top:-10px;">
			    	<i  v-show="!ct_detail " style="font-size: 120px;color: #3259ce;position: relative;" class="el-icon-upload">
			    	
				    	<input style="left:0px" type="file" @change="analyze_ct_table" class="inpucus-datacenter pointer"  />
				    </i>
<!-- 				    <i v-show="!groupId" style="font-size: 120px;color: #8a8a8a;position: relative;" class="el-icon-timer">
				    	
				    	
				    </i> -->

			    	<i v-show="ct_detail" style="font-size: 120px;color: #67c23a;position: relative;" class="el-icon-success">
			    	</i>
				</p>
			    <p  v-show="!ct_detail " style="text-align: center">
		    	请上传文件
			    </p>
<!-- 			    <p v-show="!groupId" style="text-align: center">
			    	等待上传
			    </p> -->


			    <p v-show="ct_detail" style="text-align: center">
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
      	shop_list:[],
      	shopId:'',
      	groupId:'',
      	shopName:'',
      	group_list:[{
      		value:1,
      		label:'售前一部',
      		check:false
      	},{
      		value:2,
      		label:'售前二部',
      		check:false
      	},{
          value:3,
          label:'外包部门',
          check:false
        }],
      	ct_detail:false,
      	adherence_table: false,
      	time_sharing:false,


      	njsubmit: {
      		payment: '',
      		payQty: ''
      	},
      	pickerOptions:{
      		disabledDate(time) {
            //return time.getTime() > Date.now() - 24*60*60*1000;
          },
      	},
      	storedisition: {
      		zzhf: '',
      		flhf: '',
      		cjtj: '',
      		tgys: '',
      	},
      	loading: false,
      	loading_text: '上传中',
      	time: new Date(new Date().getTime()-3600 * 1000 * 24),
      	//new Date([new Date().getFullYear(),new Date().getMonth()+1,new Date().getDate()-1].join('-'))
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
      	
        this.get_shop()
       

    },
    methods: {

    	get_shop(){
    		this.$http.get(`compose/get_brand`)
    		.then((data)=>{
    			if(data.code == '200'){
    				this.shopId = []
    				let list = []
    				for(let i=0;i<data.data.length;i++){
    					//list.push({value:data.data[i].brandId, label:data.data[i].brandName})

    					if(data.data[i].list.length){
    					    
    						for(let j=0;j<data.data[i].list.length;j++){
    							list.push({value:data.data[i].list[j].id, label:data.data[i].list[j].shopNum, check:false})
    						}
    					}
    				}


    				this.shop_list = list
    				this.shopId = this.shop_list[0].value
    				this.shop_list[0].check = true
    				this.shopName = this.shop_list[0].label
    				this.get_import_status()
    				


    				this.$nextTick(()=>{

			            this.wrap_height = this.$refs.import_data.offsetHeight - this.$refs.data_top.offsetHeight - 20

			            
			        })
    				//this.shopId = this.shop_list[0].children[0].value
    				// this.shopId.push(this.shop_list[0].value)
    				// this.shopId.push(this.shop_list[0].children[0].value)
    				
    			}
    		})
    	},


    	changestatus(list) {
    		this.shopId = ''
    		this.groupId = ''
    		for (let i=0; i<this.shop_list.length;i++) {
    			this.shop_list[i].check = false
    		}

    		for(let i=0;i<this.group_list.length;i++){
    			this.group_list[i].check = false
    		}
    		list.check = true 
    		this.shopId = list.value
    		this.shopName = list.label
    		this.get_import_status()
    	},

    	changestatus_group(list){
    		this.shopId = ''
    		this.groupId = ''
    		for (let i=0; i<this.shop_list.length;i++) {
    			this.shop_list[i].check = false
    		}
    		for(let i=0;i<this.group_list.length;i++){
    			this.group_list[i].check = false
    		}

    		list.check = true
    		this.groupId = list.value
    		this.shopName = list.label
    		this.get_import_status()
    	},






          //赤兔售前导入
	      analyze_ct_table(event){

    		let obj = event.target
	        if (!obj.files) {
	            return;
	        }

	        let that = this

	        that.loading = true
	        that.loading_text = '售前明细解析中'



	       

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

	            console.info(arr)

	            for (let i=0; i<arr.length;i++) {
                    arr1[i]={
                    	customerService:'',
                    	receptionNum:'',
                    	enquiryNum:'',
                    	payNum:'',
                    	payRate:'',
                    	guestNum:'',
                    	guestPrice:'',
                    	postageTotal:'',
                    	discountRate:'',
                    	reversionRate:'',
                    	responseAvg:'',
                    	responseFirst:'',
                    	receptionAvg:'',
                    	receptionAvgsecond:'',
                    	orderPnum:'',
                    	orderPmoney:'',
                    	saleMoney:'',
                    	customerRate:'',
                    	longResponseNum:'',
                    	orderNum:'',
                    	paymentSuccessRate:'',
                    	silentFollowNum:'',
                    	payMorrowSum:'',
                    	payMorrowRate:'',
                    	assistanceNum:'',
                    	assistanceOrderNum:'',
                    	outNum:'',
                    	refundRate:'',




                    }
    
                    for(var key in arr[i]) {

                        if(key == '客服'){
                        	arr1[i]['customerService'] = arr[i][key]
                        }

                        if(key == '接待人数'){
                        	arr1[i]['receptionNum'] = arr[i][key]
                        }

                        if(key == '询单人数'){
                        	arr1[i]['enquiryNum'] = arr[i][key]
                        }

                        if(key == '询单->最终付款人数'){
                        	arr1[i]['payNum'] = arr[i][key]
                        }

                        if(key == '询单->最终付款成功率'){
                        	arr1[i]['payRate'] = arr[i][key]
                        }

                        if(key == '客件数'){
                        	arr1[i]['guestNum'] = arr[i][key]
                        }
                        
                        if(key == '客单价'){
                        	arr1[i]['guestPrice'] = arr[i][key]
                        }

                        if(key == '邮费总额'){
                        	arr1[i]['postageTotal'] = arr[i][key]
                        }

                        if(key == '手工折扣率'){
                        	arr1[i]['discountRate'] = arr[i][key]
                        }

                        if(key == '客服回复率'){
                        	arr1[i]['reversionRate'] = arr[i][key]
                        }

                        if(key == '平均响应时间'){
                        	arr1[i]['responseAvg'] = arr[i][key]
                        }

                        if(key == '首次响应时间'){
                        	arr1[i]['responseFirst'] = arr[i][key]
                        }

                        if(key == '平均接待时长'){
                        	arr1[i]['receptionAvg'] = arr[i][key]
                        }

                        if(key == '平均接待时长(秒)'){
                        	arr1[i]['receptionAvgsecond'] = arr[i][key]
                        }
                        
                        if(key == '静默下单本人落实付款-人数'){
                        	arr1[i]['orderPnum'] = arr[i][key]
                        }

                        if(key == '静默下单本人落实付款-金额'){
                        	arr1[i]['orderPmoney'] = arr[i][key]
                        }
                        if(key == '销售额'){
                        	arr1[i]['saleMoney'] = arr[i][key]
                        }

                        if(key == '客服答问比'){
                        	arr1[i]['customerRate'] = arr[i][key]
                        }

                        if(key == '慢响应人数'){
                        	arr1[i]['longResponseNum'] = arr[i][key]
                        }

                        if(key == '询单->最终下单人数'){
                        	arr1[i]['orderNum'] = arr[i][key]
                        }

                        if(key == '下单->最终付款成功率'){
                        	arr1[i]['paymentSuccessRate'] = arr[i][key]
                        }

                        if(key == '全静默单本人跟进-人数'){
                        	arr1[i]['silentFollowNum'] = arr[i][key]
                        }
                        
                        if(key == '询单->次日付款人数'){
                        	arr1[i]['payMorrowSum'] = arr[i][key]
                        }

                        if(key == '询单->次日付款成功率'){
                        	arr1[i]['payMorrowRate'] = arr[i][key]
                        }

                        if(key == '协助跟进人数'){
                        	arr1[i]['assistanceNum'] = arr[i][key]
                        }

                        if(key == '协助下单人数'){
                        	arr1[i]['assistanceOrderNum'] = arr[i][key]
                        }

                        if(key == '转出人数'){
                        	arr1[i]['outNum'] = arr[i][key]
                        }

                        if(key == '退款率'){
                        	arr1[i]['refundRate'] = arr[i][key]
                        }



                    }
                }
                //console.info(arr1)

	            that.import_ct_table(arr1)

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

	            
	      











	      // 	let time = this.time.getTime().toString().substr(0,10)

	      	

	      // 	let file = event.target.files[0]
	      // 	let formData = new FormData()
	      // 	formData.append('file',file)
	      // 	formData.append('data',time)
	      // 	formData.append('groupId',this.groupId)

	      // 	this.$http({
	      // 		url:'compose/import_ct_table',
	      // 		method:'POST',
	      // 		data:formData,
	      // 		headers: {'Content-Type': 'multipart/form-data'}
	      // 	})
	      // 	.then((res)=>{
	      // 		if(res.code == '200'){

	      // 			this.$message({
	      // 				message:"导入成功",
	      // 				type:'success'
	      // 			})
	      // 			this.get_import_status()
	      // 			event.target.value=""
	      // 		}
	      // 		else{
	      // 			this.$message({
	      // 				message:res.msg,
	      // 				type:'error'
	      // 			})
	      // 		}
	      // 	})
	      // 	.catch(()=>{
	      // 		this.$message({
	      // 			message:"接口报错",
	      // 			type:'error'
	      // 		})
	      // 	})
	      },
	      import_ct_table(data){
	      	this.loading_text = '赤兔售前明细表上传中'

    		let year = new Date(this.time).getFullYear()

    		let month = new Date(this.time).getMonth()

    		let day = new Date(this.time).getDate()

    		let date = new Date(year,month,day,0,0,0).getTime().toString().substr(0, 10)

    		this.$http.post(`compose/import_ct_table`,{
    			data: date,
    			groupId: this.groupId,
    			file: data

    		})
	      	.then((res)=>{
	      		if(res.code == '200'){

	      			this.$message({
	      				message:"导入成功",
	      				type:'success'
	      			})
	      			this.loading = false
	      			this.get_import_status()
	      			
	      		}
	      		else{
	      			this.$message({
	      				message:res.msg,
	      				type:'error'
	      			})
	      		}
	      	})
	      	.catch(()=>{
	      		this.$message({
	      			message:"接口报错",
	      			type:'error'
	      		})
	      	})
	      },




           //遵时率表导入
	      analyze_adherence_table(event){

	      	let obj = event.target

	      	if(!obj.files){
	      		return
	      	}

	      	let that = this


	      	let a = new Date().getTime()

	      	var wb //读取完成的数据
	      	var rABS = false  //是否将数据读取为二进制字符串
	      	var f = obj.files[0]
	      	var reader = new FileReader()

	      	reader.onload = function (e){
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

	            console.info(arr)

	            for (let i=0; i<arr.length;i++) {
                    arr1[i]={
                    	customerService:'',
                    	shopWw:'',
                    	workNum:'',
                    	onlineAvg:'',
                    	onlineLastAvg:'',
                    	onlinePioneer:'',
                    	onlineLast:'',
                    	logonNum:'',
                    	logonAvg:'',
                    	onlineTime:'',
                    	onlineTimes:'',
                    	onlineTimeAvg:'',
                    	onlineTimeSavg:'',
                    	serviceNum:'',
                    	serviceSnum:'',
                    	serviceAvg:'',
                    	serviceSavg:'',
                    	hangNum:'',
                    	hangSnum:'',
                    	hangAvg:'',
                    	hangSavg:'',


                    }

                    for(var key in arr[i]) {

                    	if(key == '客服'){
                    		arr1[i]['customerService'] = arr[i][key]
                    	}
                    	if(key == '旺旺'){
                    		arr1[i]['shopWw'] = arr[i][key]
                    	}
                    	if(key == '上班天数'){
                    		arr1[i]['workNum'] = arr[i][key]
                    	}
                    	if(key == '平均上线时间'){
                    		arr1[i]['onlineAvg'] = arr[i][key]
                    	}
                    	if(key == '平均最后在线时间'){
                    		arr1[i]['onlineLastAvg'] = arr[i][key]
                    	}
                    	if(key == '最早上线'){
                    		arr1[i]['onlinePioneer'] = arr[i][key]
                    	}
                    	if(key == '最晚在线'){
                    		arr1[i]['onlineLast'] = arr[i][key]
                    	}
                    	if(key == '总登录次数'){
                    		arr1[i]['logonNum'] = arr[i][key]
                    	}
                    	if(key == '日均登录次数'){
                    		arr1[i]['logonAvg'] = arr[i][key]
                    	}
                    	if(key == '在线总时长'){
                    		arr1[i]['onlineTime'] = arr[i][key]
                    	}
                    	if(key == '在线总时长(秒)'){
                    		arr1[i]['onlineTimes'] = arr[i][key]
                    	}
                    	if(key == '平均日在线时长'){
                    		arr1[i]['onlineTimeAvg'] = arr[i][key]
                    	}
                    	if(key == '平均日在线时长(秒)'){
                    		arr1[i]['onlineTimeSavg'] = arr[i][key]
                    	}
                    	if(key == '服务总时长'){
                    		arr1[i]['serviceNum'] = arr[i][key]
                    	}
                    	if(key == '服务总时长(秒)'){
                    		arr1[i]['serviceSnum'] = arr[i][key]
                    	}
                    	if(key == '平均日服务时长'){
                    		arr1[i]['serviceAvg'] = arr[i][key]
                    	}
                    	if(key == '平均日服务时长(秒)'){
                    		arr1[i]['serviceSavg'] = arr[i][key]
                    	}
                    	if(key == '挂起总时长'){
                    		arr1[i]['hangNum'] = arr[i][key]
                    	}
                    	if(key == '挂起总时长(秒)'){
                    		arr1[i]['hangSnum'] = arr[i][key]
                    	}
                    	if(key == '平均日挂起时长'){
                    		arr1[i]['hangAvg'] = arr[i][key]
                    	}
                    	if(key == '平均日挂起时长(秒)'){
                    		arr1[i]['hangSavg'] = arr[i][key]
                    	}



                    }
                    //console.info(arr1)
                }

	            that.import_adherence_table(arr1)

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

	      	// let time = this.time.getTime().toString().substr(0,10)

	      	// let file = event.target.files[0]
	      	// let formData = new FormData()
	      	// formData.append('file',file)
	      	// formData.append('data',time)
	      	// formData.append('shopId',this.shopId)
	  

	      	// this.$http({
	      	// 	url:'compose/import_adherence_table',
	      	// 	method:'POST',
	      	// 	data:formData,
	      	// 	headers: {'Content-Type': 'multipart/form-data'}
	      	// })
	      	// .then((res)=>{
	      	// 	if(res.code == '200'){
	      	// 		this.$message({
	      	// 			message:"导入成功",
	      	// 			type:'success'
	      	// 		})

	      	// 		this.get_import_status()

	      	// 		event.target.value=""
	      	// 	}
	      	// 	else{
	      	// 		this.$message({
	      	// 			message:res.msg,
	      	// 			type:'error'
	      	// 		})
	      	// 	}
	      	// })
	      	// .catch(()=>{
	      	// 	this.$message({
	      	// 		message:"接口报错",
	      	// 		type:'error'
	      	// 	})
	      	// })
	      },

	      import_adherence_table(data){
	      	this.loading_text = '遵时率表上传中'

    		let year = new Date(this.time).getFullYear()

    		let month = new Date(this.time).getMonth()

    		let day = new Date(this.time).getDate()

    		let date = new Date(year,month,day,0,0,0).getTime().toString().substr(0, 10)

    		this.$http.post(`compose/import_adherence_table`,{
    			data: date,
    			shopId: this.shopId,
    			file: data

    		})
	      	.then((res)=>{
	      		if(res.code == '200'){

	      			this.$message({
	      				message:"导入成功",
	      				type:'success'
	      			})
	      			this.loading = false
	      			this.get_import_status()
	      			
	      		}
	      		else{
	      			this.$message({
	      				message:res.msg,
	      				type:'error'
	      			})
	      		}
	      	})
	      	.catch(()=>{
	      		this.$message({
	      			message:"接口报错",
	      			type:'error'
	      		})
	      	})
	      },




           //分时段报表导入
	      analyze_time_sharing(event){
	      	let obj = event.target

	      	if(!obj.files){
	      		return
	      	}

	      	let that = this


	      	let a = new Date().getTime()

	      	var wb //读取完成的数据
	      	var rABS = false  //是否将数据读取为二进制字符串
	      	var f = obj.files[0]
	      	var reader = new FileReader()

	      	reader.onload = function (e){
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
                    arr1[i]={
                    	data:'',
                    	zero:'',
                    	one:'',
                    	two:'',
                    	three:'',
                    	four:'',
                    	five:'',
                    	six:'',
                    	seven:'',
                    	eight:'',
                    	nine:'',
                    	ten:'',
                    	eleven:'',
                    	twelve:'',
                    	thirteen:'',
                    	forteen:'',
                    	fifteen:'',
                    	sixteen:'',
                    	seventeen:'',
                    	eighteen:'',
                    	nineteen:'',
                    	twenty:'',
                    	twentyOne:'',
                    	twentyTwo:'',
                    	twentyThree:'',
                    	allDay:''


                    }

                    for(var key in arr[i]) {

                    	// if(key == '日期'){
                    	// 	arr1[i]['data'] = arr[i][key]
                    	// }
                    	// if(key == '0点'){
                    	// 	arr1[i]['zero'] = arr[i][key]
                    	// }
                    	// if(key == '1点'){
                    	// 	arr1[i]['one'] = arr[i][key]
                    	// }
                    	// if(key == '2点'){
                    	// 	arr1[i]['two'] = arr[i][key]
                    	// }
                    	// if(key == '3点'){
                    	// 	arr1[i]['three'] = arr[i][key]
                    	// }
                    	// if(key == '4点'){
                    	// 	arr1[i]['four'] = arr[i][key]
                    	// }
                    	// if(key == '5点'){
                    	// 	arr1[i]['five'] = arr[i][key]
                    	// }
                    	// if(key == '6点'){
                    	// 	arr1[i]['six'] = arr[i][key]
                    	// }
                    	// if(key == '7点'){
                    	// 	arr1[i]['seven'] = arr[i][key]
                    	// }
                    	// if(key == '8点'){
                    	// 	arr1[i]['eight'] = arr[i][key]
                    	// }
                    	// if(key == '9点'){
                    	// 	arr1[i]['nine'] = arr[i][key]
                    	// }
                    	// if(key == '10点'){
                    	// 	arr1[i]['ten'] = arr[i][key]
                    	// }
                    	// if(key == '11点'){
                    	// 	arr1[i]['eleven'] = arr[i][key]
                    	// }
                    	// if(key == '12点'){
                    	// 	arr1[i]['twelve'] = arr[i][key]
                    	// }
                    	// if(key == '13点'){
                    	// 	arr1[i]['thirteen'] = arr[i][key]
                    	// }
                    	// if(key == '14点'){
                    	// 	arr1[i]['forteen'] = arr[i][key]
                    	// }
                    	// if(key == '15点'){
                    	// 	arr1[i]['fifteen'] = arr[i][key]
                    	// }
                    	// if(key == '16点'){
                    	// 	arr1[i]['sixteen'] = arr[i][key]
                    	// }
                    	// if(key == '17点'){
                    	// 	arr1[i]['seventeen'] = arr[i][key]
                    	// }
                    	// if(key == '18点'){
                    	// 	arr1[i]['eighteen'] = arr[i][key]
                    	// }
                    	// if(key == '19点'){
                    	// 	arr1[i]['nineteen'] = arr[i][key]
                    	// }
                    	// if(key == '20点'){
                    	// 	arr1[i]['twenty'] = arr[i][key]
                    	// }
                    	// if(key == '21点'){
                    	// 	arr1[i]['twentyOne'] = arr[i][key]
                    	// }
                    	// if(key == '22点'){
                    	// 	arr1[i]['twentyTwo'] = arr[i][key]
                    	// }
                    	// if(key == '23点'){
                    	// 	arr1[i]['twentyThree'] = arr[i][key]
                    	// }
                    	// if(key == '全天'){
                    	// 	arr1[i]['allDay'] = arr[i][key]
                    	// }

                      if(key == '日期'){
                        arr1[i]['data'] = arr[i][key]
                      }
                      if(key == '0'){
                        arr1[i]['zero'] = arr[i][key]
                      }
                      if(key == '1'){
                        arr1[i]['one'] = arr[i][key]
                      }
                      if(key == '2'){
                        arr1[i]['two'] = arr[i][key]
                      }
                      if(key == '3'){
                        arr1[i]['three'] = arr[i][key]
                      }
                      if(key == '4'){
                        arr1[i]['four'] = arr[i][key]
                      }
                      if(key == '5'){
                        arr1[i]['five'] = arr[i][key]
                      }
                      if(key == '6'){
                        arr1[i]['six'] = arr[i][key]
                      }
                      if(key == '7'){
                        arr1[i]['seven'] = arr[i][key]
                      }
                      if(key == '8'){
                        arr1[i]['eight'] = arr[i][key]
                      }
                      if(key == '9'){
                        arr1[i]['nine'] = arr[i][key]
                      }
                      if(key == '10'){
                        arr1[i]['ten'] = arr[i][key]
                      }
                      if(key == '11'){
                        arr1[i]['eleven'] = arr[i][key]
                      }
                      if(key == '12'){
                        arr1[i]['twelve'] = arr[i][key]
                      }
                      if(key == '13'){
                        arr1[i]['thirteen'] = arr[i][key]
                      }
                      if(key == '14'){
                        arr1[i]['forteen'] = arr[i][key]
                      }
                      if(key == '15'){
                        arr1[i]['fifteen'] = arr[i][key]
                      }
                      if(key == '16'){
                        arr1[i]['sixteen'] = arr[i][key]
                      }
                      if(key == '17'){
                        arr1[i]['seventeen'] = arr[i][key]
                      }
                      if(key == '18'){
                        arr1[i]['eighteen'] = arr[i][key]
                      }
                      if(key == '19'){
                        arr1[i]['nineteen'] = arr[i][key]
                      }
                      if(key == '20'){
                        arr1[i]['twenty'] = arr[i][key]
                      }
                      if(key == '21'){
                        arr1[i]['twentyOne'] = arr[i][key]
                      }
                      if(key == '22'){
                        arr1[i]['twentyTwo'] = arr[i][key]
                      }
                      if(key == '23'){
                        arr1[i]['twentyThree'] = arr[i][key]
                      }
                      if(key == '全天'){
                        arr1[i]['allDay'] = arr[i][key]
                      }


                    }
                    //console.info(arr1)
                }

	            that.import_time_sharing(arr1)

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

	      import_time_sharing(data){
	      	this.loading_text = '分时段表上传中'

    		let year = new Date(this.time).getFullYear()

    		let month = new Date(this.time).getMonth()

    		let day = new Date(this.time).getDate()

    		let date = new Date(year,month,day,0,0,0).getTime().toString().substr(0, 10)

    		this.$http.post(`compose/import_time_sharing`,{
    			data: date,
    			shopId: this.shopId,
    			file: data

    		})
	      	.then((res)=>{
	      		if(res.code == '200'){

	      			this.$message({
	      				message:"导入成功",
	      				type:'success'
	      			})
	      			this.loading = false
	      			this.get_import_status()
	      			
	      		}
	      		else{
	      			this.$message({
	      				message:res.msg,
	      				type:'error'
	      			})
	      		}
	      	})
	      	.catch(()=>{
	      		this.$message({
	      			message:"接口报错",
	      			type:'error'
	      		})
	      	})
	      },


	      get_import_status(){
          console.info(this.time)
    		let year = new Date(this.time).getFullYear()

    		let month = new Date(this.time).getMonth()

    		let day = new Date(this.time).getDate()

    		let date = new Date(year,month,day,0,0,0).getTime().toString().substr(0, 10)

	      	this.$http.post(`compose/get_import_status`,{
	      		data: date,
				groupId: this.groupId,
				shopId: this.shopId

	      	})
	          .then((data)=>{
	            if(data.code == '200'){

	            	this.ct_detail = false
	            	this.adherence_table = false
	            	this.time_sharing = false

	              if(data.data.length){
	              	for(let i=0;i<data.data.length;i++){
	              		if(data.data[i].tableName == '赤兔售前明细'){
	              			this.ct_detail = true
	              		}
	              		if(data.data[i].tableName == '赤兔遵时率'){
	              			this.adherence_table = true
	              		}
	              		if(data.data[i].tableName == '赤兔分时接待'){
	              			this.time_sharing = true
	              		}
	              	}
	              }

	            }else{
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

	      delete_import_data(type){
	      	let tableName = ''

    		let year = new Date(this.time).getFullYear()

    		let month = new Date(this.time).getMonth()+1

    		let day = new Date(this.time).getDate()

            if(type == 'sq'){
            	tableName = '赤兔售前明细'
            }
            else if(type == 'zsl'){
            	tableName = '赤兔遵时率'
            }
            else if(type == 'fs'){
            	tableName = '赤兔分时接待'
            }




    		this.$confirm(`确认删除${year}-${month}-${day}导入${this.shopName}的${tableName}?`)
          		.then(_ => {
		            if(type == 'sq'){
		            	this.del_ct_table()
		            }
		            else if(type == 'zsl'){
		            	this.del_adherence_table()
		            }
		            else if(type == 'fs'){
		            	this.del_time_sharing()
		            }
		          })
		        .catch(_ => {});
	      },

	      del_ct_table(){
    		let year = new Date(this.time).getFullYear()

    		let month = new Date(this.time).getMonth()

    		let day = new Date(this.time).getDate()

    		let date = new Date(year,month,day,0,0,0).getTime().toString().substr(0, 10)


	      	this.$http.get(`compose/del_ct_table?data=${date}&groupId=${this.groupId}`)
	      	.then((data)=>{
	      		if(data.code == '200'){
	      			this.get_import_status()

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


	      del_adherence_table(){

    		let year = new Date(this.time).getFullYear()

    		let month = new Date(this.time).getMonth()

    		let day = new Date(this.time).getDate()

    		let date = new Date(year,month,day,0,0,0).getTime().toString().substr(0, 10)

	      	this.$http.get(`compose/del_adherence_table?data=${date}&shopId=${this.shopId}`)
	      	.then((data)=>{
	      		if(data.code == '200'){
	      			this.get_import_status()

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


	      del_time_sharing(){

    		let year = new Date(this.time).getFullYear()

    		let month = new Date(this.time).getMonth()

    		let day = new Date(this.time).getDate()

    		let date = new Date(year,month,day,0,0,0).getTime().toString().substr(0, 10)
    		
	      	this.$http.get(`compose/del_time_sharing?data=${date}&shopId=${this.shopId}`)
	      	.then((data)=>{
	      		if(data.code == '200'){
	      	        this.get_import_status()

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
