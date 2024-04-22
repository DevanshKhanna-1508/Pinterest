import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {hp, wp} from '../helper/common';
import {theme} from '../constants/theme';
import {capitalize} from 'lodash';
import {data} from '../constants/data';
import Animated, {FadeInDown, FadeInLeft, FadeInRight, FadeInUp} from 'react-native-reanimated';

const FilterScreen = ({
  modalRef,
  activeFilter,
  setActiveFilter,
  onApply,
  onReset,
  onClose,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Filter</Text>
      {Object.keys (Sections).map ((sectionName, Index) => {
        let sectionsView = Sections[sectionName];
        let title = capitalize (sectionName);
        let sectiondata = data.filter[sectionName];
        return (
          <Animated.View
            entering={FadeInUp.delay (Index * 100 + 100)
              .springify ()
              .damping (9)}
            key={sectionName}
          >
            <SectionsView
              title={title}
              content={sectionsView ({
                data: sectiondata,
                activeFilter,
                setActiveFilter,
                filterName: sectionName,
              })}
            />
          </Animated.View>
        );
      })}

      <Animated.View
        entering={FadeInUp.delay (500).springify ().damping (6)}
        style={styles.buttonWrapper}
      >
        <Pressable style={styles.resetbutton} onPress={onReset}>
          <Text style={[styles.TXT, {color: theme.colors.black}]}>Reset</Text>
        </Pressable>
        <Pressable style={styles.applybutton} onPress={onApply}>
          <Text style={[styles.TXT, {color: theme.colors.white}]}>Apply</Text>
        </Pressable>
      </Animated.View>

    </View>
  );
};

const Sections = {
  order: props => <OrderView {...props} />,
  orientation: props => <OrderView {...props} />,
  type: props => <OrderView {...props} />,
  colors: props => <ColorView {...props} />,
};

const ColorView = ({data, activeFilter, setActiveFilter, filterName}) => {
  const onSelect = item => {
    setActiveFilter ({...activeFilter, [filterName]: item});
  };
  return (
    <View style={styles.flexRow}>
      {data &&
        data.map ((item, index) => {
          let isActive = activeFilter && activeFilter[filterName] === item;
          let borderColor = isActive
            ? theme.colors.darkerGray
            : theme.colors.white;
          return (
            <Pressable key={item} onPress={() => onSelect (item)}>
              <View style={[styles.wrapper, {borderColor}]}>
                <View style={[styles.box, {backgroundColor: item}]} />
              </View>
            </Pressable>
          );
        })}
    </View>
  );
};

const OrderView = ({data, activeFilter, setActiveFilter, filterName}) => {
  const onSelect = item => {
    setActiveFilter ({...activeFilter, [filterName]: item});
  };
  return (
    <View style={styles.flexRow}>
      {data &&
        data.map ((item, index) => {
          let isActive = activeFilter && activeFilter[filterName] === item;
          let backgroundColor = isActive
            ? theme.colors.darkerGray
            : theme.colors.white;
          let color = isActive ? theme.colors.white : theme.colors.black;
          return (
            <Pressable
              key={item}
              style={[styles.filterButton, {backgroundColor}]}
              onPress={() => onSelect (item)}
            >
              <Text style={[styles.filterTxt, {color}]}>
                {capitalize (item)}
              </Text>
            </Pressable>
          );
        })}
    </View>
  );
};
const SectionsView = ({title, content}) => {
  return (
    <View style={styles.sectioContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View>{content}</View>
    </View>
  );
};

export default FilterScreen;

const styles = StyleSheet.create ({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flex: 1,
    // width: '100%',
    gap: 15,
    // backgroundColor:'red'
  },
  heading: {
    fontWeight: theme.fontWeight.semibold,
    fontSize: hp (4),
    marginBottom: 5,
    color: theme.colors.black,
  },
  sectionContainer: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: hp (2.4),
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.black,
  },
  filterButton: {
    padding: 8,
    paddingHorizontal: 14,
    borderWidth: 2,
    borderColor: theme.colors.grayBG,
    borderRadius: theme.raduis.xl,
    borderCurve: 'continuous',
  },
  flexRow: {
    gap: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  box: {
    borderRadius: theme.raduis.sm - 3,
    borderCurve: 'continuous',
    width: 40,
    height: 30,
  },
  wrapper: {
    padding: 3,
    borderWidth: 2,
    borderRadius: theme.raduis.sm,
    borderCurve: 'continuous',
  },
  buttonWrapper: {
    flex: 1,
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  resetbutton: {
    flex: 1,
    backgroundColor: theme.colors.grayBG,
    borderRadius: theme.raduis.md,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderCurve: 'continuous',
    borderWidth: 2,
    borderColor: theme.colors.netural,
  },
  applybutton: {
    flex: 1,
    backgroundColor: theme.colors.darkerGray,
    borderRadius: theme.raduis.md,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderCurve: 'continuous',
  },
  TXT: {
    fontSize: hp (2.2),
  },
});
