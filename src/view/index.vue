<template>
    <div class="index-1">
    	<v-header/>
        <div style="position: relative;" class="router-wrap">

            <i @click="$store.commit('setisCollapse')" style="color: #ffffff;position: absolute; bottom: 10px;font-size: 40px;left: 10px;z-index: 98" class="iconfont iconfont-left iconhengshuqiehuanshu "></i>

        	<div  class="left_nav">
        		<el-menu
                    :collapse="isCollapse"
			      default-active="2"
			      class="el-menu-vertical-demo"
			      background-color="#222d32"
			      text-color="#fff"
                  style="height: 100%"
                  @select="handleSelect"
			      active-text-color="#ffd04b">
			      <el-menu-item index="/welcome_index">
			        <i class="iconfont iconfont-left iconhome "></i>
			        <span  slot="title">首页</span>
			      </el-menu-item>

			      <el-submenu index="2">
			        <template slot="title">
			          <i class="iconfont iconfont-left icontianmaochaoshigouwuche "></i>
			          <span>运营专区</span>
			        </template>
                        <el-menu-item v-if="$isInArray(37) || $isInArray(38) || $isInArray(39)" index="/sale/sale_show">
                            <template slot="title">
                              <i class="iconfont iconfont-left iconbaobiao"></i>
                              <span>运营驾驶舱</span>
                            </template>
                        </el-menu-item>
                        <el-submenu index="3">
                            <template slot="title">
                              <i class="iconfont iconfont-left iconshuzi "></i>
                              <span>运营数据报表</span>
                            </template>

                            <el-menu-item-group>
                              <el-menu-item v-if="$isInArray(37) || $isInArray(38) || $isInArray(39)" index="/sale_report/sale_index">
                                  销售表
                              </el-menu-item>
                              <el-menu-item v-if="$isInArray(37) || $isInArray(38) || $isInArray(39)"  index="/sale_report/car">
                                  开车表
                              </el-menu-item>
                              <el-menu-item v-if="$isInArray(37) || $isInArray(38) || $isInArray(39)"  index="/sale_report/category_analysis">
                                  类目分析表
                              </el-menu-item>

                              <el-menu-item v-if="$isInArray(37) || $isInArray(38) || $isInArray(39)"  index="/sale_report/flow_detail">
                                  流量来源表
                              </el-menu-item>                            
                            </el-menu-item-group>

                        </el-submenu>
                        <el-submenu index="4">
                            <template slot="title">
                              <i class="iconfont iconfont-left icondianzan "></i>
                              <span>淘客报表</span>
                            </template>

                            <el-menu-item-group>
                              <el-menu-item v-if="$isInArray(60)" index="/taoke/taoke_index_report">
                                  销售总表
                              </el-menu-item>
                              <el-menu-item v-if="$isInArray(60)" index="/taoke/taoke_plan">
                                  计划分析表
                              </el-menu-item>

                            </el-menu-item-group>

                            

                        </el-submenu>


                        
			      </el-submenu>


            <el-submenu index="26">
                <template slot="title">
                  <i class="iconfont iconfont-left iconModelapplication"></i>
                  <span>模特专区</span>
                </template>

                <el-menu-item  v-if="$isInArray(78)" index="/basic/model_card">
                  <i class="iconfont iconfont-left iconyifu1"></i>
                  <span slot="title">模特库</span>
                </el-menu-item>
            </el-submenu>

            <el-submenu index="21">
              <template slot="title">
                <i class="iconfont iconfont-left icontianmaochaoshigouwuche "></i>
                <span>亦欣运营专区</span>
              </template>
                <el-menu-item v-if="$isInArray(76)" index="/sale/yixin_sale_show">
                    <template slot="title">
                      <i class="iconfont iconfont-left iconbaobiao"></i>
                      <span>亦欣运营驾驶舱</span>
                    </template>
                </el-menu-item>
                <el-submenu v-if="$isInArray(76)" index="22">
                    <template slot="title">
                      <i class="iconfont iconfont-left iconshuzi "></i>
                      <span>亦欣运营数据报表</span>
                    </template>

                    <el-menu-item-group>
                      <el-menu-item  index="/sale_report/yixin_sale_index">
                          销售表
                      </el-menu-item>
                      <el-menu-item  index="/sale_report/yixin_car">
                          开车表
                      </el-menu-item>
                      
                    </el-menu-item-group>



                      

                </el-submenu>
                <el-menu-item v-if="$isInArray(76)" index="/basic/yixin_file_protect">
                  亦欣档案维护</el-menu-item>
                  <el-submenu v-if="$isInArray(77)" index="20">
                      <template slot="title">
                          <span slot="title">亦欣数据导入</span>
                      </template>

                      <el-menu-item-group>
                        <el-menu-item index="/basic/yixin_import_data">原始数据导入</el-menu-item>

                      </el-menu-item-group>

                  </el-submenu>

                       

            </el-submenu>
			      
			      <el-submenu  index="5">
                    <template slot="title">
    			        <i class="iconfont iconfont-left iconcaigou"></i>
    			        <span slot="title">供应链专区</span>
                    </template>
<!--                         <el-menu-item index="/source/index">
                            <template slot="title">
                              <i class="iconfont iconfont-left iconbaobiao"></i>
                              <span>供应链驾驶舱</span>
                            </template>
                        </el-menu-item>  -->                      

                        <el-menu-item v-if="$isInArray(40)"  index="/source/source_week_visual">
                            <template slot="title">
                              <i class="iconfont iconfont-left iconbaobiao"></i>
                              <span>供应链周度数据看板</span>
                            </template>
                        </el-menu-item>

                        <el-menu-item v-if="$isInArray(40)" index="/source/source_month_visual">
                            <template slot="title">
                              <i class="iconfont iconfont-left iconbaobiao"></i>
                              <span>供应链月度数据看板</span>
                            </template>
                        </el-menu-item>

                        <el-submenu index="14">
                            <template slot="title">
                              <i class="iconfont iconfont-left iconshuzi "></i>
                              <span>供应链数据报表</span>
                            </template>

                            <el-menu-item-group>
                              <el-menu-item v-if="$isInArray(22)" index="/source_report/threecheck">
                                  三方报表
                              </el-menu-item>
                              <el-menu-item v-if="$isInArray(25)"  index="/source_report/pinkong">
                                  品控报表
                              </el-menu-item>
                              <el-menu-item v-if="$isInArray(23)"  index="/source_report/cangchuck">
                                  仓储出库报表
                              </el-menu-item>
                              <el-menu-item v-if="$isInArray(24)"  index="/source_report/jieyangck">
                                  借样出库报表
                              </el-menu-item>
<!--                               <el-menu-item v-if="$isInArray(28)"  index="/source_report/dataview">
                                  视图导入
                              </el-menu-item> -->
                              <el-menu-item v-if="$isInArray(47)"  index="/source_report/wechatcheck">
                                微信三方核销报表
                              </el-menu-item>

                              <el-menu-item v-if="$isInArray(40)"  index="/source_report/weekly_report">
                                  <template slot="title">
                                    <!-- <i class="iconfont iconfont-left iconbaobiao"></i> -->
                                    <span>供应链周度数据报表</span>
                                  </template>
                              </el-menu-item>

                              <el-menu-item v-if="$isInArray(40)"  index="/source_report/monthly_report">
                                  <template slot="title">
                                    <!-- <i class="iconfont iconfont-left iconbaobiao"></i> -->
                                    <span>供应链月度数据报表</span>
                                  </template>
                              </el-menu-item>
                            </el-menu-item-group>

                        </el-submenu>

                    
			      </el-submenu>

                  <el-submenu  index="6">
                    <template slot="title">
                      <i class="iconfont iconfont-left icondealchuli"></i>
                      <span slot="title">业务专区</span>
                    </template>
                      <el-menu-item  v-if="$isInArray(17)"index="/yw/import_order" >
                        订单
                      </el-menu-item>
                      <el-menu-item  v-if="$isInArray(17)"index="/yw/size_detail" >
                        尺码明细
                      </el-menu-item>
                      <el-menu-item  v-if="$isInArray(17)"index="/yw/supply_view" >
                        供应链报表
                      </el-menu-item>
                      
                      <el-menu-item  v-if="$isInArray(17)"index="/yw/on_the_way" >
                        在途报表
                      </el-menu-item>
                      <el-menu-item  
                      v-if="$isInArray(65)||$isInArray(66)||$isInArray(67)||$isInArray(68)||$isInArray(69)||$isInArray(70)||$isInArray(71)||$isInArray(72)||$isInArray(73)||$isInArray(74)||$isInArray(75)" 
                      index="/yw/months_report">
                        月度报表
                      </el-menu-item>

                  </el-submenu>

                  <el-submenu  index="7">
                    <template slot="title">
                        <i class="iconfont iconfont-left iconwangwang"></i>
                        <span slot="title">客服专区</span>
                    </template>

                         <el-submenu index="15"   v-if="$isInArray(64)">
                           <template slot="title">
                                <i class="iconfont iconfont-left iconbaobiao"></i>
                                <span>客服驾驶舱</span>
                            </template>


                            <el-menu-item-group>
                              <el-menu-item  index="/dataview/data_board" >
                                  数据看板
                              </el-menu-item>
                              <el-menu-item   index="/dataview/data_comparison">
                                  维度看板
                              </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>

                        
                        <el-menu-item  index="/service/schedule" v-if="$isInArray(52)">
                            <i class="iconfont iconfont-left iconpaiban"></i>
                            <span slot="title">客服排班</span>
                        </el-menu-item>



                        <el-submenu index="12">
                            <template slot="title">
                                <i class="iconfont iconfont-left iconicon-p_mrpbaobiao"></i>
                                <span>售前报表</span>
                            </template>


                            <el-menu-item-group>
                              <el-menu-item  index="/customer/sale_report" v-if="$isInArray(53)">
                                  日销量
                              </el-menu-item>
                              <el-menu-item   index="/customer/efficiency_report" v-if="$isInArray(54)">
                                  售前人效表
                              </el-menu-item>
                              <el-menu-item   index="/customer/shop_report" v-if="$isInArray(55)">
                                  售前店铺
                              </el-menu-item>
                              <el-menu-item   index="/customer/customer_report" v-if="$isInArray(56)">
                                  售前客服
                              </el-menu-item>
                              <el-menu-item   index="/customer/time_sharing_report" v-if="$isInArray(57)">
                                  分时接待
                              </el-menu-item>
                                <el-menu-item   index="/customer/anomaly_report" v-if="$isInArray(58)">
                                  异常情况
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>




                  </el-submenu>



                  <el-submenu index="8">
                    <template slot="title">
                      <i class="iconfont iconfont-left iconjichuxinxishezhi"></i>
                      <span>基础信息维护</span>
                    </template>

                    <el-menu-item  v-if="$isInArray(59)"  index="/basic/file_protect">
                      档案维护
                    </el-menu-item>
                    <el-menu-item  v-if="$isInArray(17)"  index="/basic/model_protect">
                      模特维护
                    </el-menu-item>

                    <el-submenu index="13">
                        <template slot="title">
                            <span slot="title">运营数据导入</span>
                        </template>

                        <el-menu-item-group>
                          <el-menu-item index="/basic/import_data">原始数据导入</el-menu-item>

                          
                          
                          <el-menu-item  index="/basic/import_log"  v-if="$isInArray(62)">数据导入日志</el-menu-item>
                        </el-menu-item-group>

                    </el-submenu>

                    <el-submenu  index="18"  v-if="$isInArray(63)">
                        <template slot="title">
                            <span slot="title" >客服数据导入</span>
                        </template>
                         <el-menu-item index="/basic/customer_import">客服数据导入</el-menu-item>
                    </el-submenu>

                    <el-submenu  index="16">
                        <template slot="title">
                            <span slot="title">淘客数据导入</span>
                        </template>
                        <el-menu-item index="/basic/taoke_import">淘客数据导入</el-menu-item>
                        
                    </el-submenu>
                    <el-submenu  index="17">
                        <template slot="title">
                            <span slot="title">货源数据导入</span>
                        </template>
                        <el-menu-item index="/basic/source_week_import">货源周数据导入</el-menu-item>
                        <el-menu-item index="/basic/source_month_import">货源月数据导入</el-menu-item>
                        
                    </el-submenu>

                    
                    
                  </el-submenu>

                  <el-submenu index="9">
                    <template slot="title">
                      <i class="iconfont iconfont-left iconbangzhuzhongxin"></i>
                      <span>帮助中心</span>
                    </template>

                    <el-submenu index="10">
                        <template slot="title">
                          <span>运营帮助</span>
                        </template>

                            <el-menu-item-group>
                                <el-menu-item  index="/help/store_data">
                                    <span slot="title">数据处理</span>
                                </el-menu-item>
                                <el-menu-item  index="/help/index">
                                    <span slot="title">数据导入</span>
                                </el-menu-item>
                                  
                            </el-menu-item-group>

                           
                        
                    </el-submenu>
                    <el-submenu index="11">
                        <template slot="title">
                          <span>客服帮助</span>
                        </template>

                            <el-menu-item-group>
                                <el-menu-item  index="/help/customer_data">
                                    <span slot="title">数据处理</span>
                                </el-menu-item>
                                
                                  
                            </el-menu-item-group>

                           
                        
                    </el-submenu>

                      

                    <!--<el-menu-item-group>
                        <el-menu-item  index="/help/index">
                            <i class="iconfont iconfont-left iconbangzhuzhongxin"></i>
                            <span slot="title">运营帮助</span>
                        </el-menu-item>
                          
                    </el-menu-item-group>-->
                  </el-submenu>

			      <el-menu-item  v-if="$isInArray(20)" index="/setting/master">
			        <i class="iconfont iconfont-left iconshezhi"></i>
			        <span slot="title">设置</span>
			      </el-menu-item>
			      
			    </el-menu>
        	</div>

        	<div  class="right_view">
        		<div v-if="right_view_top" class="right_view_top">
        			<span class="shu"></span>
        			<span :class="{tagchoose: list.choose}" @click="router_change(index)" v-for="(list,index) in router_choose" v-if="list.show" class="tag pointer">
                        {{list.name}} 
                        <i @click.stop="closepage(index)" class="el-icon-error"></i> /
                    </span>
        		</div>
        		<keep-alive>
                  <router-view :closepath="closepath" @pagechange="routechange" v-if="$route.meta.keepAlive" :key="$route.fullPath"></router-view>
                </keep-alive>

                <router-view  v-if="!$route.meta.keepAlive" @pagechange="routechange"  :key="$route.fullPath"></router-view>
        	</div>
            
        </div>
    </div>
</template>

<script>
import vHeader from '@/components/v-header'
import { mapGetters } from 'vuex'
export default {
    name: "index",
    components: {
         'v-header': vHeader
    },
    data(){
        return{
            //isCollapse: false,
            right_view_top: true,
            taglist: [],
            choosepath: 0,
            closepath: '',
            router_choose: [
                {
                    name: '销售表',
                    url: '/sale_report/sale_index',
                    refresh: false,
                    show: false,
                    choose: false,
                },
                {
                    name: '销售详情表',
                    url: '/sale_report/sale_detail',
                    refresh: false,
                    show: false,
                    choose: false,
                },
                {
                    name: '销售店铺对比表',
                    url: '/sale_report/sale_shop',
                    refresh: false,
                    show: false,
                    choose: false,
                },
                {
                    name: '开车表',
                    url: '/sale_report/car',
                    refresh: false,
                    show: false,
                    choose: false,
                },
                {
                    name: '流量来源表',
                    url: '/sale_report/flow_detail',
                    refresh: false,
                    show: false,
                    choose: false,
                },                
                {
                    name: '亦欣销售表',
                    url: '/sale_report/yixin_sale_index',
                    refresh: false,
                    show: false,
                    choose: false,
                },
                {
                    name: '亦欣销售详情表',
                    url: '/sale_report/yixin_sale_detail',
                    refresh: false,
                    show: false,
                    choose: false,
                },
                {
                    name: '亦欣销售店铺对比表',
                    url: '/sale_report/yixin_sale_shop',
                    refresh: false,
                    show: false,
                    choose: false,
                },
                {
                    name: '亦欣开车表',
                    url: '/sale_report/yixin_car',
                    refresh: false,
                    show: false,
                    choose: false,
                },
                {
                    name: '类目分析表',
                    url: '/sale_report/category_analysis',
                    refresh: false,
                    show: false,
                    choose: false,
                },
                {
                    name: '供应链周度数据报表',
                    url: '/source_report/weekly_report',
                    refresh: false,
                    show: false,
                    choose: false,
                },
                {
                    name: '供应链月度数据报表',
                    url: '/source_report/monthly_report',
                    refresh: false,
                    show: false,
                    choose: false,
                },
                {
                    name: '三方报表',
                    url: '/source_report/threecheck',
                    refresh: false,
                    show: false,
                    choose: false,
                },
                {
                    name: '品控报表',
                    url: '/source_report/pinkong',
                    refresh: false,
                    show: false,
                    choose: false,
                },
                {
                    name: '仓储出库报表',
                    url: '/source_report/cangchuck',
                    refresh: false,
                    show: false,
                    choose: false,
                },
                {
                    name: '借样出库报表',
                    url: '/source_report/jieyangck',
                    refresh: false,
                    show: false,
                    choose: false,
                },
                {
                    name: '视图导入',
                    url: '/source_report/dataview',
                    refresh: false,
                    show: false,
                    choose: false,
                },
                {
                    name: '微信三方核销报表',
                    url: '/source_report/wechatcheck',
                    refresh: false,
                    show: false,
                    choose: false,
                },
                {
                    name: '日销量',
                    url: '/customer/sale_report',
                    refresh: false,
                    show: false,
                    choose: false,
                },
                {
                    name: '售前人效表',
                    url: '/customer/efficiency_report',
                    refresh: false,
                    show: false,
                    choose: false,
                },
                {
                    name: '售前店铺',
                    url: '/customer/shop_report',
                    refresh: false,
                    show: false,
                    choose: false,
                },
                {
                    name: '售前客服',
                    url: '/customer/customer_report',
                    refresh: false,
                    show: false,
                    choose: false,
                },
                {
                    name: '分时接待',
                    url: '/customer/time_sharing_report',
                    refresh: false,
                    show: false,
                    choose: false,
                },
                {
                    name: '异常情况',
                    url: '/customer/anomaly_report',
                    refresh: false,
                    show: false,
                    choose: false,
                },
                {
                    name: '淘客数据表',
                    url: '/taoke/taoke_index_report',
                    refresh: false,
                    show: false,
                    choose: false,
                },
                {
                    name: '月度报表',
                    url: '/yw/months_report',
                    refresh: false,
                    show: false,
                    choose: false,
                },
                {
                    name: '订单',
                    url: '/yw/import_order',
                    refresh: false,
                    show: false,
                    choose: false,
                },
                {
                    name: '尺码明细',
                    url: '/yw/size_detail',
                    refresh: false,
                    show: false,
                    choose: false,
                },
                {
                    name: '供应链报表',
                    url: '/yw/supply_view',
                    refresh: false,
                    show: false,
                    choose: false,
                },
                {
                    name: '在途报表',
                    url: '/yw/onway_view',
                    refresh: false,
                    show: false,
                    choose: false,
                },
                {
                    name: '在途报表2',
                    url: '/yw/on_the_way',
                    refresh: false,
                    show: false,
                    choose: false,
                },
                
                
            ],

            
        }
    },
    watch: {

        '$route'(to, from) {
            //console.info(to.path)

            if (to.path.indexOf('sale_show')>0 ||to.path.indexOf('yixin_sale_show')>0||to.path.indexOf('source/index')>0 ||to.path.indexOf('setting')>0 || this.$route.fullPath.indexOf('basic')>0 || this.$route.fullPath.indexOf('service')>0 || this.$route.fullPath.indexOf('help')>0 || this.$route.fullPath.indexOf('dataview')>0 || this.$route.fullPath.indexOf('welcome_index')>0 || this.$route.fullPath.indexOf('export_more_shop')>0 || this.$route.fullPath.indexOf('visual')>0) {

                // if (to.path.indexOf('report')<0 || this.$route.fullPath.indexOf('report')<0) {

                //     this.right_view_top = false
                // } else {
                //     this.right_view_top = true
                // }
                this.right_view_top = false

            }else {
                this.right_view_top = true
            }
        },
        isCollapse(value) {

        }
    },
    computed: {
        ...mapGetters([
            'isCollapse',
        ]),
    },
    created() {
       
    },
    mounted(){


        if (this.$route.fullPath.indexOf('setting')>0 || this.$route.fullPath.indexOf('basic')>0 || this.$route.fullPath.indexOf('help')>0 || this.$route.fullPath.indexOf('source/index')>0 || this.$route.fullPath.indexOf('service')>0 || this.$route.fullPath.indexOf('sale_show')>0 || this.$route.fullPath.indexOf('dataview')>0 || this.$route.fullPath.indexOf('welcome_index')>0 || this.$route.fullPath.indexOf('export_more_shop')>0 || this.$route.fullPath.indexOf('visual')>0 ) {

            if (this.$route.fullPath.indexOf('report')<0 ) {

            
                this.right_view_top = false
            }

            if (this.$route.fullPath.indexOf('report')>0 || this.$route.fullPath.indexOf('yw')>0) {
                for (let i=0;i<this.router_choose.length;i++) {
                    if (this.router_choose[i].url == this.$route.fullPath) {
                        for (let j=0;j<this.router_choose.length;j++) {
                            this.router_choose[j].choose = false
                        }

                        this.router_choose[i].show = true
                        this.router_choose[i].choose = true

                        this.choosepath = i
                    }
                }

                
            }
        }

        
    },
    methods:{
        routechange(value) {
            for (let i=0;i<this.router_choose.length;i++) {
                if (this.router_choose[i].url == value) {
                    this.closepath = this.router_choose[i].url
                    

                    for (let j=0;j<this.router_choose.length;j++) {
                        this.router_choose[j].choose = false
                    }


                    this.router_choose[i].show = true
                    this.router_choose[i].choose = true

                    this.choosepath = i

                    this.$router.push(this.router_choose[i].url)

                    break
                }
                
            }

           
        },
        closepage(index) {
            //console.info(index)

            let arr = this.router_choose.filter((data)=>{
                return data.show
            })

            if (arr.length > 1) {
               this.router_choose[index].show = false 
               this.closepath = 'likai'
            }


            if (this.choosepath == index) {
                for (let i=0;i<this.router_choose.length;i++) {


                    if (this.router_choose[i].show) {
                        this.router_choose[i].choose = true

                        this.choosepath = i

                        this.$router.push(this.router_choose[i].url)
                    }
                
                } 
            }

            



        },
        router_change(index) {
            for (let i=0;i<this.router_choose.length;i++) {
                this.router_choose[i].choose = false
            }
            this.choosepath = index

            this.router_choose[index].choose = true

            this.$router.push(this.router_choose[index].url)
        },
        handleSelect(key, keyPath) {
            //37 38 39 运营报表
            //40 货源报表
            //42 业务
            //43 客服报表查看
            //76 亦欣报表查看

            // if (key.indexOf('source')>0 && !this.$isInArray(40)) {
            //     return this.$message({
            //       message: '您没有权限进入供应链中心',
            //       type: 'error'
            //     });
            // }

            

            if (key.indexOf('sale_report')>0 && (!this.$isInArray(37) && !this.$isInArray(38) && !this.$isInArray(39)&& !this.$isInArray(76)) ) {
                return this.$message({
                  message: '您没有权限进入运营数据中心',
                  type: 'error'
                });
            }




            



            if (key.indexOf('/')==0) {

               if (key.indexOf('report')>0 || key.indexOf('yw')>0) {

                    this.routechange(key)

                   
                } else {
                    this.$router.push(key) 
                } 
            }

            

            
        
      }
    },
}
</script>
<style>
    .el-menu {
        border-right: 0px;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 250px;
        min-height: 400px;
      }
    .iconfont-left {
        font-size: 20px;
        padding-right: 8px;
    }
</style>
<style spoced lang="less">
.index-1 {
    height: calc(100vh - 0px);

    .router-wrap {
        height: calc(100vh - 66px);
        background: rgba(255, 255, 255, 0.7);
        display: flex;

        .left_nav {
        	background: #222d32;
        	height: calc(100vh - 66px);
        	overflow-y: scroll;
        }

        
        .right_view {
        	flex: 1;
            width: calc(100vw - 300px);

        	.right_view_top {
        		height: 50px;
        		line-height: 50px;

        		position: relative;
        		padding-left: 10px;

        		.shu {
        			display: inline-block;
        			height: 20px;
        			width: 3px;
        			position: relative;
        			top: 4px;
        			background: #0099ff;
        			padding-right: 5px;


        		}

        		.tag {
                    font-size: 14px;

                    &.tagchoose {
                        color: #67c23a;
                    }

        			i {
        				font-size: 13px;
        			}


        		}

        	}
        }
    }
}
  
</style>
