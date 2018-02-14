import React, { Component } from 'react';
import {View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert, AsyncStorage, Platform} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Body, Content, Footer,  Item, Icon, Input, Button } from 'native-base';

import layout from '../../assets/style/layout';
import renderIf from 'render-if'
import config from '../../src/config';


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
        }
    }


    phoneAuth()
    {
        var regExp = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
        if(this.state.phoneText == "") {
            Alert.alert(
                '',
                '핸드폰번호를 입력해주세요.',
                [
                    {text: '확인', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false}
            )
            return;
        } else if(!regExp.test(this.state.phoneText)){
            Alert.alert(
                '',
                '핸드폰번호를 정확히 입력해주세요.',
                [
                    {text: '확인', onPress: () => console.log('OK Pressed')},
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
                            this.stepNext(2);
                            break;
                        case "101":
                            Alert.alert(
                                '',
                                '하루발송량이 초과되었습니다.',
                                [
                                    {text: '확인', onPress: () => console.log('OK Pressed')},
                                ],
                                { cancelable: false }
                            );
                            break;
                        case "102":
                            Alert.alert(
                                '',
                                '등록된 회원입니다.',
                                [
                                    {text: '확인', onPress: () => console.log('OK Pressed')},
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
    }

    stepNext(value){

        this.setState({stepView: value});
    }

    phoneAuthCheck()
    {
        if(this.state.authCode == this.state.authCodeText) {



            AsyncStorage.getItem(config.STORE_KEY).then((value) => {
                var json = eval("(" + value + ")");


                var object = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify( {
                        'useremail': json.FACEBOOK_EMAIL
                        ,'username': json.FACEBOOK_USERNAME
                        ,'phone' : this.state.phoneText
                        ,'facebook_id': json.FACEBOOK_ID
                        ,'userToken': json.TOKEN
                        ,"os" : json.OS
                        ,"version" : json.VERSION

                    })
                };


                fetch(config.SERVER_URL+'/api/memberFaceBook', object)
                    .then((response) => response.text())
                    .then((responseJson) => {

                        AsyncStorage.clear();

                        var data = eval("("+responseJson+")");

                        var dataObject = {
                            "SESS_UID" : data[0].UID
                            ,"SESS_USEREMAIL" : data[0].USEREMAIL
                            , "SESS_ALL_PUSH_YN": data[0].ALL_PUSH_YN
                            , "SESS_SURVEY_PUSH_YN": data[0].SURVEY_PUSH_YN
                        };

                        console.log(dataObject);

                        AsyncStorage.setItem(config.STORE_KEY, JSON.stringify(dataObject), () => {
                            Actions.Main();
                        });





                    })
                    .catch((error) => {
                        console.log("오류");
                    });

            });





            //this.stepNext(6);
        } else {
            Alert.alert(
                '',
                '인증번호가 일치하지 않습니다.',
                [
                    {text: '확인', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            )
        }
    }


    emailLogin()
    {
        Actions.LoginForm;
    }




    render() {


        return (

            <Container>
                <Header style={JoinFormStyle.headerLayoyt}>
                    <View style={{flex:.15, justifyContent: 'center', alignItems: 'flex-start'}}>
                        <TouchableOpacity onPress={Actions.pop}>
                            <Text style={{fontSize:12}}
                                /*onPress={()=>Actions.emailLogin}*/
                            >나가기</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:.7, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize:16}}>회원가입</Text>
                    </View>
                    <View style={{flex:.15, justifyContent: 'center', alignItems: 'center'}}>

                    </View>
                </Header>
                <Content style={{padding:10}}>


                    {renderIf(this.state.stepView == 1)(
                        <View>
                            <View style={JoinFormStyle.contentsLayout}>
                                <View>
                                    <Text style={JoinFormStyle.contentsSize}>계정을 찾거나 포인트를 환급 받을 떄 사용될 <Text style={JoinFormStyle.boldFont}>본인 핸드폰 번호를</Text>를 입력해주세요.</Text>
                                </View>

                            </View>

                            <View style={{padding:20}}>
                                <Item regular style={{backgroundColor:"#ffffff"}}>
                                    <Image source={require('../../assets/img/join_icon_email.png')} resizeMode={'contain'} style={{width:16, height:13, marginTop:5, marginLeft:10}} />
                                    <Input placeholder='핸드폰번호 입력' style={JoinFormStyle.input2} value={this.state.phoneText} onChangeText={(text) => this.setState({phoneText: text})} keyboardType="phone-pad"/>
                                </Item>
                            </View>
                        </View>
                    )}

                    {renderIf(this.state.stepView == 2)(
                        <View>
                            <View style={JoinFormStyle.contentsLayout}>
                                <View>
                                    <Text style={JoinFormStyle.contentsSize}><Text style={JoinFormStyle.boldFont}>{this.state.phoneText}</Text>으로 인증번호가 전송되었습니다. 아래 입력 칸에 인증번호를 입력해주세요.</Text>
                                </View>

                            </View>

                            <View style={{padding:20}}>
                                <Item regular style={{backgroundColor:"#ffffff"}}>
                                    <Image source={require('../../assets/img/icon_key_off.png')} resizeMode={'contain'} style={{width:16, height:13, marginTop:5, marginLeft:10}} />
                                    <Input placeholder='인증번호 입력' style={JoinFormStyle.input2} onChangeText={(text) => this.setState({authCodeText: text})} keyboardType="phone-pad"/>
                                </Item>

                            </View>
                        </View>
                    )}

                </Content>
                <Footer style={{backgroundColor:"#222222", width:"100%", height:44, justifyContent: 'center', alignItems: 'center'}}>

                    {renderIf(this.state.stepView == 1)(
                        <TouchableOpacity style={{width:"100%", height:"100%", justifyContent: 'center', alignItems: 'center'}} onPress={()=>this.phoneAuth()}>
                            <View>
                                <Text style={{color:"#ffffff", width:"100%"}}>다음</Text>
                            </View>
                        </TouchableOpacity>
                    )}

                    {renderIf(this.state.stepView == 2)(
                        <TouchableOpacity style={{width:"100%", height:"100%", justifyContent: 'center', alignItems: 'center'}} onPress={()=>this.phoneAuthCheck()}>
                            <View>
                                <Text style={{color:"#ffffff", width:"100%"}}>다음</Text>
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