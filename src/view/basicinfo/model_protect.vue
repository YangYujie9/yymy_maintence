<template>
	<div class="model_protect">
		<div class="model_protect_top">
			<el-button class="btn_style" style="position: absolute;right: 20px;"@click="add_model_Visible = true">新增模特</el-button>
		</div>
		<div class="model_protect_content" ref="table_warp">
			<el-table
	  	    	:data="tableData"
		  	    :height="tableheight"
		        :header-cell-style='{"background": "#3f3f3f",
		            "border-right": "1px solid #cecece",
		            "color": "#ffffff"}'      	
	  	    	style="width: 100%;border-left: 1px solid #c9c9c9;border-right:  1px solid #c9c9c9">
	        	<el-table-column
		            prop="id"
		            label="序号"
		            width="100"
		            align="center">
	        	</el-table-column>
	        	<el-table-column
		            prop="index"
		            label="图片"
		            align="center">
	        	</el-table-column>
	        	<el-table-column
		            prop="modelName"
		            label="模特姓名"
		            align="center">
	        	</el-table-column>
	        	<el-table-column
		            prop="brands"
		            label="品牌"
		            align="center">
		            <template slot-scope="scope">
		            	{{getbrandstatus(scope.row.brands)}}		                    
		            </template>
	        	</el-table-column>	        	
	        	
	        	<el-table-column
		            prop="rules"
		            label="规则"
		            align="center">
	        	</el-table-column>
	        	<el-table-column
		            prop="index"
		            label="编辑"
		            align="center">
		            <template slot-scope="scope">                         
              			<i class="iconfont iconbianji icon_class" @click="edit_model_show(scope.row)"></i>
                    
            		</template>
	        	</el-table-column>
	        	<el-table-column
		            prop="index"
		            label="删除"
		            align="center">
		            <template slot-scope="scope"> 

						  	<i class="el-icon-delete" @click="delete_model(scope.row)"></i>
                    
            		</template>
		            
	        	</el-table-column>
	        </el-table>

	        

	        <el-dialog
				title="新增模特"
				:visible.sync="add_model_Visible"
				width="500px">
				<p class="input-p">
					<span class="demonstration">模特姓名：</span>
				    <el-input class="input-input" v-model="add_model_buffer.Name" placeholder="请输入模特姓名" ></el-input>
			    </p>
			    <p class="input-p">
          			<span >品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;牌：</span>
          

		          	<el-select class="input-input" v-model="add_model_buffer.brands" multiple collapse-tags placeholder="请选择品牌">
			            <el-option
			              v-for="item in getbrand"
			              :key="item.dicCode"
			              :label="item.dicName"
			              :value="item.dicCode">
			            </el-option>
		          	</el-select>
          
        		</p>
        		<span style="position: absolute;right: 85px;top:220px" @click="addTable"><i class="el-icon-plus"></i></span>
        		<p  v-for="(list,index) in add_model_buffer.rules" :key="index" class="input-p">
					<span class="demonstration">规&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;则{{index+1}}：</span>
				    <el-input  class="input-input" v-model="list.name" placeholder="请输入规则" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-input><!-- maxlength="2" show-word-limit -->
				    <span v-if="index!=0" style="position: relative;left: 10px" @click="addTable"><i class="el-icon-plus"></i></span>	
				    <span v-if="index!=0" style="position: relative;left: 20px" @click="deleteTable(index)" ><i class="el-icon-minus"></i></span>				    
			    </p>
				
				<span slot="footer" class="dialog-footer">
			    	<el-button @click="add_model_Visible = false">取 消</el-button>
			    	<el-button type="primary" @click="add_model">确 定</el-button>
			  	</span>
			</el-dialog>

			<el-dialog
				title="编辑模特"
				:visible.sync="edit_model_Visible"
				width="500px">
				<p class="input-p">
					<span class="demonstration">模特姓名：</span>
				    <el-input class="input-input" v-model="edit_model_buffer.Name" placeholder="请输入模特姓名" ></el-input>
			    </p>
			    <p class="input-p">
          			<span >品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;牌：</span>
          

		          	<el-select class="input-input" v-model="edit_model_buffer.brands" multiple collapse-tags placeholder="请选择品牌">
			            <el-option
			              v-for="item in getbrand"
			              :key="item.dicCode"
			              :label="item.dicName"
			              :value="item.dicCode">
			            </el-option>
		          	</el-select>
          
        		</p>
        		<span style="position: absolute;right: 85px;top:220px" @click="addTable2"><i class="el-icon-plus"></i></span>
        		<p v-for="(list,index) in edit_model_buffer.rules" :key="index" class="input-p">
					<span class="demonstration">规&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;则{{index+1}}：</span>
				    <el-input class="input-input"    v-model="list.name" placeholder="请输入规则" ></el-input><!-- maxlength="2" show-word-limit -->
				    <span v-if="index!=0" style="position: relative;left: 10px" @click="addTable2"><i class="el-icon-plus"></i></span>	
				    <span v-if="index!=0" style="position: relative;left: 20px" @click="deleteTable2(index)" ><i class="el-icon-minus"></i></span>
			    </p>

				<span slot="footer" class="dialog-footer">
			    	<el-button @click="edit_model_Visible = false">取 消</el-button>
			    	<el-button type="primary" @click="edit_model">确 定</el-button>
			  	</span>
			</el-dialog>
		</div>
		
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	export default{
		data(){
			return{
				tableData:[],
				tableheight:500,
				add_model_Visible:false,
				add_model_buffer:{
					Name:'',
					brands:'',
					rules:[{
						name: ''
					}],
				},
				edit_model_Visible:false,
				edit_model_buffer:{
					Name:'',
					brands:'',
					rules:[{
						name:''
					}],
					id:'',
				},
				delete_model_Visible:false,
			}
		},
		mounted(){
			this.$nextTick(()=>{
        		this.tableheight = this.$refs.table_warp.offsetHeight - 20
      		})
			this.get_model_data()
		},
		computed: {
			...mapGetters([
            	'getpageDict',
        	]),
        	getbrand() {
	            let demand_status = this.getpageDict.filter((list) => {
	                return list.dicType == "brand"
	            })
	            //console.info(demand_status[0].dicList)
	            return demand_status[0].dicList
	        },
		},
		methods: {
			getbrandstatus(type) {
		        

		        let name = []
		        for (let i=0;i<this.getbrand.length;i++) {

			        for(let j=0;j<type.length;j++){
			        	if (this.getbrand[i].dicCode == type[j]) {

				            name.push(this.getbrand[i].dicName) 

				            
			        	}
			        }
		          
		        }

		        return name.join(',')
		    },
		    addTable(){
		    	this.add_model_buffer.rules.push({
		    		name: ''
		    	})
		    },
		    deleteTable(index){
		    	this.add_model_buffer.rules.splice(index,1)

		    },
		    addTable2(){
		    	this.edit_model_buffer.rules.push({
		    		name: ''
		    	})
		    },
		    deleteTable2(index){
		    	this.edit_model_buffer.rules.splice(index,1)

		    },
			get_model_data(){
				this.$http.post(`model/find_model`,{
		        	
		        })
          		.then((data)=>{
          			let list = []

          			for(let i=0;i<data.data.length;i++){
          				list.push({id: data.data[i].id,modelName:data.data[i].modelName})
          				list[i].brands = []
          				list[i].rules = []
          				for(let j=0;j<data.data[i].brandList.length;j++){

          					list[i].brands.push(data.data[i].brandList[j].id)
          					
          				}
          				//list[i].brands=list[i].brands.length?list[i].brands.toString():''

          				for(let k=0;k<data.data[i].ruleList.length;k++){
          					
          					list[i].rules.push(data.data[i].ruleList[k].rules)
          					
          				}
          				list[i].rules=list[i].rules.length>1?list[i].rules.join(','):list[i].rules

						
          				
          			}
          			
            		this.tableData = list
            		//console.info(this.tableData)

          		})
          		.catch(()=>{
              		this.$message({
		                message: '接口报错',
		                type: 'error'
	              	})
          		})
			},
			add_model(){

				let r = []
				for(let i=0;i<this.add_model_buffer.rules.length;i++){
					r.push(this.add_model_buffer.rules[i].name)
				}
				//console.info(r)
				if(this.add_model_buffer.Name==''||this.add_model_buffer.brands==''||r==''){
					this.$message({
		                message: '数据项不能为空,请检查后重新输入！',
		                type: 'error'
	              	})
	              	return
				}
				
				this.$http.post(`model/add_model`,{       			
		            modelName:this.add_model_buffer.Name,
		            brandIds: this.add_model_buffer.brands.join(','),		           
		            rules: r.join(','),
	            
	          	})
	          	.then((data)=>{
	          		this.add_model_Visible=false
	          		this.add_model_buffer.Name=''
	          		this.add_model_buffer.brands=''
	          		this.add_model_buffer.rules=[{name:''}] 	          		
	          		

	          		//console.info(this.add_model_buffer.rules)
	          		this.get_model_data()
	          	})
	          	.catch(()=>{
	          		this.$message({
		                message: '接口报错',
		                type: 'error'
	              	})
	          	})
			},
			edit_model_show(list){				
				
				
				this.edit_model_buffer.Name=list.modelName
				this.edit_model_buffer.brands=list.brands
				
				this.edit_model_buffer.id=list.id
				this.edit_model_Visible=true
				//console.info(list.rules)

				let r =[]
				if(list.rules.length>1){
					r=list.rules.split(",")
				}
				else{
					r=list.rules
				}
				
				//console.info(r)
				this.edit_model_buffer.rules.length=0
				for(let i=0;i<r.length;i++){
					this.edit_model_buffer.rules.push({name: r[i]})
				}
				//console.info(this.edit_model_buffer.rules)

			},
			edit_model(){
				let r = []
				for(let i=0;i<this.edit_model_buffer.rules.length;i++){
					r.push(this.edit_model_buffer.rules[i].name)
				}

				if(this.edit_model_buffer.Name==''||this.edit_model_buffer.brands==''||r==''){
					this.$message({
		                message: '数据项不能为空,请检查后重新输入！',
		                type: 'error'
	              	})
	              	return
				}
				this.$http.post(`model/edit_model`,{       			
		            modelName:this.edit_model_buffer.Name,
		            brandIds: this.edit_model_buffer.brands.join(','),		           
		            rules: r.join(','),
		            id: this.edit_model_buffer.id,
	            
	          	})
	          	.then((data)=>{
	          		this.edit_model_Visible=false
	          		this.edit_model_buffer.Name=''
	          		this.edit_model_buffer.brands=''
	          		this.edit_model_buffer.rules=[{name:''}]
	          		this.edit_model_buffer.id=''

	          		this.get_model_data()
	          	})
	          	.catch(()=>{
	          		this.$message({
		                message: '接口报错',
		                type: 'error'
	              	})
	          	})
			},
			delete_model(list){
				this.$http.post(`model/del_model`,{       			
		            id:list.id,
	            
	          	})
	          	.then((data)=>{
	          		this.delete_model_Visible=false
	          		this.get_model_data()
	          	})
	          	.catch(()=>{
	          		this.$message({
		                message: '接口报错',
		                type: 'error'
	              	})
	          	})
			},
			
		},
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
<style scoped lang="less">
	.model_protect{
		//height: calc(100vh - 120px);
		//position: relative;
		margin: 10px 20px;
		&_top{
			height:50px;        
			padding-bottom: 20px;
			border-bottom: 1px solid #c9c9c9;
			//background-color:red;

			.btn_style{
			    background-color: rgb(140, 206, 173);
			    color: #fff; 
			}
		}
		&_content{
			height: calc(100vh - 195px);
			margin-top: 10px;
			position:relative;
			width: 100%;
			//background-color:red
		}
	}
</style>