/*-----------------------------------*\
|这里放一些机器人的固定文本回答
|说出key就自动回答设置的内容
\*-----------------------------------*/
const { botres } = require('../../app.js')

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

/**
 * 处理群消息
 */
async function onWebRoomMessage(msg, bot) {
  // test   不知该i到为什么 官方api失败
  console.log(
    '-------90----',
    (await msg.mentionSelf()) || msg.text().includes('@' + config.MYSELF)
  )
  if (await msg.mentionSelf()) {
    console.log('有人艾特我了')
    console.info('艾特信息全部', msg.text())
    console.info('list', await msg.mentionList())
    console.warn('说了什么', await msg.mentionText())
  }

  return

  // 判断群聊
  const isText = msg.type() === bot.Message.Type.Text

  let idArr = config.ROOMIDARR
  let allowBool = false
  for (let i = 0; i < idArr.length; i++) {
    if (msg.payload.roomId == idArr[i]) {
      allowBool = true
    }
  }
  if (isText && allowBool) {
    const content = msg.text().trim() // 消息内容
    if (content == '毒鸡汤') {
      let poison = await superagent.getSoup()
      await delay(200)
      await msg.say(poison)
    } else if (content == '机器人命令') {
      await delay(200)
      await msg.say(`
      命令提示-全字匹配-
      github
      每日简报
      舔狗（一天100次调用）
      朋友圈文案
      毒鸡汤
      李铁是我儿
      分手文案
      `)
    } else if (content === '群消息过滤') {
      await delay(200)
      await msg.say(`-本消息只会在已绑定的群发送-`)
    } else if (content === '热更新测试') {
      await delay(200)
      await msg.say(`success`)
    } else if (content === '舔狗') {
      let res = await superagent.getTianDog()
      await delay(200)
      await msg.say(res)
    } else if (content === '朋友圈文案') {
      let res = await superagent.getpyq()
      await delay(200)
      await msg.say(res)
    } else if (content === 'github') {
      await delay(200)
      await msg.say(`
      机器人地址
      https://github.com/aote777/wechat-robot-master
      `)
    } else if (content === '分手文案') {
      let res = await superagent.getFenShou()
      await delay(200)
      await msg.say(res)
    } else if (content === '每日简报') {
      let res = await superagent.getNews()
      let str = ''

      let newarr = JSON.parse(res)
      console.log('---', typeof newarr)
      for (let i = 0; i < newarr.length; i++) {
        str +=
          newarr[i].title + '<br>' + `        ` + newarr[i].digest + '<br><br>'
      }
      await delay(200)
      await msg.say(str)
    } else if (content === '我emo了') {
      let res = await superagent.getEmo()
      await delay(200)
      await msg.say(res)
    }
  }
}
