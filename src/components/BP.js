import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, StyleSheet, TouchableOpacity,AlertIOS,Alert,Platform } from 'react-native';
import { Container, Header, Body, Content, Footer,Item, Icon, Input,Button } from 'native-base';


import renderIf from 'render-if'


export default class BP extends Component {



    render() {


        return (

            <Container>



                    <Header style={BPFormStyle.headerLayout}>
                        <View style={{flex:.1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize:12,color:'#fff'}} onPress={Actions.pop}>나가기</Text>
                        </View>
                        <View style={{flex:.8, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize:16,color:'#fff'}}>Brand Profiling 소개</Text>
                        </View>
                        <View style={{flex:.1, justifyContent: 'center', alignItems: 'center'}}>
                        </View>
                    </Header>

                <Content style={{padding:10}}>
                    <View style={BPFormStyle.contentsLayout2}>
                        <View style={{paddingTop:5, paddingBottom:5}}>
                            <Text style={BPFormStyle.title}>Brand Profiling 이란?</Text>
                        </View>
                        <View style={BPFormStyle.lingBg}></View>
                        <View style={{paddingTop:5, paddingBottom:5}}>
                            <Text style={BPFormStyle.contentsSize}>Brand Profiling은 브랜드 포지셔닝에 특화된 툴로써, 리서치를 통해 <Text style={BPFormStyle.boldFont}>브랜드 이미지에 대하여 분석</Text>함을 목표로 하고 있습니다.</Text>
                        </View>
                    </View>
                    <View style={BPFormStyle.contentsLayout2}>
                        <View style={{paddingTop:5, paddingBottom:5}}>
                            <Text style={BPFormStyle.title}>포인트란?</Text>
                        </View>
                        <View style={BPFormStyle.lingBg}></View>
                        <View style={{paddingTop:5, paddingBottom:5}}>
                            <Text style={BPFormStyle.contentsSize}>포인트는 설문 참여나 활동을 통해서 얻을 수 있는 보상으로, 1포인트는 1원에 해당하며 <Text style={BPFormStyle.boldFont}>5,000포인트 이상</Text>부터 환급신청을 통해 본인 명의의 통장으로 입금받으실 수 있습니다.</Text>
                        </View>
                        <View style={BPFormStyle.lingBg}></View>
                        <View style={{paddingTop:5, paddingBottom:5}}>
                            <Text style={BPFormStyle.contentsSize}>메인의 <Text style={BPFormStyle.boldFont}>포인트</Text> 메뉴 > <Text style={BPFormStyle.boldFont}>환급신청</Text></Text>
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
