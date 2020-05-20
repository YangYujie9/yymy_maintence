<template>
  <div ref="sale_show" class="sale_show">
  	<div class="sale_show-left">
  		<div v-show="!searctrue" class="sale_show-left-top">
  			<div class="title">
  				近15天汇总

  				<div style="width: 140px"  class="changetab">
  					<div style="display: inline-block;" class="el-checkbox-group">

			          <label @click="changefifteen_pay(list)" v-for="list in MainBrandBattle_tab" class="el-checkbox-button el-checkbox-button--small">
			            <span :class="{'is-checkeda': list.check}"  class="el-checkbox-button__inner">{{list.name}}</span>
			          </label>
			        
			        </div>
  				</div>
  			</div>
  			<div class="wrap_num">
  				<div @click="sell_main_show_click('4')" class="wrap_detail pointer">
  					<p class="flex_one">全公司</p>
  					<p style="color: red;font-size: 18px;">{{data_tpfix_two(payment.allShopPayment)}}</p>
  				</div>
  				<div @click="sell_main_show_click('1')" class="wrap_detail pointer">
  					<p class="flex_one">菲碧</p>
  					<p style="color: #0099ff;font-size: 18px;">{{data_tpfix_two(payment.fbPayment)}}</p>
  				</div>
  				<div @click="sell_main_show_click('2')" class="wrap_detail pointer">
  					<p class="flex_one">初彤</p>
  					<p style="color: #00cc99;font-size: 18px;">{{data_tpfix_two(payment.ctPayment)}}</p>
  				</div>
  				<div  @click="sell_main_show_click('3')" class="wrap_detail pointer">
  					<p class="flex_one">形色</p>
  					<p style="color: #ffcc00;font-size: 18px;">{{data_tpfix_two(payment.xsPayment)}}</p>
  				</div>
  				<div class="wrap_detail">
  					<p class="flex_one">纳杰</p>
  					<p style="color: #996666;font-size: 18px;">{{data_tpfix_two(payment.njPayment)}}</p>
  				</div>
  			</div>
  		</div>
  		<div v-show="searctrue" class="sale_show-left-top">
  			<div class="title">
  				近15天汇总
  				<div style="width: 140px"  class="changetab">
  					<div style="display: inline-block;" class="el-checkbox-group">

			          <label @click="changefifteen_pay(list)" v-for="list in MainBrandBattle_tab" class="el-checkbox-button el-checkbox-button--small">
			            <span :class="{'is-checkeda': list.check}"  class="el-checkbox-button__inner">{{list.name}}</span>
			          </label>
			        
			        </div>
  				</div>
  			</div>
  			<div class="wrap_num wrap_num_a">
  				<div class="wrap_detail">
  					<p class="flex_one">{{search.searchname}}</p>
  					<p style="color: red;font-size: 18px;">{{data_tpfix_two(search.allShopPayment)}}</p>
  				</div>
  				<div class="wrap_detail">
  					<p class="flex_one">C店</p>
  					<p style="color: #0099ff;font-size: 18px;">{{data_tpfix_two(search.tbPayment)}}</p>
  				</div>
  				<div class="wrap_detail">
  					<p class="flex_one">天猫</p>
  					<p style="color: #00cc99;font-size: 18px;">{{data_tpfix_two(search.tmPayment)}}</p>
  				</div>
  				<div class="wrap_detail">
  					<p  class="flex_one">返回</p>
  					<p @click="returnsearctrue" class="pointer" style="color: #ffcc00;font-size: 18px;">

  						<el-button style="font-size: 28px;position: relative;top: -10px;padding: 2px 4px 2px 4px;"  icon="el-icon-back"></el-button>
  					</p>
  				</div>
  				
  			</div>
  		</div>
  		<div style="position: relative;" :style="{height: secondtableheight + 'px'}" class="sale_show-left-second">

			<div style="position: absolute;right: 30px;width: 180px;height: 40px;top: 50px;font-size: 12px;">
				<p>今日数据导入情况:
					
				</p>
				<p style="margin-top: 4px;">
					<span style="padding-right: 6px;">菲碧：
						<i style="color: red" v-if="!import_status_feibi" class="el-icon-error"></i>
						<i style="color: green" v-if="import_status_feibi" class="el-icon-success"></i>
					</span>
					<span style="padding-right: 6px;">初彤：
						<i style="color: red" v-if="!import_status_chutong" class="el-icon-error"></i>
						<i style="color: green" v-if="import_status_chutong" class="el-icon-success"></i>

					</span>
					<span>形色：
						<i style="color: red" v-if="!import_status_xingse" class="el-icon-error"></i>
						<i style="color: green" v-if="import_status_xingse" class="el-icon-success"></i>
					</span>
				</p>
			</div>

  			<div  class="title">
  				<span v-show="!searctrue">近15天趋势图<span style="font-size: 12px;">
  				</span></span>
  				<span v-show="searctrue">{{search.searchname}}近15天趋势图</span>

  				<i @click="sell_shop_type_battle_table" class="iconfont iconjichuxinxishezhi pointer"></i>

  				
  				
  			</div>
  			<div v-show="show_detail_fifteen" id="fif_wrap" :style="{height: (secondtableheight - 50) + 'px'}" class="fif_wrap">


  				
  			</div>

        <div v-show="!show_detail_fifteen" id="fif_wrap_one" :style="{height: (secondtableheight - 50) + 'px'}" class="fif_wrap_one">
        </div>


  			

  			

  		</div>
  		<div :style="{height: lasttableheight + 'px'}"  class="sale_show-left-second sale_show-left-third">
  			<div style="position: relative;" class="title">
  				往年趋势图
  				

  				<i @click="lastyearshow = true" class="iconfont iconjichuxinxishezhi pointer"></i>
  				<div class="changetab">
  					<div style="display: inline-block;" class="el-checkbox-group">

			          <label @click="changelast_brand(list)" v-for="list in last_year_brand_tab" class="el-checkbox-button el-checkbox-button--small">
			            <span :class="{'is-checkeda': list.check}"  class="el-checkbox-button__inner">{{list.name}}</span>
			          </label>
			        
			        </div>

			        
  				</div>

  				
  			</div>
  			<div :style="{height: (lasttableheight -60) +'px' }" id="other_wrap" class="fif_wrap">
  				
  			</div>
  			<!--<p style="text-align: center;">
  				<span class="pointer" @click="sell_main_show('1','菲碧往年销售额趋势图')" style="display: inline-block;width: 10px;height: 10px;border-radius: 50%;background: #f4f4f4;margin-right: 10px;">
  					
  				</span>
  				<span class="pointer" @click="sell_main_show('2','初彤往年销售额趋势图')" style="display: inline-block;width: 10px;height: 10px;border-radius: 50%;background: #f4f4f4;margin-right: 10px;">
  				</span>
  				<span class="pointer" @click="sell_main_show('3','形色往年销售额趋势图')" style="display: inline-block;width: 10px;height: 10px;border-radius: 50%;background: #f4f4f4;margin-right: 10px;">
  				</span>

  			</p>-->



  		</div>
  	</div>
  	<div class="sale_show-right">
  		<div ref="sale_show_right_top" class="sale_show-right-top">
  			<p class="title">近15天占比情况</p>
  			<div id="circle_one" :style="{height :righttop_tableheight+'px'}" style="position: relative;height: 42%;" class="circle_wrap">
  			</div>
  			<div id="circle_two" :style="{height :righttop_tableheight+'px'}"  style="position: relative;height: 42%;" class="circle_wrap">
  			</div>
  			<div  style="position: relative;height:20px;text-align: center;font-size: 18px;font-weight: bold" class="circle_wrap">
  				全公司
  			</div>
  			<div  style="position: relative;height:20px;text-align: center;font-size: 18px;font-weight: bold" class="circle_wrap">
  				菲碧
  			</div>
  			<div id="circle_three" :style="{height :righttop_tableheight+'px'}"  style="position: relative;height: height: 42%;" class="circle_wrap">
  			</div>
  			<div id="circle_four" :style="{height :righttop_tableheight+'px'}"  style="position: relative;height: height: 42%;" class="circle_wrap">
  			</div>

  		</div>
  		<div :style="{height: lasttableheight + 'px'}" class="sale_show-right-top sale_show-right-second">
  			<p style="padding-top: 10px;padding-left: 10px"  lass="title">店铺排行TOP</p>

  			<div  id="store_sale" :style="{height: (lasttableheight -10) +'px' }" class="total_wrap">
  				
  			</div>
  		</div>
  	</div>
    
    <el-dialog
	  
	  :visible.sync="lastyearshow"
	  width="1500px"
	  >
	  <span slot="title" class="dialog-footer">
	  	{{namelastyear}}往年数据
	  </span>
	  <div style="width: 1464px;">

			<el-table
		    :data="lastyeartablearray"
		    height="660"
		    border
		    :cell-style="changecellcolor_lastyear"
		    :header-cell-style='{"background": "#a6a6a6",
		    		"border-right": "1px solid #ffffff",
		    		"color": "#222d30","padding": "4px","text-align": "center"}'

		    style="width: 100%">
		    <el-table-column
		      prop="date"
		      label="日期"
		      align="center"
		      width="60">
		      	<template slot-scope="scope">
                  	{{scope.row.month == 13 ? '合计' : `${scope.row.month}月`}}
                     
                      
                      
                </template>
		    </el-table-column>

		    <el-table-column
	          prop="province"
	          label="C店"
	          align="center"

	          width="110">
	          <template slot="header" slot-scope="scope">
              	{{1900+new Date().getYear()-4}}年销量
                 
                  
                  
              </template>
	          <template slot-scope="scope">
              	{{scope.row[`${1900+new Date().getYear()-4}_a`].payQty}}
                 
                  
                  
              </template>
	        </el-table-column>
	        <el-table-column
	          prop="province"
	          label="C店"
	          align="center"
	          width="120">
	          <template slot="header" slot-scope="scope">
              	{{1900+new Date().getYear()-4}}年销售额
                 
                  
                  
              </template>
	          <template slot-scope="scope">
              	{{scope.row[`${1900+new Date().getYear()-4}_a`].payment}}
                 
                  
                  
              </template>
	        </el-table-column>
	        <el-table-column
	          prop="province"
	          label="C店"
	          align="center"
	          width="120">
	          <template slot="header" slot-scope="scope">
              	{{1900+new Date().getYear()-4}}年件单价
                 
                  
                  
              </template>
	          <template slot-scope="scope">
              	{{scope.row[`${1900+new Date().getYear()-4}_a`].oneWarePrice}}
                 
                  
                  
              </template>
	        </el-table-column>
		     
	        <el-table-column
	          prop="province"
	          label="C店"
	          align="center"

	          width="110">
	          <template slot="header" slot-scope="scope">
              	{{1900+new Date().getYear()-3}}年销量
                 
                  
                  
              </template>
	          <template slot-scope="scope">
              	{{scope.row[`${1900+new Date().getYear()-3}_a`].payQty}}
                 
                  
                  
              </template>
	        </el-table-column>
	        <el-table-column
	          prop="province"
	          label="C店"
	          align="center"
	          width="120">
	          <template slot="header" slot-scope="scope">
              	{{1900+new Date().getYear()-3}}年销售额
                 
                  
                  
              </template>
	          <template slot-scope="scope">
              	{{scope.row[`${1900+new Date().getYear()-3}_a`].payment}}
                 
                  
                  
              </template>
	        </el-table-column>
	        <el-table-column
	          prop="province"
	          label="C店"
	          align="center"
	          width="120">
	          <template slot="header" slot-scope="scope">
              	{{1900+new Date().getYear()-3}}年件单价
                 
                  
                  
              </template>
	          <template slot-scope="scope">
              	{{scope.row[`${1900+new Date().getYear()-3}_a`].oneWarePrice}}
                 
                  
                  
              </template>
	        </el-table-column>
	        <el-table-column
	          prop="province"
	          label="C店"
	          align="center"
	          width="110">
	          <template slot="header" slot-scope="scope">
              	{{1900+new Date().getYear()-2}}年销量
                 
                  
                  
              </template>
	          <template slot-scope="scope">
              	{{scope.row[`${1900+new Date().getYear()-2}_a`].payQty}}
                 
                  
                  
              </template>
	        </el-table-column>
	        <el-table-column
	          prop="province"
	          label="C店"
	          align="center"
	          width="120">
	          <template slot="header" slot-scope="scope">
              	{{1900+new Date().getYear()-2}}年销售额
                 
                  
                  
              </template>
	          <template slot-scope="scope">
              	{{scope.row[`${1900+new Date().getYear()-2}_a`].payment}}
                 
                  
                  
              </template>
	        </el-table-column>
	        <el-table-column
	          prop="province"
	          label="C店"
	          align="center"
	          width="120">
	          <template slot="header" slot-scope="scope">
              	{{1900+new Date().getYear()-2}}年件单价
                 
                  
                  
              </template>
	          <template slot-scope="scope">
              	{{scope.row[`${1900+new Date().getYear()-2}_a`].oneWarePrice}}
                 
                  
                  
              </template>
	        </el-table-column>


	        <el-table-column
	          prop="province"
	          label="C店"
	          align="center"
	          width="110">
	          <template slot="header" slot-scope="scope">
              	{{1900+new Date().getYear()-1}}年销量
                 
                  
                  
              </template>
	          <template slot-scope="scope">
              	{{scope.row[`${1900+new Date().getYear()-1}_a`].payQty}}
                 
                  
                  
              </template>
	        </el-table-column>
	        <el-table-column
	          prop="province"
	          label="C店"
	          align="center"
	          width="120">
	          <template slot="header" slot-scope="scope">
              	{{1900+new Date().getYear()-1}}年销售额
                 
                  
                  
              </template>
	          <template slot-scope="scope">
              	{{scope.row[`${1900+new Date().getYear()-1}_a`].payment}}
                 
                  
                  
              </template>
	        </el-table-column>
	        <el-table-column
	          prop="province"
	          label="C店"
	          align="center"
	          width="120">
	          <template slot="header" slot-scope="scope">
              	{{1900+new Date().getYear()-1}}年件单价
                 
                  
                  
              </template>
	          <template slot-scope="scope">
              	{{scope.row[`${1900+new Date().getYear()-1}_a`].oneWarePrice}}
                 
                  
                  
              </template>
	        </el-table-column>


	        <el-table-column
	          prop="province"
	          label="C店"
	          align="center"
	          width="110">
	          <template slot="header" slot-scope="scope">
              	{{1900+new Date().getYear()}}年销量
                 
                  
                  
              </template>
	          <template slot-scope="scope">
              	{{scope.row[`${1900+new Date().getYear()}_a`].payQty}}
                 
                  
                  
              </template>
	        </el-table-column>
	        <el-table-column
	          prop="province"
	          label="C店"
	          align="center"
	          width="120">
	          <template slot="header" slot-scope="scope">
              	{{1900+new Date().getYear()}}年销售额
                 
                  
                  
              </template>
	          <template slot-scope="scope">
              	{{scope.row[`${1900+new Date().getYear()}_a`].payment}}
                 
                  
                  
              </template>
	        </el-table-column>
	        <el-table-column
	          prop="province"
	          label="C店"
	          align="center"
	          width="120"
	          >
	          <template slot="header" slot-scope="scope">
              	{{1900+new Date().getYear()}}年件单价
                 
                  
                  
              </template>
	          <template slot-scope="scope">
              	{{scope.row[`${1900+new Date().getYear()}_a`].oneWarePrice}}
                 
                  
                  
              </template>
	        </el-table-column>
	        
		    
		</el-table>
	</div>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="lastyearshow = false">取 消</el-button>
	  </span>
	</el-dialog>


	<el-dialog
			  title="每日明细"
			  :visible.sync="fifbiaogeshow"
			  width="1460px"

			  >
			  <div style="width: 1440px;">
  				<el-table
				    :data="tableData"
				    height="485"
				    
				    :header-cell-style='{"background": "#a6a6a6",
		    		"border-right": "1px solid #ffffff",
		    		"color": "#222d30","padding": "4px","text-align": "center"}'
		    		:cell-style="changecellcolor"
				    style="width: 98%">
				    <el-table-column
				      prop="date"
				      label="日期"
				      align="center"

				      width="110">
				      	<template slot-scope="scope">
                          	{{fmtDate(scope.row.time)}}
	                         
	                          
	                          
	                    </template>
				    </el-table-column>
				     
				    <el-table-column label="总计">
              <el-table-column
                  prop="address"
                  label="总"
                  align="center"
                  width="100">
                   <template slot-scope="scope">
                            {{scope.row.map ? (scope.row.map['0-0'] ? scope.row.map['0-0']: '') : ''}}
                           
                            
                            
                        </template>
                </el-table-column>
				        <el-table-column
				          prop="province"
				          label="C店"
				          align="center"
				          width="100">
				          <template slot-scope="scope">
                          	{{scope.row.map ? (scope.row.map['0-1'] ? scope.row.map['0-1']: '') : ''}}
	                         
	                          
	                          
	                      </template>
				        </el-table-column>
				        <el-table-column
				          prop="city"
				          label="天猫"
				          align="center"
				          width="100">
				          <template slot-scope="scope">
                          	{{scope.row.map ? (scope.row.map['0-2'] ? scope.row.map['0-2']: '') : ''}}
	                         
	                          
	                          
	                      </template>
				        </el-table-column>
				        
				        
				    </el-table-column>
				    <el-table-column label="菲碧">
              <el-table-column
                  prop="address"
                  label="总"
                  align="center"
                  width="100">
                   <template slot-scope="scope">
                            {{scope.row.map ? (scope.row.map['1-0'] ? scope.row.map['1-0']: '') : ''}}
                           
                            
                            
                        </template>
                </el-table-column>
				        <el-table-column
				          prop="province"
				          label="C店"
				          align="center"
				          width="100">
				          <template slot-scope="scope">
                          	{{scope.row.map ? (scope.row.map['1-1'] ? scope.row.map['1-1']: '') : ''}}
	                         
	                          
	                          
	                      </template>
				        </el-table-column>
				        <el-table-column
				          prop="city"
				          label="天猫"
				          align="center"
				          width="100">
				          <template slot-scope="scope">
                          	{{scope.row.map ? (scope.row.map['1-2'] ? scope.row.map['1-2']: '') : ''}}
	                         
	                          
	                          
	                      </template>
				        </el-table-column>
				        
				        
				    </el-table-column>
				    <el-table-column label="初彤">
                <el-table-column
                  prop="address"
                  label="总"
                  align="center"
                  width="100">
                   <template slot-scope="scope">
                            {{scope.row.map ? (scope.row.map['2-0'] ? scope.row.map['2-0']: '') : ''}}
                           
                           
                            
                            
                        </template>
                </el-table-column>
				        <el-table-column
				          prop="province"
				          label="C店"
				          align="center"
				          width="100">
				          <template slot-scope="scope">
                          	{{scope.row.map ? (scope.row.map['2-1'] ? scope.row.map['2-1']: '') : ''}}
	                         
	                          
	                          
	                      </template>
				        </el-table-column>
				        <el-table-column
				          prop="city"
				          label="天猫"
				          align="center"
				          width="100">
				          <template slot-scope="scope">
                          	{{scope.row.map ? (scope.row.map['2-2'] ? scope.row.map['2-2']: '') : ''}}
	                         
	                          
	                          
	                      </template>
				        </el-table-column>
				        
				        
				    </el-table-column>
				    <el-table-column label="形色">
              <el-table-column
                  prop="address"
                  label="总"
                  align="center"
                  width="100">
                   <template slot-scope="scope">
                            {{scope.row.map ? (scope.row.map['3-0'] ? scope.row.map['3-0']: '') : ''}}
                            
                            
                        </template>
                </el-table-column>
                
				        <el-table-column
				          prop="province"
				          label="C店"
				          align="center"
				          width="100">
				          <template slot-scope="scope">
                          	{{scope.row.map ? (scope.row.map['3-1'] ? scope.row.map['3-1']: '') : ''}}
	                         
	                          
	                          
	                      </template>
				        </el-table-column>
				        <el-table-column
				          prop="city"
				          label="天猫"
				          align="center"
				          width="100">
				          <template slot-scope="scope">
                          	{{scope.row.map ? (scope.row.map['3-2'] ? scope.row.map['3-2']: '') : ''}}
	                         
	                          
	                          
	                      </template>
				        </el-table-column>
				        
				    </el-table-column>
				    <el-table-column label="纳杰">
				    	<el-table-column
				          prop="address"
				          label="总"
				          align="center"
				          width="100">
				           <template slot-scope="scope">
                          	{{scope.row.map ? (scope.row.map['4-0'] ? scope.row.map['4-0']: '') : ''}}
	                         
	                          
	                          
	                      </template>
				        </el-table-column>
				        
				    </el-table-column>
	  				</el-table>
	  			</div>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="fifbiaogeshow = false">取 消</el-button>
			  </span>
			</el-dialog>
    
  </div>
</template>

<script>
import echarts from 'echarts'
import { mapGetters } from 'vuex'
var salefifteen_chart 
var salefifteen_chart_search
var other_wrap_chart
var circle_one_chart
var circle_two_chart
var circle_three_chart
var circle_four_chart
var store_sale_chart

  export default {
    name: "system-setting",
    data(){
      return{
        show_detail_fifteen: true,
      	last_year_brand_tab: [
      		{
      			name: '菲碧',
      			check: true,
      			id: 1,
      		},
      		{
      			name: '初彤',
      			check: false,
      			id: 2,
      		},
      		{
      			name: '形色',
      			check: false,
      			id: 3,
      		},
      	],
      	
      	MainBrandBattle_tab: [
      		{
      			name: '销售量',
      			check: true,
      			id: 1,
      		},
      		{
      			name: '销售额',
      			check: false,
      			id: 2,
      		},
      		
      	],
      	lastyearshow: false,
      	fifbiaogeshow: false,
      	tableData: [],
      	lasttableheight: '',
      	payment: {
      		allShopPayment: 0,
			allShopTbPayment: 0,
			allShopTmPayment: 0,
			ctPayment: 0,
			ctTbPayment: 0,
			ctTmPayment: 0,
			fbPayment: 0,
			fbTbPayment: 0,
			fbTmPayment: 0,
			njPayment: 0,
			xsPayment: 0,
			xsTbPayment: 0,
			xsTmPayment: 0

      	},
      	searctrue: false,
      	search: {
      		searchname: '全公司',
      		allShopPayment: 0,
      		tbPayment: 0,
			tmPayment: 3667523.51
      		
      	},
      	store_sale_option: {
      		color: ['#61a5e8'],
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
		        left: '4%',
		        right: '4%',
		        bottom: '1%',
		        containLabel: true
		    },
		    xAxis: {
		        
		        show: false
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
			            	position: 'insideLeft',
					        show: true,
					        textBorderColor: '#333',
					        textBorderWidth: 2
					    }
					},
		            data: []
		        },
		        
		    ]
		},

      	circle_one_option: {
      		color: ['#66cbff', '#ff6766'],
      		title: {
      			show: false,
		        text: '全公司',
		        x: 'center',
		        y: 'bottom'
		    },
		    
		    tooltip: {
		        trigger: 'item',
		        formatter: "{b}: {c} ({d}%)"
		    },
		    legend: {
		        orient: 'center',
		        x: 'left',
		        data:['天猫','c店'],
		        
		    },
		    series: [
		        {	
		            type:'pie',
		            radius : '70%',
		            center: ['50%', '60%'],
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
		            data:[
		                {value:335, name:'天猫'},
		                {value:310, name:'c店'},
		            ]
		        }
		    ]
		},

		circle_two_option: {
      		color: ['#66cbff', '#ff6766'],
      		title: {
      			show: false,
		        text: '菲碧',
		        x: 'center',
		        y: 'bottom'
		    },
		    tooltip: {
		        trigger: 'item',
		        formatter: "{b}: {c} ({d}%)"
		    },
		    legend: {
		        orient: 'center',
		        x: 'left',
		        data:['天猫总销售额','c店总销售额'],
		        show: false,
		        
		    },
		    series: [
		        {	
		            type:'pie',
		            radius : '70%',
		            center: ['50%', '60%'],
		            avoidLabelOverlap: false,
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
		            data:[
		                {value:335, name:'天猫'},
		                {value:310, name:'c店'},
		            ]
		        }
		    ]
		},
		circle_three_option: {
      		color: ['#66cbff', '#ff6766'],
      		title: {
		        text: '初彤',
		        x: 'center',
		        y: 'bottom'
		    },
		    tooltip: {
		        trigger: 'item',
		        formatter: "{b}: {c} ({d}%)"
		    },
		    legend: {
		        orient: 'center',
		        x: 'left',
		        data:['天猫','c店'],
		        show: false,
		        
		    },
		    series: [
		        {	
		            type:'pie',
		            radius : '70%',
		            center: ['50%', '40%'],
		            avoidLabelOverlap: false,
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
		            data:[
		                {value:335, name:'天猫'},
		                {value:310, name:'c店'},
		            ]
		        }
		    ]
		},
		circle_four_option: {
      		color: ['#66cbff', '#ff6766'],
      		title: {
		        text: '形色',
		        x: 'center',
		        y: 'bottom'
		    },
		    tooltip: {
		        trigger: 'item',
		        formatter: "{b}: {c} ({d}%)"
		    },
		    legend: {
		        orient: 'center',
		        x: 'left',
		        data:['天猫','c店'],
		        show: false,
		        
		    },
		    series: [
		        {	
		            type:'pie',
		            radius : '70%',
		            center: ['50%', '40%'],
		            avoidLabelOverlap: false,
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
		            data:[
		                {value:335, name:'天猫'},
		                {value:310, name:'c店'},
		            ]
		         }
		    ]
		},


      	other_wrap_option: {
		    color: ['#61a5e8', '#75cf51', '#eecb5f', '#e3935d','#ff0000'],
        //十二色备选
        //color: ['#ff0000', '#ff8000', '#ffff00', '#80ff00','#00ff00','#00ff80','#00ffff','#0080ff','#0000ff','#8000ff','#ff00ff','ff0080'],
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {
		            type: 'shadow'
		        }
		    },
		    legend: {
		        data: [],
		        x: 'center',
		        y: 'bottom'

		    },
		    grid: {
		    	top: '3%',
		        left: '4%',
		        right: '4%',
		        bottom: '10%',
		        containLabel: true
		    },
		    toolbox: {
		        show: true,
		        orient: 'vertical',
		        left: 'right',
		        top: 'center',
		        
		    },
		    calculable: true,
		    xAxis: [
		        {
		            type: 'category',
		            axisTick: {show: false},
		            data: []
		        }
		    ],
		    yAxis: [
		        {
		            type: 'value',
		            axisTick: {
			        	show: false
			        },
		        }
		    ],
		    series: [
		        
		    ]
		},
        salefifteen: {
        color: ['#ff0000','#61a5e8', '#75cf51', '#eecb5f', '#e3935d','#996666'],
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
		namelastyear: '',
		catagorylastyear: '销售额',
		secondtableheight: '',
		righttop_tableheight: '',
		lastyeartablearray: [],
		salefifteensearch: {
        	color: ['#ff0000','#61a5e8', '#75cf51', '#eecb5f', '#e3935d','#996666'],
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
		search_catagory: {
			brandId: '',
			type: '1',
			last_year_catagory_tab_id: ''
		},
		last_year_payment: [],
		last_year_payQty: [],
		last_year_oneWarePrice: [],
    last_year_start:2016,
		import_status_feibi: '',
		import_status_chutong: '',
		import_status_xingse: '',
		
      }
    },
    computed: {
        ...mapGetters([
            'getpageDict',
        ]),
        getbrand() {
            let demand_status = this.getpageDict.filter((list) => {
                return list.dicType == "brand"
            })

            return demand_status[0].dicList
        },
    },
    created() {
        
    },
    mounted(){ 
     		

        	 //other_wrap_chart = echarts.init(document.getElementById('other_wrap'))
	        			//other_wrap_chart.setOption(this.other_wrap_option)	
        	
        	
        	this.$nextTick(()=>{
        		this.secondtableheight = this.$refs.sale_show.offsetHeight * 0.55 - 161
	            this.lasttableheight = this.$refs.sale_show.offsetHeight - this.$refs.sale_show_right_top.offsetHeight - 30

	            this.righttop_tableheight = this.$refs.sale_show.offsetHeight * 0.55/2 - 60

	            

	            setTimeout(()=>{

	            	this.sell_main_show_tow('1','菲碧')
	            },0)
	            

	           
	           
	        })

	        this.sell_import_status()


        	

        	
    },
    methods:{
    	data_tpfix_two(data) {
    		let string = String(data)
    		if (string.indexOf('.')>0) {
    			return data.toFixed(2)
    		} else {
    			return data
    		}
    		
    	},
    	changecellcolor({row, column, rowIndex, columnIndex}) {

    		if (columnIndex == 0) {
    			return {'background': "#d9d9d9","padding-top": "2px","padding-bottom": "2px"}
    		} else if (columnIndex >0 && columnIndex <4) {
    			return {'background': "#ffe699","padding-top": "2px","padding-bottom": "2px"}
    		} else if (columnIndex >3 && columnIndex <7) {
    			return {'background': "#bdd7ee","padding-top": "2px","padding-bottom": "2px"}
    		} else if (columnIndex >6 && columnIndex <10) {
    			return {'background': "#f8cbad","padding-top": "2px","padding-bottom": "2px"}
    		} else if (columnIndex >9 && columnIndex <13) {
    			return {'background': "#c6e0b4","padding-top": "2px","padding-bottom": "2px"}
    		} else {
    			return {'background': "#b4c6e7","padding-top": "2px","padding-bottom": "2px"}
    		}
    		
    	},
    	changecellcolor_lastyear({row, column, rowIndex, columnIndex}) {
    		//console.info(columnIndex)
    		if (columnIndex == 0) {
    			return {'background': "#d9d9d9"}
    		} else if (columnIndex >0 && columnIndex <4) {
    			return {'background': "#61a5e8"}
    		} else if (columnIndex >3 && columnIndex <7) {
    			return {'background': "#75cf51"}
    		} else if (columnIndex >6 && columnIndex <10) {
    			return {'background': "#eecb5f"}
    		} else if (columnIndex >9 && columnIndex <13) {
    			return {'background': "#e3935d"}
    		} else {
    			return {'background': "#b4c6e7"}
    		}
    		
    	},
    	changefifteen_pay(list) {

    		for (let i=0;i<this.MainBrandBattle_tab.length;i++) {
    			this.MainBrandBattle_tab[i].check = false
    		}
    		this.search_catagory.type = list.id

    		list.check = true

    		if(this.searctrue){
    			if(this.search.searchname == '全公司'){
    				this.sell_main_show_click('4')
    			} else if(this.search.searchname == '菲碧'){
    				this.sell_main_show_click('1')
    			} else if(this.search.searchname == '初彤'){
    				this.sell_main_show_click('2')
    			} else if(this.search.searchname == '形色'){
    				this.sell_main_show_click('3')
    			}
    		} else{
    			this.sell_main_show()
    		}
    		

    	},
    	sell_main_show_tow() {
    		this.namelastyear = name
      		this.catagorylastyear = '销售额'

      		this.sell_main_show()
    	},
    	changelast_catagory(list) {
    		for (let i=0;i<this.last_year_catagory_tab.length;i++) {
    			this.last_year_catagory_tab[i].check = false
    		}

    		this.catagorylastyear = list.name

    		list.check = true

    		this.other_wrap_option.series = this[list.id]


	      			
  			if (other_wrap_chart) {
                other_wrap_chart.clear()
                other_wrap_chart = null
            }
            this.$nextTick(()=>{

      			other_wrap_chart = echarts.init(document.getElementById('other_wrap'))
    			other_wrap_chart.setOption(this.other_wrap_option)
			})


    	},
    	changelast_brand(list) {
    		for (let i=0;i<this.last_year_brand_tab.length;i++) {
    			this.last_year_brand_tab[i].check = false
    		}

    		

    		list.check = true

    		this.catagorylastyear = '销售额'

    		this.search_catagory.brandId = list.id



    		this.sell_main_show()

    	},
    	showmore_brand(id) {
    		

    		this.catagorylastyear = '销售额'

    		this.search_catagory.brandId = id



    		this.sell_main_show()

    	},
    	returnsearctrue() {
    		this.searctrue = false
    		if (salefifteen_chart) {
                salefifteen_chart.clear()
                salefifteen_chart = null
            }
          this.$nextTick(()=>{

      			salefifteen_chart = echarts.init(document.getElementById('fif_wrap'))
    			  salefifteen_chart.setOption(this.salefifteen)
			   })
          this.show_detail_fifteen = true

          this.sell_main_show()

    	},
    	sell_import_status() {
    		this.$http.get(`sell/sell_import_status`)
	      		.then((data)=>{
	      			this.import_status_feibi = true
	      			this.import_status_chutong = true
	      			this.import_status_xingse = true
	      			if (data.data.length){
	      				for (let i=0; i<data.data.length; i++) {

	      					if (data.data[i] == 1) {
	      						this.import_status_feibi = false
	      					} else if(data.data[i] == 2) {
	      						this.import_status_chutong = false
	      					} else if(data.data[i] == 3) {
	      						this.import_status_xingse = false
	      					}

	      				}
	      			}
	      			
	      		})
    	},
    	sell_shop_type_battle_table() {

    		this.fifbiaogeshow = true

    		
			this.$http.get(`sell/sell_shop_type_battle_table?type=${this.search_catagory.type ? this.search_catagory.type:1}`,{
	                
	            })
	      		.then((data)=>{
	      			this.tableData = []
	      			for (let i=0; i<data.data.length ;i++) {
	      				if (data.data[i].map && data.data[i].map['0-0']) {
	      					this.tableData.push(data.data[i])
	      				}
	      			}
	      		})
    	},

    	getbrandstatus(type) {

        //console.info(this.getbrand)

	        let name = ''
	        for (let i=0;i<this.getbrand.length;i++) {
	          if (this.getbrand[i].dicCode == type) {
	            name = this.getbrand[i].dicName


	            break
	          }
	        }

	        return name
	    },
	    fmtDate(obj){
            var date =  new Date(obj*1000);

            var y = 1900+date.getYear();
            var m = "0"+(date.getMonth()+1);
            var d = "0"+date.getDate();
            return y+"/"+m.substring(m.length-2,m.length)+"/"+d.substring(d.length-2,d.length);
      	},
    	fmtDate_md(obj){
          var date =  new Date(obj*1000);

          var y = 1900+date.getYear();
          var m = "0"+(date.getMonth()+1);
          var d = "0"+date.getDate();
          return m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
      	},

      	sell_main_show(brandId, name) {

      		this.payment.allShopPayment = ''
  			this.payment.ctPayment = ''
  			this.payment.fbPayment = ''
  			this.payment.njPayment = ''
  			this.payment.xsPayment = ''

  			let brandIdsearch = this.search_catagory.brandId ? this.search_catagory.brandId : 1
		
	      	this.$http.get(`sell/sell_main_show?brandId=${brandIdsearch}&type=${this.search_catagory.type ? this.search_catagory.type:1}`,{
	                
	            })
	      		.then((data)=>{
	      			//console.info(this.other_wrap_option)



	      			//菲碧往年销售额趋势图

	      			this.other_wrap_option.legend.data = []
	      			this.other_wrap_option.xAxis[0].data = []
	      			this.other_wrap_option.series = []

	      			let sellLastYear = 1900 + new Date().getYear()
              let years = sellLastYear - this.last_year_start

	      			this.last_year_payment = []
	      			this.last_year_payQty = []
	      			this.last_year_oneWarePrice = []

	      			//console.info(sellLastYear)
	      			for (let i=years+1; i>0; i--) {
	      				let yarn = String(sellLastYear-i+1)

	      				this.other_wrap_option.legend.data.push(yarn)

	      				this.last_year_payment.push({
	      					name: yarn,
				            type: 'bar',
				            barWidth: '6px',
				            data: [0,0,0,0,0,0,0,0,0,0,0,0]
	      				})
	      				this.last_year_payQty.push({
	      					name: yarn,
				            type: 'bar',
				            barWidth: '6px',
				            data: [0,0,0,0,0,0,0,0,0,0,0,0]
	      				})
	      				this.last_year_oneWarePrice.push({
	      					name: yarn,
				            type: 'bar',
				            barWidth: '6px',
				            data: [0,0,0,0,0,0,0,0,0,0,0,0]
	      				})


	      				/*this.other_wrap_option.series.push({
	      					name: yarn,
				            type: 'bar',
				            barWidth: '10px',
				            data: [0,0,0,0,0,0,0,0,0,0,0,0]
	      				})*/
	      			}




	      			//return

	      			for (let i=1;i<13;i++) {
	      				this.other_wrap_option.xAxis[0].data.push(i +'月')
	      			}




	      			

	      			for (let i=0;i<data.data.sellLastYearShowVOS.length;i++) {
	      				

	      					//for (let j=0;j<5;j++) {

	      					for (let j=0;j<data.data.sellLastYearShowVOS[i].list.length;j++) {


	      						

		      				  //this.other_wrap_option.series[data.data.sellLastYearShowVOS[i].list[j].year - sellLastYear+3].data[data.data.sellLastYearShowVOS[i].month-1] = data.data.sellLastYearShowVOS[i].list[j].payment



		      				  this.last_year_payment[data.data.sellLastYearShowVOS[i].list[j].year - sellLastYear+years].data[data.data.sellLastYearShowVOS[i].month-1] = data.data.sellLastYearShowVOS[i].list[j].payment

		      				  this.last_year_payQty[data.data.sellLastYearShowVOS[i].list[j].year - sellLastYear+years].data[data.data.sellLastYearShowVOS[i].month-1] = data.data.sellLastYearShowVOS[i].list[j].payQty

		      				  this.last_year_oneWarePrice[data.data.sellLastYearShowVOS[i].list[j].year - sellLastYear+years].data[data.data.sellLastYearShowVOS[i].month-1] = data.data.sellLastYearShowVOS[i].list[j].oneWarePrice


		      				}
	      				
	      				
	      			}







	      			

		    		//this.last_year_catagory_tab[0].check = true

		    		if (this.search_catagory.type && this.search_catagory.type == 1) {
		    			this.other_wrap_option.series = this.last_year_payQty
		    		} else {
		    			this.other_wrap_option.series = this.last_year_payment
		    		}




	      			


	      			
	      			if (other_wrap_chart) {
                        other_wrap_chart.clear()
                        other_wrap_chart = null
                    }
                    this.$nextTick(()=>{

		      			other_wrap_chart = echarts.init(document.getElementById('other_wrap'))
	        			other_wrap_chart.setOption(this.other_wrap_option)
        			})







	      			

	      			//菲碧往年销售额趋势图


	      			//feibi往年销售额表格图
	      			let tablearray = []

	      			for(let i=0;i<13;i++) {

	      				tablearray[i] = {}
	      				tablearray[i].month = i +1
	      				tablearray[i][`${sellLastYear}_a`] = {}
	      				tablearray[i][`${sellLastYear}_a`].oneWarePrice = 0
	      				tablearray[i][`${sellLastYear}_a`].payment = 0
	      				tablearray[i][`${sellLastYear}_a`].payQty = 0
	      				tablearray[i][`${sellLastYear-1}_a`] = {}
	      				tablearray[i][`${sellLastYear-1}_a`].oneWarePrice = 0
	      				tablearray[i][`${sellLastYear-1}_a`].payment = 0
	      				tablearray[i][`${sellLastYear-2}_a`] = {}
	      				tablearray[i][`${sellLastYear-2}_a`].oneWarePrice = 0
	      				tablearray[i][`${sellLastYear-2}_a`].payment = 0
	      				tablearray[i][`${sellLastYear-3}_a`] = {}
	      				tablearray[i][`${sellLastYear-3}_a`].oneWarePrice = 0
	      				tablearray[i][`${sellLastYear-3}_a`].payment = 0

	      				tablearray[i][`${sellLastYear-4}_a`] = {}
	      				tablearray[i][`${sellLastYear-4}_a`].oneWarePrice = 0
	      				tablearray[i][`${sellLastYear-4}_a`].payment = 0


	      				tablearray[i][`${sellLastYear-1}_a`].payQty = 0
	      				tablearray[i][`${sellLastYear-2}_a`].payQty = 0
	      				tablearray[i][`${sellLastYear-3}_a`].payQty = 0
	      				
	      				tablearray[i][`${sellLastYear-4}_a`].payQty = 0

	      			}





  					




	      			for (let i=0;i<data.data.sellLastYearShowVOS.length;i++) {
	      				for (let j=0;j<data.data.sellLastYearShowVOS[i].list.length;j++) {


	      					tablearray[data.data.sellLastYearShowVOS[i].month-1][`${data.data.sellLastYearShowVOS[i].list[j].year}_a`].oneWarePrice = data.data.sellLastYearShowVOS[i].list[j].oneWarePrice

	      					tablearray[data.data.sellLastYearShowVOS[i].month-1][`${data.data.sellLastYearShowVOS[i].list[j].year}_a`].payment = data.data.sellLastYearShowVOS[i].list[j].payment

	      					tablearray[data.data.sellLastYearShowVOS[i].month-1][`${data.data.sellLastYearShowVOS[i].list[j].year}_a`].payQty = data.data.sellLastYearShowVOS[i].list[j].payQty
	      				}

	      			}


	      			for (let j=0;j<data.data.lastTotal.list.length;j++) {


      					tablearray[12][`${data.data.lastTotal.list[j].year}_a`].oneWarePrice = data.data.lastTotal.list[j].oneWarePrice

      					tablearray[12][`${data.data.lastTotal.list[j].year}_a`].payment = data.data.lastTotal.list[j].payment

      					tablearray[12][`${data.data.lastTotal.list[j].year}_a`].payQty = data.data.lastTotal.list[j].payQty
      				}






	      			



	      			this.lastyeartablearray = tablearray
	      			
	      			//feibi往年销售额表格图

	      			this.payment.allShopPayment = data.data.allShopPayment
	      			this.payment.ctPayment = data.data.ctPayment
	      			this.payment.fbPayment = data.data.fbPayment
	      			this.payment.njPayment = data.data.njPayment
	      			this.payment.xsPayment = data.data.xsPayment

	      			//各品牌近15天销售额趋势图
	      			this.salefifteen.legend.data = []
	      			this.salefifteen.series = []
	      			this.salefifteen.xAxis.data = []

	      			for (let i=15;i>0;i--) {
	      				//let date = new Date(new Date().getTime() - 3600 * 1000 * 24 * (i-1))
	      				let date = new Date(new Date().getTime() - 3600 * 1000 * 24 * (i))



	      				let m = "0"+(date.getMonth()+1)
	      				let d = "0"+date.getDate()
	      				this.salefifteen.xAxis.data.push(m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length))
	      			}

	      			//console.info(this.salefifteen.xAxis.data)

	      			//data.data.sellMainBrandBattleShowVOS.reverse()
	      			var compare = function (prop) {
					    return function (obj1, obj2) {
					        var val1 = obj1[prop];
					        var val2 = obj2[prop];if (val1 < val2) {
					            return -1;
					        } else if (val1 > val2) {
					            return 1;
					        } else {
					            return 0;
					        }            
					    } 
					}

					data.data.sellMainBrandBattleShowVOS.sort(compare("brandId"))

	      			for (let i=0;i<data.data.sellMainBrandBattleShowVOS.length;i++) {
	      				let name = this.getbrandstatus(data.data.sellMainBrandBattleShowVOS[i].brandId)

	      				if (data.data.sellMainBrandBattleShowVOS[i].brandId == -1) {
	      					name = '合计'
	      				}

	      				this.salefifteen.legend.data.push(name)

	      				this.salefifteen.series.push({
	      					name: name,
				            type:'line',
				            smooth: true,
				            data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	      				})

	      				let year = new Date().getFullYear()

			    		let month = new Date().getMonth()

			    		let day = new Date().getDate()

			    		let date = new Date(year,month,day,0,0,0).getTime()/1000



	      					for (let j=0; j<data.data.sellMainBrandBattleShowVOS[i].list.length;j++) {

		      					let cha = (date - data.data.sellMainBrandBattleShowVOS[i].list[j].time)/3600/24 


		      					



			      					//let day = cha
			      					//this.salefifteen.series[i].data[14-cha] = data.data.sellMainBrandBattleShowVOS[i].list[j].payment
			      				this.salefifteen.series[i].data[15-cha] = data.data.sellMainBrandBattleShowVOS[i].list[j].payment

		      					


		      					
		      					


		      				}
	      				

      					
	      			}

	      			
	      			//console.info(this.salefifteen.series)
	      				
		                if (salefifteen_chart) {
	                        salefifteen_chart.clear()
	                        salefifteen_chart = null
	                    }
	                    this.$nextTick(()=>{

			      			salefifteen_chart = echarts.init(document.getElementById('fif_wrap'))
		        			salefifteen_chart.setOption(this.salefifteen)
	        			})


	        			//各品牌近15天销售额趋势图

	        			//店铺累计销售TOP

	        			this.store_sale_option.yAxis.data = []
	        			this.store_sale_option.series[0].data = []

	        			for (let i=data.data.sellMainShopTopVOS.length-1;i>-1;i--) {
	        				this.store_sale_option.yAxis.data.push(data.data.sellMainShopTopVOS[i].shopNum)

	        				this.store_sale_option.series[0].data.push(data.data.sellMainShopTopVOS[i].payment)


	        			}

	        			
        				if (store_sale_chart) {
	                        store_sale_chart.clear()
	                        store_sale_chart = null
	                    }
	                    this.$nextTick(()=>{

			      			store_sale_chart = echarts.init(document.getElementById('store_sale'))
		        			store_sale_chart.setOption(this.store_sale_option)
	        			})



	        			//店铺累计销售TOP

	        			//全公司环形图
	        			this.circle_one_option.series[0].data[0].value = data.data.allShopTmPayment
	        			this.circle_one_option.series[0].data[1].value = data.data.allShopTbPayment

	        			if (circle_one_chart) {
	                        circle_one_chart.clear()
	                        circle_one_chart = null
	                    }
	                    this.$nextTick(()=>{

			      			circle_one_chart = echarts.init(document.getElementById('circle_one'))
		        			circle_one_chart.setOption(this.circle_one_option)
	        			})


	        			//全公司环形图

	        			//feibi环形图
	        			this.circle_two_option.series[0].data[0].value = data.data.fbTmPayment
	        			this.circle_two_option.series[0].data[1].value = data.data.fbTbPayment

	        			if (circle_two_chart) {
	                        circle_two_chart.clear()
	                        circle_two_chart = null
	                    }
	                    this.$nextTick(()=>{

			      			circle_two_chart = echarts.init(document.getElementById('circle_two'))
		        			circle_two_chart.setOption(this.circle_two_option)
	        			})


	        			//feibi环形图
	        			//ct环形图
	        			this.circle_three_option.series[0].data[0].value = data.data.ctTmPayment
	        			this.circle_three_option.series[0].data[1].value = data.data.ctTbPayment

	        			if (circle_three_chart) {
	                        circle_three_chart.clear()
	                        circle_three_chart = null
	                    }
	                    this.$nextTick(()=>{

			      			circle_three_chart = echarts.init(document.getElementById('circle_three'))
		        			circle_three_chart.setOption(this.circle_three_option)
	        			})


	        			//ct环形图


	        			//xc环形图
	        			this.circle_four_option.series[0].data[0].value = data.data.xsTmPayment
	        			this.circle_four_option.series[0].data[1].value = data.data.xsTbPayment

	        			if (circle_four_chart) {
	                        circle_four_chart.clear()
	                        circle_four_chart = null
	                    }
	                    this.$nextTick(()=>{

			      			circle_four_chart = echarts.init(document.getElementById('circle_four'))
		        			circle_four_chart.setOption(this.circle_four_option)
	        			})


	        			//ct环形图

	      				

	      				
	      				

	      				


	      			


	                    
	            })
	            .catch(()=>{
	                this.$message({
	                  message: '接口报错',
	                  type: 'error'
	                })
	            })

      	},
      	sell_main_show_click(type) {
    		this.searctrue = true
        this.show_detail_fifteen = false
    		let brandId = 1
      		if (type == 4) {
    			this.search.searchname = '全公司'
    			brandId = ''
    		}
    		if (type == 1) {
    			this.search.searchname = '菲碧'
    			brandId = 1
    		}
    		if (type == 2) {
    			this.search.searchname = '初彤'
    			brandId = 2
    		}
    		if (type == 3) {
    			this.search.searchname = '形色'
    			brandId = 3
    		}
    		
    		this.search.tbPayment = ''
  			this.search.tmPayment = ''
  			this.search.allShopPayment = ''
    		

    		  let searchtype = this.search_catagory.type ? this.search_catagory.type:1
      		this.$http.get(`sell/sell_main_show_click?brandId=${brandId}&type=${searchtype}`)
	      		.then((data)=>{

              

	      			this.search.tbPayment = data.data.tbPayment
	      			this.search.tmPayment = data.data.tmPayment
	      			this.search.allShopPayment = data.data.allShopPayment

	      			//各品牌近15天销售额趋势图
	      			this.salefifteensearch.legend.data = []
	      			this.salefifteensearch.series = []
	      			this.salefifteensearch.xAxis.data = []




	      			for (let i=15;i>0;i--) {
	      				//let date = new Date(new Date().getTime() - 3600 * 1000 * 24 * (i-1))
	      				let date = new Date(new Date().getTime() - 3600 * 1000 * 24 * (i))

	      				let m = "0"+(date.getMonth()+1)
	      				let d = "0"+date.getDate()
	      				this.salefifteensearch.xAxis.data.push(m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length))
	      			}

	      			//console.info(this.salefifteen.xAxis.data)

	      			//data.data.sellMainBrandBattleShowVOS.reverse()

	      			for (let i=0;i<3;i++) {

	      				let name = ''
                let color = ''
	      				if(searchtype == 1){
	      					name = data.data.sellMainBrandBattleShowVOS[i].brandId == 0 ?'总销售量':(data.data.sellMainBrandBattleShowVOS[i].brandId == 1? 'c店总销售量':'天猫销售量')
                  color = data.data.sellMainBrandBattleShowVOS[i].brandId == 0 ?'#ff0000':(data.data.sellMainBrandBattleShowVOS[i].brandId == 1? '#1c9fff':'#00cc99')
	      				} else {
	      					name = data.data.sellMainBrandBattleShowVOS[i].brandId == 0 ?'总销售额':(data.data.sellMainBrandBattleShowVOS[i].brandId == 1? 'c店总销售额':'天猫销售额')

                  color = data.data.sellMainBrandBattleShowVOS[i].brandId == 0 ?'#ff0000':(data.data.sellMainBrandBattleShowVOS[i].brandId == 1? '#1c9fff':'#00cc99')
	      				}
	      				

	      				this.salefifteensearch.legend.data.push(name)

	      				this.salefifteensearch.series.push({
	      					  name: name,
				            type:'line',
                    color: color,
				            smooth: true,
				            data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	      				})

	      				let year = new Date().getFullYear()

  			    		let month = new Date().getMonth()

  			    		let day = new Date().getDate()

  			    		let date = new Date(year,month,day,0,0,0).getTime()/1000

			    		//console.info(date)

	      				

      					for (let j=0; j<data.data.sellMainBrandBattleShowVOS[i].list.length;j++) {
	      					let cha = (date - data.data.sellMainBrandBattleShowVOS[i].list[j].time)/3600/24


	      					



	      						//console.info()

	      					this.salefifteensearch.series[i].data[15-cha] = data.data.sellMainBrandBattleShowVOS[i].list[j].payment
	      		

	      				}
	      			}


	      			console.info(this.salefifteensearch)
	      				
                  if (salefifteen_chart_search) {
                      salefifteen_chart_search.clear()
                      salefifteen_chart_search = null
                  }
                  this.$nextTick(()=>{

  			      			salefifteen_chart_search = echarts.init(document.getElementById('fif_wrap_one'))
  		        			salefifteen_chart_search.setOption(this.salefifteensearch)
  	        			})


	        			//各品牌近15天销售额趋势图


	      		})

      	},
    },
  }
</script>
<style>
	.is-checkeda {
	  border: 1px solid #67c23a !important;
	  color: #67c23a !important;
	}
</style>
<style scoped lang="less">
.sale_show {
	display: flex;
	margin: 10px;
	background: #f4f4f4;
	height: calc(100vh - 90px);
	&-left {
		width: 68%;
		height: 100%;
		padding: 10px;

		&-top {
			height: 140px;
			background: #ffffff;
			margin-bottom: 10px;

			.title {
				padding-left: 10px;
				padding-top: 10px;
				font-size: 20px;
				position: relative;


				.changetab {
					width: 420px;
					position: absolute;
					right: 10px;
					top: 2px;
					height: 40px;

				}
			}
			.wrap_num {
				display: flex;

				.wrap_detail {
					width: 20%;
					text-align: center;

					.flex_one {
						line-height: 50px;
						font-size: 16px;
					}
				}

			}

			.wrap_num_a {
				.wrap_detail {
					width: 25%;
				}
			}
		}
		&-second {
			height: 100%;
			height: 50%;
			background: #ffffff;
			margin-bottom: 10px;

			.title {
				padding-left: 10px;
				padding-top: 10px;
				font-size: 20px;
				margin-bottom: 10px;
				position: relative;

				i {
					position: absolute;
					right: 16px;
					font-size: 20px;
					top: 12px;
				}


				.changetab {
					width: 180px;
					position: absolute;
					right: 60px;
					top: 2px;
					height: 40px;

				}
			}

			.fif_wrap {
				height: calc(100vh - 690px);
			}
		}

		&-third {
			height: 100%;
			height: calc(100vh - 580px);
			background: #ffffff;

		}




	}

	&-right {
		width: 32%;
		height: 100%;
		padding: 10px;
		padding-left: 0px;


		&-top {
			height: 55%;
			background: #ffffff;
			margin-bottom: 10px;

			.title {
				padding-left: 10px;
				padding-top: 10px;
				font-size: 20px;
				margin-bottom: 10px;
			}

			.circle_wrap {
				display: inline-block;
				height: calc(100vh - 740px);
				width: 49%;
			}





		}

		&-second {
			height: calc(100vh - 580px);
			background: #ffffff;

			.title {
				padding-left: 10px;
				padding-top: 10px;
				font-size: 20px;
				margin-bottom: 10px;
			}

			.total_wrap {
				height: calc(100vh - 740px);
			}
		}

	}

}
</style>
