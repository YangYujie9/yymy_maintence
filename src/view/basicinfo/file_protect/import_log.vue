<template>
  <div @click="brand_show_false"   class="import_log">
   <div class="import_log-top">
     选择时间：
     <el-date-picker
      v-model="logtime"
      style="display: inline-block;width: 200px;"
      size="small"
      :clearable="clearabletime"
      @change="brandchange"

      type="date"
      placeholder="选择日期">
    </el-date-picker>
   </div>
   <div ref="brand_one_wrap" class="import_log-second">
     <div  class="import_log-second-left">
        <div class="left-title">
         菲碧
        </div>
        <div class="left-bottom">
          <div v-for="(list,index) in brandone_list" class="left-bottom-detail">
            <span @click.stop="enter_detail_one(list)" :class="{'span_grey' : list.status==0, 'span_green': list.status==1,'span_yellow': list.status==2,'span_red': list.deleteLogVOList}" class="left-bottom-detail-circle span-i pointer">
              {{list.shopName}}


              <div v-if="list.show && !list.deleteLogVOList" class="detail-popover">


                <div v-for="lista in list.tableLogVOS" class="detail-popover-list">

                  <p  class="p-first">
                    <i style="font-size: 36px;" class="iconfont iconbaobiao
                    ">
                      
                    </i> 
                    <span class="font-span">{{lista.tableName}}</span>
                    <i v-if="lista.createTime" style="color: green;font-size: 22px;position: absolute;top: 20px;right: 0px;" class="el-icon-success">
                    </i>
                    <i v-if="!lista.createTime" style="color: red;font-size: 22px;position: absolute;top: 20px;right: 0px;" class="el-icon-error">
                    </i>


                    <span class="span-time">{{lista.createTime ? fmtDateHm(lista.createTime) : ''}}</span>
                  </p>


                </div>
                
              </div>


              <div v-if="list.show && list.deleteLogVOList" class="detail-popover-del">
                <div class="flex-left">
                  <div v-for="lista in list.tableLogVOS" class="detail-popover-list">

                    <p  class="p-first">
                      <i style="font-size: 36px;" class="iconfont iconbaobiao
                      ">
                        
                      </i> 
                      <span class="font-span">{{lista.tableName}}</span>
                      <i v-if="lista.createTime" style="color: green;font-size: 22px;position: absolute;top: 20px;right: 0px;" class="el-icon-success">
                      </i>
                      <i v-if="!lista.createTime" style="color: red;font-size: 22px;position: absolute;top: 20px;right: 0px;" class="el-icon-error">
                      </i>


                      <span class="span-time">{{lista.createTime ? fmtDateHm(lista.createTime) : ''}}</span>
                    </p>


                  </div>


                  
                </div>


                <div class="flex-right">

                  <div  v-for="listb in list.deleteLogVOList" class="popevl-del-list">
                    <span class="text-name">{{listb.staffName}}</span>

                    <span class="text-name-del">删除数据</span>
                    <span class="text-name-time">{{listb.deleteTime ? fmtDate(listb.deleteTime) : ''}}</span>
                    <span class="cilcle-pop"></span>
                    <span class="cilcle-shu"></span>
                  </div>
                  
                  
                </div>

                
                
              </div>
            </span>

            <p style="font-size: 14px;">{{list.status ? fmtDateHm(list.tableLogVOS[0].createTime)+'分' : '&nbsp'}}</p>
            <p style="font-size: 14px;">{{list.status ? fmtDatenoyear(list.tableLogVOS[0].createTime) : '&nbsp'}}</p>

          </div>
          
          
        </div>
     </div>
     <div :class="{'project-show-antimate': log_oneshow}" :style="{'height': brand_one_margin_top + 'px'}"  class="import_log-second-right">
       <div :style="{'margin-top': (brand_one_margin_top-60)/2 + 'px'}" @click="log_oneshow = !log_oneshow" class="right-one pointer">
        <i class="el-icon-arrow-left"></i> 
       </div>
       <div class="right-two">
         <div class="right-two-title">删除日志</div>
         <div :style="{height:  brand_one_margin_top-60 + 'px'} "class="right-two-wrap">

            <div v-for="listb in deleteLogVOS_one" class="popevl-del-list">
              <span class="text-name">{{listb.staffName}}</span>
              <span style="top: 34px;font-size: 14px;" class="text-name-del">删除{{listb.shopName}}</span>
              <span style="top: 54px;" class="text-name-del ">{{listb.time ? fmtDate(listb.time) : ''}}数据</span>
              <span style="top: 0px;left: 160px" class="text-name-time">{{listb.deleteTime ? fmtDateHm(listb.deleteTime) : ''}}分</span>
              <span style="top: 16px;left: 160px" class="text-name-time">{{listb.deleteTime ? fmtDatenoyear(listb.deleteTime) : ''}}</span>
              <span class="cilcle-pop"></span>
              <span class="cilcle-shu"></span>
            </div>
                  
                  

         </div>
       </div>
     </div>
   </div>

   <div ref="brand_two_wrap" class="import_log-second">
     <div  class="import_log-second-left">
        <div class="left-title">
         初彤
        </div>
        <div class="left-bottom">
          <div v-for="(list,index) in brandtwo_list" class="left-bottom-detail">
             <span @click.stop="enter_detail_one(list)" :class="{'span_grey' : list.status==0, 'span_green': list.status==1,'span_yellow': list.status==2,'span_red': list.deleteLogVOList}" class="left-bottom-detail-circle span-i pointer">
              {{list.shopName}}


              <div v-if="list.show && !list.deleteLogVOList" class="detail-popover">


                <div v-for="lista in list.tableLogVOS" class="detail-popover-list">

                  <p  class="p-first">
                    <i style="font-size: 36px;" class="iconfont iconbaobiao
                    ">
                      
                    </i> 
                    <span class="font-span">{{lista.tableName}}</span>
                    <i v-if="lista.createTime" style="color: green;font-size: 22px;position: absolute;top: 20px;right: 0px;" class="el-icon-success">
                    </i>
                    <i v-if="!lista.createTime" style="color: red;font-size: 22px;position: absolute;top: 20px;right: 0px;" class="el-icon-error">
                    </i>


                    <span class="span-time">{{lista.createTime ? fmtDateHm(lista.createTime) : ''}}</span>
                  </p>


                </div>
                
              </div>


              <div v-if="list.show && list.deleteLogVOList" class="detail-popover-del">
                <div class="flex-left">
                  <div v-for="lista in list.tableLogVOS" class="detail-popover-list">

                    <p  class="p-first">
                      <i style="font-size: 36px;" class="iconfont iconbaobiao
                      ">
                        
                      </i> 
                      <span class="font-span">{{lista.tableName}}</span>
                      <i v-if="lista.createTime" style="color: green;font-size: 22px;position: absolute;top: 20px;right: 0px;" class="el-icon-success">
                      </i>
                      <i v-if="!lista.createTime" style="color: red;font-size: 22px;position: absolute;top: 20px;right: 0px;" class="el-icon-error">
                      </i>


                      <span class="span-time">{{lista.createTime ? fmtDateHm(lista.createTime) : ''}}</span>
                    </p>


                  </div>


                  
                </div>


                <div class="flex-right">

                  <div  v-for="listb in list.deleteLogVOList" class="popevl-del-list">
                    <span class="text-name">{{listb.staffName}}</span>
                    <span class="text-name-del">删除数据</span>
                    <span class="text-name-time">{{listb.deleteTime ? fmtDate(listb.deleteTime) : ''}}</span>
                    <span class="cilcle-pop"></span>
                    <span class="cilcle-shu"></span>
                  </div>
                  
                  
                </div>

                
                
              </div>
            </span>

            <p style="font-size: 14px;">{{list.status ? fmtDateHm(list.tableLogVOS[0].createTime)+'分' : '&nbsp'}}</p>
            <p style="font-size: 14px;">{{list.status ? fmtDatenoyear(list.tableLogVOS[0].createTime) : '&nbsp'}}</p>

          </div>
          
          
        </div>
     </div>
     <div :class="{'project-show-antimate': log_twoshow}" :style="{'height': brand_two_margin_top + 'px'}"  class="import_log-second-right">
       <div :style="{'margin-top': (brand_two_margin_top-60)/2 + 'px'}" @click="log_twoshow = !log_twoshow" class="right-one pointer">
        <i class="el-icon-arrow-left"></i> 
       </div>
       <div class="right-two">
         <div class="right-two-title">删除日志</div>
         <div :style="{height:  brand_two_margin_top-60 + 'px'} "class="right-two-wrap">

            <div v-for="listb in deleteLogVOS_two" class="popevl-del-list">
              <span class="text-name">{{listb.staffName}}</span>
              <span style="top: 34px;font-size: 14px;" class="text-name-del">删除{{listb.shopName}}</span>
              <span style="top: 54px;" class="text-name-del ">{{listb.time ? fmtDate(listb.time) : ''}}数据</span>
              <span style="top: 0px;left: 160px" class="text-name-time">{{listb.deleteTime ? fmtDateHm(listb.deleteTime) : ''}}分</span>
              <span style="top: 16px;left: 160px" class="text-name-time">{{listb.deleteTime ? fmtDatenoyear(listb.deleteTime) : ''}}</span>
              <span class="cilcle-pop"></span>
              <span class="cilcle-shu"></span>
            </div>
                  
                  

         </div>
       </div>
     </div>
   </div>

   <div ref="brand_three_wrap" class="import_log-second">
     <div  class="import_log-second-left">
        <div class="left-title">
         形色
        </div>
        <div class="left-bottom">
          <div v-for="(list,index) in brandthree_list" class="left-bottom-detail">
            <span @click.stop="enter_detail_one(list)" :class="{'span_grey' : list.status==0, 'span_green': list.status==1,'span_yellow': list.status==2,'span_red': list.deleteLogVOList}" class="left-bottom-detail-circle span-i pointer">
              {{list.shopName}}


              <div v-if="list.show && !list.deleteLogVOList" class="detail-popover">


                <div v-for="lista in list.tableLogVOS" class="detail-popover-list">

                  <p  class="p-first">
                    <i style="font-size: 36px;" class="iconfont iconbaobiao
                    ">
                      
                    </i> 
                    <span class="font-span">{{lista.tableName}}</span>
                    <i v-if="lista.createTime" style="color: green;font-size: 22px;position: absolute;top: 20px;right: 0px;" class="el-icon-success">
                    </i>
                    <i v-if="!lista.createTime" style="color: red;font-size: 22px;position: absolute;top: 20px;right: 0px;" class="el-icon-error">
                    </i>


                    <span class="span-time">{{lista.createTime ? fmtDateHm(lista.createTime) : ''}}</span>
                  </p>


                </div>
                
              </div>


              <div v-if="list.show && list.deleteLogVOList" class="detail-popover-del">
                <div class="flex-left">
                  <div v-for="lista in list.tableLogVOS" class="detail-popover-list">

                    <p  class="p-first">
                      <i style="font-size: 36px;" class="iconfont iconbaobiao
                      ">
                        
                      </i> 
                      <span class="font-span">{{lista.tableName}}</span>
                      <i v-if="lista.createTime" style="color: green;font-size: 22px;position: absolute;top: 20px;right: 0px;" class="el-icon-success">
                      </i>
                      <i v-if="!lista.createTime" style="color: red;font-size: 22px;position: absolute;top: 20px;right: 0px;" class="el-icon-error">
                      </i>


                      <span class="span-time">{{lista.createTime ? fmtDateHm(lista.createTime) : ''}}</span>
                    </p>


                  </div>


                  
                </div>


                <div class="flex-right">

                  <div  v-for="listb in list.deleteLogVOList" class="popevl-del-list">
                    <span class="text-name">{{listb.staffName}}</span>

                    <span class="text-name-del">删除数据</span>
                    <span class="text-name-time">{{listb.deleteTime ? fmtDate(listb.deleteTime) : ''}}</span>
                    <span class="cilcle-pop"></span>
                    <span class="cilcle-shu"></span>
                  </div>
                  
                  
                </div>

                
                
              </div>
            </span>

            <p style="font-size: 14px;">{{list.status ? fmtDateHm(list.tableLogVOS[0].createTime)+'分' : '&nbsp'}}</p>
            <p style="font-size: 14px;">{{list.status ? fmtDatenoyear(list.tableLogVOS[0].createTime) : '&nbsp'}}</p>

          </div>
          
          
        </div>
     </div>
     <div :class="{'project-show-antimate': log_threeshow}" :style="{'height': brand_two_margin_top + 'px'}"  class="import_log-second-right">
       <div :style="{'margin-top': (brand_three_margin_top-60)/2 + 'px'}" @click="log_threeshow = !log_threeshow" class="right-one pointer">
        <i class="el-icon-arrow-left"></i> 
       </div>
       <div class="right-two">
         <div class="right-two-title">删除日志</div>
         <div :style="{height:  brand_three_margin_top-60 + 'px'} "class="right-two-wrap">

            <div v-for="listb in deleteLogVOS_three" class="popevl-del-list">
              <span class="text-name">{{listb.staffName}}</span>
              <span style="top: 34px;font-size: 14px;" class="text-name-del">删除{{listb.shopName}}</span>
              <span style="top: 54px;" class="text-name-del ">{{listb.time ? fmtDate(listb.time) : ''}}数据</span>
              <span style="top: 0px;left: 160px" class="text-name-time">{{listb.deleteTime ? fmtDateHm(listb.deleteTime) : ''}}分</span>
              <span style="top: 16px;left: 160px" class="text-name-time">{{listb.deleteTime ? fmtDatenoyear(listb.deleteTime) : ''}}</span>
              <span class="cilcle-pop"></span>
              <span class="cilcle-shu"></span>
            </div>
                  
                  

         </div>
       </div>
     </div>
   </div>


    
  </div>
</template>

<script>

  export default {
    name: "import_log",
    data(){
      return{
        clearabletime: false,
        logtime: new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()-1,0,0,0),
        log_oneshow: true,
        brandone_list: [],
        deleteLogVOS_one: [],
        brand_one_margin_top: 0,
        log_twoshow: true,
        brandtwo_list: [],
        deleteLogVOS_two: [],
        brand_two_margin_top: 0,
        log_threeshow: true,
        brandthree_list: [],
        deleteLogVOS_three: [],
        brand_three_margin_top: 0,
      }
    },
    created() {

    },
    mounted(){ 
      //console.info(Boolean(false))

      this.brandchange()
    },
    methods:{
      brand_show_false() {
        for (let i=0;i<this.brandone_list.length; i++) {
           this.brandone_list[i].show = false
          
        }

        for (let i=0;i<this.brandtwo_list.length; i++) {
           this.brandtwo_list[i].show = false
          
        }

        for (let i=0;i<this.brandthree_list.length; i++) {
           this.brandthree_list[i].show = false
          
        }
      },
      brandchange() {

        this.get_import_log_one()
        this.get_import_log_two()
        this.get_import_log_three()
      },
      enter_detail_one (list) {

        let show = list.show
        for (let i=0;i<this.brandone_list.length; i++) {
           this.brandone_list[i].show = false
          
        }

        for (let i=0;i<this.brandtwo_list.length; i++) {
           this.brandtwo_list[i].show = false
          
        }
        for (let i=0;i<this.brandthree_list.length; i++) {
           this.brandthree_list[i].show = false
          
        }


        list.show = !show

      },
      fmtDateHm(obj){
            var date =  new Date(obj*1000);

           
            var h = "0"+date.getHours();
            var min = "0"+date.getMinutes();

            return h.substring(h.length-2,h.length)+":"+min.substring(min.length-2,min.length);
      },
      fmtDatenoyear(obj) {
        var date =  new Date(obj*1000);

            var y = 1900+date.getYear();
            var m = "0"+(date.getMonth()+1);
            var d = "0"+date.getDate();
            var h = "0"+date.getHours();
            var min = "0"+date.getMinutes();

            return m.substring(m.length-2,m.length)+"."+d.substring(d.length-2,d.length)
            ;
      },
      fmtDate(obj){
            var date =  new Date(obj*1000);

            var y = 1900+date.getYear();
            var m = "0"+(date.getMonth()+1);
            var d = "0"+date.getDate();
            var h = "0"+date.getHours();
            var min = "0"+date.getMinutes();

            return y+"."+m.substring(m.length-2,m.length)+"."+d.substring(d.length-2,d.length)
            ;
      },
      get_import_log_one() {
        let that = this



            this.$http.get(`import/get_import_log?brandId=1&time=${this.logtime.getTime().toString().substr(0, 10)}`)
            .then((data)=> {

              for (let i=0;i<data.data.importLogVOS.length; i++) {
                 data.data.importLogVOS[i].show = false
                
              }

              this.deleteLogVOS_one = data.data.deleteLogVOS

              this.brandone_list = data.data.importLogVOS

              this.$nextTick(()=>{
                this.brand_one_margin_top = this.$refs.brand_one_wrap.offsetHeight - 20

              })
                

                
              })
              .catch(function (error) {
                console.log(error);
                that.$message({
                    message: '接口报错',
                    type: 'error'
                  });
              });
      },

      get_import_log_two() {
        let that = this
            this.$http.get(`import/get_import_log?brandId=2&time=${this.logtime.getTime().toString().substr(0, 10)}`)
            .then((data)=> {

              for (let i=0;i<data.data.importLogVOS.length; i++) {
                 data.data.importLogVOS[i].show = false
                
              }

              this.deleteLogVOS_two = data.data.deleteLogVOS

              this.brandtwo_list = data.data.importLogVOS

              this.$nextTick(()=>{
                this.brand_two_margin_top = this.$refs.brand_two_wrap.offsetHeight - 20

              })
                

                
              })
              .catch(function (error) {
                console.log(error);
                that.$message({
                    message: '接口报错',
                    type: 'error'
                  });
              });
      },

      get_import_log_three() {
        let that = this
            this.$http.get(`import/get_import_log?brandId=3&time=${this.logtime.getTime().toString().substr(0, 10)}`)
            .then((data)=> {

              for (let i=0;i<data.data.importLogVOS.length; i++) {
                 data.data.importLogVOS[i].show = false
                
              }

              this.deleteLogVOS_three = data.data.deleteLogVOS

              this.brandthree_list = data.data.importLogVOS

              this.$nextTick(()=>{
                this.brand_three_margin_top = this.$refs.brand_three_wrap.offsetHeight - 20

              })
                

                
              })
              .catch(function (error) {
                console.log(error);
                that.$message({
                    message: '接口报错',
                    type: 'error'
                  });
              });
      },


    },
  }
</script>

<style scoped lang="less">
.import_log {
  height: calc(100vh - 70px);
  background: #f2f2f2;
  overflow-y: scroll;
  padding: 10px;
  padding-bottom: 80px;

  &-top {
    font-size: 14px;
    height: 60px;
    background: #ffffff;
    padding-left: 30px;
    line-height: 60px;

  }

  &-second {
    margin-top: 10px;
    background: #ffffff;
    display: flex;
    padding: 10px;
    padding-right: 0px;


    &-left {
      flex: 1;

      .left-title {
        height: 40px;
        line-height: 40px;
        padding-left: 30px;
        margin-bottom: 30px;
      }

      .left-bottom {
        padding-left: 30px;
        padding-right: 30px;
        padding-bottom: 20px;
        text-align: center;
        display: flex;
        flex-wrap: wrap;

        &-detail {
          width: 12.5%;
          margin-bottom: 30px;
          text-align: center;
          display: inline-block;
          

          

          .span-i {
            width: 60px;
            display: inline-block;
            height: 60px;
            position: relative;
            
            border-radius: 50%;
            line-height: 60px;
            text-align: center;
            font-size: 18px;
            margin-bottom: 10px;

            .detail-popover-del {
                position: absolute;
                left: 40px;
                height: 370px;
                top: 40px;
                border-radius: 8px;
                width: 520px;
                border: 1px solid #eeeeee;
                padding: 16px 30px 16px 30px;
                background: #ffffff;
                color: #131313;
                display: flex;
                z-index: 100;

                .flex-left {
                  width: 220px;
                  border-right: 1px solid #eeeeee;
                  padding-right: 20px;

                }

                .flex-right {
                  height: 340px;
                  overflow-y: scroll;
                  width: 240px;
                  padding-left: 20px;

                  .popevl-del-list {
                    height: 80px;
                    width: 100%;
                    position: relative;

                    .cilcle-pop {
                      position: absolute;
                      display: inline-block;
                      width: 24px;
                      height: 24px;
                      border-radius: 50%;
                      border: 1px solid #eeeeee;
                      top: 0px;
                      left: 70px;


                    }

                    .text-name-time {
                       position: absolute;
                      left: 120px;
                      top: 10px;
                      font-size: 14px;

                    }

                    .cilcle-shu {
                      position: absolute;
                      width: 4px;
                      height: 50px;
                      border-radius: 4px;
                      border: 1px solid #eeeeee;
                      top: 28px;
                      left: 80px;
                    }

                    .text-name {
                      position: absolute;
                      left: 0px;
                      top: 30px;
                      font-size: 14px;


                    }

                    .text-name-del {
                      position: absolute;
                      left: 110px;
                      top: 30px;
                      font-size: 14px;
                    }
                  }


                }
            }



            .detail-popover {
              position: absolute;
              left: 40px;
              top: 40px;
              border-radius: 8px;
              width: 240px;
              border: 1px solid #eeeeee;
              padding: 16px 30px 16px 30px;
              background: #ffffff;
              color: #131313;
              z-index: 1000;


              &-list {
                height: 66px;


                .p-first {
                  text-align: left;

                  font-size: 15px;
                  position: relative;
                  top: -6px;


                  .font-span {
                    position: relative;
                    padding-left: 12px;
                    top: -8px;
                  }

                  .span-time {
                    position: absolute;
                    right: 0px;
                    top: 26px;
                  }
                }
              }


            }

            &.span_grey {
              background: #f3f3f3;
            }

            &.span_green {
              background: #35c897;
              color: #ffffff;
            }

            &.span_yellow {
              background: #cbcc64;
              color: #ffffff;
            }

            &.span_red {
              background: #fad2d4;
              color: #ffffff;
            }


          }
        }



      }
    }

    &-right {
      width: 360px;
      -webkit-transition: width 0.6s, -webkit-transform 0.6s;
      transition: width 0.6s, transform 0.6s;
      display: flex;
      height: 400px;
      overflow: hidden;
      position: relative;

      &.project-show-antimate {
        width: 32px;

        .right-two {
          width: 0px; 

        }

      }



      .right-one {
        width: 30px;
        height: 60px;
        background: #f3f3f3;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        margin-top: 150px;
        position: relative;


        i {
          position: absolute;
          font-size: 26px;
          left: 6px;
          margin-top: 16px;
          color: #ffffff;

        }
      }

      .right-two {
        flex: 1;
        border: 1px solid #eeeeee;


        &-title {
          height: 40px;
          line-height: 40px;
          padding-left: 20px;
          font-size: 18px;
          color: #409eff;
        }

        &-wrap {
          overflow-y: scroll;
          padding-left: 30px;


             .popevl-del-list {
                    height: 80px;
                    width: 100%;
                    position: relative;

                    .cilcle-pop {
                      position: absolute;
                      display: inline-block;
                      width: 24px;
                      height: 24px;
                      border-radius: 50%;
                      border: 1px solid #eeeeee;
                      top: 0px;
                      left: 70px;


                    }

                    .text-name-time {
                       position: absolute;
                      left: 130px;
                      top: 10px;
                      font-size: 12px;

                    }

                    .cilcle-shu {
                      position: absolute;
                      width: 4px;
                      height: 50px;
                      border-radius: 4px;
                      border: 1px solid #eeeeee;
                      top: 28px;
                      left: 80px;
                    }

                    .text-name {
                      position: absolute;
                      left: 0px;
                      top: 30px;
                      font-size: 14px;


                    }

                    .text-name-del {
                      position: absolute;
                      left: 120px;
                      top: 30px;
                      font-size: 12px;
                    }
                  }
         



                
        }


      }
    }





  }


  
}
  
</style>
