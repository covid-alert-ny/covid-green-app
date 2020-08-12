import React, {useState, useRef} from 'react';
import {Text, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useApplication} from 'providers/context';
import {useSettings} from 'providers/settings';
import {useSymptomChecker} from 'hooks/symptom-checker';

import {Spacing, Separator} from 'components/atoms/layout';
import {Button} from 'components/atoms/button';
import {Dropdown} from 'components/atoms/dropdown';
import {Toast} from 'components/atoms/toast';
import {Basic} from 'components/templates/basic';
import {Scrollable} from 'components/templates/scrollable';
import {text, colors} from 'theme';
import {AppIcons} from 'assets/icons';

interface ProfileData {
  gender: string;
  race: string;
  ethnicity: string;
  ageRange: string;
  county: string;
  saved: boolean;
}

interface CheckInSettingsProps {
  navigation: any;
}

export const CheckInSettings: React.FC<CheckInSettingsProps> = ({
  navigation
}) => {
  const {t} = useTranslation();
  const {
    genderOptions,
    raceOptions,
    ethnicityOptions,
    ageRangeOptions,
    countiesOptions
  } = useSettings();
  const app = useApplication();
  const {getNextScreen} = useSymptomChecker();

  const scrollViewRef = useRef<ScrollView>(null);

  const {
    gender = '',
    race = '',
    ethnicity = '',
    ageRange = '',
    county = ''
  } = app.user!;

  const [profile, setProfile] = useState<ProfileData>({
    gender,
    race,
    ethnicity,
    ageRange,
    county,
    saved: false
  });
  const [searchTerm, setSearchTerm] = useState<string>('');

  const counties = !searchTerm
    ? countiesOptions
    : countiesOptions.filter(
        ({label}) =>
          label && label.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const handleSave = () => {
    app.setContext({
      user: {
        ...app.user,
        ...profile
      }
    });
    setProfile((s) => ({...s, saved: true}));
    scrollViewRef.current?.scrollTo({x: 0, y: 0, animated: true});
  };

  if (!gender || !race || !ethnicity || !ageRange || !county) {
    return (
      <Basic heading={t('checkInSettings:title')}>
        <Text style={text.largeBold}>{t('checkInSettings:checkInFirst')}</Text>
        <Spacing s={48} />
        <Button
          type="empty"
          onPress={() =>
            navigation.navigate('symptoms', {screen: getNextScreen()})
          }>
          {t('checkInSettings:gotoCheckIn')}
        </Button>
      </Basic>
    );
  }

  const successToast = profile.saved && (
    <Toast
      type="success"
      icon={<AppIcons.Success width={24} height={24} color={colors.success} />}
      message={t('common:changesUpdated')}
    />
  );

  return (
    <Scrollable
      toast={successToast}
      heading={t('checkInSettings:title')}
      scrollViewRef={scrollViewRef}>
      <Text style={text.largeBold}>{t('checkInSettings:intro')}</Text>
      <Spacing s={16} />
      <Dropdown
        label={t('gender:label')}
        placeholder={t('gender:placeholder')}
        items={genderOptions}
        value={profile.gender}
        onValueChange={(value) =>
          setProfile({...profile, saved: false, gender: value})
        }
      />
      <Separator />
      <Dropdown
        label={t('race:label')}
        placeholder={t('race:placeholder')}
        items={raceOptions}
        value={profile.race}
        onValueChange={(value) =>
          setProfile({...profile, saved: false, race: value})
        }
      />
      <Separator />
      <Dropdown
        label={t('ethnicity:label')}
        placeholder={t('ethnicity:placeholder')}
        items={ethnicityOptions}
        value={profile.ethnicity}
        onValueChange={(value) =>
          setProfile({...profile, saved: false, ethnicity: value})
        }
      />
      <Separator />
      <Dropdown
        label={t('ageRange:label')}
        placeholder={t('ageRange:placeholder')}
        items={ageRangeOptions}
        value={profile.ageRange}
        onValueChange={(value) =>
          setProfile({...profile, saved: false, ageRange: value})
        }
      />
      <Separator />
      <Dropdown
        label={t('county:label')}
        placeholder={t('county:placeholder')}
        items={counties}
        value={profile.county}
        search={{
          placeholder: t('county:searchPlaceholder'),
          term: searchTerm,
          onChange: setSearchTerm,
          noResults: t('county:noResults')
        }}
        onValueChange={(value) =>
          setProfile({...profile, saved: false, county: value})
        }
      />
      <Spacing s={24} />
      <Button
        disabled={
          profile.gender === gender &&
          profile.race === race &&
          profile.ethnicity === ethnicity &&
          profile.ageRange === ageRange &&
          profile.county === county
        }
        onPress={handleSave}>
        {t('common:confirmChanges')}
      </Button>
    </Scrollable>
  );
};
