import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, StyleSheet, TouchableOpacity,Alert,Platform,NativeModules,AsyncStorage,WebView} from 'react-native';
import { Container, Header, Left, Body, Right, Content, Footer,Item, Icon, Input,Button } from 'native-base';
import renderIf from 'render-if'
import config from '../config'

import HTMLView from 'react-native-htmlview';
import Spinner from 'react-native-loading-spinner-overlay';


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


export default class ContentsViewSub extends Component {


    constructor(props){
        super(props);
        console.log(config.SERVER_URL + "/api/contentsView/" + this.props.seq+"?lang="+languageLocale);
        this.state = {
            loaded: false
            ,seq:""
            ,subject:""
            ,subject_en:""
            ,subject_cn:""
            ,contents:""
            ,contents_en:""
            ,contents_cn:""
            ,visible:true
        }

    }

    componentDidMount(){
        this.mounted = true;

        console.log(this.props.seq);
        this.state.loaded = true;
        // this.loadJSONData();

    }

    componentWillUnmount() {
        this.mounted = false;

    }

    showSpinner() {
        console.log('Show Spinner');
        this.setState({ visible: true });
    }

    hideSpinner() {
        console.log('Hide Spinner');
        this.setState({ visible: false });
    }

    // loadJSONData() {
    //
    //
    //         var object = {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //             }
    //             ,body:  JSON.stringify({
    //                 'seq': this.props.seq
    //             })
    //         }
    //
    //         console.log(object.body);
    //
    //
    //         fetch(config.SERVER_URL+"/api/contentsView", object)
    //             .then((response) => response.json())
    //             .then((responseJson) =>{
    //
    //                 this.state.loaded = false;
    //                 console.log("데이터 호출");
    //                 console.log(responseJson);
    //                 // console.log("contentView_OK3");
    //                 // console.log(responseJson[0]);
    //                 // console.log(responseJson[0].SUBJECT);
    //
    //                 this.setState({subject: responseJson.SUBJECT ,subject_en: responseJson.SUBJECT_EN ,subject_cn: responseJson.SUBJECT_CN,contents: responseJson.CONTENTS ,contents_en: responseJson.CONTENTS_EN ,contents_cn: responseJson.CONTENTS_CN});
    //                 console.log(responseJson.CONTENTS);
    //
    //             })
    //             .catch((err) => {
    //                 console.log("오류발생");
    //             });
    //
    // }

    render() {

        return (
            <Container>
                <Header style={SurveyFormStyle.headerLayout2}>
                    <View style={{flex:.2, justifyContent: 'center', alignItems: 'flex-start'}}>
                        {renderIf(languageLocale=="ko")(
                            <Text style={{fontSize:12,color:'#fff'}} onPress={Actions.pop}>나가기</Text>
                        )}
                        {renderIf(languageLocale=="en")(
                            <Text style={{fontSize:12,color:'#fff'}} onPress={Actions.pop}>Leave</Text>
                        )}
                        {renderIf(languageLocale=="zh")(
                            <Text style={{fontSize:12,color:'#fff'}} onPress={Actions.pop}>退出</Text>
                        )}
                    </View>
                    <View style={{flex:.6, justifyContent: 'center', alignItems: 'center'}}>
                        {renderIf(languageLocale == "ko")(
                            <Text style={{fontSize:16,color:'#fff'}}>콘텐츠보기</Text>
                        )}
                        {renderIf(languageLocale == "en")(
                            <Text style={{fontSize:16,color:'#fff'}}>contents</Text>
                        )}
                        {renderIf(languageLocale == "zh")(
                            <Text style={{fontSize:16,color:'#fff'}}>内容</Text>
                        )}
                    </View>
                    <View style={{flex:.2, justifyContent: 'center', alignItems: 'flex-end'}}>
                    </View>
                </Header>
                <Content>
                    {/*<View style={{marginBottom:10}}>*/}
                        {/*<View>*/}
                            {/*<View style={SurveyFormStyle.contentsHead}>*/}
                                {/*{renderIf(languageLocale == "ko") (*/}
                                    {/*<Text style={SurveyFormStyle.contentsSize}>{this.state.subject}</Text>*/}
                                {/*)}*/}

                                {/*{renderIf(languageLocale == "en") (*/}
                                    {/*<Text style={SurveyFormStyle.contentsSize}>{this.state.subject_en}</Text>*/}
                                {/*)}*/}

                                {/*{renderIf(languageLocale == "zh") (*/}
                                    {/*<Text style={SurveyFormStyle.contentsSize}>{this.state.subject_cn}</Text>*/}
                                {/*)}*/}
                            {/*</View>*/}
                        {/*</View>*/}
                    {/*</View>*/}

                    <Spinner
                        visible={this.state.visible}
                        textContent={'Loading...'}
                        textStyle={{ color: '#FFF' }}
                    />

                    <WebView
                        javaScriptEnabled={true}
                        source={{uri:config.SERVER_URL + "/api/contentsView/" + this.props.seq+"?lang="+languageLocale}} style={{height:700}} onLoadStart={() => (this.showSpinner())}
                        onLoad={() => (this.hideSpinner())}></WebView>
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
        width: "100%",paddingTop:10,paddingBottom:10,paddingLeft:20,paddingRight:20,backgroundColor:"#fff",shadowColor: "rgba(0,0,0,23)",shadowOffset: { width: 0, height: 1 } ,shadowOpacity: 0.3
    }
    ,contentsHead:{
        width: "100%" ,justifyContent: 'center', alignItems: 'center',fontSize:20 ,paddingTop:10, paddingBottom:10, fontWeight: 'bold', backgroundColor:'#f1f1f1'
    }
    ,contentsLayout2: {
        width: "100%" ,paddingTop:10 ,paddingBottom:10 ,paddingLeft:20 ,paddingRight:20 ,backgroundColor:"#f6f6f6" ,shadowColor: "rgba(0,0,0,23)" ,shadowOffset: { width: 0, height: 1 } ,shadowOpacity: 0.3
    }
    ,contentsSize: {
        fontSize:13 ,lineHeight:25
    }
    ,boldFont: {
        color:"#DA4211" ,fontWeight: 'bold'
    }
    ,input: {
        fontSize:12 ,paddingTop:13 ,paddingLeft:11 ,paddingBottom:12 ,height:38 ,backgroundColor: "#ffffff"
    }
    ,lingBg: {
        backgroundColor:"rgba(127,127,127,0.3)" ,height:1 ,marginTop:10 ,marginBottom:10
    }


})
