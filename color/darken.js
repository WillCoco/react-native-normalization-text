/**
 * 颜色加减亮度
 * 支持颜色格式：
 *    16进制：#000、#000000、#000000ff、0x000000ff
 *    rgb：rgb(0,0,0)、rgb(0,0,0,255)
 *    hsl：hsl(360,'50%','50%')
 *    hsl：hsl(360,'50%','50%')
 *    css3称谓颜色: red、brown
 * 支持增量格式：
 *    数值：-20、+20
 *    百分比：10%, -10%
 */

const normalizeColor = require('./normalizeColor');

const darken = function (color, darken) {
  if (!color || !darken) {
    return color;
  }


  // 转换 0x000000ff 格式
  const pColor = normalizeColor(color);

  if (pColor === undefined) {
    return color;
  }

  if (pColor === null) {
    return color;
  }

  if (/^\s*[-]?\d*\s*$/.test(darken)) {
    return darkenByNumber(pColor, darken);
  }

  if (/^\s*[-]?\d*\s*%\s*$/.test(darken)) {
    return darkenByPercent(pColor, darken)
  }
};

function darkenByNumber(pColor, darken) {
  const increment = getHexOpacity(pColor) + darken;
  const lightness = Math.round(Math.min(255, Math.max(0, increment)));
  return getHexValue(pColor) + lightness
}

function darkenByPercent(pColor, darken) {
  const value = parseInt(darken, 10) + 100;
  const percentValue = Math.round(getHexOpacity(pColor) * value / 100);

  const lightness = Math.min(255, Math.max(0, percentValue));
  return getHexValue(pColor) + lightness;
}

/**
 * 获取16进制颜色的最后两位opacity
 * @param {number} hexColor - 16进制颜色： 0x000000ff
 * @return {number} hexColorOpacity - 亮度： 0xff
 */
export function getHexOpacity(hexColor) {
  return parseInt((hexColor).toString(16).substr(-2), 16);
}

/**
 * 获取16进制颜色的前6位色值
 * @param {number} hexColor - 16进制颜色： 0x000000ff
 * @return {number} hexColor - 色值： 0x000000
 */
export function getHexValue(hexColor) {
  return parseInt(hexColor.toString(2).replace(/\d{8}$/, '00000000'), 2);
}

module.exports = darken;