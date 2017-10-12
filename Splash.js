import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Splash extends Component {
    render() {
        return (
            <View style={SplashStyle.wrapper}>
                <Text>
                    로고
                </Text>
            </View>
        );
    }
}

const SplashStyle = StyleSheet.create({
    wrapper: {
        backgroundColor: '#f1f1f1'
        ,flex: 1
        ,justifyContent: 'center'
        ,alignItems: 'center'
    }
});