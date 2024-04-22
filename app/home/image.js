import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BlurView} from 'expo-blur';
import { wp } from '../../helper/common';
import { useRouter } from 'expo-router';

const ImageScreen = () => {
    const router= useRouter();
  return (
    <BlurView
      tint="dark"
      intensity={60}
      style={styles.conatiner}
      experimentalBlurMethod="dimezisBlurView"
    >
        <Button title='Go Back' onPress={()=>router.back()}/>
    </BlurView>
  );
};

export default ImageScreen;

const styles = StyleSheet.create ({
  conatiner: {
    flex: 1,
    justifyContent: "center",
    alignItems:'center',
    paddingHorizontal:wp(4)
  },
});
