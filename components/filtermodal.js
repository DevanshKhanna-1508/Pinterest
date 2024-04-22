import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import FilterScreen from './filterScreen';
import {BlurView} from 'expo-blur';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {act} from 'react-test-renderer';

const Filtermodal = ({
  modalRef,
  activeFilter,
  setActiveFilter,
  onApply,
  onReset,
  onClose,
}) => {
  const snapPoints = useMemo (() => ['75%'], []);

  return (
    <BottomSheetModal
      ref={modalRef}
      index={0}
      snapPoints={snapPoints}
      //   onChange={handleSheetChanges}
      enablePanDownToClose={true}
      backdropComponent={Custombackground}
    >
      <BottomSheetView style={styles.contentContainer}>
        <FilterScreen
          modalRef={modalRef}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          onApply={onApply}
          onReset={onReset}
          onClose={onClose}
        />
      </BottomSheetView>

    </BottomSheetModal>
  );
};

const Custombackground = ({animatedIndex, style}) => {
  const ContainerAnimatedStyle = useAnimatedStyle (() => {
    let opacity = interpolate (
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolation.CLAMP
    );
    return {
      opacity,
    };
  });

  const backdrop = [
    StyleSheet.absoluteFill,
    style,
    styles.overlay,
    ContainerAnimatedStyle,
  ];
  return (
    <Animated.View style={backdrop}>
      <BlurView
        style={StyleSheet.absoluteFill}
        tint="dark"
        intensity={55}
        experimentalBlurMethod="dimezisBlurView"
      />

    </Animated.View>
  );
};

export default Filtermodal;

const styles = StyleSheet.create ({
  contentContainer: {
    flex: 1,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
