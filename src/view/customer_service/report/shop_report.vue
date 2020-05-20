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
            class="input_class"
            clearable
            :props="{ multiple: true }"
            @change="">
         
          </el-cascader>
        </p>

        <p class="input_p1">
          <el-cascader
            :options="group_list"
            :props="groupprops"
            v-model="search.groupIds"
            clearable
            collapse-tags
            :show-all-levels="false"
            class="input_class"
            placeholder="请选择部门"
            @change="">
          </el-cascader>
        </p>


        <p class="input_p1">
          <el-select
           class="input_class"
           v-model="search.shopType"
           clearable
           placeholder="请选择平台">
             <el-option
              v-for="list in get_shop_type"
              :key="list.dicCode"
              :label="list.dicName"
              :value="list.dicCode">
               
             </el-option>
           </el-select>
        </p>

        <el-button class="monbtn" @click="show_ct_shop">搜 索</el-button>

      </div>

      <div class="report_warp_content" ref="table_warp" id="table2">
        <el-table
          :data="tableData"
          border
          :height="table_height"
          style="width: 100%"
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
                style="width: 100%；padding:0px;"
                :row-style="{height:0+'px'}"
                :cell-style="{padding:3+'px','border-right': '1px solid #cecece',}"
                >

		         <el-table-column
		            label="日期"
		            prop="shopNum"
		            width="120"
		            align="center">
		            <template slot-scope="scoped">
		            	{{fmtDate(scoped.row.data)}}
		            </template>
		          </el-table-column>
		          <el-table-column
		            label="店铺编码"
		            prop="shopNum"
		            width="100"
		            align="center">
		          </el-table-column>
		          <el-table-column
		            label="接待人数"
		            prop="receptionNum"
		            width="100"
		            align="center">
		          </el-table-column>
		          <el-table-column
		            label="询单人数"
		            prop="enquiryNum"
		            width="100"
		            align="center">
		          </el-table-column>
		          <el-table-column
		            label="上班人数"
		            prop="onlineTotal"
		            width="100"
		            align="center">
		          </el-table-column>
		          <el-table-column
		            label="店铺人均询单数"
		            prop="enquiryNumAvg"
		            width="100"
		            align="center">
		          </el-table-column>
              <el-table-column
                label="询单->最终付款人数"
                prop="payNum"
                width="110"
                align="center">
              </el-table-column>
		          <el-table-column
		            label="询单->最终付款成功率"
		            prop="payRate"
		            width="120"
		            align="center">
                <template slot-scope="scoped">
                  {{(scoped.row.payRate * 100).toFixed(2)}}%
                </template>
		          </el-table-column>
		          <el-table-column
		            label="客单价"
		            prop="guestPrice"
		            width="90"
		            align="center">
		          </el-table-column>
		          <el-table-column
		            label="客件数"
		            prop="guestNum"
		            width="90"
		            align="center">
		          </el-table-column>
		          <el-table-column
		            label="件均价"
		            width="90"
		            prop="guestPriceAvg"
		            align="center">
		          </el-table-column>
		          <el-table-column
		            label="UV价值"
		            prop="uv"
		            width="90"
		            align="center">
		          </el-table-column>
		          <el-table-column
		            label="销售额"
		            prop="saleMoney"
		            width="120"
		            align="center">
		          </el-table-column>
		          <el-table-column
		            label="手工调整金额"
		            prop="bargainingMaster"
		            width="100"
		            align="center">
		          </el-table-column>
		          <el-table-column
		            label="手工折扣率"
		            prop="discountRate"
		            width="110"
		            align="center">
                <template slot-scope="scoped">
                  {{(scoped.row.discountRate * 100).toFixed(2)}}%
                </template>
		          </el-table-column>
		          <el-table-column
		            label="回复率"
		            prop="reversionRate"
		            width="90"
		            align="center">
                <template slot-scope="scoped">
                  {{(scoped.row.reversionRate * 100).toFixed(2)}}%
                </template>
		          </el-table-column>
		          <el-table-column
		            label="平均响应时间"
		            prop="responseAvg"
		            width="100"
		            align="center">
		          </el-table-column>
		          <el-table-column
		            label="首次响应时间"
		            prop="responseFirst"
		            width="100"
		            align="center">
		          </el-table-column>
		          <el-table-column
		            label="平均接待时长"
		            prop="receptionAvgsecond"
		            width="100"
		            align="center">
		          </el-table-column>
		          <el-table-column
		            label="静默下单本人落实付款-人数"
		            prop="orderPnum"
		            width="140"
		            align="center">
		          </el-table-column>
		          <el-table-column
		            label="静默下单本人落实付款-金额"
		            prop="orderPmoney"
		            width="140"
		            align="center">
		          </el-table-column>
		          <el-table-column
		            label="客服答问比"
		            prop="customerRate"
                width="100"
		            align="center">
                <template slot-scope="scoped">
                  {{(scoped.row.customerRate * 100).toFixed(2)}}%
                </template>
		          </el-table-column>
		          <el-table-column
		            label="慢响应人数"
		            prop="longResponseNum"
		            align="center">
		          </el-table-column>
		          <el-table-column
		            label="店铺销售人数"
		            prop="shopMarketCount"
		            align="center">
		          </el-table-column>
		          <el-table-column
		            label="客服销售人数占比"
		            prop="serviceMarkRate"
		            width="120"
		            align="center">
                <template slot-scope="scoped">
                  {{(scoped.row.serviceMarkRate * 100).toFixed(2)}}%
                </template>
		          </el-table-column>
            
              </el-table>
            </template>
          </el-table-column>


          <el-table-column
            label="店铺编码"
            prop="shopNum"
            width="120"
            align="center">
          </el-table-column>
          <el-table-column
            label="负责部门"
            prop="groupName"
            width="100"
            align="center">
          </el-table-column>
          <el-table-column
            label="接待人数"
            prop="receptionNum"
            width="100"
            align="center">
          </el-table-column>
          <el-table-column
            label="询单人数"
            prop="enquiryNum"
            width="100"
            align="center">
          </el-table-column>
          <el-table-column
            label="上班人数"
            prop="onlineTotal"
            width="100"
            align="center">
          </el-table-column>
          <el-table-column
            label="店铺人均询单数"
            prop="enquiryNumAvg"
            width="100"
            align="center">
          </el-table-column>
          <el-table-column
            label="询单->最终付款人数"
            prop="payNum"
            width="110"
            align="center">
          </el-table-column>
          <el-table-column
            label="询单->最终付款成功率"
            prop="payRate"
            width="120"
            align="center">
              <template slot-scope="scoped">
                {{(scoped.row.payRate * 100).toFixed(2)}}%
              </template>
          </el-table-column>
          <el-table-column
            label="客单价"
            prop="guestPrice"
            width="90"
            align="center">
          </el-table-column>
          <el-table-column
            label="客件数"
            prop="guestNum"
            width="90"
            align="center">
          </el-table-column>
          <el-table-column
            label="件均价"
            width="90"
            prop="guestPriceAvg"
            align="center">
          </el-table-column>
          <el-table-column
            label="UV价值"
            prop="uv"
            width="90"
            align="center">
          </el-table-column>
          <el-table-column
            label="销售额"
            prop="saleMoney"
            width="120"
            align="center">
          </el-table-column>
          <el-table-column
            label="手工调整金额"
            prop="bargainingMaster"
            width="100"
            align="center">
          </el-table-column>
          <el-table-column
            label="手工折扣率"
            prop="discountRate"
            width="110"
            align="center">
              <template slot-scope="scoped">
                {{(scoped.row.discountRate * 100).toFixed(2)}}%
              </template>
          </el-table-column>
          <el-table-column
            label="回复率"
            prop="reversionRate"
            width="90"
            align="center">
              <template slot-scope="scoped">
                {{(scoped.row.reversionRate * 100).toFixed(2)}}%
              </template>
          </el-table-column>
          <el-table-column
            label="平均响应时间"
            prop="responseAvg"
            width="100"
            align="center">
          </el-table-column>
          <el-table-column
            label="首次响应时间"
            prop="responseFirst"
            width="100"
            align="center">
          </el-table-column>
          <el-table-column
            label="平均接待时长"
            prop="receptionAvgsecond"
            width="100"
            align="center">
          </el-table-column>
          <el-table-column
            label="静默下单本人落实付款-人数"
            prop="orderPnum"
            width="140"
            align="center">
          </el-table-column>
          <el-table-column
            label="静默下单本人落实付款-金额"
            prop="orderPmoney"
            width="140"
            align="center">
          </el-table-column>
          <el-table-column
            label="客服答问比"
            prop="customerRate"
            width="100"
            align="center">
              <template slot-scope="scoped">
                {{(scoped.row.customerRate * 100).toFixed(2)}}%
              </template>
          </el-table-column>
          <el-table-column
            label="慢响应人数"
            prop="longResponseNum"
            align="center">
          </el-table-column>
          <el-table-column
            label="店铺销售人数"
            prop="shopMarketCount"
            align="center">
          </el-table-column>
          <el-table-column
            label="客服销售人数占比"
            prop="serviceMarkRate"
            width="120"
            align="center">
              <template slot-scope="scoped">
                {{(scoped.row.serviceMarkRate * 100).toFixed(2)}}%
              </template>
          </el-table-column>

        </el-table>

        <div class="pagination">
              <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[200, 250, 300, 350, 400]"
                :page-size="search.pageSize"
                :current-page="search.currentPage"
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
          end:new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1),
          shopId:'',
          groupIds:[],
          shopType:'',
          pageSize:200,
          pageNum:1,
          total:0
        },
        table_height:300,
        shop_list:[],
        group_list:[],
        tableData:[],
        groupprops:{
          //checkStrictly: true,
          multiple: true,
          value: 'groupId',
          label: 'groupName',
          children: 'groupVOList',
        },


      }
    },
    created() {

    },
    computed:{
      ...mapGetters([
          'getpageDict',
      ]),


      get_brand(){
        let brand = this.getpageDict.filter((list)=>{
          return list.dicType == 'brand'
        })
        return brand[0].dicList
      },

      get_shop_type(){
        let shop_type = this.getpageDict.filter((list)=>{
          return list.dicType == 'shop_type'
        })
        return shop_type[0].dicList
      },

      shopidchange(){
      	let arr = []
      	if(this.search.shopId.length){
      		for(let i=0;i<this.search.shopId.length;i++){
      			arr.push(this.search.shopId[i][1])
      		}
      	}
      	return arr
      }

    },
    mounted(){ 
      this.$nextTick(()=>{
        this.table_height = this.$refs.table_warp.offsetHeight - 40
      })


      this.get_shop_bybrand()
      this.get_group_list()
      this.show_ct_shop()






      
      
    },
    methods:{

      handleSizeChange(val) {
          this.search.pageSize = val
          this.search.currentPage = 1
          this.show_ct_shop()
         
        },


      handleCurrentChange(val) {
          this.search.currentPage = val
          this.show_ct_shop()
         
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

      get_shop_bybrand(){
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


      get_group_list(){
        this.$http.get(`compose/get_group_list`)


        .then((data)=>{
          if(data.code == '200'){
            
            this.group_list = data.data
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

      //包含售中售后的部门
      get_customer_group_list(){
          this.$http.get(`group/get_customer_group_list`)
          .then((data)=>{
            if(data.code == '200'){

              let grouplist = []
            

              for(let i=0;i<data.data[0].groupVOList.length;i++){
                grouplist.push({groupId:data.data[0].groupVOList[i].groupId, groupName:data.data[0].groupVOList[i].groupName})


                //list.push({groupName:data.data[0].groupVOList[i].groupName, groupId:data.data[0].groupVOList[i].groupId})

                if(data.data[0].groupVOList[i].groupVOList && data.data[0].groupVOList[i].groupVOList.length>0){

                  grouplist[grouplist.length-1]['groupVOList'] = []

                  for(let j=0;j<data.data[0].groupVOList[i].groupVOList.length;j++){


                    this.diguidata(data.data[0].groupVOList[i].groupVOList[j],grouplist[grouplist.length-1]['groupVOList'])
                  }
                }
              } 

              //this.group_list = grouplist
              



              //this.groupListname = list
            } else {
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
      diguidata(groupVOList,grouplist){

        //list.push({groupName: groupVOList.groupName, groupId:groupVOList.groupId})

        grouplist.push({groupId:groupVOList.groupId, groupName:groupVOList.groupName})



        // if(groupVOList.groupVOList && groupVOList.groupVOList.length>0){
        //   grouplist[grouplist.length-1]['groupVOList'] = []
        //   //array[array.length-1].groupVOList = []
        //   for(let i=0;i<groupVOList.groupVOList.length;i++){
        //     this.diguidata(groupVOList.groupVOList[i],grouplist[grouplist.length-1]['groupVOList'])
        //   }
        // }
        

      },

      show_ct_shop(){
        let groupIds = []
        if(this.search.groupIds.length){
          for(let i=0;i<this.search.groupIds.length;i++){
            groupIds.push("'" + this.search.groupIds[i] + "'")
          }
          
        }

      	this.$http.post(`compose/show_ct_shop`,{
          startTime: this.search.start?this.search.start.getTime().toString().substr(0,10):'',
          endTime: this.search.end?this.search.end.getTime().toString().substr(0,10):'',
          pageNum: this.search.pageNum,
          pageSize: this.search.pageSize,
          shopIds: this.shopidchange.length?this.shopidchange.join(','):'',
          groupIds: groupIds.join(','),
          shopType: this.search.shopType

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
        //console.info(row)
        let index = ''
        for(let i=0;i<this.tableData.length;i++){
          if(this.tableData[i].shopId == row.shopId){
            index = i
            break
          }
        }

        if(!this.tableData[index].list.length>0){

          this.$http.post(`compose/show_ct_shop_detail`,{
            startTime: this.search.start?this.search.start.getTime().toString().substr(0,10):'',
            endTime: this.search.end?this.search.end.getTime().toString().substr(0,10):'',
            shopId: row.shopId

          })
          .then((data)=>{
            if(data.code == '200'){
              
              this.tableData[index]['list'] = data.data

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
<style>
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
    &_warp{

      height: calc(100vh - 130px);


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
            width: 180px;
            display: inline-block;
          }
        }




      }



      &_content{
        height: calc(100vh - 195px);
        //background-color:red;
        margin-top: 10px;
        width: 100%;
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
