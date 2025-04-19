import axois from "../utils/axiosExport";

// 转账
export function ccexWithdraw(data?: any) {
  return axois.request({
    url: `/trade/ccexWithdraw`,
    method: "POST",
    data: {
      ...data,
    },
  });
}
export function getCCexWithdrawRecord(data?: any) {
  return axois.request({
    url: `/trade/getCCexWithdrawRecord`,
    method: "get",
  });
}

export function ccrTrade(data?: any) {
  return axois.request({
    url: `/trade/ccexWithdraw`,
    method: "POST",
    data: {
      ...data,
    },
  });
}
// 获取cpb
export function cpbTrade(data?: any) {
  return axois.request({
    url: `/trade/cpbTrade`,
    method: "POST",
    data: {
      ...data,
    },
  });
}
export function getCpbRecord(data?: any) {
  return axois.request({
    url: `/trade/getCpbRecord`,
    method: "GET",
  });
}
// jpb配置
export function getJhbTradeBase(data?: any) {
  return axois.request({
    url: `/trade/getJhbTradeBase`,
    method: "GET",
  });
}
// 获取JHB兑换记录
export function getJhbExchangeRecord(data?: any) {
  return axois.request({
    url: `/trade/getJhbExchangeRecord`,
    method: "GET",
  });
}
// JHB兑换
export function jhbTrade(data?: any) {
  return axois.request({
    url: `/trade/jhbTrade`,
    method: "POST",
    data: {
      ...data,
    },
  });
}
// 获取CCEX交易配置
export function getCcexTradeBase(data?: any) {
  return axois.request({
    url: `/trade/getCcexTradeBase`,
    method: "GET",
  });
}
// CCR兑换
export function tradeCcrTrade(data?: any) {
  return axois.request({
    url: `/trade/ccrTrade`,
    method: "POST",
    data: {
      ...data,
    },
  });
}
// 获取CCR兑换记录
export function getCcrTradeRecord(data?: any) {
  return axois.request({
    url: `/trade/getCcrTradeRecord`,
    method: "GET",
  });
}

// 获取CCR交易配置
export function getCCRTradeBase(data?: any) {
  return axois.request({
    url: `/trade/getCcrTradeBase`,
    method: "GET",
  });
}
