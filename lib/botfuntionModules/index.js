/*-----------------------------------*\
|在这里集中注册机器人的功能模块部分
|将功能模块加入消息处理实例的拦截器中
|匹配命令则返回内容，否则放行到下一个拦截器
\*-----------------------------------*/
const {MessageHandle} =require('../MessageHandle')
const msghandle=new MessageHandle()


let {hello}=require('./helloTest')
let {fixedAnswer}=require('./fixedAnswer')


//将功能加入消息处理的拦截器中
msghandle.interceptor(hello)
msghandle.interceptor(fixedAnswer)


module.exports={
  msghandle
}