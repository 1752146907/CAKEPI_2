import dayjs from "dayjs";
import store from "../store";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import {
  createAddMessageAction,
  createSetLodingAction,
} from "../store/actions";
import relativeTime from "dayjs/plugin/relativeTime";
import BigNumber from "big.js";
export function toThousands(num: string) {
  let numArr = num.split(".");
  if (numArr.length > 1) {
    return parseFloat(numArr[0]).toLocaleString() + "." + numArr[1];
  } else {
    return parseFloat(numArr[0]).toLocaleString();
  }
}
//用户地址处理方法
export function AddrHandle(
  addr: string,
  start = 4,
  end = 4,
  replace = "..."
): string | undefined {
  if (!addr) {
    return;
  }
  let r = new RegExp("(.{" + start + "}).*(.{" + end + "})");
  let addrArr: RegExpMatchArray | null = addr.match(r);
  return addrArr![1] + replace + addrArr![2];
}
export function HowLongAgo(time: number) {
  dayjs.extend(relativeTime);
  var a = dayjs();
  return a.to(new Date(time));
}

export function GetQueryString(name: string) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  // console.log(window.location)
  var r = window.location.search.slice(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
}

export function JudgmentNumber(number: string) {
  let numArr = number.split(".");
  if (numArr.length > 1) {
    return numArr[1].length > 18;
  }
  return false;
}
// 不四舍五入
export function NumSplic(val: any, len: number = 6) {
  var f = parseFloat(val);
  if (isNaN(f)) {
    return false;
  }
  var s = val.toString();
  if (s.indexOf(".") > 0) {
    let f = s.split(".")[1].substring(0, len);
    s = s.split(".")[0] + "." + f;
  }
  var rs = s.indexOf(".");
  if (rs < 0) {
    rs = s.length;
    s += ".";
  }
  while (s.length <= rs + len) {
    s += "0";
  }
  return s;
}
// 不补0
export function NumSplic1(val: any, len: number = 6) {
  var f = parseFloat(val);
  if (isNaN(f)) {
    return false;
  }
  var s = val.toString();
  if (s.indexOf(".") > 0) {
    let f = s.split(".")[1].substring(0, len);
    s = s.split(".")[0] + "." + f;
  }
  return s;
}
// 截断小数（不四舍五入）
export function getBit(value: number, bit = 5) {
  let str = value.toString();
  let strIndex = str.indexOf(".");
  if (strIndex === -1) return str;
  str = str.substring(0, strIndex + bit);
  // console.log(str, bit);
  // console.log(typeof str,'getBit值')
  return str;
}

export function numberDivision() {}

export function showLoding(isShow: boolean) {
  store.dispatch(createSetLodingAction(isShow));
}

export function addMessage(msg: string) {
  store.dispatch(
    createAddMessageAction({
      message: msg,
      index: store.getState().message.length,
    })
  );
}
export function isApprove(price: number | string, Approve: string) {
  return new BigNumber(Approve).gte(price);
}
export function dateFormat(fmt: string, date: Date) {
  let ret;
  const opt: { [key: string]: string } = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
      );
    }
  }
  return fmt;
}
export function getFullNum(num: any) {
  //处理非数字
  if (isNaN(num)) {
    return num;
  }
  //处理不需要转换的数字
  var str = "" + num;
  if (!/e/i.test(str)) {
    return num;
  }
  return num.toFixed(18).replace(/\.?0+$/, "");
}

//订阅数据send模式
export function initWebSocket(
  url: string,
  subscribe: string,
  sendUrl: string,
  data: any,
  callback: any
) {
  let socket = new SockJS(url);
  const obj: any = {};
  obj.stompClient = Stomp.over(socket);
  obj.stompClient.connect(
    {},
    () => {
      obj.subscription = obj.stompClient.subscribe(subscribe, (data: any) => {
        var resdata = JSON.parse(data.body);
        callback(resdata);
      });
      obj.sendTimer = setInterval(() => {
        obj.stompClient.send(
          sendUrl,
          { "Content-Type": "application/json;charset=UTF-8" },
          JSON.stringify({ ...data })
        );
        console.log(data, sendUrl, "推送数据12");
      }, 2000);
    },
    function () {}
  );
  obj.stompClient.ws.onclose = function () {};
  return obj;
}
export function getWebsocketData(
  url: string,
  subscribe: string,
  callback: any
) {
  console.log(url, subscribe);
  var stompClient: any;
  var socket = new SockJS(url);
  stompClient = Stomp.over(socket);
  stompClient.connect(
    {},
    function () {
      stompClient.subscribe(subscribe, function (data: any) {
        console.log(data.body);
        callback(JSON.parse(data.body));
      });
    },
    function () {}
  );
  stompClient.ws.onclose = function () {};
  return stompClient;
}

export function startWord(name: string) {
  if (name.startsWith("/View")) return name.slice(5);
  return "";
}

//时间戳转日期的函数
export function timestampToDateString(timestamp: any) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const dateString = `${month}/${day} ${hours}:${minutes}`;
  return dateString;
}

// 把时间戳转为utc0时间戳
export function convertToLocalUtc0Timestamp(timeString: number): number {
  // 解析本地时间字符串
  const localDate = new Date(timeString);

  // 获取本地时间相对于 UTC 的偏移量（以分钟为单位）
  const offset = localDate.getTimezoneOffset();

  // 创建一个新的 Date 对象，表示 UTC 0 时区的时间
  const utc0Date = new Date(localDate.getTime() + offset * 60 * 1000);

  // 返回 UTC 0 时区的时间戳
  return utc0Date.getTime();
}

//input禁止输入中文
export function handleBeforeInput(event: any) {
  const regex = /[\u4e00-\u9fff]/;
  return regex.test(event);
}

export function formatTimestamp2(timestamp: number): string {
  const date = new Date(timestamp);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}·${day}`;
}

export function ToThousand(
  num: string | number,
  decimalPlaces?: number
): string {
  // 将输入转换为数字
  let parsedNum = typeof num === "string" ? parseFloat(num) : num;

  // 检查是否为有效数字
  if (isNaN(parsedNum)) {
    throw new Error("Invalid number");
  }

  // 如果指定了小数位数，则进行四舍五入
  if (decimalPlaces !== undefined) {
    parsedNum = parseFloat(parsedNum.toFixed(decimalPlaces));
  }

  // 处理负数
  const sign = parsedNum < 0 ? "-" : "";
  parsedNum = Math.abs(parsedNum);

  // 转换为字符串并分割整数和小数部分
  const parts = parsedNum.toString().split(".");
  const integerPart = parts[0];
  const decimalPart = parts[1];

  // 添加千位分隔符
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );

  // 组合整数和小数部分
  if (decimalPart) {
    return sign + formattedIntegerPart + "." + decimalPart;
  } else {
    return sign + formattedIntegerPart;
  }
}
