import React from "react";
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, StyleSheet, TouchableOpacity,AppRegistry,StatusBar,AsyncStorage, Platform, NativeModules, Alert } from 'react-native';
import { Container, Header, Body, Content, List, ListItem,Footer,Item, Icon, Input,Button } from 'native-base';
import Switch from 'react-native-switch-pro'
import config from '../config';
import RNRestart from 'react-native-restart';
const routes = ["home", "business", "tech", "profile"];

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
import renderIf from "render-if";

I18n.fallbacks = true;
I18n.locale = languageLocale;
I18n.translations = {
    en,
    zh,
    ko
};



export default class SideBar extends React.Component {

    static allpush_yn = false;
    static survey_push_yn = false;

    constructor(){
        super();
        this.state ={
            allpush:true
            ,surveypush:true
            ,languageLocale : "ko"
        }



        var object = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'text/html'
            }
        }




    }

    componentWillMount()
    {

        this.loadJSONData();
    }

    componentDidMount()
    {
    }

    loadJSONData() {
        AsyncStorage.getItem(config.STORE_KEY).then((value) => {
            var json = eval("("+value+")");
            var langType = json.lang;

            if(langType == null || langType == "") {
                langType = "ko";
            }

            this.setState({languageLocale:langType});


        }).then(res => {

        });


    }

    _allPush()
    {

        if(this.state.allpush == true) {
            this.setState({allpush:false});

        } else {
            this.setState({allpush:true});
        }

        AsyncStorage.getItem(config.STORE_KEY).then((value) => {
            var json = eval("("+value+")");



            var dataObject = {
                "SESS_UID" : json.SESS_UID
                ,"SESS_USEREMAIL" : json.SESS_USEREMAIL
                , "SESS_ALL_PUSH_YN": this.state.allpush
                , "SESS_SURVEY_PUSH_YN": this.state.surveypush
                , "intro" : json.intro
                , "lang" : json.lang
            };
            var lang = json.lang;
            this.setState({languageLocale :lang});
            I18n.locale = lang;
            I18n.fallbacks = true;

            AsyncStorage.setItem(config.STORE_KEY, JSON.stringify(dataObject), () => Actions.Login());


        }).then(res => {

        });

    }

    _surveyPush()
    {

        if(this.state.surveypush == true) {
            this.setState({surveypush:false});
        } else {
            this.setState({surveypush:true});
        }

        AsyncStorage.getItem(config.STORE_KEY).then((value) => {
            var json = eval("("+value+")");
            var all_push_yn = json.SESS_ALL_PUSH_YN;

            var survey_push_yn = json.SESS_SURVEY_PUSH_YN;





            var dataObject = {
                "SESS_UID" : json.SESS_UID
                ,"SESS_USEREMAIL" : json.SESS_USEREMAIL
                , "SESS_ALL_PUSH_YN": this.state.allpush
                , "SESS_SURVEY_PUSH_YN": this.state.surveypush
                , "intro" : json.intro
                , "lang" : json.lang

            };

            AsyncStorage.setItem(config.STORE_KEY, JSON.stringify(dataObject));


        }).then(res => {

        });

    }

    _languageChange(lang) {
        if(lang == "ko") {
            if( this.setState.languageLocale == "en"){
                Alert.alert(
                    '',
                    'Change to Korean',
                    [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: 'OK', onPress: () => this._languageChangeSave(lang)},
                    ],
                    { cancelable: false }
                )
            }else if(this.setState.languageLocale == "zh"){
                Alert.alert(
                    '',
                    '換到韓語',
                    [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: 'OK', onPress: () => this._languageChangeSave(lang)},
                    ],
                    { cancelable: false }
                )
            }else{
                Alert.alert(
                    '',
                    '한국어로 변경',
                    [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: 'OK', onPress: () => this._languageChangeSave(lang)},
                    ],
                    { cancelable: false }
                )
            }

        }


        if(lang == "en") {
            if( this.setState.languageLocale == "ko"){
                Alert.alert(
                    '',
                    '영어로 변경',
                    [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: 'OK', onPress: () => this._languageChangeSave(lang)},
                    ],
                    { cancelable: false }
                )
            }else if(this.setState.languageLocale == "zh"){
                Alert.alert(
                    '',
                    '改為英語',
                    [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: 'OK', onPress: () => this._languageChangeSave(lang)},
                    ],
                    { cancelable: false }
                )
            }else{
                Alert.alert(
                    '',
                    'Change to English',
                    [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: 'OK', onPress: () => this._languageChangeSave(lang)},
                    ],
                    { cancelable: false }
                )
            }
        }



        if(lang == "zh") {
            if( this.setState.languageLocale == "ko"){
                Alert.alert(
                    '',
                    '중어로 변경',
                    [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: 'OK', onPress: () => this._languageChangeSave(lang)},
                    ],
                    { cancelable: false }
                )
            }else if(this.setState.languageLocale == "en"){
                Alert.alert(
                    '',
                    'Changed to chinese',
                    [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: 'OK', onPress: () => this._languageChangeSave(lang)},
                    ],
                    { cancelable: false }
                )
            }else{
                Alert.alert(
                    '',
                    '改為中文',
                    [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: 'OK', onPress: () => this._languageChangeSave(lang)},
                    ],
                    { cancelable: false }
                )
            }
        }


    }

    _languageChangeSave(lang) {
        AsyncStorage.getItem(config.STORE_KEY).then((value) => {
            var json = eval("("+value+")");
            var all_push_yn = json.SESS_ALL_PUSH_YN;

            var survey_push_yn = json.SESS_SURVEY_PUSH_YN;





            var dataObject = {
                "SESS_UID" : json.SESS_UID
                ,"SESS_USEREMAIL" : json.SESS_USEREMAIL
                , "SESS_ALL_PUSH_YN": json.SESS_ALL_PUSH_YN
                , "SESS_SURVEY_PUSH_YN": json.SESS_SURVEY_PUSH_YN
                , "intro" : json.intro
                , "lang" : lang
            };

            AsyncStorage.setItem(config.STORE_KEY, JSON.stringify(dataObject), () => RNRestart.Restart());


        }).then(res => {

        });

    }



    render() {

        return (

            <Container>
                <Header style={sideBarFormStyle.headerLayout2}>
                    <View style={{flex:.8, justifyContent: 'center', alignItems: 'flex-start'}}>
                        <Text style={{fontSize:15,color:'#fff'}}>{I18n.t("side_title")}</Text>
                    </View>
                    <View style={{flex:.1, justifyContent: 'center', alignItems: 'flex-end'}}>
                        <Text style={{fontSize:12,color:'#fff'}} onPress={Actions.pop}></Text>
                    </View>
                </Header>
                <Content style={{backgroundColor:"#fff"}}>
                    <View style={sideBarFormStyle.contentsLayout}>
                        <TouchableOpacity onPress={() => this._allPush()}>
                        <View style={{flex:1, flexDirection: 'row'}}>
                            <View style={{flex:0.7,alignItems:'flex-start',justifyContent:'center'}}>
                                <Text style={sideBarFormStyle.contentsSize}>{I18n.t("all_push_text")}</Text>
                            </View>
                            <View style={{flex:0.3,alignItems:'flex-end',paddingTop:5}}>
                                {renderIf(this.state.allpush == true)(
                                <Image source={require('../../assets/img/switch_on.png')} resizeMode={'contain'} style={{width:50,height:35}}/>
                                )}

                                {renderIf(this.state.allpush == false)(
                                    <Image source={require('../../assets/img/switch_off.png')} resizeMode={'contain'} style={{width:50,height:35}}/>
                                )}
                            </View>
                        </View>
                        </TouchableOpacity>
                        <View style={sideBarFormStyle.lingBg}></View>
                        <TouchableOpacity onPress={() => this._surveyPush()}>
                        <View style={{flex:1, flexDirection: 'row'}}>
                            <View style={{flex:0.7,alignItems:'flex-start',justifyContent:'center'}}>
                                <Text style={sideBarFormStyle.contentsSize}>{I18n.t("survey_push_text")}</Text>
                            </View>
                            <View style={{flex:0.3,alignItems:'flex-end',paddingTop:5}}>
                                {renderIf(this.state.surveypush == true)(
                                <Image source={require('../../assets/img/switch_on.png')} resizeMode={'contain'} style={{width:50,height:35}}/>
                                )}

                                {renderIf(this.state.surveypush == false)(
                                    <Image source={require('../../assets/img/switch_off.png')} resizeMode={'contain'} style={{width:50,height:35}}/>
                                )}
                            </View>
                        </View>
                        </TouchableOpacity>
                        <View style={sideBarFormStyle.lingBg}></View>





                    </View>

                </Content>
                <Footer style={{backgroundColor:"#fff", border:0}}>
                    {renderIf(this.state.languageLocale == "ko")(
                        <Image source={require('../../assets/img/kr_btn_on.png')} resizeMode={'contain'} style={{width:70}} />
                    )}

                    {renderIf(this.state.languageLocale == "ko")(
                        <TouchableOpacity onPress={() => this._languageChange('en')}>
                        <Image source={require('../../assets/img/en_btn_off.png')} resizeMode={'contain'} style={{width:70}} />
                        </TouchableOpacity>
                    )}

                    {renderIf(this.state.languageLocale == "ko")(
                        <TouchableOpacity onPress={() => this._languageChange('zh')}>
                        <Image source={require('../../assets/img/cn_btn_off.png')} resizeMode={'contain'} style={{width:70}} />
                        </TouchableOpacity>
                    )}


                    {renderIf(this.state.languageLocale == "en")(
                        <TouchableOpacity onPress={() => this._languageChange('ko')}>
                        <Image source={require('../../assets/img/kr_btn_off.png')} resizeMode={'contain'} style={{width:70}} />
                        </TouchableOpacity>
                    )}

                    {renderIf(this.state.languageLocale == "en")(
                        <Image source={require('../../assets/img/en_btn_on.png')} resizeMode={'contain'} style={{width:70}} />
                    )}

                    {renderIf(this.state.languageLocale == "en")(
                        <TouchableOpacity onPress={() => this._languageChange('zh')}>
                        <Image source={require('../../assets/img/cn_btn_off.png')} resizeMode={'contain'} style={{width:70}} />
                        </TouchableOpacity>
                    )}


                    {renderIf(this.state.languageLocale == "zh" || this.state.languageLocale == "cn")(
                        <TouchableOpacity onPress={() => this._languageChange('ko')}>
                        <Image source={require('../../assets/img/kr_btn_off.png')} resizeMode={'contain'} style={{width:70}} />
                        </TouchableOpacity>
                    )}

                    {renderIf(this.state.languageLocale == "zh" || this.state.languageLocale == "cn")(
                        <TouchableOpacity onPress={() => this._languageChange('en')}>
                        <Image source={require('../../assets/img/en_btn_off.png')} resizeMode={'contain'} style={{width:70}} />
                        </TouchableOpacity>
                    )}

                    {renderIf(this.state.languageLocale == "zh" || this.state.languageLocale == "cn")(
                        <Image source={require('../../assets/img/cn_btn_on.png')} resizeMode={'contain'} style={{width:70}} />
                    )}
                </Footer>

            </Container>
        );
    }
}


const sideBarFormStyle = StyleSheet.create({
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