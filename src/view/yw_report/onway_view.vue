<template>
	<div class="supply_setting">
	    <div class="wrap">
	    	<div class="wrap_top">

	    	</div>

            <div class="wrap_content"  ref="table_warp">
	    		<el-table 
	    		 :data="order_data"
		          border
		          :height="table_height"
		          style="width: 100%"
		          highlight-current-row
		         
		          :header-cell-style='{"background": "#3f3f3f",
		            "border-right": "1px solid #cecece",
		            "border-bottom": "0px",
		            "text-align": "center",
		            "color": "#ffffff",
		            }'>
		          <el-table-column
		            label="序号"
		            prop="shop"
		            type="index"
		            width="80"
		            align="center">
		          </el-table-column>
		          <el-table-column
		            label="供应链"
		            prop="supplyId"
		            align="center">
		            <template slot-scope="scoped">
		            	{{get_goods_supply_name(scoped.row.supplyId)}}
		            </template>
		          </el-table-column>
		          <el-table-column
		            label="货号"
		            prop="wareId"
		            width="180"
		            align="center">
		          </el-table-column>
		          <el-table-column
		            label="时间"
		            prop="shop"
		            align="center">
		            <template slot-scope="scoped">
		            	{{fmtDate(scoped.row.orderTime)}}
		            </template>
		          </el-table-column>
		          <el-table-column
		            label="S"
		            prop="s"
		            align="center">
		          </el-table-column>
		          <el-table-column
		            label="M"
		            prop="m"
		            align="center">
		          </el-table-column>
		          <el-table-column
		            label="L"
		            prop="l"
		            align="center">
		          </el-table-column>
		          <el-table-column
		            label="XL"
		            prop="xl"
		            align="center">
		          </el-table-column>
		          <el-table-column
		            label="J"
		            prop="j"
		            align="center">
		          </el-table-column>
		          <el-table-column
		            label="合计"
		            prop="num"
		            align="center">
		          </el-table-column>
		          <el-table-column
		            label="类型"
		            prop="shop"
		            align="center">
		            <template slot-scope="scoped">
		            	{{scoped.row.billsType == 1?'订货':'到货'}}
		            </template>
		          </el-table-column>
		          <el-table-column
		            label="是否完结"
		            prop="shop"
		            align="center">
		            <template slot-scope="scoped">
		            	{{scoped.row.finish?'完结':''}}
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
    name: "system-setting",
    data(){
      return{

      	order_data:[],
      	table_height:300,




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

      this.$nextTick(()=>{
        this.table_height = this.$refs.table_warp.offsetHeight - 40
      })

      
    	this.get_supply_order()

    	
 
      
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

		get_supply_order(){
			this.$http.post(`order_goods/get_order_goods`,{
				supplyId: ''
			})
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
.supply_setting {


	margin: 0 20px;
	height: calc(100vh - 116px);
	//background-color: red;

	.wrap {
		height: calc(100vh - 116px);

		&_top{
		    margin-top: 10px;
		    padding-left: 10px;
		    border-bottom: 1px solid #e2e2e2;

	      .monbtn{
	        position: relative;
	        //width:180px;
	        background-color: rgb(140, 206, 173);
	        color: #fff; 
	      }

			.search_p{
			    display: inline-block;
			    margin-bottom: 20px;
			    margin-right: 20px;
			    font-size: 14px;


			    .input-class{

			    	display: inline-block;
			    	width: 180px;

			    }
			}
		}


		&_content{
			height: calc(100vh - 200px);
			margin-top: 10px;
			//background-color:red;
		}





	}




}
  
</style>
