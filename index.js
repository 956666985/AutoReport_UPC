'use strict'
exports.main_handler = async (event, context, callback) => {
  const axios = require('axios')
  //下面一行为上报内容，从浏览器开发人员工具或fiddler拦截app.upc.deu.cn获取
  let formData = 'sfzgsxsx=0&sfzhbsxsx=0&ismoved=0&tw=2&sfcxtz=0&sfjcbh=0&sfcxzysx=0&qksm=&sfyyjc=0&jcjgqr=0&remark=&address=%E5%B1%B1%E4%B8%9C%E7%9C%81%E9%9D%92%E5%B2%9B%E5%B8%82%E9%BB%84%E5%B2%9B%E5%8C%BA%E9%95%BF%E6%B1%9F%E8%B7%AF%E8%A1%97%E9%81%93%E4%B8%AD%E5%9B%BD%E7%9F%B3%E6%B2%B9%E5%A4%A7%E5%AD%A6-%E7%A0%94%E7%A9%B6%E7%94%9F%E5%85%AC%E5%AF%933%E5%8F%B7%E6%A5%BC%E4%B8%AD%E5%9B%BD%E7%9F%B3%E6%B2%B9%E5%A4%A7%E5%AD%A6(%E5%8D%8E%E4%B8%9C)&geo_api_info=%7B%22type%22%3A%22complete%22%2C%22info%22%3A%22SUCCESS%22%2C%22status%22%3A1%2C%22dEa%22%3A%22jsonp_717178_%22%2C%22position%22%3A%7B%22Q%22%3A35.94275%2C%22R%22%3A120.17964%2C%22lng%22%3A120.17964%2C%22lat%22%3A35.94275%7D%2C%22message%22%3A%22Get+ipLocation+success.Get+address+success.%22%2C%22location_type%22%3A%22ip%22%2C%22accuracy%22%3Anull%2C%22isConverted%22%3Atrue%2C%22addressComponent%22%3A%7B%22citycode%22%3A%220532%22%2C%22adcode%22%3A%22370211%22%2C%22businessAreas%22%3A%5B%5D%2C%22neighborhoodType%22%3A%22%22%2C%22neighborhood%22%3A%22%22%2C%22building%22%3A%22%22%2C%22buildingType%22%3A%22%22%2C%22street%22%3A%22%E6%BC%93%E6%B1%9F%E8%A5%BF%E8%B7%AF%22%2C%22streetNumber%22%3A%22989%E5%8F%B7%22%2C%22country%22%3A%22%E4%B8%AD%E5%9B%BD%22%2C%22province%22%3A%22%E5%B1%B1%E4%B8%9C%E7%9C%81%22%2C%22city%22%3A%22%E9%9D%92%E5%B2%9B%E5%B8%82%22%2C%22district%22%3A%22%E9%BB%84%E5%B2%9B%E5%8C%BA%22%2C%22township%22%3A%22%E9%95%BF%E6%B1%9F%E8%B7%AF%E8%A1%97%E9%81%93%22%7D%2C%22formattedAddress%22%3A%22%E5%B1%B1%E4%B8%9C%E7%9C%81%E9%9D%92%E5%B2%9B%E5%B8%82%E9%BB%84%E5%B2%9B%E5%8C%BA%E9%95%BF%E6%B1%9F%E8%B7%AF%E8%A1%97%E9%81%93%E4%B8%AD%E5%9B%BD%E7%9F%B3%E6%B2%B9%E5%A4%A7%E5%AD%A6-%E7%A0%94%E7%A9%B6%E7%94%9F%E5%85%AC%E5%AF%933%E5%8F%B7%E6%A5%BC%E4%B8%AD%E5%9B%BD%E7%9F%B3%E6%B2%B9%E5%A4%A7%E5%AD%A6(%E5%8D%8E%E4%B8%9C)%22%2C%22roads%22%3A%5B%5D%2C%22crosses%22%3A%5B%5D%2C%22pois%22%3A%5B%5D%7D&area=%E5%B1%B1%E4%B8%9C%E7%9C%81+%E9%9D%92%E5%B2%9B%E5%B8%82+%E9%BB%84%E5%B2%9B%E5%8C%BA&province=%E5%B1%B1%E4%B8%9C%E7%9C%81&city=%E9%9D%92%E5%B2%9B%E5%B8%82&sfzx=1&sfjcwhry=0&sfjchbry=0&sfcyglq=0&gllx=&glksrq=&jcbhlx=&jcbhrq=&bztcyy=&sftjhb=0&sftjwh=0&szcs=&szgj=&fxyy=&jcjg=&date=20210930&uid=183635&created=1632962733&jcqzrq=&sfjcqz=&szsqsfybl=0&sfsqhzjkk=0&sqhzjkkys=&sfygtjzzfj=0&gtjzzfjsj=&created_uid=0&id=14465835&gwszdd=&sfyqjzgc=&jrsfqzys=&jrsfqzfy=&szgjcs='
  let apiKey = 'SCT********qNFX8E5Eexxxxxxxxx'  //需要修改为自己的通知接口
  let username = "1916xxxxx"    //修改此处
  let password = "xxxxxxxxx"    //修改此处
  // 获取Cookie
  let res = await axios.post('https://app.upc.edu.cn/uc/wap/login/check', `username=${username}&password=${password}`)
  if (res.status === 200) {
    let str = String(res.headers['set-cookie'])
    let re1 = /eai-sess=\w*/g
    let re2 = /UUkey=\w*/g
    let cookie = (re1.exec(str)[0] + ';' + re2.exec(str)[0]).trim()
    let now = new Date()
    let day = '' + now.getFullYear() + (now.getMonth() + 1) + now.getDate()
    let data = formData.replace(/date=\d{8}/g, `date=${day}`)
    let config = {
      method: 'post',
      url: 'https://app.upc.edu.cn/ncov/wap/default/save',
      headers: {
        Accept: 'application/json, text/javascript, */*; q=0.01',
        Referer: 'https://app.upc.edu.cn/ncov/wap/default/index',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36 Edg/83.0.478.45',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Cookie: cookie,
      },
      data: data,
    }

    let ret = await axios(config)
    let text = ret.data['m']
    let dat = await axios.post(
      encodeURI(`https://sc.ftqq.com/${apiKey}.send?text=${text}`)
    )
    return text
  } else {
    let dat = await axios.post(
      encodeURI(`https://sc.ftqq.com/${apiKey}.send?text=登陆出错！`)
    )
    return '登陆出错 '
  }
}
