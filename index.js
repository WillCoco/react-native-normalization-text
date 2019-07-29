import config from './configs/config';
import makeText from './makeText';
import packageJson from './package';

const RNText = init();

function init() {
    const { scale, categories = {}, colors, sizes } = config || {};

    // 默认RNText.Text
    const RNText = {
        _Text: makeText(undefined, undefined, sizes, colors),
        get Text () {
            return RNText._Text;
        },
        set Text (Text) {
            this._Text = Text;
        }
    };

    // 自适应缩放工具
    RNText.scale = scale;

    // 添加分级样式
    const textKeys = Object.keys(categories);
    if (textKeys.length <= 0) {
        throw new Error(`${packageJson.name} error: 'configs/config' invalid!`)
    }
    Object.keys(categories).forEach((text) => {
        if (categories.hasOwnProperty(text)) {
            const {props: defaultProps, style: defaultStyle, scalableItems} = categories[text] || {};
            RNText[text] = makeText(defaultProps, defaultStyle, sizes, colors, scalableItems)
        }
    });
    return RNText;
}

module.exports = RNText;