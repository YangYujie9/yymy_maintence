<template>
	<div class="size_setting">
	    <div class="wrap">
	    	<div class="wrap_top"></div>
	    	<div class="wrap_content">
<!-- 	    		<div class="singal_warp" v-for="list in order_data">
	    			<table>
	    				<tr>
	    					<td colspan="10" style="font-size: 16px;">{{list.brand}}订单明细表({{fmtDatey(list.orderTime)}}年)</td>
	    					<td rowspan="4" style="width:160px;"><img src="http://yy-data.oss-cn-beijing.aliyuncs.com/1575611662204-img-B184k09467p3370.png" style="width: 100%;height:235px;"></td>
	    			    </tr>
	    			    <tr>
	    			    	<td>订单号</td>
	    			    	<td style="width: 100px;">款号</td>
	    			    	<td>负责人</td>
	    			    	<td style="width: 90px;">时间</td>
	    			    	<td>颜色</td>
	    			    	<td>S</td>
	    			    	<td>M</td>
	    			    	<td>L</td>
	    			    	<td>XL</td>
	    			    	<td>J</td>
	    			    </tr>
	    			    <tr style="font-weight: bold;">
	    			    	<td>{{list.orderId}}</td>
	    			    	<td>{{list.wareId}}</td>
	    			    	<td>{{get_goods_supply_name(list.supplyId)}}</td>
	    			    	<td>{{fmtDate(list.orderTime)}}</td>
	    			    	<td>{{list.color}}</td>
	    			    	<td>{{list.s?list.s:''}}</td>
	    			    	<td>{{list.m?list.m:''}}</td>
	    			    	<td>{{list.l?list.l:''}}</td>
	    			    	<td>{{list.xl?list.xl:''}}</td>
	    			    	<td>{{list.j?list.j:''}}</td>
	    			    	
	    			    </tr>
	    			    <tr style="font-weight: bold;">
	    			    	<td></td>
	    			    	<td>首单</td>
	    			    	<td></td>
	    			    	<td></td>
	    			    	<td></td>
	    			    	<td></td>
	    			    	<td></td>
	    			    	<td colspan="2">汇总</td>
	    			    	
	    			    	<td>{{list.num}}</td>
	    			    </tr>
	    			</table>
	    		</div> -->
				<el-card class="box-card singal_warp" style="width: 49%;" v-for="list in order_data">
					  <div slot="header" class="clearfix">
					    <span>订单明细</span>
					    <el-button style="float: right; padding: 3px 0" type="text">取消</el-button>
					  </div>	    			<table>
	    				<tr style="height: 40px;">
	    					<td style="width: 60px;">订单号</td>
	    					<td>{{list.orderId}}</td>
	    					<td colspan="5" style="font-size: 16px;border-right: 0px;font-weight: bold;">订单明细表({{list.brand}})</td>
	    					<td style="font-size: 16px;border-left: 0px;"></td>

	    			    </tr>
	    			    <tr>
	    			    	
	    			    	<td style="">款号</td>
	    			    	<td colspan="4" style="font-weight: bold;">{{list.wareId}}</td>
	    			    	<td colspan="2">负责人</td>
	    			    	<td>{{get_goods_supply_name(list.supplyId)}}</td>
<!-- 	    			    	
	    			    	<td>颜色</td>
	    			    	<td>S</td>
	    			    	<td>M</td>
	    			    	<td>L</td>
	    			    	<td>XL</td>
	    			    	<td>J</td> -->
	    			    </tr>
	    			    <tr style="">
	    			    	<td style="">时间</td>
	    			    	<td colspan="7">{{fmtDate(list.orderTime)}}<span style="margin-left: 20px;font-weight: bold;color: red;">首单</span></td>
<!-- 	    			    	<td>{{list.color}}</td>
	    			    	<td>{{list.s?list.s:''}}</td>
	    			    	<td>{{list.m?list.m:''}}</td>
	    			    	<td>{{list.l?list.l:''}}</td>
	    			    	<td>{{list.xl?list.xl:''}}</td>
	    			    	<td>{{list.j?list.j:''}}</td> -->
	    			    	
	    			    </tr>
	    			    <tr style="height: 20px;">
	    			    	<td rowspan="2">颜色</td>
	    			    	<td colspan="6">细数</td>
                            <td rowspan="5" style="width:100px;"><img src="http://yy-data.oss-cn-beijing.aliyuncs.com/1575611662204-img-B184k09467p3370.png" style="width: 96%;height: 165px;"></td>
<!-- 	    			    	<td colspan="2">汇总</td>
	    			    	
	    			    	 -->
	    			    </tr>
	    			    <tr>
	    			    	<td>S</td>
	    			    	<td>M</td>
	    			    	<td>L</td>
	    			    	<td>XL</td>
	    			    	<td>J</td>
	    			    	<td>小计</td>
	    			    </tr>
	    			    <tr>
	                        <td>{{list.color}}</td>
	    			    	<td>{{list.s?list.s:''}}</td>
	    			    	<td>{{list.m?list.m:''}}</td>
	    			    	<td>{{list.l?list.l:''}}</td>
	    			    	<td>{{list.xl?list.xl:''}}</td>
	    			    	<td>{{list.j?list.j:''}}</td>
	    			    	<td>{{list.num}}</td>
	    			    </tr>
	    			    <tr>
	    			    	<td></td>
	    			    	<td></td>
	    			    	<td></td>
	    			    	<td></td>
	    			    	<td></td>
	    			    	<td></td>
	    			    	<td></td>
	    			    </tr>
	    			    <tr>
	    			    	<td  colspan="6">总计数量</td>
	    			    	<td>{{list.num}}</td>

	    			    </tr>
	    			</table>
				</el-card>



	    	</div>

	    	
	    </div>
		
	
		
	</div>
	
</template>

<script>
import { mapGetters } from 'vuex'


  export default {
    name: "system-setting",
    data(){
      return{
      	order_data:[],



      }
    },
    created() {

    },
    computed:{
      ...mapGetters([
          'getpageDict',
      ]),


      get_goods_supply(){

      	let demand = this.getpageDict.filter((list)=>{
      		return list.dicType == 'goods_supply'
      	})
      	return demand[0].dicList
      
      }

    },
    mounted(){ 

    	this.find_order_goods()
 
      
    },
    methods:{

      fmtDatey(obj){
        var date =  new Date(obj*1000);
        var y = 1900+date.getYear();

        return y
       
      },



      fmtDate(obj){
        var date =  new Date(obj*1000);
        var y = 1900+date.getYear();
        var m = "0"+(date.getMonth()+1);
        var d = "0"+date.getDate();
        //var h = date.getHours();
        //console.info(h)
        return y+"/"+m.substring(m.length-2,m.length)+"/"+d.substring(d.length-2,d.length);
        //return y+"-"+m.substring(m.length-2,m.length);
      },


		get_goods_supply_name(id){

			let name = ''

			for(let i=0;i<this.get_goods_supply.length;i++){
				if(this.get_goods_supply[i].dicCode == id)
					name = this.get_goods_supply[i].dicName
			}
			return name

		} ,


		find_order_goods(){
			this.$http.post(`order_goods/find_order_goods_is_deal`)
			.then((data)=>{

				if(data.code == '200'){

					this.order_data = data.data
					console.info(this.order_data)

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









    },
  }
</script>






<style scoped lang="less">
.size_setting {


	margin: 0 20px;
	height: calc(100vh - 116px);
	//background-color: red;

	.wrap {
		height: calc(100vh - 116px);


		&_top{

		}

		&_content{
			display: flex;
			flex-wrap: wrap;
			justify-content:space-between;



			.singal_warp{
				//height: 320px;
				width: 49%;
				//min-width: 700px;
				margin-top: 20px;
				//background-color:#ccc;

				table{
					width: 100%;
					border-collapse: collapse;
					font-size: 14px;
					border:0px;

					.input_td{
						font-weight: bold;
					}

					tr {


						td {
							text-align: center;
							height: 34px;
							border:1px solid #d1d2d4;
							width: 50px;	
							//border-left:0px;

						}
					}

					tr:nth-child(1) {
						td {
							border-top:0px;

						}

					}

				}
			}
		}
	}




}
  
</style>
