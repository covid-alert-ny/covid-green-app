import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {ScreenNames} from 'navigation';
import {useFocusRef} from 'hooks/accessibility';

import {Button} from 'components/atoms/button';
import {Spacing} from 'components/atoms/layout';

import {colors, text} from 'theme';
import Icons from 'assets/icons';
import {SPACING_HORIZONTAL} from 'constants/shared';
import {useRtl} from 'hooks/i18n';

const HealthLogo = require('assets/images/healthStateLogo/image.png');

export const AgeCheck: FC<{}> = () => {
  const {t} = useTranslation();
  const nav = useNavigation();
  const insets = useSafeAreaInsets();
  const [ref] = useFocusRef({accessibilityRefocus: true, timeout: 1250});
  useRtl();

  return (
    <View style={[style.container, {paddingTop: insets.top}]}>
      <View style={style.page}>
        <View
          testID="onboarding:age-check:header-logo"
          style={style.appLogoWrapper}
          accessible
          accessibilityRole="image"
          accessibilityLabel={t('common:longName')}>
          <Icons.Logo width={106} height={121} />
        </View>
        <View style={style.flexSpacer} />
        <View style={style.contentWrapper}>
          <Text
            style={style.text}
            maxFontSizeMultiplier={1.3}
            ref={ref}
            testID="onboarding:age-check:description">
            {t('ageCheck:intro')}
          </Text>
          <Spacing s={20} />
          <Button
            type="empty"
            width="100%"
            fontSizeMultiplier={1.3}
            testID="onboarding:age-check:button:confirm"
            onPress={() => nav.navigate(ScreenNames.Introduction)}>
            {t('ageCheck:confirm')}
          </Button>
        </View>
        <View style={style.flexSpacer} />
        <View style={style.flexSpacer} />
      </View>
      <View
        testID="onboarding:age-check:footer-logo"
        style={style.stateLogoWrapper}>
        <Image accessibilityIgnoresInvertColors source={HealthLogo} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.purple,
    paddingBottom: 30
  },
  page: {
    flexGrow: 1
  },
  appLogoWrapper: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  contentWrapper: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingHorizontal: SPACING_HORIZONTAL
  },
  flexSpacer: {
    flex: 1
  },
  text: {
    ...text.xlarge,
    color: colors.white
  },
  stateLogoWrapper: {
    alignItems: 'center'
  }
});
