import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Animated, ToastAndroid, Alert, BackHandler, ImageBackground } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StarRating from '../Components/StarRating';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NumericInput from 'react-native-numeric-input'
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../redux/action/Actions';



const DetailsScreen = ({ navigation, route }) => {
    const [productData, setProductData] = useState(undefined);
    const [quantity, setQuantity] = useState(1);
    const [showMenu, setShowMenu] = useState(false);


    const offsetValue = useRef(new Animated.Value(0)).current;
    const scaleValue = useRef(new Animated.Value(1)).current;
    const closeButtonOffset = useRef(new Animated.Value(0)).current;


    useEffect(() => {
        Animated.timing(scaleValue, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start()

        Animated.timing(offsetValue, {
            toValue: showMenu ? 40 : 520,
            duration: 300,
            useNativeDriver: true
        }).start()

        Animated.timing(closeButtonOffset, {
            toValue: !showMenu ? -30 : 0,
            duration: 300,
            useNativeDriver: true
        }).start()

        setShowMenu(!showMenu);

    }, []);

    useEffect(() => {
        let data = route.params && route.params.item ? route.params.item : undefined;
        if (data !== undefined) {
            setProductData(data);
        }
    }, [])


    const dispatch = useDispatch();

    const onAddToCart = item => {
        dispatch(addItemToCart(item));
    };

    const removeItem = index => {
        dispatch(removeItemFromCart(index));
    };

    const items = useSelector(state => state);
    let addedItems = [];
    addedItems = items;
    // setCartProductData(items)
    // console.log('cartProductData', cartProductData);


    const getTotalSum = () => {
        return items.reduce((sum, { price }) => sum + parseInt(price * quantity), 0)
    };


    return (
        <View style={styles.container}>
            <>
                <TouchableOpacity style={{ padding: 10 }} onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={28} color={'white'} />
                </TouchableOpacity>
                {
                    productData && (<>
                        <View style={styles.headerContainer}>
                            <Image
                                resizeMode="contain"
                                style={styles.headerImageContainer}
                                source={productData.image}
                            />
                        </View>
                        <View style={styles.footerContainer}>
                            <Text style={styles.detailsTitleTxt}>{productData.title}</Text>
                            <View style={styles.detailsSubTitleContainer}>
                                <Text style={styles.detailsSubTitleTxt}>{productData.subTitle}</Text>
                                <StarRating ratings={4} size={22} />
                            </View>
                            <Text style={styles.detailsCapacityTxt}>Capacity</Text>
                            <View style={{ marginTop: 10 }}>
                                <FlatList
                                    horizontal
                                    data={productData.healthDefinitions}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item, index }) => (
                                        <View style={[styles.detailsFlatListContainer, { marginLeft: index == 0 ? 0 : 10 }]}>
                                            <Text style={[styles.detailsFlatListTxt, { fontSize: 16 }]}>{item.hTitle}</Text>
                                            <Text style={[styles.detailsFlatListTxt, { fontSize: 22 }]}>{item.value}</Text>
                                        </View>
                                    )}
                                />
                            </View>
                        </View>

                        <View style={{ flex: 0.5, borderTopLeftRadius: 15, borderTopRightRadius: 15 }} />
                    </>)
                }
            </>
            {
                productData && (
                    <Animated.View style={{
                        flexGrow: 1,
                        backgroundColor: '#212121',
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        marginTop: 30,
                        borderRadius: 15,
                        transform: [
                            { scale: scaleValue },
                            { translateY: offsetValue }
                        ]
                    }}>
                        <Animated.View style={[
                            styles.animatedContainer, {
                                transform: [{
                                    translateY: closeButtonOffset
                                }]
                            }]}>

                            <View style={styles.animatedCounterView}>
                                <Text style={styles.animatedQuantityTxt}>Quantity({productData.quantity})</Text>
                                <View style={styles.animatedCounterContainer}>
                                    <NumericInput
                                        value={quantity}
                                        onChange={(value) => { setQuantity(value) }}
                                        onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                                        totalWidth={150}
                                        totalHeight={40}
                                        iconSize={20}
                                        step={1}
                                        valueType='real'
                                        initValue={quantity}
                                        minValue={0}
                                        maxValue={100}
                                        rounded
                                        textColor='black'
                                        iconStyle={{ color: 'black' }}
                                        rightButtonBackgroundColor='white'
                                        leftButtonBackgroundColor='white' />
                                    <Text style={styles.animatedTotalQuantityTxt}>  {quantity ?
                                        (` ₹ ${productData.price * quantity}/-`) : null}</Text>
                                </View>
                                <View style={styles.button}>
                                    <TouchableOpacity
                                        style={styles.addCart}
                                        onPress={() => onAddToCart(productData)}>
                                        <Text style={styles.addCartTxt}>Add to cart</Text>
                                    </TouchableOpacity>
                                    <Icon name="favorite" size={30} color={'red'} />
                                </View>
                            </View>

                            <TouchableOpacity
                                activeOpacity={1}
                                style={styles.cartIconTouchContainer}
                                onPress={() => {
                                    Animated.timing(scaleValue, {
                                        toValue: 1,
                                        duration: 300,
                                        useNativeDriver: true
                                    }).start()

                                    Animated.timing(offsetValue, {
                                        toValue: showMenu ? 40 : 520,
                                        duration: 300,
                                        useNativeDriver: true
                                    }).start()

                                    Animated.timing(closeButtonOffset, {
                                        toValue: !showMenu ? -30 : 0,
                                        duration: 300,
                                        useNativeDriver: true
                                    }).start()

                                    setShowMenu(!showMenu);

                                }}>

                                <View style={{ flexDirection: 'row' }}>
                                    <Feather name="shopping-bag" size={35} color={'#EEEEEE'} />
                                    <Text style={styles.cartTxt}>Cart</Text>
                                </View>
                                {showMenu &&
                                    <View style={{ justifyContent: 'flex-end' }}>
                                        <FlatList
                                            data={items}
                                            horizontal
                                            keyExtractor={(item, index) => index.toString()}
                                            renderItem={({ item, index }) => (
                                                <View>
                                                    <Text style={{ color: '#212121' }}>{item.title}</Text>
                                                    <ImageBackground
                                                        resizeMode="contain"
                                                        style={[styles.headerImageContainer, { width: '100%' }]}
                                                        source={item.image}
                                                    />
                                                </View>
                                            )} />
                                    </View>
                                }
                            </TouchableOpacity>
                            <View style={{ flex: 0.5, backgroundColor: '#212121' }}>
                                <FlatList
                                    data={items}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item, index }) => (
                                        <View style={styles.menuItem} >
                                            <View style={styles.touchableOpacityContainer}>
                                                <View style={{ flex: 1, flexDirection: "row", marginTop: 20 }}>
                                                    <View style={styles.img}>
                                                        <Image source={item.image} resizeMode="contain" style={{ width: 100, height: 100 }} />
                                                    </View>

                                                    <View style={styles.textView}>
                                                        <Text style={styles.menuItemText} >{item.title}</Text>
                                                        <Text style={[styles.menuItemText, { fontSize: 14, fontWeight: "500" }]} >  ₹ {item.price}</Text>
                                                    </View>
                                                    <View style={{
                                                        flex: 0.2,
                                                        alignSelf: 'center',
                                                        flexDirection: 'row',
                                                        marginLeft: "-8%"
                                                    }}>
                                                        <Feather style={{ alignSelf: 'center' }} name="x" size={18} color={'#EEEEEE'} />
                                                        <Text style={[styles.menuItemText, { fontSize: 28, fontWeight: "500", marginBottom: 10 }]} > {quantity}</Text>
                                                    </View>
                                                    <TouchableOpacity style={{ justifyContent: 'center', marginBottom: 10, alignSelf: 'center' }} onPress={() => {
                                                        removeItem(index);
                                                    }}>
                                                        <Icon style={{ alignSelf: 'center', marginRight: 20 }} name="delete-outline" size={25} color={'#EEEEEE'} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    )}
                                />
                            </View>

                            {items.length > 0 && (
                                <View style={styles.buyNowBtnContainer}>
                                    <Text style={styles.totalItemTxt}>{items.length} Items</Text>
                                    <TouchableOpacity
                                        onPress={() => { }}
                                        style={styles.buyNowBtn}>
                                        <Text style={[styles.buyNowBtnTxt, { color: 'white', paddingLeft: 20 }]}>₹ {getTotalSum()}/-</Text>
                                        <View style={styles.buyNowBtnView} >
                                            <Text style={styles.buyNowBtnTxt}>Buy now</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>)}
                        </Animated.View>
                    </Animated.View>)
            }

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F57C00',
    },
    headerContainer: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerContainer: {
        flex: 0.45,
        paddingHorizontal: 20,
    },
    headerImageContainer: {
        width: '80%',
        height: '80%',
    },
    detailsTitleTxt: {
        color: 'white',
        fontSize: 24,
        fontWeight: '600',
        paddingBottom: 15
    },
    detailsSubTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 15
    },
    detailsSubTitleTxt: {
        color: '#EEEEEE',
        fontSize: 16,
        fontWeight: '600',
        width: '70%'
    },
    detailsCapacityTxt: {
        color: '#EEEEEE',
        fontSize: 20,
        fontWeight: '600',
        paddingBottom: 10
    },
    detailsFlatListContainer: {
        padding: 10,
        borderColor: '#EEEEEE',
        borderWidth: 1,
        borderRadius: 5
    },
    detailsFlatListTxt: { color: '#EEEEEE', fontWeight: '600' },
    button: {
        paddingHorizontal: 20,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    addCart: {
        width: '80%',
        height: 40,
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: '#FFA000',
    },
    menuItem: {

        height: 140,
        margin: 3,
    },
    touchableOpacityContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    img: {
        flex: 0.35,
    },
    textView: {
        flex: 0.5,
        alignSelf: 'center',
        //marginTop: '5%',
        marginLeft: "-8%"
    },
    btn: {
        alignItems: 'center',
        marginTop: 50,
        width: '60%',
    },
    menuItemText: {
        color: '#EEEEEE',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 20
    },
    buyNowBtnContainer: {
        flex: 0.1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    buyNowBtnTxt: {
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buyNowBtn: {
        width: '60%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 12,
        borderColor: '#FFA000',
        borderWidth: 2,
    },
    buyNowBtnView: {
        width: '55%',
        height: 40,
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#FFA000',
    },
    totalItemTxt: {
        color: '#EEEEEE',
        fontSize: 15
    },
    animatedContainer: {
        flex: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: '#212121',
    },
    animatedCounterView: {
        flex: 0.25,
        backgroundColor: 'white',
        borderRadius: 15
    },
    animatedQuantityTxt: {
        paddingHorizontal: 20,
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 20,
        marginTop: 20
    },
    animatedCounterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    animatedTotalQuantityTxt: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: "center"
    },
    addCartTxt: {
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    cartIconTouchContainer: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    cartTxt: {
        color: '#EEEEEE',
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 16,
        paddingLeft: 10
    }
})

export default DetailsScreen
