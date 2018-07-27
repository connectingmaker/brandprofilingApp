import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, StyleSheet, TouchableOpacity,AlertIOS,Alert,Platform,WebView,AsyncStorage,NativeModules} from 'react-native';
import { Container, Header, Body, Content, Footer,Item, Icon, Input,Button } from 'native-base';
import config from '../../src/config';

import renderIf from 'render-if'
import I18n from 'react-native-i18n';

var langRegionLocale = "en_US";
if (Platform.OS === "android") {
    langRegionLocale = NativeModules.I18nManager.localeIdentifier || "";
} else if (Platform.OS === "ios") {
    langRegionLocale = NativeModules.SettingsManager.settings.AppleLocale || "";
}

var languageLocale = langRegionLocale.substring(0, 2);
var weblang = "";

import en from '../lang/en';
import zh from '../lang/zh';
import ko from '../lang/ko';

if(languageLocale != "ko" && languageLocale != "en" && languageLocale != "zh") {
    languageLocale = "en";
}

if(languageLocale == "ko") {
    weblang = "ko";
} else if(languageLocale == "zh") {
    weblang = "cn";
} else {
    weblang = "en";
}

I18n.fallbacks = true;
I18n.locale = languageLocale;
I18n.translations = {
    en,
    zh,
    ko
};

export default class SurveyJoin extends Component {
    constructor(props){
        super(props);

    }

    complateSurvey()
    {
        Actions.pop({ refresh: {stepView: 1}})
    }


    respondToOnMessage = e =>{
        var data = eval("("+e.nativeEvent.data+")");
        if(data.SURVEY_TYPE == "END") {
            switch (data.ERR_CODE) {
                case "000":
                    Alert.alert(
                        '',
                        '설문이 완료되었습니다.',
                        [
                            {text: '확인', onPress: () => Actions.pop({ refresh: {stepView: 2}})},
                        ],
                        {cancelable: false}
                    )


                    break;
                default:
                    Alert.alert(
                        '',
                        '참여이력이 존재합니다.',
                        [
                            {text: '확인', onPress: () => Actions.pop({ refresh: {stepView: 2}})},
                        ],
                        {cancelable: false}
                    )
                    break;
            }
        } else {
            switch (data.ERR_CODE) {
                case "999":
                    Alert.alert(
                        '',
                        '참여이력이 존재합니다.',
                        [
                            {text: '확인', onPress: () => Actions.pop({ refresh: {stepView: 2}})},
                        ],
                        {cancelable: false}
                    )

                    //Actions.Survey({type:"reset"});

                    break;

            }
        }

        
        //console.log(data.ERR_CODE);
    };

    render() {

        return (

            <Container>

                <Header style={noticeFormStyle.headerLayout}>
                    <TouchableOpacity onPress={() => Actions.pop()} style={{flex:.2, alignItems: 'flex-start'}}>
                    <View style={{flex:.2, justifyContent: 'center', alignItems: 'flex-start'}}>
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
                    <View style={{flex:.6, justifyContent: 'center', alignItems: 'center'}}>
                        {renderIf(languageLocale=="ko")(
                            <Text style={{fontSize:16,color:'#fff'}}>설문참여</Text>
                        )}
                        {renderIf(languageLocale=="en")(
                            <Text style={{fontSize:16,color:'#fff'}}>Survey participation</Text>
                        )}
                        {renderIf(languageLocale=="zh")(
                            <Text style={{fontSize:16,color:'#fff'}}>调查参与</Text>
                        )}

                    </View>
                    <View style={{flex:.2, justifyContent: 'center', alignItems: 'flex-end'}}>
                    </View>
                </Header>

                <WebView style={noticeFormStyle.contentsLayout} source={{uri: config.SERVER_URL+'/survey/start?campaign_code='+this.props.campaign_code+'&lang='+weblang+'&quest_num='+this.props.quest_num+'&uid='+this.props.uid}} onMessage={this.respondToOnMessage}>

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
