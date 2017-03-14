/**
 * 注意：此 js 文件依赖于 jquery，使用时请务必先引入 jquery.js，此处使用的 jquery 版本为jquery-1.12.1.js
 * timer 方法不兼容 ie8及一下版本，不想改兼容性了 
 * @authors BaoXuebin (baoxbin@hotmail.com)
 * @date    2017-03-14 14:19:54
 */

var ButtonUtil = (function() {

    var timerPreFunc = function() {
        console.log("计时前,方法执行...");
    };

    var timerAfterFunc = function() {
        console.log("计时后,方法执行...");
    };

    return {
        test: function() {
            console.log('ButtonUtil.js 加载成功！');
        },
        timer: function(params) {
            // 对象选择器，必须赋值
            var _$selector;
            if (params.container instanceof jQuery) {
				_$selector = params.selector;
			} else {
				_$selector = $(params.selector);
			}
            // 默认时间 60 秒
            var _time = params.time || 10;
            // 倒计时过程中文本显示，默认只显示秒数
            var _excText = params.excText || '{+}';
            var _endText = params.endText || '重新获取';
            var _preFunc = params.preFunc;
            var _afterFunc = params.afterFunc;
            var _debug = params.debug || false;

            // 处理方法
            var breforeHandler = function breforeHandler() {
                if (typeof _preFunc === 'function') {
                    _preFunc();
                } else if (_debug) {
                    timerPreFunc();
                }
            };
            var handler = function handler(selector, afterHandler) {
                var taskTag = true;
                // 倒数计时器
                var count = function(ct, itv) {
                    if(ct >= 0 && taskTag) {
                        window.setTimeout(function() {
                            // 动态设置按钮文字，并禁用按钮
                            var text = _excText.replace('{+}', ct);
                            if (_debug) {
                                console.log('倒计时：' + text);
                            }
                            selector.text(text).attr("disabled", "disabled");
                            selector.val(text).attr("disabled", "disabled");
                            // 倒数计时 --%>
                            count(ct - 1, 1000);
                        }, itv);
                    } else {
                        // 计时结束 --%>
                        selector.text(_endText).removeAttr("disabled");
                        selector.val(_endText).removeAttr("disabled");
                        afterHandler();
                    }
                };
                // 开始倒数计时
                count(_time, 0);
            };
            var afterHandler = function afterHandler() {
                if (typeof _afterFunc === 'function') {
                    _afterFunc();
                } else if (_debug) {
                    timerAfterFunc();
                }
            };

            _$selector.each(function() {
                $(this).on('click', function() {
                    breforeHandler();
                    handler($(this), afterHandler);
                });
            });
        }
    };
})();

ButtonUtil.test();
