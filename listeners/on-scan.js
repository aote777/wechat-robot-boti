/**
 * 获取二维码，登录
 * 采用引入写好的二维码工具 这个也作废 没什么鸟用
 */
async function onScan (qrcode, status) {
  require('qrcode-terminal').generate(qrcode, {small: true})

  const qrcodeImageUrl = [
    'https://api.qrserver.com/v1/create-qr-code/?data=',
    encodeURIComponent(qrcode),
  ].join('')

  console.log(status, qrcodeImageUrl)
}

module.exports = onScan