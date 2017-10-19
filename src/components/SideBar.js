import React from "react";
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, StyleSheet, TouchableOpacity,AppRegistry,StatusBar } from 'react-native';
import { Container, Header, Body, Content, List, ListItem,Footer,Item, Icon, Input,Button } from 'native-base';




const routes = ["home", "business", "tech", "profile"];

export default class SideBar extends React.Component {

    render() {

        return (

            <Container>
                <Header style={sideBarFormStyle.headerLayout2}>
                    <View style={{flex:.8, justifyContent: 'center', alignItems: 'flex-start'}}>
                        <Text style={{fontSize:16,color:'#fff'}}>어플리케이션 설정 및 소개</Text>
                    </View>
                    <View style={{flex:.1, justifyContent: 'center', alignItems: 'flex-end'}}>
                        <Text style={{fontSize:12,color:'#fff'}} onPress={Actions.pop}></Text>
                    </View>
                </Header>
                <Content style={{backgroundColor:"#fff"}}>
                    <View style={sideBarFormStyle.contentsLayout}>
                        <View style={{flex:1, flexDirection: 'row'}}>
                            <View style={{flex:0.7,alignItems:'flex-start',justifyContent:'center'}}>
                                <Text style={sideBarFormStyle.contentsSize}>전체알람</Text>
                            </View>
                            <View style={{flex:0.3,alignItems:'flex-end'}}>
                                <Image source={require('../../assets/img/switch_on.png')} style={{width:51,height:36}}/>
                            </View>
                        </View>
                        <View style={sideBarFormStyle.lingBg}></View>
                        <View style={{flex:1, flexDirection: 'row'}}>
                            <View style={{flex:0.7,alignItems:'flex-start',justifyContent:'center'}}>
                                <Text style={sideBarFormStyle.contentsSize}>설문 관련 알람</Text>
                            </View>
                            <View style={{flex:0.3,alignItems:'flex-end'}}>
                                <Image source={require('../../assets/img/switch_on.png')} style={{width:51,height:36}}/>
                            </View>
                        </View>
                        <View style={sideBarFormStyle.lingBg}></View>
                        <View style={{flex:1, flexDirection: 'row'}}>
                            <View style={{flex:0.7,alignItems:'flex-start',justifyContent:'center'}}>
                                <Text style={sideBarFormStyle.contentsSize}>공지사항 관련 알람</Text>
                            </View>
                            <View style={{flex:0.3,alignItems:'flex-end'}}>
                                <Image source={require('../../assets/img/switch_on.png')} style={{width:51,height:36}}/>
                            </View>
                        </View>
                        <View style={sideBarFormStyle.lingBg}></View>

                    </View>

                </Content>

            </Container>
        );
    }
}


const sideBarFormStyle = StyleSheet.create({
    headerLayout: {
        justifyContent: 'center', alignItems: 'center', backgroundColor: "#222222"
    }
    ,headerLayout2: {
        justifyContent: 'center', alignItems: 'center', backgroundColor: "#DA4211"

    }
    ,bodyLayout : {
        width: "100%"
    }
    ,contentsLayout: {
        width: "100%"
        ,paddingTop:10
        ,paddingBottom:10
        ,paddingLeft:20
        ,paddingRight:20
        ,backgroundColor:"#fff"

    }
    ,contentsLayout2: {
        width: "100%"
        ,marginTop:10
        ,paddingTop:10
        ,paddingBottom:10
        ,paddingLeft:20
        ,paddingRight:20
        ,backgroundColor:"#fff"
        ,shadowColor: "rgba(0,0,0,23)"
        ,shadowOffset: { width: 0, height: 1 }
        ,shadowOpacity: 0.3
    }

    ,contentsSize: {
        fontSize:13
    }
    ,boldFont: {
        color:"#DA4211"
        ,fontWeight: 'bold'
    }
    ,input: {
        fontSize:12
        ,paddingTop:13
        ,paddingLeft:11
        ,paddingBottom:12
        ,height:38
        ,backgroundColor: "#ffffff"
    }

    ,lingBg: {
        backgroundColor:"rgba(127,127,127,0.3)"
        ,height:1
        ,marginTop:10
        ,marginBottom:10

    }


})