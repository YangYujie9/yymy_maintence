<template>
	<div class="data_setting">

	    <div class="data_setting_warp">
	    	<el-button @click="downloadfile">预览</el-button>
	    	<div id="table_warp" class="file_warp" v-html="rawHtml"></div>
	    	
	    </div>
		
	
		
	</div>
	
</template>

<script>
import { mapGetters } from 'vuex'
import XLSX from 'xlsx'
import axios from 'axios'

  export default {
    name: "system-setting",
    data(){
      return{
      	rawHtml:'',



      }
    },
    created() {

    },
    computed:{
      ...mapGetters([
          'getpageDict',
      ]),




    },
    mounted(){ 
 
      
    },
    methods:{

		downloadfile(){
			let that = this


			//

			
			axios.get('http://hzyymy.cn/6aafec00-166a-11ea-9c13-8f61f6f06b99.xlsm',{
                responseType: 'arraybuffer'
            })


			.then((response)=>{
				if(response.status == 200){


					var data = new Uint8Array(response.data)
					var workbook = XLSX.read(data, {type: 'array'});

					


				    var sheetNames = workbook.SheetNames; // 工作表名称集合
				    var worksheet = workbook.Sheets[sheetNames[0]]; // 这里我们只读取第一张sheet
				   				

					var sheet = XLSX.utils.sheet_to_html(worksheet)

					sheet = sheet.replace('<head><meta charset="utf-8"/><title>SheetJS Table Export</title></head>',"")

					sheet = sheet.replace('<html><body>',"")

					sheet = sheet.replace('</body></html>',"")

					console.info(sheet)

					this.rawHtml = sheet

					//document.getElementById('table_warp').innerHTML = sheet
				}
			})
	



			
			
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






    },
  }
</script>

<style lang="less">
	.file_warp{
		margin-left: 2%;
		width: 96%;
		height: calc(100vh - 156px);
		text-align: center;

		table{
			width: 100%;
			border-collapse: collapse;
			border:1px solid #ccc;

			tr:nth-child(1) {
				background-color: rgb(63, 63, 63);
				color: #fff;
				border-right:1px solid rgb(206, 206, 206);
			}

			tr{

				td{
					border-right:1px solid #EBEEF5;
					border-bottom:1px solid #EBEEF5;
				}
			}
		}
	}
</style>




<style scoped lang="less">
.data_setting {






}
  
</style>
