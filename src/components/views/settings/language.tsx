import React from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import * as SecureStore from 'expo-secure-store';

import {Scrollable} from 'components/templates/scrollable';
import {supportedLocales} from 'services/i18n/common';
import {Markdown} from 'components/atoms/markdown';
import {SelectList} from 'components/atoms/select-list';
import {Spacing} from 'components/atoms/layout';

interface LanguageType {
  value: string;
  label: string;
}

export const Language = () => {
  const {t, i18n} = useTranslation();

  const languages: LanguageType[] = Object.entries(supportedLocales).map(
    ([langCode, langData]) => ({
      value: langCode,
      label: langData.name
    })
  );

  const currentLanguage = languages.find(({value}) => value === i18n.language);

  return (
    <Scrollable heading={t('languageSettings:title')}>
      <View>
        <Markdown>{t('languageSettings:intro')}</Markdown>
      </View>
      <Spacing s={20} />
      <SelectList
        items={languages}
        selectedValue={currentLanguage!.value}
        onItemSelected={(lang) => {
          SecureStore.setItemAsync('appLanguage', lang);
          i18n.changeLanguage(lang);
        }}
      />
    </Scrollable>
  );
};
