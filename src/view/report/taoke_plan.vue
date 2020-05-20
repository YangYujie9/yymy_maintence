<template>
	<div class="taoke">
		<div class="taoke_wrap"  v-if="$isInArray(60)">
			<div class="taoke_wrap_top"  style="display: inline-block;">
				<p class="search_item">
					选择日期：
			    	<el-date-picker
		            	v-model="search.start"
		            	type="date"
		            	placeholder="起始日期"
		            	class="input_class">
		        	</el-date-picker>
		        	<span>至</span>
		          	<el-date-picker
		            	v-model="search.end"
		            	type="date"
		            	placeholder="终止日期"
		            	class="input_class">
		          	</el-date-picker>
				</p>
				<p class="search_item">
					<el-cascader
					    :options="shop_list"
					    collapse-tags
					    placeholder="选择品牌店铺"
					    v-model="search.shopId"
					    class="input_class"
					    :props="{ multiple: true}"
					    clearable
					    @change="search_taoke_data">					    	
					</el-cascader>

				</p>
				<p class="search_item">
					 <el-select
					    v-model="search.plan"
					    clearable
					    @change="search_taoke_data"
					    style="margin-left: 20px;"
					    placeholder="请选择">
					    <!-- multiple
					    collapse-tags -->
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>

				</p>		  	

				<el-button class="monbtn" @click="search_taoke_data">搜 索</el-button>			    
    		</div>

    		<div class="taoke_wrap_content" ref="table_warp">
    			<el-table 
					border
					highlight-current-row
			    	:data="tableData"
			    	:height="table_height"
			    	
			    	style="width: 100%"
			    	:header-cell-style='{
			    	"height":"40px",
			    	"background": "#3f3f3f",
		            "border-right": "1px solid #cecece",
		            "border-bottom": "0px",
		            "text-align": "center",
		            "color": "#ffffff",
		            "padding":"4px",			          
		        	}'
		            :cell-style="{padding:5+'px'}"><!-- :span-method="arraySpanMethod" -->
		            <el-table-column type="expand" label="详情">
		            	<template slot-scope="scoped">
				    		<el-table 
		    					border
		    					highlight-current-row
						    	:data="scoped.row.list"
						    	height="300"
						    	style="width: 100%"
					            :cell-style="{padding:5+'px'}">
					            <el-table-column
							        label="日期"
							        width="285px"
							        prop="time"				        
							        align="center">
							        <template slot-scope="scope">
			                      		{{scope.row.time ? fmtDate(scope.row.time):'合计'}}
			                    	</template>
							    </el-table-column>
							    <el-table-column
							        label="点击数"
							        
							        prop="clickNum"
							        align="center">				        
							    </el-table-column>
							    <el-table-column
							        label="付款笔数"
							        
							        prop="payQty"
							        align="center">				        
							    </el-table-column>
							    <el-table-column
							        label="付款金额（元）"
							        
							        prop="payment"
							        align="center">				        
							    </el-table-column>
							    <el-table-column
							        label="确认收货笔数"
							        
							        prop="sendQty"
							        align="center">				        
							    </el-table-column>
							    <el-table-column
							        label="确认收货金额（元）"
							        
							        prop="sendPayment"
							        align="center">				        
							    </el-table-column>
							    <el-table-column
							        label="佣金率"
							        
							        prop="moneyRate"
							        align="center">
							        <template slot-scope="scope">
			                      		{{scope.row.moneyRate}}%
			                    	</template>				        
							    </el-table-column>
							    <el-table-column
							        label="服务费率"
							        
							        prop="serviceRate"
							        align="center">
							        <template slot-scope="scope">
			                      		{{scope.row.serviceRate}}%
			                    	</template>				        
							    </el-table-column>
							    <el-table-column
							        label="总佣金率"
							        
							        prop="pactMoneyRate"
							        align="center">
							        <template slot-scope="scope">
			                      		{{scope.row.pactMoneyRate}}%
			                    	</template>				        
							    </el-table-column>
							    <el-table-column
							        label="支出金额"
							        
							        prop="pay"
							        align="center">				        
							    </el-table-column>

					        </el-table>
					    </template>
		            </el-table-column>
		            
		            <el-table-column
				        label="店铺"
				        width="180px"
				        prop="shopName"
				        align="center">
				        <template slot-scope="scope">
                      		{{scope.row.shopName ? scope.row.shopName:'合计'}}
                    	</template>				        
				    </el-table-column>
				    <el-table-column
				        label="计划名称"
				        width="110px"
				        prop="planName"
				        align="center">	
				        <template slot-scope="scope">
                      		{{scope.row.planName ? scope.row.planName:'合计'}}
                    	</template>			        
				    </el-table-column>
				    <el-table-column
				        label="点击数"
				        
				        prop="clickNum"
				        align="center">				        
				    </el-table-column>
				    <el-table-column
				        label="付款笔数"
				        
				        prop="payQty"
				        align="center">				        
				    </el-table-column>
				    <el-table-column
				        label="付款金额（元）"
				        
				        prop="payment"
				        align="center">				        
				    </el-table-column>
				    <el-table-column
				        label="确认收货笔数"
				        
				        prop="sendQty"
				        align="center">				        
				    </el-table-column>
				    <el-table-column
				        label="确认收货金额（元）"
				        
				        prop="sendPayment"
				        align="center">				        
				    </el-table-column>
				    <el-table-column
				        label="佣金率"
				        
				        prop="moneyRate"
				        align="center">
				        <template slot-scope="scope">
                      		{{scope.row.moneyRate}}%
                    	</template>				        
				    </el-table-column>
				    <el-table-column
				        label="服务费率"
				        
				        prop="serviceRate"
				        align="center">
				        <template slot-scope="scope">
                      		{{scope.row.serviceRate}}%
                    	</template>				        
				    </el-table-column>
				    <el-table-column
				        label="总佣金率"
				        
				        prop="pactMoneyRate"
				        align="center">
				        <template slot-scope="scope">
                      		{{scope.row.pactMoneyRate}}%
                    	</template>				        
				    </el-table-column>
				    <el-table-column
				        label="支出金额"
				        
				        prop="pay"
				        align="center">				        
				    </el-table-column>
		        </el-table>
    		</div>
    	</div>
    </div>

</template>
<script>
	export default{
		data(){
			return{
				table_height:1000,
				search:{
					//start:new Date([new Date().getFullYear(),new Date().getMonth()+1,1].join('-')),
					start:new Date(new Date(new Date().toLocaleDateString()).getTime()-24*60*60*1000*7),
					end:new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1),
					shopId:'',
					plan:'',
				},
				options: [{
		        	value: '营销计划',
		        	label: '营销计划'
		        }, {
		        	value: '自选计划',
		        	label: '自选计划'
		        }, {
		        	value: '通用计划',
		        	label: '通用计划'
		        }, {
		        	value: '如意投计划',
		        	label: '如意投计划'
		        }, {
		        	value: '定向计划',
		        	label: '定向计划'
		        }],
		        shop_list:[],
		        tableData:[{}],
		        shopNameArr:[],
				shopNamePos:[],
				timeArr:[],
				timePos:[],
				planNameArr:[],
				planNamePos:[],

		        
			}
		},
		mounted(){
			this.$nextTick(()=>{
        		this.table_height = this.$refs.table_warp.offsetHeight - 20
      		})
			this.get_taoke_shopdata()
			this.search_taoke_data()

		},
		computed:{
			shopidchange(){
		    	let arr = []
		        if(this.search.shopId.length){
		          for(let i=0;i<this.search.shopId.length;i++){
		            arr.push(this.search.shopId[i][1])
		          }
		        }
		        return arr
		    },
		},
		methods:{
			get_taoke_shopdata(){
				this.$http.get(`shop/find_tk_shop_for_search`)
				.then((data)=>{
		        	//console.info(data)		        	
		        	if(data.code == '200'){
	    				this.search.shopId = []
	    				let list = []
	    				for(let i=0;i<data.data.length;i++){
	    					list.push({value:data.data[i].id ? data.data[i].id:-1, label:data.data[i].brandName})	    					
	    					if(data.data[i].list.length){
	    					    list[i]['children'] = []
	    						for(let j=0;j<data.data[i].list.length;j++){
	    							list[i]['children'].push({value:data.data[i].list[j].id, label:data.data[i].list[j].shopNum})
	    						}
	    					}
	    				}


	    				this.shop_list = list
	    				//console.info(this.shop_list)
			        	
		        	}
				})

			},
			search_taoke_data(){
				//console.info(this.shopidchange)
        		this.$http.post(`tk_sell/tk_sell_detail_show`,{       			
		            start: this.search.start.getTime().toString().substr(0, 10),		           
		            end: this.search.end.getTime().toString().substr(0, 10),
		            shopIds:this.shopidchange.length?this.shopidchange.join(','):'',
		            planName:this.search.plan.length?this.search.plan :'',
	            
	          	})

     			
		        .then((data)=>{
		        	
		        	if(data.code == '200'){
		        		
		        		this.tableData = []
		        		this.tableData = data.data
		        		//let last=this.tableData.length-1
		        		//this.tableData[last].planName=""
						//console.info(this.tableData)
						//this.merage()


					} else{
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
		    //合并单元格1
   		// 	arraySpanMethod({row, column, rowIndex, columnIndex}) {
   		// 		//console.info(columnIndex)
		   //      if (columnIndex === 0) {
		   //        //第一列的合并方法,
		   //        const _row_1 = this.shopNameArr[rowIndex];
		   //        const _col_1 = _row_1 > 0 ? 1 : 0; //如果被合并了_row=0则它这个列需要取消
		   //        return {
		   //          rowspan: _row_1,
		   //          colspan: _col_1
		   //        }
		   //      }
		   //      else if (columnIndex === 1) {
			  //         //第二列的合并方法,
			  //         const _row_2 = this.timeArr[rowIndex];
			  //         const _col_2 = _row_2 > 0 ? 1 : 0;
			  //         return {
			  //           rowspan: _row_2,
			  //           colspan: _col_2
			  //         }
			  //   }
			  //   else if (columnIndex === 2) {
			  //         //第二列的合并方法,
			  //         const _row_2 = this.planNameArr[rowIndex];
			  //         const _col_2 = _row_2 > 0 ? 1 : 0;
			  //         return {
			  //           rowspan: _row_2,
			  //           colspan: _col_2
			  //         }
			  //   }

		   //  },
		   //  //合并单元格2
		   //  merage () {
		   //    this.shopNameArr = []
		   //    this.shopNamePos = 0
		   //    this.timeArr = []
		   //    this.timePos = 0
		   //    this.planNameArr = []
			  // this.planNamePos = 0
		   //    for (let i = 0; i < this.tableData.length; i++) {
		   //      if (i === 0) {
		   //        this.shopNameArr.push(1)
		   //        this.shopNamePos = 0
		   //        this.timeArr.push(1)
		   //        this.timePos = 0
		   //        this.planNameArr.push(1)
		   //        this.planNamePos = 0

		   //      } else {
					// if (this.tableData[i].shopName === this.tableData[i - 1].shopName) {
					// 	this.shopNameArr[this.shopNamePos] += 1
					// 	this.shopNameArr.push(0)
					// } else {
					// 	this.shopNameArr.push(1)
					// 	this.shopNamePos = i
					// }
			  //       if (this.tableData[i].time === this.tableData[i - 1].time && this.tableData[i].shopName === this.tableData[i - 1].shopName) {
		   //          	this.timeArr[this.timePos] += 1;
		   //            	this.timeArr.push(0);
	    //         	} else {
			  //       	this.timeArr.push(1);
			  //       	this.timePos = i;
	    //         	}
	    //         	if (this.tableData[i].planName === this.tableData[i - 1].planName) {
		   //          	this.planNameArr[this.planNamePos] += 1;
		   //            	this.planNameArr.push(0);
	    //         	} else {
			  //       	this.planNameArr.push(1);
			  //       	this.planNamePos = i;
	    //         	}

		   //      }
		   //    }
		   //  },
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
		},	
	}

</script>

<style >
	
</style>
<style scoped lang="less">
.taoke{
	

    font-size:14px; 
    position: relative;
    height: calc(100vh - 120px);
    margin: 0 20px;
    &_wrap{

      height: calc(100vh - 130px);


      // .cursor{
      //   cursor: pointer;
      // }

    	&_top{
	        height:50px;
	        //margin-top: 20px;        
	        //padding-left: 20px;
	        //background-color:red;
	        position: relative;
	        padding-bottom: 10px; 
	        
			.monbtn{
		        position: relative;
		        background-color: rgb(140, 206, 173);
		        color: #fff; 
			}
			.search_item{
	           display:
	           inline-block;
	           margin: 0px 20px 10px 20px;
	           //background-color:red;
	    
	        }
		}
		&_content{
	        height: calc(100vh - 195px);
	        //background-color:red;
	        margin-top: 10px;
	        width: 100%;
	        position:relative;
	        //overflow-y: scroll;
    	}
	}
    

      
}
</style>