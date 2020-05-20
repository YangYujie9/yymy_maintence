<template>
  <div class="sale_detail">
  	<div class="wrap_white">
  		<div class="wrap_white-title">
			<span style="font-size: 24px;line-height: 40px">明细内容</span>
			<div class="wrap_white-title-right">
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

			    <el-button @click="compare_to_time" class="monbtn">搜索</el-button>
			    <el-button @click="searchclear" type="primary">重置</el-button>
			    <el-button @click="export_sell_report" type="primary">导出</el-button>
			    <span class="pointer" @click="$emit('pagechange','/sale_report/yixin_sale_shop')" style="padding-left: 10px">店铺对比</span>
			</div>
			
		</div>
		<div ref="tablewrap" class="wrap_white-table">
			<el-table
				v-if="index_show"
			    :data="tableData"
			    style="width: 100%"
			    :header-cell-style='{"background": "#3f3f3f",
	    		"border-right": "1px solid #cecece",
	    		"color": "#ffffff"}'
	    		
			    :height="tableheight">
			    <el-table-column
			      prop="date"
			      width="120"
			      label="店铺"
			      align="center">
			      	<template slot-scope="scope">
		              {{scope.row.shopName}}
                      
		            </template>
			    </el-table-column>
			    <el-table-column
			      prop="date"
			      label="日期"
			      width="120"
			      align="center">
			      	<template slot-scope="scope">
		              {{scope.row.date ? fmtDate(scope.row.date):  ` &nbsp`}}
                      
		            </template>
			    </el-table-column>

			     <el-table-column 
					    v-for="(value) in choose_sort_list"
					    :width="value.width"
					    align="center"
					    v-if="value.show"

					    :prop="value.enname"  >
		            <template slot="header"  slot-scope="scope">

		              <span>{{value.chinesename}}</span>
		            </template>
		            <template slot-scope="scope">
		              {{scope.row[value.enname]}}
                      
		            </template>
				</el-table-column>
				    
			    
				    
			</el-table>
		</div>
  	</div> 
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    name: "sale_detail",
    props: {
	    closepath: String,
	},
    data(){
      return{
      	index_show: false,
        props: { multiple: true },
        tableData: [],
        shop_brand: [],
        tableheight: 200,
        datashop: [],
        search: {
       		shopIds: [],
       		start: [
       			new Date(new Date().getTime() - 3600 * 1000 * 24 * 15),
       			new Date(new Date().getTime())
       		],
       	},
       	totalshops: [],
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
    	
    	get_drive_column() {
    		let demand_status = this.getpageDict.filter((list) => {
                return list.dicType == "sell_column"
            })




            return demand_status[0].dicList
    	},
    },
    created() {
        
    },
    activated() {

    	if (this.closepath == '/report/sale_detail' && this.tableData.length) {

    		//console.info(99991)

			this.tableData = []
			this.compare_to_time()

			this.find_sell_column()
		}
    },
    watch: {
    	
    },
    mounted(){ 

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


      	this.$nextTick(()=>{

        	this.tableheight = this.$refs.tablewrap.offsetHeight

        
    	})

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
    	searchclear() {
    		this.search.shopIds = []
    		this.compare_to_time()

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

                 this.compare_to_time()



                

            })
            .catch(()=>{
                this.$message({
                  message: '接口报错',
                  type: 'error'
                })
            })



    		
    	},
    	fmtDate(obj){
          var date =  new Date(obj*1000);

          var y = 1900+date.getYear();
          var m = "0"+(date.getMonth()+1);
          var d = "0"+date.getDate();
          return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
      	},
    	
    	export_sell_report() {
    		let that = this
          this.$sale_exportAxios.post(`yx_sell/export_sell_report`,{
                start: this.search.start[0].getTime().toString().substr(0, 10),
                end: this.search.start[1].getTime().toString().substr(0, 10),
                shopIds: this.search.shopIds.length ? this.search.shopIds.join(',') : this.totalshops.join(','),

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

      compare_to_time() {
      	this.$http.post('yx_sell/compare_to_time',{
                start: this.search.start[0].getTime().toString().substr(0, 10),
                end: this.search.start[1].getTime().toString().substr(0, 10),
                shopIds: this.search.shopIds.length ? this.search.shopIds.join(',') : this.totalshops.join(','),
              })
             .then((data)=>{
             	let arr = []
             	for (let i=0;i<data.data.list.length;i++) {
             		for (let j=0;j<data.data.list[i].list.length;j++) {
             			arr.push({
             				shopId: data.data.list[i].shopId,
             				shopName: data.data.list[i].shopName,
             				...data.data.list[i].list[j]
             			})	
             		}

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

             	arr.push(data.data.sellReportVO)	


                this.tableData = arr

                  
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

<style scoped lang="less">
.sale_detail {
  height: calc(100vh - 140px);
	background: #ffffff;
	margin: 20px;
	margin-top: 0px;

  


	.wrap_white {
	  	height: 100%;
	  	border: 1px solid #cccccc;
	  	padding: 20px;


  		&-title {
  			height: 40px;
  			position: relative;

  			&-right {
  				position: absolute;
  				width: 930px;
  				right: 0px;
  				height: 40px;
  				top: 0px;

          .monbtn{
            position: relative;
            background-color: rgb(140, 206, 173);
            color: #fff; 
          }
  			}
  		}

  		&-table {
  			margin-top: 20px;
  			height: calc(100vh - 260px);
  			border: 1px solid #cccccc;
        	table { 
        		width: 100%; 
        		min-height: 25px; 
        		line-height: 25px; 
        		text-align: center; 
        		border-collapse: collapse;
        		border: 1px solid #cccccc;

        		tr {
        			border-bottom: 1px solid #cccccc;
        		}
        	}   
  		}

  		
	}
}
  
</style>
