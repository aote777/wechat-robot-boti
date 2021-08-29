/*-----------------------------------*\
|设定机器人回答模板
|支持随时随地添加回答内容
|降低代码重复
|方便调用 一个地方注册 全局可调用
|主要是集中设置机器人答案文本，不然都写在代码里，对兄弟们的代码理解造成困扰
\*-----------------------------------*/
const {Base64} = require('js-base64')
class BotResponse {
  constructor() {
    this.botresponses = {
      daoguan:Base64.decode(DAOGUAN)
    }
  }

  //添加回答键值 如果已经有了 将不会做任何改动
  add(name, value) {
    if (!this.botresponses[name]) {
      this.botresponses[name] = value
      console.log('\x1B[31m%s\x1B[0m', 
      '添加成功~',this.botresponses[name])
    }
  }

  /*-----------------------------------*\
  |设定指定键值。如果先前键值包含一个值，将返
  |回这个值。这个方法和 add() 的区别是，如果
  |指定键已经有了值将不会替换，但这个方法会。
  |
  \*-----------------------------------*/
  set(name, value) {
    let old = this.botresponses[name]
    this.botresponses[name] = value
    if (old) {
      return old
    }
  }

  use(name, args) {
    
    if (!this.botresponses[name]) {
      console.warn('没有找到你要用的key>' + name + '，已经返回你的name参数')
      return name
    }
    
    const originalValue = this.botresponses[name]
    const value = Array.isArray(originalValue)
      ? originalValue[Math.floor(Math.random() * originalValue.length)]
      : originalValue
    
    return value
    // if(args){
    //   //match 匹配到的所有串
    //   let str=value.replace(/{.*?}/g, function(match){
    //     let matchedArg=match.match(/{(.*)}/)[1]
    //     if(args[matchedArg]){
    //       return args[matchedArg]
    //     }else{
    //       return value
    //     }
    //   })
    // }
    
  }
}

module.exports={
  BotResponse
}

/*-----------------------------------*\
|观看人类双人格斗视频网址
|由于是放在GitHub上
|考虑到直接写字符串过于猖狂
|所以采用base64处理一下内容
|当大家需要编辑内容的时候可以直接
|👇在线网站进行编码解码👇
|https://www.qqxiuzi.cn/bianma/base64.htm
|-------------------------------------
|或者直接在控制台输出一下复制过来
\*-----------------------------------*/
const DAOGUAN='W+WkqumYs13pu4TnvZHlpKflhahb5aSq6ZizXQpodHRwczovL3RoZXBvcm5kdWRlLmNvbS96aApodHRwczovL3NlZGFkZHkuY29tClvoibJd5Zyo57q/6KeC55yL77yI57+777yJW+iJsl0KcG9ybmh1Yu+8mmh0dHBzOi8vcG9ybmh1Yi5jb20KSmF2bW9zdO+8mmh0dHBzOi8vamF2bW9zdC5jb20KQXZnbGXvvJpodHRwczovL2F2Z2xlLmNvbQpBdjAx77yaaHR0cHM6Ly9hdjAxLnR2ClN1cGphdu+8mmh0dHBzOi8vc3VwamF2LmNvbQpOZXRmbGF277yaaHR0cHM6Ly93d3cubmV0Zmxhdi5jb20KW+eIseW/g13lhY3nv7vnvZHlnYBb54ix5b+DXQotKuW+heihpeWFhSotClvoibJd55Wq5Y+35LiL6L29W+iJsl0KaHR0cHM6Ly9vbmVqYXYuY29tLwpodHRwczovL2phdmRiLmNvbS8KaHR0cHM6Ly9qYXZidXMuY29tLwpb6ImyXemmmeiViWFwcOS4i+i9vVvoibJdCmh0dHBzOi8vd3d3LjFlZS5hcHAKaHR0cHM6Ly93d3cuZ2cyLmFwcC8KW+mXqueUtV3ot4PlopnmlZnnqIvlt6XlhbfkuIvovb1b6Zeq55S1XQrlh6DpuKHvvJpodHRwczovL2owMi5zcGFjZS8K5Yeg6bih5rC45LmF5Zyw5Z2ANXPoh6rliqjot7NodHRwOi8vcXEuZm9vdGJhbGwKR0PvvJpodHRwczovL2djLXNzLnMtY2F0Lndpbi9hdXRoL2xvZ2luCue7tOaKpOe9keWdgOmcgEdpdOadg+mZkA=='