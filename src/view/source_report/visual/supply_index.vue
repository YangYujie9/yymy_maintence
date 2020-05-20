<template>
	<div class="supply_index">
		<div class="supply_top">供应链驾驶舱</div>
		<div class="supply_content">
			<div class="supply_content_top">
				<div class="left_wrap supply_content_top_left">
					<div class="tk_div singal_div">
						<p class="top_p">
							<i class="iconfont iconhuaban"></i><span>近期平均退款率</span>
						</p>
						<div class="circle_div">
							<el-progress type="circle" :percentage="25" :stroke-width="20"></el-progress>
						</div>
						<p class="bottom_p">涉及款数：60款</p>
					</div>

					<div class="tk_div singal_div">
						<p class="top_p">
							<i class="iconfont iconhuaban"></i><span>爆款中A类款平均退款率</span>
						</p>
						<div class="circle_div">
							<el-progress type="circle" :percentage="25" :stroke-width="20"></el-progress>
						</div>
						<p class="bottom_p">涉及款数：60款</p>
					</div>
					<div class="tk_div singal_div">
						<p class="top_p">
							<i class="iconfont iconhuaban"></i><span>爆款中B类款平均退款率</span>
						</p>
						<div class="circle_div">
							<el-progress type="circle" :percentage="25" :stroke-width="20"></el-progress>
						</div>
						<p class="bottom_p">涉及款数：60款</p>
					</div>
				</div>
				<div class="right_wrap supply_content_top_right singal_div">
					<p class="top_p">
						<i class="iconfont iconhuaban"></i><span>首单到货平均货期对比趋势（周）</span>
			            <el-date-picker
				  		  style="display: inline-block;position: absolute;right:0px;width: 140px;"
					      v-model="arrivalDate"
					      type="week"
					      :format="format()" 
					      placeholder="选择日期"
					      :clearable='false'
					      size="small"
					      :picker-options="pickerOptions"
					      @change="">
				       </el-date-picker>
					</p>
					<div class="content_wrap">
						<div class="data_wrap">
							<p>
								<i class="iconfont iconyuanquan"></i>
								<span>涉及首单款数：</span>
								<span class="span1">60款</span>
							</p>
							<p>
								<i class="iconfont iconyuanquan"></i>
								<span>首单平均货期：</span>
								<span class="span1">60款</span>
							</p>
							<p></p>
							<p>
								<i class="iconfont iconyuanquan"></i>
								<span>涉及出清首单款数：</span>
								<span class="span1">60款</span>
							</p>
							<p>
								<i class="iconfont iconyuanquan"></i>
								<span>首单平均出清货期：</span>
								<span class="span1">60款</span>
							</p>
						</div>
						<div class="chart_wrap" id="arrival_date"></div>
					</div>
				</div>
			</div>
			<div class="supply_content_bottom">
				<div class="left_wrap singal_div supply_content_bottom_left">
					<div class="compare_div">
						<p class="top_p">
							<i class="iconfont iconhuaban"></i><span>月累计有货退款率对比趋势</span>
							<span style="position: absolute;right: 0px;">
							    <el-date-picker
							      v-model="arrvimondate1"
							      type="year"
							      size="small"
							      :clearable="false"
							      style="width: 80px;">
							    </el-date-picker> - <el-date-picker
							      v-model="arrvimondate2"
							      type="year"
							      size="small"
							      :clearable="false"
							      style="width: 80px;">
							    </el-date-picker>
						    </span>
						</p>
						<div style="height: calc(100% - 50px);" id="inStore_wrap"></div>
					</div>
					<div class="compare_div">
						<p class="top_p">
							<i class="iconfont iconhuaban"></i><span>月累计无货退款率对比趋势</span>
						</p>
						<div style="height: calc(100% - 50px);" id="noStore_wrap"></div>
					</div>
				</div>
				<div class="right_wrap supply_content_bottom_right">
					<div class="top_wrap singal_div">
						<p class="top_p">
							<i class="iconfont iconhuaban"></i><span>月到货平均货期对比趋势</span>
							<span style="position: absolute;right: 0px;">
							    <el-date-picker
							      v-model="arrvimondate1"
							      type="year"
							      size="small"
							      :clearable="false"
							      style="width: 80px;">
							    </el-date-picker> - <el-date-picker
							      v-model="arrvimondate2"
							      type="year"
							      size="small"
							      :clearable="false"
							      style="width: 80px;">
							    </el-date-picker>
						    </span>
						</p>
						<div style="height: calc(100% - 50px);" id="month_arrival_wrap"></div>
					</div>
					<div class="bottom_wrap">
						<div class="left1 singal_div">
							<p class="top_p">
								<i class="iconfont iconhuaban"></i><span>累计7日首单下单量分布范围(%)</span>
							</p>
							<div style="height: calc(100% - 50px);" id="circle_wrap"></div>
						</div>
						<div class="left2 singal_div">
							<p class="top_p">
								<i class="iconfont iconhuaban"></i><span>首单累计补货率(%)</span>
					            <el-date-picker
						  		  style="display: inline-block;position: absolute;right:0px;width: 140px;"
							      v-model="comlateFirstdate"
							      type="week"
							      :format="format1()" 
							      placeholder="选择日期"
							      :clearable='false'
							      size="small"
							      :picker-options="pickerOptions"
							      @change="">
						       </el-date-picker>
							</p>
							<div class="rightone">
								<div class="tk_div">
									<div class="circle_div">
										<el-progress type="circle" :percentage="25" :stroke-width="20"></el-progress>
									</div>
									<p class="bottom_p">周首单累计补单率</p>
								</div>
								<div class="tk_div">
									<div class="circle_div">
										<el-progress type="circle" :percentage="25" :stroke-width="20"></el-progress>
									</div>
									<p class="bottom_p">近一月首单累计补单率</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>


	</div>
</template>
<script >
	import echarts from 'echarts'
	import { mapGetters } from 'vuex'
	var arrival_chart
	var inStore_chart
	var noStore_chart
	var month_arrival_chart
	var circle_chart

	export default{
		data(){
			return{
			  	pickerOptions:{
			  		disabledDate(time) {
			        //return time.getTime() > Date.now() - 24*60*60*1000;
			        },
			        'firstDayOfWeek': 1
			  	},
				arrivalDate: new Date(new Date(new Date().toLocaleDateString()).getTime() - 24*3600*1000*7),
				comlateFirstdate:  new Date(new Date(new Date().toLocaleDateString()).getTime() - 24*3600*1000*7),
				arrvimondate1: new Date(new Date(new Date().toLocaleDateString()).getTime() - 24*3600*1000*366),
				arrvimondate2: new Date(new Date(new Date().toLocaleDateString()).getTime()),
		      	arrival_date_option:{
		                textStyle:{
							color:'#949494'
						},
					   

					    tooltip: {
					        trigger: 'axis',
					        axisPointer: {
					        	//show:false,
					            type: 'line'
					        }

					    },
					    grid: {
					    	top: '10%',
					        left: '4%',
					        right: '15%',
					        bottom: '10%',
					        containLabel: true
					    },

					    legend: {
					    	show: true,
		                    x: 'right',
		                    y: 'center',
		                    //left: '5%',

			                textStyle: { //图例文字的样式
			                            color: '#949494',
			                            
			                        },

					        data:['转化率']
					    },
					    xAxis: [
					        {
					            type: 'category',
					            axisTick: {
					                alignWithLabel: true
					            },


					            data: ['1月','2月','3月','1月']
					        }
					    ],

					    yAxis: {
					        type: 'value',
					        splitLine: {
				            	show: false,
				            	lineStyle: {
				            		type:'dotted',
				            		color:'#949494'
				            	}
				            },
				            axisTick: {
				            	show: false,
				            },
				            axisLine: {
								show: false,
				                lineStyle: {
				                    color: '#949494'
				                }
					           
					        },
			              

					    },

					    series:[{
					    	type: 'line',
					        name:'转化率',
				            //yAxisIndex: 2,#ff9933
				            itemStyle:{
				        	  color:'rgb(97, 165, 232)',
				            },
				            data:new Array(11).fill(0.1)
				            
				        }]
		      	},
		      	inStore_option: {
		                textStyle:{
							color:'#949494'
						},
					   

					    tooltip: {
					        trigger: 'axis',
					        axisPointer: {
					        	show:false,
					            type: 'line'
					        }

					    },
					    grid: {
					    	top: '10%',
					        left: '4%',
					        right: '15%',
					        bottom: '10%',
					        containLabel: true
					    },

					    legend: {
					    	show: true,
		                    x: 'right',
		                    y: 'center',
		                    //left: '5%',

			                textStyle: { //图例文字的样式
			                            color: '#949494',
			                            
			                        },

					        data:['转化率']
					    },
					    xAxis: [
					        {
					            type: 'category',
					            axisTick: {
					                alignWithLabel: true
					            },


					            data: ['1月','2月','3月','1月']
					        }
					    ],

					    yAxis: {
					        type: 'value',
					        splitLine: {
				            	show: true,
				            	lineStyle: {
				            		type:'dotted',
				            		color:'#949494'
				            	}
				            },
				            axisLine: {
								show: true,
				                lineStyle: {
				                    color: '#949494'
				                }
					           
					        },
			              

					    },

					    series:[{
					    	type: 'line',
					        name:'转化率',
				            //yAxisIndex: 2,#ff9933
				            itemStyle:{
				        	  color:'rgb(97, 165, 232)',
				            },
				            data:new Array(11).fill(0.1)
				            
				        }]
		      	},
		      	noStore_option: {
		                textStyle:{
							color:'#949494'
						},
					   

					    tooltip: {
					        trigger: 'axis',
					        axisPointer: {
					        	show:false,
					            type: 'line'
					        }

					    },
					    grid: {
					    	top: '10%',
					        left: '4%',
					        right: '15%',
					        bottom: '10%',
					        containLabel: true
					    },

					    legend: {
					    	show: true,
		                    x: 'right',
		                    y: 'center',
		                    //left: '5%',

			                textStyle: { //图例文字的样式
			                            color: '#949494',
			                            
			                        },

					        data:['转化率']
					    },
					    xAxis: [
					        {
					            type: 'category',
					            axisTick: {
					                alignWithLabel: true
					            },


					            data: ['1月','2月','3月','1月']
					        }
					    ],

					    yAxis: {
					        type: 'value',
					        splitLine: {
				            	show: true,
				            	lineStyle: {
				            		type:'dotted',
				            		color:'#949494'
				            	}
				            },
				            axisLine: {
								show: true,
				                lineStyle: {
				                    color: '#949494'
				                }
					           
					        },
			              

					    },

					    series:[{
					    	type: 'line',
					        name:'转化率',
				            //yAxisIndex: 2,#ff9933
				            itemStyle:{
				        	  color:'rgb(97, 165, 232)',
				            },
				            data:new Array(11).fill(0.1)
				            
				        }]
		      	},
		      	month_arrival_option: {
		                textStyle:{
							color:'#949494'
						},
					   

					    tooltip: {
					        trigger: 'axis',
					        axisPointer: {
					        	//show:false,
					            type: 'line'
					        }

					    },
					    grid: {
					    	top: '10%',
					        left: '4%',
					        right: '15%',
					        bottom: '10%',
					        containLabel: true
					    },

					    legend: {
					    	show: true,
		                    x: 'right',
		                    y: 'center',
		                    //left: '5%',

			                textStyle: { //图例文字的样式
			                            color: '#949494',
			                            
			                        },

					        data:['转化率']
					    },
					    xAxis: [
					        {
					            type: 'category',
					            axisTick: {
					                alignWithLabel: true
					            },


					            data: ['1月','2月','3月','1月']
					        }
					    ],

					    yAxis: {
					        type: 'value',
					        splitLine: {
				            	show: false,
				            	lineStyle: {
				            		type:'dotted',
				            		color:'#949494'
				            	}
				            },
				            axisTick: {
				            	show: false,
				            },
				            axisLine: {
								show: false,
				                lineStyle: {
				                    color: '#949494'
				                }
					           
					        },
			              

					    },

					    series:[{
					    	type: 'line',
					        name:'转化率',
				            //yAxisIndex: 2,#ff9933
				            itemStyle:{
				        	  color:'rgb(97, 165, 232)',
				            },
				            data:new Array(11).fill(0.1)
				            
				        }]
		      	},
				circle_option: {
				   color:['rgb(220, 176, 45)','rgb(97, 165, 232)','#e16757'],
				   
				    tooltip : {
				        trigger: 'item',
				        formatter: "{b} : {c} ({d}%)"
				    },
				    legend: {
				    	//show:false,
				        orient: 'center',
				        // x: 'left',    
				        //bottom:10,
				        //bottom:'12%',
				        //x: 'center',
				        y: 'center',
				        x:'right',
				        data: ['1月','2月','3月','4月'],
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
				            center: ['40%', '50%'],
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
				            data: [ {name:'1月',value:10},
				            		{name:'2月',value:10},
				            		{name:'3月',value:10},
				            		{name:'4月',value:10},
				            ],
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
		created(){
			
		},

		mounted(){

			this.getdata()
			
		},
		computed:{
			...mapGetters([
	      
		      'userInfo',

		    ]),


		},
			
		methods:{

			getdata() {
	            this.$nextTick(()=>{

		            arrival_chart = echarts.init(document.getElementById('arrival_date'));
		  			
					arrival_chart.setOption(this.arrival_date_option)
				})


	            this.$nextTick(()=>{

		            inStore_chart = echarts.init(document.getElementById('inStore_wrap'));
		  			
					inStore_chart.setOption(this.inStore_option)
				})

	            this.$nextTick(()=>{

		            noStore_chart = echarts.init(document.getElementById('noStore_wrap'));
		  			
					noStore_chart.setOption(this.noStore_option)
				})

	            this.$nextTick(()=>{

		            month_arrival_chart = echarts.init(document.getElementById('month_arrival_wrap'));
		  			
					month_arrival_chart.setOption(this.month_arrival_option)
				})


	            this.$nextTick(()=>{

		            circle_chart = echarts.init(document.getElementById('circle_wrap'));
		  			
					circle_chart.setOption(this.circle_option)
				})				
			},


		    formatMD(obj){
		        //var date =  new Date(obj*1000);
		        //var y = obj.getFullYear();
		        var m = "0"+(obj.getMonth()+1);
		        var d = "0"+obj.getDate();
		        //var h = date.getHours();
		        //console.info(h)
		        return m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
		        //return y+"-"+m.substring(m.length-2,m.length);
		    },



	        format(){

	    		let weekDate = this.getWeekStartAndEnd(this.arrivalDate)

	    		return weekDate
	    	},

	        format1(){

	    		let weekDate = this.getWeekStartAndEnd(this.comlateFirstdate)

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

	            nowDayOfWeek = nowDayOfWeek==0?7:nowDayOfWeek


	            let nowDay = now.getDate(); // 当前日

	            let nowMonth = now.getMonth(); // 当前月

	            let nowYear = now.getFullYear(); // 当前年

	            //console.info(nowDayOfWeek,nowDay,nowMonth,nowYear)
	            



	            let weekStart = this.getWeekStartDate(nowYear, nowMonth, nowDay, nowDayOfWeek)
	            

	            let weekEnd = this.getWeekEndDate(nowYear, nowMonth, nowDay, nowDayOfWeek)

	            //this.weekFormat = weekStart + '~' + weekEnd

	            return weekStart + '~' + weekEnd


	        },

	        // 获得某一周的开始日期

	        getWeekStartDate(nowYear, nowMonth, nowDay, nowDayOfWeek) {

	            let weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1)

	            this.weekStartDate = weekStartDate

	            return this.formatMD(weekStartDate)

	        },

	        // 获得某一周的结束日期

	        getWeekEndDate(nowYear, nowMonth, nowDay, nowDayOfWeek) {

	            let weekEndDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek))

	            this.weekEndDate = weekEndDate

	            return this.formatMD(weekEndDate)

	        },


		}

	}
</script>
<style lang="less">
.supply_index {
	.el-input__inner {
		border: 0px;
		padding-right: 10px;
	}
}



	
</style>
<style scoped lang="less">

.supply_index {
	height: 100%;
	background-color: #eee;

	.supply_top {
		height: 80px;
		line-height: 80px;
		font-size: 1.8rem;
		text-align: center;
		//background-color:red;
	}

	.supply_content {
		height: calc(100vh - 145px);
		margin: 0 20px 20px 20px;


		.top_p {
			height: 40px;
			line-height: 40px;
			font-size: 0.9rem;
			position: relative;

			span {
				margin-left: 10px;
			}

		}


		.left_wrap {
			width: 53%;
			//background-color:red;
		}

		.right_wrap {
			margin-left: 20px;
			width: 47%;
			//background-color:blue;
		}

		.singal_div {
			background-color:#ffffff;
			padding: 10px 20px;
		}


		&_top {
			height: 33%;
			display: flex;


			&_left {
				display: flex;
				justify-content: space-between;

				.tk_div {
					width: 32%;
					
					//background-color:#ffffff;

					.circle_div {
						height: 60%;
						padding-top: 20%;
						text-align: center;
						//background-color:blue;
					}

					.bottom_p {
						height: 50px;
						line-height: 50px;
						text-align: center;
						font-size: 1.1rem;
					}
				}
			}

			&_right {
				//background-color:#ffffff;
				.content_wrap {
					margin-top: 20px;
					display: flex;
					height: calc(100% - 70px);

					.data_wrap {
						width: 35%;

						p {
							position:relative;
							height: 40px;
							line-height: 40px;
							.span1 {
								position: absolute;
								right: 10px;
							}
						}
					}

					.chart_wrap {
						margin-left: 20px;
						width: 65%;
					}
				}
			}

		}


		&_bottom {
			height: 63%;
			margin-top: 20px;
			display: flex;

			&_left {
				.compare_div {
					height: 50%;
				}
			}

			&_right {
				display: flex;
				flex-direction: column;

				.top_wrap {
					height: 40%;
				}

				.bottom_wrap {
					margin-top: 20px;
					height: 60%;
					display: flex;

					.left1 {
						width: 45%;
					}
					.left2 {
						margin-left: 20px;
						width: 55%;

						.rightone {
							height: calc(100% - 50PX);
							display: flex;
							justify-content: space-between;


							.tk_div {
								width: 48%;
								
								//background-color:#ffffff;

								.circle_div {
									height: 50%;
									margin-top: 30%;
									text-align: center;
									//background-color:blue;
								}

								.bottom_p {
									height: 50px;
									line-height: 50px;
									text-align: center;
									font-size: 0.9rem;
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