const funs = {
  // 数字转金钱格式， 1000 => 1,000
  formatNum: number => {
    let str = "";
    if (!number || isNaN(parseFloat(number))) {
      str = "0";
    } else {
      str = parseFloat(number).toString();
    }
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  // 序列化日期
  formatDate: (stamp, isSecond) => {
    const timeStamp = stamp / 1;
    const date = timeStamp ? new Date(timeStamp) : new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    if (isSecond || (!timeStamp && !isSecond)) {
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    } else {
      return `${year}-${month}-${day}`;
    }
  },
  //获取时间
  getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  },
  //获取前7天日期
  getTime7days() {
    var myDate = new Date(); //获取今天日期
    myDate.setDate(myDate.getDate() - 6);
    var dateArray = [];
    var dateTemp;
    var flag = 1;
    for (var i = 0; i < 7; i++) {
      var month =
        myDate.getMonth() + 1 > 9
          ? myDate.getMonth() + 1
          : "0" + (myDate.getMonth() + 1);
      var date =
        myDate.getDate() > 9 ? myDate.getDate() : "0" + myDate.getDate();
      dateTemp = month + "月" + date + "日";
      dateArray.push(dateTemp);
      myDate.setDate(myDate.getDate() + flag);
    }
    return dateArray;
  },

  //标准时间
  formateDateTime: date => {
    const arr = date.split("T");
    const d = arr[0];
    const darr = d.split("-");

    const t = arr[1];
    const tarr = t.split(".000");
    const marr = tarr[0].split(":");

    const dd =
      parseInt(darr[0]) +
      "-" +
      parseInt(darr[1]) +
      "-" +
      parseInt(darr[2]) +
      " " +
      parseInt(marr[0]) +
      ":" +
      parseInt(marr[1]) +
      ":" +
      parseInt(marr[2]);
    return dd;
  },

  // 对象转query字符串，用于页面URL传参或接口拼接
  objToQuery: obj => {
    // debugger
    if (!(obj instanceof Object) || !(obj.constructor === Object)) {
      return "";
    }
    const keys = Object.keys(obj);
    if (!keys.length) {
      return "";
    }
    const query = [];
    keys.forEach(key => {
      const value =
        obj[key] === undefined ? "" : obj[key] === null ? "" : obj[key];
      query.push(`${key}=${value}`);
    });
    return `?${query.join("&")}`;
  },

  // query字符串转对象
  queryToObj: query => {
    if (typeof query !== "string") {
      return {};
    }
    const kvList = query.replace(/^\?*/g, "").split("&");
    const obj = {};
    kvList.forEach(item => {
      const kv = item.split("=");
      obj[kv[0]] = kv[1];
    });
    return obj;
  },
  // base64转blob
  base64ToBlob(code) {
    let parts = code.split(";base64,");
    let contentType = parts[0].split(":")[1];
    let raw = window.atob(parts[1]);
    let rawLength = raw.length;
    let uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  },
  getCookie: cookieName => {
    const cookieArr = unescape(document.cookie).split(";");
    if (cookieName) {
      for (let i = 0; i < cookieArr.length; i += 1) {
        const kv = cookieArr[i].split("=");
        const k = kv[0].trim();
        if (k === cookieName) {
          return kv[1];
        }
      }
      return "";
    }
    const cookieObj = {};
    cookieArr.forEach(item => {
      const kv = item.split("=");
      const k = kv[0].trim();
      const v = kv[1];
      cookieObj[k] = v;
    });
    return cookieObj;
  },
  setCookie: (cookieName, value, hour) => {
    const n = escape(cookieName);
    const timeLimit = (hour || 0) * 3600000;
    let expires = "";
    if (timeLimit !== 0) {
      // 设置cookie生存时间
      const date = new Date();
      date.setTime(date.getTime() + timeLimit);
      expires = "; expires=" + date.toGMTString();
    }
    document.cookie = n + "=" + escape(value) + expires + "; path=/";
  },
  removeCookie: cookieName => {
    const n = escape(cookieName);
    const date = new Date();
    date.setTime(date.getTime() - 1);
    const expires = "; expires=" + date.toGMTString();
    document.cookie = n + "=" + expires + "; path=/";
  },
  clearCookie: () => {
    // eslint-disable-next-line no-useless-escape
    const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      for (let i = 0; i < keys.length; i += 1) {
        document.cookie = keys[i] + "=0;expires=" + new Date(0).toUTCString();
      }
    }
  },
  // 生成随机码算法
  getRandomCode() {
    const nums = ["0", "1", "2", "3", "4", "5", "6", "9", "7", "9"];
    const upperCase = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z"
    ];
    const lowerCase = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z"
    ];
    const stringList = nums.concat(upperCase, lowerCase);
    const stringListLen = stringList.length;
    const result = [];
    for (let i = 0; i < 5; i += 1) {
      let paragraph = "";
      const paragraphRandomLength = parseInt(Math.random() * 3) + 4;
      for (let j = 0; j < paragraphRandomLength; j += 1) {
        paragraph += stringList[parseInt(Math.random() * stringListLen)];
      }
      result.push(paragraph);
    }
    return result.join("-");
  },
  // 将图片转成base64
  getImgToBase64(url, callback) {
    //将图片转换为Base64
    let canvas = document.createElement("canvas"),
      ctx = canvas.getContext("2d"),
      img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function() {
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      let dataURL = canvas.toDataURL("image/png");
      callback(dataURL);
      canvas = null;
    };
    img.src = url;
  },
  // 将base64转成file
  dataURLtoFile(dataurl, filename) {
    //将base64转换为文件
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
};

export default funs;
