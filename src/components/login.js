import React, { Component } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, AsyncStorage, Platform, NativeModules } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, ActionSheet } from 'native-base';
import { AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk';
import FCM from "react-native-fcm";
import renderIf from 'render-if'
import config from '../config'

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

export default class Login extends Component {

    constructor(){
        super();
        this.state = {
            loginBool:false
            ,languageLocale : "ko"

        }


        //AsyncStorage.clear();
    }

    componentWillMount(){

        this.loadJSONData();
    }

    componentDidMount() {
        this.loadJSONData();
    }

    loadJSONData() {


        AsyncStorage.getItem(config.STORE_KEY).then((value) => {
            var json = eval("("+value+")");
            var lang = json.lang;
            if(lang == undefined || lang == "") {
                lang = "ko";
            }

            console.log(lang);

            this.setState({languageLocale :lang});

            I18n.locale = lang;
            I18n.fallbacks = true;

            console.log(I18n);

        }).then(res => {

        });

    }




    _fbAuth() {


        FCM.requestPermissions();

        FCM.getFCMToken().then(token => {
            var userToken = token;

            LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(function(result) {
                console.log(result);
                if (result.isCancelled) {
                    console.log("Login Cancelled");
                } else {
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            var accessToken = data.accessToken;

                            const responseInfoCallback = (error, result) => {
                                if (error) {
                                    console.log(error)
                                } else {
                                    console.log(result);

                                    var object = {
                                        method: 'POST',
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json'
                                        },
                                        body:JSON.stringify( {
                                            'useremail': result.email
                                            ,'username': result.name
                                            ,'facebook_id': result.id
                                            ,'userToken': userToken
                                            ,"os" : Platform.OS
                                            ,"version" : Platform.Version

                                        })
                                    };

                                    console.log(result);

                                    var email = result.email;

                                    //페이스북 이메일이 없을 경우 핸드폰 번호 인증받기
                                    if(email == "") {

                                        fetch(config.SERVER_URL+'/api/memberFaceBookCheck', object)
                                            .then((response) => response.text())
                                            .then((responseJson) => {
                                                var data = eval("("+responseJson+")");
                                                console.log(data.length);
                                                if(data.length == 0) {
                                                    var dataObject = {
                                                        "FACEBOOK_EMAIL": result.email
                                                        , "FACEBOOK_USERNAME": result.name
                                                        , "FACEBOOK_ID": result.id
                                                        , "TOKEN": userToken
                                                        , "OS": Platform.OS
                                                        , "VERSION": Platform.Version
                                                    };


                                                    AsyncStorage.setItem(config.STORE_KEY, JSON.stringify(dataObject), () => {
                                                        Actions.FacebookAuth();
                                                        //Actions.Main();
                                                    });
                                                } else {
                                                    fetch(config.SERVER_URL+'/api/memberFaceBook', object)
                                                        .then((response) => response.text())
                                                        .then((responseJson) => {

                                                            var data = eval("("+responseJson+")");

                                                            var dataObject = {
                                                                "SESS_UID" : data[0].UID
                                                                ,"SESS_USEREMAIL" : data[0].USEREMAIL
                                                                , "SESS_ALL_PUSH_YN": data[0].ALL_PUSH_YN
                                                                , "SESS_SURVEY_PUSH_YN": data[0].SURVEY_PUSH_YN
                                                                , "lang" : this.state.languageLocale
                                                                , "intro" : true
                                                            };


                                                            AsyncStorage.setItem(config.STORE_KEY, JSON.stringify(dataObject), () => {
                                                                Actions.Main();
                                                            });





                                                        })
                                                        .catch((error) => {
                                                            console.log("오류");
                                                        });
                                                }


                                                /*
                                                if(data.FACEBOOK_CNT == 0) {
                                                    var dataObject = {
                                                        "FACEBOOK_EMAIL": result.email
                                                        , "FACEBOOK_USERNAME": result.name
                                                        , "FACEBOOK_ID": result.id
                                                        , "TOKEN": userToken
                                                        , "OS": Platform.OS
                                                        , "VERSION": Platform.Version
                                                    };


                                                    AsyncStorage.setItem(config.STORE_KEY, JSON.stringify(dataObject), () => {
                                                        Actions.FacebookAuth();
                                                        //Actions.Main();
                                                    });
                                                } else {

                                                }
                                                */



                                            });

                                    } else {
                                        fetch(config.SERVER_URL+'/api/memberFaceBook', object)
                                            .then((response) => response.text())
                                            .then((responseJson) => {

                                                var data = eval("("+responseJson+")");

                                                var dataObject = {
                                                    "SESS_UID" : data[0].UID
                                                    ,"SESS_USEREMAIL" : data[0].USEREMAIL
                                                    , "SESS_ALL_PUSH_YN": data[0].ALL_PUSH_YN
                                                    , "SESS_SURVEY_PUSH_YN": data[0].SURVEY_PUSH_YN
                                                    , "lang" : this.state.languageLocale
                                                    , "intro" : true

                                                };


                                                AsyncStorage.setItem(config.STORE_KEY, JSON.stringify(dataObject), () => {
                                                    Actions.Main();
                                                });





                                            })
                                            .catch((error) => {
                                                console.log("오류");
                                            });
                                    }



                                }
                            }



                            const infoRequest = new GraphRequest(
                                '/me',
                                {
                                    accessToken: accessToken,
                                    parameters: {
                                        fields: {
                                            string: 'id,email,name'
                                        }
                                    }
                                },
                                responseInfoCallback
                            );

                            // Start the graph request.
                            new GraphRequestManager().addRequest(infoRequest).start();


                        })

                }
            }, function(error) {
                console.log("some error occurred!!");
            })

        });
    }



    render() {
        return (
            <Container style={LoginStyle.wrapper}>

                <Body style={{alignItems:'center', justifyContent:'center', alignSelf: 'stretch'}}>
                    <View style={{flex:.7, alignItems:'center', justifyContent:'center', alignSelf: 'stretch', paddingTop:100}}>

                        <Image source={require('../../assets/img/login_logo.png')} resizeMode={'contain'} style={LoginStyle.logo}></Image>
                        <Text style={LoginStyle.logoTitle}>
                            {I18n.t('login_title')}
                        </Text>
                    </View>
                    <View style={{flex:.3, alignItems:'center', justifyContent:'center', alignSelf: 'stretch', paddingBottom: 20}}>
                        <TouchableOpacity onPress={Actions.LoginForm} style={{alignSelf: 'stretch', alignItems:'center', justifyContent:'center'}}>
                            {renderIf(this.state.languageLocale == "ko") (
                            <Image source={require('../../assets/img/login_emailBtn.png')} resizeMode={'contain'} style={LoginStyle.btn} />
                            )}
                            {renderIf(this.state.languageLocale == "en") (
                                <Image source={require('../../assets/img/login_emailBtn_en.png')} resizeMode={'contain'} style={LoginStyle.btn} />
                            )}
                            {renderIf(this.state.languageLocale == "zh") (
                                <Image source={require('../../assets/img/login_emailBtn_zh.png')} resizeMode={'contain'} style={LoginStyle.btn} />
                            )}

                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this._fbAuth()} style={{alignSelf: 'stretch', alignItems:'center', justifyContent:'center'}}>
                            {renderIf(this.state.languageLocale == "ko") (
                            <Image source={require('../../assets/img/login_facebookBtn.png')} resizeMode={'contain'} style={LoginStyle.btn} />
                            )}
                            {renderIf(this.state.languageLocale == "en") (
                                <Image source={require('../../assets/img/login_facebookBtn_en.png')} resizeMode={'contain'} style={LoginStyle.btn} />
                            )}
                            {renderIf(this.state.languageLocale == "zh") (
                                <Image source={require('../../assets/img/login_facebookBtn_zh.png')} resizeMode={'contain'} style={LoginStyle.btn} />
                            )}
                        </TouchableOpacity>
                    </View>
                </Body>
                <Footer style={{backgroundColor:"#222222", width:"100%", justifyContent: 'center', alignItems: 'center', flexDirection:'row'}}>

                    <View style={LoginStyle.footerViewLeft}>
                        <TouchableOpacity onPress={Actions.Account} style={{alignSelf: 'stretch', alignItems:'center', justifyContent:'center'}}>
                        <Text style={LoginStyle.footerViewLeftFont}>{I18n.t('login_idpw_text')}</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={LoginStyle.footerViewCenter}>
                        <Text style={LoginStyle.footerViewCenterFont}>|</Text>
                    </View>



                    <View style={LoginStyle.footerViewRight}>
                        <TouchableOpacity onPress={Actions.JoinForm} style={{alignSelf: 'stretch', alignItems:'center', justifyContent:'center'}}>
                        <Text style={LoginStyle.footerViewRightFont}>{I18n.t('login_regist_text')}</Text>
                        </TouchableOpacity>
                    </View>


                </Footer>
            </Container>
        );
    };
}

const LoginStyle = StyleSheet.create({
    wrapper: {
        backgroundColor: '#ffffff'
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