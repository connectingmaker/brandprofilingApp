import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default class Login extends Component {
    render() {
        return (
            <View style={LoginStyle.wrapper}>
                <View style={{height:400, alignItems:'center', justifyContent:'center', alignSelf: 'stretch'}}>
                    <Image source={require('../../assets/img/login_logo.png')} resizeMode={'contain'} style={LoginStyle.logo}>
                    </Image>
                    <Text style={LoginStyle.logoTitle}>
                        브랜드 프로파일링 서베이 패널
                    </Text>
                </View>
                <View style={{flex:2}}>
                </View>
                <View style={{backgroundColor:"#000", flex:1, width:"100%", height:44}}>
                    <Text>
                        as;kdjflasjdflj
                    </Text>
                </View>


            </View>

        );
    }
}

const LoginStyle = StyleSheet.create({

    wrapper: {
        backgroundColor: '#fff'
        ,flex: 1
        ,justifyContent: 'center'
        ,alignItems: 'center'
    }
    ,logo: {
        width:"80%"

    }
    ,logoTitle: {
        fontSize: 13
        ,marginTop: -10
        ,color:"#4F4F4F"
    }
});