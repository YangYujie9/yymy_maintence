<template>
	<div class="yj_cm_dataview">
<!-- 		<el-select v-model="type" placeholder="请选择" class="input_class"  popper-class="yyj_board_input" style="position: absolute;top: -40px;width: 90px;" @change="get_data" size="small">
		    <el-option
		      v-for="item in type_list"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value">
		    </el-option>
		</el-select> -->
		<p  style="position: absolute;top: -40px;width: 90px;">
          <el-button-group>
            <el-button  @click="choosetypelist(index)" type="text" v-for="(list,index) in type_list" style="margin-left:10px;color: rgb(165, 169, 181)" :class="{btnchoose:list.choose}">{{list.label}}</el-button>
            
          </el-button-group>
		</p>


		<div class="warp" v-show="type == 1">

			<div class="warp_left">
				<div class="warp_left_top">
					<span class="cur_hori left_top"></span>
					<span class="cur_veri left_top"></span>

					<span class="cur_hori left_bottom"></span>
					<span class="cur_veri left_bottom"></span>

					<span class="cur_hori right_top"></span>
					<span class="cur_veri right_top"></span>

					<span class="cur_hori right_bottom"></span>
					<span class="cur_veri right_bottom"></span>


					<div class="table_height"></div>
					<div class="top_div">
						<span class="title">品牌对比</span>
						<p class="p_btn">
							<el-select v-model="brand_search.brandtype" placeholder="请选择" class="input_class"  popper-class="yyj_board_input" style="width: 100px;" @change="show_shop_summar_data_bytype(1)">
							    <el-option
							      v-for="item in brand_type"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							</el-select>

				          <el-button-group>
				            <el-button  @click="choosebrandtype(index)" type="text" v-for="(list,index) in brand_choose_list" style="margin-left:10px;color: rgb(165, 169, 181)" :class="{btnchoose:list.choose}">{{list.label}}</el-button>
				            
				          </el-button-group>
						  <el-date-picker
						      v-model="brand_search.brandDate"
						      type="daterange"
						      range-separator="--"
						      start-placeholder="开始日期"
						      end-placeholder="结束日期"
						      :clearable=false
						      style="width: 245px;"
						      class="input_class datelist"
						      @change="show_shop_summar_data_bytype(1)">
					      </el-date-picker>					      
<!-- 					      <el-date-picker
					        v-model="brand_search.starttime"
					        type="date"
					        placeholder="选择日期"
					        :clearable=false
					        class="input_class datelist"
					        style="width: 110px;"
					        @change="show_shop_summar_data">
					      </el-date-picker>--<el-date-picker
					        v-model="brand_search.endtime"
					        type="date"
					        placeholder="选择日期"
					        :clearable=false
					        class="input_class datelist"
					        style="width: 110px;"
					        @change="show_shop_summar_data">
					      </el-date-picker> -->
					      <i @click="brand_comparison_show = true" class="iconfont iconjichuxinxishezhi pointer"></i>

						</p>
						
					</div>


					<div class="warp_content" id="brand_comparison">
						

					</div>
					<p style="position: absolute;right: 30px;bottom: 30px;">近{{brand_comparison_time}}天</p>


					<div class="table_height"></div>
				</div>
				<div class="warp_left_bottom">
					<span class="cur_hori left_top"></span>
					<span class="cur_veri left_top"></span>

					<span class="cur_hori left_bottom"></span>
					<span class="cur_veri left_bottom"></span>

					<span class="cur_hori right_top"></span>
					<span class="cur_veri right_top"></span>

					<span class="cur_hori right_bottom"></span>
					<span class="cur_veri right_bottom"></span>

					<div class="table_height"></div>
					<div class="top_div">
						<span class="title">店铺明细</span>
						<p class="p_btn">

					          <el-cascader
					            :options="shop_list"
					            v-model="brand_search.shopId"
					            placeholder="店铺"
					            :show-all-levels="false"
					            class="input_class"
					            clearable
					            :props="{ checkStrictly: true }"
					            @change="show_shop_summar_data_bytype(2)"
					            popper-class= "yyj_board_input">
					         
					          </el-cascader>
				          <el-button-group>
				            <el-button  @click="chooseshoptype(index)" type="text" v-for="(list,index) in shop_choose_list" style="margin-left:10px;color: rgb(165, 169, 181)" :class="{btnchoose:list.choose}">{{list.label}}</el-button>
				            
				          </el-button-group>
						  <el-date-picker
						      v-model="brand_search.shopDate"
						      type="daterange"
						      range-separator="--"
						      start-placeholder="开始日期"
						      end-placeholder="结束日期"
						      :clearable=false
						      style="width: 245px;"
						      class="input_class datelist"
						      @change="show_shop_summar_data_bytype(2)">
					      </el-date-picker>	
<!-- 					      <el-date-picker
					        v-model="brand_search.start"
					        type="date"
					        placeholder="选择日期"
					        :clearable=false
					        class="input_class datelist"
					        style="width: 110px;"
					        @change="show_shop_summar_data">
					      </el-date-picker>--<el-date-picker
					        v-model="brand_search.end"
					        type="date"
					        placeholder="选择日期"
					        :clearable=false
					        class="input_class datelist"
					        style="width: 110px;"
					        @change="show_shop_summar_data">
					      </el-date-picker> -->
					      <!-- <i @click="" class="iconfont iconjichuxinxishezhi pointer"></i> -->

						</p>
					</div>


					<div class="warp_content" id="shop_detail">
						

					</div>
					<p style="position: absolute;right: 30px;bottom: 30px;">近{{brand_shop_time}}天</p>

					
					<div class="table_height"></div>
				</div>
			</div>

			<div class="warp_left warp_right">
				<div class="warp_left_top">
					<span class="cur_hori left_top"></span>
					<span class="cur_veri left_top"></span>

					<span class="cur_hori left_bottom"></span>
					<span class="cur_veri left_bottom"></span>

					<span class="cur_hori right_top"></span>
					<span class="cur_veri right_top"></span>

					<span class="cur_hori right_bottom"></span>
					<span class="cur_veri right_bottom"></span>

					<div class="table_height"></div>


					<div class="warp_content circle_class" style="height: calc(100% - 40px)">
						<div class="left_warp" style="">
							<div class="left_warp_top" v-if="brand_data[0]">
								<p>总量<!-- {{brand_data[0].brandName}} --></p>
								<p>销量：{{brand_data[0].payQty}}</p>
								<p>询单：{{brand_data[0].enquiryNum}}</p>
								<p>转化：{{(brand_data[0].percent * 100).toFixed(2)}}%</p>
							</div>
							<div class="left_warp_top" v-if="brand_data[1]">
								<p>{{brand_data[1].brandName}}</p>
								<p>销量：{{brand_data[1].payQty}}</p>
								<p>询单：{{brand_data[1].enquiryNum}}</p>
								<p>转化：{{(brand_data[1].percent * 100).toFixed(2)}}%</p>
							</div>
						</div>
						<div class="left_warp" style="width: 45%;" id="brand_circle"></div>
						<div class="left_warp" style="">
							<div class="left_warp_top" v-if="brand_data[2]">
								<p>{{brand_data[3].brandName}}</p>
								<p>销量：{{brand_data[3].payQty}}</p>
								<p>询单：{{brand_data[3].enquiryNum}}</p>
								<p>转化：{{(brand_data[3].percent * 100).toFixed(2)}}%</p>
							</div>
							<div class="left_warp_top" v-if="brand_data[2]">
								<p>{{brand_data[2].brandName}}</p>
								<p>销量：{{brand_data[2].payQty}}</p>
								<p>询单：{{brand_data[2].enquiryNum}}</p>
								<p>转化：{{(brand_data[2].percent * 100).toFixed(2)}}%</p>
							</div>
						</div>
						

					</div>

					
					<div class="table_height"></div>
				</div>
					
				<div class="warp_left_bottom">
					<span class="cur_hori left_top"></span>
					<span class="cur_veri left_top"></span>

					<span class="cur_hori left_bottom"></span>
					<span class="cur_veri left_bottom"></span>

					<span class="cur_hori right_top"></span>
					<span class="cur_veri right_top"></span>

					<span class="cur_hori right_bottom"></span>
					<span class="cur_veri right_bottom"></span>
					<div class="table_height"></div>
					<div class="top_div">
						
						<span class="title">品牌占比</span>
						<p class="p_btn">

				          <el-button-group>
				            <el-button  @click="chooseproportiontype(index)" type="text" v-for="(list,index) in proportion_choose_list" style="margin-left:10px;color: rgb(165, 169, 181)" :class="{btnchoose:list.choose}">{{list.label}}</el-button>
				            
				          </el-button-group>
				          
						  <el-date-picker
						      v-model="brand_search.proportionDate"
						      type="daterange"
						      range-separator="--"
						      start-placeholder="开始日期"
						      end-placeholder="结束日期"
						      :clearable=false
						      style="width: 250px;"
						      class="input_class datelist"
						      @change="show_shop_summar_data_bytype(3)">
					      </el-date-picker>						      
<!-- 					      <el-date-picker
					        v-model="brand_search.startTime"
					        type="date"
					        placeholder="选择日期"
					        :clearable=false
					        class="input_class datelist"
					        style="width: 110px;"
					        @change="show_shop_summar_data">
					      </el-date-picker>--<el-date-picker
					        v-model="brand_search.endTime"
					        type="date"
					        placeholder="选择日期"
					        :clearable=false
					        class="input_class datelist"
					        style="width: 110px;"
					        @change="show_shop_summar_data">
					      </el-date-picker> -->
						</p>
					</div>


					<div class="warp_content circle_class">
						<div class="circle_warp"   style="width: 40%;position: relative;">
							<div id="circle_five" style="height:85%;width: 100%"></div>
							<p><i class="iconfont iconshuaxin icon_class" @click="change_shoptype"></i><span>{{brand_search.shop_type.name}}</span></p>
							<p>（汇总\C店\天猫）</p>
						</div>
						<div class="circle_warp">
							<div class="circle_div" id="circle_one"></div>
							<p>汇总</p>
							<div class="circle_div" id="circle_two" style="margin-top: 20px;"></div>
							
						</div>
						<div class="circle_warp">
							<div class="circle_div" id="circle_three"></div>
							<p>初彤</p>
							<div class="circle_div" id="circle_four" style="margin-top: 20px;"></div>
							
						</div>


						

						

					</div>

					
					<div class="table_height"></div>
				</div>
				
			</div>


        </div>


		<div class="warp"  v-show="type == 2">

			<div class="warp_left">
				<div class="warp_left_top">
					<span class="cur_hori left_top"></span>
					<span class="cur_veri left_top"></span>

					<span class="cur_hori left_bottom"></span>
					<span class="cur_veri left_bottom"></span>

					<span class="cur_hori right_top"></span>
					<span class="cur_veri right_top"></span>

					<span class="cur_hori right_bottom"></span>
					<span class="cur_veri right_bottom"></span>
					<div class="table_height"></div>
					<div class="top_div">
						<span class="title">团队对比</span>
						<p class="p_btn">
							<el-select v-model="search.teamtype" placeholder="请选择" class="input_class"  popper-class="yyj_board_input" @change="show_team_summar_data_bytype(1)">
							    <el-option
							      v-for="item in team_type"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							</el-select>

				          <el-button-group>
				            <el-button  @click="chooseteamtype(index)" type="text" v-for="(list,index) in team_choose_list" style="margin-left:10px;color: rgb(165, 169, 181)" :class="{btnchoose:list.choose}">{{list.label}}</el-button>
				            
				          </el-button-group>
						  <el-date-picker
						      v-model="search.teamDate"
						      type="daterange"
						      range-separator="--"
						      start-placeholder="开始日期"
						      end-placeholder="结束日期"
						      :clearable=false
						      style="width: 250px;"
						      class="input_class datelist"
						      @change="show_team_summar_data_bytype(1)">
					      </el-date-picker>						      
<!-- 					      <el-date-picker
					        v-model="search.starttime"
					        type="date"
					        placeholder="选择日期"
					        :clearable=false
					        class="input_class datelist"
					        style="width: 110px;"
					        @change="show_team_summar_data">
					      </el-date-picker>--<el-date-picker
					        v-model="search.endtime"
					        type="date"
					        placeholder="选择日期"
					        :clearable=false
					        class="input_class datelist"
					        style="width: 110px;"
					        @change="show_team_summar_data">
					      </el-date-picker> -->
					      <i @click="team_comparison_show = true" class="iconfont iconjichuxinxishezhi pointer"></i>

						</p>
						
					</div>


					<div class="warp_content" id="team_comparison">
						

					</div>
					<p style="position: absolute;right: 30px;bottom: 30px;">近{{team_comparison_time}}天</p>


					<div class="table_height"></div>
				</div>
				<div class="warp_left_bottom">
					<span class="cur_hori left_top"></span>
					<span class="cur_veri left_top"></span>

					<span class="cur_hori left_bottom"></span>
					<span class="cur_veri left_bottom"></span>

					<span class="cur_hori right_top"></span>
					<span class="cur_veri right_top"></span>

					<span class="cur_hori right_bottom"></span>
					<span class="cur_veri right_bottom"></span>
					<div class="table_height"></div>
					<div class="top_div">
						<span class="title">店铺人力</span>
						<p class="p_btn">
							<el-select v-model="search.teamId" placeholder="选择团队" class="input_class"  popper-class="yyj_board_input" clearable @change="show_team_summar_data_bytype(2)">
							    <el-option
							      v-for="item in team_list"
							      :key="item.teamId"
							      :label="item.teamName"
							      :value="item.teamId">
							    </el-option>
							</el-select>

						  <el-date-picker
						      v-model="search.humanDate"
						      type="daterange"
						      range-separator="--"
						      start-placeholder="开始日期"
						      end-placeholder="结束日期"
						      :clearable=false
						      style="width: 250px;"
						      class="input_class datelist"
						      @change="show_team_summar_data_bytype(2)">
					      </el-date-picker>	
<!-- 					      <el-date-picker
					        v-model="search.start"
					        type="date"
					        placeholder="选择日期"
					        :clearable=false
					        class="input_class datelist"
					        style="width: 110px;"
					        @change="show_team_summar_data">
					      </el-date-picker>--<el-date-picker
					        v-model="search.end"
					        type="date"
					        placeholder="选择日期"
					        :clearable=false
					        class="input_class datelist"
					        style="width: 110px;"
					        @change="show_team_summar_data">
					      </el-date-picker> -->
					      <i @click="shop_human_show = true" class="iconfont iconjichuxinxishezhi pointer"></i>

						</p>
					</div>


					<div class="warp_content" id="shop_human">
						

					</div>
					<p style="position: absolute;right: 30px;bottom: 30px;">近{{team_shop_time}}天</p>

					
					<div class="table_height"></div>
				</div>
			</div>

			<div class="warp_left warp_right">
				<div class="warp_left_top">
					<span class="cur_hori left_top"></span>
					<span class="cur_veri left_top"></span>

					<span class="cur_hori left_bottom"></span>
					<span class="cur_veri left_bottom"></span>

					<span class="cur_hori right_top"></span>
					<span class="cur_veri right_top"></span>

					<span class="cur_hori right_bottom"></span>
					<span class="cur_veri right_bottom"></span>
					<div class="table_height"></div>


					<div class="warp_content circle_class" style="height: calc(100% - 40px)">
						<div class="left_warp" style="">
							<div class="left_warp_top" v-if="group_data[0]">
								<p>{{group_data[0].groupName}}</p>
								<p>销量：{{group_data[0].payQty}}</p>
								<p>询单：{{group_data[0].enquiryNum}}</p>
								<p>转化：{{(group_data[0].percent * 100).toFixed(2)}}%</p>
							</div>
							<div class="left_warp_top" v-if="group_data[1]">
								<p>{{group_data[1].groupName}}</p>
								<p>销量：{{group_data[1].payQty}}</p>
								<p>询单：{{group_data[1].enquiryNum}}</p>
								<p>转化：{{(group_data[1].percent * 100).toFixed(2)}}%</p>
							</div>
						</div>
						<div class="left_warp" style="width: 45%;" id="team_circle"></div>
						<div class="left_warp" style="">
							<div class="left_warp_top" v-if="group_data[3]">
								<p>{{group_data[3].groupName}}</p>
								<p>销量：{{group_data[3].payQty}}</p>
								<p>询单：{{group_data[3].enquiryNum}}</p>
								<p>转化：{{(group_data[3].percent * 100).toFixed(2)}}%</p>
							</div>
							<div class="left_warp_top"  v-if="group_data[2]">
								<p>{{group_data[2].groupName}}</p>
								<p>销量：{{group_data[2].payQty}}</p>
								<p>询单：{{group_data[2].enquiryNum}}</p>
								<p>转化：{{(group_data[2].percent * 100).toFixed(2)}}%</p>
							</div>

						</div>
						

					</div>

					
					<div class="table_height"></div>
				</div>
					
				<div class="warp_left_bottom">
					<span class="cur_hori left_top"></span>
					<span class="cur_veri left_top"></span>

					<span class="cur_hori left_bottom"></span>
					<span class="cur_veri left_bottom"></span>

					<span class="cur_hori right_top"></span>
					<span class="cur_veri right_top"></span>

					<span class="cur_hori right_bottom"></span>
					<span class="cur_veri right_bottom"></span>
					<div class="table_height"></div>
					<div class="top_div">
						
						<span class="title">询单情况</span>
						<p class="p_btn">
						  <el-date-picker
						      v-model="search.inquiryDate"
						      type="daterange"
						      range-separator="--"
						      start-placeholder="开始日期"
						      end-placeholder="结束日期"
						      :clearable=false
						      style="width: 250px;"
						      class="input_class datelist"
						      @change="show_team_summar_data_bytype(3)">
					      </el-date-picker>	
<!-- 					      <el-date-picker
					        v-model="search.startTime"
					        type="date"
					        placeholder="选择日期"
					        :clearable=false
					        class="input_class datelist"
					        style="width: 110px;"
					        @change="show_team_summar_data">
					      </el-date-picker>--<el-date-picker
					        v-model="search.endTime"
					        type="date"
					        placeholder="选择日期"
					        :clearable=false
					        class="input_class datelist"
					        style="width: 110px;"
					        @change="show_team_summar_data">
					      </el-date-picker> -->
					      <!-- <span style="margin-left: 10px;">品牌</span> -->
							<el-select v-model="search.brandId" placeholder="品牌" class="input_class"  popper-class="yyj_board_input" clearable @change="show_team_summar_data_bytype(3)" style="width: 80px">
							    <el-option
							      v-for="item in brand_list"
							      :key="item.id"
							      :label="item.brandName"
							      :value="item.id">
							    </el-option>
							</el-select>

						</p>
					</div>


					<div class="warp_content circle_class">
						<div style="width: 50%;" id="inquiry_one"></div>
						<div style="width: 50%;" id="inquiry_two"></div>
						

					</div>

					
					<div class="table_height"></div>
				</div>
				
			</div>


        </div>


		<el-dialog
			  title="详细数据"
			  :visible.sync="brand_comparison_show"
			  width="700px">
			  <span slot="title" class="el-dialog__title">
			    {{shop_title}}
			  </span>
			  <div >
  				<el-table
				    :data="brand_comparison_table"
				    height="500"
				    
				    :header-cell-style='{"background": "#a6a6a6",
		    		"border-right": "1px solid #ffffff",
		    		"color": "#222d30","padding": "4px","text-align": "center"}'
		    		
				    style="width: 98%">
				    <el-table-column
				      prop="date"
				      label="日期"
				      align="center"

				      width="110">
				      	<template slot-scope="scope">
                          	{{fmtDate(scope.row.date)}}
	                                                     
	                    </template>
				    </el-table-column>
				    <el-table-column
				      prop="total"
				      label="总数"
				      align="center">

				    </el-table-column>
				    <el-table-column
				      prop="fb"
				      label="菲碧"
				      align="center">

				    </el-table-column>
				    <el-table-column
				      prop="ct"
				      label="初彤"
				      align="center">

				    </el-table-column>
				    <el-table-column
				      prop="xs"
				      label="形色"
				      align="center">

				    </el-table-column>  

	  				</el-table>
	  			</div>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="brand_comparison_show = false">取 消</el-button>
			  </span>
		</el-dialog>
		<el-dialog
			  title="详细数据"
			  :visible.sync="team_comparison_show"
			  width="700px">
  			  <span slot="title" class="el-dialog__title">
			    {{team_title}}
			  </span>
			  <div >
  				<el-table
				    :data="team_comparison_table"
				    height="500"
				    
				    :header-cell-style='{"background": "#a6a6a6",
		    		"border-right": "1px solid #ffffff",
		    		"color": "#222d30","padding": "4px","text-align": "center"}'
		    		
				    style="width: 98%">
				    <el-table-column
				      prop="date"
				      label="日期"
				      align="center"

				      width="110">
				      	<template slot-scope="scope">
                          	{{fmtDate(scope.row.date)}}
	                                                     
	                    </template>
				    </el-table-column>
				    <el-table-column
				      prop="total"
				      label="总数"
				      align="center">

				    </el-table-column>
				    <el-table-column
				      prop="yibu"
				      label="售前一部"
				      align="center">

				    </el-table-column>
				    <el-table-column
				      prop="erbu"
				      label="售前二部"
				      align="center">

				    </el-table-column>
				    <el-table-column
				      prop="waibao"
				      label="外包团队"
				      align="center">

				    </el-table-column>  

	  				</el-table>
	  			</div>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="team_comparison_show = false">取 消</el-button>
			  </span>
		</el-dialog>
		<el-dialog
			  title="店铺人力详情"
			  :visible.sync="shop_human_show"
			  width="700px">

			  <div >
  				<el-table
				    :data="shop_human_table"
				    height="500"
				    
				    :header-cell-style='{"background": "#a6a6a6",
		    		"border-right": "1px solid #ffffff",
		    		"color": "#222d30","padding": "4px","text-align": "center"}'
		    		
				    style="width: 98%">
				    <el-table-column
				      prop="shopNum"
				      label="日期"
				      align="center"

				      width="110">

				    </el-table-column>
				    <el-table-column
				      prop="dayCount"
				      label="早班人数"
				      align="center">

				    </el-table-column>
				    <el-table-column
				      prop="nightCount"
				      label="晚班人数"
				      align="center">

				    </el-table-column>


  				</el-table>
  			  </div>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="shop_human_show = false">取 消</el-button>
			  </span>
		</el-dialog>
	</div>
	
</template>

<script>
import echarts from 'echarts'
import { mapGetters } from 'vuex'
var brand_comparison_chart
var team_comparison_chart
var shop_detail_chart
var shop_human_chart
var circle_one_chart
var circle_two_chart
var circle_three_chart
var circle_four_chart
var circle_five_chart
var brand_circle_chart
var team_circle_chart
var inquiry_one_chart
var inquiry_two_chart

  export default {
    name: "system-setting",
    data(){
      return{
      	brand_comparison_show: false,
      	shop_detail_show: false,
      	team_comparison_show: false,
      	shop_human_show:false,
      	brand_comparison_table: [],
      	shop_detail_table: [],
      	team_comparison_table: [],
      	shop_human_table:[],
      	type:1,
      	type_list:[{
      		value:1,
      		label:'店铺',
      		choose: true
      	},{
      		value:2,
      		label:'团队',
      		choose:false
      	}],

      	brand_search:{
      		brandtype:1,
	      	brand_choose:1,
	      	shop_choose:2,
	      	proportion_choose:1,
	      	shop_type:{},
	      	brandDate:[new Date(new Date(new Date().toLocaleDateString()).getTime() - 3600*24*1000*16),new Date(new Date(new Date().toLocaleDateString()).getTime() - 3600*24*1000*2)],
	      	shopDate:[new Date(new Date(new Date().toLocaleDateString()).getTime() - 3600*24*1000*16),new Date(new Date(new Date().toLocaleDateString()).getTime() - 3600*24*1000*2)],
	      	proportionDate:[new Date(new Date(new Date().toLocaleDateString()).getTime() - 3600*24*1000*16),new Date(new Date(new Date().toLocaleDateString()).getTime() - 3600*24*1000*2)],
      		shopId:'',

	    },
      	search:{
      		teamtype:1,
      		teamchoose:1,   //1-销量 2-询单 3-转化率
      		teamDate:[new Date(new Date(new Date().toLocaleDateString()).getTime()-3600*24*1000*16),new Date(new Date(new Date().toLocaleDateString()).getTime()-3600*24*1000*2)],

      		humanDate:[new Date(new Date(new Date().toLocaleDateString()).getTime()-3600*24*1000*16),new Date(new Date(new Date().toLocaleDateString()).getTime() - 3600*24*1000*2)],

      		inquiryDate:[new Date(new Date(new Date().toLocaleDateString()).getTime()-3600*24*1000*16),new Date(new Date(new Date().toLocaleDateString()).getTime() - 3600*24*1000*2)],

      		teamId:'',
      		brandId:'',
      	},
      	brand_data:[],
      	group_data:[],
      	team_list:[{
      		teamId:'07-120-122',
      		teamName:'售前一部'
      	},{
      		teamId:'07-120-123',
      		teamName:'售前二部'
      	},{
      		teamId:'07-120-167',
      		teamName:'外包团队'
      	}],

      	shop_type_list:[{
      		value:'',
      		name:'汇总'
      	},{
      		value:1,
      		name:'C店'
      	},{
      		value:2,
      		name:'天猫'
      	}],

      	brand_type:[{
      		value:1,
      		label:'品牌概要'
      	},{
      		value:2,
      		label:'品牌汇总'
      	}],
      	brand_list:[],
      	shop_list:[],
      	team_type:[{
      		value:1,
      		label:'团队对比'
      	},{
      		value:2,
      		label:'团队汇总'
      	},{
      		value:3,
      		label:'售前一部'
      	},{
      		value:4,
      		label:'售前二部'
      	},{
      		value:5,
      		label:'外包团队'
      	}],


      	
      	brand_choose_list:[{
      		value:1,
      		label:'销量',
      		choose:true
      	},{
      		value:2,
      		label:'询单',
      		choose:false
      	},{
      		value:3,
      		label:'询单转化率',
      		choose:false
      	}],
      	shop_choose_list:[
      	// {
      	// 	value:1,
      	// 	label:'销量',
      	// 	choose:true
      	// },
      	{
      		value:2,
      		label:'询单',
      		choose:true
      	},{
      		value:3,
      		label:'询单转化率',
      		choose:false
      	}],
      	team_choose_list:[{
      		value:1,
      		label:'销量',
      		choose:true
      	},{
      		value:2,
      		label:'询单',
      		choose:false
      	},{
      		value:3,
      		label:'询单转化率',
      		choose:false
      	}],
      	proportion_choose_list:[{
      		value:1,
      		label:'销量',
      		choose:true
      	},{
      		value:2,
      		label:'询单',
      		choose:false
      	}],

      	brand_outline_option:{
      			color: ['rgb(255, 0, 0)', 'rgb(255, 204, 51)', 'rgb(126, 207, 81)', 'rgb(97, 165, 232)'],

                textStyle:{
					color:'#949494'
				},
			   

			    tooltip: {
			        trigger: 'axis',
			        axisPointer: {
			            type: 'shadow'
			        }

			    },
			    grid: {
			    	top: '4%',
			        left: '4%',
			        right: '4%',
			        bottom: '10%',
			        containLabel: true
			    },

			    legend: {
	                   x: 'left',
	                   y: 'bottom',
	                   left: '5%',
	                   icon: 'circle',

	                textStyle: { //图例文字的样式
	                            color: '#949494',
	                            
	                        },

			        data:[]
			    },
			    xAxis: [
			        {
			            type: 'category',
			            axisTick: {
			                alignWithLabel: true
			            },


			            data: []
			        }
			    ],

			    yAxis: {
			        type: 'value',
			        splitLine: {
		            	show: true,
		            	lineStyle: {
		            		type:'dotted',
		            		color:'#eee'
		            	}
		            },
		            axisLine: {
						show: true,
		                lineStyle: {
		                    color: '#949494'
		                }
			           
			        },
	              

			    },

			    series:[]
      	},
      	shop_detail_option:{
                textStyle:{
					color:'#949494'
				},
			   

			    tooltip: {
			        trigger: 'axis',
			        axisPointer: {
			            type: 'shadow'
			        }

			    },
			    grid: {
			    	top: '4%',
			        left: '4%',
			        right: '4%',
			        bottom: '10%',
			        containLabel: true
			    },

			    legend: {
	                   x: 'left',
	                   y: 'bottom',
	                   left: '5%',
	                   icon: 'circle',

	                textStyle: { //图例文字的样式
	                            color: '#949494',
	                            
	                        },

			        data:[]
			    },
			    xAxis: [
			        {
			            type: 'category',
			            axisTick: {
			                alignWithLabel: true
			            },


			            data: []
			        }
			    ],

			    yAxis: {
			        type: 'value',
			        splitLine: {
		            	show: true,
		            	lineStyle: {
		            		type:'dotted',
		            		color:'#eee'
		            	}
		            },
		            axisLine: {
						show: true,
		                lineStyle: {
		                    color: '#949494'
		                }
			           
			        },
	              

			    },

			    series:[]
      	},

		brand_circle_option: {
			   color:['#e16757','#61a5e8','#dcb02d','#e3935d'],
			    // title: {
			    //     //text: '天气情况统计',
				   //  subtext: '汇总',
			    //     x:'center',
			    //     //y: 'bottom',
			    //     bottom:'0'
			    // },
			    tooltip : {
			        trigger: 'item',
			        formatter: "{b} : {c} ({d}%)"
			    },
			    legend: {
			        // orient: 'vertical',
			        // top: 'middle',
			        show: true,
			        //orient: 'center',
			        x: 'center',  
			        //y:'bottom' ,
			        bottom: '4%',
			        // left: 'center',
			        padding:0,
			        itemGap:6,
			        itemWidth:16,
			        data: [],
			        icon: 'circle',
			        selectedMode:true,
	        	    textStyle: { //图例文字的样式
                        color: '#949494',
                        
                    },
			    },

			    series : [
			        {
			            type: 'pie',
			            radius : '90%',
			            center: ['50%', '50%'],
			            //selectedMode: 'single',
			            clockwise:false,
			           	label:{            //饼图图形上的文本标签
	                        normal:{
	                            show:true,
	                            position:'inner', //标签的位置
	                            textStyle : {
	                                fontWeight : 300 ,
	                                fontSize : 12   //文字的字体大小
	                            },
	                            formatter:'{d}%'

	                            
	                        }
	                    },
			            data:[],
			            itemStyle: {
			                emphasis: {
			                    shadowBlur: 10,
			                    shadowOffsetX: 0,
			                    shadowColor: 'rgba(0, 0, 0, 0.5)'
			                }
			            }
			        }
			    ]
			},

		circle_one_option: {
			   color:['rgb(225, 103, 87)','#61a5e8'],
			    // title: {
			    //     //text: '天气情况统计',
				   //  subtext: '汇总',
			    //     x:'center',
			    //     //y: 'bottom',
			    //     bottom:'0'
			    // },
			    tooltip : {
			        trigger: 'item',
			        formatter: "{b} : {c} ({d}%)"
			    },
			    legend: {
			        // orient: 'vertical',
			        // top: 'middle',
			        show: true,
			        //orient: 'center',
			        x: 'left',    
			        // bottom: '13%',
			        // left: 'center',
			        data: ['天猫','C店'],
			        icon: 'circle',
			        selectedMode:false,
	        	    textStyle: { //图例文字的样式
                        color: '#949494',
                        
                    },
			    },

			    series : [
			        {
			            type: 'pie',
			            radius : '80%',
			            center: ['50%', '60%'],
			            //selectedMode: 'single',
			            //hoverAnimation:false,
			           	label:{            //饼图图形上的文本标签
	                        normal:{
	                            show:true,
	                            position:'inner', //标签的位置
	                            textStyle : {
	                                fontWeight : 300 ,
	                                fontSize : 12   //文字的字体大小
	                            },
	                            formatter:'{d}%'

	                            
	                        }
	                    },
			            data:[],
			            itemStyle: {
			                emphasis: {
			                    shadowBlur: 10,
			                    shadowOffsetX: 0,
			                    shadowColor: 'rgba(0, 0, 0, 0.5)'
			                }
			            }
			        }
			    ]
			},

		circle_two_option: {
			   color:['rgb(225, 103, 87)','#61a5e8'],
			    title: {
			        //text: '天气情况统计',
				    subtext: '菲碧',
			        x:'center',
			        //y: 'bottom',
			        bottom:'0'
			    },
			    tooltip : {
			        trigger: 'item',
			        formatter: "{b} : {c} ({d}%)"
			    },
			    legend: {
			    	show:false,
			        orient: 'center',
			        x: 'left',    
			        // bottom: '13%',
			        // left: 'center',
			        data: ['天猫','C店'],
			        icon: 'circle',
	        	    textStyle: { //图例文字的样式
                        color: '#949494',
                        
                    },
			    },

			    series : [
			        {
			            type: 'pie',
			            radius : '80%',
			            center: ['50%', '40%'],
			            //selectedMode: 'single',
			           	label:{            //饼图图形上的文本标签
	                        normal:{
	                            show:true,
	                            position:'inner', //标签的位置
	                            textStyle : {
	                                fontWeight : 300 ,
	                                fontSize : 12   //文字的字体大小
	                            },
	                            formatter:'{d}%'

	                            
	                        }
	                    },
			            data:[],
			            itemStyle: {
			                emphasis: {
			                    shadowBlur: 10,
			                    shadowOffsetX: 0,
			                    shadowColor: 'rgba(0, 0, 0, 0.5)'
			                }
			            }
			        }
			    ]
			},

		circle_three_option: {
			   color:['rgb(225, 103, 87)','#61a5e8'],
			    // title: {
			    //     //text: '天气情况统计',
				   //  subtext: '菲碧',
			    //     x:'center',
			    //     //y: 'bottom',
			    //     bottom:'0'
			    // },
			    tooltip : {
			        trigger: 'item',
			        formatter: "{b} : {c} ({d}%)"
			    },
			    legend: {
			    	show:false,
			        orient: 'center',
			        x: 'left',    
			        // bottom: '13%',
			        // left: 'center',
			        data: ['天猫','C店'],
			        icon: 'circle',
	        	    textStyle: { //图例文字的样式
                        color: '#949494',
                        
                    },
			    },

			    series : [
			        {
			            type: 'pie',
			            radius : '80%',
			            center: ['50%', '60%'],
			            //selectedMode: 'single',
			           	label:{            //饼图图形上的文本标签
	                        normal:{
	                            show:true,
	                            position:'inner', //标签的位置
	                            textStyle : {
	                                fontWeight : 300 ,
	                                fontSize : 12   //文字的字体大小
	                            },
	                            formatter:'{d}%'

	                            
	                        }
	                    },
			            data:[],
			            itemStyle: {
			                emphasis: {
			                    shadowBlur: 10,
			                    shadowOffsetX: 0,
			                    shadowColor: 'rgba(0, 0, 0, 0.5)'
			                }
			            }
			        }
			    ]
			},

		circle_four_option: {
			   color:['rgb(225, 103, 87)','#61a5e8'],
			    title: {
			        //text: '天气情况统计',
				    subtext: '形色',
			        x:'center',
			        //y: 'bottom',
			        bottom:'0'
			    },
			    tooltip : {
			        trigger: 'item',
			        formatter: "{b} : {c} ({d}%)"
			    },
			    legend: {
			    	show:false,
			        //orient: 'center',
			        x: 'left', 
			        y:'top',   
			        // bottom: '13%',
			        // left: 'center',
			        data: ['天猫','C店'],
			        icon: 'circle',
	        	    textStyle: { //图例文字的样式
                        color: '#949494',
                        
                    },
			    },

			    series : [
			        {
			            type: 'pie',
			            radius : '80%',
			            center: ['50%', '40%'],
			            //selectedMode: 'single',
			           	label:{            //饼图图形上的文本标签
	                        normal:{
	                            show:true,
	                            position:'inner', //标签的位置
	                            textStyle : {
	                                fontWeight : 300 ,
	                                fontSize : 12   //文字的字体大小
	                            },
	                            formatter:'{d}%'

	                            
	                        }
	                    },
			            data:[],
			            itemStyle: {
			                emphasis: {
			                    shadowBlur: 10,
			                    shadowOffsetX: 0,
			                    shadowColor: 'rgba(0, 0, 0, 0.5)'
			                }
			            }
			        }
			    ]
			},


		circle_five_option: {
			   color:['#61a5e8','rgb(225, 103, 87)','#dcb02d'],
			    // title: {
			    //     //text: '天气情况统计',
				   //  subtext: '虚构数据',
			    //     x:'center',
			    //     //y: 'bottom',
			    //     bottom:'0'
			    // },
			    tooltip : {
			        trigger: 'item',
			        formatter: "{b} : {c} ({d}%)"
			    },
			    legend: {
			    	//show:false,
			        // orient: 'center',
			        // x: 'left',    
			        //bottom:10,
			        bottom:'4%',
			        x: 'center',
			        data: ['菲碧', '初彤','形色'],
			        icon: 'circle',
			        padding:0,
			        itemGap:6,
			        itemWidth:16,
	        	    textStyle: { //图例文字的样式
                        color: '#949494',
                        
                    },
			    },

			    series : [
			        {
			            type: 'pie',
			            radius : '80%',
			            clockwise:false,
			            center: ['50%', '50%'],
			            //selectedMode: 'single',
			           	label:{            //饼图图形上的文本标签
	                        normal:{
	                            show:true,
	                            position:'inner', //标签的位置
	                            textStyle : {
	                                fontWeight : 300 ,
	                                fontSize : 12   //文字的字体大小
	                            },
	                            formatter:'{d}%'

	                            
	                        }
	                    },
			            data:[],
			            itemStyle: {
			                emphasis: {
			                    shadowBlur: 10,
			                    shadowOffsetX: 0,
			                    shadowColor: 'rgba(0, 0, 0, 0.5)'
			                }
			            }
			        }
			    ]
			},

		inquiry_one_option: {
			   color:['rgb(220, 176, 45)','rgb(97, 165, 232)','#e16757'],
			    tooltip : {
			        trigger: 'item',
			        formatter: "{b} : {c} ({d}%)"
			    },
			    legend: {
			    	//show:false,
			        orient: 'center',
			        x: 'left',    
			        //bottom:10,
			        // bottom:'4%',
			        // x: 'center',
			        data: [],
			        icon: 'circle',
			        padding:0,
			        itemGap:6,
			        itemWidth:16,
	        	    textStyle: { //图例文字的样式
                        color: '#949494',
                        
                    },
			    },

			    series : [
			        {
			            type: 'pie',
			            radius : '70%',
			            center: ['50%', '60%'],
			            //selectedMode: 'single',
			           	label:{            //饼图图形上的文本标签
	                        normal:{
	                            show:true,
	                            position:'inner', //标签的位置
	                            textStyle : {
	                                fontWeight : 300 ,
	                                fontSize : 12   //文字的字体大小
	                            },
	                            formatter:'{d}%'

	                            
	                        }
	                    },
			            data:[],
			            itemStyle: {
			                emphasis: {
			                    shadowBlur: 10,
			                    shadowOffsetX: 0,
			                    shadowColor: 'rgba(0, 0, 0, 0.5)'
			                }
			            }
			        }
			    ]
			},

		inquiry_two_option: {
			   color:['rgb(220, 176, 45)','rgb(97, 165, 232)','#e16757'],
			    tooltip : {
			        trigger: 'item',
			        formatter: "{b} : {c} ({d}%)"
			    },
			    legend: {
			    	show:false,
			        // orient: 'center',
			        // x: 'left',    
			        //bottom:10,
			        bottom:'4%',
			        x: 'center',
			        data: [],
			        icon: 'circle',
			        padding:0,
			        itemGap:6,
			        itemWidth:16,
	        	    textStyle: { //图例文字的样式
                        color: '#949494',
                        
                    },
			    },

			    series : [
			        {
			            type: 'pie',
			            radius : '70%',
			            center: ['50%', '60%'],
			            //selectedMode: 'single',
			           	label:{            //饼图图形上的文本标签
	                        normal:{
	                            show:true,
	                            position:'inner', //标签的位置
	                            textStyle : {
	                                fontWeight : 300 ,
	                                fontSize : 12   //文字的字体大小
	                            },
	                            formatter:'{d}%'

	                            
	                        }
	                    },
			            data:[],
			            itemStyle: {
			                emphasis: {
			                    shadowBlur: 10,
			                    shadowOffsetX: 0,
			                    shadowColor: 'rgba(0, 0, 0, 0.5)'
			                }
			            }
			        }
			    ]
			},






      }
    },
    created() {

    },
    computed:{
      ...mapGetters([
          'getpageDict',
      ]),






      team_comparison_time(){

      	return (((this.search.teamDate[1].getTime() - this.search.teamDate[0].getTime())/(24 * 3600 *1000)) + 1).toFixed()
      	
      },



      team_shop_time(){

      	return (((this.search.humanDate[1].getTime() - this.search.humanDate[0].getTime())/(24 * 3600 *1000)) + 1).toFixed()
      	
      },


      brand_comparison_time(){

      	return (((this.brand_search.brandDate[1].getTime() - this.brand_search.brandDate[0].getTime())/(24 * 3600 *1000)) + 1).toFixed()
      	
      },



      brand_shop_time(){

      	return (((this.brand_search.shopDate[1].getTime() - this.brand_search.shopDate[0].getTime())/(24 * 3600 *1000)) +1).toFixed()
      	
      },


      shop_title(){
      	let name = ''
      	switch(this.brand_search.brand_choose) {
		    case 1:
		        name = '销量详情'
		        break;
		    case 2:
		        name = '询单详情'
		        break;
		    default:
		        name = '询单转化率详情'
		} 
		return name
      },


      team_title(){
      	let name = ''
      	switch(this.search.teamchoose) {
		    case 1:
		        name = '销量详情'
		        break;
		    case 2:
		        name = '询单详情'
		        break;
		    default:
		        name = '询单转化率详情'
		} 
		return name
      }




    

    },

    watch:{

    },
    mounted(){

    	this.brand_search.shop_type = this.shop_type_list[0]

        this.get_brand_list()
        this.get_shop_bybrand()

    	this.get_data()










      
      
    },
    methods:{



      fmtDate(obj){
        var date =  new Date(obj*1000);
        var y = 1900+date.getYear();
        var m = "0"+(date.getMonth()+1);
        var d = "0"+date.getDate();
        //var h = date.getHours();
        //console.info(h)
        return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
        //return y+"-"+m.substring(m.length-2,m.length);
      },

      get_shop_bybrand(){
        this.$http.get(`compose/get_brand`)
        .then((data)=>{
          if(data.code == '200'){
            this.shopId = ''
            let list = []
            for(let i=0;i<data.data.length;i++){
              list.push({value:data.data[i].brandId, label:data.data[i].brandName})

              if(data.data[i].list.length){
                  list[i]['children'] = []
                for(let j=0;j<data.data[i].list.length;j++){
                  list[i]['children'].push({value:data.data[i].list[j].id, label:data.data[i].list[j].shopNum})
                }
              }
            }


            this.shop_list = list
            //console.info(this.shop_list)
            //this.shopId = this.shop_list[0].children[0].value
            // this.shopId.push(this.shop_list[0].value)
            // this.shopId.push(this.shop_list[0].children[0].value)
            
          }
        })
      },
      choosetypelist(index){
      	for(let i=0;i<this.type_list.length;i++){
      		this.type_list[i].choose = false
      	}
      	this.type_list[index].choose = true
      	this.type = this.type_list[index].value
      	this.get_data()
      },

      choosebrandtype(index){
      	for(let i=0;i<this.brand_choose_list.length;i++){
      		this.brand_choose_list[i].choose = false
      	}
      	this.brand_choose_list[index].choose = true
      	this.brand_search.brand_choose = this.brand_choose_list[index].value
      	this.show_shop_summar_data_bytype(1)
      },

      chooseshoptype(index){
      	for(let i=0;i<this.shop_choose_list.length;i++){
      		this.shop_choose_list[i].choose = false
      	}
      	this.shop_choose_list[index].choose = true
      	this.brand_search.shop_choose = this.shop_choose_list[index].value
      	this.show_shop_summar_data_bytype(2)
      },

      chooseteamtype(index){
      	for(let i=0;i<this.team_choose_list.length;i++){
      		this.team_choose_list[i].choose = false
      	}
      	this.team_choose_list[index].choose = true
      	this.search.teamchoose = this.team_choose_list[index].value
      	this.show_team_summar_data_bytype(1)
      },


      chooseproportiontype(index){
      	for(let i=0;i<this.proportion_choose_list.length;i++){
      		this.proportion_choose_list[i].choose = false
      	}
      	this.proportion_choose_list[index].choose = true
      	this.brand_search.proportion_choose = this.proportion_choose_list[index].value
      	this.show_shop_summar_data_bytype(3)
      },




      get_data(){


      	if(this.type == 1){
      		this.show_shop_summar_data()
      	}else {
      		this.show_team_summar_data()
      	}


      },


      get_brand_list(){
      	this.$http.get(`composeVisual/get_brand_list`)
      	.then((data)=>{
      		if(data.code == '200'){
      			this.brand_list = data.data

      		} else {
              return this.$message({
                message:data.msg,
                type:'error'
              })
            }
        })
        .catch(()=>{
          this.$message({
            message:'接口报错',
            type:'error'
          })
        })
      },

      change_shoptype(){

      	let index = ''

      	for(let i=0;i<this.shop_type_list.length;i++){
      		if(this.shop_type_list[i].value == this.brand_search.shop_type.value){
      			index = i
      			break
      		}
      	}

      	if(index == 2){
      		index = -1
      	}

      	this.brand_search.shop_type = this.shop_type_list[index + 1]

      	this.show_shop_summar_data_bytype(3)

      	
      },


      show_team_summar_data(){
      	
      	this.$http.post(`composeVisual/show_team_summar_data`,{
      		start: this.search.teamDate[0].getTime().toString().substr(0,10),
			end: this.search.teamDate[1].getTime().toString().substr(0,10),
			orderOrSale: this.search.teamchoose,   //1-销量 2-询单 3-转化率
			dimensionality: this.search.teamtype,
			shopStart: this.search.humanDate[0].getTime().toString().substr(0,10),
			shopEnd: this.search.humanDate[1].getTime().toString().substr(0,10),
			groupId: this.search.teamId,
			startTime: this.search.inquiryDate[0].getTime().toString().substr(0,10),
			endTime: this.search.inquiryDate[1].getTime().toString().substr(0,10),
			brand: this.search.brandId

      	})

      	.then((data)=>{
      		if(data.code == '200'){




      			//团队对比  brand_outline_option

                this.brand_outline_option.legend.data = []
      			this.brand_outline_option.series = []
      			this.brand_outline_option.xAxis[0].data = []

      			if(data.data.composeTeamContrastVOList && data.data.composeTeamContrastVOList.length){

      			



	      			let parameter = ''

	      			if(this.search.teamchoose == 1){
	      				parameter = "payQty"
	      			}else if(this.search.teamchoose == 2){
	      				parameter = "enquiryNumAvg"
	      			}else{
	      				parameter = "rate"
	      			}

	      			let list =[]



	                let days = Number((((this.search.teamDate[1].getTime() - this.search.teamDate[0].getTime())/(24 * 3600 *1000)) + 1).toFixed())
	                // let arr1 = new Array(days)
	                // //arr.length = days
	                // arr1.fill(0)   //初始化数组

	  				let year = this.search.teamDate[0].getFullYear()

		    		let month = this.search.teamDate[0].getMonth()

		    		let day = this.search.teamDate[0].getDate()

			        let startdate = new Date(year,month,day,0,0,0).getTime()/1000


	      			for(let i=0;i<days;i++){
	      				let date = new Date(this.search.teamDate[0].getTime() + 24 * 3600 * 1000 * i)

			      		let y = date.getFullYear()
			      		let m = "0" + (date.getMonth() + 1)
			      		let d = "0" + (date.getDate())
			      		
	  				    this.brand_outline_option.xAxis[0].data.push(m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length))

			      		
	      			}


	      			if(this.search.teamtype == 1 || (this.search.teamtype == 2 && this.search.teamchoose != 3)){

	      				



		      			let group = [
			      			{groupId:'',groupName:''},
			      			{groupId:'07-120-122',groupName:'售前一部'},
			      			{groupId:'07-120-123',groupName:'售前二部'},
			      			{groupId:'07-120-167',groupName:'外包团队'}
		      			]  

		      			for(let i=0;i<data.data.composeTeamContrastVOList.length;i++){
		                    list[i] = []

		      				for(let k=0;k<group.length;k++){
		      					list[i][k] = {}
		      					list[i][k].groupId = group[k].groupId
		      					list[i][k].groupName = group[k].groupName
		      					list[i][k].data = ''
		      					list[i][k][parameter] = 0
		      				}
		      				
		      			



		      				for(let k=0;k<group.length;k++){

		      					

		      					if(list[i][k].groupId == ''){
		      						if(this.search.teamchoose == 1){
		      							list[i][k].groupName = '日销量'
		      							list[i][k].data = data.data.composeTeamContrastVOList[i].data
		      							list[i][k][parameter] = data.data.composeTeamContrastVOList[i].payQtyTotal
		      						} else if(this.search.teamchoose == 2){
		      							list[i][k].groupName = '总询单'
		      							list[i][k].data = data.data.composeTeamContrastVOList[i].data
		      							list[i][k][parameter] = data.data.composeTeamContrastVOList[i].enquiryNum
		      						}else{
		      							list[i][k].groupName = '总转化率'
		      							list[i][k].data = data.data.composeTeamContrastVOList[i].data
		      							list[i][k][parameter] = data.data.composeTeamContrastVOList[i].rate
		      						}
		      					}else {
			      					for(let j=0;j<data.data.composeTeamContrastVOList[i].list.length;j++){

				      					if(list[i][k].groupId == data.data.composeTeamContrastVOList[i].list[j].groupId){

			      							//list[i][k].groupName = data.data.composeTeamContrastVOList[i].list[j].groupName
			      							list[i][k].data = data.data.composeTeamContrastVOList[i].list[j].data
			      							list[i][k][parameter] = data.data.composeTeamContrastVOList[i].list[j][parameter]
			      							break

				      					}

				      					//list[i].push({...data.data.composeTeamContrastVOList[i].list[j]})
				      				}
		      					}


		      				}



		      			}

		      			//数据报表


      					let arr = []

	      				for(let i=0;i<list.length;i++) {
	      					//arr[i].date = []
	      					arr[i] = {}

	      					
	      					for(let j=0;j<list[i].length;j++) {
	      						arr[i].date = list[i][0].data
	      						if(list[i][j].groupId == '07-120-122'){
	      							arr[i].yibu = list[i][j][parameter]
	      						}else if(list[i][j].groupId == '07-120-123') {
	      							arr[i].erbu = list[i][j][parameter]
	      						}else if(list[i][j].groupId == '07-120-167') {
	      							arr[i].waibao = list[i][j][parameter]
	      						}else {
	      							arr[i].total = list[i][j][parameter]
	      						}
	      					}
	      				}
	      				this.team_comparison_table = arr




		      			for(let i=0;i<list[0].length;i++){

		      				this.brand_outline_option.legend.data.push(list[0][i].groupName)

		      			}
		      			



		      			//数组转置

		      			// let lista = []

		      			// for(let i=0;i<list[0].length;i++){
		      			// 	lista[i] = []
		      			// }

		      			// for(let i=0;i<list.length;i++){

		      			// 	for(let j=0;j<list[i].length;j++){


		      			// 		lista[j][i] = {}

		      			// 		lista[j][i] = {...list[i][j]}

		      			// 	}
		      			// }

		      			//console.info(lista)





		      			if( (this.search.teamtype == 1 && this.search.teamchoose == 3) || (this.search.teamtype == 2)){
		      				for(let i=0;i<list[0].length;i++){




		      					this.brand_outline_option.series.push({
						            name:list[0][i].groupName,
						            type:'line',
						            barGap: 0,
						            data:new Array(days).fill(0),
						           //  itemStyle:{
						        	  // color:'#ff9933',
						           //  }
		      					})
		      				}


		      			} else if(this.search.teamtype == 1 && this.search.teamchoose != 3){

		      				this.brand_outline_option.series.push({
					            name:list[0][0].groupName,
					            type:'line',
					            barGap: 0,
					            data:new Array(days).fill(0),
					            itemStyle:{
					        	  color:'#ff9933',
					            }
					        },
					        {
					            name:list[0][1].groupName,
					            type:'bar',
					            //yAxisIndex: 1,
					            itemStyle:{
					        	  color:'#5793f3',
					            },
					            data:new Array(days).fill(0),

					        },
					        {
					            name:list[0][2].groupName,
					            type:'bar',
					            //yAxisIndex: 2,#ff9933
					            itemStyle:{
					        	  color:'#5793f3',
					            },
					            data:new Array(days).fill(0)
					        },
					        {
					            name:list[0][3].groupName,
					            type:'bar',
					            //yAxisIndex: 2,#ff9933
					            itemStyle:{
					        	  color:'#5793f3',
					            },
					            data:new Array(days).fill(0)
					        })




					    }



					      

		                    //console.info(this.brand_outline_option.series)
		                    



					        

					        for(let i=0;i<list.length;i++){

					        	let cha = (list[i][0].data - startdate)/3600/24

					        	


					        	for(let j=0;j<list[i].length;j++){
					        		this.brand_outline_option.series[j].data[cha] = list[i][j][parameter]

					        	}


					        }

	      			}else if(this.search.teamchoose == 2){

	      				let classname = [{
	      					name:'总询单',
	      					value:'enquiryNumTotal'
	      				},{
	      					name:'早班人均询单',
	      					value:'enquiryDayAvg'
	      				},{
	      					name:'晚班人均询单',
	      					value:'enquiryNightAvg'
	      				}]


	      				for(let i=0;i<classname.length;i++){
	      					this.brand_outline_option.legend.data.push(classname[i].name)
	      				}


	  				
	      				this.brand_outline_option.series.push({
				            name:classname[0].name,
				            type:'line',
				            barGap: 0,
				            data:new Array(days).fill(0),
				            itemStyle:{
				        	  color:'#ff9933',
				            }
				        },
				        {
				            name:classname[1].name,
				            type:'bar',
				            //yAxisIndex: 1,
				            itemStyle:{
				        	  color:'#5793f3',
				            },
				            data:new Array(days).fill(0),

				        },
				        {
				            name:classname[2].name,
				            type:'bar',
				            //yAxisIndex: 2,#ff9933
				            itemStyle:{
				        	  color:'#5793f3',
				            },
				            data:new Array(days).fill(0)
				        })
	      				

	      				for(let i=0;i<data.data.composeTeamContrastVOList.length;i++){

	      					let cha = (data.data.composeTeamContrastVOList[i].data - startdate)/3600/24

	      					this.brand_outline_option.series[0].data[cha] = data.data.composeTeamContrastVOList[i].enquiryNumTotal

	      					this.brand_outline_option.series[1].data[cha] = data.data.composeTeamContrastVOList[i].enquiryDayAvg

	      					this.brand_outline_option.series[2].data[cha] = data.data.composeTeamContrastVOList[i].enquiryNightAvg
	      					
	      				}


	      				//console.info(this.brand_outline_option.series)



	      			} else {

	      				let legend = ''

	      				if(this.search.teamchoose == 1){
	      					legend = '销量'
	      				} else if(this.search.teamchoose == 3){
	      					legend = '转化率'
	      				}

	                    this.brand_outline_option.legend.data.push(legend)

	                    this.brand_outline_option.series.push({
				            name:legend,
				            type:'line',
				            //yAxisIndex: 2,#ff9933
				            itemStyle:{
				        	  color:'#5793f3',
				            },
				            data:new Array(days).fill(0)
				        })




				        for(let i=0;i<data.data.composeTeamContrastVOList.length;i++){

				        	let cha = (data.data.composeTeamContrastVOList[i].data - startdate)/3600/24

				        	this.brand_outline_option.series[0].data[cha] = data.data.composeTeamContrastVOList[i][parameter]
				        }


				        //console	.info(this.brand_outline_option.series)

				        


	      			}
	      			




				}



                if (team_comparison_chart) {
                    team_comparison_chart.clear()
                    team_comparison_chart = null
                }

	      	    this.$nextTick(()=>{


	                team_comparison_chart = echarts.init(document.getElementById('team_comparison'));
	     
	    			team_comparison_chart.setOption(this.brand_outline_option)


	    		})
      			



      			//店铺人力
      			this.shop_detail_option.xAxis[0].data = []
      			this.shop_detail_option.series = []
      			this.shop_detail_option.legend.data = []
      			this.shop_human_table = []

      			if(data.data.shopHumanVOList && data.data.shopHumanVOList.length){

      				this.shop_human_table = data.data.shopHumanVOList





	      			let legend = ['日均询单','早班人数','晚班人数']
	                this.shop_detail_option.series.push({
			            name:'日均询单',
			            type:'line',
			            //barGap: 0,
			            data:[],
			            itemStyle:{
			        	  color:'#ff9933',
			            }
			        },{
			            name:'早班人数',
			            type:'bar',
			            //barGap: 0,
			            data:[],
			            itemStyle:{
			        	  color:'#5793f3',
			            }
			        },{
			            name:'晚班人数',
			            type:'bar',
			            //barGap: 0,
			            data:[],
			            itemStyle:{
			        	  color:'#5793f3',
			            }
			        })

	      			for(let i=0;i<data.data.shopHumanVOList.length;i++){

	      				this.shop_detail_option.xAxis[0].data.push(data.data.shopHumanVOList[i].shopNum)

	      				this.shop_detail_option.series[0].data.push(data.data.shopHumanVOList[i].enquiryNumAvg)
	      				this.shop_detail_option.series[1].data.push(data.data.shopHumanVOList[i].dayCount)
	      				this.shop_detail_option.series[2].data.push(data.data.shopHumanVOList[i].nightCount)


	      			}

	      			for(let i=0;i<legend.length;i++){
	      				this.shop_detail_option.legend.data.push(legend[i])


	      			}


		      	}
      			//console.info(this.shop_detail_option)

                if (shop_human_chart) {
                    shop_human_chart.clear()
                    shop_human_chart = null
                }

	      	    this.$nextTick(()=>{


	                shop_human_chart = echarts.init(document.getElementById('shop_human'));
	     
	    			shop_human_chart.setOption(this.shop_detail_option)


	    		})


	    		//数据汇总

	    		this.group_data = []
	    		this.brand_circle_option.legend.data = []
	    		this.brand_circle_option.series[0].data = []

	    		if(data.data.composeSummarVO && data.data.composeSummarVO.list.length){



		    		this.group_data.push({groupName:'汇总', payQty:data.data.composeSummarVO.payQty, enquiryNum:data.data.composeSummarVO.enquiryNum, percent: data.data.composeSummarVO.percent})

		    		for(let i=0;i<data.data.composeSummarVO.list.length;i++){
		    			this.group_data.push({...data.data.composeSummarVO.list[i]})
		    		}

		    		for(let i=1;i<this.group_data.length;i++){
	                    
	                    this.brand_circle_option.legend.data.push(this.group_data[i].groupName)

		    			if(this.search.teamchoose == 1){
		    				
		    				this.brand_circle_option.series[0].data.push({value:this.group_data[i].payQty, name:this.group_data[i].groupName})
		    			}else{
		    				
		    				this.brand_circle_option.series[0].data.push({value:this.group_data[i].enquiryNum, name:this.group_data[i].groupName})
		    			}
		    		}


		      	}

		    		//console.info(this.brand_circle_option)
	                if (team_circle_chart) {
	                    team_circle_chart.clear()
	                    team_circle_chart = null
	                }

		      	    this.$nextTick(()=>{


		                team_circle_chart = echarts.init(document.getElementById('team_circle'));
		     
		    			team_circle_chart.setOption(this.brand_circle_option)


		    		})

	    		

				let groupList = [{groupId:'07-120-122',groupName:'售前一部'},
							     {groupId:'07-120-123',groupName:'售前二部'},
							     {groupId:'07-120-167',groupName:'外包团队'}]

	    		//询单情况

    			this.inquiry_one_option.legend.data = []

				this.inquiry_one_option.series[0].data = []

	    		if(data.data.dayRateList && data.data.dayRateList.length){

	    			let list = []

	    			for(let i=0;i<groupList.length;i++){
	    				this.inquiry_one_option.legend.data.push(groupList[i].groupName)

	    				list.push({
	    					groupId: groupList[i].groupId,
	    					groupName: groupList[i].groupName,
	    					enquiryDayNum: 0,
	    				})
	    			}


	    			for(let i=0;i<groupList.length;i++){

		    			for(let j=0;j<data.data.dayRateList.length;j++){
		    				if(list[i].groupId == data.data.dayRateList[j].groupId){
		    					list[i].enquiryDayNum = data.data.dayRateList[j].enquiryDayNum
		    				}
		    			}
	    			}


	    			for(let i=0;i<list.length;i++){
	    				this.inquiry_one_option.series[0].data.push({
	    					name:list[i].groupName,
	    					value:list[i].enquiryDayNum
	    				})
	    			}


	    		}


	                if (inquiry_one_chart) {
	                    inquiry_one_chart.clear()
	                    inquiry_one_chart = null
	                }

		      	    this.$nextTick(()=>{


		                inquiry_one_chart = echarts.init(document.getElementById('inquiry_one'));
		     
		    			inquiry_one_chart.setOption(this.inquiry_one_option)


		    		})






   			    this.inquiry_two_option.legend.data = []

				this.inquiry_two_option.series[0].data = []

	    		if(data.data.nightRateList && data.data.nightRateList.length){


	    			let list = []

	    			for(let i=0;i<groupList.length;i++){
	    				this.inquiry_two_option.legend.data.push(groupList[i].groupName)

	    				list.push({
	    					groupId: groupList[i].groupId,
	    					groupName: groupList[i].groupName,
	    					enquiryNightNum: 0,
	    				})
	    			}


	    			for(let i=0;i<groupList.length;i++){

		    			for(let j=0;j<data.data.nightRateList.length;j++){
		    				if(list[i].groupId == data.data.nightRateList[j].groupId){
		    					list[i].enquiryNightNum = data.data.nightRateList[j].enquiryNightNum
		    				}
		    			}
	    			}


	    			for(let i=0;i<list.length;i++){
	    				this.inquiry_two_option.series[0].data.push({
	    					name:list[i].groupName,
	    					value:list[i].enquiryNightNum
	    				})
	    			}


	    			
	    		}

	                if (inquiry_two_chart) {
	                    inquiry_two_chart.clear()
	                    inquiry_two_chart = null
	                }

		      	    this.$nextTick(()=>{
		            	
		                inquiry_two_chart = echarts.init(document.getElementById('inquiry_two'));
		     
		    			inquiry_two_chart.setOption(this.inquiry_two_option)

		    		})





      			

      			

      		} else {
              return this.$message({
                message:data.msg,
                type:'error'
              })
            }
        })
        .catch(()=>{
          this.$message({
            message:'接口报错',
            type:'error'
          })
        })

      },


	show_team_summar_data_bytype(type){
      	
      	this.$http.post(`composeVisual/show_team_summar_data`,{
      		start: this.search.teamDate[0].getTime().toString().substr(0,10),
			end: this.search.teamDate[1].getTime().toString().substr(0,10),
			orderOrSale: this.search.teamchoose,   //1-销量 2-询单 3-转化率
			dimensionality: this.search.teamtype,
			shopStart: this.search.humanDate[0].getTime().toString().substr(0,10),
			shopEnd: this.search.humanDate[1].getTime().toString().substr(0,10),
			groupId: this.search.teamId,
			startTime: this.search.inquiryDate[0].getTime().toString().substr(0,10),
			endTime: this.search.inquiryDate[1].getTime().toString().substr(0,10),
			brand: this.search.brandId

      	})

      	.then((data)=>{
      		if(data.code == '200'){



      			if(type === 1) {

	      			//团队对比  brand_outline_option

	                this.brand_outline_option.legend.data = []
	      			this.brand_outline_option.series = []
	      			this.brand_outline_option.xAxis[0].data = []

	      			if(data.data.composeTeamContrastVOList && data.data.composeTeamContrastVOList.length){

	      			



		      			let parameter = ''

		      			if(this.search.teamchoose == 1){
		      				parameter = "payQty"
		      			}else if(this.search.teamchoose == 2){
		      				parameter = "enquiryNumAvg"
		      			}else{
		      				parameter = "rate"
		      			}

		      			let list =[]



		                let days = Number((((this.search.teamDate[1].getTime() - this.search.teamDate[0].getTime())/(24 * 3600 *1000)) + 1).toFixed())
		                // let arr1 = new Array(days)
		                // //arr.length = days
		                // arr1.fill(0)   //初始化数组

		  				let year = this.search.teamDate[0].getFullYear()

			    		let month = this.search.teamDate[0].getMonth()

			    		let day = this.search.teamDate[0].getDate()

				        let startdate = new Date(year,month,day,0,0,0).getTime()/1000


		      			for(let i=0;i<days;i++){
		      				let date = new Date(this.search.teamDate[0].getTime() + 24 * 3600 * 1000 * i)

				      		let y = date.getFullYear()
				      		let m = "0" + (date.getMonth() + 1)
				      		let d = "0" + (date.getDate())
				      		
		  				    this.brand_outline_option.xAxis[0].data.push(m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length))

				      		
		      			}


		      			if(this.search.teamtype == 1 || (this.search.teamtype == 2 && this.search.teamchoose != 3)){

		      				



			      			let group = [
				      			{groupId:'',groupName:''},
				      			{groupId:'07-120-122',groupName:'售前一部'},
				      			{groupId:'07-120-123',groupName:'售前二部'},
				      			{groupId:'07-120-167',groupName:'外包团队'}
			      			]  

			      			for(let i=0;i<data.data.composeTeamContrastVOList.length;i++){
			                    list[i] = []

			      				for(let k=0;k<group.length;k++){
			      					list[i][k] = {}
			      					list[i][k].groupId = group[k].groupId
			      					list[i][k].groupName = group[k].groupName
			      					list[i][k].data = ''
			      					list[i][k][parameter] = 0
			      				}
			      				
			      			



			      				for(let k=0;k<group.length;k++){

			      					

			      					if(list[i][k].groupId == ''){
			      						if(this.search.teamchoose == 1){
			      							list[i][k].groupName = '日销量'
			      							list[i][k].data = data.data.composeTeamContrastVOList[i].data
			      							list[i][k][parameter] = data.data.composeTeamContrastVOList[i].payQtyTotal
			      						} else if(this.search.teamchoose == 2){
			      							list[i][k].groupName = '总询单'
			      							list[i][k].data = data.data.composeTeamContrastVOList[i].data
			      							list[i][k][parameter] = data.data.composeTeamContrastVOList[i].enquiryNum
			      						}else{
			      							list[i][k].groupName = '总转化率'
			      							list[i][k].data = data.data.composeTeamContrastVOList[i].data
			      							list[i][k][parameter] = data.data.composeTeamContrastVOList[i].rate
			      						}
			      					}else {
				      					for(let j=0;j<data.data.composeTeamContrastVOList[i].list.length;j++){

					      					if(list[i][k].groupId == data.data.composeTeamContrastVOList[i].list[j].groupId){

				      							//list[i][k].groupName = data.data.composeTeamContrastVOList[i].list[j].groupName
				      							list[i][k].data = data.data.composeTeamContrastVOList[i].list[j].data
				      							list[i][k][parameter] = data.data.composeTeamContrastVOList[i].list[j][parameter]
				      							break

					      					}

					      					//list[i].push({...data.data.composeTeamContrastVOList[i].list[j]})
					      				}
			      					}


			      				}



			      			}


		      			//数据报表


	      					let arr = []

		      				for(let i=0;i<list.length;i++) {
		      					//arr[i].date = []
		      					arr[i] = {}

		      					
		      					for(let j=0;j<list[i].length;j++) {
		      						arr[i].date = list[i][0].data
		      						if(list[i][j].groupId == '07-120-122'){
		      							arr[i].yibu = list[i][j][parameter]
		      						}else if(list[i][j].groupId == '07-120-123') {
		      							arr[i].erbu = list[i][j][parameter]
		      						}else if(list[i][j].groupId == '07-120-167') {
		      							arr[i].waibao = list[i][j][parameter]
		      						}else {
		      							arr[i].total = list[i][j][parameter]
		      						}
		      					}
		      				}
		      				this.team_comparison_table = arr
			      			//console.info(list)

			      			for(let i=0;i<list[0].length;i++){

			      				this.brand_outline_option.legend.data.push(list[0][i].groupName)

			      			}
			      			



			      			//数组转置

			      			// let lista = []

			      			// for(let i=0;i<list[0].length;i++){
			      			// 	lista[i] = []
			      			// }

			      			// for(let i=0;i<list.length;i++){

			      			// 	for(let j=0;j<list[i].length;j++){


			      			// 		lista[j][i] = {}

			      			// 		lista[j][i] = {...list[i][j]}

			      			// 	}
			      			// }

			      			//console.info(lista)





			      			if( (this.search.teamtype == 1 && this.search.teamchoose == 3) || (this.search.teamtype == 2)){
			      				for(let i=0;i<list[0].length;i++){




			      					this.brand_outline_option.series.push({
							            name:list[0][i].groupName,
							            type:'line',
							            barGap: 0,
							            data:new Array(days).fill(0),
							           //  itemStyle:{
							        	  // color:'#ff9933',
							           //  }
			      					})
			      				}


			      			} else if(this.search.teamtype == 1 && this.search.teamchoose != 3){

			      				this.brand_outline_option.series.push({
						            name:list[0][0].groupName,
						            type:'line',
						            barGap: 0,
						            data:new Array(days).fill(0),
						            itemStyle:{
						        	  color:'#ff9933',
						            }
						        },
						        {
						            name:list[0][1].groupName,
						            type:'bar',
						            //yAxisIndex: 1,
						            itemStyle:{
						        	  color:'#5793f3',
						            },
						            data:new Array(days).fill(0),

						        },
						        {
						            name:list[0][2].groupName,
						            type:'bar',
						            //yAxisIndex: 2,#ff9933
						            itemStyle:{
						        	  color:'#5793f3',
						            },
						            data:new Array(days).fill(0)
						        },
						        {
						            name:list[0][3].groupName,
						            type:'bar',
						            //yAxisIndex: 2,#ff9933
						            itemStyle:{
						        	  color:'#5793f3',
						            },
						            data:new Array(days).fill(0)
						        })




						    }



						      

			                    //console.info(this.brand_outline_option.series)
			                    



						        

						        for(let i=0;i<list.length;i++){

						        	let cha = (list[i][0].data - startdate)/3600/24

						        	


						        	for(let j=0;j<list[i].length;j++){
						        		this.brand_outline_option.series[j].data[cha] = list[i][j][parameter]

						        	}


						        }

		      			}else if(this.search.teamchoose == 2){

		      				let classname = [{
		      					name:'总询单',
		      					value:'enquiryNumTotal'
		      				},{
		      					name:'早班人均询单',
		      					value:'enquiryDayAvg'
		      				},{
		      					name:'晚班人均询单',
		      					value:'enquiryNightAvg'
		      				}]


		      				for(let i=0;i<classname.length;i++){
		      					this.brand_outline_option.legend.data.push(classname[i].name)
		      				}


		  				
		      				this.brand_outline_option.series.push({
					            name:classname[0].name,
					            type:'line',
					            barGap: 0,
					            data:new Array(days).fill(0),
					            itemStyle:{
					        	  color:'#ff9933',
					            }
					        },
					        {
					            name:classname[1].name,
					            type:'bar',
					            //yAxisIndex: 1,
					            itemStyle:{
					        	  color:'#5793f3',
					            },
					            data:new Array(days).fill(0),

					        },
					        {
					            name:classname[2].name,
					            type:'bar',
					            //yAxisIndex: 2,#ff9933
					            itemStyle:{
					        	  color:'#5793f3',
					            },
					            data:new Array(days).fill(0)
					        })
		      				

		      				for(let i=0;i<data.data.composeTeamContrastVOList.length;i++){

		      					let cha = (data.data.composeTeamContrastVOList[i].data - startdate)/3600/24

		      					this.brand_outline_option.series[0].data[cha] = data.data.composeTeamContrastVOList[i].enquiryNumTotal

		      					this.brand_outline_option.series[1].data[cha] = data.data.composeTeamContrastVOList[i].enquiryDayAvg

		      					this.brand_outline_option.series[2].data[cha] = data.data.composeTeamContrastVOList[i].enquiryNightAvg
		      					
		      				}


		      				//console.info(this.brand_outline_option.series)



		      			} else {

		      				let legend = ''

		      				if(this.search.teamchoose == 1){
		      					legend = '销量'
		      				} else if(this.search.teamchoose == 3){
		      					legend = '转化率'
		      				}

		                    this.brand_outline_option.legend.data.push(legend)

		                    this.brand_outline_option.series.push({
					            name:legend,
					            type:'line',
					            //yAxisIndex: 2,#ff9933
					            itemStyle:{
					        	  color:'#5793f3',
					            },
					            data:new Array(days).fill(0)
					        })




					        for(let i=0;i<data.data.composeTeamContrastVOList.length;i++){

					        	let cha = (data.data.composeTeamContrastVOList[i].data - startdate)/3600/24

					        	this.brand_outline_option.series[0].data[cha] = data.data.composeTeamContrastVOList[i][parameter]
					        }


					        //console	.info(this.brand_outline_option.series)

					        


		      			}
		      			




					}



	                if (team_comparison_chart) {
	                    team_comparison_chart.clear()
	                    team_comparison_chart = null
	                }

		      	    this.$nextTick(()=>{


		                team_comparison_chart = echarts.init(document.getElementById('team_comparison'));
		     
		    			team_comparison_chart.setOption(this.brand_outline_option)


		    		})


		    		//数据汇总

		    		this.group_data = []
		    		this.brand_circle_option.legend.data = []
		    		this.brand_circle_option.series[0].data = []


		    		if(data.data.composeSummarVO && data.data.composeSummarVO.list.length){
		    			



			    		this.group_data.push({groupName:'汇总', payQty:data.data.composeSummarVO.payQty, enquiryNum:data.data.composeSummarVO.enquiryNum, percent: data.data.composeSummarVO.percent})

			    		for(let i=0;i<data.data.composeSummarVO.list.length;i++){
			    			this.group_data.push({...data.data.composeSummarVO.list[i]})
			    		}

			    		for(let i=1;i<this.group_data.length;i++){
		                    
		                    this.brand_circle_option.legend.data.push(this.group_data[i].groupName)

			    			if(this.search.teamchoose == 1){
			    				
			    				this.brand_circle_option.series[0].data.push({value:this.group_data[i].payQty, name:this.group_data[i].groupName})
			    			}else{
			    				
			    				this.brand_circle_option.series[0].data.push({value:this.group_data[i].enquiryNum, name:this.group_data[i].groupName})
			    			}
			    		}


			      	}

			    		//console.info(this.brand_circle_option)
		                if (team_circle_chart) {
		                    team_circle_chart.clear()
		                    team_circle_chart = null
		                }

			      	    this.$nextTick(()=>{


			                team_circle_chart = echarts.init(document.getElementById('team_circle'));
			     
			    			team_circle_chart.setOption(this.brand_circle_option)


			    		})



		      	}else if(type === 2) {
	      			



	      			//店铺人力
	      			this.shop_detail_option.xAxis[0].data = []
	      			this.shop_detail_option.series = []
	      			this.shop_detail_option.legend.data = []
	      			this.shop_human_table = []

	      			if(data.data.shopHumanVOList && data.data.shopHumanVOList.length){


	      				this.shop_human_table = data.data.shopHumanVOList



		      			let legend = ['日均询单','早班人数','晚班人数']
		                this.shop_detail_option.series.push({
				            name:'日均询单',
				            type:'line',
				            //barGap: 0,
				            data:[],
				            itemStyle:{
				        	  color:'#ff9933',
				            }
				        },{
				            name:'早班人数',
				            type:'bar',
				            //barGap: 0,
				            data:[],
				            itemStyle:{
				        	  color:'#5793f3',
				            }
				        },{
				            name:'晚班人数',
				            type:'bar',
				            //barGap: 0,
				            data:[],
				            itemStyle:{
				        	  color:'#5793f3',
				            }
				        })

		      			for(let i=0;i<data.data.shopHumanVOList.length;i++){

		      				this.shop_detail_option.xAxis[0].data.push(data.data.shopHumanVOList[i].shopNum)

		      				this.shop_detail_option.series[0].data.push(data.data.shopHumanVOList[i].enquiryNumAvg)
		      				this.shop_detail_option.series[1].data.push(data.data.shopHumanVOList[i].dayCount)
		      				this.shop_detail_option.series[2].data.push(data.data.shopHumanVOList[i].nightCount)


		      			}

		      			for(let i=0;i<legend.length;i++){
		      				this.shop_detail_option.legend.data.push(legend[i])


		      			}


			      	}
	      			//console.info(this.shop_detail_option)

	                if (shop_human_chart) {
	                    shop_human_chart.clear()
	                    shop_human_chart = null
	                }

		      	    this.$nextTick(()=>{


		                shop_human_chart = echarts.init(document.getElementById('shop_human'));
		     
		    			shop_human_chart.setOption(this.shop_detail_option)


		    		})
		      	} else {




		    		

					let groupList = [{groupId:'07-120-122',groupName:'售前一部'},
								     {groupId:'07-120-123',groupName:'售前二部'},
								     {groupId:'07-120-167',groupName:'外包团队'}]

		    		//询单情况

	    			this.inquiry_one_option.legend.data = []

					this.inquiry_one_option.series[0].data = []

		    		if(data.data.dayRateList && data.data.dayRateList.length){

		    			let list = []

		    			for(let i=0;i<groupList.length;i++){
		    				this.inquiry_one_option.legend.data.push(groupList[i].groupName)

		    				list.push({
		    					groupId: groupList[i].groupId,
		    					groupName: groupList[i].groupName,
		    					enquiryDayNum: 0,
		    				})
		    			}


		    			for(let i=0;i<groupList.length;i++){

			    			for(let j=0;j<data.data.dayRateList.length;j++){
			    				if(list[i].groupId == data.data.dayRateList[j].groupId){
			    					list[i].enquiryDayNum = data.data.dayRateList[j].enquiryDayNum
			    				}
			    			}
		    			}


		    			for(let i=0;i<list.length;i++){
		    				this.inquiry_one_option.series[0].data.push({
		    					name:list[i].groupName,
		    					value:list[i].enquiryDayNum
		    				})
		    			}


		    		}


		                if (inquiry_one_chart) {
		                    inquiry_one_chart.clear()
		                    inquiry_one_chart = null
		                }

			      	    this.$nextTick(()=>{


			                inquiry_one_chart = echarts.init(document.getElementById('inquiry_one'));
			     
			    			inquiry_one_chart.setOption(this.inquiry_one_option)


			    		})






	   			    this.inquiry_two_option.legend.data = []

					this.inquiry_two_option.series[0].data = []

		    		if(data.data.nightRateList && data.data.nightRateList.length){


		    			let list = []

		    			for(let i=0;i<groupList.length;i++){
		    				this.inquiry_two_option.legend.data.push(groupList[i].groupName)

		    				list.push({
		    					groupId: groupList[i].groupId,
		    					groupName: groupList[i].groupName,
		    					enquiryNightNum: 0,
		    				})
		    			}


		    			for(let i=0;i<groupList.length;i++){

			    			for(let j=0;j<data.data.nightRateList.length;j++){
			    				if(list[i].groupId == data.data.nightRateList[j].groupId){
			    					list[i].enquiryNightNum = data.data.nightRateList[j].enquiryNightNum
			    				}
			    			}
		    			}


		    			for(let i=0;i<list.length;i++){
		    				this.inquiry_two_option.series[0].data.push({
		    					name:list[i].groupName,
		    					value:list[i].enquiryNightNum
		    				})
		    			}


		    			
		    		}

		                if (inquiry_two_chart) {
		                    inquiry_two_chart.clear()
		                    inquiry_two_chart = null
		                }

			      	    this.$nextTick(()=>{
			            	
			                inquiry_two_chart = echarts.init(document.getElementById('inquiry_two'));
			     
			    			inquiry_two_chart.setOption(this.inquiry_two_option)

			    		})
		      	}





      			

      			

      		} else {
              return this.$message({
                message:data.msg,
                type:'error'
              })
            }
        })
        .catch(()=>{
          this.$message({
            message:'接口报错',
            type:'error'
          })
        })

      },



      show_shop_summar_data(){

      	let shop = ''
      	let brand = ''

      	if(this.brand_search.shopId.length){
	        let shopId = this.brand_search.shopId[this.brand_search.shopId.length-1]
	        
	      	if(this.brand_search.shopId.length == 1){
	      		brand = shopId
	      		shop = ''
	      	}else {
	      		brand = ''
	      		shop = shopId
	      	}
      	}
      	


      	this.$http.post(`composeVisual/show_shop_summar_data`,{
			dimensionality: this.brand_search.brandtype,
			orderOrSales: this.brand_search.brand_choose,
			start: this.brand_search.brandDate[0].getTime().toString().substr(0,10),
			end: this.brand_search.brandDate[1].getTime().toString().substr(0,10),
			shopId: shop,
			brand: brand,
			orderOrSalesShop: this.brand_search.shop_choose,
			startTime: this.brand_search.shopDate[0].getTime().toString().substr(0,10),
			endTime: this.brand_search.shopDate[1].getTime().toString().substr(0,10),
			brandOrderOrSales: this.brand_search.proportion_choose,
			shopType: this.brand_search.shop_type.value,
			brandStart: this.brand_search.proportionDate[0].getTime().toString().substr(0,10),
			brandEnd: this.brand_search.proportionDate[1].getTime().toString().substr(0,10),

      	})

      	.then((data)=>{
      		if(data.code == '200'){

	      				let brands = [
		      				{brandId:'',brandName:''},
		      				{brandId:1,brandName:'菲碧'},
		      				{brandId:2,brandName:'初彤'},
		      				{brandId:3,brandName:'形色'}
	      				]
	      				let parameter = ''
	      				let totalname = ''
	      				if(this.brand_search.brand_choose == 1){
	      					parameter = 'payQty'
	      					
	      				}else if(this.brand_search.brand_choose == 2){
	      					parameter = 'enquiryNum'
	      					
	      				}else {
	      					parameter = 'rate'
	      					
	      				}
      			//品牌对比

      			this.brand_outline_option.legend.data = []
      			this.brand_outline_option.xAxis[0].data = []
      			this.brand_outline_option.series = []
      			this.brand_comparison_table = []

      			if(data.data.composeTeamContrastVOList && data.data.composeTeamContrastVOList.length){



	  				let days = Number((((this.brand_search.brandDate[1].getTime() - this.brand_search.brandDate[0].getTime())/(24 * 3600 * 1000)) +1).toFixed())


	  				let year = this.brand_search.brandDate[0].getFullYear()

		    		let month = this.brand_search.brandDate[0].getMonth()

		    		let day = this.brand_search.brandDate[0].getDate()

			        let startdate = new Date(year,month,day,0,0,0).getTime()/1000



	  				for(let i=0;i<days;i++){


	  					let date = new Date(this.brand_search.brandDate[0].getTime() + 24 * 3600 * 1000 * i)
			      		let m = "0" + (date.getMonth() + 1)
			      		let d = "0" + (date.getDate())
			      		
	  					this.brand_outline_option.xAxis[0].data.push(m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length))
	  				}


	      			if(this.brand_search.brandtype == 1 || (this.brand_search.brandtype == 2 && this.brand_search.brand_choose == 1)){









	      				let list =[]

	      				for(let i=0;i<data.data.composeTeamContrastVOList.length;i++){

	      					list[i] = []

	      					for(let k=0;k<brands.length;k++){

	      						list[i][k] = {}
	      						list[i][k].brandId = brands[k].brandId
	      						list[i][k].brandName = brands[k].brandName
	      						list[i][k].data = ''
	      						list[i][k][parameter] = 0

	      					}

	      					for(let k=0;k<brands.length;k++){
	      						if(list[i][k].brandId == ''){
	      							if(this.brand_search.brand_choose == 1){
	      								list[i][k].brandName = '总销量'
	      								list[i][k][parameter] = data.data.composeTeamContrastVOList[i].payQtyTotal
	      								list[i][k].data = data.data.composeTeamContrastVOList[i].data
	      							}else if(this.brand_search.brand_choose == 2){
	      								list[i][k].brandName = '总询单'
	      								list[i][k][parameter] = data.data.composeTeamContrastVOList[i].enquiryNumTotal
	      								list[i][k].data = data.data.composeTeamContrastVOList[i].data
	      							}else {
	      								list[i][k].brandName = '总转化率'
	      								list[i][k][parameter] = data.data.composeTeamContrastVOList[i].rate
	      								list[i][k].data = data.data.composeTeamContrastVOList[i].data	
	      							}
	      						}else {
	      							for(let j=0;j<data.data.composeTeamContrastVOList[i].list.length;j++){
	      								if(list[i][k].brandId == data.data.composeTeamContrastVOList[i].list[j].brandId){
	      									list[i][k].data = data.data.composeTeamContrastVOList[i].list[j].data
	      									list[i][k][parameter] = data.data.composeTeamContrastVOList[i].list[j][parameter]
	      									break
	      								}
	      							}
	      						}
	      					}

	      					

	      				}

	      				let arr = []

	      				for(let i=0;i<list.length;i++) {
	      					//arr[i].date = []
	      					arr[i] = {}

	      					
	      					for(let j=0;j<list[i].length;j++) {
	      						arr[i].date = list[i][0].data
	      						if(list[i][j].brandId == 1){
	      							arr[i].fb = list[i][j][parameter]
	      						}else if(list[i][j].brandId == 2) {
	      							arr[i].ct = list[i][j][parameter]
	      						}else if(list[i][j].brandId == 3) {
	      							arr[i].xs = list[i][j][parameter]
	      						}else {
	      							arr[i].total = list[i][j][parameter]
	      						}
	      					}
	      				}
	      				this.brand_comparison_table = arr



	      				for(let i=0;i<list[0].length;i++){
	      					this.brand_outline_option.legend.data.push(list[0][i].brandName)

	      				}


	      				if(this.brand_search.brandtype == 1){
	      					

	      					for(let i=0;i<list[0].length;i++){
		      					this.brand_outline_option.series.push({
						            name:list[0][i].brandName,
						            type:'line',
						            barGap: 0,
						            data:new Array(days).fill(0),
						           //  itemStyle:{
						        	  // color:'#ff9933',
						           //  }
		      					})
	      					}



	      				}else {
			      				this.brand_outline_option.series.push({
						            name:list[0][0].brandName,
						            type:'line',
						            barGap: 0,
						            data:new Array(days).fill(0),
						            itemStyle:{
						        	  color:'#ff9933',
						            }
						        },
						        {
						            name:list[0][1].brandName,
						            type:'bar',
						            //yAxisIndex: 1,
						            itemStyle:{
						        	  color:'#5793f3',
						            },
						            data:new Array(days).fill(0),

						        },
						        {
						            name:list[0][2].brandName,
						            type:'bar',
						            //yAxisIndex: 2,#ff9933
						            itemStyle:{
						        	  color:'#5793f3',
						            },
						            data:new Array(days).fill(0)
						        },
						        {
						            name:list[0][3].brandName,
						            type:'bar',
						            //yAxisIndex: 2,#ff9933
						            itemStyle:{
						        	  color:'#5793f3',
						            },
						            data:new Array(days).fill(0)
						        })
	      				}

	      				

	      				
	      				for(let i=0;i<list.length;i++){

	      					let cha = (list[i][0].data - startdate)/24/3600

	      					for(let j=0;j<list[i].length;j++){
	      						this.brand_outline_option.series[j].data[cha] = list[i][j][parameter]
	      					}

	      				}




	      			} else if(this.brand_search.brandtype == 2 && this.brand_search.brand_choose == 2){

		      				let classname = [{
		      					name:'总询单',
		      					value:'enquiryNumTotal'
		      				},{
		      					name:'早班人均询单',
		      					value:'enquiryDayAvg'
		      				},{
		      					name:'晚班人均询单',
		      					value:'enquiryNightAvg'
		      				}]


		      				for(let i=0;i<classname.length;i++){
		      					this.brand_outline_option.legend.data.push(classname[i].name)
		      				}



		  				
		      				this.brand_outline_option.series.push({
					            name:classname[0].name,
					            type:'line',
					            barGap: 0,
					            data:new Array(days).fill(0),
					            itemStyle:{
					        	  color:'#ff9933',
					            },
					        },
					        {
					            name:classname[1].name,
					            type:'bar',
					            //yAxisIndex: 1,
					            itemStyle:{
					        	  color:'#5793f3',
					            },
					            data:new Array(days).fill(0),

					        },
					        {
					            name:classname[2].name,
					            type:'bar',
					            //yAxisIndex: 2,#ff9933
					            itemStyle:{
					        	  color:'#5793f3',
					            },
					            data:new Array(days).fill(0)
					        })

		      				

		      				for(let i=0;i<data.data.composeTeamContrastVOList.length;i++){

		      					let cha = (data.data.composeTeamContrastVOList[i].data - startdate)/3600/24

		      					this.brand_outline_option.series[0].data[cha] = data.data.composeTeamContrastVOList[i].enquiryNumTotal

		      					this.brand_outline_option.series[1].data[cha] = data.data.composeTeamContrastVOList[i].enquiryDayAvg

		      					this.brand_outline_option.series[2].data[cha] = data.data.composeTeamContrastVOList[i].enquiryNightAvg
		      					
		      				}

		      				//console.info(this.brand_outline_option)


	      			}else {
	      				this.brand_outline_option.legend.data.push('转化率')

		      		    this.brand_outline_option.series.push({
				            name:'转化率',
				            type:'line',
				            barGap: 0,
				            data:new Array(days).fill(0),
				            itemStyle:{
				        	  color:'#ff9933',
				            },
				        })

				        for(let i=0;i<data.data.composeTeamContrastVOList.length;i++){

				        	let cha = (data.data.composeTeamContrastVOList[i].data - startdate)/3600/24

				        	this.brand_outline_option.series[0].data[cha] = data.data.composeTeamContrastVOList[i].rate
				        }


	      			}
      			}






                if (brand_comparison_chart) {
                    brand_comparison_chart.clear()
                    brand_comparison_chart = null
                }

	      	    this.$nextTick(()=>{


	                brand_comparison_chart = echarts.init(document.getElementById('brand_comparison'));
	     
	    			brand_comparison_chart.setOption(this.brand_outline_option)


	    		})



	    		//店铺明细

		      	this.shop_detail_option.legend.data = []
		        this.shop_detail_option.series = []
		        this.shop_detail_option.xAxis[0].data = []


	    		if(data.data.shopDetailVOList && data.data.shopDetailVOList.length){

	  				let days = Number((((this.brand_search.shopDate[1].getTime() - this.brand_search.shopDate[0].getTime())/(24 * 3600 * 1000)) + 1).toFixed())

	  				let year = this.brand_search.shopDate[0].getFullYear()

		    		let month = this.brand_search.shopDate[0].getMonth()

		    		let day = this.brand_search.shopDate[0].getDate()

			        let startdate = new Date(year,month,day,0,0,0).getTime()/1000


	  				for(let i=0;i<days;i++){


	  					let date = new Date(this.brand_search.shopDate[0].getTime() + 24 * 3600 * 1000 * i)
			      		let m = "0" + (date.getMonth() + 1)
			      		let d = "0" + (date.getDate())
			      		
	  					this.shop_detail_option.xAxis[0].data.push(m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length))
	  				}

	    			if(this.brand_search.shop_choose == 2){

	    				let legendlist = ['日询单','早班人均询单','晚班人均询单']

	    				for(let i=0;i<legendlist.length;i++){
	    					this.shop_detail_option.legend.data.push(legendlist[i])
	    				}




	    				this.shop_detail_option.series.push({
					            name:legendlist[0],
					            type:'line',
					            barGap: 0,
					            data:new Array(days).fill(0),
					            itemStyle:{
					        	  color:'#ff9933',
					            },
					        },
					        {
					            name:legendlist[1],
					            type:'bar',
					            //yAxisIndex: 1,
					            itemStyle:{
					        	  color:'#5793f3',
					            },
					            data:new Array(days).fill(0),

					        },
					        {
					            name:legendlist[2],
					            type:'bar',
					            //yAxisIndex: 2,#ff9933
					            itemStyle:{
					        	  color:'#5793f3',
					            },
					            data:new Array(days).fill(0)
					        })

	    				for(let i=0;i<data.data.shopDetailVOList.length;i++){

	    					let cha = (data.data.shopDetailVOList[i].data - startdate)/(24 * 3600)

	    					this.shop_detail_option.series[0].data[cha] = data.data.shopDetailVOList[i].enquiry

	    					this.shop_detail_option.series[1].data[cha] = data.data.shopDetailVOList[i].enquiryDayAvg

	    					this.shop_detail_option.series[2].data[cha] = data.data.shopDetailVOList[i].enquiryNightAvg

	    				}

	    			}else {

	    				let parameter = ''
	    				let name = ''

	    				if(this.brand_search.shop_choose == 1){

	    					parameter = 'payQty'
	    					name = '销量'

	    				}else {
	    					parameter = 'rate'
	    					name = '转化率'

	    				}

	    				this.shop_detail_option.legend.data.push(name)

	    				this.shop_detail_option.series.push({
					            name:name,
					            type:'line',
					            barGap: 0,
					            data:new Array(days).fill(0),
					            itemStyle:{
					        	  color:'#ff9933',
					            },
					        })

	    				for(let i=0;i<data.data.shopDetailVOList.length;i++){

	    					let cha = (data.data.shopDetailVOList[i].data - startdate)/(24 * 3600)

	    					this.shop_detail_option.series[0].data[cha] = data.data.shopDetailVOList[i][parameter]
	    				}



	    			}



	    		}

	  			if (shop_detail_chart) {
	                shop_detail_chart.clear()
	                shop_detail_chart = null
	            }
	            //console.info(this.shop_detail_option)
	       

	            this.$nextTick(()=>{
	                shop_detail_chart = echarts.init(document.getElementById('shop_detail'));
	      			//other_wrap_chart = echarts.init(document.getElementById('other_wrap'))
	    			shop_detail_chart.setOption(this.shop_detail_option)
				})





	    		//数据统计

	    		this.brand_data = []
	    		this.brand_circle_option.legend.data = []
	    		this.brand_circle_option.series[0].data = []

	    		if(data.data.composeSummarVO && data.data.composeSummarVO.list.length){

	    			let arr = []


	    			for (let i=0;i<brands.length;i++){

	    				arr[i] = {}
	    				arr[i].brandId = brands[i].brandId
	    				arr[i].brandName = brands[i].brandName
	    				arr[i].payQty = 0
	    				arr[i].enquiryNum = 0
	    				arr[i].percent = 0
	    			}

	    			for(let i=0;i<arr.length;i++){

	    				if(arr[i].brandId == ''){
		    				arr[i].payQty = data.data.composeSummarVO.payQty
		    				arr[i].enquiryNum = data.data.composeSummarVO.enquiryNum
		    				arr[i].percent = data.data.composeSummarVO.percent
	    				}
	    				for(let j=0;j<data.data.composeSummarVO.list.length;j++){
	    					if(arr[i].brandId == data.data.composeSummarVO.list[j].brandId){
			    				arr[i].payQty = data.data.composeSummarVO.list[j].payQty
			    				arr[i].enquiryNum = data.data.composeSummarVO.list[j].enquiryNum
			    				arr[i].percent = data.data.composeSummarVO.list[j].percent
			    				break
	    					}
	    				}

	    			}

	    			this.brand_data = arr

	    			for(let i=1;i<this.brand_data.length;i++){

	    				this.brand_circle_option.legend.data.push(this.brand_data[i].brandName)



	    				//this.brand_circle_option.series[0].data.push({name:this.brand_data[i].brandName,value:this.brand_data[i][parameter]})

		    			if( this.brand_search.brand_choose == 1){
		    				
		    				this.brand_circle_option.series[0].data.push({value:this.brand_data[i].payQty, name:this.brand_data[i].brandName})
		    			}else{
		    				
		    				this.brand_circle_option.series[0].data.push({value:this.brand_data[i].enquiryNum, name:this.brand_data[i].brandName})
		    			}

	    			}
	    		}



                if (brand_circle_chart) {
                    brand_circle_chart.clear()
                    brand_circle_chart = null
                }

	      	    this.$nextTick(()=>{


	                brand_circle_chart = echarts.init(document.getElementById('brand_circle'));
	     
	    			brand_circle_chart.setOption(this.brand_circle_option)


	    		})




	    		//品牌占比


	    		//this.circle_five_option.legend.data = []
	    		this.circle_five_option.series[0].data = [0,0,0]

	    		if(data.data.brandRateVOListByTotal && data.data.brandRateVOListByTotal.length){


	    			let parameter = ''

	    			if(this.brand_search.proportion_choose == 1){
	    				parameter = 'payQty'
	    			}else {
	    				parameter = 'enquiryNumTotal'
	    			}


	    			for(let i=0;i<data.data.brandRateVOListByTotal.length;i++){

	    				if(data.data.brandRateVOListByTotal[i].brandId == 1){
	    					this.circle_five_option.series[0].data[0] = {value:data.data.brandRateVOListByTotal[i][parameter], name:data.data.brandRateVOListByTotal[i].brandName}
	    				}else if(data.data.brandRateVOListByTotal[i].brandId == 2){
	    					this.circle_five_option.series[0].data[1] = {value: data.data.brandRateVOListByTotal[i][parameter], name: data.data.brandRateVOListByTotal[i].brandName}
	    				}else{
	    					this.circle_five_option.series[0].data[2] = {value:data.data.brandRateVOListByTotal[i][parameter], name:data.data.brandRateVOListByTotal[i].brandName}
	    				}
	    			}
	    		}

                if (circle_five_chart) {
                    circle_five_chart.clear()
                    circle_five_chart = null
                }

	      	    this.$nextTick(()=>{


	                circle_five_chart = echarts.init(document.getElementById('circle_five'));
	     
	    			circle_five_chart.setOption(this.circle_five_option)


	    		})



	    		//品牌占比汇总


	    		this.circle_one_option.series[0].data = [0,0]

	    		if(data.data.brandRateVOList && data.data.brandRateVOList.length){
	    			let parameter = ''

	    			if(this.brand_search.proportion_choose == 1){
	    				parameter = 'payQty'
	    			}else {
	    				parameter = 'enquiryNum'
	    			}

	    			for(let i=0;i<data.data.brandRateVOList.length;i++){

	    				if(data.data.brandRateVOList[i].shopType == 2){
	    					this.circle_one_option.series[0].data[0] = {value:data.data.brandRateVOList[i][parameter], name:'天猫'}
	    				}else {
	    					this.circle_one_option.series[0].data[1] = {value:data.data.brandRateVOList[i][parameter], name:'C店'}
	    				}
	    			}


	    		}


                if (circle_one_chart) {
                    circle_one_chart.clear()
                    circle_one_chart = null
                }

	      	    this.$nextTick(()=>{


	                circle_one_chart = echarts.init(document.getElementById('circle_one'));
	     
	    			circle_one_chart.setOption(this.circle_one_option)


	    		})



	    		this.circle_two_option.series[0].data = [0,0]
	    		this.circle_three_option.series[0].data = [0,0]
	    		this.circle_four_option.series[0].data = [0,0]

	    		if(data.data.brandRateVOListByBrand && data.data.brandRateVOListByBrand.length){
	    			let parameter = ''

	    			if(this.brand_search.proportion_choose == 1){
	    				parameter = 'payQty'
	    			}else {
	    				parameter = 'enquiryNum'
	    			}

	    			for(let i=0;i<data.data.brandRateVOListByBrand.length;i++){

	    				// let brand_option = []

	    				// if(data.data.brandRateVOListByBrand[i].brandId == 1){

	    				// 	brand_option = ''

	    				// }else if(data.data.brandRateVOListByBrand[i].brandId == 2){
	    				// 	brand_option = 'this.circle_three_option.series[0].data'
	    				// }else {
	    				// 	brand_option = 'this.circle_four_option.series[0].data'
	    				// }
	    				if(data.data.brandRateVOListByBrand[i].brandId == 1){

		    				for(let j=0;j<data.data.brandRateVOListByBrand[i].list.length;j++){

		    					if(data.data.brandRateVOListByBrand[i].list[j].shopType == 2){
		    						this.circle_two_option.series[0].data[0] = {value:data.data.brandRateVOListByBrand[i].list[j][parameter],name:'天猫'}
		    					}else {
		    						this.circle_two_option.series[0].data[1] = {value:data.data.brandRateVOListByBrand[i].list[j][parameter],name:'C店'}
		    					}
		    				}
	    				}else if(data.data.brandRateVOListByBrand[i].brandId == 2){
		    				for(let j=0;j<data.data.brandRateVOListByBrand[i].list.length;j++){

		    					if(data.data.brandRateVOListByBrand[i].list[j].shopType == 2){
		    						this.circle_three_option.series[0].data[0] = {value:data.data.brandRateVOListByBrand[i].list[j][parameter],name:'天猫'}
		    					}else {
		    						this.circle_three_option.series[0].data[1] = {value:data.data.brandRateVOListByBrand[i].list[j][parameter],name:'C店'}
		    					}
		    				}
	    				} else {
		    				for(let j=0;j<data.data.brandRateVOListByBrand[i].list.length;j++){

		    					if(data.data.brandRateVOListByBrand[i].list[j].shopType == 2){
		    						this.circle_four_option.series[0].data[0] = {value:data.data.brandRateVOListByBrand[i].list[j][parameter],name:'天猫'}
		    					}else {
		    						this.circle_four_option.series[0].data[1] = {value:data.data.brandRateVOListByBrand[i].list[j][parameter],name:'C店'}
		    					}
		    				}
	    				}




	    			}


	    		}


                if (circle_two_chart) {
                    circle_two_chart.clear()
                    circle_two_chart = null
                }
                if (circle_three_chart) {
                    circle_three_chart.clear()
                    circle_three_chart = null
                }
                if (circle_four_chart) {
                    circle_four_chart.clear()
                    circle_four_chart = null
                }

	      	    this.$nextTick(()=>{


	                circle_two_chart = echarts.init(document.getElementById('circle_two'));
	     
	    			circle_two_chart.setOption(this.circle_two_option)

	                circle_three_chart = echarts.init(document.getElementById('circle_three'));
	     
	    			circle_three_chart.setOption(this.circle_three_option)


	                circle_four_chart = echarts.init(document.getElementById('circle_four'));
	     
	    			circle_four_chart.setOption(this.circle_four_option)

	    		})


	    		
	    		
      		}else {
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




	show_shop_summar_data_bytype(type){


      	let shop = ''
      	let brand = ''

      	if(this.brand_search.shopId.length){
	        let shopId = this.brand_search.shopId[this.brand_search.shopId.length-1]
	        
	      	if(this.brand_search.shopId.length == 1){
	      		brand = shopId
	      		shop = ''
	      	}else {
	      		brand = ''
	      		shop = shopId
	      	}
      	}
      	


      	this.$http.post(`composeVisual/show_shop_summar_data`,{
			dimensionality: this.brand_search.brandtype,
			orderOrSales: this.brand_search.brand_choose,
			start: this.brand_search.brandDate[0].getTime().toString().substr(0,10),
			end: this.brand_search.brandDate[1].getTime().toString().substr(0,10),
			shopId: shop,
			brand: brand,
			orderOrSalesShop: this.brand_search.shop_choose,
			startTime: this.brand_search.shopDate[0].getTime().toString().substr(0,10),
			endTime: this.brand_search.shopDate[1].getTime().toString().substr(0,10),
			brandOrderOrSales: this.brand_search.proportion_choose,
			shopType: this.brand_search.shop_type.value,
			brandStart: this.brand_search.proportionDate[0].getTime().toString().substr(0,10),
			brandEnd: this.brand_search.proportionDate[1].getTime().toString().substr(0,10),

      	})

      	.then((data)=>{
      		if(data.code == '200'){


	      				let brands = [
		      				{brandId:'',brandName:''},
		      				{brandId:1,brandName:'菲碧'},
		      				{brandId:2,brandName:'初彤'},
		      				{brandId:3,brandName:'形色'}
	      				]
	      				let parameter = ''
	      				let totalname = ''
	      				if(this.brand_search.brand_choose == 1){
	      					parameter = 'payQty'
	      					
	      				}else if(this.brand_search.brand_choose == 2){
	      					parameter = 'enquiryNum'
	      					
	      				}else {
	      					parameter = 'rate'
	      					
	      				}

	      				this.brand_comparison_table = []


  				if(type ===1) {


	      			//品牌对比

	      			this.brand_outline_option.legend.data = []
	      			this.brand_outline_option.xAxis[0].data = []
	      			this.brand_outline_option.series = []

	      			if(data.data.composeTeamContrastVOList && data.data.composeTeamContrastVOList.length){



		  				let days = Number((((this.brand_search.brandDate[1].getTime() - this.brand_search.brandDate[0].getTime())/(24 * 3600 * 1000)) +1).toFixed())


		  				let year = this.brand_search.brandDate[0].getFullYear()

			    		let month = this.brand_search.brandDate[0].getMonth()

			    		let day = this.brand_search.brandDate[0].getDate()

				        let startdate = new Date(year,month,day,0,0,0).getTime()/1000



		  				for(let i=0;i<days;i++){


		  					let date = new Date(this.brand_search.brandDate[0].getTime() + 24 * 3600 * 1000 * i)
				      		let m = "0" + (date.getMonth() + 1)
				      		let d = "0" + (date.getDate())
				      		
		  					this.brand_outline_option.xAxis[0].data.push(m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length))
		  				}


		      			if(this.brand_search.brandtype == 1 || (this.brand_search.brandtype == 2 && this.brand_search.brand_choose == 1)){









		      				let list =[]

		      				for(let i=0;i<data.data.composeTeamContrastVOList.length;i++){

		      					list[i] = []

		      					for(let k=0;k<brands.length;k++){

		      						list[i][k] = {}
		      						list[i][k].brandId = brands[k].brandId
		      						list[i][k].brandName = brands[k].brandName
		      						list[i][k].data = ''
		      						list[i][k][parameter] = 0

		      					}

		      					for(let k=0;k<brands.length;k++){
		      						if(list[i][k].brandId == ''){
		      							if(this.brand_search.brand_choose == 1){
		      								list[i][k].brandName = '总销量'
		      								list[i][k][parameter] = data.data.composeTeamContrastVOList[i].payQtyTotal
		      								list[i][k].data = data.data.composeTeamContrastVOList[i].data
		      							}else if(this.brand_search.brand_choose == 2){
		      								list[i][k].brandName = '总询单'
		      								list[i][k][parameter] = data.data.composeTeamContrastVOList[i].enquiryNumTotal
		      								list[i][k].data = data.data.composeTeamContrastVOList[i].data
		      							}else {
		      								list[i][k].brandName = '总转化率'
		      								list[i][k][parameter] = data.data.composeTeamContrastVOList[i].rate
		      								list[i][k].data = data.data.composeTeamContrastVOList[i].data	
		      							}
		      						}else {
		      							for(let j=0;j<data.data.composeTeamContrastVOList[i].list.length;j++){
		      								if(list[i][k].brandId == data.data.composeTeamContrastVOList[i].list[j].brandId){
		      									list[i][k].data = data.data.composeTeamContrastVOList[i].list[j].data
		      									list[i][k][parameter] = data.data.composeTeamContrastVOList[i].list[j][parameter]
		      									break
		      								}
		      							}
		      						}
		      					}

		      					

		      				}

		      				let arr = []

		      				for(let i=0;i<list.length;i++) {
		      					//arr[i].date = []
		      					arr[i] = {}

		      					
		      					for(let j=0;j<list[i].length;j++) {
		      						arr[i].date = list[i][0].data
		      						if(list[i][j].brandId == 1){
		      							arr[i].fb = list[i][j][parameter]
		      						}else if(list[i][j].brandId == 2) {
		      							arr[i].ct = list[i][j][parameter]
		      						}else if(list[i][j].brandId == 3) {
		      							arr[i].xs = list[i][j][parameter]
		      						}else {
		      							arr[i].total = list[i][j][parameter]
		      						}
		      					}
		      				}
		      				//console.log(arr)
		      				this.brand_comparison_table = arr


		      				for(let i=0;i<list[0].length;i++){
		      					this.brand_outline_option.legend.data.push(list[0][i].brandName)

		      				}


		      				if(this.brand_search.brandtype == 1){
		      					

		      					for(let i=0;i<list[0].length;i++){
			      					this.brand_outline_option.series.push({
							            name:list[0][i].brandName,
							            type:'line',
							            barGap: 0,
							            data:new Array(days).fill(0),
							           //  itemStyle:{
							        	  // color:'#ff9933',
							           //  }
			      					})
		      					}



		      				}else {
				      				this.brand_outline_option.series.push({
							            name:list[0][0].brandName,
							            type:'line',
							            barGap: 0,
							            data:new Array(days).fill(0),
							            itemStyle:{
							        	  color:'#ff9933',
							            }
							        },
							        {
							            name:list[0][1].brandName,
							            type:'bar',
							            //yAxisIndex: 1,
							            itemStyle:{
							        	  color:'#5793f3',
							            },
							            data:new Array(days).fill(0),

							        },
							        {
							            name:list[0][2].brandName,
							            type:'bar',
							            //yAxisIndex: 2,#ff9933
							            itemStyle:{
							        	  color:'#5793f3',
							            },
							            data:new Array(days).fill(0)
							        },
							        {
							            name:list[0][3].brandName,
							            type:'bar',
							            //yAxisIndex: 2,#ff9933
							            itemStyle:{
							        	  color:'#5793f3',
							            },
							            data:new Array(days).fill(0)
							        })
		      				}

		      				


		      				for(let i=0;i<list.length;i++){

		      					let cha = (list[i][0].data - startdate)/24/3600

		      					for(let j=0;j<list[i].length;j++){
		      						this.brand_outline_option.series[j].data[cha] = list[i][j][parameter]
		      					}

		      				}




		      			} else if(this.brand_search.brandtype == 2 && this.brand_search.brand_choose == 2){

			      				let classname = [{
			      					name:'总询单',
			      					value:'enquiryNumTotal'
			      				},{
			      					name:'早班人均询单',
			      					value:'enquiryDayAvg'
			      				},{
			      					name:'晚班人均询单',
			      					value:'enquiryNightAvg'
			      				}]


			      				for(let i=0;i<classname.length;i++){
			      					this.brand_outline_option.legend.data.push(classname[i].name)
			      				}



			  				
			      				this.brand_outline_option.series.push({
						            name:classname[0].name,
						            type:'line',
						            barGap: 0,
						            data:new Array(days).fill(0),
						            itemStyle:{
						        	  color:'#ff9933',
						            },
						        },
						        {
						            name:classname[1].name,
						            type:'bar',
						            //yAxisIndex: 1,
						            itemStyle:{
						        	  color:'#5793f3',
						            },
						            data:new Array(days).fill(0),

						        },
						        {
						            name:classname[2].name,
						            type:'bar',
						            //yAxisIndex: 2,#ff9933
						            itemStyle:{
						        	  color:'#5793f3',
						            },
						            data:new Array(days).fill(0)
						        })

			      				

			      				for(let i=0;i<data.data.composeTeamContrastVOList.length;i++){

			      					let cha = (data.data.composeTeamContrastVOList[i].data - startdate)/3600/24

			      					this.brand_outline_option.series[0].data[cha] = data.data.composeTeamContrastVOList[i].enquiryNumTotal

			      					this.brand_outline_option.series[1].data[cha] = data.data.composeTeamContrastVOList[i].enquiryDayAvg

			      					this.brand_outline_option.series[2].data[cha] = data.data.composeTeamContrastVOList[i].enquiryNightAvg
			      					
			      				}

			      				//console.info(this.brand_outline_option)


		      			}else {
		      				this.brand_outline_option.legend.data.push('转化率')

			      		    this.brand_outline_option.series.push({
					            name:'转化率',
					            type:'line',
					            barGap: 0,
					            data:new Array(days).fill(0),
					            itemStyle:{
					        	  color:'#ff9933',
					            },
					        })

					        for(let i=0;i<data.data.composeTeamContrastVOList.length;i++){

					        	let cha = (data.data.composeTeamContrastVOList[i].data - startdate)/3600/24

					        	this.brand_outline_option.series[0].data[cha] = data.data.composeTeamContrastVOList[i].rate
					        }


		      			}

	      			}





	                if (brand_comparison_chart) {
	                    brand_comparison_chart.clear()
	                    brand_comparison_chart = null
	                }

		      	    this.$nextTick(()=>{


		                brand_comparison_chart = echarts.init(document.getElementById('brand_comparison'));
		     
		    			brand_comparison_chart.setOption(this.brand_outline_option)


		    		})


		    		//数据统计

		    		this.brand_data = []
		    		this.brand_circle_option.legend.data = []
		    		this.brand_circle_option.series[0].data = []

		    		if(data.data.composeSummarVO && data.data.composeSummarVO.list.length){

		    			let arr = []


		    			for (let i=0;i<brands.length;i++){

		    				arr[i] = {}
		    				arr[i].brandId = brands[i].brandId
		    				arr[i].brandName = brands[i].brandName
		    				arr[i].payQty = 0
		    				arr[i].enquiryNum = 0
		    				arr[i].percent = 0
		    			}

		    			for(let i=0;i<arr.length;i++){

		    				if(arr[i].brandId == ''){
			    				arr[i].payQty = data.data.composeSummarVO.payQty
			    				arr[i].enquiryNum = data.data.composeSummarVO.enquiryNum
			    				arr[i].percent = data.data.composeSummarVO.percent
		    				}
		    				for(let j=0;j<data.data.composeSummarVO.list.length;j++){
		    					if(arr[i].brandId == data.data.composeSummarVO.list[j].brandId){
				    				arr[i].payQty = data.data.composeSummarVO.list[j].payQty
				    				arr[i].enquiryNum = data.data.composeSummarVO.list[j].enquiryNum
				    				arr[i].percent = data.data.composeSummarVO.list[j].percent
				    				break
		    					}
		    				}

		    			}

		    			this.brand_data = arr

		    			for(let i=1;i<this.brand_data.length;i++){

		    				this.brand_circle_option.legend.data.push(this.brand_data[i].brandName)



		    				//this.brand_circle_option.series[0].data.push({name:this.brand_data[i].brandName,value:this.brand_data[i][parameter]})

			    			if( this.brand_search.brand_choose == 1){
			    				
			    				this.brand_circle_option.series[0].data.push({value:this.brand_data[i].payQty, name:this.brand_data[i].brandName})
			    			}else{
			    				
			    				this.brand_circle_option.series[0].data.push({value:this.brand_data[i].enquiryNum, name:this.brand_data[i].brandName})
			    			}

		    			}
		    		}



	                if (brand_circle_chart) {
	                    brand_circle_chart.clear()
	                    brand_circle_chart = null
	                }

		      	    this.$nextTick(()=>{


		                brand_circle_chart = echarts.init(document.getElementById('brand_circle'));
		     
		    			brand_circle_chart.setOption(this.brand_circle_option)


		    		})


				} else if(type === 2) {

		    		//店铺明细

			      	this.shop_detail_option.legend.data = []
			        this.shop_detail_option.series = []
			        this.shop_detail_option.xAxis[0].data = []


		    		if(data.data.shopDetailVOList && data.data.shopDetailVOList.length){

		  				let days = Number((((this.brand_search.shopDate[1].getTime() - this.brand_search.shopDate[0].getTime())/(24 * 3600 * 1000)) + 1).toFixed())

		  				let year = this.brand_search.shopDate[0].getFullYear()

			    		let month = this.brand_search.shopDate[0].getMonth()

			    		let day = this.brand_search.shopDate[0].getDate()

				        let startdate = new Date(year,month,day,0,0,0).getTime()/1000


		  				for(let i=0;i<days;i++){


		  					let date = new Date(this.brand_search.shopDate[0].getTime() + 24 * 3600 * 1000 * i)
				      		let m = "0" + (date.getMonth() + 1)
				      		let d = "0" + (date.getDate())
				      		
		  					this.shop_detail_option.xAxis[0].data.push(m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length))
		  				}

		    			if(this.brand_search.shop_choose == 2){

		    				let legendlist = ['日询单','早班人均询单','晚班人均询单']

		    				for(let i=0;i<legendlist.length;i++){
		    					this.shop_detail_option.legend.data.push(legendlist[i])
		    				}




		    				this.shop_detail_option.series.push({
						            name:legendlist[0],
						            type:'line',
						            barGap: 0,
						            data:new Array(days).fill(0),
						            itemStyle:{
						        	  color:'#ff9933',
						            },
						        },
						        {
						            name:legendlist[1],
						            type:'bar',
						            //yAxisIndex: 1,
						            itemStyle:{
						        	  color:'#5793f3',
						            },
						            data:new Array(days).fill(0),

						        },
						        {
						            name:legendlist[2],
						            type:'bar',
						            //yAxisIndex: 2,#ff9933
						            itemStyle:{
						        	  color:'#5793f3',
						            },
						            data:new Array(days).fill(0)
						        })

		    				for(let i=0;i<data.data.shopDetailVOList.length;i++){

		    					let cha = (data.data.shopDetailVOList[i].data - startdate)/(24 * 3600)

		    					this.shop_detail_option.series[0].data[cha] = data.data.shopDetailVOList[i].enquiry

		    					this.shop_detail_option.series[1].data[cha] = data.data.shopDetailVOList[i].enquiryDayAvg

		    					this.shop_detail_option.series[2].data[cha] = data.data.shopDetailVOList[i].enquiryNightAvg

		    				}

		    			}else {

		    				let parameter = ''
		    				let name = ''

		    				if(this.brand_search.shop_choose == 1){

		    					parameter = 'payQty'
		    					name = '销量'

		    				}else {
		    					parameter = 'rate'
		    					name = '转化率'

		    				}

		    				this.shop_detail_option.legend.data.push(name)

		    				this.shop_detail_option.series.push({
						            name:name,
						            type:'line',
						            barGap: 0,
						            data:new Array(days).fill(0),
						            itemStyle:{
						        	  color:'#ff9933',
						            },
						        })

		    				for(let i=0;i<data.data.shopDetailVOList.length;i++){

		    					let cha = (data.data.shopDetailVOList[i].data - startdate)/(24 * 3600)

		    					this.shop_detail_option.series[0].data[cha] = data.data.shopDetailVOList[i][parameter]
		    				}



		    			}



		    		}

		  			if (shop_detail_chart) {
		                shop_detail_chart.clear()
		                shop_detail_chart = null
		            }
		            //console.info(this.shop_detail_option)
		       

		            this.$nextTick(()=>{
		                shop_detail_chart = echarts.init(document.getElementById('shop_detail'));
		      			//other_wrap_chart = echarts.init(document.getElementById('other_wrap'))
		    			shop_detail_chart.setOption(this.shop_detail_option)
					})



		        } else {



		    		//品牌占比


		    		//this.circle_five_option.legend.data = []
		    		this.circle_five_option.series[0].data = [0,0,0]

		    		if(data.data.brandRateVOListByTotal && data.data.brandRateVOListByTotal.length){


		    			let parameter = ''

		    			if(this.brand_search.proportion_choose == 1){
		    				parameter = 'payQty'
		    			}else {
		    				parameter = 'enquiryNumTotal'
		    			}


		    			for(let i=0;i<data.data.brandRateVOListByTotal.length;i++){

		    				if(data.data.brandRateVOListByTotal[i].brandId == 1){
		    					this.circle_five_option.series[0].data[0] = {value:data.data.brandRateVOListByTotal[i][parameter], name:data.data.brandRateVOListByTotal[i].brandName}
		    				}else if(data.data.brandRateVOListByTotal[i].brandId == 2){
		    					this.circle_five_option.series[0].data[1] = {value: data.data.brandRateVOListByTotal[i][parameter], name: data.data.brandRateVOListByTotal[i].brandName}
		    				}else{
		    					this.circle_five_option.series[0].data[2] = {value:data.data.brandRateVOListByTotal[i][parameter], name:data.data.brandRateVOListByTotal[i].brandName}
		    				}
		    			}
		    		}

	                if (circle_five_chart) {
	                    circle_five_chart.clear()
	                    circle_five_chart = null
	                }

		      	    this.$nextTick(()=>{


		                circle_five_chart = echarts.init(document.getElementById('circle_five'));
		     
		    			circle_five_chart.setOption(this.circle_five_option)


		    		})



		    		//品牌占比汇总


		    		this.circle_one_option.series[0].data = [0,0]

		    		if(data.data.brandRateVOList && data.data.brandRateVOList.length){
		    			let parameter = ''

		    			if(this.brand_search.proportion_choose == 1){
		    				parameter = 'payQty'
		    			}else {
		    				parameter = 'enquiryNum'
		    			}

		    			for(let i=0;i<data.data.brandRateVOList.length;i++){

		    				if(data.data.brandRateVOList[i].shopType == 2){
		    					this.circle_one_option.series[0].data[0] = {value:data.data.brandRateVOList[i][parameter], name:'天猫'}
		    				}else {
		    					this.circle_one_option.series[0].data[1] = {value:data.data.brandRateVOList[i][parameter], name:'C店'}
		    				}
		    			}


		    		}


	                if (circle_one_chart) {
	                    circle_one_chart.clear()
	                    circle_one_chart = null
	                }

		      	    this.$nextTick(()=>{


		                circle_one_chart = echarts.init(document.getElementById('circle_one'));
		     
		    			circle_one_chart.setOption(this.circle_one_option)


		    		})



		    		this.circle_two_option.series[0].data = [0,0]
		    		this.circle_three_option.series[0].data = [0,0]
		    		this.circle_four_option.series[0].data = [0,0]

		    		if(data.data.brandRateVOListByBrand && data.data.brandRateVOListByBrand.length){
		    			let parameter = ''

		    			if(this.brand_search.proportion_choose == 1){
		    				parameter = 'payQty'
		    			}else {
		    				parameter = 'enquiryNum'
		    			}

		    			for(let i=0;i<data.data.brandRateVOListByBrand.length;i++){

		    				// let brand_option = []

		    				// if(data.data.brandRateVOListByBrand[i].brandId == 1){

		    				// 	brand_option = ''

		    				// }else if(data.data.brandRateVOListByBrand[i].brandId == 2){
		    				// 	brand_option = 'this.circle_three_option.series[0].data'
		    				// }else {
		    				// 	brand_option = 'this.circle_four_option.series[0].data'
		    				// }
		    				if(data.data.brandRateVOListByBrand[i].brandId == 1){

			    				for(let j=0;j<data.data.brandRateVOListByBrand[i].list.length;j++){

			    					if(data.data.brandRateVOListByBrand[i].list[j].shopType == 2){
			    						this.circle_two_option.series[0].data[0] = {value:data.data.brandRateVOListByBrand[i].list[j][parameter],name:'天猫'}
			    					}else {
			    						this.circle_two_option.series[0].data[1] = {value:data.data.brandRateVOListByBrand[i].list[j][parameter],name:'C店'}
			    					}
			    				}
		    				}else if(data.data.brandRateVOListByBrand[i].brandId == 2){
			    				for(let j=0;j<data.data.brandRateVOListByBrand[i].list.length;j++){

			    					if(data.data.brandRateVOListByBrand[i].list[j].shopType == 2){
			    						this.circle_three_option.series[0].data[0] = {value:data.data.brandRateVOListByBrand[i].list[j][parameter],name:'天猫'}
			    					}else {
			    						this.circle_three_option.series[0].data[1] = {value:data.data.brandRateVOListByBrand[i].list[j][parameter],name:'C店'}
			    					}
			    				}
		    				} else {
			    				for(let j=0;j<data.data.brandRateVOListByBrand[i].list.length;j++){

			    					if(data.data.brandRateVOListByBrand[i].list[j].shopType == 2){
			    						this.circle_four_option.series[0].data[0] = {value:data.data.brandRateVOListByBrand[i].list[j][parameter],name:'天猫'}
			    					}else {
			    						this.circle_four_option.series[0].data[1] = {value:data.data.brandRateVOListByBrand[i].list[j][parameter],name:'C店'}
			    					}
			    				}
		    				}




		    			}
		    			//console.info(this.circle_two_option)


		    		}


	                if (circle_two_chart) {
	                    circle_two_chart.clear()
	                    circle_two_chart = null
	                }
	                if (circle_three_chart) {
	                    circle_three_chart.clear()
	                    circle_three_chart = null
	                }
	                if (circle_four_chart) {
	                    circle_four_chart.clear()
	                    circle_four_chart = null
	                }

		      	    this.$nextTick(()=>{


		                circle_two_chart = echarts.init(document.getElementById('circle_two'));
		     
		    			circle_two_chart.setOption(this.circle_two_option)

		                circle_three_chart = echarts.init(document.getElementById('circle_three'));
		     
		    			circle_three_chart.setOption(this.circle_three_option)


		                circle_four_chart = echarts.init(document.getElementById('circle_four'));
		     
		    			circle_four_chart.setOption(this.circle_four_option)

		    		})
		      	}


	    		
	    		
      		}else {
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





    },
  }
</script>
<style lang="less">

.yj_cm_dataview{
	.el-input__inner{
		background-color:#182348 !important;
		border:none !important;
		color:#a5a9b5 !important;
		padding-right:0px !important;

    }
    .el-range-input {
		background-color:#182348 !important;
		color:#a5a9b5 !important;

    }  
    .el-range-separator{
    	color: #a5a9b5 !important;
    	width: 20% !important;

    }

    .el-select-dropdown{
    	background-color:#182348 !important;
    }

    .search_class .el-input__inner{
		background-color:rgb(21, 29, 61) !important;
		border:none !important;
		color:#7985e2 !important;
		padding-right:0px !important;
    }




}


</style>



<style scoped lang="less">

.yj_cm_dataview {

    font-size:14px; 
    position: relative;
    width: 100%;
    min-width: 1100px;
    color:#949494;

    //display: flex;
    //flex-wrap: wrap;

    .table_height{
    	height: 20px;
    	//border-left: 2px solid rgb(84, 127, 212);
    }

    .cur_hori{
    	width: 30px;
    	height: 3px;
    	background-color: rgb(89, 134, 223);
        position: absolute;
    }

    .cur_veri{
    	height: 30px;
    	width: 3px;
    	background-color: rgb(89, 134, 223);
        position: absolute;
    }

    .left_top{
    	top:-3px;
    	left: -3px;
    }

    .left_bottom{
		bottom:-3px;
		left: -3px;
    }

    .right_top{
    	top: -3px;
    	right: -3px;
    }

    .right_bottom{
    	bottom: -3px;
    	right: -3px;
    }

	.btnchoose{
		color: rgb(37, 137, 227) !important;
	}

	 .warp{
		display: flex;
		margin-top: 20px;
		height: calc(100vh - 170px);

        &_content{
        	padding:20px 10px 10px 10px;
        	height: calc(100% - 80px);
        	//background-color:red;
        }

        .circle_class{
        	display: flex;
        	padding: 20px 10px;

        	.circle_warp{
        		width: 35%;
        		//background-color:red;
        		p{
        			text-align: center;
        			font-size: 12px;
        			margin-top: 5px;
        		}
        		

        		.circle_div{

        			height: 46%;
        			width: 100%;
        			
        		}
        		.icon_class{
        			margin-right: 10px;
        			cursor: pointer;
        			font-size: 12px;
        		}
        	}


        	.left_warp{
        		width: 30%;
        		display: flex;
        		flex-direction: column;
        		justify-content:space-between;

        		&_top{
        			height: 34%;
        			//background-color:blue;
        			padding-left: 20px;
        			color: #fff;
        			font-weight: 560;
        			line-height: 1.8;
        		}


        	}


        }








		//background-color:red;





	    .top_div{

	    	height: 40px;
	    	line-height: 40px;
	    	padding: 0 20px;
	    	position:relative;

	        .title{
		    	font-size: 20px;
		    	color: #fff;
		    }

		    .p_btn{
		    	display: inline-block;
		    	position:absolute;
		    	right: 20px;
		    	color:#a5a9b5;

		    	.input_class{
		    		width: 100px;
		    		background-color:#182348 !important;
		    	}
		    }
	    }


	    &_left{
	    	width: 65%;
	    	//background-color:#182348;
	    	display: flex;
	    	flex-direction:column;
	    	justify-content:space-between;

	    	&_top{
	    		height: 49%;
	    		background-color:#182348;
	    		position:relative;
	    		
	    	}

	    	&_bottom{
	    		margin-top: 20px;
	    		height: 49%;
	    		background-color:#182348;
	    		position:relative;
	    	}
	    }

	    &_right{
	    	width: 35%;
	    	min-width: 500px;
	    	margin-left: 20px;
	    	//background-color:#0d1738;
	    }




























  }
  
}
  
</style>
