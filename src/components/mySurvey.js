import React, { Component } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text ,ScrollView} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Item, Icon, Input, Button ,ActionSheet} from 'native-base';



export default class mySurvey extends Component {

    render() {
        return (
            <ScrollView>

                <View style={SurveyFormStyle.contentsLayout}>
                    <View style={{flex:1, flexDirection: 'row', paddingTop:10, paddingBottom:5}}>
                        <View style={{flex:0.1}}>
                            <Image source={require('../../assets/img/main_icon_logo_on.png')} resizeMode={'contain'} style={{width:30,height:30}}/>
                        </View>
                        <View style={{flex:0.4,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={SurveyFormStyle.boldFont}>500P 추가 획득 가능</Text>
                        </View>
                        <View style={{flex:0.4}}></View>
                        <View style={{flex:0.1}}>
                            <Text>맥주</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={SurveyFormStyle.title}>2017 맥주 브랜드에 대한 이미지 조사</Text>
                    </View>
                    <View style={SurveyFormStyle.lingBg}>
                    </View>
                    <View>
                        <Text style={SurveyFormStyle.contentsSize}>본 설문조사는 회원님의 소중한 의견을 듣고자 진행하는 일반적인 설문조사입니다.</Text>
                    </View>
                    <View style={{flexDirection: 'row', paddingLeft: 20,paddingTop:10}}>

                        <View style={{backgroundColor: '#f6f6f6', flex: 0.3,padding:10,borderWidth:1,borderColor:"#d0d0d0",borderBottomColor:"#f6f6f6",borderRightColor:"#f6f6f6"}} >
                            <Text style={{color:'#919191',fontSize:13}}>포인트적립</Text>
                        </View>
                        <View style={{borderColor: '#d0d0d0', flex: 0.5,padding:10,borderWidth:1,borderColor:"#d0d0d0",borderBottomColor:"#f6f6f6"}}>
                            <Text style={SurveyFormStyle.boldFont}>10~800P</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row',paddingLeft:20}}>
                        <View style={{backgroundColor: '#f6f6f6', flex: 0.3,padding:10,borderWidth:1,borderColor:"#d0d0d0",borderRightColor:"#f6f6f6",borderBottomColor:"#f6f6f6"}} >
                            <Text style={{color:'#919191',fontSize:13}}>응답시간</Text>
                        </View>
                        <View style={{borderColor: '#d0d0d0', flex: 0.5,padding:10,borderWidth:1,borderColor:"#d0d0d0",borderBottomColor:"#f6f6f6"}}>
                            <Text style={{color:'#919191',fontSize:13}}>10분</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row',paddingLeft:20,paddingBottom:10}}>
                        <View style={{backgroundColor: '#f6f6f6', flex: 0.3,padding:10,borderWidth:1,borderColor:"#d0d0d0",borderRightColor:"#f6f6f6"}} >
                            <Text style={{color:'#919191',fontSize:13}}>모집인원</Text>
                        </View>
                        <View style={{borderColor: '#d0d0d0', flex: 0.5,padding:10,borderWidth:1,borderColor:"#d0d0d0"}}>
                            <Text style={{color:'#919191',fontSize:13}}>5000명 (1238명 참여)</Text>
                        </View>
                    </View>
                    <View style={SurveyFormStyle.lingBg}></View>
                    <View style={{flex:1, flexDirection: 'row', paddingTop:5, paddingBottom:5}}>
                        <View style={{flex:0.65}}>
                            <Text>2017.10.21 ~ 완료시까지</Text>
                        </View>
                        <View style={{flex:0.35}}>
                            <Button bordered full style={{borderColor:"#979797", backgroundColor:"#DA4211", justifyContent: 'center', paddingLeft:10}}>
                                <Text style={{color:"#ffffff"}} onPress={Actions.Survey}>이어하기</Text>
                            </Button>
                        </View>
                    </View>

                </View>

                <View style={SurveyFormStyle.contentsLayout}>
                    <View style={{flex:1, flexDirection: 'row', paddingTop:10, paddingBottom:5}}>
                        <View style={{flex:0.1}}>
                            <Image source={require('../../assets/img/main_icon_logo_off.png')} resizeMode={'contain'} style={{width:30,height:30}}/>
                        </View>
                        <View style={{flex:0.4,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={{color:'#919191',fontSize:13}}>완료</Text>
                        </View>
                        <View style={{flex:0.4}}></View>
                        <View style={{flex:0.1}}>
                            <Text>맥주</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={SurveyFormStyle.title}>2017 맥주 브랜드에 대한 이미지 조사</Text>
                    </View>
                    <View style={SurveyFormStyle.lingBg}>
                    </View>
                    <View>
                        <Text style={SurveyFormStyle.contentsSize}>본 설문조사는 회원님의 소중한 의견을 듣고자 진행하는 일반적인 설문조사입니다.</Text>
                    </View>
                    <View style={{flexDirection: 'row', paddingLeft: 20,paddingTop:10}}>

                        <View style={{backgroundColor: '#f6f6f6', flex: 0.3,padding:10,borderWidth:1,borderColor:"#d0d0d0",borderBottomColor:"#f6f6f6",borderRightColor:"#f6f6f6"}} >
                            <Text style={{color:'#919191',fontSize:13}}>포인트적립</Text>
                        </View>
                        <View style={{borderColor: '#d0d0d0', flex: 0.5,padding:10,borderWidth:1,borderColor:"#d0d0d0",borderBottomColor:"#f6f6f6"}}>
                            <Text style={{color:'#919191',fontSize:13}}>10~800P</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row',paddingLeft:20}}>
                        <View style={{backgroundColor: '#f6f6f6', flex: 0.3,padding:10,borderWidth:1,borderColor:"#d0d0d0",borderRightColor:"#f6f6f6",borderBottomColor:"#f6f6f6"}} >
                            <Text style={{color:'#919191',fontSize:13}}>응답시간</Text>
                        </View>
                        <View style={{borderColor: '#d0d0d0', flex: 0.5,padding:10,borderWidth:1,borderColor:"#d0d0d0",borderBottomColor:"#f6f6f6"}}>
                            <Text style={{color:'#919191',fontSize:13}}>10분</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row',paddingLeft:20,paddingBottom:10}}>
                        <View style={{backgroundColor: '#f6f6f6', flex: 0.3,padding:10,borderWidth:1,borderColor:"#d0d0d0",borderRightColor:"#f6f6f6"}} >
                            <Text style={{color:'#919191',fontSize:13}}>모집인원</Text>
                        </View>
                        <View style={{borderColor: '#d0d0d0', flex: 0.5,padding:10,borderWidth:1,borderColor:"#d0d0d0"}}>
                            <Text style={{color:'#919191',fontSize:13}}>5000명 (4980명 참여)</Text>
                        </View>
                    </View>
                    <View style={SurveyFormStyle.lingBg}></View>
                    <View style={{flex:1, flexDirection: 'row', paddingTop:5, paddingBottom:5}}>
                        <View style={{flex:0.65}}>
                            <Text>2017.10.21 ~ 완료시까지</Text>
                        </View>
                    </View>

                </View>

            </ScrollView>
        );
    };
}

const SurveyFormStyle = StyleSheet.create({
    headerLayout: {
        justifyContent: 'center', alignItems: 'center', backgroundColor: "#ffffff"
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
    ,contentsSize: {
        fontSize:13
        ,lineHeight:25
    }
    ,title: {
        fontSize:15
        ,fontWeight: 'bold'
        ,paddingTop:5
        ,paddingBottom:5
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