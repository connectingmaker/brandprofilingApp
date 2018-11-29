import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Platform,
    NativeModules,
    AsyncStorage,
    TextInput
} from 'react-native';
import {Container, Header, Body, Content, Footer, Item, Icon, Input, Button, Left, Right} from 'native-base';
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

import en from '../lang/en';
import zh from '../lang/zh';
import ko from '../lang/ko';

if(languageLocale != "ko" && languageLocale != "en" && languageLocale != "zh") {
    languageLocale = "en";
}

I18n.fallbacks = true;
I18n.locale = languageLocale;
I18n.translations = {
    en,
    zh,
    ko
};



export default class Pwchange extends Component {

    constructor(props){
        super(props);
        this.state ={
            stepView:1
            ,emailBool:false
            ,pwBool: false
            ,phoneNumber:""
            ,emailText:""
            ,checkNumber:""
            ,newPw:""
            ,re_newPw:""
            ,languageLocale : "ko"
        }


    }

    componentDidMount(){

        this.loadJSONData();
    }

    loadJSONData() {


        AsyncStorage.getItem(config.STORE_KEY).then((value) => {
            var json = eval("("+value+")");
            var lang = json.lang;
            this.setState({languageLocale :lang});
            I18n.locale = lang;
            I18n.fallbacks = true;

        }).then(res => {

        });

    }

    /**** 이메일 계정과 핸드폰번호 확인 *******/
    pwCheck() {
        //this.stepNext(2);

        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var jsonData = {
            emailString: this.state.emailText
            ,phoneNumber : this.state.phoneNumber
            ,uid:this.props.uid
        };



        if (reg.test(this.state.emailText) === true){
            var object = {
                method: 'POST'
                ,headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
                ,body:JSON.stringify(jsonData)
            };

            fetch(config.SERVER_URL+'/api/pwdUserCheck', object)
                .then((response) => response.json())
                .then((responseJson) => {
                console.log(responseJson.ERR_CODE);
                    switch(responseJson.ERR_CODE) {
                        case "000":
                            this.stepNext(3);
                            break;
                        default:
                            this.setState({emailText:"", phoneNumber:""})
                            Alert.alert(
                                '',
                                I18n.t("login_form_alert_idpw_check"),
                                [
                                    {text: I18n.t("alert_confirm")},
                                ],
                                { cancelable: false }
                            )
                            break;
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
    /**** 인증 번호 체크 *****/
    numberCheck(){
        this.stepNext(3);
    }

    /**** 새로운 비밀 번호 체크 *****/
    newPwCheck(){
        //this.stepNext(4);

        var passwordRules = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*])(?=.*[0-9]).{6,16}$/;

        if(!passwordRules.test(this.state.newPw)){
            Alert.alert(
                '',
                I18n.t("account_alert_passwd"),
                [
                    {Text: I18n.t("alert_confirm"), onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            );
            return;
        } else {
            if(this.state.newPw != this.state.re_newPw) {
                Alert.alert(
                    '',
                    I18n.t("login_form_alert_pw"),
                    [
                        {Text: I18n.t("alert_confirm"), onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                );
                return;
            }
            var object = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify( {
                    'uid': this.props.uid
                    ,'newPw': this.state.newPw

                })
            };

            fetch(config.SERVER_URL+'/api/pwdChange', object)
                .then((response) => response.json())
                .then((responseJson) => {
                    switch(responseJson.ERR_CODE) {
                        case "000":
                            this.stepNext(4);
                            break;
                        default:
                            Alert.alert(
                                'Error',
                                I18n.t("joinForm_step4_alert_error"),
                                [
                                    {Text: I18n.t("alert_confirm"), onPress: () => console.log('OK Pressed')},
                                ],
                                { cancelable: false }
                            );
                            return;
                            break;
                    }
                })
                .catch((error) => {
                    console.error(error);
                });


            //this.stepNext(6);
        }
    }


    stepNext(value){

        this.setState({stepView: value});

        console.log(value);
    }

    langContents() {
        if(this.state.languageLocale == "ko") {
            return (
                <Content style={{padding:10}}>

                    {renderIf(this.state.stepView == 1)(
                        <View>
                            <View style={PwFormStyle.contentsLayout}>
                                <View>
                                    <Text style={PwFormStyle.contentsSize}><Text style={PwFormStyle.boldFont}>비밀번호</Text>를 변경하기 위해 가입시 인증하신 <Text style={PwFormStyle.boldFont}>이메일 주소</Text> 와 <Text style={PwFormStyle.boldFont}>핸드폰 번호</Text>를 입력해주세요.</Text>
                                </View>

                            </View>
                            <View style={{paddingLeft:20,paddingRight:20,paddingTop:20,paddingBottom:10}}>
                                <Item regular style={{backgroundColor:"#ffffff"}}>
                                    <Image source={require('../../assets/img/join_icon_email.png')} resizeMode={'contain'} style={{width:16, height:13, marginLeft:10,justifyContent:'center'}} />
                                    <Input placeholder='이메일 계정 입력' style={PwFormStyle.Input} value={this.state.emailText} onChangeText={(Text) => this.setState({emailText: Text})} keyboardType="email-address"/>
                                </Item>
                            </View>
                            <View style={{paddingLeft:20,paddingRight:20}}>
                                <Item regular style={{backgroundColor:"#ffffff"}}>
                                    <Image source={require('../../assets/img/join_icon_phone.png')} resizeMode={'contain'} style={{width:16, height:13, marginTop:5, marginLeft:10}} />
                                    <Input placeholder='핸드폰번호 입력' style={PwFormStyle.Input} value={this.state.phoneNumber} onChangeText={(Text) => this.setState({phoneNumber: Text})} keyboardType="numeric"/>
                                </Item>
                            </View>
                        </View>
                    )}

                    {renderIf(this.state.stepView == 2)(
                        <View>
                            <View style={PwFormStyle.contentsLayout}>
                                <View>
                                    <Text style={PwFormStyle.contentsSize}>이메일이 발송되었습니다. 비밀번호를 변경하기 위해  <Text style={PwFormStyle.boldFont}>인증번호</Text>를 입력하여 변경하거나 이메일 링크를 통해 비밀번호를 변경해주세요.</Text>
                                </View>

                            </View>

                            <View style={{padding:20}}>
                                <Item regular style={{backgroundColor:"#ffffff"}}>
                                    <Image source={require('../../assets/img/join_icon_check.png')} resizeMode={'contain'} style={{width:16, height:13, marginLeft:10,justifyContent:'center'}} />
                                    <Input placeholder='인증번호 입력' style={PwFormStyle.Input} value={this.state.checkNumber} onChangeText={(Text) => this.setState({checkNumber: Text})} keyboardType="numeric"/>
                                </Item>
                            </View>
                        </View>
                    )}
                    {renderIf(this.state.stepView == 3)(
                        <View>
                            <View style={PwFormStyle.contentsLayout}>
                                <View>
                                    <Text style={PwFormStyle.contentsSize}><Text style={PwFormStyle.boldFont}>영문</Text>이나 <Text style={PwFormStyle.boldFont}>숫자</Text> 그리고 <Text style={PwFormStyle.boldFont}>특수문자</Text>를 사용하여 <Text style={PwFormStyle.boldFont}>6~16자리</Text>의 <Text style={PwFormStyle.boldFont}>새로운 비밀번호</Text>를 입력해주세요. 사용가능한 특수문자는 <Text style={PwFormStyle.boldFont}>!@#$%^&*</Text> 입니다</Text>
                                </View>

                            </View>
                            <View style={{paddingLeft:20,paddingRight:20,paddingTop:20,paddingBottom:10}}>
                                <Item regular style={{backgroundColor:"#ffffff"}}>
                                    <Image source={require('../../assets/img/join_icon_pw.png')} resizeMode={'contain'} style={{width:16, height:13, marginTop:5, marginLeft:10}} />
                                    <Input placeholder='새로운 비밀번호 입력' style={PwFormStyle.Input} value={this.state.newPw} onChangeText={(Text) => this.setState({newPw: Text})} keyboardType="default" secureTextEntry={true}/>
                                </Item>
                            </View>
                            <View style={{paddingLeft:20,paddingRight:20}}>
                                <Item regular style={{backgroundColor:"#ffffff"}}>
                                    <Image source={require('../../assets/img/join_icon_pw.png')} resizeMode={'contain'} style={{width:16, height:13, marginTop:5, marginLeft:10}} />
                                    <Input placeholder='다시 입력' style={PwFormStyle.Input} value={this.state.re_newPw} onChangeText={(Text) => this.setState({re_newPw: Text})} keyboardType="default" secureTextEntry={true}/>
                                </Item>
                            </View>


                        </View>
                    )}
                    {renderIf(this.state.stepView == 4)(
                        <View>
                            <View style={PwFormStyle.contentsLayout}>
                                <View>
                                    <Text style={PwFormStyle.contentsSize}>비밀번호 변경이 완료되었습니다.</Text>
                                </View>

                            </View>

                        </View>
                    )}
                </Content>

            );
        }

        if(this.state.languageLocale == "zh") {

            return (

                <Content style={{padding:10}}>

                    {renderIf(this.state.stepView == 1)(
                        <View>
                            <View style={PwFormStyle.contentsLayout}>
                                <View>
                                    <Text style={PwFormStyle.contentsSize}>要更改密码，请输入您在注册时验证的电子邮件地址和手机号码</Text>
                                </View>

                            </View>
                            <View style={{paddingLeft:20,paddingRight:20,paddingTop:20,paddingBottom:10}}>
                                <Item regular style={{backgroundColor:"#ffffff"}}>
                                    <Image source={require('../../assets/img/join_icon_email.png')} resizeMode={'contain'} style={{width:16, height:13, marginLeft:10,justifyContent:'center'}} />
                                    <Input placeholder='邮箱' style={PwFormStyle.Input} value={this.state.emailText} onChangeText={(Text) => this.setState({emailText: Text})} keyboardType="email-address"/>
                                </Item>
                            </View>
                            <View style={{paddingLeft:20,paddingRight:20}}>
                                <Item regular style={{backgroundColor:"#ffffff"}}>
                                    <Image source={require('../../assets/img/join_icon_phone.png')} resizeMode={'contain'} style={{width:16, height:13, marginTop:5, marginLeft:10}} />
                                    <Input placeholder='手机号' style={PwFormStyle.Input} value={this.state.phoneNumber} onChangeText={(Text) => this.setState({phoneNumber: Text})} keyboardType="numeric"/>
                                </Item>
                            </View>
                        </View>
                    )}

                    {renderIf(this.state.stepView == 2)(
                        <View>
                            <View style={PwFormStyle.contentsLayout}>
                                <View>
                                    <Text style={PwFormStyle.contentsSize}>已发送电子邮件。 要更改密码，请输入验证码或通过电子邮件链接更改密码。</Text>
                                </View>

                            </View>

                            <View style={{padding:20}}>
                                <Item regular style={{backgroundColor:"#ffffff"}}>
                                    <Image source={require('../../assets/img/join_icon_check.png')} resizeMode={'contain'} style={{width:16, height:13, marginLeft:10,justifyContent:'center'}} />
                                    <Input placeholder='请输入验证码' style={PwFormStyle.Input} value={this.state.checkNumber} onChangeText={(Text) => this.setState({checkNumber: Text})} keyboardType="numeric"/>
                                </Item>
                            </View>
                        </View>
                    )}
                    {renderIf(this.state.stepView == 3)(
                        <View>
                            <View style={PwFormStyle.contentsLayout}>
                                <View>
                                    <Text style={PwFormStyle.contentsSize}>组合英文或数字，特殊符号，设置长度为6-16个字符的新密码。可使用特殊符号为!@#$%^&。</Text>
                                </View>

                            </View>
                            <View style={{paddingLeft:20,paddingRight:20,paddingTop:20,paddingBottom:10}}>
                                <Item regular style={{backgroundColor:"#ffffff"}}>
                                    <Image source={require('../../assets/img/join_icon_pw.png')} resizeMode={'contain'} style={{width:16, height:13, marginTop:5, marginLeft:10}} />
                                    <Input placeholder='更改密码 ' style={PwFormStyle.Input} value={this.state.newPw} onChangeText={(Text) => this.setState({newPw: Text})} keyboardType="default" secureTextEntry={true}/>
                                </Item>
                            </View>
                            <View style={{paddingLeft:20,paddingRight:20}}>
                                <Item regular style={{backgroundColor:"#ffffff"}}>
                                    <Image source={require('../../assets/img/join_icon_pw.png')} resizeMode={'contain'} style={{width:16, height:13, marginTop:5, marginLeft:10}} />
                                    <Input placeholder='再次输入新密码 ' style={PwFormStyle.Input} value={this.state.re_newPw} onChangeText={(Text) => this.setState({re_newPw: Text})} keyboardType="default" secureTextEntry={true}/>
                                </Item>
                            </View>


                        </View>
                    )}
                    {renderIf(this.state.stepView == 4)(
                        <View>
                            <View style={PwFormStyle.contentsLayout}>
                                <View>
                                    <Text style={PwFormStyle.contentsSize}>密码修改成功.</Text>
                                </View>

                            </View>

                        </View>
                    )}
                </Content>



            );
        }
        if(this.state.languageLocale == "en"){
            return(


                <Content style={{padding:10}}>

                    {renderIf(this.state.stepView == 1)(
                        <View>
                            <View style={PwFormStyle.contentsLayout}>
                                <View>
                                    <Text style={PwFormStyle.contentsSize}><Text style={PwFormStyle.boldFont}>비밀번호</Text>를 변경하기 위해 가입시 인증하신 <Text style={PwFormStyle.boldFont}>이메일 주소</Text> 와 <Text style={PwFormStyle.boldFont}>핸드폰 번호</Text>를 입력해주세요.</Text>
                                </View>

                            </View>
                            <View style={{paddingLeft:20,paddingRight:20,paddingTop:20,paddingBottom:10}}>
                                <Item regular style={{backgroundColor:"#ffffff"}}>
                                    <Image source={require('../../assets/img/join_icon_email.png')} resizeMode={'contain'} style={{width:16, height:13, marginLeft:10,justifyContent:'center'}} />
                                    <Input placeholder='이메일 계정 입력' style={PwFormStyle.Input} value={this.state.emailText} onChangeText={(Text) => this.setState({emailText: Text})} keyboardType="email-address"/>
                                </Item>
                            </View>
                            <View style={{paddingLeft:20,paddingRight:20}}>
                                <Item regular style={{backgroundColor:"#ffffff"}}>
                                    <Image source={require('../../assets/img/join_icon_phone.png')} resizeMode={'contain'} style={{width:16, height:13, marginTop:5, marginLeft:10}} />
                                    <Input placeholder='핸드폰번호 입력' style={PwFormStyle.Input} value={this.state.phoneNumber} onChangeText={(Text) => this.setState({phoneNumber: Text})} keyboardType="numeric"/>
                                </Item>
                            </View>
                        </View>
                    )}

                    {renderIf(this.state.stepView == 2)(
                        <View>
                            <View style={PwFormStyle.contentsLayout}>
                                <View>
                                    <Text style={PwFormStyle.contentsSize}>이메일이 발송되었습니다. 비밀번호를 변경하기 위해  <Text style={PwFormStyle.boldFont}>인증번호</Text>를 입력하여 변경하거나 이메일 링크를 통해 비밀번호를 변경해주세요.</Text>
                                </View>

                            </View>

                            <View style={{padding:20}}>
                                <Item regular style={{backgroundColor:"#ffffff"}}>
                                    <Image source={require('../../assets/img/join_icon_check.png')} resizeMode={'contain'} style={{width:16, height:13, marginLeft:10,justifyContent:'center'}} />
                                    <Input placeholder='인증번호 입력' style={PwFormStyle.Input} value={this.state.checkNumber} onChangeText={(Text) => this.setState({checkNumber: Text})} keyboardType="numeric"/>
                                </Item>
                            </View>
                        </View>
                    )}
                    {renderIf(this.state.stepView == 3)(
                        <View>
                            <View style={PwFormStyle.contentsLayout}>
                                <View>
                                    <Text style={PwFormStyle.contentsSize}><Text style={PwFormStyle.boldFont}>영문</Text>이나 <Text style={PwFormStyle.boldFont}>숫자</Text> 그리고 <Text style={PwFormStyle.boldFont}>특수문자</Text>를 사용하여 <Text style={PwFormStyle.boldFont}>6~16자리</Text>의 <Text style={PwFormStyle.boldFont}>새로운 비밀번호</Text>를 입력해주세요. 사용가능한 특수문자는 <Text style={PwFormStyle.boldFont}>!@#$%^&*</Text> 입니다</Text>
                                </View>

                            </View>
                            <View style={{paddingLeft:20,paddingRight:20,paddingTop:20,paddingBottom:10}}>
                                <Item regular style={{backgroundColor:"#ffffff"}}>
                                    <Image source={require('../../assets/img/join_icon_pw.png')} resizeMode={'contain'} style={{width:16, height:13, marginTop:5, marginLeft:10}} />
                                    <Input placeholder='새로운 비밀번호 입력' style={PwFormStyle.Input} value={this.state.newPw} onChangeText={(Text) => this.setState({newPw: Text})} keyboardType="default" secureTextEntry={true}/>
                                </Item>
                            </View>
                            <View style={{paddingLeft:20,paddingRight:20}}>
                                <Item regular style={{backgroundColor:"#ffffff"}}>
                                    <Image source={require('../../assets/img/join_icon_pw.png')} resizeMode={'contain'} style={{width:16, height:13, marginTop:5, marginLeft:10}} />
                                    <Input placeholder='다시 입력' style={PwFormStyle.Input} value={this.state.re_newPw} onChangeText={(Text) => this.setState({re_newPw: Text})} keyboardType="default" secureTextEntry={true}/>
                                </Item>
                            </View>


                        </View>
                    )}
                    {renderIf(this.state.stepView == 4)(
                        <View>
                            <View style={PwFormStyle.contentsLayout}>
                                <View>
                                    <Text style={PwFormStyle.contentsSize}>비밀번호 변경이 완료되었습니다.</Text>
                                </View>

                            </View>

                        </View>
                    )}
                </Content>


            );
        }

    }

    render() {
        return (
            <Container>
                <Header style={PwFormStyle.headerLayout}>
                    <Left style={{flex:1}}>
                        <TouchableOpacity onPress={Actions.pop} style={{width:50, height:50, justifyContent:'center', alignItems:'center'}}>
                            {renderIf(this.state.languageLocale=="ko")(
                                <Text style={{fontSize:12}} onPress={Actions.pop}>나가기</Text>
                            )}
                            {renderIf(this.state.languageLocale=="en")(
                                <Text style={{fontSize:12}} onPress={Actions.pop}>Leave</Text>
                            )}
                            {renderIf(this.state.languageLocale=="zh")(
                                <Text style={{fontSize:12}} onPress={Actions.pop}>退出</Text>
                            )}
                        </TouchableOpacity>
                    </Left>
                    <Body style={{flex:1}}>
                        {renderIf(this.state.languageLocale=="ko")(
                            <Text style={{fontSize:16}}>비밀번호 변경</Text>
                        )}
                        {renderIf(this.state.languageLocale=="en")(
                            <Text style={{fontSize:16}}>Change Password</Text>
                        )}
                        {renderIf(this.state.languageLocale=="zh")(
                            <Text style={{fontSize:16}}>更改密碼</Text>
                        )}

                    </Body>
                    <Right tyle={{flex:1, width:50, height:50, justifyContent:'center', alignItems:'center'}}>
                    </Right>
                </Header>
                {this.langContents()}
                <Footer style={{backgroundColor:"#222222", width:"100%", height:44, justifyContent: 'center', alignItems: 'center'}}>


                    {renderIf(this.state.stepView == 1)(
                        <TouchableOpacity style={{width:"100%", height:"100%", justifyContent: 'center', alignItems: 'center'}} onPress={()=>this.pwCheck()} >
                            <View>
                                {renderIf(this.state.languageLocale=="ko")(
                                    <Text style={{fontSize:16,color:'#fff'}}>비밀번호 변경</Text>
                                )}
                                {renderIf(this.state.languageLocale=="en")(
                                    <Text style={{fontSize:16,color:'#fff'}}>Change Password</Text>
                                )}
                                {renderIf(this.state.languageLocale=="zh")(
                                    <Text style={{fontSize:16,color:'#fff'}}>更改密碼</Text>
                                )}
                            </View>
                        </TouchableOpacity>
                    )}

                    {renderIf(this.state.stepView == 2)(
                        <TouchableOpacity style={{width:"100%", height:"100%", justifyContent: 'center', alignItems: 'center'}} onPress={()=>this.numberCheck()}>
                            <View>

                                {renderIf(this.state.languageLocale=="ko")(
                                    <Text style={{color:"#ffffff" }}>인증번호 입력</Text>
                                )}
                                {renderIf(this.state.languageLocale=="en")(
                                    <Text style={{color:"#ffffff" }}>Verification number</Text>
                                )}
                                {renderIf(this.state.languageLocale=="zh")(
                                    <Text style={{color:"#ffffff" }}>验证码 </Text>
                                )}

                            </View>
                        </TouchableOpacity>
                    )}
                    {renderIf(this.state.stepView == 3)(
                        <TouchableOpacity style={{width:"100%", height:"100%", justifyContent: 'center', alignItems: 'center'}} onPress={()=>this.newPwCheck()}>
                            <View>

                                {renderIf(this.state.languageLocale=="ko")(
                                    <Text style={{fontSize:16,color:'#fff'}}>변경 확인</Text>
                                )}
                                {renderIf(this.state.languageLocale=="en")(
                                    <Text style={{fontSize:16,color:'#fff'}}>Confirm</Text>
                                )}
                                {renderIf(this.state.languageLocale=="zh")(
                                    <Text style={{fontSize:16,color:'#fff'}}>确认 </Text>
                                )}
                            </View>
                        </TouchableOpacity>
                    )}
                </Footer>
            </Container>
        );
    }
}



const PwFormStyle = StyleSheet.create({
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
    ,contentsSize: {
        fontSize:13
        ,lineHeight:25
    }
    ,boldFont: {
        color:"#DA4211"
        ,fontWeight: 'bold'
    }
    ,Input: {
        fontSize:12
        ,paddingTop:13
        ,paddingLeft:11
        ,paddingBottom:10
        ,height:38
        ,justifyContent:'center'

    }
    ,buttonStyle: {
        fontSize:15
        ,borderWidth:1
        ,borderColor:"#979797"
    }


})