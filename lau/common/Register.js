import React, { Component } from 'react';
import { View, Text, TextInput, AsyncStorage, TouchableOpacity } from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import { myFetch } from '../utils'

export default class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            pwd: '',
            isloading: false
        }
    }
    userhandle = (text) => {
        this.setState({ username: text })
    }
    pwdhandle = (text) => {
        this.setState({ pwd: text })
    }
    register = () => {
        if (this.state.username !== '' && this.state.pwd != '') {
            this.setState({ isloading: true })
            myFetch.post('/register', {
                username: this.state.username,
                pwd: this.state.pwd
            }).then(res => {
                console.log(res);
                this.setState({ isloading: false });
                AsyncStorage.setItem('lusername', this.state.username);
                AsyncStorage.setItem('lpwd', this.state.pwd)
                    .then(() => {
                        Actions.login();
                    });
            })
        }
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
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