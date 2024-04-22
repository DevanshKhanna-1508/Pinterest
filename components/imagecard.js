import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Image} from 'expo-image';
import {getImageSize, hp, wp} from '../helper/common';
import {theme} from '../constants/theme';
import {router} from 'expo-router';

const ImageCard = ({item, columns, index}) => {
  const getImageHeight = () => {
    let {imageWidth: width, imageHeight: height} = item;

    return {height: getImageSize (index, width, height)};
  };

  const islast = () => {
    return index % columns === 0;
  };
  return (
    <View>
      <Pressable
        style={[styles.imagewrapper, islast () && styles.spacing]}
        onPress={() => {
          router.push ({pathname: 'home/image', params: {...item}});
        }}
      >
        <Image
          style={[styles.image, getImageHeight ()]}
          source={ item?.webformatURL}
          transition={100}
        />
      </Pressable>

    </View>
  );
};

export default ImageCard;

const styles = StyleSheet.create ({
  image: {
    width: '100%',
  },
  imagewrapper: {
    backgroundColor: theme.colors.grayBG,
    marginBottom: wp (2),
    borderRadius: theme.raduis.lg,
    borderCurve: 'continuous',
    overflow: 'hidden',
  },
  spacing: {
    marginRight: wp (2),
  },
});
