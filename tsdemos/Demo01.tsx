import React, { Component } from 'react'
import { Text, View } from 'react-native'
import ListItem from './ListItem';
import Desc from './Desc';
// // 类型断言：可以确定地指定一个值的类型
// // 形式：
// // <Type>值 在jsx中不能用
// // 值 as 类型
// interface Person{
//     name:string;
//     age:number;
// }
// // let user1:Person={name:'a',age:20}
// let user1 = {} as Person;
// user1.name = 'liu';
// user1.age = 18;

// // 联合类型 或者 any类型
// function getLength(p1:string|number):number{
//     return (p1 as String).length
// }

// // 类定义
// // 用 es5 方式：创建一个 Person 类，有 name 和 age 属性，调用的时候传入
// // function Person(name:string,age:number){
// //     this.name = name;
// //     this.age = age;
// // }
// // let user = new Person('zhangsan',20);
// // console.log(user);
// class Person{
//     protected name:string;
//     age:number;
//     constructor(name:string,age:number){
//         this.name = name;
//         this.age = age;
//     }
//     sayName(){}
// }
// class Worker extends Person{
//     // job:string;
//     static money:number;
//     static job:string = '程序员'//static修饰静态属性
//     constructor(name:string,age:number,job:string){
//         super(name,age);//类继承都需要调用super
//         // this.job = job;
//         console.log(this.name);//无法显示
//     }
// }
// let user = new Person('zhangsan',20);
// console.log(user);
// let worker = new Worker('zhangsan',20,'程序员');
// // console.log(worker);
// console.log(Worker.job);
// Worker.money = 1000;

//泛型函数
function indentity<T>(arg:T):T{
    return arg;
}
console.log(indentity<string>('params1'));
function getMsg(msg:any):any{
    return 'msg';
}
console.log(getMsg(100));
function getArr<U>(arr:U):Array<U>{
    return [arr];
}
console.log(getArr<number>(100));

// 泛型接口
interface GenericIdentityFn<T> {
    (arg: T): T;
}
function identity<T>(arg: T): T {
    return arg;
}
let myIdentity: GenericIdentityFn<number> = identity;

// 类接口
class AddData<T>{
    list:T[] = [];
    add(data:T):T[]{
        this.list.push(data);
        return this.list;
    }
}
let data1 = new AddData<number>()
data1.list.push(1)

interface Props{
    name: string;
    data: {
        id:string,
        title:string
    }
}
interface State{
    title:string
}

export default class Demo01 extends Component<Props,State> {
    constructor(props:Props){
        super(props);
        this.state = {
            title:'typescript'
        }
    }
    componentDidMount(){
        this.setState({title:'100'})
    }
    render() {
        return (
            <View>
                <Text> {this.props.name} </Text>
                <ListItem name={'122'}/>
                <Desc />
            </View>
        )
    }
}
