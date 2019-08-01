function formatStyle(stylesList, scalableItems, darkness) {
  if (Object.prototype.toString.call(scale) !== '[object Function]') {
    throw new Error(`scale is not a Function`);
  }

  if (Object.prototype.toString.call(stylesList) !== '[object Array]') {
    throw new Error(`stylesList is not an Array`);
  }
  // stylesList最后一项本身可能就是数组 需要flatten
  // 从右往左样式重写
  const formattedStyleList = [...stylesList];
  const stylesListLen = stylesList.length || 0;
  const scalableItemsLen = scalableItems.length || 0;
  const remainsSalableItems = [...scalableItems];
  for (let i = stylesListLen - 1; i >= 0; i--) {
    formattedStyleList[i] = formattedStyleList[i].color ? {...formattedStyleList[i], color: darken(formattedStyleList[i].color, darkness)} : {...formattedStyleList[i]};
    const style = formattedStyleList[i];
    for (let j = scalableItemsLen - 1; j >= 0; j--) {
      const styleProp = scalableItems[j];
      if (style.hasOwnProperty(styleProp)) {

        // 缩放
        style[styleProp] = scale(style[styleProp]);
        console.log(styleProp, 'styleProp')
        console.log(style, 190190)
        formattedStyleList[i] = style;
        remainsSalableItems.pop();

        // scalableItems样式全部被重写
        if(remainsSalableItems.length === 0) {
          return formattedStyleList;
        }
      }
    }
  }
}

function scale (f) {
  return f +'__scaled'
}

function darken (f) {
  return f +'__darken'
}

const a = formatStyle([{color: 'red', f: 1, p: 2}, {color: 'blue', f1: 3, p1: 4},], ['f1', 'p1']);

console.log(a, 123)