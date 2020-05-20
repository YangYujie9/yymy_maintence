<template>
  <div @click="zhe_show = false" class="sale_shop">
  	<div class="wrap_white">
  		<div class="wrap_white-top">
  			<div class="wrap_white-title">
  				<span style="font-size: 24px;line-height: 40px">整体趋势</span>
  				<div>
  					<p style="margin-top: 20px;">
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
					    
					</p>
  					<p style="margin-top: 20px;">
  						<div class="el-checkbox-group">
  							<button @click="list.choose = !list.choose" :class="{'el-button--success-a':list.choose}" v-for="list in shop_brand"  class="el-button-s" >
						    	<span>{{list.label}}</span>
						    </button>
				          
						    
						    
				        
				      </div>

				        
				        

  						
					</p>

					
					

					<div style="margin-top: 0px;">

				          
						    
						    
				          
				        	<el-button @click="compare_to_shop" type="success">搜索</el-button>

				        	<el-button style="margin-left: 30px" @click="chearall" type="success">重置</el-button>

				        	<el-button style="margin-left: 30px;margin-bottom: 20px;" @click="export_sell_report" type="primary">导出</el-button>


		  			</div>



				    
  				</div>
  			</div>
  		</div>
  		<div style="position: relative;"  v-loading="tablelistloading" ref="tablewrap" class="wrap_white-table">
  			<div class="wrap_white-table-title">
  				<span style="font-size: 24px;line-height: 40px">对比结果</span>
  			</div>

        <div v-if="zhe_show" style="z-index: 9999;width: 860px;height: 350px;position: absolute;top: 160px;left: 120px;background: #ffffff;border:  1px solid #ccc;border-radius: 6px;" class="div_qushi_content_a_wrap">
          <div style="height: 40px;line-height: 40px;border-bottom: 1px solid #ccc;padding-left: 30px;">{{zhe_title}}</div>
          <div style="width: 860px;height: 300px" id="div_qushi_content_a"></div>
        </div>

        
  			<el-table
				:data="tableData"
        v-if="index_show"


			    style="width: 100%;border-left: 1px solid #EBEEF5;border-right: 1px solid #EBEEF5"
			    :header-cell-style='{"background": "#3f3f3f",
	    		"border-right": "1px solid #cecece",
	    		"color": "#ffffff"}'
			    height="700">
			    <el-table-column
			      prop="date"
			      label="日期"
			      width="120"
            fixed
			      align="center">
			      	<template slot-scope="scope">
                      {{scope.row.time ? fmtDate(scope.row.time): ` &nbsp`}}
		            </template>
			    </el-table-column>
			    <el-table-column
			      prop="shopName"
			      label="店铺"
			      width="60"
            fixed
			      align="center">
			      	
			    </el-table-column>

			    <el-table-column 
              v-for="(value) in choose_sort_list"
              :width="value.width"
              align="center"
              v-if="value.show"

              :prop="value.enname"  >
                <template slot="header"  slot-scope="scope">

                  <span @click.stop="show_circle(value.enname, value)" class="pointer">{{value.chinesename}}</span>
                </template>
                
        </el-table-column>
            
			</el-table>
			
		</div>
  	</div>
    
    

    
  </div>
</template>

<script>
let salefifteen_chart
import { mapGetters } from 'vuex'

import echarts from 'echarts'
  export default {
    name: "sale_shop",
    data(){
      return{
        index_show: false,
        zhe_title: '',
        zhe_show: false,
      	props: { multiple: true },
      	checkboxGroup2: [],
      	remount: true,
        tableData: [],
        totalshops: [],
        datashop: [],
        tablelistloading: false,
        
        search: {
       		shopIds: [],
       		start: [
       			new Date(new Date().getTime() - 3600 * 1000 * 24 * 15),
       			new Date(new Date().getTime())
       		],
       	},
        table_circle: [],
       	shop_brand: [],
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
        choose_sort_list: []
      }
    },
    computed: {
      ...mapGetters([
            'getpageDict',
        ]),
    	shopidchange() {
    		let arr = []
    		

    		for (let i=0;i<this.shop_brand.length;i++) {



    			if (this.shop_brand[i].choose) {

            arr.push(this.shop_brand[i].value)
    				
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
    created() {
        
    },
    mounted(){ 
    	
      this.get_shop_by_brand()
      this.find_sell_column()
    },
    methods:{
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
      show_circle(key,value) {
        this.zhe_show = true
        this.zhe_title = value.name
        this.salefifteensearch_dialog.legend.data = []
        this.salefifteensearch_dialog.series = []

        this.salefifteensearch_dialog.xAxis.data = []


        let len = this.table_circle.length


        let zhe_show = {}


        if (this.shopidchange.length) {
          for (let i=0;i<this.shopidchange.length;i++) {
            zhe_show[this.shopidchange[i]] = {
              name: '',
              smooth: true,
              type:'line',
              data: new Array(len).fill(0)
            }
          }
        } else {
          for (let i=0;i<this.totalshops.length;i++) {
            zhe_show[this.totalshops[i]] = {
              name: '',
              smooth: true,
              type:'line',
              data: new Array(len).fill(0)
            }
          }
        }


        





        //console.info(zhe_show)


       

        for (let i=0;i<this.table_circle.length;i++) {
          this.salefifteensearch_dialog.xAxis.data.push(this.fmtDate(this.table_circle[i].time))


          //if (this.table_circle[i].list.length )




          for (let j=0;j<this.table_circle[i].list.length;j++) {

            
            zhe_show[this.table_circle[i].list[j].shopId].data[i] = this.table_circle[i].list[j][key]


            zhe_show[this.table_circle[i].list[j].shopId].name = this.table_circle[i].list[j].shopName



          }

        }


        for (let key in zhe_show) {
          this.salefifteensearch_dialog.series.push(zhe_show[key])
          this.salefifteensearch_dialog.legend.data.push(zhe_show[key].name)

        }

        //console.info(this.salefifteensearch_dialog.series)

        if (salefifteen_chart) {
            salefifteen_chart.clear()
            salefifteen_chart = null
        }
        setTimeout(()=>{

              //console.info(`div_qushi_content_a${index_list}`)
              //div_qushi_content_a0


              salefifteen_chart = echarts.init(document.getElementById(`div_qushi_content_a`))
              salefifteen_chart.setOption(this.salefifteensearch_dialog)
        },0)




      },
      
    	changetablelist(value) {
    		value.choose =! value.choose

    		
    		
    	},
    	okchangetable() {
    		for (let key in this.dataa) {


    			if(this.dataa[key].choose) {
    				this.dataa[key].choosetwo = true
    			} else {
    				this.dataa[key].choosetwo = false
    			}
    		}
    		this.remount = false
    		this.tablelistloading  = true

    		setTimeout(()=>{
    			this.remount = true

    			this.tablelistloading = false
    		},0)
    		setTimeout(()=>{

    			this.tablelistloading = false
    		},100)


    	},
    	export_sell_report() {
    		let that = this
          this.$sale_exportAxios.post(`yx_sell/export_sell_report`,{
                start: this.search.start[0].getTime().toString().substr(0, 10),
                end: this.search.start[1].getTime().toString().substr(0, 10),
                shopIds: this.shopidchange.length ? this.shopidchange.join(',') : this.totalshops.join(',')

          },{
            
            responseType: 'arraybuffer'
          })
            .then(function (res) {
              console.info(res)              

              let fileName = decodeURI(res.headers['file-name'])
              let data = res.data

              


              if (data && !data.byteLength) {
                alert('表格数据为空，无法导出！');
                return;
              }
              try {
                let linkElement = document.createElement('a');
                let blob = new Blob([data], {
                  type: 'application/octet-stream'
                });


                let url = window.URL.createObjectURL(blob);
                linkElement.setAttribute('href', url);
                linkElement.setAttribute("download", fileName);




                let clickEvent = new MouseEvent("click", {
                  "view": window,
                  "bubbles": true,
                  "cancelable": false
                });
                linkElement.dispatchEvent(clickEvent);
              } catch (ex) {
                console.log(ex);
              }
            })
            .catch(function (error) {
              console.log(error);
              that.loading2 = false
              that.$message({
                  message: '接口报错',
                  type: 'error'
                });
            });
    	},
    	chearall() {
    		for (let i=0;i<this.shop_brand.length;i++) {
    			this.shop_brand[i].choose = false
    			
    		}

    		this.compare_to_shop()

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
                    choose: false,
                  })


                  this.totalshops.push(data.data[i].id)
                }



                this.shop_brand = arr




                

            })
            .catch(()=>{
                this.$message({
                  message: '接口报错',
                  type: 'error'
                })
            })
    		
    	},
    	choosetag(key) {
    		console.info(key)
    		this.dataa[key]= !this.dataa[key]
    	},
    	
    	fmtDate(obj){
          var date =  new Date(obj*1000);

          var y = 1900+date.getYear();
          var m = "0"+(date.getMonth()+1);
          var d = "0"+date.getDate();
          return y+"/"+m.substring(m.length-2,m.length)+"/"+d.substring(d.length-2,d.length);
      	},
    	
    	compare_to_shop() {

    		//this.okchangetable()



    		this.$http.post('yx_sell/compare_to_shop',{
                start: this.search.start[0].getTime().toString().substr(0, 10),
                end: this.search.start[1].getTime().toString().substr(0, 10),
                shopIds: this.shopidchange.length ? this.shopidchange.join(',') : this.totalshops.join(',')
              })
             .then((data)=>{
             	let arr = []
             	for (let i=0;i<data.data.length;i++) {
             		for (let j=0;j<data.data[i].list.length;j++) {
             			arr.push({
             				time: data.data[i].time,
             				...data.data[i].list[j]
             			})	
             		}

                
             		this.tablelistloading = false
             		arr.push({
             				shopId: "",
             				shopName: "",
             				aPR: "",
      							browseDepth: "",
      							conversionRate: "",
      							customerPrice: "",
      							date: "",
      							itemfavorQty: "",
      							onePrice: "",
      							payBuyerQty: "",
      							payQty: "",
      							payment: "",
      							rOI: "",
      							shopName: "",
      							uvValue: "",
             			})	
             	}

             	//console.info(arr)

              this.table_circle = data.data

              this.tableData = arr

                  
              })
             .catch(()=>{
	            this.$message({
	              message: '接口报错',
	              type: 'error'
	            })
	       	})
    	}
      
    },
  }
</script>
<style>
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

</style>
<style scoped lang="less">
.sale_shop {
	height: calc(100vh - 140px);
	background: #ffffff;
	margin: 20px;
	margin-top: 0px;

	.wrap_white {
	  	height: 100%;
	  	border: 1px solid #cccccc;
	  	overflow-y: scroll;
	  	padding: 20px;

	  	&-top {
	  		border-bottom: 1px solid #cccccc;
	  		background: #ffffff;


	  		&-title {
	  			height: 40px;
	  			position: relative;
	  		}
	  	}

	  	&-table {
	  		&-title {
	  			height: 40px;
	  			margin-top: 16px;
	  			margin-bottom: 16px;
	  		}
	  	}
	}


}
</style>
