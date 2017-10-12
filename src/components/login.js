import React, { Component } from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, ActionSheet } from 'native-base';
import WelcomeText from "react-native/local-cli/templates/HelloNavigation/views/welcome/WelcomeText.android";



export default class Login extends Component {
    /*
    render() {
        return (
            <View style={LoginStyle.wrapper}>
                <View style={{flex:.6, alignItems:'center', justifyContent:'center', alignSelf: 'stretch'}}>
                    <Image source={require('../../assets/img/login_logo.png')} resizeMode={'contain'} style={LoginStyle.logo}>
                    </Image>
                    <Text style={LoginStyle.logoTitle}>
                        브랜드 프로파일링 서베이 패널
                    </Text>
                </View>
                <View style={{flex:.3, alignItems:'center', justifyContent:'center', alignSelf: 'stretch', paddingBottom: 20}}>
                    <TouchableHighlight onPress={Actions.LoginForm} style={{alignSelf: 'stretch', justifyContent:'center', alignItems:'center'}} underlayColor="rgba(255,255,255,0)">
                        <Image source={require('../../assets/img/login_emailBtn.png')} resizeMode={'contain'} style={LoginStyle.btn} />
                    </TouchableHighlight>
                    <Image source={require('../../assets/img/login_facebookBtn.png')} resizeMode={'contain'} style={LoginStyle.btn} />
                </View>

                <View style={LoginStyle.footerView}>
                    <View style={LoginStyle.footerViewLeft}>
                        <Text style={LoginStyle.footerViewLeftFont}>
                            계정/비번 찾기
                        </Text>
                    </View>

                    <View style={LoginStyle.footerViewCenter}>
                        <Text style={{color:"#B2B2B2"}}>
                            |
                        </Text>
                    </View>

                    <View style={LoginStyle.footerViewRight}>
                        <Text style={LoginStyle.footerViewRightFont}>
                            회원 가입
                        </Text>
                    </View>

                </View>



            </View>

        );

    }
    */
    render() {
        return (
            <Container style={LoginStyle.wrapper}>

                <Body style={{alignItems:'center', justifyContent:'center', alignSelf: 'stretch'}}>
                    <View style={{flex:.7, alignItems:'center', justifyContent:'center', alignSelf: 'stretch', paddingTop:100}}>

                        <Image source={require('../../assets/img/login_logo.png')} resizeMode={'contain'} style={LoginStyle.logo}></Image>
                        <Text style={LoginStyle.logoTitle}>
                            브랜드 프로파일링 서베이 패널
                        </Text>
                    </View>
                    <View style={{flex:.3, alignItems:'center', justifyContent:'center', alignSelf: 'stretch', paddingBottom: 20}}>
                        <TouchableOpacity onPress={Actions.LoginForm} style={{alignSelf: 'stretch', alignItems:'center', justifyContent:'center'}}>
                            <Image source={require('../../assets/img/login_emailBtn.png')} resizeMode={'contain'} style={LoginStyle.btn} />
                        </TouchableOpacity>
                        <Image source={require('../../assets/img/login_facebookBtn.png')} resizeMode={'contain'} style={LoginStyle.btn} />
                    </View>
                </Body>
                <Footer style={{backgroundColor:"#222222", width:"100%", justifyContent: 'center', alignItems: 'center', flexDirection:'row'}}>
                    <View style={LoginStyle.footerViewLeft}>
                        <Text style={LoginStyle.footerViewLeftFont}>계정/비번 찾기</Text>
                    </View>

                    <View style={LoginStyle.footerViewCenter}>
                        <Text style={LoginStyle.footerViewConterFont}>|</Text>
                    </View>

                    <View style={LoginStyle.footerViewRight}>
                        <Text style={LoginStyle.footerViewRightFont} onPress={Actions.JoinForm}>회원가입</Text>
                    </View>

                </Footer>
            </Container>
        );
    };
}

const LoginStyle = StyleSheet.create({
    wrapper: {
        backgroundColor: '#f1f1f1'
        ,flex: 1
        ,justifyContent: 'center'
        ,alignItems: 'center'
    }
    ,logo: {
        width:"50%"

    }
    ,btn: {
        width:"85%"
        ,height:50
    }
    ,logoTitle: {
        fontSize: 13
        ,marginTop: -10
        ,color:"#4F4F4F"
    }
    ,footerView: {
        flex:.1
        , flexDirection:'row'
        , alignItems:'center'
        , justifyContent:'center'
        , alignSelf: 'stretch'
        , width:"100%"
        , backgroundColor:"rgba(34,34,34,0.5)"
    }
    ,footerViewLeft: {
        flex: 4.5
        , alignItems:'center'
        , justifyContent:'center'
    }
    ,footerViewLeftFont: {
        color:"#ffffff"
        ,fontSize:15
        ,paddingLeft: 20
    }
    ,footerViewCenter: {
        flex: 1
        , alignItems:'center'
        , justifyContent:'center'
    }

    ,footerViewConterFont: {
        color: "rgba(255,255,255,0.5)"
    }

    ,footerViewRight: {
        flex: 4.5
        , alignItems:'center'
        , justifyContent:'center'
    }
    ,footerViewRightFont: {
        color:"#ffffff"
        ,fontSize:15
        ,paddingRight: 20
    }
});