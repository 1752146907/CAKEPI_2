import axois from "../utils/axiosExport";
// 获取CCEX价值信息
export function getProductBaseList(data?: any) {
  return axois.request({
    url: `/product/getProductBaseList/${data}`,
    method: "GET",
  });
}
// 获取购买产品
export function buyProduct(data: any) {
  return axois.request({
    url: `/product/buyProduct`,
    method: "post",
    data: {
      ...data,
    },
  });
}
// 获取购买产品记录 type = 1实物，=2NFT
export function getProductBuyRecord(type?: any) {
  return axois.request({
    url: `/product/getProductBuyRecord/${type}`,
    method: "GET",
  });
}
// 获取NFT总收益信息
export function getNftEarnInfo(type?: any) {
  return axois.request({
    url: `/product/getNftEarnInfo`,
    method: "GET",
  });
}
// 获取NFT收益记录
export function getNftEarnRecord(type?: any) {
  return axois.request({
    url: `/product/getNftEarnRecord`,
    method: "GET",
  });
}
