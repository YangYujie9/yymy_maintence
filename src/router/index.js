import Vue from 'vue'
import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve => require(['@/view/index'],resolve),
      children: [
      	{
          path: '/setting',
          name: 'setting', 
          component: resolve => require(['@/view/setting/index'], resolve),
          children: [
          	{
              path: '/setting/master',
              name: 'master',
              component: resolve => require(['@/view/setting/master'],resolve), 
            },

          ],
        },
        {
          path: '/basic',
          name: 'file', 
          component: resolve => require(['@/view/basicinfo/file_protect/index'], resolve),
          children:[
            {
            path: '/basic/file_protect',
            name: 'file_protect', 
            component: resolve => require(['@/view/basicinfo/file_protect/file_protect'], resolve),
            },
            {
            path: '/basic/staff_management',
            name: 'staff_management', 
            component: resolve => require(['@/view/basicinfo/file_protect/staff_management'], resolve),
            }
  
          ]
        },
        {
          path: '/basic/yixin_file_protect',
          name: 'yixin_file_protect', 
          component: resolve => require(['@/view/basicinfo/file_protect/yixin_file_protect'], resolve),
        },
        {
          path: '/basic/import_data',
          name: 'import_data', 
          component: resolve => require(['@/view/basicinfo/import_data'], resolve),
        },
        {
          path: '/basic/source_month_import',
          name: 'source_month_import', 
          component: resolve => require(['@/view/basicinfo/source_import/month_import'], resolve),
        }, 
        {
          path: '/basic/source_week_import',
          name: 'source_week_import', 
          component: resolve => require(['@/view/basicinfo/source_import/weekly_import'], resolve),
        }, 
        {
          path: '/basic/yixin_import_data',
          name: 'yixin_import_data', 
          component: resolve => require(['@/view/basicinfo/yixin_import_data'], resolve),
        },
        {
          path: '/welcome_index',
          name: 'welcome_index', 
          component: resolve => require(['@/view/welcome_index_new'], resolve),
        },
        {
          path: '/basic/import_log',
          name: 'import_log', 
          component: resolve => require(['@/view/basicinfo/file_protect/import_log'], resolve),
        },
        {
          path: '/basic/customer_import',
          name: 'customer_import', 
          component: resolve => require(['@/view/basicinfo/customer_import'], resolve),
        },
        {
            path: '/basic/taoke_import',
            name: 'taoke_import', 
            component: resolve => require(['@/view/basicinfo/taoke_import'], resolve),
        },
        {
            path: '/basic/model_card',
            name: 'model_card', 
            component: resolve => require(['@/view/report/model_card'], resolve),
        },
        {
            path: '/basic/model_protect',
            name: 'model_protect', 
            component: resolve => require(['@/view/basicinfo/model_protect'], resolve),
        },
        {
          path: '/taoke/taoke_index_report',
          name: 'taoke_index_report',
          component: resolve => require(['@/view/report/taoke_index'], resolve),
        },
        {
          path: '/taoke/taoke_plan',
          name: 'taoke_plan',
          component: resolve => require(['@/view/report/taoke_plan'], resolve),
        },
        {
          path: '/sale_report/sale_index',
          name: 'sale_index',
          meta: { keepAlive: true }, 
          component: resolve => require(['@/view/report/sale_index'], resolve),
        },
        {
          path: '/sale_report/sale_detail',
          name: 'sale_detail',
          meta: { keepAlive: true }, 
          component: resolve => require(['@/view/report/sale_detail'], resolve),
        },
        {
          path: '/sale_report/sale_shop',
          name: 'sale_shop', 
          meta: { keepAlive: true }, 
          component: resolve => require(['@/view/report/sale_shop'], resolve),
        },
        {
          path: '/sale_report/car',
          name: 'car', 
          meta: { keepAlive: true }, 
          component: resolve => require(['@/view/report/car'], resolve),
        },
        {
          path: '/sale_report/category_analysis',
          name: 'category_analysis', 
          meta: { keepAlive: true }, 
          component: resolve => require(['@/view/report/category_analysis'], resolve),
        },
        {
          path: '/sale/sale_show',
          name: 'sale_show', 
          component: resolve => require(['@/view/report/sale_show'], resolve),
        },
        {
          path: '/sale_report/flow_detail',
          name: 'flow_detail', 
          meta: { keepAlive: true }, 
          component: resolve => require(['@/view/report/flow_detail'], resolve),
        },        
        {
          path: '/sale_report/yixin_sale_index',
          name: 'yixin_sale_index',
          meta: { keepAlive: true }, 
          component: resolve => require(['@/view/yixin_report/sale_index'], resolve),
        },
        {
          path: '/sale_report/yixin_sale_detail',
          name: 'yixin_sale_detail',
          meta: { keepAlive: true }, 
          component: resolve => require(['@/view/yixin_report/sale_detail'], resolve),
        },
        {
          path: '/sale_report/yixin_sale_shop',
          name: 'yixin_sale_shop', 
          meta: { keepAlive: true }, 
          component: resolve => require(['@/view/yixin_report/sale_shop'], resolve),
        },
        {
          path: '/sale_report/yixin_car',
          name: 'yixin_car', 
          meta: { keepAlive: true }, 
          component: resolve => require(['@/view/yixin_report/car'], resolve),
        },
        {
          path: '/sale/yixin_sale_show',
          name: 'yixin_sale_show', 
          component: resolve => require(['@/view/yixin_report/sale_show'], resolve),
        },
        {
          path: '/source_report/threecheck',
          name: 'threecheck',
          meta: { keepAlive: true }, 
          component: resolve => require(['@/view/source_report/threecheck'], resolve),
        },
        {
          path: '/source_report/pinkong',
          name: 'pinkong',
          meta: { keepAlive: true }, 
          component: resolve => require(['@/view/source_report/pinkong'], resolve),
        },
        {
          path: '/source_report/cangchuck',
          name: 'cangchuck',
          meta: { keepAlive: true }, 
          component: resolve => require(['@/view/source_report/cangchuck'], resolve),
        },
        {
          path: '/source_report/jieyangck',
          name: 'jieyangck',
          component: resolve => require(['@/view/source_report/jieyangck'], resolve),
        },
        {
          path: '/source_report/dataview',
          name: 'dataview',
          component: resolve => require(['@/view/source_report/dataview'], resolve),
        },
        {
          path: '/source_report/wechatcheck',
          name: 'wechatcheck',
          component: resolve => require(['@/view/source_report/wechatcheck'], resolve),
        },
        {
          path: '/source_report/weekly_report',
          name: 'weekly_report',
          component: resolve => require(['@/view/source_report/weekly_report'], resolve),
        },
        {
          path: '/source_report/monthly_report',
          name: 'monthly_report1',
          component: resolve => require(['@/view/source_report/monthly_report'], resolve),
        },
        {
          path: '/source/index',
          name: 'source_index',
          component: resolve => require(['@/view/source_report/source_index'], resolve),
        },
        {
          path: '/source/supply_index_visual',
          name: 'supply_index',
          component: resolve => require(['@/view/source_report/visual/supply_index'],resolve), 
        }, 
        // {
        //   path: '/source_visual/index',
        //   name: 'source_visual_index', 
        //   component: resolve => require(['@/view/source_report/visual/index'], resolve),
        //   children: [
            {
              path: '/source/source_week_visual',
              name: 'source_week_visual', 
              component: resolve => require(['@/view/source_report/visual/weekly_visual'], resolve),
            },  
            {
              path: '/source/source_month_visual',
              name: 'source_month_visual',
              component: resolve => require(['@/view/source_report/visual/monthly_visual'],resolve), 
            }, 
            {
              path: '/source/source_month_visual2',
              name: 'source_month_visual2',
              component: resolve => require(['@/view/source_report/visual/monthly_visual2'],resolve), 
            }, 
        //   ],
        // },

        {
          path: '/help/index',
          name: 'help', 
          component: resolve => require(['@/view/help/index'], resolve),
        },
        {
          path: '/help/store_data',
          name: 'store_data', 
          component: resolve => require(['@/view/help/store_data'], resolve),
        },
        {
          path: '/help/customer_data',
          name: 'customer_data', 
          component: resolve => require(['@/view/help/customer_data'], resolve),
        },
        {
          path: '/export_more_shop',
          name: 'export_more_shop', 
          component: resolve => require(['@/view/export_more_shop'], resolve),
        },
        {
          path: '/service',
          name: 'schedule', 
          component: resolve => require(['@/view/customer_service/index'], resolve),
          children: [
            {
              path: '/service/schedule',
              name: 'schedule',
              component: resolve => require(['@/view/customer_service/schedule'],resolve), 
            },  
            {
              path: '/service/account',
              name: 'account',
              component: resolve => require(['@/view/customer_service/account'],resolve), 
            }, 
            {
              path: '/service/export',
              name: 'export',
              component: resolve => require(['@/view/customer_service/export_compose'],resolve), 
            },          
          ],
        },
        {
          path: '/customer/sale_report',
          name: 'sale_report', 
          component: resolve => require(['@/view/customer_service/report/sale'], resolve),
        },
        {
          path: '/customer/time_sharing_report',
          name: 'time_sharing', 
          component: resolve => require(['@/view/customer_service/report/time_sharing'], resolve),
        },
        {
          path: '/customer/efficiency_report',
          name: 'efficiency', 
          component: resolve => require(['@/view/customer_service/report/efficiency'], resolve),
        },
        {
          path: '/customer/shop_report',
          name: 'shop_report', 
          component: resolve => require(['@/view/customer_service/report/shop_report'], resolve),
        },
        {
          path: '/customer/customer_report',
          name: 'customer_report', 
          component: resolve => require(['@/view/customer_service/report/customer_report'], resolve),
        },
        {
          path: '/customer/anomaly_report',
          name: 'anomaly_report', 
          component: resolve => require(['@/view/customer_service/report/anomaly_report'], resolve),
        },
        {
          path: '/yw/fileyl',
          name: 'fileyl', 
          component: resolve => require(['@/view/customer_service/file'], resolve),
        },
        {
          path: '/yw/import_order',
          name: 'import_order', 
          component: resolve => require(['@/view/yw_report/import_order'], resolve),
        },
        {
          path: '/yw/size_detail',
          name: 'size_detail', 
          component: resolve => require(['@/view/yw_report/size_detail'], resolve),
        },
        {
          path: '/yw/supply_view',
          name: 'supply_view', 
          component: resolve => require(['@/view/yw_report/supply_view'], resolve),
        },
        {
          path: '/yw/onway_view',
          name: 'onway_view', 
          component: resolve => require(['@/view/yw_report/onway_view'], resolve),
        },
        {
          path: '/yw/on_the_way',
          name: 'on_the_way', 
          component: resolve => require(['@/view/yw_report/on_the_way'], resolve),
        },
        {
          path: '/yw/months_report',
          name: 'months_report', 
          meta: { keepAlive: true }, 
          component: resolve => require(['@/view/yw_report/months_report'], resolve),
        },
        {
          path: '/customer/index',
          name: 'index', 
          component: resolve => require(['@/view/customer_service/visual/index'], resolve),
          children: [
            {
              path: '/dataview/data_board',
              name: 'data_board',
              component: resolve => require(['@/view/customer_service/visual/data_board'],resolve), 
            },  
            {
              path: '/dataview/data_comparison',
              name: 'data_comparison',
              component: resolve => require(['@/view/customer_service/visual/data_comparison'],resolve), 
            }, 
          ],
        },
    
      ],
    }
  ]
})
