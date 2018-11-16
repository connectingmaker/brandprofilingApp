import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert, AsyncStorage, Platform, NativeModules } from 'react-native';
import { Container, Header, Left, Body, Right, Footer, Item, Icon, Input, Toast } from 'native-base';
import FCM from "react-native-fcm";
import config from '../../src/config';


import I18n from 'react-native-i18n';
var langRegionLocale = "en_US";
if (Platform.OS === "android") {
    langRegionLocale = NativeModules.I18nManager.localeIdentifier || "";
} else if (Platform.OS === "ios") {
    langRegionLocale = NativeModules.SettingsManager.settings.AppleLocale || "";
}

var languageLocale = langRegionLocale.substring(0, 2);
if(languageLocale != "ko" && languageLocale != "en" && languageLocale != "zh") {
    languageLocale = "en";
}

import en from '../lang/en';
import zh from '../lang/zh';
import ko from '../lang/ko';

I18n.fallbacks = true;
I18n.locale = languageLocale;
I18n.translations = {
    en,
    zh,
    ko
};

export default class LoginForm extends Component {
    constructor(){
        super();
        this.state = {
            emailText: ""
            ,passPw: ""
            ,loginBool:false
            ,networkState:true
            ,showToast:false
            ,token: ""
        }


        //AsyncStorage.clear();
    }

    componentWillUpdate()
    {
        console.log(this.state.networkState);
    }
    componentDidUpdate() {
        if (this.state.loginBool == true) {
            //console.log("로그인 성공");
            Actions.Main();
            //Actions.pop({ refresh: { someProp: 'new Value'}});
        }
    }

    _loadInitalState = async() => {
        try {
            var value = await AsyncStorage.getItem(config.STORE_KEY)
            if (value != null) {
                this.setState({products: value.SESS_UID});
            }
        } catch (error) {
            console.log("error setting product list");
        }
    }

    loginCheck()
    {
        if(this.state.emailText == ""){
            Alert.alert(
                '',
                I18n.t("login_form_alert_email"),
                [
                    {text: I18n.t("login_form_alert_confirm"), onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            )
            return;
        }

        if(this.state.passPw == ""){
            Alert.alert(
                '',
                I18n.t("login_form_alert_pw"),
                [
                    {text: I18n.t("login_form_alert_confirm"), onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            )
            return;
        }

        FCM.requestPermissions();

        FCM.getFCMToken().then(token => {
            var userToken = token;
            var object = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'useremail': this.state.emailText
                    ,'userpasswd': this.state.passPw
                    ,'userToken': userToken
                    ,"os" : Platform.OS
                    ,"version" : Platform.Version

                })
            };

            fetch(config.SERVER_URL + '/api/memberSelect', object)
                .then((response) => response.text())
                .then((responseJson) => {
                    //console.log(responseJson);
                    var data = eval("(" + responseJson + ")");
                    switch (data[0].ERR_CODE) {
                        case "000":
                            try {
                                /*
                                 AsyncStorage.setItem("SESS_EMAIL", data[0].USEREMAIL);
                                 AsyncStorage.setItem("SESS_UID", data[0].UID);
                                 */

                                var dataObject = {
                                    "SESS_UID": data[0].UID
                                    , "SESS_USEREMAIL": data[0].USEREMAIL
                                    , "SESS_ALL_PUSH_YN": data[0].ALL_PUSH_YN
                                    , "SESS_SURVEY_PUSH_YN": data[0].SURVEY_PUSH_YN
                                };


                                this.setState({loginBool: true}, () => {
                                    AsyncStorage.setItem(config.STORE_KEY, JSON.stringify(dataObject));

                                });


                            } catch (err) {
                                console.log(err);
                            }
                            break;
                        default:
                            Alert.alert(
                                '',
                                data[0].ERR_MSG,
                                [
                                    {text: I18n.t("login_form_alert_confirm"), onPress: () => console.log('OK Pressed')},
                                ],
                                {cancelable: false}
                            )
                            return;
                            break;


                    }

                })
                .catch((error) => {
                    Alert.alert(
                        '',
                        'Network Error',
                        [
                            {text: I18n.t("login_form_alert_confirm"), onPress: () => console.log('OK Pressed')},
                        ],
                        {cancelable: false}
                    )
                    return;
                });
        });
    }

    /*
     <TouchableOpacity onPress={() => this.loginCheck()} style={{alignSelf: 'stretch', alignItems:'center', justifyContent:'center'}}>
     <Footer style={LoginFormStyle.loginBg}>
     <Text style={{color:"#ffffff"}} >로그인</Text>
     </Footer>
     </TouchableOpacity>
     */

    render() {
        return (
            <Container>
                <Header style={LoginFormStyle.headerLayoyt}>
                    <Left style={{flex:1}}>
                        <TouchableOpacity onPress={Actions.pop} style={{width:50, height:50, justifyContent:'center', alignItems:'flex-start'}}>
                            <View>
                                <Text style={{color:"#ffffff", fontSize:12}}>{I18n.t("login_form_exit")}</Text>
                            </View>
                        </TouchableOpacity>
                    </Left>
                    <Body style={{flex:1}}>
                        <Text style={{color:"#ffffff", fontSize:16}}>{I18n.t("login_form_title")}</Text>
                    </Body>
                    <Right style={{flex:1}}>
                        <TouchableOpacity onPress={() => this.loginCheck()} style={{width:50, height:50, justifyContent:'center', alignItems:'flex-end'}}>
                            <View>
                                <Text style={{color:"#ffffff", fontSize:12}}>{I18n.t("login_form_login_btn")}</Text>
                            </View>
                        </TouchableOpacity>
                    </Right>
                </Header>


                <Body style={LoginFormStyle.viewLayout}>
                <Item regular>
                    <Image source={require('../../assets/img/join_icon_email.png')} resizeMode={'contain'} style={{width:16, height:13, marginTop:5, marginLeft:10}} />
                    <Input placeholder={I18n.t("login_form_filed_email_txt")} style={LoginFormStyle.input} onChangeText={(text) => this.setState({emailText: text})} keyboardType="email-address"/>
                </Item>
                <Item regular style={{marginTop:10}}>
                    <Image source={require('../../assets/img/join_icon_pw.png')} resizeMode={'contain'} style={{width:13, height:16, marginTop:3, marginLeft:13}} />
                    <Input placeholder={I18n.t("login_form_filed_pw_txt")} style={LoginFormStyle.inputPw} onChangeText={(text) => this.setState({passPw: text})} keyboardType="default" secureTextEntry={true}/>
                </Item>
                </Body>


            </Container>

        );
    }
}

const LoginFormStyle = StyleSheet.create({
    headerLayoyt: {
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