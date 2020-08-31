import React, {useRef, useEffect} from 'react';
import {
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  TouchableHighlight,
  TextInput
} from 'react-native';
import Modal, {ModalProps} from 'react-native-modal';
import {useSafeArea} from 'react-native-safe-area-context';

import {BasicItem} from 'providers/settings';

import {Spacing} from 'components/atoms/layout';

import {text, colors} from 'theme';
import {AppIcons} from 'assets/icons';

interface DropdownModalProps extends Partial<ModalProps> {
  close?: boolean;
  title: string;
  items: BasicItem[];
  selectedValue: string;
  onSelect: (value: string) => void;
  onClose: () => void;
  search?: {
    placeholder: string;
    term: string;
    onChange: (value: string) => void;
    noResults: string;
  };
  itemRenderer?: (item: BasicItem) => React.ReactNode;
  instructions?: () => React.ReactNode;
}

export const DropdownModal: React.FC<DropdownModalProps> = ({
  title,
  items,
  selectedValue,
  onSelect,
  onClose,
  search,
  itemRenderer,
  instructions
}) => {
  const insets = useSafeArea();
  const searchInputRef = useRef<TextInput>(null);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  const renderItem = (item: BasicItem, index: number) => {
    const {label, value} = item;
    const color = value === selectedValue ? colors.purple : colors.text;

    if (!item.value) {
      return (
        <View key={`item_${index}`} style={listStyles.row}>
          <Text>-</Text>
        </View>
      );
    }

    return (
      <TouchableHighlight
        key={`item_${index}`}
        activeOpacity={0.9}
        underlayColor={colors.background}
        onPress={() => onSelect(value)}>
        <View
          style={[
            listStyles.row,
            index === 0 && listStyles.rowFirst,
            index === items.length - 1 && listStyles.rowLast
          ]}>
          {itemRenderer ? (
            itemRenderer(item)
          ) : (
            <View style={listStyles.textWrapper}>
              <Text style={[listStyles.text, {color}]}>{label}</Text>
            </View>
          )}
          {value === selectedValue && (
            <View style={listStyles.iconWrapper}>
              <AppIcons.Selected width={24} height={24} />
            </View>
          )}
        </View>
      </TouchableHighlight>
    );
  };

  const renderContent = () => {
    if (search) {
      if (!search.term && instructions) {
        return <View style={listStyles.contentWrapper}>{instructions()}</View>;
      }

      if (search.term && !items.length) {
        return (
          <View style={listStyles.contentWrapper}>
            <Text style={listStyles.noResults}>{search?.noResults}</Text>
          </View>
        );
      }
    }

    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={insets.top + 12}
        style={listStyles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled>
        <ScrollView keyboardShouldPersistTaps="always">
          {items.map(renderItem)}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };

  return (
    <Modal
      isVisible={true}
      style={[styles.modal, {marginTop: insets.top + 12}]}>
      <View>
        <View style={styles.header}>
          <View style={styles.closeIconWrapper}>
            <TouchableWithoutFeedback
              accessibilityRole="button"
              accessibilityHint={`Close ${title}`}
              accessibilityLabel={`Close ${title}`}
              onPress={onClose}>
              <View>
                <AppIcons.Close width={28} height={28} color={colors.text} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <Text style={text.small}>{title}</Text>
        </View>
        {search && (
          <>
            <Spacing s={12} />
            <View style={styles.search}>
              <TextInput
                ref={searchInputRef}
                style={[
                  styles.searchInput,
                  !!search.term && styles.searchUnderlined
                ]}
                placeholderTextColor={colors.text}
                placeholder={search.placeholder}
                onChangeText={search.onChange}
                value={search.term}
              />
            </View>
          </>
        )}
      </View>
      {renderContent()}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    marginHorizontal: 0,
    marginBottom: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderTopWidth: 1
  },
  header: {
    marginTop: 22,
    marginHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  closeIconWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  search: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.dot
  },
  searchInput: {
    ...text.default,
    marginHorizontal: 32
  },
  searchUnderlined: {
    textDecorationLine: 'underline'
  }
});

const listStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 32,
    marginTop: 16,
    marginBottom: 4
  },
  row: {
    flexDirection: 'row',
    marginVertical: 8,
    marginHorizontal: 24
  },
  rowFirst: {
    marginTop: 0
  },
  rowLast: {
    marginBottom: 16
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    ...text.xlargeBold,
    textAlign: 'center'
  },
  iconWrapper: {
    position: 'absolute',
    right: -24
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 96,
    alignSelf: 'center',
    width: '75%'
  },
  noResults: {
    ...text.large,
    textAlign: 'center'
  }
});
