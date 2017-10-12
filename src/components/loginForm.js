import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';




export default class LoginForm extends Component {
    render() {
        return (
            <View style={LoginFormStyle.viewLayout}>
                <TextInput style={LoginFormStyle.input} underlineColorAndroid='transparent'></TextInput>
                <TextInput style={LoginFormStyle.inputPw} underlineColorAndroid='transparent'></TextInput>
            </View>

        );
    }
}

const LoginFormStyle = StyleSheet.create({
    viewLayout: {
        flex: 1
        ,backgroundColor: "#f1f1f1"
        ,paddingTop: 40
        ,paddingLeft: 40
        ,paddingRight: 40
        ,paddingBottom: 40
    }
    ,input: {
        borderColor: "#B2B2B2"
        ,borderWidth : 1
        ,paddingTop:3
        ,paddingBottom:3
        ,paddingLeft:3
        ,paddingRight:3
        ,fontSize:11
    }

    ,inputPw: {
        borderColor: "#B2B2B2"
        ,borderWidth : 1
        ,marginTop: 10
        ,paddingTop:3
        ,paddingBottom:3
        ,paddingLeft:3
        ,paddingRight:3
        ,fontSize:11
    }
})