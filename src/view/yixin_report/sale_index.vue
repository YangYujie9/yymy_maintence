<template>
  <div class="sale_index">
  	<div class="wrap_white">
  		<div class="wrap_white-top">
  			<div class="wrap_white-top-title">
  				<span style="font-size: 24px;line-height: 40px">整体趋势</span>
  				<div class="wrap_white-top-title-right">
  					
					

					<el-select v-model="search.shopIds" multiple
    collapse-tags placeholder="请选择">
					    <el-option
					      v-for="item in shop_brand"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
  					<el-date-picker
				      v-model="search.start"
				      type="daterange"
				      :clearable="false"
				      style="width: 380px"
				      align="left"
				      unlink-panels
				      range-separator="至"
				      start-placeholder="开始日期"
				      end-placeholder="结束日期"
				      :picker-options="pickerOptions">
				    </el-date-picker>

				    <el-button @click="searchall" class="monbtn">搜索</el-button>
				    <el-button @click="searchclear" type="primary">重置</el-button>
  				</div>
  			</div>
  			<!--<div class="wrap_white-top-middle">
  				<div style="display: inline-block;" class="el-checkbox-group">

		          <label class="el-checkbox-button el-checkbox-button--small">
		            <span  style="padding: 10px 18px;font-size: 16px;"  class="el-checkbox-button__inner">777</span>
		          </label>
		          <label class="el-checkbox-button el-checkbox-button--small">
		            <span  style="padding: 10px 16px;font-size: 16px;" class="el-checkbox-button__inner">777</span>
		          </label>
		        
		        </div>
  			</div>-->
  			<div  id="charts_dev" class="wrap_white-top-bottom">
  			</div>
  		</div>

  		<div class="wrap_white-bottom">
  			<div class="wrap_white-bottom-top">
  				<div class="wrap_white-bottom-top-title">
	  				<span style="font-size: 24px;line-height: 40px">累计汇总</span>
	  				<div class="wrap_white-bottom-top-title-right">
	  					{{fmtDateftm(this.search.start[0].getTime())}}--{{fmtDateftm(this.search.start[1].getTime())}}
	  					<span class="pointer" @click="$emit('pagechange','/sale_report/yixin_sale_detail')" style="padding-left: 20px">查看明细</span>

	  					<el-button @click="dialogVisible_sort = true" style="position: absolute;right: 0px;" class="monbtn">筛选查询</el-button>
	  				</div>
	  			</div>
  			</div>
  			<div v-if="!dialogVisible_sort" class="wrap_white-bottom-bottom">
  				<el-table
				    :data="tableData"
				    height="500"
				    border
				    v-if="index_show"
				    :header-cell-style='{"background": "#3f3f3f",
	    		"border-right": "1px solid #cecece",
	    		"color": "#ffffff"}'
				    style="width: 100%;">
				    <el-table-column
				      prop="date"
				      label="店铺" 
				      
				      fixed
				      width="60"
				      align="center">
				      	<template slot-scope="scope">
			              {{scope.row.shopName}}
                          
			            </template>
				    </el-table-column>


				     <el-table-column 
						    v-for="(value) in choose_sort_list"
						    :width="value.width"
						    align="center"
						    v-if="value.show"

						    :prop="value.enname"  >
			            <template slot="header"  slot-scope="scope">

			              <span @click="sort_name(value,value.enname)" class="pointer">{{value.chinesename}}</span>
			            </template>
			            <template slot-scope="scope">
			              {{scope.row[value.enname]}}
                          
			            </template>
					</el-table-column>
				    
				    
				</el-table>
  			</div>
  		</div>

  	</div>

  	<el-dialog
	  title="筛选查询"
	  :visible.sync="dialogVisible_sort"
	  width="1100px"
	  >
	  <div  class="tag_choose">
	  	<div style="flex: 1">
	  		<draggable v-model="choose_sort_list">
		  		<p v-for="(value, index) in choose_sort_list"  class="p_wrap" >
		  			<span @click="value.show = !value.show" :class="{'span_wrap_success': value.show}" class="span_wrap pointer">{{value.chinesename}}</span>
		  		</p>
		  	</draggable>
	  		
	  		

	  	</div>
	  </div>
	  <span slot="footer" class="dialog-footer">
	  	<el-button @click="edit_sell_column">保 存</el-button>
	    <el-button @click="dialogVisible_sort = false">关 闭</el-button>


	  </span>
	</el-dialog>
  </div>
</template>

<script>
import echarts from 'echarts'
var myChart 
import { mapGetters } from 'vuex'
import draggable from 'vuedraggable'

export default {
  	name: '',
  	components: {
        draggable,
    },
  	data(){
	    return{
	    	index_show: false,
	    	index_change: true,
	    	dialogVisible_sort: false,
	    	props: { multiple: true },
	        tableData: [],
	        shop_brand: [],
	        dataa_index: {
	        	cost: {
	        		name: '直通车费用',
	        		choose: true,
	        		choosetwo: true,
	        		width: 100,
	        		sort: true
	        	},
	          	costTotal: {
		            name: '费用合计',
		            choose: true,
		            choosetwo: true,
		            width: 110,
		            sort: true
	          	},
	        	brillCost: {
	        		name: '钻展花费',
	        		choose: true,
	        		choosetwo: true,
	        		width: 100,
	        		sort: true
	        	},
	        	superRecommend: {
	        		name: '超级推荐',
	        		choose: true,
	        		choosetwo: true,
	        		width: '',
	        		sort: true
	        	},
	        	walfareCost: {
	        		name: '福利费用',
	        		choose: true,
	        		width: 90,
	        		sort: true
	        	},
	        	dailyPromotionBudget: {
	        		name: '当日推广预算',
	        		choose: true,
	        		choosetwo: true,
	        		width: 120,
	        		sort: true
	        	},
	        	uv: {
	        		name: '总UV',
	        		choose: true,
	        		choosetwo: true,
	        		width: 100,
	        		sort: true
	        	},
	        	pv: {
	        		name: '总PV',
	        		choose: true,
	        		choosetwo: true,
	        		width: 100,
	        		sort: true
	        	},
	        	itemfavorQty: {
	        		name: '总加购数',
	        		choose: true,
	        		choosetwo: true,
	        		width: 80,
	        		sort: true
	        	},
	        	payQty: {
	        		name: '总销量',
	        		choose: true,
	        		choosetwo: true,
	        		width: 100,
	        		sort: true
	        	},
	        	payment: {
	        		name: '总销售额',
	        		choose: true,
	        		choosetwo: true,
	        		width: 120,
	        		sort: true
	        	},
	        	payBuyerQty: {
	        		name: '总订单笔数',
	        		choose: true,
	        		choosetwo: true,
	        		width: 90,
	        		sort: true
	        	},
	        	conversionRate: {
	        		name: '付款转化率',
	        		choose: true,
	        		choosetwo: true,
	        		width: 90,
	        		sort: true
	        	},
	        	customerPrice: {
	        		name: '客单价',
	        		choose: true,
	        		choosetwo: true,
	        		width: 80,
	        		sort: true
	        	},
	        	
	        	onePrice: {
	        		name: '件单价', 
	        		choose: true,
	        		choosetwo: true,
	        		width: 80,
	        		sort: true
	        	},
	        	roi: {
	        		name: 'ROI',
	        		choose: true,
	        		choosetwo: true,
	        		width: 80,
	        		sort: true
	        	},
	        	apr: {
	        		name: '连带率',
	        		choose: true,
	        		choosetwo: true,
	        		width: 80,
	        		sort: true
	        	},
	        	browseDepth: {
	        		name: '浏览深度',
	        		choose: true,
	        		choosetwo: true,
	        		width: 80,
	        		sort: true
	        	},
	        	
	        	uvValue: {
	        		name: 'UV价值',
	        		choose: true,
	        		choosetwo: true,
	        		width: 80,
	        		sort: true
	        	},
	          	tmWarePrice: {
		            name: '天猫福利扣点',
		            choose: true,
		            choosetwo: true,
		            width: '',
	        		sort: true 
		        },
		        freeUv: {
		        	name: '免费UV',
		            choose: true,
		            choosetwo: true,
		            width: 80,
	        		sort: true
		        }
	        },
	        option: {
			    title: {
			        text: '折线图堆叠',
			        show: false
			        
			    },
			    tooltip: {
			        trigger: 'axis',
			        formatter: function (params) {

			        	let str = `${params[0].axisValue}`

			        	

			        	for (let i=0;i<params.length;i++) {
			        		str+=`<br/>${params[i].marker}${params[i].seriesName}:&nbsp;${params[i].data.tip}`
			        	}

					            
			            return str
			        }
			    },
			    legend: {
			        data:[]
			    },
			    grid: {
			        left: '0%',
			        right: '4%',
			        bottom: '0%',
			        containLabel: true
			    },
			    xAxis: {
			        type: 'category',
			        boundaryGap: false,
			        data: []
			    },
			    yAxis: {
			        type: 'value',
			        show: false
			    },
			    series: [
			       
			        
			    ]
			},
	       	search: {
	       		shopIds: [],
	       		start: [
	       			new Date(new Date().getTime() - 3600 * 1000 * 24 * 15),
	       			new Date(new Date().getTime())
	       		],
	       	},
	       	totalshops: [],
	       	datashop: [],
	       	pickerOptions: {
		        shortcuts: [{
		            text: '最近7天',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
		              picker.$emit('pick', [start, end]);
		            }
		        }, {
		            text: '最近15天',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime() - 3600 * 1000 * 24 * 15);
		              picker.$emit('pick', [start, end]);
		            }
		        }, {
		            text: '最近一个月',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
		              picker.$emit('pick', [start, end]);
		            }
		        }]
        	}, 

        	brandId: '',
        	obj_total: {},
        	table_data: [],
        	choose_sort_list: [],
        	choose_dataa_compare: {
         		'直通车费用': {
         			enname: 'cost',
         			width: 100
         		},
         		'费用合计': {
         			enname: 'costTotal',
         			width: 100
         		},
         		'福利费用': {
         			enname: 'walfareCost',
         			width: 100
         		},
         		'当日推广预算': {
         			enname: 'dailyPromotionBudget',
         			width: 100
         		},
         		'总UV': {
         			enname: 'uv',
         			width: 100
         		},
         		'总加购数': {
         			enname: 'itemfavorQty',
         			width: 100
         		},
         		'总销量': {
         			enname: 'payQty',
         			width: 100
         		},
         		'总销售额': {
         			enname: 'payment',
         			width: 100
         		},
         		'付款转化率': {
         			enname: 'conversionRate',
         			width: 100
         		},
         		'客单价': {
         			enname: 'customerPrice',
         			width: 100
         		},
         		'件单价': {
         			enname: 'onePrice',
         			width: 100
         		},
         		'ROI': {
         			enname: 'roi',
         			width: 100
         		},
         		'钻展花费': {
         			enname: 'brillCost',
         			width: 100
         		},
         		'超级推荐': {
         			enname: 'superRecommend',
         			width: 100
         		},
         		'总PV': {
         			enname: 'pv',
         			width: 100
         		},
         		'总订单数': {
         			enname: 'payBuyerQty',
         			width: 100
         		},
         		'连带率': {
         			enname: 'apr',
         			width: 100
         		},
         		'浏览深度': {
         			enname: 'browseDepth',
         			width: 100
         		},
         		'天猫福利扣点': {
         			enname: 'tmWarePrice',
         			width: 100
         		},
         		'UV价值': {
         			enname: 'uvValue',
         			width: 100
         		},
         		'免费UV': {
         			enname: 'freeUv',
         			width: 100
         		},
         	},
	    }
    },
    computed: {
    	...mapGetters([
            'getpageDict',
        ]),
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
                return list.dicType == "sell_column"
            })




            return demand_status[0].dicList
    	},
    },
    mounted() {
    	
    	
    	
    	this.brandId = ''


    	//初彤报表查看
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

    	
    	this.find_sell_column()

    	
    	

    	
    },
    methods: {
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
    	edit_sell_column() {

    		for (let i=0; i<this.choose_sort_list.length;i++) {
    			this.choose_sort_list[i].proprity = i+1	
    		}
    		this.$http.post(`yx_sell/edit_sell_column`,{
    			list: this.choose_sort_list
    		})
            .then((data)=>{
            	//console.info(data)
            	this.$message({
                  message: data.msg,
                  type: 'info'
                })





            	this.dialogVisible_sort = false

            	this.sell_total()
               
            })
            .catch(()=>{
                this.$message({
                  message: '接口报错',
                  type: 'error'
                })
            })
    	},
    	find_sell_column() {
    		this.$http.get(`yx_sell/find_sell_column`)
                .then((data)=>{


                	for (let i=0;i<data.data.length;i++) {
                		
                		let chinesename = this.get_driver_name(data.data[i].columnId)
                		data.data[i].chinesename = chinesename


                		data.data[i].width = this.choose_dataa_compare[chinesename].width
                		data.data[i].enname = this.choose_dataa_compare[chinesename].enname

                		



                	}



                	this.choose_sort_list = data.data

                	this.$nextTick(()=>{
	                    this.index_show = true
	                })


                })
    	},
    	sort_name(name,key) {



    		name.sort = !name.sort

    		if (name.sort) {
    			this.table_data.sort(function(a,b){
					return b[key] - a[key]
				})
    		} else {
    			this.table_data.sort(function(a,b){
					return a[key] - b[key]
				})
    		}
    		this.tableData = []

    		for (let i=0;i<this.table_data.length;i++) {
            	this.tableData.push(this.table_data[i])
            }




                //this.tableData = this.table_data
           	this.tableData.push(this.obj_total)

            //this.tableData.push(this.obj_total)


    		

    	},
    	get_shop_by_brand() {
    		this.$http.get(`yx_shop/show_shop`)
	          .then((data)=>{
	              //this.tableData = data.data
	              //console.info(data.data[0])


	              let arr = []

	              for (let i=0; i<data.data.length; i++) {

	              	arr.push({
	              		value: data.data[i].id,
	              		label: data.data[i].shopNum,
	              	})


	              	this.totalshops.push(data.data[i].id)
	              }



	              this.shop_brand = arr

	              this.get_sell_pic()

	              this.sell_total()


	              

	          })
	          .catch(()=>{
	              this.$message({
	                message: '接口报错',
	                type: 'error'
	              })
	          })
    	},
    	searchall() {
    		this.get_sell_pic()
    		this.sell_total()
    	},
    	searchclear() {
    		//console.info(this.search)
    		this.search.shopIds = []
    		this.get_sell_pic()
    		this.sell_total()
    	},
    	sell_total() {



    		this.index_show = false
    		this.$http.post('yx_sell/sell_total',{
                start: this.search.start[0].getTime().toString().substr(0, 10),
                end: this.search.start[1].getTime().toString().substr(0, 10),
                shopIds: this.search.shopIds.length ? this.search.shopIds.join(',') : this.totalshops.join(','),

              })
             .then((data)=>{
                

                this.obj_total =  data.data[data.data.length - 1]

                this.table_data = []
                this.tableData = []
                
                for (let i=0;i<data.data.length-1;i++) {
                	this.table_data.push(data.data[i])
                }

                for (let i=0;i<this.table_data.length;i++) {
                	this.tableData.push(this.table_data[i])
                }




                //this.tableData = this.table_data
                this.tableData.push(this.obj_total)

                this.$nextTick(()=>{
                    this.index_show = true
                })


                //this.table_data = data.data[data.data.length - 1]

                  
              })
             .catch(()=>{
	            this.$message({
	              message: '接口报错',
	              type: 'error'
	            })
	       	})
    	},
    	
    	fmtDateftm(obj){
          var date =  new Date(obj);

          var y = 1900+date.getYear();
          var m = "0"+(date.getMonth()+1);
          var d = "0"+date.getDate();
          return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
      	},
    	fmtDate(obj){
          var date =  new Date(obj*1000);

          var y = 1900+date.getYear();
          var m = "0"+(date.getMonth()+1);
          var d = "0"+date.getDate();
          return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
      	},
    	get_sell_pic() {

    		

    		
		
    		this.$http.post('yx_sell/get_sell_pic',{
                start: this.search.start[0].getTime().toString().substr(0, 10),
                end: this.search.start[1].getTime().toString().substr(0, 10),
                shopIds: this.search.shopIds.length ? this.search.shopIds.join(',') : this.totalshops.join(','),
              })
             .then((data)=>{
             	/*
             	aPR: aPR
				browseDepth: 1.5134
				conversionRate: 付款转化率
				customerPrice: 客单价
				date: 1567008000
				itemfavorQty: 总加购数
				onePrice: 件单价
				payBuyerQty: 总订单笔数
				payQty: c
				payment: 总销售额
				rOI: 0.272234
				uvValue: 0.574109
             	*/
             	let dataa={
             		
             		'费用合计': 'costTotal',
             		'直通车费用': 'cost',
             		'福利费用': 'walfareCost',
             		'当日推广预算': 'dailyPromotionBudget',
             		'总UV': 'uv',
             		'总加购数': 'itemfavorQty',
             		'总销售量': 'payQty',
             		'总销售额': 'payment',
             		'付款转化率': 'conversionRate',
             		'客单价': 'customerPrice',
             		'件单价': 'onePrice',
             		'ROI': 'roi',
             		'钻展花费': 'brillCost',
             		'超级推荐': 'superRecommend',
             		'总PV': 'pv',
             		'总订单笔数': 'payBuyerQty',
             		'连带率': 'apr',
             		'浏览深度': 'browseDepth',
             		'天猫福利扣点': 'tmWarePrice',
             		
             		
             		
             		'UV价值': 'uvValue',

             	}




             	this.option.legend.data = []
             	this.option.series = []
             	this.option.legend.selected = {}
             	let m = 0
             	for (let key in dataa) {

             		this.option.legend.data.push(key)
             		
             		if (m>5) {
             			this.option.legend.selected[key] = false
             		}

             		
             		m++

             		//console.info(index)


             		//this.option.legend.selected.push(key)

             		this.option.series.push({
             			name: key,
			            type:'line',
			            
			            data:[]
             		})

             	}



             	

             	this.option.xAxis.data = []
             	this.option.series = []

             	for (let i=0;i<this.option.legend.data.length;i++) {
             		this.option.series.push({
             			name:this.option.legend.data[i],
			            type:'line',
			            
			            data:[]
             		})
             	}




                for (let i=0; i<data.data.length; i++) {
                	this.option.xAxis.data.push(this.fmtDate(data.data[i].date))


                	for (let j=0;j<this.option.series.length;j++) {




                		
                		this.option.series[j].data.push({
                			value: data.data[i][dataa[this.option.series[j].name]+'1'] ? data.data[i][dataa[this.option.series[j].name]+'1'] : data.data[i][dataa[this.option.series[j].name]],
		      				tip: data.data[i][dataa[this.option.series[j].name]],
                		})
                	}

                	
                }

                //console.info(this.option.series)



      			if (myChart) {
                    myChart.dispose()
                    myChart = null
                }
                this.$nextTick(()=>{

	      			myChart = echarts.init(document.getElementById('charts_dev'))
        			myChart.setOption(this.option)
    			})


                  
              })
             .catch(()=>{
	            this.$message({
	              message: '接口报错',
	              type: 'error'
	            })
	       	})
    	},
    },
}
</script>
<style>
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
<style lang="less" scoped>

.sale_index {
  height: calc(100vh - 140px);
  background: #ffffff;
  margin: 20px;
  margin-top: 0px;

  .wrap_white {
  	height: 100%;
  	background: #f2f2f2;
  	border: 1px solid #cccccc;
  	overflow-y: scroll;
  	padding: 20px;

	.monbtn{
        position: relative;
        background-color: rgb(140, 206, 173);
        color: #fff; 
	}

  	&-top {
  		margin-top: 20px;
  		border: 1px solid #cccccc;
  		height: 600px;
  		background: #ffffff;
  		padding: 16px 16px;

  		&-title {
  			height: 40px;
  			position: relative;

  			&-right {
  				position: absolute;
  				width: 780px;
  				right: 0px;
  				height: 40px;
  				top: 0px;

  			}
  		}

  		&-middle {
  			margin-top: 16px;
  			margin-bottom: 10px;

  		}

  		&-bottom {
  			margin-top: 20px;
  			width: 100%;
  			height: 480px;
  		}
  	}

  	&-bottom {
  		margin-top: 30px;
  		border: 1px solid #cccccc;
  		height: 600px;
  		background: #ffffff;
  		margin-bottom: 30px;
  		padding: 16px 16px;

  		&-top {
  			&-title {
	  			height: 40px;
	  			line-height: 40px;
	  			position: relative;

	  			&-right {
	  				position: absolute;
	  				width: 410px;
	  				right: 0px;
	  				height: 40px;
	  				top: 0px;
	  			}
	  		}
  		}

  		&-bottom {
  			height: 480px;
		    margin-top: 20px;
  		}
  	}

  }
}
</style>
