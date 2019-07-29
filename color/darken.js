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
  console.log(pColor.toString(16), '转换前')

  if (pColor === undefined) {
    return color;
  }

  if (pColor === null) {
    return color;
  }
  console.log(pColor, 'normalizeColor')
  console.log(/^\s*[-]?\d*\s*$/.test(darken), darken, 77777701)

  if (/^\s*[-]?\d*\s*$/.test(darken)) {
    return darkenByNumber(pColor, darken);
  }

  if (/^\s*[-]?\d*\s*%\s*$/.test(darken)) {
    const v = darkenByPercent(pColor, darken)
    console.log(v.toString(16), '转换后')
    return v;
  }
};

function darkenByNumber(pColor, darken) {
  const increment = getHexOpacity(pColor) + darken;
  const lightness = Math.round(Math.min(255, Math.max(0, increment)));
  return getHexValue(pColor) + lightness
}

function darkenByPercent(pColor, darken) {
  const value = parseInt(darken, 10) + 100;
  console.log(value, 'getHexOpacity(pColor)')
  const percentValue = Math.round(getHexOpacity(pColor) * value / 100);
  console.log(getHexOpacity(pColor), '获取后两位')

  const lightness = Math.min(255, Math.max(0, percentValue));
  console.log(lightness, '获取后两位++')
  return getHexValue(pColor) + lightness;
}

/**
 * 获取16进制颜色的最后两位opacity
 * @param {number} hexColor - 16进制颜色： 0x000000ff
 * @return {number} hexColorOpacity - 亮度： 0xff
 */
function getHexOpacity(hexColor) {
  return hexColor << 24 >>> 24;
}

/**
 * 获取16进制颜色的前6位色值
 * @param {number} hexColor - 16进制颜色： 0x000000ff
 * @return {number} hexColor - 色值： 0x000000
 */
function getHexValue(hexColor) {
  console.log(hexColor.toString(16), 7777779)
  console.log(hexColor.toString(2), 7777779)
  console.log((hexColor >>> 8).toString(2), 7777779)
  console.log((hexColor >>> 8 << 8).toString(2), 7777779)
  return Math.abs(hexColor >>> 8 << 8);
}

module.exports = darken;