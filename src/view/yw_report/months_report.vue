<template>
	<div class="online">
		<!-- <el-button @click="test">testxiazai</el-button> -->
		<el-button v-if="$isInArray(17)"type="primary" size="mini" style="position: absolute;right:20px;top:-40px" @click="edit_dialog">上传</el-button>
		<el-dialog
			title="月度报表上传"
			:visible.sync="dialog_Visible"
			width="430px">
			<el-select v-model="value" placeholder="请选择上传报表类型">
			    <el-option
			    	v-for="item in excelType"
			      	:key="item.value"
			      	:label="item.label"
			      	:value="item.value">
			    </el-option>
			</el-select>
			

			<p v-show="this.value"style="text-align: center;position: relative;top:20px;">
				

		    	<i v-show="!import_report_data_flag" style="font-size: 120px;color: #3259ce;position: relative;" class="el-icon-upload">
		    	
			    	<input style="left:0px" type="file" @change="importExcel" class="inpucus-datacenter pointer"  />
			    </i>


			    <i v-show="import_report_data_flag " style="font-size: 120px;color: #67c23a;position: relative;" class="el-icon-success">

					<input style="left:0px" type="file"  class="inpucus-datacenter pointer"  />
				</i>
			</p>

			<p v-show="!import_report_data_flag&&this.value " style="text-align: center">
				请上传文件
			</p>

			<p v-show="import_report_data_flag " style="text-align: center">
				上传成功
			</p>
			
		    
			<span slot="footer" class="dialog-footer">
		    	<el-button @click="dialog_Visible = false;f5()">退出</el-button>
		    	<!-- <el-button type="primary" @click="import_Excel">确 定</el-button> -->
		  	</span>

		</el-dialog>
		<div class="online_wrap">
			
			<div class="online_wrap_top">
				
				<el-select v-model="year" size="mini"placeholder="请选择年份" @change="f5">
			    	<el-option
				    	v-for="item in years"
				      	:key="item.value"
				      	:label="item.label"
				      	:value="item.value">
				    </el-option>
				</el-select>
							
			</div>


			<div class="online_wrap_content">
				<div  class="box" v-if="this.$isInArray(65)">
					
					<div class="box_top">
						<div class="box_top_title">
						菲碧店铺各品类付款占比表																									
						</div>
						<el-button v-if="$isInArray(17)" type="primary" class="box_top_button"@click="delete_excel(excelType[0],tableData_1)" size="mini">删除</el-button>
					</div>

					<div class="box_content">
						<div v-for="file in tableData_1" :key="file.id" style="margin-bottom: 5px"class="file">
							<el-checkbox class="checkbox" v-if="$isInArray(17)" v-model="file.checked"></el-checkbox>
							<area @dblclick="download(file.excelLink)"class="iconfont iconfont-left iconbiaoge" style="font-size: 30px;"></area>			
							<a @dblclick="download(file.excelLink)" class="file_name">{{file.excelName}}</a>
							<el-button size="mini" type="success"class="button"@click="download(file.excelLink)">下载</el-button>
						</div>																		
					</div>					
				</div>
				<div  class="box" v-if="this.$isInArray(71)">
					
					<div class="box_top">
						<div class="box_top_title">
						菲碧店铺近14天销售数据模板																											
						</div>	
						<el-button v-if="$isInArray(17)" type="primary" class="box_top_button"@click="delete_excel(excelType[6],tableData_7)" size="mini">删除</el-button>	
					</div>

					<div class="box_content">

						<div v-for="file in tableData_7" :key="file.id" style="margin-bottom: 5px"class="file">
							<el-checkbox class="checkbox" v-if="$isInArray(17)" v-model="file.checked"></el-checkbox>
							<area @dblclick="download(file.excelLink)"class="iconfont iconfont-left iconbiaoge" style="font-size: 30px;"></area>			
							<a @dblclick="download(file.excelLink)" class="file_name">{{file.excelName}}</a>
							<el-button size="mini" type="success" class="button"@click="download(file.excelLink)">下载</el-button>
						</div>																		
					</div>					
				</div>

				

				<div  class="box" v-if="this.$isInArray(75)">
					
					<div class="box_top">
						<div class="box_top_title">
						女鞋正常单快递表																											
						</div>	
						<el-button v-if="$isInArray(17)" type="primary" class="box_top_button"@click="delete_excel(excelType[10],tableData_11)" size="mini">删除</el-button>	
					</div>

					<div class="box_content">

						<div v-for="file in tableData_11" :key="file.id" style="margin-bottom: 5px"class="file">
							<el-checkbox class="checkbox" v-if="$isInArray(17)" v-model="file.checked"></el-checkbox>
							<area @dblclick="download(file.excelLink)"class="iconfont iconfont-left iconbiaoge" style="font-size: 30px;"></area>			
							<a @dblclick="download(file.excelLink)" class="file_name">{{file.excelName}}</a>
							<el-button size="mini" type="success" class="button"@click="download(file.excelLink)">下载</el-button>
						</div>																		
					</div>					
				</div>

				<div  class="box" v-if="this.$isInArray(68)">
					
					<div class="box_top">
						<div class="box_top_title">
						服装福利单快递表																				
						</div>
						<el-button v-if="$isInArray(17)" type="primary" class="box_top_button"@click="delete_excel(excelType[3],tableData_4)" size="mini">删除</el-button>
					</div>

					<div class="box_content">

						<div v-for="file in tableData_4" :key="file.id" style="margin-bottom: 5px"class="file">
							<el-checkbox class="checkbox" v-if="$isInArray(17)" v-model="file.checked"></el-checkbox>
							<area @dblclick="download(file.excelLink)"class="iconfont iconfont-left iconbiaoge" style="font-size: 30px;"></area>			
							<a @dblclick="download(file.excelLink)" class="file_name">{{file.excelName}}</a>
							<el-button size="mini" type="success"class="button"@click="download(file.excelLink)">下载</el-button>
						</div>																		
					</div>					
				</div>
				<div  class="box" v-if="this.$isInArray(69)">
					
					<div class="box_top">
						<div class="box_top_title">
						服装正常单快递表																				
						</div>
						<el-button v-if="$isInArray(17)" type="primary" class="box_top_button"@click="delete_excel(excelType[4],tableData_5)" size="mini">删除</el-button>			
					</div>

					<div class="box_content">

						<div v-for="file in tableData_5" :key="file.id" style="margin-bottom: 5px"class="file">
							<el-checkbox class="checkbox" v-if="$isInArray(17)" v-model="file.checked"></el-checkbox>
							<area @dblclick="download(file.excelLink)"class="iconfont iconfont-left iconbiaoge" style="font-size: 30px;"></area>			
							<a @dblclick="download(file.excelLink)" class="file_name">{{file.excelName}}</a>
							<el-button size="mini" type="success"class="button"@click="download(file.excelLink)">下载</el-button>
						</div>																		
					</div>					
				</div>
				<div  class="box" v-if="this.$isInArray(70)">					
					<div class="box_top">
						<div class="box_top_title">
						服装追件快递表																				
						</div>
						<el-button v-if="$isInArray(17)" type="primary" class="box_top_button"@click="delete_excel(excelType[5],tableData_6)" size="mini">删除</el-button>		
					</div>

					<div class="box_content">

						<div v-for="file in tableData_6" :key="file.id" style="margin-bottom: 5px"class="file">
							<el-checkbox class="checkbox" v-if="$isInArray(17)" v-model="file.checked"></el-checkbox>
							<area @dblclick="download(file.excelLink)"class="iconfont iconfont-left iconbiaoge" style="font-size: 30px;"></area>			
							<a @dblclick="download(file.excelLink)" class="file_name">{{file.excelName}}</a>
							<el-button size="mini" type="success"class="button"@click="download(file.excelLink)">下载</el-button>
						</div>																		
					</div>					
				</div>
				
				<div  class="box" v-if="this.$isInArray(72)">
					
					<div class="box_top">
						<div class="box_top_title">
						初彤店铺半月退款率表																											
						</div>	
						<el-button v-if="$isInArray(17)" type="primary" class="box_top_button"@click="delete_excel(excelType[7],tableData_8)" size="mini">删除</el-button>	
					</div>

					<div class="box_content">

						<div v-for="file in tableData_8" :key="file.id" style="margin-bottom: 5px"class="file">
							<el-checkbox class="checkbox" v-if="$isInArray(17)" v-model="file.checked"></el-checkbox>
							<area @dblclick="download(file.excelLink)"class="iconfont iconfont-left iconbiaoge" style="font-size: 30px;"></area>			
							<a @dblclick="download(file.excelLink)" class="file_name">{{file.excelName}}</a>
							<el-button size="mini" type="success" class="button"@click="download(file.excelLink)">下载</el-button>
						</div>																		
					</div>					
				</div>
				<div  class="box" v-if="this.$isInArray(73)">
					
					<div class="box_top">
						<div class="box_top_title">
						菲碧店铺半月退款率表																											
						</div>	
						<el-button v-if="$isInArray(17)" type="primary" class="box_top_button"@click="delete_excel(excelType[8],tableData_9)" size="mini">删除</el-button>	
					</div>

					<div class="box_content">

						<div v-for="file in tableData_9" :key="file.id" style="margin-bottom: 5px"class="file">
							<el-checkbox class="checkbox" v-if="$isInArray(17)" v-model="file.checked"></el-checkbox>
							<area @dblclick="download(file.excelLink)"class="iconfont iconfont-left iconbiaoge" style="font-size: 30px;"></area>			
							<a @dblclick="download(file.excelLink)" class="file_name">{{file.excelName}}</a>
							<el-button size="mini" type="success" class="button"@click="download(file.excelLink)">下载</el-button>
						</div>																		
					</div>					
				</div>
				<div  class="box" v-if="this.$isInArray(74)">
					
					<div class="box_top">
						<div class="box_top_title">
						形色店铺半月退款率表																											
						</div>	
						<el-button v-if="$isInArray(17)" type="primary" class="box_top_button"@click="delete_excel(excelType[9],tableData_10)" size="mini">删除</el-button>	
					</div>

					<div class="box_content">

						<div v-for="file in tableData_10" :key="file.id" style="margin-bottom: 5px"class="file">
							<el-checkbox class="checkbox" v-if="$isInArray(17)" v-model="file.checked"></el-checkbox>
							<area @dblclick="download(file.excelLink)"class="iconfont iconfont-left iconbiaoge" style="font-size: 30px;"></area>			
							<a @dblclick="download(file.excelLink)" class="file_name">{{file.excelName}}</a>
							<el-button size="mini" type="success" class="button"@click="download(file.excelLink)">下载</el-button>
						</div>																		
					</div>					
				</div>

				<div  class="box" v-if="this.$isInArray(67)">
					
					<div class="box_top">
						<div class="box_top_title">
						每月付款客人退款率表																				
							<el-button v-if="$isInArray(17)" type="primary" class="box_top_button"@click="delete_excel(excelType[2],tableData_3)" size="mini">删除</el-button>
						</div>																						
					</div>

					<div class="box_content">

						<div v-for="file in tableData_3" :key="file.id" style="margin-bottom: 5px"class="file">
							<el-checkbox class="checkbox" v-if="$isInArray(17)" v-model="file.checked"></el-checkbox>
							<area @dblclick="download(file.excelLink)"class="iconfont iconfont-left iconbiaoge" style="font-size: 30px;"></area>			
							<a @dblclick="download(file.excelLink)" class="file_name">{{file.excelName}}</a>
							<el-button size="mini" type="success"class="button"@click="download(file.excelLink)">下载</el-button>
						</div>																	
					</div>					
				</div>

				<div  class="box" v-if="this.$isInArray(66)">
					
					<div class="box_top">
						<div class="box_top_title">
						财务结算表																											
						</div>
						<el-button v-if="$isInArray(17)" type="primary" class="box_top_button"@click="delete_excel(excelType[1],tableData_2)" size="mini">删除</el-button>
					</div>

					<div class="box_content">

						<div v-for="file in tableData_2" :key="file.id" style="margin-bottom: 5px"class="file">
							<el-checkbox class="checkbox" v-if="$isInArray(17)" v-model="file.checked"></el-checkbox>
							<area @dblclick="download(file.excelLink)"class="iconfont iconfont-left iconbiaoge" style="font-size: 30px;"></area>			
							<a @dblclick="download(file.excelLink)" class="file_name">{{file.excelName}}</a>
							<el-button size="mini" type="success"class="button"@click="download(file.excelLink)">下载</el-button>
						</div>																		
					</div>					
				</div>


			</div>


		</div>
		
		
	</div>
</template>
<script >

	export default{
		
		data(){
			return{
				value:'',
				year:new Date().getFullYear(),
				years:[],
				excelType:[],																
				tableData_1:[],
				tableData_2:[],
				tableData_3:[],
				tableData_4:[],
				tableData_5:[],
				tableData_6:[],
				tableData_7:[],
				tableData_8:[],
				tableData_9:[],
				tableData_10:[],
				tableData_11:[],
				dialog_Visible:false,
				tempid:[],
				import_report_data_flag:false,

			}
		},

		computed:{

		},
		mounted(){
			this.get_year() 
 			this.get_excelType_data()
      
    	},
    	methods:{
    		//获取年份
      		get_year(){
      			this.$http.get(`monthly/get_year_list`)
				.then((data)=>{
					if(data.code == '200'){
						let arr = []
						//console.info(data)
						
						for (let i=0;i<data.data.length;i++) {
							
							
								arr.push({
									
									value:data.data[i].year, 
									label:data.data[i].year,
									
								})		
						
						}

						this.years= arr

						

					}
				})
      			
      		},
    		//获取表格类型
    		get_excelType_data(){
    			this.$http.get(`monthly/get_excel_type_list`)
				.then((data)=>{
					if(data.code == '200'){
						let arr = []
						//console.info(data)
						
						for (let i=0;i<data.data.length;i++) {
							
							
								arr.push({
									
									value:data.data[i].id, 
									label:data.data[i].excelType,
									//disabled:this.$isInArray(i+65)
								})
							

								
						
						}

						this.excelType= arr
						this.f5()
						console.info
						//console.info(this.excelType)

					}
				})

    		},
    		//获取所有表格数据
    		f5(){
    			this.get_excel_data(this.excelType[0],'1')
				this.get_excel_data(this.excelType[1],'2')
				this.get_excel_data(this.excelType[2],'3')
				this.get_excel_data(this.excelType[3],'4')
				this.get_excel_data(this.excelType[4],'5')
				this.get_excel_data(this.excelType[5],'6')
				this.get_excel_data(this.excelType[6],'7')
				this.get_excel_data(this.excelType[7],'8')
				this.get_excel_data(this.excelType[8],'9')
				this.get_excel_data(this.excelType[9],'10')
				this.get_excel_data(this.excelType[10],'11')
    		},
    		//上传dialog
    		edit_dialog(){
    			this.dialog_Visible=true

    		},
    		//上传excel
			importExcel(event){
      			//console.info(event)
      			let obj = event.target
		        if (!obj.files) {
		            return;
		        }

		        let that = this

		        that.loading = true
		        that.loading_text = '文件上传中'
		        var f = obj.files[0]
		        const formData = new FormData()
		        formData.append('file', f)
		        //console.info(this.value)
		       

	            this.$http({
	              url:  `monthly/import_excel?excelType=${this.value}`,
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
	        		that.loading_text = '文件上传中'


	            })
      		},
      		//获取当前excelType下的文件
    		get_excel_data(item,tag){  
    		//console.info(item)  		   			    			    			
				this.$http.post(`monthly/get_excel`,{       			
		            excelType:item.value,
		            year:this.year,		            
            
          		})
          		.then((data)=>{
	        	
		        	if(data.code == '200'){
		        		//console.info(data)
		        		
		        		let arr = []		        		

						for (let i=0; i<data.data.length;i++) {
							arr.push({
								excelName:data.data[i].excelName,
								excelLink:data.data[i].excelLink,
								id:data.data[i].id,
								checked:false,							
							})
							
						}
						//console.info(arr)
						this[`tableData_${tag}`] = arr

		            	
		          	} else{

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
    		//下载
    		download(link){				
    			window.open(link)
    		},
    		//删除文件
    		delete_excel(item,obj) {
        		this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          			confirmButtonText: '确定',
          			cancelButtonText: '取消',
          			type: 'warning'
        		}).then(() => {

          			for(let i=0;i<obj.length;i++){
	    				if(obj[i].checked==true)
	    				{
	    					this.tempid.push(obj[i].id)

	    				}
	    			}
	    			//console.info(this.tempid)
	    			this.$http.post(`monthly/del_excel`,{       			
			            excelType:item.value,
			            ids:this.tempid.join(','),		            
	            
	          		})
	          		.then((data)=>{
		        	
			        	if(data.code == '200'){

			        		this.get_excel_data(item,item.value)
			        		
							return this.$message({
			              	message:data.msg,
			              	type:'success'
			            	})

			            	
			          	} else{

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

        		}).catch(() => {
		          	this.$message({
			            type: 'info',
			            message: '已取消删除'
          			});          
        		});
      		},
      		test(){

      			this.$http.get(`monthly/test`)
				.then((data)=>{
					if(data.code == '200'){
						console.info("11111123")
					}
				})

      		},
    	
    		//日期
		    // fmtDate(obj){
		    //     var date =  new Date(obj*1000);
		    //     var y = 1900+date.getYear();
		    //     var m = "0"+(date.getMonth()+1);
		    //     var d = "0"+date.getDate();
		    //     //var h = date.getHours();
		    //     //console.info(h)
		    //     return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
		    //     //return y+"-"+m.substring(m.length-2,m.length);
		    // },


    	},
    	
	}
</script>
<style scoped lang="less">
.online{
	font-size:14px; 
    position: relative;
    height: calc(100vh - 120px);
    margin: 0 20px;
    
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
    &_wrap{
	  //overflow-y: scroll;
      height: calc(100vh - 130px);


      // .cursor{
      //   cursor: pointer;
      // }

    	&_top{
	        height:20px;
	        //margin-top: 20px;        
	        //padding-left: 20px;
	        //background-color:red;
	        position: relative;
	        padding-left: 10px; 
    	}
    	&_content{
	        height: calc(100vh - 195px);
	        //background-color:green;
	        margin-top: 10px;
	        width: 100%;
	        position:relative;
	        overflow-y: scroll;
	        .box{
	        	height: 24%;
	        	width: 31%;
	        	display:inline-block;
	        	//background-color:gray;
	        	position:relative;
	        	margin: 10px 10px 5px 10px;
	        	border-style:solid;
	        	border-width:1px;
	        	border-color:#ebeef5;
	        	box-shadow: 5px 5px 3px rgb(248,248,248);
	        	//overflow-y: scroll;	        	
	        	&_top{
	        		height:50px;
	        		border-bottom-style:solid;
	        		border-width:2px;
	        		border-color:#ebeef5;
	        		background-color:#606266;
	        		color: #ffffff;
	        		//black
	        		&_title{
	        			font-size: 16px;
	        			line-height:50px; 
	        			padding-left:10px;

	        		}
	        		&_button{
	        			position:absolute;
	        			right:10px;
	        			top: 10px
	        		}
	        		
	        	}
	        	&_content{
	        		height: 73%;
	        		overflow-y: scroll;
	        		.file{
	        			margin-left:10px;
	        			margin-top:10px;
	        			position:relative; 
	        			&_name{
	        				font-size: 15px;
	        				position:absolute; 
	        				top:5px;
	        			}
	        			.button{
	        				position:absolute;
	        				right: 7px;

	        			}
	        			.checkbox{
	        				//position:absolute;
	        				top: -7px;
	        			}
	        		}
	        	}
	        }
	    }
	}
}

</style>
