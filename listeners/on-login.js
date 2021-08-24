/*
 * @Description:  登录
 */
const schedule = require('../schedule')
const config = require('../config')
const untils = require('../utils')
const superagent = require('../superagent')
let roomarr=config.ROOM

async function onLogin(user, bot) {
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
 * 9点定时给指定群发送消息
 */
async function onRoom(bot) {
  //匹配规则可参考 schedule/index.js
  const time = '0 0 * * * *'
  schedule.setSchedule(time, async () => {
    const room = await bot.Room.find({
      topic: config.WEBROOM,
    })
    await room.say('定时任务-test- >key=机器人指令')
  })
}
module.exports = onLogin
