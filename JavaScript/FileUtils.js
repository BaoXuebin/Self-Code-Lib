/**
 * 注意：此 js 文件依赖于 jquery，使用时请务必先引入 jquery.js，此处使用的 jquery 版本为jquery-1.12.1.js
 * @authors BaoXuebin (baoxbin@hotmail.com)
 * @date    2016-12-14 21:10:34
 */
'use strict'

var FileUtils = (function() {

    var test = function() {
        console.log('FileUtils.js 加载成功！');
    };

    /*
        验证文件选择框所选文件的大小和格式是否符合要求
        param: inputElement 输入框对象
    */
    var validateFileInput = function(fileInput) {
        // 过滤的文件格式类型
        var validExts = new Array(".PNG", ".JPG", ".GIF", ".JPEG");
        // 最大文件大小 默认100kb
        var maxSize = 50 * 1024;

        var filepath = $(fileInput).val();
        var extStart = filepath.lastIndexOf(".");
        var ext = filepath.substring(extStart, filepath.length).toUpperCase();
        if ($.inArray(ext, validExts) < 0) {
            alert('文件格式只能为'+ validExts.join(" "));
            var file = $(fileInput);
            file.after(file.clone().val(""));
            file.remove();
            return;
        } else {
            var fileSize = -1;
            // 浏览器兼容性处理
            if (isIE()) { // IE
                try{
                    var fso = new ActiveXObject("Scripting.FileSystemObject");
                    fileSize = fso.GetFile(path).size;
                }catch(e){
                    alert(e + "\n文件大小未识别，建议文件不超过" + formatSize(maxSize, 2) + "，否则会导致提交失败！");
                }
            } else {
                fileSize = $(fileInput)[0].files[0].size;
            }
            if (fileSize > maxSize) {
                alert("文件太大（" + formatSize(fileSize, 2) +  "） ，请重新选择文件！" );
                var file = $(fileInput);
                file.after(file.clone().val(""));
                file.remove();
            }
        }

        // 格式化文件大小  size 文件大小  precision 小数点位数
        function formatSize(size, precision) {
            if (size < 1024) {
                return size + " B";
            } else if (size < 1024 * 1024) {
                return (size/1024).toFixed(precision) + " KB";
            } else if (size < 1024 * 1024 * 1024) {
                return (size/(1024*1024)).toFixed(precision) + " MB";
            } else {
                return (size/(1024*1024*1024)).toFixed(precision) + " GB";
            }
        }

        function isIE() {
            if (!!window.ActiveXObject || "ActiveXObject" in window)
                return true;
            else
                return false;
        }
    };

    return {
        test: test,
        validateFileInput: validateFileInput
    };
})();

FileUtils.test();
