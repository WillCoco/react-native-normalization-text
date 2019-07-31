# react-native-normalization-text
react-native 字体大小、样式规范化管理，自适应缩放组件。

## 功能介绍
    
**字体缩放**

根据不同设备屏幕尺寸调整字体大小，可自定义缩放规则，默认缩放见效果：

**字体管理**

一次配置（或者使用默认配置），不在app中到处书写字体样式，也促进UI设计输出规范的字体。


## 安装

    npm install react-native-normaliztion-text --save
    
 或者使用yarn
 
    yarn add react-native-normaliztion-text 

## 使用
    
    import Text from 'react-native-normalization-text';  
    ...
    
    // jsx
    <Text>不带自定义样式的Text<Text>
    <Text.H1>带h1预设样式、props的Text<Text.H1>
    
    // 接受RN中Text的属性和配置中映射的size、color属性
    <Text size="large" color="danger" style={{...}}>带h2预设样式、props的Text<Text>
    
   
Text除了rn提供的属性，新添以下属性:

| props         | type                 | 描述             | 
| ---           | ---                  | ---              |
| scalableItems | Array&lt;string&gt;       | 参与缩放的属性。例：['fontSize', 'paddingLeft']  |
| size          | Number               | 字体大小。默认配置或者自定义配置中sizes的key       |
| color         | Number &#124; String | 字体颜色。默认配置或者自定义配置中colors的key      |
| darkness      | Number &#124; String | 颜色亮加深/减弱。支持数字或者百分比。例：<br>加深100亮度值：darkness={100} <br>减少10%亮度值: darkness="-10%" |
   
   
## 更多配置
 
#### 默认配置：

| 配置项         | type                 | 描述  		     | 默认值                         |
| ---           | ---                  | ---              | ---                          |
| scale         | Function             | 字体缩放方法       | 见defaultConfig.scale        |
| scalableItems | Array&lt;string&gt;  | 参与缩放的属性  | \['fontSize', 'lightHeight']    |
| sizes         | Object               | 罗列所有字号，sizes\[key]的key映射为Text的fontSize样式。例：配置了sizes: {big: 36}，则可使用&lt;Text size="big" /&gt;                    | 见defaultConfig.sizes            |
| colors        | Object          | 罗列所有字体颜色，类似sizes，colors\[key]的key映射为Text的color样式。例：配置了colors: {danger: 'red'}，则可使用 &lt;Text size="big" /&gt; | 见defaultConfig.colors          |
| categories    | Object          | 分级字体。比如在categories中预设H1,则可以使用&lt;Text.H1 /&gt;                                                                               | 见defaultConfig.categories      |


#### 默认sizes规范：

| name      | value |
| ---       | ---   |
| huge      | 36    |
| xxxLarger | 24    |
| xxLarger  | 20    |
| xLarger   | 18    |
| lager     | 16    |
| normal    | 14    |
| small     | 12    |
| tiny      | 10    |

#### 默认colors规范：

| name  | value |
| ---       | ---                    |
| title     | rgba(0,0,0,0.85)       |
| primary   | rgba(0,0,0,0.65)       |
| secondary | rgba(0,0,0,0.45)       |
| disabled  | rgba(0,0,0,0.25)       |
| border    | rgba(0,0,0,0.15)       |
| dividers  | rgba(0,0,0,0.09)       |
| white     | rgb(255,255,255)       |
| grey1     | rgba(255,255,255,0.85) |
| grey2     | rgba(255,255,255,0.65) |
| grey3     | rgba(255,255,255,0.45) |
| grey4     | rgba(255,255,255,0.25) |
| grey5     | rgba(255,255,255,0.15) |
| grey6     | rgba(255,255,255,0.09) |
| success   | \#52c41a               |
| warning   | \#faad14               |
| error     | \#ff190c               |


#### 默认可用字体：
  - H1
  - H2
  - H3
  - H4
  - PrimaryText
  - SmallText
  - TinyText
 
#### 自定义配置：

1.在项目根目录执行[初始化脚本](#脚本)，或者在根目录手动新建新建 **text.config.js**
2.根据自身需求配置需要调整的配置项，可以只修改你需要修改的配置项，其余的默认配置项仍会起作用。
3.在项目根目录下执行 [更新脚本](#脚本)让自定义配置生效，或者使用[重置脚本](#脚本)恢复默认配置。

#### 脚本

| script                                                              | 描述         |
| ---                                                                 | ---          |
| node node_modules/react-native-norma/scripts/makeConfig.js --init   | 初始化配置文件 |
| node node_modules/react-native-norma/scripts/makeConfig.js --update | 读取自定义脚本 |
| node node_modules/react-native-norma/scripts/makeConfig.js --reset  | 重置成默认脚本 |

可以将脚本添加至***package.json***的script字段中，方便调用。
 
#### 样式优先级：
    
jsx中style样式 > jsx中color、size属性映射样式 > config.categories.h1.style

#### 属性配置优先级(scalableItems)：

jsx中scalableItems > config.categories.h1.props.scalableItems > config.scalableItems

####  配置文件引用依赖：

配置文件支持引用项目中的依赖，支持 require('..') 和 import res from '..'两种形式，比如在需要引用项目中的样式：

    // text.config.js
    import colors from '../../Theme/colors';
    import scale from '../../Theme/fontScale';
    
    module.exports = {
        scale
        colors: {
            primary: colors.primary,
            success: colors.success,
            error: colors.error
        }
    };
    


#### 颜色支持：

同[React Native](https://reactnative.cn/docs/colors/)支持的颜色格式

