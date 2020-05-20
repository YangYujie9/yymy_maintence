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

      <el-button class="monbtn" @click="get_abnormal">搜 索</el-button>


      </div>

      <div class="report_warp_content" ref="table_warp" id="table2">
        <el-table
          :data="tableData"
          border
          :height="table_height"
          style="width: 100%"
          highlight-current-row
         
          :header-cell-style='{"background": "#3f3f3f",
            "border-right": "1px solid #cecece",
            "border-bottom": "0px",
            "text-align": "center",
            "color": "#ffffff",
            }'
          >



          <el-table-column
            label="序号"
            prop="shop"
            type="index"
            width="80"
            align="center">
          </el-table-column>
          <el-table-column
            label="日期"
            prop="partment"
            align="center">
            <template slot-scope="scoped">
              {{fmtDate(scoped.row.data)}}
            </template>
          </el-table-column>
          <el-table-column
            label="异常账号"
            prop="customerService"
            align="center">
          </el-table-column>
          <el-table-column
            label="排班"
            prop="UV"
            align="center">
            <template slot-scope="scoped">
              <i class="el-icon-check" v-if="scoped.row.composeStatus" style="font-size: 22px;"></i>
              <i class="el-icon-close" v-else style="font-size: 22px;"></i>
            </template>
          </el-table-column>
          <el-table-column
            label="导入"
            prop="car"
            align="center">
            <template slot-scope="scoped">
              <i class="el-icon-check" v-if="scoped.row.importStatus" style="font-size: 22px;"></i>
              <i class="el-icon-close" v-else style="font-size: 22px;"></i>
            </template>
          </el-table-column>
          <el-table-column
            label="备注"
            prop="comment"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            prop="salenum"
            align="center">
            <template slot-scope="scoped">
              <i class="iconfont iconbianji icon_class" @click="editshow(scoped.row)"></i>
            </template>
            
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

    <el-dialog
      title="编辑备注"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="500px">
      <div>
        <p class="input_input">
          <span style="position: relative;top:-63px;">备注：</span>
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="comment"
            maxlength="100"
            show-word-limit
            :autosize="{ minRows: 4, maxRows: 4}"
            class="input_class"
            style="width: 360px;">
          </el-input>

        </p>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="edit_comment" size="mini">确 定</el-button>
      </span>
    </el-dialog>
    
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
          brandId:'',
          shopId:'',
          teamId:'',
          levelId:'',
          pageSize:250,
          pageNum:1,
          total:10
        },
        table_height:300,
        tableData:[],
        dialogVisible:false,
        comment:'',
        id:''


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
      }

    },
    mounted(){ 
      this.$nextTick(()=>{
        this.table_height = this.$refs.table_warp.offsetHeight - 40
      })


      this.get_abnormal()





      
      
    },
    methods:{

      handleSizeChange(val) {
          this.search.pageSize = val
          this.search.currentPage = 1
          this.get_abnormal()
         
        },


      handleCurrentChange(val) {
          this.search.pageNum = val
          this.get_abnormal()
         
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
      get_abnormal(){
        this.$http.post(`compose/get_abnormal`,{
            startTime: this.search.start?this.search.start.getTime().toString().substr(0,10):'',
            endTime: this.search.end?this.search.end.getTime().toString().substr(0,10):'',
            pageNum: this.search.pageNum,
            pageSize: this.search.pageSize,

        })
        .then((data)=>{
          if(data.code == '200'){

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
      editshow(row){
        this.comment = row.comment
        this.id = row.id
        this.dialogVisible = true
        console.info(row)
      },

      edit_comment(){

        this.$http.get(`compose/edit_comment?id=${this.id}&comment=${this.comment}`)
        .then((data)=>{
          if(data.code == '200'){

            this.dialogVisible = false
            this.get_abnormal()

            this.$message({
                message:'编辑成功',
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


    },
  }
</script>
<style lang="less">
  .input_input {
            padding-left: 20px;
            margin: 16px 0;
            position:relative;
            .input_class {
                display: inline-block;
                width: 270px;
                font-size: 12px;
            }

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

        .icon_class{
          font-size: 20px;
          position: relative;
          top: 0px;

          //margin-left: 20px;
          cursor: pointer;

          &:hover{
            color: rgba(0, 153, 255, 1)
          }

        }



        .pagination {
            position: absolute;
            bottom: 0px;
            right: 20px;
          }



      }
  }
}
  
</style>
