<template>
  <div class="file_pro">
  	<div class="file_pro-top">
      <div class="leftsearch"> 
      <el-select v-model="brandId" clearable placeholder="请选择品牌" size="medium" style="width: 180px;margin-right: 20px;">
        <el-option v-for="item in getbrand"
         :key="item.dicCode"
         :label="item.dicName"
         :value="item.dicCode">
        </el-option>
      </el-select>     
       <el-input size="medium"  style="display: inline-block;width: 180px;"  placeholder="请输入店铺名称或编码" v-model="shopInfo" class="input-with-select">
          
       </el-input>
      <el-button size="medium" @click="shop_show" style="margin-left: 10px;" class="btn_style">搜索</el-button>
      <el-button  style="margin-left: 50px; " type="primary" size="medium" v-if="$isInArray(61)" @click="edittaokeshow">淘客管理</el-button>  
    </div>
      
  		<div class="rightadd">

  			<el-button size="medium" @click="addshop.dialogVisible = true"  class="btn_style" v-if="$isInArray(50)">新增</el-button>

  		</div>
  	</div>
  	<div  ref="tablewrap" class="file_pro-wrap">
      <div class="left_div">
    		<el-table
  	    :data="tableData"
  	    :height="tableheight"
        :header-cell-style='{"background": "#3f3f3f",
            "border-right": "1px solid #cecece",
            "color": "#ffffff"}'
        highlight-current-row
        @current-change="handleCurrentChange"
  	    style="width: 100%;border-left: 1px solid #c9c9c9;border-right:  1px solid #c9c9c9">
          <el-table-column
            prop="index"
            label="序号"
            width="50"
            type="index"
            align="center">
          </el-table-column>
    	    <el-table-column
    	      prop="shopName"
    	      label="店铺名称"
    	      width="200"
            align="center">
    	    </el-table-column>
    	    <el-table-column
    	      prop="shopNum"
    	      label="店铺编码"
    	      width="100"
            align="center">
            
    	    </el-table-column>
    	    <el-table-column
    	      prop="brandId"
    	      label="品牌"
          
            align="center">

            <template slot-scope="scope">
              {{getbrandstatus(scope.row.brandId)}}
                    
            </template>
    	    </el-table-column>
           <el-table-column
            prop="shopNum"
            label="平台"
           
            align="center">
            <template slot-scope="scope">
              {{getshop_type(scope.row.shopType)}}
                    
            </template>
            
          </el-table-column>
          <el-table-column
            prop="groupId"
            label="负责部门"
            width="180"
            align="center">
            <template slot-scope="scope">
              {{get_groupname(scope.row.groupId)}}
            </template>
            
          </el-table-column>
          <el-table-column
            prop="staffName"
            label="修改人"
            width="120"
            align="center">
            
          </el-table-column>
          <el-table-column
            prop="staffName"
            label="修改时间"
            width="120"
            align="center">
            <template slot-scope="scope">
              {{scope.row.editTime?fmtDate(scope.row.editTime):''}}
            </template>
            
          </el-table-column>

          <el-table-column
            prop="staffName"
            label="孵化组"
            width="120"
            align="center">
            <template slot-scope="scope">
              <el-switch
               v-model="scope.row.incubate"
               :active-value="true"
               :inactive-value="false"
               @change="update_is_incubate(scope.row)">
              </el-switch>
            </template>
            
          </el-table-column>

          <el-table-column
            prop="staffName"
            label="店铺关闭(运营)"
            width="120"
            align="center">
            <template slot-scope="scope">
              <el-switch
               v-model="scope.row.sellStatus"
               :active-value="true"
               :inactive-value="false"
               @change="update_sell_status(scope.row)">
              </el-switch>
            </template>
            
          </el-table-column>

          <el-table-column
            prop="staffName"
            label="店铺关闭(客服)"
            width="120"
            align="center">
            <template slot-scope="scope">
              <el-switch
               v-model="scope.row.status"
               :active-value="1"
               :inactive-value="2"
               @change="edit_shop_status(scope.row)">
              </el-switch>
            </template>
            
          </el-table-column>

          <el-table-column
            prop="shopNum"
            label="操作"
            width="150"
            align="center">
            <template slot-scope="scope">
              
              <!-- <el-divider direction="vertical"></el-divider> -->
              <i class="iconfont iconbianji icon_class" @click="editshopshow(scope.row)"></i>
                    
            </template>
            
          </el-table-column>
          <el-table-column
            prop="taoke"
            label="淘客"
            width="120"
            align="center"
            v-if="$isInArray(61)"
            >
            <template slot-scope="scope">
              
              <!-- <el-divider direction="vertical"></el-divider> -->
              
              <el-button style="margin-bottom: 5px; " type="primary" size="mini" @click="addtaokeshow(scope.row)" >一键加淘</el-button>
                    
            </template>
            
          </el-table-column>

  	    </el-table>
      </div>
      

      <div class="right_div">
        <div class="right_top">

          <p class="top_style">{{current_shop}}-旺旺账号-白</p>
          <div class="content">
            <table>
              <tr v-for="(list,index) in wangwangDaylist">
                <td style="width: 50px;text-align: center;">{{index+1}}</td>
                <td style="width: 50%;"> {{list.shopWw}}</td>
                <td style="text-align: center;">
                  <el-switch
                     v-model="list.wwStatus"
                     :active-value="1"
                     :inactive-value="2"
                     @change="changestatus(list)">
                    </el-switch>
                    <el-divider direction="vertical"></el-divider>
                    <i class="el-icon-delete icon_delete pointer" @click="delete_wangwang(list)"></i>
                </td>
              </tr>
            </table>
            
          </div>
          <el-button size="mini"  class="btn_style" style="margin-left: 20px;margin-top: 5px;" @click="wangwangshow(1)" v-if="$isInArray(51)">添加账号</el-button>
        </div>
<!--           <el-table
            :data="wangwangDaylist"
            height="250"

            style="width: 100%;border-left: 1px solid #c9c9c9;border-right:  1px solid #c9c9c9">
              <el-table-column
               type="index">
                
              </el-table-column>
              <el-table-column
               prop="wangwang"
               label="旺旺账号">
              </el-table-column>
              <el-table-column
                prop="shopNum"
                label="操作"
                width="160"
                align="center">
                <template slot-scope="scope">
                  <el-switch
                   v-model="scope.row.status"
                   :active-value="1"
                   :inactive-value="2"
                   @change="delete_day(scope.row)">
                  </el-switch>
                  <el-divider direction="vertical"></el-divider>
                  <i class="el-icon-delete icon_delete" @click="editshopshow(scope.row)"></i>
                        
                </template>
            
              </el-table-column>
          </el-table>  -->

        <div class="right_top right_bottom">
          <p class="top_style">{{current_shop}}-旺旺账号-晚</p>
          <div class="content">
            <table>
              <tr v-for="(list,index) in wangwangNightlist">
                <td style="width: 50px;text-align: center;">{{index+1}}</td>
                <td style="width: 50%;"> {{list.shopWw}}</td>
                <td style="text-align: center;">
                  <el-switch
                     v-model="list.wwStatus"
                     :active-value="1"
                     :inactive-value="2"
                     @change="changestatus(list)">
                    </el-switch>
                    <el-divider direction="vertical"></el-divider>
                    <i class="el-icon-delete icon_delete pointer" @click="delete_wangwang(list)"></i>
                </td>
              </tr>
            </table>
            
          </div>
          <el-button size="mini"  class="btn_style" style="margin-left: 20px;margin-top: 5px;" @click="wangwangshow(2)" v-if="$isInArray(51)">添加账号</el-button>
        </div>
      </div>
  	</div>
    <el-dialog
      title="添加账号"
      :visible.sync="addwangwang.dialogVisible"
      width="500px"
      >
      <div class="wrap">
        
        <p class="input-p">
          <span>旺旺账号：</span>
          <el-input placeholder="请输入旺旺账号"  class="input-input"
             v-model="addwangwang.shopWw" ></el-input>
          
        </p>



      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="addwangwang.dialogVisible = false">取 消</el-button>
        <el-button size="mini" @click="addwangwangok" type="primary" >确 定</el-button>
      </span>
    </el-dialog>


  	<el-dialog
      title="新增店铺"
      :visible.sync="addshop.dialogVisible"
      width="500px"
      >
      <div class="wrap">
        
        <p class="input-p">
          <span >店铺名称：</span>
          <el-input placeholder="请输入店铺名称"  class="input-input"
             v-model="addshop.shopName" ></el-input>
          
        </p>

        <p class="input-p">
          <span >店铺编码：</span>
          <el-input placeholder="请输入店铺编码"  class="input-input"
             v-model="addshop.shopNum" ></el-input>
          
        </p>
        <p class="input-p">
          <span >品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;牌：</span>
          

          <el-select class="input-input" v-model="addshop.brandId" placeholder="请选择品牌">
            <el-option
              v-for="item in getbrand"
              :key="item.dicCode"
              :label="item.dicName"
              :value="item.dicCode">
            </el-option>
          </el-select>
          
        </p>
        <p class="input-p">
          <span >平&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;台：</span>
          

          <el-select class="input-input" v-model="addshop.shopType" placeholder="请选择平台">
            <el-option
              v-for="item in getshoptype"
              :key="item.dicCode"
              :label="item.dicName"
              :value="item.dicCode">
            </el-option>
          </el-select>
          
        </p>

        <p class="input-p">
          <span >负责部门：</span>
          <el-cascader
            :options="groupList"
            :props="groupprops"
            v-model="addshop.groupId"
            clearable
            class="input-input">
          </el-cascader>
          
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="addshop.dialogVisible = false">取 消</el-button>
        <el-button size="mini" @click="addshopok" type="primary" >确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="编辑店铺"
      :visible.sync="editshop.dialogVisible"
      width="500px"
      >
      <div class="wrap">
        
        <p class="input-p">
          <span >店铺名称：</span>
          <el-input placeholder="请输入店铺名称"  class="input-input"
             v-model="editshop.shopName" ></el-input>
          
        </p>

        <p class="input-p">
          <span >店铺编码：</span>
          <el-input placeholder="请输入店铺编码"  class="input-input"
             v-model="editshop.shopNum" ></el-input>
          
        </p>
        <p class="input-p">
          <span >品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;牌：</span>
          

          <el-select class="input-input" v-model="editshop.brandId" placeholder="请选择品牌">
            <el-option
              v-for="item in getbrand"
              :key="item.dicCode"
              :label="item.dicName"
              :value="item.dicCode">
            </el-option>
          </el-select>
          
        </p>
        <p class="input-p">
          <span >平&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;台：</span>
          

          <el-select class="input-input" v-model="editshop.shopType" placeholder="请选择平台">
            <el-option
              v-for="item in getshoptype"
              :key="item.dicCode"
              :label="item.dicName"
              :value="item.dicCode">
            </el-option>
          </el-select>
          
        </p>

        <p class="input-p">
          <span >负责部门：</span>
         
          <el-cascader
            :options="groupList"
            :props="groupprops"
            v-model="editshop.groupId"
            clearable
            class="input-input">
          </el-cascader>
          
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="editshop.dialogVisible = false">取 消</el-button>
        <el-button size="mini" @click="editshopok" type="primary" >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog 
        title="淘客管理" 
        :visible.sync="taoke_show.dialogVisible"
        width="1200px" height="800px">
            <el-dialog
              width="550px"
              title="新增淘客"
              :visible.sync="taoke_show_add.dialogVisible"
              append-to-body>
              <el-form :model="taoke_show_add">
                <!-- <el-form-item label="负责人名称：" :label-width="taoke_show_add.formLabelWidth">       
                  <el-input style="width: 300px" v-model="taoke_show_add.name" autocomplete="off"></el-input>
                </el-form-item> -->
                <el-form-item label="店铺名称：" :label-width="taoke_show_add.formLabelWidth">                
                  <el-input style="width: 300px" v-model="taoke_show_add.shopName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="店铺编码：" :label-width="taoke_show_add.formLabelWidth">                
                  <el-input style="width: 300px" v-model="taoke_show_add.shopNum" autocomplete="off"></el-input>
                </el-form-item>               
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="taoke_show_add.dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="add_taoke_data">确 定</el-button>
              </div>
            </el-dialog>
         <!-- <el-button type="primary" size="mini" style="position:absolute; left:350px;top:20px;" @click="get_taoke_data" >显示淘客数据</el-button> -->
         <el-button type="primary" size="mini" style="position:absolute; left:1000px;top:20px;" @click="add_taoke_dialog">新增淘客</el-button>
        <el-table height="600" :data="taoke_tableData">
          <el-table-column property="id" label="序号" width="150"></el-table-column>
          <el-table-column property="brandName" label="品牌" width="200"></el-table-column>
          <el-table-column property="shopName" label="店铺名称"></el-table-column>
          <el-table-column property="shopNum" label="店铺编码"></el-table-column>
          <el-table-column property="status" label="关闭<店铺>开启" >
            <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"

              :active-value="1"
              :inactive-value="0"
              @change="change_taoke_shop_status(scope.row)">
            </el-switch>               
              
            </template> 
          </el-table-column>
        </el-table>
    </el-dialog>



  </div>
</template>
<style>
  .el-select .el-input {
    
  }
  .input-with-select .el-input-group__prepend {
  	width: 130px;
    background-color: #fff;
  }
</style>
<script>
import { mapGetters } from 'vuex'
export default {
	data(){
      return{
        groupprops:{
            checkStrictly: true,
            value: 'groupId',
            label: 'groupName',
            children: 'groupVOList',
        },
      	addshop: {
      		dialogVisible: false,
      		shopName: '',
      		brandId: '',
      		shopNum: '',
          shopType:'',
          groupId:'',
      	},
        addwangwang:{
          dialogVisible: false,
          shopWw: '',
          shopClasses:'',
        },
        current_shop:'',
        current_shopId:'',
      	tableheight: 200,
        //淘客data
        taoke_show_add:{
          formLabelWidth:'120px',
          dialogVisible:false,
          name:'',
          shopName:'',
          shopNum:'',
         
        },
        taoke_show:{
          dialogVisible:false,
        },
        taoke_tableData: [],
        
        
        brandId: '',
        shopInfo:'',
        editshop: {
          id:'',
          dialogVisible: false,
          shopName: '',
          brandId: '',
          shopNum: '',
          shopType:'',
          groupId:'',
        },
        tableData:[],
        groupList:[],
        groupListname:[],
        wangwangDaylist:[],
        wangwangNightlist:[],
      }

    },
    mounted(){
      this.shop_show()
      this.get_group_list()
      this.$nextTick(()=>{

        	this.tableheight = this.$refs.tablewrap.offsetHeight - 10

        
    	})
    },
    computed: {
        ...mapGetters([
            'getpageDict',
        ]),
        getbrand() {
            let demand_status = this.getpageDict.filter((list) => {
                return list.dicType == "brand"
            })

            return demand_status[0].dicList
        },
        getshoptype(){
            let demand_status = this.getpageDict.filter((list) => {
                return list.dicType == "shop_type"
            })

            return demand_status[0].dicList
        }
    },
    methods: {
        fmtDate(obj){
            var date =  new Date(obj*1000);

            var y = 1900+date.getYear();
            var m = "0"+(date.getMonth()+1);
            var d = "0"+date.getDate();
            return y+"/"+m.substring(m.length-2,m.length)+"/"+d.substring(d.length-2,d.length);
        },
      getbrandstatus(type) {

        //console.info(this.getbrand)

        let name = ''
        for (let i=0;i<this.getbrand.length;i++) {
          if (this.getbrand[i].dicCode == type) {
            name = this.getbrand[i].dicName


            break
          }
        }

        return name
      },
      getshop_type(type) {

        //console.info(this.getbrand)

        let name = ''
        for (let i=0;i<this.getshoptype.length;i++) {
          if (this.getshoptype[i].dicCode == type) {
            name = this.getshoptype[i].dicName
            break
          }
        }

        return name
      },
      handleCurrentChange(row){
        if(row){
          this.current_shop = row.shopNum
          this.current_shopId = row.id
          this.get_shop_ww()
        }
      },

      get_shop_ww(){
        this.$http.get(`shop/get_shop_ww?shopId=${this.current_shopId}&shopClasses=1`)
        .then((data)=>{
          if(data.code == '200'){
            this.wangwangDaylist = data.data
          }
          else{
            this.$message({
              message:data.msg,
              type:'error'
            })
          }
        })
        .catch(()=>{
          this.$message({
            message:'接口报错',
            type:'error'
          })
        })

        this.$http.get(`shop/get_shop_ww?shopId=${this.current_shopId}&shopClasses=2`)
        .then((data)=>{
          if(data.code == '200'){
            this.wangwangNightlist = data.data
          }
          else{
            this.$message({
              message:data.msg,
              type:'error'
            })
          }
        })
        .catch(()=>{
          this.$message({
            message:'接口报错',
            type:'error'
          })
        })
      },

      wangwangshow(type){
        this.addwangwang.shopWw = ''
        this.addwangwang.dialogVisible = true
        this.addwangwang.shopClasses = type

      },
      addwangwangok(){
        if(!this.addwangwang.shopWw){
          this.$message({
            message:'请输入要添加的账号',
            type:'warning'
          })
        }


        this.$http.post(`shop/add_shop_ww`,{
          shopId: this.current_shopId,
          shopWw: this.addwangwang.shopWw,
          shopClasses: this.addwangwang.shopClasses,
        })
        .then((data)=>{
          if(data.code == '200'){
            this.addwangwang.dialogVisible = false
            this.get_shop_ww()
          }
        })
      },
    	shop_show() {
    		this.$http.post(`shop/shop_show`,{
          ss: this.shopInfo,
          brandId: this.brandId
        })
          .then((data)=>{
              this.tableData = data.data
              //console.info(data.data[0])
              if(data.data[0]){
                this.current_shop = data.data[0].shopNum
                this.current_shopId = data.data[0].id
                this.get_shop_ww()
              }

          })
          .catch(()=>{
              this.$message({
                message: '接口报错',
                type: 'error'
              })
          })
    	},
      editshopshow(list){
        if(this.$isInArray(49)){
          this.editshop.id = list.id
          this.editshop.shopName = list.shopName
          this.editshop.shopNum = list.shopNum
          this.editshop.brandId = list.brandId
          this.editshop.groupId = list.groupId
          this.editshop.shopType = list.shopType
          this.editshop.dialogVisible = true
        }
        else{
          return this.$message({
            message:'暂无修改权限',
            type:'warning'
          })
        }



      },
      //淘客模块方法
      edittaokeshow(){
        this.taoke_show.dialogVisible=true
        this.get_taoke_data()
      },
      addtaokeshow(row){
        console.info(row)
        this.$http.get(`shop/move_shop_to_tk?shopId=${row.id}`)
        .then((data)=>{
          if (data.code == 200) {
            this.$message({
                  message: data.msg,
                  type: 'success'
              });

          }
          
        })

      },
      change_taoke_shop_status(row){
        let status = row.status == 1 ? 'true': 'false'
        
        
        console.info(row)
        this.$http.get(`shop/delete_tk_shop?shopIds=${row.id}&status=${status}`)
        .then((data)=>{
          if (data.code == 200) {
            console.info(data)
            this.$message({
                  message: "店铺状态修改成功",
                  type: 'success'
              });
            this.get_taoke_data()

          }
          
        })
      },
      get_taoke_data(){
        this.$http.get(`shop/tk_shop_show`)
        .then((data)=>{
          //console.info(data)
          this.taoke_tableData=data.data
        })
      },
      add_taoke_dialog(){
        this.taoke_show_add.dialogVisible=true
        this.taoke_show_add.name=''
        this.taoke_show_add.shopName=''
        this.taoke_show_add.shopNum=''
      },
      add_taoke_data(){
        if(this.taoke_show_add.shopName==''){
          return this.$message({
                message: "淘客店铺名称不能为空，请重新设置",
                type: 'warning'
            });
        }
        if(this.taoke_show_add.shopNum==''){
          return this.$message({
                message: "淘客店铺编码不能为空，请重新设置",
                type: 'warning'
            });
        }
        this.$http.post(`shop/insert_shop_to_tk`,{
          name: this.taoke_show_add.name,
          shopName: this.taoke_show_add.shopName,
          shopNum:this.taoke_show_add.shopNum
        })
        .then((data)=>{
          if (data.code == 200) {
            this.$message({
                  message: data.msg,
                  type: 'success'
              });

              this.taoke_show_add.dialogVisible = false
          }
          this.get_taoke_data()   
        })

      },
      //淘客模块结束
      get_groupname(groupId){
        
        let id = groupId[groupId.length-1]

        for(let i=0;i<this.groupListname.length;i++){
          if(this.groupListname[i].groupId == groupId){
            return this.groupListname[i].groupName
          }


        }
      },

      edit_shop_status(list){

        if(!this.$isInArray(49)){
          this.shop_show()
          return this.$message({
            message:'暂无修改权限',
            type:'warning'
          })

        }

        this.$http.get(`shop/edit_shop_status?shopId=${list.id}&status=${list.status}`)
        .then((data)=>{
          if(data.code == '200'){
            this.shop_show()
            this.$message({
              message:'修改成功',
              type:'success'
            })

          }
          else{
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
      update_sell_status(list){



       

        this.$http.get(`shop/update_sell_status?shopId=${list.id}&sellStatus=${list.sellStatus}`)
        .then((data)=>{
          if(data.code == '200'){
            this.shop_show()
            this.$message({
              message:'修改成功',
              type:'success'
            })

          }
          else{
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
      update_is_incubate(list){
        this.$http.get(`shop/update_is_incubate?isIncubate=${list.incubate}&shopId=${list.id}`)
        .then((data)=>{
          if(data.code == '200'){
            this.shop_show()
            this.$message({
              message:'修改成功',
              type:'success'
            })

          }
          else{
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
      get_group_list(){
        this.$http.get(`group/get_customer_group_list`)
        .then((data)=>{
          if(data.code == '200'){
            this.groupList = data.data[0].groupVOList
            let list = []
          

            for(let i=0;i<data.data[0].groupVOList.length;i++){
              list.push({groupName:data.data[0].groupVOList[i].groupName, groupId:data.data[0].groupVOList[i].groupId})

              if(data.data[0].groupVOList[i].groupVOList && data.data[0].groupVOList[i].groupVOList.length>0){

                for(let j=0;j<data.data[0].groupVOList[i].groupVOList.length;j++){


                  this.diguidata(data.data[0].groupVOList[i].groupVOList[j],list)
                }
              }
            } 



            this.groupListname = list
          }

        })
        .catch(()=>{
          return this.$message({
              message:'接口报错',
              type:'error'
            })
        })
      },
      diguidata(groupVOList,list){

        list.push({groupName: groupVOList.groupName, groupId:groupVOList.groupId})


        //array.push(...groupVOList)
        if(groupVOList.groupVOList && groupVOList.groupVOList.length>0){
          //array[array.length-1].groupVOList = []
          for(let i=0;i<groupVOList.groupVOList.length;i++){
            this.diguidata(groupVOList.groupVOList[i],list)
          }
        }
        

      },
      editshopok(){
      

        if (!this.editshop.shopName) {
          return this.$message({
                    message: '请输入店铺名称',
                    type: 'warning'
               

                  })
        }

        if (!this.editshop.brandId) {
          return this.$message({
                    message: '请输入店铺品牌',
                    type: 'warning'
               
                  })
        }

        let groupId = ''


        if(typeof(this.editshop.groupId) == 'object'){
          groupId = this.editshop.groupId[this.editshop.groupId.length-1]
        }else{
          groupId = this.editshop.groupId
        }

        this.$http.post(`shop/edit_shop`,{
            id: this.editshop.id,
            shopNum: this.editshop.shopNum,
            shopName: this.editshop.shopName,
            brandId: this.editshop.brandId,
            shopType: this.editshop.shopType,
            groupId: groupId,
          })
          .then((data)=>{
            if(data.code == '200'){

                  this.editshop.dialogVisible = false
                  this.shop_show()
                  this.$message({
                    message: '编辑成功',
                    type: 'success'
                  })
            }

            else{
             return this.$message({
                message:data.msg,
                type:'error'
              })
            }
          })
          .catch((error)=>{
           return this.$message({
              message:'接口报错',
              type:'error'
            })

          })

      },
      changestatus(list){
        if(!this.$isInArray(51)){
          this.get_shop_ww()
          return this.$message({
            message:'暂无修改权限',
            type:'warning'
          })

        }


        this.$http.get(`shop/edit_ww_status?shopId=${list.shopId}&id=${list.id}&status=${list.wwStatus}`)
        .then((data)=>{
          if(data.code == '200'){
            this.$message({
              message:'修改成功',
              type:'success'
            })
            this.get_shop_ww()
          }else{
            this.$message({
              message:data.msg,
              type:'error'
            })
          }
        })
        .catch(()=>{
          this.$message({
            message:'接口报错',
            type:'error'
          })
        })
      },
      delete_wangwang(list){
        if(!this.$isInArray(51)){
          this.get_shop_ww()
          return this.$message({
            message:'暂无修改权限',
            type:'warning'
          })

        }

        
        this.$confirm('此操作将删除该旺旺账号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.$http.get(`shop/del_ww?shopId=${list.shopId}&id=${list.id}`)
          .then((data)=>{
            if(data.code == '200'){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.get_shop_ww()
            }
          })


        }).catch(() => {
         
        });


      },
  		addshopok() {
        if (!this.addshop.shopName) {
          return this.$message({
                    message: '请输入店铺名称',
                    type: 'warning'
               

                  })
        }

        if (!this.addshop.brandId) {
          return this.$message({
                    message: '请输入店铺品牌',
                    type: 'warning'
               
                  })
        }
        let groupid = this.addshop.groupId[this.addshop.groupId.length-1]
  			this.$http.post(`shop/add_shop`,{
                shopName: this.addshop.shopName,
                brandId: this.addshop.brandId,
                shopNum: this.addshop.shopNum,
                shopType: this.addshop.shopType,
                groupId: groupid,
            })
            .then((data)=>{
            	if (data.code == '200') {

                    this.$message({
	                  message: '新增成功',
	                  type: 'success'
	                })

	                this.addshop.shopName = ''
	                this.addshop.brandId = ''
	                this.addshop.shopNum = ''

                    this.addshop.dialogVisible = false
                }

                this.shop_show()
                
                
            })
            .catch(()=>{
                this.$message({
                  message: '接口报错',
                  type: 'error'
                })
            })
  		},

  	}
}
</script>

<style  lang="less">
  .input-p {
            padding-left: 20px;
            margin: 16px 0;
            .input-input {
                display: inline-block;
                width: 270px;
                font-size: 12px;
            }

        }
</style>

<style lang="less" scoped>

.file_pro {
	padding: 16px;
	padding-top: 0px;

  .btn_style{
    background-color: rgb(140, 206, 173);
    color: #fff; 
  }

	&-top {
		height: 60px;
		padding-bottom: 10px;
		border-bottom: 1px solid #c9c9c9;
		position: relative;
    .leftsearch{
      position:relative;
      height: 60px;
      top:10px;
    }

		.rightadd {
			position: absolute;
			right: 10px;
			height: 60px;
			top: 10px;
		}

	}

	&-wrap {
		margin-top: 10px;
		height: calc(100vh - 195px);
    display: flex;

    .left_div{
      width: 75%;
      


      .icon_class{
        font-size: 23px;
        position: relative;
        top: 3px;
        //margin-left: 20px;
        cursor: pointer;

        &:hover{
          color: rgba(0, 153, 255, 1)
        }

      }
    }

    .right_div{
      width: 24%;
      min-width: 300px;
      margin-left: 20px;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      //align-content: space-around;

      .top_style{
        background-color:#3f3f3f;
        color: #fff;
        height: 40px;
        line-height: 40px;
        font-weight: 700;
        text-align: center;
        //width: calc(100% - 17px);
      }

      .icon_delete{
        color: rgb(226, 69, 4);
        position: relative;
        font-size: 22px;
        top:4px;
      }
      .content{
        height: calc(100% - 80px);
        overflow-y: auto; 

                  &::-webkit-scrollbar{
                    width: 5px;
                    height: 10px;
                  }

                  &::-webkit-scrollbar-track {
                    background-color:  rgba(0,0,0,0.1);
                  }

                  &::-webkit-scrollbar-thumb {
                    background-color: rgba(0, 0, 0, 0.2);
                    border-radius: 4px;
                  }

                  &::-webkit-scrollbar-button {
                    background-color: #cccccc;
                    display: none;
                  }
      }

      table{
        width: 100%;

        tr{
          height: 30px;
          line-height: 30px;
        }
      }

      .right_top{
        width: 100%;
        height: 48%;
        border-bottom: 1px solid #c9c9c9;
        border-right:  1px solid #c9c9c9;
        
      }

      .right_bottom{
        // width: 100%;
        // height: 49%;
        //margin-top: 20px;
       
      }
    }

	}
}

</style>


