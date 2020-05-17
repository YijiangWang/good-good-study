 
// Greasy Fork
// 登录 脚本列表 论坛 站点帮助 更多
// 信息
// 代码
// 历史版本
// 反馈 (27)
// 统计数据
// Uer/U校园/UTALK/网课答案显示/自动填入
// [√自动填入答案【可关闭】【默认延迟0.5秒】][√窗口显示答案][√作业与测试][√视听说单元测试][√UTALK]【禁止对源码进行修改，发布，禁止抄袭任意代码】（未适配的请联系）

// 重新安装 2.0.3 版本?
// 询问，评论，或者举报这个脚本.
//  Sustain Podcast #34 🎧 The People Behind Babel (JavaScript compiler) Listen now!ethical ad by CodeFund 

// ==UserScript==
// @name         Uer/U校园/UTALK/网课答案显示/自动填入
// @namespace    MrDgbot
// @version      2.0.3
// @description  [√自动填入答案【可关闭】【默认延迟0.5秒】][√窗口显示答案][√作业与测试][√视听说单元测试][√UTALK]【禁止对源码进行修改，发布，禁止抄袭任意代码】（未适配的请联系）
// @author       MrDgbot
// @compatible   Chrome
// @match        *://ucontent.unipus.cn/_pc_default/pc.html?*
// @match        *://ucontent.unipus.cn/_utalk_default/pc.html?*
// @match        *://uexercise.unipus.cn/uexercise*
// @match         *://u.unipus.cn/user/student/homework*
// @match        *://sso.unipus.cn/sso/login*
// @match        *://u.unipus.cn/*
// @match        *://ucamapi.unipus.cn/*
// @connect      106.13.207.124     ------    北京市 百度电信节点
// @connect      ucamapi.unipus.cn
// @grant        GM_xmlhttpRequest
// @grant        GM.deleteValue
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_info
// @grant        unsafeWindow
// @run-at       document-start
// @require      https://unpkg.com/sweetalert/dist/sweetalert.min.js
// @supportURL   https://greasyfork.org/zh-CN/scripts/397517/feedback
// ==/UserScript==
var url = window.location.href;
//自动登入
var auto_login = 0;
//if (url.indexOf("ucontent.unipus.cn") < 0) return;
var _self = unsafeWindow,
    xtoken = localStorage.getItem("jwtToke"),
    turl = "http://106.13.207.124/api/",
    pageFirst = _self.pageFirst,
    page = _self.page,
    open_id = '',
    $ = null,
    none = '测试key不能为空，请详细阅读<br><a href="https://greasyfork.org/zh-CN/scripts/397517" target="_blank">【脚本描述】</a>！',

    //如果需要关闭自动答题把isinput的0改成1
    setting = {
        'utoken': '',
        'isinput': 1,
        'istest': 1,
        'isagree': 1,
        'timeout': '2000',
        'score': '',
        'show': '1',
        'showb': '2',
        'testurl': '',
        'fromurl': '',
        'testdata': '',
        cache: {
            count: 0,
            type: 0,
            mouse_x: -1,
            mouse_y: -1
        }
    },

    view = {};


function initView() {
    view.top = $(
        '<div id="box" style="border-radius: 1em;position: fixed;border: 1px double rgb(0,0,0); width: 300px;  top: 30px; left: 1%; z-index: 999999; font-size: 15px; background-color: rgb(255,255,255); color: #000000;">' +
        //'<div style="height: 1px;"><button name="show" style="float:right;border-radius:0 0em 0 0;overflow:hidden;border: 1px dashed rgb(0,0,0);background-color: rgb(0,0,0);width:4px;height: 6px;margin-top: 5px;margin-right: 10px;">隐藏</button></div>'+
        '<div><button name="show" style="float:right;border-radius:0 1em 0 0;overflow:hidden;border: 0px double rgb(0,0,0);background-color: rgb(255,255,255);">隐藏</button></div>' +
        '<div style="height: 25px; margin-top: 10px; text-align: center; font-size: x-large;">Uer Help</div>' +
        '<div style="" id="div_main">' +
        '<div style="margin: 0 5px; font-size: 15px;" id="info"></div>' +
        '<hr>' +
        '<div id="answerContent" style="margin: 10px; color: orange; font-size: medium; overflow-y: auto; max-height: 400px"></div>' +
        '<hr>' +
        '<div style="margin-left: 10px;margin-top: 5px;margin-bottom: 5px;text-align: left; color: rgb(114,188,114);">积分:&nbsp<input  onfocus="this.blur()" style="border:none;width: 55px;color: rgb(114,188,114);" id="score" name="score">' +
        '<button id="showscore" name="showscore" style="float:right;margin-right: 10px;border-radius:0em;overflow:hidden;border: 1px double rgb(0,0,0);background-color: rgb(255,255,255);">刷新</button></div>' +
        '<hr>' +
        '<div><button name="showb" style="float:right;border-radius:1em;overflow:hidden;border: 0px double rgb(0,0,0);background-color: rgb(255,255,255);">隐藏</button></div>' +
        '<form style="margin: 0 5px;">' +
        '<div style="" id="div_foot">' +
        '<div style="color: red;margin-left: 70px;">参数修改后自动保存</div>' +
        '<div>' +
        '<label style="margin-left: 60px;float:center;"fo7="utoken">key(自动生成刷新即可)：&nbsp&nbsp&nbsp</label>' +
        '<input disabled="true" style="width: 70%;margin-left: 40px;margin-top: 5px;" id="utoken" name="utoken" placeholder="自动生成刷新即可">' +
        '</div>' +
        '<div>' +
        '<label style="margin-left: 50px;float:left;margin-top: 5px;" for="timeout">答题延迟:&nbsp&nbsp&nbsp</label>' +
        '<input  id="timeout" name="timeout" type="number" min="500" style="margin-top: 5px;width: 55px; text-align: center;">' +
        '<label for="timeout" style="margin-right: 15px;"> 毫秒</label>' +
        '<div style="margin-top: 5px;overflow-y: auto;">' +
        //<button name="dtbutton" style="margin-right: 10px;float:right;border-radius:0em;border: 1px double rgb(0,0,0);background-color: rgb(255,255,255);">关闭普通自动答题</button>' +
        '<button name="cz" style="margin-left: 20px;float:left;border-radius:0em;overflow:hidden;border: 1px double rgb(0,0,0);background-color: rgb(255,255,255);">充值</button>' +
        '<button name="dtbutton" style="margin-left: 10px;float:left;border-radius:0em;overflow:hidden;border: 1px double rgb(0,0,0);background-color: rgb(255,255,255);">关闭普通自动答题</button>' +
        '<button id="cleanlog" name="cleanlog" style="margin-left: 10px;float:left;border-radius:0em;overflow:hidden;border: 1px double rgb(0,0,0);background-color: rgb(255,255,255);">清空日志</button>'+
        '<button id="copykey" name="copykey" style="margin-top: 5px;margin-left: 20px;float:left;border-radius:0em;overflow:hidden;border: 1px double rgb(0,0,0);background-color: rgb(255,255,255);">复制KEY</button>' +
        '<button id="changekey" name="changekey" style="margin-top: 5px;margin-left: 20px;float:left;border-radius:0em;overflow:hidden;border: 1px double rgb(0,0,0);background-color: rgb(255,255,255);">修改KEY</button>' +
        '<button name="jsindex" style="margin-top: 5px;margin-left: 20px;float:left;border-radius:0em;overflow:hidden;border: 1px double rgb(0,0,0);background-color: rgb(255,255,255);">脚本主页</button>' +
        '</div>' +
        '</form><br>' +
        //<a style="text-align: center;" href=\"https://greasyfork.org/zh-CN/scripts/397517\" target="_blank\">[脚本主页]</a>
        '<hr>' +
        '<div id="answer_log" style="margin-left: 5px; max-height: 300px; overflow-y: auto;"></div>' +
        '</div>' +
        '</div>'
    );
    view.answerView = view.top.find('#answerContent');
    view.info = view.top.find('#info');
    view.div_main = view.top.find('#div_main');
    view.showb = view.top.find('#div_foot');
    view.top.appendTo('body').delegate('input', 'input change', function (event) {
        if (this.value.match(/^\*+$/)) return;
        let name = $(this).attr('name');
        GM_setValue(name, this.value);
        setting[name] = this.value;
        console.log("修改完毕", GM_getValue(name, this.value), event.type)
        getscore();
        if (event.type == 'change') msg('配置保存成功，即时生效');
    }).delegate('[name=utoken]', 'focus blur', function (event) {
        $('#utoken').val('');
        this.value = setting.utoken.replace(/(\S)/g, event.type == 'focusin' ? '$1' : '*');
    }).delegate('button', 'click', function (e) {
        e.stopImmediatePropagation();
        e.stopPropagation();
        e.preventDefault();
        let name = $(this).attr('name');
        if (name == 'cleanlog'){
            $('#answer_log').html('');
            layer.tips('清除完毕', '#cleanlog');
        }
        if (name == 'show') {
            setting.show = GM_getValue('show');
            $(this).html(setting.show ? '显示' : '隐藏');
            setting.show ? GM_setValue('show', 0) : GM_setValue('show', 1);
            view.answerView.slideToggle();
            view.showb.slideToggle();
        }
        if (name == 'showb') {
            setting.show = GM_getValue('showb');
            $(this).html(setting.show ? '显示' : '隐藏');
            setting.show ? GM_setValue('showb', 0) : GM_setValue('showb', 1);
            view.showb.slideToggle();
        }
        if (name == 'jsindex') {
            window.open("https://greasyfork.org/zh-CN/scripts/397517", "_blank");

        }
        if (name == 'changekey') {
            $('#utoken').attr("disabled",false);
            layer.tips('已解除锁定', '#utoken');

        }
        if (name == 'copykey') {
            copyToClipboard(GM_getValue('utoken'))
            layer.tips('复制成功', '#copykey');

        }
        if (name == 'dtbutton') {
            setting.isinput = GM_getValue('isinput');
            $(this).html(setting.isinput ? '开启普通自动答题' : '关闭普通自动答题');
            console.log(GM_getValue('isinput'))
            setting.isinput ? GM_setValue('isinput', 0) : GM_setValue('isinput', 1);
        }
        if (name == 'cz') {
            let key = GM_getValue('utoken');
            if(key){
                layer.open({
                    title: '温馨提示'
                    ,content: '充值的KEY是否为：<br>'+GM_getValue('utoken')
                    ,time: 2000
                    ,end: function(){
                        window.open("http://106.13.207.124:1010/?token=" + setting.utoken, "_blank");
                    }
                });
            }else{
                layer.open({
                    title: '温馨提示'
                    ,content: 'Key错误，请勿擅自更改，如无KEY请清空后刷新加载'
                    ,btnAlign: 'c'
                    ,yes: function(){
                        $('#utoken').html('');
                        GM_setValue('utoken','');
                        window.location.reload();
                    }
                });
            }

            //window.open("http://uspay.hurric.cn/?token=" + setting.utoken, "_blank");
        }
        if (name == 'showscore') {
            getscore();
            layer.tips('积分信息更新成功', '#showscore');
            //msg("积分信息更新成功");
        }

    }).find('input').each(function () {
        let type = $(this).attr('type'),
            name = $(this).attr('name');
        if (type == 'radio') {
            this.checked = setting[name] == this.value;
        } else if (name == 'score') {
            this.value = setting[name]
        } else if (name == 'utoken') {
            this.value = setting[name].replace(/\S/g, '*');
        } else {
            this.value = setting[name];
        }
    });
    //getxtoekn();
    if (setting.utoken) {
        msg('脚本正在运行');

    } else {
        console.log(setting.utoken);
        getxtoken();
        msg('欢迎使用脚本<br \>答案将在页面加载两秒后出现<br \><a href=\"https://greasyfork.org/zh-CN/scripts/397517\" target="_blank\">【脚本描述】</a><br \><a href=\"https://jq.qq.com/?_wv=1027&k=54Sj7yE\" target=\"_blank\">【交流群】</a>', 'red');
    }

    addViewMouseListener()
}

function addViewMouseListener() {
    view.top.bind('mousedown', function (event) {
        //获取鼠标按下的时候左侧偏移量和上侧偏移量
        setting.cache.view_x = $(this).position().left;
        setting.cache.view_y = $(this).position().top;
        setting.cache.mouse_x = event.originalEvent.clientX;
        setting.cache.mouse_y = event.originalEvent.clientY;
        console.log(setting.cache.mouse_x, setting.cache.mouse_y, setting.cache.view_x, setting.cache.view_y)
    });
    $(document).bind('mousemove', function (event) {
        //计算出现在的位置是多少
        if (setting.cache.mouse_x == -1) return;
        if (setting.cache.mouse_y - setting.cache.view_y > view.top.height() - view.div_main.height()) return;
        let new_position_left = event.originalEvent.clientX - setting.cache.mouse_x + setting.cache.view_x,
            new_position_top = event.originalEvent.clientY - setting.cache.mouse_y + setting.cache.view_y;
        //加上边界限制
        if (new_position_top < 0) {//当上边的偏移量小于0的时候，就是上边的临界点，就让新的位置为0
            new_position_top = 0;
        }
        //如果向下的偏移量大于文档对象的高度减去自身的高度，就让它等于这个高度
        if (new_position_top > $(document).height() - view.top.height() && $(document).height() - view.top.height() > 0) {
            new_position_top = $(document).height() - view.top.height();
        }
        //右限制
        if (new_position_left > $(document).width() - view.top.width()) {
            new_position_left = $(document).width() - view.top.width();
        }
        if (new_position_left < 0) {//左边的偏移量小于0的时候设置 左边的位置为0
            new_position_left = 0;
        }
        view.top.css({
            left: new_position_left + 'px',
            top: new_position_top + 'px'
        })
    })
    $(document).bind('mouseup', function (event) {
        setting.cache.mouse_x = -1;
        setting.cache.mouse_y = -1;
    })
}

function msg(msg, color) {
    let nda = new Date();
    let t = nda.getHours() + ':' + nda.getMinutes() + ':' + nda.getSeconds();
    msg = t + '  ' + msg;
    $('#answer_log').append('<p style="color: ' + (color || 'black') + '">' + msg + '</p>');
}


//设置答案类型，0：未知，1：选择，2：非选择
function setAnswerType(type) {
    setting.cache.type = type;
}

function appendAnswerView(answerText) {
    if(/[\d]+?\./.test(answerText)){
        answerText = answerText.replace((/[\d]+?\./), '').trim()
        answerText = answerText.replace(/[\d]+?\)/, '').trim()
    }

    if (setting.cache.type == 1) {
        if (setting.cache.count++ % 5 == 0) {
            let start = Math.floor(setting.cache.count / 5) * 5 + 1;
            $('<br><span row="' + Math.floor(setting.cache.count / 5) + '">' + start
              + '. </span><span class="answerText">' + answerText + '</span>').appendTo(view.answerView);
        } else {
            let start = Math.floor(setting.cache.count / 5) * 5 + 1,
                end = start + setting.cache.count % 5;
            view.answerView.find('span[row="' + Math.floor(setting.cache.count / 5) + '"]').text(start + '-' + end + '. ');
            $('<span class="answerText">' + answerText + '</span>').appendTo(view.answerView);
        }
    } else {
        $('<span>' + (++setting.cache.count) + '. </span><span class="answerText">' + answerText + '</span><br>').appendTo(view.answerView);
    }
}

function clearAnswerView() {
    view.answerView.empty();
    setting.cache.count = 0;
    setting.cache.type = 0;
}

function getscore() {
    GM_xmlhttpRequest({
        method: 'POST',
        url: turl + 'getUserScore.php',
        data: 'token=' + GM_getValue('utoken'),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        onerror: (error) => {
            //isQuestion = false;
            swal("获取答案失败！/n网络或服务器错误","warning");
            //alert("获取答案失败！/n网络或服务器错误");
        },
        ontimeout: (error) => {
            //isQuestion = false;
            swal("获取答案失败！/n网络超时","warning");
            //alert("获取答案失败！/n网络超时");
        },
        onload: function (xhr) {
            GM_setValue('score', '')
            setting.score = '';
            document.querySelector('#score').value = '';
            let rejson = JSON.parse(xhr.responseText);
            console.log(rejson)
            console.log("yz",rejson.code)
            if(rejson.status != 0){
                if(!GM_getValue('xtoken')){
                    //console.log('测试是否既然怒')
                    getxtoken();}
            }else{
                GM_setValue('score', rejson.score)
                document.querySelector('#score').value = rejson.score;
                return;
            }
        }
    });
}

function conten_send_data(type, utoken, url, keyword, da, db, xtoken, testid) {
    if (type == 'common') {
        let contentJson = {};
        contentJson.t = 'common';
        contentJson.keyword = keyword;
        contentJson.url = url;
        contentJson.datas = da;
        contentJson.utoken = utoken;
        return encodeURIComponent(JSON.stringify(contentJson));
    }
    if (type == 'test') {
        let contentJson = {};
        contentJson.t = 'test';
        contentJson.testid = testid;
        contentJson.ua = da;
        contentJson.ub = db;
        contentJson.keyword = keyword;
        contentJson.url = url;
        contentJson.utoken = utoken;
        contentJson.xtoken = xtoken;
        return encodeURIComponent(JSON.stringify(contentJson));
    }
    return;
}

function setAnswerLink() {
    $.each($("#tbody tr"), function (i, obj) {
        //console.log("当前",obj.children[5].innerText);
        if (obj.children[5].innerText.indexOf('未完成') != -1 || obj.children[5].innerText.indexOf('待批阅') != -1) {
            let array = obj.children[6].children[0].onclick.toString().match(/'(.*?)'/g);
            //console.log(array);
            if (array.length == 3) {
                let eid = array[0]
                eid = eid.replace(/'/g, '')
                let cid = array[1]
                cid = cid.replace(/'/g, '')
                let etype = array[2].match(/exerciseType\=([\s\S]*?)\&/g);
                let keyword = obj.children[1].innerText;
                let redata = {};
                //swal("载入成功","{keyword}√载入完毕","error");
                msg('<br \>' + keyword + ' √载入完毕')
                //conten_send_data(type, utoken, url, keyword, da, db, xtoken, testid)
                let send_data = conten_send_data('test', setting.utoken, url, keyword, 'cid=' + cid + '#', 'exerciseId=' + eid + '&', GM_getValue('xtoken'), etype[0]);
                console.log(send_data);
                GM_setValue(eid, send_data)
            }
        }
    })
}
/**
 * 自动登入与去环境检测来源于Brush-JIM
 * 已获得作者授权如果疑问反馈解决
 * 作者主页：https://greasyfork.org/zh-CN/users/291772-brush-jim
 **/
function autoLogin() {
    // 自动登录功能
    if (_self.location.href.indexOf('sso.unipus.cn/sso/login') != -1 && auto_login == 1) {
        // 获取数据并赋值到 login_data ，如果没有则赋值 undefined
        gm_get('login_data', undefined).then((login_data) => {
            if (login_data === undefined) {
                // 修改按钮
                $("button[class='btn btn-login btn-fill']")[0].innerText = '自动登录\n（鼠标点击，不要回车）';
                $("button[class='btn btn-login btn-fill']").on('click', function () {
                    $('input[name="rememberMe"]')[0].checked = false;
                    // 保存数据
                    gm_set('login_data', JSON.stringify({
                        'username': $("input[name='username']")[0].value,
                        'password': $("input[name='password']")[0].value
                    }));
                })
            } else {
                let login_json = JSON.parse(login_data);
                $("input[name='rememberMe']")[0].checked = false;
                $("input[name='username']")[0].value = login_json.username;
                $("input[name='password']")[0].value = login_json.password;
                $("button[class='btn btn-login btn-fill']")[0].click();
            }
        })
    }
    // 重置登录信息功能 以及 去掉多余元素和弹窗
    else if (_self.location.href.indexOf('u.unipus.cn/user/student') != -1) {
        let Browser = myBrowser();
        // 设置 sessionStorage，去掉环境检测
        _self.sessionStorage.setItem("__env_tested__", Date());
        // 设置 localStorage ，永久去掉环境检测
        _self.localStorage.setItem("__env_tested__" + Browser, Browser);
        // 修改 window.localStorage.getItem ，去掉版本说明及环境检测
        _self.getItem_ = _self.localStorage.getItem;
        _self.localStorage.getItem = function (a) {
            if (a.search(/version_tested|env_tested/i) != -1) {
                return true
            } else {
                return _self.getItem_(a);
            }
        }

        // CSS去掉环境检测和版本说明的气泡
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = '#env_newnotice,#version_newnotice {display: none!important;}'
        document.getElementsByTagName('head').item(0).appendChild(style);
        console.log(document.getElementsByTagName('head').item(0))

        // 修改“退出”选项为“重新登录”，增加重置自动登录的选项
        function Change_Menu() {
            if ($("[class='menu-li']").length != 0) {
                for (let a = 0; $('[class="menu-li"]').length > a; a++) {
                    if ($('[class="menu-li"]')[a].innerHTML == '退出') {
                        $('[class="menu-li"]')[a].innerHTML = '重新登录';
                    }
                }
                $("[class='hiden-menu']").append("<div class=\"menu-li\" id=\"Reset_login\">重置登录信息</a>");
                $("div[id='Reset_login']").live('click', function () {
                    // 删除数据
                    gm_del('login_data');
                    if (confirm('登录信息重置成功！\n是否退出登录？') === true) {
                        _self.location.href = "https://sso.unipus.cn/sso/logout"
                    }
                });
            } else {
                setTimeout(Change_Menu, 20)
            }
        }

        if (auto_login == 1) {
            Change_Menu();
        }
        //定时器，重置无操作计时
        setInterval(function(){if(_self.timeline!=undefined && _self.timeline.revived!=undefined){
            _self.timeline.revived();
        }}, 6000);
    }
    else if (_self.location.href.search(/ucontent.unipus.cn\/_pc_default\/pc.html/g) != -1) {
        setInterval(function(){
            $.ajax({
                url:'https://ucontent.unipus.cn/auth/api/user',
                type:'get',
                success:function(a, b){;},
                error:function(a, b){;}
            })
            if(_self.timeline!=undefined && _self.timeline.revived!=undefined){
                _self.timeline.revived();
            }}, 300000);
    } else if(_self.location.href.search(/utalk.unipus.cn\/page\/homePage.html/g) != -1){
        setInterval(function(){
            if(_self.timeline!=undefined && _self.timeline.revived!=undefined){
                _self.timeline.revived();
            }}, 6000);
    }
}

function gm_get(name, defaultValue) {
    if (typeof GM_getValue === 'function') {
        return new Promise((resolve, reject) => {
            resolve(GM_getValue(name, defaultValue));
        })
    } else {
        return GM.getValue(name, defaultValue);
    }
}

function gm_set(name, defaultValue) {
    if (typeof GM_setValue === 'function') {
        GM_setValue(name, defaultValue);
    } else {
        GM.setValue(name, defaultValue);
    }
}

function gm_del(name) {
    if (typeof GM_deleteValue === 'function') {
        GM_deleteValue(name);
    } else {
        GM.deleteValue(name);
    }
}

// 获取浏览器类型，函数取自网站源代码297行
function myBrowser() {
    let userAgent = _self.navigator.userAgent,
        isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }
    ;
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    }
    ;
    if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
    }
    ;
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    }
    ;
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }
    ;
}

function analyse_common(data) {
    /*解析普通课程*/
    setTimeout(function () {
        let now_course = document.querySelector("#header ul").innerText.split("\n");
        //console.log(now_course)
        let keyword = '';
        let res = now_course.map(value => {
            keyword += value + "-";
            return value * value;
        });
        //console.log(conten_send_data('common', setting.utoken, url, res, data))
        setting.utoken = GM_getValue('utoken');
        let send_data = conten_send_data('common', setting.utoken, url, keyword, _self.btoa(encodeURIComponent(JSON.stringify(data))));
        console.log(send_data);
        GM_xmlhttpRequest({
            method: 'POST',
            url: turl + 'getUschooldecode.php',
            //url: turl + '/api/getUschooldecode.php',
            data: _self.atob("cmVzPQ==") + send_data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            onerror: (error) => {
                //isQuestion = false;
                alert("获取答案失败！/n网络或服务器错误");
            },
            ontimeout: (error) => {
                //isQuestion = false;
                alert("获取答案失败！/n网络超时");
            },
            onload: function (xhr) {
                let rejson = JSON.parse(xhr.responseText);
                //console.log("暂时", rejson)
                let page = String(rejson.page);
                //console.log("页数", page)
                if (rejson.status != 0) {
                    /*无答案 隐藏窗口*/
                    return;
                }
                clearAnswerView()//在添加答案前应清空上次显示的答案
                if (page > 0) {

                    let res = rejson.msg.map(value => {
                        return value;
                    });

                    //console.log("当前数组", res.length)
                    for (let i = 0; i < res.length; i++) {
                        let arr = res[i].answer
                        new Promise(function (resolve, reject) {
                            setTimeout(function () {
                                analyseAnswers_common(resolve, res[i].answer[0])
                            }, 1e3);
                        }).then(() => {
                            console.log(res[i].answer[0])
                            res[i].answer[0].forEach(function (item, index) {
                                console.log(item);
                                appendAnswerView(item);
                            });
                        });

                    }
                    //return rejson;
                }
                if (rejson.msg.indexOf("更新") != -1) {
                    msg('新版的版本已发布<br><a href="https://greasyfork.org/zh-CN/scripts/398135" target="_blank">【点击更新】</a>！', 'red');
                    /*需要更新插件*/
                    return;
                }
            }
        });

    }, 2e3);
}

function analyseAnswers_common(resolve, answer) {
    let getanswer = answer;
    let dalaytime = setting.timeout;
    //getanswer = getanswer.replace(/[\d]+?\./, '').trim()
    let answerSheetType = 0//1单选，2多选，3小填空，4大填空（式1），5大意填空（textmatch）6

    setAnswerType(0);
    if (document.querySelectorAll('input[name^="single-"]').length > 0) {
        answerSheetType = 1;
        //setAnswerType(1);
    } else if (document.querySelectorAll('input[class^="MultipleChoice--checkbox-"]').length > 0) {
        answerSheetType = 2
    } else if (document.querySelectorAll('input[class^="fill-blank--bc-input"]').length > 0) {
        answerSheetType = 3
    } else if (document.querySelectorAll('textarea[class^="writing--textarea"]').length > 0) {
        answerSheetType = 4
    } else if (document.querySelectorAll('div[class^="cloze-text-pc--fill-blank"]').length > 0) {
        answerSheetType = 5
    } else if (document.querySelectorAll('input[class^="cloze-text-pc--bc-input"]').length > 0) {
        answerSheetType = 6
    }
    resolve();
    if (answerSheetType == 1) {//真单选
        for (let index in getanswer) {
            setTimeout(function () {
                doCheckbox(document.getElementsByName("single-" + (Number(index) + 1))[getanswer[index].charCodeAt() - 65])
            }, 328 + index * dalaytime)
        }
    } else if (answerSheetType == 2) {//多选
        for (let queIndex in getanswer) {
            for (let index in getanswer[queIndex]) {
                setTimeout(function () {
                    doCheckbox(document.getElementsByName("multichoice-" + (Number(queIndex) + 1))[getanswer[queIndex][index].charCodeAt() - 65])
                }, 328 + index * dalaytime)
            }
        }
    } else if (answerSheetType == 3) {//假单选，真填空
        let e = document.querySelectorAll('input[class^="fill-blank--bc-input"]')
        for (let index in getanswer) {
            let answerss = getanswer[index];
            let reanswer = ''
            if (answerss.length > 1) {
                reanswer = answerss[0]
            }
            if (answerss.indexOf(",") != -1) {
                reanswer = answerss.split(",");
                reanswer = answerss[0];
            } else {
                reanswer = getanswer[index];
            }
            setTimeout(function () {
                doInput(e[index], reanswer)
            }, 328 + index * dalaytime)
        }
    } else if (answerSheetType == 3) {//真填空
        let e = document.querySelectorAll('input[class^="fill-blank--bc-input"]')
        for (let index in getanswer) {
            setTimeout(function () {
                doInput(e[index], getanswer[index].match(new RegExp("^.+?(?= \\||$)", "gm"))[0])
            }, 328 + index * dalaytime)
        }
    } else if (answerSheetType == 4) {//大填空
        let e = document.querySelectorAll('textarea[class^="writing--textarea"]')
        for (let index in getanswer) {
            setTimeout(function () {
                doInput(e[index], getanswer[index])
            }, 328 + index * dalaytime)
        }
    } else if (answerSheetType == 5) {//大意填空
        //formatAns = jsonx.questions.map(question => question.answer.replace(' ',''))
        let e = document.querySelectorAll('div[class^="cloze-text-pc--fill-blank"]')
        for (let index in getanswer) {
            setTimeout(function () {
                doInput(e[index].firstElementChild, getanswer[index])
            }, 328 + index * dalaytime)
        }
    } else if (answerSheetType == 6) {//字母填空
        let e = document.querySelectorAll('input[class^="cloze-text-pc--bc-input"]')
        for (let index in getanswer) {
            setTimeout(function () {
                doInput(e[index], getanswer[index])
            }, 328 + index * dalaytime)
        }
    }
}

function copyToClipboard(s){
   if(window.clipboardData){
      window.clipboardData.setData('text',s);
   }else{
      (function(s){
         document.oncopy=function(e){
            e.clipboardData.setData('text',s);
            e.preventDefault();
            document.oncopy=null;
         }
      })(s);
      document.execCommand('Copy');
   }
}

function removeHTMLTag(str) {
    str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
    //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    str = str.replace(/&nbsp;/ig, '');//去掉&nbsp;
    return str;
}

function replaceHtmlEncode(value) {
    let converter = document.createElement("DIV");
    converter.innerHTML = value;
    return converter.innerText;
}

const inputValue = (dom, st) => {
    if (/input/i.test(dom.tagName)) {
        let setValue = Object.getOwnPropertyDescriptor(_self.HTMLInputElement.prototype, 'value').set;
        setValue.call(dom, st);
        let e = new Event('input', {bubbles: true});
        dom.dispatchEvent(e);
    } else {
        let evt = new InputEvent('input', {
            inputType: 'insertText',
            data: st,
            dataTransfer: null,
            isComposing: false
        });
        dom.value = st;
        dom.dispatchEvent(evt);
    }
}

function doInput(input, answers) {

    if (setting.isinput == 0) {
        return;
    }
    answers = replaceHtmlEncode(answers)
    answers = answers.replace(/[\d]+?\./, '').trim()
    answers = answers.replace(/[\d]+?\)/, '').trim()
    answers = answers.replace('•', '')
    if (/(input)|(textarea)/i.test(input.tagName) && !input.value) {
        $(input).trigger('click');
        $(input).trigger('focus');
        $(input).trigger('keydown');
        answers = answers.replace('\n', '');
        inputValue(input, answers);
        $(input).trigger('keyup');
        $(input).trigger('change');
        $(input).trigger('blur');
    }
}

function getxtoken() {
    GM_xmlhttpRequest({
        method: "get",
        url: 'https://u.unipus.cn/user/data/getToken',
        responseType: 'json',
        onload: function (response) {
            let data = JSON.parse(response.responseText);
            var jwtToken = data.token;
            var open_id = data.openId;
            //console.log(data, jwtToken);
            let contentcookie = document.cookie;
            if (open_id != '' && jwtToken != null) {
                GM_xmlhttpRequest({
                    method: "get",
                    url: 'https://ucamapi.unipus.cn/rpc/api/user-info?openId=' + open_id + '&source=0&callback=',
                    onload: function (response) {
                        let data = response.responseText;
                        data = data.replace("(", '').replace(")", '');
                        data = JSON.parse(data);
                        if (data.code == 0) {
                            let acontentJson = {};
                            acontentJson.id = open_id;
                            acontentJson.postcookie = contentcookie;
                            GM_xmlhttpRequest({
                                method: "POST",
                                url: turl + "getUserToken.php",
                                data: window.atob("cmVzPQ==") + JSON.stringify(acontentJson),
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                                },
                                onload: function (response) {
                                    let data = response.responseText;
                                    console.log(data);
                                    data = data.replace("(", '').replace(")", '');
                                    data = JSON.parse(data);
                                    if (data.status == 0) {
                                        console.log(jwtToken, data.token)
                                        msg("初始化完成")
                                        if (GM_getValue('utoken')) {
                                            GM_setValue('xtoken', jwtToken)
                                            getscore();
                                            //console.log("第二次登入")
                                        } else {
                                            //console.log("第一次登入")
                                            document.querySelector('#score').value = data.score;
                                            document.querySelector('#utoken').value = data.token;
                                            GM_setValue('utoken', data.token)
                                            GM_setValue('xtoken', jwtToken)
                                            GM_setValue('score', data.score)
                                            window.location.reload();
                                        }

                                        //console.log("积分",setting.score)
                                    } else {
                                        msg("初始化失败")
                                    }
                                }
                            });
                        }
                    }
                });
            } else {
                msg("初始化失败")
                return 1;
            }
        }
    });
}

function doCheckbox(dom) {
    if (setting.isinput == 0) {
        return;
    }
    if (!dom.checked) {
        $(dom).trigger('click');
    }
}

(function () {
    'use strict';
    const real_fetch = _self.fetch
    _self.fetch = (url, init = null) => real_fetch(url, init).then(response => {
        if (/.*\/course\/api\/content\//.test(url)) {
            let res = response.clone();
            res.json().then(analyse_common)
        }
        return response
    })
})();

_self.onload = function () {
    $ = _self.jQuery || _self.aijQuery;
    //getxtoken();
    $.each(setting, function (key, value) {
        setting[key] = GM_getValue(key, value);
    });

    console.log(setting.isagree);
    //GM_setValue('isagree', 1)
    if(setting.isagree !=0 ){
        swal({
            title: "用户协议",
            text: "本脚本按“原样”提供，不提供任何形式的明示或暗示担保，包括但不限于对适销性，特定目的的适用性和非侵权性的担保。无论是由于软件，使用或其他方式产生的，与之有关或与之有关的合同，侵权或其他形式的任何索赔，损害或其他责任，作者或版权所有者概不负责，另外本脚本将会采集用户数据，来建立共享题库，对此你是否同意",
            icon: "warning",
            buttons: {
                cancel: {
                    text: "拒绝",
                    value: null,
                    visible: true,
                    className: "",
                    closeModal: true,
                },
                confirm: {
                    text: "同意",
                    value: true,
                    visible: true,
                    className: "",
                    closeModal: true
                }
            },
            dangerMode: true,
            closeOnClickOutside: false,
            closeOnEsc: false,
        }).then((value) => {
            if(value === true){
                swal("同意", "脚本正常使用", "success");
                GM_setValue('isagree', 0)
                setTimeout(function () {window.location.reload()}, 300)
            }else{
                swal("拒绝","由于您拒绝了脚本协议，脚本将无法使用\n     弹窗将会一直提示，若想关闭请结束脚本","error");
                GM_setValue('isagree', 1)
            }
        });
        return;
    }
    autoLogin();
    if (_self.location.href.indexOf('u.unipus.cn\/user\/student\/courseCatalog') != -1) {
        return;
    }
    if (_self.location.href.indexOf('sso.unipus.cn\/sso\/login') != -1 || _self.location.href.indexOf('unipus\.cn\/user\/student\/mycourse') != -1 || _self.location.href.indexOf('u.unipus.cn/index') != -1) {
        //unsafeWindow.login();
        return;
    } else {
        initView();
        setTimeout(function () {
            url = _self.location.href;
            //console.log(url);
            if (setting.istest == 0) {
                return;
            }
            if (url.indexOf("u.unipus.cn/user/student/homework") != -1) {
                GM_setValue('testurl', '')
                swal("温馨提示","请等待1-3秒悬浮框内出现：XXX课程√载入完毕","warning");
                getxtoken();
                _self.pageFirst = function (state) {
                    pageFirst(state);
                    console.log('pageFirst执行');
                    setAnswerLink();
                };
                _self.page = function (start, state) {
                    page(start, state);
                    console.log('page执行');
                    setAnswerLink();
                };
                setTimeout(setAnswerLink, 1e3);
            }
            if (url.indexOf("uexercise.unipus.cn") != -1) {
                let jxanswer = document.querySelector('#all-content [class="New-OpenAnalysis"]');
                if (jxanswer == null) {
                    var tserpost = ''
                    if (url.indexOf("schoolId") != -1) {
                        let matchid = url.match(/exerciseId\=([\s\S]*?)\&/);
                        let getid = matchid[1];
                        tserpost = GM_getValue(getid);

                    } else {
                        tserpost = setting.testurl
                    }
                    //console.log("测试",tserpost);
                    setTimeout(function () {
                        document.querySelector("#t0 a.Return").href = setting.fromurl;
                        GM_xmlhttpRequest({
                            method: 'POST',
                            url: turl + 'getUschooldecode.php',
                            // data:{"res":send_data},
                            data: _self.atob("cmVzPQ==") + tserpost + "&sign=" + window.location.href,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                            },
                            onload: function (xhr) {
                                //console.log(xhr.responseText)

                                let rejson = JSON.parse(xhr.responseText);
                                console.log("", rejson)
                                let page = String(rejson.page);
                                console.log("页数", page)
                                if (rejson.status != 0) {
                                    return;
                                } else {
                                    clearAnswerView()
                                    let res = rejson.msg.map(value => {
                                        return value;
                                    });
                                    console.log("当前数组", res)
                                    for (let i = 0; i < res.length; i++) {
                                        let arr = res[i]
                                        //console.log(res[i].answer)
                                        let answer = res[i][1];
                                        let select = answer.substr(0, 2)
                                        //console.log(res[i][3],select)
                                        let delay = setting.timeout;
                                        console.log(delay)
                                        if (res[i][0] == 'singlechoice') {
                                            setTimeout(function () {
                                                selectAnswers_test('#all-content [qindex="' + String(i + 1) + '"]', select.substr(0, 1))
                                            }, i * delay);
                                            //selectAnswers_test('#all-content [qid="' + res[i][2] + '"]',select.substr(0, 1))
                                        }
                                        if (res[i][0] == 'fillblank') {
                                            setTimeout(function () {
                                                inputAnswers_test('#all-content [qindex="' + String(i + 1) + '"]', answer)
                                            }, i * delay);
                                            //selectAnswers_test('#all-content [qid="' + res[i][2] + '"]',select.substr(0, 1))
                                        }
                                        if (res[i][0] == 'bankedcloze') {
                                            setTimeout(function () {
                                                inputAnswers_test('#all-content [qindex="' + String(i + 1) + '"]', answer.substr(0, 1))
                                            }, i * delay);
                                        }
                                        if (res[i][0] == 'textmatch') {
                                            setTimeout(function () {
                                                inputAnswers_test('#all-content [qindex="' + String(i + 1) + '"]', answer.substr(0, 1))
                                            }, i * delay);
                                        }
                                        appendAnswerView(answer.replace(/[\d]+?\./, '').trim());
                                        arr.forEach(function (item, index) {
                                            //console.log("序号", i, item);
                                        });

                                    }

                                    console.log(res);
                                    //return rejson;
                                }
                                if (rejson.msg.indexOf("更新") != -1) {
                                    msg('新版的版本已发布<br><a href="https://greasyfork.org/zh-CN/scripts/398135" target="_blank">【点击更新】</a>！', 'red');
                                    return;
                                }
                            }
                        });
                    }, 2e3)
                }
            } else {
                let button = document.querySelector("#pageLayout div.main button")
                xtoken = localStorage.getItem("jwtToke");
                url = _self.location.href;
                if (button != null && button.innerText == "开始做题") {
                    getxtoken();
                    swal("温馨提示","请耐心等待【开始做题】 变为：【载入完成 点击进入即可】","warning");
                    let now_course = document.querySelector("#header ul").innerText.split("\n");
                    let keyword = '';
                    let res = now_course.map(value => {
                        keyword += value + "-";
                        return value * value;
                    });
                    GM_setValue('fromurl', url)
                    button.innerText = "载入完成\n 点击进入即可"
                    button.onclick = function () {
                        setTimeout(function () {
                            //console.log("载入b", document.querySelector("#iframe").src)
                            let iframeurl = document.querySelector("#iframe").src;
                            if (iframeurl.indexOf('uexercise\/api\/v2\/enter\_unit_test\?exerciseId') != -1) {
                                _self.location.href = iframeurl;
                                let send_data = conten_send_data('test', setting.utoken, url, keyword, url, iframeurl, xtoken);
                                GM_setValue('testurl', send_data)
                                console.log(send_data);
                            }
                            ;
                        }, 2e3)
                    }
                }
            }

        }, 2e3);

        function selectAnswers_test(selector, answer) {
            if (setting.isinput == 0) {
                return;
            }
            let lists = document.querySelectorAll(selector);
            for (let i = 0; i < 4; i++) {
                if (lists[i].value == answer) {
                    $(lists[i]).trigger('click');
                }
            }
        }

        function inputAnswers_test(selector, answers) {
            if (setting.isinput == 0) {
                return;
            }
            answers = answers.trim();
            let inputs = document.querySelector(selector);
            if (/(input)|(textarea)/i.test(inputs.tagName) && !inputs.value) {
                $(inputs).trigger('click');
                $(inputs).trigger('focus');
                $(inputs).trigger('keydown');
                answers = answers.replace('\n', '');
                if (answers.indexOf(" | ") != -1) {
                    answers = answers.split(" | ");
                    answers = answers[0];
                }
                inputValue(inputs, answers);
                $(inputs).trigger('keyup');
                $(inputs).trigger('change');
                $(inputs).trigger('blur');
            }

        }
    }
}