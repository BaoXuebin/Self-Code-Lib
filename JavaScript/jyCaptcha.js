 //
 //   简单封装了一下 极验验证码 的 js 初始化代码
 //   @authors BaoXuebin (baoxbin@hotmail.com)
 //   @date    2017-03-23 19:06:45
 //   使用实例：
 //     JY_CAPTCHA.popup({
 //         /* container: $('#popup-captcha'), // 极验验证码显示的容器
 //         trigger: $('button.testBtn'),
 //         // 初始化极验之前，执行的方法
 //         brefore: function() {
 //             return !$.trim($('input.testInput').val()) == '';
 //         },
 //         success: function(data) {
 //             alert('Hello World!');
 //         },
 //         debug: false
 //     });
 //
 //     JY_CAPTCHA.embed({
 //         /* container: $('#popup-captcha'), // 极验验证码显示的容器 */
 //         trigger: $('#embed-submit'),
 //         form: '#form-embed',
 //         container: '#embed-captcha',
 //         showMode: 'embed',  // 或者 float
 //         success: function() {
 //             $('#form-embed').submit();
 //         },
 //         debug: false
 //     });

var JY_CAPTCHA = (function() {
    var test = function test() {
        console.log('jyCaptcha.js 加载成功！');
    };

    var global_debug = false;

    var selflog = function selflog(text, type) {
        if (!global_debug) return;
        console.log(text);
        // console.warn();
        // console.error();
    };

    // type: 验证码的类型   handlerFunc: 处理方法
    var init = function init(type, handlerFunc) {
        // 验证开始需要向网站主后台获取id，challenge，success（是否启用failback）
        $.ajax({
            url: "pc-geetest/register?t=" + (new Date()).getTime(), // 加随机数防止缓存
            type: "get",
            dataType: "json",
            success: function (data) {
                selflog('极验注册完成');
                // 使用initGeetest接口
                // 参数1：配置参数
                // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它做appendTo之类的事件
                initGeetest({
                    gt: data.gt,
                    challenge: data.challenge,
                    product: type, // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
                    offline: !data.success // 表示用户后台检测极验服务器是否宕机，一般不需要关注
                    // 更多配置参数请参见：http://www.geetest.com/install/sections/idx-client-sdk.html#config
                }, handlerFunc);
            }
        });
    };

    var initParams = function initParams(params) {
        var _params = {};
        // 处罚按钮，点击事件
        if (params.trigger instanceof jQuery) {
			_params['trigger'] = params.trigger;
		} else {
			_params['trigger'] = $(params.trigger);
		}
        // 调试开关
        global_debug = params.debug || false;

        // 极验对象容器
        if (!params.container) {
        	var id = 'popup-captcha-' + (new Date()).getTime();
        	$('body').append('<div id="'+ id +'"></div>');
            _params['containerId'] = '#' + id;
        } else {
			_params['containerId'] = params.container;
		}

        selflog('验证码容器构建完成：' + _params['containerId']);

        _params['beforeFunc'] = params.brefore;
        _params['successFunc'] = params.success;
        _params['showMode'] = params.showMode || 'float';
        if (params.form instanceof jQuery) {
			_params['form'] = params.form;
		} else {
			_params['form'] = $(params.form);
		}

        return _params;
    };
    // 弹出式
    var popup = function popup(params) {
        var _params = initParams(params);

        var _$trigger = _params.trigger;
        var _containerId = _params.containerId;
        var _beforeFunc = _params.beforeFunc;
        var _successFunc = _params.successFunc;

        var handlerPopupFunc = function (captchaObj) {
            // 成功的回调
            captchaObj.onSuccess(function () {
                var validate = captchaObj.getValidate();
                $.ajax({
                    url: "pc-geetest/validate", // 进行二次验证
                    type: "post",
                    dataType: "json",
                    data: {
                        geetest_challenge: validate.geetest_challenge,
                        geetest_validate: validate.geetest_validate,
                        geetest_seccode: validate.geetest_seccode
                    },
                    success: function (data) {
                        selflog('极验二次验证完成，获取到返回值：\n' + data);

                        if (_successFunc) {
                            selflog('极验验证完成，成功执行 success 方法');
                            _successFunc(data);
                        } else {
                        	selflog('极验验证完成，未执行任何方法');
                        }
                    }
                });
            });

            // 绑定按钮的点击事件
            _$trigger.each(function() {
                $(this).on('click', function() {
                    if (!_beforeFunc || _beforeFunc && _beforeFunc()) {
                        captchaObj.show();
                    } else {
                        selflog('before 方法返回 false , 极验未初始化');
                    }
                });

                selflog($(this) + '成功绑定点击事件');
            });

            // 将验证码加到id为captcha的元素里
            captchaObj.appendTo(_containerId);
            selflog('极验初始化完成');
        };

        init('popup', handlerPopupFunc);
    };
    // 内嵌式
    var embed = function embed(params) {
        var _params = initParams(params);

        var _$trigger = _params.trigger;
        var _containerId = _params.containerId;
        var _beforeFunc = _params.beforeFunc;
        var _successFunc = _params.successFunc;
        var _showMode = _params.showMode;
        var _$form = _params.form;

        var handlerEmbedFunc = function (captchaObj) {
            var _waitHTML = '<p id="wait" class="show">正在加载验证码......</p>';
            var _noticeHTML = '<p id="notice" class="hide">请先拖动验证码到相应位置</p>';

            var _$wait = $(_waitHTML);
            var _$notice = $(_noticeHTML);

            // 添加提示文字
            $(_containerId).after(_$notice);
            $(_containerId).after(_$wait);

            selflog('提示信息添加完成')

            _$trigger.each(function() {
                $(this).click(function(e) {
                    if (!_beforeFunc || _beforeFunc && _beforeFunc()) {
                        var validate = captchaObj.getValidate();
                        if (!validate) {
                            selflog('极验验证码错误');
                            _$notice.show();
                            setTimeout(function () {
                                _$notice.hide();
                            }, 2000);
                            e.preventDefault();
                        } else {
                            // 添加验证 hidden
                            _$form.prepend('<input type="hidden" name="geetest_challenge" value="'+ validate.geetest_challenge +'" />');
                            _$form.prepend('<input type="hidden" name="geetest_validate" value="'+ validate.geetest_validate +'" />');
                            _$form.prepend('<input type="hidden" name="geetest_seccode" value="'+ validate.geetest_seccode +'" />');

                            selflog('三个隐藏 input 成功插入到 ' + _$form.attr('id'));

                            if (_successFunc) {
                                selflog('执行 success 方法');
                            	_successFunc();
                            }
                            captchaObj.refresh();
                        }
                    } else {
                        selflog('before 方法返回 false ');
                    }
                });
            });
            // 将验证码加到id为captcha的元素里，同时会有三个input的值：geetest_challenge, geetest_validate, geetest_seccode
            captchaObj.appendTo(_containerId);
            captchaObj.onReady(function () {
                _$wait.hide();
            });
        };

        init(_showMode, handlerEmbedFunc);
    };

    return {
        test: test,
        popup: popup,
        embed: embed
    };
})();


JY_CAPTCHA.test();
