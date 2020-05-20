<template>
  <div class="report">
    <div class="report_warp">

      <div class="report_warp_top">

        <p class="input_p1">
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

        <p class="input_p1">
	        <el-cascader
			    :options="shop_list"
			    collapse-tags
			    placeholder="选择品牌店铺"
			    v-model="search.shopId"
			    clearable
			    :props="{ multiple: true }"
			    @change="">
			   
			</el-cascader>
        </p>

        <el-button class="monbtn" @click="show_time_sharing">搜 索</el-button>



      </div>

      <div class="report_warp_content" ref="table_warp" id="table2">
        <el-table
          :data="tableData"
          border
          :height="table_height"
          
          highlight-current-row
          @expand-change="show_detail"
          :header-cell-style='{"background": "#3f3f3f",
            "border-right": "1px solid #cecece",
            "border-bottom": "0px",
            "text-align": "center",
            "color": "#ffffff",
            "padding":"8px"}'
          :cell-style="{padding:5+'px'}">
          <el-table-column type="expand">
            <template slot-scope="scoped">
              <el-table
                :data="scoped.row.list"
                :header-cell-style='{"background": "#669999",
                  "border-right": "1px solid #cecece",
                  "border-bottom": "0px",
                  "text-align": "center",
                  "color": "#ffffff",
                  "padding":"5px"}'
                border
                style="width: 100%;padding:0px;"
                :row-style="{height:0+'px'}"
                :cell-style="{padding:3+'px','border-right': '1px solid #cecece','background-color':'#f7f7f7'}"
                >
	            <el-table-column
		            label="日期"
		            prop="shopNum"
		            align="center"
		            width="120">
		            <template slot-scope="scoped">
		            	{{fmtDate(scoped.row.data)}}
		            </template>
		         </el-table-column>

		         <el-table-column
		            label="0"
		            prop="zero"
		            align="center">
		         </el-table-column>
		         <el-table-column
		            label="1"
		            prop="one"
		            align="center">
		         </el-table-column>
		         <el-table-column
		            label="2"
		            prop="two"
		            align="center">
		         </el-table-column>
		        <el-table-column
		          label="3"
		          prop="three"
		          align="center">
		        </el-table-column>
		        <el-table-column
		          label="4"
		          prop="four"
		          align="center">
		        </el-table-column>
		        <el-table-column
		          label="5"
		          prop="five"
		          align="center">
		        </el-table-column>
		        <el-table-column
		          label="6"
		          prop="six"
		          align="center">
		        </el-table-column>
		         <el-table-column
		            label="7"
		            prop="seven"
		            align="center">
		         </el-table-column>
		         <el-table-column
		            label="8"
		            prop="eight"
		            align="center">
		         </el-table-column>
		         <el-table-column
		            label="9"
		            prop="nine"
		            align="center">
		         </el-table-column>
		        <el-table-column
		          label="10"
		          prop="ten"
		          align="center">
		        </el-table-column>
		        <el-table-column
		          label="11"
		          prop="eleven"
		          align="center">
		        </el-table-column>
		        <el-table-column
		          label="12"
		          prop="twelve"
		          align="center">
		        </el-table-column>
		        <el-table-column
		          label="13"
		          prop="thirteen"
		          align="center">
		        </el-table-column>
		         <el-table-column
		            label="14"
		            prop="forteen"
		            align="center">
		         </el-table-column>
		         <el-table-column
		            label="15"
		            prop="fifteen"
		            align="center">
		         </el-table-column>
		         <el-table-column
		            label="16"
		            prop="sixteen"
		            align="center">
		         </el-table-column>
		        <el-table-column
		          label="17"
		          prop="seventeen"
		          align="center">
		        </el-table-column>
		        <el-table-column
		          label="18"
		          prop="eighteen"
		          align="center">
		        </el-table-column>
		        <el-table-column
		          label="19"
		          prop="nineteen"
		          align="center">
		        </el-table-column>
		        <el-table-column
		          label="20"
		          prop="twenty"
		          align="center">
		        </el-table-column>
		         <el-table-column
		            label="21"
		            prop="twentyOne"
		            align="center">
		         </el-table-column>
		         <el-table-column
		            label="22"
		            prop="twentyTwo"
		            align="center">
		         </el-table-column>
		         <el-table-column
		            label="23"
		            prop="twentyThree"
		            align="center">
		         </el-table-column>
		         <el-table-column
		            label="全天"
		            prop="allDay"
		            align="center">
		         </el-table-column>
            
              </el-table>
            </template>
	      </el-table-column>



          <!-- 外层table -->
	         <el-table-column
	            label="店铺"
	            prop="shopNum"
	            align="center"
	            width="120">
	         </el-table-column>
	         <el-table-column
	            label="0"
	            prop="zero"
	            align="center">
	         </el-table-column>
	         <el-table-column
	            label="1"
	            prop="one"
	            align="center">
	         </el-table-column>
	         <el-table-column
	            label="2"
	            prop="two"
	            align="center">
	         </el-table-column>
	        <el-table-column
	          label="3"
	          prop="three"
	          align="center">
	        </el-table-column>
	        <el-table-column
	          label="4"
	          prop="four"
	          align="center">
	        </el-table-column>
	        <el-table-column
	          label="5"
	          prop="five"
	          align="center">
	        </el-table-column>
	        <el-table-column
	          label="6"
	          prop="six"
	          align="center">
	        </el-table-column>
	         <el-table-column
	            label="7"
	            prop="seven"
	            align="center">
	         </el-table-column>
	         <el-table-column
	            label="8"
	            prop="eight"
	            align="center">
	         </el-table-column>
	         <el-table-column
	            label="9"
	            prop="nine"
	            align="center">
	         </el-table-column>
	        <el-table-column
	          label="10"
	          prop="ten"
	          align="center">
	        </el-table-column>
	        <el-table-column
	          label="11"
	          prop="eleven"
	          align="center">
	        </el-table-column>
	        <el-table-column
	          label="12"
	          prop="twelve"
	          align="center">
	        </el-table-column>
	        <el-table-column
	          label="13"
	          prop="thirteen"
	          align="center">
	        </el-table-column>
	         <el-table-column
	            label="14"
	            prop="forteen"
	            align="center">
	         </el-table-column>
	         <el-table-column
	            label="15"
	            prop="fifteen"
	            align="center">
	         </el-table-column>
	         <el-table-column
	            label="16"
	            prop="sixteen"
	            align="center">
	         </el-table-column>
	        <el-table-column
	          label="17"
	          prop="seventeen"
	          align="center">
	        </el-table-column>
	        <el-table-column
	          label="18"
	          prop="eighteen"
	          align="center">
	        </el-table-column>
	        <el-table-column
	          label="19"
	          prop="nineteen"
	          align="center">
	        </el-table-column>
	        <el-table-column
	          label="20"
	          prop="twenty"
	          align="center">
	        </el-table-column>
	         <el-table-column
	            label="21"
	            prop="twentyOne"
	            align="center">
	         </el-table-column>
	         <el-table-column
	            label="22"
	            prop="twentyTwo"
	            align="center">
	         </el-table-column>
	         <el-table-column
	            label="23"
	            prop="twentyThree"
	            align="center">
	         </el-table-column>
	         <el-table-column
	            label="合计"
	            prop="total"
	            align="center">
	         </el-table-column>

        </el-table>

        <div class="pagination">
              <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[200, 250, 300, 350, 400]"
                :page-size="search.pageSize"
                :current-page="search.pageNum"
                :total="search.total"
                layout="total,sizes, prev, pager, next"
                >
              </el-pagination>
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
        search:{
          start:new Date(new Date(new Date().toLocaleDateString()).getTime() - 24*60*60*1000*15),
          end:new Date(new Date(new Date().toLocaleDateString()).getTime() + 24*60*60*1000-1),
          shopId:'',
          pageSize:200,
          pageNum:1,
          total:10
        },
        table_height:300,
        shop_list:[],
        tableData:[],

      }
    },
    created() {

    },
    computed:{
      ...mapGetters([
          'getpageDict',
      ]),


      shopidchange(){
      	let arr = []

      	if(this.search.shopId.length){
      		for(let i=0;i<this.search.shopId.length;i++){
      			arr.push(this.search.shopId[i][1])
      		}
      	}
      	
      	return arr
      },




      get_shop_type(){
        let shop_type = this.getpageDict.filter((list)=>{
          return list.dicType == 'shop_type'
        })
        return shop_type[0].dicList
      }

    },
    mounted(){ 
      this.$nextTick(()=>{
        this.table_height = this.$refs.table_warp.offsetHeight - 40
      })

      this.get_brand()

      this.show_time_sharing()




      
      
    },
    methods:{

      handleSizeChange(val) {
          this.search.pageSize = val
          this.search.pageNum = 1
          this.show_time_sharing()
         
        },


      handleCurrentChange(val) {
          this.search.pageNum = val
          this.show_time_sharing()
         
      },

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

    	get_brand(){
    		this.$http.get(`compose/get_brand`)
    		.then((data)=>{
    			if(data.code == '200'){
    				this.search.shopId = ''
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

      show_time_sharing(){



      	let startTime = this.search.start?this.search.start.getTime().toString().substr(0,10):''
      	let endTime = this.search.end?this.search.end.getTime().toString().substr(0,10):''
      	this.$http.post(`compose/show_time_sharing`,{
      		startTime: startTime,
			endTime: endTime,
			pageNum:this.search.pageNum,
			pageSize: this.search.pageSize,
			shopIds: this.shopidchange.length?this.shopidchange.join(','):''

      	})
      	.then((data)=>{
      		if(data.code == '200'){
      			for(let i=0;i<data.data.list.length;i++){
      				data.data.list[i]['list'] = []
      			}
      			this.tableData = data.data.list
      			this.search.total = data.data.total
      			//console.info(this.tableData)
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
      show_detail(row){
        console.info(row)
        let index = ''

        for(let i=0;i<this.tableData.length;i++){
        	if(this.tableData[i].shopId == row.shopId){
        		index = i
        		break
        	}
        }
        if(!this.tableData[index].list.length>0){
        	//this.tableData[index]['list'] = []
        	let startTime = this.search.start?this.search.start.getTime().toString().substr(0,10):''
	      	let endTime = this.search.end?this.search.end.getTime().toString().substr(0,10):''
	        this.$http.post(`compose/show_time_sharing_detail`,{
	        	shopId: row.shopId,
				startTime: startTime,
				endTime: endTime

	        })
	        .then((data)=>{
	        	if(data.code == '200'){
	      			
	      			this.tableData[index]['list'] = data.data
	      			//console.info(this.tableData[index])
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
        	
        }

      }


    },
  }
</script>
<style lang="less">
    #table2 .el-table__expanded-cell{
      padding-right: 0 !important;
      padding-top: 0 !important;
      padding-left: 45px !important;
    }
    .hiderow .el-table__expand-column .el-icon {
      visibility: hidden;
    }



.el-table th.gutter{
    display: table-cell!important;
    width: 17px!important;
}


</style>


<style scoped lang="less">
.report {

    font-size:14px; 
    position: relative;
    height: calc(100vh - 120px);
    margin: 0 20px;
    width: 98%;
    &_warp{

      height: calc(100vh - 130px);
      width: 100%;
    .monbtn{
      position: relative;
      //width:180px;
      background-color: rgb(140, 206, 173);
      color: #fff; 
    }

      .cursor{
        cursor: pointer;
      }

      &_top{
        height:60px;
        //margin-top: 20px;
        border-bottom: 1px solid #e2e2e2;
        padding-left: 20px;
        //background-color:red;
        position: relative;
        padding-bottom: 10px;

        .input_p1{
          display: inline-block;
          margin-right: 20px;
          

          .input_class{
            width: 200px;
            display: inline-block;
          }
        }




      }



      &_content{
        height: calc(100vh - 195px);
        //width: calc(100vw - 300px);
        //background-color:red;
        margin-top: 10px;
        //width: 96%;
        position:relative;



        .pagination {
            position: absolute;
            bottom: 0px;
            right: 20px;
          }



      }
  }
}
  
</style>
