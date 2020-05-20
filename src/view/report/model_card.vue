<template>
	<div class="model_setting" ref="model_wrap">
		<div class="model_wrap">
			<div class="model_wrap_top_wrap">
				<div class="top">
					<p class="title">模特库</p>
					<el-input style="width: 280px;" v-model="wareId" placeholder="请输入货号或品类" @keyup.enter.native="search_model($event)" size="small">
						<i slot="prefix" class="el-input__icon el-icon-search" @click="find_model_detail"></i>
					</el-input>

				    <el-date-picker
				      v-model="datetime"
				      type="date"
				      style="margin-left: 20px;width: 160px;"
				      :picker-options = "pickerOptions"
				      placeholder="选择日期"
				       size="small"
				      @change="find_model_detail">
				    </el-date-picker>
					<div style="position: absolute;right: 0;bottom: 10px;color:#280253;display: flex;width: 360px;justify-content: space-between;">
						<p>总数：{{modelCount.count}}</p>
						<p>菲碧：{{modelCount.fbCount}}</p>
						<p>初彤：{{modelCount.ctCount}}</p>
						<p>形色：{{modelCount.xsCount}}</p>
					</div>
				</div>

				<div class="search" ref="search_wrap">
					<div class="departone">
						<div class="header">模特：</div>
						<div class="choose_div">
							<p v-for="(list,index) in model_list" >
								<span class="default_bt" :class="{active_bt: list.choose}" @click="choose_model(index)">{{list.modelName}}</span>
							</p>
						</div>
					</div>
					<div class="departone">
						<div class="header">品牌：</div>
						<div class="choose_div">
							<p v-for="(list,index) in shop_brand" >
								<span class="default_bt" :class="{active_bt: list.choose}" @click="choose_brand(index)">{{list.label}}</span>
							</p>
						</div>
					</div>
					
					<div class="departone" v-if="shop_list.length">
						<div class="header">店铺：</div>
						<div class="choose_div" >
							<p v-for="(list,index) in shop_list" >
								<span class="default_bt" :class="{active_bt: list.choose,disable_bt:!list.sellStatus}" @click="choose_shop(list,index)" style="padding:3px 15px;" >{{list.label}}</span>
							</p>
						</div>
						
					</div>
					
<!-- 					<div class="departone">
						<div class="header">品类：</div>
						<div class="choose_div">
							<p v-for="(list,index) in category_list" >
								<span class="default_bt" :class="{active_bt: list.choose}" @click="choose_category(index)">{{list.name}}</span>
							</p>
						</div>
					</div> -->
					<div class="departone" style="border-bottom: none;">
						<div class="header">时间：</div>
						<div class="choose_div">
							<p v-for="(list,index) in time_list" >
								<span class="default_bt" :class="{active_bt: list.choose}" @click="choose_time(index)">{{list.name}}</span>
							</p>

						</div>
					</div>
				</div>

				<div class="totle">
					<div class="single_totle one">
						<p class="p1">{{modelDetail.payQty}}</p>
						<p class="p2">总销量</p>
					</div>
					<div class="single_totle two">
						<p class="p1">{{modelDetail.cost}}</p>
						<p class="p2">总花费</p>
					</div>
					<div class="single_totle three3">
						<p class="p1">{{modelDetail.itemfavorQty}}</p>
						<p class="p2">加购数</p>
					</div>
					<div class="single_totle four">
						<p class="p1">{{modelDetail.payConversionRate.toFixed(2)}}%</p>
						<p class="p2">转化率</p>
					</div>
					<div class="single_totle five">
						<p class="p1">{{modelDetail.uv}}</p>
						<p class="p2">访客数</p>
					</div>
					
				</div>
			</div>

			<div class="model_wrap_content" :style="{height: content_height + 'px'}">
				<div class="single_model"  v-for="(list,index) in data_list">
					<div class="pic_div">
						<img class="img_class" :src="list.pic" >
					</div>

					<div class="data_wrap">
						<div class="flex_div">
							<p class="row1" style="flex-shrink: 0">
								<span>货号：</span>
								<span>{{list.wareId}}</span>
							</p>
							<p class="row1" style="flex-shrink: 0">
								<span>店铺：</span>
								<span>{{list.shopName}}</span>
								<span style="margin-left: 20px;">模特：</span>
								<span>{{list.modelName}}</span>
							</p>
	
							<p class="row1"  style="flex-shrink: 0">
								<span>销量：</span>
								<span>{{list.payQty}}</span>
								<span style="margin-left: 20px;">花费：</span>
								<span>{{list.cost}}</span>
							</p>


						</div>
						<div v-if="list.showmore"  class="flex_div">
							<p class="row1">
								<span>访客数：</span>
								<span>{{list.uv}}</span>
							</p>
							<p class="row1 row2">
								<span>加购数：</span>
								<span>{{list.itemfavorQty}}</span>
							</p>
							<p class="row1 row2">
								<span>转化率：</span>
								<span>{{list.payConversionRate}}</span>
							</p>
							<p class="row1 row2">
								<span>品类：</span>
								<span>{{list.category}}</span>
							</p>
<!-- 							<p class="row1 row2">
								<span>上新款：</span>
								<span>{{list.newUpdate}}</span>
							</p> -->
						</div>

						<i v-if="!list.showmore" class="iconfont icondown-hollow icon_class" @click="list.showmore=true"></i>
						<i v-if="list.showmore" class="iconfont iconxiala icon_class" @click="list.showmore=false"></i>
					</div>
				</div>

			</div>




		</div>


	</div>
</template>
<script >
	import { mapGetters } from 'vuex'
	export default{
		data(){
			return{
		      	pickerOptions:{
		      		disabledDate(time) {
		             return (time.getTime() > Date.now() - 24*60*60*1000) || (time.getTime() < Date.now() - 24*60*60*1000*15);
		          },
		      	},
				wareId: '',
				datetime:new Date(new Date().getTime() - 24*3600*1000),
				shop_brand: [],
				content_height: 100,
				modelCount:{
					count: 0,
					fbCount: 0,
					ctCount: 0,
					xsCount: 0
				},
				modelDetail: {
					cost: 0,
					itemfavorQty: 0,
					payConversionRate: 0,
					payQty: 0,
					uv: 0,
				},
				data_list:[],
				model_list: [],
				category_list: [{
					name: '上衣',
					choose: true,
				},{
					name: '连衣裙',
					choose: false,
				},{
					name: '半生裙',
					choose: false,
				},{
					name: '衬衫',
					choose: false,
				},{
					name: '裤子',
					choose: false,
				}],
				time_list: [{
					name: '近三天',
					time: new Date(new Date().getTime() - 24*3600*1000*3),
					choose: false,
				},{
					name: '近五天',
					time: new Date(new Date().getTime() - 24*3600*1000*5),
					choose: false,
				},{
					name: '近七天',
					time: new Date(new Date().getTime() - 24*3600*1000*7),
					choose: false,
				},{
					name: '近十五天',
					time: new Date(new Date().getTime() - 24*3600*1000*15),
					choose: false,
				}],



			}
			
		},
		created(){
			
		},

		mounted(){

			this.$nextTick(()=>{
				this.content_height = this.$refs.model_wrap.offsetHeight - this.$refs.search_wrap.offsetHeight - 295
			})

			this.find_model()
			this.get_shop_by_brand()
			this.find_model_detail()
			
		},
		computed:{
			...mapGetters([
	      
		      'userInfo',

		    ]),
		    shopIds() {
		    	let arr = []
		    	this.shop_list.forEach(key=>{
		    		if(key.choose) {
		    			arr.push(key.value)
		    		}
		    	})
		    	return arr.join()

		    },
		    modelIds() {
		    	let arr = []
		    	this.model_list.forEach(key=>{
		    		if(key.choose) {
		    			arr.push(key.id)
		    		}
		    	})
		    	return arr.join()
		    },

		    shop_list() {
		    	let arr = []
		    	this.shop_brand.forEach(brand=>{
		    		if(brand.choose && brand.children.length) {
		    			brand.children.forEach((shop,i)=>{
		    				arr.push({...shop})
		    			})
		    		}
		    	})
		    	return arr
		    },


		    time() {
		    	let t 
		    	this.time_list.forEach(time=>{
		    		if(time.choose) {
		    			t = time.time
		    		}
		    	})
		    	return t
		    }

		},
			
		methods:{

			show_more() {
				this.show = true

			},

			show_less() {
				this.show = false
			},

			choose_model(index) {
				// for(let i=0;i<this.model_list.length;i++) {
				// 	this.model_list[i].choose = false
				// }

				this.model_list[index].choose = !this.model_list[index].choose
				this.find_model_detail()
			},

			choose_brand(index){
				this.shop_brand[index].choose = !this.shop_brand[index].choose


		    	this.$nextTick(()=>{
		    		this.content_height = this.$refs.model_wrap.offsetHeight - this.$refs.search_wrap.offsetHeight - 260
		    	})

		    	
		    	

			},

			choose_shop(list,index) {
				if(list.sellStatus) {
					let choose = this.shop_list[index].choose

					this.shop_brand[list.brand_index].children[list.shop_index].choose = !choose

					this.find_model_detail()
				} else {
					return
				}
				
				

			},

			choose_category(index) {
				// for(let i=0;i<this.category_list.length;i++) {
				// 	this.category_list[i].choose = false
				// }

				this.category_list[index].choose = !this.category_list[index].choose

				this.find_model_detail()
			},

			choose_time(index) {
				this.datetime = ''
				for(let i=0;i<this.time_list.length;i++) {
					this.time_list[i].choose = false
				}

				this.time_list[index].choose = true

				this.find_model_detail()
			},

			search_model(event) {
				event.target.blur()
				this.find_model_detail()
			},

			find_model() {
				this.$http.post(`model/find_model`)
				.then((data)=>{
                  if(data.code == '200'){

                  	let arr = []

                  	for(let i=0;i<data.data.length;i++) {
                  		arr.push({
                  			id: data.data[i].id,
                  			modelName: data.data[i].modelName,
                  			choose: false
                  		})
                  	}

                  	this.model_list = arr



                    
                    
                  }else {
                    return this.$message({
                      message:data.msg,
                      type:'error'
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

			find_model_detail() {

				this.data_list = []

				let date = null

				let time = null

				if(this.datetime) {

		    		let year = new Date(this.datetime).getFullYear()

		    		let month = new Date(this.datetime).getMonth()

		    		let day = new Date(this.datetime).getDate()

		    		date = new Date(year,month,day,0,0,0)

		    		
					for(let i=0;i<this.time_list.length;i++) {
						this.time_list[i].choose = false
					}	
				}


				if(this.time) {

		    		let year1 = new Date(this.time).getFullYear()

		    		let month1 = new Date(this.time).getMonth()

		    		let day1 = new Date(this.time).getDate()

		    		time = new Date(year1,month1,day1,0,0,0)		
				}


				
				this.$http.post(`drive/find_model_detail_data`,{
					wareId: this.wareId,
					shopIds: this.shopIds,
					modelIds: this.modelIds,
					time: time? time.getTime().toString().substr(0,10): '',
					date: date? date.getTime().toString().substr(0,10): ''
				})
				.then((data)=>{
                  if(data.code == '200'){

                  	this.modelCount.count = data.data.count
                  	this.modelCount.ctCount = data.data.ctCount
                  	this.modelCount.fbCount = data.data.fbCount
                  	this.modelCount.xsCount = data.data.xsCount

                  	this.modelDetail.cost = data.data.modelDetailVO.cost
                  	this.modelDetail.itemfavorQty = data.data.modelDetailVO.itemfavorQty
                  	this.modelDetail.payConversionRate = data.data.modelDetailVO.payConversionRate? data.data.modelDetailVO.payConversionRate:0
                  	this.modelDetail.payQty = data.data.modelDetailVO.payQty
                  	this.modelDetail.uv = data.data.modelDetailVO.uv

                  	let list = []

                  	for(let i=0;i<data.data.list.length;i++) {
                  		list.push({...data.data.list[i], showmore:false})
                  	}

                  	this.data_list = list






                    
                    
                  }else {
                    return this.$message({
                      message:data.msg,
                      type:'error'
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


	    	get_shop_by_brand() {
	    		this.$http.get(`shop/get_shop_by_brand?brandId=`)
	                .then((data)=>{
	                	let arr = []

	                	for(let i=0;i<data.data.length;i++) {
	                		if(data.data[i].id !== 4) {
	                			arr.push({
		                			value: data.data[i].id,
		            				label: data.data[i].brandName,
		            				choose: false
		                		})

		                		if(data.data[i].list && data.data[i].list.length) {
		                			arr[arr.length - 1].children = []
		                			for(let j=0;j<data.data[i].list.length;j++) {
		                				if(data.data[i].list[j].sellStatus) {
			                				arr[arr.length - 1].children.push({
				                				value: data.data[i].list[j].id,
			              						label: data.data[i].list[j].shopNum,
			              						choose: false,
			              						sellStatus: data.data[i].list[j].sellStatus,
			              						brand_index: arr.length - 1,
			              						shop_index: j
			                				})
		                				}

		                			}
		                		}
	                		}
	                	}


	                	this.shop_brand = arr

	                    
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
<style lang="less">
	.choose_div {

		.el-input__inner {
			background-color: #f6f6f7 !important;
		}
		.is-checkeda {
		  border: 1px solid #67c23a !important;
		  background-color: rgb(140, 206, 173) !important;
		  //color: #67c23a !important;
		}
		.el-checkbox-button, .el-checkbox-button__inner {
			margin-bottom: 4px;
			background-color: #f6f6f7 !important;
		}
	}
	
</style>
<style scoped lang="less">
	.model_setting {
    	height: calc(100vh - 65px);
    	//width: 90%;
    	margin: 0 auto;
    	padding-top: 20px;
    	background-color:#f6f6f7;


    	.model_wrap {
			position:relative;
			max-width: 1480px;
			//min-width: 1200px;
			margin: 0 auto;
			


	    	&_top_wrap {
	    		padding: 0 4%;
	    		
	    	

				.top {
					margin-bottom: 20px;
					position:relative;
					

					.title {
						font-family:STHupo,STKaiti;
						font-size: 34px;
						text-align: center;
						//color: #fff;
						font-weight: bold;
						//margin-bottom: 28px;
					}
				}

				.search {
					padding:0 5%;

					border: 1px solid #d7d7d7;
					padding:10px 20px;
					box-shadow:0 2px 12px 0 rgba(0,0,0,.1);
					margin-bottom: 20px;
					//background-color: red;

					.departone {
						
						//height: 50px;
						line-height: 35px;
						display: flex;


						.header {
							width: 60px;
							color: #999999;
							flex-shrink:0;
						}

						.choose_div {
							flex: 1;
							display: flex;
							flex-wrap:wrap;
							position:relative;


							.default_bt {
								padding: 3px 20px;
								cursor: pointer;

							}

							.active_bt {
								
								border-radius: 50px;
								background:rgb(140, 206, 173);//linear-gradient(to right, #125bff 0, #2196F3 100%);
							}

							.disable_bt {
								border-radius: 50px;
								background:#e6e2e2;
							}

						}

					}
				}

				.totle {
					display: flex;
					height: 100px;


					.single_totle {
						
						width: 20%;
						border-radius:5px;
						background: url("../../assets/model_top.png") no-repeat ;
						margin-left: 2%;
						text-align: center;

						.p1 {
							font-weight: 700;
							font-size: 1.7rem;
							margin-top: 20px;
						}

						.p2 {
							font-size: 0.9rem;
							margin-top: 3px;
						}

					}

					.one {
						background-color: #F3E2D4;
						color: #5C1809;
						margin-left: 0;

					}

					.two {
						background-color: #DAE7F5;
						color: #00224A;
					}

					.three3 {
						background-color: #e7e5f0;
						color: #280253;
					}

					.four {
						background-color: #d2eae9;
						color: #043230;
					}

					.five {
						background-color: #f5ebd7;
						color: #4E3400;
					}
				}
			}

			&_content {
				height: calc(100vh - 524px);
				padding:0 2%;
				overflow-y: scroll; 
				margin-top: 20px;
				display: flex;
				flex-wrap: wrap;
				margin-right: 2%;
				font-size: 0.9rem;


				.single_model {
					
					width: 18%;
					//min-width: 223px;
					margin-bottom: 20px;
					margin-left: 2%;
					
					border-radius:10px;
					//display: inline-block;

					.pic_div {

						height: 180px;
						width: 100%;
						padding: 20px 30px;
						border-radius: 10px 10px 0 0;
						background-color:#edf1f5;


						.img_class {
							object-fit: cover;
							height: 100%;
							width: 100%;
							filter: drop-shadow(5px 5px 5px rgba(0,0,0,.5));
						}
					}


					.data_wrap {
						background-color: #ffffff9c;
						border-radius: 0 0px 10px 10px;
						padding:10px;
						position:relative;

						.icon_class {
							color: blue;
							position: absolute;
							right: 10px;
							bottom:15px;
							cursor: pointer;
						}

						.flex_div {
							display: flex;
							flex-wrap: wrap;
							text-align: center;

							.row1 {
								//display: flex;
								text-align: center;
								padding:0 10px;
								line-height: 28px;
								//width: 50%;
								//margin-right: 20px;
								

								.p1 {
									width: 64px;
									flex-shrink:0;

								}
							}
						}
						


					}
				}
			}	
    	}
	    	
	}

</style>