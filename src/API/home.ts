import axois from "../utils/axiosExport";

// banner
export function getBannerList(data?: any) {
  return axois.request({
    url: `/home/getBannerList`,
    method: "GET",
    data: {
      ...data,
    },
  });
}
// 公告列表
export function getNoticeList(data?: any) {
  return axois.request({
    url: `/home/getNoticeList`,
    method: "GET",
    data: {
      ...data,
    },
  });
}
// 公告详情
export function getNoticeDetail(type?: any) {
  return axois.request({
    url: `/home/getNoticeDetail/${type}`,
    method: "GET",
  });
}
// 获取CCEX价值信息
export function getCcexValueInfo(data?: any) {
  return axois.request({
    url: `/home/getCcexValueInfo`,
    method: "GET",
    data: {
      ...data,
    },
  });
}
// 获取热门产品
export function getHotProductList(data?: any) {
  return axois.request({
    url: `/home/getHotProductList`,
    method: "GET",
    data: {
      ...data,
    },
  });
}
// 获取币种信息
export function getCoinInfo(coinName?: any) {
  return axois.request({
    url: `/home/getCoinInfo/${coinName}`,
    method: "GET",
  });
}
// 获取CCR价格K线数据
export function getCcrPriceHistory(type?: any) {
  return axois.request({
    url: `/home/getCcrPriceHistory/${type}`,
    method: "GET",
  });
}
// 获取CCEX价格K线数据
export function getCCEXPriceHistory(type?: any) {
  return axois.request({
    url: `/home/getCcexPriceHistory/${type}`,
    method: "GET",
  });
}
// 获取支持转账币种
export function getTransferCoin(type?: any) {
  return axois.request({
    url: `/transfer/getTransferCoin`,
    method: "GET",
  });
}
// 获取转账记录
export function getTransferRecord(type?: any) {
  return axois.request({
    url: `/transfer/getTransferRecord`,
    method: "GET",
  });
}
// 转账
export function handleTransfer(data?: any) {
  return axois.request({
    url: `/transfer/transfer`,
    method: "POST",
    data: {
      ...data,
    },
  });
}
// 获取用户签到记录
export function getUserSignRecord(type?: any) {
  return axois.request({
    url: `/home/getUserSignRecord`,
    method: "GET",
  });
}
// 判断用户今天是否签到
export function isUserSign(type?: any) {
  return axois.request({
    url: `/home/isUserSign`,
    method: "GET",
  });
}
// 用户签到
export function handleUserSignIn(data?: any) {
  return axois.request({
    url: `/home/userSignIn`,
    method: "POST",
    data: {
      ...data,
    },
  });
}
// 获取邀请链接信息
export function getRefereeLinkInfo(type?: any) {
  return axois.request({
    url: `/user/getRefereeLinkInfo`,
    method: "GET",
  });
}
// 更新安置码
export function updatePlacementCode(data?: any) {
  return axois.request({
    url: `/user/updatePlacementCode`,
    method: "POST",
    data: {
      ...data,
    },
  });
}

// 新的
export function getMintBaseList(type?: any) {
  return axois.request({
    url: `/mint/getMintBaseList`,
    method: "GET",
  });
}
export function getNftInfo(data?: any) {
  return axois.request({
    url: `/mint/mint`,
    method: "POST",
    data: {
      ...data,
    },
  });
}
