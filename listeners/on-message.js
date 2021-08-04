/*
 * @Description:  处理用户消息
 */
const path = require("path");
const { FileBox } = require("file-box");
const superagent = require("../superagent");
const config = require("../config");
const { colorRGBtoHex, colorHex } = require("../utils");

const allKeywords = `allKeywords`;
/**
 * sleep
 * @param {*} ms
 */
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
/**
 * 处理消息
 */
async function onMessage(msg, bot) {
  //防止自己和自己对话  调试阶段=>解除跟自己对话
  if (msg.self()) return;
  const room = msg.room(); // 是否是群消息
  if (room) {
    //处理群消息
    await onWebRoomMessage(msg, bot);
  }
  //  else {
  //   //处理用户消息  用户消息暂时只处理文本消息。后续考虑其他
  //   console.log("bot.Message", bot.Message);
  //   const isText = msg.type() === bot.Message.Type.Text;
  //   if (isText) {
  //     await onPeopleMessage(msg, bot);
  //   }
  // }
}
/**
 * 处理用户消息
 */
async function onPeopleMessage(msg, bot) {
  //获取发消息人
  const contact = msg.talker();
  //对config配置文件中 ignore的用户消息不必处理
  if (config.IGNORE.includes(contact.payload.name)) return;
  let content = msg.text().trim(); // 消息内容 使用trim()去除前后空格

}
/**
 * 处理群消息
 */
async function onWebRoomMessage(msg, bot) {
  // 判断群聊
  const isText = msg.type() === bot.Message.Type.Text;
  // 测试群id '@@b14f9422554701931d02dba2b44aff6c6960fd7b7dc4a4fa195dc27bd6bb5288'
  // 同学群id '@@ba0a0cea7ed88d4ec9f1dc17f3265e2776a5770d7f3fc0a062a2da64a0c532f0'
  let idArr=[
    //测试群
    '@@b14f9422554701931d02dba2b44aff6c6960fd7b7dc4a4fa195dc27bd6bb5288',
    //同学群
    '@@ba0a0cea7ed88d4ec9f1dc17f3265e2776a5770d7f3fc0a062a2da64a0c532f0',
  ]
  let allowBool=false
  for (let i = 0; i < idArr.length; i++) {
    if(msg.payload.roomId==idArr[i]){
      allowBool=true
    }
  }
  if (isText&&allowBool) {
    const content = msg.text().trim(); // 消息内容
    if (content === "毒鸡汤") {
      let poison = await superagent.getSoup();
      await delay(200);
      await msg.say(poison);
    } else if (content === "英语一句话") {
      const res = await superagent.getEnglishOne();
      await delay(200);
      await msg.say(`en：${res.en}<br><br>zh：${res.zh}`);
    }else if(content === "群消息过滤"){
      await delay(200);
      await msg.say(`？？successsssss?`);
    } else {
      console.log('没有通过判断-----')
      await onUtilsMessage(msg, bot);
    }
  }
}

module.exports = onMessage;
