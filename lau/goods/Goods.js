import React, { Component } from 'react'
import { View, Text, Dimensions, StyleSheet, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');
const s = width / 640;

const goods = [
    {
        title: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: 36.00,
        img: require('../../assets/one.png')
    },
    {
        title: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: 36.00,
        img: require('../../assets/two.png')
    },
    {
        title: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: 36.00,
        img: require('../../assets/one.png')
    },
    {
        title: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: 36.00,
        img: require('../../assets/two.png')
    },
    {
        title: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: 36.00,
        img: require('../../assets/one.png')
    },
    {
        title: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: 36.00,
        img: require('../../assets/two.png')
    }
];

export default class Goods extends Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={styles.header}>
                    <View style={styles.search}>
                        <TextInput
                            placeholder="请输入商品名称"
                            placeholderTextColor="#999999"
                            style={{ width: 490 * s, height: 50 * s, padding: 0, paddingLeft: 10 }}
                        />
                        <Icon name='search' color='#999999' size={22 * s} />
                    </View>
                </View>
                <View style={styles.nav}>
                    <TouchableOpacity>
                        <Text style={{ color: 'red' }}>综合</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ color: '#333333' }}>销量</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ color: '#333333' }}>新品</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ color: '#333333' }}>价格</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ color: '#333333' }}>信用</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={{ backgroundColor: '#F4F4F4' }}
                    data={goods}
                    numColumns={2}//两列
                    renderItem={({ item }) => (
                        <View style={styles.good}>
                            <Image
                                resizeMode="contain"//最短的充满
                                source={item.img}
                                style={{ height: 180 * s, marginTop: 60 * s }}
                            />
                            <Text style={{ marginTop: 20, color: '#666666' }}>{item.title}</Text>
                            <Text style={{ width: '100%', color: 'red' }}>{item.price}</Text>
                        </View>
                    )}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        height: 70 * s,
        borderBottomColor: '#e8e8e8',
        borderBottomWidth: 1 / 1.5,
        justifyContent: 'center',//水平
        alignItems: 'center',//垂直
    },
    search: {
        width: 544 * s,
        height: 50 * s,
        backgroundColor: '#EEEEEE',
        flexDirection: 'row',
        alignItems: 'center'
    },
    nav: {
        height: 73 * s,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'//两端对齐
    },
    good: {
        width: 290 * s,
        backgroundColor: '#fff',
        marginLeft: 20 * s,
        marginTop: 20 * s,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 20,
        alignItems: 'center'
    }
})