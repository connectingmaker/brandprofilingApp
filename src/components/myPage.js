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



export default class myPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            loaded: false
            ,email:""
            ,sex:""
            ,brithday:""
            ,age:""
            ,username:""
            ,languageLocale : "ko"
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

        AsyncStorage.getItem(config.STORE_KEY)
            .then((response) => {
                return response;
            }).then((responseJson) => {
            try {
                var data = eval("(" + responseJson + ")");
                console.log(data);
                var dataObject = {
                    "SESS_UID": ""
                    , "SESS_USEREMAIL": ""
                    , "SESS_ALL_PUSH_YN": ""
                    , "SESS_SURVEY_PUSH_YN": ""
                    , "contentMain" : false
                    , "intro" : false
                    , "logged" : false
                    , "logout": true
                    , lang : data.lang
                };

                AsyncStorage.setItem(config.STORE_KEY, JSON.stringify(dataObject), () => Actions.Login({type:"reset", refresh: true}));
                //;

            } catch(err) {
                //console.log(err);
                //this.setState({loading: true, logged: false,  logout:true, intro: false});

            }



        });


        // AsyncStorage.clear(() => Actions.Login({type:"reset", refresh: true})); // to clear the token

    }

    loadJSONData() {
        /*

         */
        AsyncStorage.getItem(config.STORE_KEY).then((value) => {
            var json = eval("(" + value + ")");
            var uid = json.SESS_UID;
            var lang = json.lang;
            this.setState({languageLocale :lang});
            I18n.locale = lang;
            I18n.fallbacks = true;


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
        if(this.state.loaded == true) {
            return (

                <View style={{marginBottom:10}}>
                    <View style={myPageFormStyle.contentsLayout2}>
                        <TouchableOpacity onPress={Actions.BP}>
                            <View style={{flex: 1, flexDirection: 'row', paddingTop: 5, paddingBottom: 5}}>
                                <View style={{flex: 0.7, alignItems: 'flex-start', justifyContent: 'center'}}>
                                    <Text style={myPageFormStyle.contentsSize}>{I18n.t("mypage_app_text")}</Text>
                                </View>

                                <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                                    {/*<Image source={require('../../assets/img/down_arrow_img.png')}*/}
                                           {/*resizeMode={'contain'} style={{width: 15, height: 15}}/>*/}
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={myPageFormStyle.contentsLayout3}>
                        <TouchableOpacity onPress={Actions.Panel}>
                            <View style={{flex: 1, flexDirection: 'row', paddingTop: 5, paddingBottom: 5}}>
                                <View style={{flex: 0.7, alignItems: 'flex-start', justifyContent: 'center'}}>
                                    <Text style={myPageFormStyle.contentsSize}>{I18n.t("mypage_panel_text")}</Text>
                                </View>

                                <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                                    {/*<Image source={require('../../assets/img/down_arrow_img.png')}*/}
                                           {/*resizeMode={'contain'} style={{width: 15, height: 15}}/>*/}
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={myPageFormStyle.contentsLayout}>
                        <View style={{flex: 1, flexDirection: 'row', paddingTop: 5, paddingBottom: 5}}>
                            <View style={{flex: 0.2, alignItems: 'flex-start', justifyContent: 'center'}}>
                                <Text style={myPageFormStyle.title}>{I18n.t("mypage_name_filed")}</Text>
                            </View>
                            <View style={{flex: 0.8, alignItems: 'flex-end', justifyContent: 'center'}}>
                                <Text style={myPageFormStyle.title}><Text style={myPageFormStyle.boldFont}>{this.state.email}</Text></Text>
                            </View>
                        </View>
                        <View style={myPageFormStyle.lingBg}></View>
                        <View style={{flex: 1, flexDirection: 'row', paddingTop: 5, paddingBottom: 5}}>
                            <View style={{flex: 0.2, alignItems: 'flex-start', justifyContent: 'center'}}>
                                <Text style={myPageFormStyle.title}>{this.state.username}</Text>
                            </View>
                            <View style={{flex: 0.8, alignItems: 'flex-end', justifyContent: 'center'}}>
                                <Text style={myPageFormStyle.contentsSize}>
                                    <Text style={myPageFormStyle.boldFont}>{this.state.sex}
                                    {this.state.age}</Text></Text>
                            </View>
                        </View>
                        <View style={myPageFormStyle.lingBg}></View>
                        <View style={{flex: 1, flexDirection: 'row', paddingTop: 5, paddingBottom: 5}}>
                            <View style={{flex: 0.45}}>
                                <Button bordered full style={{borderColor: "#979797"}} onPress={Actions.Pwchange}>
                                    <Text>{I18n.t("mypage_passwd_text")}</Text>
                                </Button>
                            </View>

                            <View style={{flex: 0.1}}>

                            </View>

                            <View style={{flex: 0.45}}>
                                <Button bordered full style={{borderColor: "#979797"}} onPress={() => this.logout()}>
                                    <Text>{I18n.t("mypage_logout_text")}</Text>
                                </Button>
                            </View>
                        </View>


                    </View>
                    <View style={myPageFormStyle.contentsLayout4}>
                        <View style={{paddingTop: 5, paddingBottom: 5}}>
                            <Text style={myPageFormStyle.title}>{I18n.t("mypage_drop_text")}</Text>
                        </View>
                        <View style={myPageFormStyle.lingBg}></View>
                        <View style={{paddingTop: 5, paddingBottom: 5}}>

                            {renderIf(this.state.languageLocale == "ko") (
                                <Text style={myPageFormStyle.contentsSize}>회원탈퇴 시 계정 정보가 삭제 되고 포인트가 소멸됩니다. 회원탈퇴로 소멸된 포인트와
                                    삭제된 계정정보는 <Text style={myPageFormStyle.boldFont}>다시 복구할 수 없으니 신중하게 결정</Text>해주시길
                                    바랍니다.</Text>
                            )}

                            {renderIf(this.state.languageLocale == "en") (
                                <Text style={myPageFormStyle.contentsSize}>When you leave a member, your account information will be deleted and your points will expire. We will not be able to recover the lost points and deleted account information due to membership withdrawal, so please make a careful decision.</Text>
                            )}

                            {renderIf(this.state.languageLocale == "zh") (
                                <Text style={myPageFormStyle.contentsSize}>When you leave a member, your account information will be deleted and your points will expire. We will not be able to recover the lost points and deleted account information due to membership withdrawal, so please make a careful decision.</Text>
                            )}

                        </View>
                        <Button bordered full style={{borderColor: "#979797"}} onPress={() => this.memberDrop()}>
                            <Text>{I18n.t("mypage_drop_text")}</Text>
                        </Button>
                        <View style={myPageFormStyle.lingBg}></View>
                        <View style={{flex: 1, flexDirection: 'row', paddingTop: 5, paddingBottom: 5}}>
                            <View style={{flex: 0.45}}>
                                <Button bordered full style={{borderColor: "#979797"}} onPress={Actions.Terms}>
                                    <Text>{I18n.t("mypage_agree_text")}</Text>
                                </Button>
                            </View>

                            <View style={{flex: 0.1}}>

                            </View>

                            <View style={{flex: 0.45}}>
                                <Button bordered full style={{borderColor: "#979797"}} onPress={Actions.Privacy}>
                                    <Text>{I18n.t("mypage_private_text")}</Text>
                                </Button>
                            </View>
                        </View>


                    </View>





                </View>

            );
        } else {
            return (
                <View><Spinner size="small" color="red" /></View>
            );
        }
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

