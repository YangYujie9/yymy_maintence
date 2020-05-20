<template>
	<div class="hy_setting">

		<div class="hy_setting_top">
		    	<img src="../../../assets/hy_title2.png" style="width: 600px;">	    	
		</div>
		<div class="hy_setting_warp">
			<div class="hym_dataview">
				<div class="hym_dataview_left">
					<div class="hym_dataview_left_top">
						<p class="title" style="display: inline-block;">下单数据</p>
						<p class="search_p">
							<span>月份：</span>
			                <el-date-picker
			                  v-model="search.ordermonth"
			                  size="mini" class="input_class" 
			                  type="month"
			                  :clearable='false'
			                  placeholder="录入日期"
			                  @change="change_data">
			                </el-date-picker>
						</p>	
					</div>

					<div class="hym_dataview_left_body">
						<div class="top_wrap content_wrap">
							<div class="introd">
								<p class="title">五日数据</p>
							</div>
							<div class="depart_one">

								<p class="top_search search_p">
									<span style="font-family:'微软雅黑';font-size: 1rem;font-weight:1000;color: #fdfe80;">生产一部</span>
								</p>
								<p class="top_search search_p">									
									<el-select v-model="search.day_type1" style="top:20px;width: 110px;" :header-cell-style='{"text-align": "center",}' popper-class= "yyj_input" size="mini">
										<el-option v-for="item in supply_list1"
										 :key="item.value"
										 :value="item.value"
										 :label="item.label">	
										</el-option>
									</el-select>
									
								</p>
								<span class="cur_hori left_top"></span>
								<span class="cur_veri left_top"></span>

								<span class="cur_hori left_bottom"></span>
								<span class="cur_veri left_bottom"></span>

								<span class="cur_hori right_top"></span>
								<span class="cur_veri right_top"></span>

								<span class="cur_hori right_bottom"></span>
								<span class="cur_veri right_bottom"></span>

								<div class="data_wrap">
									<div>
										<p class="title_p">日均首单下单款</p>
										<p class="data_p">{{group_five1.firstOrder5}}</p>
									</div>
								</div>
								<div class="data_wrap2">
									<div>
										<p class="title_p">平均首单下单量</p>
										<p class="data_p">{{group_five1.firstOrderNum5}}</p>
									</div>
								</div>

							</div>
							<div class="depart_one">
								<p class="top_search search_p">
									<span style="font-size: 1rem;font-weight: 1000;color: #fdfe80">生产二部</span>
								</p>
								<p class="top_search search_p">		
									<el-select v-model="search.day_type2" style="top: 20px;width: 110px;" clearable popper-class= "yyj_input" size="mini">
										<el-option v-for="item in supply_list2"
										 :key="item.value"
										 :value="item.value"
										 :label="item.label">	
										</el-option>
									</el-select>
								</p>
								<span class="cur_hori left_top"></span>
								<span class="cur_veri left_top"></span>

								<span class="cur_hori left_bottom"></span>
								<span class="cur_veri left_bottom"></span>

								<span class="cur_hori right_top"></span>
								<span class="cur_veri right_top"></span>

								<span class="cur_hori right_bottom"></span>
								<span class="cur_veri right_bottom"></span>

								<div class="data_wrap">
									<div>
										<p class="title_p">日均首单下单款</p>
										<p class="data_p">{{group_five2.firstOrder5}}</p>
									</div>
								</div>
								<div class="data_wrap2">
									<div>
										<p class="title_p">平均首单下单量</p>
										<p class="data_p">{{group_five2.firstOrderNum5}}</p>
									</div>
								</div>
							</div>
							<div class="depart_one">
								<p class="top_search search_p">
									<span style="font-size: 1rem;font-weight: 1000;color: #fdfe80">生产三部</span>
								</p>
								<p class="top_search search_p">	
									<el-select v-model="search.day_type3" style="top: 20px;width: 110px;" clearable popper-class= "yyj_input" size="mini">
										<el-option v-for="item in supply_list3"
										 :key="item.value"
										 :value="item.value"
										 :label="item.label">	
										</el-option>
									</el-select>
								</p>
								<span class="cur_hori left_top"></span>
								<span class="cur_veri left_top"></span>

								<span class="cur_hori left_bottom"></span>
								<span class="cur_veri left_bottom"></span>

								<span class="cur_hori right_top"></span>
								<span class="cur_veri right_top"></span>

								<span class="cur_hori right_bottom"></span>
								<span class="cur_veri right_bottom"></span>

								<div class="data_wrap">
									<div>
										<p class="title_p">日均首单下单款</p>
										<p class="data_p">{{group_five3.firstOrder5}}</p>
									</div>
								</div>
								<div class="data_wrap2">
									<div>
										<p class="title_p">平均首单下单量</p>
										<p class="data_p">{{group_five3.firstOrderNum5}}</p>
									</div>
								</div>
							</div>
							<div class="depart_one">
								<p class="top_search search_p">
									<span style="font-size: 1rem;font-weight: 1000;color: #fdfe80">生产四部</span>
									</p>
								<p class="top_search search_p">		
									<el-select v-model="search.day_type4" style="top: 20px;width: 110px;" clearable popper-class= "yyj_input" size="mini">
										<el-option v-for="item in supply_list4"
										 :key="item.value"
										 :value="item.value"
										 :label="item.label">	
										</el-option>
									</el-select>
								</p>
								<span class="cur_hori left_top"></span>
								<span class="cur_veri left_top"></span>

								<span class="cur_hori left_bottom"></span>
								<span class="cur_veri left_bottom"></span>

								<span class="cur_hori right_top"></span>
								<span class="cur_veri right_top"></span>

								<span class="cur_hori right_bottom"></span>
								<span class="cur_veri right_bottom"></span>

								<div class="data_wrap">
									<div>
										<p class="title_p">日均首单下单款</p>
										<p class="data_p">{{group_five4.firstOrder5}}</p>
									</div>
								</div>
								<div class="data_wrap2">
									<div>
										<p class="title_p">平均首单下单量</p>
										<p class="data_p">{{group_five4.firstOrderNum5}}</p>
									</div>
								</div>
							</div>
						</div>
						<div class="bottom_wrap content_wrap">
							<div class="introd">
								<p class="title">月度数据</p>
							</div>
							<div style="text-align: center;" class="depart_one">
								<span class="cur_hori left_top"></span>
								<span class="cur_veri left_top"></span>

								<span class="cur_hori left_bottom"></span>
								<span class="cur_veri left_bottom"></span>

								<span class="cur_hori right_top"></span>
								<span class="cur_veri right_top"></span>

								<span class="cur_hori right_bottom"></span>
								<span class="cur_veri right_bottom"></span>
								<div style="margin-bottom: 5px;">
									<canvas id="demo1-1" style="width: 70px;height: 70px;"></canvas>
								</div>

								<div style="margin-bottom: 5px;">
									<canvas id="demo1-2" style="width: 70px;height: 70px;"></canvas>
								</div>
								<div style="margin-bottom: 5px;">
									<canvas id="demo1-3" style="width: 70px;height: 70px;"></canvas></div>
								<div >
									<canvas id="demo1-4" style="width: 70px;height: 70px;"></canvas>
								</div>
							</div>
							<div style="text-align: center;" class="depart_one">
								<span class="cur_hori left_top"></span>
								<span class="cur_veri left_top"></span>

								<span class="cur_hori left_bottom"></span>
								<span class="cur_veri left_bottom"></span>

								<span class="cur_hori right_top"></span>
								<span class="cur_veri right_top"></span>

								<span class="cur_hori right_bottom"></span>
								<span class="cur_veri right_bottom"></span>
								<div style="margin-bottom: 5px;">
									<canvas id="demo2-1" style="width: 70px;height: 70px;"></canvas>
								</div>

								<div style="margin-bottom: 5px;">
									<canvas id="demo2-2" style="width: 70px;height: 70px;"></canvas>
								</div>
								<div style="margin-bottom: 5px;">
									<canvas id="demo2-3" style="width: 70px;height: 70px;"></canvas></div>
								<div >
									<canvas id="demo2-4" style="width: 70px;height: 70px;"></canvas>
								</div>
							</div>
							<div class="depart_one">
								<span class="cur_hori left_top"></span>
								<span class="cur_veri left_top"></span>

								<span class="cur_hori left_bottom"></span>
								<span class="cur_veri left_bottom"></span>

								<span class="cur_hori right_top"></span>
								<span class="cur_veri right_top"></span>

								<span class="cur_hori right_bottom"></span>
								<span class="cur_veri right_bottom"></span>
								<div class="pic_wrap" id="month_data3"></div>
							</div>
							<div class="depart_one">
								<span class="cur_hori left_top"></span>
								<span class="cur_veri left_top"></span>

								<span class="cur_hori left_bottom"></span>
								<span class="cur_veri left_bottom"></span>

								<span class="cur_hori right_top"></span>
								<span class="cur_veri right_top"></span>

								<span class="cur_hori right_bottom"></span>
								<span class="cur_veri right_bottom"></span>
								<div class="pic_wrap" id="month_data4"></div>
							</div>
						</div>
						<div style="height: 30px;margin-left:40px;margin-top: 10px;display: flex;">
							<div style="width: 24%;margin-right: 1%;display: flex;align-items: center;justify-content:center;" v-for="item in lenged_list">
								<p style="width: 15px;height: 15px;border-radius: 50%;margin-right: 10px;" :style="{backgroundColor:item.color}"></p>
								<p>{{item.name}}</p>
							</div>
						</div>
						
					</div>
					

				</div>


				<div class="hym_dataview_right">
					<div class="hym_dataview_right_top">
						<div class="introduce">
							<p  class="title" style="text-align: center;">每日趋势图</p>
							<div class="search_intro">
								<p class="search_p" style="margin-left: 5%">
									<span>日期：</span>
				<!-- 	                <el-date-picker
					                  v-model="search.date1"
					                  size="mini" class="input_class" 
					                  type="date"
					                  :clearable='false'
					                  placeholder="录入日期">
					                </el-date-picker> -->
		            				<el-date-picker
								      v-model="search.date1"
								      size="mini" class="input_class"
								      type="daterange"
								      :clearable='false'
								      range-separator="-"
								      start-placeholder="开始日期"
								      end-placeholder="结束日期"
								      format="MM-dd"
								      
								      style="width: 140px;"
								      
								      @change="get_monthly_visual_by_day">
								    </el-date-picker>
								</p>

								<p class="search_p searchdate">
									<span>部门：</span>
									  <!-- <el-popover
									    :width="popvWidth"
									    trigger="click"
									    popper-class="yyj_input"
									    @hide="get_monthly_visual_by_day">
									    <div style="height: 150px;display: flex;color: #ffffff;text-align: center;">
						
								    		<ul style="width: 100%;">
								    			<li v-for="(item,index) in group_list"  style="line-height: 34px;cursor: pointer;font-weight: 500;font-size: 14px;position: relative;" :class="{checkclass:item.check}">
								    				<input type="radio" v-model="item.check" style="margin-right: 10px;position: absolute;left: 10px;top: 7px;" @click="checkfirstradio(index)"><span @click="get_group_supply(item.value,index)">{{item.label}}</span>
								    			</li>
								    		</ul>

									    	<ul v-if="show" style="width: 100%;padding: 0 10px;overflow: auto;text-align: left;">
								    			<li v-for="(item,index) in second_level" style="line-height: 34px;">
													<el-checkbox :label="item.label" v-model="item.check"></el-checkbox>
								    			</li>
									    	</ul>
									    </div>
									    <el-button slot="reference" style="padding: 0px;" size="mini" class="selectbtn">{{supplyNames?supplyNames:(supplyName?supplyName:'请选择部门')}}<span v-if="supplyIds.length>2">...</span></el-button>
									  </el-popover> -->
									<el-select v-model="supplyId" style="left: 0px;width: 80px;" popper-class= "yyj_input" size="mini" 
									@change="get_monthly_visual_by_day">
										<el-option v-for="item in group_list"
										 :key="item.value"
										 :value="item.value"
										 :label="item.label">	
										</el-option>
									</el-select>
								</p>
								<p class="search_p" style="position: absolute;right: 3%;top: -5px;">				          
									<el-button-group>
						            <el-button  @click="choosedaytype(index)" type="text" v-for="(list,index) in day_choose_list" style="margin-left:10px;width: 60px;color: rgb(165, 169, 181)" :class="{btnchoose:list.choose}">{{list.label}}</el-button>
						            </el-button-group>
						        </p>
							</div>
						</div> 
						<div class="report_wrap" id="daily_trend" style="width: 100%"></div>
					</div>
					<br>
					<br>
					<div class="hym_dataview_right_bottom">
						<div class="introduce">
							<p  class="title" style="text-align: center;">下单占比图</p>
							<div class="search_intro">
		<!--  					    <p class="search_p searchgroup">
									<span>部门：</span>
									<el-select v-model="search.groupId" style="left: 0px;width: 100px;" popper-class= "yyj_input" size="mini">
										<el-option v-for="item in group_list"
										 :key="item.value"
										 :value="item.value"
										 :label="item.label">	
										</el-option>
									</el-select>
								</p> -->
								<p class="search_p" style="position: absolute;right: 3%;">				          
									<el-button-group>
						            <el-button  @click="choosemonthtype(index)" type="text" v-for="(list,index) in mon_choose_list" style="width: 125px;color: rgb(165, 169, 181)" :class="{btnchoose:list.choose}">{{list.label}}</el-button>
						            
						            </el-button-group>
						        </p>
							</div>
						</div> 
						<div class="lengd_warp" >
							<div class="lengd_warp_left" id="order_proportion"></div>
							<div class="lengd_warp_right">
								<div class="signal_lengd" v-for="list in group_circle">
									<p class="p1" :style="{backgroundColor: list.color}"></p>
									<p>{{list.groupName}}</p>
									<p>{{list.rate}}%</p>
								</div>


							</div>
						</div>
					</div>
					<!--<div class="hym_dataview_right_bottom"></div>-->
				</div>			
			</div>
		</div>
	</div>	
</template>

<script>
import echarts from 'echarts'
import { mapGetters } from 'vuex'

import $ from '../../../assets/js/jquery-vendor.js'
//window.jQuery = jquery

//console.info($)
import '../../../assets/js/waterbubble.js'



var daily_trend_chart
var order_proportion_chart
var month_data_chart1
var month_data_chart2
var month_data_chart3
var month_data_chart4


  export default {
    name: "system-setting",
    data(){
      return{
      	search:{
      		ordermonth:new Date([new Date().getFullYear(),new Date().getMonth()+1].join('-')),
      		day_type1:'',
      		day_type2:'',
      		day_type3:'',
      		day_type4:'',
      		date1:[new Date(new Date(new Date().toLocaleDateString()).getTime() - 3600*24*1000*7),new Date(new Date(new Date().toLocaleDateString()).getTime()-24*3600*1000)],
      		day_choose:1,
      		month_choose:1,
      		
      	},
      	group_five1:{},
      	group_five2:{},
      	group_five3:{},
      	group_five4:{},
      	group_circle:[],
      	show: false,
      	supplyId: 1,
      	supplyName:'生产一部',
      	supply_list1: [],
      	supply_list2: [],
      	supply_list3: [],
      	supply_list4: [],
      	second_level: [],
      	group_list: [{
      		value:1,
      		label:'生产一部',
      		check: true,
      	},{
      		value:2,
      		label:'生产二部',
      		check: false,
      	},{
      		value:3,
      		label:'生产三部',
      		check: false,
      	},{
      		value:4,
      		label:'生产四部',
      		check: false,
      	}],
      	day_choose_list:[{
      		value:1,
      		label:'首单款数',
      		choose:true
      	},{
      		value:2,
      		label:'下单量',
      		choose:false
      	},{
      		value:3,
      		label:'取消量',
      		choose:false
      	}],
      	mon_choose_list:[{
      		value:1,
      		label:'月首单下单款',
      		choose:true
      	},{
      		value:2,
      		label:'月下单总量(首+补)',
      		choose:false
      	},{
      		value:3,
      		label:'月取消量(首+补)',
      		choose:false
      	}], 
      	color_list1:['#8080ff','#70b605','#01a7f0','#f59923'],
     	daily_trend_option:{
      			color: ['rgb(255, 0, 0)', 'rgb(255, 204, 51)', 'rgb(126, 207, 81)', 'rgb(97, 165, 232)','#09ebce','#8080ff','rgb(116, 159, 131)','rgb(1, 167, 240)'],

                textStyle:{
					color:'#949494'
				},
			   

			    tooltip: {
			        trigger: 'axis',
			        axisPointer: {
			            type: 'line'
			        }

			    },
			    grid: {
			    	top: '8%',
			        left: '8%',
			        right: '4%',
			        bottom: '20%',
			        containLabel: true
			    },

			    legend: {
	                   x: 'left',
	                   y: 'bottom',
	                   left: '8%',
	                   top:'85%',
	                   icon: 'circle',

	                textStyle: { //图例文字的样式
	                            color: '#949494',
	                            
	                        },

			        data:['下单量']
			    },
			    xAxis: {
			            type: 'category',
			            axisTick: {
			                alignWithLabel: true
			            },
		            	axisLine: {
							show: true,
			                lineStyle: {
			                    color: '#949494'
			                }
				           
				        },

			            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
		        },
			    

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

			    series: []
			  //       {
			  //           name: '下单量',
			  //           type: 'line',
			  //           barWidth: '60%',
			  //           data: [10, 52, 200, 334, 390, 330, 220],
					// 	label: {
					// 		//position:'top',
				 //            normal: {
				 //            	position: 'top',
					// 	        show: true,
					// 	        color: '#cdc9cb',
					// 	        textBorderWidth: 2
					// 	    }
					// 	},		        
					// }
		        
      	}, 
      	order_proportion_option: {
      		color: ['#66CCCC','#FF9999','#fc7c16','#ffaa87','#42b094','#FF6666','#FFCC99','#FF9966'],
		    tooltip: {
		        trigger: 'item',
		        formatter: '{b} : {c} ({d}%)'
		    },
		    grid: {
		        left: '20%',
		        right: '0',
		        bottom: '10%',
		        top:'10%',
		        containLabel: true
		    },
		    legend: {
		    	show: false,
		        left: 'center',
		        top: 'bottom',
		        data: []
		    },
		    series: [
		        {
		            name: '面积模式',
		            type: 'pie',
		            radius: ['30%', '65%'],
		            center: ['60%', '50%'],
		            roseType: 'radius',
                    label: {
		                show: false
		            },
		            data: []
		        }
		    ]
		},
		month_data_option1: {
		    color: ['#8080ff','#70b605','#01a7f0','#f59923'],
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
		            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    grid: {
		        left: '-20%',
		        right: '8%',
		        bottom: '2%',
		        top:'10%',
		        containLabel: true
		    },
		    legend: {
	    	    show:false,

		        data:['月首单下单款','月取消量（首+补）','月下单总量（首+补）','日均首单下单款（月）']
		    },
		    xAxis: [
		        {
		            type: 'category',
		            show:false,
		            data: ['生产一部'],
		        }
		    ],
		    yAxis: [{
		        	show: false,
		            type: 'value'
		        }
	        ],
		    series: [
		        {
		            name: '月首单下单款',
		            type: 'bar',
		            //barWidth: '15%',
		            barGap:'100%',
		            data: [],
					label: {
						//position:'top',
			            normal: {
			            	position: 'top',
					        show: true,
					        color: '#fafb06',
					        textBorderWidth: 2
					    }
					},		        
				},
		        {
		            name: '月取消量（首+补）',
		            type: 'bar',
		            //barWidth: '15%',
		            data: [],
		            label: {
						//position:'top',
			            normal: {
			            	position: 'top',
					        show: true,
					        color: '#fafb06',
					        textBorderWidth: 2
					    }
					},
				},
						        {
		            name: '月下单总量（首+补）',
		            type: 'bar',
		            //barWidth: '15%',
		            data: [0],
					label: {
						//position:'top',
			            normal: {
			            	position: 'top',
					        show: true,
					        color: '#fafb06',
					        textBorderWidth: 2
					    }
					},
				},		        {
		            name: '日均首单下单款（月）',
		            type: 'bar',
		            //barWidth: '15%',
		            data: [0],
		            label: {
						//position:'top',
			            normal: {
			            	position: 'top',
					        show: true,
					        color: '#fafb06',
					        textBorderWidth: 2
					    }
					},
				}
		    ]
		},
		month_data_option2: {
		    color: ['#8080ff','#70b605','#01a7f0','#f59923'],
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
		            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    grid: {
		        left: '-20%',
		        right: '8%',
		        bottom: '2%',
		        top:'10%',
		        containLabel: true
		    },
		    legend: {
	    	    show:false,

		        data:['月首单下单款','月取消量（首+补）','月下单总量（首+补）','日均首单下单款（月）']
		    },
		    xAxis: [
		        {
		            type: 'category',
		            show:false,
		            data: ['生产二部'],
		        }
		    ],
		    yAxis: [{
		        	show: false,
		            type: 'value'
		        }
	        ],
		    series: [
		        {
		            name: '月首单下单款',
		            type: 'bar',
		            //barWidth: '15%',
		            barGap:'100%',
		            data: [],
					label: {
						//position:'top',
			            normal: {
			            	position: 'top',
					        show: true,
					        color: '#fafb06',
					        textBorderWidth: 2
					    }
					},		        
				},
		        {
		            name: '月取消量（首+补）',
		            type: 'bar',
		            //barWidth: '15%',
		            data: [],
		            label: {
						//position:'top',
			            normal: {
			            	position: 'top',
					        show: true,
					        color: '#fafb06',
					        textBorderWidth: 2
					    }
					},
				},
						        {
		            name: '月下单总量（首+补）',
		            type: 'bar',
		            //barWidth: '15%',
		            data: [0],
					label: {
						//position:'top',
			            normal: {
			            	position: 'top',
					        show: true,
					        color: '#fafb06',
					        textBorderWidth: 2
					    }
					},
				},		        {
		            name: '日均首单下单款（月）',
		            type: 'bar',
		            //barWidth: '15%',
		            data: [0],
		            label: {
						//position:'top',
			            normal: {
			            	position: 'top',
					        show: true,
					        color: '#fafb06',
					        textBorderWidth: 2
					    }
					},
				}
		    ]
		},
		month_data_option3: {
		    color: ['#8080ff','#70b605','#01a7f0','#f59923'],
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
		            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    grid: {
		        left: '-20%',
		        right: '8%',
		        bottom: '2%',
		        top:'10%',
		        containLabel: true
		    },
		    legend: {
	    	    show:false,

		        data:['月首单下单款','月取消量（首+补）','月下单总量（首+补）','日均首单下单款（月）']
		    },
		    xAxis: [
		        {
		            type: 'category',
		            show:false,
		            data: ['生产三部'],
		        }
		    ],
		    yAxis: [{
		        	show: false,
		            type: 'value'
		        }
	        ],
		    series: [
		        {
		            name: '月首单下单款',
		            type: 'bar',
		            //barWidth: '15%',
		            barGap:'100%',
		            data: [20],
					label: {
						//position:'top',
			            normal: {
			            	position: 'top',
					        show: true,
					        color: '#fafb06',
					        textBorderWidth: 2
					    }
					},		        
				},
		        {
		            name: '月取消量（首+补）',
		            type: 'bar',
		            //barWidth: '15%',
		            data: [10],
		            label: {
						//position:'top',
			            normal: {
			            	position: 'top',
					        show: true,
					        color: '#fafb06',
					        textBorderWidth: 2
					    }
					},
				},
						        {
		            name: '月下单总量（首+补）',
		            type: 'bar',
		            //barWidth: '15%',
		            data: [10],
					label: {
						//position:'top',
			            normal: {
			            	position: 'top',
					        show: true,
					        color: '#fafb06',
					        textBorderWidth: 2
					    }
					},
				},		        {
		            name: '日均首单下单款（月）',
		            type: 'bar',
		            //barWidth: '15%',
		            data: [10],
		            label: {
						//position:'top',
			            normal: {
			            	position: 'top',
					        show: true,
					        color: '#fafb06',
					        textBorderWidth: 2
					    }
					},
				}
		    ]
		},
		month_data_option4: {
		    color: ['#8080ff','#70b605','#01a7f0','#f59923'],
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
		            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    grid: {
		        left: '-20%',
		        right: '8%',
		        bottom: '2%',
		        top:'10%',
		        containLabel: true
		    },
		    legend: {
	    	    show:false,

		        data:['月首单下单款','月取消量（首+补）','月下单总量（首+补）','日均首单下单款（月）']
		    },
		    xAxis: [
		        {
		            type: 'category',
		            show:false,
		            data: ['生产四部'],
		        }
		    ],
		    yAxis: [{
		        	show: false,
		            type: 'value'
		        }
	        ],
		    series: [
		        {
		            name: '月首单下单款',
		            type: 'bar',
		            //barWidth: '15%',
		            barGap:'100%',
		            data: [20],
					label: {
						//position:'top',
			            normal: {
			            	position: 'top',
					        show: true,
					        color: '#fafb06',
					        textBorderWidth: 2
					    }
					},		        
				},
		        {
		            name: '月取消量（首+补）',
		            type: 'bar',
		            //barWidth: '15%',
		            data: [10],
		            label: {
						//position:'top',
			            normal: {
			            	position: 'top',
					        show: true,
					        color: '#fafb06',
					        textBorderWidth: 2
					    }
					},
				},
						        {
		            name: '月下单总量（首+补）',
		            type: 'bar',
		            //barWidth: '15%',
		            data: [10],
					label: {
						//position:'top',
			            normal: {
			            	position: 'top',
					        show: true,
					        color: '#fafb06',
					        textBorderWidth: 2
					    }
					},
				},		        {
		            name: '日均首单下单款（月）',
		            type: 'bar',
		            //barWidth: '15%',
		            data: [10],
		            label: {
						//position:'top',
			            normal: {
			            	position: 'top',
					        show: true,
					        color: '#fafb06',
					        textBorderWidth: 2
					    }
					},
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

	    popvWidth(){
	      	if(this.show) {
	      		return 300
	      	} else {
	      		return 150
	      	}
	    },



	    supplyIds(){
	      	let arr = []
	      	for(let i=0;i<this.second_level.length;i++) {
	      		if(this.second_level[i].check) {
	      			arr.push(this.second_level[i].value)
	      		}
	      	}
	      	return arr
	    },

      	supplyNames(){
	      	let arr = []
	      	for(let i=0;i<this.second_level.length;i++) {
	      		if(this.second_level[i].check) {
	      			arr.push(this.second_level[i].label)
	      		}
	      	}

      		arr.length>2?arr.splice(2):null

      		return arr.join()
      	},

		lenged_list(){
			let arr = []
			for(let i=0;i<4;i++) {
				arr.push({
					color: this.month_data_option1.color[i],
					name: this.month_data_option1.legend.data[i]
				})
			}
			return arr
		}
		


    

    },

    watch:{

    },
    mounted(){ 


  		this.get_monthly_visual_by_day()

  		this.get_monthly_visual_by_month(1)
  		this.get_monthly_visual_by_month(2)
  		this.get_monthly_visual_by_month(3)
  		this.get_monthly_visual_by_month(4)

  		this.get_group_supply(1)
  		this.get_group_supply(2)
  		this.get_group_supply(3)
  		this.get_group_supply(4)



  		this.$nextTick(()=>{
                $(`#demo1-1`).waterbubble({txt: `90`, waterColor: '#01a7f0',textColor: '#ffffff'});
                $(`#demo1-2`).waterbubble({txt: `100`, waterColor: '#70b605',textColor: '#ffffff'});
                $(`#demo1-3`).waterbubble({txt: `90`, waterColor: '#8080ff',textColor: '#ffffff'});
                $(`#demo1-4`).waterbubble({txt: `1`, waterColor: '#f59923',textColor: '#ffffff'});
                $(`#demo2-1`).waterbubble({txt: `90`, waterColor: '#01a7f0',textColor: '#ffffff'});
                $(`#demo2-2`).waterbubble({txt: `100`, waterColor: '#70b605',textColor: '#ffffff'});
                $(`#demo2-3`).waterbubble({txt: `90`, waterColor: '#8080ff',textColor: '#ffffff'});
                $(`#demo2-4`).waterbubble({txt: `1`, waterColor: '#f59923',textColor: '#ffffff'});
              })





      
      
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

	    choosedaytype(index){
	      	for(let i=0;i<this.day_choose_list.length;i++){
	      		this.day_choose_list[i].choose = false
	      	}
	      	this.day_choose_list[index].choose = true
	      	this.search.day_choose = this.day_choose_list[index].value
	      	this.get_monthly_visual_by_day()
	    },

	    choosemonthtype(index){
	      	for(let i=0;i<this.mon_choose_list.length;i++){
	      		this.mon_choose_list[i].choose = false
	      	}
	      	this.mon_choose_list[index].choose = true
	      	this.search.month_choose = this.mon_choose_list[index].value
	      	this.get_monthly_visual_by_day()
	    },


      	checkfisrt(index) {
      		this.show = true
      		this.second_level = []
      		for(let i=0;i<this.group_list.length;i++) {
      			this.group_list[i].check = false
      		}
      		this.group_list[index].check = true

      		for(let i=0;i<this.group_list[index].children.length;i++) {
      			this.second_level.push({...this.group_list[index].children[i]})
      		}
		
      	},


      	checkfirstradio(index) {
      		this.show = false
      		this.supplyId = ''
      		this.supplyName = ''
      		for(let i=0;i<this.group_list.length;i++) {
      			this.group_list[i].check = false
      		}
      		this.group_list[index].check = true
      		this.supplyId = this.group_list[index].value
      		this.supplyName = this.group_list[index].label
      		
      	},

		get_group_supply(id,index){

      		this.show = true
      		this.second_level = []

      		if(index) {
	      		for(let i=0;i<this.group_list.length;i++) {
	      			this.group_list[i].check = false
	      		}
	      		this.group_list[index].check = true		
      		}


	      	this.$http.post(`hydate/get_group_supply`,{
	      		groupId: id
	      	})
			.then((data)=>{
				if(data.code == '200'){

					let arr = []


					arr.push({value:'',label:'        合计'})



					for(let i=0;i<data.data[0].list.length;i++) {
						arr.push({
							value: data.data[0].list[i].supplyId,
							label: data.data[0].list[i].supplyName,
						})
					}
					
					this.second_level = arr


					if(!index){
						this[`supply_list${id}`] = arr

					}

					
	






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

	    get_monthly_visual_by_month(id){



	      	this.$http.post(`hydate/get_monthly_visual_by_month`,{
	      		groupId: id,//this.search.groupId,
	      		time: this.search.ordermonth.getTime().toString().substr(0,10),
	      		start: this.search.date1[0].getTime().toString().substr(0,10),
	      		end: this.search.date1[1].getTime().toString().substr(0,10),
	      		//supplyIds: this.supplyIds.length? this.supplyIds.join():(this.supplyId.length?this.supplyId.join():'')
	      	})
			.then((data)=>{
				if(data.code == '200'){


					let group = `group_five${id}`

					this[group] = []

					this[group].firstOrder5 = data.data.firstOrder5
						
					this[group].firstOrderNum5 = data.data.firstOrderNum5

					
					



					

					// if(id === 1){
					// 	for(let i=0;i<4;i++) {
					// 		this.month_data_option1.series[i].data = []
					// 	}

					// 	this.month_data_option1.series[0].data.push(data.data.firstOrderMonth)
					// 	this.month_data_option1.series[1].data.push(data.data.deselectNum)
					// 	this.month_data_option1.series[2].data.push(data.data.orderNum)
					// 	this.month_data_option1.series[3].data.push(data.data.firstOrder)
					// }else if(id === 2){
					// 	for(let i=0;i<4;i++) {
					// 		this.month_data_option2.series[i].data = []
					// 	}

					// 	this.month_data_option2.series[0].data.push(data.data.firstOrderMonth)
					// 	this.month_data_option2.series[1].data.push(data.data.deselectNum)
					// 	this.month_data_option2.series[2].data.push(data.data.orderNum)
					// 	this.month_data_option2.series[3].data.push(data.data.firstOrder)
					// }else if(id === 3){
					// 	for(let i=0;i<4;i++) {
					// 		this.month_data_option3.series[i].data = []
					// 	}

					// 	this.month_data_option3.series[0].data.push(data.data.firstOrderMonth)
					// 	this.month_data_option3.series[1].data.push(data.data.deselectNum)
					// 	this.month_data_option3.series[2].data.push(data.data.orderNum)
					// 	this.month_data_option3.series[3].data.push(data.data.firstOrder)
					// }else if(id === 4){
					// 	for(let i=0;i<4;i++) {
					// 		this.month_data_option4.series[i].data = []
					// 	}

					// 	this.month_data_option4.series[0].data.push(data.data.firstOrderMonth)
					// 	this.month_data_option4.series[1].data.push(data.data.deselectNum)
					// 	this.month_data_option4.series[2].data.push(data.data.orderNum)
					// 	this.month_data_option4.series[3].data.push(data.data.firstOrder)
					// }



					let chart = `month_data_chart${id}`
					let option = `month_data_option${id}`

					this[option].series[0].data = []
					this[option].series[1].data = []
					this[option].series[2].data = []
					this[option].series[3].data = []





					this[option].series[0].data.push(data.data.firstOrderMonth)
					this[option].series[1].data.push(data.data.deselectNum)
					this[option].series[2].data.push(data.data.orderNum)
					this[option].series[3].data.push(data.data.firstOrder)



					





	      	        if (chart) {

	                    //chart.clear()
	                    chart = null


	                }

		      	    this.$nextTick(()=>{


		                chart = echarts.init(document.getElementById(`month_data${id}`));
		     
		    			chart.setOption(this[option])


		    		})   		




	  


	     		// 	//月度数据


	      	//         if (month_data_chart1) {
	       //              month_data_chart1.clear()
	       //              month_data_chart1 = null
	       //          }

		      // 	    this.$nextTick(()=>{


		      //           month_data_chart1 = echarts.init(document.getElementById('month_data1'));
		     
		    		// 	month_data_chart1.setOption(this.month_data_option1)


		    		// })





	      	//         if (month_data_chart2) {
	       //              month_data_chart2.clear()
	       //              month_data_chart2 = null
	       //          }

		      // 	    this.$nextTick(()=>{


		      //           month_data_chart2 = echarts.init(document.getElementById('month_data2'));
		     
		    		// 	month_data_chart2.setOption(this.month_data_option2)


		    		// })	


	      	//         if (month_data_chart3) {
	       //              month_data_chart3.clear()
	       //              month_data_chart3 = null
	       //          }

		      // 	    this.$nextTick(()=>{


		      //           month_data_chart3 = echarts.init(document.getElementById('month_data3'));
		     
		    		// 	month_data_chart3.setOption(this.month_data_option3)


		    		// })



	      	//         if (month_data_chart4) {
	       //              month_data_chart4.clear()
	       //              month_data_chart4 = null
	       //          }

		      // 	    this.$nextTick(()=>{


		      //           month_data_chart4 = echarts.init(document.getElementById('month_data4'));
		     
		    		// 	month_data_chart4.setOption(this.month_data_option4)


		    		// })
		

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


      	get_monthly_visual_by_day(){

      		this.show = false



      		let start = this.search.date1[0].getTime().toString().substr(0,10)
      		let end = this.search.date1[1].getTime().toString().substr(0,10)

			this.$http.post(`hydate/get_monthly_visual_by_day`,{
	      		groupId: this.supplyIds.length?'':this.supplyId, //this.search.groupId,
	      		time: this.search.ordermonth.getTime().toString().substr(0,10),
	      		start: start,
	      		end: end,
	      		supplyIds: this.supplyIds.join()
	      	})
			.then((data)=>{
				if(data.code == '200'){

					this.daily_trend_option.xAxis.data = []
					this.daily_trend_option.legend.data = []
					this.daily_trend_option.series = []

					if(data.data.hyMoneyLyGroupVOS && data.data.hyMoneyLyGroupVOS.length) {


						let paratheme = ''
						
						switch(this.search.day_choose) {
							case 1:
								paratheme = 'firstOrder';
								break;
							case 2:
								paratheme = 'orderNum';
								break;
							case 3:
								paratheme = 'deselectNum';
								break;
							default:
							    paratheme = ''
						}						


						let days = Number((end - start)/(3600*24).toFixed() + 1)

						for(let i=0;i<days;i++){
							let date = new Date((Number(start) + 24 * 3600 * i) * 1000)


				      		let y = date.getFullYear()

				      		let m = "0" + (date.getMonth() + 1)
				      		let d = "0" + (date.getDate())
				      		
							this.daily_trend_option.xAxis.data.push(m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length))

						}

						for(let i=0;i<data.data.hyMoneyLyGroupVOS.length;i++) {

							this.daily_trend_option.legend.data.push(data.data.hyMoneyLyGroupVOS[i].groupName)

							this.daily_trend_option.series.push({

								name: data.data.hyMoneyLyGroupVOS[i].groupName,
					            type: 'line',
					            //barWidth: '60%',
					            data: new Array(days).fill(0),

							})



							for(let j=0;j<data.data.hyMoneyLyGroupVOS[i].list.length;j++) {
								let cha = (data.data.hyMoneyLyGroupVOS[i].list[j].time - start)/24/3600

								this.daily_trend_option.series[i].data[cha] = data.data.hyMoneyLyGroupVOS[i].list[j][paratheme]
							}


						}




					}
		     			//每日趋势图
		      	        if (daily_trend_chart) {
		                    daily_trend_chart.clear()
		                    daily_trend_chart = null
		                }

			      	    this.$nextTick(()=>{


			                daily_trend_chart = echarts.init(document.getElementById('daily_trend'));
			     
			    			daily_trend_chart.setOption(this.daily_trend_option)


			    		})	

		    		


	     			//下单占比图
	     			this.order_proportion_option.legend.data = []
	     			this.order_proportion_option.series[0].data = []
	     			this.group_circle = []

	     			if(data.data.hyMoneyLyVOS &&data.data.hyMoneyLyVOS.length) {

	     				let paratype = ''
						switch(this.search.month_choose) {
							case 1:
								paratype = 'firstOrder';
								break;
							case 2:
								paratype = 'orderNum';
								break;
							case 3:
								paratype = 'deselectNum';
								break;
							default:
							    paratype = ''
						}	

						let total = null

	     				for(let i=0;i<data.data.hyMoneyLyVOS.length;i++) {
	     					this.order_proportion_option.legend.data.push(data.data.hyMoneyLyVOS[i].supplyName)

	     					this.order_proportion_option.series[0].data.push({value:data.data.hyMoneyLyVOS[i][paratype], name:data.data.hyMoneyLyVOS[i].supplyName})


	     					this.group_circle.push({
	     						color: this.order_proportion_option.color[i],
	     						data: data.data.hyMoneyLyVOS[i][paratype],
	     						groupName: data.data.hyMoneyLyVOS[i].supplyName,	     						
	     					})

	     					total = total + data.data.hyMoneyLyVOS[i][paratype]
	     				}

	     				for(let i=0;i<this.group_circle.length;i++) {
	     					let rate = (this.group_circle[i].data*100/total)
	     					this.group_circle[i].rate = rate?rate.toFixed(2):0
	     				}


	     			}



		      	        if (order_proportion_chart) {
		                    order_proportion_chart.clear()
		                    order_proportion_chart = null
		                }

			      	    this.$nextTick(()=>{


			                order_proportion_chart = echarts.init(document.getElementById('order_proportion'));
			     
			    			order_proportion_chart.setOption(this.order_proportion_option)


			    		})	




		

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

      	change_data(){

	  		this.get_monthly_visual_by_day()

	  		this.get_monthly_visual_by_month(1)
	  		this.get_monthly_visual_by_month(2)
	  		this.get_monthly_visual_by_month(3)
	  		this.get_monthly_visual_by_month(4)

      	},















    },
  }
</script>
<style lang="less">

.hym_dataview{
	.el-input__inner{
		background-color:#07206900 !important;  //062170
		border:none !important;
		color:#a5a9b5 !important;
		padding-right:0px !important;
		//padding-left:20px !important;
    }

    .el-range-input {
		background-color:#07206900 !important;
		color:#a5a9b5 !important;

    }


    .el-range-separator{
    	color: #fff !important;
    	width: 15% !important;

    }

    .el-select-dropdown{
    	background-color:#182348 !important;
    }

    // .el-radio {
    // 	color: #fff !important;
	   //  font-weight: 500;
	   //  line-height: 1;
	   //  position: relative;
	   //  cursor: pointer;
	   //  display: inline-block;
	   //  white-space: nowrap;
	   //  outline: none;
	   //  font-size: 14px;
    // }

    .searchdate {


	    .el-input__inner{
			padding-left: 0px !important;
	    }



    }





}


</style>

<style>
	.yyj_input {
		background-color:#053291 !important;
	}

    .yyj_input .el-popover {
	    	background-color:red !important;
	    	border: 0px !important;
    }

/*	.yyj_input .el-radio {
	    color: #fff !important;
	}*/
    .yyj_input .checkclass{

    		color: #409EFF;
 
    }

	.yyj_input .el-checkbox {
	    color: #fff !important;
	}	


	.yyj_input .el-select-dropdown__item:hover {
		background-color:#2a79cb;
	}

	.yyj_input .el-select-dropdown__item.hover {
		background-color:#2a79cb;
	}

	.yyj_input .el-select-dropdown__item{
		color: #fff;
	}

	.yyj_input .el-cascader-node:not(.is-disabled):hover	{
		background-color:#2a79cb !important;
	
	}
	.yyj_input .el-cascader-node:not(.is-disabled):focus	{
		background-color:#2a79cb !important;
	
	}

	.yyj_input .el-cascader-menu{
		color: #fff;
	}

</style>



<style scoped lang="less">
.hy_setting {

    font-size:14px; 
    position: relative;
    height: calc(100vh - 65px);
    background: url("../../../assets/bg_hy_visual.jpg") no-repeat center;
    background-size: cover;


    &_top {
    	width: 600px;
    	margin: 0 auto;
    	//height: 110px;
    	//line-height: 110px;
      padding-top: 30px;


    }
    &_warp{

      height: calc(100vh - 190px);
      margin: 20px;
      //background-color:red;

		.hym_dataview {

		    font-size:0.8rem; 
		    position: relative;
		    width: 100%;
		    min-width: 1100px;
		    height: 96%;
		    color: #f6f7f9;
		    display: flex;
		    justify-content:space-between;





			.title {
				//height: 40px;
				line-height: 40px;
				font-size: 1.2rem;
				font-weight: 800;
				color: #fff;


			}

		    .cur_hori{
		    	width: 20px;
		    	height: 2px;
		    	background-color: #03a5c8;
		        position: absolute;
		    }

		    .cur_veri{
		    	height: 20px;
		    	width: 2px;
		    	background-color: #03a5c8;
		        position: absolute;
		    }

		    .left_top{
		    	top:-2px;
		    	left: -2px;
		    }

		    .left_bottom{
				bottom:-2px;
				left: -2px;
		    }

		    .right_top{
		    	top: -2px;
		    	right: -2px;
		    }

		    .right_bottom{
		    	bottom: -2px;
		    	right: -2px;
		    }


			.search_p {
				display: inline-block;
				height: 30px;
				margin-left: 3%;
				color: #a6aab7;

				.input_class {
					width: 100px;
				}

				.selectbtn {
					background-color: #07206900;
					border:none;
					color: #a6aab7;
				}
				
			}

		    &_left {
		    	width: 52%;
		    	height: 95%;
		    	margin-right: 1%;
		    	padding-left:20px;
		    	//background-color:red;


		    	&_top {
		    		height: 40px;
		    	}


		    	&_body {
		    		height: calc(100% - 40px);
		    		padding-top: 60px;
		    		//background-color:green;

		    		.content_wrap {
		    			display: flex;


		    			.introd {
		    				width: 40px;
		    				writing-mode:vertical-rl;
		    				text-align: center;
		    				letter-spacing:4px;
		    			}

		    			.depart_one {
		    				width: 24%;
		    				background-color:#083f9b3d;
		    				height: 100%;
		    				margin-left: 1%;
		    				position:relative;
		    				//background-color: green;


		    				.top_search {
		    					position:absolute;
		    					width: 90%;
		    					display: flex;
		    					justify-content:center;
		    					top: -45px;
		    					//left: 10px;
		    				}

		    				.pic_wrap {
		    					//background-color:red;
		    					//width: 130%;
		    					height: 100%;
		    					padding-top:10px;
		    				}
		    				.data_wrap {
		    					height: 50%;
		    					padding-top:20px;
		    					display: flex;
		    					flex-direction: column;
		    					text-align: center;
		    					justify-content: space-around;

		    					.title_p {
		    						font-size: 1.0rem;
		    						font-weight: 700;
		    						color: #01ffff;
		    						line-height:40px;
		    					}

		    					.data_p {
		    						margin-bottom: 20px;
		    						font-size: 2rem;
		    						font-weight: 700;
		    						color: #f59923;
		    						line-height: 60px;
		    					}
		    				}
		    				.data_wrap2 {
		    					height: 50%;
		    					padding-top:20px;
		    					display: flex;
		    					flex-direction: column;
		    					text-align: center;
		    					justify-content: space-around;

		    					.title_p {
		    						font-size: 1.0rem;
		    						font-weight: 700;
		    						color: #01ffff;
		    						line-height:40px;
		    					}

		    					.data_p {
		    						margin-bottom: 20px;
		    						font-size: 2rem;
		    						font-weight: 700;
		    						color: #f59923;
		    						line-height: 60px;
		    					}
		    				}
		    			}
		    		}


		    		.top_wrap {
		    			height: 45%;
		    			padding-bottom: 10px;
		    			//background-color:blue;
		    		}

		    		.bottom_wrap {
		    			height: 53%;
		    			//background-color:green;
		    		}
		    	}






		    }

		    &_right {
		    	width: 48%;
		    	height: 95%;
		    	//background-color:blue;
		    	//margin-left: -9%;




		    	&_top {
		    		height: 50%;
		    		//background-color:blue;

			    	.introduce {
			    		height: 110px;
			    		margin-left:40px;
			    		//background-color:blue;
			    	}

			    	.search_intro {
			    		height: 30px;
			    		margin-left:15px;
			    		margin-top: 15px;
			    		position:relative;

						.btnchoose{
							color: rgb(37, 137, 227) !important;
						}
			    	}


		    		.report_wrap {

		    			margin-top: -10px;
		    			height: calc(100% - 80px);
		    		}

		    		.lengd_warp {
		    			position:relative;
		    			margin-top: -35px;
		    			display: flex;


		    			&_left {
		    				height: 280px;
		    				width: 50%;
		    			}

		    			&_right {
		    				width: 50%;
		    				padding:15px 0px;
		    				display: flex;
		    				flex-wrap: wrap;
		    				align-content:space-around;
		    			    justify-content:space-between;


		    				.signal_lengd {
		    					//height: 30px;
		    					width: 45%;
		    					display: flex;
		    					justify-content:space-between;
		    					align-items:center;


		    					.p1 {
		    						width: 20px;
		    						height: 15px;
		    						border-radius: 3px;

		    					}
		    				}
		    			}
		    		}
		    	}
		    	&_bottom {
		    		height: 50%;
		    		//background-color:red;


			    	.introduce {
			    		height: 20%;
			    		margin-left:40px;
			    	}

			    	.search_intro {
			    		height: 20%;
			    		margin-left:15px;
			    		margin-top: 3%;
			    		position:relative;

						.btnchoose{
							color: rgb(37, 137, 227) !important;
						}
			    	}


		    		.report_wrap {

		    			//margin-top: -10px;
		    			height: calc(100% - 80px);
		    		}

		    		.lengd_warp {
		    			position:relative;		    			
		    			display: flex;
		    			height: 70%;
		    			margin-top: 3%;

		    			&_left {
		    				//height: 280px;
		    				width: 45%;
		    			}

		    			&_right {
		    				width: 55%;
		    				padding:15px 4%;
		    				display: flex;
		    				flex-wrap: wrap;
		    				align-content:space-around;
		    			    justify-content:space-between;


		    				.signal_lengd {
		    					height: 30px;
		    					width: 45%;
		    					display: flex;
		    					justify-content:space-between;
		    					align-items:center;


		    					.p1 {
		    						width: 20px;
		    						height: 15px;
		    						border-radius: 3px;

		    					}
		    				}
		    			}
		    		}
		    	}

		    }
   		} 
  	}
}
  
</style>
