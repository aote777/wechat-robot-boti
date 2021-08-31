/*-----------------------------------*\
|这里放一些机器人的固定文本回答
|说出key就自动回答设置的内容
\*-----------------------------------*/
const { botres } = require('../../app.js')

const fs = require('fs')

//创建一个可以动态读写的json对象
// const usersetcommand={

// }

//机器人命令
botres.add(
  'robot.command',
`命令提示-全字匹配-
github
协作文档
舔狗（一天100次调用）
朋友圈文案
分手文案
我emo了
经典台词
每日一句
文化谚语
土味情话
顺口溜
彩虹屁
`
)
botres.add(
  'github',
  `机器人地址 https://github.com/aote777/wechat-robot-master 加权限给我github的id名`
)
botres.add(
  'word',
  '最新项目大盘进度：https://shimo.im/sheets/Cpy8XGG8gWV3jhYj/MODOC/ 《老狗逼8月9月项目大盘》'
)
botres.add('宇哥', ['神！', '宇哥 不要！', '别学了','什么玩意','宇哥 测试概率了'])
botres.add('delay', '我延时发送了这条消息')

//这里十分重要 所有的命令都要在这里注册，数组中的字符串代表机器人能匹配的咱们说的话
let keyarr = ['机器人命令', 'github', '延时测试', '宇哥', '协作文档', '导管']

//收到的消息入口
async function fixedAnswer(msg) {
  //没有匹配的命令则放行到下一个拦截器
  console.log('\x1B[31m%s\x1B[0m', '进入fixed', !keyarr.includes(msg))

  if (!keyarr.includes(msg)) return false
  console.log('\x1B[31m%s\x1B[0m', '进入fixedanswer？')
  switch (msg) {
    case '机器人命令':
      return botres.use('robot.command')
    case '延时测试':
      return botres.use('delay')
    case 'github':
      return botres.use('github')
    case '宇哥':
      return botres.use('宇哥')
    case '导管':
      return botres.use('daoguan')
    case '协作文档':
      return botres.use('word')
    default:
      console.log('\x1B[31m%s\x1B[0m', '检查一下是不是没有绑定好key就使用了')
      return false
  }
}

module.exports = {
  fixedAnswer,
}
