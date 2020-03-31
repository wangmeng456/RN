import React, { Component } from 'react';
import { View, Text, BackHandler, TextInput, AsyncStorage, TouchableOpacity, ToastAndroid } from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import { myFetch } from '../utils'

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      pwd: '',
      lusername: '',
      lpwd: '',
      isloading: false
    }
    AsyncStorage.getItem('lusername').then((res) => {
      if (res) {
        this.setState({
          username: res,
          lusername: res
        });
      }
    });
    AsyncStorage.getItem('lpwd').then((res) => {
      if (res) {
        this.setState({
          pwd: res,
          lpwd: res
        });
      }
    });
  }
  componentDidMount() {
    let now = 0;
    BackHandler.addEventListener('back', () => {
      if (new Date().getTime() - now < 2000) {
        BackHandler.exitApp();
      } else {
        ToastAndroid.show('确定要退出吗', 100);
        now = new Date().getTime();
        return true;
      }
    });
  }
  userhandle = (text) => {
    this.setState({ username: text })
  }
  pwdhandle = (text) => {
    this.setState({ pwd: text })
  }
  login = () => {
    if (this.state.username !== '' && this.state.pwd !== '') {
      this.setState({
        isloading: true
      });
      myFetch.post('/login', {
        username: this.state.username,
        pwd: this.state.pwd
      }
      ).then(res => {
        console.log(res);
        if (res.data.username === this.state.lusername && res.data.pwd === this.state.lpwd) {
          AsyncStorage.setItem('user', JSON.stringify(res.data))
            .then(() => {
              this.setState({
                isloading: false
              });
              Actions.homePage();
            });
        } else {
          this.setState({
            isloading: false
          });
          ToastAndroid.show('用户名或密码错误',100);
        }
      });
    }else{
      ToastAndroid.show('输入为空',100);
    }
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={{ alignItems: 'center'}}><Text>登录</Text></View>
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
            onPress={this.login}>
            <Text>登录</Text>
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
            onPress={() => Actions.register()}>
            <Text>去注册</Text>
          </TouchableOpacity>
        </View>
        {
          this.state.isloading
            ? <View style={{ marginTop: 20 }}><Text>正在登录。。。</Text></View>
            : null
        }
      </View>
    );
  }
}