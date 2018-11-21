import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, StyleSheet, TouchableOpacity,AlertIOS,Alert,Platform,NativeModules,AsyncStorage } from 'react-native';
import { Container, Header, Body, Content, Footer,Item, Icon, Input,Button } from 'native-base';

import config from '../../src/config';
import renderIf from 'render-if';
import I18n from 'react-native-i18n';

var langRegionLocale = "en_US";
if (Platform.OS === "android") {
    langRegionLocale = NativeModules.I18nManager.localeIdentifier || "";
} else if (Platform.OS === "ios") {
    langRegionLocale = NativeModules.SettingsManager.settings.AppleLocale || "";
}

var languageLocale = langRegionLocale.substring(0, 2);

import en from '../lang/en';
import zh from '../lang/zh';
import ko from '../lang/ko';

if(languageLocale != "ko" && languageLocale != "en" && languageLocale != "zh") {
    languageLocale = "en";
}

I18n.fallbacks = true;
I18n.locale = languageLocale;
I18n.translations = {
    en,
    zh,
    ko
};


export default class BP extends Component {
    constructor(){
        super();
        this.state ={
            languageLocale : "ko"
        }
    }
    componentDidMount(){

        this.loadJSONData();
    }

    loadJSONData() {


        AsyncStorage.getItem(config.STORE_KEY).then((value) => {
            var json = eval("("+value+")");
            var lang = json.lang;
            this.setState({languageLocale :lang});
            I18n.locale = lang;
            I18n.fallbacks = true;

        }).then(res => {

        });

    }


    render() {


        return (

            <Container>



                    <Header style={BPFormStyle.headerLayout}>
                        <TouchableOpacity onPress={Actions.pop} style={{flex:.2, alignItems: 'flex-start'}}>
                        <View style={{flex:.2, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize:12,color:'#fff'}}>나가기</Text>
                        </View>
                        </TouchableOpacity>
                        <View style={{flex:.6, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize:16,color:'#fff'}}>어플리케이션 소개</Text>
                        </View>
                        <View style={{flex:.2, justifyContent: 'center', alignItems: 'center'}}>
                        </View>
                    </Header>

                <Content style={{padding:10}}>
                    <View style={BPFormStyle.contentsLayout2}>
                        <View style={{paddingTop:5, paddingBottom:5}}>
                            <Text style={BPFormStyle.title}>Brand Profiling 이란?</Text>
                        </View>
                        <View style={BPFormStyle.lingBg}></View>
                        <View style={{paddingTop:5, paddingBottom:5}}>
                            <Text style={BPFormStyle.contentsSize}><Text style={BPFormStyle.boldFont}>Brand Profiling</Text>은 현재 브랜드의 포지셔닝을 진단하거나, 새로운
                                포지셔닝 전략을 도출할 때 사용하는 <Text style={BPFormStyle.boldFont}>브랜딩 전문 리서치 툴</Text>입니다.
                                브랜드의 상징가치, 개성, 정서적 혜택, 구매동기, 디자인스타일 등
                                <Text style={BPFormStyle.boldFont}> 브랜딩에 사용되는 모든 이론과 방법론이 총망라</Text>되어 있으며, 경쟁
                                브랜드와 To-be브랜드의 포지셔닝 위치를 비교하는 방식으로 분석이 이루어집니다.</Text>
                        </View>
                    </View>
                    <View style={BPFormStyle.contentsLayout2}>
                        <View style={{paddingTop:5, paddingBottom:5}}>
                            <Text style={BPFormStyle.title}>포인트란?</Text>
                        </View>
                        <View style={BPFormStyle.lingBg}></View>
                        <View style={{paddingTop:5, paddingBottom:5}}>
                            <Text style={BPFormStyle.contentsSize}>포인트는 설문 참여나 활동을 통해서 얻을 수 있는 보상으로, 1포인트는 1원에 해당하며 <Text style={BPFormStyle.boldFont}>5,000포인트 이상</Text>부터 환급신청을 통해 본인 명의의 통장으로 입금받으실 수 있습니다.(제세공과금 본인 부담)</Text>
                        </View>
                        <View style={BPFormStyle.lingBg}></View>
                        <View style={{paddingTop:5, paddingBottom:5}}>
                            <Text style={BPFormStyle.contentsSize}>메인의 <Text style={BPFormStyle.boldFont}>포인트</Text> 메뉴 > <Text style={BPFormStyle.boldFont}>환급신청</Text></Text>
                        </View>
                    </View>
                    <View style={BPFormStyle.contentsLayout3}>
                        <View style={{paddingTop:5, paddingBottom:5}}>
                            <Text style={BPFormStyle.title}>Brand Profiling 관련된 교육, 워크샵, 컨설팅 등의 문의</Text>
                        </View>
                        <View style={BPFormStyle.lingBg}></View>

                        {/*<View style={{paddingTop:5, paddingBottom:5}}>*/}
                            {/*<Text style={BPFormStyle.contentsSize}>*/}
                                {/*<Text><Text style={BPFormStyle.boldFont}>전화</Text> : (+82) 02-541-7871</Text>*/}

                            {/*</Text>*/}
                        {/*</View>*/}
                        <View style={{paddingTop:5, paddingBottom:5}}>
                            <Text style={BPFormStyle.contentsSize}>
                                <Text><Text style={BPFormStyle.boldFont}>이메일</Text> : contact@perception.co.kr</Text>

                            </Text>
                        </View>


                    </View>

                </Content>


            </Container>
        );
    }
}



const BPFormStyle = StyleSheet.create({
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
        ,paddingTop:10
        ,paddingBottom:10
        ,paddingLeft:20
        ,paddingRight:20
        ,backgroundColor:"#fff"
        ,shadowColor: "rgba(0,0,0,23)"
        ,shadowOffset: { width: 0, height: 1 }
        ,shadowOpacity: 0.3
    }
    ,contentsLayout2: {
        width: "100%"
        ,paddingTop:10
        ,paddingBottom:10
        ,paddingLeft:20
        ,paddingRight:20
        ,backgroundColor:"#fff"
        ,shadowColor: "rgba(0,0,0,23)"
        ,shadowOffset: { width: 0, height: 1 }
        ,shadowOpacity: 0.3
    }

    ,contentsLayout3: {
        width: "100%"
        ,marginTop:10
        ,marginBottom:20
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
