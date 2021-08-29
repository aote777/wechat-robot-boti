/*
 * @Description:  登录
 */
const schedule = require('../schedule')
const config = require('../config')
const superagent = require('../superagent')
let roomarr=config.ROOM
let bot = config.bot


async function onLogin(user) {

  // 考虑到其他人使用本项目，登录覆盖一下配置里的机器人名字 用于@判断
  // config.MYSELF=user.user.name()

  console.log(`机器人${user}登录了`)
  roomarr.forEach(async (roomname,index)=>{
    

    
    const room = await bot.Room.find({
      topic: roomname
    })
    
    console.log('\x1B[31m%s\x1B[0m', 
    'room',room)
    
    if(!room){
      console.log('\x1B[31m%s\x1B[0m', 
      `为获取到room，我也不知道为什么，
      概率事件，可能是免费sdk的原因
      请结束进程重新登录········`)
      return
    }
    
    config.ROOMIDARR[index]=room.id
    console.log('\x1B[31m%s\x1B[0m', 
    'room.id',room.id)
    await room.say('xdm~机器人成功启动-roomid自动更新！'+room.id)
    await room.say('请输入 机器人命令')
  })
  
}

console.log('onLogin热更新完毕')
module.exports = onLogin
