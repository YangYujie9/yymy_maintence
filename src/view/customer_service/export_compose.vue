<template>
  <div class="account_detail">

    <div class="account_detail_warp">
      <div class="search">
        <el-button class="monbtn cursor" style="width: 180px;font-weight: bold;cursor: pointer;">{{activeName}} 
        	<el-date-picker v-model="activedate" type="date" placeholder="选择日期" class="inpucus cursor" @change="changedate">
        	</el-date-picker>
        </el-button>
        <p style="display: inline-block;margin-left: 20px;">					
        	        <el-cascader
					    :options="shop_list"
					    collapse-tags
					    placeholder="选择品牌店铺"
					    v-model="shopId"
					    clearable
					    @change="show_export_compose">
					   
					</el-cascader></p>
       <!--  <el-button class="monbtn" @click="show_export_compose">搜索</el-button> -->

        <p class="right_btn">
          <el-button class="monbtn" @click="show_export_compose">刷新</el-button>
          <el-button class="monbtn" @click="exportcus">导出</el-button>
        </p>

      </div>

      <div class="content" ref="table_centent">

	    <el-table
	      :data="table_data"
	      :header-cell-style='{"background": "#3f3f3f",
	          "border-right": "1px solid #cecece",
	          "border-bottom": "0px",
	          "text-align": "center",
	          "color": "#ffffff"}'
	      border
	      style="width: 100%"
	      :height="table_height">
	      <el-table-column
	        prop="customerService"
	        label="客服"
	        align="center">
	      </el-table-column>
	      <el-table-column
	        prop="shopWw"
	        label="旺旺"
	        align="center">
	      </el-table-column>
	      <el-table-column
	        prop="address"
	        label="日期"
	        align="center">
	        <template slot-scope="scope">
	        	{{fmtDate(scope.row.data)}}
	        	
	        </template>
	      </el-table-column>
	      <el-table-column
	        prop="startTime"
	        label="开始时间"
	        align="center">
	      </el-table-column>
	      <el-table-column
	        prop="endTime"
	        label="结束时间"
	        align="center">
	      </el-table-column>


	    </el-table>



      </div>


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
      	activedate:new Date([new Date().getFullYear(),new Date().getMonth()+1,new Date().getDate()].join('-')),
      	current:{
      		composeId:'',
      		shopinfo:'',
      		add_staffIds:[],
      	},
      	table_data:[],
      	shop_list:[],
      	shopId:'',
      	table_height:300,
        
      }
    },

    computed:{
        ...mapGetters([
            'getpageDict',
        ]),


      activeName() {
        let y = ''
        let m = ''
        let d = ''
            if(this.activedate){
              //console.info(this.activemonth.getYear())
              y = 1900 + this.activedate.getYear()
              m = '0' + (this.activedate.getMonth()+1)
              d = "0" + this.activedate.getDate()
            }

            return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
        },

      get_compose_index(){
        let compose_type = this.getpageDict.filter((list)=>{
          return list.dicType == 'compose_classes'
        })
        return compose_type[0]
      },

      get_compose_type(val){
        let name = ''
        for(let i=0;i<this.get_compose_index.dicList.length;i++){
          if(this.get_compose_index.dicList[i].dicCode == val){
            name =  this.get_compose_index.dicList[i].dicName
            break
          }
        }

        return name

      },


    },


    created() {

    },
    mounted(){

    	this.get_brand()
    	this.show_export_compose()
 
		 this.$nextTick(()=>{
		 	this.table_height = this.$refs.table_centent.offsetHeight - 24
		 })
    	
    	


    	





      
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


        changedate(){
        	this.show_export_compose()

        },



    	get_brand(){
    		this.$http.get(`compose/get_brand`)
    		.then((data)=>{
    			if(data.code == '200'){
    				this.shopId = []
    				let list = []
    				for(let i=0;i<data.data.length;i++){
    					list.push({value:data.data[i].brandId, label:data.data[i].brandName})

    					if(data.data[i].list.length){
    					    list[i]['children'] = []
    						for(let j=0;j<data.data[i].list.length;j++){
    							list[i]['children'].push({value:data.data[i].list[j].id, label:data.data[i].list[j].shopNum})
    						}
    					}
    				}


    				this.shop_list = list
    				//this.shopId = this.shop_list[0].children[0].value
    				// this.shopId.push(this.shop_list[0].value)
    				// this.shopId.push(this.shop_list[0].children[0].value)
    				
    			}
    		})
    	},

        show_export_compose(){
        	let time = this.activedate.getTime().toString().substr(0,10)

        	this.$http.post(`compose/show_export_compose_shop`,{
        		data: time,
        		shopId: this.shopId[this.shopId.length-1]
        	})
	      	.then((data)=>{
	      		if(data.code == '200'){
	      			this.table_data = data.data

	      		}
	      	})
	        .catch(()=>{
	          this.$message({
	            message:'接口报错',
	            type:'error'
	          })
	        })
        },


        exportcus(){
            let time = this.activedate.getTime().toString().substr(0,10)
        	this.$data_exporthttp.post(`compose/export_compose_shop`,{
        		data: time,
        		shopId: this.shopId[this.shopId.length-1]
        	},{
                responseType: 'arraybuffer'
            })

            .then((res)=>{

              let fileName = decodeURI(res.headers['file-name'])
              let data = res.data

              console.info(fileName)


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
              that.$message({
                  message: '接口报错',
                  type: 'error'
                });
            });
        },









    }
  }
</script>
<style lang="less">

</style>
<style scoped lang="less">
.account_detail {
  min-width: 900px;
    .cursor{
      cursor: pointer;
    }
    .inpucus {
      opacity: 0;

      width: 180px;
      height: 26px;
      z-index: 10;
      position: absolute;
      left: 0px;
      top: 0px;
    }
        .top_style{
          background-color:rgb(94, 94, 94);
          color: #fff;
          height: 40px;
          line-height: 40px;
        }


    &_warp{
      height: calc(100vh - 200px);
      //width:calc(100vw - 270px);
      width: 100%;
        .monbtn{
          position: relative;
          //width:180px;
          background-color: rgb(140, 206, 173);
          color: #fff; 
        }


      .search{
        height: 60px;
        line-height: 60px;
        padding: 0 20px;
        position: relative;
        border-bottom: 1px solid #e2e2e2;


        .right_btn{
          display: inline-block;
          position:absolute;
          right: 20px;

        }
      }

      .content{
        height: calc(100vh - 224px);
        //width: calc(100vw - 520px);
        padding:10px 20px 20px 20px;
        border-bottom: 1px solid #e2e2e2;
        text-align: center;
        //background-color:red;






      }



    }




}
  
</style>