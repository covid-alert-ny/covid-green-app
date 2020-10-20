import React, {FC, useState, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  I18nManager,
  ViewStyle
} from 'react-native';
import Video from 'react-native-video';
import {useSafeArea} from 'react-native-safe-area-context';
import ViewPager from '@react-native-community/viewpager';

import {useFocusRef, setAccessibilityFocusRef} from 'hooks/accessibility';

import {Markdown} from 'components/atoms/markdown';

import {colors, text} from 'theme';
import {AppIcons} from 'assets/icons';

import Step2 from 'assets/icons/how-it-works/howitworks2.svg';
import Step3 from 'assets/icons/how-it-works/howitworks3.svg';
import Step4 from 'assets/icons/how-it-works/howitworks4.svg';

const {width} = Dimensions.get('window');

const pages: [number, FC][] = [
  [
    0,
    () => (
      <Video
        source={require('assets/videos/how-it-works.mp4')}
        style={styles.video}
        paused={false}
        repeat={false}
        resizeMode="cover"
      />
    )
  ],
  [1, () => <Step2 style={styles.video} />],
  [2, () => <Step3 style={styles.video} />],
  [3, () => <Step4 style={styles.video} />]
];

const Tour: FC<any> = () => {
  const {t} = useTranslation();
  const nav = useNavigation();
  const insets = useSafeArea();
  const pager = useRef<ViewPager | null>(null);
  const [ref] = useFocusRef();

  // RTL support: hacky but @react-native-community/viewpager doesn't support
  // RTL swipe gestures (i.e. switch swipe direction for next screen)
  // and there aren't any well-supported alternatives that do
  const initialIndex = I18nManager.isRTL ? pages.length - 1 : 0;
  const lastIndex = I18nManager.isRTL ? 0 : pages.length - 1;
  const [position, setPosition] = useState<number>(initialIndex);

  const statements: string[] = t('onboarding:tour:statements', {
    returnObjects: true
  });
  const pageContent = (I18nManager.isRTL
    ? [...pages].reverse()
    : pages
  ).map(([statementIndex, PageComponent]) => [
    statements[statementIndex] || '',
    PageComponent
  ]);
  const pageChangeSign = I18nManager.isRTL ? -1 : 1;
  const noFlipStyle = {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row'
  } as ViewStyle;

  const onClose = () => nav.goBack();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top
        }
      ]}>
      <View style={[styles.header, styles.row]}>
        <View style={styles.close}>
          <TouchableWithoutFeedback
            accessibilityRole="button"
            accessibilityLabel={t('common:close')}
            accessibilityHint={`${t('common:close')} ${t(
              'onboarding:tour:title'
            )}`}
            onPress={onClose}
            style={styles.close}>
            <View>
              <AppIcons.Close width={28} height={28} color={colors.purple} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View
          ref={ref}
          accessible
          accessibilityRole="header"
          accessibilityLabel={t('onboarding:tour:title')}
          accessibilityHint={t('onboarding:tour:currentPage', {
            page: position + 1,
            total: statements.length
          })}
          style={styles.headerContent}>
          <Text style={styles.heading}>{t('onboarding:tour:title')}</Text>
        </View>
      </View>
      <View style={styles.details}>
        <ViewPager
          ref={pager}
          orientation="horizontal"
          style={styles.viewPager}
          onPageSelected={(e) => setPosition(e.nativeEvent.position)}
          initialPage={initialIndex}>
          {pageContent.map(([statement, PageComponent], index) => (
            <ScrollView key={`s-${index}`}>
              <PageComponent />
              <Markdown style={styles.content} markdownStyles={MarkdownStyles}>
                {statement}
              </Markdown>
            </ScrollView>
          ))}
        </ViewPager>
      </View>
      <View style={[styles.row, styles.controls]}>
        <View style={[styles.left, styles.button]}>
          {position !== initialIndex && (
            /*we can't use TouchableWithoutFeedback because is not selectable by keyboard tab navigation*/
            <TouchableOpacity
              accessible
              activeOpacity={1}
              accessibilityRole="button"
              accessibilityHint={t('onboarding:tour:previousHint')}
              onPress={() => {
                pager.current?.setPage(position - 1 * pageChangeSign);
                setAccessibilityFocusRef(ref);
              }}>
              <Text maxFontSizeMultiplier={1.2} style={styles.buttonText}>
                {t('onboarding:tour:previous')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View
          style={[styles.center, styles.dots, noFlipStyle]}
          accessible
          accessibilityLabel={t('onboarding:tour:currentPage', {
            page: position + 1,
            total: statements.length
          })}>
          {statements.map((_, index) =>
            position === index ? (
              <View key={index} style={[styles.dot, styles.activeDot]}>
                <View style={styles.innerDot} />
              </View>
            ) : (
              <View key={index} style={styles.dot} />
            )
          )}
        </View>
        {position !== lastIndex ? (
          <View style={[styles.right, styles.button]}>
            {/*we can't use TouchableWithoutFeedback because is not selectable by keyboard tab navigation*/}
            <TouchableOpacity
              accessible
              activeOpacity={1}
              accessibilityRole="button"
              accessibilityHint={t('onboarding:tour:nextHint')}
              onPress={() => {
                pager.current?.setPage(position + 1 * pageChangeSign);
                setAccessibilityFocusRef(ref);
              }}>
              <Text maxFontSizeMultiplier={1.2} style={styles.buttonText}>
                {t('onboarding:tour:next')}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={[styles.right, styles.button]}>
            {/*we can't use TouchableWithoutFeedback because is not selectable by keyboard tab navigation*/}
            <TouchableOpacity
              accessible
              activeOpacity={1}
              accessibilityRole="button"
              accessibilityLabel={t('common:close')}
              accessibilityHint={`${t('common:close')} ${t(
                'onboarding:tour:title'
              )}`}
              onPress={onClose}>
              <Text maxFontSizeMultiplier={1.2} style={styles.buttonText}>
                {t('onboarding:tour:close')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const MarkdownStyles = StyleSheet.create({
  text: {
    ...text.default
  },
  strong: {
    ...text.defaultBold
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  header: {
    paddingVertical: 20,
    paddingLeft: 12,
    paddingRight: 36
  },
  headerContent: {
    flex: 1
  },
  heading: {
    ...text.largeBold,
    textAlign: 'center'
  },
  close: {
    marginLeft: 10
  },
  details: {
    flex: 15
  },
  viewPager: {
    flex: 1,
    borderWidth: 0
  },
  video: {
    backgroundColor: 'transparent',
    width,
    height: (width / 3) * 2,
    marginBottom: 30
  },
  content: {
    flex: 1,
    paddingHorizontal: 30
  },
  controls: {
    flex: 1,
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderColor: '#ededed',
    paddingBottom: 30
  },
  left: {
    width: '30%',
    alignItems: 'flex-start'
  },
  center: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  right: {
    width: '30%',
    alignItems: 'flex-end'
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: colors.darkestGray,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  activeDot: {
    width: 16,
    height: 16,
    borderRadius: 16,
    backgroundColor: colors.purple
  },
  innerDot: {
    width: 4,
    height: 4,
    borderRadius: 4,
    backgroundColor: colors.darkGray
  },
  button: {
    paddingHorizontal: 15
  },
  buttonText: {
    ...text.defaultBold,
    color: colors.purple
  },
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1
  }
});

export default Tour;
