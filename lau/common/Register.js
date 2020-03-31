import React, { Component } from 'react';
import { View, Text, TextInput, AsyncStorage, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import { myFetch } from '../utils'

export default class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            pwd: '',
            spwd: '',
            isloading: false
        }
    }
    userhandle = (text) => {
        this.setState({ username: text })
    }
    pwdhandle = (text) => {
        this.setState({ pwd: text })
    }
    spwdhandle = (text) => {
        this.setState({ spwd: text })
    }

    register = () => {
        if (this.state.username !== '' && this.state.pwd != '' && this.state.spwd != '') {
            if (this.state.pwd !== this.state.spwd) {
                ToastAndroid.show('密码不一致', 100);
            } else {
                this.setState({ isloading: true })
                myFetch.post('/register', {
                    username: this.state.username,
                    pwd: this.state.pwd
                }).then(res => {
                    if (res.data.status == '1') {
                        console.log(res);
                        console.log(res.data.status);
                        ToastAndroid.show('账户已存在', 100);
                    } else {
                        // console.log(res);
                        this.setState({ isloading: false });
                        AsyncStorage.setItem('lusername', this.state.username);
                        AsyncStorage.setItem('lpwd', this.state.pwd)
                            .then(() => {
                                Actions.login();
                            });
                    }
                })
            }
        } else {
            ToastAndroid.show('输入为空', 100);
        }
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={{ alignItems: 'center'}}><Text>注册</Text></View>
                <View
                    style={{ alignItems: 'center' }}>
                    <View
                        style={{
                            width: '80%',
                            marginRight: 10,
                            borderBottomColor: '#ccc',
                            borderBottomWidth: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingLeft: 20,
                        }}>
                        <Icon name="user" color="red" />
                        <TextInput placeholder="用户名"
                            onChangeText={this.userhandle}
                        />
                    </View>
                    <View
                        style={{
                            width: '80%',
                            marginRight: 10,
                            borderBottomColor: '#ccc',
                            borderBottomWidth: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingLeft: 20,
                        }}>
                        <Icon name="key" color="red" />
                        <TextInput
                            onChangeText={this.pwdhandle}
                            placeholder="密码"
                            secureTextEntry={true}
                        />
                    </View>
                    <View
                        style={{
                            width: '80%',
                            marginRight: 10,
                            borderBottomColor: '#ccc',
                            borderBottomWidth: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingLeft: 20,
                        }}>
                        <Icon name="key" color="red" />
                        <TextInput
                            onChangeText={this.spwdhandle}
                            placeholder="确认密码"
                            secureTextEntry={true}
                        />
                    </View>
                    <TouchableOpacity
                        style={{
                            width: '80%',
                            height: 40,
                            backgroundColor: '#ccc',
                            marginTop: 30,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={this.register}>
                        <Text>注册</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            width: '80%',
                            height: 40,
                            backgroundColor: '#ccc',
                            marginTop: 30,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={() => Actions.login()}>
                        <Text>去登录</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.isloading
                        ? <View style={{ marginTop: 20 }}><Text>正在注册。。。</Text></View>
                        : null
                }
            </View>
        );
    }
}