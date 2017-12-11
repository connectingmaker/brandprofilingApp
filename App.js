import React, { Component } from 'react';
import {Scene, Router, Modal, Actions} from 'react-native-router-flux';
import { StyleSheet, Platform, AsyncStorage, View } from 'react-native';

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
import Panel from './src/components/paenl'


import config from './src/config';

import animations from './src/module/animations';

import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from "react-native-fcm";




export default class App extends Component<{}> {
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
                console.log(data);
                if(data == null) {
                    this.setState({logged: false,  logout:true});
                } else {
                    if (data.SESS_UID != null) {
                        this.setState({logged: true, logout: false, uid:data.SESS_UID});
                    } else {
                        this.setState({logged: false, logout: true});
                    }
                }
            } catch(err) {
                console.log(err);
                this.setState({loading: true, logged: false,  logout:true});

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
                        //notif.finish(RemoteNotificationResult.NewData); //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                        break;
                    case NotificationType.NotificationResponse:
                        //notif.finish();
                        break;
                    case NotificationType.WillPresent:
                        console.log('in the method');
                        //notif.finish(WillPresentNotificationResult.All); //other types available: WillPresentNotificationResult.None
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



    render() {

        if(this.state.loading == true) {
            return <Router>
                <Modal>

                    <Scene key="root" navigationBarStyle={navStyle.navBar} titleStyle={navStyle.navTitle}
                           barButtonTextStyle={navStyle.barButtonTextStyle}>

                        <Scene key="Login" component={Login} initial={this.state.logout} hideNavBar={true}/>
                        <Scene key="LoginForm" component={LoginForm} title="이메일로 로그인" hideNavBar={true}/>


                    </Scene>

                    <Scene key="rootLogin" navigationBarStyle={navStyle.navBar} titleStyle={navStyle.navTitle}
                    barButtonTextStyle={navStyle.barButtonTextStyle}>

                        <Scene key="Login_logOut" component={Login} hideNavBar={true}/>

                    </Scene>

                    <Scene key="Main" component={Main} initial={this.state.logged} uid={this.state.uid} title="사전조사" hideNavBar={true} />
                    <Scene key="JoinForm" component={JoinForm} title="회원가입" hideNavBar={true} direction="vertical" uid={this.state.uid} schema="modal" wrapRouter={true}/>
                    <Scene key="Account" component={Account} title="계정/비번찾기" hideNavBar={true} direction="vertical" uid={this.state.uid} schema="modal" wrapRouter={true}/>
                    <Scene key="PreSurvey" component={PreSurvey} title="사전조사" hideNavBar={true} direction="vertical" uid={this.state.uid} schema="modal" wrapRouter={true}/>
                    <Scene key="Survey" component={Survey} title="일반조사" hideNavBar={true} direction="vertical" uid={this.state.uid} schema="modal" wrapRouter={true}/>
                    <Scene key="SurveyJoin" component={SurveyJoin} title="설문조사" hideNavBar={true} uid={this.state.uid} direction="vertical" schema="modal" wrapRouter={true}/>
                    <Scene key="Payment" component={Payment} title="환급신청" hideNavBar={true} uid={this.state.uid} direction="vertical" schema="modal" wrapRouter={true}/>
                    <Scene key="BP" component={BP} title="소개" hideNavBar={true} direction="vertical" uid={this.state.uid} schema="modal" wrapRouter={true}/>
                    <Scene key="Notice" component={Notice} title="공지사항" hideNavBar={true} uid={this.state.uid} direction="vertical" schema="modal" wrapRouter={true}/>
                    <Scene key="Terms" component={Terms} title="이용약관" hideNavBar={true} uid={this.state.uid} direction="overlay" schema="modal" wrapRouter={true}/>
                    <Scene key="Privacy" component={Privacy} title="개인정보취급방침" hideNavBar={true} uid={this.state.uid} direction="vertical" schema="modal" wrapRouter={true}/>
                    <Scene key="Pwchange" component={Pwchange} title="비밀번호변경" hideNavBar={true} uid={this.state.uid} direction="vertical" schema="modal" wrapRouter={true}/>
                    <Scene key="Panel" component={Panel} title="전문패널신청" hideNavBar={true} uid={this.state.uid} direction="vertical" schema="modal" wrapRouter={true}/>
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