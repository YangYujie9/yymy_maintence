<template>
  <div class="report">
    <div class="report_warp">

      <div class="report_warp_top">

        <p class="input_p1">
            <el-date-picker
	  		  class="input_class"
		      v-model="search.startTime"
		      type="date"
		      :clearable='false'
		      placeholder="起始日期">
	       </el-date-picker> - <el-date-picker
	  		  class="input_class"
		      v-model="search.endTime"
			  :clearable='false'		      
			  type="date"
		      placeholder="终止日期">
	       </el-date-picker>

        </p>

        <el-button class="monbtn" @click="get_monthly_list">搜 索</el-button>

        <!-- <el-button @click="monthly_list_reverse">切换时序</el-button> -->


      </div>

      <div class="report_warp_content" ref="table_warp" id="table2">
          <div class="top_warp">
            <div class="top_div1">
              <table cellpadding="0" cellspacing="0">
              	<tr class="top_style" style="height: 30px;">

      				<td colspan="2" rowspan="2"style="width: 10px;">供应链</td>
      				<td rowspan="2" style="width: 100px;">日均首单下单款（近五天）</td>
      				<td rowspan="2" style="width: 100px;">平均首单下单量（近五天）</td>
      				<td colspan="4" style="border-bottom: 1px solid #cecece;width: 200px">{{fmtymDate(search.startTime)}}</td>
      			</tr>
     			<tr class="top_style">
      				<td style="width: 50px;">首单下单款</td>
      				<td style="width: 50px;">日均下单款</td>
      				<td style="width: 50px;">下单量</td>
      				<td style="width: 50px;">取消量</td>      			
      			</tr>

              </table>
            </div>
            <div class="top_div2">
              <table cellpadding="0" cellspacing="0" ref="timelist" class="table4">
              	<tr class="top_style" style="height: 30px;">
              		<td v-for="list in time_list" style="border-bottom: 1px solid #cecece;width: 200px;height: 30px;">
              			{{fmtMonthDate(list)}}
              		</td>
              	</tr>
                <tr class="top_style1"> 
     				<td style="" v-for="list in time_list" style="width: 150px;border-right: 0px;">
	     				<table  cellpadding="0" cellspacing="0" style="border: 0px;">
	     					<tr>
			    				<td style="min-width: 50px;">首单下单款</td>
			      				<td style="min-width: 50px;">下单量</td>
			      				<td style="min-width: 50px;">取消量</td> 
	     					</tr>
	     				</table>
     				</td>

      			</tr>
              </table>
            </div>
          </div>

          <div class="bottom_warp">
            <div class="bottom_div1">
              <table  cellpadding="0" cellspacing="0"  ref="teamlist">
              	<tr v-for="list in total_data">
              		<td style="width: 80px;" :class="{noborder:!list.groupName}">{{list.groupName}}</td>
              		<td style="border-right: 0px;">
              			<table cellpadding="0" cellspacing="0" style="border: 0px;" class="table3">
              				<tr  v-for="list1 in list.list">
              					<td style="width: 120px;" :class="{noborder:!list.groupName}">{{list1.supplyName}}</td>
    			      				<td style="width: 100px;" :class="{noborder:!list.groupName}">{{list1.firstOrder5}}</td>
    			      				<td style="width: 100px;" :class="{noborder:!list.groupName}">{{list1.avg_firstOrderNum5}}</td>
    			      				<td style="width: 50px;" :class="{noborder:!list.groupName}">{{list1.firstOrder}}</td>
    			      				<td style="width: 50px;" :class="{noborder:!list.groupName}">{{list1.firstOrderMonth}}</td>
    			      				<td style="width: 50px;" :class="{noborder:!list.groupName}">{{list1.orderNum}}</td>
    			      				<td style="width: 50px;" :class="{noborder:!list.groupName}">{{list1.deselectNum}}</td>
              				</tr>
              			</table>
              		</td>
              	</tr>

              </table>
            </div>
            <div class="bottom_div2" ref="viewBox" id="viewBox">
              <table cellpadding="0" cellspacing="0" class="table4">
                <tr class="hover_warp" v-for="list in daily_data">
     				<td v-for="list1 in list.list" style="width: 150px;border-right: 0px;">
	     				<table  cellpadding="0" cellspacing="0" style="border: 0px;">
	     					<tr>
	     						<td style="min-width: 50px;border-bottom: 0px;border-left: 0px;"  :class="{noborder:!list.supplyName}">{{list1.firstOrder}}</td>
			      				<td style="min-width: 50px;border-bottom: 0px;"  :class="{noborder:!list.supplyName}">{{list1.orderNum}}</td>
			      				<td style="min-width: 50px;border-bottom: 0px;"  :class="{noborder:!list.supplyName}">{{list1.deselectNum}}</td>
	     					</tr>
	     				</table>
     				</td>    
                </tr>
              </table>
            </div>


          </div>








        
      </div>


    </div>


    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

  export default {
    name: "system-setting",
    data(){
      return{
        table_height:300,
        search: {
        	startTime:new Date(new Date(new Date().toLocaleDateString()).getTime() - 14*24*3600*1000),
			    endTime:new Date(new Date(new Date().toLocaleDateString()).getTime()-24*3600*1000),
        },
        total_data:[],
        daily_data:[],
        time_list:[],
        


      }
    },
    created() {

    },
    computed:{
      ...mapGetters([
          'getpageDict',
      ]),


      get_brand(){
        let brand = this.getpageDict.filter((list)=>{
          return list.dicType == 'brand'
        })
        return brand[0].dicList
      },

      get_shop_type(){
        let shop_type = this.getpageDict.filter((list)=>{
          return list.dicType == 'shop_type'
        })
        return shop_type[0].dicList
      }

    },
    mounted(){ 

      this.$refs.viewBox.addEventListener('scroll', () => {
          this.$refs.timelist.style.left = - this.$refs.viewBox.scrollLeft + 'px'
        }, false)

      this.$refs.viewBox.addEventListener('scroll', () => {
        //console.info(this.$refs.viewBox.scrollTop)
          this.$refs.teamlist.style.top = - this.$refs.viewBox.scrollTop + 'px'
        }, false)

      this.$nextTick(()=>{
        this.table_height = this.$refs.table_warp.offsetHeight - 40
      })


      this.get_monthly_list()







      
      
    },
    methods:{

      handleSizeChange(val) {
          this.search.pageSize = val
          this.search.currentPage = 1
         
        },


      handleCurrentChange(val) {
          this.search.currentPage = val
         
      },

      fmtDate(obj){
        let date =  new Date(obj*1000);
        let y = 1900+date.getYear();
        let m = "0"+(date.getMonth()+1);
        let d = "0"+date.getDate();
        //var h = date.getHours();
        //console.info(h)
        return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
        //return y+"-"+m.substring(m.length-2,m.length);
      },
      fmtymDate(obj){
        let date =  new Date(obj);
        let y = 1900+date.getYear();
        let m = "0"+(date.getMonth()+1);

        return y+"年"+m.substring(m.length-2,m.length)+"月";
        //return y+"-"+m.substring(m.length-2,m.length);
      },

      fmtMonthDate(obj){
      	let date =  new Date(obj*1000);
      	let y = date.getFullYear()
      	let m = "0"+(date.getMonth()+1);
      	let d = "0"+date.getDate();
      	return  m.substring(m.length-2,m.length) +"/"+ d.substring(d.length-2,d.length)
      },



      get_monthly_list(){

        let startTime = this.search.startTime?this.search.startTime.getTime().toString().substr(0,10):''
        let endTime = this.search.endTime?this.search.endTime.getTime().toString().substr(0,10):''
      	let days = Number((endTime - startTime)/(24*3600) + 1).toFixed()

      	if(days > 15) {
      		return this.$message({
      			message:'查询时间不能超过15天',
      			type:'warning'
      		})
      	}
        this.total_data = []

        this.daily_data = []

      	this.$http.post(`hydate/get_moneyly_list`,{
      		startTime: startTime,
			    endTime: endTime,
      	})
		    .then((data)=>{




    			if(data.code == '200'){

    				let list =[]
    				let list1 = []
    				this.time_list = []

    				for(let i=days;i>0;i--) {
    					this.time_list.push(Number(startTime) + (i - 1) * 24 *3600)
    				}




    				for(let i =0;i<data.data.length;i++){

              //左边部分表格合计数据项
              let tfirstOrder5 = 0
              let tfirstOrderNum5 = 0
              let torderNum = 0
              let tfirstOrder = 0
              let tdeselectNum = 0
              let tfirstOrderMonth = 0
              let tftotal_order5 = 0
              let tfavg_firstOrderNum5 = 0

              //右边部分表格合计数据项

                let daytotal = []


               


    					list.push({groupName: data.data[i].groupName,groupId: data.data[i].groupId})
    					list[list.length - 1].list = []

              for(let m=0;m<this.time_list.length;m++) {

                daytotal.push({
                  date:this.time_list[m],
                  dtfirstOrder:0,
                  dtorderNum:0,
                  dtdeselectNum:0,
                })
              }

    					for(let j=0;j<data.data[i].list.length;j++) {



    						list[list.length - 1].list.push({
    							
    							firstOrder5: data.data[i].list[j].firstOrder5,
    							firstOrderNum5: data.data[i].list[j].firstOrderNum5,
    							orderNum: data.data[i].list[j].orderNum,
    							firstOrder: data.data[i].list[j].firstOrder,
    							deselectNum: data.data[i].list[j].deselectNum,
    							firstOrderMonth: data.data[i].list[j].firstOrderMonth,
    							supplyName: data.data[i].list[j].supplyName,
                  supplyId: data.data[i].list[j].supplyId,
                  avg_firstOrderNum5: data.data[i].list[j].firstOrder5?Number(data.data[i].list[j].firstOrderNum5/data.data[i].list[j].firstOrder5/5).toFixed(2):0,
                  total_order5: data.data[i].list[j].firstOrderNum5 

                  //(Number(data.data[i].list[j].firstOrder5) * Number(data.data[i].list[j].firstOrderNum5))?:0
    						})
                //console.info(list[list.length - 1])
                

                tfirstOrder5 += data.data[i].list[j].firstOrder5
                tfirstOrderNum5 += data.data[i].list[j].firstOrderNum5
                torderNum += data.data[i].list[j].orderNum
                tfirstOrder += data.data[i].list[j].firstOrder
                tdeselectNum += data.data[i].list[j].deselectNum
                tfirstOrderMonth += data.data[i].list[j].firstOrderMonth
                //total_order5 += list[i].list[j].total_order5
                tfavg_firstOrderNum5 += list[list.length - 1].list[j].avg_firstOrderNum5
                //console.info(i,j,list[list.length - 1].list[j].avg_firstOrderNum5)
                //return

              







                // let l = list1.length
                // list1[l] = {}
                // list1[l].list = []

                list1.push({supplyName:data.data[i].list[j].supplyName, supplyId:data.data[i].list[j].supplyId})
                list1[list1.length - 1].list = []



    						for(let m=0;m<this.time_list.length;m++) {
    							list1[list1.length - 1].list.push({
    								date:this.time_list[m],
                    firstOrder: 0,
    								orderNum: 0,
    								deselectNum: 0,
    							})

    						}

                




                if (data.data[i].list[j].list && data.data[i].list[j].list.length) {
                  for(let k=0;k<data.data[i].list[j].list.length;k++) {


                    if(!data.data[i].list[j].list[k].time){
                      list1[list1.length - 1].list[0].firstOrder = ''
                      list1[list1.length - 1].list[0].orderNum = ''
                      list1[list1.length - 1].list[0].deselectNum = ''
                    } else {
                      let cha = Number(days) - (data.data[i].list[j].list[k].time - startTime)/24/3600 - 1


                      list1[list1.length - 1].list[cha].firstOrder = data.data[i].list[j].list[k].firstOrder
                      list1[list1.length - 1].list[cha].orderNum = data.data[i].list[j].list[k].orderNum
                      list1[list1.length - 1].list[cha].deselectNum = data.data[i].list[j].list[k].deselectNum

                      daytotal[cha].dtfirstOrder += data.data[i].list[j].list[k].firstOrder
                      daytotal[cha].dtorderNum += data.data[i].list[j].list[k].orderNum
                      daytotal[cha].dtdeselectNum += data.data[i].list[j].list[k].deselectNum


                    }
                    




                  }

                }

                




    						


    					}



          


              if(!(list[list.length - 1].groupId == 2 && list1[list1.length - 1].supplyId == 24)){


                list[list.length - 1].list.push({
                  
                  firstOrder5: Number(tfirstOrder5).toFixed(1),
                  avg_firstOrderNum5: Number(tfirstOrderNum5/tfirstOrder5/5).toFixed(2),
                  orderNum: Number(torderNum).toFixed(0),
                  firstOrder: Number(tfirstOrder).toFixed(0),
                  deselectNum: Number(tdeselectNum).toFixed(0),
                  firstOrderMonth: Number(tfirstOrderMonth).toFixed(2),
                  supplyName: '合计',
                  supplyId:''
                })




                //日合计

                list1.push({supplyName:'合计',supplyId:''})
                list1[list1.length - 1].list = []
                for(let m=0;m<daytotal.length;m++) {
                  list1[list1.length - 1].list.push({
                    date:daytotal[m].date,
                    firstOrder: daytotal[m].dtfirstOrder,
                    orderNum: daytotal[m].dtorderNum,
                    deselectNum: daytotal[m].dtdeselectNum,
                  })
                }
              }





              if(!(list[list.length - 1].groupId == 2 && list1[list1.length - 1].supplyId == '')){
                list.push({groupName:'',groupId:''})
                list[list.length - 1].list = []
                list[list.length - 1].list.push({
                    supplyName:'',
                    supplyId:'',
                    deselectNum:'',
                    firstOrder:'',
                    firstOrder5:'',
                    firstOrderMonth:'',
                    firstOrderNum5:'',
                })

                list1.push({supplyName:'',supplyId:''})
                list1[list1.length - 1].list = []
                for(let m=0;m<this.time_list.length;m++) {
                  list1[list1.length - 1].list.push({
                    date:this.time_list[m].date,
                    firstOrder: '',
                    orderNum: '',
                    deselectNum: '',
                  })
                }
              }

            


            
    				}

            console.info(list)

            list.pop()
            list1.pop()
            


    				this.total_data = list

    				this.daily_data = list1

            console.info(list1)





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
      monthly_list_reverse(){
        this.time_list.reverse()

        let tmp = []
        tmp = this.daily_data
        for(let i=0;i<tmp.length;i++){
          tmp[i].list.reverse()
        }
        this.daily_data = tmp
        //console.info("111")
      },


    },      
  }
</script>
<style lang="less">
  .input_input {
            padding-left: 20px;
            margin: 16px 0;
            position:relative;
            .input_class {
                display: inline-block;
                width: 270px;
                font-size: 12px;
            }

        }
</style>



<style scoped lang="less">
.report {

    font-size:14px; 
    position: relative;
    height: calc(100vh - 120px);
    margin: 0 20px;
    &_warp{

      height: calc(100vh - 130px);

      
      .cursor{
        cursor: pointer;
      }

      &_top{
        height:60px;
        //margin-top: 20px;
        border-bottom: 1px solid #e2e2e2;
        padding-left: 20px;
        //background-color:red;
        position: relative;
        padding-bottom: 10px;
        
        .monbtn{
          position: relative;
          //width:180px;
          background-color: rgb(140, 206, 173);
          color: #fff; 
        }
        .input_p1{
          display: inline-block;
          margin-right: 20px;
          

          .input_class{
            width: 180px;
            display: inline-block;
          }
        }




      }



      &_content{
        height: calc(100vh - 195px);
        //background-color:red;
        margin-top: 10px;
        width: 100%;
        position:relative;
        text-align:center;

        .top_style{
          background-color:#3f3f3f;
          color: #fff;
          //height: 40px;
          //line-height: 30px;
        }
        .top_style1{
          background-color:#e86208;
          color: #fff;
          //height: 40px;
          //line-height: 30px;
        }

        .table4 {
        	border-left: 0px;
        	border-right: 0px;

		    tr td:first-child{
		   		border-left: 0px solid red;
		    
		    }

        }

          .top_warp{
            display: flex;
            //height: 110px;
            width: 100%;
            position:relative;
            //font-size: 0;  //消除div之间的间隙

            .top_div1{
              width: 600px;
              overflow: hidden;
              left: 0px;
              //flex:0 1;

            }
            .top_div2{
              width: calc(100vw - 914px);
              position:relative;
              overflow: hidden;
            }
          }
          .bottom_warp{
            display: flex;
            width: 100%;
            
            height:calc(100vh - 290px);
            
            table{
              border-top:0;
              border-bottom:0;
              tr{

                td{
                  border-right:1px solid #d0d0d0;
                  border-bottom:1px solid #d0d0d0;
                }
              }
            }

            .noborder {
              border-right: 0px;
            }
          

            .bottom_div1{
              width: 600px;
              height:calc(100vh - 300px);
              //table-layout:fixed;
              //overflow:visible;

              overflow:hidden; 
              position:relative;
              display: inline-block;

              .table3 {
              	border:0px;

              	tr:nth-last-child(1) td {
                   border-bottom: 0;
                }
              }
              
            }
            .bottom_div2{
              height: 100%;
              width: calc(100vw - 910px);
              //overflow: auto;
              overflow: scroll;
              position:relative;
              display: inline-block;




              .list_warp{
                td{
                  cursor: pointer;
                  position:relative;

                  &:first-child  {  border-left:0px; }

                  &:hover{
                    background-color:#eee;
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
          table{
            border:1px solid #d0d0d0;
            border-right:0px;
            width: 100%;
            position:relative;
            //table-layout:fixed;

          tr{
            th{
              min-width: 40px;
              border-right:1px solid #d0d0d0;

            }
            td{
              min-width: 40px;
              border-right:1px solid #d0d0d0;
              height: 28px;
              line-height: 28px;
            }
          }
        }

       



        



      }
  }
}
  
</style>
