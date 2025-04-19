let weakMap = new WeakMap()
/**
 * 获取url参数
 * @param {string} paramName 参数
 */
export function getQueryParam(paramName) {
	const urlParams = new URLSearchParams(decodeURIComponent(window.location.search));
  return urlParams.get(paramName);
}