import { StyleSheet } from 'react-native';
import { scale, scaleIgnoreSysScale } from '../scale/index';

const colors = {
  dark: {
    title: 'rgba(0,0,0,0.85)',
    primary: 'rgba(0,0,0,0.65)',
    secondary: 'rgba(0,0,0,0.45)',
    disable: 'rgba(0,0,0,0.25)',
    border: 'rgba(0,0,0,0.15)',
    divides: 'rgba(0,0,0,0.09)',
    background: 'rgba(0,0,0,0.04)',
    tableHeader: 'rgba(0,0,0,0.02)'
  },
  light: {
    title: 'rgba(255,255,255,0.85)',
    primary: 'rgba(255,255,255,0.65)',
    secondary: 'rgba(255,255,255,0.45)',
    disable: 'rgba(255,255,255,0.25)',
    border: 'rgba(255,255,255,0.15)',
    divides: 'rgba(255,255,255,0.09)',
    background: 'rgba(255,255,255,0.04)',
    tableHeader: 'rgba(255,255,255,0.02)',
  }
};

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
  scalableStyle: ['fontSize', 'lineHeight'],
  forbidSysFontScale: true,
  sizes: {
    h1: 36,
    h2: 34,
    p1: 16
  },
  colors: {
    red: 'red',
    hsl: 'hsl(360, 50%, 50%)'
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