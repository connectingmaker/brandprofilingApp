import React, { Component } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text ,ScrollView} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Item, Icon, Input, Button ,ActionSheet} from 'native-base';

export default class pointHistory extends Component {

    render() {
        return (
            <ScrollView>


                <View style={SurveyFormStyle.contentsLayout}>
                    <View style={{flex:1, flexDirection: 'row', paddingTop:10, paddingBottom:5}}>
                        <View style={{flex:0.4,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={{color:'#4D4D4D',fontSize:15,fontWeight: 'bold'}}>나의 포인트</Text>
                        </View>
                        <View style={{flex:0.6,alignItems:'flex-end'}}>
                            <Text style={SurveyFormStyle.boldFont}>52,300P</Text>
                        </View>
                    </View>
                    <View style={SurveyFormStyle.lingBg}></View>
                    <Button bordered full style={{borderColor:"#979797", backgroundColor:"#DA4211", justifyContent: 'center', paddingLeft:10}}>
                        <Text style={{marginLeft:10, color:"#ffffff"}} onPress={Actions.Payment}>환급신청</Text>
                    </Button>
                </View>

                <View style={SurveyFormStyle.contentsLayout2}>
                    <View style={{flex:1, flexDirection: 'row', paddingTop:10, paddingBottom:5}}>
                        <View style={{flex:0.4,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={{color:'#4D4D4D',fontSize:15,fontWeight: 'bold'}}>포인트 환급 내역</Text>
                        </View>
                        <View style={{flex:0.6,alignItems:'flex-end'}}>
                            <Image source={require("../../assets/img/up_arrow_img.png")} resizeMode={'contain'} style={{width:18, height:18}} />
                        </View>
                    </View>
                    <View style={SurveyFormStyle.lingBg}></View>

                    <View style={{flex:1, flexDirection: 'row', paddingTop:5, paddingBottom:5}}>
                        <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={{color:'#979797',fontSize:13}}>신청 완료 - 접수대기중</Text>
                        </View>
                        <View style={{flex:0.4,alignItems:'flex-end'}}>
                            <Text style={{color:'#979797',fontSize:13}}>5,000P</Text>
                        </View>
                    </View>
                    <View style={{flex:1, flexDirection: 'row'}}>
                        <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={{color:'#979797',fontSize:10}}>신청일 2017-08-19 13:30:21</Text>
                        </View>
                        <View style={{flex:0.4,alignItems:'flex-end'}}>
                            <Text style={{color:'#979797',fontSize:10}}>류* 농협 301************</Text>
                        </View>
                    </View>
                    <View style={SurveyFormStyle.lingBg}></View>

                    <View style={{flex:1, flexDirection: 'row', paddingTop:5, paddingBottom:5}}>
                        <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={{color:'#979797',fontSize:13}}>접수 완료 - 환급진행중</Text>
                        </View>
                        <View style={{flex:0.4,alignItems:'flex-end'}}>
                            <Text style={{color:'#979797',fontSize:13}}>5,100P</Text>
                        </View>
                    </View>
                    <View style={{flex:1, flexDirection: 'row'}}>
                        <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={{color:'#979797',fontSize:10}}>신청일 2017-08-19 13:30:21</Text>
                        </View>
                        <View style={{flex:0.4,alignItems:'flex-end'}}>
                            <Text style={{color:'#979797',fontSize:10}}>류* 농협 301************</Text>
                        </View>
                    </View>
                    <View style={SurveyFormStyle.lingBg}></View>

                    <View style={{flex:1, flexDirection: 'row', paddingTop:5, paddingBottom:5}}>
                        <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={SurveyFormStyle.contentsSize}><Text style={SurveyFormStyle.boldFont}>New</Text><Text style={{color:'#979797',fontSize:13}}>환급완료 </Text></Text>
                        </View>
                        <View style={{flex:0.4,alignItems:'flex-end'}}>
                            <Text style={SurveyFormStyle.boldFont}>8,900P</Text>
                        </View>
                    </View>
                    <View style={{flex:1, flexDirection: 'row'}}>
                        <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={{color:'#979797',fontSize:10}}>신청일 2017-08-19 13:30:21</Text>
                        </View>
                        <View style={{flex:0.4,alignItems:'flex-end'}}>
                            <Text style={{color:'#979797',fontSize:10}}>류* 농협 301************</Text>
                        </View>
                    </View>
                    <View style={SurveyFormStyle.lingBg}></View>

                    <View style={{flex:1, flexDirection: 'row', paddingTop:5, paddingBottom:5}}>
                        <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={{color:'#979797',fontSize:13}}>교환 취소 - 은행계좌 오류</Text>
                        </View>
                        <View style={{flex:0.4,alignItems:'flex-end'}}>
                            <Text style={{color:'#979797',fontSize:13}}>12,900P(취소</Text>
                        </View>
                    </View>
                    <View style={{flex:1, flexDirection: 'row'}}>
                        <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={{color:'#979797',fontSize:10}}>신청일 2017-08-19 13:30:21</Text>
                        </View>
                        <View style={{flex:0.4,alignItems:'flex-end'}}>
                            <Text style={{color:'#979797',fontSize:10}}>류* 농협 301************</Text>
                        </View>
                    </View>
                </View>

                <View style={SurveyFormStyle.contentsLayout3}>
                    <View style={{flex:1, flexDirection: 'row', paddingTop:10, paddingBottom:5}}>
                        <View style={{flex:0.4,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={{color:'#4D4D4D',fontSize:15,fontWeight: 'bold'}}>포인트 적립 내역</Text>
                        </View>
                        <View style={{flex:0.6,alignItems:'flex-end'}}>
                            <Image source={require("../../assets/img/up_arrow_img.png")} resizeMode={'contain'} style={{width:18, height:18}} />
                        </View>
                    </View>
                    <View style={SurveyFormStyle.lingBg}></View>

                    <View style={{flex:1, flexDirection: 'row', paddingTop:5, paddingBottom:5}}>
                        <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={SurveyFormStyle.contentsSize}><Text style={SurveyFormStyle.boldFont}>New</Text><Text style={{color:'#979797',fontSize:13}}>2017 맥주 브랜드에 관한 ... </Text></Text>
                        </View>
                        <View style={{flex:0.4,alignItems:'flex-end'}}>
                            <Text style={SurveyFormStyle.boldFont}>500P</Text>
                        </View>
                    </View>
                    <View style={{flex:1, flexDirection: 'row'}}>
                        <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={{color:'#979797',fontSize:10}}>적립일 2017-08-19 13:30:21</Text>
                        </View>
                        <View style={{flex:0.4,alignItems:'flex-end'}}>
                            <Text style={{color:'#979797',fontSize:10}}>3차</Text>
                        </View>
                    </View>
                    <View style={SurveyFormStyle.lingBg}></View>

                    <View style={{flex:1, flexDirection: 'row', paddingTop:5, paddingBottom:5}}>
                        <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={SurveyFormStyle.contentsSize}><Text style={{color:'#979797',fontSize:13}}>2017 맥주 브랜드에 관한 이미지 조사 </Text></Text>
                        </View>
                        <View style={{flex:0.4,alignItems:'flex-end'}}>
                            <Text style={SurveyFormStyle.boldFont}>300P</Text>
                        </View>
                    </View>
                    <View style={{flex:1, flexDirection: 'row'}}>
                        <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={{color:'#979797',fontSize:10}}>적립일 2017-08-19 13:30:21</Text>
                        </View>
                        <View style={{flex:0.4,alignItems:'flex-end'}}>
                            <Text style={{color:'#979797',fontSize:10}}>2차</Text>
                        </View>
                    </View>
                    <View style={SurveyFormStyle.lingBg}></View>
                    <View style={{flex:1, flexDirection: 'row', paddingTop:5, paddingBottom:5}}>
                        <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={SurveyFormStyle.contentsSize}><Text style={{color:'#979797',fontSize:13}}>2017 맥주 브랜드에 관한 조사 </Text></Text>
                        </View>
                        <View style={{flex:0.4,alignItems:'flex-end'}}>
                            <Text style={SurveyFormStyle.boldFont}>200P</Text>
                        </View>
                    </View>
                    <View style={{flex:1, flexDirection: 'row'}}>
                        <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={{color:'#979797',fontSize:10}}>적립일 2017-08-19 13:30:21</Text>
                        </View>
                        <View style={{flex:0.4,alignItems:'flex-end'}}>
                            <Text style={{color:'#979797',fontSize:10}}>1차</Text>
                        </View>
                    </View>
                    <View style={SurveyFormStyle.lingBg}></View>
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
    ,contentsLayout2: {
        width: "100%"
        ,marginTop:30
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