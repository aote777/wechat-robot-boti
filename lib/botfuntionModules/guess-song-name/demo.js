// http://music.163.com/song/media/outer/url?id=1396235703.mp3

const { botres } = require('../../app.js')
botres.add('猜对', ['恭喜你猜对了', '啊啊啊啊，猜对了', 'yes!就是这个'])

async function guesssong(msg) {
  if (msg != '开始猜歌') return false

  return '我收到了你的命令，并且执行了方法' + msg + new Date()
}

module.exports = {
  guesssong,
}

console.log(
  '\x1B[31m%s\x1B[0m',
  '---------------------------------------------------'
)

var pending = function () {
  var count = 0
  return function () { 
    count++
    return function () {
      count--
      if (count === 0) {
        // 全部执行完毕
      }
    }
  }
}
