import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {useExposure} from 'react-native-exposure-notification-service';

import {colors, text} from 'theme';
import {Card} from 'components/atoms/card';
import {StateIcons} from 'assets/icons';

export const CloseContactWarning: FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {contacts} = useExposure();

  return (
    <Card
      padding={{h: 10, r: 16}}
      onPress={() => navigation.navigate('closeContact')}
      type="warning">
      <View style={styles.row}>
        <StateIcons.ExposureAlert width={40} height={40} color={colors.white} />
        <Text style={styles.notice}>
          {t('closeContactWarn:notice', {
            count: (contacts && contacts.length) || 0
          })}
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  notice: {
    ...text.defaultBold,
    color: colors.white,
    paddingRight: 35,
    paddingLeft: 10
  }
});
