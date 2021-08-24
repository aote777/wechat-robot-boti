/*
 * @Description:  登录
 */
const schedule = require('../schedule')
const config = require('../config')
const untils = require('../utils')
const superagent = require('../superagent')
let roomarr=config.ROOM
let bot = config.bot


async function onLogin(user) {
  console.log(`机器人${user}登录了`)
  roomarr.forEach(async (roomname,index)=>{
    const room = await bot.Room.find({
      topic: roomname,
    })
    config.ROOMIDARR[index]=room.id
    room.say('xdm~机器人成功启动-roomid自动更新！'+room.id)
    room.say('请输入 机器人命令')
  })
  

  //创建定时发送群消息任务
  await onRoom(bot)
}
/**
 * 8点定时给指定群发送消息
 */
async function onRoom(bot) {
  //匹配规则可参考 schedule/index.js
  const time = '0 0 8 * * *'
  schedule.setSchedule(time, async () => {
    const room = await bot.Room.find({
      topic: config.ROOM[0],
    })
    let res = await superagent.getNews()
    await room.say('早上好兄弟们')
    await room.say(res)
  })
}
console.log('onLogin')
module.exports = onLogin
