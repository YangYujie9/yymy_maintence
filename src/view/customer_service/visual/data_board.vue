<template>
	<div class="cm_dataview" style="font-size:0.9rem;position: relative;width: 100%;min-width: 1100px;">
			<p style="position: absolute;top: -45px;" class="searchdate">

				<el-date-picker
			      v-model="search.date1"
			      type="daterange"
			      range-separator="--"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期"
			      :clearable=false
			      style="width: 300px;"
			      class="input_class datelist"
			      @change="show_compose_big_data">
			    </el-date-picker>
<!-- 			    <el-date-picker
			      v-model="search.start"
			      type="date"
			      placeholder="选择日期"
			      :clearable=false
			      class="input_class datelist"
			      style="width: 110px;"
			      @change="show_compose_big_data">
			    </el-date-picker><span style="color: #fff">--</span><el-date-picker
			      v-model="search.end"
			      type="date"
			      placeholder="选择日期"
			      :clearable=false
			      class="input_class datelist"
			      style="width: 110px;"
			      @change="show_compose_big_data">
			    </el-date-picker> -->
			</p>
		<div class="cm_dataview_top">
			<span class="cur_hori left_top"></span>
			<span class="cur_veri left_top"></span>

			<span class="cur_hori left_bottom"></span>
			<span class="cur_veri left_bottom"></span>

			<span class="cur_hori right_top"></span>
			<span class="cur_veri right_top"></span>

			<span class="cur_hori right_bottom"></span>
			<span class="cur_veri right_bottom"></span>


			<div class="top_detail">
				<p><span class="cellname"><i class="iconfont iconyifu top_icon"></i>总销量</span></p>
				<p><span class="cellvalue">{{total_data.payQtyTotal}}</span></p>
			</div>
			<div class="top_detail">
				<p><span class="cellname"><i class="iconfont iconjine top_icon"></i>销售额</span></p>
				<p><span class="cellvalue">{{total_data.paymentTotal}}</span></p>
			</div>
			<div class="top_detail">
				<p><span class="cellname"><i class="iconfont iconkafei top_icon"></i>总接待</span></p>
				<p><span class="cellvalue">{{total_data.receptionNumTotal}}</span></p>
			</div>
			<div class="top_detail">
				<p><span class="cellname"><i class="iconfont iconkefu top_icon"></i>总询单</span></p>
				<p><span class="cellvalue">{{total_data.enquiryNumTotal}}</span></p>
			</div>
			<div class="top_detail">
				<p style=""><span class="cellname"><i class="iconfont icon80 top_icon"></i>询单转化率</span></p>
				<p><span class="cellvalue">{{(total_data.percentConversion * 100).toFixed(2)}}%</span></p>
			</div>
		</div>
		<div class="warp">
			<div class="warp_left">
				<span class="cur_hori left_top"></span>
				<span class="cur_veri left_top"></span>

				<span class="cur_hori left_bottom"></span>
				<span class="cur_veri left_bottom"></span>

				<span class="cur_hori right_top"></span>
				<span class="cur_veri right_top"></span>

				<span class="cur_hori right_bottom"></span>
				<span class="cur_veri right_bottom"></span>

				<div class="warp_top">
					<div class="table_height"></div>
					<div class="top_div">
						<span class="title">数据统计</span>
						<p class="p_btn"><span>店铺：</span>
				          <el-cascader
				            :options="shop_list"
				            v-model="search.shopId"
				            placeholder="请选择"
				            :show-all-levels="false"
				            class="input_class"
				            clearable
				            :props="{ checkStrictly: true }"
				            @change="show_compose_big_data"
				            popper-class= "yyj_board_input">
				         
				          </el-cascader>

						</p>
					</div>

					<div class="warp_top_content">
						<div class="sale_warp sale_singal">
							<div class="left">
								<i class="iconfont iconjishiben icon_class" style="color:#8f62f5;"></i>
							</div>
							
							<div class="right">
								<p class="datavalue">{{group_data.payQtyShop}}</p>
								<p class="dataname">店铺销量</p>
							</div>

						</div>

						<div class="sale_warp sale_singal" style="margin-left: 20px;">
							<div class="left">
								<i class="iconfont icondengpao-tianchong icon_class"></i>
							</div>
							
							<div class="right">
								<p class="datavalue">{{group_data.paymentShop}}</p>
								<p class="dataname">店铺销售额</p>
							</div>

						</div>


						<div class="sale_warp sale_singal">
							<div class="left">
								<i class="iconfont iconshandian icon_class" style="color: #e1433b;"></i>
							</div>
							
							<div class="right">
								<p class="datavalue">{{group_data.enquiryNumShop}}</p>
								<p class="dataname">店铺询单</p>
							</div>

						</div>

						<div class="sale_warp sale_singal" style="margin-left: 20px;">
							<div class="left">
								<i class="iconfont iconshandian icon_class" style="color: #a3c948;"></i>
							</div>
							
							<div class="right">
								<p class="datavalue">{{(group_data.percentConversion * 100).toFixed(2)}}%</p>
								<p class="dataname">店铺转化率</p>
							</div>

						</div>

					</div>
				</div>



				<div class="warp_bottom">
					<div class="top_div">
						<span class="title">占比情况</span>
						<p class="p_btn">
				          <el-button-group>
				            <el-button  @click="choosetype(index)" type="text" v-for="(list,index) in choose_list" style="width: 40px;color: rgb(165, 169, 181)" :class="{btnchoose:list.choose}">{{list.label}}</el-button>
				            
				          </el-button-group>
						</p>
					</div>
					<div class="warp_left_content">
						<div class="zbleft" id="circle_one"></div>
						
						<div class="zbright" id="circle_two"></div>
					</div>
					<div class="table_height"></div>
				</div>

				
			</div>


			<div class="warp_right">

				<span class="cur_hori left_top"></span>
				<span class="cur_veri left_top"></span>

				<span class="cur_hori left_bottom"></span>
				<span class="cur_veri left_bottom"></span>

				<span class="cur_hori right_top"></span>
				<span class="cur_veri right_top"></span>

				<span class="cur_hori right_bottom"></span>
				<span class="cur_veri right_bottom"></span>

				<div class="warp_top">
					<div class="table_height"></div>
					<div class="top_div">
						<span class="title">团队销售数据</span>
						<p class="p_btn"><span>团队：</span>
							<el-select v-model="search.teamId" placeholder="请选择" class="input_class"  popper-class="yyj_board_input" style="width: 110px;" @change="show_compose_big_data_byteam" clearable>
							    <el-option
							      v-for="item in team_list"
							      :key="item.teamId"
							      :label="item.teamName"
							      :value="item.teamId">
							    </el-option>
							</el-select>
						</p>
					</div>

					<div class="warp_top_content right_top_content" style="justify-content:space-between;">
						<div class="right_cell sale_singal">
							<div class="left">
								<i class="iconfont icondengpao-tianchong icon_class"></i>
							</div>
							
							<div class="right">
								<p class="datavalue">{{team_data.composePayQty}}</p>
								<p class="dataname">客服销量</p>
							</div>

						</div>

						<div class="right_cell sale_singal" style="margin-left: 20px;">
							<div class="left">
								<i class="iconfont icondengpao-tianchong icon_class"></i>
							</div>
							
							<div class="right">
								<p class="datavalue">{{team_data.composePayment}}</p>
								<p class="dataname">客服销售额</p>
							</div>

						</div>


						<div class="right_cell sale_singal" style="margin-left: 20px;">
							<div class="left">
								<i class="iconfont icondengpao-tianchong icon_class"></i>
							</div>
							
							<div class="right">
								<p class="datavalue">{{team_data.guestPrice}}</p>
								<p class="dataname">客单价</p>
							</div>

						</div>

						<div class="right_cell sale_singal">
							<div class="left">
								<i class="iconfont iconshandian icon_class" style="color: #a3c948;"></i>
							</div>
							
							<div class="right">
								<p class="datavalue">{{team_data.enquiryNum}}</p>
								<p class="dataname">总询单</p>
							</div>

						</div>

						<div class="right_cell sale_singal" style="margin-left: 20px;">
							<div class="left">
								<i class="iconfont iconshandian icon_class" style="color: #a3c948;"></i>
							</div>
							
							<div class="right">
								<p class="datavalue">{{team_data.enquiryNumAvg}}</p>
								<p class="dataname">人均询单数</p>
							</div>

						</div>

						<div class="right_cell sale_singal" style="margin-left: 20px;">
							<div class="left">
								<i class="iconfont iconshandian icon_class" style="color: #a3c948;"></i>
							</div>
							
							<div class="right">
								<p class="datavalue">{{(team_data.percentConversion * 100).toFixed(2)}}%</p>
								<p class="dataname">团队转化率</p>
							</div>

						</div>

					</div>
				</div>




				<div class="warp_bottom right_bottom">
					<div class="right_bottom_left">
						<div class="top_div">
							<span class="title">转化趋势图</span>
							<p class="p_btn"><span>日期：</span>
								<el-date-picker
							      v-model="search.conversionDate"
							      type="daterange"
							      range-separator="--"
							      start-placeholder="开始日期"
							      end-placeholder="结束日期"
							      :clearable=false
							      style="width: 260px;"
							      class="input_class datelist"
							      @change="show_conversion_data">
							    </el-date-picker>							    

							</p>
						</div>
						<div class="right_bottom_left_content" id="conversion_trend"></div>
						<div class="table_height"></div>
					</div>
					<div class="right_bottom_right">
						<div class="top_div">
							<span class="title">成功率分析</span>
						</div>

						<div class="right_bottom_right_content">
							<div class="first_pic">
								<p  style="margin-bottom: 15px">接待数<span>{{team_data.receptionNum}}</span></p>

								<div class="wrapper">
									<p style="margin-top: 10px;font-weight: 400;"><span>{{(team_data.receptionToenquiry * 100).toFixed(0)}}%</span></p>
									<p style="position: absolute;font-weight: 200;font-size: 12px;left: -12px;bottom: -18px;">接待转询单率</p>
								</div>
							</div>

                           <div class="first_pic">
								<p style="margin-bottom: 15px">询单数<span>{{team_data.enquiryNum}}</span></p>

								<div class="wrapper wrapper2">
									<p style="margin-top: 10px;font-weight: 400;"><span>{{(team_data.enquiryToOrder * 100).toFixed(0)}}%</span></p>
									<p style="position: absolute;font-weight: 200;font-size: 12px;left: -12px;bottom: -18px;">询单转下单率</p>
								</div>
                            </div>

                            <div class="first_pic">
								<p style="margin-bottom: 15px">下单数<span>{{team_data.orderNum}}</span></p>

								<div class="wrapper wrapper3">
									<p style="margin-top: 10px;font-weight: 400;"><span>{{(team_data.enquiryToPay * 100).toFixed(0)}}%</span></p>
									<p style="position: absolute;font-weight: 200;font-size: 12px;left: -12px;bottom: -18px;">询单转付款率</p>
								</div>

								
                            </div>
                            <p style="">付款数<span>{{team_data.payNum}}</span></p>
						</div>
					</div>


<!-- 					<div class="top_div">
						<span class="title">数据统计</span>
						<p class="p_btn"><span>店铺：</span>
							<el-select v-model="shopId" placeholder="请选择" class="input_class">
							    <el-option
							      v-for="item in shop_list"
							      :key="item.shopId"
							      :label="item.shopName"
							      :value="item.shopId">
							    </el-option>
							</el-select>
						</p>
					</div> -->
				</div>

			</div>

        </div>
		
	
		
	</div>
	
</template>

<script>
import echarts from 'echarts'
import { mapGetters } from 'vuex'
var conversion_chart
var circle_one_chart
var circle_two_chart

  export default {
    name: "system-setting",
    data(){
      return{
      	search:{
      		date1:[new Date(new Date(new Date().toLocaleDateString()).getTime()-24*3600*1000*16),new Date(new Date(new Date().toLocaleDateString()).getTime()-24*3600*1000*2)],
      		conversionDate:[new Date(new Date(new Date().toLocaleDateString()).getTime()-24*3600*1000*16),new Date(new Date(new Date().toLocaleDateString()).getTime()-24*3600*1000*2)],
      		//start:new Date([new Date().getFullYear(),new Date().getMonth()+1,1].join('-')),
      		//end:new Date(new Date(new Date().toLocaleDateString()).getTime()-1),
      		shopId:'',
      		brandId:'',
      		teamId:'',
      		//starttime:new Date([new Date().getFullYear(),new Date().getMonth()+1,1].join('-')),
      		//endtime:new Date(new Date(new Date().toLocaleDateString()).getTime()-1),
      		orderOrSale:1,  //占比情况维度 1-销量 2-询单
      	},
      	
      	shop_list:[],
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
      	total_data:'',
      	group_data:'',
      	team_data:'',
      	choose_list:[{
      		value:1,
      		label:'销量',
      		choose:true
      	},{
      		value:2,
      		label:'询单',
      		choose:false
      	}],

      	conversion_option: {
                textStyle:{
					color:'#949494'
				},
			   

			    tooltip: {
			        trigger: 'axis',
			        axisPointer: {
			        	show:false,
			            type: 'none'
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
			    	show: false,
                    x: 'left',
                    y: 'bottom',
                    left: '5%',

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


			            data: []
			        }
			    ],

			    yAxis: {
			        type: 'value',
			        splitLine: {
		            	show: false,
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

		circle_one_option: {
			   color:['rgb(220, 176, 45)','rgb(97, 165, 232)','#e16757'],
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
			        bottom:'12%',
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
			   color:['rgb(220, 176, 45)','rgb(97, 165, 232)','#e16757'],
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
			        bottom:'12%',
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

    	//this.getshopzb()
    	//this.getqushi()
    	this.get_shop_bybrand()
    	this.show_compose_big_data()
    	this.show_conversion_data()








      
      
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

      getshopzb(){


        // 指定图表的配置项和数据

  			if (circle_one_chart) {
                circle_one_chart.clear()
                circle_one_chart = null
            }



       

            this.$nextTick(()=>{
                circle_one_chart = echarts.init(document.getElementById('circle_one'));
      			//other_wrap_chart = echarts.init(document.getElementById('other_wrap'))
    			circle_one_chart.setOption(this.circle_one_option)

                circle_two_chart = echarts.init(document.getElementById('circle_two'));
      			//other_wrap_chart = echarts.init(document.getElementById('other_wrap'))
    			circle_two_chart.setOption(this.circle_one_option)
			})
      },





      choosetype(index){
      	for(let i=0;i<this.choose_list.length;i++){
      		this.choose_list[i].choose = false
      	}
      	this.choose_list[index].choose = true
      	this.search.orderOrSale = this.choose_list[index].value
      	this.show_compose_big_data()
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


      changshop(){
      	console.info(this.shopId)
      },


      show_compose_big_data(){
      	let shop = ''
      	let brand = ''



      	if(this.search.shopId.length){
	        let shopId = this.search.shopId[this.search.shopId.length-1]
	        
	      	if(this.search.shopId.length == 1){
	      		brand = shopId
	      		shop = ''
	      	}else {
	      		brand = ''
	      		shop = shopId
	      	}
      	}


      	this.$http.post(`composeVisual/show_compose_big_data`,{
			start: this.search.date1[0].getTime().toString().substr(0,10),
			end: this.search.date1[1].getTime().toString().substr(0,10),
			brand: brand,
			shopId: shop,
			teamId: this.search.teamId,
			startTime:this.search.conversionDate[0].getTime().toString().substr(0,10),
			endTime: this.search.conversionDate[1].getTime().toString().substr(0,10),
			orderOrSale:this.search.orderOrSale,

      	})

        .then((data)=>{
          if(data.code == '200'){

		      	this.total_data = data.data.composeTotalVO
		      	this.group_data = data.data.dataStatisticsVO
		      	this.team_data = data.data.teamDataVO

		      	this.circle_one_option.legend.data = []
		      	this.circle_one_option.series[0].data = []
		      	this.circle_two_option.legend.data = []
		      	this.circle_two_option.series[0].data = []
		        // this.conversion_option.xAxis[0].data = []
		        // this.conversion_option.series = []

		      	//占比情况

		      	for(let i=0;i<data.data.dataStatisticsVO.brandRateVOList.length;i++){

			      	if(this.search.orderOrSale == 1){
			      		this.circle_one_option.legend.data.push(data.data.dataStatisticsVO.brandRateVOList[i].brandName)

	                    this.circle_one_option.series[0].data.push({value:data.data.dataStatisticsVO.brandRateVOList[i].payQty,name:data.data.dataStatisticsVO.brandRateVOList[i].brandName})
			      	} else if(this.search.orderOrSale == 2){
			      		this.circle_one_option.legend.data.push(data.data.dataStatisticsVO.brandRateVOList[i].brandName)

	                    this.circle_one_option.series[0].data.push({value:data.data.dataStatisticsVO.brandRateVOList[i].enquiryNum,name:data.data.dataStatisticsVO.brandRateVOList[i].brandName})
			      	}


		      	}

		      	for(let i=0;i<data.data.dataStatisticsVO.teamRateVOList.length;i++){

			      	if(this.search.orderOrSale == 1){
			      		this.circle_two_option.legend.data.push(data.data.dataStatisticsVO.teamRateVOList[i].groupName)

	                    this.circle_two_option.series[0].data.push({value:data.data.dataStatisticsVO.teamRateVOList[i].payQty,name:data.data.dataStatisticsVO.teamRateVOList[i].groupName})
			      	} else if(this.search.orderOrSale == 2){
			      		this.circle_two_option.legend.data.push(data.data.dataStatisticsVO.teamRateVOList[i].groupName)

	                    this.circle_two_option.series[0].data.push({value:data.data.dataStatisticsVO.teamRateVOList[i].enquiryNum,name:data.data.dataStatisticsVO.teamRateVOList[i].groupName})
			      	}


		      	}


		     //  	//趋势图

		     //  	if(data.data.teamDataVO.list && data.data.teamDataVO.list.length){
			    //   	let days = Number((((this.search.conversionDate[1].getTime() - this.search.conversionDate[0].getTime())/(24 * 3600 *1000)) + 1).toFixed())




			    //   	for(let i=0;i<days;i++){

			    //   		let date = new Date(this.search.conversionDate[0].getTime() + 24 * 3600 * 1000 * i)


			    //   		let y = date.getFullYear()
			    //   		let m = "0" + (date.getMonth() + 1)
			    //   		let d = "0" + (date.getDate())

			    //   		this.conversion_option.xAxis[0].data.push(m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length))

			    //   	}

			    //   	this.conversion_option.series.push({
				   //  	type: 'line',
				   //      name:'转化率',
			    //         //yAxisIndex: 2,#ff9933
			    //         itemStyle:{
			    //     	  color:'rgb(97, 165, 232)',
			    //         },
			    //         data:new Array(days).fill(0)
			            
			    //     })

	  				// let year = this.search.conversionDate[0].getFullYear()

		    	// 	let month = this.search.conversionDate[0].getMonth()

		    	// 	let day = this.search.conversionDate[0].getDate()

			    //     let startdate = new Date(year,month,day,0,0,0).getTime()/1000

			    //   	for(let i=0;i<data.data.teamDataVO.list.length;i++){

			    //   		let cha = (data.data.teamDataVO.list[i].data - startdate)/24/3600

			    //   		this.conversion_option.series[0].data[cha] = data.data.teamDataVO.list[i].percentConversion

			    //   	}
		     //  	}




		      	

		      	//console.info(this.circle_one_option)

                if (circle_one_chart) {
                    circle_one_chart.clear()
                    circle_one_chart = null
                }

                if (circle_two_chart) {
                    circle_two_chart.clear()
                    circle_two_chart = null
                }

                // if (conversion_chart) {
                //     conversion_chart.clear()
                //     conversion_chart = null
                // }

            this.$nextTick(()=>{
                circle_one_chart = echarts.init(document.getElementById('circle_one'));
      			
    			circle_one_chart.setOption(this.circle_one_option)

                circle_two_chart = echarts.init(document.getElementById('circle_two'));
      			
    			circle_two_chart.setOption(this.circle_two_option)

	   //          conversion_chart = echarts.init(document.getElementById('conversion_trend'));
	  			
				// conversion_chart.setOption(this.conversion_option)
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
      show_compose_big_data_byteam(){
      	let shop = ''
      	let brand = ''



      	if(this.search.shopId.length){
	        let shopId = this.search.shopId[this.search.shopId.length-1]
	        
	      	if(this.search.shopId.length == 1){
	      		brand = shopId
	      		shop = ''
	      	}else {
	      		brand = ''
	      		shop = shopId
	      	}
      	}


      	this.$http.post(`composeVisual/show_compose_big_data`,{
			start: this.search.date1[0].getTime().toString().substr(0,10),
			end: this.search.date1[1].getTime().toString().substr(0,10),
			brand: brand,
			shopId: shop,
			teamId: this.search.teamId,
			startTime:this.search.conversionDate[0].getTime().toString().substr(0,10),
			endTime: this.search.conversionDate[1].getTime().toString().substr(0,10),
			orderOrSale:this.search.orderOrSale,

      	})

        .then((data)=>{
          if(data.code == '200'){

		      	this.total_data = data.data.composeTotalVO
		      	this.group_data = data.data.dataStatisticsVO
		      	this.team_data = data.data.teamDataVO

		      	




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

  	show_conversion_data(){
      	let shop = ''
      	let brand = ''



      	if(this.search.shopId.length){
	        let shopId = this.search.shopId[this.search.shopId.length-1]
	        
	      	if(this.search.shopId.length == 1){
	      		brand = shopId
	      		shop = ''
	      	}else {
	      		brand = ''
	      		shop = shopId
	      	}
      	}


      	this.$http.post(`composeVisual/show_compose_big_data`,{
			start: this.search.date1[0].getTime().toString().substr(0,10),
			end: this.search.date1[1].getTime().toString().substr(0,10),
			brand: brand,
			shopId: shop,
			teamId: this.search.teamId,
			startTime:this.search.conversionDate[0].getTime().toString().substr(0,10),
			endTime: this.search.conversionDate[1].getTime().toString().substr(0,10),
			orderOrSale:this.search.orderOrSale,

      	})

        .then((data)=>{
          if(data.code == '200'){


		        this.conversion_option.xAxis[0].data = []
		        this.conversion_option.series = []





		      	//趋势图

		      	if(data.data.teamDataVO.list && data.data.teamDataVO.list.length){
			      	let days = Number((((this.search.conversionDate[1].getTime() - this.search.conversionDate[0].getTime())/(24 * 3600 *1000)) + 1).toFixed())




			      	for(let i=0;i<days;i++){

			      		let date = new Date(this.search.conversionDate[0].getTime() + 24 * 3600 * 1000 * i)


			      		let y = date.getFullYear()
			      		let m = "0" + (date.getMonth() + 1)
			      		let d = "0" + (date.getDate())

			      		this.conversion_option.xAxis[0].data.push(m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length))

			      	}

			      	this.conversion_option.series.push({
				    	type: 'line',
				        name:'转化率',
			            //yAxisIndex: 2,#ff9933
			            itemStyle:{
			        	  color:'rgb(97, 165, 232)',
			            },
			            data:new Array(days).fill(0)
			            
			        })

	  				let year = this.search.conversionDate[0].getFullYear()

		    		let month = this.search.conversionDate[0].getMonth()

		    		let day = this.search.conversionDate[0].getDate()

			        let startdate = new Date(year,month,day,0,0,0).getTime()/1000

			      	for(let i=0;i<data.data.teamDataVO.list.length;i++){

			      		let cha = (data.data.teamDataVO.list[i].data - startdate)/24/3600

			      		this.conversion_option.series[0].data[cha] = data.data.teamDataVO.list[i].percentConversion

			      	}
		      	}




		      	



                if (conversion_chart) {
                    conversion_chart.clear()
                    conversion_chart = null
                }

            this.$nextTick(()=>{

	            conversion_chart = echarts.init(document.getElementById('conversion_trend'));
	  			
				conversion_chart.setOption(this.conversion_option)
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





    },
  }
</script>
<style lang="less">

.cm_dataview{
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
    	color: #fff !important;
    	width: 15% !important;

    }

    .el-select-dropdown{
    	background-color:#182348 !important;
    }

    .searchdate {


	    .el-input__inner{
			background-color:#262f50 !important;
			border:none !important;
			color:#7985e2 !important;
			padding-right:0px !important;
	    }

		.el-range-input {
			background-color:#262f50 !important;
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
	.yyj_board_input {
		background-color:#182348 !important;
	}

	


	.yyj_board_input .el-select-dropdown__item:hover {
		background-color:#2a79cb;
	}

	.yyj_board_input .el-select-dropdown__item.hover {
		background-color:#2a79cb;
	}

	.yyj_board_input .el-select-dropdown__item{
		color: #fff;
	}

	.yyj_board_input .el-cascader-node:not(.is-disabled):hover	{
		background-color:#2a79cb !important;
	
	}
	.yyj_board_input .el-cascader-node:not(.is-disabled):focus	{
		background-color:#2a79cb !important;
	
	}

	.yyj_board_input .el-cascader-menu{
		color: #fff;
	}
, .el-select-dropdown__item:hover
</style>



<style scoped lang="less">

.cm_dataview {

    font-size:0.9rem; 
    position: relative;
    width: 100%;
    min-width: 1100px;

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






    .top_div{

    	height: 40px;
    	line-height: 40px;
    	padding: 0 20px;
    	position:relative;

        .title{
	    	font-size: 1.3rem;
	    	color: #fff;
	    }

	    .p_btn{
	    	display: inline-block;
	    	position:absolute;
	    	right: 20px;
	    	color:#a5a9b5;

	    	.input_class{
	    		width: 80px;
	    		background-color:#182348 !important;
	    	}
	    }
    }


    .sale_singal{
    	display: flex;
    	align-items: center;

    	.dataname {
			font-size: 0.8rem;
    	}

    	.datavalue {
    		font-size: 1.2rem;
    	}
    	 

    	.left{
    		width: 40px;

    		.icon_class{
    			font-size: 1.5rem;
    			color: #ea9502;
    		}
    	}
    	.right{
    		flex:1;
    	}

    	p{
    		font-size: 0.97rem;
    		font-weight: 550;
    		color: #fff;
    		line-height: 2;
    	}
    }


    &_top{
    	height: 110px;
        position:relative;
    	width: 100%;
    	//background-color:#0d1738;
    	background-color:#182348;
    	display: flex;
    	justify-content:space-around;
    	padding:0 30px;
    	//align-items: center;

    	.top_detail{
    		height: 100%;
    		width: 15%;
    		display: flex;
    		flex-wrap: wrap;
    		align-items: center;
    		align-content:center;
    		justify-content:center;
    		position:relative;

    		p{
    			width: 80%;
    			line-height: 2;
    			position:relative;
    			text-align: center;

    			.cellname{
    				font-size: 18px;
    				font-weight: 500;
    				color: rgb(21, 170, 255);
    				position:relative;
    			}
    			.cellvalue{
    				font-weight: 600;
    				font-size: 20px;
    				color: rgb(255, 153, 0);
    			}


	    		.top_icon{
	    			font-size: 20px;
	    			color: #dbd009;
	    			position:absolute;
	    			left: -30px;
	    		}
    		}


    	}

    }





 .warp{
	display: flex;
	margin-top: 20px;
	height: calc(100vh - 300px);
	//background-color:red;



	.btnchoose{
		color: rgb(37, 137, 227) !important;
	}


    &_left{

      height: 100%;
      width: 36%;
      min-width: 450px;
      //background-color:#0d1738;
      background-color:#182348;
      position:relative;

  	    .sale_warp{
      		width: 35%;
      		//background-color:red;

      	}


        &_content{
      		height: calc(100% - 60px);
      		//background-color:red;
      		padding:10px;
      		display: flex;
      		justify-content:space-around;
      		align-items:center;



      		.zbleft{
      			width: 50%;
      			//background-color:red;
      			height: 100%;


      		}


      		.zbright{
      			width: 50%;
      			height: 100%;
      			//background-color:red;
      		}
      	}
    }

      .warp_top{
      	height: 40%;
      	

      	.warp_top_content{
	      	//background-color:blue;
	      	height: calc(100% - 70px);
	      	//height: 100%;
	      	//width: 100%;
	      	margin:0 20px 20px 30px;
	      	display: flex;
	      	flex-wrap: wrap;
	      	justify-content:space-around;
              
            padding: 10px;




	    }
      }

      .warp_bottom{
      	height: 60%;
      	//background-color:red;


      }






    &_right{
      margin-left: 20px;
      height: 100%;
      width: 63%;
      //background-color:#0d1738;
      background-color:#182348;
      position:relative;

      .right_top_content{


      	padding-left: 10% !important;
      	padding-right: 5% !important;



      	  .right_cell{
	      	width: 25%;
	      	//text-align: center;
	      }

      }


      .right_bottom{
      	display: flex;


	      &_left{
	      	width: 70%;
	      	height: 100%;


	      	&_content{
	      		padding:10px;
	      		height: calc(100% - 60px);
	      		//background-color:red;
	      	}


	      	

	      }

	      &_right{
	      	width: 30%;
	      	height: 100%;

	      	&_content{
	      	    padding:10px;
	      		height: calc(100% - 60px);
	      		text-align:center;
	      		color:#fff;
	      		//font-size: 14px;
	      		font-weight: 600;
	      		



                .first_pic{
                	display: flex;
		      		flex-direction:column;
		      		//justify-content:center;
		      		align-items:center;
		      		height: 32%;
		      		overflow: hidden;



			    .wrapper{
			      width: 60px;
			      height: 28%;
			      background: rgb(220, 176, 45);
			      position: relative;
			    
				    &::before{
				      content: '';
				      position: absolute;

				      border-left: 70px solid transparent;
				      border-right: 70px solid transparent;
				      border-top: 36px solid rgb(220, 176, 45);
				      //border-bottom: 28px solid #abcdef;
				      top: 100%;
				      left:-38px;


				    }
			    }

			    .wrapper2{
			    	background: rgb(97, 165, 232);

			    	&::before{
			    		border-top: 36px solid rgb(97, 165, 232);
			    	}
			    }

			    .wrapper3{
			    	background: #e16757;

			    	&::before{
			    		border-top: 36px solid #e16757;
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
