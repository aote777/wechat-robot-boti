/*-----------------------------------*\
|这里集中写关于天行api的接口，已进行封装处理
|待完善封装函数
\*-----------------------------------*/
const superagent = require('../../config/superagent')
const cheerio = require('cheerio')
const request = require('request')
const ONE = 'http://wufazhuce.com/' // ONE的web版网站
const POISON = 'https://8zt.cc/' //毒鸡汤网站
const TXHOST = 'https://api.tianapi.com/txapi/' // 天行host 官网：tianapi.com
const APIKEY = '47263bc109765510b6d2b003a6c5da0a' // 天行key，请先去网站注册填写key  注册免费  注册后申请下面的接口即可。
/*-----------------------------------*\ 
天行api 官网https://www.tianapi.com/
账号：17604626404
密码：517182343lsc
免费账户只能申请15个接口现在已经满了
田佳伟
1131029238@qq.com
tianjiawei
txapi就到这里了，改用聚合数据
\*-----------------------------------*/

const { botres } = require('../../app.js')

//机器人匹配到的消息命令
let keyarr = [
  '舔狗',
  '李铁',
  '我emo了',
  '分手文案',
  '朋友圈文案',
  '经典台词',
  '每日一句',
  '文化谚语',
  '土味情话',
  '顺口溜',
  "彩虹屁",
]

//暴露的主函数
async function txapi(msg) {
  if (!keyarr.includes(msg)) return false
  let objres={}
  switch (msg) {
    case '舔狗':
    case '李铁':
      return await txapisimple('tiangou/index')
    case '朋友圈文案':
      return await txapisimple('pyqwenan/index')
    case '分手文案':
      return await txapisimple('hsjz/index')
    case '我emo了':
      return await txapisimple('hotreview/index')
    case '经典台词':
      objres= await txapimore('dialogue/index')
      return objres.english?objres.dialogue + `<br>${objres.english}--${objres.source}`: objres.dialogue + `--${objres.source}`
    case '每日一句':
      objres = await txapimore('one/index')
      return objres.word
    case '文化谚语':
      objres = await txapimore('proverb/index')
      return objres.front + '-->' + objres.behind
    case '土味情话':
      return await txapisimple('saylove/index')
    case '顺口溜':
      return await txapisimple('skl/index')
      case '彩虹屁':
        return await txapisimple('caihongpi/index')
    default:
      console.log(
        '\x1B[31m%s\x1B[0m',
        '检查一下是不是没有绑定好key就使用了--txapi'
      )
      return false
  }
}

/*-----------------------------------*\
|将天行api返回的内容分类 混装函数
\*-----------------------------------*/
async function txapisimple(apistr) {
  const url = TXHOST + apistr
  try {
    let res = await superagent.req(url, 'GET', {
      key: APIKEY,
    })
    let content = JSON.parse(res.text)
    if (content.code === 200) {
      return content.newslist[0].content
    } else {
      console.log('\x1B[31m%s\x1B[0m', '获取接口失败')
      return botres.use('api.error')
    }
  } catch (err) {
    console.log('获取接口失败', err)
    return botres.use('api.error')
  }
}

async function txapimore(apistr) {
  const url = TXHOST + apistr
  try {
    let res = await superagent.req(url, 'GET', {
      key: APIKEY,
    })
    let content = JSON.parse(res.text)
    if (content.code == 200) {
      return content.newslist[0]
    } else {
      console.log('\x1B[31m%s\x1B[0m', '获取接口失败')
      return botres.use('api.error')
    }
  } catch (error) {}
}

module.exports = {
  txapi,
}
