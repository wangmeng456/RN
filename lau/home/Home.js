import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions, StyleSheet, Image, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { Icon } from '@ant-design/react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');
const s = width / 640;
const list = [
    {
        col: '#ffcccc',
        img: require('../../assets/repair.png'),
        title: '居家维修保养',
        side: '>'
    },
    {
        col: '#ffe1b1',
        img: require('../../assets/house.png'),
        title: '住宿优惠',
        side: '>'
    },
    {
        col: '#bfe6a8',
        img: require('../../assets/out.png'),
        title: '出行接送',
        side: '>'
    },
    {
        col: '#c3ddf2',
        img: require('../../assets/present.png'),
        title: 'E族活动',
        side: '>'
    }
];

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            swiperShow: false,
        };
    }
    renderBanner() {
        if (this.state.swiperShow) {
            return (
                <Swiper
                    style={styles.wrapper}
                    height={272 * s}
                    showsButtons={false}
                    removeClippedSubviews={false}
                    autoplay={true}
                    horizontal={true}
                    paginationStyle={styles.paginationStyle}
                    dotStyle={styles.dotStyle}
                    activeDotStyle={styles.activeDotStyle}
                >
                    <Image source={require('../../assets/swiperone.png')} style={styles.bannerImg} />
                    <Image source={require('../../assets/swipertwo.png')} style={styles.bannerImg} />
                    <Image source={require('../../assets/swiperthree.png')} style={styles.bannerImg} />
                </Swiper>
            );
        } else {
            return (
                <View style={styles.wrapper}>
                    <Image source={require('../../assets/swiperone.png')} style={styles.bannerImg} />
                </View>
            );
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                swiperShow: true,
            });
        }, 1)
    }
    render() {
        return (
            <View>
                <StatusBar backgroundColor="red" />
                <View style={styles.header}>
                    <View style={styles.search}>
                        <Icon name='search' color='#fff' size={30 * s} />
                        <TextInput
                            placeholder="请输入您要搜索的关键字"
                            placeholderTextColor="#fff"
                            style={{ width: 490 * s, height: 50 * s, padding: 0, paddingLeft: 10 }}
                        />
                    </View>
                    <View>
                        <Icon name="shopping-cart" color='#fff' size={40 * s} />
                    </View>
                </View>
                <View style={styles.container}>
                    {this.renderBanner()}
                </View>
                <FlatList
                    data={list}
                    numColumns={1}
                    renderItem={({ item }) => (
                        <View style={styles.list}>
                            <View style={{ width: 100 * s, height: 100 * s, borderRadius: 100 * s, backgroundColor: item.col, marginLeft: 24 * s, justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    source={item.img}
                                    style={{ width: 150 * s, height: 150 * s }}
                                />
                            </View>
                            <View style={{ width: 140 * s, marginLeft: 40 * s, marginRight: 300 * s }}>
                                <Text style={{ fontSize: 16, color: '#333' }}>{item.title}</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 16, color: '#333' }}>{item.side}</Text>
                            </View>
                        </View>
                    )}
                />
                <View style={styles.btn}>
                    <TouchableOpacity>
                        <Text style={{ color: '#fff', fontSize: 18 }}>发布需求</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <Text style={{ color: '#666', textAlign: 'center' }}>©E族之家 版权所有</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        height: 70 * s,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    search: {
        width: 520 * s,
        height: 50 * s,
        backgroundColor: '#EEEEEE',
        opacity: 0.7,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 30 * s,
        borderRadius: 40 * s,
        paddingLeft: 30 * s
    },
    container: {
        height: 272 * s,
    },
    wrpaper: {
        height: 272 * s,
    },
    paginationStyle: {
        bottom: 6,
    },
    dotStyle: {
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    activeDotStyle: {
        width: 10,
        height: 10,
        backgroundColor: 'red',
        borderRadius: 10
    },
    bannerImg: {
        height: 272 * s,

    },
    list: {
        height: 120 * s,
        backgroundColor: '#fff',
        marginTop: 10 * s,
        flexDirection: 'row',
        alignItems: 'center'
    },
    btn: {
        width: 546 * s,
        height: 68 * s,
        backgroundColor: 'red',
        justifyContent: 'center',
        marginTop: 30 * s,
        marginLeft: 50 * s,
        alignItems: 'center'
    },
    footer: {
        marginTop: 50 * s
    }
});