import React, { Component } from 'react';
import {Scene, Router, Modal} from 'react-native-router-flux';
import { StyleSheet, Platform } from 'react-native';

import Login from './src/components/login';
import LoginForm from './src/components/loginForm';
import JoinForm from './src/components/joinForm';

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

    render() {
        return <Router>
            <Modal>
            <Scene key="root" navigationBarStyle={navStyle.navBar} titleStyle={navStyle.navTitle} barButtonTextStyle={navStyle.barButtonTextStyle}>
                <Scene key="Login" component={Login} initial={true} hideNavBar={true} />
                <Scene key="LoginForm" component={LoginForm} title="이메일로 로그인" hideNavBar={true} />

            </Scene>
            <Scene key="JoinForm" component={JoinForm} title="이메일로 로그인" hideNavBar={true} direction="vertical" schema="modal" wrapRouter={true} />
            </Modal>
        </Router>
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