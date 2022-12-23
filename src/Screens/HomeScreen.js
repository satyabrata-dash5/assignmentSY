import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import CheckIcon from 'react-native-vector-icons/FontAwesome';
import PlusIcon from 'react-native-vector-icons/Feather';
import StarRating from '../Components/StarRating';

const productListData = [
  {
    id: 0,
    title: 'Almonds',
    subTitle: 'Tata Sampann 100% Pure California Whole Almonds',
    quantity: '250 gm',
    price: '120',
    image: require('../assets/berries.png'),
    healthDefinitions: [
      { hTitle: 'Calories', value: '90' },
      { hTitle: 'Additive', value: '6%' },
      { hTitle: 'Vitamins', value: '8%' },
    ]
  },
  {
    id: 1,
    title: 'Hezelnuts',
    subTitle: 'All Natural Delicious Hazelnuts',
    quantity: '200 gm',
    price: '150',
    image: require('../assets/hezelnut.png'),
    healthDefinitions: [
      { hTitle: 'Calories', value: '70' },
      { hTitle: 'Additive', value: '9%' },
      { hTitle: 'Vitamins', value: '12%' },
    ]
  },
  {
    id: 2,
    title: 'Strawberry',
    subTitle: 'Natural & Pure Strawberry',
    quantity: '300 gm',
    price: '190',
    image: require('../assets/strawberry.png'),
    healthDefinitions: [
      { hTitle: 'Calories', value: '50' },
      { hTitle: 'Additive', value: '3%' },
      { hTitle: 'Vitamins', value: '12%' },
    ]
  },
];


const HomeScreen = ({ navigation }) => {
  const [selectedProductData, setSelectedProductData] = useState(productListData[0]);
  const [activeIndex, setActiveIndex] = useState(0)


  const productShowCircleContiner = () => {
    return (
      <>
        <View style={styles.middleCircle}>
          <View style={{ paddingLeft: 50, justifyContent: 'center' }}>
            <Text style={styles.productTitleTxt}>
              {selectedProductData.title}
            </Text>
            <View style={{ flexDirection: 'row', paddingBottom: 15 }}>
              <Text style={styles.priceTxt}>
                ₹ {selectedProductData.price}{" / "}
              </Text>
              <Text style={styles.quantityTxt}>
                {selectedProductData.quantity}
              </Text>
            </View>
            <View style={{ paddingBottom: 15 }}>
              <StarRating ratings={4} size={18} />
            </View>

            <TouchableOpacity onPress={() => { navigation.navigate('Details', { item: selectedProductData }) }}
              style={styles.cartBtn}>
              <Icon name="shopping-cart" size={20} color={'black'} />
              <Text style={styles.cartTxt}>Add to cart</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.middleCircleLeftItem}>
          <Image
            resizeMode="stretch"
            style={{ height: 220, width: 150 }}
            source={selectedProductData.image}
          />
        </View>
        <View style={styles.middleCircleRightItem}>
          <View style={styles.middleIconContainer}>
            <Icon name="favorite" size={30} color={'red'} />
          </View>
        </View>
      </>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerImages}>
          <Image
            resizeMode="contain"
            style={{
              width: 60,
              height: 60,
              left: -15,
            }}
            source={require('../assets/menu.png')}
          />
          <TouchableOpacity onPress={() => { }}>
            <Feather name="shopping-bag" size={30} color={'black'} />
          </TouchableOpacity>
        </View>
        <View style={{ width: '90%', alignSelf: 'center' }}>
          <Text style={styles.headerTxt}>Hi, Satyabrata</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.headerTxt, { fontWeight: '600' }]}>What's today's taste?</Text>
            <Image
              source={{ uri: 'https://emojipedia-us.s3.amazonaws.com/source/noto-emoji-animations/344/face-savoring-food_1f60b.gif' }}
              style={{ width: 30, height: 30 }}
            />
          </View>
        </View>
        <View style={styles.headerContainerView}>
          <View style={styles.headerListContainer}>
            <TouchableOpacity
              onPress={() => { }}>
              <View style={styles.headerSelectImageView}>
                <ImageBackground
                  resizeMode="contain"
                  style={styles.headerListImage}
                  source={require('../assets/dryFruits.png')}
                >
                  <CheckIcon style={{ alignSelf: 'flex-end', top: 20 }} name="check-circle" size={20} color={'black'} />
                </ImageBackground>
              </View>
              <Text style={styles.headerActiveContainerTxt}>Dried fruits</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 20 }}
              onPress={() => { }}>
              <View style={[styles.flatListContainer, {
                height: 60,
                width: 60, backgroundColor: '#FFECB3'
              }]}>
                <Image
                  resizeMode="contain"
                  style={[styles.flatListImage, {
                    width: 40,
                    height: 40,
                  }]}
                  source={require('../assets/nuts.png')}
                />
              </View>
              <Text style={styles.inActiveFlatListContainerTxt}>Nuts</Text>
            </TouchableOpacity>
          </View>

          <View style={{ alignSelf: 'center', }}>
            <Icon name="search" size={30} color={'black'} />
          </View>
        </View>

        <View style={styles.middleContainer}>
          {productShowCircleContiner()}
        </View>

      </View>

      <View style={styles.footerContainer}>
        <FlatList
          horizontal
          contentContainerStyle={{
            justifyContent: 'center',
            alignSelf: 'center',
          }}
          data={productListData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => [setSelectedProductData(item, index), setActiveIndex(index)]}>
              {activeIndex !== index ?
                (<View style={styles.flatListContainer}>
                  <Image
                    resizeMode="contain"
                    style={styles.flatListImage}
                    source={item.image}
                  />
                </View>) :
                (<View style={styles.activeFlatListContainer}>
                  <Image
                    resizeMode="contain"
                    style={styles.activeFlatListImage}
                    source={item.image}
                  />
                </View>)
              }
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          style={{
            padding: 10,
            justifyContent: 'center',
          }}
          onPress={() => { }}>
          <View style={styles.flatListPlusIconView}>
            <PlusIcon name="plus" size={40} color={'#EEEEEE'} />
          </View>
        </TouchableOpacity>
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  headerContainer: {
    flex: 0.85,
    backgroundColor: 'white',
  },
  middleContainer: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  footerContainer: {
    flex: 0.15,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  activeFlatListImage: {
    width: 90,
    height: 90,
    borderRadius: 20,
  },
  flatListImage: {
    width: 60,
    height: 60,
    borderRadius: 20,
  },
  middleCircle: {
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height,
      ) / 2,
    width: Dimensions.get('window').width * 0.75,
    height: Dimensions.get('window').width * 0.75,
    backgroundColor: '#F57C00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleCircleLeftItem: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    position: 'absolute',
  },
  middleCircleRightItem: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 40,
  },
  middleIconContainer: {
    borderRadius: 45,
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  flatListContainer: {
    height: 80,
    width: 80,
    backgroundColor: '#EEEEEE',
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeFlatListContainer: {
    height: 80,
    width: 80,
    backgroundColor: '#F57C00',
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListPlusIconView: {
    height: 80,
    width: 80,
    borderRadius: 80,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    borderColor: '#EEEEEE',
    borderWidth: 5,
  },
  productTitleTxt: {
    color: '#EEEEEE',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 15
  },
  priceTxt: {
    color: '#EEEEEE',
    fontSize: 20,
    fontWeight: 'bold'
  },
  quantityTxt: {
    color: '#EEEEEE',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8

  },
  cartBtn: {
    backgroundColor: '#EEEEEE',
    width: '55%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8
  },
  cartTxt: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600'
  },
  headerImages: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center'
  },
  headerTxt: {
    fontSize: 20,
    color: 'black'
  },
  headerSelectImageView: {
    backgroundColor: '#FFA000',
    height: 70,
    width: 70,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerListImage: {
    width: 40,
    height: 40,
  },
  headerListContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerContainerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    paddingTop: 20
  },
  headerActiveContainerTxt: {
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'center'
  },
  inActiveFlatListContainerTxt: {
    fontWeight: '500',
    fontSize: 14,
    top: 5,
    textAlign: 'center',
    color: '#BDBDBD'
  }
});

export default HomeScreen;
