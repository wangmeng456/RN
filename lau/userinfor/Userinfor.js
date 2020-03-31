import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, Image, FlatList, ScrollView, AsyncStorage, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';

const { width } = Dimensions.get('window');
const s = width / 640;

const contentone = [
    {
        title: '账户管理',
        img: 'gear'
    },
    {
        title: '收货地址',
        img: 'map-marker'
    },
    {
        title: '我的信息',
        img: 'id-card-o'
    },
    {
        title: '我的订单',
        img: 'file-text'
    },
    {
        title: '我的二维码',
        img: 'qrcode'
    },
    {
        title: '我的积分',
        img: 'database'
    },
    {
        title: '我的收藏',
        img: 'star-o'
    }
];
const contenttwo = [
    {
        title: '居家维修保养',
        img: 'wrench'
    },
    {
        title: '出行接送',
        img: 'car'
    },
    {
        title: '我的受赠人',
        img: 'user-o'
    },
    {
        title: '我的住宿优惠',
        img: 'bed'
    },
    {
        title: '我的活动',
        img: 'flag'
    },
    {
        title: '我的发布',
        img: 'edit'
    }
];

const options = {
    title: '请选择',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择相册',
    customButtons: [],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export default class Userinfor extends Component {
    constructor() {
        super();
        this.state = {
            imageUrl: require('../../assets/header.png')
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('imgurl').then((res) => {
            if (res !== null) {
                this.setState({
                    imageUrl: JSON.parse(res)
                });
            }
        });
    }
    takephoto = () => {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                return;
            } else if (response.error) {
                console.log('Error:', response.error);
            } else if (response.customButton) {
                console.log('custom:', response.customButton);
            } else {
                const source = { uri: response.uri };
                this.setState({
                    imageUrl: source,
                });
                AsyncStorage.setItem('imgurl', JSON.stringify(source), (err) => { });
            }
        });
    }
    goPublish = (item) => {
        console.log(item.title);
        if (item.title == '我的发布') {
            console.log(item.img);
            Actions.publish();
        }
    }
    goOut = () => {
        console.log(1);
        AsyncStorage.removeItem('user')
            .then(() => {
                Actions.login();
            });
    }
    render() {
        return (
            <ScrollView>
                <View>
                    <StatusBar backgroundColor="red" />
                    <View style={styles.header}>
                        <View style={{ width: 152 * s, height: 152 * s, borderRadius: 152 * s, borderColor: '#fff', borderWidth: 3, overflow: 'hidden' }}>
                            <TouchableOpacity onPress={() => { this.takephoto() }}>
                                <Image source={this.state.imageUrl} style={{ width: 152 * s, height: 152 * s }} />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ color: '#fff', fontSize: 19, marginTop: 20 * s }}>BINNU DHILLON</Text>
                    </View>

                    <View style={styles.title}>
                        <Icon name='user-o' color='#aeaeae' size={36 * s} />
                        <Text style={{ marginLeft: 15 * s, color: '#4f4f4f' }}>我的个人中心</Text>
                    </View>
                    <FlatList
                        style={{ backgroundColor: '#fff', marginBottm: '20' }}
                        data={contentone}
                        numColumns={3}
                        renderItem={({ item }) => (
                            <View style={styles.content}>
                                <Icon name={item.img} color='#aeaeae' size={36 * s} />
                                <Text style={{ marginTop: 16 * s, color: '#4f4f4f' }}>{item.title}</Text>
                            </View>
                        )}
                    />
                    <View style={[styles.title, { marginTop: 10 * s }]}>
                        <Icon name='tag' color='#aeaeae' size={36 * s} />
                        <Text style={{ marginLeft: 15 * s, color: '#4f4f4f' }}>E族活动</Text>
                    </View>
                    <FlatList
                        style={{ backgroundColor: '#fff', marginBottm: '20' }}
                        data={contenttwo}
                        numColumns={3}
                        renderItem={({ item }) => (
                            <View style={styles.content}>
                                <Icon name={item.img} color='#aeaeae' size={36 * s} />
                                <Text style={{ marginTop: 16 * s, color: '#4f4f4f' }} onPress={() => this.goPublish(item)}>{item.title}</Text>
                            </View>
                        )}
                    />
                    <View style={styles.footer}>
                        <Text style={{ marginLeft: 15 * s, color: '#aeaeae' }}>BINNU DHILLON | 退出</Text>
                    </View>
                    <View style={styles.out}>
                        <TouchableOpacity onPress={this.goOut} style={{ width: width * 0.8, height: 40, backgroundColor: 'red', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#fff' }}>退出登录</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    header: {
        height: 360 * s,
        width: width,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        height: 76 * s,
        width: width,
        borderBottomColor: '#e8e8e8',
        borderBottomWidth: 1 / 1.5,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 24 * s
    },
    content: {
        width: width / 3,
        height: 124 * s,
        alignItems: 'center',
        justifyContent: 'center'
    },
    footer: {
        width: width,
        height: 90 * s,
        justifyContent: 'center',
        alignItems: 'center'
    },
    out: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20
    }
})