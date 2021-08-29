/*-----------------------------------*\
|制作消息处理器
\*-----------------------------------*/
class MessageHandle{
  constructor(){
    this.interceptors=[]
    this.events={
      error(message,error){
        console.log('\x1B[31m%s\x1B[0m', 
        '报错报错！',message,error)
      }
    }
  }

  //将功能模块加入拦截器
  interceptor(interceptor){
    if(!this.interceptors.includes(interceptor)){
      this.interceptors.push(interceptor)
    }
  }

  async handle(msg){
    for(let fun of this.interceptors){
      // 拦截器放行机制
      if(!await fun(msg).then((res)=>{
        return Promise.resolve(res)
      })) {
        continue
      }
      try {
        let result=fun(msg)
        if (typeof result === 'number' || result) return result
      } catch (e) {
        this.events.error(msg,e)
        return '该功能模块发生未知错误，请检查！'
      }
    }
    return null
  }

  on(event , listener){
    this.events[event]=listener
  }
}

exports.MessageHandle=MessageHandle