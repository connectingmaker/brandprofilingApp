import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Body, Content, Item, Icon, Input,Button } from 'native-base';



export default class Account extends Component {
    render() {
        return (
            <Container>
                <Header style={AccountFormStyle.headerLayout}>
                    <View style={{flex:.1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize:12}} onPress={Actions.pop}>나가기</Text>
                    </View>
                    <View style={{flex:.8, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize:16}}>계정 / 비번 찾기</Text>
                    </View>
                    <View style={{flex:.1, justifyContent: 'center', alignItems: 'center'}}>

                    </View>
                </Header>
                <Content>
                    <View style={{paddingTop:30, paddingLeft:20, paddingRight:20}}>
                        <Button bordered full style={{borderColor:"#979797", backgroundColor:"#ffffff", justifyContent:'flex-start', paddingLeft:10}} onPress={Actions.accountEmail}>
                            <Image source={require("../../assets/img/join_icon_email.png")} resizeMode={'contain'} style={{width:18, height:18}} />
                            <Text style={{marginLeft:10}}>이메일 계정 찾기</Text>
                        </Button>
                        <Button bordered full style={{borderColor:"#979797", backgroundColor:"#ffffff", justifyContent:'flex-start', paddingLeft:10}} onPress={Actions.accountPW}>
                            <Image source={require("../../assets/img/join_icon_pw.png")} resizeMode={'contain'} style={{width:18, height:18}} />
                            <Text style={{marginLeft:10}}>비밀번호 찾기</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}



const AccountFormStyle = StyleSheet.create({
    headerLayout: {
        justifyContent: 'center', alignItems: 'center', backgroundColor: "#ffffff"

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
        ,shadowColor: "rgba(0,0,0,23)"
        ,shadowOffset: { width: 0, height: 1 }
        ,shadowOpacity: 0.3
    }
    ,buttonStyle: {
        fontSize:15
        ,borderWidth:1
        ,borderColor:"#979797"
    }


})