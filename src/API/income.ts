import axois from "../utils/axiosExport";

// 获取团队详情
export function getTeamInfoDetail(type?: any) {
  return axois.request({
    url: `/earn/getTeamInfoDetail`,
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
// 获取团队收益记录
export function getRefereeEarnRecord(type?: any) {
  return axois.request({
    url: `/earn/getRefereeEarnRecord`,
    method: "GET",
  });
}
// 获取动态出局额度
export function getDynamicValue(type?: any) {
  return axois.request({
    url: `/product/getDynamicValue`,
    method: "GET",
  });
}
