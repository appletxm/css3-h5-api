/**
 * 生产环境
 */
;(function () {
  window.API_CONFIG = {};
  // 微信appid
  window.API_CONFIG['wechatAppID'] = 'wx7a62eddd6f4dea4d';
  // 支付宝appid
  window.API_CONFIG['alipayAppID'] = '2021001126679233';
  // 应用接口请求地址
  window.API_CONFIG['api'] = 'http://172.30.0.34:8000';
  // IMChat
  window.API_CONFIG['IMChat'] = 'http://172.30.0.71:7002';
  // 门户地址
  window.API_CONFIG['portal'] = 'http://172.30.0.30';
  // 百度富文本接口请求地址
  window.API_CONFIG['ueditor'] = 'http://10.144.119.136:8082';
  // 文件预览和下载地址，支持在浏览器打开的文件则直接显示(如txt,img)，不支持则下载。此配置通常结合window.API_CONFIG['officePreviewAPI']或window.API_CONFIG['mediaPreviewAPI']使用
  window.API_CONFIG['file'] = 'http://hf-obj1.ynedu.net.cn';
  // 资源预览服务，能够预览office文件文件如.docx、.doc、ppt、pptx、.xlsx、.xls文件后缀
  window.API_CONFIG['officePreviewAPI'] = 'http://hf-fileview.ynedu.net.cn/op/view.aspx?src=';
  // 预览服务，能够预览视频、图片等
  window.API_CONFIG['mediaPreviewAPI'] = 'http://10.144.119.136:8081/onlinePreview?url=';
  // 备课系统，用于课表“去备课”跳转
  window.API_CONFIG['beike'] = 'http://10.144.119.130:8080';
  // 资源中心地址
  window.API_CONFIG['resource'] = 'http://test.youkext.com';
  // 资源中心accessKey，部署新环境时需问资源中心拿
  window.API_CONFIG['resourceAccessKey'] = '1143700375765909504';
  // 作业系统
  window.API_CONFIG['homework'] = 'http://172.30.0.141:8010';
})();
