import React, {FC} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {colors} from 'theme';
import Icons from 'assets/icons';

const HealthLogo = require('assets/images/healthStateLogo/image.png');

export const Loading: FC = () => {
  const insets = useSafeArea();

  return (
    <View style={[styles.container, {paddingBottom: insets.bottom}]}>
      <View style={styles.appLogo}>
        <Icons.LogoLaunch width={242} height={242} fill={colors.white} />
      </View>
      <View style={styles.stateLogo}>
        <Image accessibilityIgnoresInvertColors source={HealthLogo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.purple
  },
  appLogo: {
    position: 'absolute',
    top: 121,
    left: 0,
    right: 0,
    alignItems: 'center'
  },
  stateLogo: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center'
  }
});
