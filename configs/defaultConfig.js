import { StyleSheet } from 'react-native';
import { scale, scaleIgnoreSysScale } from '../scale/index';


const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: colors.dark.title,
    lineHeight: 32
  },
  secondaryTitle: {
    fontSize: 20,
    color: colors.dark.title,
    lineHeight: 28
  },
  tertiaryTitle: {
    fontSize: 16,
    color: colors.dark.title,
    lineHeight: 24
  },
  primaryText: {
    fontSize: 14,
    color: colors.dark.primary,
    lineHeight: 22
  },
  secondaryText: {
    fontSize: 12,
    color: colors.dark.secondary,
    lineHeight: 20
  },
  captionText: {
    fontSize: 10,
    color: colors.dark.caption,
    lineHeight: 18
  }
});

const config = {
  scale,
  scalableItems: ['fontSize', 'lineHeight'],
  sizes: {
    huge: 36,
    xxxLarger: 24,
    xxLarge: 20,
    xLarge: 18,
    large: 16,
    normal: 14,
    small: 12,
    tiny: 10,
  },
  colors: {
    title: "rgba(0,0,0,0.85)",
    primary: "rgba(0,0,0,0.65)",
    secondary: "rgba(0,0,0,0.45)",
    disabled: "rgba(0,0,0,0.25)",
    border: "rgba(0,0,0,0.15)",
    dividers: "rgba(0,0,0,0.09)",
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
  },
  categories: {
    PrimaryTitle: {
      props: {scalableItems: ['fontSize', 'lineHeight']},
      style: styles.title
    },
    SecondaryTitle: {
      props: {},
      style: styles.secondaryTitle
    },
    TertiaryTitle: {
      props: {},
      style: styles.tertiaryTitle
    },
    PrimaryText: {
      props: {},
      style: styles.primaryText
    },
    SecondaryText: {
      props: {},
      style: styles.secondaryText
    },
    CaptionText: {
      props: {},
      style: styles.captionText
    }
  }
};

export default config;