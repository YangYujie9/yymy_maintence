<template>
  <div @click="close_all" class="car">
  	<div class="car-top">
  		<div style="display: inline-block;" class="el-checkbox-group">
  			<button @click="changetype(index)" :class="{'el-button--success-a':list.choose}" v-for="(list,index) in typelist" class="el-button-s" >
		    	<span>{{list.name}}</span>
		    </button>
  		</div>


  		<el-input style="width: 220px;margin-left: 16px;" placeholder="请输入货号" v-model="search.wareId">
		    
		</el-input>

		<el-cascader
		    :options="shop_brand"
		    placeholder="选择品牌店铺"
		    v-model="search.shopIds" 
		    clearable>
		   
		</el-cascader>

		<!--<el-cascader
		    :options="shop_brand"
		    :props="props"
		    collapse-tags
		    ref="checkshopid"
		    placeholder="选择品牌店铺"
		    v-model="search.shopIds"
		    clearable>
		   
		</el-cascader>-->


		<el-button @click="get_drive_report" class="monbtn" plain>搜索</el-button>

		


		<!-- <el-button @click="drive_report_reverse">切换时序</el-button> -->

		<el-button v-if="search.type != 'super'" @click="dialogVisible_sort = true" style="position: absolute;right: 0px;" class="monbtn" plain>筛选查询</el-button>
		<el-button v-if="search.type == 'super'" @click="dialogVisible_sort_super = true" style="position: absolute;right: 0px;" class="monbtn" plain>筛选查询</el-button>
  	</div>
  	<div ref="car_wrap" v-loading = "loading" style="position: relative;" class="car-wrap">

  		<div style="position: absolute;left: 20px;top: 8px;font-size: 16px;">
  			<el-switch
		  v-model="show_span"
		  active-color="#13ce66"
		  inactive-color="#cccccc">
		</el-switch><span style="font-size: 14px;padding-left: 6px;">间隔</span>
		</div>
  		<div :style="{height: (get_genshangxia_height+270)+'px'}" v-for="(list,index_list) in datalist" class="car_list">
  			<div class="car_list-top">
  				<i @click="update_fire_status(list)" :class="{iconhuo_red: list.fireStatus}" class="iconfont iconhuo pointer"></i>
  				基础信息

  				<el-button
		          size="mini"
		          type="primary"
		          v-if="search.type == 'drive'"
		          @click="edit_drive_status(list,0)"
		          class="btn_close"
		          >停车</el-button>

		          <el-button
		          size="mini"
		          type="primary"
		          v-if="search.type == 'stop'"
		          @click="edit_drive_status(list,1)"
		          class="btn_close"
		          >开车</el-button>
  			</div>

  			<div class="car_list-wrap">
  				<div style="width: 100px;height: 120px;position: relative;">
	  				<el-upload
		              style="display: inline-block;position: relative;"
		              class="upload-demo"
		              :show-file-list="false"
		              :http-request="uploadpicture"
		              action="http://upload-z2.qiniup.com/"
		              >
		             <img v-if="list.imgUrl" style="width: 100px;height:120px;object-fit: cover" :src="list.imgUrl"/>

  					<i v-else style="font-size: 100px;margin-top: 4px" class="el-icon-picture-outline"></i>
		            </el-upload>


  				</div>
  				<div class="img_right">
  					<div class="first_title">
  						<p>款号</p>
  						<p style="font-size: 14px;line-height: 18px">{{list.wareId ? list.wareId: '&nbsp;'}}<br>({{list.babyId}})</p>
  						<p >累计销量</p>
  						<p>{{list.salesTotal ? list.salesTotal: '&nbsp;'}}</p>
  					</div>
  					<div class="first_title">
  						<p>店铺</p>
  						<p>{{list.shopName ? list.shopName: '&nbsp;'}}</p>
  						<p style="margin-top: 16px;">多店开车</p>
  						<p><span @click="get_more_shop_data(list.wareId)" class="pointer" style="color: #0099ff">{{list.moreShop ? list.moreShop: '&nbsp;'}}</span></p>
  					</div>
  					<div class="first_title">
  						<p>公司类目/淘宝类目</p>
  						<p>{{list.category ? empty_TAMLL(list.category): '&nbsp;'}}</p>
  						<p style="margin-top: 16px;">7天收藏率(%)</p>
  						<p>{{list.collectionRate ? list.collectionRate: '&nbsp;'}}</p>
  					</div>
  					<div class="first_title">
  						<p>开车天数</p>
  						<p>{{list.driveDays ? list.driveDays: '&nbsp;'}}</p>
  						<p style="margin-top: 16px;">7天加购率(%)</p>
  						<p>{{list.itemfavorRate ? list.itemfavorRate: '&nbsp;'}}</p>
  					</div>

  					<div class="first_title">
  						<p>开车日期</p>
  						<p>{{list.driveDate ? fmtDate(list.driveDate): '&nbsp;'}}</p>
  						<p style="margin-top: 16px;">上架日期</p>
  						<p>{{list.newArriveDate ? fmtDate(list.newArriveDate): '&nbsp;'}}</p>
  					</div>



  					<div class="first_title">
  						

  						<el-popover
						    placement="right"
						    title="退款率"
						    width="200"
						    trigger="hover"
						    content="">
	  						<p style="font-size: 14px;" v-for="colorlist in list.refundRate">{{`${colorlist.color}退款率：${colorlist.refundRate}`}}</p>


	  						<p slot="reference">各颜色退款率(%)</p>
	  					</el-popover>

	  					<p style="font-size: 14px;" v-if="index<4" v-for="(colorlist,index) in list.refundRate">{{`${colorlist.color}：${colorlist.refundRate}`}}</p>
  						

  						
  					</div>
  					<div class="first_title">
  						<p>宝贝链接</p>
  						<p><el-button style="margin-top: 6px;" @click="openurl(list.link)" size="mini" type="success">跳转</el-button></p>
  						<p style="margin-top: 2px;">同款链接</p>
  						<p><el-button  style="margin-top: 6px;" @click="openurl(list.sameLink)"   size="mini" type="success">跳转</el-button></p>
  					</div>

  					<!--<div class="first_title">
  						<p>备注</p>
  						<p>{{list.memo}}</p>
  						<p>
  							<el-input
							type="textarea"
							placeholder="请输入内容"
							v-model="drivemome"
							>
							</el-input>
						</p>
  					</div>-->
  					
  					
  					
  				</div>
  				
  			</div>

  			<div v-if="!list.list  && list.data_detail" ref="car_list_bottom" class="car_list-bottom">
	  			<div  @click="get_one_ware_more_data_a(list)" class="car_list-p pointer">

	  				<span>更多数据</span>
	  			</div>
	  			
  			</div>
  			<div :style="{height: (get_genshangxia_height+50)+'px'}" v-if="list.list && list.data_detail"  ref="car_list_bottom" class="car_list-bottom">
  				
				<div v-if="list.poptip_show"  class="div_qushi">
						<div class="div_qushi_title">
							{{choose_single_name}}
						</div>

					<div :id="`div_qushi_content_a${index_list}`" class="div_qushi_content">
						
					</div>
				</div>

				<div class="date_tip">
					内容/时间
				</div>
				<div :style="{width: car_list_bottom_width + 'px'}" class="date_top">
					<ul  :style="{left: -list.scrollleft + 'px',width: list.date_a.length*80 + 'px'}" >
						<li style="font-size: 12px;" v-for="detail in list.date_a">{{fmtDate_yue(detail)}}</li>
						
					</ul>
				</div>




				<div style="border-top: 1px solid #DCDFE6; top: -1px;" :style="{height: (get_genshangxia_height)+'px'}" class="date_left">
					<ul v-if="search.type != 'super'" class="pointer"  >
						<!--<li  @click.stop="choose_single(list, value, key,index_list)"  v-if="value.choose" v-for="(value, key, index) in dataa.total.list">{{value.name}}</li>
						<li @click.stop="choose_single(list, value, key,index_list)"  v-if="value.choose" v-for="(value, key, index) in dataa.car.list">{{value.name}}</li>

						<li @click.stop="choose_single(list, value, key,index_list)"  v-if="value.choose" v-for="(value, key, index) in dataa.store.list">{{value.name}}</li>-->

						<li :style="{background : value.color=='#FFFFFF' ? '':value.color}"  :class="{pinka_show_span: (!value.columnId && !show_span) ? true:  false,pinka: !value.columnId && show_span? true:false}" @click.stop="choose_single(list, value, index,index_list)"  v-if="value.columnId!=9" v-for="(value, index) in choose_sort_list">
							{{value.cname}}
						</li>

						
						<li >备注</li>
						
					</ul>
					<ul v-if="search.type == 'super'" class="pointer"  >
						<!--<li  @click.stop="choose_single(list, value, key,index_list)"  v-if="value.choose" v-for="(value, key, index) in dataa.total.list">{{value.name}}</li>
						<li @click.stop="choose_single(list, value, key,index_list)"  v-if="value.choose" v-for="(value, key, index) in dataa.car.list">{{value.name}}</li>

						<li @click.stop="choose_single(list, value, key,index_list)"  v-if="value.choose" v-for="(value, key, index) in dataa.store.list">{{value.name}}</li>-->

						<li :style="{background : value.color=='#FFFFFF' ? '':value.color}"  :class="{pinka_show_span: (!value.columnId && !show_span) ? true:  false,pinka: !value.columnId && show_span? true:false}"  @click.stop="choose_single(list, value, index,index_list)"  v-if="value.columnId!=9" v-for="(value, index) in choose_sort_list_super">
							{{value.cname}}
						</li>

						
						<li >备注</li>
						
					</ul>

					


				</div>

				<div   v-if="search.type != 'super'" :style="{width: car_list_bottom_width + 'px',height: (get_genshangxia_height+20)+'px'}"   @scroll="scroll_left($event,list)" class="date_content">
					

					

					<ul :class="{pinkaul_show_span: (!value.columnId && !show_span) ? true:  false,pinkaul: !value.columnId && show_span? true:false}"  v-if="(value.columnId!=9)" :style="{width: list.date_a.length*80+ 'px'}" v-for="(value, key) in choose_sort_list">


						<li :style="{background : value.color=='#FFFFFF' ? '':value.color}"  v-if="value.columnId && value.ename != 'forecastCost'"  v-for="index in list[value.ename+'_a']">
							{{index}}{{(value.columnId == 14 || value.columnId == 19 || value.columnId == 35 || value.columnId == 13 ||value.columnId == 26 || value.columnId == 29 || value.columnId == 30 || value.columnId == 35 || value.columnId == 32 || value.columnId == 50	|| value.columnId == 40	) ? '%':''}}
						</li>

						<li :style="{background : value.color=='#FFFFFF' ? '':value.color}"  v-if="value.columnId && value.ename == 'forecastCost'"  v-for="(index,index_forecastCost) in list[value.ename+'_a']">
							

							<span class="pointer" style="color: green" @click="change_forecast_cost(index_forecastCost, list)" size="mini"  type="success">
	                        	{{index}}
	                      	</span>
						</li>

						<li v-if="!value.columnId" v-for="detail in list.date_a">
							
						</li>
						
					</ul>

					


					

					<ul :style="{width: list.date_a.length*80 + 'px'}" >
						<li v-for="(indexa,indexa_memo) in list.memo_a">
							<span class="pointer" style="color: green" @click="changememo(indexa_memo, list)" size="mini"  type="success">
	                        	{{indexa}}
	                      	</span>
						</li>
					
					</ul>

					
					
					
					
				</div>

				<div   v-if="search.type == 'super'" :style="{width: car_list_bottom_width + 'px',height: (get_genshangxia_height+20)+'px'}"   @scroll="scroll_left($event,list)" class="date_content">
					

					

					<ul :class="{pinkaul_show_span: (!value.columnId && !show_span) ? true:  false,pinkaul: !value.columnId && show_span? true:false}"  v-if="value.show && (value.columnId!=9)" :style="{width: list.date_a.length*80+ 'px'}" v-for="(value, key) in choose_sort_list_super">


						<li :style="{background : value.color=='#FFFFFF' ? '':value.color}"  v-if="value.columnId && value.ename != 'forecastCost'"  v-for="index in list[value.ename+'_a']">
							{{index}}{{(value.columnId == 14 || value.columnId == 19 || value.columnId == 35 || value.columnId == 13 ||value.columnId == 26 || value.columnId == 29 || value.columnId == 30 || value.columnId == 35 || value.columnId == 32|| value.columnId == 50 || value.columnId == 40) ? '%':''}}
						</li>

						<li :style="{background : value.color=='#FFFFFF' ? '':value.color}"  v-if="value.columnId && value.ename == 'forecastCost'"  v-for="(index,index_forecastCost) in list[value.ename+'_a']">
							

							<span class="pointer" style="color: green" @click="change_forecast_cost(index_forecastCost, list)" size="mini"  type="success">
	                        	{{index}}
	                      	</span>
						</li>
						<li v-if="!value.columnId" v-for="detail in list.date_a">
							
						</li>

					</ul>


					

					<ul :style="{width: list.date_a.length*80 + 'px'}" >
						<li v-for="(indexa,indexa_memo) in list.memo_a">
							<span class="pointer" style="color: green" @click="changememo(indexa_memo, list)" size="mini"  type="success">
	                        	{{indexa}}
	                      	</span>
						</li>
					
					</ul>

					<!--<ul :style="{width: list.date_a.length*80 + 'px'}" >
						<li v-for="indexab in list.date_a">
							<span class="pointer" style="color: green" @click="change_forecast_cost(indexab, list)" size="mini"  type="success">
	                        	花费修改
	                      	</span>
						</li>
					
					</ul>-->
					
					
					
					
				</div>





  			</div>
  			<div v-if="list.hasmore && list.list && list.data_detail"  @click="get_one_ware_more_data(list)" class="car_list-p pointer">

  					<span>更多数据</span>
  			</div>
  			<div v-if="!list.hasmore && list.list && list.data_detail"   class="car_list-p pointer">

  					<span>已无更多</span>
  			</div>

  			<div v-if="!list.data_detail" @click="list.data_detail=true"   class="car_list-p pointer">

  					<span>查看详情</span>
  			</div>
  			
  		</div>
  		
  	</div>


  	<el-dialog
	  title="多店对比"
	  :visible.sync="more_show_dialogVisible"
	  width="1500px"
	  >
	  <div style="height: 40px;" class="top">
	  	<div style="display: inline-block;" class="el-checkbox-group">

          <label @click="changestatus(list)" v-for="list in datalist_dialog"  class="el-checkbox-button el-checkbox-button--small">
            <span :class="{'is-checkeda': list.check}"  class="el-checkbox-button__inner">{{list.shopName}}</span>
          </label>
        
        </div>
	  </div>

	  <div style="height: 460px;width: 700px;position: absolute;left: 200px;top: 260px;" v-if="dialog_poptip_show"  class="div_qushi">
				<div class="div_qushi_title">
					{{choose_single_name}}
				</div>

			<div :id="`div_qushi_content_ab`" class="div_qushi_content">
				
			</div>
		</div>
	  <div @click="close_all_dialog" style="height: 600px;position: relative;"  v-loading = "loading" class="car-wrap">

	  	
  		<div :style="{height: (get_genshangxia_height+270)+'px'}" v-for="(list,index_list) in datalist_dialog" class="car_list">
  			<div class="car_list-top">
  				<i @click="update_fire_status(list)" :class="{iconhuo_red: list.fireStatus}" class="iconfont iconhuo pointer"></i>
  				基础信息
  			</div>

  			<div class="car_list-wrap">
  				<div style="width: 100px;height: 120px;position: relative;">
	  				<el-upload
		              style="display: inline-block;position: relative;"
		              class="upload-demo"
		              :show-file-list="false"
		              :http-request="uploadpicture"
		              action="http://upload-z2.qiniup.com/"
		              >
		             <img v-if="list.imgUrl" style="width: 100px;height:120px;object-fit: cover" :src="list.imgUrl"/>

  					<i v-else style="font-size: 100px;margin-top: 4px" class="el-icon-picture-outline"></i>
		            </el-upload>


  				</div>
  				<div class="img_right">
  					<div class="first_title">
  						<p>款号</p>
  						<p style="font-size: 14px;line-height: 18px">{{list.wareId ? list.wareId: '&nbsp;'}}<br>({{list.babyId}})</p>
  						<p >累计销量</p>
  						<p>{{list.salesTotal ? list.salesTotal: '&nbsp;'}}</p>
  					</div>
  					<div class="first_title">
  						<p>店铺</p>
  						<p>{{list.shopName ? list.shopName: '&nbsp;'}}</p>
  						<p style="margin-top: 16px;">多店开车</p>
  						<p><span >{{list.moreShop ? list.moreShop: '&nbsp;'}}</span></p>
  					</div>
  					<div class="first_title">
  						<p>公司类目/淘宝类目</p>
  						<p>{{list.category ? empty_TAMLL(list.category): '&nbsp;'}}</p>
  						<p style="margin-top: 16px;">7天收藏率(%)</p>
  						<p>{{list.collectionRate ? list.collectionRate: '&nbsp;'}}</p>
  					</div>
  					<div class="first_title">
  						<p>开车天数</p>
  						<p>{{list.driveDays ? list.driveDays: '&nbsp;'}}</p>
  						<p style="margin-top: 16px;">7天加购率(%)</p>
  						<p>{{list.itemfavorRate ? list.itemfavorRate: '&nbsp;'}}</p>
  					</div>

  					<div class="first_title">
  						<p>开车日期</p>
  						<p>{{list.driveDate ? fmtDate(list.driveDate): '&nbsp;'}}</p>
  						<p style="margin-top: 16px;">上架日期</p>
  						<p>{{list.newArriveDate ? fmtDate(list.newArriveDate): '&nbsp;'}}</p>
  					</div>



  					<div class="first_title">
  						

  						<el-popover
						    placement="right"
						    title="退款率"
						    width="200"
						    trigger="hover"
						    content="">
	  						<p style="font-size: 14px;" v-for="colorlist in list.refundRate">{{`${colorlist.color}退款率：${colorlist.refundRate}`}}</p>


	  						<p slot="reference">各颜色退款率(%)</p>
	  					</el-popover>

	  					<p style="font-size: 14px;" v-if="index<4" v-for="(colorlist,index) in list.refundRate">{{`${colorlist.color}：${colorlist.refundRate}`}}</p>
  						

  						
  					</div>
  					<div class="first_title">
  						<p>宝贝链接</p>
  						<p><el-button style="margin-top: 6px;" @click="openurl(list.link)" size="mini" type="success">跳转</el-button></p>
  						<p style="margin-top: 2px;">同款链接</p>
  						<p><el-button  style="margin-top: 6px;" @click="openurl(list.sameLink)"   size="mini" type="success">跳转</el-button></p>
  					</div>

  					
  					
  				</div>
  				
  			</div>
  			<div :style="{height: (get_genshangxia_height+50)+'px'}" v-if="list.list" ref="car_list_bottom" class="car_list-bottom">

  				<div class="date_tip">
					内容/时间
				</div>
  				
				<div style="height: 360px;width: 600px" v-if="list.poptip_show"  class="div_qushi">
						<div class="div_qushi_title">
							{{choose_single_name}}
						</div>

					<div :id="`div_qushi_content_ab${index_list}`" class="div_qushi_content">
						
					</div>
				</div>
				<div style="width: 1200px;" class="date_top">
					<ul  :style="{left: -list.scrollleft + 'px',width: list.date_a.length*80+10 + 'px'}" >
						<li style="font-size: 12px;" v-for="detail in list.date_a">{{fmtDate_yue(detail)}}</li>
						
					</ul>
				</div>




				<div :style="{height: (get_genshangxia_height)+'px'}" style="border-top: 1px solid #DCDFE6; top: -1px;"  class="date_left">
					<ul class="pointer" >
						<!--<li  @click.stop="choose_single_dialog(list, value, key,index_list)"  v-if="value.choose" v-for="(value, key, index) in dataa.total.list">{{value.name}}</li>
						<li @click.stop="choose_single_dialog(list, value, key,index_list)"  v-if="value.choose" v-for="(value, key, index) in dataa.car.list">{{value.name}}</li>

						<li @click.stop="choose_single_dialog(list, value, key,index_list)"  v-if="value.choose" v-for="(value, key, index) in dataa.store.list">{{value.name}}</li>-->
						<li :style="{background : value.color=='#FFFFFF' ? '':value.color}"  :class="{pinka_show_span: (!value.columnId && !show_span) ? true:  false,pinka: !value.columnId && show_span? true:false}" @click.stop="choose_single_dialog(list, value, index, index_list)"  v-if="value.show && value.columnId!=9" v-for="(value, index) in choose_sort_list">{{value.cname}}</li>


						<li >备注</li>
						
					</ul>

					


				</div>
 
				<div style="width: 1200px;" :style="{height: (get_genshangxia_height+20)+'px'}" @scroll="scroll_left($event,list)" class="date_content">
					

					
					<ul :class="{pinkaul_show_span: (!value.columnId && !show_span) ? true:  false,pinkaul: !value.columnId && show_span? true:false}" v-if="value.show && (value.columnId!=9)" :style="{width: list.date_a.length*80+10 + 'px'}" v-for="(value, key) in choose_sort_list">
						


						<li :style="{background : value.color=='#FFFFFF' ? '':value.color}"  v-if="value.ename != 'forecastCost'"  v-for="index in list[value.ename+'_a']">{{index}}{{(value.columnId == 14 || value.columnId == 19 || value.columnId == 35 || value.columnId == 13 ||value.columnId == 26 || value.columnId == 29 || value.columnId == 30 || value.columnId == 35 || value.columnId == 32 || value.columnId == 50|| value.columnId == 40) ? '%':''}}</li>

						<li :style="{background : value.color=='#FFFFFF' ? '':value.color}"  v-if="value.ename == 'forecastCost'"  v-for="(index,index_forecastCost) in list[value.ename+'_a']">
							

							<span class="pointer" style="color: green" @click="change_forecast_cost(index_forecastCost, list)" size="mini"  type="success">
	                        	{{index}}
	                      	</span>
						</li>

						<li v-if="!value.columnId" v-for="detail in list.date_a">
							
						</li>

					</ul>

					<ul :style="{width: list.date_a.length*80 + 'px'}" >
						<li v-for="(indexa,indexa_memo) in list.memo_a">
							<span class="pointer" style="color: green" @click="changememo(indexa_memo, list)" size="mini"  type="success">
	                        	{{indexa}}
	                      	</span>
						</li>
					
					</ul>
					
					
					
					
				</div>




  			</div>
  			<div v-if="list.hasmore && list.list"  @click="get_one_ware_more_data(list)" class="car_list-p pointer">

  				<span>更多数据</span>
  			</div>
  			<div v-if="!list.hasmore"   class="car_list-p pointer">

  				<span>已无更多</span>
  			</div>
  		</div>
  		
  	</div>


	</el-dialog>

  	<el-dialog
	  title="备注修改"
	  :visible.sync="memochange.memo_dialogVisible"
	  width="600px"
	  >
	  <p>
	  	<span style="position: relative;top: -30px;padding-right: 16px;">备注:</span>
	  	<el-input
	  	style="display: inline-block;width: 400px;"
		  type="textarea"
		  placeholder="请输入内容"
		  v-model="memochange.memo"
		>
		</el-input>
	  </p>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="memochange.memo_dialogVisible = false">取 消</el-button>
	    <el-button type="primary" @click="update_drive_memo">确 定</el-button>
	  </span>
	</el-dialog>
  	
  	<el-dialog
	  title="筛选查询"
	  :visible.sync="dialogVisible"
	  width="1100px"
	  >
	  <div v-for="(value, key, index) in dataa" class="tag_choose">
	  	<div style="width: 100px">{{value.name}}：</div>
	  	<div style="flex: 1">
	  		<p v-for="(value1, key1, index1) in value.list"  class="p_wrap" >
	  			<span @click="value1.choose = !value1.choose" :class="{'span_wrap_success': value1.choose}" class="span_wrap pointer">{{value1.name}}</span>
	  		</p>
	  		
	  		

	  	</div>
	  </div>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="dialogVisible = false">关 闭</el-button>
	  </span>
	</el-dialog>

	<el-dialog
	  title="筛选查询开车"
	  :visible.sync="dialogVisible_sort"
	  width="1100px"
	  >
	  <div  class="tag_choose">
	  	<div style="flex: 1">
	  		<draggable v-model="choose_sort_list_fu">
		  		<p  v-for="(value, index) in choose_sort_list_fu"  class="p_wrap" >
		  			<span style="padding-right: 6px;" @click="value.show = !value.show" :class="{'span_wrap_success': value.show}" class="span_wrap pointer">{{value.cname}}
		  				
		  			</span>

		  			 <el-color-picker style="position: relative;top: 8px" size="mini" v-model="value.color"></el-color-picker>


		  		</p>
		  	</draggable>
	  		
	  		

	  	</div>
	  </div>
	  <span slot="footer" class="dialog-footer">
	  	<el-button @click="edit_drive_column">保 存</el-button>
	    <el-button @click="dialogVisible_sort= false">关 闭</el-button>


	  </span>
	</el-dialog>
	<el-dialog
	  title="筛选查询超级"
	  :visible.sync="dialogVisible_sort_super"
	  width="1100px"
	  >
	  <div  class="tag_choose">
	  	<div style="flex: 1">
	  		<draggable v-model="choose_sort_list_fu_super">
		  		<p v-for="(value, index) in choose_sort_list_fu_super"  class="p_wrap" >
		  			<span @click="value.show = !value.show" :class="{'span_wrap_success': value.show}" class="span_wrap pointer">{{value.cname}}</span>

		  			<el-color-picker style="position: relative;top: 8px" size="mini" v-model="value.color"></el-color-picker>

		  		</p>
		  	</draggable>
	  		
	  		

	  	</div>
	  </div>
	  <span slot="footer" class="dialog-footer">
	  	<el-button @click="edit_drive_column_super">保 存</el-button>
	    <el-button @click="dialogVisible_sort_super = false">关 闭</el-button>


	  </span>
	</el-dialog>
	<el-dialog
	  title="预测花费修改"
	  :visible.sync="forecast_change.memo_dialogVisible"
	  width="600px"
	  >
	  <p>
	  	<span style="position: relative;top: -30px;padding-right: 16px;">预测花费:</span>
	  	<el-input
	  	style="display: inline-block;width: 400px;"
		  type="textarea"
		  placeholder="请输入内容"
		  v-model="forecast_change.memo"
		>
		</el-input>
	  </p>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="forecast_change.memo_dialogVisible = false">取 消</el-button>
	    <el-button type="primary" @click="update_drive_forecast_cost">确 定</el-button>
	  </span>
	</el-dialog>
  </div>
</template>

<script>
import echarts from 'echarts'
let salefifteen_chart
let salefifteen_chart_dialog
import draggable from 'vuedraggable'
import { mapGetters } from 'vuex'
export default {
  	name: 'car',
  	components: {
        draggable,
    },
  	data(){
      return{
      	show_span: true,
      	dialogVisible_sort: false,
      	dialogVisible_sort_super: false,
      	dialog_poptip_show: false,
      	div_qushi_show: false,
      	more_show_dialogVisible: false,
      	more_shop: {
      		wareId: ''
      	},
      	props: { multiple: true },
      	memochange: {
      		memo_dialogVisible: false,
      		wareId: '',
      		shopId: '',
      		time: '',
      		babyId: '',
      		forecastCost: ''
      	},
      	forecast_change: {
      		memo_dialogVisible: false,
      		wareId: '',
      		shopId: '',
      		time: '',
      		memo: ''
      	},
      	typelist: [
	        {
	         name: '开车',
	         choose: true,
	         value: 'drive'

	        },
	        {
	         name: '超级推荐',
	         choose: false,
	         value: 'super'

	        },
	        {
	         name: '停车',
	         choose: false,
	         value: 'stop'

	        },	        {
	         name: '推广小组',
	         choose: false,
	         value: 'fire'

	        },
       	],
      	loading: false,
      	dialogVisible: false,
      	dataa: {
      		store: {

      			name: '店铺数据',
      			list: {
      				forecastCost: {
		        		name: '预测花费',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	tbGold: {
		        		name: '淘金币',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	phoneSearchUv: {
		        		name: '手淘搜索UV',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	phoneMainUv: {
		        		name: '手淘首页UV',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	freeUv: {
		        		name: '免费UV',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	freeUvRate: {
		        		name: '付费UV占比',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	promotionCost: {
		        		name: '单件推广成本',
		        		choose: true,
		        		poptip_show: false
		        	},
      			}
      		},
      		total: {
      			name: '总体数据',
      			list: {
      				companySales: {
		        		name: '公司总销量',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	shopSaleTotal: {
		        		name: '店铺总销量',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	uv: {
		        		name: '总UV',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	itemcartQty: {
		        		name: '总加购数',
		        		choose: true,
		        		lpoptip_show: false
		        	},
		        	itemcartRate: {
		        		name: '总加购率',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	payConversionRate: {
		        		name: '总转化率',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	walfareCount: {
		        		name: '福利订单数',
		        		choose: true,
		        		poptip_show: false
		        	},
      			}
      		},
      		car: {
      			name: '直通车字段',
      			list: {
      				uvTotal: {
		        		name: '直通车UV',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	driveCost: {
		        		name: '开车价',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	itemcartQtyTotal: {
		        		name: '直通车加购数',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	itemcartQtyRateTotal: {
		        		name: '直通车加购率',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	itemcartCostTotal: {
		        		name: '直通车加购成本',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	cVRTotal: {
		        		name: '直通车转化率',
		        		choose: true,
		        		list: []
		        	},
		        	rPItotal: {
		        		name: '直通车ROI',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	pPCtotal: {
		        		name: '直通车PPC',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	cost: {
		        		name: '直通车花费',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	indirectSuccessCountTotal: {
		        		name: '直通车间接成交',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	uvss: {
		        		name: '关键词UV',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	cTRss: {
		        		name: '关键词CTR',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	pPCss: {
		        		name: '关键词PPC',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	itemcartQtyss: {
		        		name: '关键词加购数',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	itemcartRatess: {
		        		name: '关键词加购率',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	cVRss: {
		        		name: '关键词转化率',
		        		choose: true,
		        		poptip_show: false
		        	},
	        		uvdxtf: {
		        		name: '定向投放UV',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	cTRdxtf: {
		        		name: '定向投放CTR',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	pPCdxtf: {
		        		name: '定向投放PPC',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	itemcartQtydxtf: {
		        		name: '定向投放加购数',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	itemcartRatedxtf: {
		        		name: '定向投放加购率',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	cVRdxtf: {
		        		name: '定向投放转化率',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	cjtjCost: {
		        		name: '超级推荐-消耗',
		        		choose: true,
		        		poptip_show: false
		        	},  
	        		cjtjUv: {
		        		name: '超级推荐-有效展现',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	cjtjClickNum: {
		        		name: '超级推荐-有效点击数',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	cjtjClickRate: {
		        		name: '超级推荐-点击率',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	cjtjShopCartCount: {
		        		name: '超级推荐-添加购物车量',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	cjtjCollectQty: {
		        		name: '超级推荐-收藏宝贝量',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	cjtjAttentionQty: {
		        		name: '超级推荐-店铺关注量',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	cjtjPresellQty: {
		        		name: '超级推荐-预售订单量',
		        		choose: true,
		        		poptip_show: false
		        	}, 
		        	cjtjPresellPayment: {
		        		name: '超级推荐-预售金额',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	cjtjSuccessQty: {
		        		name: '超级推荐-成交订单量',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	cjtjSuccessPayment: {
		        		name: '超级推荐-成交订单金额',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	cjtjPpc: {
		        		name: '超级推荐ppc',
		        		choose: true,
		        		poptip_show: false
		        	}, 
		        	 
		        	cjtjPurchaseCost: {
		        		name: '超级推荐加购成本',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	cjtjItemCartRate: {
		        		name: '超级推荐转化率',
		        		choose: true,
		        		poptip_show: false
		        	},
		        	cjtjCtr: {
		        		name: '超级推荐roi',
		        		choose: true,
		        		poptip_show: false
		        	},
		        }
      		}
	        	

        },

        choose_single_name: '',
        salefifteensearch: {
        	color: ['#61a5e8', '#75cf51', '#eecb5f', '#e3935d'],
		    title: {
		        show: false
		    },
		    tooltip: {
		        trigger: 'axis'
		    },
		    legend: {
		        data:[]
		    },
		    grid: {
		        left: '4%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    
		    xAxis: {
		        type: 'category',
		        boundaryGap: false,
		        data: [],
		        axisLine: {
					show: false,
		           
		        },
				axisTick: {
		        	show: false
		        },
		    },
		    yAxis: {
		        type: 'value',
		        splitLine: {
	            	show: false,
	            },
	            axisLine: {
					show: false,
		           
		        },
				axisTick: {
		        	show: false
		        },
		    },
		    series: [
		        
		    ]
		},

		salefifteensearch_dialog: {
        	color: ['#61a5e8', '#75cf51', '#eecb5f', '#e3935d'],
		    title: {
		        show: false
		    },
		    tooltip: {
		        trigger: 'axis'
		    },
		    legend: {
		        data:[]
		    },
		    grid: {
		        left: '4%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    
		    xAxis: {
		        type: 'category',
		        boundaryGap: false,
		        data: [],
		        axisLine: {
					show: false,
		           
		        },
				axisTick: {
		        	show: false
		        },
		    },
		    yAxis: {
		        type: 'value',
		        splitLine: {
	            	show: false,
	            },
	            axisLine: {
					show: false,
		           
		        },
				axisTick: {
		        	show: false
		        },
		    },
		    series: [
		        
		    ]
		},
		choose_sort_list: [],
		choose_sort_list_super: [],
		choose_sort_list_fu: [],
		choose_sort_list_fu_super: [],
      	search: {
       		shopIds: [],
       		start: [
       			new Date(new Date().getTime() - 3600 * 1000 * 24 * 30),
       			new Date(new Date().getTime())
       		],
       		type: 'drive',
       		wareId: '',
       		shopIdsfirst: []
       	},
       	shop_brand: [],
       	totalshops: [],
       	datalist: [],
       	brandId: '',
       	datalist_dialog: [],
       	genshangxia_height: 520,
       	genshangxia_height_super: 520,
       	car_list_bottom_width: 60
      }
    },
    watch: {
    	isCollapse(value) {
    		//console.info(999111)


    		setTimeout(()=>{
	    		this.car_list_bottom_width = this.$refs.car_wrap.offsetWidth - 40 - 128 -10

	    		//console.info(this.$refs.car_wrap.offsetWidth)

	    	},1000)
        }
    },
    computed: {
    	...mapGetters([
            'getpageDict',
            'isCollapse'
        ]),
    	get_genshangxia_height() {
    		if (this.search.type == 'super') {
    			return this.genshangxia_height_super
    		} else {
    			return this.genshangxia_height
    		}
    	},
    	shopidchange() {
    		let arr = []
    		if (this.search.shopIds.length) {
    			for(let i=0;i<this.search.shopIds.length;i++) {
    				if (this.search.shopIds[i].length>1) {
    					arr.push(this.search.shopIds[i][1])
    				}
    			} 
    		}

    		return arr
    	},
    	get_drive_column() {
    		let demand_status = this.getpageDict.filter((list) => {
                return list.dicType == "drive_column"
            })

            return demand_status[0].dicList
    	},
    },
    mounted() {
    	//初彤报表查看

    	this.$nextTick(()=>{
    		this.car_list_bottom_width = this.$refs.car_wrap.offsetWidth - 168 -10
    		//console.info(this.car_list_bottom_width)

    	})

    	



  		
    	if(this.$isInArray(37)) {
    		this.brandId = 2
    	}

    	//菲碧报表查看
    	if(this.$isInArray(38)) {
    		this.brandId = 1
    	}

    	//形色报表查看
    	if(this.$isInArray(39)) {
    		this.brandId = 3
    	}


    	if (this.$isInArray(39) && this.$isInArray(37) && this.$isInArray(38)) {

    		this.brandId = ''
    	}


    	this.get_shop_by_brand()

    	this.find_drive_column()
    	this.find_drive_column_super()
    	
    },
    methods: {
    	change_forecast_cost(listone,listtwo) {

    		
    		
    		
    		this.forecast_change.memo_dialogVisible = true
    		this.forecast_change.wareId = listtwo.wareId
    		this.forecast_change.memo = listtwo.forecastCost_a[listone]
    		this.forecast_change.time = listtwo.date_a[listone]
    		this.forecast_change.shopId = listtwo.shopId
    		this.forecast_change.babyId = listtwo.babyId



    	},
    	changememo(listone,listtwo) {
    		//this.
    		
    		this.memochange.memo_dialogVisible = true
    		this.memochange.wareId = listtwo.wareId
    		//this.memochange.memo = listone.memo
    		this.memochange.time = listtwo.date_a[listone]
    		this.memochange.shopId = listtwo.shopId
    		this.memochange.babyId = listtwo.babyId



    	},
    	edit_drive_status(list,status) {

    		let stri = status?'开车':'停车'

    		this.$confirm(`确认该款要${stri}？`)
	          .then(_ => {
	            this.$http.post(`drive/edit_drive_status`,{
	    			//shopIds: this.shopidchange.length ? this.shopidchange.join(',') : this.totalshops.join(',')
	    			babyId: list.babyId,
	    			wareId: list.wareId,
	    			shopId: list.shopId,
	    			status: status
	    		})
	                .then((data)=>{
	                	this.$message({
	                      message: data.msg,
	                      type: 'info'
	                    })

	                	this.get_drive_report()
	                   
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
    	update_drive_forecast_cost() {

    		

    		this.$http.post(`drive/update_drive_forecast_cost`,{
    			//shopIds: this.shopidchange.length ? this.shopidchange.join(',') : this.totalshops.join(',')
    			babyId: this.forecast_change.babyId,
    			wareId: this.forecast_change.wareId,
    			forecastCost: this.forecast_change.memo ? this.forecast_change.memo: '',
    			time: this.forecast_change.time,
    			shopId: this.forecast_change.shopId,
    		})
                .then((data)=>{
                	this.$message({
                      message: data.msg,
                      type: 'info'
                    })
                	this.forecast_change.memo_dialogVisible = false

                	this.get_drive_report()
                   
                })
                .catch(()=>{
                    this.$message({
                      message: '接口报错',
                      type: 'error'
                    })
                })
    	},
    	update_drive_memo() {

    		this.$http.post(`drive/update_drive_memo`,{
    			//shopIds: this.shopidchange.length ? this.shopidchange.join(',') : this.totalshops.join(',')
    			babyId: this.memochange.babyId,
    			wareId: this.memochange.wareId,
    			memo: this.memochange.memo ? this.memochange.memo: '',
    			time: this.memochange.time,
    			shopId: this.memochange.shopId,
    		})
                .then((data)=>{
                	this.$message({
                      message: data.msg,
                      type: 'info'
                    })
                	this.memochange.memo_dialogVisible = false

                	this.get_drive_report()
                   
                })
                .catch(()=>{
                    this.$message({
                      message: '接口报错',
                      type: 'error'
                    })
                })
    	},
    	edit_drive_column() {

    		for (let i=0; i<this.choose_sort_list_fu.length;i++) {
    			this.choose_sort_list_fu[i].proprity = i+1
    			if(!this.choose_sort_list_fu[i].color) {
    				this.choose_sort_list_fu[i].color = '#FFFFFF'
    			}
    		}
    		this.$http.post(`drive/edit_drive_column`,{
    			list: this.choose_sort_list_fu,
    			type: 'drive'
    		})
            .then((data)=>{
            	//console.info(data)
            	this.$message({
                  message: data.msg,
                  type: 'info'
                })


            	this.dialogVisible_sort = false

            	this.find_drive_column()
               
            })
            .catch(()=>{
                this.$message({
                  message: '接口报错',
                  type: 'error'
                })
            })

    	},
    	edit_drive_column_super() {

    		for (let i=0; i<this.choose_sort_list_fu_super.length;i++) {
    			this.choose_sort_list_fu_super[i].proprity = i+1	
    		}
    		this.$http.post(`drive/edit_drive_column`,{
    			list: this.choose_sort_list_fu_super,
    			type: 'super'


    		})
            .then((data)=>{
            	//console.info(data)
            	this.$message({
                  message: data.msg,
                  type: 'info'
                })


            	this.dialogVisible_sort_super = false

            	this.find_drive_column_super()
               
            })
            .catch(()=>{
                this.$message({
                  message: '接口报错',
                  type: 'error'
                })
            })

    	},


    	get_driver_name(id) {
    		//this.get_drive_column

    		let dicName = ''
    		for (let i=0; i<this.get_drive_column.length; i++) {
    			if (this.get_drive_column[i].dicCode == id) {
    				dicName = this.get_drive_column[i].dicName

    				break
    			}
    		}


    		return dicName

    	},
    	changestatus(list) {
    		list.check = !list.check
    	},
    	scroll_left(event,list) {




    		list.scrolltop = event.srcElement.scrollTop
            list.scrollleft = event.srcElement.scrollLeft


    	},

    	close_all() {
    		for (let i=0; i<this.datalist.length;i++) {

    			this.datalist[i].poptip_show = false

    			




    		}
    		
    	},
    	close_all_dialog() {

    		this.dialog_poptip_show = false
    		return
    		for (let i=0; i<this.datalist_dialog.length;i++) {

    			this.datalist_dialog[i].poptip_show = false

    			



    		}
    		
    	},

    	choose_single_dialog(list,value1,key1,index_list) {


    		let cname = this.get_driver_name(value1.columnId)

    		let value = ''

    		let key = this.get_en_name(value1.columnId)


    		//let flag = list[key+'_show']
    		this.close_all_dialog()
    		//list[key+'_show'] = !flag

    		this.dialog_poptip_show = true
    		//list.poptip_show = true

    		/*if (!list[key+'_show']) {
    			return
    		}*/

    		let that = this
    		

    		this.choose_single_name = cname

    		this.salefifteensearch_dialog.legend.data = []
  			this.salefifteensearch_dialog.series = []

  			this.salefifteensearch_dialog.xAxis.data = []

  			//for (let i=0; i<list.date_a.length;i++) {

  			let lista = list
			if (list.check) {
	  			/*for (let i=list.date_a.length-1; i>-1;i--) {

	  				
	  				this.salefifteensearch_dialog.xAxis.data.push(that.fmtDate(list.date_a[i]))
	  			} */

	  			for (let i=0; i<list.date_a.length;i++) {

	  				
	  				this.salefifteensearch_dialog.xAxis.data.push(that.fmtDate(list.date_a[i]))
	  			}
					
				
			} else {
				
				for (let i=0;i<this.datalist_dialog.length;i++) {
					if (this.datalist_dialog[i].check) {
						lista = this.datalist_dialog[i]
						break
					}
				}

				/*for (let i=lista.date_a.length-1; i>-1;i--) {

	  				
	  				this.salefifteensearch_dialog.xAxis.data.push(that.fmtDate(lista.date_a[i]))
	  			} */

	  			for (let i=0; i<lista.date_a.length;i++) {

	  				
	  				this.salefifteensearch_dialog.xAxis.data.push(that.fmtDate(lista.date_a[i]))
	  			}


			}

			//console.info(this.salefifteensearch_dialog.xAxis.data)


			

			for (let i=0; i<this.datalist_dialog.length; i++) {


				if (this.datalist_dialog[i].check) {
					this.salefifteensearch_dialog.series.push({
						name: this.datalist_dialog[i].shopName+ this.choose_single_name,
			            type:'line',
			            smooth: true,
			            //data: this.datalist_dialog[i][`${key}_a`]
			            data: []
					})

					let len = this.salefifteensearch_dialog.series.length



					/*for (let j=lista.date_a.length-1; j>-1;j--) {
						if (this.datalist_dialog[i][`${key}_a`][j]) {
							this.salefifteensearch_dialog.series[len-1].data.push(this.datalist_dialog[i][`${key}_a`][j])
						} else {
							this.salefifteensearch_dialog.series[len-1].data.push(0)
						}
						
					}*/

					for (let j=0; j<lista.date_a.length;j++) {
						if (this.datalist_dialog[i][`${key}_a`][j]) {
							this.salefifteensearch_dialog.series[len-1].data.push(this.datalist_dialog[i][`${key}_a`][j])
						} else {
							this.salefifteensearch_dialog.series[len-1].data.push(0)
						}
						
					}
				}




				


				

			}


			


  			
  			




  			if (salefifteen_chart_dialog) {
                salefifteen_chart_dialog.clear()
                salefifteen_chart_dialog = null
            }
            setTimeout(()=>{

      			salefifteen_chart_dialog = echarts.init(document.getElementById(`div_qushi_content_ab`))
    			salefifteen_chart_dialog.setOption(this.salefifteensearch_dialog)
			},100)


    	},
    	get_en_name(id) {
    		let cname = this.get_driver_name(id)
    		let key = ''
    		for (let varone in this.dataa) {
    			for (let vartwo in this.dataa[varone].list) {
    				if (this.dataa[varone].list[vartwo].name == cname) {
    					key = vartwo

    					break
    				}
    			}
    		}
    		

    		//console.info(key)

    		return key

    	},
    	choose_single(list,value1,key1,index_list) {

    		let that = this

    		let cname = this.get_driver_name(value1.columnId)

    		let value = ''

    		let key = this.get_en_name(value1.columnId)

    		
    		

    		this.close_all()
    		

    		/*let flag = list[key+'_show']
    		
    		list[key+'_show'] = !flag


    		if (!list[key+'_show']) {
    			return
    		}*/

    		list.poptip_show = true

    		
    		

    		this.choose_single_name = cname

    		this.salefifteensearch.legend.data = []
  			this.salefifteensearch.series = []

  			this.salefifteensearch.xAxis.data = []

  			/*for (let i=list.date_a.length-1; i>-1;i--) {
				this.salefifteensearch.xAxis.data.push(that.fmtDate(list.date_a[i]))
			}*/

			for (let i=0; i<list.date_a.length;i++) {
				this.salefifteensearch.xAxis.data.push(that.fmtDate(list.date_a[i]))
			}

  			this.salefifteensearch.series.push({
				name: this.choose_single_name,
	            type:'line',
	            stack: '总量',
	            smooth: true,
	            data: []
			})

  			if (list[`${key}_a`]) {

  				/*for (let i=list.date_a.length-1; i>-1;i--) {
  					this.salefifteensearch.series[0].data.push(list[`${key}_a`][i])
  				}*/
  				for (let i=0; i<list.date_a.length;i++) {
  					this.salefifteensearch.series[0].data.push(list[`${key}_a`][i])
  				}
  				//this.salefifteensearch.series[0].data = list[`${key}_a`]
  				
  			} else {
  				for (let i=0; i<list.date_a.length;i++) {
  					this.salefifteensearch.series[0].data.push(0)
  				}
  			}




  			if (salefifteen_chart) {
                salefifteen_chart.clear()
                salefifteen_chart = null
            }
            setTimeout(()=>{

            	console.info(`div_qushi_content_a${index_list}`)



      			salefifteen_chart = echarts.init(document.getElementById(`div_qushi_content_a${index_list}`))
    			salefifteen_chart.setOption(this.salefifteensearch)
			},100)


    	},
    	update_fire_status(list) {
    		let shopIds = this.search.shopIds.length ? this.search.shopIds[0]  : this.search.shopIdsfirst[0]


    		if (!((this.$isInArray(37) && shopIds == 2) || (this.$isInArray(38) && shopIds == 1) || (this.$isInArray(39) && shopIds == 3))) {
    			return this.$message({
    				message:'您无此权限',
    				type:'warning'
    			})
    		}

    		

    		if(!this.$isInArray(79)){
    			return this.$message({
    				message:'您无此权限',
    				type:'warning'
    			})
    		}


    		this.$http.post(`drive/update_fire_status`,{
    			//shopIds: this.shopidchange.length ? this.shopidchange.join(',') : this.totalshops.join(',')
    			wareId: list.wareId,
    			shopId: list.shopId,
    			fireStatus: !list.fireStatus,
    		})
                .then((data)=>{
                	if (data.code == 200) {
                		list.fireStatus = !list.fireStatus
                	}

                	else {
                		this.$message({
	                      message: data.msg,
	                      type: 'info'
	                    })
                	}

                	this.get_drive_report()
                   
                })
                .catch(()=>{
                    this.$message({
                      message: '接口报错',
                      type: 'error'
                    })
                })
    	},
    	
    	changetype(index) {
    		for (let i=0;i<this.typelist.length;i++) {
    			this.typelist[i].choose = false

    		}

    		this.typelist[index].choose = true
    		this.search.type = this.typelist[index].value

    		this.get_drive_report()


    	},
    	fmtDate(obj){
          var date =  new Date(obj*1000);

          var y = 1900+date.getYear();
          var m = "0"+(date.getMonth()+1);
          var d = "0"+date.getDate();
          return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
      	},
      	fmtDate_yue(obj){
          var date =  new Date(obj*1000);

          var y = 1900+date.getYear();
          var m = "0"+(date.getMonth()+1);
          var d = "0"+date.getDate();
          return y+"."+m.substring(m.length-2,m.length)+"."+d.substring(d.length-2,d.length);
      	},
    	openurl(url) {
    		if (url) {
    			window.open(url,'_blank')
    		} else {
    			return this.$message({
                  	message: '没有地址',
                  	type: 'warning'
                })
    		}
    		
    	},
    	get_one_ware_more_data_a(listindex) {
    		let datelast = listindex.datano_list
    		let end = new Date(datelast*1000 - 3600 * 1000 * 24 * 1).getTime().toString().substr(0, 10)
    		let start = new Date(datelast*1000 - 3600 * 1000 * 24 * 15).getTime().toString().substr(0, 10)


    		this.$http.post(`drive/get_one_ware_more_data`,{
    			//shopIds: this.shopidchange.length ? this.shopidchange.join(',') : this.totalshops.join(',')
    			wareId: listindex.wareId,
    			shopId: listindex.shopId,
    			babyId: listindex.babyId,
    			startTime: start,
    			endTime: end,
    		})
                .then((data)=>{

                	if (data.data.length) {
                			data.data.reverse()

                			

                			this.$set(listindex, 'list', [])

                			listindex.list = data.data

                			
                			

	                		
                			

                			for (let vara in data.data[0]) {


                				this.$set(listindex, `${vara}_a`, [])

                				this.$set(listindex, `${vara}_show`,false)

                				
	                			
	                		}

	                		this.$set(listindex, 'memo_a', [])

	                		//console.info(listindex)



	                		

	                		




	                		for (let j=0;j<data.data.length; j++) {

	                			if (data.data[j].memo) {
	                				listindex[`memo_a`].push(data.data[j].memo)
	                			} else {
	                				listindex[`memo_a`].push(0)
	                			}




	                			for (let t in data.data[j]) {

	                				if (t !='memo') {
	                					listindex[`${t}_a`].push(data.data[j][t])
	                				}
	                				
	                			}


	                			


	                		}


	                		console.info(listindex)


                		

                	} else {
                		listindex.datano_list = start
                	}


                	
                })
                .catch(()=>{
                    this.$message({
                      message: '接口报错',
                      type: 'error'
                    })
                })
    	},
    	get_one_ware_more_data(listindex) {

    		

    		
    		let datelast = listindex.date_a[0]


    		let end = new Date(datelast*1000 - 3600 * 1000 * 24 * 1).getTime().toString().substr(0, 10)
    		let start = new Date(datelast*1000 - 3600 * 1000 * 24 * 15).getTime().toString().substr(0, 10)



    		this.$http.post(`drive/get_one_ware_more_data`,{
    			//shopIds: this.shopidchange.length ? this.shopidchange.join(',') : this.totalshops.join(',')
    			wareId: listindex.wareId,
    			shopId: listindex.shopId,
    			babyId: listindex.babyId,
    			startTime: start,
    			endTime: end,
    		})
                .then((data)=>{


                	if (data.data.length) {




                		for (let j=0;j<data.data.length; j++) {



                			if (data.data[j].memo) {
                				listindex[`memo_a`].unshift(data.data[j].memo)
                			} else {
                				listindex[`memo_a`].unshift(0)
                			}


                			for (let t in data.data[j]) {
                				//listindex[`${t}_a`].push(data.data[j][t])


                				if (t != 'memo') {
                					listindex[`${t}_a`].unshift(data.data[j][t])
                				}
                				
                			}



                		}


            		} else {
            			listindex.hasmore = false
            		}








                	/*if (data.data.length<7) {
                		listindex.hasmore = false
                	}
                	for (let i=0;i<data.data.length;i++) {
                		listindex.list.push(data.data[i])
                	}*/
                   
                })
                .catch(()=>{
                    this.$message({
                      message: '接口报错',
                      type: 'error'
                    })
                })
    		
    	},
    	find_drive_column() {
	    		this.$http.get(`drive/find_drive_column?type=drive`) 
                .then((data)=>{

                	let arr = []

                	for (let i=0;i<data.data.length;i++) {
                		data.data[i].cname = this.get_driver_name(data.data[i].columnId)
                		data.data[i].ename = this.get_en_name(data.data[i].columnId)
                		data.data[i].color = data.data[i].color != 0 ? data.data[i].color : "#FFFFFF"
                		if (data.data[i].show) {
                			arr.push({
                				...data.data[i],
                				
                			})
                		}


                	}

                	

                	let arr2 = []

                	for (let i=0;i<arr.length;i++) {
                		arr2.push(arr[i])
                		if (i!=0 && i%5 == 0){
                			arr2.push({
                				columnId: '',
								cname: "",
								ename: "",
								show: true,
								color: "#FFFFFF"
                			})
                		} 
                	}



                	this.genshangxia_height = arr2.length*26

                	this.choose_sort_list = arr2

                	this.choose_sort_list_fu = data.data

                })
    	},
    	find_drive_column_super() {
	    		this.$http.get(`drive/find_drive_column?type=super`) 
                .then((data)=>{

                	let arr = []

                	for (let i=0;i<data.data.length;i++) {
                		data.data[i].cname = this.get_driver_name(data.data[i].columnId)
                		data.data[i].ename = this.get_en_name(data.data[i].columnId)
                		data.data[i].color = data.data[i].color != 0 ? data.data[i].color : "#FFFFFF"

                		if (data.data[i].show) {
                			arr.push({
                				...data.data[i],
                				
                			})
                		}


                	}

                	let arr2 = []

                	for (let i=0;i<arr.length;i++) {
                		arr2.push(arr[i])
                		if (i!=0 && i%5 == 0){
                			arr2.push({
                				columnId: '',
								cname: "",
								ename: "",
								show: true,
								color: "#FFFFFF"
                			})
                		} 
                	}



                	this.genshangxia_height_super = arr2.length*26+26

                	this.choose_sort_list_super = arr2

                	//console.info(arr)

                	this.choose_sort_list_fu_super = data.data

                })
    	},
    	get_more_shop_data(wareId) {
    		this.more_show_dialogVisible = true
	    		this.$http.post(`drive/get_drive_report`,{
	    			shopIds: '',
	    			wareId: wareId,
	    			type: this.search.type,
	    		})
                .then((data)=>{

                	this.datalist_dialog = []
                	if (data.code != '200') {
                		return this.$message({
	                      message: data.msg,
	                      type: 'error'
	                    })
                	}


                	


                	


                	
            		for (let i=0;i<data.data.length;i++) {
                		data.data[i].hasmore = true


                		data.data[i].scrollleft = 0
                		data.data[i].scrolltop = 0
                		data.data[i].poptip_show = false
                		data.data[i].check = true

                		if (data.data[i].list && data.data[i].list.length) {
                			data.data[i].list.reverse()


                			

                			for (let vara in data.data[i].list[0]) {


                				data.data[i][`${vara}_a`] = []

                				data.data[i][`${vara}_show`] = false
                				
	                			
	                		}

	                		data.data[i][`memo_a`] = []



	                		for (let j=0;j<data.data[i].list.length; j++) {

	                			if (data.data[i].list[j].memo) {
	                				data.data[i][`memo_a`].push(data.data[i].list[j].memo)
	                			} else {
	                				data.data[i][`memo_a`].push(0)
	                			}




	                			for (let t in data.data[i].list[j]) {

	                				if (t !='memo') {
	                					data.data[i][`${t}_a`].push(data.data[i].list[j][t])
	                				}
	                				
	                			}


	                			


	                		}


                		}




                		

                	}





            	
                	

                	this.datalist_dialog = data.data                
                	
                })
                .catch(()=>{
                    this.$message({
                      message: '接口报错',
                      type: 'error'
                    })
                })
    	},
    	get_drive_report() {
    		this.loading = true

    		let shopIds = ''
    		if (this.search.type != 'super') {
    			shopIds = this.search.shopIds.length ? this.search.shopIds[1] : this.search.wareId ? '' : this.search.shopIdsfirst[1]
    		} else {
    			shopIds = this.search.shopIds.length ? this.search.shopIds[1] : this.search.wareId ? 23 : this.search.shopIdsfirst[1]
    		}

    		//console.info(this.search.shopIds)
    		//console.info(this.search.shopIdsfirst)



    		this.$http.post(`drive/get_drive_report`,{
    			//shopIds: this.shopidchange.length ? this.shopidchange.join(',') : this.totalshops.join(','),
    			shopIds: shopIds,
    			wareId: this.search.wareId,
    			type: this.search.type,
    		})
                .then((data)=>{
                	this.loading = false
                	this.datalist = []
                	if (data.code != '200') {
                		return this.$message({
	                      message: data.msg,
	                      type: 'error'
	                    })
                	} 
                	




                	


                	
            		for (let i=0;i<data.data.length;i++) {
                		data.data[i].hasmore = true

                		data.data[i].datano_list = new Date(new Date().getTime() - 3600 * 1000 * 24 * 15).getTime().toString().substr(0, 10)

                		


                		data.data[i].scrollleft = 0
                		data.data[i].scrolltop = 0
                		data.data[i].poptip_show = false
                		data.data[i].data_detail = true

                		




                		if (data.data[i].list && data.data[i].list.length) {
                			data.data[i].list.reverse()
                			
                			for (let vara in data.data[i].list[0]) {
                				data.data[i][`${vara}_a`] = []

                				data.data[i][`${vara}_show`] = false
                				
	                			
	                		}

	                		data.data[i][`memo_a`] = []



	                		for (let j=0;j<data.data[i].list.length; j++) {


	                			if (data.data[i].list[j].memo) {
	                				data.data[i][`memo_a`].push(data.data[i].list[j].memo)
	                			} else {
	                				data.data[i][`memo_a`].push(0)
	                			}




	                			for (let t in data.data[i].list[j]) {

	                				if (t !='memo') {
	                					data.data[i][`${t}_a`].push(data.data[i].list[j][t])
	                				}
	                				
	                			}






	                		}


                		}
                		

                	}



            	
                	

                	this.datalist = data.data
                	//console.info(this.datalist)
                   
                })
                .catch(()=>{
                    this.$message({
                      message: '接口报错',
                      type: 'error'
                    })
                })
    	},
    	async uploadpicture(filestatus,type) {

    	  let wareId = filestatus.file.name.split('.')[0]


          let newfile = filestatus.file


          filestatus.newfile = newfile

          filestatus.progressa = 0

          filestatus.status = false

          const formData = new FormData()

          formData.append('file', newfile)

          let that = this
            this.$maintancehttp({
              url: 'file/submit_ware_pic',
              method: 'post',
              data: formData,
              headers: {'Content-Type': 'multipart/form-data'},
              onUploadProgress (a){
                // let dlItem = that.uploadlist.find((item) => {
                //   return item.newfile.name === filestatus.newfile.name
                // })
                // let precent = (a.loaded / a.total).toFixed(2)
                // filestatus.progressa = precent
                // dlItem.progressa = precent * 100
              },
            })
        
             .then((res) => {
              //保存图片到数据库
              this.get_drive_report()


            })

          


              
        },
    	get_shop_by_brand() {
    		this.$http.get(`shop/get_shop_by_brand?brandId=`)
                .then((data)=>{
                	let arr = []
                	this.totalshops = []
                	let shopids = ''
                	for (let i=0;i<data.data.length;i++) {

                		arr[i] = {
                			value: data.data[i].id,
            				label: data.data[i].brandName,
                		}

                		if (data.data[i].list.length) {

                			if (shopids === '') {
                				shopids = i
                			}

                			arr[i].children = []
                			for (let j=0;j<data.data[i].list.length;j++) {



                				this.totalshops.push(data.data[i].list[j].id)

	                			arr[i].children.push({
	                				value: data.data[i].list[j].id,
            						label: data.data[i].list[j].shopNum,
            						disabled: !data.data[i].list[j].sellStatus
	                			})	
	                		}
                		}



                		
                	}

                	

                	//console.info(shopids)

                	this.shop_brand = arr
                	this.search.shopIdsfirst = [
                		this.shop_brand[shopids].value, 
                		this.shop_brand[shopids].children[0].value,

                	]

                	this.get_drive_report()
                    
                })
                .catch(()=>{
                    this.$message({
                      message: '接口报错',
                      type: 'error'
                    })
                })
    	},
    	empty_TAMLL(item){
    		let r = []
    		let r2 = []
    		r=item.split("|")
    		item = ''
    		for(let i=0;i<r.length;i++){
    			if(r[i]=="TAMLL"){
    				r[i]=''
    			}
    			r2.push(r[i])
    		}
    		return item=r2.join("|")

    	},
  
    }
}
</script>
<style>

	.car .el-dialog__body {
		color: rgb(0,0,0) !important;
	}
	.iconhuo_red {
		color: red;
	}
	.tag_choose {
		display: flex;
		border-bottom: 1px solid #cccccc;
		margin-bottom: 30px;
	}

	.tag_choose .p_wrap {
		display: inline-block;
		margin-right: 16px;
		margin-bottom: 20px
	}

	.tag_choose .p_wrap .span_wrap {
		padding: 4px 12px;
		border-radius: 6px
	}

	.tag_choose .p_wrap .span_wrap_success {
	    color: #FFF;
	    background-color: #67C23A;
	}

	.el-btn-choosed {
		border: 1px solid red;
	}

	
	.el-button-s {
		
		display: inline-block;
	    line-height: 1;
	    white-space: nowrap;
	    cursor: pointer;
	    background: #FFF;
	    border: 1px solid #DCDFE6;
	    color: #606266;
	    -webkit-appearance: none;
	    text-align: center;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	    outline: 0;
	    margin: 0;
	    -webkit-transition: .1s;
	    transition: .1s;
	    font-weight: 500;
	    padding: 12px 20px;
	    font-size: 14px;
	    border-radius: 4px;
	    margin-left: 0px;
	    margin-bottom: 20px;
	    border-radius: 0px;
	}
	.el-button--success-a {
	    color: #67C23A;
	    background: #f0f9eb;
	    border-color: #c2e7b0;
	}

	.el-button-s:first-child {
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
	}

	.el-button-s:last-child {
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
	}

	.is-checkeda {
	    border: 1px solid #67c23a !important;
	    color: #67c23a !important;
	}
	

</style>
<style lang="less">


.div_qushi {
		z-index: 999999;
		position: absolute;
		width: 700px;
		height: 400px;
		left: 140px;
		top: 200px;
		border: 1px solid #DCDFE6;
		background: #ffffff;

		.div_qushi_title {
			height: 40px;
			border-bottom: 1px solid #DCDFE6;
			line-height: 40px;
			padding-left: 16px;
			font-size: 12px;

		}

		.div_qushi_content {
			width: 100%;
			height: 220px;
		}


	}

.car {
	height: calc(100vh - 140px);
	background: #ffffff;
	margin: 20px;
	margin-top: 0px;

	&-top  {
		position: relative;

		.monbtn{
	        position: relative;
	        
	        background-color: rgb(140, 206, 173);
	        color: #fff; 
		}

	}

	&-wrap {
		height: calc(100vh - 180px);
	  	background: #f2f2f2;
	  	border: 1px solid #cccccc;
	  	overflow-y: scroll;
	  	padding: 20px;
	  	padding-top: 0px;
	  	padding-bottom: 40px;

	  	.car_list {
	  		margin-top: 40px;
	  		height: 800px;
	  		background: #ffffff;
	  		border: 1px solid #cccccc;

	  		&-top {
	  			height: 40px;
	  			line-height: 40px;
	  			position: relative;
	  			text-align: center;

	  			i {
	  				position: absolute;
	  				left: 10px;
	  				font-size: 36px;
	  				top: 2px;
	  			}

	  			.btn_close {
	  				position: absolute;
	  				right: 10px;
	  				top: 6px;
	  			}
	  		}

	  		&-wrap {
	  			height: 144px;
	  			padding-left: 12px;
	  			padding-right: 12px;
	  			padding-top: 10px;
	  			padding-bottom: 10px;
	  			display: flex;
	  			border-bottom: 1px solid #cccccc;
	  			border-top: 1px solid #cccccc;

	  			.img_right {
	  				flex: 1;
	  				display: flex;

	  				.first_title {
	  					width: 14%;
	  					text-align: center;

	  					p {
	  						line-height: 24px;
	  					}

	  				}

	  			}

	  		}

	  		&-bottom {
	  			position: relative;
	  			width: 100%;
	  			overflow: hidden;
	  			height: 576px;

	  			.date_tip {
	  				position: absolute;
	  				left: 0px;
	  				top:0px;
	  				width: 130px;
	  				height: 26px;
	  				text-align: center;
	  				background: #3f3f3f;
	  				color: #ffffff;
	  				font-size: 12px;
	  				line-height: 26px;
	  			}

	  			.div_qushi {
		  					position: absolute;
		  					width: 500px;
		  					height: 300px;
		  					left: 200px;
		  					top: 80px;
		  					border: 1px solid #DCDFE6;
		  					z-index: 999;
		  					background: #ffffff;

		  					.div_qushi_title {
		  						height: 40px;
		  						border-bottom: 1px solid #DCDFE6;
		  						line-height: 40px;
		  						padding-left: 16px;
		  						font-size: 12px;

		  					}

		  					.div_qushi_content {
		  						width: 100%;
		  						height: 220px;

		  					}


		  				}


	  			li {
	  				text-align: center;
	  				line-height: 26px;
	  				font-size: 12px;
	  				height: 26px;
	  				width: 80px;
	  			}

	  			ul {
	  				height: 26px;

	  				&.pinkaul {
	  					height: 10px;

	  					li {
	  						background: grey;
	  						height: 10px;
	  					}
	  				}

	  				&.pinkaul_show_span {
	  					height: 0px;
	  					border-bottom: 0px;
	  					li {
	  						
	  						height: 0px;
	  						border-bottom: 0px !important;
	  					}
	  				}
	  			}

	  			.date_top {
	  				width: 100%;
	  				height: 26px;
	  				z-index: 1000;
	  				overflow: hidden;
	  				position: relative;
	  				left: 130px;
	  				border-left: 1px solid #DCDFE6;



	  				ul {
	  					position: absolute;
	  					left: 0px;


	  					li {
	  						background: #e86208;
	  						color: #ffffff;
	  						float: left;
	  						height: 100%;
	  						border-right: 1px solid #DCDFE6;
	  						border-bottom: 1px solid #DCDFE6;
	  					}
	  				}
		  		}

		  		.date_left {
		  			width: 130px;
		  			height: 550px;
		  			float: left;
		  			position: relative;
		  			overflow: hidden;

		  			ul {
		  				width: 100%;
		  				position: absolute;
		  				top: 0px;

		  				li {
		  					background: #3f3f3f;
		  					color: #ffffff;
		  					width: 130px;
		  					border-bottom: 1px solid #DCDFE6;
		  					border-right: 1px solid #DCDFE6;

		  					&.pinka {
		  						height: 10px;
		  						background: grey;
		  					}

		  					&.pinka_show_span {
		  						height: 0px;
		  						border-bottom: 0px;
		  					}
		  				}
		  			}
		  		}

		  		.date_content {
		  			position: absolute;
		  			left: 130px;
		  			top: 26px;
		  			height: 550px;
		  			overflow: scroll;
		  			width: calc(100vw - 410px);

		  			

		  			ul {
		  				position: relative;

		  				.div_qushi {
		  					position: absolute;
		  					width: 500px;
		  					height: 300px;
		  					left: 10px;
		  					top: 35px;
		  					border: 1px solid #DCDFE6;
		  					z-index: 999;
		  					background: #ffffff;

		  					.div_qushi_title {
		  						height: 40px;
		  						border-bottom: 1px solid #DCDFE6;
		  						line-height: 40px;
		  						padding-left: 16px;
		  						font-size: 12px;

		  					}

		  					.div_qushi_content {
		  						width: 100%;
		  						height: 220px;
		  					}


		  				}

		  				li {
		  					
		  					
		  					float: left;
		  					border-right: 1px solid #DCDFE6;
		  					border-bottom: 1px solid #DCDFE6;
		  				}
		  			}
		  		}

	  		}

	  		&-p {
	  			height: 40px;
	  			line-height: 40px;
	  			text-align: center;
	  			color: #0099ff;
	  		}
	  	}
	}
}
</style>
