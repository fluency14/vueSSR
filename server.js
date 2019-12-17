const express = require('express');
const server = express();
server.get('/mytest',(request,response) => {
  response.send("hello world" + request.url)
})
const createApp = require('./app');
const vueRenderer = require('vue-server-renderer');
const renderer = vueRenderer.createRenderer();
server.get('/ssr',(request,response) => {
  const context = {url: request.url}
  const app = createApp(context)
  renderer.renderToString(app,(err,doc) => {
    if(err) throw err
    response.send(doc)
  })
})
const fs = require('fs')
const rendererTmp = vueRenderer.createRenderer({
  template: fs.readFileSync('./index.template.html','utf-8') // 同步读取文件
})
server.get('/template',(request,response) => {
  const context = { url: request.url}
  const app = createApp(context)
  rendererTmp.renderToString(app,(err, doc) =>{
    if(err) throw err
    response.send(doc)
  })
})
server.listen(8088)
