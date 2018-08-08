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



export default class contentsView extends Component {
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
        // this.loadJSONData();
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


            var object = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'text/html'
                }
            }

            fetch(config.SERVER_URL+"/api/memberSelect/"+uid, object)
                .then((response) => response.json())
                .then((responseData) =>
                {


                    console.log(responseData);
                    this.setState({loaded:true, username: responseData.USERNAME, email: responseData.USEREMAIL, sex: responseData.SEX, age: responseData.AGE +"세", brithday: responseData.BRITHDAY})
                })
                .catch((err) => {
                    console.log(err);
                });

        }).then(res => {
            this.setState({loaded:true, username: "", email: "", sex: "", age: "", brithday: ""})
        });


    }

    memberDrop()
    {

        Alert.alert(
            '회원탈퇴를 하시겠습니까?',
            '회원탈퇴하시면 기존의 정보는 다시 복구할 수 없으니 신중하게 결정해주세요.',
            [

                {text: '최소', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: '확인', onPress: () => this.memberDropSubmit()},
            ],
            { cancelable: false }
        )


    }

    memberDropSubmit()
    {
        AsyncStorage.getItem(config.STORE_KEY).then((value) => {
            var json = eval("(" + value + ")");
            var uid = json.SESS_UID;

            var object = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'text/html'
                }
            }

            fetch(config.SERVER_URL+"/api/memberDrop/"+uid, object)
                .then((response) => response.json())
                .then((responseData) =>
                {
                    AsyncStorage.clear(() => Actions.root({type:"reset", refresh: true})); // to clear the token
                })
                .catch((err) => {
                    console.log(err);
                });

        }).then(res => {
            this.setState({loaded:true, username: "", email: "", sex: "", age: "", brithday: ""})
        });
    }



    render() {
        return (
        <View style={{marginBottom:10}}>
            <View style={myPageFormStyle.contentsLayout2}>
                <TouchableOpacity>
                    <View style={{flex: 1, flexDirection: 'row', paddingTop: 5, paddingBottom: 5}}>
                        <View style={{flex: 0.7, alignItems: 'flex-start', justifyContent: 'center'}}>
                            <Text style={myPageFormStyle.contentsSize}>컨텐츠 내용</Text>
                        </View>

                        <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                            {/*<Image source={require('../../assets/img/down_arrow_img.png')}*/}
                            {/*resizeMode={'contain'} style={{width: 15, height: 15}}/>*/}
                        </View>
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

