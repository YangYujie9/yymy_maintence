<template>
  <div class="staff_mang">
  	<div class="staff_mang-top">
      <div class="leftsearch"> 
<!--       <el-select v-model="brandId" clearable placeholder="请选择品牌" size="medium" style="width: 180px;margin-right: 20px;">

      </el-select>  -->    
       <el-input size="medium"  style="display: inline-block;width: 180px;"  placeholder="请输入团队或部门名称" v-model="teamInfo" class="input-with-select">
          
       </el-input>
      <el-button size="medium" @click="" style="margin-left: 10px;" class="btn_style">搜索</el-button></div>
  		<div class="rightadd">

  			<el-button size="medium" @click="addteamshow"  class="btn_style">新增团队</el-button>

  		</div>
  	</div>
  	<div  ref="tablewrap" class="staff_mang-wrap">
  		<div class="left_div">
  			<el-table
  			  :data="tableData"
  			  height="calc(100% - 5px)"
		      :header-cell-style='{"background": "#3f3f3f",
		          "border-right": "1px solid #cecece",
		          "color": "#ffffff"}'
		      highlight-current-row
		      @current-change="handleCurrentChange"
		  	  style="width: 100%;border-left: 1px solid #c9c9c9;border-right:  1px solid #c9c9c9">
		  	    <el-table-column
  				 prop="groupName"
  				 label="序号"
  				 type="index"
  				 align="center">
  					
  				</el-table-column>
  				<el-table-column
  				 prop="teamName"
  				 label="团队名称"
  				 align="center">
  					
  				</el-table-column>
  				<el-table-column
  				 prop="groupName"
  				 label="所属部门"
  				 align="center">
  					
  				</el-table-column>
  				<el-table-column
  				 prop="count"
  				 label="成员数"
  				 align="center">
  					
  				</el-table-column>
  				<el-table-column
  				 prop="操作"
  				 label="操作"
  				 align="center">
  				   <template slot-scope="scope">
		              <el-switch
		               v-model="scope.row.status"
		               :active-value="1"
		               :inactive-value="2"
		               @change="edit_team_status(scope.row)">
		              </el-switch>
		              <el-divider direction="vertical"></el-divider>
		              <i class="iconfont iconbianji icon_class" @click="editteamshow(scope.row)"></i>
                    
                   </template>
  					
  				</el-table-column>
  			</el-table>
  		</div>

  		<div class="medile_div">
  			<p class="top_style">{{current.teamName}}成员</p>
  			<el-input v-model="team_member" placeholder="请输入关键词" size="medium"></el-input>
  			<i class="iconfont iconsousuo1 searchicon" @click="get_team_staff"></i>

  			<div class="content">
  				<table>
  					<tr v-for="(item,index) in teamlist" :class="{heilight:item.active}" @click="chooserow1(index)">
  						<td><i class="iconfont iconstar_full mem_class" :class="{leader:item.staffId == item.principalId}" @click="set_principal_div(index)"></i>{{item.staffName}}
  							<div v-if="item.show" @mouseleave="item.show=false" style="position: absolute;z-index: 999;background-color: #fff;left: 50%;top: 20px;width: 100px;">
  								<ul>
  									<li @click="set_principal(item)">设置为组长</li>
  									<li @click="del_principal(item)">取消</li>
  								</ul>
  							</div>
  						</td>
  					</tr>
  				</table>
  			</div>
  			
  		</div>
  		<div class="operate_div">
  			<el-button size="mini" style="width: 60px;margin-left: 10px;background-color: #396;color:#fff;position: relative;" @click="add_team_memeber"><i class="iconfont iconjiantouzuo" style="position: absolute;left: 1px;"></i>添加</el-button>
  			<el-button size="mini" style="width: 60px;margin-left: 10px;background-color: #cc3300;margin-top: 10px;color:#fff;" @click="del_team_staff">取消<i class="iconfont iconicon_arrow_right"></i></el-button>
  		</div>

  		<div class="medile_div right_div">
  			<p class="top_style">未分配客服</p>
  			<el-input v-model="non_team_member" placeholder="请输入关键词" size="medium"></el-input>
  			<i class="iconfont iconsousuo1 searchicon" @click="get_staff_undistributed"></i>

  			<div class="content">
  				<table>
  					<tr v-for="(item,index) in non_teamlist" :class="{heilight:item.active}" @click="chooserow2(index)">
  						<td  >{{item.staffName}}</td>
  					</tr>
  				</table>
  			</div>
  		</div>



  	</div>
    <el-dialog
      title="新增团队"
      :visible.sync="addteam.dialogVisible"
      width="500px"
      >
      <div class="wrap">
        
        <p class="input-p">
          <span >团队名称：</span>
          <el-input placeholder="请输入团队名称"  class="input-input"
             v-model="addteam.teamName" ></el-input>
          
        </p>
        <p class="input-p">
          <span >所属部门：</span>
         
          <el-cascader
            :options="groupList"
            :props="groupprops"
            v-model="addteam.groupId"
            clearable
            class="input-input">
          </el-cascader>
          
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="addteam.dialogVisible = false">取 消</el-button>
        <el-button size="mini" @click="addteamok" type="primary" >确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="编辑团队"
      :visible.sync="editteam.dialogVisible"
      width="500px"
      >
      <div class="wrap">
        
        <p class="input-p">
          <span >店铺名称：</span>
          <el-input placeholder="请输入团队名称"  class="input-input"
             v-model="editteam.teamName" ></el-input>
          
        </p>
        <p class="input-p">
          <span >负责部门：</span>
         
          <el-cascader
            :options="groupList"
            :props="groupprops"
            v-model="editteam.groupId"
            clearable
            class="input-input">
          </el-cascader>
          
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="editteam.dialogVisible = false">取 消</el-button>
        <el-button size="mini" @click="editteamok" type="primary" >确 定</el-button>
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
      	current:{
      		teamName:'',
      		teamId:'',
      		groupId:'',
      		non_staffId:'',
      		teamstaffId:'',
      		principalId:'',
          status:''
      	},
      	team_member:'',
      	non_team_member:'',
        groupprops:{
            //checkStrictly: true,
            value: 'groupId',
            label: 'groupName',
            children: 'groupVOList',
        },
      	addteam: {
      		dialogVisible: false,
      		teamName: '',
          groupId:'',
      	},
      	editteam: {
      		dialogVisible: false,
      		teamName: '',
          groupId:'',
          id:'',

      	},
      	tableheight: 200,
      	teamInfo:'',
      	brandId:'',
      	groupList:[],
      	groupListname:'',
      	tableData:[],
      	non_teamlist:[],
      	teamlist:[],




      }

    },
    mounted(){

    	this.get_group_list()
      this.add_customer_staff()
    	this.get_customer_team()

        this.$nextTick(()=>{

        	this.tableheight = this.$refs.tablewrap.offsetHeight - 10

        
    	})
    },
    computed: {
        ...mapGetters([
            'getpageDict',
        ]),

    },
    methods: {
        fmtDate(obj){
            var date =  new Date(obj*1000);

            var y = 1900+date.getYear();
            var m = "0"+(date.getMonth()+1);
            var d = "0"+date.getDate();
            return y+"/"+m.substring(m.length-2,m.length)+"/"+d.substring(d.length-2,d.length);
        },

        handleCurrentChange(row){
          if(row){
            console.info(row)

          	this.current.teamName = row.teamName
          	this.current.teamId = row.id
            this.current.status = row.status
          	this.current.groupId = row.groupId
          	this.current.principalId = row.principalId

          	this.get_staff_undistributed()
          	this.get_team_staff()
          }
        },


        get_group_list(){
	        this.$http.get(`group/get_customer_group_list`)
	        .then((data)=>{
	          if(data.code == '200'){
	            //this.groupList = data.data[0].groupVOList
	            let list = []
              let grouplist = []
	          

	            for(let i=0;i<data.data[0].groupVOList.length;i++){
                grouplist.push({groupId:data.data[0].groupVOList[i].groupId, groupName:data.data[0].groupVOList[i].groupName})


	              list.push({groupName:data.data[0].groupVOList[i].groupName, groupId:data.data[0].groupVOList[i].groupId})

	              if(data.data[0].groupVOList[i].groupVOList && data.data[0].groupVOList[i].groupVOList.length>0){

                  grouplist[grouplist.length-1]['groupVOList'] = []

	                for(let j=0;j<data.data[0].groupVOList[i].groupVOList.length;j++){


	                  this.diguidata(data.data[0].groupVOList[i].groupVOList[j],list,grouplist[grouplist.length-1]['groupVOList'])
	                }
	              }
	            } 

              this.groupList = grouplist



	            this.groupListname = list
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
      diguidata(groupVOList,list,grouplist){

        list.push({groupName: groupVOList.groupName, groupId:groupVOList.groupId})

        grouplist.push({groupId:groupVOList.groupId, groupName:groupVOList.groupName})


        //array.push(...groupVOList)
        if(groupVOList.groupVOList && groupVOList.groupVOList.length>0){
          grouplist[grouplist.length-1]['groupVOList'] = []
          //array[array.length-1].groupVOList = []
          for(let i=0;i<groupVOList.groupVOList.length;i++){
            this.diguidata(groupVOList.groupVOList[i],list,grouplist[grouplist.length-1]['groupVOList'])
          }
        }
        

      },

      get_customer_team(){
      	this.$http.post(`customer/get_customer_team`,{
      		ss: this.teamInfo
      	})
      	.then((data)=>{
      		if(data.code == '200'){
      			this.tableData = data.data
           
      			if(data.data.length){
      				this.current.teamName = data.data[0].teamName
      				this.current.teamId = data.data[0].id
      				this.current.groupId = data.data[0].groupId
      			}
      		} else {
              return this.$message({
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
      addteamok(){

      	if(!this.addteam.teamName || !this.addteam.groupId){
      		this.$message({
      			message:"请输入团队名称或者所属部门",
      			type:'warning'
      		})
      	}

      	this.$http.post(`customer/add_customer_team`,{
      		teamName: this.addteam.teamName,
      		groupId: this.addteam.groupId[this.addteam.groupId.length-1]
      	})
        .then((data)=>{
        	if(data.code == '200'){
        		this.$message({
        			message:'新增成功',
        			type:'success'
        		})
        		this.addteam.dialogVisible = false
        		this.get_customer_team()
        	}else{
        		this.$message({
        			message:data.msg,
        			type:'error'
        		})
        	}
        })
      },

      editteamshow(row){

      	this.editteam.id = row.id
      	this.editteam.teamName = row.teamName
      	this.editteam.groupId = row.groupId

      	this.editteam.dialogVisible = true
      },
      edit_team_status(row){
      	//console.info(row)

      	this.$http.get(`customer/edit_team_status?teamId=${row.id}&status=${row.status}`)
      	.then((data)=>{
      		if(data.code == '200'){
      			this.$message({
      				message:'修改成功',
      				type:'success'
      			})

      			//this.get_customer_team()
      		} else {
              return this.$message({
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

      editteamok(){
      	if(!this.editteam.teamName || !this.editteam.groupId){
      		this.$message({
      			message:"请输入团队名称或者所属部门",
      			type:'warning'
      		})
      	}

      	if(typeof(this.editteam.groupId) == 'object'){
      		this.editteam.groupId = this.editteam.groupId[this.editteam.groupId.length-1]
      	}
      	//let type = typeof(this.editteam.groupId)


      	//console.info(this.editteam.groupId)


      	this.$http.post(`customer/edit_customer_team`,{
      		teamId: this.editteam.id,
      		groupId: this.editteam.groupId,
      		teamName: this.editteam.teamName,
      	})
      	.then((data)=>{
      		if(data.code == '200'){
      			this.$message({
      				message:'修改成功',
      				type:'success'
      			})

      			this.editteam.dialogVisible = false
      			this.get_customer_team()
      		} else {
              return this.$message({
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

      //查询未分配客服列表
      get_staff_undistributed(){
      	this.$http.post(`customer/get_staff_undistributed`,{
      		groupId: this.current.groupId,
      		staffName: this.non_team_member
      	})
      	.then((data)=>{
      		if(data.code == '200'){
      			let list = []
      			if(data.data.length){
      				
      				for(let i=0;i<data.data.length;i++){
      					list.push({staffId:data.data[i].id, staffName:data.data[i].staffName, active:false, show:false})

      				}
      				

      			}
      			this.non_teamlist = list
      			

      			
      			//this.non_teamlist = data.data
      		} else {
              return this.$message({
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

      addteamshow(){

        this.addteam.teamName = ''

        this.addteam.groupId = ''

        this.addteam.dialogVisible = true
      },

      get_team_staff(){
      	this.$http.post(`customer/get_team_staff`,{
      		teamId: this.current.teamId,
      		staffName: this.team_member
      	})

      	.then((data)=>{
      		//console.info(data)
      		if(data.code == '200'){
      			let list = []
      			if(data.data.length){
      				
      				for(let i=0;i<data.data.length;i++){
      					list.push({staffId:data.data[i].id, staffName:data.data[i].staffName, active:false, show:false, principalId: data.data[i].principalId})

      				}
      				

      			}
      			this.teamlist = list
      		} else {
              return this.$message({
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

      chooserow1(index){
      	//console.info(index)

      	for(let i=0;i<this.teamlist.length;i++){
      		this.teamlist[i].active = false
      	}
      	this.teamlist[index].active = true
      	this.current.teamstaffId = this.teamlist[index].staffId
      },

      chooserow2(index){
      	//console.info(index)

      	for(let i=0;i<this.non_teamlist.length;i++){
      		this.non_teamlist[i].active = false
      	}
      	this.non_teamlist[index].active = true
      	this.current.non_staffId = this.non_teamlist[index].staffId

      },

      add_team_memeber(){
      	//console.info(this.current.non_staffId)
        if(this.current.status == 2){
          return this.$message({
            message:'该团队已关闭',
            type:'warning'
          })
        }
      	if(!this.current.non_staffId){
      		return this.$message({
      			message:'请选择要添加的成员',
      			type:'warning'
      		})
      	}

      	this.$http.get(`customer/add_team_staff?teamId=${this.current.teamId}&staffId=${this.current.non_staffId}`)
      	.then((data)=>{
      		if(data.code == '200'){
      			//console.info(data)
            this.current.non_staffId = ''
      			this.get_team_staff()
      			this.get_staff_undistributed()
      		} else {
              return this.$message({
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

      del_team_staff(){
        if(this.current.status == 2){
          return this.$message({
            message:'该团队已关闭',
            type:'warning'
          })
        }
      	if(!this.current.teamstaffId){
      		return this.$message({
      			message:'请选择移除的成员',
      			type:'warning'
      		})
      	}

      	this.$http.get(`customer/del_team_staff?teamId=${this.current.teamId}&staffId=${this.current.teamstaffId}`)
      	.then((data)=>{
      		if(data.code == '200'){
      			this.current.teamstaffId = ''
      			this.get_team_staff()
      			this.get_staff_undistributed()
      		} else {
              return this.$message({
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

      set_principal_div(index){
      	for(let i=0;i<this.teamlist.length;i++){
      		this.teamlist[i].show = false
      	}

      	this.teamlist[index].show = true
      },

      set_principal(list){

      	this.$http.get(`customer/set_principal?teamId=${this.current.teamId}&staffId=${list.staffId}`)
      	.then((data)=>{
      		if(data.code == '200'){
      			
      			this.get_team_staff()
      			//this.get_staff_undistributed()
      		} else {
              return this.$message({
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

      del_principal(list){
      	this.$http.get(`customer/del_principal?teamId=${this.current.teamId}&staffId=${list.staffId}`)
      	.then((data)=>{
      		if(data.code == '200'){
      			
      			this.get_team_staff()
      			//this.get_staff_undistributed()
      		} else {
              return this.$message({
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


      add_customer_staff(){
        this.$http(`group/add_customer_staff`)
        .then((data)=>{
          if(data.code == '200'){
            
          } else {
              return this.$message({
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

.staff_mang {
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
        align-items:center;


        .searchicon{
        	position:absolute;
        	right: 8px;
        	top: 49px;
        	font-size: 24px;
        	color:#C0C4CC;
        	cursor: pointer;
        }

        .top_style{
	        background-color:#3f3f3f;
	        color: #fff;
	        height: 46px;
	        line-height:46px;
	        font-weight: 700;
	        text-align: center;
	        //width: calc(100% - 17px);
	      }

    .left_div{
      width: 60%;
     
      height: 100%;
      


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

    .operate_div{
    	width: 85px;
 
    }

    .medile_div{
    	margin-left: 30px;
    	position:relative;
    	width: 20%;
    	border: 1px solid #c8c8c8;

    	.content{
    		height: calc(100vh - 283px);
    		
    		overflow-y: auto;

    		.heilight{
    			background-color:#eee;
    		}

    		.leader{
    			color:rgb(244, 234, 42) !important;
    		}
            .mem_class{
            	position: absolute;
            	left: 20px;
            	color: rgb(188, 188, 188)
            }
    		


    		table{
    			width: 100%;

    			tr{
    				height: 36px;
    				line-height: 36px;

    				td{
    					text-align: center;
    					border-bottom: 1px solid #ececec;
    					cursor: pointer;
    					position:relative;


		                &:hover{
		                  background-color:#eee;
		                }

		                ul{
		                	li{
		                		&:hover{
		                			background-color:#eee;
		                		}
		                	}
		                }
    				}
    			}
    		}


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
    }

    .right_div{
    	margin-left: 0px;
    	width: 20%;
    	
    }







      






    

	}
}

</style>


