<template>
	<div class="taoke_import">
		<div class="taoke_import-head" style="position: relative; padding-left: 10px; height: 80px" >
			<!-- <el-button @click="get_taoke_data()">加载数据</el-button> -->
			<div style="display: inline-block;" class="el-checkbox-group">
				<label  @click="change_shopNum(list)" v-for="(list,index) in taoke_tableData" :key="index" class="el-checkbox-button el-checkbox-button--small">
	            	<span :class="{'is-checkeda': list.check}" class="el-checkbox-button__inner">{{list.shopNum}}</span>
	          	</label>
			</div>
			<p>
	        	<el-date-picker
		  			style="display: inline-block;position: relative;top: 3px;"
				    v-model="time"				    
				    size="small"
				    type="date"
				    placeholder="选择日期"
				    :picker-options="pickerOptions"
				    v-if="power_flag">
		    	</el-date-picker>
	    	</p>

			<!-- <el-button 
				v-if="import_taoke_data_flag && deletedataflag" 
				@click="delete_import_data" 
				style="position: absolute;bottom: 10px;right: 16px;" type="primary">删除数据
			</el-button> -->

		</div>
		<div 
			v-loading="loading"
    		:element-loading-text="loading_text"
    		element-loading-spinner="el-icon-loading"
     		:style="{height: content_height + 'px'}" 
     		class="taoke_import-content" 
     		v-if="power_flag" >
			<el-card style="width: 48%; display: inline-block; margin-right: 3%;margin-bottom: 10px" class="box-card">
		  		<div slot="header" class="clearfix">
		    		<span>淘客</span>
		  		</div>
		  
				<div style="display: flex" class="text item">
					<div style="width: 166px;padding-left: 12px;color: #adadad;font-size: 14px;border-right: 1px solid #EBEEF5">
						<p style="line-height: 34px;">姓名：{{userInfo.staffName}}</p>
						<p style="margin-top: 36px;">店铺：{{list.shopNum}}</p>
						<p style="line-height: 50px;">时间：{{timeformat}}</p>
					</div>

					<div style="flex: 1">
				    <p style="text-align: center;position: relative;top:-10px;">
				    	<i v-show="!import_taoke_data_flag " style="font-size: 120px;color: #3259ce;position: relative;" class="el-icon-upload">
				    	
					    	<input style="left:0px" type="file" @change="import_taoke" class="inpucus-datacenter pointer"  />
					    </i>
					    <i v-show="import_taoke_data_flag " style="font-size: 120px;color: #67c23a;position: relative;" class="el-icon-success">
					    	<input style="left:0px" type="file"  class="inpucus-datacenter pointer"  />
				    	</i>
				    	
					</p>
				    <p v-show="!import_taoke_data_flag " style="text-align: center">
					请上传文件
				    </p>

				    <p v-show="import_taoke_data_flag " style="text-align: center">
				    	上传成功
				    </p>
				</div>

				</div>
			</el-card>

			<!--<el-card style="width: 48%; display: inline-block;margin-bottom: 10px" class="box-card">
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
			    	
				    	<input style="left:0px" type="file" @change="importf_magic" class="inpucus-datacenter pointer"  />
				    </i>
				    <i v-show="import_inventory_magic_flag && !import_business_staff_flag" style="font-size: 120px;color: #67c23a;position: relative;" class="el-icon-success">
				    	<input style="left:0px" type="file" @change="importf_magic" class="inpucus-datacenter pointer"  />
			    	</i>
			    	<i v-show="import_inventory_magic_flag && import_business_staff_flag" style="font-size: 120px;color: #67c23a;position: relative;" class="el-icon-success">
			    		<input style="left:0px" type="file" @change="importf_magic" class="inpucus-datacenter pointer"  />
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
				    	
				    	<input style="left:0px" type="file" @change="import_business" class="inpucus-datacenter pointer"  />
				    </i>

				   
				    <i v-show="import_business_staff_flag" style="font-size: 120px;color: #67c23a;position: relative;" class="el-icon-success">
				    </i>
				</p>


			    <p v-show="import_inventory_magic_flag" style="text-align: center">
			    	请上传文件
			    </p>

			    <p v-show="!import_inventory_magic_flag" style="text-align: center">
			    	等待上传
			    </p>

			    <p v-show="import_business_staff_flag" style="text-align: center">
			    	上传成功
			    </p>
			</div>


		  </div>
		</el-card>-->

			
		</div>
	</div>
</template>
<script >
	import XLSX from 'xlsx'
	import { mapGetters } from 'vuex'
	export default{
		data(){
			return{
				pickerOptions:{
		      		disabledDate(time) {
		             return time.getTime() > Date.now() - 24*60*60*1000;
		        	},
		        },
				list:{},
				taoke_tableData:[],
				time:[],
				import_taoke_data_flag:false,
				loading: false,
      			loading_text: '上传中',
      			content_height: 700,
      			time: new Date(new Date().getTime()-3600 * 1000 * 24),
      			power_flag:true,
      			import_inventory_magic_flag:false,
      			import_business_staff_flag: false

			}
			
		},
		mounted(){
			this.get_taoke_data()
		},
		computed:{
			...mapGetters([
	      
		      'userInfo',

		      
		    ]),
		    timeformat() {

		        var y = 1900+this.time.getYear()
		        var m = "0"+(this.time.getMonth()+1)
		        var d = "0"+this.time.getDate()
		        return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length)
	    	},
		},
			
		methods:{
			//生意参谋
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
		            //that.import_business_staff(arr1)

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
	    		//console.info(this.time)

	    		let year = new Date(this.time).getFullYear()

	    		let month = new Date(this.time).getMonth()

	    		let day = new Date(this.time).getDate()

	    		let date = new Date(year,month,day,0,0,0).getTime().toString().substr(0, 10)




	    		this.$http.post('tk_import/import_business_staff',{
	                data: data,
	                shopId: this.list.id,
	                time: date
	              })
	             .then((data)=>{
	                this.$message({
	                  message: data.msg,
	                  type: 'info'
	                })

	                //this.get_import_status()

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
			//库存墨镜
			importf_magic(event) {
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
		                    arr1[i] = {wareId: '', sku: '',babyId: '', babyTitle: ''}
		                    
		                    for(var key in arr[i]) {



		                        if (key == '商家编码') {
		                            arr1[i]['wareId'] = arr[i][key]
		                        }

		                        if (key == '宝贝SKU') {
		                            arr1[i]['sku'] = arr[i][key]
		                        }

		                        if (key == '宝贝ID') {
		                            arr1[i]['babyId'] = arr[i][key]
		                        }
		                        if (key == '宝贝标题') {
		                            arr1[i]['babyTitle'] = arr[i][key]
		                        }
		                        
		                        
		                    }

		                   
		                
		            }

		            //console.info((new Date().getTime()-a)/1000)




		            console.info(arr1)
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
			import_inventory_magic(data) {

	    		this.loading_text = '库存魔镜上传中'


	    		let year = new Date(this.time).getFullYear()

	    		let month = new Date(this.time).getMonth()

	    		let day = new Date(this.time).getDate()

	    		let date = new Date(year,month,day,0,0,0).getTime().toString().substr(0, 10)


	    		this.$http.post('tk_import/import_inventory_magic',{
	                data: data,
	                shopId: this.list.id,
	                time: date

	              })
	             .then((data)=>{
	                this.$message({
	                  message: data.msg,
	                  type: 'info'
	                })

	                //this.get_import_status()

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
			//淘客店铺权限判定和展示
			get_taoke_data(){
        		this.$http.get(`shop/find_my_tk_shop`)
        		.then((data)=>{
          			///console.info(data)
          				if(data.data.length){
		          			for (let i=0; i<data.data.length; i++) {
			                    data.data[i].check = false
			                }
		          			this.taoke_tableData=data.data
		          			this.taoke_tableData[0].check = true

			                this.list = this.taoke_tableData[0]
        				}
        				else{
        					this.power_flag = false
	                		this.$message({
				              message: '您没有任何权限导入数据',
				              type: 'warning'
				            })
        				}
        		})
        		
      		},
      		//切换店铺
			change_shopNum(list){

				//console.info(list)
	    		for (let i=0; i<this.taoke_tableData.length;i++) {
	    			this.taoke_tableData[i].check = false
	    		}
	    		list.check = true 
	    		this.list = list
			},
			//淘客数据导入		
      		import_taoke(event){
      			//console.info(event)
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
		        that.loading_text = '淘客解析中'
		        var f = obj.files[0]
		        const formData = new FormData()
		        formData.append('file', f)

		            this.$http({
		              url:  `import/import_tk_daily?shopId=${this.list.id}&time=${date}`,
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
		        		that.loading_text = '淘客解析中'

		        		this.get_taoke_data
		              
		              //this.savereource(res)
		            })
      		},
      	

		}
	}
</script>
<style scoped lang="less">
	.is-checkeda {
	  border: 1px solid #67c23a !important;
	  color: #67c23a !important;
	}
	.el-checkbox-button, .el-checkbox-button__inner {
		margin-bottom: 4px;
	}
	.inpucus-datacenter {
	    opacity: 0;
	    //background: red;
	    width: 120px;
	    height: 120px;
	    z-index: 10;
	    position: absolute;
	    left: 240px;
	    top: 0px;

	    
	}
	.taoke_import{
		height: calc(100vh - 90px);
		&-head{
			height: 152px;
			margin: 16px 10px 12px 0px;
			//background-color: gray;
			
		}
		&-content{
			height: 675px;
			//background-color:pink;
			margin: 0 12px;
			border: 1px solid #c9c9c9;
			padding: 16px 20px;
			//overflow-y: scroll;
						
		}
	}
</style>