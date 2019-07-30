import { StyleSheet } from 'react-native';
import { scale, scaleIgnoreSysScale } from '../scale/index';

const sizes = {
  huge: 36,
  xxxLarger: 24,
  xxLarge: 20,
  xLarge: 18,
  large: 16,
  normal: 14,
  small: 12,
  tiny: 10,
};

const colors = {
  title: "rgba(0,0,0,0.85)",
  primary: "rgba(0,0,0,0.65)",
  secondary: "rgba(0,0,0,0.45)",
  dark1: "rgba(0,0,0,0.25)",
  dark2: "rgba(0,0,0,0.15)",
  dark3: "rgba(0,0,0,0.09)",
  white: "rgb(0,0,0)",
  grey1: "rgba(255,255,255,0.85)",
  grey2: "rgba(255,255,255,0.65)",
  grey3: "rgba(255,255,255,0.45)",
  grey4: "rgba(255,255,255,0.25)",
  grey5: "rgba(255,255,255,0.15)",
  grey6: "rgba(255,255,255,0.09)",
  success: "#52c41a",
  warning: "#faad14",
  error: "#ff190c",
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    color: colors.title,
    lineHeight: 40
  },
  h2: {
    fontSize: 24,
    color: colors.title,
    lineHeight: 32
  },
  h3: {
    fontSize: 20,
    color: colors.title,
    lineHeight: 28
  },
  h4: {
    fontSize: 16,
    color: colors.title,
    lineHeight: 24
  },
  primaryText: {
    fontSize: 14,
    color: colors.primary,
    lineHeight: 22
  },
  smallText: {
    fontSize: 12,
    color: colors.secondary,
    lineHeight: 20
  },
  tinyText: {
    fontSize: 10,
    color: colors.dark3,
    lineHeight: 18
  }
});

const config = {
  scale,
  scalableItems: ['fontSize', 'lineHeight'],
  sizes,
  colors,
  categories: {
    H1: {
      style: styles.h1
    },
    H2: {
      style: styles.h2
    },
    H3: {
      style: styles.h3
    },
    H4: {
      style: styles.h4
    },
    PrimaryText: {
      style: styles.primaryText
    },
    SmallText: {
      style: styles.smallText
    },
    TinyText: {
      style: styles.tinyText
    }
  }
};

export default config;