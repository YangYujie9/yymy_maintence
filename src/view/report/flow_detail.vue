<template>
  <div class="report">
    <div class="report_warp">

      <div class="report_warp_top">

        <p class="input_p1">
          <el-date-picker
            v-model="search.start"
            type="date"
            placeholder="选择日期"
            :clearable='false'
            class="input_class">
          </el-date-picker>
          <span>至</span>
          <el-date-picker
            v-model="search.end"
            type="date"
            placeholder="选择日期"
            :clearable='false'
            class="input_class">
          </el-date-picker>

        </p>

        <p class="input_p1">
          <el-select v-model="search.shopId" filterable class="input_class" @change="get_condition_list">
            <el-option v-for="item in shop_list"
             :key="item.id"
             :value="item.id"
             :label="item.shopNum">
              
            </el-option>
            
          </el-select>
<!--      <el-cascader
          :options="shop_list"
          :props="props"
          collapse-tags
          ref="checkshopid"
          placeholder="选择品牌店铺"
          v-model="search.shopId"
          clearable
          filterable>
      </el-cascader>  -->       
    </p>

        <p class="input_p1">

          <el-cascader v-model="search.trafficSourcess" 
            clearable 
            filterable 
            multiple 
            collapse-tags 
            :show-all-levels="false"
            :options="source_list"
            :props="{multiple: true}"
            placeholder="请选择流量来源" 
            style="width: 240px;"
            class="input_class">    
          </el-cascader>
     
    </p>

        <p class="input_p1">
          <el-select v-model="search.sourcesDetails" 
            clearable 
            filterable 
            multiple 
            collapse-tags 
            placeholder="请选择来源明细" 
            style="width: 215px;"
            class="input_class">
            <el-option v-for="item in field_list"
             :key="item.id"
             :value="`${item.id}-${item.field}-${item.name}`"
             :label="item.name">
              
            </el-option>
            
          </el-select>
     
    </p>
        <el-button class="monbtn" @click="get_detail">搜 索</el-button>


      </div>

      <div class="report_warp_content" ref="table_warp" v-show="show"
      v-loading="loading"    
      :element-loading-text="loading_text"
      element-loading-spinner="el-icon-loading">
        <div class="top_div">
          <div class="left_top">
            <table>
              <tr>
                <td style="width: 91px">流量来源</td>
                <td style="width: 182px">来源明细</td>
                <td style="width: 118px">字段</td>
              </tr>
            </table>
          </div>
          <div class="right_top">
            <table ref="timelist" style="position: relative;">
              <tr>
                <td v-for="list in time_list" style="min-width: 90px;">{{fmtDate(list)}}</td>
              </tr>
            </table>

          </div>
        </div>

        <div class="bottom_div">
            <div class="left_bottom">
            <table ref="itemlist" style="position: relative;" class="">
              <tr v-for="list in tableData">
                <td style="width: 90px;padding-top: 2%;" :class="{big_padding:search_field.length>3}" valign="top">{{list.sourcesDetail}}</td>
                <td class="border0">
                  <table>
                    <tr v-if="index1<5" v-for="(list1,index1) in list.list">
                      <td style="width: 180px;">{{list1.souName}}</td>
                      <td class="border0">
                        <table>
                          <tr v-for="item in search_field">
                            <td style="width: 120px;border-bottom:1px solid #ccc;">{{item.name}}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <tr v-if="index1>=5 && index1 <10 && show_two == true" v-for="(list1,index1) in list.list">
                      <td style="width: 90px;">{{list1.souName}}</td>
                      <td class="border0">
                        <table>
                          <tr v-for="item in search_field">
                            <td style="width: 120px;border-bottom:1px solid #ccc;">{{item.name}}</td>
                          </tr>
                        </table>
                      </td>
                    </tr> 

                    <tr v-if="index1>=10 && show_three == true" v-for="(list1,index1) in list.list">
                      <td style="width: 90px;">{{list1.souName}}</td>
                      <td class="border0">
                        <table>
                          <tr v-for="item in search_field">
                            <td style="width: 120px;border-bottom:1px solid #ccc;">{{item.name}}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>      
          </div>


          <div class="right_bottom_warp" ref="viewBox">
            <div class="right_bottom"  :style="{height: table_height1 + 'px'}"  >
              <table class="table2" >
                <tr v-for="(list,index) in tableData">
                  <td style="min-width: 90px;border-bottom: 0px;">
                    <table class="table2">
                      <tr v-for="(list1,index1) in list.list">
                        <td v-if="index1<5" style="border-bottom: 0px;border-top: 0px;">
                          <table class="table3">
                            <tr >
                              <td  style="min-width: 90px;max-width: 90px;" v-for="(item,indx) in list1.list">
                                  <table class="table3">
                                  <tr v-for="item1 in search_field">
                                    <td  style="min-width: 90px;max-width: 90px;border-bottom:1px solid #ccc;">{{get_field_value(index,index1,indx,item1.field)}}</td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>

                        <td v-if="index1>=5 && index1 <10 && show_two == true" style="border-bottom: 0px;border-top: 0px;">
                          <table class="table3">
                            <tr >
                              <td  style="min-width: 90px;max-width: 90px;" v-for="(item,indx) in list1.list">
                                  <table class="table3">
                                  <tr v-for="item1 in search_field">
                                    <td  style="min-width: 90px;max-width: 90px;border-bottom:1px solid #ccc;">{{get_field_value(index,index1,indx,item1.field)}}</td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>   

                        <td v-if="index1>=10 && show_three == true" style="border-bottom: 0px;border-top: 0px;">
                          <table class="table3">
                            <tr >
                              <td  style="min-width: 90px;max-width: 90px;" v-for="(item,indx) in list1.list">
                                  <table class="table3">
                                  <tr v-for="item1 in search_field">
                                    <td  style="min-width: 90px;max-width: 90px;border-bottom:1px solid #ccc;">{{get_field_value(index,index1,indx,item1.field)}}</td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table> 
            </div>
          </div>
        </div>

  




        
      </div>


      <div class="nomore" v-show="!show">暂无数据</div>


    </div>


    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

  export default {
    name: "system-setting",
    data(){
      return{
        search:{
          start:new Date(new Date(new Date().toLocaleDateString()).getTime() - 14*24*3600*1000),
          end:new Date(new Date(new Date().toLocaleDateString()).getTime()),
          shopId:'',
          sourcesDetails:'',
          trafficSourcess:[]

        },
        show_two: false,
        show_three:false,
        loading:false,
        loading_text:'加载中',
        table_height:300,
        tableData:[],
        show: true,
        field_list: [],
        source_list: [],
        search_field: [],
        shop_list: [],
        time_list:[],
        table_height1: 300,
        props: {
          value: 'id',
          label: 'shopNum'
        },
        startIndex:0,
   //      field_interpretation:{
      // attentionShopNum: '关注店铺买家数',
      // collectShopNum: '收藏商品买家数',
      // date: '日期',
      // guestPrice:'客单价',
      // newPeople: '新访客',
      // orderMoney: '下单金额',
      // orderPayMoney: '下单买家数',
      // payMoney: '支付金额',
      // payMoneyNum: '支付买家数',
      // payPercentConversion: '支付转化率',
      // percentConversion: '下单转化率',
      // purchasedNum: '加购人数',
      // uv: 'UV价值',
      // visitorNum: '访客数'      
   //     }



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



      this.$refs.viewBox.addEventListener('scroll', () => {
          this.$refs.timelist.style.left = - this.$refs.viewBox.scrollLeft  + 'px'
        }, false)

      this.$refs.viewBox.addEventListener('scroll', () => {
          this.$refs.itemlist.style.top = - this.$refs.viewBox.scrollTop + 'px'

                let scrollTop = this.$refs.viewBox.scrollTop;
                this.startIndex = Math.floor(scrollTop / 390);
                //console.info(this.startIndex)
        }, false)

      this.get_shop_by_brand()







      
      
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


      get_field_name(item) {
        let name = ''

        for(let key in this.field_interpretation){
          if(item == key){
            name = this.field_interpretation[key]
          }

        }

        return name


      },
      get_field_value(id1,id2,id3,item) {
        let value = ''
        if(item == 'date'){
          value = this.fmtDate(this.tableData[id1].list[id2].list[id3][item])
        }
        else {
          value = this.tableData[id1].list[id2].list[id3][item]
        }

        return value





      },

      
      get_shop_by_brand() {
        this.$http.get(`shopFlow/get_shop_list`)
                .then((data)=>{

                  if(data.code == '200'){
                    this.shop_list = data.data

                    this.search.shopId = data.data[0].id


                    
                    this.get_condition_list()
                  }else {
                    return this.$message({
                      message:data.msg,
                      type:'error'
                    })
                  }
                //  let arr = []
                //  for (let i=0;i<data.data.length;i++) {

                //    arr[i] = {
                //      value: data.data[i].id,
                    // label: data.data[i].brandName,
                //    }

                //    if (data.data[i].list.length) {
                //      arr[i].children = []
                //      for (let j=0;j<data.data[i].list.length;j++) {


                 //       arr[i].children.push({
                 //         value: data.data[i].list[j].id,
                    //    label: data.data[i].list[j].shopNum,
                    //    //disabled: !data.data[i].list[j].sellStatus
                 //       })  


                 //       this.totalshops.push(data.data[i].list[j].id)
                 //     }
                //    }



                    
                //  }



                //  this.shop_list = arr

                  
                    
                })
                .catch(()=>{
                    this.$message({
                      message: '接口报错',
                      type: 'error'
                    })
                })
      },


      find_show_log() {
        this.$http.get(`shopFlow/find_show_log?shopId=${this.search.shopId}`)
                .then((data)=>{

                  if(data.code == '200'){

                    if(data.data){

                      let list = []
                      list = data.data.split(',')

                      let arr = []

                      for(let i=0;i<this.source_list.length;i++){


                        

                        for(let j=0;j<this.source_list[i].children.length;j++){

                          for(let k=0;k<list.length;k++) {

                            if(list[k] == this.source_list[i].children[j].value) {
                              arr[k] = []

                              arr[k].push(this.source_list[i].value)

                              

                               arr[k].push(Number(list[k]))

                            }
                          }
                        }

                      }
                      console.info(arr)

                      this.search.trafficSourcess  =  arr
                    }





                    this.get_detail()



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

      get_condition_list () {
        this.show = true
        this.$http.get(`shopFlow/get_condition_list`)
                .then((data)=>{

                  if(data.code == '200'){
                    this.field_list = []
                    this.source_list = []

                    this.field_list = data.data.nameList


                    

                    //

                    let list = []

                    if(data.data.sourcesDetailList && data.data.sourcesDetailList.length){


                      for(let i=0;i<data.data.sourcesDetailList.length;i++){

                        list.push({value:data.data.sourcesDetailList[i].trafficSourcesCade, label:data.data.sourcesDetailList[i].trafficSources})


                        list[i]['children'] = []



                        for(let j=0;j<data.data.sourcesDetailList[i].sourcesDetailList.length;j++){
                          list[i]['children'].push({value: data.data.sourcesDetailList[i].sourcesDetailList[j].sourcesDetailCade, label:data.data.sourcesDetailList[i].sourcesDetailList[j].sourcesDetail})


                        }


                      }
                    }

                    //console.info(list)

                    this.source_list = list


                    this.find_show_log()







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
      get_detail(){

        this.show = true
        this.loading = true
        let starttime = this.search.start?this.search.start.getTime().toString().substr(0,10):''
        let endtime = this.search.end?this.search.end.getTime().toString().substr(0,10):''
        let days = Number((endtime - starttime)/(24*3600) + 1).toFixed()


        

        if(days > 15){
          return this.$message({
            message:'查询的天数不能超过15天，请重新选择',
            type:'warning'
          })
        }

        if(!this.search.shopId){
          return this.$message({
            message:'请选择一个店铺',
            type:'warning'
          })  
        }

        
        this.loading_text = '加载中'
        this.show_two = false
        this.show_three = false

        this.time_list = []


        let arr = []


        if(this.search.trafficSourcess.length){

          for(let i=0;i<this.search.trafficSourcess.length;i++){

            if(this.search.trafficSourcess[i].length>1){

              arr.push(this.search.trafficSourcess[i][1])
            }
          }

        }



        this.$http.post(`shopFlow/get_detail`,{
            startTime: starttime,
            endTime: endtime,
            shopId: this.search.shopId,
            trafficSourcess: arr.length?arr.join():''
        })
        .then((data)=>{

          if(data.code == '200'){

            this.loading = false
            


            //let check = JSON.stringify(data.data) ;


            if(!data.data.length){

              this.loading_text = '暂无数据'
              this.show = false
              //this.loading = false
              return

            } else {



                //筛选的来源明细字段
              

              let list = []
              let list1 = []
              


              // for(let key in data.data){

              //  list1.push({type:key})

              //  list.push({type:key,list:data.data[key]})
                
              // }



            

            // for(let key in data.data){

            //  for(let i=0;i<arr.length;i++){
            //    if(arr[i].name == key){
            //      arr[i].list = []

            //      for(let j=0;j<data.data[key].length;j++){
            //        arr[i].list.push({sourcesDetail:data.data[key][j].sourcesDetail})
            //        arr[i].list[j].list = []

            //        for(let item in data.data[key][j].list[0]) {
            //          arr[i].list[j].list.push(item)
            //        }
            //      }
            //    }
            //  }
            // }


              for(let i=days;i>0;i--){
                this.time_list.push(Number(starttime) + (i - 1) * 24 * 3600)
              }



              this.time_list.forEach((key)=>{
                console.info(this.fmtDate(key))
              })
              


              // for(let item in list[0].list[0].list[0]){
              //  if(item != 'date'){
              //    arr.push(item)
              //  }
                
              // }

              //流量明细字段列表
              let arr1 = []
              let arr0 = []



              if(this.search.sourcesDetails.length){
                for(let i=0;i<this.search.sourcesDetails.length;i++){

                  arr0 = this.search.sourcesDetails[i].split('-')


                  arr1.push({id: arr0[0],field: arr0[1] ,name:arr0[2]})

                }
              }
   

              let data_list = []

              this.table_height1 = 0

              for(let i=0;i<data.data.length;i++){
                data_list.push({sourcesDetail: data.data[i].sourcesDetail})

                data_list[i].list = []
                this.table_height1 += data.data[i].list.length * 30 *13

                for(let j=0;j<data.data[i].list.length;j++){
                  data_list[i].list.push({souName:data.data[i].list[j].souName})

                  data_list[i].list[j].list = []



                  for(let k=days;k>0;k--){

                    

                    data_list[i].list[j].list.push({
                        attentionShopNum: 0,
                        collectShopNum: 0,
                        date: Number(starttime) + (k - 1)* 24 * 3600,
                        guestPrice: 0,
                        newPeople: 0,
                        orderMoney: 0,
                        orderPayMoney: 0,
                        payMoney: 0,
                        payMoneyNum: 0,
                        payPercentConversion: 0,
                        percentConversion: 0,
                        purchasedNum: 0,
                        uv: 0,
                        visitorNum: 0      
                    })
                  }


                  for(let k=0;k<data.data[i].list[j].list.length;k++){
                    let cha = days - (data.data[i].list[j].list[k].date - starttime)/24/3600 - 1
                    //console.info(cha)
                    data_list[i].list[j].list[cha].attentionShopNum = data.data[i].list[j].list[k].attentionShopNum
                    data_list[i].list[j].list[cha].collectShopNum = data.data[i].list[j].list[k].collectShopNum
                    data_list[i].list[j].list[cha].guestPrice = data.data[i].list[j].list[k].guestPrice
                    data_list[i].list[j].list[cha].newPeople = data.data[i].list[j].list[k].newPeople
                    data_list[i].list[j].list[cha].orderMoney = data.data[i].list[j].list[k].orderMoney
                    data_list[i].list[j].list[cha].orderPayMoney = data.data[i].list[j].list[k].orderPayMoney
                    data_list[i].list[j].list[cha].payMoney = data.data[i].list[j].list[k].payMoney
                    data_list[i].list[j].list[cha].payMoneyNum = data.data[i].list[j].list[k].payMoneyNum
                    data_list[i].list[j].list[cha].payPercentConversion = data.data[i].list[j].list[k].payPercentConversion
                    data_list[i].list[j].list[cha].percentConversion = data.data[i].list[j].list[k].percentConversion
                    data_list[i].list[j].list[cha].purchasedNum = data.data[i].list[j].list[k].purchasedNum
                    data_list[i].list[j].list[cha].uv = data.data[i].list[j].list[k].uv
                    data_list[i].list[j].list[cha].visitorNum = data.data[i].list[j].list[k].visitorNum
                  }                
                }
              }
              //console.info(data_list)
              



              // for(let i=0;i<data.data.length;i++){

              //   for(let j=0;j<data.data[i].list.length;j++)

              //     for(let k=0;k<data.data[i].list[j].list.length;k++){
              //       let cha = (data.data[i].list[j].list[k].date - starttime)/24/3600
              //       data_list[i].list[j].list[cha].attentionShopNum = data.data[i].list[j].list[k].attentionShopNum
              //       data_list[i].list[j].list[cha].collectShopNum = data.data[i].list[j].list[k].collectShopNum
              //       data_list[i].list[j].list[cha].guestPrice = data.data[i].list[j].list[k].guestPrice
              //       data_list[i].list[j].list[cha].newPeople = data.data[i].list[j].list[k].newPeople
              //       data_list[i].list[j].list[cha].orderMoney = data.data[i].list[j].list[k].orderMoney
              //       data_list[i].list[j].list[cha].orderPayMoney = data.data[i].list[j].list[k].orderPayMoney
              //       data_list[i].list[j].list[cha].payMoney = data.data[i].list[j].list[k].payMoney
              //       data_list[i].list[j].list[cha].payMoneyNum = data.data[i].list[j].list[k].payMoneyNum
              //       data_list[i].list[j].list[cha].payPercentConversion = data.data[i].list[j].list[k].payPercentConversion
              //       data_list[i].list[j].list[cha].percentConversion = data.data[i].list[j].list[k].percentConversion
              //       data_list[i].list[j].list[cha].purchasedNum = data.data[i].list[j].list[k].purchasedNum
              //       data_list[i].list[j].list[cha].uv = data.data[i].list[j].list[k].uv
              //       data_list[i].list[j].list[cha].visitorNum = data.data[i].list[j].list[k].visitorNum
              //     }
              // }


            //console.info(this.time_list)

             setTimeout(()=>{
                this.show_two = true
              },800)


              setTimeout(()=>{
                this.show_three = true
              },1000)




              this.tableData = data_list
              console.info(this.tableData)



              this.search_field = this.search.sourcesDetails.length? arr1: this.field_list
              //console.info(this.search_field)
              
              //console.info(this.tableData)            
            }
            



          }else {
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
            width: 170px;
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
        text-align: center;
        //background-color:#eee;


        .top_div {
          display: flex;
          height: 40px;
          line-height: 40px;
          position:relative;
          //width: calc(100vw - 594px);

          td {
            background-color: #3f3f3f;
            color: #fff;
          }


          .left_top {
            width: 390px;
            height: 40px;
            //background-color:blue;
          }

          .right_top {
            width: calc(100vw - 704px);
            position:relative;
            overflow: hidden;
            border-bottom:1px solid #ccc;
            height: 42px;
            //background-color:red;
            td {border-left: 0px;}
          }

  
        }



        .bottom_div {
          display: flex;
          height: calc(100vh - 230px);
          position: relative;

          td {
            border-top:0px;
          }


          .left_bottom {
            height: calc(100vh - 248px);
            width: 390px;
            margin-top: 0px;
              //background-color:lightblue;
              overflow: hidden;
              position:relative;


              .big_padding {
                padding-top:15% !important;
              }

              .small_padding {
                padding-top:2%;
              }

        .border0{
            padding:0;
        }
        .border0 table{
            border-style:hidden;
            border-width:0;
        }

          }

          .right_bottom_warp {
            height: calc(100vh - 238px);
            
            width: calc(100vw - 700px);
            overflow: scroll;
            position:relative;

              td {
                border-left: 0px;
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

            .right_bottom {

              
              
            
            
            
            
              //background-color:lightgreen;



          }



        .table2 tr td:nth-child(1) {
            border-left: 0;
        }
        .table2 tr td:nth-last-child(1) {
            border-right: 0;
        }
        .table2 tr:nth-child(1) td{
            border-top: 0;
        }
        .table2 tr:nth-last-child(1) td {
            border-bottom: 0;
        }

        
          .table3 tr:nth-last-child(1) td {
                border-bottom: 0;
            }
        
         }

        }


        table {
          border-collapse: collapse;
          border:0px;
          width: 100%;

          tr {

            td {
              height: 30px;
              border:1px solid #ccc;
            }
          }
        }



      }



        .nomore{
          height: 100%;
          width: 100px;
          margin: 30% auto;
        }
  }
}
  
</style>
