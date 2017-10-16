import React, { Component } from 'react';
import {Scene, Router, Modal} from 'react-native-router-flux';
import { StyleSheet, Platform, AsyncStorage, View } from 'react-native';

import Login from './src/components/login';
import LoginForm from './src/components/loginForm';
import JoinForm from './src/components/joinForm';
import Account from './src/components/account';

import PreSurveyList from './src/components/preSurveyList';
import PreSurvey from './src/components/preSurvey';


import config from './src/config';

import animations from './src/module/animations';




export default class App extends Component<{}> {
    /*
     render() {
     return (
     <Login/>
     );
     }
     */

    constructor(props){
        super(props);
        this.state = {
            logged:false
            ,logout:true
            ,loading:false
        };


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
                    this.setState({logged: false,  logout:true});
                } else {
                    if (data.SESS_UID != null) {
                        this.setState({logged: true, logout: false});
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
    }



    render() {

        if(this.state.loading == true) {
            return <Router>
                <Modal>

                    <Scene key="root" navigationBarStyle={navStyle.navBar} titleStyle={navStyle.navTitle}
                           barButtonTextStyle={navStyle.barButtonTextStyle}>

                        <Scene key="Login" component={Login} initial={this.state.logout} hideNavBar={true}/>
                        <Scene key="LoginForm" component={LoginForm} title="이메일로 로그인" hideNavBar={true}/>
                        <Scene key="PreSurveyList" component={PreSurveyList} initial={this.state.logged} title="사전조사" hideNavBar={true} />
                    </Scene>
                    <Scene key="JoinForm" component={JoinForm} title="회원가입" hideNavBar={true} direction="vertical"
                           schema="modal" wrapRouter={true}/>
                    <Scene key="Account" component={Account} title="계정/비번찾기" hideNavBar={true} direction="vertical"
                           schema="modal" wrapRouter={true}/>
                    <Scene key="preSurvey" component={PreSurvey} title="사전조사" hideNavBar={true} direction="vertical" schema="modal" wrapRouter={true}/>
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