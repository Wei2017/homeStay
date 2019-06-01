
export default {
  getQueryStringByName: function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    var context = "";
    if (r != null)
      context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
  },
  formatDate: {
    format: function (date, pattern) {
      pattern = pattern || DEFAULT_PATTERN;
      return pattern.replace(SIGN_REGEXP, function ($0) {
        switch ($0.charAt(0)) {
          case 'y':
            return padding(date.getFullYear(), $0.length);
          case 'M':
            return padding(date.getMonth() + 1, $0.length);
          case 'd':
            return padding(date.getDate(), $0.length);
          case 'w':
            return date.getDay() + 1;
          case 'h':
            return padding(date.getHours(), $0.length);
          case 'm':
            return padding(date.getMinutes(), $0.length);
          case 's':
            return padding(date.getSeconds(), $0.length);
        }
      });
    },
    parse: function (dateString, pattern) {
      var matchs1 = pattern.match(SIGN_REGEXP);
      var matchs2 = dateString.match(/(\d)+/g);
      if (matchs1.length == matchs2.length) {
        var _date = new Date(1970, 0, 1);
        for (var i = 0; i < matchs1.length; i++) {
          var _int = parseInt(matchs2[i]);
          var sign = matchs1[i];
          switch (sign.charAt(0)) {
            case 'y':
              _date.setFullYear(_int);
              break;
            case 'M':
              _date.setMonth(_int - 1);
              break;
            case 'd':
              _date.setDate(_int);
              break;
            case 'h':
              _date.setHours(_int);
              break;
            case 'm':
              _date.setMinutes(_int);
              break;
            case 's':
              _date.setSeconds(_int);
              break;
          }
        }
        return _date;
      }
      return null;
    },
    timeForm: function renderTime(date) {
      var dateee = new Date(date).toJSON();
      return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    }
  },
  // 两个字符串日期相差天数
  DateMinus: function (date1, date2) {
    let sdate = new Date(date1);
    let now = new Date(date2);
    let days = now.getTime() - sdate.getTime();
    let day = parseInt(days / (1000 * 60 * 60 * 24));
    return day;
  },
  // 此方法处理每个页面只能触发一次onresize事件，主要是图表插件，窗口放大缩小，图表不执行
  debounce: function (func, threshold, execAsap) {
    var timeoutTwo
    return function debounced() {
      var obj = this
      var args = arguments

      function delayed() {
        if (!execAsap) func.apply(obj, args)
        timeoutTwo = null
      }
      if (timeoutTwo) clearTimeout(timeoutTwo)
      else if (execAsap) func.apply(obj, args)
      timeoutTwo = setTimeout(delayed, threshold || 100)
    }
  },
  importXlsfun: function (obj) { //obj读取的文件
    /*
      FileReader共有4种读取方法：
      1.readAsArrayBuffer(file)：将文件读取为ArrayBuffer。
      2.readAsBinaryString(file)：将文件读取为二进制字符串
      3.readAsDataURL(file)：将文件读取为Data URL
      4.readAsText(file, [encoding])：将文件读取为文本，encoding缺省值为'UTF-8'
    */
    if (!obj.files) {
      return;
    }
    var f = obj.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      var data = e.target.result;
      if (rABS) {
        wb = XLSX.read(btoa(fixdata(data)), { //手动转化
          type: 'base64'
        });
      } else {
        wb = XLSX.read(data, {
          type: 'binary'
        });
      }
      //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
      //wb.Sheets[Sheet名]获取第一个Sheet的数据
      document.getElementById("demo").innerHTML = JSON.stringify(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
    };
    if (rABS) {
      reader.readAsArrayBuffer(f);
    } else {
      reader.readAsBinaryString(f);
    }

  }
};
