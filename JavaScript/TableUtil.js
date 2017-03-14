/**
 * 注意：此 js 文件依赖于 jquery，使用时请务必先引入 jquery.js，此处使用的 jquery 版本为jquery-1.12.1.js
 * @authors BaoXuebin (baoxbin@hotmail.com)
 * @date    2017-03-06 12:57:30
 */
'use strict'

var TableUtil = (function() {

        var test = function test() {
            console.log('TableUtil.js 加载成功！');
        };

        var collapse = function collapse(params) {
            // td 高度默认为 100px
            var _height = params.height || '80';
            var _openStr = params.openStr || '展开';
            var _closeStr = params.closeStr || '收起';
            var _selector = params.selector;

            // 生成 html 结构
            var renderDOM = function renderDOM($selector) {
                $selector.css({
                    height: _height + 'px'
                });
                var text = $selector.html();
                // 用于显示所有文本的 p 标签
                var allComponent = '<p class="all" style="display:none">' + text + '</p>';
                // 用于显示缩略文本的 p 标签
                var apprComonpent = '<p class="appr">' + text + '</p>';
                $selector.html(allComponent + apprComonpent);

                return $selector;
            };

            // 渲染显示结构
            var renderView = function renderView($selector) {
                var divHight = _height - 16;
                var _$p = $("p.appr", $selector).eq(0);
                while (_$p.outerHeight() > divHight) {
                    _$p.text(_$p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, '...'));
                };
                _$p.show();
                $selector.append('<a style="cursor: pointer;">' + _openStr + '</a>');
            };

            // 点击按钮展开或者折叠
            var toggle = function toggle($selector) {
                var str = $.trim($selector.text());
                if (str === _openStr) {
                    $selector.text(_closeStr);
                	$selector.siblings("p.appr").hide();
                	$selector.siblings("p.all").show();
                	$selector.parent('div').css({
                		height: 'auto'
                	});
                } else {
                    $selector.text(_openStr);
                	$selector.siblings("p.all").hide();
                	$selector.siblings("p.appr").show();
                	$selector.parent('div').css({
                		height: _height + 'px'
                	});
                }
            };

            // 遍历所有的选择对象
            $(_selector).each(function() {
                var realHeight = $(this).height();
                if (realHeight > _height) {
                    var $selector = renderDOM($(this));
                    renderView($selector);

                    // 监听点击事件
                    $(this).children('a').click(function() {
                        var $selector = $(this);
                        toggle($selector);
                    });
                }
            });
        };

        return {
            test: test,
            collapse: collapse
        };
})();

TableUtil.test();
