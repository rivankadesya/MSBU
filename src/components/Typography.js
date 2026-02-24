import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/useTheme';

function BaseText({ weight = 'regular', size = 14, color, style, children, ...rest }) {
  const { colors } = useTheme();
  const fontWeight =
    weight === 'bold' ? '800' : weight === 'semibold' ? '700' : weight === 'medium' ? '600' : '400';

  return (
    <Text
      {...rest}
      style={[
        styles.base,
        { fontSize: size, fontWeight, color: color || colors.text },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

export function TextRegular(props) {
  return <BaseText {...props} weight="regular" />;
}

export function TextMedium(props) {
  return <BaseText {...props} weight="medium" />;
}

export function TextSemiBold(props) {
  return <BaseText {...props} weight="semibold" />;
}

export function TextBold(props) {
  return <BaseText {...props} weight="bold" />;
}

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
  },
});

