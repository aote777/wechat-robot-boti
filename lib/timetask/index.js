const schedule = require('../../schedule')
const config = require('../../config')
let roomarr=config.ROOM
let bot = config.bot


/**
 * 8点定时给指定群发送消息
 */
 async function onRoom(bot) {
  //匹配规则可参考 schedule/index.js
  // const time = '0 0 8 * * *'
  console.log('\x1B[31m%s\x1B[0m', 
  '是否开启定时任务')
  const time = '30 * * * * *'
  schedule.setSchedule(time, async () => {
    const room = await bot.Room.find({
      topic: config.ROOM[1],
    })
    await room.say('定时任务测试-')
  })
}

