import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {hp, wp} from '../helper/common';
import {LinearGradient} from 'expo-linear-gradient';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {theme} from '../constants/theme';
import { useRouter } from "expo-router";

const WelcomeScreen = () => {
  const nav=useRouter();
  return (
    <View style={styles.container}>
      <StatusBar style="dark"translucent={true} />
      <Image
        source={require ('../assets/images/welcome.png')}
        resizeMode="cover"
        style={styles.imageBG}
      />
      {/* linear Gradient */}
      <Animated.View entering={FadeInDown.duration (700)} style={{flex: 1}}>
        <LinearGradient
          colors={[
            'rgba(255,255,255,0)',
            'rgba(255,255,255,0.5)',
            'white',
            'white',
          ]}
          start={{x: 0.5, y: 0}}
          end={{x: 0.6, y: 0.8}}
          style={styles.gradient}
        />
        {/* Content Box */}
        <View style={styles.content}>
          <Animated.Text entering={ FadeInDown.delay(400).springify()} style={styles.title}>Pixiels</Animated.Text>
          <Animated.Text entering={FadeInDown.delay(500).springify()} style={styles.punchline}>Every Pixiels Tell a Stroy</Animated.Text>
          <Animated.View entering={FadeInDown.delay(600).springify()}>
            <Pressable onPress={()=>nav.push('home')} style={styles.button}>
              <Text style={styles.buttontxt}>Start Explore</Text>
            </Pressable>
          </Animated.View>
        </View>
      </Animated.View>

    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
  imageBG: {
    width: wp(100),
    height: hp(100),
    position: 'absolute',
  },
  gradient: {
    width:wp(100),
    height: hp (65),
    bottom: 0,
    position: 'absolute',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 15,
  },
  title: {
    fontSize: hp (7),
    color: theme.colors.black,
    fontWeight: theme.fontWeight.bold,
  },
  punchline: {
    fontSize: hp (2),
    letterSpacing: 1,
    marginBottom: 10,
    fontWeight: theme.fontWeight.medium,
  },
  button: {
    marginBottom: 50,
    backgroundColor: theme.colors.black,
    padding: 15,
    paddingHorizontal: 90,
    borderRadius: theme.raduis.xl,
    borderCurve: 'continuous',
  },
  buttontxt: {
    color: theme.colors.white,
    fontSize: hp (3),
    fontWeight: theme.fontWeight.medium,
    letterSpacing: 1,
  },
});
