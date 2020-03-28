import React, { useState, useEffect } from 'react';
import { View, Text, BackHandler, ToastAndroid, AsyncStorage, Dimensions } from 'react-native';
import { Router, Overlay, Scene, Tabs, Drawer, Lightbox, Modal, Actions } from 'react-native-router-flux';
import { Icon } from '@ant-design/react-native';
import SplashScreen from 'react-native-splash-screen';
import Home from './lau/home/Home';
import Goods from './lau/goods/Goods';
import Login from './lau/common/Login'
import Userinfor from './lau/userinfor/Userinfor';
import SwiperPage from './lau/common/SwiperPage';
import Publish from './lau/userinfor/Publish';
import Rgister from './lau/common/Register';

const {width,scale} = Dimensions.get('window');
const s = width / 640;

console.disableYellowBox = true;

const App = () => {
	let [isLogin, setLogin] = useState(false);
	let [isInstall, setInstall] = useState(true);
	let now = 0;
	let init = () => {
		AsyncStorage.getItem('isInstall')
			.then(res => {
				console.log('isinstall', res)
				if (res) {
					setInstall(false);
				}
			})
		AsyncStorage.getItem('user')
			.then(res => {
				let user = JSON.parse(res)
				console.log(user)
				if (!user) {
					SplashScreen.hide();
				}
				if (user && user.token) {
					setLogin(true);
					SplashScreen.hide();
				}
			})
	}
	useEffect(() => {
		init();
	}, [])

	let afterInstall = () => {
		console.log('after install');
		setInstall(false)
	}
	if (isInstall) {
		return <View style={{ flex: 1 }}>
			<SwiperPage afterInstall={afterInstall} />
		</View>
	}

	return (
		<Router
			backAndroidHandler={() => {
				if (Actions.currentScene != 'home') {
					Actions.pop();
					return true;
				} else {
					if (new Date().getTime() - now < 2000) {
						BackHandler.exitApp();
					} else {
						ToastAndroid.show('确定要退出吗', 100);
						now = new Date().getTime();
						return true;
					}
				}

			}}
		>
			<Overlay>
				<Modal key="modal" hideNavBar>
					<Lightbox key="lightbox">
						<Scene key="root">
							<Tabs
								key='tabbar'
								hideNavBar
								activeTintColor="#f23232"
								inactiveTintColor="#666"
								tabBarStyle={{ backgroundColor: '#fff' }}
							>
								<Scene key='homePage'
									title='首页'
									hideNavBar
									icon={
										({ focused }) => <Icon
											color={focused ? '#f23232' : '#666'}
											name="home"
										/>
									}
								>
									<Scene key='home'
										component={Home}
									/>
								</Scene>
								<Scene key='goodsPage'
									title='商品分类'
									hideNavBar
									icon={
										({ focused }) => <Icon
											color={focused ? '#f23232' : '#666'}
											name="appstore"
										/>
									}

								>
									<Scene key="goods" component={Goods} />
								</Scene>
								<Scene
									key='userinfor'
									title="个人中心"
									icon={
										({ focused }) => <Icon
											color={focused ? '#f23232' : '#666'}
											name="user"
										/>
									}
								>
									<Scene
										key="userinfor"
										hideNavBar
										component={Userinfor}
									/>
									<Scene
										key="publish"
										title="我的发布"
										hideTabBar
										hideNavBar
										headerTitleStyle={{ width: width * 0.7, textAlign: 'center' }}
										component={Publish}
									/>
								</Scene>
							</Tabs>
						</Scene>
					</Lightbox>
					<Scene initial={!isLogin} key="login" component={Login} />
					<Scene initial={!isLogin} key="register" component={Rgister}/>
				</Modal>
			</Overlay>
		</Router>
	);
};

export default App;