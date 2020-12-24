# 命名规范
  ## 文件、文件夹
	尽量使用一个单词，小写开头；多个单词的用驼峰    如: 'system/manage/user'  'adc/classification'
  ## 事件
	on+动词(+名词)		如: 'onChangeTable' 'onEdit' 'onRemoveRole'
  ## 接口
	insert/delete/update/fetch/upload/download+名词(或名词复数)
	由于后端接口与入参 命名层次不齐，频繁改动。
  我们使用前端的数据命名，最后在service拼接。参考 @/pages/system/user/service
  ## 常量
	大写  下划线拼接	如: PERMISSION_TYPES
  ## 钩子/封装
	add/del/mod/get/upload/download+名词(或名词复数)
 
# 路由与项目结构
  使用约定式路由(如果没有特殊需求)
  对应到面包屑的【主页】-【产品】-【模块】-【页面】
  Domain/Product/Module(模块仅一个页面)
  Domain/Product/Module/Page
 
# 页面目录文件
  component 	子组件目录
  constant 		常量		
  model 		  dva			namespace: product_module_page	
  index 		  主文件
  service 		接口
  style 		  样式
  useXXX 		  可复用的Hooks
 
# import 上下顺序
  node_modules整体引用 		              如: 'react'    'lodash'    'react-redux'
  node_modules按需加载		              如: '@umijs/hooks'    '@ant-design/icons'
  跨目录					                      如: '@/utils/constant'    '@/pages/system/style'
  同目录					                      如: './model'    './component/roleModal'
  上层目录，仅组件目录使用 禁止使用../../		如: '../service'    '../style'

# 字典
  出于产品的考虑，对于使用频率较高的单词  使用全局配置，方便后期改动或者国际化。
  使用：import DICT from '@/utils/dictionary';  {DICT.table.create}