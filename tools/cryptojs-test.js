const CryptoJS = require('crypto-js');

var data = [{id: 1}, {id: 2}]
// 加密
var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123').toString();
console.log('yjw---加密---> ', typeof ciphertext)

// 解密
var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
console.log('yjw---解密---bytes---> ', bytes)
console.log('yjw---解密---data---> ', decryptedData)