const Vue = require('vue')
const app = new Vue({
  template: `<div>Hello World</div>`
})
const vueRenderer = require('vue-server-renderer');
// const renderer = vueRenderer.createRenderer() // 创建一个 renderer
const fs = require('fs');
const renderer = vueRenderer.createRenderer({
  template: fs.readFileSync('./index.template.html','utf-8') //同步读取文件
})
// 通过renderToString 将 Vue 实例渲染为 HTML
// 函数签名：renderer.renderToString(vm,context?,callback?):Promise<string></string>
renderer.renderToString(app,(err,doc) => {
  if(err) throw err
  console.log(doc);
})