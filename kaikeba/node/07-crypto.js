// 加密,其实只是签名,有md5和sha1两种形式
const crypto = require('crypto');
const md5 = crypto.createHash('md5').update('123456').digest('hex');
const sha = crypto.createHash('sha256').update('wayiji').digest('hex');
console.log('md5--> ', md5);
console.log('sha--> ', sha);
// 为了提高安详性,可通过双层加密
function md5Func(passStr){
  return crypto.createHash('md5').update(passStr).digest('hex');
}
console.log('两层-->', md5Func(md5Func('123456')+'wangyijiang'))

/**
 * 进程和线程
 * 1.进程:可以理解为一个程序;拥有独立的执行空间/存储;
 * 2.线程:一个进程中至少要有一个进程;同一进程中的所有线程共享一套空间/代码.
 * 3.多进程:慢/简单/安全:成本高(慢);安全(进程间隔离);进程间通信麻烦;写代码简单;
 * 4.多线程:快/复杂/脆弱:成本低(快);不安全(线程要死一起死,这是普通情况.比如Java的线程都是运行在虚拟机上,有一个线程死了,虚拟机可以选择性的进行关闭);线程间通信容易;写代码复杂(资源共享,同步读写等).
 */

