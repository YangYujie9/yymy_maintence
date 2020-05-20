<template>
  <div class="file_pro">
  	<div class="file_pro-top">
      <div class="leftsearch"> 
         
       <!--<el-input size="medium"  style="display: inline-block;width: 180px;"  placeholder="请输入店铺名称或编码" v-model="shopInfo" class="input-with-select">
          
       </el-input>
      <el-button size="medium" @click="shop_show" style="margin-left: 10px;" class="btn_style">搜索</el-button>-->
    </div>
      
  		<div class="rightadd">

  			<el-button size="medium" @click="addshop.dialogVisible = true"  class="btn_style" >新增</el-button>

  		</div>
  	</div>
  	<div  ref="tablewrap" class="file_pro-wrap">
      <div class="left_div">
    		<el-table
	  	    :data="tableData"
	  	    height="100%"
	        :header-cell-style='{"background": "#3f3f3f",
	            "border-right": "1px solid #cecece",
	            "color": "#ffffff"}'
	        highlight-current-row
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
            prop="shopNum"
            label="平台"
           
            align="center">
            <template slot-scope="scope">
              {{getshop_type(scope.row.shopType)}}
                    
            </template>
            
          </el-table-column>

          <el-table-column
            prop="operationType"
            label="运营状态"
           
            align="center">
            <template slot-scope="scope">
              {{getoperation_type(scope.row.operationType)}}
                    
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
            prop="shopNum"
            label="操作"
            width="160"
            align="center">
            <template slot-scope="scope">
              
              <i class="iconfont iconbianji icon_class" @click="editshopshow(scope.row)"></i>
                    
            </template>
            
          </el-table-column>
          

  	    </el-table>
      </div>
      

     
  	</div>
    
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
          <span >负&nbsp;&nbsp;责&nbsp;人：</span>
          <el-input placeholder="请输入负责人"  class="input-input"
             v-model="addshop.shopPriciple" ></el-input>
          
        </p>
        
        <p class="input-p">
          <span >平&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;台：</span>
          

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
          <span >运营状态：</span>
          
          <el-select class="input-input" v-model="addshop.operationType" placeholder="请选择状态">
            <el-option
              v-for="item in getoperationType"
              :key="item.dicCode"
              :label="item.dicName"
              :value="item.dicCode">
            </el-option>
          </el-select>
          
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
          <span >负&nbsp;&nbsp;责&nbsp;人：</span>
          <el-input placeholder="请输入负责人"  class="input-input"
             v-model="editshop.shopPriciple" ></el-input>
          
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
          <span >运营状态：</span>
          
          <el-select class="input-input" v-model="editshop.operationType" placeholder="请选择状态">
            <el-option
              v-for="item in getoperationType"
              :key="item.dicCode"
              :label="item.dicName"
              :value="item.dicCode">
            </el-option>
          </el-select>
          
        </p>

        
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="editshop.dialogVisible = false">取 消</el-button>
        <el-button size="mini" @click="editshopok" type="primary" >确 定</el-button>
      </span>
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
        
      	addshop: {
      		dialogVisible: false,
      		shopName: '',
      		shopNum: '',
          shopType:'',
          shopPriciple: '',
          operationType:'',
      	},
        
      	tableheight: 200,
        shopInfo: '',
        editshop: {
          id:'',
          dialogVisible: false,
          shopName: '',
          shopNum: '',
          shopType:'',
          shopPriciple: '',
          operationType:'',
        },
        tableData:[],
       
        
      }

    },
    mounted(){
      this.shop_show()
      
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
        },
        getoperationType(){
            let demand_status = this.getpageDict.filter((list) => {
                return list.dicType == "operation_type"
            })

            return demand_status[0].dicList
        },
    },
    methods: {
    fmtDate(obj){
        var date =  new Date(obj*1000);

        var y = 1900+date.getYear();
        var m = "0"+(date.getMonth()+1);
        var d = "0"+date.getDate();
        return y+"/"+m.substring(m.length-2,m.length)+"/"+d.substring(d.length-2,d.length);
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
    getoperation_type(type) {

        console.info(this.getoperationType)

        let name = ''
        for (let i=0;i<this.getoperationType.length;i++) {
          if (this.getoperationType[i].dicCode == type) {
            name = this.getoperationType[i].dicName
            break
          }
        }

        return name
    },
      
    shop_show() {
    		this.$http.get(`yx_shop/show_shop`)
	          .then((data)=>{
	              this.tableData = data.data
	              //console.info(data.data[0])
	              

	          })
	          .catch(()=>{
	              this.$message({
	                message: '接口报错',
	                type: 'error'
	              })
	          })
    },
    editshopshow(list){

      	this.editshop.id = list.id
      	this.editshop.shopName = list.shopName
      	this.editshop.shopNum = list.shopNum
      	this.editshop.shopType = list.shopType
      	this.editshop.shopPriciple = list.name
        this.editshop.operationType=list.operationType
      	this.editshop.dialogVisible = true
       

    },
      
    
      update_sell_status(list){


        this.$http.post(`yx_shop/update_shop`,{
        	id: list.id,
        	sell_status: list.sellStatus
        })
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
      
      editshopok(){
      

        if (!this.editshop.shopName) {
          return this.$message({
                    message: '请输入店铺名称',
                    type: 'warning'
               

                  })
        }

        

        this.$http.post(`yx_shop/update_shop`,{
            id: this.editshop.id,
            shopNum: this.editshop.shopNum,
            shopName: this.editshop.shopName,
            shopType: this.editshop.shopType,
            name: this.editshop.shopPriciple,
            operationType:this.editshop.operationType,
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
      
      
  	addshopok() {
        if (!this.addshop.shopName) {
          return this.$message({
                    message: '请输入店铺名称',
                    type: 'warning'
               

                  })
        }

        
  			this.$http.post(`yx_shop/add_shop`,{
                shopName: this.addshop.shopName,
                shopNum: this.addshop.shopNum,
                shopType: this.addshop.shopType,
                name: this.addshop.shopPriciple,
                operationType:this.addshop.operationType,
            })
            .then((data)=>{
            	if (data.code == '200') {

                    this.$message({
	                  message: '新增成功',
	                  type: 'success'
	                })

	                this.addshop.shopName = ''
	                this.addshop.shopPriciple = ''
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
		height: calc(100vh - 145px);
    	display: flex;

	    .left_div{
	      width: 100%;

	      
	    }

    

	}
}

</style>


