<template>
  <div class="yw_setting">

    <div class="wrap">
    	<div class="wrap_top">
    		<el-button class="monbtn" @click="">导入订单
    			<input  type="file" style="left: 0px" 
                      class="inpucus cursor" 
                      @change="import_order($event)" />
    		</el-button>
    		<el-button class="monbtn">导入实裁
    			<input  type="file" style="left: 0px" 
                      class="inpucus cursor" 
                      @change="import_real_order($event)" />
    		</el-button>
    		<el-button class="monbtn">三方到货
    			<input  type="file" style="left: 0px" 
                      class="inpucus cursor" 
                      @change="import_supply_arrive($event)" />
    		</el-button>
    		<el-button class="monbtn">清在途
    			<input  type="file" style="left: 0px" 
                      class="inpucus cursor" 
                      @change="import_clear_on_way($event)" />
    		</el-button>

    		<p style="position: absolute;right: 20px;top: 0px">
    			<el-button class="monbtn">库存导入
	    			<input  type="file" style="left: 0px" 
	                      class="inpucus cursor" 
	                      @change="analyse_inventory($event)" />
    		    </el-button>

    			<el-button class="monbtn">待发货
	    			<input  type="file" style="left: 0px" 
	                      class="inpucus cursor" 
	                      @change="analyse_wait_send($event)" />
    		    </el-button>

    			<el-button class="monbtn">昨日销量
	    			<input  type="file" style="left: 0px" 
	                      class="inpucus cursor" 
	                      @change="analyse_pay_qty($event)" />
    		    </el-button>
    	    </p>


    	</div>

    	<div class="wrap_content" ref="table_warp">
		    <el-table
		      :data="tableData"
		      style="width: 100%"
		      :height="table_height"
		      highlight-current-row
		      border
	          :header-cell-style='{"background": "#3f3f3f",
	            "border-right": "1px solid #cecece",
	            "border-bottom": "0px",
	            "text-align": "center",
	            "color": "#ffffff"}'
		      >

		      <el-table-column
		        type="index"
		        label="序号"
		        width="70"
		        align="center">
		      </el-table-column>
		      <el-table-column
		        prop="brand"
		        label="品牌"

		        align="center">
		      </el-table-column>
		      <el-table-column
		        prop="name"
		        label="供应链"
		        align="center">
		        <template slot-scope="scoped">
		        	{{get_goods_supply(scoped.row.supplyId)}}
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="wareId"
		        label="款号"
		        width="150"
		        align="center">
		      </el-table-column>
		      <el-table-column
		        prop="color"
		        label="颜色"
		        align="center">
		      </el-table-column>
		      <el-table-column
		        prop="category"
		        label="品类"
		        align="center">
		      </el-table-column>
		      <el-table-column
		        prop="name"
		        label="下单类型"
		        align="center">
		        <template slot-scope="scoped">
		        	{{get_order_type(scoped.row.orderType)}}
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="num"
		        label="(预估)数量"
		        align="center">
		      </el-table-column>
		      <el-table-column
		        prop="name"
		        label="扩码"
		        align="center">
		        <template slot-scope="scoped">
		        	{{get_goods_enlarge(scoped.row.enlarge)}}
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="name"
		        label="操作"
		        align="center">
		        <template slot-scope="scoped">
		        	{{get_order_operation(scoped.row.opreation)}}
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="name"
		        label="状态"
		        align="center">
		        <template slot-scope="scoped">
		        	{{get_order_status(scoped.row.status)}}
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="orderId"
		        label="订单号"
		        align="center">
		      </el-table-column> 
		      <el-table-column
		        prop="name"
		        label="下单时间"
		        width="100"
		        align="center">
		        <template slot-scope="scoped">
		        	{{scoped.row.orderTime?fmtDate(scoped.row.orderTime):''}}
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="name"
		        label="操作时间"
		        width="100"
		        align="center">
		        <template slot-scope="scoped">
		        	{{scoped.row.updateTime?fmtDate(scoped.row.updateTime):''}}
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="name"
		        label="配码"
		        width="200"
		        align="center">
		        <template slot-scope="scoped">
		        	<el-button  class="monbtn" @click="deal_good(scoped.row)">配码</el-button>
		        	<el-button  class="monbtn" @click="edit_englarge_show(scoped.row)">修改</el-button>
		        </template>
		      </el-table-column>
		    </el-table>
    	</div>
		    	

        
    	
    </div>



	<el-dialog
	  title="配码"
	  :visible.sync="dialogVisible"
	  width="1300px">
	  <div class="edit_wrap">
		  <table width="100%" align="center">
		  	<tr style="background-color: #c0c0c0">
		  		<td rowspan="11" style="width: 200px;background-color: #fff"><img style="width: 200px;" :src="ware_cal.picPath"/></td>
		  		<td style="width: 160px;background-color: #0f0">{{edit_good.wareId}}</td>
		  		<!-- <td v-for="list in ware_show">{{list.wareIdSize}}</td> -->
		  		<td style="width: 160px;">J</td>
		  		<td style="width: 160px;">S</td>
		  		<td style="width: 160px;">M</td>
		  		<td style="width: 160px;">L</td>
		  		<td style="width: 160px;">XL</td>
		  		<td style="width: 120px;">合计</td>
		  	</tr>
		  	<tr style="background-color: #c0c0c0">
		  		<td>商品编码</td>
		  		<td v-if="ware_show[4]">{{ware_show[4].wareIdSize}}</td>
		  		<td v-if="ware_show[0]">{{ware_show[0].wareIdSize}}</td>
		  		<td v-if="ware_show[1]">{{ware_show[1].wareIdSize}}</td>
		  		<td v-if="ware_show[2]">{{ware_show[2].wareIdSize}}</td>
		  		<td v-if="ware_show[3]">{{ware_show[3].wareIdSize}}</td>
		  		<td></td>
		  	</tr>
		  	<tr style="background-color: #9cf">
		  		<td>实际库存</td>
		  		<td v-if="ware_show[4]">{{ware_show[4].inventory}}</td>
		  		<td v-if="ware_show[0]">{{ware_show[0].inventory}}</td>
		  		<td v-if="ware_show[1]">{{ware_show[1].inventory}}</td>
		  		<td v-if="ware_show[2]">{{ware_show[2].inventory}}</td>
		  		<td v-if="ware_show[3]">{{ware_show[3].inventory}}</td>
		  		<td v-if="ware_show[5]">{{ware_show[5].inventory}}</td>
		  	</tr>
		  	<tr style="background-color: #9cf">
		  		<td>在途</td>
		  		<td v-if="ware_show[4]">{{ware_show[4].onWayNum}}</td>
		  		<td v-if="ware_show[0]">{{ware_show[0].onWayNum}}</td>
		  		<td v-if="ware_show[1]">{{ware_show[1].onWayNum}}</td>
		  		<td v-if="ware_show[2]">{{ware_show[2].onWayNum}}</td>
		  		<td v-if="ware_show[3]">{{ware_show[3].onWayNum}}</td>
		  		<td v-if="ware_show[5]">{{ware_show[5].onWayNum}}</td>
		  	</tr>
		  	<tr style="background-color: #9cf">
		  		<td>待发货</td>
		  		<td v-if="ware_show[4]">{{ware_show[4].waitSendQty}}</td>
		  		<td v-if="ware_show[0]">{{ware_show[0].waitSendQty}}</td>
		  		<td v-if="ware_show[1]">{{ware_show[1].waitSendQty}}</td>
		  		<td v-if="ware_show[2]">{{ware_show[2].waitSendQty}}</td>
		  		<td v-if="ware_show[3]">{{ware_show[3].waitSendQty}}</td>
		  		<td v-if="ware_show[5]">{{ware_show[5].waitSendQty}}</td>
		  	</tr>
		  	<tr style="background-color: #9cf">
		  		<td>可用存库</td>
		  		<td>0</td>
		  		<td>0</td>
		  		<td>0</td>
		  		<td>0</td>
		  		<td>0</td>
		  		<td>0</td>
		  	</tr>
		  	<tr style="background-color: #f4b084">
		  		<td>累计付款数量</td>
		  		<td v-if="ware_show[4]">{{ware_show[4].payQty}}</td>
		  		<td v-if="ware_show[0]">{{ware_show[0].payQty}}</td>
		  		<td v-if="ware_show[1]">{{ware_show[1].payQty}}</td>
		  		<td v-if="ware_show[2]">{{ware_show[2].payQty}}</td>
		  		<td v-if="ware_show[3]">{{ware_show[3].payQty}}</td>
		  		<td v-if="ware_show[5]">{{ware_show[5].payQty}}</td>
		  	</tr>
		  	<tr style="background-color: #f4b084">
		  		<td>付款尺码比例</td>
		  		<td v-if="ware_show[4]">{{ware_show[4].payRate}}</td>
		  		<td v-if="ware_show[0]">{{ware_show[0].payRate}}</td>
		  		<td v-if="ware_show[1]">{{ware_show[1].payRate}}</td>
		  		<td v-if="ware_show[2]">{{ware_show[2].payRate}}</td>
		  		<td v-if="ware_show[3]">{{ware_show[3].payRate}}</td>
		  		<td v-if="ware_show[5]">{{ware_show[5].payRate}}</td>
		  	</tr>
		  	<tr style="background-color: rgb(198, 224, 180)">
		  		<td>我的尺码比例</td>
		  		<td><input v-model="ware_cal.ratej" class="el-textarea__inner input_class"></td>
		  		<td><input v-model="ware_cal.rates" class="el-textarea__inner input_class"></td>
		  		<td><input v-model="ware_cal.ratem" class="el-textarea__inner input_class"></td>
		  		<td><input v-model="ware_cal.ratel" class="el-textarea__inner input_class"></td>
		  		<td><input v-model="ware_cal.ratexl" class="el-textarea__inner input_class"></td>
		  		<td>{{total_rate}}%</td>
		  	</tr>
		  	<tr style="background-color: rgb(198, 224, 180)">
		  		<td>我的补货数量</td>
		  		<td><input v-model="ware_cal.j" class="el-textarea__inner input_class"></td>
		  		<td><input v-model="ware_cal.s" class="el-textarea__inner input_class"></td>
		  		<td><input v-model="ware_cal.m" class="el-textarea__inner input_class"></td>
		  		<td><input v-model="ware_cal.l" class="el-textarea__inner input_class"></td>
		  		<td><input v-model="ware_cal.xl" class="el-textarea__inner input_class"></td>
		  		<td>{{total_num}}</td>
		  	</tr>
		  	<tr>
		  		<td style="background-color: #ffd966">补货总数量</td>
		  		<td style="background-color: #ffd966"></td>
		  		<td style="background-color: #ffd966">{{edit_good.num}}</td>
		  		<td></td>
		  		<td></td>
		  		<td></td>
		  		<td></td>
		  	</tr>
<!-- 		  	<tr>
		  		<td style="text-align:center;width: 150px;">{{edit_good.wareId}}</td>
		  		<td><input v-model="edit_good.j" class="el-textarea__inner input_class"></td>
		  		<td><input v-model="edit_good.s" class="el-textarea__inner input_class"></td>
		  		<td><input v-model="edit_good.m" class="el-textarea__inner input_class"></td>
		  		<td><input v-model="edit_good.l" class="el-textarea__inner input_class"></td>
		  		<td><input v-model="edit_good.xl" class="el-textarea__inner input_class"></td>
		  		
		  		<td>{{total_num}}</td>
		  	</tr> -->
		  </table>
	  </div>

	  <span slot="footer" class="dialog-footer">
	    <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
	    <el-button size="mini" type="primary" @click="update_size_num">确 定</el-button>
	  </span>
	</el-dialog>


	<el-dialog
	  title="修改"
	  :visible.sync="kmdialogVisible"
	  width="400px">
	  <div>
	  	<p>
	  		<span>扩码：</span>
	  		<el-select v-model="enlarge">
	  		<el-option v-for="item in goods_enlarge_two"
	  		 :key="item.dicCode"
	  		 :label="item.dicName"
	  		 :value="item.dicCode">
	  		 </el-option>
	  		</el-select>
	 	</p>
	 	<p style="margin-top: 30px;">
	  		<span>附件：</span>
	  		<el-button  style="margin-left: 0px;margin-bottom: 20px;position: relative;" type="primary">上传

                <input style="left:0px" type="file" class="inpucus cursor" @change="enlarge_file" />

             </el-button>
             <span style="font-size: 13px;">{{enlarge_file_content.name}}</span>
	 	</p>
	  </div>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="kmdialogVisible = false" size="mini">取 消</el-button>
	    <el-button type="primary" @click="edit_enlarge" size="mini">确 定</el-button>
	  </span>
	</el-dialog>

    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import XLSX from 'xlsx'
  export default {
    name: "system-setting",
    data(){
      return{
      	enlarge_file_content: '',
      	dialogVisible:false,
      	kmdialogVisible:false,
      	tableData:[],
      	table_height:300,
      	edit_good:{
      		orderId:'',
      		packageOrderId:'',
      		wareId:'',
      		brand:'',
      		num:'',
      		category:'',
      		enlarge:'',

      	},
      	enlarge:'',
      	ware_cal:{
      		s:'',
      		m:'',
      		l:'',
      		xl:'',
      		j:'',
      		rates:'',
      		ratem:'',
      		ratel:'',
      		ratexl:'',
      		ratej:'',
      		picPath: ''
      	},
      	ware_show:[],

      }
    },
    watch: {
    	'ware_cal.ratej'(value) {
    		//console.info(value)
    		this.ware_cal.j = Number(value*this.edit_good.num/100).toFixed(0)

    	},
    	'ware_cal.rates'(value) {
    		//console.info(value)
    		this.ware_cal.s = Number(value*this.edit_good.num/100).toFixed(0)

    	},
    	'ware_cal.ratem'(value) {
    		//console.info(value)
    		this.ware_cal.m = Number(value*this.edit_good.num/100).toFixed(0)

    	},
    	'ware_cal.ratel'(value) {
    		//console.info(value)
    		this.ware_cal.l = Number(value*this.edit_good.num/100).toFixed(0)

    	},
    	'ware_cal.ratexl'(value) {
    		//console.info(value)
    		this.ware_cal.xl = Number(value*this.edit_good.num/100).toFixed(0)

    	},
    },
    created() {


    },

    computed: {
      ...mapGetters([
          'getpageDict',
      ]),

      total_num(){
      	return (Number(this.ware_cal.s) + Number(this.ware_cal.m) + Number(this.ware_cal.l) + Number(this.ware_cal.xl) + Number(this.ware_cal.j))
      },

      total_rate(){
      	return Number(Number(this.ware_cal.rates) + Number(this.ware_cal.ratem) + Number(this.ware_cal.ratel) + Number(this.ware_cal.ratexl) + Number(this.ware_cal.ratej)).toFixed(0)
      },

      goods_enlarge(){
        let goods_enlarge = this.getpageDict.filter((list)=>{
          return list.dicType == 'goods_enlarge'
        })
        return goods_enlarge[0].dicList
      },
      goods_enlarge_two(){
      	let arr = [
        {
        	dicCode: true,	
			dicName: "扩码"
        },{
        	dicCode: false,	
			dicName: "不扩码"
        }]
        
        return arr
      },

      order_operation(){
        let order_operation = this.getpageDict.filter((list)=>{
          return list.dicType == 'goods_order_operation'
        })
        return order_operation[0].dicList
      },

      order_status(){
        let order_status = this.getpageDict.filter((list)=>{
          return list.dicType == 'goods_order_status'
        })
        return order_status[0].dicList
      },

      order_type(){
        let order_type = this.getpageDict.filter((list)=>{
          return list.dicType == 'goods_order_type'
        })
        return order_type[0].dicList
      },

      goods_supply(){
        let goods_supply = this.getpageDict.filter((list)=>{
          return list.dicType == 'goods_supply'
        })
        return goods_supply[0].dicList
      },

    },
    mounted(){ 
      this.$nextTick(()=>{
        this.table_height = this.$refs.table_warp.offsetHeight - 40
      })


      this.find_order_goods()
      
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


        //下单表
    	async import_order(event){
    		//console.info(event)

    		let file = event.target.files[0]

    		let formData = new FormData()
    		formData.append('file',file)
	      	this.$http({
	      		url:'order_goods/import_order',
	      		method:'POST',
	      		data:formData,
	      		headers: {'Content-Type': 'multipart/form-data'}
	      	})
    		.then((data)=>{
    			if(data.code == '200'){

    				this.find_order_goods()
	                this.$message({
	    				message:'上传成功',
	    				type:'success'
	    			})
    			}else {
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



        //实裁
    	async import_real_order(event){
    		//console.info(event)

    		let file = event.target.files[0]

    		let formData = new FormData()
    		formData.append('file',file)
	      	this.$http({
	      		url:'order_goods/import_real_order_goods',
	      		method:'POST',
	      		data:formData,
	      		headers: {'Content-Type': 'multipart/form-data'}
	      	})
    		.then((data)=>{
    			if(data.code == '200'){
	                this.$message({
	    				message:'上传成功',
	    				type:'success'
	    			})
    			}else {
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



        //三方到货
    	async import_supply_arrive(event){
    		//console.info(event)

    		let file = event.target.files[0]

    		let formData = new FormData()
    		formData.append('file',file)
	      	this.$http({
	      		url:'order_goods/import_supply_arrive',
	      		method:'POST',
	      		data:formData,
	      		headers: {'Content-Type': 'multipart/form-data'}
	      	})
    		.then((data)=>{
    			if(data.code == '200'){
	                this.$message({
	    				message:'上传成功',
	    				type:'success'
	    			})
    			}else {
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


        //清在途
    	async import_clear_on_way(event){
    		//console.info(event)

    		let file = event.target.files[0]

    		let formData = new FormData()
    		formData.append('file',file)
	      	this.$http({
	      		url:'order_goods/import_clear_on_way',
	      		method:'POST',
	      		data:formData,
	      		headers: {'Content-Type': 'multipart/form-data'}
	      	})
    		.then((data)=>{
    			if(data.code == '200'){
	                this.$message({
	    				message:'上传成功',
	    				type:'success'
	    			})
    			}else {
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



    	find_order_goods(){
    		this.$http.post(`order_goods/find_order_goods_is_not_deal`)
    		.then((data)=>{

    			if(data.code == '200'){

    				this.tableData = data.data

    			}else {
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

	      get_goods_enlarge(id){
	      	let name = ''
	      	for(let i=0;i<this.goods_enlarge.length;i++){
	      		if(this.goods_enlarge[i].dicCode == id){
	      			name = this.goods_enlarge[i].dicName
	      			break
	      		}
	      	}

	      	return name
	      },

	      get_order_operation(id){
	      	let name = ''
	      	for(let i=0;i<this.order_operation.length;i++){
	      		if(this.order_operation[i].dicCode == id){
	      			name = this.order_operation[i].dicName
	      			break
	      		}
	      	}

	      	return name
	      },

	      get_order_status(id){
	      	let name = ''
	      	for(let i=0;i<this.order_status.length;i++){
	      		if(this.order_status[i].dicCode == id){
	      			name = this.order_status[i].dicName
	      			break
	      		}
	      	}
	      	return name
	      },

	      get_order_type(id){
	      	let name = ''
	      	for(let i=0;i<this.order_type.length;i++){
	      		if(this.order_type[i].dicCode == id){
	      			name = this.order_type[i].dicName
	      			break
	      		}
	      	}

	      	return name
	      },

	      get_goods_supply(id){
	      	let name = ''
	      	for(let i=0;i<this.goods_supply.length;i++){
	      		if(this.goods_supply[i].dicCode == id){
	      			name = this.goods_supply[i].dicName
	      			break
	      		}
	      	}

	      	return name
	      },

	      deal_good(row){

	      	this.edit_good.wareId = row.wareId
	      	this.edit_good.orderId = row.orderId
	      	this.edit_good.packageOrderId = row.packageOrderId?row.packageOrderId:''
	      	this.edit_good.num = row.num
	      	this.edit_good.brand = row.brand
	      	this.edit_good.category = row.category
	      	this.edit_good.enlarge = row.enlarge
	      	this.edit_good.s = ''
	      	this.edit_good.m = ''
	      	this.edit_good.l = ''
	      	this.edit_good.xl = ''
	      	this.edit_good.j = ''
	      	this.edit_good.total = ''
	      	this.add_ware_show()
	      	this.dialogVisible = true

	      },
	      enlarge_file(event) {

	      	let file = event.target.files[0]
	      	this.enlarge_file_content = file
	      },

	      edit_enlarge(){


	      	let formData = new FormData()
    		formData.append('file',this.enlarge_file_content)
	      	this.$http({
	      		url:`order_goods/import_stock_ware_rate?enlarge=${this.enlarge}`,
	      		method:'POST',
	      		data:formData,
	      		headers: {'Content-Type': 'multipart/form-data'}
	      	})
			.then((data)=>{
				if(data.code == '200'){
					this.kmdialogVisible = false
					this.$message({
						message:data.msg,
						type:'success'
					})

					

				}else {
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

	      edit_englarge_show(row){
	      	this.enlarge_file_content=''
	      	this.enlarge = row.enlarge?row.enlarge:''
	      	this.kmdialogVisible = true
	      },

		 update_size_num(){


		 	if (this.edit_good.num != this.total_num) {
		 		return this.$message({
					message:"补货总数量不正确，请确认在提交",
					type:'error'
				})
		 	}


			this.$http.post(`order_goods/update_size_num`,{
				orderId: this.edit_good.orderId,
				packageOrderId: this.edit_good.packageOrderId,
				wareId: this.edit_good.wareId,
				realS: this.edit_good.s?this.edit_good.s:0,
				realM: this.edit_good.m?this.edit_good.m:0,
				realL: this.edit_good.l?this.edit_good.l:0,
				realXL: this.edit_good.xl?this.edit_good.xl:0,
				realJ: this.edit_good.j?this.edit_good.j:0,
				realNum: this.total_num,

			})

			.then((data)=>{
				if(data.code == '200'){

					this.dialogVisible = false
					this.find_order_goods()

					this.$message({
						message:'配比成功',
						type:'success'
					})

				}else {
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



		 add_ware_show(){

			this.$http.post(`order_goods/add_ware_show`,{
				brand: this.edit_good.brand,
				category: this.edit_good.category,
				wareId: this.edit_good.wareId,
				num: this.edit_good.num,
				enlarge: this.edit_good.enlarge? this.edit_good.enlarge:1,

			})

			.then((data)=>{
				if(data.code == '200'){

					this.ware_show = data.data.list

					this.ware_cal.s = data.data.list[0].num
					this.ware_cal.m = data.data.list[1].num
					this.ware_cal.l = data.data.list[2].num
					this.ware_cal.xl = data.data.list[3].num
					this.ware_cal.j = data.data.list[4].num

					this.ware_cal.rates = data.data.list[0].rate
					this.ware_cal.ratem = data.data.list[1].rate
					this.ware_cal.ratel = data.data.list[2].rate
					this.ware_cal.ratexl = data.data.list[3].rate
					this.ware_cal.ratej = data.data.list[4].rate
					this.ware_cal.picPath = data.data.picPath



				}else {
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


         analyse_wait_send(event){

         	let obj = event.target
	      	if(!obj.files){
	      		return
	      	}

	      	var wb
	      	var rABS = false  //是否将数据读取为二进制字符串
	      	let f = obj.files[0]
	      	var reader = new FileReader()
	      	let that = this

	      	reader.onload = function(e){

	      		let data = e.target.result
	            if (rABS) {
	                wb = XLSX.read(btoa(that.fixdata(data)), {//手动转化
	                    type: 'base64'
	                });
	            } else {
	                wb = XLSX.read(data, {
	                    type: 'binary'
	                });
	            }

	            let arr = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])

	            //console.info(arr)
	            let arr1 = []


	            for(let i=0;i<arr.length;i++){
	            	arr1[i] = {
	            		wareIdSize:'',
	            		num:''
	            	}

	            	for(var key in arr[i]){
	            		if(key == '规格编码'){
	            			arr1[i]['wareIdSize'] = arr[i][key]
	            		}
	            		if(key == '待发货数量'){
	            			arr1[i]['num'] = arr[i][key]
	            		}
	            	}
	            }

	            //console.info(arr1)

	            that.import_wait_send(arr1)

	            event.target.value = ''


	      	}

	      	if(rABS){
	      		reader.readAsArrayBuffer(f) 
	      	}else {
	      		reader.readAsBinaryString(f)
	      	}




         },
		 import_wait_send(data){

    		this.$http.post(`order_goods/import_wait_send`,{
    			id:'',
    			data: data

    		})
	      	.then((res)=>{
	      		if(res.code == '200'){

	      			this.$message({
	      				message:"导入成功",
	      				type:'success'
	      			})
	      			
	      			
	      			
	      		}
	      		else{
	      			this.$message({
	      				message:res.msg,
	      				type:'error'
	      			})
	      		}
	      	})
	      	.catch(()=>{
	      		this.$message({
	      			message:"接口报错",
	      			type:'error'
	      		})
	      	})

		 },



		 analyse_inventory(event){

		 	let obj = event.target
		 	if(!obj.files){
		 		return
		 	}

		 	var f = obj.files[0]
		 	var wb
		 	var rABS = false
		 	var reader = new FileReader()
		 	let that = this

		 	reader.onload = function(e){
		 		let data = e.target.result

	            if (rABS) {
	                wb = XLSX.read(btoa(that.fixdata(data)), {//手动转化
	                    type: 'base64'
	                });
	            } else {
	                wb = XLSX.read(data, {
	                    type: 'binary'
	                });
	            }

	            let arr = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])

	            let arr1 = []

	            for(let i=0;i<arr.length;i++){

	            	arr1[i] = {
	            		wareIdSize: '',
	            		num:''
	            	}

	            	for(var key in arr[i]){
	            		if(key == '商品编码'){
	            			arr1[i]['wareIdSize'] = arr[i][key]
	            		}
	            		if(key == '实际库存'){
	            			arr1[i]['num'] = arr[i][key]
	            		}
	            	}
	            }
	            //console.info(arr1)

	            that.import_inventory(arr1)

	            event.target.value = ''

		 	}

		 	if(rABS){
		 		reader.readAsArrayBuffer(f)
		 	}else {
		 		reader.readAsBinaryString(f)
		 	}

		 },


		 import_inventory(data){
    		this.$http.post(`order_goods/import_inventory`,{
    			id:'',
    			data: data

    		})
	      	.then((res)=>{
	      		if(res.code == '200'){

	      			this.$message({
	      				message:"导入成功",
	      				type:'success'
	      			})
	      			
	      			
	      			
	      		}
	      		else{
	      			this.$message({
	      				message:res.msg,
	      				type:'error'
	      			})
	      		}
	      	})
	      	.catch(()=>{
	      		this.$message({
	      			message:"接口报错",
	      			type:'error'
	      		})
	      	})
		 },



		 analyse_pay_qty(event){

		 	let obj = event.target
		 	if(!obj.files){
		 		return
		 	}

		 	let f = obj.files[0]
		 	let wb
		 	let rABS = false
		 	var reader = new FileReader()
		 	let that = this

		 	reader.onload = function(e){

		 		let data = e.target.result

		 		if(rABS) {
	                wb = XLSX.read(btoa(that.fixdata(data)), {//手动转化
	                    type: 'base64'
	                });
		 		}else {
		 			wb = XLSX.read(data,{
		 				type:'binary'
		 			})
		 			
		 		}


		 		let arr = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])

		 		let arr1 = []

		 		for(let i=0;i<arr.length;i++){
		 			arr1[i] = {
		 				wareIdSize:'',
		 				num:''
		 			}

		 			for(var key in arr[i]){
		 				if(key == '商品编码'){
		 					arr1[i]['wareIdSize'] = arr[i][key]
		 				}
		 				if(key == '数量'){
		 					arr1[i]['num'] = arr[i][key]
		 				}
		 			}
		 		}

		 		//console.info(arr1)


		 		that.import_pay_qty(arr1)
		 		event.target.value = ''
		 	}

		 	if(rABS){
		 		reader.readAsArrayBuffer(f)
		 	}else {
		 		reader.readAsBinaryString(f)
		 	}
		 },
		 import_pay_qty(data){
    		this.$http.post(`order_goods/import_pay_qty`,{
    			id:'',
    			data: data

    		})
	      	.then((res)=>{
	      		if(res.code == '200'){

	      			this.$message({
	      				message:"导入成功",
	      				type:'success'
	      			})
	      			
	      			
	      			
	      		}
	      		else{
	      			this.$message({
	      				message:res.msg,
	      				type:'error'
	      			})
	      		}
	      	})
	      	.catch(()=>{
	      		this.$message({
	      			message:"接口报错",
	      			type:'error'
	      		})
	      	})
		 },






    },
  }
</script>

<style scoped lang="less">
.yw_setting {

	margin: 0 20px;
	height: calc(100vh - 116px);
	//background-color: red;
	.inpucus {
	    opacity: 0;
	    background: red;
	    width: 95px;
	    height: 36px;
	    z-index: 10;
	    position: absolute;
	    left: 240px;
	    top: 0px;

	    &.iupzinde {
	        z-index: 1;
	    }
	}
	.cursor{
		cursor: pointer;
	}

	.wrap {
       height: calc(100vh - 116px);

      .monbtn{
        position: relative;
        //width:180px;
        background-color: rgb(140, 206, 173);
        color: #fff; 
      }


		&_top{
			height: 60px;
			position:relative;
			//background-color:#eee;

			.button_class{
				margin-left: 20px;
			}
		}

		&_content{
			height: calc(100vh - 175px);
			//background-color:red;
		}
	}

	.edit_wrap{

		padding: 20px;



		table{
			width: 100%;
			border-collapse: collapse;

			tr{
				th{
					height: 30px;
					border:1px solid #EBEEF5;			
				}

				td{
					text-align: center;
					width: 100px;
					height: 35px;
					border:1px solid #EBEEF5;
					//border-bottom:1px solid #EBEEF5;


					.input_class {
						border:0;
						text-align: center;
						background-color:rgb(198, 224, 180);
						border-color: rgb(198, 224, 180);
					}

				}


			}
		}
	}



}
  
</style>
