import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, StyleSheet, TouchableOpacity,AlertIOS,Alert,Platform,WebView,AsyncStorage,NativeModules} from 'react-native';
import {Container, Header, Body, Content, Footer, Item, Icon, Input, Button, Left, Right} from 'native-base';
import config from '../../src/config';

import renderIf from 'render-if'
import I18n from 'react-native-i18n';

import Spinner from 'react-native-loading-spinner-overlay';



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
import {RadioButtonInput} from "react-native-simple-radio-button";

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
        this.state = { visible: true, languageLocale: "ko" };
    }

    complateSurvey()
    {
        Actions.pop({ refresh: {stepView: 1}})
    }


    showSpinner() {
        console.log('Show Spinner');
        this.setState({ visible: true });
    }

    hideSpinner() {
        console.log('Hide Spinner');
        this.setState({ visible: false });
    }

    componentWillMount(){
        AsyncStorage.getItem(config.STORE_KEY).then((value) => {
            var json = eval("("+value+")");
            var lang = json.lang;
            this.setState({languageLocale : lang});
            I18n.locale = lang;
            I18n.fallbacks = true;

        }).then(res => {

        });
    }


    respondToOnMessage = e =>{
        var data = eval("("+e.nativeEvent.data+")");
        console.log(data);
        if(data.SURVEY_TYPE == "END") {
            switch (data.ERR_CODE) {
                case "000":
                    Actions.pop({ refresh: {stepView: 1}})

                    break;

            }
        }


        //console.log(data.ERR_CODE);
    };

    render() {

        return (

            <Container>

                <Header style={noticeFormStyle.headerLayout}>
                    <Left style={{flex:1}}>
                        <TouchableOpacity onPress={() => Actions.pop()} style={{width:50, height:50, justifyContent:'center', alignItems:'center'}}>
                            <View style={{justifyContent: 'center', alignItems: 'flex-start'}}>
                                {renderIf(this.props.lang=="ko")(
                                    <Text style={{fontSize:12,color:'#fff'}}>나가기</Text>
                                )}
                                {renderIf(this.props.lang=="en")(
                                    <Text style={{fontSize:12,color:'#fff'}}>Leave</Text>
                                )}
                                {renderIf(this.props.lang=="zh")(
                                    <Text style={{fontSize:12,color:'#fff'}}>退出</Text>
                                )}

                            </View>
                        </TouchableOpacity>
                    </Left>
                    <Body>
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                        {renderIf(this.props.lang=="ko")(
                            <Text style={{fontSize:16,color:'#fff'}}>결과보기</Text>
                        )}
                        {renderIf(this.props.lang=="en")(
                            <Text style={{fontSize:16,color:'#fff'}}>View results</Text>
                        )}
                        {renderIf(this.props.lang=="zh")(
                            <Text style={{fontSize:16,color:'#fff'}}>查看結果</Text>
                        )}

                    </View>
                    </Body>
                    <Right>
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-end'}}>
                        </View>
                    </Right>
                </Header>

                <Spinner
                    visible={this.state.visible}
                    textContent={'Loading...'}
                    textStyle={{ color: '#FFF' }}
                />

                <WebView style={noticeFormStyle.contentsLayout}
                     javaScriptEnabled={true}
                     source={{uri: config.SERVER_URL+'/survey/surveyResult?clsampaign_code='+this.props.campaign_code+"&lang="+this.state.languageLocale}}
                     onMessage={this.respondToOnMessage}
                     onLoadStart={() => (this.showSpinner())}
                     onLoad={() => (this.hideSpinner())}>

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
