<template>
	<div class="model_setting">
		<div class="model_setting_top">
			<p class="title">模特库</p>
			<el-input style="width: 400px;" prefix-icon="el-icon-search">
				<el-button slot="append" style="color: #333333">搜索</el-button>
			</el-input>
		</div>
		<div class="model_setting_search">
			<div class="departone">
				<div class="header">模特：</div>
				<div class="choose_div">
					<p v-for="(list,index) in model_list" >
						<span class="default_bt" :class="{active_bt: list.choose}" @click="choose_model(index)">{{list.name}}</span>
					</p>
				</div>
			</div>
			<div class="departone">
				<div class="header">店铺：</div>
				<div class="choose_div">
					<p v-for="(list,index) in shop_list" >
						<span class="default_bt" :class="{active_bt: list.choose}" @click="choose_shop(index)">{{list.name}}</span>
					</p>
				</div>
			</div>
			<div class="departone">
				<div class="header">品类：</div>
				<div class="choose_div">
					<p v-for="(list,index) in category_list" >
						<span class="default_bt" :class="{active_bt: list.choose}" @click="choose_category(index)">{{list.name}}</span>
					</p>
				</div>
			</div>
			<div class="departone" style="border-bottom: none;">
				<div class="header">时间：</div>
				<div class="choose_div">
					<p v-for="(list,index) in time_list" >
						<span class="default_bt" :class="{active_bt: list.choose}" @click="choose_time(index)">{{list.name}}</span>
					</p>
				</div>
			</div>


		</div>
		<div class="model_setting_wrap">
			<div class="single_model" v-for="item in 3">
				<div class="pic_div">
					<img src="http://yy-data.oss-cn-beijing.aliyuncs.com/1583565066497-img-BB201v10249p4010.png">
				</div>
				<div class="content_wrap">
					<div class="one" style="width: 31%;margin-left: 0;">
						<div class="one_wrap" style="">
							<p class="p1">货&nbsp;&nbsp;&nbsp;号：</p>
							<p class="p2">FA201x00312p1070</p>
						</div>
						<div  class="one_wrap">
							<p class="p1">销&nbsp;&nbsp;&nbsp;量：</p>
							<p class="p2">1350</p>
						</div>
						<div  class="one_wrap">
							<p class="p1">加购数：</p>
							<p class="p2">1350</p>
						</div>
					</div>
					<div class="one">
						<div class="one_wrap">
							<p class="p1">店&nbsp;&nbsp;&nbsp;铺：</p>
							<p class="p2">k1</p>
						</div>
						<div  class="one_wrap">
							<p class="p1">花&nbsp;&nbsp;&nbsp;费：</p>
							<p class="p2">1350</p>
						</div>
						<div  class="one_wrap">
							<p class="p1">转化率：</p>
							<p class="p2">1350</p>
						</div>
					</div>
					<div class="one">
						<div class="one_wrap">
							<p class="p1">模&nbsp;&nbsp;&nbsp;特：</p>
							<p class="p2">新窝</p>
						</div>
						<div  class="one_wrap">
							<p class="p1">访客数：</p>
							<p class="p2">1350</p>
						</div>
						<div  class="one_wrap">
							<p class="p1">品&nbsp;&nbsp;&nbsp;类：</p>
							<p class="p2">上衣</p>
						</div>
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
				//model_list: ['新窝','新窝','新窝','新窝','新窝','新窝','新窝','新窝','新窝'],
				model_list: [{
					name: '新窝',
					choose: true,
				},{
					name: '新窝',
					choose: false,
				},{
					name: '新窝',
					choose: false,
				},{
					name: '新窝',
					choose: false,
				},{
					name: '新窝',
					choose: false,
				}],
				shop_list: [{
					name: 'k1',
					choose: true,
				},{
					name: 'k2',
					choose: false,
				},{
					name: 'k3',
					choose: false,
				},{
					name: 'k4',
					choose: false,
				},{
					name: 'k5',
					choose: false,
				}],
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
					choose: true,
				},{
					name: '近五天',
					choose: false,
				},{
					name: '近七天',
					choose: false,
				},{
					name: '近十五天',
					choose: false,
				}],



			}
			
		},
		mounted(){
		},
		computed:{
			...mapGetters([
	      
		      'userInfo',

		    ]),

		},
			
		methods:{

			choose_model(index) {
				for(let i=0;i<this.model_list.length;i++) {
					this.model_list[i].choose = false
				}

				this.model_list[index].choose = true
			},

			choose_shop(index) {
				for(let i=0;i<this.shop_list.length;i++) {
					this.shop_list[i].choose = false
				}

				this.shop_list[index].choose = true
			},

			choose_category(index) {
				for(let i=0;i<this.category_list.length;i++) {
					this.category_list[i].choose = false
				}

				this.category_list[index].choose = true
			},

			choose_time(index) {
				for(let i=0;i<this.time_list.length;i++) {
					this.time_list[i].choose = false
				}

				this.time_list[index].choose = true
			},




		}

	}
</script>
<style scoped lang="less">
	.model_setting {

	    background: url("../../assets/model_bg.png") no-repeat top;
    	background-size: 100% 230px;
    	height: calc(100vh - 65px);

		&_top {
			height: 230px;
			text-align: center;
			padding-top: 70px;

			.title {
				font-family:STHupo,STKaiti;
				font-size: 46px;
				color: #fff;
				font-weight: bold;
				margin-bottom: 28px;
			}
		}

		&_search {
			//height: 260px;
			margin: 0 7%;
			border: 1px solid #d7d7d7;
			padding:10px 20px;
			box-shadow:0 2px 12px 0 rgba(0,0,0,.1);
			//background-color: red;

			.departone {
				
				//height: 50px;
				line-height: 50px;
				border-bottom: 1px dashed #d7d7d7;
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

					.default_bt {
						padding: 6px 30px;
						cursor: pointer;

					}

					.active_bt {
						
						//border: 1px solid #eee;
						border-radius: 50px;
						background:linear-gradient(to right, #125bff 0, #2196F3 100%);
					}

				}

			}
		}

		&_wrap {
			height: calc(100vh - 575px);
			padding: 0 4%;
			overflow-y: scroll; 
			margin-right: 20px;
			margin-top: 20px;
			//background-color:blue;

			.single_model {
				height: 240px;
				margin-top: 20px;//model_border.gif
				background:url("../../assets/model_border.gif") no-repeat ;
				background-size: 100% 100%;
				display: flex;
				padding:30px 30px 30px 50px;

				.pic_div {
					//width: 240px;
					width: 23%;
					margin: auto;
					text-align: center;
				}

				.content_wrap {
					display: flex;
					justify-content:space-between;
					width: 77%;
					//width: calc(100% - 240px);

					.one {
						width: 26%;
						height: 100%;
						margin-left: 4%; 
						display: flex;
						flex-direction: column;
						justify-content: space-around;

						.one_wrap {
							display: flex;
							text-align: center;

							.p1 {
								width: 30%;

							}

							.p2 {
								width: 70%;
							}
						}

						
					}
				}
			}
		}
	}

</style>