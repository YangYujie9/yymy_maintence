<template>
  <div v-loading="loading" :element-loading-text="loading_text"
    element-loading-spinner="el-icon-loading" class="export_more_shop">
    <el-button style="position: relative;margin-right: 40px;" type="primary" >
    导入销售备货统计
    <input style="left:0px" type="file" @change="import_inventory" class="inpucus-datacenter-t pointer"  />

    </el-button>
    <el-button style="position: relative;margin-right: 40px;" type="primary" >导入三方质检报告
      <input style="left:0px" type="file" @change="import_inventory_detail_qc" class="inpucus-datacenter pointer"  />
    </el-button>
    <el-button @click="export_more_shop" type="primary" >导出数据</el-button>
  </div>
</template>

<script>
import XLSX from 'xlsx'

export default {
  data(){
    return{
      loading_text: '',
      loading: false
    }
  },
  methods: {
    import_inventory(event) {
        let obj = event.target


          if (!obj.files) {
              return;
          }

          let that = this


          that.loading = true
          that.loading_text = '插件解析中'





          setTimeout(()=>{
          var wb;//读取完成的数据
          var rABS = false; //是否将文件读取为二进制字符串
          var f = obj.files[0];

          

            var reader = new FileReader();



            reader.onload = function (e) {
                var data = e.target.result;
                if (rABS) {
                    wb = XLSX.read(btoa(that.fixdata(data)), {//手动转化
                        type: 'base64'
                    });
                } else {
                    wb = XLSX.read(data, {
                        type: 'binary'
                    });
                }


                

                //console.info(wb)

                //console.info(data)

                let arr = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
                let arr1 = []

                //console.info(arr)

                for (let i=0; i<arr.length;i++) {
                        arr1[i] = {
                          wareId: '', 
                          realStock: '',
                          transitStock: '', 
                          waitStock: '',
                          rule: ''
                        }


                        
                        for(var key in arr[i]) {



                            if (key == '商品编码') {
                                arr1[i]['wareId'] = arr[i][key]
                            }

                            if (key == '实际库存') {
                                arr1[i]['realStock'] = arr[i][key]
                            }

                            if (key == '在途库存') {
                                arr1[i]['transitStock'] = arr[i][key]
                            }
                            if (key == '待发货数') {
                                arr1[i]['waitStock'] = arr[i][key]
                            }

                            if (key == '规格') {
                                arr1[i]['rule'] = arr[i][key]
                            }
                            
                            
                        }

                       
                    
                }

                //console.info(arr1)





                that.import_inventory_post(arr1)


                


                event.target.value = ''

                //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
                //wb.Sheets[Sheet名]获取第一个Sheet的数据
                //document.getElementById("demo").innerHTML = JSON.stringify(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
            };


            
              if (rABS) {
                  reader.readAsArrayBuffer(f);
              } else {
                  reader.readAsBinaryString(f);
              }
          },100)
          
          
    },

    import_inventory_post(data) {

        this.loading_text = '插件上传中'

        this.$http.post('plug_in/import_inventory',{
                data: data,
                id: 1,

              })
             .then((data)=>{
                this.$message({
                  message: data.msg,
                  type: 'info'
                })


                this.loading = false
                this.loading_text = '上新表导入中'

                  
              })
             .catch(()=>{
              this.$message({
                message: '接口报错',
                type: 'error'
              })
          })

    },
    import_inventory_detail_qc_post(data) {
        this.loading_text = '三方质检报告上传中'

        this.$http.post('plug_in/import_inventory_detail_qc',{
                data: data,
                id: 1,

              })
             .then((data)=>{
                this.$message({
                  message: data.msg,
                  type: 'info'
                })


                this.loading = false

                  
              })
             .catch(()=>{
              this.$message({
                message: '接口报错',
                type: 'error'
              })
          })
    },
    import_inventory_detail_qc(event) {
          let obj = event.target


          if (!obj.files) {
              return;
          }

          let that = this


          that.loading = true
          that.loading_text = '三方质检报告解析中'





          setTimeout(()=>{
          var wb;//读取完成的数据
          var rABS = false; //是否将文件读取为二进制字符串
          var f = obj.files[0];

          

            var reader = new FileReader();



            reader.onload = function (e) {
                var data = e.target.result;
                if (rABS) {
                    wb = XLSX.read(btoa(that.fixdata(data)), {//手动转化
                        type: 'base64'
                    });
                } else {
                    wb = XLSX.read(data, {
                        type: 'binary'
                    });
                }


                

                //console.info(wb)

                //console.info(data)

                let arr = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
                let arr1 = []


                for (let i=0; i<arr.length;i++) {
                        arr1[i] = {
                          wareId: '', 
                          qc: '',
                          
                        }


                        
                        for(var key in arr[i]) {



                            if (key == '商家编码') {
                                arr1[i]['wareId'] = arr[i][key]
                            }

                            if (key == '面料其他成分及含量') {
                                arr1[i]['qc'] = arr[i][key]
                            }

                            
                            
                            
                        }

                       
                    
                }

                

                that.import_inventory_detail_qc_post(arr1)


                


                event.target.value = ''

                //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
                //wb.Sheets[Sheet名]获取第一个Sheet的数据
                //document.getElementById("demo").innerHTML = JSON.stringify(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
            };


            
              if (rABS) {
                  reader.readAsArrayBuffer(f);
              } else {
                  reader.readAsBinaryString(f);
              }
          },100)
    },
  	export_more_shop() {
  		let that = this
          this.$data_exporthttp.get(`import/export_more_shop`,{
            
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
  }
}
</script>

<style>

.inpucus-datacenter-t {
      opacity: 0;
      background: red;
      width: 130px;
      height: 60px;
      z-index: 10;
      position: absolute;
      left: 240px;
      top: 0px;

      
  }
.export_more_shop {
  width: 800px;
  height: 120px;
  text-align: center;
  margin: 60px auto;
}
</style>
