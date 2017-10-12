import React, { Component } from 'react';
import {Scene, Router} from 'react-native-router-flux';
import { StyleSheet } from 'react-native';

import Login from './src/components/login';
import LoginForm from './src/components/loginForm';


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
            <Scene key="root" navigationBarStyle={navStyle.navBar} titleStyle={navStyle.navTitle} barButtonTextStyle={navStyle.barButtonTextStyle}>
                <Scene key="Login" component={Login} initial={true} wrapRouter={true} hideNavBar={true} />
                <Scene key="LoginForm" component={LoginForm} title="Page 2"/>
            </Scene>
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