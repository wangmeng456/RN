import React, {Component,useState} from 'react';
import { Text, View,ScrollView, TouchableOpacity, StyleSheet,Dimensions,NavigationBar, ToastAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo';
import {Actions}  from  'react-native-router-flux';

const result = [
    {result:'待回复',color:'red'},
    {result:'已回复',color:'black'}
];

const {width,scale} = Dimensions.get('window');
const s = width / 640;

export default class Publish extends Component {
    
    constructor(){
        super();
        this.state = {
            data: [],
            num: 1,
        }
    }
    componentDidMount(){
        console.log(this.state.num);
        fetch('https://cnodejs.org/api/v1/topics/?limit=15&page='+this.state.num)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    componentDidUpdate(){
        console.log(this.state.num);
        fetch('https://cnodejs.org/api/v1/topics/?limit=15&page='+this.state.num)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    handle1 = () => {
        this.setState((state)=>{
            return{
                num: ++state.num
            }
        });
    }
    handle2 = () => {
        if(this.state.num ==1){
            console.log(this.state.num);
            ToastAndroid.show("没有上一页了!", ToastAndroid.SHORT);
            return {num: 1}
        }else{
            this.setState((state)=>{
                return{
                    num: --state.num
                }
            });
        }
    }
    render() {
        return (
            <View>
                <View style={styles.header}>
                    <Icon onPress={()=>{Actions.pop()}} name="chevron-thin-left" color="#fff" style={{marginLeft:30}} size={22*s}/>
                    <Text style={{color:'#fff', marginLeft:width*0.32, marginRight:width*0.32,fontSize:18}}>我的发布</Text>
                    <Icon name="dots-three-horizontal" color="#fff" size={22*s}/>
                </View>
                <ScrollView>
                <View>
                {
                    this.state.data.map((item)=>(                    
                        <View style={styles.container}>
                            <Text style={styles.title}>{item.title.slice(0,15).concat('...')}</Text>
                            <Text style={styles.time}>{item.create_at.substring(0,10)}</Text>
                            {item.good?<Text style={[styles.result,{color:result[0].color}]}>{result[0].result}</Text>:<Text style={[styles.result,{color:result[1].color}]}>{result[1].result}</Text>}
                        </View>
                    ))
                }    
                </View>
                <View style={styles.foot}>
                    <TouchableOpacity style={styles.btn} onPress={this.handle2}><Text style={{color: '#fff'}}>上一页</Text></TouchableOpacity>
                    <Text>第{this.state.num}页</Text>
                    <TouchableOpacity style={styles.btn} onPress={this.handle1}><Text style={{color: '#fff'}}>下一页</Text></TouchableOpacity>
                </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: 'red',
        height: 70*s,
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        backgroundColor:'#fff',
        flexDirection: 'row',
        height:40,
        borderBottomWidth:1,
        borderBottomColor:'gray',
        alignItems: 'center'
    },
    title: {
        marginLeft: 20,
        width: width*0.6
    },
    time: {
        width:width*0.2
    },
    result: {
        marginLeft:10
    },
    foot: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 60,
        paddingTop: 10
    },
    btn: {
        width: width*0.24,
        height: 30,
        backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20
    }
})