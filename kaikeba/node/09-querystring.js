const querystring = require('querystring');
const baidu = 'https://www.baidu.com/s?ie=UTF-8&wd=%E4%B8%96%E7%95%8C%E4%BD%A0%E5%A5%BD';
const baiduQuery = 'ie=UTF-8&wd=%E4%B8%96%E7%95%8C%E4%BD%A0%E5%A5%BD';
console.log('queryString--> ', querystring.parse(baiduQuery));

const url = require('url');
console.log('url--> ', url.parse(baidu, true));