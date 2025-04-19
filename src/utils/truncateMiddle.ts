// 地址格式化：截取字符串中间部分，并添加省略号
export function truncateMiddle(str: any, pull?: number, push?: number) {
  const maxLength = pull ? pull : 8; // 前后总共截取的字符数
  const frontLength = push ? push : 4; // 前面截取的字符数

  if (!str) {
    return;
  }

  if (str.length <= maxLength) {
    return str; // 如果字符串长度小于等于最大长度，直接返回原字符串
  }

  const frontPart = str.slice(0, maxLength); // 截取前4位
  const backPart = str.slice(-frontLength); // 截取后4位

  return `${frontPart}...${backPart}`; // 拼接前后部分及省略号
}
