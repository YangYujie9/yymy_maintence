<template>
  <div class="report">
    <div class="report_warp">

      <div class="report_warp_top">

<!--         <p class="input_p1">
            <el-date-picker
	  		  style="display: inline-block;position: relative;width: 240px;"
		      v-model="time"
        	  @change=""
		      type="week"
		      :format="format()" 
		      placeholder="选择日期"
		      :picker-options="pickerOptions">
	       </el-date-picker>

        </p> -->
<!--         <p class="input_p1">
          <el-input
  		    class="input_class"
	        v-model="supplyId"
    	    @change=""
	        placeholder="供应链">
          </el-input>
        </p> -->
        <p class="input_p1">
        	<el-date-picker
		      v-model="time"
		      @change=""
		      type="date"
		      placeholder="选择日期"
		      :picker-options="pickerOptions">
	       </el-date-picker>
	    </p>      
	    <el-button class="monbtn" @click="get_weekly_list">搜 索</el-button>


      </div>

      <div class="report_warp_content" ref="table_warp" id="table2">
        <el-table
          :data="tableData"
          border
          :height="table_height"
          style="width: 100%"
          highlight-current-row
         
          :header-cell-style='{"background": "#3f3f3f",
            "border-right": "1px solid #cecece",
            "border-bottom": "0px",
            "text-align": "center",
            "color": "#ffffff",
            }'
          >

          <el-table-column
            label="供应链"
            prop="supplyName"
            width="90"
            align="center">
          </el-table-column>
          <el-table-column
            label="重要在途数"
            prop="imOnWay"
            align="center">
          </el-table-column>
          <el-table-column
            label="总在途数"
            prop="onWayDate"
            align="center">
          </el-table-column>
          <el-table-column
            label="上周总在途数"
            prop="lastWeekDate"
            align="center">
          </el-table-column>
          <el-table-column
            label="上周日均到货数"
            prop="lastWeekDateAvg"
            align="center">
          </el-table-column>
          <el-table-column
            label="预计出清天数"
            prop="cqDay"
            align="center">
          </el-table-column>
          <el-table-column
            label="上周首单下单款量"
            prop="lastWeekSdOrder"
            align="center">
          </el-table-column>
          <el-table-column
            label="上周日均首单款量"
            prop="lastWeekSdOrderAvg"
            align="center">
          </el-table-column>
          <el-table-column
            label="上周新款下单总量"
            prop="lastWeekXkOrder"
            align="center">
          </el-table-column>
          <el-table-column
            label="上周老款下单总量"
            prop="lastWeekLkOrder"
            align="center">
          </el-table-column>
          <el-table-column
            label="上周取消量"
            prop="lastWeekQx"
            align="center">
          </el-table-column>
          <el-table-column
            label="上周取消总量"
            prop="lastWeekQxSum"
            align="center">
          </el-table-column>
          <el-table-column
            label="份额占比"
            prop="rate"
            align="center">
          </el-table-column>
        </el-table>


        <!--<table cellpadding="0" cellspacing="0">
        	<thead>
        		<tr>
        			<td>供应链</td>
        			<td>重要在途数</td>
        			<td>总在途数</td>
        			<td>上周总在途数</td>
        			<td>上周日均到货数</td>
        			<td>预计出清天数</td>
        			<td>上周首单下单款量</td>
        			<td>上周日均首单款量</td>
        			<td>上周新款下单总量</td>
        			<td>上周老款下单总量</td>
        			<td>上周取消量</td>
        			<td>上周取消总量</td>
        			<td>份额占比</td>
        		</tr>
        	</thead>
        	<tbody>
        		<tr></tr>
        	</tbody>
        </table>-->




        
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
      	pickerOptions:{
      		disabledDate(time) {
            //return time.getTime() > Date.now() - 24*60*60*1000;
            },
            'firstDayOfWeek': 1
      	},
        time:new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1),
        weekStartDate:'',
      	weekEndDate:'',
        table_height:300,
        tableData:[],
        dialogVisible:false,
        comment:'',
        id:'',


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
      this.$nextTick(()=>{
        this.table_height = this.$refs.table_warp.offsetHeight - 40
      })
      

      this.get_weekly_list()







      
      
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
        var date =  new Date(obj*1000);
        var y = 1900+date.getYear();
        var m = "0"+(date.getMonth()+1);
        var d = "0"+date.getDate();
        //var h = date.getHours();
        //console.info(h)
        return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
        //return y+"-"+m.substring(m.length-2,m.length);
      },

	    get_weekly_list(){

	    	this.tableData = []

    		let year = new Date(this.time).getFullYear()

    		let month = new Date(this.time).getMonth()

    		let day = new Date(this.time).getDate()

    		let date = new Date(year,month,day,0,0,0).getTime().toString().substr(0, 10)
    		

	      	this.$http.post(`hydate/get_weekly_list`,{
	      		time:date
	      	})
			.then((data)=>{
				if(data.code == '200'){
					
					let arr = []

					for(let i=0;i<data.data.length;i++){

						for(let j=0;j<data.data[i].list.length;j++) {

							arr.push({...data.data[i].list[j]})
						}
					}


					this.tableData = arr






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
	   }

	    // formatDate(obj){
	    //     //var date =  new Date(obj*1000);
	    //     var y = obj.getFullYear();
	    //     var m = "0"+(obj.getMonth()+1);
	    //     var d = "0"+obj.getDate();
	    //     //var h = date.getHours();
	    //     //console.info(h)
	    //     return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
	    //     //return y+"-"+m.substring(m.length-2,m.length);
	    // },



     //    format(){

    	// 	let weekDate = this.getWeekStartAndEnd(this.time)

    	// 	return weekDate
    	// },




    	//         // 获取指定日期的那一周的开始、结束日期

     //    getWeekStartAndEnd(val) {

     //        let now = '';

     //        if(val) {

     //            now = new Date(val); // 日期

     //        } else {

     //            now = new Date(); // 日期

     //        }

            
     //        let nowDayOfWeek = now.getDay(); // 本周的第几天

     //        let nowDay = now.getDate(); // 当前日

     //        let nowMonth = now.getMonth(); // 当前月

     //        let nowYear = now.getFullYear(); // 当前年

     //        //console.info(nowDayOfWeek,nowDay,nowMonth,nowYear)
            



     //        let weekStart = this.getWeekStartDate(nowYear, nowMonth, nowDay, nowDayOfWeek)
            

     //        let weekEnd = this.getWeekEndDate(nowYear, nowMonth, nowDay, nowDayOfWeek)

     //        //this.weekFormat = weekStart + '~' + weekEnd

     //        return weekStart + '~' + weekEnd


     //    },

     //    // 获得某一周的开始日期

     //    getWeekStartDate(nowYear, nowMonth, nowDay, nowDayOfWeek) {

     //        let weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1)

     //        this.weekStartDate = weekStartDate

     //        return this.formatDate(weekStartDate)

     //    },

     //    // 获得某一周的结束日期

     //    getWeekEndDate(nowYear, nowMonth, nowDay, nowDayOfWeek) {

     //        let weekEndDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek))

     //        this.weekEndDate = weekEndDate

     //        return this.formatDate(weekEndDate)

     //    },





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

      .monbtn{
        position: relative;
        //width:180px;
        background-color: rgb(140, 206, 173);
        color: #fff; 
      }
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

        table {
        	width: 100%;
        	text-align: center;
        	border:1px solid #cecece;
        	border-right:0px;
        	border-bottom:0px;

        	thead {
        		td {
        			background-color:#3f3f3f;
        			height: 50px;
        			color: #fff;
        			border-right: 1px solid #cecece;
        		}
        	}

        	tbody {
        		td {
        			height: 36px;
        			border-right: 1px solid #cecece;
        			border-bottom: 1px solid #cecece;
        			min-width: 43px;
        		}
        	}
        }



        .pagination {
            position: absolute;
            bottom: 0px;
            right: 20px;
          }



      }
  }
}
  
</style>
