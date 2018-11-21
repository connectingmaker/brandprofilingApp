import React, { Component } from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, ActionSheet } from 'native-base';
import WelcomeText from "react-native/local-cli/templates/HelloNavigation/views/welcome/WelcomeText.android";

import renderIf from 'render-if'
import I18n from 'react-native-i18n';

var langRegionLocale = "en_US";
if (Platform.OS === "android") {
    langRegionLocale = NativeModules.I18nManager.localeIdentifier || "";
} else if (Platform.OS === "ios") {
    langRegionLocale = NativeModules.SettingsManager.settings.AppleLocale || "";
}

var languageLocale = langRegionLocale.substring(0, 2);

import en from '../lang/en';
import zh from '../lang/zh';
import ko from '../lang/ko';

if(languageLocale != "ko" && languageLocale != "en" && languageLocale != "zh") {
    languageLocale = "en";
}

I18n.fallbacks = true;
I18n.locale = languageLocale;
I18n.translations = {
    en,
    zh,
    ko
};

export default class Loading extends Component {
    constructor(){
        super();
        this.state ={
            languageLocale : "ko"
        }
    }


    componentDidMount(){

        this.loadJSONData();
    }

    loadJSONData() {


        AsyncStorage.getItem(config.STORE_KEY).then((value) => {
            var json = eval("("+value+")");
            var lang = json.lang;
            this.setState({languageLocale :lang});
            I18n.locale = lang;
            I18n.fallbacks = true;

        }).then(res => {

        });

    }

    render() {
        return (
            <Container style={LoginStyle.wrapper}>

                <Body style={{alignItems:'center', justifyContent:'center', alignSelf: 'stretch'}}>
                <View><Text>로딩중</Text></View>
                </Body>
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

    ,footerViewCenterFont: {
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