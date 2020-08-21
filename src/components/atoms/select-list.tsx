import React, {FC} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View, Text} from 'react-native';

import {text, colors} from 'theme';

import Icons from 'assets/icons';

type Value = string | number; // May be used as object keys

interface ListItem {
  value: Value;
  label: string;
}

interface SelectListProps {
  items: ListItem[];
  selectedValue?: Value | Value[];
  multiSelect?: boolean;
  onItemSelected: (value: any) => void;
}

export const SelectList: FC<SelectListProps> = ({
  items,
  selectedValue,
  onItemSelected,
  multiSelect
}) => {
  const hasSelectedValue = (value: Value) =>
    multiSelect && Array.isArray(selectedValue)
      ? selectedValue.includes(value)
      : selectedValue === value;

  const renderItem = ({label, value}: ListItem, index: number) => {
    const isLast = index === items.length - 1;
    let color = colors.text;
    let backgroundColor = colors.gray;
    if (hasSelectedValue(value)) {
      color = colors.blank;
      backgroundColor = colors.purple;
    }

    const IconCheckMark =
      Icons[multiSelect ? 'CheckMarkMultiSelect' : 'CheckMark'];

    return (
      <TouchableWithoutFeedback
        key={`item-${index}`}
        onPress={() => onItemSelected(value)}
        accessibilityLabel={
          value === selectedValue ? `${label} selected` : `${label} unselected`
        }
        accessibilityHint={
          value === selectedValue ? `${label} selected` : `${label} unselected`
        }
        accessibilityRole="checkbox">
        <View
          style={[styles.row, {backgroundColor}, isLast && styles.lastItem]}>
          <View style={styles.icon}>
            {hasSelectedValue(value) ? (
              <IconCheckMark width={26} height={26} color={colors.purple} />
            ) : (
              <View style={styles[multiSelect ? 'square' : 'circle']} />
            )}
          </View>
          <View style={styles.textWrap}>
            <Text style={[text.defaultBold, {color}]}>{label}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return <View>{items.map(renderItem)}</View>;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: colors.disabled,
    borderRadius: 8,
    marginBottom: 8
  },
  icon: {
    marginRight: 12
  },
  textWrap: {
    flex: 2
  },
  circle: {
    width: 22,
    height: 22,
    backgroundColor: colors.blank,
    borderWidth: 1,
    borderColor: colors.disabled,
    borderRadius: 13
  },
  square: {
    width: 22,
    height: 22,
    margin: 2,
    backgroundColor: colors.blank,
    borderWidth: 1,
    borderColor: colors.disabled
  },
  lastItem: {
    marginBottom: 0
  }
});
