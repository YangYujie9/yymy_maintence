<template>
  <div class="report">
    <div class="report_warp">

      <div class="report_warp_top">

        <p class="input_p1">
          <el-date-picker
            v-model="search.start"
            type="date"
            placeholder="选择日期"
            class="input_class">
          </el-date-picker>
          <span>至</span>
          <el-date-picker
            v-model="search.end"
            type="date"
            placeholder="选择日期"
            class="input_class">
          </el-date-picker>

        </p>


        <p class="input_p1">
          <el-select
           class="input_class"
           v-model="search.teamId"
           clearable
           filterable
           placeholder="请选择团队">
             <el-option
              v-for="list in team_list"
              :key="list.teamid"
              :label="list.teamName"
              :value="list.teamid">
               
             </el-option>
           </el-select>
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

        <el-button class="monbtn" @click="show_ct_service">搜 索</el-button>


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
                    prop="teamName"
                    width="111"
                    align="center">
                    <template slot-scope="scoped">
                      {{fmtDate(scoped.row.data)}}
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="店铺"
                    prop="shopNum"
                    width="110"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    label="早晚班"
                    prop="classesId"
                    width="140"
                    align="center">
                    <template slot-scope="scoped">
                      {{get_compose_type(scoped.row.classesId)}}
                    </template>
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
                    label="日均询单人数"
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
                    width="110"
                    align="center">
                    <template slot-scope="scoped">
                      {{(scoped.row.payRate * 100).toFixed(2)}}%
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="客单价"
                    prop="guestPrice"
                    width="80"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    label="客件数"
                    prop="guestNum"
                    width="80"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    label="UV价值"
                    width="90"
                    prop="uv"
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
                    width="90"
                    align="center">
                      <template slot-scope="scoped">
                        {{(scoped.row.discountRate * 100).toFixed(0)}}%
                      </template>
                  </el-table-column>
                  <el-table-column
                    label="回复率"
                    prop="reversionRate"
                    width="80"
                    align="center">
                      <template slot-scope="scoped">
                        {{(scoped.row.reversionRate * 100).toFixed(0)}}%
                      </template>
                  </el-table-column>
                  <el-table-column
                    label="平均响应时间"
                    prop="responseAvg"
                    width="80"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    label="首次响应时间"
                    prop="responseFirst"
                    width="80"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    label="平均接待时长"
                    prop="receptionAvg"
                    width="80"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    label="静默下单本人落实付款-人数"
                    prop="orderPnum"
                    width="130"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    label="静默下单本人落实付款-金额"
                    prop="orderPmoney"
                    width="130"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    label="答问比"
                    prop="customerRate"
                    width="80"
                    align="center">
                      <template slot-scope="scoped">
                        {{(scoped.row.customerRate * 100).toFixed(0)}}%
                      </template>
                  </el-table-column>
                  <el-table-column
                    label="未回复人数"
                    prop="nreversionRate"
                    width="80"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    label="慢响应人数"
                    prop="longResponseNum"
                    width="80"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    label="询单->最终下单人数"
                    prop="orderNum"
                    width="110"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    label="下单到付款成功率"
                    prop="orderRate"
                    width="100"
                    align="center">
                      <template slot-scope="scoped">
                        {{(scoped.row.orderRate * 100).toFixed(0)}}%
                      </template>
                  </el-table-column>
                  <el-table-column
                    label="最早上线"
                    prop="onlinePioneer"
                    width="90"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    label="在线总时长(秒)"
                    prop="onlineTimes"
                    width="90"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    label="服务总时长(秒)"
                    prop="serviceSnum"
                    width="90"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    label="挂起总时长(秒)"
                    prop="hangSnum"
                    width="90"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    label="遵时率(8.5h)"
                    prop="adherenceRate"
                    width="90"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    label="工时利用率"
                    prop="manhourRate"
                    align="center">
                  </el-table-column>
              </el-table>
            </template>
          </el-table-column>


          <el-table-column
            label="团队"
            prop="teamName"
            width="110"
            align="center">
          </el-table-column>
          <el-table-column
            label="客服"
            prop="staffName"
            width="110"
            align="center">
          </el-table-column>
          <el-table-column
            label="早班"
            prop="dayCount"
            width="70"
            align="center">
          </el-table-column>
          <el-table-column
            label="晚班"
            prop="nightCount"
            width="70"
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
            label="日均询单人数"
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
            width="110"
            align="center">
              <template slot-scope="scoped">
                {{(scoped.row.payRate * 100).toFixed(2)}}%
              </template>
          </el-table-column>
          <el-table-column
            label="客单价"
            prop="guestPrice"
            width="80"
            align="center">
          </el-table-column>
          <el-table-column
            label="客件数"
            prop="guestNum"
            width="80"
            align="center">
          </el-table-column>
          <el-table-column
            label="UV价值"
            width="90"
            prop="uv"
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
            width="90"
            align="center">
              <template slot-scope="scoped">
                {{(scoped.row.discountRate * 100).toFixed(0)}}%
              </template>
          </el-table-column>
          <el-table-column
            label="回复率"
            prop="reversionRate"
            width="80"
            align="center">
              <template slot-scope="scoped">
                {{(scoped.row.reversionRate * 100).toFixed(0)}}%
              </template>
          </el-table-column>
          <el-table-column
            label="平均响应时间"
            prop="responseAvg"
            width="80"
            align="center">
          </el-table-column>
          <el-table-column
            label="首次响应时间"
            prop="responseFirst"
            width="80"
            align="center">
          </el-table-column>
          <el-table-column
            label="平均接待时长"
            prop="receptionAvg"
            width="80"
            align="center">
          </el-table-column>
          <el-table-column
            label="静默下单本人落实付款-人数"
            prop="orderPnum"
            width="130"
            align="center">
          </el-table-column>
          <el-table-column
            label="静默下单本人落实付款-金额"
            prop="orderPmoney"
            width="130"
            align="center">
          </el-table-column>
          <el-table-column
            label="答问比"
            prop="customerRate"
            width="80"
            align="center">
              <template slot-scope="scoped">
                {{(scoped.row.customerRate * 100).toFixed(0)}}%
              </template>
          </el-table-column>
          <el-table-column
            label="未回复人数"
            prop="nreversionRate"
            align="center">
          </el-table-column>
          <el-table-column
            label="慢响应人数"
            prop="longResponseNum"
            align="center">
          </el-table-column>
          <el-table-column
            label="询单->最终下单人数"
            prop="orderNum"
            width="110"
            align="center">
          </el-table-column>
          <el-table-column
            label="下单到付款成功率"
            prop="orderRate"
            width="100"
            align="center">
              <template slot-scope="scoped">
                {{(scoped.row.orderRate * 100).toFixed(0)}}%
              </template>
          </el-table-column>
          <el-table-column
            label=""
            prop=""
            width="90"
            align="center">
          </el-table-column>
          <el-table-column
            label=""
            prop=""
            width="90"
            align="center">
          </el-table-column>
          <el-table-column
            label=""
            prop=""
            width="90"
            align="center">
          </el-table-column>
          <el-table-column
            label=""
            prop=""
            width="90"
            align="center">
          </el-table-column>
          <el-table-column
            label=""
            prop=""
            width="90"
            align="center">
          </el-table-column>
          <el-table-column
            label=""
            prop=""
           
            align="center">
          </el-table-column>


        </el-table>

        <div class="pagination">
              <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[250, 300, 350, 400, 450]"
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
          end:new Date(new Date(new Date().toLocaleDateString()).getTime() + 24*60*60*1000-1),
          teamId:'',
          pageSize:250,
          pageNum:1,
          total:10,
          shopType:''
        },
        table_height:300,
        team_list:[],
        tableData:[]


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
      get_compose_index(){
        let compose_type = this.getpageDict.filter((list)=>{
          return list.dicType == 'compose_classes'
        })
        return compose_type[0]
      },

    },
    mounted(){ 
      this.$nextTick(()=>{
        this.table_height = this.$refs.table_warp.offsetHeight - 40
      })

      this.get_team()
      this.show_ct_service()




      
      
    },
    methods:{

      handleSizeChange(val) {
          this.search.pageSize = val
          this.search.pageNum = 1
          this.show_ct_service()
         
        },


      handleCurrentChange(val) {
          this.search.pageNum = val
          this.show_ct_service()
         
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
      get_team(){
        this.$http.post(`compose/get_team`,{
          groupId: '',
        })
        .then((data)=>{
          if(data.code == '200'){
            this.team_list = data.data

          }else{
            return this.$message({
              message:'接口报错',
              type:'error'
            })
          }
        })
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
      show_ct_service(){
        this.$http.post(`compose/show_ct_service`,{
            startTime: this.search.start?this.search.start.getTime().toString().substr(0,10):'',
            endTime: this.search.end?this.search.end.getTime().toString().substr(0,10):'',
            pageNum: this.search.pageNum,
            pageSize: this.search.pageSize,
            teamId: this.search.teamId,
            shopType: this.search.shopType

        })
        .then((data)=>{
          if(data.code == '200'){
            for(let i=0;i<data.data.list.length;i++){
              data.data.list[i]['list'] = []
            }
            this.tableData = data.data.list

            this.search.total = data.data.total

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
      show_detail(row){
        let index = ''
        for(let i=0;i<this.tableData.length;i++){
          if(this.tableData[i].staffId == row.staffId){
            index = i
            break
          }
        }
        if(!this.tableData[index].list.length>0){

          this.$http.post(`compose/show_ct_service_detail`,{
            startTime: this.search.start?this.search.start.getTime().toString().substr(0,10):'',
            endTime: this.search.end?this.search.end.getTime().toString().substr(0,10):'',
            staffId: row.staffId
          })
          .then((data)=>{
            if(data.code == '200'){

              this.tableData[index]['list'] = data.data
              //console.info(this.tableData)

            }else{
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
