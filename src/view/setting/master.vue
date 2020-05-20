<template>
    <div @click.stop="filerdata()" class="apartment">
    	<div class="apartment-left">
    		<div class="apartment-left-top">
    			<el-button size="small" style="width: 200px;" type="primary">部门</el-button>

    			
    		</div>
    		<div class="apartment-left-bottom">
    			<el-menu
			      default-active="2"
			      class="el-menu-vertical-demo"
			      @open="handleOpen"
			      @close="handleClose"> 
			      <div @click.stop="filerdata()" v-for="list in leftdata">
				      <el-submenu  v-if="list.groupVOList.length>0"   @click.native.stop="show_detail(list.groupId, list.groupName,list)" :index="list.groupId" :key="list.groupId">
				        <template slot="title">
				          	<span :class="{bluecolor: list.color}">{{list.groupName}}</span>

				          	<!--<i v-show="list.setting" @click.stop="filerdata(list)" style="position: absolute;right: 40px;top: 16px;" class="iconfont el-icon-setting iconfont-absolute"></i>-->

				          	

				          	<!--<el-popover placement="right" v-model="list.setting" class="setting-1-el-popover" trigger="manual">
			                    <div class="el-popover-content el-popover-content-first">
			                      <el-button type="text" @click.stop="editapart(list)" size="mini">编辑</el-button>

			                    </div>
			                    <div class="el-popover-content">
			                      <el-button type="text" @click.stop="deleteapart(list)" size="mini">删除</el-button>

			                    </div>
			                    <div class="el-popover-content">
			                      <el-button type="text" @click="addapartmenttwo(list)" size="mini">新增下一级</el-button>

			                    </div>
			                    <i slot="reference" @click.stop="filerdata(list)" class="iconfont el-icon-setting iconfont-absolute"></i>
			                 </el-popover>-->



					        
				        </template>
				        <div v-if="list.groupVOList.length>0" v-for="listtow in list.groupVOList">
				        
					        <el-submenu @click.native.stop="show_detail(listtow.groupId, list.groupName+'/' +listtow.groupName, listtow)" :key="listtow.groupId" :index="listtow.groupId"  v-if="listtow.groupVOList.length>0">
					          <template slot="title">
						          <span :class="{bluecolor: listtow.color}">{{listtow.groupName}}</span>
						          <!--<el-popover placement="right" v-model="listtow.setting" class="setting-1-el-popover" trigger="manual">
				                    <div class="el-popover-content el-popover-content-first">
				                      <el-button type="text" @click.stop="editapart(listtow)" size="mini">编辑</el-button>

				                    </div>
				                    <div class="el-popover-content">
				                      <el-button type="text" @click.stop="deleteapart(listtow)" size="mini">删除</el-button>

				                    </div>
				                    <div class="el-popover-content">
				                      <el-button type="text" @click="addapartmenttwo(listtow)" size="mini">新增下一级</el-button>

				                    </div>
				                    <i slot="reference" @click.stop="filerdata(listtow)" class="iconfont el-icon-setting iconfont-absolute"></i>
				                 </el-popover>-->

							    

						      </template>

						      <div v-if="listtow.groupVOList.length>0" :key="listthree.groupId" v-for="listthree in listtow.groupVOList">

						      	<el-submenu @click.native.stop="show_detail(listthree.groupId, list.groupName+'/' +listtow.groupName+'/' +listthree.groupName, listthree)" :index="listthree.groupId"  v-if="listthree.groupVOList.length>0">
						          <template slot="title">
							          <span :class="{bluecolor: listthree.color}">{{listthree.groupName}}</span>


								        <!--<el-popover placement="right" v-model="listthree.setting" class="setting-1-el-popover" trigger="manual">
					                    <div class="el-popover-content el-popover-content-first">
					                      <el-button type="text" @click.stop="editapart(listthree)" size="mini">编辑</el-button>

					                    </div>
					                    <div class="el-popover-content">
					                      <el-button type="text" @click.stop="deleteapart(listthree)" size="mini">删除</el-button>

					                    </div>
					                    <div class="el-popover-content">
					                      <el-button type="text" @click="addapartmenttwo(listthree)" size="mini">新增下一级</el-button>

					                    </div>
					                    <i slot="reference" @click.stop="filerdata(listthree)" class="iconfont el-icon-setting iconfont-absolute"></i>
					                 </el-popover>-->

								    
					            	</template>


					            	<div v-if="listthree.groupVOList.length>0" :key="listfour.groupId" v-for="listfour in listthree.groupVOList">

					            		<el-submenu @click.native.stop="show_detail(listfour.groupId, list.groupName+'/' +listtow.groupName+'/' +listthree.groupName+'/' +listfour.groupName, listfour)" :index="listfour.groupId"  v-if="listfour.groupVOList.length>0">
					            			<template slot="title">
									          <span :class="{bluecolor: listfour.color}">{{listfour.groupName}}</span>


										        <!--<el-popover placement="right" v-model="listfour.setting" class="setting-1-el-popover" trigger="manual">
							                    <div class="el-popover-content el-popover-content-first">
							                      <el-button type="text" @click.stop="editapart(listfour)" size="mini">编辑</el-button>

							                    </div>
							                    <div class="el-popover-content">
							                      <el-button type="text" @click.stop="deleteapart(listfour)" size="mini">删除</el-button>

							                    </div>
							                    <div class="el-popover-content">
							                      <el-button type="text" @click="addapartmenttwo(listfour)" size="mini">新增下一级</el-button>

							                    </div>
							                    <i slot="reference" @click.stop="filerdata(listfour)" class="iconfont el-icon-setting iconfont-absolute"></i>
							                 </el-popover>-->

										    
							            	</template>




							            	<el-menu-item :key="listfive.groupId"  @click.native.stop="show_detail(listfive.groupId, list.groupName+'/' +listtow.groupName+'/' +listthree.groupName+'/' +listfour.groupName + '/'+listfive.groupName,listfive)" v-if="listfour.groupVOList.length>0" v-for="listfive in listfour.groupVOList" :index="listfive.groupId" >

										        <span :class="{bluecolor: listfive.color}">{{listfive.groupName}}</span>


										        <!--<el-popover placement="right" v-model="listfive.listfive" class="setting-1-el-popover" trigger="manual">
							                    <div class="el-popover-content el-popover-content-first">
							                      <el-button type="text" @click.stop="editapart(listfive)" size="mini">编辑</el-button>

							                    </div>
							                    <div class="el-popover-content">
							                      <el-button type="text" @click.stop="deleteapart(listfive)" size="mini">删除</el-button>

							                    </div>
							                    
							                    <i slot="reference" @click.stop="filerdata(listfive)" class="iconfont el-icon-setting iconfont-absolute"></i>
							                 </el-popover>-->
										        
										    </el-menu-item>

					            		</el-submenu>



					            		<el-menu-item :key="listfour.groupId" @click.native.stop="show_detail(listfour.groupId, list.groupName+'/' +listtow.groupName+'/' +listthree.groupName+'/' +listfour.groupName, listfour)" v-if="listfour.groupVOList.length==0" :index="listfour.groupId" >

								        <span :class="{bluecolor: listfour.color}">{{listfour.groupName}}</span>


								        <!--<el-popover placement="right" v-model="listfour.setting" class="setting-1-el-popover" trigger="manual">
					                    <div class="el-popover-content el-popover-content-first">
					                      <el-button type="text" @click.stop="editapart(listfour)" size="mini">编辑</el-button>

					                    </div>
					                    <div class="el-popover-content">
					                      <el-button type="text" @click.stop="deleteapart(listfour)" size="mini">删除</el-button>

					                    </div>
					                    <div class="el-popover-content">
					                      <el-button type="text" @click="addapartmenttwo(listfour)" size="mini">新增下一级</el-button>

					                    </div>
					                    <i slot="reference" @click.stop="filerdata(listfour)" class="iconfont el-icon-setting iconfont-absolute"></i>
					                 </el-popover>-->
								        
								    </el-menu-item>



					            	</div>



					            	<!--<el-menu-item :key="listfour.groupId"  @click.native.stop="show_detail(listfour.groupId, list.groupName+'/' +listtow.groupName+'/' +listthree.groupName+'/' +listfour.groupName,listfour)" v-if="listthree.groupVOList.length>0" v-for="listfour in listthree.groupVOList" :index="listfour.groupId" >

								        <span :class="{bluecolor: listfour.color}">{{listfour.groupName}}</span>


								        <el-popover placement="right" v-model="listfour.setting" class="setting-1-el-popover" trigger="manual">
					                    <div class="el-popover-content el-popover-content-first">
					                      <el-button type="text" @click.stop="editapart(listfour)" size="mini">编辑</el-button>

					                    </div>
					                    <div class="el-popover-content">
					                      <el-button type="text" @click.stop="deleteapart(listfour)" size="mini">删除</el-button>

					                    </div>
					                    
					                    <i slot="reference" @click.stop="filerdata(listfour)" class="iconfont el-icon-setting iconfont-absolute"></i>
					                 </el-popover>
								        
								    </el-menu-item>-->


					            </el-submenu>



							      	<el-menu-item :key="listthree.groupId" @click.native.stop="show_detail(listthree.groupId, list.groupName+'/' +listtow.groupName+'/' +listthree.groupName, listthree)" v-if="listthree.groupVOList.length==0" :index="listthree.groupId" >

								        <span :class="{bluecolor: listthree.color}">{{listthree.groupName}}</span>


								        <!--<el-popover placement="right" v-model="listthree.setting" class="setting-1-el-popover" trigger="manual">
					                    <div class="el-popover-content el-popover-content-first">
					                      <el-button type="text" @click.stop="editapart(listthree)" size="mini">编辑</el-button>

					                    </div>
					                    <div class="el-popover-content">
					                      <el-button type="text" @click.stop="deleteapart(listthree)" size="mini">删除</el-button>

					                    </div>
					                    <div class="el-popover-content">
					                      <el-button type="text" @click="addapartmenttwo(listthree)" size="mini">新增下一级</el-button>

					                    </div>
					                    <i slot="reference" @click.stop="filerdata(listthree)" class="iconfont el-icon-setting iconfont-absolute"></i>
					                 </el-popover>-->
								        
								    </el-menu-item>
							    </div>

					        </el-submenu>



					        <el-menu-item :key="listtow.groupId" @click.native.stop="show_detail(listtow.groupId, list.groupName+'/' +listtow.groupName,listtow)" v-if="listtow.groupVOList.length==0" :index="listtow.groupId" >

						        <span :class="{bluecolor: listtow.color}">{{listtow.groupName}}</span>

						        <!--<el-popover placement="right" v-model="listtow.setting" class="setting-1-el-popover" trigger="manual">
					                    <div class="el-popover-content el-popover-content-first">
					                      <el-button type="text" @click.stop="editapart(listtow)" size="mini">编辑</el-button>

					                    </div>
					                    <div class="el-popover-content">
					                      <el-button type="text" @click.stop="deleteapart(listtow)" size="mini">删除</el-button>

					                    </div>
					                    <div class="el-popover-content">
					                      <el-button type="text" @click="addapartmenttwo(listtow)" size="mini">新增下一级</el-button>

					                    </div>
					                    <i slot="reference" @click.stop="filerdata(listtow)" class="iconfont el-icon-setting iconfont-absolute"></i>
					                 </el-popover>-->
								        
								        
						        
						    </el-menu-item>

					    </div>
				      </el-submenu> 

				      <el-menu-item :key="list.groupId" @click.native.stop="show_detail(list.groupId, list.groupName, list)" v-if="list.groupVOList.length==0" :index="list.groupId">
				      	<span :class="{bluecolor: list.color}">{{list.groupName}}</span>
				      	<!--<el-popover placement="right" v-model="list.setting" class="setting-1-el-popover" trigger="manual">
					                    <div class="el-popover-content el-popover-content-first">
					                      <el-button type="text" @click.stop="editapart(list)" size="mini">编辑</el-button>

					                    </div>
					                    <div class="el-popover-content">
					                      <el-button type="text" @click.stop="deleteapart(list)" size="mini">删除</el-button>

					                    </div>
					                    <div class="el-popover-content">
					                      <el-button type="text" @click="addapartmenttwo(list)" size="mini">新增下一级</el-button>

					                    </div>
					                    <i slot="reference" @click.stop="filerdata(list)" class="iconfont el-icon-setting iconfont-absolute"></i>
					                 </el-popover>-->
								        
				      	
				      </el-menu-item>
				  </div>
			      
			    </el-menu>
    		</div>
    		
    	</div>
    	<div style="width: calc(100vw - 600px);" class="apartment-right">
    		<div class="apartment-right-top">
    			<span class="groupName">{{selectlist.groupName}}</span>


    			<div class="staffadd">
    				<el-input size="mini" style="display: inline-block;width: 160px;" v-model="memo" placeholder="请输入内容"></el-input>
    				<el-button @click="select_staff" size="mini" type="success" style="margin-right: 30px;margin-left: 10px;" icon="el-icon-search">搜索</el-button>

    				<el-button @click="copyright.dialogVisible=true" size="mini" type="primary" >新增信息</el-button>
    				<!--<el-button size="small" icon="el-icon-edit" @click="editstaff" type="warning">编辑</el-button>-->
    			</div>

    		</div>
    		<div style="width: 100%" ref="tablewrap" class="apartment-right-bottom">
    			<el-table
				    :data="tableData"
				    border
				    :height="tableheight"
				    :header-cell-style='{"background": "#3f3f3f",
		    		"border-right": "#3f3f3f",
		    		"color": "#ffffff"}'
				    style="width: 99%"
				   >
				    
				    <el-table-column
				      prop="id"
				      width='100'
				      label="编号"
				      >
				      <template slot-scope="scope">

				      {{scope.row.id ? scope.row.id : scope.row.staffId}}
				  </template>
				    </el-table-column>
				    <el-table-column
				      prop="staffName"
				      width='130'
				      label="姓名">
				    </el-table-column>
				    <el-table-column
				      prop="groupName"
				      width='130'
				      label="部门">
				    </el-table-column>
				    <el-table-column
				      prop="phone"
				      width='130'
				      label="手机">
				    </el-table-column>
				    <el-table-column
				      prop="roleName"
				      width='130'
				      label="角色">
				    </el-table-column>
				   
				    <el-table-column
				      prop="amount2"
				      label="操作">

				      	<template slot-scope="scope">
			              
                          <el-button
                          size="mini"
                          @click="editstaffshow(scope.row)">编辑权限</el-button>
                          <!--<el-button
                          size="mini"
                          @click="editstaffokpassword(scope.row)">重置密码</el-button>-->
                          <el-button 
                          size="mini" 
                          @click="editstaff_taokepower(scope.row)">编辑淘客权限</el-button>
			            </template>

				    </el-table-column>
				    
				  </el-table>
    		</div>
    	</div>
    	<!--新增部门-->

   		<el-dialog
		  title="权限编辑"
		  :visible.sync="editstaff.dialogVisible"
		  width="500px"
		  >
		  <div class="wrap">
		  	<p class="input-p">
	          	<span >店铺名称：</span>
	          	

	            <el-select
	            	class="input-input"
				    v-model="editstaff.shopIds"
				    multiple
				    collapse-tags
				    clearable
				    filterable
				    size="small"
				    style="margin-left: 0px;"
				    placeholder="请选择">
				    <el-option
				      v-for="item in datashop"
				      :key="item.id"
				      :label="item.shopNum"
				      :value="item.id">
				    </el-option>
				</el-select>
	          
	        </p>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button size="small" @click="editstaff.dialogVisible = false">取 消</el-button>
		    <el-button size="small" type="primary" @click="update_staff_shop">确 定</el-button>
		  </span>
		</el-dialog>


		<el-dialog
		  title="编辑淘客编辑"
		  :visible.sync="edittaoke.dialogVisible"
		  width="500px"
		  >
		  <div class="wrap">
		  	<p class="input-p">
	          	<span >淘客店铺名称：</span>
	          	

	            <el-select
	            	class="input-input"
				    v-model="edittaoke.shopIds"
				    multiple
				    collapse-tags
				    clearable
				    filterable
				    size="small"
				    style="margin-left: 0px;"
				    placeholder="请选择">
				    <el-option
				      v-for="item in taokeshop"
				      :key="item.id"
				      :label="item.shopNum"
				      :value="item.id">
				    </el-option>
				</el-select>
	          
	        </p>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button size="small" @click="edittaoke.dialogVisible = false">取 消</el-button>
		    <el-button size="small" type="primary" @click="update_staff_taokeshop">确 定</el-button>
		  </span>
		</el-dialog>
    	
    	<el-dialog
		  title="版本信息修改"
		  :visible.sync="copyright.dialogVisible"
		  width="500px"
		  >
		  <div class="wrap">
		  	<p class="input-p">
	          	<span >信息标题：</span>
	          	

	            <el-input style="display: inline-block;width: 180px" class="input" size="mini" v-model="copyright.informTitle" placeholder="请输入信息标题" ></el-input>
	          
	        </p>

	        <p class="input-p">
	          	<span >信息内容：</span>
	          	

	            <el-input type="textarea" :rows="2" v-model="copyright.informMemo" placeholder="请输入内容" ></el-input>
	          
	        </p>

	      

		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button size="small" @click="copyright.dialogVisible = false">取 消</el-button>
		    <el-button size="small" type="primary" @click="add_inform_ok">确 定</el-button>
		  </span>
		</el-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: "apartment",
    components: {
        
    },
    data(){
        return{
        	copyright: {
        		dialogVisible: false,
        		informTitle: '',
        		informMemo: '',
        	},
        	staffprops: {
        		value: 'groupId',
        		label: 'groupName',
        		children: 'groupVOList',
        	},
        	loading: false,
        	options: [],
        	selectedOptions: [],
        	selectedOptionsre: [],
        	memo: '',
        	editstaff: {
        		dialogVisible:false,
        		id: '',
        		shopIds: [],
        	},
        	edittaoke:{
        		dialogVisible:false,
        		staffId:'',
        		shopIds: []
        	},
        	selectlist: {
        		groupId: '',
        		groupName: '',
        	},
        	
        	tableData: [],
        	grouprole: {
        		roleId: '',
				roleName: ""
        	},
	        leftdata: [],
	        rolelist: [],
	        editstafflist: [],
	        datashop: [],
	        taokeshop:[],
	        tableheight: 200
        }
    },
    watch: {
    	
    },
    computed: {
        ...mapGetters([
            'getpageDict',
        ]),
        getstatus() {
            let demand_status = this.getpageDict.filter((list) => {
                return list.dicType == "sex"
            })

            return demand_status[0]
        },
    },
    mounted(){
      this.get_group_list()
      //this.getroles()
      	this.$nextTick(()=>{

      		//console.info(this.$refs.tablewrap.offsetWidth)

            this.tableheight = this.$refs.tablewrap.offsetHeight - 60

            
        })

        this.shop_show()
        this.taokeshop_show()
    },
    methods:{
    	add_inform_ok() {
    		this.$maintancehttp.post(`main/add_inform`,{
    			informTitle:this.copyright.informTitle,
    			informMemo:this.copyright.informMemo,
    		})
                .then((data)=>{
                	this.copyright.informTitle = ''
                	this.copyright.informMemo = ''
                	this.copyright.dialogVisible = false
                    this.$message({
                      message: data.msg,
                      type: 'success'
                    })
                })
                .catch(()=>{
                    this.$message({
                      message: '接口报错',
                      type: 'error'
                    })
                })
    	},
    	shop_show() {
    		this.$http.post(`shop/shop_show`,{
    			brandId:'' ,
    		})
                .then((data)=>{
                    this.datashop = data.data
                })
                .catch(()=>{
                    this.$message({
                      message: '接口报错',
                      type: 'error'
                    })
                })
    	},
    	taokeshop_show(){
    		console.info("111")
    		this.$http.get(`shop/tk_shop_show`)
    			
                .then((data)=>{
                	
                    this.taokeshop = data.data
                    //console.info(data)
                })
                .catch(()=>{
                    this.$message({
                      message: '接口报错',
                      type: 'error'
                    })
                })
    	},

    	fmtDate(obj){
          var date =  new Date(obj*1000);

          var y = 1900+date.getYear();
          var m = "0"+(date.getMonth()+1);
          var d = "0"+date.getDate();
          return y+"/"+m.substring(m.length-2,m.length)+"/"+d.substring(d.length-2,d.length);
      	},
    	remoteMethod(query) {
            let that = this
            this.$http.get(`staff/select_staff?memo=${query}`)
            .then(function (data) {
                
                
                ///console.info(data)

                that.options = data.data

                
              })
              .catch(function (error) {
                console.log(error);
                that.$message({
                    message: '接口报错',
                    type: 'error'
                  });
              });
        },
    	select_staff() {
    		let that = this
    		this.$http.get(`staff/select_staff?memo=${this.memo}`)
    		.then(function (data) {
    			
                
                ///console.info(data)

                that.tableData = data.data

                
              })
              .catch(function (error) {
                console.log(error);
                that.$message({
                    message: '接口报错',
                    type: 'error'
                  });
              });
    	},
    	handleSelectionChange(val) {
    		this.editstafflist = val
	    },
    	show_detail(groupId,groupName,list) {
    		this.selectlist.groupId = groupId
    		this.selectlist.groupName = groupName

    		this.filerdata()
    		this.filerdatacolor(list)
    		this.staff_list()
    	},
    	filerdatacolor(list) {
      		for (let i=0; i<this.leftdata.length; i++) {

                this.leftdata[i].color = false


                
                if (this.leftdata[i].groupVOList && this.leftdata[i].groupVOList.length>0) {

                    

                    

                    for(let j=0; j<this.leftdata[i].groupVOList.length; j++) {
                        this.diguidatafiltercolor(this.leftdata[i].groupVOList[j])
                    }


                }

            }



            if (list) {
            	list.color = true
            }



      	},
      	diguidatafiltercolor(groupVOList) {

      		
      		groupVOList.color = false



            for(let j=0; j<groupVOList.groupVOList.length; j++) {




                this.diguidatafiltercolor(groupVOList.groupVOList[j])
            }


        },
    	staffdelete(list) {
    		let id = list.id? list.id:list.staffId
    		if (!id) {
    			return this.$message({
		                    message: '没有要删除的信息',
		                    type: 'warning'
		                  });
    		}
    		let that = this
      		this.$confirm('此操作将永久删除此数据, 是否继续?', '提示', {
	            confirmButtonText: '确定',
	            cancelButtonText: '取消',
	            type: 'warning'
	        }).then(() => {
	        	this.$http.get(`staff/delete_staff?id=${id}`)
	        		.then(function (data) {
	        			
		                
		                if (data.code != '200'){
		                  that.$message({
		                    message: data.msg,
		                    type: 'error'
		                  });
		                } else {
		                	that.$message({
			                    message: data.msg,
			                    type: 'success'
			                 });
		                	
		                }

		                that.select_staff()
		                
		              })
		              .catch(function (error) {
		                console.log(error);
		                that.$message({
		                    message: '接口报错',
		                    type: 'error'
		                  });
		              });
	        }).catch(() => {
	            this.$message({
	              type: 'info',
	              message: '已取消删除'
	            });          
          });

    	},
    	editstaffshow(list) {
    		
    		this.editstaff.id = list.id ? list.id: list.staffId
    		this.editstaff.shopIds = []
    		if (list.shopList && list.shopList.length) {
    			for (let i=0;i<list.shopList.length;i++) {
    				this.editstaff.shopIds.push(list.shopList[i].id)
    			}
    		}
    		


    		this.editstaff.dialogVisible = true

    	},
    	editstaff_taokepower(row){

    		this.edittaoke.staffId = row.staffId ? row.staffId: row.id
    		console.info(this.edittaoke.staffId)
    		this.edittaoke.shopIds=[]
    		let that =this
    		this.$http.get(`shop/find_tk_shop_staff?staffId=${this.edittaoke.staffId}`)  

    			.then(function (data) {
	        		console.info(data)	
		            that.edittaoke.shopIds=data.data  
		            // if (data.code != '200'){
		            //     that.$message({
		            //         message: data.msg,
		            //         type: 'error'
	             //        });
		            // } else {
		            //     that.$message({
		            //         message: data.msg,
		            //         type: 'success'
		                
			           //  });
		                 
		            // }

		                
		                
		        })


    		this.edittaoke.dialogVisible=true	

    	},
    	update_staff_shop() {
    		let that = this

    		this.$http.get(`staff/update_staff_shop?shopIds=${this.editstaff.shopIds.join(',')}&id=${this.editstaff.id}`)
                .then((data)=>{
                	if (data.code != '200'){
		                  that.$message({
		                    message: data.msg,
		                    type: 'error'
		                  });
		                } else {
		                	that.$message({
			                    message: data.msg,
			                    type: 'success'
			                 });
		                	
		                }
		                that.editstaff.dialogVisible = false

		                that.staff_list()
                    //this.datashop = data.data
                })
                .catch(()=>{
                    this.$message({
                      message: '接口报错',
                      type: 'error'
                    })
                })
    	},
    	update_staff_taokeshop() {
    		
    		let that = this

    		 this.$http.get(`tk_sell/tk_shop_staff_deal?staffId=${this.edittaoke.staffId}&shopIds=${this.edittaoke.shopIds.join(',')}`)




                .then((data)=>{
                	if (data.code != '200'){
		                  that.$message({
		                    message: data.msg,
		                    type: 'error'
		                  });
		                } else {
		                	that.$message({
			                    message: data.msg,
			                    type: 'success'
			                 });
		                	
		                }
		                that.edittaoke.dialogVisible = false

		                
                })
                .catch(()=>{
                    this.$message({
                      message: '接口报错',
                      type: 'error'
                    })
                })
    	},
    	editstaffokpassword(row) {
    		let that = this
    		
    		this.$http.get(`staff/update_password?id=${row.id}&password=123456`)
	    		.then(function (data) {
	    			console.info(data)

	                
	                	if (data.code != '200'){
		                  that.$message({
		                    message: data.msg,
		                    type: 'error'
		                  });
		                } else {
		                	that.$message({
			                    message: data.msg,
			                    type: 'success'
			                 });
		                }



		                that.staff_list()
	                
	                
	              })
	              .catch(function (error) {
	                console.log(error);
	                that.$message({
	                    message: '接口报错',
	                    type: 'error'
	                  });
	              });
    	},
    	editstaffok() {
    		let that = this




    		
    		let groupId = this.selectedOptions.length>0? this.selectedOptions[this.selectedOptions.length-1]:this.editstaff.groupId

    		let bigGroupId = this.selectedOptionsre.length>0? this.selectedOptionsre[this.selectedOptionsre.length-1]:this.editstaff.bigGroupId


    		let leaderId = this.editstaff.leaderId

    		if (this.editstaff.leaderIdold) {
    			let array = []
                array = this.editstaff.leaderIdold.split('-')

                leaderId = array[0]
    		}
    		




    		

    		this.$http.post('staff/update_staff',{
    			staffName: this.editstaff.staffName,
    			phone: this.editstaff.phone,
    			roleId: this.editstaff.roleId,
    			password: this.editstaff.password,
    			sex: this.editstaff.sex,
    			id: this.editstaff.id,
    			groupId: groupId,
    			bigGroupId: bigGroupId,
    			entryTime: this.editstaff.entryTime ? this.editstaff.entryTime.getTime().toString().substr(0, 10): '',
    			leaderId: leaderId

    		})
    		.then(function (data) {
	    			console.info(data)

	                
	                	if (data.code != '200'){
		                  that.$message({
		                    message: data.msg,
		                    type: 'error'
		                  });
		                } else {
		                	that.$message({
			                    message: data.msg,
			                    type: 'success'
			                 });
		                }
                        that.select_staff()
		                that.editstaff.dialogVisible = false
		                //that.staff_list()

	                
	                
	              })
	              .catch(function (error) {
	                console.log(error);
	                that.$message({
	                    message: '接口报错',
	                    type: 'error'
	                  });
	              });


    		/*this.$http.get(`staff/update_password?id=${this.editstaff.id}&password=${this.editstaff.password}`)
	    		.then(function (data) {
	    			console.info(data)

	                
	                	if (data.code != '200'){
		                  that.$message({
		                    message: data.msg,
		                    type: 'error'
		                  });
		                } else {
		                	that.$message({
			                    message: data.msg,
			                    type: 'success'
			                 });
		                }

		                that.editstaff.dialogVisible = false
		                that.staff_list()
	                
	                
	              })
	              .catch(function (error) {
	                console.log(error);
	                that.$message({
	                    message: '接口报错',
	                    type: 'error'
	                  });
	              });*/
    	},
    	staff_list() {
    		if (!this.selectlist.groupId) {
    			return
    		}
    		this.$http.get(`staff/staff_list?groupId=${this.selectlist.groupId}`)
    			.then((data)=>{
      				if (data.code = '200') {
      					this.tableData = []
      					this.grouprole.roleName = ''
      					this.grouprole.roleId = ''

      					if (data.data) {
      						
      						this.tableData = data.data.list

      						this.grouprole.roleName = data.data.roleName
      						this.grouprole.roleId = data.data.roleId

      					} 
      					

      					
      				}
      			})
      			.catch(()=>{
      				this.$message({
	                  message: '接口报错',
	                  type: 'error'
	                })
      			})
    	},
    	
    	
    	editgrouprole() {
    		this.editgrouproledialogVisible.dialogVisible = true
    		this.editgrouproledialogVisible.groupId = this.selectlist.groupId
    		this.editgrouproledialogVisible.roleId = this.grouprole.roleId


    	},
    	editrolegroup() {


    		this.$http.get(`group/edit_leader?groupId=${this.selectlist.groupId}&roleId=${this.editgrouproledialogVisible.roleId}`)
      		.then((data)=>{
      			//that.get_group_list()
  				if (data.code == '200') {
  					this.$message({
	                  message: data.msg,
	                  type: 'success'
	                })

	                
	                this.editgrouproledialogVisible.dialogVisible = false
  				}else {
  					this.$message({
	                  message: data.msg,
	                  type: 'error'
	                })
  				}

  				this.staff_list()
  			})
  			.catch(()=>{
  				this.$message({
                  message: '接口报错',
                  type: 'error'
                })
  			})
    	},
    	//获取角色列表
    	getroles() {
    		this.$http.get('role/role_list')
    			.then((data)=>{
      				if (data.code = '200') {

      					//console.info(data)
      					this.rolelist = data.data
      					//this.leftdata = data.data
      				}
      			})
      			.catch(()=>{
      				this.$message({
	                  message: '接口报错',
	                  type: 'error'
	                })
      			})
    	},
      	handleOpen(key, keyPath) {
        console.log(key, keyPath);
      	},
      	tableheaderClassName({ row, rowIndex }) {
            return "table-head-th";
       	},
      	handleClose(key, keyPath) {
        console.log(key, keyPath);
      	},
      	get_group_list() {
      		this.$http.get('group/get_group_list')
      			.then((data)=>{
      				if (data.code = '200') {
      					
      					let array = []
      					for (let i=0; i<data.data.length; i++) {

                            array.push({...data.data[i], setting: false, color: false})

                            data.data[i].setting = false
                            data.data[i].color = false
                            
                            if (data.data[i].groupVOList && data.data[i].groupVOList.length>0) {

                                //console.info(data.data)

                                
                                for(let j=0; j<data.data[i].groupVOList.length; j++) {
                                	this.diguidata(data.data[i].groupVOList[j])
                                }


                            }

                        }


                        
                        this.leftdata = data.data

                        console.info(this.leftdata)




      					this.show_detail(this.leftdata[0].groupId,this.leftdata[0].groupName)
      				}
      			})
      			.catch(()=>{
      				this.$message({
	                  message: '接口报错',
	                  type: 'error'
	                })
      			})
      	},
      	diguidata(groupVOList) {
      			//groupVOList.push({...groupVOList, setting: false,color: false})

      			groupVOList.setting = false
      			groupVOList.color = false
                
                
              


                for(let j=0; j<groupVOList.groupVOList.length; j++) {




                    this.diguidata(groupVOList.groupVOList[j])
                }


        },
      	filerdata(list) {
      		for (let i=0; i<this.leftdata.length; i++) {

                this.leftdata[i].setting = false


                
                if (this.leftdata[i].groupVOList && this.leftdata[i].groupVOList.length>0) {

                    

                    

                    for(let j=0; j<this.leftdata[i].groupVOList.length; j++) {
                        this.diguidatafilter(this.leftdata[i].groupVOList[j])
                    }


                }

            }

            if (list) {
            	list.setting = true
            }

      	},

      	diguidatafilter(groupVOList) {

      		
      		groupVOList.setting = false



            for(let j=0; j<groupVOList.groupVOList.length; j++) {




                this.diguidatafilter(groupVOList.groupVOList[j])
            }


        },
      	
      	addapartok() {
      		let that = this
      		if (!this.addapart.groupName) {
      			return this.$message({
	                  message: '名称必填',
	                  type: 'warning'
	                })
      		}
      		let url = 'group/add_group'

      		if (this.addapart.groupId) {
      			url = 'group/update_group'
      		}
      		this.$http.post(url,{
      			groupName: this.addapart.groupName,
      			parentId: this.addapart.parentId,
      			groupId: this.addapart.groupId
      		})
      		.then((data)=>{
      			that.get_group_list()
  				if (data.code == '200') {
  					this.$message({
	                  message: data.msg,
	                  type: 'success'
	                })

	                
	                this.addapart.dialogVisible = false
  				}else {
  					this.$message({
	                  message: data.msg,
	                  type: 'error'
	                })
  				}
  			})
  			.catch(()=>{
  				this.$message({
                  message: '接口报错',
                  type: 'error'
                })
  			})
      	},

      	
      	deleteapart(list) {
      		let that = this
      		this.$confirm('此操作将永久删除此数据, 是否继续?', '提示', {
	            confirmButtonText: '确定',
	            cancelButtonText: '取消',
	            type: 'warning'
	        }).then(() => {
	        	this.$http.get(`group/delete_group?groupId=${list.groupId}`)
	        		.then(function (data) {
	        			that.get_group_list()
		                
		                if (data.code != '200'){
		                  that.$message({
		                    message: data.msg,
		                    type: 'error'
		                  });
		                } else {
		                	that.$message({
			                    message: data.msg,
			                    type: 'success'
			                 });
		                }
		                
		              })
		              .catch(function (error) {
		                console.log(error);
		                that.$message({
		                    message: '接口报错',
		                    type: 'error'
		                  });
		              });
	        }).catch(() => {
	            this.$message({
	              type: 'info',
	              message: '已取消删除'
	            });          
          });

      	}
    },
}
</script>


<style lang="less">
.input-p {
    padding-left: 20px;
    margin: 16px 0;
    .input-input {
        display: inline-block;
        width: 270px;
        font-size: 12px;
    }

}
.apartment {
	display: flex;
	font-size: 12px;


	.iconfont-absolute {
	  position: absolute;
	  right: 40px;
	  top: 19px;
      font-size: 18px;
	}

	.wrap {
		.input-p {
			padding-left: 20px;
			.input-input {
				display: inline-block;
				width: 270px;
				font-size: 12px;
			}

		}
	}

	.wrap-staff {
		p {
			margin-bottom: 20px;
			padding-left: 20px;
			font-size: 12px;

			.input-input {
				display: inline-block;
				width: 270px;
				font-size: 12px;
			}

			span {
				padding-left: 4px;
			}

			b {
				color: red;
			}
		}
	}

	&-left {
		height: calc(100vh - 200px);
		border: 1px solid #e2e2e2;
		width: 280px;
		border-bottom: 0px;

		&-top {
			padding: 10px;
			border-bottom: 1px solid #e2e2e2;
			padding-left: 36px;
		}

		.apartment-left-bottom {
			height: 100%;
			height: calc(100vh - 260px);
			

			.el-menu-vertical-demo {
				height: calc(100vh - 260px);
				overflow-y: scroll;
				border-right: 0px
			}
		}

	}

	&-right {
		height: calc(100vh - 200px);
		border: 1px solid #e2e2e2;
		flex: 1;
		border-left: 0px;
		border-bottom: 0px;

		&-top {
			padding-left: 20px;
			height: 53px;
			line-height: 53px;
			border-bottom: 1px solid #e2e2e2;
			position: relative;


			.staffadd {
				position: absolute;
				right: 20px;
				width: 400px;
				top: 0px;
			}

			.groupName {
				padding-right: 20px;
				font-size: 14px;
			}
		}
		&-bottom {
			height: calc(100vh - 256px);
			padding: 20px 0 20px 20px;
			background: #f7f8f8;
		}
	}

}
  
</style>
<style>
	.apartment .el-menu-item.is-active {
		color: #303133;
	}
	.bluecolor {
		color: #409EFF;
	}
</style>