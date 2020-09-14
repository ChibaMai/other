/**
 * Aftersoil 前端封装方法
 * 
 * 使用方法
 * 
 * <script type="module">
 *  import temp from './src/assets/js/AftersoilTools.js'
 * </script>
 * 
 * 引入即可使用
 */

class Aftersoil {

  /**
   * Aftersoil 描述
   */
  Aftersoil = "1.0.0";
  name = "Aftersoil";

  
  /**
   * 全局变量
   */

  /**
   * 构造函数
   */
  constructor() {
    
  }
  
  /*!***********************************************************!*\
   *!******************** 以下是方法函数 *************************!
  \*!***********************************************************!*/



  /** 
   * 设置cookie
   * @name cookie 的名字
   * @value  cookie 的值
   * @exdays cookie 过期的天数
   * @path Cookie的使用路径。如果设置为"/home/"，则只有Path为"/home"的程序可以访问该Cookie。如果设置为"/"，则本域名下Path都可以访问该Cookie。注意最后一个字符必须为"/"。
   * @domain 可以访问该Cookie的域名。如果设置为".google.com"，则所有以"google.com"结尾的域名都可以访问该Cookie。注意第一个字符必须为"."
   */
  setCookie({
    name,
    value,
    exdays = 7,
    path = "/",
    domain = ""
  }) {
    let exp = new Date();
    // 过期时间 天数 * 24 * 60 * 60 * 1000
    exp.setTime(exp.getTime() + exdays * 24 * 60 * 60 * 1000);
    // 加密
    let encryption = window.btoa(window.encodeURIComponent(value));

    // 设置 cookie
    document.cookie = `${name}=${encryption};expires = ${exp.toGMTString()};path=${path};domain=${domain};`;
    // console.log(day);

    return `${name}改cookie设置成功,到期时间为${exdays}天`
  }

  /**
   * 获取cookie
   * @name  cookie的名称，即可查询到传入的 cookie 的值
   * 
   * 如果查询到则返回一条对象，为 cookie 的名称和 cookie 的值
   * 
   * { name: "xxx" value: "xxx" }
   */
  getCookie(name) {
    // 将 cookie 以 ; 切割成数组
    let arr = document.cookie.split(";");

    // 循环遍历 arr 中的所有 cookie
    for (let i = 0; i < arr.length; i++){
      // console.log(arr[i])
    }

    for (const iterator of arr) {
      // 将遍历到的每个 cookie 在以 = 进行切割
      let tempCookieArr = iterator.split("=");

      if (tempCookieArr[0].trim() === name) {
        // 获取 value
        let value = tempCookieArr[1];
        // 解密数据
        let decrypt = window.decodeURIComponent(window.atob(value));

        // 返回 coolie 的 name 和 value
        return {
          name,
          value: decrypt
        }
      }

    }

    return {}
  }

  /**
   * 删除 cookie
   * @key cookie名
   */
  removeCookie(key) {
    // let exp = this.getTime({}).Day - 1;
    let date = new Date();
    date.setTime(date.getTime() - 1);
    
    let delValue = this.getCookie({
      name: key
    });

    if (!!delValue) {
      document.cookie = key+'='+delValue+';expires='+date.toGMTString();
      return `${key}删除成功`
    }
  }

  /**
   * 获取时间日期
   * @chineseLowerCase 设置星期的数组为阿拉伯数字或者为中文小写数字
   * @isweek 设置返回字符串的结构是否显示星期
   * @isYear 设置返回字符串的结构是否显示年份
   * @isMonth 设置返回字符串的结构是否显示月份
   * @isDay 设置返回字符串的结构是否显示天数
   * @isHour 设置返回字符串的结构是否显示小时
   * @isMinute 设置返回字符串的结构是否显示分钟
   * @isSecon 设置返回字符串的结构是否显示秒数
   */
  getTime({
    chineseLowerCase = false,
    isweek = false,
    isYear = true,
    isMonth = true,
    isDay = true,
    isHour = true,
    isMinute = true,
    isSecon = true
  }) {
    let weeks;

    const date = new Date();
    const Year = date.getFullYear(),
    Month = date.getMonth() + 1,
    week = date.getDay(), 
    Day = date.getDate(),
    Hour = date.getHours(),
    Minute = date.getMinutes(),
    Secon = date.getSeconds();
    const weekArray = ["日", "一", "二", "三", "四", "五", "六"];
    const ArrayTime = [Year, this.zeroPadding(Month), this.zeroPadding(Day), this.zeroPadding(Hour), this.zeroPadding(Minute), this.zeroPadding(Secon)]

    // 设置 年/月/日/时/分/秒 返回的值
    let time = `
    <p class="time">
      ${isYear ? `<span class="Time-figures">${Year}</span> <span class="date">年</span>` : ""}
      ${isMonth ? `<span class="Time-figures">${this.zeroPadding(Month)}</span> <span class="date">月</span>` : ""}
      ${isDay ? `<span class="Time-figures">${this.zeroPadding(Day)}</span> <span class="date">日</span>` : ""}
      ${isweek ? `<span class="Time-figures">星${weekArray[week]}期</span>` : ""}
      ${isHour ? `<span class="Time-figures">${this.zeroPadding(Hour)}</span> <span class="date">时</span>` : ""}
      ${isMinute ? `<span class="Time-figures">${this.zeroPadding(Minute)}</span> <span class="date">分</span>` : ""}
      ${isSecon ? `<span class="Time-figures">${this.zeroPadding(Secon)}</span> <span class="date">秒</span>` : ""}
    </p>
    `;

    // 转化星期数字的类型
    if (chineseLowerCase) {
      weeks = weekArray[week];
    } else {
      weeks = week;
    }

    // 返回时间对象
    return {
      Year,
      Month,
      Day,
      Hour,
      Minute,
      Secon,
      weeks,
      ArrayTime,
      time
    }
  }

  /**
   * @n 小于 10 向前一位添加一个 0，用于时间补零 
   */
  zeroPadding(n) {
    return n < 10 ? `0${n}` : n;
  }
}

export default new Aftersoil;
