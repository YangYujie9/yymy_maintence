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
		    <a href="http://hzyymy.cn/hunting/%E5%95%86%E5%93%81%E7%BB%B4%E5%BA%A6%E5%AF%BC%E5%85%A5%E6%A8%A1%E7%89%88-2019_9_27.xlsx" style="position: absolute;right: 0px;">下载模版</a>
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
		    <a href="http://hzyymy.cn/hunting/%E5%BA%97%E9%93%BA%E7%BB%B4%E5%BA%A6%E5%AF%BC%E5%85%A5%E6%A8%A1%E7%89%88_2019_9_27.xlsx" style="position: absolute;right: 0px;">下载模版</a>
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


		  	<!--<div style="flex: 1;padding-left: 0px;">

		  		<div  v-if="!get_data_from_shop_edit">

			  		<p style="text-align: center;position: relative;top:-10px;">
					    <i @click="get_data_from_shop_edit = true"  v-show="!get_data_from_shop_flag && import_business_staff_flag" style="font-size: 110px;color: #67c23a;position: relative;" class="el-icon-edit pointer">
					    	
					    	
					    </i>

					    <i v-show="!get_data_from_shop_flag && !import_business_staff_flag" style="font-size: 120px;color: #8a8a8a;position: relative;" class="el-icon-timer">
					    	
					    	
					    </i>


					    <i @click="get_data_from_shop_edit = true" v-show="get_data_from_shop_flag" style="font-size: 120px;color: #67c23a;position: relative;" class="el-icon-success pointer">
					    </i>
					</p>

					<p v-show="!get_data_from_shop_flag && import_business_staff_flag" style="text-align: center">
				    	请填写数据
				    </p>

				    <p v-show="!get_data_from_shop_flag && !import_business_staff_flag" style="text-align: center">
				    	等待填写
				    </p>


				    <p v-show="get_data_from_shop_flag" style="text-align: center">
				    	继续编辑
				    </p>
				</div>


		  		<div v-if="get_data_from_shop_edit">
				    <p>
				    	<span style="color: #adadad;font-size: 14px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;钻展花费：</span>
				    	<el-input size="small" style="display: inline-block;width: 180px;" v-model="storedisition.zzhf" placeholder="请输入内容"></el-input>
				    </p>
				    <p  style="margin-top: 4px;">
				    	<span style="color: #adadad;font-size: 14px;margin-top: 4px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;福利花费：</span>
				    	<el-input size="small" style="display: inline-block;width: 180px;" v-model="storedisition.flhf" placeholder="请输入内容"></el-input>
				    </p>
				    <p style="margin-top: 4px;">
				    	<span style="color: #adadad;font-size: 14px;margin-top: 4px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;超级推荐：</span>
				    	<el-input size="small" style="display: inline-block;width: 180px;" v-model="storedisition.cjtj" placeholder="请输入内容"></el-input>
				    </p>
				    <p style="border-bottom: 1px solid #EBEEF5;margin-top: 4px;padding-bottom: 8px;">
				    	<span style="color: #adadad;font-size: 14px;margin-top: 4px;">&nbsp;&nbsp;当日推广预算：</span>
				    	<el-input size="small" style="display: inline-block;width: 180px;" v-model="storedisition.tgys" placeholder="请输入内容"></el-input>
				    </p>

				    <p style="margin-top: 10px;position: relative;height: 40px;">

				    	<el-button @click="cancelget_data_from_shop" style="position: absolute;right: 80px;" size="mini" plain>取消</el-button>

				    	<el-button @click="get_data_from_shop" style="position: absolute;right: 10px;" size="mini" type="success" >确定</el-button>
				    	
				    </p>
				</div>


			</div>-->


		  </div>
		</el-card>


		<el-card style="width: 48%; display: inline-block;margin-bottom: 10px;" class="box-card">
		  <div slot="header" style="position: relative;" class="clearfix">
		    <span>超级推荐</span>
		    <el-button  type="primary" size="mini" style="position: absolute;right: 0px;" @click="deal_error">未知错误处理</el-button>
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
				    	
				    	<input style="left:0px" type="file" @change="import_super_recommend" class="inpucus-datacenter-a pointer"  />
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
		  <div slot="header" style="position: relative;" class="clearfix">
		    <span>流量来源</span>
		    <el-button v-if="import_flow_sources_flag" style="float: right; padding: 0px;color:rgb(0, 0, 225);" type="text" @click="del_flow_sources">删除数据</el-button>

		  </div>
		  <div style="display: flex" class="text item">
		  	<div style="width: 166px;padding-left: 12px;color: #adadad;font-size: 14px;border-right: 1px solid #EBEEF5">
		  		<p style="line-height: 34px;">姓名：{{userInfo.staffName}}</p>
		  		<p style="margin-top: 36px;">店铺：{{list.shopName}}</p>
		  		<p style="line-height: 50px;">时间：{{timeformat}}</p>
		  	</div>

		  	<div style="flex: 1">
			    <p style="text-align: center;position: relative;top:-10px;">
				    <i v-show="!import_flow_sources_flag" style="font-size: 120px;color: #3259ce;position: relative;" class="el-icon-upload">
				    	
				    	<input style="left:0px" type="file" @change="analyse_flow_sources" class="inpucus-datacenter-a pointer"  />
				    </i>
<!-- 
				    <i v-show="!import_flow_sources_flag && !import_business_staff_flag" style="font-size: 120px;color: #8a8a8a;position: relative;" class="el-icon-timer">
				    	
				    	
				    </i> -->


				    <i v-show="import_flow_sources_flag" style="font-size: 120px;color: #67c23a;position: relative;" class="el-icon-success">

				    </i>
				</p>
			    <p v-show="!import_flow_sources_flag" style="text-align: center">
			    	请上传文件
			    </p>

<!-- 			    <p v-show="!import_flow_sources_flag && !import_business_staff_flag" style="text-align: center">
			    	等待上传
			    </p> -->


			    <p v-show="import_flow_sources_flag" style="text-align: center">
			    	上传成功
			    </p>
			</div>


		  </div>
		</el-card>

		<el-card style="width: 48%; display: inline-block;margin-bottom: 10px;" class="box-card">
		  <div style="position: relative;" slot="header" class="clearfix">
		    <span>上新表</span>
		    <a href="http://hzyymy.cn/hunting/%E4%B8%8A%E6%96%B0%E8%A1%A8%E5%AF%BC%E5%85%A5%E6%A8%A1%E7%89%88.xlsx" style="position: absolute;right: 0px;">下载模版</a>
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
		    <a href="http://hzyymy.cn/hunting/%E9%80%80%E8%B4%A7%E7%8E%87%E5%AF%BC%E5%85%A5%E6%A8%A1%E7%89%88.xlsx" style="position: absolute;right: 0px;">下载模版</a>
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

		<el-card style="width: 48%; display: inline-block;margin-bottom: 10px" class="box-card">
		  <div style="position: relative;" slot="header" class="clearfix">
		    <span>纳杰专用填表</span>
		    
		  </div>
		  <div style="display: flex" class="text item">
		  	<div style="width: 166px;padding-left: 12px;color: #adadad;font-size: 14px;border-right: 1px solid #EBEEF5">
		  		<p style="line-height: 34px;">姓名：{{userInfo.staffName}}</p>
		  		<p style="margin-top: 36px;">店铺：{{list.shopName}}</p>
		  		<p style="line-height: 50px;">时间：{{timeformat}}</p>
		  	</div>

			<div style="flex: 1;padding-left: 0px;">

		  		<div  v-if="!get_data_from_shop_edit">

			  		<p style="text-align: center;position: relative;top:-10px;">
					  <i @click="get_data_from_shop_edit = true" style="font-size: 110px;color: #67c23a;position: relative;" class="el-icon-edit pointer">
					    	
					    	
					    </i>

					      <!--<i v-show="!get_data_from_shop_flag && !import_business_staff_flag" style="font-size: 120px;color: #8a8a8a;position: relative;" class="el-icon-timer">
					    	
					    	
					    </i>


					    <i @click="get_data_from_shop_edit = true" style="font-size: 120px;color: #67c23a;position: relative;" class="el-icon-success pointer">
					    </i>-->
					</p>

					<p style="text-align: center">
				    	请填写数据
				    </p>

				    <!--<p v-show="!get_data_from_shop_flag && !import_business_staff_flag" style="text-align: center">
				    	等待填写
				    </p>


				    <p v-show="get_data_from_shop_flag" style="text-align: center">
				    	继续编辑
				    </p>-->
				</div>


		  		<div v-if="get_data_from_shop_edit">
				    <p style="margin-top: 12px;">
				    	<span style="color: #adadad;font-size: 14px;">&nbsp;&nbsp;销售额：</span>
				    	<el-input size="small" style="display: inline-block;width: 140px;" v-model="njsubmit.payment" placeholder="请输入内容"></el-input>
				    </p>
				    <p  style="margin-top: 16px;">
				    	<span style="color: #adadad;font-size: 14px;margin-top: 4px;">&nbsp;&nbsp;销售量：</span>
				    	<el-input size="small" style="display: inline-block;width: 140px;" v-model="njsubmit.payQty" placeholder="请输入内容"></el-input>
				    </p>
				    
				    <p style="margin-top: 10px;position: relative;height: 40px;">

				    	<el-button @click="cancelget_data_from_shop" style="position: absolute;right: 80px;" size="mini" plain>取消</el-button>

				    	<el-button @click="edit_nj_sell_report" style="position: absolute;right: 10px;" size="mini" type="success" >确定</el-button>
				    	
				    </p>
				</div>


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
      	njsubmit: {
      		payment: '',
      		payQty: ''
      	},
      	pickerOptions:{
      		disabledDate(time) {
             return time.getTime() > Date.now() - 24*60*60*1000;
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
      	import_flow_sources_flag:false,
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

    		let end = new Date(nowdate - 3600 * 1000 * 24 * 15).getTime()

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
    	edit_nj_sell_report() {
    		let year = new Date(this.time).getFullYear()

    		let month = new Date(this.time).getMonth()

    		let day = new Date(this.time).getDate()

    		let date = new Date(year,month,day,0,0,0).getTime().toString().substr(0, 10)

    		this.$http.post('import/edit_nj_sell_report',{
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

    		let month = new Date(this.time).getMonth()+1

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




    		this.$http.post(`import/delete_import_data`,{
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




    		this.$http.post('import/import_refund_rate',{
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
    		console.info(this.time)

    		let year = new Date(this.time).getFullYear()

    		let month = new Date(this.time).getMonth()

    		let day = new Date(this.time).getDate()

    		let date = new Date(year,month,day,0,0,0).getTime().toString().substr(0, 10)




    		this.$http.post('import/import_update_ware',{
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
	              url:  `import/import_through_train?shopId=${this.list.id}&time=${date}`,
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
	              url:  `import/import_super_recommend?shopId=${this.list.id}&time=${date}`,
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
                time: date
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
                time: date
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
    		this.$http.get(`shop/staff_shop_show`)
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
	              url:  `import/get_data_from_shop?shopId=${this.list.id}&time=${date}`,
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
    	get_data_from_shop() {
    		this.loading_text = '店铺维度数据上传中'

    		let year = new Date(this.time).getFullYear()

    		let month = new Date(this.time).getMonth()

    		let day = new Date(this.time).getDate()

    		let date = new Date(year,month,day,0,0,0).getTime().toString().substr(0, 10)









    		this.$http.post('import/get_data_from_shop',{
                data: [{
                	h1: this.storedisition.zzhf,
                	h2: this.storedisition.cjtj,
                	h3: this.storedisition.tgys,
                	h4: this.storedisition.flhf,
                }],
                shopId: this.list.id,
                time: date
              })
             .then((data)=>{
                this.$message({
                  message: data.msg,
                  type: 'info'
                })

                /*this.storedisition.zzhf = ''
                this.storedisition.cjtj = ''
                this.storedisition.tgys = ''
                this.storedisition.flhf = ''*/

                //this.get_data_from_shop_edit = false

                this.get_import_status()

                
              })
             .catch(()=>{
	            this.$message({
	              message: '接口报错',
	              type: 'error'
	            })
	       	})
    	},
    	cancelget_data_from_shop () {
    		this.storedisition.zzhf = ''
            this.storedisition.cjtj = ''
            this.storedisition.tgys = ''
            this.storedisition.flhf = ''

            this.get_data_from_shop_edit = false
    	},
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
                time: date

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

    	analyse_flow_sources(event){

    		let obj = event.target
    		if(!obj.files){
    			return
    		}


	        this.loading = true
	        this.loading_text = '流量来源上传中'
    		let file = obj.files[0]
    		let that = this
    		let rABS = false
    		let wb = null
    		let reader = new FileReader()
    		reader.onload = function(e){

    			let data = e.target.result

    			if(rABS){
	                wb = XLSX.read(btoa(that.fixdata(data)), {//手动转化
	                    type: 'base64'
	                });    			
	            } else {

	    			wb = XLSX.read(data, {
	    				type: 'binary'
	    			})
    			}


    			let arr = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])

    			let arr1 = []

    			for (let i=0;i<arr.length;i++){
    				arr1[i] = {
    					trafficSources: '',
    					sourcesDetail: '',
    					visitorNum: '',
    					orderMoney: '',
    					orderPayMoney: '',
    					percentConversion: '',
    					payMoney: '',
    					payMoneyNum: '',
    					payPercentConversion: '',
    					guestPrice: '',
    					attentionShopNum: '',
    					collectShopNum: '',
    					purchasedNum: '',
    					newPeople: '',
    					uv: '',
    				}

    				for(var key in arr[i]){
    					if(key == '流量来源'){
    						arr1[i]['trafficSources'] = arr[i][key]
    					}
    					if(key == '来源明细'){
    						arr1[i]['sourcesDetail'] = arr[i][key]
    					}  
    					if(key == '访客数'){
    						arr1[i]['visitorNum'] = arr[i][key]
    					}
    					if(key == '下单金额'){
    						arr1[i]['orderMoney'] = arr[i][key]
    					}
    					if(key == '下单买家数'){
    						arr1[i]['orderPayMoney'] = arr[i][key]
    					}  
    					if(key == '下单转化率'){
    						arr1[i]['percentConversion'] = arr[i][key]
    					}
    					if(key == '支付金额'){
    						arr1[i]['payMoney'] = arr[i][key]
    					}
    					if(key == '支付买家数'){
    						arr1[i]['payMoneyNum'] = arr[i][key]
    					}  
    					if(key == '支付转化率'){
    						arr1[i]['payPercentConversion'] = arr[i][key]
    					}
    					if(key == '客单价'){
    						arr1[i]['guestPrice'] = arr[i][key]
    					}
    					if(key == '关注店铺买家数'){
    						arr1[i]['attentionShopNum'] = arr[i][key]
    					}  
    					if(key == '收藏商品买家数'){
    						arr1[i]['collectShopNum'] = arr[i][key]
    					}
    					if(key == '加购人数'){
    						arr1[i]['purchasedNum'] = arr[i][key]
    					}
    					if(key == '新访客'){
    						arr1[i]['newPeople'] = arr[i][key]
    					}  
    					if(key == 'UV价值'){
    						arr1[i]['uv'] = arr[i][key]
    					}
    				}

    			}


    			that.import_flow_sources(arr1)

    			event.target.value = ''




    		}

	        if (rABS) {
	            reader.readAsArrayBuffer(file);
	        } else {
	            reader.readAsBinaryString(file);
	        }
    	},

    	import_flow_sources(data){
    		let year = new Date(this.time).getFullYear()

    		let month = new Date(this.time).getMonth()

    		let day = new Date(this.time).getDate()




    		let date = new Date(year,month,day,0,0,0).getTime().toString().substr(0, 10)

    		this.$http.post('shopFlow/import_table',{
                file: data,
                shopId: this.list.id,
                date: date

              })
             .then((data)=>{
                this.$message({
                  message: data.msg,
                  type: 'info'
                })

                this.get_import_status()

                this.loading = false
	        	//this.loading_text = '库存魔镜导入中'

                  
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




    		this.$http.get(`import/get_import_status?shopId=${this.list.id}&time=${date}`)
                .then((data)=>{
                	this.import_business_staff_flag = false
			      	this.import_through_train_flag = false
			      	this.import_inventory_magic_flag = false
			      	this.get_data_from_shop_flag = false
			      	this.get_data_from_ware_id_flag = false
			      	this.import_update_ware_flag = false
			      	this.import_super_recommend_flag = false
			      	this.import_flow_sources_flag = false
                	

                	if (!data.data.length) {
                		this.import_business_staff_flag = false
				      	this.import_through_train_flag = false
				      	this.get_data_from_shop_flag = false
				      	this.import_inventory_magic_flag = false
				      	this.get_data_from_ware_id_flag = false
				      	this.import_update_ware_flag = false
				      	this.import_super_recommend_flag = false
				      	this.import_flow_sources_flag = false
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

                			if (data.data[i].tableName == '无线店铺流量来源') {
                				this.import_flow_sources_flag = true
                				
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


    	del_flow_sources(){
    		        let year = new Date(this.time).getFullYear()

		    		let month = new Date(this.time).getMonth()

		    		let day = new Date(this.time).getDate()


    		this.$confirm(`确认删除${year}-${month+1}-${day}导入${this.list.shopName}店铺的流量来源数据?`)
          		.then(_ => {






		    		let date = new Date(year,month,day,0,0,0).getTime().toString().substr(0, 10)

		    		this.$http.get(`shopFlow/del_file?shopId=${this.list.id}&date=${date}`)
		             .then((data)=>{
		                this.$message({
		                  message: data.msg,
		                  type: 'info'
		                })

		                this.get_import_status()

			        	//this.loading_text = '库存魔镜导入中'

		                  
		              })
		             .catch(()=>{
			            this.$message({
			              message: '接口报错',
			              type: 'error'
			            })
			       	})		          
		          })
		        .catch(_ => {});

		    	
         },
         deal_error(){
         	//console.info(this.time)
         	//console.info(this.list.id)

         	let year = new Date(this.time).getFullYear()

    		let month = new Date(this.time).getMonth()

    		let day = new Date(this.time).getDate()

    		let date = new Date(year,month,day,0,0,0).getTime().toString().substr(0, 10)

         	this.$http.get(`import/delete_wrong_super?type=${""}&time=${date}&shopId=${this.list.id}`)
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
