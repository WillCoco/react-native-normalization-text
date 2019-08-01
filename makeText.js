import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { scale } from './scale';
import darken from './color/darken';

// 默认需要scale的属性
const defaultScalableItems = ['fontSize', 'lineHeight'];

export default function makeText(defaultProps, defaultStyle, sizes, colors, scalableItems) {
    return function (props) {
        //  color, size映射
        let propsStyle = {};
        if (props.size) {
            if (sizes && sizes[props.size]) {
                propsStyle.fontSize = sizes[props.size];
            } else {
                throw new Error(`未匹配到texts.sizes:${sizes[props.size]}`);
            }
        }
        if (props.color) {
           if (sizes && colors[props.color]) {
               propsStyle.color = sizes[props.color];
           } else {
               throw new Error(`未匹配到texts.colors:${sizes[props.color]}`);
           }
        }

        // 可缩放属性定义优先级 props.scalableItems > config.h1.scalableItems > config.scalableItems > defaultScalableItems
        const finalScalableItems =
            (props && props.scalableItems) ||
            (defaultProps && defaultProps.scalableItems) ||
            scalableItems ||
            defaultScalableItems;

        // darken属性定义优先级
        const darkness = (props && props.darkness);

        const formattedStyle = formatStyle([defaultStyle, propsStyle, props.style], finalScalableItems, darkness);

        return (
            <Text
                {...defaultProps}
                {...props}
                style={formattedStyle}
            />
        )
    }
}

/**
 * 将指定属性进行缩放
 * @param {Array} stylesList - 样式列表
 * @param {Array} scalableItems - 需要被放大的样式名称列表
 * @param {number} darkness - 颜色增益
 * @return {Array} style - 缩放\颜色该改变之后的样式
 */
function formatStyle(stylesList, scalableItems, darkness) {
    if (Object.prototype.toString.call(scale) !== '[object Function]') {
        throw new Error(`scale is not a Function`);
    }
    return stylesList.map((style) => {
        if (!style) {
              return style;
        }
        // 颜色亮度修改
        style = style.color ? {...style, color: darken(style.color, darkness)} : {...style};

        // 大小缩放
        scalableItems.forEach(styleProp => {
          if (style.hasOwnProperty(styleProp)) {
            style[styleProp] = scale(style[styleProp])
          }
        });
      return style;
    })
}

function formatStyle(stylesList, scalableItems, darkness) {
    if (Object.prototype.toString.call(scale) !== '[object Function]') {
        throw new Error(`scale is not a Function`);
    }

   if (Object.prototype.toString.call(stylesList) !== '[object Array]') {
      throw new Error(`stylesList is not an Array`);
   }

   // 从右往左样式重写
   const formattedStyle = [];
   const stylesListLen = stylesList.length || 0;
   const remainStyles = [...stylesList];
   for (let i = stylesListLen - 1; i >= 0; i--) {
     const style = stylesList[i].color ? {...stylesList[i], color: darken(stylesList[i].color, darkness)} : {...stylesList[i]};

     scalableItems.forEach(styleProp => {
       if (style.hasOwnProperty(styleProp)) {
         // 缩放
         style[styleProp] = scale(style[styleProp]);

         formattedStyle.push(style);
         remainStyles.pop();

         // scalableItems样式全部被重写
         if(remainStyles.length === 0) {
           return formattedStyle;
         }
       }
     });
   }
}