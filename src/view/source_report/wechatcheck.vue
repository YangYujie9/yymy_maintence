<template>
  <div style="margin-left: 20px;margin-right: 20px;" class="three">
    <div ref="cangchu" class="cangchu">
    	<div v-show="!hide_flag" ref="cangchu_top" class="cangchu-top">
    		<p class="search-p">
                <span >入库时间：</span>
                <el-date-picker
		            size="mini"
		            v-model="search.startTime"
		            type="date"
                class="input-class"
		            placeholder="起始日期">
		          </el-date-picker>-
		          <el-date-picker
		            size="mini"
		            v-model="search.endTime"
		            type="date"
                class="input-class"
		            placeholder="终止日期">
		        </el-date-picker>
            </p>
            <p class="search-p">
                <span >供应商负责人：</span>
                <el-input size="mini" class="input-class" v-model="search.supplierLeader" placeholder="请输入供应商负责人"></el-input>
            </p>
            <p class="search-p">
                <span >核销时间：</span>
                <el-date-picker
	              size="mini"
	              v-model="search.paymentTime"
	              class="input-class" 
	              type="date"
	              placeholder="核销时间">
	            </el-date-picker>
            </p>
            <p class="search-p">
                <span >款号：</span>
                <el-input size="mini" class="input-class" v-model="search.styleNumber" placeholder="请输入款号"></el-input>
            </p>
            <p class="search-p">
                <span >编号：</span>
                <el-input size="mini" class="input-class" v-model="search.id" placeholder="请输入编号"></el-input>
            </p>
            <p class="search-p">
                <span >颜色：</span>
                <el-input size="mini" class="input-class" v-model="search.colour" placeholder="请输入颜色"></el-input>
            </p>
            <p class="search-p">
                <span >数据类型：</span>
                <el-select
	              size="mini"
	              v-model="search.dateType"
	              class="input-class"
	              multiple
	              collapse-tags
	              placeholder="请选择数据类型">
	              <el-option
	                v-for="item in get_datetype"
	                :key="item.dicCode"
	                :label="item.dicName"
	                :value="item.dicCode">
	              </el-option>
	            </el-select>
            </p>
            <p class="search-p">
                <span >规格型号：</span>
                <el-input size="mini" class="input-class" v-model="search.model" placeholder="请输入规格型号"></el-input>
            </p>
            <p class="search-p">
                <span >是否核销：</span>
	              <el-select clearable v-model="search.paymentType" class="input-class"  placeholder="请选择核销类型" size="mini">
	              <el-option
	                v-for="item in debtoptions"
	                :key="item.value"
	                :label="item.label"
	                :value="item.value">
	              </el-option>
            </el-select>
            </p>
            <p class="search-p">
                <span >核销备注：</span>
                <el-input size="mini" class="input-class" v-model="search.paymentRemark" placeholder="请输入核销备注"></el-input>
            </p>

            <p class="search-p">
                <span >导入时间：</span>
                <el-date-picker
	              size="mini"
	              v-model="search.importTime"
	              class="input-class" 
	              type="date"
	              placeholder="导入时间">
	            </el-date-picker>
            </p>

            

            <p style="position: relative;">
                <el-button @click="select_reports" size="mini" style="margin-bottom: 20px" class="monbtn">搜索</el-button>

              <el-button @click="clearsearch" size="mini" style="margin-left: 20px;margin-bottom: 20px" class="monbtn">重置</el-button>

              <el-button size="mini" @click="exportcus" style="margin-left: 20px;margin-bottom: 20px" class="monbtn">导出</el-button>

              <!--<el-button @click="updateFile" size="mini" style="margin-left: 20px;margin-bottom: 20px" type="primary">上传表单</el-button>-->

              <el-button v-if="isInArray(17)" :disabled="uploadflag" size="mini" style="margin-left: 20px;margin-bottom: 20px;position: relative;" class="monbtn">{{uploadflag?'上传中': '上传'}}

                <input v-if="isInArray(17)" style="left:0px" type="file" class="inpucus cursor" @change="tirggerFile($event)" />

              </el-button>

              <el-button v-show="!hide_flag" size="mini" class="monbtn" style="margin-bottom: 10px;margin-left: 20px" @click="change_hideflag">隐藏</el-button>
              
            </p>

    	</div>
      <div style="border-bottom: 1px solid #e2e2e2;">
        <p>         
          <el-button v-show="hide_flag" size="mini" class="monbtn" style="margin-bottom: 20px" @click="change_hideflag">展开</el-button>
        </p>
      </div>
    	<div :style="{height: table_height+'px'}" class="table-wrap">
    		<el-table
                :data="tableData"
                :height="table_height - 20"
                v-loading="loading"
                :header-cell-style='{"background": "#3f3f3f",
              "border-right": "1px solid #cecece",
              "border-bottom": "1px solid #cecece",
              "text-align": "center",
              "color": "#ffffff"}'
                @selection-change="handleSelectionChange"
                style="width: 100%">
                <el-table-column label="三方（微信团队、后道、仓储）确认后的准确出入库量">
                	<el-table-column
    				      type="selection"
    				      width="55"
                  align="center">

				          </el-table-column>
                	<el-table-column
                      prop="id"
                      label="编号"
                      width="70"
                      align="center"
                      >
                      
                    </el-table-column>
                	<el-table-column
                      prop="type"
                      label="数据类型"
                      align="center"
                      width="100"
                      >
                      <template slot-scope="scope">
                      	{{filtertype(scope.row.dateType)}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="type"
                      label="入库时间"
                      align="center"
                      width="100"
                      >
                      <template slot-scope="scope">
                           {{scope.row.putTime ? fmtDate(scope.row.putTime) : ''}}
                      </template>
                      
                      
                    </el-table-column>
                    <el-table-column
                      prop="styleNumber"
                      label="款号"
                      width="160"
                      align="center"
                      >
                      
                    </el-table-column>
                    <el-table-column
                      prop="colour"
                      label="颜色"
                      width="70"
                      align="center"
                      >
                      
                    </el-table-column>
                    <el-table-column
                      prop="supplierLeader"
                      label="供应商负责人"
                      align="center"
                      >
                      
                    </el-table-column>
                    <el-table-column
	                    prop="unit"
	                    label="单位"
                        width="70"
                        align="center"
                        >

                    </el-table-column>
                    <el-table-column
	                    prop="model"
	                    label="型号"
                        width="70"
                        align="center"
                        >

                    </el-table-column>
                    <el-table-column
	                    prop="putCount"
	                    label="合计入库数"
                        width="90"
                        align="center"
                        >

                    </el-table-column>
	                <el-table-column
	                      prop="supply"
	                      label="备注"
                        align="center"
                        width="120"
	                      >
	                      <template slot-scope="scope">
                           {{scope.row.remark != "null" ? scope.row.remark : ''}}
                      	</template>
	                </el-table-column>
	                <el-table-column
	                      prop="importTime"
	                      label="导入日期"
                        align="center"
                        width="100"
	                      >
	                  <template slot-scope="scope">
                           {{scope.row.importTime ? fmtDate(scope.row.importTime) : ''}}
                      </template>
	                      
	                </el-table-column>

                </el-table-column>
                <el-table-column label="微信部门">
                    <el-table-column
	                      prop="scrapType"
	                      width="90"
	                      label="  是否报废（仅针对大货样出库）"
                        align="center"
	                      >

	                      
	                </el-table-column>
	                <el-table-column
	                      prop="scrapReason"

	                      label="报废原因（仅针对大货样出库）"
                        align="center"
	                      >
	                    <template slot-scope="scope">
                           {{scope.row.scrapReason != "null" ? scope.row.scrapReason : ''}}
                      	</template>
	                      
	                </el-table-column>
                </el-table-column>
                <el-table-column label="财务部">
                    <el-table-column
	                      prop="paymentType"
	                      label="是否核销"
	                      width="80"
                        align="center"
	                      >

	                      
	                </el-table-column>
	                <el-table-column
	                      prop="paymentRemark"
	                      label="核销备注"
                        align="center"
                        width="100"
	                      >
	                  <template slot-scope="scope">
                           {{scope.row.paymentRemark ? scope.row.paymentRemark : ''}}
                      </template>
	                </el-table-column>
	                <el-table-column
	                      prop="paymentTime"
	                      label="核销时间"
                        align="center"
                        width="100"
	                      >
	                  <template slot-scope="scope">
                           {{scope.row.paymentTime ? fmtDate(scope.row.paymentTime) : ''}}
                      </template>
	                      
	                </el-table-column>
                </el-table-column>
                <el-table-column label="确认">
                    <el-table-column
	                      prop="supply"
	                      label="修改"
	                      width="100"
                        align="center"
	                      >
	                    <template slot-scope="scope">
                      <el-button v-if="scope.row.id && isInArray(14)" style="margin-bottom: 10px;" @click="editdatacw(scope.row)" size="mini" plain  type="primary">
                        财务修改
                      </el-button>
                      <el-button v-if="scope.row.id && isInArray(17)" style="margin-bottom: 10px;"  @click="editdatayeuw(scope.row)" size="mini" plain  type="primary">
                        业务修改
                      </el-button>
                      <el-button v-if="scope.row.id && isInArray(44)" style="margin-bottom: 10px;" @click="editdatawechat(scope.row)" size="mini" plain  type="primary">
                        微信修改
                      </el-button>

                      <el-button v-if="scope.row.id && isInArray(17)" style="margin-bottom: 10px;" @click="deletedata(scope.row)" size="mini" plain  type="danger">
                        删除
                      </el-button>

                    </template>
                      
	                </el-table-column>
	                
                </el-table-column>
            </el-table>
            <div class="pagination" style="bottom: -24px;">
                  <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[250, 300, 350, 400, 450]"
                    :page-size="search.pageSize"
                    :current-page="search.pageNum"
                    :total="search.total"
                    layout="total,sizes, prev, pager, next"
                    >
                  </el-pagination>
            </div>

            <div v-if="isInArray(14)" class="pilaing" style="bottom: -24px;">
		      <el-button  size="mini" @click="piliangchange"  type="primary">财务批量修改</el-button>
		    </div>
    	</div>
    	
        
    </div>


    <el-dialog
      title="财务修改"
      :visible.sync="dialog.cwdialogVisible"
      width="500px"
      >
      <div class="wrap">
        <p>
          <span >是否核销：</span>
          <el-select clearable v-model="dialog.paymentType" placeholder="请选择" size="mini">
            <el-option
              v-for="item in debtoptionsdia"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          
        </p>
        <p style="margin-top: 20px;">
          <span >核销时间：</span>
          <el-date-picker
              size="mini"
              v-model="dialog.paymentTime"
              type="date"
              placeholder="付款时间日期">
            </el-date-picker>
          
        </p>
        <p style="margin-top: 20px;">
          <span style="position: relative;top: -20px;">核销备注：</span>
          <el-input type="textarea"
		  :rows="2"
		  placeholder="请输入内容" style="display: inline-block;width: 260px;font-size: 12px;" v-model="dialog.paymentRemark" ></el-input>
          
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialog.cwdialogVisible = false">取 消</el-button>
        <el-button size="mini"  type="primary" @click="cw_update">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="微信部修改"
      :visible.sync="dialog.wechatdialogVisible"
      width="500px"
      >
      <div class="wrap">
        
        <p style="margin-top: 20px;">
          <span >是否报废：</span>
          <el-select clearable v-model="dialog.scrapType" placeholder="请选择" size="mini">
            <el-option
              v-for="item in debtoptionsdia"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          
        </p>

        
        <p style="margin-top: 20px;">
          <span style="position: relative;top: -20px;">报废备注：</span>
          <el-input type="textarea"
			:rows="2"
			placeholder="请输入内容" style="display: inline-block;width: 260px;font-size: 12px;" v-model="dialog.scrapReason" ></el-input>
          
        </p>


      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialog.wechatdialogVisible = false">取 消</el-button>
        <el-button size="mini"  type="primary" @click="wechat_update">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="业务修改"
      :visible.sync="dialog.yewudialogVisible"
      width="630px"
      >
      <div class="wrap">
        <p style="margin-top: 0px;">
          <span >数&nbsp;&nbsp;据&nbsp;&nbsp;类&nbsp;&nbsp;型&nbsp;：</span>
          <el-select clearable v-model="dialog.dateType" placeholder="请选择" size="mini">
            <el-option
              v-for="item in get_datetype"
              :key="item.dicCode"
              :label="item.dicName"
              :value="item.dicCode">
            </el-option>
          </el-select>
          
        </p>
        <p style="margin-top: 20px;">
          <span >入&nbsp;&nbsp;库&nbsp;&nbsp;时&nbsp;&nbsp;间&nbsp;：</span>
          <el-date-picker
            size="mini"
            v-model="dialog.putTime"
            style="width: 170px;"
            type="date"
            placeholder="入库时间">
          </el-date-picker>
          
        </p>

        <p style="margin-top: 20px;">
          <span >款&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号&nbsp;：</span>
          <el-input size="mini"
          style="display: inline-block;width: 170px;font-size: 12px;" v-model="dialog.styleNumber" ></el-input>
        </p>


        <p style="margin-top: 20px;">
          <span >颜&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色&nbsp;：</span>
          <el-input size="mini"
          style="display: inline-block;width: 170px;font-size: 12px;" v-model="dialog.colour" ></el-input>
        </p>
        

        <p style="margin-top: 20px;">
          <span >供应商负责人：</span>
          <el-input size="mini"
          style="display: inline-block;width: 170px;font-size: 12px;" v-model="dialog.supplierLeader" ></el-input>
        </p>

        <p style="margin-top: 20px;">
          <span >单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位&nbsp;&nbsp;：</span>
          <el-input size="mini"
          style="display: inline-block;width: 170px;font-size: 12px;" v-model="dialog.unit" ></el-input>
        </p>

        <p style="margin-top: 20px;">
          <span >型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号&nbsp;&nbsp;：</span>
          <el-input size="mini"
          style="display: inline-block;width: 170px;font-size: 12px;" v-model="dialog.model" ></el-input>
        </p>

        <p style="margin-top: 20px;">
          <span >合&nbsp;计&nbsp;入&nbsp;库&nbsp;数：</span>
          <el-input size="mini"
          style="display: inline-block;width: 170px;font-size: 12px;" v-model="dialog.putCount" ></el-input>
        </p>

        
        <p style="margin-top: 20px;">
          <span style="position: relative;top: -20px;">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注&nbsp;&nbsp;：</span>
          <el-input type="textarea"
		   :rows="2"
		   placeholder="请输入内容" style="display: inline-block;width: 260px;font-size: 12px;" v-model="dialog.remark">
		  </el-input>
        </p>
        
        
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialog.yewudialogVisible = false">取 消</el-button>
        <el-button size="mini"  type="primary" @click="yw_update">确 定</el-button>
      </span>
    </el-dialog>
  
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: "index",
    components: {
    },
    data(){
        return{
        	
          loading: false,
        	table_height: 300,
          uploadflag: false,
          hide_flag:false,
        	search: {
        		//timestart: new Date(new Date(new Date().toLocaleDateString()).getTime()),
	          startTime: new Date([new Date().getFullYear(),new Date().getMonth()+1,1].join('-')),
	          endTime: new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1),
	          styleNumber: '',
	          pageSize: 250,
	          total: 10,
	          pageNum: 1,
	          dateType: '',
	          paymentType: '',
	          paymentRemark: '',
	          supplierLeader: '',
	          paymentTime:'',
	          colour: '',
	          importTime: '',
	          model:'',
	          id: ''
        	},
	        debtoptions: [{
	          value:true,
	          label: '是'
	        },{
	          value: false,
	          label: '空'
	        }],
	        searchdata: [
        	],
          orderdialog: {
            dialogVisible:false,
            orderId: '',
            id: '',
          },
        	dialog: {
	          cwdialogVisible:false,
	          yewudialogVisible:false,
	          wechatdialogVisible:false,
	          colour: '',
	          dateType: '',
	          id:'',
	          importTime: '',
	          model: '',
	          paymentRemark: '',
	          paymentTime: '',
	          paymentType: '',
	          putCount: '',
	          putTime: '',
	          remark: '',
	          scrapReason: '',
              scrapType: '',
	          styleNumber: '',
	          supplierLeader: '',
	          unit:''
	        },
	        debtoptionsdia: [{
	          value: '是',
	          label: '是'
	        },{
	          value: '',
	          label: ''
	        }],
        	isresult: [ 
                {
                    label: '是',
                    value: true, 
                },
                {
                    label: '否',
                    value: false, 
                },
            ],
        	secondstep: {
        		dialogVisible: false,
        		id: '',
        		isResults: '',
        		importWare: '',
        		returnFactory: '',
        		memo: '',
        		confirmer: '',
        	},
        	tableData: [],
        	ids: [],
        	uploadloading: false
        }
    },
    computed: {
        ...mapGetters([
            'getpageDict',
            'userInfo',
            'getpowers'
        ]),
        get_datetype() {
            let date_type = this.getpageDict.filter((list) => {
                return list.dicType == "date_type"
            })

            //console.info(date_type[0])

            if (date_type[0]) {
                return date_type[0].dicList
            } else {
                return []
            }

            
        },
    },
    created() {
       
    },
    mounted(){
      	this.$nextTick(()=>{
            this.table_height = this.$refs.cangchu.offsetHeight - this.$refs.cangchu_top.offsetHeight -30
        })

        this.select_reports()
    },
    methods:{

      orderdialogok() {

        let that = this
        this.$maintancehttp.post(`reports/incoming_report_edit_order_id`, {
            id: this.orderdialog.id,
            orderId: this.orderdialog.orderId,
          })
          .then(function (data) {
              if (data.code == '200'){
                that.$message({
                  message: '修改成功',
                  type: 'success'
                });
              }else {
                that.$message({
                  message: data.msg,
                  type: 'success'
                });
              }

              that.orderdialog.dialogVisible = false

              that.select_reports()



              
            })
            .catch(function (error) {
              console.log(error);
              that.$message({
                  message: '接口报错',
                  type: 'error'
                });
            });
      },
      changeorder(list) {
        
        this.orderdialog.orderId = list.orderId
        this.orderdialog.id = list.id
        this.orderdialog.dialogVisible = true
      },
      group(list) {
        let flag = false
        if (list.groupId) {
          if (this.userInfo.groupId.length>list.groupId.length || this.userInfo.groupId.length==list.groupId.length) {
            let str = this.userInfo.groupId.slice(0,list.groupId.length) 
              if (str == list.groupId) {
                flag = true
              }
            
          }
          
        }


        return flag
      },
    	isInArray(value){
            for(var i = 0; i < this.getpowers.length; i++){
                if(value == this.getpowers[i]){

                    return true;
                }
            }
            return false;
        },
        //文件上传
        tirggerFile : function (event) {
          let that = this


            if (this.uploadflag) {
                return this.$message({
                  message: "正在上传中",
                  type: 'error'
                })
            }
            this.uploadflag = true
            var file = event.target.files[0]

            let formData = new FormData();
            formData.append('file', file);

            this.$maintancehttp({
                url:  'square/import_square_report',
                method: 'POST',
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            }).then((res) => {
                that.uploadflag = false
                event.target.value=""
                if (res.code == '200') {


                    that.$message({
                      message: res.msg,
                      type: 'success'
                    })
                } else {
                    that.$message({
                      message: res.msg,
                      type: 'error'
                    })
                }

                that.select_reports()

            })
            .catch(() => {
	            that.$message({
	              type: 'info',
	              message: '已取消删除'
	            });   
	        })       


      },
    	piliangchange () {
          

          if (this.ids.length == 0) {
              return this.$message({
                message: '请选择你要修改的数据',
                type: 'error'
              });
          }

          this.dialog.paymentType = ""
          this.dialog.paymentTime = ""
          this.dialog.paymentRemark = ""


          this.dialog.id = this.ids.join(',')


          this.dialog.cwdialogVisible = true


        },
        handleSelectionChange(val) {

          this.ids = []


          for (let i=0; i<val.length; i++) {
            this.ids.push(val[i].id)
            
          }
    	},
    	editdatacw(list) {
          this.dialog.paymentType = list.paymentType?list.paymentType:''
          this.dialog.paymentRemark = list.paymentRemark
          this.dialog.paymentTime = list.paymentTime ? new Date(list.paymentTime*1000) : ''
          this.dialog.id = list.id
          this.dialog.cwdialogVisible = true
        },
    	
    	editdatawechat(list) {
          
          this.dialog.scrapType = list.scrapType
          this.dialog.scrapReason = list.scrapReason
          this.dialog.id = list.id
          this.dialog.wechatdialogVisible = true
        },
        editdatayeuw(list) {
          this.dialog.colour = list.colour
          this.dialog.dateType = list.dateType
          this.dialog.putTime = list.putTime ? new Date(list.putTime*1000) : ''
          this.dialog.id = list.id
          this.dialog.yewudialogVisible = true
          this.dialog.model = list.model
          this.dialog.putCount = list.putCount
          this.dialog.styleNumber = list.styleNumber
          this.dialog.remark = list.remark
          this.dialog.supplierLeader = list.supplierLeader
          this.dialog.unit = list.unit
        },
      

        deletedata(list) {
          let that = this

          this.$confirm('此操作将永久删除此数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            /*this.$message({
              type: 'success',
              message: '删除成功!'
            });*/


            this.$maintancehttp.post(`square/del_square_by_id`,{
              id: list.id,
              remark: list.remark
            })
              .then(function (data) {
                if (data.code == '200'){
                  that.$message({
                    message: '删除成功',
                    type: 'success'
                  });
                }


                that.select_reports()



                
              })
              .catch(function (error) {
                console.log(error);
                that.$message({
                    message: '接口报错',
                    type: 'error'
                  });
              });
          }).catch(() => {
            that.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });


          
        },
        yw_update() {
          let that = this

          this.$maintancehttp.post(`square/edit_square`, {
            id: this.dialog.id,
            dateType: this.dialog.dateType,
            colour: this.dialog.colour,
            putTime: this.dialog.putTime?this.dialog.putTime.getTime().toString().substr(0, 10):'',
            styleNumber: this.dialog.styleNumber,
            remark: this.dialog.remark,
            supplierLeader: this.dialog.supplierLeader,
            unit: this.dialog.unit,
            model: this.dialog.model,
            putCount: this.dialog.putCount,
          })
            .then(function (data) {
              if (data.code =='200'){
                that.$message({
                  message: '修改成功',
                  type: 'success'
                });
              }

              that.dialog.yewudialogVisible = false

              that.select_reports()



              
            })
            .catch(function (error) {
              console.log(error);
              that.$message({
                  message: '接口报错',
                  type: 'error'
                });
            });

          
        },
    	wechat_update() {
    		let that = this
	        this.$maintancehttp.get(`square/wx_group_write?id=${this.dialog.id}&scrapType=${this.dialog.scrapType}&scrapReason=${this.dialog.scrapReason?this.dialog.scrapReason:''}`)
                .then((data)=>{
                    if (data.code == 200) {
                        this.$message({
                            message: data.msg,
                            type: 'success'
                          })

                        this.dialog.wechatdialogVisible = false

                    } else {
                        this.$message({
                            message: data.msg,
                            type: 'error'
                          });
                    }

                    this.select_reports()


                    

                })
                .catch(function (error) {
                    console.log(error);
                    that.$message({
                        message: '接口报错',
                        type: 'error'
                      })
                })
            
    	},
    	cw_update() {
    		let that = this


          if (!this.dialog.paymentType) {
            return that.$message({
                  message: '选择是否核销',
                  type: 'error'
                });
          }

          if (!this.dialog.paymentTime) {
            return that.$message({
                  message: '核销时间需填',
                  type: 'error'
                });
          }


          if (this.dialog.paymentRemark&&this.dialog.paymentRemark.length>250) {
            return this.$message({
              message: '备注不能超过250个字哦',
              type: 'warning'
            });
          }
	        this.$maintancehttp.get(`square/cw_group_write?ids=${this.dialog.id}&paymentType=${this.dialog.paymentType}&paymentTime=${this.dialog.paymentTime?this.dialog.paymentTime.getTime().toString().substr(0, 10):''}&paymentRemark=${this.dialog.paymentRemark?this.dialog.paymentRemark:''}`)
                .then((data)=>{
                    if (data.code == 200) {
                        this.$message({
                            message: data.msg,
                            type: 'success'
                          })

                        this.dialog.cwdialogVisible = false

                    } else {
                        this.$message({
                            message: data.msg,
                            type: 'error'
                          });
                    }

                    this.select_reports()


                    

                })
                .catch(function (error) {
                    console.log(error);
                    that.$message({
                        message: '接口报错',
                        type: 'error'
                      })
                })
            
    	},

    	filtertype(id) {
          let date_type = this.get_datetype.filter((list) => {
              return list.dicCode == id
          })


          if (date_type[0]) {
              return date_type[0].dicName
          } else {
              return id
          }
      },
    	handleSizeChange(val) {
          this.search.pageSize = val
          this.search.pageNum = 1
          this.select_reports()
        },
        handleCurrentChange(val) {
          this.search.pageNum = val
          this.select_reports()
        },
        fmtDate(obj){
            var date =  new Date(obj*1000);

            var y = 1900+date.getYear();
            var m = "0"+(date.getMonth()+1);
            var d = "0"+date.getDate();
            return y+"/"+m.substring(m.length-2,m.length)+"/"+d.substring(d.length-2,d.length);
        },
    	clearsearch() {
    	  this.search.pageNum = 1
          this.search.pageSize = 250
          this.search.startTime = new Date([new Date().getFullYear(),new Date().getMonth()+1,1].join('-'))
          this.search.endTime = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1)
          this.search.styleNumber = ''
          this.search.id = ''
          this.search.colour = ''
          this.search.supplierLeader = ''
          this.search.dateType = ''
          this.search.paymentType = ''
          this.search.paymentRemark = ''
          this.search.paymentTime = ''
          this.search.importTime = ''
          this.search.model = ''
          this.select_reports()
    	},
      	select_reports() {


            let that = this
            this.loading = true
            this.$maintancehttp.post(`square/show_square_report`,{ 
                pageNum: this.search.pageNum,
	            pageSize: this.search.pageSize,
	            styleNumber: this.search.styleNumber,
	            startTime: this.search.startTime ? this.search.startTime.getTime().toString().substr(0, 10): '',
	            endTime: this.search.endTime ? (new Date(new Date(this.search.endTime).getFullYear(),new Date(this.search.endTime).getMonth(),new Date(this.search.endTime).getDate(),'23','59','59')).getTime().toString().substr(0, 10):'',
	            dateType: this.search.dateType.length>0 ? this.search.dateType.join(','): '',
	            paymentType: this.search.paymentType,
	            supplierLeader: this.search.supplierLeader,
	            colour: this.search.colour,
	            model: this.search.model,
	            paymentRemark: this.search.paymentRemark,
	            paymentTime: this.search.paymentTime ? this.search.paymentTime.getTime().toString().substr(0, 10): '',
	            importTime: this.search.importTime ? this.search.importTime.getTime().toString().substr(0, 10): '',
	            id: this.search.id

            })

               .then((data)=>{
                //console.info(data)
                   this.tableData = data.data.list
                   this.search.total = data.data.total
                   this.loading = false
                

                })
                .catch(function (error) {
                    console.log(error);
                    that.$message({
                        message: '接口报错',
                        type: 'error'
                      });
                }) 
        },

        exportcus() {
        	let that = this

            this.$exporthttp.post(`square/export_find_square`,{
	            styleNumber: this.search.styleNumber,
	            startTime: this.search.startTime ? this.search.startTime.getTime().toString().substr(0, 10): '',
	            endTime: this.search.endTime ? (new Date(new Date(this.search.endTime).getFullYear(),new Date(this.search.endTime).getMonth(),new Date(this.search.endTime).getDate(),'23','59','59')).getTime().toString().substr(0, 10):'',
	            dateType: this.search.dateType.length>0 ? this.search.dateType.join(','): '',
	            id: this.search.id,
	            colour: this.search.colour,
	            supplierLeader: this.search.supplierLeader,
	            paymentType: this.search.paymentType,
	            paymentRemark: this.search.paymentRemark,
	            model: this.search.model,
	            paymentTime: this.search.paymentTime ? this.search.paymentTime.getTime().toString().substr(0, 10): '',
	            importTime: this.search.importTime ? this.search.importTime.getTime().toString().substr(0, 10): '',

          },{
            
            responseType: 'arraybuffer'
          })

            .then(function (res) {


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
              console.log(error);
              that.loading2 = false
              that.$message({
                  message: '接口报错',
                  type: 'error'
                });
            });
        },
        change_hideflag(){
          this.hide_flag=!this.hide_flag
          this.$nextTick(()=>{
            this.table_height = this.$refs.cangchu.offsetHeight - this.$refs.cangchu_top.offsetHeight -40
        })
          //this.table_height=this.hide_flag==false?this.table_height=554:this.table_height=718
        },

    },
}
</script>

<style>
</style>
<style spoced lang="less">
.firststopwrap {
    span {
        font-size: 12px;
    }
}

.inpucus {
    opacity: 0;
    background: red;
    width: 60px;
    height: 26px;
    z-index: 10;
    position: absolute;
    left: 240px;
    top: 0px;

    &.iupzinde {
        z-index: 1;
    }
}
.cangchu {
    height: calc(100vh - 160px); 

    &-top {
        //border-bottom: 1px solid #e2e2e2;
        margin-top: 20px;
        padding-left: 10px;

        .monbtn{
          position: relative;
          background-color: rgb(140, 206, 173);
          color: #fff; 
        }


        .search-p {
            display: inline-block;
            margin-bottom: 20px;
            margin-right: 20px;
            font-size: 13px;

            .input-class {
                display: inline-block;
                width: 180px;

            }
        }
    }

    .table-wrap {
        margin-top: 10px;
        position: relative;

        .pagination {
            position: absolute;
            bottom: 0px;
            right: 20px;
          }

        .pilaing {
		    position: absolute;
		    bottom: 0px;
		    left: 20px;
		  }

    }
}

.wrap{
	padding:20px;
}
  
</style>