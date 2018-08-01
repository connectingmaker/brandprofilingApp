import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, StyleSheet, TouchableOpacity,Alert,Platform,NativeModules } from 'react-native';
import { Container, Header, Left, Body, Right, Content, Footer,Item, Icon, Input,Button } from 'native-base';
import renderIf from 'render-if'


import I18n from 'react-native-i18n';
var langRegionLocale = "en_US";
if (Platform.OS === "android") {
    langRegionLocale = NativeModules.I18nManager.localeIdentifier || "";
} else if (Platform.OS === "ios") {
    langRegionLocale = NativeModules.SettingsManager.settings.AppleLocale || "";
}

var languageLocale = langRegionLocale.substring(0, 2);
if(languageLocale != "ko" && languageLocale != "en" && languageLocale != "zh") {
    languageLocale = "en";
}

import en from '../lang/en';
import zh from '../lang/zh';
import ko from '../lang/ko';

I18n.fallbacks = true;
I18n.locale = languageLocale;
I18n.translations = {
    en,
    zh,
    ko
};



export default class Survey extends Component {


    constructor(props){
        super(props);
        this.state ={
            stepView:1
        }


    }

    componentWillReceiveProps(nextProps)
    {
        this.setState({stepView: nextProps.stepView});
    }

    stepNext(value){

        this.setState({stepView: value});
    }

    render() {


        return (

            <Container>
                <Header style={SurveyFormStyle.headerLayout2}>
                    <Left style={{flex:1}}>
                        <TouchableOpacity onPress={() => Actions.Main({type:"reset", refresh: true})} style={{width:50, height:50, justifyContent:'center', alignItems:'center'}}>
                            <View>
                                {renderIf(languageLocale=="ko")(
                                    <Text style={{fontSize:12,color:'#fff'}}>나가기</Text>
                                )}
                                {renderIf(languageLocale=="en")(
                                    <Text style={{fontSize:12,color:'#fff'}}>Leave</Text>
                                )}
                                {renderIf(languageLocale=="zh")(
                                    <Text style={{fontSize:12,color:'#fff'}}>退出</Text>
                                )}
                            </View>
                        </TouchableOpacity>
                    </Left>
                    <Body style={{flex:1}}>
                    <View style={{alignItems: 'center',justifyContent:'center'}}>
                        {renderIf(languageLocale=="ko")(
                            <Text style={{fontSize:16,color:'#fff'}}>설문하기</Text>
                        )}
                        {renderIf(languageLocale=="en")(
                            <Text style={{fontSize:16,color:'#fff'}}>Survey</Text>
                        )}
                        {renderIf(languageLocale=="zh")(
                            <Text style={{fontSize:16,color:'#fff'}}>调查</Text>
                        )}
                    </View>
                    </Body>
                    <Right style={{flex:1}}>
                        <TouchableOpacity onPress={() => this.openControlPanel()} style={{width:30, height:50, justifyContent:'center', alignItems:'center'}}>
                            <View>
                            </View>
                        </TouchableOpacity>
                    </Right>

                </Header>

                <Content style={{padding:10}}>
                    {renderIf(this.state.stepView == 1)(
                        <View>
                            <View style={SurveyFormStyle.contentsLayout}>
                                <View>
                                    <View style={{padding:10,alignItems:'center'}}>
                                        <Image source={require('../../assets/img/presurvey_icon_list.png')} resizeMode={'contain'} style={{width:30,height:30}}/>
                                    </View>
                                    <View style={{padding:10,alignItems:'center'}}>
                                        <Text style={{fontSize:12}}>{I18n.t("survey_text1")}</Text>
                                    </View>
                                </View>
                                <View style={SurveyFormStyle.lingBg}></View>
                                <View>
                                    <Text style={SurveyFormStyle.contentsSize}>{I18n.t("survey_text2")}</Text>
                                </View>
                                <View>
                                    {renderIf(languageLocale == "ko") (
                                        <Text style={SurveyFormStyle.contentsSize}>완료하신 경우에는 <Text style={SurveyFormStyle.boldFont}>{this.props.point}P</Text>를 드립니다.</Text>
                                    )}

                                    {renderIf(languageLocale == "en") (
                                        <Text style={SurveyFormStyle.contentsSize}>If you are finished, we will give <Text style={SurveyFormStyle.boldFont}>{this.props.point}P</Text></Text>
                                    )}

                                    {renderIf(languageLocale == "zh") (
                                        <Text style={SurveyFormStyle.contentsSize}>If you are finished, we will give <Text style={SurveyFormStyle.boldFont}>{this.props.point}P</Text></Text>
                                    )}

                                </View>
                                <View style={SurveyFormStyle.lingBg}></View>
                                <View>
                                    <Text style={SurveyFormStyle.contentsSize}>{I18n.t("survey_text4")}</Text>
                                </View>
                                <View style={SurveyFormStyle.lingBg}></View>


                                <Button bordered full style={{borderColor:"#979797", backgroundColor:"#DA4211", justifyContent: 'center', paddingLeft:10}} onPress={()=>Actions.SurveyJoin({campaign_code:this.props.campaign_code, quest_num:this.props.quest_num, uid:this.props.uid})}>
                                    <Text style={{marginLeft:10, color:"#ffffff"}}>{I18n.t("survey_text5")}</Text>
                                </Button>

                            </View>

                        </View>
                    )}
                    {renderIf(this.state.stepView == 2)(
                    <View>
                        <View style={preSurveyFormStyle.contentsLayout}>
                            <View>
                                <View style={{padding:10,alignItems:'center'}}>
                                    <Image source={require('../../assets/img/presurvey_icon_list.png')} resizeMode={'contain'} style={{width:30,height:30}}/>
                                </View>
                                <View style={{padding:10,alignItems:'center'}}>
                                    <Text style={{fontSize:12}}>{I18n.t("survey_text6")}</Text>
                                </View>
                            </View>
                            <View style={preSurveyFormStyle.lingBg}></View>
                            <View>
                                {renderIf(languageLocale == "ko") (
                                    <Text style={preSurveyFormStyle.contentsSize}><Text style={preSurveyFormStyle.boldFont}>{this.props.point}P</Text>를 회원님의 적립함에 넣어드렸어요! 소중한 참여에 다시 한번 감사드립니다.</Text>
                                )}

                                {renderIf(languageLocale == "en") (
                                    <Text style={preSurveyFormStyle.contentsSize}>With all of our gratitude, we have put <Text style={preSurveyFormStyle.boldFont}>{this.props.point}P</Text> into your membership! Thank you once again for your valuable participation.</Text>
                                )}

                                {renderIf(languageLocale == "zh") (
                                    <Text style={SurveyFormStyle.contentsSize}>With all of our gratitude, we have put <Text style={preSurveyFormStyle.boldFont}>{this.props.point}P</Text> into your membership! Thank you once again for your valuable participation.</Text>
                                )}


                            </View>
                            <View style={preSurveyFormStyle.lingBg}></View>
                            <View>
                                <Text style={preSurveyFormStyle.contentsSize}>{I18n.t("survey_text8")}</Text>
                            </View>
                            <View style={{flex:1, flexDirection: 'row', paddingTop:5, paddingBottom:5}}>


                                <View style={{flex:1}}>
                                    <Button bordered full style={{borderColor:"#979797",backgroundColor:"#DA4211"}} onPress={() => Actions.Main({type:"reset", refresh: true})}>
                                        <Text style={{color:"#fff"}}>{I18n.t("survey_text9")}</Text>
                                    </Button>
                                </View>
                            </View>



                        </View>
                    </View>
                        )}
                    
                </Content>

            </Container>
        );
    }
}



const SurveyFormStyle = StyleSheet.create({
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
        ,backgroundColor:"#f6f6f6"
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


const preSurveyFormStyle = StyleSheet.create({
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
        ,backgroundColor:"#f6f6f6"
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


const styles = StyleSheet.create({
    radio: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    }
})