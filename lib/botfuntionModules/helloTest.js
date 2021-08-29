const { botres } = require('../../app.js')

async function hello(msg){
  //匹配到命令 返回回答 否则为false
  console.log('\x1B[31m%s\x1B[0m', 
  '进入了hello方法')
  if(msg!='hello') return false
  return '我收到了你的命令，并且执行了方法'+msg
}

module.exports={
  hello
}