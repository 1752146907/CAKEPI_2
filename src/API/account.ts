import axois from "../utils/axiosExport";

// 获取邀请列表
export function getRefereeList(type?: any) {
  return axois.request({
    url: `/user/getRefereeList`,
    method: "GET",
  });
}
// 根据币种名称获取资产信息
export function getUserAccountInfo(name?: any) {
  return axois.request({
    url: `/user/getUserAccountInfo/${name}`,
    method: "GET",
  });
}
// 获取邀请列表
export function getUserInfo(type?: any) {
  return axois.request({
    url: `/user/getUserInfo`,
    method: "GET",
  });
}
// 获取好友列表
export function getUserAccountList(data?: any) {
  return axois.request({
    url: `/user/getFriendList`,
    method: "POST",
    data: {
      ...data,
    },
  });
}
// 获取产品收益信息
export function getSubscriptionRecord(type?: any) {
  return axois.request({
    url: `/user/getSubscriptionRecord`,
    method: "GET",
  });
}
// 获取邀请收益信息
export function getRefereeEarnInfo(type?: any) {
  return axois.request({
    url: `/earn/getRefereeEarnInfo`,
    method: "GET",
  });
}
// 获取团队收益信息
export function getTeamEarnInfo(type?: any) {
  return axois.request({
    url: `/earn/getTeamEarnInfo`,
    method: "GET",
  });
}
// 获取产品收益记录
export function getProductEarnRecord(type?: any) {
  return axois.request({
    url: `/earn/getProductEarnRecord`,
    method: "GET",
  });
}
// 获取推荐收益记录
export function getRefereeEarnRecord(type?: any) {
  return axois.request({
    url: `/earn/getRefereeEarnRecord`,
    method: "GET",
  });
}
// 获取团队收益记录
export function getTeamEarnRecord(type?: any) {
  return axois.request({
    url: `/earn/getTeamEarnRecord`,
    method: "GET",
  });
}

// 获取提现币种列表
export function getWithdrawCoin(type?: any) {
  return axois.request({
    url: `/trade/getWithdrawCoin`,
    method: "GET",
  });
}
// 提现
export function handleTransfer(data?: any) {
  return axois.request({
    url: `/trade/userWithdraw`,
    method: "POST",
    data: {
      ...data,
    },
  });
}
// 获取资产详情，根据币种查询
export function getUserAccountDetail(name?: any) {
  return axois.request({
    url: `/user/getUserAccountDetail/${name}`,
    method: "GET",
  });
}

// 获取账户奖励信息
export function getAwardUserAccountList(name?: any) {
  return axois.request({
    url: `/user/getAwardUserAccountList`,
    method: "GET",
  });
}
// 获取账户奖励详情 1-团队 2-周补助
export function getAwardUserAccountInfo(name?: any) {
  return axois.request({
    url: `/user/getAwardUserAccountInfo/${name}`,
    method: "GET",
  });
}
// 获取奖励信息历史记录
export function getUserAccountRecord(data?: any) {
  return axois.request({
    url: `/user/getUserAccountRecord`,
    method: "POST",
    data: {
      ...data,
    },
  });
}
// 领取
export function handleDrawAward(data?: any) {
  return axois.request({
    url: `/user/drawAward`,
    method: "POST",
    data: {
      ...data,
    },
  });
}
