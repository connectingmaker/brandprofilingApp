import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, StyleSheet, TextInput } from 'react-native';
import { Container, Header, Body, Footer, Item, Icon, Input } from 'native-base';




export default class LoginForm extends Component {
    render() {
        return (
            <Container>
                <Header style={LoginFormStyle.headerLayout}>
                    <View style={{flex:.1, alignItems: 'center'}}>
                        <Text style={{color:"#ffffff"}} onPress={Actions.pop}>뒤로</Text>
                    </View>
                    <View style={{flex:.8, alignItems: 'center'}}>
                        <Text style={{color:"#ffffff"}}>이메일로 로그인</Text>
                    </View>
                    <View style={{flex:.1, alignItems: 'center'}}>
                        <Text style={{color:"#ffffff"}} onPress={Actions.JoinForm}>찾기</Text>
                    </View>
                </Header>
                <Body style={LoginFormStyle.viewLayout}>
                    <Item regular>
                        <Image source={require('../../assets/img/join_icon_email.png')} resizeMode={'contain'} style={{width:16, height:13, marginTop:5, marginLeft:10}} />
                        <Input placeholder='이메일' style={LoginFormStyle.input}/>
                    </Item>
                    <Item regular style={{marginTop:10}}>
                        <Image source={require('../../assets/img/join_icon_pw.png')} resizeMode={'contain'} style={{width:13, height:16, marginTop:3, marginLeft:13}} />
                        <Input placeholder='비밀번호' style={LoginFormStyle.inputPw}/>
                    </Item>
                </Body>

                <Footer style={LoginFormStyle.loginBg}>
                    <Text style={{color:"#ffffff"}} onPress={Actions.PreSurvey}>로그인</Text>
                </Footer>

            </Container>

        );
    }
}

const LoginFormStyle = StyleSheet.create({
    headerLayout: {
        justifyContent: 'center', alignItems: 'center', backgroundColor: "#222222"
    }
    ,viewLayout: {
        flex: 1
        ,backgroundColor: "#F6F6F6"
        ,paddingTop: 40
        ,paddingLeft: 30
        ,paddingRight: 30
        ,paddingBottom: 40
    }
    ,input: {
        fontSize:12
        ,paddingTop:13
        ,paddingLeft:11
        ,paddingBottom:12
        ,height:38
    }

    ,inputPw: {
        fontSize:12
        ,paddingTop:13
        ,paddingLeft:11
        ,paddingBottom:12
        ,height:38
    }
    ,loginBg: { backgroundColor:"#222222", width:"100%", height:44, justifyContent: 'center', alignItems: 'center'}

})