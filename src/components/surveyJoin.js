import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, StyleSheet, TouchableOpacity,AlertIOS,Alert,Platform,WebView } from 'react-native';
import { Container, Header, Body, Content, Footer,Item, Icon, Input,Button } from 'native-base';
import config from '../../src/config';

export default class SurveyJoin extends Component {
    constructor(props){
        super(props);


    }

    respondToOnMessage = e =>{
        var data = eval("("+e.nativeEvent.data+")");
        switch(data.ERR_CODE) {
            case "999":
                Alert.alert(
                    'Error',
                    '참여이력이 존재합니다.',
                    [
                        {text: '확인', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                )
                Actions.pop();
                break;
        }

        //console.log(data.ERR_CODE);
    };

    render() {

        return (

            <Container>

                <Header style={noticeFormStyle.headerLayout}>
                    <View style={{flex:.1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize:12,color:'#fff'}} onPress={Actions.pop}>나가기</Text>
                    </View>
                    <View style={{flex:.8, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize:16,color:'#fff'}}>설문참여</Text>
                    </View>
                    <View style={{flex:.1, justifyContent: 'center', alignItems: 'center'}}>
                    </View>
                </Header>

                <WebView style={noticeFormStyle.contentsLayout} source={{uri: config.SERVER_URL+'/survey/start?campaign_code='+this.props.campaign_code+'&quest_num='+this.props.quest_num+'&uid='+this.props.uid}} onMessage={this.respondToOnMessage}>

                </WebView>


            </Container>
        );
    }
}



const noticeFormStyle = StyleSheet.create({
    headerLayout: {
        justifyContent: 'center', alignItems: 'center', backgroundColor: "#222222"
    }
    ,headerLayout2: {
        justifyContent: 'center', alignItems: 'center', backgroundColor: "#DA4211"

    }
    ,bodyLayout : {
        width: "100%"
    }
    ,contentsLayout: {
        width: "100%"
    }
    ,contentsLayout2: {
        width: "100%"
        ,marginTop:10
        ,paddingTop:10
        ,paddingBottom:10
        ,paddingLeft:20
        ,paddingRight:20
        ,backgroundColor:"#fff"
        ,shadowColor: "rgba(0,0,0,23)"
        ,shadowOffset: { width: 0, height: 1 }
        ,shadowOpacity: 0.3
    }

    ,contentsSize: {
        fontSize:13
        ,lineHeight:25
    }
    ,boldFont: {
        color:"#DA4211"
        ,fontWeight: 'bold'
    }
    ,input: {
        fontSize:12
        ,paddingTop:13
        ,paddingLeft:11
        ,paddingBottom:12
        ,height:38
        ,backgroundColor: "#ffffff"
    }

    ,lingBg: {
        backgroundColor:"rgba(127,127,127,0.3)"
        ,height:1
        ,marginTop:10
        ,marginBottom:10

    }


})
