/**
 * Created by Coco on 2019/7/24.
 * 自适应缩放工具类
 * ui设计基准：
 * --iphone 6
 * --width:750
 * --height:1334
 */

/*
 设备的像素密度，例如：
 PixelRatio.get() === 1          mdpi Android 设备 (160 dpi)
 PixelRatio.get() === 1.5        hdpi Android 设备 (240 dpi)
 PixelRatio.get() === 2          iPhone 4, 4S,iPhone 5, 5c, 5s,iPhone 6,xhdpi Android 设备 (320 dpi)
 PixelRatio.get() === 3          iPhone 6 plus , xxhdpi Android 设备 (480 dpi)
 PixelRatio.get() === 3.5        Nexus 6
*/
import {
    Dimensions,
    PixelRatio,
} from 'react-native';

const BASAL_WIDTH = 375;               //iphone6的w: dp
const BASAL_HEIGHT = 667;              //iphone6的h: dp

const SCALE_UP_BOUND = 1.8;             // 最大放大倍数
const SCALE_DOWN_BOUND = 0.8;           // 最小放大倍数

const {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT
} = Dimensions.get('window');

let fontScale = PixelRatio.getFontScale();   //返回字体大小缩放比例


const scaleRatio = Math.min(DEVICE_WIDTH / BASAL_WIDTH, DEVICE_HEIGHT / BASAL_HEIGHT);   //获取缩放比例

const limit = function (scaleRatio) {
    if (scaleRatio < SCALE_DOWN_BOUND) return SCALE_DOWN_BOUND;
    if (scaleRatio > SCALE_UP_BOUND) return SCALE_UP_BOUND;
    return scaleRatio;
};

/**
 * 根据占屏比例缩放
 * @param {number} size - dp
 * return {number} size - dp
 */
export function scale(size){
  return Math.round(size * limit(scaleRatio));
}

/**
 * 根据占屏比例缩放, 并忽视系统字体缩放
 * @param {number} size - dp
 * return {number} size - dp
 */
export function scaleIgnoreSysScale(size){
    return Math.round((size * limit(scaleRatio)) / fontScale);
}