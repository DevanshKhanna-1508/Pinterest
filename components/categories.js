import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {data} from '../constants/data';
import {hp, wp} from '../helper/common';
import {theme} from '../constants/theme';
import  Animated, { FadeInRight } from "react-native-reanimated";

const Categories = ({activeCategory, handleChangeCategory}) => {
  return (
    <FlatList
      contentContainerStyle={styles.list}
      horizontal
      data={data.categories}
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item}
      renderItem={({item, index}) => (
        <CategoryItem
          isActive={activeCategory == item}
          handleChangeCategory={handleChangeCategory}
          title={item}
          index={index}
        />
      )}
    />
  );
};

const CategoryItem = ({title, index, isActive, handleChangeCategory}) => {
    let color = isActive ? theme.colors.white : theme.colors.black;
  let backgroundColor = isActive ? theme.colors.darkerGray : theme.colors.white;

  return (
    <Animated.View entering={FadeInRight.delay(index*200).springify().damping(14).duration(1000)}>
      <Pressable
        onPress={() => handleChangeCategory (isActive ? null : title)}
        style={[styles.categories, {backgroundColor}]}
      >
        <Text style={[styles.title,{color}]}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
};

export default Categories;

const styles = StyleSheet.create ({
  list: {
    paddingHorizontal: wp (3),
    gap: 10,
  },
  categories: {
    padding: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: theme.colors.netural,
    borderRadius: theme.raduis.lg,
    borderCurve: 'continuous',
  },
  title: {
    fontSize: hp (1.8),
    fontWeight: theme.fontWeight.medium,
  },
});
