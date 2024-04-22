import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FontAwesome6, Feather, Ionicons} from '@expo/vector-icons';
import {hp, wp} from '../../helper/common';
import {theme} from '../../constants/theme';
import Categories from '../../components/categories';
import {apicall} from '../../api';
import ImageGrid from '../../components/imageGrid';
import {debounce, filter} from 'lodash';
import {StatusBar} from 'expo-status-bar';
import Filtermodal from '../../components/filtermodal';
import Animated from 'react-native-reanimated';
import { useRouter } from 'expo-router';

var page = 1;

const HomeScreen = () => {
  const {top} = useSafeAreaInsets ();
  const paddingTop = top > 0 ? top + 10 : 30;

  const [search, setSearch] = useState ('');
  const [activeCategory, setactiveCategory] = useState (null);
  const [image, setImage] = useState ([]);
  const [activeFilter, setActiveFilter] = useState (null);
  const [reachedEnd, setReachedEnd] = useState(false);
  const searchTextref = useRef ();
  const modalRef = useRef (null);
  const scrollRef= useRef(null);
  const router= useRouter();

  const handleActiveCategory = cat => {
    setactiveCategory (cat);
    clearSearch ();
    setImage ([]);
    page = 1;
    let params = {
      page,
      ...activeFilter,
    };
    if (cat) params.category = cat;
    fetchImage (params, false);
  };

  const handleSearch = text => {
    setSearch (text);
    if (text.length > 2) {
      page: 1;
      setImage ([]);
      setactiveCategory (null);
      fetchImage ({page, ...activeFilter, q: text}, false);
    }

    if (text == '') {
      page: 1;
      searchTextref?.current.clear();
      setImage ([]);
      setactiveCategory (null);
      fetchImage ({page, ...activeFilter}, false);
    }
  };
  const textdebounce = useCallback (debounce (handleSearch, 1000), []);

  const clearSearch = () => {
    setSearch ('');
    searchTextref?.current.clear();
  };

  const openfilter = () => {
    modalRef?.current?.present();
  };

  const closefilter = () => {
    modalRef?.current?.close();
  };

  const applyingFilter = () => {
    if (activeFilter) {
      setImage ([]), (page = 1);
      let params = {
        page,
        ...activeFilter,
      };
      if (activeCategory) params.category = activeCategory;
      if (search) params.q = search;
      fetchImage (params, false);
    }
    closefilter ();
  };

  const resestFilter = () => {
    if (activeFilter) {
      page = 1;
      setImage ([]), setActiveFilter (null);
      let params = {
        page,
      };
      if (activeCategory) params.category = activeCategory;
      if (search) params.q = search;
      fetchImage (params, false);
    }
    closefilter ();
  };

  const removeFilter = key => {
    let filterz = {...activeFilter};
    delete filterz[key];
    setActiveFilter ({...filterz});
    page = 1;
    setImage ([]);
    let params = {
      page,
      ...filterz,
    };
    if (activeCategory) params.category = activeCategory;
    if (search) params.q = search;
    fetchImage (params, false);
  };

  const handleScroll=(event)=>{

    const contentHeight=event.nativeEvent.contentSize.height;
    const ScrollViewHeight= event.nativeEvent.layoutMeasurement.height;
    const scrollOffSet=event.nativeEvent.contentOffset.y;
    const bottomPosition=contentHeight-ScrollViewHeight;

    if(scrollOffSet>=bottomPosition-1){

      if(!reachedEnd){
        setReachedEnd(true);
        // console.log('End reached');
        ++page;
        let params = {
        page,
        ...activeFilter,
      };
      if (activeCategory) params.category = activeCategory;
      if (search) params.q = search;
      fetchImage (params,);
        
      }
      }

        else if(reachedEnd){
        setReachedEnd(false);}

  }

  const handleScrollUp=()=>{
    scrollRef?.current.scrollTo({
      y:0,
      Animated:true
    })
  }

  const fetchImage = async (params = {page: 1}, append = true) => {
    console.log (params, append);
    let res = await apicall (params);
    if (res.succes && res.data.hits) {
      if (append) {
        setImage ([...image, ...res.data.hits]);
      } else {
        setImage ([...res.data.hits]);
      }
    }
  };

  useEffect (() => {
    fetchImage ();
  }, []);

  console.log ('Filters', activeFilter);

  return (
    <View style={[styles.container, {paddingTop}]}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Pressable onPress={handleScrollUp}>
          <Text style={styles.title}>Pixels</Text>
        </Pressable>
        <Pressable onPress={openfilter}>
          <FontAwesome6 name="bars-staggered" size={24} color="black" />
        </Pressable>
      </View>

      <ScrollView
      onScroll={handleScroll}
      scrollEventThrottle={5}
      ref={scrollRef}
       contentContainerStyle={{gap: 15}}>
        <View style={styles.bar}>
          <View style={styles.searchIcon}>
            <Feather name="search" size={24} color="black" />
          </View>
          <TextInput
            placeholder="Search for anything..."
            style={styles.txtbar}
            // value={search}
            onChangeText={textdebounce}
            ref={searchTextref}
          />
          {search &&
            <Pressable
              style={styles.closeIcon}
              onPress={() => handleSearch ('')}
            >
              <Ionicons name="close" size={24} color="black" />
            </Pressable>}

        </View>
        <Categories
          activeCategory={activeCategory}
          handleChangeCategory={handleActiveCategory}
        />

        {/*  Showing the filtered data */}
        {activeFilter &&
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[styles.filterView]}
            >

              {Object.keys (activeFilter).map ((key, index) => {
                return (
                  <View key={key} style={[styles.filterItem]}>

                    {key == 'colors'
                      ? <View
                          style={{
                            height: 20,
                            width: 30,
                            borderRadius: 7,
                            backgroundColor: activeFilter[key],
                          }}
                        />
                      : <Text style={[styles.filterItemTxt]}>
                          {activeFilter[key]}
                        </Text>}
                    <Pressable
                      onPress={() => removeFilter (key)}
                      style={[styles.closefilter]}
                    >

                      <Ionicons name="close" size={14} color="black" />
                    </Pressable>

                  </View>
                );
              })}
            </ScrollView>
          </View>}

        {/* Image Grid */}

        <View>
          {image.length > 0 && <ImageGrid images={image} router={router}/>}
        </View>

        {/* Loading Indicator */}

        <View style={{marginBottom: 70, marginTop: image.length > 0 ? 10 : 70}}>
          <ActivityIndicator size={'large'} />
        </View>
      </ScrollView>

      {/* Filter Modal */}
      <Filtermodal
        modalRef={modalRef}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        onApply={applyingFilter}
        onReset={resestFilter}
        onClose={closefilter}
      />
      
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    gap: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: wp (4),
  },
  title: {
    fontSize: hp (4),
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.black,
  },
  bar: {
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp (3),
    backgroundColor: theme.colors.white,
    padding: 6,
    paddingLeft: 10,
    borderRadius: theme.raduis.lg,
  },
  searchIcon: {
    padding: 8,
  },
  txtbar: {
    flex: 1,
    borderRadius: theme.raduis.sm,
    paddingVertical: 10,
    fontSize: hp (1.7),
  },
  closeIcon: {
    padding: 8,
    borderRadius: theme.raduis.sm,
    backgroundColor: theme.colors.grayBG,
  },
  filterView: {
    paddingHorizontal: wp (2.5),
    gap: 10,
  },
  filterItem: {
    flexDirection: 'row',
    backgroundColor: theme.colors.netural,
    padding: 8,
    borderRadius: theme.raduis.xs,
    gap: 10,
    paddingHorizontal: 10,
    // justifyContent:'center',
    alignItems: 'center',
  },
  filterItemTxt: {
    fontSize: hp (1.5),
  },
  closefilter: {
    borderRadius: 7,
    padding: 4,
    backgroundColor: theme.colors.grayBG,
  },
});
