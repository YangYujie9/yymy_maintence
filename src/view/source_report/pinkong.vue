<template>
  <div class="three">
    <div ref="cangchu" class="cangchu">
    	<div ref="cangchu_top" style="border-bottom: 0px;" class="cangchu-top" v-show="hideDiv">
        <p class="search-p">
                <span >到货日期：</span>
                <el-date-picker

                size="mini"
                v-model="search.start"
                type="date"
                style="margin-right: 0px;"
                class="input-class"
                placeholder="起始日期" >
                
              </el-date-picker>-<el-date-picker
                size="mini"
                v-model="search.end"
                type="date"
                class="input-class"
                placeholder="终止日期">
            </el-date-picker>
              
            </p>
    		<p class="search-p">
                <span >数据类型：</span>
                
                <el-select clearable v-model="search.type" size="mini" class="input-class" placeholder="请选择数据类型">
                    <el-option
                      v-for="item in getout_coming_report"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                    </el-option>
                </el-select>
            </p>
            <p class="search-p">
                <span >编号：</span>
                <el-input size="mini" class="input-class" v-model="search.id" placeholder="请输入编号"></el-input>
            </p>
           
            <p class="search-p">
                <span >供应链：</span>
                <el-select clearable v-model="search.supply" size="mini" class="input-class" placeholder="请选择供应链">
                    <el-option
                      v-for="item in getout_supply_report"
                      :key="item.dicName"
                      :label="item.dicName"
                      :value="item.dicName">
                    </el-option>
                </el-select>
                <!--<el-input size="mini" class="input-class" v-model="search.supply" placeholder="请输入供应链"></el-input>-->
            </p>
            <p class="search-p">
                <span >款号：</span>
                <el-input size="mini" class="input-class" v-model="search.wareId" placeholder="请输入款号"></el-input>
            </p>
            <p class="search-p">
                <span >颜色：</span>
                <el-input size="mini" class="input-class" v-model="search.color" placeholder="请输入颜色"></el-input>
            </p>
            <p class="search-p">
                <span >工厂：</span>
                <!--<el-input size="mini" class="input-class" v-model="search.factory" placeholder="请输入工厂"></el-input>-->
                <el-select clearable v-model="search.factory" filterable size="mini" class="input-class" placeholder="请选择工厂">
                    <el-option
                      v-for="item in getout_factory_report"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                    </el-option>
                </el-select>
            </p>
            <p class="search-p">
                <span >问题类型：</span>
                

                <!--<el-cascader
                  :options="question_type_list"
                  clearable
                  :props="question_type_list_props"
                  size="mini" class="input-class" 
                  v-model="search.problemType"
                 >
                </el-cascader>-->
                <el-dropdown class="custom-width" trigger="click" size="mini" placement="bottom">
                  <el-button style="width: 184px;overflow: hidden;text-align: left;" size="mini" class="custom-width-order">
                    &nbsp;{{staffvalueshow}}&nbsp;
                  </el-button>
                  <el-dropdown-menu style="min-width: 224px;max-height: 300px;overflow: scroll;" slot="dropdown">
                    <el-tree node-key="id" :data="question_type_list" :props="question_type_list_props" @check="staffsave" ref="staff" show-checkbox class="custom-width-order">
                    </el-tree>
                    
                  </el-dropdown-menu>
                </el-dropdown>
            </p>
            <p class="search-p">
                <span >判定结果：</span>
                <el-select size="mini" class="input-class" clearable v-model="search.memo" placeholder="请选择">
                    <el-option
                      v-for="item in pandingjieguo" 
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
            </p>
            <p class="search-p">
                <span >是否完结：</span>
                <el-select size="mini" class="input-class" clearable v-model="search.isResults" placeholder="请选择">
                    <el-option
                      v-for="item in isresult" 
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option> 
                </el-select>
            </p>
            <p class="search-p">
                <span >问题等级：</span>
                <el-select size="mini" class="input-class" clearable v-model="search.problemLevel" placeholder="请选择问题等级">
                    <el-option
                      v-for="item in problemLevelarray" 
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
            </p>

            <p class="search-p">
                <span >判定说明：</span>
                <el-input size="mini" class="input-class" v-model="search.nextMemo" placeholder="请输入判定说明"></el-input>
            </p>
            <p class="search-p">
                <span >确认人：</span>
                <el-input size="mini" class="input-class" v-model="search.confirmer" placeholder="请输入确认人"></el-input>
            </p>
            <p class="search-p">
                <span>类型：</span>
                <el-select size="mini" class="input-class" clearable v-model="search.incomingTypeName" placeholder="请选择类型">
                    <el-option
                      v-for="item in getout_cateage_report" 
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                    </el-option>
                </el-select>
            </p>
            <p class="search-p">
            	<el-button v-if="isInArray(21) || isInArray(26)" size="mini" @click="editfirststep" class="monbtn">新增</el-button>
            </p> 

            <p class="search-p" style="position: relative;">
                <el-button @click="select_reports" size="mini" style="" class="monbtn">搜索</el-button>

              <el-button @click="clearsearch" size="mini" style="margin-left: 20px;" class="monbtn">重置</el-button>

              <el-button size="mini" @click="exportcus" style="margin-left: 20px;" class="monbtn">导出</el-button>


              <el-button v-if="isInArray(21) || isInArray(26)" :disabled="uploadflag" size="mini" style="margin-left: 20px;position: relative" class="monbtn">{{uploadflag?'上传中': '上传'}}<input v-if="isInArray(21) || isInArray(26)" type="file" style="left: 0px" class="inpucus cursor" @change="tirggerFile($event)" /></el-button>
            </p>



        </div>
    	
        <div style="border-bottom: 1px solid #e2e2e2;">
          <!--<el-button  @click="hideDiv = !hideDiv" size="mini" :class="{hide:!hideDiv}" style="margin-left: 10px;margin-bottom: 20px" type="primary">{{hideDiv? '收起':'隐藏'}}</el-button>-->
          <el-button  @click="hidediv" size="mini" :class="{hide:!hideDiv}" style="margin-left: 10px;margin-bottom: 20px" class="monbtn">{{hideDiv? '隐藏':'展开'}}</el-button>
        </div>

    	<div :style="{height: table_height}" class="table-wrap">
    		<el-table
                :data="tableData"
                :height="table_height-60"
                :header-cell-style='{"background": "#3f3f3f",
		          "border-right": "1px solid #cecece",
		          "border-bottom": "1px solid #cecece",
		          "text-align": "center",
		          "color": "#ffffff"}'
                style="width: 100%">
                <el-table-column label="后道部发起信息">
                	<el-table-column
                      prop="id"
                      label="编号"
                      width="70"
                      align="center"
                      >
                      
                    </el-table-column>
                	
                    <el-table-column
                      prop="type"
                      label="数据类型"
                      width="100"
                      align="center"
                      >
                      <template slot-scope="scope">
                            {{filterstatus(scope.row.type)}}
                      </template>
                      
                      
                    </el-table-column>
                    <el-table-column
                      prop="wareId"
                      label="款号"
                      align="center"
                      width="150"
                      >
                      
                    </el-table-column>
                    <el-table-column
                      prop="color"
                      label="颜色"
                      width="70"
                      align="center"
                      >
                      
                    </el-table-column>
                    <el-table-column
                      prop="supply"
                      label="供应链"
                      align="center"
                      >
                      
                    </el-table-column>
                    <el-table-column
                      prop="factory"
                      label="工厂"
                      align="center"
                      >
                      
                    </el-table-column>
                    
                    <el-table-column
                      prop="date"
                      label="到货日期"
                      width="100"
                      align="center"
                      >
                        <template slot-scope="scope">
                            {{scope.row.date ? fmtDate(scope.row.date) : ''}}
                        </template>
                      
                    </el-table-column>

                    <el-table-column
                      prop="feedbackTime"
                      label="反馈时间"
                      width="100"
                      align="center"
                      >
                        <template slot-scope="scope">
                            {{scope.row.feedbackTime ? fmtDate(scope.row.feedbackTime) : ''}}
                        </template>
                      
                    </el-table-column>
                    <el-table-column
                      prop="num"
                      label="来货数量"
                      width="80"
                      align="center"
                      >
                      
                    </el-table-column>
                    <el-table-column
                      prop="problemNum"
                      label="问题品数量"
                      width="90"
                      align="center"
                      >
                      
                    </el-table-column>
	                <el-table-column
                      prop="problemType"
                      label="问题类型"
                      align="center"
                      >
                      <template slot-scope="scope">
                            
                            {{scope.row.problemType}}
                      </template>

                      
                    </el-table-column>
                    <el-table-column
                      prop="memo"
                      label="问题说明"
                      width="230"
                      align="center"
                      >
                      
                    </el-table-column>
                    <el-table-column
                      prop="confirmer"
                      label="操作"
                      width="70"
                      align="center"
                      >
                      <template slot-scope="scope">
                          <el-button
                          size="mini"
                          type="primary"
                          v-if="(isInArray(21) || isInArray(26))  &&  !scope.row.results"
                          
                          @click="editfirststepedit(scope.row)"
                         >编辑</el-button>
                          
                        </template>
                      
                    </el-table-column>

                </el-table-column>
                <el-table-column label="品控部确认信息">
                    <el-table-column
                      prop="decideTime"
                      label="判定时间"
                      width="100"
                      align="center"
                      >
                        <template slot-scope="scope">
                            {{scope.row.decideTime ? fmtDate(scope.row.decideTime) : ''}}
                        </template>
      
                    </el-table-column>

                   <el-table-column
                      prop="nextMemo"
                      label="判定说明"
                      width="170"
                      align="center"
                      >
                      
                    </el-table-column>
                    <el-table-column
                      prop="problemLevel"
                      label="问题等级"
                      width="80"
                      align="center"
                      >
                      
                    </el-table-column>
                    <el-table-column
                      prop="nextMemo"
                      width="140"
                      label="图片信息"
                      >
                      <template slot-scope="scope">


                          
                          <span v-if="scope.row.url && scope.row.url.indexOf('http')">


                            <img @dblclick="openBigImg(`http://hzyymy.cn/${scope.row.url}`)" style="width: 120px;height: 110px;" v-if="IsImageFile(scope.row.url)" :src="`http://hzyymy.cn/${scope.row.url}`"/>



                            <a :download="`${scope.row.url}`" target="_blank" :href="`http://hzyymy.cn/${scope.row.url}`" v-else>{{`http://hzyymy.cn/${scope.row.url}`}}</a>
                          </span>

                          <span v-if="scope.row.url && !scope.row.url.indexOf('http')">




                            <img @dblclick="openBigImg(`${scope.row.url}`)" style="width: 120px;height: 110px;" v-if="IsImageFile(scope.row.url)" :src="`${scope.row.url}`"/>



                            <a :download="`${scope.row.url}`" target="_blank" :href="`${scope.row.url}`" v-else>{{`${scope.row.url}`}}</a>
                          </span>
                          
                          
                      </template>
                      
                    </el-table-column>
                    <el-table-column
                      prop="nextMemo"
                      width="140"
                      label="签单入库凭证"
                      >
                      <template slot-scope="scope">


                          
                         

                          <span v-if="scope.row.loadUrl">




                            <img @dblclick="openBigImg(`${scope.row.loadUrl}`)" style="width: 120px;height: 110px;" v-if="IsImageFile(scope.row.loadUrl)" :src="`${scope.row.loadUrl}`"/>



                            <a :download="`${scope.row.loadUrl}`" target="_blank" :href="`${scope.row.loadUrl}`" v-else>{{`${scope.row.loadUrl}`}}</a>
                          </span>
                          
                          
                      </template>
                      
                    </el-table-column>
                    <el-table-column
                      prop="confirmer"
                      label="确认人"
                      align="center"
                      >
                      
                    </el-table-column>
                    <el-table-column
                      prop="confirmer"
                      label="操作"
                      width="70"
                      >
                      <template slot-scope="scope">
                          <el-button
                          size="mini"
                          type="primary"
                          v-if="(isInArray(19)  || isInArray(26))  &&  !scope.row.results"
                          @click="editsecondstep(scope.row, 'pinkong')"
                         >编辑</el-button>
                          
                        </template>
                      
                    </el-table-column>

                </el-table-column>
                <el-table-column label="后道部确认信息">
                	 <el-table-column
                      prop="isResults"
                      label="是否完结"
                      width="80"
                      align="center"
                      >
                      <template slot-scope="scope">
                            {{scope.row.results === true ? '是' : scope.row.results === false ?'否': ''}}
                      </template>
                      
                    </el-table-column>

                  <el-table-column
                      prop="dutyGroup"
                      label="责任部门"
                      width="85"
                      align="center"
                      >
                  </el-table-column>

                  <el-table-column
                      prop="dutyMemo"
                      label="备注"
                      width="90"
                      align="center"
                      >
                  </el-table-column>
                    
                   
                    <el-table-column label="判定结果种类">
                      <el-table-column
                        prop="incomingTypeName"
                        label="类型"
                        width="90"
                        align="center"
                        >
                        
                      </el-table-column>
                      <el-table-column
                        prop="importWare"
                        label="入库"
                        width="70"
                        align="center"
                        >
                        
                      </el-table-column>
                      <el-table-column
                        prop="returnFactory"
                        label="返厂"
                        width="70"
                        align="center"
                        >
                        
                      </el-table-column>

                      
                    </el-table-column>
                    <el-table-column
                      prop="confirmer"
                      label="操作"
                      width="70"
                      align="center"
                      >
                      <template slot-scope="scope">
                          <el-button
                          size="mini"
                          type="primary"
                          v-if="(isInArray(21) || isInArray(26)) &&  !scope.row.results"
                          @click="editsecondstep(scope.row,'houdao')"
                         >编辑</el-button>
                          
                        </template>
                      
                    </el-table-column>



                </el-table-column>
            </el-table>
            <div class="pagination height1">
                  <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[250, 300, 350, 400, 450]"
                    :page-size="search.pageSize"
                    :current-page="search.pageNum"
                    :total="search.total"
                    layout="total,sizes, prev, pager, next"
                    >
                  </el-pagination>
                </div>
    	</div>
    	<el-dialog
          title="后道部/品控部发起信息"
          :visible.sync="firststep.dialogVisible"
          width="640px"
          :close-on-click-modal="false"

          >

          <div class="firststopwrap">
          	<p style="margin-top: 20px;">
                  <span >数据类型：</span>
                  <el-select style="margin-right: 20px;" clearable v-model="firststep.type" placeholder="请选择" size="mini">
                    <el-option
                      v-for="item in getout_coming_report"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                    </el-option>
                  </el-select>
                  

                  <span >到货日期：</span>
                    <el-date-picker
                      v-model="firststep.date"
                      size="mini" class="input-class" 
                      type="date"
                      style="width: 170px;"
                      placeholder="到货日期">
                    </el-date-picker>
             </p>
            <p style="margin-top: 20px;">
                  <span >供&nbsp;&nbsp;应&nbsp;&nbsp;链：</span>
                  <!--<el-input size="mini"
                  style="display: inline-block;width: 170px;font-size: 12px;margin-right: 20px;" placeholder="请输入供应链" v-model="firststep.supply" ></el-input>-->
                  <el-select clearable v-model="firststep.supply" size="mini" class="input-class" placeholder="请选择供应链">
                    <el-option
                      v-for="item in getout_supply_report"
                      :key="item.dicName"
                      :label="item.dicName"
                      :value="item.dicName">
                    </el-option>
                  </el-select>

                  <span >&nbsp;&nbsp;&nbsp;&nbsp;款&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 170px;font-size: 12px;" placeholder="请输入款号" v-model="firststep.wareId" ></el-input>
            </p>
          	<p style="margin-top: 20px;">
              <span >颜&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色：</span>
              <el-input size="mini"
              style="display: inline-block;width: 170px;font-size: 12px;margin-right: 20px;" placeholder="请输入颜色" v-model="firststep.color" ></el-input>

              <span >工&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;厂：</span>
                  <!--<el-input size="mini"
                  style="display: inline-block;width: 170px;font-size: 12px;" placeholder="请输入工厂" v-model="firststep.factory" ></el-input>-->
              <el-select clearable v-model="firststep.factory" filterable size="mini" class="input-class" placeholder="请选择工厂">
                    <el-option
                      v-for="item in getout_factory_report"
                      :key="item.dicName"
                      :label="item.dicName"
                      :value="item.dicName">
                    </el-option>
                </el-select>

              
            </p>
            <p style="margin-top: 20px;">
              <span >来货数量：</span>
              <el-input size="mini"
              style="display: inline-block;width: 170px;font-size: 12px;margin-right: 20px;" placeholder="请输入来货数量" v-model="firststep.num" ></el-input>

              <span >问题类型：</span>

                  <!--<el-cascader
                  size="mini"
                    :options="question_type_list"
                    :props="question_type_list_props"
                    style="display: inline-block;width: 170px;font-size: 12px;" 
                    v-model="firststep.problemType"
                   >
                  </el-cascader>-->
                  <el-dropdown class="custom-width" trigger="click" size="mini" placement="bottom">
                  <el-button style="width: 184px;overflow: hidden;text-align: left;" size="mini" class="custom-width-order">
                    &nbsp;{{staffvalueaddshow}}&nbsp;
                  </el-button>
                  <el-dropdown-menu style="min-width: 224px;max-height: 300px;overflow: scroll;" slot="dropdown">
                    <el-tree node-key="id" :data="question_type_list" :props="question_type_list_props" @check="staffsaveadd" ref="staffadd" show-checkbox class="custom-width-order">
                    </el-tree>
                    
                  </el-dropdown-menu>
                </el-dropdown>

              
            </p>
            <p style="margin-top: 20px;">
              <span >问题品数量：</span>
              <el-input size="mini"
              style="display: inline-block;width: 170px;font-size: 12px;margin-right: 20px;" placeholder="请输入问题品数量" v-model="firststep.problemNum" ></el-input>


              <span >反馈时间：</span>
                <el-date-picker
                  v-model="firststep.feedbackTime"
                  size="mini" class="input-class" 
                  type="date"
                  style="width: 170px;"
                  placeholder="反馈时间">
                </el-date-picker>
              
              
            </p>

            <p style="margin-top: 20px;">
                  <span style="position: relative;top: -20px;">问题说明：</span>
                  <el-input type="textarea"
                  :rows="2"
                  placeholder="请输入问题说明" style="display: inline-block;width: 260px;font-size: 12px;" v-model="firststep.memo" ></el-input>
          
                </p>

          </div>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="firststep.dialogVisible = false">取 消</el-button>
            <el-button size="mini" @click="add_quality" type="primary" >确 定</el-button>
          </span>
        </el-dialog>
        
        <el-dialog
          title="品控部确认"
          :visible.sync="secondstep.dialogVisible"
          width="640px"
          :close-on-click-modal="false"
          v-loading="imgloading"
          element-loading-text="图片上传中"

          >
          <div class="firststopwrap">
          		<!--<p style="margin-top: 20px;">
                  <span >是否完结：</span>
                  <el-select style="margin-right: 20px;" clearable v-model="secondstep.isResults" placeholder="请选择" size="mini">
                    <el-option
                      v-for="item in isresult"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </p>-->
                <p style="margin-top: 20px;">
                  <span >判定时间：</span>
                  <el-date-picker size="mini"
                  style="display: inline-block;width: 170px;font-size: 12px;" 
                  type="date"
                  placeholder="请输入判定时间" 
                  v-model="secondstep.decideTime" >
                  </el-date-picker>
                </p>
                <p style="margin-top: 20px;">
                  <span >问题等级：</span>
                  <el-select style="margin-right: 20px;" clearable v-model="secondstep.problemLevel" placeholder="请选择问题等级" size="mini">
                    <el-option
                      v-for="item in problemLevelarray"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </p>
                <p style="margin-top: 20px;">
                    <span >确认人员：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 170px;font-size: 12px;" placeholder="请输入确认人" v-model="secondstep.confirmer" ></el-input>
                </p>
                <!--<p style="margin-top: 20px;">
                	<span style="margin-right: 10px;">判定结果种类：</span>
                	<span >入库：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 110px;font-size: 12px;margin-right: 20px;" placeholder="请输入入库" v-model="secondstep.importWare" ></el-input>

                  <span >返厂：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 110px;font-size: 12px;margin-right: 20px;" placeholder="请输入返厂" v-model="secondstep.returnFactory" ></el-input>
                </p>-->
                <p style="margin-top: 20px;">
                  <span style="position: relative;top:0px;">图片信息：</span>
                  <el-upload
                    style="display: inline-block;"
                    class="upload-demo"
                    :http-request="uploadpicturea"
                    action="http://upload-z2.qiniup.com/"
                    >
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                  <ul style="display: block;" class="el-upload-list el-upload-list--text">
                    <li  style="margin-bottom: 10px;" class="el-upload-list__item is-success el-list-enter-to">
                      <a v-if="secondstep.url" class="el-upload-list__item-name">
                        <span><i class="el-icon-document"></i><a > {{secondstep.url}}</a></span>

                      </a>
                    </li>
                  </ul>
          
                </p>

                <p style="margin-top: 20px;">
                  <span style="position: relative;top:0px;">签单入库凭证：</span>
                  <el-upload
                    style="display: inline-block;"
                    class="upload-demo"
                    :http-request="upload_pk_load_pic"
                    action="http://upload-z2.qiniup.com/"
                    >
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                  <ul style="display: block;" class="el-upload-list el-upload-list--text">
                    <li  style="margin-bottom: 10px;" class="el-upload-list__item is-success el-list-enter-to">
                      <a v-if="secondstep.qd_url" class="el-upload-list__item-name">
                        <span><i class="el-icon-document"></i><a > {{secondstep.qd_url}}</a></span>

                      </a>
                    </li>
                  </ul>
          
                </p>

          	 	<p style="margin-top: 20px;">
                  <span style="position: relative;top: -20px;">判定说明：</span>
                  <el-input type="textarea"
                  :rows="2"
                  placeholder="请输入问题说明" style="display: inline-block;width: 260px;font-size: 12px;" v-model="secondstep.memo" ></el-input>
          
                </p>
          </div>

          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="secondstep.dialogVisible = false">取 消</el-button>
            <el-button size="mini" @click="update_report_by_pk()" type="primary" >确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog
          title="后道部确认"
          :visible.sync="secondstep.thirddialogVisible"
          width="560px"
          :close-on-click-modal="false"

          >
          <div class="firststopwrap">
              <p style="margin-top: 20px;">
                <span>责任部门：</span>
                <el-input
                size="mini"
                v-model="secondstep.dutyGroup"
                placeholder = "请输入责任部门"
                style="display: inline-block;width: 160px;"></el-input>
              </p>

              <p style="margin-top: 20px;">
                  <span >是否完结：</span>
                  <el-select style="margin-right: 20px;" clearable v-model="secondstep.isResults" placeholder="请选择" size="mini">
                    <el-option
                      v-for="item in isresult"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
              </p>
              
              <p style="margin-top: 20px;">
                <span style="margin-right: 10px;margin-bottom: 20px;">判定结果种类：</span>
                <span>类型：</span>
                  <el-select style="margin-right: 20px;" clearable v-model="secondstep.incomingType" placeholder="请选择" size="mini">
                  <el-option
                    v-for="item in getout_cateage_report" 
                    :key="item.dicCode"
                    :label="item.dicName"
                    :value="item.dicCode">
                  </el-option>
                </el-select><br>

                <span style="margin-top: 20px">入库：</span>
                <el-input size="mini"
                style="display: inline-block;width: 110px;font-size: 12px;margin-right: 20px;margin-top: 20px" placeholder="请输入入库" v-model="secondstep.importWare" ></el-input>

                <span style="margin-top: 20px">返厂：</span>
                <el-input size="mini"
                style="display: inline-block;width: 110px;font-size: 12px;margin-right: 20px;margin-top: 20px" placeholder="请输入返厂" v-model="secondstep.returnFactory" ></el-input>
              </p>
              <p style="margin-top: 20px;">
                <span style="position: relative;top: -20px;">备注：</span>
                <el-input
                size="mini"
                v-model="secondstep.dutyMemo"
                type="textarea"
                :rows="2"
                placeholder = "请输入备注"
                style="display: inline-block;width: 260px;"></el-input>
              </p>
            
          </div>

          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="secondstep.thirddialogVisible = false">取 消</el-button>
            <el-button size="mini" @click="update_report_by_houdao()" type="primary" >确 定</el-button>
          </span>
        </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
//const uuidv1 = require('uuid/v1')
import {
  isImageFile,
  isVideoFile,
  matchType
} from '../../../static/util'


export default {
    name: "index",
    data(){
        return{
          hideDiv:true,
          uploadflag: false,
          imgloading: false,
          qd_imgloading: false,
        	table_height: 300,
          table_height_a:'',
        	search: {
            start: new Date([new Date().getFullYear(),new Date().getMonth()+1,1].join('-')),
            end: new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1),
        		id: '',
        		type: '',
            date: '',
        		supply: '',
        		wareId: '',
        		color: '',
        		factory: '',
        		problemType: [],
            problemLevel: '',
            problemTypeques: [],
            problemTypequesvalue: '',
        		memo: '',
        		isResults: '',
        		nextMemo: '',
        		confirmer: '',
        		pageNum: 1,
        		pageSize: 250,
        		total: 0,
            incomingTypeName:'',

        	},
          problemLevelarray: [
            {
                label: 'A',
                value: 'A',
            },
            {
                label: 'B',
                value: 'B',
            },
            {
                label: 'C',
                value: 'C',
            },
          ],
          pandingjieguo: [
            {
                label: '入库',
                value: 'rk',
            },
            {
                label: '返厂',
                value: 'fc',
            },
          ],
        	firststep: {
        		dialogVisible: false,
        		type: '',
            id: '',
        		date: '',
        		supply: '',
        		wareId: '',
        		color: '',
        		factory: '',
            problemNum: '',
        		num: '',
        		problemType: [],
            problemTyperow: '',
        		memo: '',
            problemTypeques: [],
            problemTypequesvalue: '',
            feedbackTime: '',
        	},
        	isresult: [ 
                {
                    label: '是',
                    value: true, 
                },
                {
                    label: '否',
                    value: false, 
                },
            ],
        	secondstep: {
            thirddialogVisible: false,
        		dialogVisible: false,
        		id: '',
        		isResults: '',
        		importWare: '',
        		returnFactory: '',
            problemLevel: '',
        		memo: '',
        		confirmer: '',
            url: '',
            qd_url: '',
            qd_file: {},
            problemNum: 0,
            num: '',
            file: {},
            qd_file: {},
            incomingTypeName:'',
            incomingType: '',
            decideTime: '',
            dutyGroup: '',
            dutyMemo: '',
        	},
        	tableData: [],
          question_type_list: [],
          question_type_list_props: {
            value: 'questionId',
            label: 'questionName',
            children: 'list'
          },
          uploadlist: [],
        }
    },
    computed: {
        ...mapGetters([
            'getpageDict',
            'getpowers'
        ]),
        getout_coming_report() {
            let demand_status = this.getpageDict.filter((list) => {
                return list.dicType == "quality_report"
            })


            if (demand_status[0]) {
                return demand_status[0].dicList
            } else {
                return []
            }

            
        },
        getout_supply_report() {
            let demand_status = this.getpageDict.filter((list) => {
                return list.dicType == "supply"
            })


            if (demand_status[0]) {
                return demand_status[0].dicList
            } else {
                return []
            }

            
        },
        getout_cateage_report() {
            let demand_status = this.getpageDict.filter((list) => {
                return list.dicType == "incoming_type"
            })


            if (demand_status[0]) {
                return demand_status[0].dicList
            } else {
                return []
            }

            
        },
        getout_factory_report() {
            let demand_status = this.getpageDict.filter((list) => {
                return list.dicType == "factory"
            })


            if (demand_status[0]) {
                return demand_status[0].dicList
            } else {
                return []
            }

            
        },
        staffvalueshow() {
            let string = '请选择问题类型'

            if (this.search.problemTypequesvalue.length > 12 || this.search.problemTypequesvalue.length == 12) {
                string = this.search.problemTypequesvalue.substr(0, 12) + '...'
            } else if (this.search.problemTypequesvalue.length>0 && this.search.problemTypequesvalue.length<12) {
                string = this.search.problemTypequesvalue
            }

            return string
        },
        staffvalueaddshow() {
            let string = '请选择问题类型'

            if (this.firststep.problemTypequesvalue.length > 12 || this.firststep.problemTypequesvalue.length == 12) {
                string = this.firststep.problemTypequesvalue.substr(0, 12) + '...'
            } else if (this.firststep.problemTypequesvalue.length>0 && this.firststep.problemTypequesvalue.length<12) {
                string = this.firststep.problemTypequesvalue
            }

            return string
        }
    },
    watch:{
      /*hideDiv(value) {
        if (value) {
          this.$nextTick(()=>{
            console.info(555)
            this.table_height = this.$refs.cangchu.offsetHeight - this.$refs.cangchu_top.offsetHeight -30
               console.info(this.table_height)
             
          })
        }
      }*/
    },
    created() {
       
    },
    mounted(){
      	this.$nextTick(()=>{

            this.table_height = this.$refs.cangchu.offsetHeight - this.$refs.cangchu_top.offsetHeight -30

            this.table_height_a = this.$refs.cangchu.offsetHeight -30

        })

        this.select_reports()
        this.get_question_type_list()
        //this.uploadpicture()
    },
    methods:{
        hidediv () {
          this.hideDiv = !this.hideDiv
          this.$nextTick(()=>{
            this.table_height = this.$refs.cangchu.offsetHeight - this.$refs.cangchu_top.offsetHeight -30

             
          })
        },
        deletefile(key) {
        let that = this
        this.$maintancehttp.get(`qiniuyun/delete_file?fileName=${key}`)  
               .then((data)=>{
                    console.info(data)
                })
                .catch(function (error) {
                    console.log(error);
                    that.$message({
                        message: '接口报错',
                        type: 'error'
                      });
                  });
        },
        openBigImg(imgPath) {
          window.open(imgPath)
        },
        gettoken() {
          return new Promise((resolve, reject) => {
            this.$maintancehttp.get(`qiniuyun/get_token`)
                .then((data)=>{
                  if (data.code == '200') {
                    resolve(data.data)
                  }
                })
            })
        },
        /*async uploadpicture(filestatus) {

          if (isImageFile(filestatus.file) && filestatus.file.size > 2*1024*1024) {
            return this.$message({
              message: '上传图片大小不能超过2mb',
              type: 'error'
            })

          }


          let token = await this.gettoken()

          var fileExtension = filestatus.file.name.substring(filestatus.file.name.lastIndexOf('.') + 1);




          var newfile = new File([filestatus.file], uuidv1()+"."+fileExtension, {type:filestatus.file.type})
          filestatus.newfile = newfile

          filestatus.progressa = 0

          filestatus.status = false

          const formData = new FormData()
          formData.append('token', token)
          formData.append('file', newfile)
          formData.append('key', `${newfile.name}`)
          this.imgloading = true

          let that = this
            this.$http({
              url:  filestatus.action,
              method: 'POST',
              data: formData,
              headers: {'Content-Type': 'multipart/form-data'},
              onUploadProgress (a){
                /*let dlItem = that.uploadlist.find((item) => {
                  return item.newfile.name === filestatus.newfile.name
                })
                let precent = (a.loaded / a.total).toFixed(2)
                filestatus.progressa = precent
                dlItem.progressa = precent * 100*/
              /*},
            }).then((res) => {
              //保存图片到数据库
              
              this.imgloading = false

              if (this.secondstep.url) {
                let arr = this.secondstep.url.split('/')

                this.deletefile(arr[arr.length-1])
              }

              //
              

              this.secondstep.url = res.key
              this.$message({
                message: "图片上传成功",
                type: 'success'
              })
              
              //this.savereource(res)
            })
        },*/
        IsImageFile(url) {
          let re = matchType(url)
          return re == 'image' ? true: false
        },
        upload_pk_load_pic(filestatus) {
          if (isImageFile(filestatus.file) && filestatus.file.size > 2*1024*1024) {
            return this.$message({
              message: '上传图片大小不能超过2mb',
              type: 'error'
            })

          }

          this.secondstep.qd_url = filestatus.file.name
          this.secondstep.qd_file = filestatus.file

          const formData = new FormData()
          
          formData.append('file', filestatus.file)
          this.qd_imgloading = true

          let that = this
            this.$maintancehttp({
              url:  'reports/upload_pk_load_pic?id='+this.secondstep.id,
              method: 'post',
              data: formData,
              headers: {'Content-Type': 'multipart/form-data'},
              onUploadProgress (a){
                /*let dlItem = that.uploadlist.find((item) => {
                  return item.newfile.name === filestatus.newfile.name
                })
                let precent = (a.loaded / a.total).toFixed(2)
                filestatus.progressa = precent
                dlItem.progressa = precent * 100*/
              },
            }).then((res) => {
              //保存图片到数据库
              this.qd_imgloading = false

              this.$message({
                      message: '上传成功',
                      type: 'success'
                    })

            })


        },
        uploadpicturea(filestatus) {
          if (isImageFile(filestatus.file) && filestatus.file.size > 2*1024*1024) {
            return this.$message({
              message: '上传图片大小不能超过2mb',
              type: 'error'
            })

          }

          this.secondstep.url = filestatus.file.name
          this.secondstep.file = filestatus.file


          const formData = new FormData()
          
          formData.append('file', filestatus.file)
          this.imgloading = true

          let that = this
            this.$maintancehttp({
              url:  'reports/upload_pk_file?id='+this.secondstep.id,
              method: 'post',
              data: formData,
              headers: {'Content-Type': 'multipart/form-data'},
              onUploadProgress (a){
                /*let dlItem = that.uploadlist.find((item) => {
                  return item.newfile.name === filestatus.newfile.name
                })
                let precent = (a.loaded / a.total).toFixed(2)
                filestatus.progressa = precent
                dlItem.progressa = precent * 100*/
              },
            }).then((res) => {
              //保存图片到数据库
              this.imgloading = false

              this.$message({
                      message: '上传成功',
                      type: 'success'
                    })

            })



          
        },
        //文件上传
        tirggerFile : function (event) {
          let that = this


            if (this.uploadflag) {
                return this.$message({
                  message: "正在上传中",
                  type: 'error'
                })
            }
            this.uploadflag = true
            var file = event.target.files[0]

            let formData = new FormData();
            formData.append('file', file);

            this.$maintancehttp({
                url:  'reports/import_quality_report',
                method: 'POST',
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            }).then((res) => {
                that.uploadflag = false
                event.target.value=""
                if (res.code == '200') {


                    that.$message({
                      message: res.msg,
                      type: 'success'
                    })
                } else {
                    that.$message({
                      message: res.msg,
                      type: 'error'
                    })
                }

                that.select_reports()

            })

      },
      
      staffsave() {
          let checkData = this.$refs.staff.getCheckedNodes()

          //console.info(checkData)

          this.search.problemTypeques = []
          this.search.problemTypequesvalue = ''
          

          for (let i=0;i<checkData.length;i++) {
            if (!checkData[i].list) {
                this.search.problemTypeques.push(checkData[i].questionId)
              
                this.search.problemTypequesvalue += checkData[i].questionName+','
            }


          }

      },
      editfirststepedit(row) {

        //console.info(row)
        this.firststep.type = row.type
        this.firststep.id = row.id
        this.firststep.date = row.date? new Date(row.date*1000):''
        this.firststep.supply = row.supply
        this.firststep.wareId = row.wareId
        this.firststep.color = row.color
        this.firststep.factory = row.factory
        this.firststep.num = row.num
        this.firststep.problemType = []
        this.firststep.problemTypeques = []
        this.firststep.problemTypequesvalue = row.problemType
        this.firststep.problemTyperow = row.problemType
        this.firststep.memo = row.memo
        this.firststep.problemNum = row.problemNum
        this.firststep.feedbackTime = row.feedbackTime? new Date(row.feedbackTime*1000):''
        this.firststep.dialogVisible = true
      },
      staffsaveadd() {
          let checkData = this.$refs.staffadd.getCheckedNodes()

          //console.info(checkData)

          this.firststep.problemTypeques = []
          this.firststep.problemTypequesvalue = ''
          

          for (let i=0;i<checkData.length;i++) {
            if (!checkData[i].list) {
                this.firststep.problemTypeques.push(checkData[i].questionId)
              
                this.firststep.problemTypequesvalue += checkData[i].questionName+','
            }


          }






          

      },
      isInArray(value){
            for(var i = 0; i < this.getpowers.length; i++){
                if(value == this.getpowers[i]){

                    return true;
                }
            }
            return false;
      },
      get_question_type_ok(id) {
        let choose = ''
        for (let i=0; i<this.question_type_list.length; i++) {
            for (let j=0; j<this.question_type_list[i].list.length; j++) {
              if (id == this.question_type_list[i].list[j].questionId) {
                choose = this.question_type_list[i].list[j].questionName

              }
            }     
        }


        return choose

        
      },
      get_question_type_list() {
        this.$maintancehttp.get(`dic/get_question_type_list`)
                .then((data)=>{
                    for (let i=0; i<data.data.length; i++) {
                      data.data[i].questionId = data.data[i].typeId
                      data.data[i].questionName = data.data[i].typeName
                    }

                    this.question_type_list = data.data
                    
                })
                .catch(function (error) {
                    console.log(error);
                    that.$message({
                        message: '接口报错',
                        type: 'error'
                      })
                })
      },
    	editsecondstep(row,type) {
    		this.secondstep.id = row.id
    		this.secondstep.isResults = row.results
    		this.secondstep.importWare = row.importWare
    		this.secondstep.returnFactory = row.returnFactory
    		this.secondstep.memo = row.nextMemo
    		this.secondstep.confirmer = row.confirmer
        this.secondstep.num = row.num
        this.secondstep.url = row.url
        this.secondstep.qd_url = row.loadUrl
        this.secondstep.problemNum = row.problemNum
        this.secondstep.problemLevel = row.problemLevel
        this.secondstep.incomingTypeName= row.incomingTypeName

        this.secondstep.incomingType = row.incomingType
        this.secondstep.decideTime =row.decideTime? new Date(row.decideTime *1000):''
        this.secondstep.dutyGroup = row.dutyGroup
        this.secondstep.dutyMemo = row.dutyMemo

        if (type == 'pinkong') {
          this.secondstep.dialogVisible = true
        } else {
          this.secondstep.thirddialogVisible = true
        }
    		
    	},
    	update_report_by_pk() {
    		let that = this


        if (!this.secondstep.decideTime) {
          return this.$message({
                    message: '输入判定时间',
                    type: 'warning'
                })
        }

       

        if (!this.secondstep.problemLevel) {
          return this.$message({
                    message: '选择问题等级',
                    type: 'warning'
                })
        }

        if (!this.secondstep.confirmer) {
          return this.$message({
                    message: '输入确认人',
                    type: 'warning'
                })
        }
        

        


        
        if (!this.secondstep.memo) {
          return this.$message({
                    message: '输入判定原因',
                    type: 'warning'
                })
        }

       


        
    		this.$maintancehttp.post(`reports/update_report_by_pk`,{
                    id: this.secondstep.id,
                    //isResults: this.secondstep.isResults,
                    problemLevel: this.secondstep.problemLevel,

                    //importWare: this.secondstep.importWare,
                    //returnFactory: this.secondstep.returnFactory,
                    confirmer: this.secondstep.confirmer,
                    memo: this.secondstep.memo,
                    decideTime: this.secondstep.decideTime? this.secondstep.decideTime.getTime().toString().substr(0, 10):'',
                })
                .then((data)=>{
                    if (data.code == 200) {
                        this.$message({
                            message: data.msg,
                            type: 'success'
                          })

                        this.secondstep.dialogVisible = false

                    } else {
                        this.$message({
                            message: data.msg,
                            type: 'error'
                          });
                    }

                    this.select_reports()


                    

                })
                .catch(function (error) {
                    console.log(error);
                    that.$message({
                        message: '接口报错',
                        type: 'error'
                      })
                })
            
    	},
      update_report_by_houdao() {
        let that = this


        

       if (this.secondstep.isResults === '') {
          return this.$message({
                    message: '请选择是否完结',
                    type: 'warning'
                })
        }

        
        if (!this.secondstep.importWare) {
          return this.$message({
                    message: '请输入入库数',
                    type: 'warning'
                })
        }
        if (!this.secondstep.returnFactory) {
          return this.$message({
                    message: '输入返厂数',
                    type: 'warning'
                })
        }

      

        if (Number(this.secondstep.returnFactory) + Number(this.secondstep.importWare) != this.secondstep.problemNum) {
          return this.$message({
                    message: '返厂数加入库数应该等于问题品数！',
                    type: 'warning'
                })
        }

         
        
        
        this.$maintancehttp.post(`reports/update_report_by_pk`,{
                    id: this.secondstep.id,
                    isResults: this.secondstep.isResults,
                    importWare: this.secondstep.importWare,
                    returnFactory: this.secondstep.returnFactory,
                    incomingType:this.secondstep.incomingType,
                    dutyGroup: this.secondstep.dutyGroup,
                    dutyMemo: this.secondstep.dutyMemo,
                })
                .then((data)=>{
                    if (data.code == 200) {
                        this.$message({
                            message: data.msg,
                            type: 'success'
                          })

                        this.secondstep.thirddialogVisible = false

                    } else {
                        this.$message({
                            message: data.msg,
                            type: 'error'
                          });
                    }

                    this.select_reports()


                    

                })
                .catch(function (error) {
                    console.log(error);
                    that.$message({
                        message: '接口报错',
                        type: 'error'
                      })
                })
            
      },
    	filterstatus(id) {
            let demand_status = this.getout_coming_report.filter((list) => {
                return list.dicCode == id
            })


            if (demand_status[0]) {
                return demand_status[0].dicName
            } else {
                return id
            }
        },
    	handleSizeChange(val) {
          this.search.pageSize = val
          this.search.pageNum = 1
          this.select_reports()
        },
        handleCurrentChange(val) {
          this.search.pageNum = val
          this.select_reports()
        },
        fmtDate(obj){
            var date =  new Date(obj*1000);

            var y = 1900+date.getYear();
            var m = "0"+(date.getMonth()+1);
            var d = "0"+date.getDate();
            return y+"/"+m.substring(m.length-2,m.length)+"/"+d.substring(d.length-2,d.length);
        },
    	add_quality() {
    		let that = this

        if (this.firststep.id) {
          let problemTypea=''
          if (this.firststep.problemTypequesvalue) {
            problemTypea = this.firststep.problemTypequesvalue
          } else {
            problemTypea = this.firststep.problemTyperow
          }
          this.$maintancehttp.post(`reports/edit_quality_report`,{
            id: this.firststep.id,
            type: this.firststep.type,
            date: this.firststep.date ? this.firststep.date.getTime().toString().substr(0, 10):'',
            supply: this.firststep.supply,
            wareId: this.firststep.wareId,
            problemNum: this.firststep.problemNum,
            color: this.firststep.color,
            factory: this.firststep.factory,
            num: this.firststep.num,
            problem: problemTypea,
            memo: this.firststep.memo,
            feedbackTime: this.firststep.feedbackTime? this.firststep.feedbackTime.getTime().toString().substr(0, 10):'',
          })
          .then((data)=>{
              if (data.code == 200) {
                  this.$message({
                      message: data.msg,
                      type: 'success'
                    })

                  this.firststep.dialogVisible = false

              } else {
                  this.$message({
                      message: data.msg,
                      type: 'error'
                    });
              }

              this.select_reports()


              

          })
          .catch(function (error) {
              console.log(error);
              that.$message({
                  message: '接口报错',
                  type: 'error'
                })
          })
        } else {

          

          this.$maintancehttp.post(`reports/add_quality`,{
            type: this.firststep.type,
            date: this.firststep.date ? this.firststep.date.getTime().toString().substr(0, 10):'',
            supply: this.firststep.supply,
            wareId: this.firststep.wareId,
            problemNum: this.firststep.problemNum,
            color: this.firststep.color,
            factory: this.firststep.factory,
            num: this.firststep.num,
            problem: this.firststep.problemTypequesvalue,
            memo: this.firststep.memo,
            feedbackTime: this.firststep.feedbackTime? this.firststep.feedbackTime.getTime().toString().substr(0, 10):'',
          })
          .then((data)=>{
              if (data.code == 200) {
                  this.$message({
                      message: data.msg,
                      type: 'success'
                    })

                  this.firststep.dialogVisible = false

              } else {
                  this.$message({
                      message: data.msg,
                      type: 'error'
                    });
              }

              this.select_reports()


              

          })
          .catch(function (error) {
              console.log(error);
              that.$message({
                  message: '接口报错',
                  type: 'error'
                })
          })
        }

    		
            
    	},
    	editfirststep() {
    		this.firststep.type = ''
        this.firststep.id = ''
    		this.firststep.date = ''
    		this.firststep.supply = ''
    		this.firststep.wareId = ''
    		this.firststep.color = ''
    		this.firststep.factory = ''
    		this.firststep.num = ''
    		this.firststep.problemType = []
        this.firststep.problemTypeques = []
        this.firststep.problemTypequesvalue = ''
    		this.firststep.memo = ''
        this.firststep.problemNum = 0
        this.firststep.feedbackTime = ''
    		this.firststep.dialogVisible = true
    	},
    	clearsearch() {
    		this.search.id = ''
    		this.search.type = ''
    		this.search.supply = ''
    		this.search.wareId = ''
    		this.search.factory = ''
        this.search.color = ''
    		this.search.problemType = []
    		this.search.memo = ''
    		this.search.isResults = ''
    		this.search.nextMemo = ''
        this.search.problemTypeques = []
        this.search.problemTypequesvalue = ''
        this.search.problemLevel = ''
          
    		this.search.confirmer = ''
    		this.search.pageNum = 1
    		this.select_reports()
    	},
      	select_reports() {
            let that = this
            this.$maintancehttp.post(`reports/quality_report_list`,{ 
                id: this.search.id,
                wareId: this.search.wareId,
                pageNum: this.search.pageNum,
                pageSize: this.search.pageSize,
                supply: this.search.supply,   
                color: this.search.color,
                type: this.search.type,
                factory: this.search.factory,
                problemTypes: this.search.problemTypequesvalue,
                memo: this.search.memo,
                isResults: this.search.isResults,
                nextMemo: this.search.nextMemo,
                confirmer: this.search.confirmer,
                start: this.search.start ? this.search.start.getTime().toString().substr(0, 10): '',
                end: this.search.end ? (new Date(new Date(this.search.end).getFullYear(),new Date(this.search.end).getMonth(),new Date(this.search.end).getDate(),'23','59','59')).getTime().toString().substr(0, 10):'',
                problemLevel: this.search.problemLevel,
                incomingType: this.search.incomingTypeName

            })
               .then((data)=>{
                   this.tableData = data.data.list
                   console.info(data)

                   this.search.total = data.data.total

                

                })
                .catch(function (error) {
                    console.log(error);
                    that.$message({
                        message: '接口报错',
                        type: 'error'
                      });
                }) 
        },
        exportcus() {
            let that = this
          this.$exporthttp.post(`reports/export_quality_list`,{
                id: this.search.id,
                wareId: this.search.wareId,
                supply: this.search.supply,   
                color: this.search.color,
                type: this.search.type,
                factory: this.search.factory,
                problemTypes: this.search.problemTypequesvalue,
                memo: this.search.memo,
                isResults: this.search.isResults,
                nextMemo: this.search.nextMemo,
                confirmer: this.search.confirmer,
                problemLevel: this.search.problemLevel,
                start: this.search.start ? this.search.start.getTime().toString().substr(0, 10): '',
                end: this.search.end ? (new Date(new Date(this.search.end).getFullYear(),new Date(this.search.end).getMonth(),new Date(this.search.end).getDate(),'23','59','59')).getTime().toString().substr(0, 10):'',

          },{
            
            responseType: 'arraybuffer'
          })
            .then(function (res) {
              console.info(res)              

              let fileName = decodeURI(res.headers['file-name'])
              let data = res.data

              


              if (data && !data.byteLength) {
                alert('表格数据为空，无法导出！');
                return;
              }
              try {
                let linkElement = document.createElement('a');
                let blob = new Blob([data], {
                  type: 'application/octet-stream'
                });


                let url = window.URL.createObjectURL(blob);
                linkElement.setAttribute('href', url);
                linkElement.setAttribute("download", fileName);




                let clickEvent = new MouseEvent("click", {
                  "view": window,
                  "bubbles": true,
                  "cancelable": false
                });
                linkElement.dispatchEvent(clickEvent);
              } catch (ex) {
                console.log(ex);
              }
            })
            .catch(function (error) {
              console.log(error);
              that.loading2 = false
              that.$message({
                  message: '接口报错',
                  type: 'error'
                });
            });
        },
    },
}
</script>

<style>
  .el-upload-list{
      display: none;
    }
  

    
</style>
<style spoced lang="less">
.inpucus {
    opacity: 0;
    background: red;
    width: 60px;
    height: 26px;
    z-index: 10;
    position: absolute;
    left: 240px;
    top: 0px;

    &.iupzinde {
        z-index: 1;
    }
}
.firststopwrap {
    span {
        font-size: 12px;
    }
}
.hide{
  margin-top: 20px;
}
.cangchu {
    height: calc(100vh - 160px); 
    .monbtn{
      position: relative;
      background-color: rgb(140, 206, 173);
      color: #fff; 
    }

    &-top {
       
        margin-top: 20px;
        padding-left: 10px;

        

        .search-p {
            display: inline-block;
            margin-bottom: 20px;
            margin-right: 20px;
            font-size: 13px;

            .input-class {
                display: inline-block;
                width: 180px;
            }
        }
    }

    .table-wrap {
        margin-top: 10px;
        position: relative;

        .pagination {
            position: absolute;
            bottom: -30px;
            right: 20px;

            &.height1{
              bottom: -40px;
            }

        }

       

    }
}
  
</style>