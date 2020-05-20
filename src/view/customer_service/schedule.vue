<template>
  <div class="schedule_detail">

    <div class="schedule_detail_warp" @click="hidepopdiv">
      <div class="search">
        <el-button class="monbtn cursor" style="width: 180px;font-weight: bold;cursor: pointer;">{{activeName}} 
          <el-date-picker v-model="activemonth" type="month" placeholder="选择月" class="inpucus cursor" @change="choosedate" :picker-options="pickerOptions"> 
          </el-date-picker>
        </el-button>
        <p style="display: inline-block;margin-left: 20px;">
          <el-input v-model="search" placeholder="请输入员工名或者团队名"></el-input>
        </p>
        <el-button class="monbtn" @click="search_compose">搜索</el-button>
        <p class="right_btn">
          <el-button class="monbtn" @click="addcomposeshow" v-if="add_compose_show" >新增排班</el-button>
          <el-button class="monbtn" @click="new_compose_staff" v-if = "!add_compose_show && add_staff">添加人员</el-button>
<!--           <el-button class="monbtn">下载模板</el-button>
          <el-button class="monbtn">导入排班</el-button> -->
          <el-button class="monbtn" @click="timedialogVisible=true">设置班时</el-button>
        </p>
      </div>

      <div class="content">
        <div class="left-team">
          <div class="top_style">排班组</div>
          <div class="team_content">
            <table style="width: 100%">
              <tr v-for="(list,index) in composeList"> 
                <td style="position: relative;" @click="choosecompose(index)" :class="{choosetype:list.choose}">{{list.composeName}}<i class="iconfont iconbianji icon_class" @click="editgroupteam(list)"></i></td>

              </tr>


            </table>
            
          </div>
          <el-button  class="monbtn" @click="addgroupshow">新增排班组</el-button>

        </div>
        <div class="right_content_warp">
          <div class="top_warp">
            <div class="top_div1">
              <table cellpadding="0" cellspacing="0">
                  <tr class="top_style">
                    <th style="min-width:120px;max-width: 120px;"></th>
                    <th style="min-width:80px;max-width: 80px;">日期</th>
                  </tr>
                  <tr  class="top_style" style="height:30px;background-color: rgb(174, 174, 174);">
                    <th></th>
                    <th>星期</th>
                  </tr>
                <tr v-if="compose_data.length>0">
                  <td style="min-width:120px;max-width: 120px;">合计</td>
                  <td style="min-width:80px;max-width: 80px;">{{total}}</td>
                </tr>
              </table>
            </div>
            <div class="top_div2">
              <table cellpadding="0" cellspacing="0" ref="timelist">
                <tr class="top_style">
                  <th v-for="list in date_list">{{list}}</th>
                </tr>
                <tr  class="top_style" style="height:30px;background-color: rgb(174, 174, 174);"> 
                  <th v-for="list in week_list">{{get_week_value(list)}}</th>
                </tr>

                <tr>
                  <td v-for="item in total_list">{{item.dayCount}}-{{item.nightCount}}</td>
                </tr>
              </table>
            </div>
          </div>

          <div class="bottom_warp">
            <div class="bottom_div1">
              <table  cellpadding="0" cellspacing="0"  ref="teamlist">
<!--                 <tr v-if="compose_data.length>0">
                  <td style="min-width:90px;max-width: 90px;">合计</td>
                  <td style="min-width:70px;max-width: 70px;">{{total}}</td>
                </tr> -->
               <tr v-for="list in compose_data" >
                  <td style="min-width:120px;max-width: 120px;">{{list.teamName}}</td>
                  <td style="min-width:80px;max-width: 80px;">{{list.staffName}}</td>
                 </tr>
              </table>
            </div>
            <div class="bottom_div2" ref="viewBox" id="viewBox">
              <table cellpadding="0" cellspacing="0">
<!--                 <tr>
                  <td v-for="item in total_list">{{item.dayCount}}-{{item.nightCount}}</td>
                </tr> -->

                <tr v-for="(list1,index1) in compose_data" class="hover_warp">
                  <td v-for="(list2,index2) in list1.list" @click.stop="edit_compose_show(index1,index2)" :style="{'background-color':get_color(list2.classesId)}">{{get_compose_type(list2.classesId)}}
                    <div v-if="list2.show" style="" class="pop_div">
                      <ul>
                        <li v-for="list in class_list" @click="edit_staff_compose(list1,list2,list.classesId)">{{list.classes}}</li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </table>
            </div>


          </div>

        </div>
      </div>

      <div class="footer">
        <div class="footer_left">
          <div class="left_top">
            <div class="dis_p" v-for="list in comclass_list">
              <div class="color_tip" :style="{'background-color':get_color(list.classesColor)}"></div>
              <p>{{get_compose_type(list.classesId)}}</p>
              <p>{{fmtDateHm(list.startTime)}}-{{fmtDateHm(list.endTime)}}</p>
            </div>

          </div>



          <div class="left_bottom">
            <p>说明：</p>
            <div class="input-div">
              <div style="width: 90%;height: 86px;padding:10px 20px;">
                <p style="line-height: 1.5;">{{comment}}</p>
              </div>
              <div style="width:10%"><el-button style="height: 86px;width: 100%;" class="monbtn" @click="edit_comment_show">编辑</el-button></div>
            </div>
          </div>


        </div>
        <div class="footer_right">
          <div class="footer_right-top">
          <span class="shun"></span>
          <span>操作记录</span>
        </div>
        <div class="footer_right-content">
          <p v-for="list in log_list">
            <span>{{fmtDate(list.logTime)}} {{fmtDateHm(list.logTime)}}</span>    
            <span style="margin-left: 8px;">{{list.composeLog}}</span>
          </p>


        </div>
        
          
        </div>
      </div>
    </div>


    <el-dialog
      title="新增排班"
      :visible.sync="newdialogVisible"
      width="90%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      >
      <div class="right_content_warp">
          <div class="top_warp">
            <div class="top_div1">
              <table cellpadding="0" cellspacing="0">
                  <tr class="top_style">
                    <th style="min-width:120px;max-width: 120px;"></th>
                    <th style="min-width:80px;max-width: 80px;">日期</th>
                  </tr>
                  <tr  class="top_style" style="height:30px;background-color: rgb(174, 174, 174);">
                    <th></th>
                    <th>星期</th>
                  </tr>
                  <tr><td>总计</td><td>白-晚(中)</td></tr>
              </table>
            </div>
            <div class="top_div2">
              <table cellpadding="0" cellspacing="0" ref="timelist1">
                <tr class="top_style">
                  <th v-for="list in date_list">{{list}}</th>
                </tr>
                <tr  class="top_style" style="height:30px;background-color: rgb(174, 174, 174);"> 
                  <th v-for="list in week_list">{{get_week_value(list)}}</th>
                </tr>
                <tr>
                  <td v-for="list in count_compose">{{list.daycount}}-{{list.nightcount}}</td>
                </tr>
              </table>
            </div>
          </div>

          <div class="bottom_warp">
            <div class="bottom_div1">
              <table  cellpadding="0" cellspacing="0"  ref="teamlist1">
                
               <tr v-for="list in staff_list">
                  <td style="min-width:120px;max-width: 120px;">{{list.teamName}}</td>
                  <td style="min-width:80px;max-width: 80px;">{{list.staffName}}</td>
                 </tr>
              </table>
            </div>
            <div class="bottom_div2" ref="viewBox1" @scroll="handlescroll">
              <table cellpadding="0" cellspacing="0">

                <tr v-for="(list,index) in work_list" class="list_warp">
                  <td v-for="(list1,index1) in list" @click="change_compose_type(index,index1)" :style="{'background-color':get_color(list1)}">{{get_compose_type(list1)}}

                  </td>
                </tr>
              </table>
            </div>


          </div>

        </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel_addcompose" size="mini" :disabled="uploading">取 消</el-button>
        <el-button type="primary" @click="add_compose_staff" size="mini" :disabled="uploading">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="新增排班组"
      :visible.sync="addgroup.dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="500px">
      <div>
        <p class="input_p">
          <span>排班组名称：</span>
          <el-input class="input_class" v-model="addgroup.composeName" placeholder="请输入排班组名称"></el-input>
        </p>
        <p class="input_p">
          <span>所&nbsp;属&nbsp;部&nbsp;门&nbsp;：</span>
          <el-cascader
            :options="groupList"
            :props="groupprops"
            v-model="addgroup.groupId"
            clearable
            class="input_class"
             placeholder="请选择部门"
            @change="get_team_list">
          </el-cascader>
        </p>
        <p class="input_p">
          <span>选&nbsp;择&nbsp;团&nbsp;队&nbsp;：</span>
          <el-select v-model="addgroup.teamIds" class="input_class" 
            clearable multiple  collapse-tags placeholder="请选择团队">
            <el-option v-for="item in customerTeam"
             :key="item.teamId"
             :label="item.teamName"
             :value="item.teamId"></el-option>
          </el-select>
        </p>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addgroup.dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="addgroupok" size="mini">确 定</el-button>
      </span>
    </el-dialog>


    <el-dialog
      title="编辑排班组"
      :visible.sync="editgroup.dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="500px">
      <div>
        <p class="input_p">
          <span>排班组名称：</span>
          <el-input class="input_class" v-model="editgroup.composeName" placeholder="请输入排班组名称"></el-input>
        </p>
        <p class="input_p">
          <span>所&nbsp;属&nbsp;部&nbsp;门&nbsp;：</span>
          <el-cascader
            :options="groupList"
            :props="groupprops"
            v-model="editgroup.groupId"
            clearable
            class="input_class"
            @change="get_team_list">
          </el-cascader>
        </p>
        <p class="input_p">
          <span>选&nbsp;择&nbsp;团&nbsp;队&nbsp;：</span>
          <el-select v-model="editgroup.teamIds" class="input_class" clearable
            multiple  collapse-tags placeholder="请选择团队">
            <el-option v-for="item in customerTeam"
             :key="item.teamId"
             :label="item.teamName"
             :value="item.teamId"></el-option>
          </el-select>
        </p>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editgroup.dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="edit_composeok" size="mini">确 定</el-button>
      </span>
    </el-dialog>


    <el-dialog
      title="设置班时"
      :visible.sync="timedialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      width="60%">
      <div class="time_warp">
        <table cellpadding="0" cellspacing="0">
          <tr>
            <th width="100px;">班时名称</th>
            <!-- <th>是否正常班</th> -->
            <th>开始时间</th>
            <th>结束时间</th>
            <th>选择颜色</th>
            <th>操作</th>
          </tr>
          <tr v-for="list in setclass_list">
            <td>{{get_compose_type(list.classesId)}}</td>
            <!-- <td width="150px;">{{list.normal}}</td><select  v-model="list.normal" style="text-align-last: center;resize: none;border:none;appearance:none;width: auto;padding:0 42%;height: 30px;"> 
              <option
               v-for="item in timestatus"
               :key="item.value"
               :label="item.label"
               :value="item.value"
               style=""></option>
            </select> -->
            <td width="80px;" style="border:0px;"><el-time-picker
                  v-model="list.starttime"
                  @change="edit_compose_class(list)"

                  :picker-options="{
                    start: '00:00',
                    step: '00:15',
                    end: '18:30'
                  }"
                  placeholder="选择时间">
              </el-time-picker></td>
            <td width="80px;" style="border:0px;"><el-time-picker
                  v-model="list.endtime"
                  @change="edit_compose_class(list)"

                  :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                  }"
                  placeholder="选择时间">
              </el-time-picker>
            </td>
            <td :style="{'background-color':get_color(list.classesColor)}"></td>
            <td>              
              <el-switch
               v-model="list.classesStatus"
               :active-value="1"
               :inactive-value="2"
               @change="edit_time_status(list)"
               style="top:-4px;">
              </el-switch>
<!--               <el-divider direction="vertical"></el-divider>
              <i class="iconfont iconbianji icon_class1" @click="edittimeshow(list)"></i> -->
            </td> 
          </tr>
        </table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close_edit_compose"  size="mini">取 消</el-button>
        <!-- <el-button type="primary" @click="timedialogVisible = false"  size="mini">确 定</el-button> -->
      </span>
    </el-dialog>

<!--     <el-dialog
      title="编辑班时"
      :visible.sync="addgroup.dialogVisible"
      width="30%">
      <div>
        <p class="input_p">
          <span>班时名称：</span>
          <el-input class="input_class"></el-input>
        </p>
        <p class="input_p">
          <span>是否正常班：</span>
          <el-input class="input_class"></el-input>
        </p>
        <p class="input_p">
          <span>开始时间：</span>
          <el-input class="input_class"></el-input>
        </p>
        <p class="input_p">
          <span>结束时间：</span>
          <el-input class="input_class"></el-input>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addgroup.dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="addgroup.dialogVisible = false" size="mini">确 定</el-button>
      </span>
    </el-dialog> -->

    <el-dialog
      title="编辑说明"
      :visible.sync="note.dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="500px">
      <div>
        <p class="input_p">
          <span style="position: relative;top:-62px;">说明：</span>
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="note.comment"
            maxlength="100"
            show-word-limit
            :autosize="{ minRows: 4, maxRows: 4}"
            class="input_class"
            style="width: 360px;">
          </el-input>

        </p>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="note.dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="edit_compose_comment" size="mini">确 定</el-button>
      </span>
    </el-dialog>


    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    name: "system-setting",
    data(){
      return{
        pickerOptions: {
          disabledDate(time) {
            let date = new Date([new Date().getFullYear(),new Date().getMonth()+2]).getTime();
            //console.info(date)
            return time.getTime() > date

          },
        },
        activemonth:new Date([new Date().getFullYear(),new Date().getMonth()+1].join('-')),
        search:'',
        addgroup:{
          dialogVisible: false,
          composeName:'',
          teamIds:[],
          groupId:'',
        },
        editgroup:{
          id:'',
          dialogVisible: false,
          composeName:'',
          teamIds:[],
          groupId:'',
        },
        groupprops:{
            checkStrictly: true,
            value: 'groupId',
            label: 'groupName',
            children: 'groupVOList',
        },

        current:{
          month:'',
          year:'',
          composeId:'',
          teamIds:[],
        },
        customerTeam:[],
        timedialogVisible: false,
        composeList:[],
        date_list:[],
        week_list:[],
        staff_list:[],
        work_list:[],
        groupList:[],
        compose_data:[],
        total:'',
        total_list:[],
        comclass_list:[],
        class_list:[],
        setclass_list:[],
        add_compose_show:false,
        add_staff:false,
        uploading:false,
        note:{
          dialogVisible: false,
          comment:'',
        },
        comment:'',
        log_list:[],
        week_value:[{
          label:'日',
          value:0
        },{
          label:'一',
          value:1
        },{
          label:'二',
          value:2
        },{
          label:'三',
          value:3
        },{
          label:'四',
          value:4
        },{
          label:'五',
          value:5
        },{
          label:'六',
          value:6
        }],
        colorlist:[{
          value:1,
          label:'#f5f7fa99'
        },{
          value:2,
          label:'#facdae'
        },{
          value:3,
          label:'#fc9d99'
        },{
          value:4,
          label:'#c6e0b4'
        },{
          value:5,
          label:'#bdd7ee'
        },{
          value:6,
          label:'rgb(226, 226, 226)'
        },{
          value:7,
          label:'rgba(119, 187, 127, 0.65)'
        },{
          value:8,
          label:'rgb(147, 192, 236)' //  
        }],
        newdialogVisible:false,



      }
    },
    computed:{
        ...mapGetters([
            'getpageDict',
        ]),


      activeName() {
        let y = ''
        let m = ''
            if(this.activemonth){
              //console.info(this.activemonth.getYear())
              y = 1900 + this.activemonth.getYear()
              m = '0' + (this.activemonth.getMonth()+1)
            }

            return y+"-"+m.substring(m.length-2,m.length);
        },

      get_compose_index(){
        let compose_type = this.getpageDict.filter((list)=>{
          return list.dicType == 'compose_classes'
        })
        return compose_type[0]
      },


      count_compose(){
        let arr = []


        if(this.work_list.length>0){

          for(let i=0;i<this.date_list.length;i++){
            arr[i] = {}
            arr[i].daycount = 0
            arr[i].nightcount = 0

            for(let j=0;j<this.staff_list.length;j++){

              if(this.work_list[j][i] == 1){
                arr[i].daycount += 1 
              }else if(this.work_list[j][i] == 2 || this.work_list[j][i] == 4){
                arr[i].nightcount += 1 
              }

              


            }

          }
        }

        return arr


        
      },


    },
    created() {
      this.get_compose_list()
    },
    watch: {

    },
    mounted(){ 

      
      this.get_group_list()
      
      this.choosedate()
      
     
      //this.get_customer_team()


      this.$refs.viewBox.addEventListener('scroll', () => {
          this.$refs.timelist.style.left = - this.$refs.viewBox.scrollLeft + 'px'
        }, false)

      this.$refs.viewBox.addEventListener('scroll', () => {
        //console.info(this.$refs.viewBox.scrollTop)
          this.$refs.teamlist.style.top = - this.$refs.viewBox.scrollTop + 'px'
        }, false)

     this.$nextTick(() =>{


    }) 


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

      fmtDateHm(obj){
        var date =  new Date(obj*1000);
        // var y = 1900+date.getYear();
        // var m = "0"+(date.getMonth()+1);
        // var d = "0"+date.getDate();
        var h = "0" + date.getHours();
        var min = "0" + date.getMinutes()
        //return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
        return h.substring(h.length-2,h.length) + ":" + min.substring(min.length-2,min.length);
      },

      get_color(value){
        let color = ''
        for(let i=0;i<this.colorlist.length;i++){
          if(this.colorlist[i].value == value){
            color = this.colorlist[i].label
            break
          }
        }
        //console.info(color)
        return color
      },

      hidepopdiv(){
        for(let i=0;i<this.compose_data.length;i++){
          for(let j=0;j<this.compose_data[i].list.length;j++){
            this.compose_data[i].list[j].show = false
          }
        }
      },

      search_compose(){
        this.get_month_compose()
        this.get_compose_count()
      },

      handlescroll(){
        this.$refs.viewBox1.addEventListener('scroll', () => {
            this.$refs.timelist1.style.left = - this.$refs.viewBox1.scrollLeft + 'px'
          }, false)

        this.$refs.viewBox1.addEventListener('scroll', () => {
            this.$refs.teamlist1.style.top = - this.$refs.viewBox1.scrollTop + 'px'
          }, false)
    },
      close_edit_compose(){
        this.timedialogVisible = false
        this.show_compose_classes()
        this.show_compose_log()
        this.get_classes()
      },


      edit_time_status(list){
        //console.info(list)

        this.$http.get(`compose/edit_classes_status?composeId=${this.current.composeId}&classesId=${list.classesId}&classesStatus=${list.classesStatus}`)
        .then((data)=>{
          if(data.code == '200'){
            this.get_compose_classes()

            
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


      //设置班时时长
      edit_compose_class(list){
        let start = list.starttime?list.starttime.getTime().toString().substr(0,10):''
        let end = list.endtime?list.endtime.getTime().toString().substr(0,10):''

        this.$http.post(`compose/edit_compose_classes`,{
          composeId: this.current.composeId,
          classesId: list.classesId,
          startTime: start,
          endTime: end

        })
        .then((data)=>{
          if(data.code == '200'){
            this.get_compose_classes()
            
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


      //查询所有排班组
      get_compose_list(){


        this.$http.get(`compose/get_compose_list`)
        .then((data)=>{
          if(data.code == '200'){
            if(data.data.length>0){
              let list = []
              for(let i=0;i<data.data.length;i++){
                list.push({...data.data[i],choose:false})
              }
              this.composeList = list
              this.composeList[0].choose = true
              this.current.composeId = this.composeList[0].id
              this.get_month_compose()
              this.get_compose_count()
              this.show_compose_classes()
              this.get_compose_comment()
              this.get_compose_classes()
              this.show_compose_log()
              this.get_compose_staff()
              this.get_compose_status()
              this.get_classes()
              this.get_staff_compose()
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

      get_group_list(){
          this.$http.get(`group/get_customer_group_list`)
          .then((data)=>{
            if(data.code == '200'){

              let grouplist = []
            

              for(let i=0;i<data.data[0].groupVOList.length;i++){
                grouplist.push({groupId:data.data[0].groupVOList[i].groupId, groupName:data.data[0].groupVOList[i].groupName})


                //list.push({groupName:data.data[0].groupVOList[i].groupName, groupId:data.data[0].groupVOList[i].groupId})

                if(data.data[0].groupVOList[i].groupVOList && data.data[0].groupVOList[i].groupVOList.length>0){

                  grouplist[grouplist.length-1]['groupVOList'] = []

                  for(let j=0;j<data.data[0].groupVOList[i].groupVOList.length;j++){


                    this.diguidata(data.data[0].groupVOList[i].groupVOList[j],grouplist[grouplist.length-1]['groupVOList'])
                  }
                }
              } 

              this.groupList = grouplist



              //this.groupListname = list
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
      diguidata(groupVOList,grouplist){

        //list.push({groupName: groupVOList.groupName, groupId:groupVOList.groupId})

        grouplist.push({groupId:groupVOList.groupId, groupName:groupVOList.groupName})



        if(groupVOList.groupVOList && groupVOList.groupVOList.length>0){
          grouplist[grouplist.length-1]['groupVOList'] = []
          //array[array.length-1].groupVOList = []
          for(let i=0;i<groupVOList.groupVOList.length;i++){
            this.diguidata(groupVOList.groupVOList[i],grouplist[grouplist.length-1]['groupVOList'])
          }
        }
        

      },

      // get_customer_team(){
      //   this.$http.post(`customer/get_customer_team`,{
      //     ss: this.teamInfo
      //   })
      //   .then((data)=>{
      //     if(data.code == '200'){
      //       this.customerTeam = data.data

      //     }
      //   })
      //   .catch(()=>{
      //     this.$message({
      //       message:'接口报错',
      //       type:'error'
      //     })
      //   })
      // },
      addgroupshow(){
        this.editgroup.id = ''
        this.editgroup.groupId = ''
        this.addgroup.groupId = ''
        this.addgroup.composeName = ''
        this.addgroup.teamIds = ''
        this.addgroup.groupId = ''
        this.get_team_list()
        this.addgroup.dialogVisible = true
      },

      addgroupok(){
        if(!this.addgroup.composeName ||!this.addgroup.teamIds.length ||!this.addgroup.groupId){
          return this.$message({
            message:'请完善排班组信息',
            type:'warning'
          })
        }


        this.$http.post(`compose/add_compose`,{
          composeName: this.addgroup.composeName,
          groupId: this.addgroup.groupId[this.addgroup.groupId.length-1],
          teamIds: this.addgroup.teamIds.join(',')

        })

        .then((data)=>{
          if(data.code == '200'){
            this.addgroup.dialogVisible = false
            this.get_compose_list()
            this.$message({
              message:'新增成功',
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

      choosecompose(index){


        this.add_compose_show = false
        this.add_staff = false
        for(let i=0;i<this.composeList.length;i++){
          this.composeList[i].choose = false
        }
        

        this.composeList[index].choose = true
        this.current.composeId = this.composeList[index].id
        //this.current.teamIds = this.
        this.get_compose_staff()
        this.get_month_compose()
        this.get_compose_count()
        this.show_compose_classes()
        this.get_compose_comment()
        this.get_compose_classes()
        this.show_compose_log()
        this.get_compose_status()
        this.get_classes()
        this.get_staff_compose()
      },
      choosedate(){

        this.add_compose_show = false
        this.add_staff = false
        let val = this.activemonth
       

        let year = 1900 + val.getYear()
        let mon = val.getMonth() + 1
        let days = new Date(year,mon,'0')
        let lastday = days.getDate()
        let daylist = []
        let weeklist = []
        for(let i=0;i<lastday;i++){
          daylist.push(i+1)
          weeklist.push(new Date(year,mon-1,i+1).getDay())
        }
        this.current.month = mon
        this.current.year = year
        this.date_list = daylist
        this.week_list = weeklist

        this.get_month_compose()
        this.get_compose_count()
        this.get_compose_status()
        this.get_staff_compose()




      },
      get_week_value(value){

        let label = ''
        for(let i=0;i<this.week_value.length;i++){
          if(this.week_value[i].value == value){
            label = this.week_value[i].label
            break

          }

        }

        return label
      },

      get_team_list(){
        // if(!this.addgroup.groupId){
        //   return this.$message({
        //     message:'请选择部门',
        //     type:'warning'
        //   })
        // }
        this.customerTeam = []
        let groupid  =this.addgroup.groupId?this.addgroup.groupId:this.editgroup.groupId

        if(typeof(groupid) == 'object'){
          groupid = groupid[groupid.length-1]
        }

        //let groupid = group? group[group.length-1]:''
        //console.info(groupid)

        let obj = {}
        
        if(this.editgroup.id){
         
          obj = {
            groupId: groupid,
            composeId: this.editgroup.id
          }
        } else {

          obj = {
            groupId: groupid
          }
        }

       


        

        this.$http.post(`compose/get_customer_team_list`,{
          ...obj
          
        })
        .then((data)=>{
          if(data.code == '200'){
            let list = []

            //console.info()

            if(data.data.customerTeamlist && data.data.customerTeamlist.length){


              for(let i=0;i<data.data.customerTeamlist.length;i++){
                list.push({...data.data.customerTeamlist[i]})
              }
            }
            
            if(data.data.ncustomerTeamlist && data.data.ncustomerTeamlist.length){
              
              for(let i=0;i<data.data.ncustomerTeamlist.length;i++){
                list.push({...data.data.ncustomerTeamlist[i]})
              }
            }
            //console.info(list)
            this.customerTeam = list

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

      editgroupteam(list){
        this.editgroup.groupId = list.groupId
        this.editgroup.id = list.id
        this.addgroup.groupId = ''
        this.get_team_list()

        let teamIds = []
        for(let i=0;i<list.list.length;i++){
          teamIds.push(list.list[i].teamId)
        }

        //console.info(list)



        
        this.editgroup.composeName = list.composeName
        this.editgroup.teamIds = teamIds
        //this.editgroup.groupId = list.groupId
        this.editgroup.dialogVisible = true
        //this.get_team_list()
      },

      edit_composeok(){
        //console.info(this.editgroup.teamIds)
        if(!this.editgroup.composeName ||!this.editgroup.teamIds.length ||!this.editgroup.groupId ||this.editgroup.groupId.length == 0){
          return this.$message({
            message:'请完善排班组信息',
            type:'warning'
          })
        } 

        let groupId = ''

        if(typeof(this.editgroup.groupId) == 'object'){
          groupId = this.editgroup.groupId[this.editgroup.groupId.length-1]
        }else{
          groupId = this.editgroup.groupId
        }


        this.$http.post(`compose/edit_compose`,{
          id: this.editgroup.id,
          composeName: this.editgroup.composeName,
          groupId: groupId,
          teamIds: this.editgroup.teamIds.join(',')

        })

        .then((data)=>{
          if(data.code == '200'){
            this.editgroup.dialogVisible = false
            this.get_compose_list()
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

      get_compose_staff(){
        this.$http.get(`compose/get_customer_staff?composeId=${this.current.composeId}`)
        .then((data)=>{
          if(data.code == '200'){
            this.staff_list = data.data
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


      get_compose_status(){
        this.$http.get(`compose/get_compose_Status?composeId=${this.current.composeId}&composeTime=${this.activemonth.getTime().toString().substr(0,10)}`)
        .then((data)=>{
          if(data.code == '200'){
            this.add_compose_show = false
            if(data.data.count == 0){

              
              this.add_compose_show = true
            }
            //console.info(this.add_compose_show)

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


      get_staff_compose(){
        this.$http.post(`compose/get_staff_compose`,{
          composeId: this.current.composeId,
          composeTime: this.activemonth.getTime().toString().substr(0,10)
        })
        .then((data)=>{
          if(data.code == '200'){
            if(data.data.length && data.data.length>0){


              
              this.add_staff = true
            }

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

      new_compose_staff(){
        let list = []
        for(let i=0;i<this.date_list.length;i++){
          let date = new Date(this.current.year,this.current.month-1,this.date_list[i]).getTime().toString().substr(0,10)
          list.push(date)
        }
        this.$http.post(`compose/add_staff_compose `,{
          composeId: this.current.composeId,
          composeTime: this.activemonth.getTime().toString().substr(0,10),
          dayDatas: list.join(',')

        })

        .then((data)=>{
          if(data.code == '200'){

            this.add_staff = false

            
            this.get_month_compose()
            this.get_compose_count()
            this.get_staff_compose()
            this.$message({
              message:'新增成功',
              type:'success'
            })
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


      addcomposeshow(){

        //console.info(this.staff_list)
        // if(!this.date_list ||this.date_list.length == 0){
        //   return this.$message({
        //     message:'请选择要排班的月份',
        //     type:'warning'
        //   })
        // }
        // if(!this.staff_list ||this.staff_list.length == 0){
        //   return this.$message({
        //     message:'请选择要排班的排班组',
        //     type:'warning'
        //   })
        // }




              let list = []

              for(let i=0;i<this.staff_list.length;i++){
                list[i] = []
                for(let j=0;j<this.date_list.length;j++){
                  list[i].push(1)
                }
              }
              this.work_list = list
              
              this.newdialogVisible = true
       







      },

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

      change_compose_type(index,index1){
        let lastkey = this.work_list[index][index1-1]
        let key = this.work_list[index][index1]
        let afterkey = ''
        let nextkey = ''
        let middle2 = false
        

        //判断是否存在中2班次
        for(let i = 0;i<this.comclass_list.length;i++){
          if(this.comclass_list[i].classesId == 7){
            middle2 = true
            break
          }
        }


        if(middle2){

          if(key == 4){
            nextkey = 7
          }else if(key == 7){
            nextkey = 1
          } else {
            nextkey = key + 1
          }
          

          if(nextkey == 3){
            if(lastkey == 1){
              afterkey = 2
            }else {
              afterkey = 1
            }
          }
          else{
            afterkey = nextkey
          }
        } else {

          if(key == 4){
            nextkey = 1
          } else {
            nextkey = key + 1
          }
          

          if(nextkey == 3){
            if(lastkey == 1){
              afterkey = 2
            }else {
              afterkey = 1
            }
          }
          else{
            afterkey = nextkey
          }

        }





        for(let i=index1;i<this.date_list.length;i++){
          this.work_list[index][i] = afterkey
        } 
        this.$set(this.work_list[index], index1, nextkey);


      },

      cancel_addcompose(){
        this.$confirm('是否需要保存排班?', '提示', {
          confirmButtonText: '保存',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.add_compose_staff()
        }).catch(() => {
         
        });
         this.newdialogVisible = false
      },

      add_compose_staff(){
        this.uploading = true
        let time = this.activemonth.getTime().toString().substr(0,10)

        let list = []
        for(let i=0;i<this.work_list.length;i++){
          let days = []
          let nights = []
          let rests = []
          let middles = []
          let middleTwoDatas = []
          let teamid = ''
          for(let j=0;j<this.work_list[i].length;j++){
            let date = new Date(this.current.year,this.current.month-1,this.date_list[j]).getTime().toString().substr(0,10)



            if(this.work_list[i][j] == 1){
              days.push(date)
            }else if(this.work_list[i][j] == 2){
              nights.push(date)
            }else if(this.work_list[i][j] == 3){
              rests.push(date)
            }else if(this.work_list[i][j] == 4){
              middles.push(date)
            }else{
              middleTwoDatas.push(date)
            }
          }
          list.push({teamId:this.staff_list[i].teamId, 
            staffId:this.staff_list[i].staffId,
            dayDatas: days.join(','),
            nightDatas:nights.join(','),
            restDatas:rests.join(','),
            middleDatas:middles.join(','),
            middleTwoDatas:middleTwoDatas.join(',')
          })
          
        }



        this.$http.post(`compose/add_compose_staff`,{
          composeTime: time,
          composeId: this.current.composeId,
          list: list
        })
        .then((data)=>{
          if(data.code == '200'){

            this.newdialogVisible = false
            this.get_month_compose()
            this.get_compose_count()
            this.get_staff_compose()
            this.get_compose_status()
            this.$message({
              message:'新增成功',
              type:'success'
            })

            this.uploading = false
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

      get_month_compose(){


        let mon = this.activeName
        this.$http.post(`compose/get_month_compose`,{
          month: mon,
          composeId: this.current.composeId,
          se: this.search
        })
        .then((data)=>{
          if(data.code == '200'){
            let list = []
            for(let i=0;i<data.data.length;i++){
              list.push({composeId:data.data[i].composeId, composeName:data.data[i].composeName, staffId:data.data[i].staffId,staffName:data.data[i].staffName, teamId:data.data[i].teamId, teamName:data.data[i].teamName})
              list[i]['list'] = []

              for(let j=0;j<data.data[i].list.length;j++){
                list[i]['list'].push({...data.data[i].list[j],show:false})
              }
              
            }
            
            this.compose_data = list
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


      //排班合计
      get_compose_count(){
        let mon = this.activeName
        this.$http.post(`compose/get_compose_count`,{
          month: mon,
          composeId: this.current.composeId,
          se: this.search
        })
        .then((data)=>{
          if(data.code == '200'){
            if(data.data.length>0){
              this.total = data.data[1].count

              let list = []

              for(let i=2;i<data.data.length;i++){
                
                list.push({...data.data[i]})

              }
              
              this.total_list = list
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

      edit_compose_show(index1,index2){

        if(this.compose_data[index1].list[index2].classesId != 6){
          let date = this.activemonth.getTime()

          let lastmon = new Date().getMonth() - 1
          let lastmonth

          if(lastmon > 0){
            lastmonth = new Date(new Date().getFullYear(),new Date().getMonth()-1).getTime() - 1
          }else {
            lastmonth = new Date(new Date().getFullYear() - 1,new Date().getMonth() + 11).getTime() - 1
          }


          let nextmonth

          let nexmon = new Date().getMonth()+2


          if(nexmon>11){
            nextmonth = new Date(new Date().getFullYear() + 1,new Date().getMonth()+2 - 12).getTime() + 1
          } else{
            nextmonth = new Date(new Date().getFullYear(),new Date().getMonth()+2).getTime() + 1
          }



          if(date < nextmonth && date > lastmonth){
            console.info(666)
            for(let i=0;i<this.compose_data.length;i++){
              for(let j=0;j<this.compose_data[i].list.length;j++){
                this.compose_data[i].list[j].show = false
              }
            }
            this.compose_data[index1].list[index2].show = true
          }

        }




      },


      //修改排班
      edit_staff_compose(list1,list2,id){

        this.$http.get(`compose/edit_staff_compose?composeTime=${list2.composeTime}&staffId=${list1.staffId}&composeId=${list1.composeId}&classesId=${id}`)
        .then((data)=>{
          if(data.code == '200'){
            this.get_month_compose()
            this.get_compose_count()
            this.show_compose_log()
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


      //展示所有班时
      get_classes(){
        this.$http.get(`compose/get_classes?composeId=${this.current.composeId}`)
        .then((data)=>{
          if(data.code == '200'){
            this.class_list = data.data
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

      get_classes_detail(classId){
        let str = ''
        switch(classId){
          case 1:
           str = "白 班"
           break
          case 2:
           str = "晚 班"
           break
          case 3:
           str = "休 息"
           break
          case 4:
           str = "中 班"
           break
          case 5:
           str = "半 班"
           break
          case 6:
           str = "离 职"
           break
          default:
           str = "待设置"
        }
        return str
      },


      //展示排班组班时(设置时用)
      get_compose_classes(){
        this.$http.get(`compose/get_compose_classes?composeId=${this.current.composeId}`)
        .then((data)=>{
          if(data.code == '200'){
            let start = ''
            let end = ''
            let list = []
            for(let i=0;i<data.data.length;i++){
              start = data.data[i].startTime?new Date(data.data[i].startTime*1000):''
              end = data.data[i].endTime?new Date(data.data[i].endTime*1000):''
              list.push({...data.data[i],starttime:start, endtime:end})
            }
            this.setclass_list = list
            
            
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

      //展示排班组班时(页面中用)
      show_compose_classes(){
        this.$http.get(`compose/show_compose_classes?composeId=${this.current.composeId}`)
        .then((data)=>{
          if(data.code == '200'){
            this.comclass_list = data.data
            //console.info(this.comclass_list)
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



      //评论
      get_compose_comment(){

        this.$http.get(`compose/get_compose_comment?composeId=${this.current.composeId}`)
        .then((data)=>{
          if(data.code == '200'){
            this.comment = ''
            if(data.data.length){
              this.comment = data.data[0].comment
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


      edit_comment_show(){
        this.note.comment = this.comment
        this.note.dialogVisible = true
      },

      edit_compose_comment(){
        this.$http.get(`compose/edit_compose_comment?composeId=${this.current.composeId}&comment=${this.note.comment}`)
        .then((data)=>{
          if(data.code == '200'){

            this.note.dialogVisible = false
            this.get_compose_comment()
            
            
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

      //日志
      show_compose_log(){

        this.$http.get(`compose/show_compose_log?composeId=${this.current.composeId}`)
        .then((data)=>{
          if(data.code == '200'){
            this.log_list = data.data
            
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
      }
      





    },
  }
</script>
<style  lang="less">
  .input_p {
            padding-left: 20px;
            margin: 16px 0;
            position:relative;
            .input_class {
                display: inline-block;
                width: 270px;
                font-size: 12px;
            }

        }

    .time_warp{

      .input_input{
        width: 120px;
        text-align: center;
      }


      .icon_class1{
        font-size: 23px;
        position: relative;

        top: 3px;
        //margin-left: 20px;
        cursor: pointer;

        &:hover{
          color: rgba(0, 153, 255, 1)
        }

      }


      table{
        border-left:1px solid #d0d0d0;
        
        width: 100%;
        th{

          border-right:1px solid #d0d0d0;
          border-bottom:1px solid #d0d0d0;
          background-color:#a1a1a1;
          height: 40px;
          line-height: 40px;
          color: #fff;
        }
        td{
          text-align: center;
          border-right:1px solid #d0d0d0;
          border-bottom:1px solid #d0d0d0;
          position:relative;
        }
      }
    }

    .right_content_warp{
          margin-left: 10px;
          height: 100%;
          text-align: center;
        .top_style{
          background-color:rgb(94, 94, 94);
          color: #fff;
          height: 40px;
          line-height: 40px;
        }

          .top_warp{
            display: flex;
            height: 110px;
            width: 100%;
            position:relative;
            //font-size: 0;  //消除div之间的间隙

            .top_div1{
              width: 200px;
              overflow: hidden;
              left: 0px;
              //flex:0 1;

            }
            .top_div2{
              width: calc(100vw - 414px);
              position:relative;
              overflow: hidden;
            }
          }
          .bottom_warp{
            display: flex;
            width: 100%;
            
            height:calc(100vh - 490px);
            
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
          

            .bottom_div1{
              width: 200px;
              height:calc(100vh - 500px);
              //table-layout:fixed;
              //overflow:visible;

              overflow:hidden; 
              position:relative;
              display: inline-block;
              
            }
            .bottom_div2{
              height: 100%;
              width: calc(100vw - 410px);
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
</style>
<style scoped lang="less">
.schedule_detail {
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
          right: 30px;

        }
      }

      .content{
        height: calc(100vh - 400px);
        //width: calc(100vw - 520px);
        padding-left: 10px;
        padding-top: 10px;
        border-bottom: 1px solid #e2e2e2;
        display: flex;
        text-align: center;

        .top_style{
          background-color:rgb(94, 94, 94);
          color: #fff;
          height: 40px;
          line-height: 40px;
        }



        .left-team{
          min-width: 200px;
          //background-color:blue;
          max-width: 200px;
          height: 100%;
          .team_content{
            overflow-y: auto;
            height: calc(100vh - 500px);


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
          //background-color:blue;
          //width: calc(100vw - 510px);
          //width: 100%;
          height: 100%;


          .top_warp{
            display: flex;
            height: 110px;
            width: 100%;
            position:relative;
            //font-size: 0;  //消除div之间的间隙

            .top_div1{
              width: 200px;
              overflow: hidden;
              left: 0px;
              //position:relative;
              // display: inline-block;
              // font-size: 14px;

            }
            .top_div2{
              width: calc(100vw - 674px);
              position:relative;
              overflow: hidden;
            }
          }
          .bottom_warp{
            display: flex;
            width: 100%;
            
            height:calc(100vh - 530px);
            
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
          

            .bottom_div1{
              width: 200px;
              height:calc(100vh - 532px);
              //table-layout:fixed;
              //overflow:visible;

              overflow:hidden; 
              position:relative;
              display: inline-block;
              
            }
            .bottom_div2{
              height: 100%;
              width: calc(100vw - 670px);
              //overflow: auto;
              overflow: scroll;
              position:relative;
              display: inline-block;

              .hover_warp{
                td{
                  cursor: pointer;
                  position:relative;

                  &:first-child  {  border-left:0px; }

                  &:hover{
                    background-color:#eee !important;
                  }
                }
              }



              .pop_div{
                width:70px;
                position: absolute;
                z-index: 996;
                background-color:#fff;
                top: 13px;
                right: -50px; 

                ul{
                  li{
                    height: 30px;
                    width: 100%;

                    &:hover{
                      background-color:#eee;
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
          table{
            border:1px solid #d0d0d0;
            border-right:0px;
            width: 100%;
            position:relative;

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

      .footer{
        height: 180px;
        padding-left:40px;
        padding-top:10px;
        display: flex;

        .footer_left{
          width: 49%;
          height: 94%;

          border-right:1px solid rgb(242, 242, 242);

          .left_top{
            height: 40px;
            display: flex;
            padding: 0 20px;
            .dis_p{
              width: 30%;
              //min-width: 190px;
              margin-right: 20px;
              //background-color:green;
              display: flex;
              align-items: center;
              justify-content: space-around;

              .color_tip{
                height: 36px;
                width: 36px;
                //background-color:red;
              }
            }
          }
          .left_bottom{
            margin-top: 10px;

            .input-div{
              width: 98%;
              height:86px;
              border:1px solid #d0d0d0;
              border-radius:4px;
              display: flex;
              align-items:center;
            }
          }


        }
        .footer_right{
          width: 49%;
          height: 94%;
          margin-left: 10px;
          display: inline-block;
          border:1px solid rgb(242, 242, 242);

          &-top{
            margin-top:4px;
            height: 20px;
            line-height: 20px;
            margin-left: 10px;
            display: flex;
            color: rgb(153, 153, 153);

                .shun {
              display: block;
              width: 4px;
              height: 20px;
              background: rgb(0, 102, 0);
              position: relative;
              margin-right: 6px;
            }  
          }

          &-content{
            height: 80%;
            margin-left: 20px;
            overflow-y: auto;
            padding-right:10px;
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
            p{
              line-height: 1.5;
            }

          }
        }

      }
    }
}
  
</style>
