import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert, Platform, NativeModules, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Left, Body, Right, Content, Footer,  Item, Icon, Input, Button } from 'native-base';

import layout from '../../assets/style/layout';
import renderIf from 'render-if'
import config from '../../src/config';


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


export default class JoinForm extends Component {
    constructor(){
        super();
        this.state ={
            stepView:1
            ,agreeBool:false
            ,privateBool: false
            ,emailText:""
            ,phoneText:""
            ,authCode:""
            ,authCodeText:""
            ,passPw:""
            ,languageLocale : "ko"

        }
    }

    
    agreeBtn()
    {
        if(this.state.agreeBool == false) {
            this.setState({agreeBool : true});
        } else {
            this.setState({agreeBool : false});
        }

    }


    /**** 동의 프로세스 ****/
    privateBtn()
    {
        if(this.state.privateBool == false) {
            this.setState({privateBool : true});
        } else {
            this.setState({privateBool : false});
        }
    }

    /**** 이메일 인증 *******/
    emailCheck() {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var jsonData = {
            emailString: this.state.emailText
        };


        if (reg.test(this.state.emailText) === true){
            var object = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify( {
                    'emailString': this.state.emailText
                })
            };

            fetch(config.SERVER_URL+'/api/userCheck', object)
                .then((response) => response.text())
                .then((responseJson) => {
                    //console.log(responseJson);
                    var data = eval("("+responseJson+")");
                    if(data.length != 0) {
                        this.setState({emailText:""})
                        Alert.alert(
                            '',
                            I18n.t("joinForm_step2_alert_email1"),
                            [
                                {text: I18n.t("alert_confirm")},
                            ],
                            { cancelable: false }
                        )
                    } else {
                        this.stepNext(3);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        else{
            this.setState({emailText:""})
            Alert.alert(
                '',
                I18n.t("joinForm_step2_alert_email2"),
                [
                    {text: I18n.t("alert_confirm")},
                ],
                { cancelable: false }
            )
        }
    }

    phoneAuth()
    {
        /*
        var regExp = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
        if(this.state.phoneText == "") {
            Alert.alert(
                '',
                I18n.t('joinForm_step3_alert_phone1'),
                [
                    {text: I18n.t('alert_confirm'), onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false}
            )
            return;
        } else if(!regExp.test(this.state.phoneText)){
            Alert.alert(
                '',
                I18n.t('joinForm_step3_alert_phone2'),
                [
                    {text: I18n.t('alert_confirm'), onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false}
            )
            return;
        } else {
            var object = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify( {
                    'phoneNumber': this.state.phoneText
                })
            };

            fetch(config.SERVER_URL+'/api/phoenNumberAuth', object)
                .then((response) => response.text())
                .then((responseJson) => {
                    //console.log(responseJson);
                    var data = eval("("+responseJson+")");
                    var err_code = data[0].ERR_CODE;
                    var err_msg = data[0].ERR_MSG;
                    var authCode = data[0].AUTH_CODE;

                    switch(err_code)
                    {
                        case "000":
                            this.setState({authCode : authCode});
                            this.stepNext(4);
                            break;
                        case "101":
                            Alert.alert(
                                '',
                                I18n.t('joinForm_step3_alert_phone3'),
                                [
                                    {text: I18n.t('alert_confirm'), onPress: () => console.log('OK Pressed')},
                                ],
                                { cancelable: false }
                            );
                            break;
                        case "102":
                            Alert.alert(
                                '',
                                I18n.t('joinForm_step3_alert_phone4'),
                                [
                                    {text: I18n.t('alert_confirm'), onPress: () => console.log('OK Pressed')},
                                ],
                                { cancelable: false }
                            );
                            break;
                    }

                    console.log(authCode);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        */
        this.stepNext(5);
    }

    phoneAuthCheck()
    {
        if(this.state.authCode == this.state.authCodeText) {
            this.stepNext(5);
        } else {
            Alert.alert(
                '',
                I18n.t('joinForm_step3_filed_auth'),
                [
                    {text: I18n.t("alert_confirm"), onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            )
        }
    }

    passWdCheck()
    {
        var passwordRules = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*])(?=.*[0-9]).{6,16}$/;

        if(!passwordRules.test(this.state.passPw)){
            Alert.alert(
                '',
                I18n.t('joinForm_step4_alert_passwd'),
                [
                    {text: I18n.t("alert_confirm"), onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            );
            return;
        } else {
            var object = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify( {
                    'useremail': this.state.emailText
                    ,'userphone': this.state.phoneText
                    ,'userpasswd':this.state.passPw

                })
            };

            fetch(config.SERVER_URL+'/api/memberInsert', object)
                .then((response) => response.text())
                .then((responseJson) => {
                    //console.log(responseJson);
                    var data = eval("("+responseJson+")");
                    if(data.length == 0) {
                        Alert.alert(
                            'Error',
                            I18n.t('joinForm_step4_alert_error'),
                            [
                                {text: I18n.t("alert_confirm"), onPress: () => console.log('OK Pressed')},
                            ],
                            { cancelable: false }
                        );
                    } else {
                        this.stepNext(6);
                    }

                })
                .catch((error) => {
                    console.error(error);
                });


            //this.stepNext(6);
        }

    }

    emailLogin()
    {
        Actions.LoginForm;
    }



    step1Btn()
    {
        if(this.state.agreeBool == false) {
            Alert.alert(
                '',
                I18n.t("joinForm_agree_alert"),
                [
                    {text: I18n.t("alert_confirm"), onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            )
            return;
        }

        if(this.state.privateBool == false) {
            Alert.alert(
                '',
                I18n.t("joinForm_private_alert"),
                [
                    {text: I18n.t("alert_confirm"), onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            )
            return;
        }

        this.stepNext(2);

    }

    stepNext(value){

        this.setState({stepView: value});
    }



    componentWillMount(){

        this.loadJSONData();
    }

    componentDidMount() {
        this.loadJSONData();
    }

    loadJSONData() {


        AsyncStorage.getItem(config.STORE_KEY).then((value) => {
            var json = eval("("+value+")");
            var lang = json.lang;
            this.setState({languageLocale :lang});

            console.log(lang);
            I18n.locale = lang;
            I18n.fallbacks = true;

        }).then(res => {

        });

    }



    render() {


        return (

            <Container>
                <Header style={JoinFormStyle.headerLayoyt}>

                    <Left style={{flex:1}}>
                        <TouchableOpacity onPress={Actions.pop} style={{width:50, height:50, justifyContent:'center', alignItems:'flex-start'}}>
                            <View>
                                <Text style={{fontSize:12}}>{I18n.t("joinForm_exit")}</Text>
                            </View>
                        </TouchableOpacity>
                    </Left>
                    <Body style={{flex:1}}>
                    <Text style={{fontSize:16}}>{I18n.t("joinForm_title")}</Text>

                    </Body>
                    <Right style={{flex:1}}>

                    </Right>
                </Header>
                <Content style={{padding:10}}>
                    {renderIf(this.state.stepView == 1)(
                        <View>
                            <View style={JoinFormStyle.contentsLayout}>
                                <View style={{paddingTop:10}}>

                                    {renderIf(this.state.languageLocale == "ko") (
                                        <Text style={JoinFormStyle.contentsSize}><Text style={JoinFormStyle.boldFont}>Brand Profiling</Text>은 브랜드 컨셉과 제품개발을 위한 특화 리서치 툴입니다. 리서치를 통해 <Text style={JoinFormStyle.boldFont}>브랜드 이미지에 대하여 분석함을 목표</Text>로 하고 있습니다.</Text>
                                    )}

                                    {renderIf(this.state.languageLocale == "en") (
                                        <Text style={JoinFormStyle.contentsSize}><Text style={JoinFormStyle.boldFont}>Brand Profiling</Text> is a specialized tool for brand positioning and aims to analyze the brand image through research.</Text>
                                    )}

                                    {renderIf(this.state.languageLocale == "zh") (
                                        <Text style={JoinFormStyle.contentsSize}><Text style={JoinFormStyle.boldFont}>Brand Profiling</Text> 是品牌定位专用工具，通过研究分析品牌形象为目的。</Text>
                                    )}



                                </View>

                                <View style={JoinFormStyle.lingBg}>
                                </View>

                                <View>
                                    {renderIf(this.state.languageLocale == "ko") (
                                        <Text style={JoinFormStyle.contentsSize}>회원가입을 통해<Text style={JoinFormStyle.boldFont}>설문</Text>에 <Text style={JoinFormStyle.boldFont}>참여</Text>하여 <Text style={JoinFormStyle.boldFont}>포인트</Text>를 <Text style={JoinFormStyle.boldFont}>보상</Text>받으실 수 있습니다. 포인트 정책에 따라 포인트를 <Text style={JoinFormStyle.boldFont}>현금으로 환급</Text>받으실 수 있습니다. 많은 이용 부탁드립니다.</Text>
                                    )}

                                    {renderIf(this.state.languageLocale == "en") (
                                        <Text style={JoinFormStyle.contentsSize}>You can earn points by participating in surveys through membership. Points can be refunded in cash according to the policy. Thank you very much.</Text>
                                    )}

                                    {renderIf(this.state.languageLocale == "ch") (
                                        <Text style={JoinFormStyle.contentsSize}>注册会员，参与问卷，可获得相应积分。根据积分政策可兑换现金。欢迎使用。</Text>
                                    )}
                                </View>

                                <View style={JoinFormStyle.lingBg}>
                                </View>


                                <View style={{flex:1, flexDirection: 'row', paddingTop:5, paddingBottom:5}}>
                                    <View style={{flex:0.45}}>

                                        <Button bordered full style={{borderColor:"#979797"}} onPress={Actions.Terms}>
                                            <Text>{I18n.t("joinForm_agree_txt")}</Text>
                                        </Button>
                                    </View>

                                    <View style={{flex:0.1}}>

                                    </View>

                                    <View style={{flex:0.45}}>
                                        <Button bordered full style={{borderColor:"#979797"}} onPress={Actions.Privacy}>
                                            <Text>{I18n.t("joinForm_private_txt")}</Text>
                                        </Button>
                                    </View>
                                </View>

                            </View>

                            <View style={{paddingTop:30, paddingLeft:20, paddingRight:20}}>
                                {renderIf(this.state.agreeBool == false) (


                                    <Button bordered full style={{borderColor:"#979797", backgroundColor:"#ffffff", justifyContent: 'flex-start', paddingLeft:10}} onPress={()=>this.agreeBtn()}>
                                        <Image source={require("../../assets/img/icon_checkbox_off.png")} resizeMode={'contain'} style={{width:18, height:18}} />
                                        <Text style={{marginLeft:10}}>{I18n.t("joinForm_agree_btn")}</Text>
                                    </Button>


                                )}

                                {renderIf(this.state.agreeBool == true) (

                                    <Button bordered full style={{borderColor:"#979797", backgroundColor:"#DA4211", justifyContent: 'flex-start', paddingLeft:10}} onPress={()=>this.agreeBtn()}>
                                        <Image source={require("../../assets/img/icon_checkbox_on.png")} resizeMode={'contain'} style={{width:18, height:18}} />
                                        <Text style={{marginLeft:10, color:"#ffffff"}}>{I18n.t("joinForm_agree_btn")}</Text>
                                    </Button>


                                )}


                                {renderIf(this.state.privateBool == false) (
                                    <Button bordered full style={{marginTop:10, borderColor:"#979797", backgroundColor:"#ffffff", justifyContent: 'flex-start', paddingLeft:10}} onPress={()=>this.privateBtn()}>
                                        <Image source={require("../../assets/img/icon_checkbox_off.png")} resizeMode={'contain'} style={{width:18, height:18}} />
                                        <Text style={{marginLeft:10}}>{I18n.t("joinForm_private_btn")}</Text>
                                    </Button>
                                )}

                                {renderIf(this.state.privateBool == true) (
                                    <Button bordered full style={{marginTop:10, borderColor:"#979797", backgroundColor:"#DA4211", justifyContent: 'flex-start', paddingLeft:10}} onPress={()=>this.privateBtn()}>
                                        <Image source={require("../../assets/img/icon_checkbox_on.png")} resizeMode={'contain'} style={{width:18, height:18}} />
                                        <Text style={{marginLeft:10, color:"#ffffff"}}>{I18n.t("joinForm_private_btn")}</Text>
                                    </Button>
                                )}

                            </View>
                        </View>
                    )}

                    {renderIf(this.state.stepView == 2)(
                        <View>
                            <View style={JoinFormStyle.contentsLayout}>
                                <View>
                                    {renderIf(this.state.languageLocale == "ko") (
                                    <Text style={JoinFormStyle.contentsSize}><Text style={JoinFormStyle.boldFont}>계정</Text>으로 사용될 이메일 주소를 입력해주세요.</Text>
                                    )}
                                    {renderIf(this.state.languageLocale == "en") (
                                        <Text style={JoinFormStyle.contentsSize}>Please enter an email address to be used as an account.</Text>
                                    )}
                                    {renderIf(this.state.languageLocale == "zh") (
                                        <Text style={JoinFormStyle.contentsSize}>请输入邮箱地址，用于登录账号。</Text>
                                    )}
                                </View>




                            </View>
                            <View style={{padding:20}}>
                                <Item regular style={{backgroundColor:"#ffffff"}}>
                                    <Image source={require('../../assets/img/join_icon_email.png')} resizeMode={'contain'} style={{width:16, height:13, marginTop:5, marginLeft:10}} />
                                    <Input placeholder={I18n.t("joinForm_step2_filed_email")} style={JoinFormStyle.input2} value={this.state.emailText} onChangeText={(text) => this.setState({emailText: text})} keyboardType="email-address"/>
                                </Item>
                            </View>
                        </View>
                    )}

                    {renderIf(this.state.stepView == 3)(
                        <View>
                            <View style={JoinFormStyle.contentsLayout}>
                                {renderIf(this.state.languageLocale == "ko") (
                                <View>
                                    <Text style={JoinFormStyle.contentsSize}>계정을 찾거나 포인트를 환급 받을 떄 사용될 <Text style={JoinFormStyle.boldFont}>본인 핸드폰 번호를</Text>를 입력해주세요.</Text>
                                </View>
                                )}

                                {renderIf(this.state.languageLocale == "en") (
                                    <View>
                                        <Text style={JoinFormStyle.contentsSize}>{I18n.t('joinForm_step3_title')}</Text>
                                    </View>
                                )}

                                {renderIf(this.state.languageLocale == "zh") (
                                    <View>
                                        <Text style={JoinFormStyle.contentsSize}>{I18n.t('joinForm_step3_title')}</Text>
                                    </View>
                                )}

                            </View>

                            <View style={{padding:20}}>
                                <Item regular style={{backgroundColor:"#ffffff"}}>
                                    <Image source={require('../../assets/img/join_icon_email.png')} resizeMode={'contain'} style={{width:16, height:13, marginTop:5, marginLeft:10}} />
                                    <Input placeholder={I18n.t('joinForm_step3_filed_phone')} style={JoinFormStyle.input2} value={this.state.phoneText} onChangeText={(text) => this.setState({phoneText: text})} keyboardType="phone-pad"/>
                                </Item>
                            </View>
                        </View>
                    )}

                    {renderIf(this.state.stepView == 4)(
                        <View>
                            <View style={JoinFormStyle.contentsLayout}>

                                <View>
                                    {renderIf(this.state.languageLocale == "ko") (
                                    <Text style={JoinFormStyle.contentsSize}><Text style={JoinFormStyle.boldFont}>{this.state.phoneText}</Text>으로 인증번호가 전송되었습니다. 아래 입력 칸에 인증번호를 입력해주세요.</Text>
                                    )}

                                    {renderIf(this.state.languageLocale == "en") (
                                        <Text style={JoinFormStyle.contentsSize}>
                                            Your verification number has been sent to<Text style={JoinFormStyle.boldFont}>{this.state.phoneText}</Text>. Please enter your certification number in the box below.</Text>
                                    )}

                                    {renderIf(this.state.languageLocale == "zh") (
                                        <Text style={JoinFormStyle.contentsSize}>您的验证码已发送至<Text style={JoinFormStyle.boldFont}>{this.state.phoneText}</Text>。请在下面的框中输入您的认证编号。</Text>
                                    )}
                                </View>

                            </View>

                            <View style={{padding:20}}>
                                <Item regular style={{backgroundColor:"#ffffff"}}>
                                    <Image source={require('../../assets/img/icon_key_off.png')} resizeMode={'contain'} style={{width:16, height:13, marginTop:5, marginLeft:10}} />
                                    <Input placeholder={I18n.t('joinForm_step3_filed_auth')} style={JoinFormStyle.input2} onChangeText={(text) => this.setState({authCodeText: text})} keyboardType="phone-pad"/>
                                </Item>

                            </View>
                        </View>
                    )}



                    {renderIf(this.state.stepView == 5)(
                        <View>
                            <View style={JoinFormStyle.contentsLayout}>
                                <View>
                                    {renderIf(this.state.languageLocale == "ko") (
                                        <Text style={JoinFormStyle.contentsSize}><Text style={JoinFormStyle.boldFont}>사용하실 비밀번호</Text>를 입력해주세요. <Text style={JoinFormStyle.boldFont}>영문</Text>과 <Text style={JoinFormStyle.boldFont}>숫자 </Text>
                                            그리고 사용 가능한 <Text style={JoinFormStyle.boldFont}>특수문자</Text>를 사용하여 <Text style={JoinFormStyle.boldFont}>6-16자리</Text>의 조합을 사용하실 수 있습니다. 비밀번호 설정을 완료하면 회원가입이 완료가 됩니다.
                                        </Text>
                                    )}

                                    {renderIf(this.state.languageLocale == "en") (
                                        <Text style={JoinFormStyle.contentsSize}>Please enter your password. You can use a combination of 6 to 16 digits using alphanumeric characters and special characters that you can use. Once you have set up your password, your membership will be completed.</Text>
                                    )}

                                    {renderIf(this.state.languageLocale == "zh") (
                                        <Text style={JoinFormStyle.contentsSize}>组合英文，数字，特殊符号!@#$%^&，设置长度为6-16个字符的密码.</Text>
                                    )}

                                </View>

                            </View>

                            <View style={{padding:20}}>
                                <Item regular style={{backgroundColor:"#ffffff"}}>
                                    <Image source={require('../../assets/img/icon_key_off.png')} resizeMode={'contain'} style={{width:16, height:13, marginTop:5, marginLeft:10}} />
                                    <Input placeholder={I18n.t("joinForm_step4_filed_passwd")} style={JoinFormStyle.input2} onChangeText={(text) => this.setState({passPw: text})} keyboardType="default" secureTextEntry={true}/>
                                </Item>
                            </View>
                        </View>
                    )}

                    {renderIf(this.state.stepView == 6)(
                        <View>
                            <View style={JoinFormStyle.contentsLayout}>
                                <View>
                                    <Text style={JoinFormStyle.contentsSize}>
                                        {I18n.t("joinForm_step5_complate")}
                                    </Text>
                                </View>

                            </View>

                        </View>
                    )}


                </Content>
                <Footer style={{backgroundColor:"#222222", width:"100%", height:44, justifyContent: 'center', alignItems: 'center'}}>
                    {renderIf(this.state.stepView == 1)(
                        <TouchableOpacity style={{width:"100%", height:"100%", justifyContent: 'center', alignItems: 'center'}} onPress={()=>this.step1Btn()}>
                            <View>
                                <Text style={{color:"#ffffff" }}>{I18n.t("joinForm_next1")}</Text>
                            </View>
                        </TouchableOpacity>
                    )}

                    {renderIf(this.state.stepView == 2)(
                        <TouchableOpacity style={{width:"100%", height:"100%", justifyContent: 'center', alignItems: 'center'}} onPress={()=>this.emailCheck()}>
                            <View>
                               <Text style={{color:"#ffffff", width:"100%"}}>{I18n.t("joinForm_next1")}</Text>
                            </View>
                        </TouchableOpacity>
                    )}

                    {renderIf(this.state.stepView == 3)(
                        <TouchableOpacity style={{width:"100%", height:"100%", justifyContent: 'center', alignItems: 'center'}} onPress={()=>this.phoneAuth()}>
                            <View>
                                <Text style={{color:"#ffffff", width:"100%"}}>{I18n.t("joinForm_next1")}</Text>
                            </View>
                        </TouchableOpacity>
                    )}

                    {renderIf(this.state.stepView == 4)(
                        <TouchableOpacity style={{width:"100%", height:"100%", justifyContent: 'center', alignItems: 'center'}} onPress={()=>this.phoneAuthCheck()}>
                            <View>
                                <Text style={{color:"#ffffff", width:"100%"}}>{I18n.t("joinForm_next1")}</Text>
                            </View>
                        </TouchableOpacity>
                    )}


                    {renderIf(this.state.stepView == 5)(
                        <TouchableOpacity style={{width:"100%", height:"100%", justifyContent: 'center', alignItems: 'center'}} onPress={()=>this.passWdCheck()}>
                            <View>
                                <Text style={{color:"#ffffff", width:"100%"}}>{I18n.t("joinForm_next1")}</Text>
                            </View>
                        </TouchableOpacity>
                    )}

                    {renderIf(this.state.stepView == 6)(
                        <TouchableOpacity style={{width:"100%", height:"100%", justifyContent: 'center', alignItems: 'center'}} onPress={()=>Actions.LoginForm()}>
                            <View>
                                <Text style={{color:"#ffffff", width:"100%"}}>{I18n.t("joinForm_next1")}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                </Footer>
            </Container>
        );
    }
}

const JoinFormStyle = StyleSheet.create({
    headerLayoyt: {
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
    ,input: {
        fontSize:12
        ,paddingTop:13
        ,paddingLeft:11
        ,paddingBottom:12
        ,height:38
        ,backgroundColor: "#ffffff"
    }
    ,input2: {
        fontSize:12
    }
    ,btnStyle: {
        borderWidth:1
        ,borderColor:"#979797"
        ,color:"#000"
    }
})