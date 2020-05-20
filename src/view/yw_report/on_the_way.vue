<template>
	<div class="supply_setting">
	    <div class="wrap">
	    	<div class="wrap_top">
	    		<p class="search_p">
	    			<span>供应链：</span>
	    			<el-select  v-model="search.supplyId" class="input-class" filterable clearable>
	    				<el-option v-for="item in get_goods_supply"
	    				:key="item.dicCode"
	    				:label="item.dicName"
	    				:value="item.dicCode">
	    				</el-option>
	    			</el-select>


	    			<el-button class="monbtn" style="margin-left: 30px;margin-bottom: 20px;position: relative;">采购入库单

		                <input style="left:0px" type="file" class="inpucus cursor" @change="import_wlniu_order_goods" />

		            </el-button>


		            <el-button class="monbtn" @click="export_on_way_by_size" style="margin-left: 20px;margin-bottom: 20px">在途(带尺码)</el-button>
		            <el-button class="monbtn" @click="export_on_way" style="margin-left: 20px;margin-bottom: 20px">在途(不带尺码)</el-button>
		            <el-button class="monbtn" @click="export_order_goods_qty" style="margin-left: 20px;margin-bottom: 20px">下单总量</el-button>
		            
	    		</p>

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
		            label="订单号"
		            prop="orderId"
		            align="center">
		          </el-table-column>
		          <el-table-column
		            label="货号"
		            prop="wareId"
		            width="160"
		            align="center">
		          </el-table-column>
		          <el-table-column
		            label="时间"
		            prop="shop"
		            width="100"
		            align="center">
		            <template slot-scope="scoped">
		            	{{fmtDate(scoped.row.orderTime)}}
		            </template>
		          </el-table-column>

		          <el-table-column
		            label="颜色"
		            prop="color"
		            align="center">
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
      	search:{
      		supplyId:''
      	},
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



      	return demand.length ? demand[0].dicList: []
      
      }




    },
    mounted(){ 


      this.$nextTick(()=>{
        this.table_height = this.$refs.table_warp.offsetHeight - 40
      })

      
    	this.find_order_goods()

    	
 
      
    },
    methods:{
    	export_order_goods_qty() {
    		let that = this
          this.$data_exporthttp.get(`order_goods/export_order_goods_qty`,{
            
            responseType: 'arraybuffer'
          })
            .then(function (res) {


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
    	export_on_way() {
    		let that = this
          this.$data_exporthttp.get(`order_goods/export_on_way`,{
            
            responseType: 'arraybuffer'
          })
            .then(function (res) {


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
    	export_on_way_by_size() {
    		let that = this
          this.$data_exporthttp.get(`order_goods/export_on_way_by_size`,{
            
            responseType: 'arraybuffer'
          })
            .then(function (res) {


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
    	import_wlniu_order_goods(event) {
    		let file = event.target.files[0]
    		let formData = new FormData()
    		formData.append('file',file)
	      	this.$http({
	      		url:`order_goods/import_wlniu_order_goods`,
	      		method:'POST',
	      		data:formData,
	      		headers: {'Content-Type': 'multipart/form-data'}
	      	})
			.then((data)=>{
				if(data.code == '200'){
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
			this.$http.post(`order_goods/find_order_goods`,{
				supplyId: this.search.supplyId
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
