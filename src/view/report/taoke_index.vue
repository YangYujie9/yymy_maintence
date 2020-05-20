<template>
	<div class="taoke">
		<div class="taoke_wrap" v-if="$isInArray(60)">
			<div class="taoke_wrap_top" style="display: inline-block;">
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

				<el-button @click="search_taoke_data" class="monbtn">搜 索</el-button>


				<!-- <el-radio-group fill="rgb(140, 206, 173)" @change="choice_change" v-model="choice" style="position: absolute;right: 20px;">  
			    	<el-radio-button :label="false">店铺</el-radio-button>
			      	<el-radio-button :label="true">日期</el-radio-button>
			    </el-radio-group> -->

			    
    		</div>

    		<div class="taoke_wrap_content" ref="table_warp">

    				
    				<!-- <p v-show="!choice" class="title_p" >店铺：{{item.shopName}}  </p> -->    					   				

				<el-table 
					border
					highlight-current-row
			    	:data="tdata"
			    	:height="table_height"
			    	style="width: 100%"
			    	:header-cell-style='{
			    	// "height":"30px",
			    	"background": "#3f3f3f",
		            "border-right": "1px solid #cecece",
		            "border-bottom": "0px",
		            "text-align": "center",
		            "color": "#ffffff",
		            "padding":"4px",			          
		        	}'
		            :cell-style="{padding:5+'px'}">
				    <!-- <el-table-column
				        label="日期"
				        width="110px"
				        prop="time"				        
				        align="center">
				        <template slot-scope="scope">
                      		{{scope.row.time ? fmtDate(scope.row.time):'合计'}}
                    	</template>
				    </el-table-column> -->
				    
					
				    	<el-table-column type="expand" label="详情">
				    		<template slot-scope="scoped">
				    		<el-table 
		    					border
		    					highlight-current-row
						    	:data="scoped.row.list"
						    	height="430"
						    	style="width: 100%"
					            :cell-style="{padding:5+'px'}">

					            <el-table-column
							        label="日期"
							        width="120px"
							        prop="time"				        
							        align="center">
							        <template slot-scope="scope">
			                      		{{scope.row.time ? fmtDate(scope.row.time):'合计'}}
			                    	</template>
							    </el-table-column>
							    <el-table-column
							        label="店铺销量"
							        
							        prop="shopPayQty"
							        align="center">
							        <template slot-scope="scope">
				                    	<span v-if="scope.row.time" style="color: blue;" @click="edit_taoke_data_dialog_shopPayQty(scope.row)">{{scope.row.shopPayQty}}</span>
				                    	<span v-else @click="warning">{{scope.row.shopPayQty}}</span>			
				                	</template>
							    </el-table-column>
							    <el-table-column
							        label="店铺销售额"
							        prop="shopPayment"
							        width="120px"
							        align="center">
							        <template slot-scope="scope">
				                    	<span v-if="scope.row.time" style="color: blue;" @click="edit_taoke_data_dialog_shopPayment(scope.row)">{{scope.row.shopPayment}}</span>	
				                    	<span v-else @click="warning">{{scope.row.shopPayment}}</span>		
				                	</template>
							    </el-table-column>
							    <el-table-column  
							        label="淘客付款金"
							        
							        prop="payment"
							        align="center">
							    </el-table-column>
							    <el-table-column
			                    	label="淘客占比"
			                    	
			                    	prop="tkRate"
			                    	align="center">
			                    	<template slot-scope="scope">
			                      		{{scope.row.tkRate}}%
			                    	</template>
			                	</el-table-column>
			                	<el-table-column
				                    label="点击数"
				                    
				                    prop="clickNum"
				                    align="center">
				                    <template slot-scope="scope">
				                    	<span v-if="scope.row.time" style="color: blue;" @click="edit_taoke_data_dialog_clickNum(scope.row)">{{scope.row.clickNum}}</span>
				                    	<span v-else @click="warning">{{scope.row.clickNum}}</span>						
				                	</template>
			                	</el-table-column>
			                	<el-table-column
				                    label="进店UV"
				                    prop="comeUv"
				                    
				                    align="center">
				                    <template slot-scope="scope">
				                    	<span v-if="scope.row.time" style="color: blue;" @click="edit_taoke_data_dialog_comeUv(scope.row)">{{scope.row.comeUv}}</span>
				                    	<span v-else @click="warning">{{scope.row.comeUv}}</span>			
				                	</template>
			                	</el-table-column>
			                	<el-table-column
				                    label="付款笔数"
				                    
				                    prop="payQty"
				                    align="center">
			                	</el-table-column>
			                	<el-table-column
				                	label="UV价值"
				                	
				                    prop="uvValue"
				                    align="center">
			                	</el-table-column>
			                	<el-table-column
				                    label="付款转化率"
				                    
				                    prop="payRate"
				                    align="center">
				                    <template slot-scope="scope">
			                      		{{scope.row.payRate}}%
			                    	</template>
			                	</el-table-column>
			                	<el-table-column
				                    label="确认收货金额"
				                    
				                    prop="sendPayment"
				                    align="center">
			                	</el-table-column>
			                    <el-table-column
				                    label="支出金额"
				                    prop="pay"
				                    
				                    align="center">
			                  	</el-table-column>
			                    <el-table-column
				                    label="客单价"
				                    
				                    prop="oneWarePrice"
				                    align="center">
			                  	</el-table-column>
			                	<el-table-column
				                    label="实际推广平均佣金率"
				                    
				                    prop="realMoneyRate"
				                    align="center">
				                    <template slot-scope="scope">
			                      		{{scope.row.realMoneyRate}}%
			                    	</template>
			                  	</el-table-column>
			                  	<el-table-column
				                    label="合同佣金率"
				                    
				                    prop="pactMoneyRate"
				                    align="center">
				                    <template slot-scope="scope">
				                    	<span v-if="scope.row.time" style="color: blue;" @click="edit_taoke_data_dialog_pactMoneyRate(scope.row)">{{scope.row.pactMoneyRate}}%</span>
				                    	<span v-else @click="warning">{{scope.row.pactMoneyRate}}%</span>			
				                	</template>
			                  	</el-table-column>
			                  	<!-- <el-table-column
				                    label="毛利率"
				                    width="80px"
				                    prop="profitRate"
				                    align="center">
				                    <template slot-scope="scope">
			                      		{{scope.row.profitRate}}%
			                    	</template>
			                  	</el-table-column>
			                  	<el-table-column
				                    label="毛利润"
				                    width="90px"
				                    prop="profit"
				                    align="center">
			                  	</el-table-column> -->
			                  	<el-table-column
				                    label="ROI"
				                    width="80px"	                    
				                    prop="roi"
				                    align="center">
			                  	</el-table-column>
			                  	<el-table-column						
			                  		label="操作"
			                  		width="80px"
				                    align="center">
					    			<template slot-scope="scope">	                    
				                    	<el-button  v-show="scope.row.time" @click="edit_taoke_data_dialog(scope.row)" type="success" size="mini" plain>修改</el-button>
				                	</template>
			                  	</el-table-column>

					        </el-table>
					    </template>
						</el-table-column>
					
				    <el-table-column  
				        label="店铺"
				        
				        prop="shopName"
				        align="center">
				    </el-table-column>
				    <el-table-column
				        label="店铺销量"
				        
				        prop="shopPayQty"
				        align="center">					        
				    </el-table-column>
				    <el-table-column
				        label="店铺销售额"
				        prop="shopPayment"
				        width="120px"
				        align="center">
				    </el-table-column>
				    <el-table-column  
				        label="淘客付款金"
				        
				        prop="payment"
				        align="center">
				    </el-table-column>
				    <el-table-column
                    	label="淘客占比"
                    	
                    	prop="tkRate"
                    	align="center">
                    	<template slot-scope="scope">
                      		{{scope.row.tkRate}}%
                    	</template>
                	</el-table-column>
                	<el-table-column
	                    label="点击数"
	                    
	                    prop="clickNum"
	                    align="center">		                   
                	</el-table-column>
                	<el-table-column
	                    label="进店UV"
	                    prop="comeUv"
	                    
	                    align="center">
                	</el-table-column>
                	<el-table-column
	                    label="付款笔数"
	                    
	                    prop="payQty"
	                    align="center">
                	</el-table-column>
                	<el-table-column
	                	label="UV价值"
	                	
	                    prop="uvValue"
	                    align="center">
                	</el-table-column>
                	<el-table-column
	                    label="付款转化率"
	                    
	                    prop="payRate"
	                    align="center">
	                    <template slot-scope="scope">
                      		{{scope.row.payRate}}%
                    	</template>
                	</el-table-column>
                	<el-table-column
	                    label="确认收货金额"
	                    
	                    prop="sendPayment"
	                    align="center">
                	</el-table-column>
                    <el-table-column
	                    label="支出金额"
	                    prop="pay"
	                    
	                    align="center">
                  	</el-table-column>
                    <el-table-column
	                    label="客单价"
	                    
	                    prop="oneWarePrice"
	                    align="center">
                  	</el-table-column>
                	<el-table-column
	                    label="实际推广平均佣金率"
	                    
	                    prop="realMoneyRate"
	                    align="center">
	                    <template slot-scope="scope">
                      		{{scope.row.realMoneyRate}}%
                    	</template>
                  	</el-table-column>
                  	<el-table-column
	                    label="合同佣金率"
	                    
	                    prop="pactMoneyRate"
	                    align="center">
                  	</el-table-column>
                  	<!-- <el-table-column
	                    label="毛利率"
	                    
	                    prop="profitRate"
	                    align="center">
	                    <template slot-scope="scope">
                      		{{scope.row.profitRate}}%
                    	</template>
                  	</el-table-column>
                  	<el-table-column
	                    label="毛利润"
	                    
	                    prop="profit"
	                    align="center">
                  	</el-table-column> -->
                  	<el-table-column
	                    label="ROI"
	                                        
	                    prop="roi"
	                    align="center">
                  	</el-table-column>
                
			    </el-table>


			    <!-- 合计表格 -->
				<!-- <el-table v-show="choice"
					border
					highlight-current-row
			    	:data="tableData[0].list"
			    	:height="table_height"
			    	style="width: 100%"
			    	:header-cell-style='{
			    	// "height":"30px",
			    	"background": "#3f3f3f",
		            "border-right": "1px solid #cecece",
		            "border-bottom": "0px",
		            "text-align": "center",
		            "color": "#ffffff",
		            "padding":"4px",			          
		        	}'
		            :cell-style="{padding:5+'px'}">
				    <el-table-column
				        label="日期"
				        width="120px"
				        prop="time"				        
				        align="center">
				        <template slot-scope="scope">
                      		{{scope.row.time ? fmtDate(scope.row.time):'合计'}}
                    	</template>
				    </el-table-column>
				    <el-table-column
				        label="店铺销量"
				        width="120px"
				        prop="shopPayQty"
				        align="center">
				        
				    </el-table-column>
				    <el-table-column
				        label="店铺销售额"
				        prop="shopPayment"
				        align="center">
				        
				    </el-table-column>
				    <el-table-column  
				        label="淘客付款金"
				        width="90px"
				        prop="payment"
				        align="center">
				    </el-table-column>
				    <el-table-column
                    	label="淘客占比"
                    	prop="tkRate"
                    	align="center">
                    	<template slot-scope="scope">
                      		{{scope.row.tkRate}}%
                    	</template>
                	</el-table-column>
                	<el-table-column
	                    label="点击数"
	                    width="80px"
	                    prop="clickNum"
	                    align="center">
	                    
                	</el-table-column>
                	<el-table-column
	                    label="进店UV"
	                    prop="comeUv"
	                    align="center">
	                   
                	</el-table-column>
                	<el-table-column
	                    label="付款笔数"
	                    prop="payQty"
	                    align="center">
                	</el-table-column>
                	<el-table-column
	                	label="UV价值"
	                    prop="uvValue"
	                    align="center">
                	</el-table-column>
                	<el-table-column
	                    label="付款转化率"
	                    prop="payRate"
	                    align="center">
	                    <template slot-scope="scope">
                      		{{scope.row.payRate}}%
                    	</template>
                	</el-table-column>
                	<el-table-column
	                    label="确认收货金额"
	                    prop="sendPayment"
	                    align="center">
                	</el-table-column>
                    <el-table-column
	                    label="支出金额"
	                    prop="pay"
	                    align="center">
                  	</el-table-column>
                    <el-table-column
	                    label="客单价"
	                    prop="oneWarePrice"
	                    align="center">
                  	</el-table-column>
                	<el-table-column
	                    label="实际推广平均佣金率"
	                    prop="realMoneyRate"
	                    align="center">
	                    <template slot-scope="scope">
                      		{{scope.row.realMoneyRate}}%
                    	</template>
                  	</el-table-column>
                  	<el-table-column
	                    label="合同佣金率"
	                    prop="pactMoneyRate"
	                    align="center">

	                    <template slot-scope="scope">
                      		{{scope.row.pactMoneyRate}}%
                    	</template>
                  	</el-table-column>
                  	<el-table-column
	                    label="毛利率"
	                    prop="profitRate"
	                    align="center">
	                    <template slot-scope="scope">
                      		{{scope.row.profitRate}}%
                    	</template>
                  	</el-table-column>
                  	<el-table-column
	                    label="毛利润"
	                    width="90px"
	                    prop="profit"
	                    align="center">
                  	</el-table-column>
                  	<el-table-column
	                    label="ROI"	                    
	                    prop="roi"
	                    align="center">
                  	</el-table-column>   
              	</el-table>  -->

			</div>
    		

    			<el-dialog
					title="店铺销量修改"
					:visible.sync="edittaokedatadialog_shopPayQtyVisible"
					width="400px">
					<span class="demonstration">店铺销量：</span>
				    <el-input class="input" size="mini" v-model="edit_taoke_buffer.shopPayQty" placeholder="请输入店铺销量" ></el-input>
				    <br>
				    
					<span slot="footer" class="dialog-footer">
				    	<el-button @click="edittaokedatadialog_shopPayQtyVisible = false">取 消</el-button>
				    	<el-button type="primary" @click="edit_taoke_data(1)">确 定</el-button>
				  	</span>
				</el-dialog>

				<el-dialog
					title="店铺销售额修改"
					:visible.sync="edittaokedatadialog_shopPaymentVisible"
					width="400px">
					<span class="demonstration">店铺销售额：</span>
				    <el-input class="input" size="mini" v-model="edit_taoke_buffer.shopPayment" placeholder="请输入店铺销售额" ></el-input>
				    <br>
				    
					<span slot="footer" class="dialog-footer">
				    	<el-button @click="edittaokedatadialog_shopPaymentVisible = false">取 消</el-button>
				    	<el-button type="primary" @click="edit_taoke_data(2)">确 定</el-button>
				  	</span>
				</el-dialog>

    			<el-dialog
					title="点击数修改"
					:visible.sync="edittaokedatadialog_clickNumVisible"
					width="400px">
					<span class="demonstration">点击数：</span>
				    <el-input class="input" size="mini" v-model="edit_taoke_buffer.clickNum" placeholder="请输入点击数" ></el-input>
				    <br>

					<span slot="footer" class="dialog-footer">
				    	<el-button @click="edittaokedatadialog_clickNumVisible = false">取 消</el-button>
				    	<el-button type="primary" @click="edit_taoke_data(3)">确 定</el-button>
				  	</span>
				</el-dialog>
				<el-dialog
					title="进店UV修改"
					:visible.sync="edittaokedatadialog_comeUvVisible"
					width="400px">
					<span class="demonstration">进店UV：</span>
				    <el-input class="input" size="mini" v-model="edit_taoke_buffer.comeUv" placeholder="请输入进店UV" ></el-input>
				    <br>

					<span slot="footer" class="dialog-footer">
				    	<el-button @click="edittaokedatadialog_comeUvVisible = false">取 消</el-button>
				    	<el-button type="primary" @click="edit_taoke_data(4)">确 定</el-button>
				  	</span>
				</el-dialog>
								
				<el-dialog
					title="合同佣金率修改"
					:visible.sync="edittaokedatadialog_pactMoneyRateVisible"
					width="400px">
					<span class="demonstration">合同佣金率：</span>
				    <el-input class="input" size="mini" v-model="edit_taoke_buffer.pactMoneyRate" placeholder="请输入合同佣金率" ></el-input>
				    <br>
				    
					<span slot="footer" class="dialog-footer">
				    	<el-button @click="edittaokedatadialog_pactMoneyRateVisible = false">取 消</el-button>
				    	<el-button type="primary" @click="edit_taoke_data(5)">确 定</el-button>
				  	</span>
				</el-dialog>
				
    			<el-dialog
					title="淘客数据修改"
					:visible.sync="edittaokedatadialogVisible"
					width="400px">

					<span class="demonstration">店铺销量：</span>
				    <el-input class="input"   size="mini" v-model="edit_taoke_buffer.shopPayQty" placeholder="请输入店铺销量" ></el-input>
				   	<br>
				   	<br>
				   	<span class="demonstration">店铺销售额：</span>
				    <el-input class="input" size="mini" v-model="edit_taoke_buffer.shopPayment" placeholder="请输入店铺销售额" ></el-input>
				   	<br>
				   	<br>
					<span class="demonstration">点击数：</span>
				    <el-input class="input" size="mini" v-model="edit_taoke_buffer.clickNum" placeholder="请输入点击数" ></el-input>
				    <br>
				    <br>				    
				    <span class="demonstration">进店uv：</span>
				    <el-input class="input" size="mini" v-model="edit_taoke_buffer.comeUv" placeholder="请输入进店uv" ></el-input>
				   	<br>
				   	<br>				   	
				   	<span class="demonstration">合同佣金率：</span>
				    <el-input class="input" size="mini" v-model="edit_taoke_buffer.pactMoneyRate" placeholder="请输入合同佣金率" ></el-input>
				   	<br>
				   	


					<span slot="footer" class="dialog-footer">
				    	<el-button @click="edittaokedatadialogVisible = false">取 消</el-button>
				    	<el-button type="primary" @click="edit_taoke_data(10)">确 定</el-button>
				  	</span>
				</el-dialog>
				
	
    		</div>
    		
		</div>

	</div>
</template>

<script >
	export default{
		data(){
			return{
				// search_input:[],
				
				search:{
					//start:new Date([new Date().getFullYear(),new Date().getMonth()+1,1].join('-')),
					start:new Date(new Date(new Date().toLocaleDateString()).getTime()-24*60*60*1000*7),
					end:new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1),
					shopId:'',
				},
				table_height:1000,
				//choice:false,
				length:'',
				shop_list:[],
				item:[],
				edittaokedatadialogVisible:false,
				edittaokedatadialog_clickNumVisible:false,
				edittaokedatadialog_comeUvVisible:false,
				edittaokedatadialog_shopPayQtyVisible:false,
				edittaokedatadialog_pactMoneyRateVisible:false,
				edittaokedatadialog_shopPaymentVisible:false,
				edit_taoke_buffer: {
					shopId:'',
					time:'',
					clickNum:'',
					comeUv:'',
					shopPayQty:'',
					pactMoneyRate:'',
					shopPayment:'',					

				},		
				
		  		tableData:[{}],
		  		tdata:[{}],
		  		//rowedit_taoke_data_dialog: {}

			}
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
		mounted(){
			this.$nextTick(()=>{
        		this.table_height = this.$refs.table_warp.offsetHeight - 20
      		})
			this.get_taoke_shopdata()
			this.search_taoke_data()
		},
		methods:{
			//品牌店铺获取
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
			//搜索按钮接口
			search_taoke_data(){
        		this.$http.post(`tk_sell/tk_sell_show`,{       			
		            isTotal:2,
		            start: this.search.start.getTime().toString().substr(0, 10),		           
		            end: this.search.end.getTime().toString().substr(0, 10),
		            shopIds:this.shopidchange.length?this.shopidchange.join(','):'',
	            
	          	})

     			
		        .then((data)=>{
		        	
		        	if(data.code == '200'){
		        		
		        		
		        		

		        		// for (let i=0;i<data.data.length; i++) {
		        		// 	data.data[i].list.reverse()
		        					        			
		        		// }
						//this.tableData = []
			            //this.tableData = data.data
						//console.info(this.tableData)
						let list = []
						
						for(let i=0;i<data.data.length; i++){
							let lastNum =data.data[i].list.length-1
							list.push({
								shopName:data.data[i].shopName,
								shopPayQty:data.data[i].list[lastNum].shopPayQty,
								shopPayment:data.data[i].list[lastNum].shopPayment,
								payment:data.data[i].list[lastNum].payment,
								tkRate:data.data[i].list[lastNum].tkRate,
								clickNum:data.data[i].list[lastNum].clickNum,
								comeUv:data.data[i].list[lastNum].comeUv,
								payQty:data.data[i].list[lastNum].payQty,
								uvValue:data.data[i].list[lastNum].uvValue,
								payRate:data.data[i].list[lastNum].payRate,
								sendPayment:data.data[i].list[lastNum].sendPayment,
								pay:data.data[i].list[lastNum].pay,
								oneWarePrice:data.data[i].list[lastNum].oneWarePrice,
								realMoneyRate:data.data[i].list[lastNum].realMoneyRate,
								pactMoneyRate:data.data[i].list[lastNum].pactMoneyRate,
								profitRate:data.data[i].list[lastNum].profitRate,
								profit:data.data[i].list[lastNum].profit,
								roi:data.data[i].list[lastNum].roi,
								list:data.data[i].list,
								})
							for(let j=0;j<list[i].list.length;j++){
								list[i].list[j].shopId=data.data[i].shopId
							}
							
							// shopPayQty:data.data[i].list[list.length-1].shopPayQty

						}

						//console.info(list)
						this.tdata=[]
						for(let i=0;i<list.length;i++){
							this.tdata[i]=list[i]
						}
						this.length=list.length	
						//console.info(this.tdata)
						this.search_taoke_data2()


		            	
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
      		//强行加入合计
      		search_taoke_data2(){
      				this.$http.post(`tk_sell/tk_sell_show`,{       			
		            isTotal:1,
		            start: this.search.start.getTime().toString().substr(0, 10),		           
		            end: this.search.end.getTime().toString().substr(0, 10),
		            shopIds:this.shopidchange.length?this.shopidchange.join(','):'',
	            
	          	})

     			
		        .then((data)=>{
		        	
		        	if(data.code == '200'){
		        		
		        		

		        		// for (let i=0;i<data.data.length; i++) {
		        		// 	data.data[i].list.reverse()
		        					        			
		        		// }
		        		
		        		//this.tableData = []
			            //this.tableData = data.data
						//console.info(this.tableData)
						let list = []
						for(let i=0;i<data.data.length; i++){
							let lastNum =data.data[i].list.length-1
							list.push({
								shopName:"合计",
								shopPayQty:data.data[i].list[lastNum].shopPayQty,
								shopPayment:data.data[i].list[lastNum].shopPayment,
								payment:data.data[i].list[lastNum].payment,
								tkRate:data.data[i].list[lastNum].tkRate,
								clickNum:data.data[i].list[lastNum].clickNum,
								comeUv:data.data[i].list[lastNum].comeUv,
								payQty:data.data[i].list[lastNum].payQty,
								uvValue:data.data[i].list[lastNum].uvValue,
								payRate:data.data[i].list[lastNum].payRate,
								sendPayment:data.data[i].list[lastNum].sendPayment,
								pay:data.data[i].list[lastNum].pay,
								oneWarePrice:data.data[i].list[lastNum].oneWarePrice,
								realMoneyRate:data.data[i].list[lastNum].realMoneyRate,
								pactMoneyRate:data.data[i].list[lastNum].pactMoneyRate,
								profitRate:data.data[i].list[lastNum].profitRate,
								profit:data.data[i].list[lastNum].profit,
								roi:data.data[i].list[lastNum].roi,
								list:data.data[i].list,
								})
							for(let j=0;j<list[i].list.length;j++){
								list[i].list[j].shopId=data.data[i].shopId
							}
							
							// shopPayQty:data.data[i].list[list.length-1].shopPayQty

						}

						//console.info(list)
						this.tdata.push(list[0])

						
						console.info(this.tdata)
									


		            	
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
      		//FBIwarning
			warning(){
				this.$message({
		              message:"亲，合计数据无法修改呢~",
		              type:'warning'
		            })
			},      		

      		//部分字段修改
      		edit_taoke_data_dialog_clickNum(row){
      			
				this.edittaokedatadialog_clickNumVisible=true
	  			this.edit_taoke_buffer.shopId=row.shopId
	  			this.edit_taoke_buffer.time=row.time
	  			this.edit_taoke_buffer.clickNum=row.clickNum
	  			this.edit_taoke_buffer.comeUv=row.comeUv
	  			this.edit_taoke_buffer.shopPayQty=row.shopPayQty
	  			this.edit_taoke_buffer.pactMoneyRate=row.pactMoneyRate
	  			this.edit_taoke_buffer.shopPayment=row.shopPayment
      			
      		},
      		edit_taoke_data_dialog_comeUv(row){

      			this.edittaokedatadialog_comeUvVisible=true
      			this.edit_taoke_buffer.shopId=row.shopId
      			this.edit_taoke_buffer.time=row.time
      			this.edit_taoke_buffer.clickNum=row.clickNum
      			this.edit_taoke_buffer.comeUv=row.comeUv
      			this.edit_taoke_buffer.shopPayQty=row.shopPayQty
      			this.edit_taoke_buffer.pactMoneyRate=row.pactMoneyRate
      			this.edit_taoke_buffer.shopPayment=row.shopPayment

      		},
      		edit_taoke_data_dialog_shopPayQty(row){

      			this.edittaokedatadialog_shopPayQtyVisible=true
      			this.edit_taoke_buffer.shopId=row.shopId
      			this.edit_taoke_buffer.time=row.time
      			this.edit_taoke_buffer.clickNum=row.clickNum
      			this.edit_taoke_buffer.comeUv=row.comeUv
      			this.edit_taoke_buffer.shopPayQty=row.shopPayQty
      			this.edit_taoke_buffer.pactMoneyRate=row.pactMoneyRate
      			this.edit_taoke_buffer.shopPayment=row.shopPayment


      		},
      		edit_taoke_data_dialog_pactMoneyRate(row){

      			this.edittaokedatadialog_pactMoneyRateVisible=true
      			this.edit_taoke_buffer.shopId=row.shopId
      			this.edit_taoke_buffer.time=row.time
      			this.edit_taoke_buffer.clickNum=row.clickNum
      			this.edit_taoke_buffer.comeUv=row.comeUv
      			this.edit_taoke_buffer.shopPayQty=row.shopPayQty
      			this.edit_taoke_buffer.pactMoneyRate=row.pactMoneyRate
      			this.edit_taoke_buffer.shopPayment=row.shopPayment


      		},
      		edit_taoke_data_dialog_shopPayment(row){

      			this.edittaokedatadialog_shopPaymentVisible=true
      			this.edit_taoke_buffer.shopId=row.shopId
      			this.edit_taoke_buffer.time=row.time
      			this.edit_taoke_buffer.clickNum=row.clickNum
      			this.edit_taoke_buffer.comeUv=row.comeUv
      			this.edit_taoke_buffer.shopPayQty=row.shopPayQty
      			this.edit_taoke_buffer.pactMoneyRate=row.pactMoneyRate
      			this.edit_taoke_buffer.shopPayment=row.shopPayment

      		},
      		edit_taoke_data_dialog(row){

      			//this.rowedit_taoke_data_dialog = row
      			this.edittaokedatadialogVisible=true
      			//row.time = 887  			
      			this.edit_taoke_buffer.shopId=row.shopId
      			this.edit_taoke_buffer.time=row.time
      			this.edit_taoke_buffer.clickNum=row.clickNum
      			this.edit_taoke_buffer.comeUv=row.comeUv
      			this.edit_taoke_buffer.shopPayQty=row.shopPayQty
      			this.edit_taoke_buffer.pactMoneyRate=row.pactMoneyRate
      			this.edit_taoke_buffer.shopPayment=row.shopPayment
				
      		},

      		//提交数据为0警告\\修改数传递
      		edit_taoke_data(type){

				if(type==1 &&this.edit_taoke_buffer.shopPayQty==0){
					return this.$message({
			          message: "店铺销量不能为0，请重新设置",
			          type: 'warning'
			    	});

				}
				if(type==2 &&this.edit_taoke_buffer.shopPayment==0){
					return this.$message({
			          message: "店铺销售额不能为0，请重新设置",
			          type: 'warning'
			    	});

				}
				if(type==3 &&this.edit_taoke_buffer.clickNum==0){
					return this.$message({
			          message: "点击数不能为0，请重新设置",
			          type: 'warning'
			    	});

				}
				if(type==4 &&this.edit_taoke_buffer.comeUv==0){
					return this.$message({
			          message: "进店UV不能为0，请重新设置",
			          type: 'warning'
			    	});

				}
				if(type==5 &&this.edit_taoke_buffer.pactMoneyRate==0){
					return this.$message({
			          message: "合同佣金率不能为0，请重新设置",
			          type: 'warning'
			    	});

				}

				if(type==10 &&(this.edit_taoke_buffer.shopPayQty==0||this.edit_taoke_buffer.shopPayment==0||this.edit_taoke_buffer.clickNum==0||this.edit_taoke_buffer.comeUv==0||this.edit_taoke_buffer.pactMoneyRate==0)){
					return this.$message({
			          message: "各项数据均不能为0，请重新设置值为0的数据",
			          type: 'warning'
			    	});

				}

     			
      			this.$http.post(`import/update_tk_sell`,{
      				shopId:this.edit_taoke_buffer.shopId,
      				time:this.edit_taoke_buffer.time,
					clickNum:this.edit_taoke_buffer.clickNum,
					comeUv:this.edit_taoke_buffer.comeUv,
					shopPayQty:this.edit_taoke_buffer.shopPayQty,
					pactMoneyRate:this.edit_taoke_buffer.pactMoneyRate,
					shopPayment:this.edit_taoke_buffer.shopPayment,

										
				})
				.then((data)=>{
					
					if (data.code == 200) {
						this.$message({
				          message: data.msg,
				          type: 'success'
				    	});

				    	this.edittaokedatadialogVisible = false
				    	this.edittaokedatadialog_clickNumVisible=false
				    	this.edittaokedatadialog_comeUvVisible=false
				    	this.edittaokedatadialog_shopPayQtyVisible=false
				    	this.edittaokedatadialog_pactMoneyRateVisible=false
				    	this.edittaokedatadialog_shopPaymentVisible=false

				    	//this.rowedit_taoke_data_dialog.clickNum = this.edit_taoke_buffer.clickNum

					}
					
				//this.search_taoke_data()	
				})
      		},
      		//合计、详情切换触发页面数据刷新
      		// choice_change(){
      		// 	//console.log(this.choice)
      		// 	this.search_taoke_data()
      		// },
      		//日期从毫秒到年月日
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

		//监听数据为0时警告
		watch:{
			edit_taoke_buffer:{
				 handler:function(val){
					//console.info(val.clickNum)

					if(val.clickNum==="0"||val.comeUv==="0"||val.shopPayQty==="0"||val.pactMoneyRate==="0"||val.shopPayment==="0"){						
						this.$message({
				          message: "该数据不能为0，请重新设置",
				          type: 'warning'
				    	});
					}
					
				},
				deep: true
										
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
        width: 100%; 
        
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

		.input{
			position: absolute;
			right: 90px;
        	width: 180px;
            display: inline-block;
        }
        


      }
  }
}        

</style>