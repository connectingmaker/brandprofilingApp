import React, { Component } from 'react';
import {Scene, Router, Modal, Actions} from 'react-native-router-flux';
import {StyleSheet, Platform, AsyncStorage, View, NativeModules} from 'react-native';

import Intro from './src/components/intro';
import Login from './src/components/login';
import LoginForm from './src/components/loginForm';
import JoinForm from './src/components/joinForm';
import Account from './src/components/account';

import Main from './src/components/main';
import PreSurvey from './src/components/preSurvey';
import Survey from './src/components/survey';
import Payment from './src/components/payment';
import BP from './src/components/BP'
import Notice from './src/components/notice';
import Terms from './src/components/terms';
import Privacy from './src/components/privacy';
import Pwchange from './src/components/pwchange';
import SurveyJoin from './src/components/surveyJoin';
import SurveyResult from './src/components/SurveyResult';

import Panel from './src/components/panel'
import FacebookAuth from './src/components/facebookAuth'
import ContentsViewSub from './src/components/contentsViewSub';


import config from './src/config';

import animations from './src/module/animations';

import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from "react-native-fcm";
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

import en from './src/lang/en';
import zh from './src/lang/zh';
import ko from './src/lang/ko';

I18n.fallbacks = true;
I18n.locale = languageLocale;
I18n.translations = {
    en,
    zh,
    ko
};


export default class App extends Component {
    /*
     render() {
     return (
     <Login/>
     );
     }
     */

    constructor(){
        super();
        this.state = {
            logged:false
            ,logout:true
            ,loading:false
            ,uid:""
            ,token:""
            ,intro:true
        };

        console.log(Platform.OS);
        console.log(Platform.Version);


    }

    componentWillReceiveProps(nextProps)
    {
        console.log("로그아웃 componentWillReceiveProps");
        console.log(nextProps);
    }



    componentWillMount()
    {

        AsyncStorage.getItem(config.STORE_KEY)
            .then((response) => {
                return response;
            }).then((responseJson) => {
            try {
                var data = eval("(" + responseJson + ")");
                if(data == null) {
                    this.setState({logged: false,  logout:false, intro: true});

                    var dataObject = {
                        "SESS_UID": ""
                        , "SESS_USEREMAIL": ""
                        , "intro": true
                        , "lang": languageLocale
                    };


                    AsyncStorage.setItem(config.STORE_KEY, JSON.stringify(dataObject), () => {

                    });
                } else {
                    if(data.intro == null) {
                        data.intro = true;
                    }

                    if (data.SESS_UID != null && data.SESS_UID != "") {
                        if(data.intro == true) {
                            this.setState({logged: true, logout: false, uid: data.SESS_UID, intro: data.intro});
                        } else {
                            this.setState({logged: true, logout: false, uid: data.SESS_UID, intro: data.intro});
                        }
                    } else {
                        if(data.intro == true) {
                            this.setState({logged: false, logout: true, intro: data.intro});
                        } else {
                            this.setState({logged: false, logout: true, intro: data.intro});
                        }

                    }


                    if(data.lang == undefined || data.lang == "") {

                        var dataObject = {
                            "SESS_UID": data.SESS_UID
                            , "SESS_USEREMAIL": data.SESS_USEREMAIL
                            , "intro": data.intro
                            , "lang": languageLocale
                        };


                        AsyncStorage.setItem(config.STORE_KEY, JSON.stringify(dataObject), () => {

                        });
                    }
                }
            } catch(err) {

                this.setState({loading: true, logged: false,  logout:true, intro: false});

                var dataObject = {
                    "SESS_UID": ""
                    , "SESS_USEREMAIL": ""
                    , "intro": false
                    , "lang": languageLocale
                };


                AsyncStorage.setItem(config.STORE_KEY, JSON.stringify(dataObject), () => {

                });

            }

            this.setState({loading:true});


        });
        /*
        FCM.requestPermissions();

        FCM.getFCMToken().then(token => {
            console.log("TOKEN (getFCMToken)", token);
            //this.props.onChangeToken(token);


            AsyncStorage.getItem(config.STORE_KEY)
                .then((response) => {
                    return response;
                }).then((responseJson) => {
                try {
                    var data = eval("(" + responseJson + ")");
                    console.log(data);
                    if(data == null) {
                        this.setState({logged: false,  logout:true});
                    } else {
                        if (data.SESS_UID != null) {
                            this.setState({logged: true, logout: false, uid:data.SESS_UID, token: token});
                        } else {
                            this.setState({logged: false, logout: true, token: token});
                        }
                    }
                } catch(err) {
                    console.log(err);
                    this.setState({loading: true, logged: false,  logout:true, token: token});

                }

                this.setState({loading:true});


            });
        });






        FCM.getInitialNotification().then(notif => {
            console.log("INITIAL NOTIFICATION", notif)
        });
        */

        /*
        this.notificationUnsubscribe = FCM.on("notification", notif => {
            console.log("Notification", notif);
            if (notif && notif.local) {
                return;
            }
            this.sendRemote(notif);
        });

        this.refreshUnsubscribe = FCM.on("refreshToken", token => {
            console.log("TOKEN (refreshUnsubscribe)", token);
            //this.props.onChangeToken(token);
        });
        */
    }

    componentDidMount()
    {
        FCM.requestPermissions();

        FCM.getFCMToken().then(token => {
            console.log("TOKEN (getFCMToken)", token);
            this.setState({token: token});
        });
        FCM.subscribeToTopic('mes-annonces');

        FCM.getInitialNotification().then(notif => {
            console.log("INITIAL NOTIFICATION", notif);
        });

        this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
            console.log('event notification'+notif);

            if(notif.opened_from_tray) {
                console.log('got a opened_from notification');
            }
            if(notif.local_notification) {
                console.log('got a local notification');
            }

            if (Platform.OS === 'ios') {
                switch (notif._notificationType) {
                    case NotificationType.Remote:
                        notif.finish(RemoteNotificationResult.NewData); //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                        break;
                    case NotificationType.NotificationResponse:
                        notif.finish();
                        break;
                    case NotificationType.WillPresent:
                        console.log('in the method');
                        notif.finish(WillPresentNotificationResult.All); //other types available: WillPresentNotificationResult.None
                        break;
                }
            }
            //this.showLocalNotification(notif);
        });

        FCM.on(FCMEvent.RefreshToken, token => {
            console.log(token);
        })
    }


    componentWillUpdate()
    {
        console.log("componentWillUpdate");
    }


    componentWillUnmount()
    {
        this.refreshUnsubscribe();
        this.notificationUnsubscribe();
    }

    introRander() {


    }

    render() {


        if(this.state.loading == true) {
            return <Router>
                <Modal>

                    <Scene key="Intro" component={Intro} initial={this.state.intro} hideNavBar={true}/>
                    <Scene key="Login" component={Login} initial={this.state.logout} hideNavBar={true}/>
                    <Scene key="LoginForm" component={LoginForm} title="이메일로 로그인" hideNavBar={true}/>

                    {/*<Scene key="root" navigationBarStyle={navStyle.navBar} titleStyle={navStyle.navTitle}*/}
                           {/*barButtonTextStyle={navStyle.barButtonTextStyle} hideNavBar={true}>*/}

                        {/**/}
                        {/*<Scene key="LoginForm" component={LoginForm} title="이메일로 로그인" hideNavBar={true}/>*/}

                    {/*</Scene>*/}

                    {/*<Scene key="rootLogin" navigationBarStyle={navStyle.navBar} titleStyle={navStyle.navTitle}*/}
                           {/*barButtonTextStyle={navStyle.barButtonTextStyle} hideNavBar={true}>*/}
                        {/*<Scene key="Login_logOut" component={Login} hideNavBar={true}/>*/}

                    {/*</Scene>*/}

                    <Scene key="Main" component={Main} initial={this.state.logged} title="사전조사" hideNavBar={true} />



                    <Scene key="JoinForm" component={JoinForm} title="회원가입" hideNavBar={true} direction="vertical" uid={this.state.uid} schema="modal" wrapRouter={true}/>
                    <Scene key="FacebookAuth" component={FacebookAuth} title="핸드폰인증" hideNavBar={true} direction="vertical" uid={this.state.uid} schema="modal" wrapRouter={true}/>
                    <Scene key="Account" component={Account} title="계정/비번찾기" hideNavBar={true} direction="vertical" uid={this.state.uid} schema="modal" wrapRouter={true}/>
                    <Scene key="PreSurvey" component={PreSurvey} title="사전조사" hideNavBar={true} direction="vertical" uid={this.state.uid} schema="modal" wrapRouter={true}/>
                    <Scene key="Survey" component={Survey} title="일반조사" hideNavBar={true} direction="vertical" uid={this.state.uid} schema="modal" wrapRouter={true}/>
                    <Scene key="SurveyJoin" component={SurveyJoin} title="설문조사" hideNavBar={true} uid={this.state.uid} direction="vertical" schema="modal" wrapRouter={true}/>
                    <Scene key="SurveyResult" component={SurveyResult} title="설문조사" hideNavBar={true} uid={this.state.uid} direction="vertical" schema="modal" wrapRouter={true}/>
                    <Scene key="Payment" component={Payment} title="환급신청" hideNavBar={true} uid={this.state.uid} direction="vertical" schema="modal" wrapRouter={true}/>
                    <Scene key="BP" component={BP} title="소개" hideNavBar={true} direction="vertical" uid={this.state.uid} schema="modal" wrapRouter={true}/>
                    <Scene key="Notice" component={Notice} title="공지사항" hideNavBar={true} uid={this.state.uid} direction="vertical" schema="modal" wrapRouter={true}/>
                    <Scene key="Terms" component={Terms} title="이용약관" hideNavBar={true} uid={this.state.uid} direction="overlay" schema="modal" wrapRouter={true}/>
                    <Scene key="Privacy" component={Privacy} title="개인정보취급방침" hideNavBar={true} uid={this.state.uid} direction="vertical" schema="modal" wrapRouter={true}/>
                    <Scene key="Pwchange" component={Pwchange} title="비밀번호변경" hideNavBar={true} uid={this.state.uid} direction="vertical" schema="modal" wrapRouter={true}/>
                    <Scene key="Panel" component={Panel} title="전문패널신청" hideNavBar={true} uid={this.state.uid} direction="vertical" schema="modal" wrapRouter={true}/>
                    <Scene key="ContentsViewSub" component={ContentsViewSub} title="콘텐츠보기" hideNavBar={true} uid={this.state.uid} direction="vertical" schema="modal" wrapRouter={true}/>
                </Modal>
            </Router>
        } else {
            return <View>

            </View>
        }
    }
}


const navStyle = StyleSheet.create({
    navBar : {
        backgroundColor:'#000000'
    }
    ,navTitle : {
        color: "#ffffff"
    }
    ,barButtonTextStyle : {
        color : "#ffffff"
    }
});