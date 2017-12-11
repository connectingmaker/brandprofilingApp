/**
 * Created by jccho on 2017. 12. 11..
 */
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, StyleSheet, TouchableOpacity,AlertIOS,Alert,Platform } from 'react-native';
import { Container, Header, Body, Content, Footer,Item, Icon, Input,Button } from 'native-base';


import renderIf from 'render-if'


export default class BP extends Component {



    render() {


        return (

            <Container>



                <Header style={PanelFormStyle.headerLayout}>
                    <TouchableOpacity onPress={Actions.pop} style={{flex:.2, alignItems: 'flex-start'}}>
                        <View style={{flex:.2, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize:12,color:'#fff'}}>나가기</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{flex:.6, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize:16,color:'#fff'}}>전문 패널 신청서</Text>
                    </View>
                    <View style={{flex:.2, justifyContent: 'center', alignItems: 'center'}}>
                    </View>
                </Header>

                <Content style={{padding:10}}>
                    <View style={PanelFormStyle.contentsLayout2}>
                        <View style={{paddingTop:5, paddingBottom:5}}>
                            <Text style={PanelFormStyle.title}>1. 간단한 자기소개서를 작성해주세요.(본인의 장점, 전문패널로서의 강점 등) (500자 이내)</Text>
                        </View>
                        <View style={PanelFormStyle.lingBg}></View>
                        <View style={{paddingTop:5, paddingBottom:5}}>
                            <Textare style={PanelFormStyle.contentsSize}></Textare>
                        </View>
                    </View>

                    <View style={PanelFormStyle.contentsLayout2}>
                        <View style={{paddingTop:5, paddingBottom:5}}>
                            <Text style={PanelFormStyle.title}>2. 흥미 있는 브랜드 카테고리가 무엇이며,이유를 작성해주세요.(800자 이내)</Text>
                        </View>
                        <View style={PanelFormStyle.lingBg}></View>
                        <View style={{paddingTop:5, paddingBottom:5}}>
                            <Textare style={PanelFormStyle.contentsSize}></Textare>
                        </View>
                    </View>

                    <View style={PanelFormStyle.contentsLayout2}>
                        <View style={{paddingTop:5, paddingBottom:5}}>
                            <Text style={PanelFormStyle.title}>3. 브랜드 관련 전문성(학위,업무 종사 경력 및 경험 등)에 대해 구체적으로 작성해주세요.(1500자 이내)</Text>
                        </View>
                        <View style={PanelFormStyle.lingBg}></View>
                        <View style={{paddingTop:5, paddingBottom:5}}>
                            <Textare style={PanelFormStyle.contentsSize}></Textare>
                        </View>
                    </View>
                    <View style={PanelFormStyle.contentsLayout2}>
                        <View style={{paddingTop:5, paddingBottom:5}}>
                            <Text style={PanelFormStyle.title}>4. 브랜드와 관련하여 운영 중인 블로그 및 SNS가 있다면, 간단히 소개해주세요.(800자 이내)</Text>
                        </View>
                        <View style={PanelFormStyle.lingBg}></View>
                        <View style={{paddingTop:5, paddingBottom:5}}>
                            <Textare style={PanelFormStyle.contentsSize}></Textare>
                        </View>
                    </View>

                </Content>


            </Container>
        );
    }
}



const PanelFormStyle = StyleSheet.create({
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
