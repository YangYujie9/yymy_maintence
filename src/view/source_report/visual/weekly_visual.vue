<template>
	<div class="hy_setting">

		<div class="hy_setting_top">
		    	<img src="../../../assets/hy_title.png" style="width: 600px;">	    	
		</div>
		<div class="hy_setting_warp">
			<div class="hy_dataview">
				<div class="datelist">
		            <el-date-picker
			  		  style="display: inline-block;position: relative;width: 240px;"
				      v-model="time"
				      type="week"
				      :format="format()" 
				      placeholder="选择日期"
				      :clearable='false'
				      :picker-options="pickerOptions"
				      @change="get_weekly_visual">
			       </el-date-picker>
		<!-- 			<el-date-picker
				      v-model="searchdate"
				      type="daterange"
				      range-separator="--"
				      start-placeholder="开始日期"
				      end-placeholder="结束日期"
				      :clearable=false
				      style="width: 300px;"
				      class="input_class"
				      @change="get_weekly_visual">
				    </el-date-picker> -->

			    </div>
			    <div class="selecttype datelist">

					<el-select v-model="supply_type" style="left: 20px;width: 80px;" popper-class= "yyj_input" @change="get_weekly_visual">
						<el-option v-for="item in supply_type_list"
						 :key="item.value"
						 :value="item.value"
						 :label="item.label">	
						</el-option>
					</el-select>
				</div>
				<div class="hy_dataview_top">
					<div class="left">
						<div class="top_one signal_wrap">
							<p class="title">重要在途款量(本地)</p>
							<div class="content_warp" id="left_one"></div>
						</div>
						<div class="top_two signal_wrap">
							<p class="title">重要在途款量(外地)</p>
							<div class="content_warp" id="left_two"></div>
						</div>
					</div>


					<div class="middle signal_wrap">
						<p class="title">总在途数</p>
						<div class="middle_wrap">
							<div class="one">
								<div class="circle_warp" id="circle_one"></div>
								<p class="intro">合计：{{circle_total1}}</p>
							</div>
							<div class="one">
								<div class="circle_warp" id="circle_two"></div>
								<p class="intro">合计：{{circle_total2}}</p>
							</div>
						</div>		
					</div>


					<div class="left">
						<div class="top_one signal_wrap">
							<p class="title">预计出清天数</p>
							<div class="days_warp content_warp">
								<div class="day_one" v-for="list in cqDay_list">
									<p class="day_p " :class="{day_p1:supply_type == 2}">{{list.name}}</p>
									<p class="day_n" :class="{day_n1:supply_type == 2}">{{list.value}}</p>
								</div>

			<!-- 				<div class="day_one">
									<p class="day_p" style="color: #75c6f4;">娄中取</p>
									<p class="day_p" style="color: #ffae35;">25.97</p>
								</div>-->


				
								
							</div>
						</div>
						<div class="top_two signal_wrap">
							<p class="title">周到货数</p>
							<div class="content_warp" id="last_week_arrive"></div>
						</div>	
					</div>
					

				</div>
				<div class="hy_dataview_bottom">

					<div class="bottom_left signal_wrap">
						<p class="title" style="margin-top: 0px;">
							<el-select v-model="select_type" style="width: 130px;" popper-class= "yyj_input" @change="get_weekly_visual">
								<el-option v-for="item in type_list"
								 :key="item.value"
								 :value="item.value"
								 :label="item.label">	
								</el-option>
							</el-select>
						</p>
						<div class="content_warp" id="supply_wrap"></div>
					</div>
					<div class="bottom_right signal_wrap">
						<p class="title">周日均到货数</p>
						<div class="content_warp" id="daily_arrive"></div>
					</div>
				</div>									
			</div>
		</div>
	</div>
	
</template>

<script>
import echarts from 'echarts'
import { mapGetters } from 'vuex'

var onway_local_chart
var onway_nonlocal_chart
var circle_one_chart
var circle_two_chart
var week_arrive_chart
var supply_chart
var daily_arrive_chart


  export default {
    name: "system-setting",
    data(){
      return{
      	//searchdate:[new Date([new Date().getFullYear(),new Date().getMonth()+1,1].join('-')),new Date(new Date(new Date().toLocaleDateString()).getTime()-24*3600*1000)],
      	select_type:1,
      	supply_type:1,
      	pickerOptions:{
      		disabledDate(time) {
            //return time.getTime() > Date.now() - 24*60*60*1000;
            },
            'firstDayOfWeek': 1
      	},
        time: new Date(new Date(new Date().toLocaleDateString()).getTime() - 24*3600*1000*7),
        weekStartDate:'',
      	weekEndDate:'',
      	cqDay_list:[],
      	circle_total1:0,
      	circle_total2:0,
      	type_list:[{
      		value:1,
      		label:'首单下单款'
      	},{
      		value:2,
      		label:'日均首单款'
      	},{
      		value:3,
      		label:'新款下单总量'
      	},{
      		value:4,
      		label:'老款下单总量'
      	},{
      		value:5,
      		label:'周取消量'
      	}], 
      	supply_type_list:[{
      		value:1,
      		label:'本地'
      	},{
      		value:2,
      		label:'外地'
      	}],
      	onway_local_option: {
      		color: ['#339902'],
		    title: {
		        show: false
		    },
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {
		            type: 'shadow'
		        }
		    },
		    legend: {
		        show: false
		    },
		    grid: {
		        top: '1%',
		        left: '30px',
		        right: '6%',
		        bottom: '1%',
		        containLabel: true
		    },
		    xAxis: {
		        show: true,
		        axisTick: {
		        	show: false
		        },
		        splitLine: {
				    show: false,
				},
	            axisLine: {
					show: false,
	                lineStyle: {
	                    color: '#eaeff4'
	                }  
		        },

		    },
		    yAxis: {
		        type: 'category',
		        data: [],
		        axisLine: {
					show: false,
		           
		        },
				axisTick: {
		        	show: false
		        },
		        axisLabel: {
		            show: true,
		            textStyle: {
		              color:'#eaeff4'  //这里用参数代替了
		            }
		        },
		        splitLine: {
				    show: false,
				},
		       
		    },
		    series: [
		        {
		            type: 'bar',
		            barWidth: '16px',
		            label: {
			            normal: {
			            	position: 'right',
			            	color: '#fff',
					        show: true,
					        textBorderColor: '#333',
					        textBorderWidth: 2
					    }
					},
				    itemStyle:{
		        	  //color:'#ff9933',
		            },
		            data: []
		        },
		        
		    ]
		},
      	onway_nonlocal_option: {
      		color: ['#339902'],
		    title: {
		        show: false
		    },
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {
		            type: 'shadow'
		        }
		    },
		    legend: {
		        show: false
		    },
		    grid: {
		        top: '1%',
		        left: '0',
		        right: '6%',
		        bottom: '1%',
		        containLabel: true
		    },
		    xAxis: {
		        show: true,
		        axisTick: {
		        	show: false
		        },
		        splitLine: {
				    show: false,
				},
	            axisLine: {
					show: false,
	                lineStyle: {
	                    color: '#eaeff4'
	                }  
		        },

		    },
		    yAxis: {
		        type: 'category',
		        data: ['Mon', 'Tue', 'Wed', 'Thu'],
		        axisLine: {
					show: false,
		           
		        },
				axisTick: {
		        	show: false
		        },
		        axisLabel: {
		            show: true,
		            textStyle: {
		              color:'#eaeff4'  //这里用参数代替了
		            }
		        },
		        splitLine: {
				    show: false,
				},
		       
		    },
		    series: [
		        {
		            type: 'bar',
		            barWidth: '16px',
		            label: {
			            normal: {
			            	position: 'right',
			            	color: '#fff',
					        show: true,
					        textBorderColor: '#333',
					        textBorderWidth: 2
					    }
					},
				    itemStyle:{
		        	  //color:'#ff9933',
		            },
		            data: [120, 200, 150, 80]
		        },
		        
		    ]
		},
		circle_one_option: {
			    title: {
			        text: '本地',
			        left: 'center',
			        top:'10%',
			        textStyle: {
			        	color:'#34c1ec'
			        }
			    },
			   color:['rgb(220, 176, 45)','rgb(97, 165, 232)','#e16757','#e3935d'],
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
					orient: 'center',
			        x: 'left', 
			        top:'10%',   
			        data: ['Mon', 'Tue', 'Wed', 'Thu'],
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
			            data: [],
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
			    title: {
			        text: '外地',
			        left: 'center',
			        top:'10%',
			        textStyle: {
			        	color:'#34c1ec'
			        }
			    },
			   color:['rgb(222, 146, 12)','rgb(230, 166, 54)','rgb(220, 176, 45)','rgb(69, 151, 232)','rgb(97, 165, 232)'],
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
					orient: 'center',
			        x: 'right', 
			        top:'10%',   
			        data: ['Mon', 'Tue', 'Wed', 'Thu'],
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
			            data: [ {name:'Mon',value:100}, 
					            {name:'Tue',value:200},
					            {name:'Wed',value:150},
					            {name:'Thu',value:80}
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

		week_arrive_option: {
		    color: ['#feff03'],
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
		            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        },
		        formatter: "{b} : {c} "
		    },
		    grid: {
		        left: '-11%',
		        right: '0',
		        bottom: '10%',
		        top:'10%',
		        containLabel: true
		    },
		    xAxis: [
		        {
		            type: 'category',
		            data: [],
		            axisTick: {
		            	show:false,
		                alignWithLabel: true
		            },
		            axisLine: {
						show: false,
		                lineStyle: {
		                    color: '#eaeff4'
		                }  
			        },
			        axisLabel: {
			        	interval: 0,

			        }

		        }
		    ],
		    yAxis: [{
		        	show: false,
		            type: 'value'
		        }
	        ],
		    series: [
		        {
		            //name: '上周到货数',
		            type: 'bar',
		            barWidth: '30%',
		            symbol: 'path://M512 224.253702C319.837248 224.253702 163.518325 173.93448 163.518325 112.126851S319.837248 0 512 0s348.481675 50.319222 348.481675 112.126851S704.162752 224.253702 512 224.253702zM159.688856 108.756918v0z m352.311144 119.326253C317.386387 228.083171 159.688856 176.155572 159.688856 112.126851V912.9454h0.842483c11.718175 61.960808 164.590576 111.0546 351.468661 111.0546s339.750486-49.093792 351.468661-111.0546H864.311144V112.126851C864.311144 176.155572 706.613613 228.083171 512 228.083171zM864.311144 108.756918v3.369933-3.369933z',
		            symbolSize: [20,'100%'],
		            data: [],
					label: {
						//position:'',
			            normal: {
			            	position: 'top',
					        show: true,
					        color: '#cdc9cb',
					        textBorderWidth: 2
					    }
					},		        
				}
		    ]
		},

		week_arrive_option2: {
			color: ['#7cb5ec'],

		    tooltip: {
		        type: ''
		    },

	        xAxis3D: {
	        	name:'',
	            type: 'category',
	            axisTick: {
	            	show:false,
	            },
	            axisLine:{
	            	lineStyle: {
	            		opacity: 0,
	            	}
	            }

	        },
	        yAxis3D: {
	        	name:'',
	            type: 'value',
	            show:false,
	            axisTick: {
	            	show:false,
	            },
	            axisLine:{
	            	lineStyle: {
	            		opacity: 0,
	            	}
	            },
	            axisLabel: {
	            	show: false
	            }
	        },
	        zAxis3D: {
	        	name:'',
	            type: 'value',
	            axisTick: {
	            	show:false,
	            },
	            axisLine:{
	            	lineStyle: {
	            		opacity: 0,
	            	}
	            },
	            axisLabel: {
	            	show: false
	            }
	        },
	        grid3D: {
	            viewControl: {
	            	projection: 'orthographic', 
	                alpha: 10,
	                beta: 10
	            },
	            postEffect: {
	                enable: true,
	                SSAO: {
	                    enable: true
	                }
	            },
	            splitLine:{
	            	show: false,
	            },

	            boxDepth: 120,
	            // light: {
	            //     main: {
	            //         shadow: true,
	            //         intensity: 2
	            //     },
	            //     ambientCubemap: {
	            //        // texture: 'data-gl/asset/canyon.hdr',  //官网给的例子
	            //         texture: '../../../assets/hy_title.png',       //该行代码与下面的决定图片是否显示出来，我一开始没有考虑改行代码，折腾了半天图片才展示出来
	            //         exposure: 2,
	            //         diffuseIntensity: 0.2,
	            //         specularIntensity: 1
	            //     }
	            // },
	        },

		    series: [{
		        type: 'bar3D',
		        name: '',
		        barSize: 11,
		        data:  [
                    [2, 0, 1800],
                    [1, 0, 100],
                    [3, 0, 6000],
                ],
		        label: {
		            show: false,
		            textStyle: {
		                fontSize: 16,
		                borderWidth: 1
		            }
		        },
		        itemStyle: {
		            opacity: 0.4
		        },
		        emphasis: {
		            label: {
		                textStyle: {
		                    fontSize: 20,
		                    color: '#900'
		                }
		            }
		        }
		    }]
			
		},


		supply_option: {
		    color: ['#3398DB','#ff9902'],
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
		            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        },
		        formatter: "{b} : {c} "
		    },
		    grid: {
		        left: '5%',
		        right: '5%',
		        bottom: '5%',
		        top:'10%',
		        containLabel: true
		    },
		    xAxis: [
		        {
		            type: 'category',
		            data: [],
		            axisTick: {
		            	show:false,
		                alignWithLabel: true
		            },
           			axisLine: {
						show: true,
		                lineStyle: {
		                    color: '#949494'
		                }
			           
			        },

		        }
		    ],
		    yAxis: [
		        {
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
		            
		        }
	        ],
		    series: [
		        {
		            //name: '直接访问',
		            type: 'bar',
		            barWidth: '20%',
					label: {
						//position:'top',
			            normal: {
			            	position: 'top',
					        show: true,
					        color: '#cdc9cb',
					        textBorderWidth: 2
					    }
					},	
		            data: [10, 52, 200, 334, 390, 330, 220],

		        },
		        {
		            //name: '直接访问',
		            type: 'line',
		            barWidth: '20%',
		            lineStyle: {
		            	type: 'dotted'
		            },
		            data: [10, 52, 200, 334, 390, 330, 220]
		        }
		    ]
		},

		daily_arrive_option: {
		    color: ['#feff03'],
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
		            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        },
		        formatter: "{b} : {c} "
		    },
		    grid: {
		        left: '-11%',
		        right: '0',
		        bottom: '10%',
		        top:'10%',
		        containLabel: true
		    },
		    xAxis: [
		        {
		            type: 'category',
		            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		            axisTick: {
		            	show:false,
		                alignWithLabel: true
		            },
		            axisLine: {
						show: false,
		                lineStyle: {
		                    color: '#eaeff4'
		                }  
			        },
			        axisLabel: {
			        	interval: 0,

			        }

		        }
		    ],
		    yAxis: [{
		        	show: false,
		            type: 'value'
		        }
	        ],
		    series: [
		        {
		            name: '',
		            type: 'bar',
		            barWidth: '30%',
		            data: [10, 52, 200, 334, 390, 330, 220],
					label: {
						//position:'top',
			            normal: {
			            	position: 'top',
					        show: true,
					        color: '#cdc9cb',
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


    

    },

    watch:{

    },
    mounted(){ 

    	this.get_weekly_visual()







      
      
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

      get_weekly_visual(){

	      	this.$http.post(`hydate/get_weekly_visual`,{
	      		startTime: this.weekStartDate.getTime().toString().substr(0,10),
	      		endTime: this.weekEndDate.getTime().toString().substr(0,10),
	      	})
  			.then((data)=>{
  				if(data.code == '200'){

  					this.onway_local_option.yAxis.data = []
  					this.onway_local_option.series[0].data = []

					this.onway_nonlocal_option.yAxis.data = []
  					this.onway_nonlocal_option.series[0].data = []

  					this.circle_one_option.legend.data = []
  					this.circle_one_option.series[0].data = []

  					this.circle_two_option.legend.data = []
  					this.circle_two_option.series[0].data = []
  					//data.data.local[1].supplyName = 2
					this.week_arrive_option.xAxis[0].data = []
					this.week_arrive_option.series[0].data = []

					this.week_arrive_option2.xAxis3D.data = []
					this.week_arrive_option2.series[0].data = []

					this.daily_arrive_option.xAxis[0].data = []
					this.daily_arrive_option.series[0].data = []

					this.supply_option.xAxis[0].data = []
					this.supply_option.series[0].data = []
					this.supply_option.series[1].data = []

  					let cqArr1 = []
  					let cqArr2 = []

  					let lastXdata1 = []
  					let lastSeries1 = []
  					let threeD = []
  					let lastXdata2 = []
  					let lastSeries2 = []
  					let lastAvgXdata1 = []
  					let lastAvgSeries1 = []
  					let lastAvgXdata2 = []
  					let lastAvgSeries2 = []

  					if (data.data.local && data.data.local.length) {
  						for(let i=0;i<data.data.local.length;i++){

  							//重要在途款（本地）

  							this.onway_local_option.yAxis.data.unshift(data.data.local[i].supplyName)
  							


  							//总在途数
  							if(data.data.local[i].supplyName!='合计'){

  								this.circle_one_option.legend.data.push(data.data.local[i].supplyName)
  								this.circle_one_option.series[0].data.push({name:data.data.local[i].supplyName, value:data.data.local[i].onWayDate})

  								cqArr1.push({name: data.data.local[i].supplyName, value: data.data.local[i].cqDay})


  								this.onway_local_option.series[0].data.unshift(data.data.local[i].imOnWay)

  								lastSeries1.push(data.data.local[i].lastWeekDate)

  								lastAvgSeries1.push(data.data.local[i].lastWeekDateAvg)

  								lastAvgXdata1.push(data.data.local[i].supplyName)

  								
  							}else {

  								this.onway_local_option.series[0].data.unshift({value: data.data.local[i].imOnWay, itemStyle: {color: '#ff6666',},  label: {position: 'inside'}})


  								this.circle_total1 = data.data.local[i].onWayDate

  								lastSeries1.push({value: data.data.local[i].lastWeekDate,itemStyle: {color: '#e16757'}})

  								lastAvgSeries1.push({value: data.data.local[i].lastWeekDateAvg,itemStyle: {color: '#e16757'}})

  								lastAvgXdata1.push('平均值')

  							}
  							

  							

  							lastXdata1.push(data.data.local[i].supplyName)
  							
  							threeD.push([data.data.local[i].supplyName,0.1,data.data.local[i].lastWeekDate])

  							
  							

  						}
  						
  					}




  					if (data.data.other && data.data.other.length) {
  						for(let i=0;i<data.data.other.length;i++){

  							//重要在途款（外地）
  							this.onway_nonlocal_option.yAxis.data.unshift(data.data.other[i].supplyName)
  							

  							//总在途数
  							if(data.data.other[i].supplyName!='合计'){
  								this.circle_two_option.legend.data.push(data.data.other[i].supplyName)
  								this.circle_two_option.series[0].data.push({name:data.data.other[i].supplyName, value:data.data.other[i].onWayDate})

  								cqArr2.push({name: data.data.other[i].supplyName, value: data.data.other[i].cqDay})

  								this.onway_nonlocal_option.series[0].data.unshift(data.data.other[i].imOnWay)

  								lastSeries2.push(data.data.other[i].lastWeekDate)

  								lastAvgSeries2.push(data.data.other[i].lastWeekDateAvg)

  								lastAvgXdata2.push(data.data.other[i].supplyName)
  							}else {

  								this.onway_nonlocal_option.series[0].data.unshift({value: data.data.other[i].imOnWay, itemStyle: {color: '#ff6666',}, label: {position: 'inside'}})


  								this.circle_total2 = data.data.other[i].onWayDate

  								lastSeries2.push({value: data.data.other[i].lastWeekDate,itemStyle: {color: '#e16757'}} )

  								lastAvgXdata2.push('平均值')

  								lastAvgSeries2.push({value: data.data.other[i].lastWeekDateAvg,itemStyle: {color: '#e16757'}} )

  							}
  							

  							

  							lastXdata2.push(data.data.other[i].supplyName)
  							

  							
  							

  						}
  					}


  					if(data.data.all && data.data.all.length) {
  						for(let i=0;i<data.data.all.length;i++) {
  							this.supply_option.xAxis[0].data.push(data.data.all[i].supplyName)

  							switch(this.select_type) {
  								case 1:
  									this.supply_option.series[0].data.push(data.data.all[i].lastWeekSdOrder);
  									this.supply_option.series[1].data.push(data.data.all[i].lastWeekSdOrder);
  									break;
  								case 2:
  									this.supply_option.series[0].data.push(data.data.all[i].lastWeekSdOrderAvg);
  									this.supply_option.series[1].data.push(data.data.all[i].lastWeekSdOrderAvg);
  									break;
  								case 3:
  									this.supply_option.series[0].data.push(data.data.all[i].lastWeekXkOrder);
  									this.supply_option.series[1].data.push(data.data.all[i].lastWeekXkOrder);
  									break;
  								case 4:
  									this.supply_option.series[0].data.push(data.data.all[i].lastWeekLkOrder);
  									this.supply_option.series[1].data.push(data.data.all[i].lastWeekLkOrder);
  									break;
  								case 5:
  									this.supply_option.series[0].data.push(data.data.all[i].lastWeekQxSum);
  									this.supply_option.series[1].data.push(data.data.all[i].lastWeekQxSum);
  									break;
  								default:
  								    this.supply_option.series[0].data = []
  								    this.supply_option.series[1].data = []
  							}
  							
  						}
  					}




  					if(this.supply_type == 1) {

  						this.cqDay_list = cqArr1

  						this.week_arrive_option.xAxis[0].data = lastXdata1
  						this.week_arrive_option.series[0].data = lastSeries1

						this.week_arrive_option2.xAxis3D.data = lastXdata1
  						this.week_arrive_option2.series[0].data = threeD

  						this.daily_arrive_option.xAxis[0].data = lastAvgXdata1
  						this.daily_arrive_option.series[0].data = lastAvgSeries1

  					} else {
						this.cqDay_list = cqArr2

  						this.week_arrive_option.xAxis[0].data = lastXdata2
  						this.week_arrive_option.series[0].data = lastSeries2

  						this.daily_arrive_option.xAxis[0].data = lastAvgXdata2
  						this.daily_arrive_option.series[0].data = lastAvgSeries2
  					}



	      			//重要在途款（本地）
	      	        if (onway_local_chart) {
	                    onway_local_chart.clear()
	                    onway_local_chart = null
	                }

		      	    this.$nextTick(()=>{


		                onway_local_chart = echarts.init(document.getElementById('left_one'));
		     
		    			onway_local_chart.setOption(this.onway_local_option)


		    		})



		    		//重要在途款（外地）

	      	        if (onway_nonlocal_chart) {
	                    onway_nonlocal_chart.clear()
	                    onway_nonlocal_chart = null
	                }

		      	    this.$nextTick(()=>{


		                onway_nonlocal_chart = echarts.init(document.getElementById('left_two'));
		     
		    			onway_nonlocal_chart.setOption(this.onway_nonlocal_option)


		    		})




		    		//总在途数（本地）

	      	        if (circle_one_chart) {
	                    circle_one_chart.clear()
	                    circle_one_chart = null
	                }

		      	    this.$nextTick(()=>{


		                circle_one_chart = echarts.init(document.getElementById('circle_one'));
		     
		    			circle_one_chart.setOption(this.circle_one_option)


		    		})






		    		//总在途数（外地）


	      	        if (circle_two_chart) {
	                    circle_two_chart.clear()
	                    circle_two_chart = null
	                }

		      	    this.$nextTick(()=>{


		                circle_two_chart = echarts.init(document.getElementById('circle_two'));
		     
		    			circle_two_chart.setOption(this.circle_two_option)


		    		})






		    		//上周到货数


	      	        if (week_arrive_chart) {
	                    week_arrive_chart.clear()
	                    week_arrive_chart = null
	                }

		      	    this.$nextTick(()=>{


		                week_arrive_chart = echarts.init(document.getElementById('last_week_arrive'));
		     
		    			week_arrive_chart.setOption(this.week_arrive_option)


		    		})







		    		//在途数


	      	        if (supply_chart) {
	                    supply_chart.clear()
	                    supply_chart = null
	                }

		      	    this.$nextTick(()=>{


		                supply_chart = echarts.init(document.getElementById('supply_wrap'));
		     
		    			supply_chart.setOption(this.supply_option)


		    		})





		    		//上周日均到货数


	      	        if (daily_arrive_chart) {
	                    daily_arrive_chart.clear()
	                    daily_arrive_chart = null
	                }

		      	    this.$nextTick(()=>{


		                daily_arrive_chart = echarts.init(document.getElementById('daily_arrive'));
		     
		    			daily_arrive_chart.setOption(this.daily_arrive_option)


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


	    formatDate(obj){
	        //var date =  new Date(obj*1000);
	        var y = obj.getFullYear();
	        var m = "0"+(obj.getMonth()+1);
	        var d = "0"+obj.getDate();
	        //var h = date.getHours();
	        //console.info(h)
	        return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
	        //return y+"-"+m.substring(m.length-2,m.length);
	    },



        format(){

    		let weekDate = this.getWeekStartAndEnd(this.time)

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

            return this.formatDate(weekStartDate)

        },

        // 获得某一周的结束日期

        getWeekEndDate(nowYear, nowMonth, nowDay, nowDayOfWeek) {

            let weekEndDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek))

            this.weekEndDate = weekEndDate

            return this.formatDate(weekEndDate)

        },






    },
  }
</script>
<style lang="less">

.hy_dataview{
	.el-input__inner{
		background-color:#07206900 !important;
		border:none !important;
		color:#2589e3 !important;
		padding-right:0px !important;
    }

    .el-range-input {
		background-color:#051759 !important;
		color:#a5a9b5 !important;

    }

    .el-range-separator{
    	color: #fff !important;
    	width: 15% !important;

    }

    .el-select-dropdown__list{
    	background-color:#354b87ba !important;
    }

    .datelist {


	    .el-input__inner{
			background-color:#07206900 !important;
			border:none !important;
			color:#7985e2 !important;
			padding-right:0px !important;
	    }

		.el-range-input {
			background-color:#051759 !important;
			color:#7985e2 !important;

	    }


	    .el-range-separator{
	    	color: #fff !important;
	    	width: 10% !important;

	    }
    }




}


</style>

<style>
	.yyj_input {
		background-color:#053291 !important;
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
		.hy_dataview {

		    font-size:0.9rem; 
		    position: relative;
		    width: 100%;
		    min-width: 1100px;
		    height: 98%;

		    .datelist {
		    	position: absolute;
		    	top: -50px;
		    }
		    .selecttype {
		    	right: 20px;
		    }


		    .signal_wrap {
		    	background: #354b877a;
			    border: 1px solid #575e73;
			    padding: 15px 10px 0 10px;
			    color: #fff;

			    .title {
			    	color: #fff;
			    	font-size: 1.1rem;
			    	margin-bottom: 5px;
			    }

			    .content_warp {
			    	height: calc(100% - 40px);
			    	
			    }

		    }

		    &_top {
		    	height: 59.5%;
		    	display: flex;


		    	.left {
		    		width: 25%;
		    		height: 100%;
		    	}

		    	.middle {
		    		width: 50%;
		    		height: 100%;
		    		margin: 0 0.5%;
		    		padding: 15px 20px;

		    		&_wrap {
		    			display: flex;
		    			height: 91%;


			    		.one {
			    			width: 50%;
			    			height: 100%;

			    			.circle_warp {
			    				height: 80%;
			    			}

			    		    .intro {
			    		    	padding-top: 20px;
			    		    	width: 220px;
			    		    	color: #ff9902;
			    		    	font-weight: 700;
			    		    	font-size: 1.5rem;
			    		    	margin: 0 auto;
			    		    	text-align: center;
			    		    }
			    		}
		    		}

		    	}

		    	.top_one {
		    		height: 40%;

		    		.days_warp {
		    			display: flex;
		    			flex-direction:column;
		    			justify-content:space-around;
		    			//align-items: center;

		    			.day_one {
		    				//height: 25px;
		    				text-align: center;
		    				font-weight: bold;

		    				.day_p {
		    					width: 40%;
		    					display: inline-block;
		    					text-align: center;
		    					font-size: 18px;
		    					color: #75c6f4;
		    				}
		    				.day_p1 {
		    					font-size: 16px;
		    				}
		    				.day_n {
		    					width: 40%;
		    					display: inline-block;
		    					text-align: center;
		    					font-size: 20px;
		    					color: #ffae35;
		    				}
		    				.day_n1 {
		    					font-size: 18px;
		    				}

		    			}
		    		}
		    	}

		    	.top_two {
		    		height: 59%;
		    		margin-top: 6px;
		    	}
		    }


		    &_bottom {
		    	height: 39%;
		    	margin-top: 1%;
		    	display: flex;
		    	//background-color:blue;


		    	.bottom_left {
		    		width: 75%;
		    		height: 100%;
		    		padding:20px;
		    	}


		    	.bottom_right {
		    		width: 25%;
		    		height: 100%;
		    		margin-left: 0.5%;
		    	}

		    }
		  
		}
	}
}
</style>
