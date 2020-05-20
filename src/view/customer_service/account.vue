<template>
  <div class="account_detail">

    <div class="account_detail_warp">
      <div class="search">
        <el-button class="monbtn cursor" style="width: 180px;font-weight: bold;cursor: pointer;">{{activeName}} 
        	<el-date-picker v-model="activedate" type="date" placeholder="选择日期" class="inpucus cursor" @change="changedate">
        	</el-date-picker>
        </el-button>
        <p style="display: inline-block;margin-left: 20px;">
        	<el-input v-model="shopNum" placeholder="请输入店铺编码"></el-input>
        </p>
        <el-button class="monbtn" @click="get_compose_shop">搜索</el-button>

      </div>

      <div class="content">
        <div class="left-team">
          <div class="top_style">排班组</div>
          <div class="team_content">
            <table style="width: 100%">
              <tr v-for="(list,index) in compose_list"> 
                <td style="position: relative;" @click="choosecompose(index)" :class="{choosetype:list.choose}">{{list.composeName}}</td>

              </tr>


            </table>
            
          </div>
          

        </div>

        <div class="right_content_warp">
        	<div class="shop_warp" v-for="(list,index) in table_data">
        		<div class="title">
        			<p>店铺名称：{{list.shopNum}}</p>
        			<p>日期：{{fmtDate(list.data)}}</p>
        			<p>星期：{{list.week}}</p>
        			<i class="iconfont iconxinzengke icon_add" @click="get_compose_staff(list)"></i>
        		</div>
        		<div style="width: 100%;">
        			<table cellpadding="0" cellspacing="0">
        				<tr class="top_style">
        					<th style="width:140px;">姓名</th>
        					<th>团队名称</th>
        					<th style="width:120px;">班次</th>
        					<th>旺旺账号</th>
        					<th style="border:0px;">操作</th>
        				</tr>
        				<tr v-for="(list1,index1) in list.list" v-show="!list.more|| (list.more && index1<5)">
        					<td>{{list1.staffName}}</td>
        					<td>{{list1.teamName}}</td>
        					<td>{{get_compose_type(list1.classesId)}}</td>
        					<td>{{list1.shopWw}}</td>
        					<td width="180">
        						<i @click="get_ww(list.shopId,list1.id,index,'edit')" class="iconfont iconbianji icon_class" style="color:rgb(47, 163, 224)"></i>
        						<el-divider direction="vertical"></el-divider>
        						<i @click="get_ww(list.shopId,list1.id,index,'add')" class="iconfont iconxinzeng icon_class" style="color:rgb(45, 166, 24)"></i>
        						<el-divider direction="vertical"></el-divider>
        						<i @click="del_shop_staff(list1.id,index)" class="iconfont iconshanchu icon_class" style="color:rgb(226, 129, 89)"></i>
        					</td>
        				</tr>
        			</table>
        		</div>

        		<div class="more_class" v-if="list.list.length>5">
        			<i class="iconfont iconxiala3 icon_class more" v-show="list.more" @click="list.more = !list.more"></i>
        			<i class="iconfont iconshangla2 icon_class more" v-show="!list.more"  @click="list.more = !list.more"></i>
        		</div>

        		<div class="more_class" v-if="list.list.length<6">

        		</div>
        	</div>


        </div>

      </div>


      </div>


    <el-dialog
      title="添加人员"
      :visible.sync="staffdialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="500px">
      <div class="staff_warp">
        <div class="singal_div" v-for="(item,index) in staff_list">
        	<div class="top_style" style="height: 30px;line-height: 30px;">{{get_compose_type(item.classesId)}}班人员</div>
        	<div class="bottom_warp">
	        	<table>
	        		<tr v-for="(list,index1) in item.list">
	        			<td :class="{'choosetype':list.choose}" @click="choose_staff(index,index1)">{{list.staffName}}</td>
	        		</tr>
	        	</table>
        	</div>
        </div>



      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="staffdialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="add_compose_shop" size="mini">添 加</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="编辑旺旺账号"
      :visible.sync="ww.dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="500px">
      <div class="">
        <p v-if="dayww_list" class="input_p"><span>旺旺账号-白:</span>
        	<el-select v-model="ww.day" placeholder="请选择旺旺账号" :disabled="ww.night?true:false" clearable filterable>
        	   <el-option v-for="list in dayww_list"
        	    :key="list.wwId"
        	    :label="list.shopWw"
        	    :value="list.wwId">
        	   </el-option>
            </el-select>
        </p>

        <p v-if="nightww_list" class="input_p"><span>旺旺账号-晚:</span>
        	<el-select v-model="ww.night" placeholder="请选择旺旺账号" :disabled="ww.day?true:false" clearable filterable>
        	   <el-option v-for="list in nightww_list"
        	    :key="list.wwId"
        	    :label="list.shopWw"
        	    :value="list.wwId">
        	   </el-option>
            </el-select>
        </p>



      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ww.dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="edit_compose_shop" size="mini">确 定</el-button>
      </span>
    </el-dialog>


    <el-dialog
      title="添加旺旺账号"
      :visible.sync="addww.dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="500px">
      <div class="">
        <p v-if="dayww_list" class="input_p"><span>旺旺账号-白:</span>
          <el-select v-model="addww.day" placeholder="请选择旺旺账号" :disabled="addww.night?true:false" clearable filterable>
             <el-option v-for="list in dayww_list"
              :key="list.wwId"
              :label="list.shopWw"
              :value="list.wwId">
             </el-option>
            </el-select>
        </p>

        <p v-if="nightww_list" class="input_p"><span>旺旺账号-晚:</span>
          <el-select v-model="addww.night" placeholder="请选择旺旺账号" :disabled="addww.day?true:false" clearable filterable>
             <el-option v-for="list in nightww_list"
              :key="list.wwId"
              :label="list.shopWw"
              :value="list.wwId">
             </el-option>
            </el-select>
        </p>



      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addww.dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="add_compose_shop_ww" size="mini">确 定</el-button>
      </span>
    </el-dialog>


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
      	compose_list:[],
      	current:{
      		composeId:'',
      		shopinfo:'',
      		add_staffIds:[],
      		id:'',
      		stutas:'',
      		index:''
      	},
      	table_data:[],
      	staff_list:[],
      	dayww_list:[],
        nightww_list:[],
        moredata:false,
      	staffdialogVisible:false,
      	ww:{
      		dialogVisible: false,
      		day:'',
      		night:'',
      	},
      	shopNum:'',
        addww:{
          dialogVisible: false,
          day:'',
          night:'',
        }

        
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
      }


    },


    created() {

    },
    mounted(){

    	this.get_compose_list()





      
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
	    get_compose_list(){
	        this.$http.get(`compose/get_compose_list`)
	        .then((data)=>{
	          if(data.code == '200'){
              if(data.data.length>0){
                let list = []
                for(let i=0;i<data.data.length;i++){
                  list.push({...data.data[i],choose:false})
                }

                this.compose_list = list

                this.compose_list[0].choose = true

                this.current.composeId = this.compose_list[0].id

                this.get_compose_shop()
                //this.get_compose_staff()
              }


	           
	          } else {
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

        changedate(){
    		this.get_compose_shop()
            //this.get_compose_staff()
        },
	    choosecompose(index){
	        for(let i=0;i<this.compose_list.length;i++){
	          this.compose_list[i].choose = false
	        }
	        

	        this.compose_list[index].choose = true
	        this.current.composeId = this.compose_list[index].id

	        this.get_compose_shop()

	    },

	    // get_compose_shop_by_time(){
	    // 	let time = this.activedate.getTime().toString().substr(0,10)

	    // 	this.$http.get(`compose/get_compose_shop_by_time?time=${time}&composeId=${this.current.composeId}`)
	    // 	.then((data)=>{
	    // 		this.table_data = []
	    // 		if(data.code == '200'){
	    // 			this.table_data = data.data

	    // 		}
	    // 	})
	    //     .catch(()=>{
	    //       this.$message({
	    //         message:'接口报错',
	    //         type:'error'
	    //       })
	    //     })
	    // },

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
      get_compose_staff(list){
      	this.current.shopinfo = list

        let year = new Date(this.activedate).getFullYear()

        let month = new Date(this.activedate).getMonth()

        let day = new Date(this.activedate).getDate()

        let time = new Date(year,month,day,0,0,0).getTime().toString().substr(0, 10)
      	
        //let time = this.activedate.getTime().toString().substr(0,10)

      	this.$http.get(`compose/get_compose_staff?time=${time}&composeId=${this.current.composeId}`)


  		.then((data)=>{
    		this.staff_list = []
    		
    		if(data.code == '200'){
    			let list = []

    			for(let i=0;i<data.data.length;i++){
    				list.push({classesId: data.data[i].classesId})

    				list[i]['list'] = []

    				for(let j=0;j<data.data[i].list.length;j++){
    					list[i]['list'].push({...data.data[i].list[j],choose:false})
 
    				}
    			}
    			this.staff_list = list
    			this.staffdialogVisible = true
    			
    			this.current.add_staffIds = []

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

      choose_staff(index,index1){

      	// for(let i=0;i<this.staff_list.length;i++){
      	// 	for(let j=0;j<this.staff_list[i].list.length;j++)
      	// 		this.staff_list[i].list[j].choose = false
      	// }
      	let choose = this.staff_list[index].list[index1].choose


      	this.staff_list[index].list[index1].choose = !choose
      	//this.current.add_staffIds.push(this.staff_list[index].list[index1].staffId)
      	 
      	


      },

      //添加成员 分配账号
      add_compose_shop(){

        //console.info(this.staff_list)

        for(let i=0;i<this.staff_list.length;i++){
          if(this.staff_list[i].list &&this.staff_list[i].list.length){
            for(let j=0;j<this.staff_list[i].list.length;j++){
              if(this.staff_list[i].list[j].choose){
                this.current.add_staffIds.push(this.staff_list[i].list[j].staffId)
              }
            }
          }
        }

      	//console.info(this.current.add_staffIds)
        //return
      	// console.info(this.current.shopinfo)
      	this.$http.post(`compose/add_compose_shop`,{
      		composeId: this.current.composeId,
    			shopId: this.current.shopinfo.shopId,
    			data: this.current.shopinfo.data,
    			
    			staffIds: this.current.add_staffIds.join(',')

      	})

      	.then((data)=>{
      		if(data.code == '200'){
      			this.staffdialogVisible = false
      			this.get_compose_shop()
      		}else {
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


      //删除单条店铺分配账号
      del_shop_staff(id,i){
      	this.current.index = i
      	this.current.stutas = this.table_data[i].more
        this.$confirm('确定删除该员工?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
	      	this.$http.get(`compose/del_compose_shop?id=${id}`)
	      	.then((data)=>{
	      		if(data.code == '200'){
	      			this.get_compose_shop()
	      		}else {
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
        }).catch(() => {
         
        });


      },

      get_compose_shop(){

        let year = new Date(this.activedate).getFullYear()

        let month = new Date(this.activedate).getMonth()

        let day = new Date(this.activedate).getDate()

        let time = new Date(year,month,day,0,0,0).getTime().toString().substr(0, 10)


      	//let time = this.activedate.getTime().toString().substr(0,10)
      	this.$http.post(`compose/get_compose_shop`,{
      		shopNum: this.shopNum,
      		data: time,
      		composeId: this.current.composeId,
      	})
      	.then((data)=>{
    		this.table_data = []
    		if(data.code == '200'){
          //console.info(data.data)

    			for(let i=0;i<data.data.length;i++){
    				data.data[i].more = false
            //console.info(data.data[i])
            data.data[i].arr = []
    				if(!data.data[i].list){

              data.data[i].list = []
            } else if(data.data[i].list && data.data[i].list.length>5){
              
             
              data.data[i].more = true

              // for(let j=0;j<data.data[i].list.length;j++){

              //   data.data[i].arr.push({...data.data[i].list[j]})
              // }
              
    					
    				}
    			}
    			
    			if(typeof(this.current.stutas)=='boolean'){
    				data.data[this.current.index].more = this.current.stutas
    				
    			}

          //


    			this.table_data = data.data
          //console.info(this.table_data)
    			this.current.stutas = ''
      	  this.current.index = ''

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

      edit_staff_ww(id){
      	
      	
      	//console.info(ww_list)

      },

      //查询剩余可用旺旺账号
      get_ww(shopId,id,i,type){

      	this.ww.day = ''
      	this.ww.night = ''
        this.addww.day = ''
        this.addww.night = ''

      	this.dayww_list = []
      	this.nightww_list = []


      	this.current.id = id
      	this.current.stutas = this.table_data[i].more
      	this.current.index = i

        let year = new Date(this.activedate).getFullYear()

        let month = new Date(this.activedate).getMonth()

        let day = new Date(this.activedate).getDate()

        let time = new Date(year,month,day,0,0,0).getTime().toString().substr(0, 10)

      	//let time = this.activedate.getTime().toString().substr(0,10)
        this.$http.get(`compose/get_ww?shopId=${shopId}&data=${time}`)
      	.then((data)=>{
      		if(data.code == '200'){
      			for(let i=0;i<data.data.length;i++){
      				if(data.data[i].shopClasses == 1){
      					this.dayww_list = data.data[i].list
      				}
      				else if(data.data[i].shopClasses == 2){
      					this.nightww_list = data.data[i].list
      				}
      			}
            if(type == 'edit'){
              this.ww.dialogVisible = true
            }
      			else if(type == 'add'){
              this.addww.dialogVisible = true
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

      edit_compose_shop(){
      	if(!this.ww.day && !this.ww.night){
      		return this.$message({
      			message:"请选择旺旺账号",
      			type:"warning"
      		})
      	}

      	let wwId = this.ww.day?this.ww.day:this.ww.night
      	//console.info(this.current.id)
      	this.$http.get(`compose/edit_compose_shop?id=${this.current.id}&wwId=${wwId}`)
      	.then((data)=>{
      		if(data.code == '200'){
      			this.ww.dialogVisible = false
      			this.get_compose_shop()
      			this.$message({
      				message:'修改成功',
      				type:'success'
      			})
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

      add_compose_shop_ww(){
        if(!this.addww.day && !this.addww.night){
          return this.$message({
            message:"请选择旺旺账号",
            type:"warning"
          })
        }

        let wwId = this.addww.day?this.addww.day:this.addww.night
        //console.info(this.current.id)
        this.$http.get(`compose/add_compose_shop_ww?id=${this.current.id}&wwId=${wwId}`)
        .then((data)=>{
          if(data.code == '200'){
            this.addww.dialogVisible = false
            this.get_compose_shop()
            this.$message({
              message:'修改成功',
              type:'success'
            })
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
        padding-left: 10px;
        padding-top: 10px;
        border-bottom: 1px solid #e2e2e2;
        display: flex;
        text-align: center;
        //background-color:red;





        .left-team{
          min-width: 220px;
          //background-color:blue;
          max-width: 220px;
          height: 100% ;
          .team_content{
            overflow-y: auto;
            height: calc(100vh - 277px);
            


            .choosetype{
              background-color: #eee;
            }
            .icon_class{
              font-size: 20px;
              position: absolute;
              right: 20px;
              //top: 3px;
              //margin-left: 20px;
              cursor: pointer;

              &:hover{
                color: rgba(0, 153, 255, 1)
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
            td{
              height: 40px;
              line-height: 40px;
              cursor: pointer;
              
              &:hover{
                background-color:#eee;
              }

            }
          }

          





        }
        .right_content_warp{
          margin-left: 10px;
          margin-right: 10px;
          //background-color:blue;
          //width: calc(100vw - 510px);
          width: 100%;
          height: 100%;
          padding:0 20px 20px 10px;
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

          .shop_warp{
          	border:1px solid rgb(121, 121, 121);
          	border-left:0px;
          	margin-bottom: 30px;


          	.title{
          		border-left:1px solid rgb(121, 121, 121);
          		font-size: 16px;
          		font-weight: 700;
          		height: 50px;
          		line-height: 50px;
          		text-align: left;
          		position:relative;

          		.icon_add{
          			position:absolute;
          			font-size: 50px;
          			cursor: pointer;
          			right: 20px;
          			color: #2aa515;
          		}

          		p{
          			margin-left: 20px;
          			display: inline-block;
          		}
          	}

            .icon_class{
              font-size: 20px;
              //position: absolute;
              //right: 20px;
              //top: 3px;
              //margin-left: 20px;
              cursor: pointer;
            }

      		table{
      			width: 100%;
      			border:none;
      			tr{
          			td{
          				height: 40px;
          				line-height: 40px;
          				position:relative;
          				border:none;
          			}
          			th{
          				border-right:1px solid rgb(175, 175, 175);
          			}
      			}

      		}

      		.more_class{
      			height: 30px;
      			line-height: 30px;
      			border-left:1px solid rgb(121, 121, 121);

      			.more{
      				color:rgb(192, 192, 192);

	              &:hover{
	                color: #6f716f;
	              }

      			}

      		}
          	

          }





        }
      }



    }

    .staff_warp{
		display: flex;
		height: 300px;
		justify-content:center;
    overflow-y: auto;

		.singal_div{
			width: 120px;
			margin-left: 2px;
			
			height: 100%;
			text-align: center;

			.choosetype{
				background-color:#eee;
			}
			.bottom_warp{
				width: 100%;
			}


			table{
				width: 100%;
				th{

				}
				td{
					height: 24px;
					line-height: 24px;
					cursor: pointer;
					&:hover{
						background-color:#eee;
					}
				}
			}
		}
	}
	.input_p{
		margin: 20px 0 0 20px;
		.input_class{
			margin-left: 10px;
			display: inline-block;
			width: 170px;
		}
	}




}
  
</style>