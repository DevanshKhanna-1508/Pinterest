import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MasonryFlashList } from "@shopify/flash-list";
import ImageCard from './imagecard';
import { getcolumn, wp } from '../helper/common';


const ImageGrid = ({images,router}) => {
    
    const numColumns= getcolumn();
  return (
    <View style={styles.container}>
     <MasonryFlashList
      data={images}
      numColumns={numColumns}
      contentContainerStyle={styles.listContainer}
      initialNumToRender={1000}
      renderItem={({ item,index }) => <ImageCard router={router} item={item} columns={numColumns} index={index}/>}
      estimatedItemSize={200}
    />
    </View>
  )
}

export default ImageGrid

const styles = StyleSheet.create({
    container:{
        minHeight:3,
        width:'auto'
    },
    listContainer:{
        paddingHorizontal:wp(2.5)
    }
})