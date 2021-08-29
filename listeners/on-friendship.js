/**
 * 处理好友关系模块
 * 没啥鸟用 本机器人没有进行调用-
 */
const { Friendship } = require('wechaty')
/**
 * 自动同意好友请求
 */
async function onFriendship(friendship) {
  if (friendship.type() === Friendship.Type.Receive) {
    await friendship.accept()
  }
}
module.exports = onFriendship
