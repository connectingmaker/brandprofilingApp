import React, { Component } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text ,ScrollView, AsyncStorage,Alert, Platform, NativeModules} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Item, Icon, Input, Button ,ActionSheet, Spinner} from 'native-base';
import config from '../config'



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
import renderIf from "render-if";

I18n.fallbacks = true;
I18n.locale = languageLocale;
I18n.translations = {
    en,
    zh,
    ko
};



export default class contentsMain extends Component {
    constructor(props){
        super(props);
        this.state = {
            loaded: false
            ,email:""
            ,sex:""
            ,brithday:""
            ,age:""
            ,username:""
        };

    }

    componentWillMount()
    {

    }

    componentDidMount(){
        this.mounted = true;
        //console.log(this.props);
        this.loadJSONData();

    }



    componentWillUnmount() {
        this.mounted = false;
    }


    logout()
    {
        AsyncStorage.clear(() => Actions.root({type:"reset", refresh: true})); // to clear the token

    }

    loadJSONData() {
        /*

         */
        AsyncStorage.getItem(config.STORE_KEY).then((value) => {
            var json = eval("(" + value + ")");
            var uid = json.SESS_UID;


            var dataObject = {
                "SESS_UID": json.SESS_UID
                , "SESS_USEREMAIL": json.SESS_USEREMAIL
                , "SESS_ALL_PUSH_YN": json.SESS_ALL_PUSH_YN
                , "SESS_SURVEY_PUSH_YN": json.SESS_SURVEY_PUSH_YN
                , "contentMain" : true
            };

            AsyncStorage.setItem(config.STORE_KEY, JSON.stringify(dataObject));




        }).then(res => {
            this.setState({loaded:true, username: "", email: "", sex: "", age: "", brithday: ""})
        });


    }




    render() {
        return (
            <View style={{marginBottom:10}}>
                <View style={myPageFormStyle.contentsLayout2}>
                    <Image source={require('../../assets/img/contents_main_img.png')} resizeMode="contain" style={{width:'100%', height:220, marginTop:10}} />
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <Text style={{textAlignVertical:'center',textAlign: "center", fontSize:18, fontWeight:'bold', color:'#8c8c8c', paddingTop:20, paddingBottom:20, lineHeight:24,letterSpacing:-1}}>브랜드 프로파일링은{"\n"}브랜드 컨셉과 생활용품 제품 개발을{"\n"}위한 특화 리서치 툴입니다.</Text>
                    </View>

                    <View style={{height:1, backgroundColor:'#a3a3a3', marginLeft:20, marginRight:20, marginBottom:20}}>
                    </View>

                    <View style={{paddingLeft:40, paddingRight:40, marginBottom:20}}>
                        <Text style={{fontSize:12, color:'#8c8c8c', lineHeight:24, letterSpacing:-1}}>1. 브랜드의 포지셔닝을 진단하거나 전략을 도출하기 위해 사용합니다.</Text>
                        <Text style={{fontSize:12, color:'#8c8c8c', lineHeight:24, letterSpacing:-1}}>2. 브랜드의 상징가치, 개성 들 브랜딩에 사용되는 모든 이론과 방법론이 총 망라되어 있습니다.</Text>
                        <Text style={{fontSize:12, color:'#8c8c8c', lineHeight:24, letterSpacing:-1}}>3. 제품 개발을 위한 소비자 리서치를 쉽고 빠르게 할 수 있으며 창의적인 아이디어를 도출하도록 도와드립니다.</Text>
                    </View>
                    <TouchableOpacity onPress={() => Actions.Main({type:"reset", refresh: true})}>
                    <View style={{borderColor:'#e86635',borderWidth:2, marginLeft:40, marginRight:40, marginBottom:20, justifyContent:'center', alignItems:'center', paddingTop:10, paddingBottom:10}}>
                        <Text style={{color:'#e86635', fontSize:18, fontWeight:'bold'}}>설문조사하고 컨텐츠 보기</Text>
                    </View>
                    </TouchableOpacity>

                </View>
            </View>
        );

    }
}

const myPageFormStyle = StyleSheet.create({
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
        ,marginBottom:10
        ,backgroundColor:"#fff"
        ,shadowColor: "rgba(0,0,0,23)"
        ,shadowOffset: { width: 0, height: 1 }
        ,shadowOpacity: 0.3
    }
    ,contentsLayout2: {
        width: "100%"
        ,backgroundColor:"#fff"
        ,shadowColor: "rgba(0,0,0,23)"
        ,shadowOffset: { width: 0, height: 1 }
        ,shadowOpacity: 0.3
    }
    ,contentsLayout3: {
        width: "100%"
        ,marginTop:10
        ,marginBottom: 10
        ,paddingTop:10
        ,paddingBottom:10
        ,paddingLeft:20
        ,paddingRight:20
        ,backgroundColor:"#fff"
        ,shadowColor: "rgba(0,0,0,23)"
        ,shadowOffset: { width: 0, height: 1 }
        ,shadowOpacity: 0.3
    }

    ,contentsLayout4: {
        width: "100%"
        ,marginBottom: 10
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
    ,lingBg: {
        backgroundColor:"rgba(127,127,127,0.3)"
        ,height:1
        ,marginTop:10
        ,marginBottom:10

    }
    ,buttonStyle: {
        fontSize:15
        ,borderWidth:1
        ,borderColor:"#979797"
    }
    ,title: {
        fontSize:15
        ,fontWeight: 'bold'
        ,paddingTop:5
        ,paddingBottom:5
    }
    ,input: {
        fontSize:12
        ,paddingTop:13
        ,paddingLeft:11
        ,paddingBottom:12
        ,height:38
        ,backgroundColor: "#ffffff"
    }
    ,btnStyle: {
        borderWidth:1
        ,borderColor:"#979797"
        ,color:"#000"
    }
})
