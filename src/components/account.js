import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, StyleSheet, TouchableOpacity, Clipboard, Alert } from 'react-native';
import { Container, Header, Body, Content, Footer,Item, Icon, Input,Button } from 'native-base';
import renderIf from 'render-if'
import config from '../../src/config';



export default class Account extends Component {

    constructor(){
        super();
        this.state ={
            stepView:1
            ,emailBool:false
            ,returnEmail:""
            ,pwBool: false
            ,phoneNumber:""
            ,emailText:""
            ,checkNumber:""
            ,newPw:""
            ,re_newPw:""
            ,authcode:""
        }
    }
/*
    emailBtn()
    {
        this.stepNext(2);
    }

    pwBtn()
    {
        this.stepNext(3);
    }
    */

    /**** 핸드폰번호 확인 *******/
    phoneCheck() {
        /*this.stepNext(4);*/
        if(this.state.phoneNumber == "") {
            Alert.alert(
                '',
                '핸드폰번호를 입력해주세요.',
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
                    'userphone': this.state.phoneNumber

                })
            };


            fetch(config.SERVER_URL+"/api/memberEmailSearch", object)
                .then((response) => response.json())
                .then((responseData) =>
                {
                    var data = responseData;

                    console.log(data);

                    switch(data.ERR_CODE) {
                        case "000":
                            this.setState({returnEmail:data.USEREMAIL});
                            this.stepNext(4);
                            break;
                        default:
                            Alert.alert(
                                'ERR_CODE='+data.ERR_CODE,
                                data.ERR_MSG,
                                [
                                    {text: '확인', onPress: () => console.log('OK Pressed')},
                                ],
                                {cancelable: false}
                            )
                            break;
                    }

                })
                .catch((err) => {
                    console.log(err);
                });
        }

    }
    /**** 이메일 계정과 핸드폰번호 확인 *******/
    pwCheck() {
        if(this.state.emailText == "") {
            Alert.alert(
                '',
                '이메일 계정을 입력해주세요.',
                [
                    {text: '확인', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false}
            )
            return;
        }

        if(this.state.phoneNumber == "") {
            Alert.alert(
                '',
                '핸드폰 번호를 입력해주세요.',
                [
                    {text: '확인', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false}
            )
            return;
        }

        var object = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify( {
                'useremail': this.state.emailText
                ,'userphone': this.state.phoneNumber
            })
        };


        fetch(config.SERVER_URL+"/api/memberIdPhoneSearch", object)
            .then((response) => response.json())
            .then((responseData) =>
            {
                var data = responseData;


                switch(data.ERR_CODE) {
                    case "000":
                        console.log(data.AUTHCODE);
                        this.setState({authcode:data.AUTHCODE});
                        this.stepNext(5);
                        break;
                    default:
                        Alert.alert(
                            'ERR_CODE='+data.ERR_CODE,
                            data.ERR_MSG,
                            [
                                {text: '확인', onPress: () => console.log('OK Pressed')},
                            ],
                            {cancelable: false}
                        )
                        break;
                }

            })
            .catch((err) => {
                console.log(err);
            });




    }
    /**** 인증 번호 체크 *****/
    numberCheck(){
        if(this.state.checkNumber != this.state.authcode) {
            Alert.alert(
                "",
                "인증번호가 입력해주세요.",
                [
                    {text: '확인', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false}
            )
        } else {
            this.stepNext(6);
        }

    }

    /**** 새로운 비밀 번호 체크 *****/
    newPwCheck(){
        var passwordRules = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*])(?=.*[0-9]).{6,16}$/;

        if(!passwordRules.test(this.state.newPw)){
            Alert.alert(
                '',
                '영문과 숫자 그리고 특수문자 !@#$%^& 조합으로 6~16자리를 사용해야 합니다.',
                [
                    {text: '확인', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            );
            return;
        } else {
            if (this.state.newPw != this.state.re_newPw) {
                Alert.alert(
                    "",
                    "패스워드가 일치하지 않습니다",
                    [
                        {text: '확인', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false}
                )
            } else {
                var object = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'useremail': this.state.emailText
                        , 'userphone': this.state.phoneNumber
                        , 'userpw': this.state.newPw
                    })
                };


                fetch(config.SERVER_URL + "/api/memberPwUpdate", object)
                    .then((response) => response.json())
                    .then((responseData) => {
                        var data = responseData;

                        console.log(data);


                        switch (data.ERR_CODE) {
                            case "000":
                                this.stepNext(7);

                                break;
                            default:
                                Alert.alert(
                                    'ERR_CODE=' + data.ERR_CODE,
                                    data.ERR_MSG,
                                    [
                                        {text: '확인', onPress: () => console.log('OK Pressed')},
                                    ],
                                    {cancelable: false}
                                )
                                break;
                        }

                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }
    }


    stepNext(value){

        this.setState({stepView: value});

        console.log(value);
    }

    writeToClipboard = async () => {
        alert('TODO: Write to the Clipboard');
    };

    emailCopy = async () => {
        await Clipboard.setString(this.state.returnEmail);
    };


    render() {
        return (
            <Container>
                <Header style={AccountFormStyle.headerLayout}>
                    <View style={{flex:.15, justifyContent: 'center', alignItems: 'flex-start'}}>
                        <TouchableOpacity onPress={Actions.pop}>
                        <Text style={{fontSize:12}}>나가기</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:.7, justifyContent: 'center', alignItems: 'center'}}>
                        {renderIf(this.state.stepView == 1)(
                        <Text style={{fontSize:16}}>계정 / 비번 찾기</Text>
                        )}
                        {renderIf(this.state.stepView == 2 || this.state.stepView == 4)(
                            <Text style={{fontSize:16}}>이메일 계정 찾기</Text>
                        )}
                        {renderIf(this.state.stepView == 3 || this.state.stepView == 5)(
                            <Text style={{fontSize:16}}>비밀번호 찾기</Text>
                        )}
                        {renderIf(this.state.stepView == 6)(
                            <Text style={{fontSize:16}}>새로운 비밀번호</Text>
                        )}
                        {renderIf(this.state.stepView == 7)(
                            <Text style={{fontSize:16}}>비밀번호 변경 완료</Text>
                        )}

                    </View>
                    <View style={{flex:.15, justifyContent: 'center', alignItems: 'center'}}>

                    </View>
                </Header>
                <Content style={{padding:10}}>
                    {renderIf(this.state.stepView == 1)(
                        <View style={{paddingTop:30, paddingLeft:20, paddingRight:20}}>
                            <Button bordered full style={{borderColor:"#979797", backgroundColor:"#ffffff", justifyContent:'flex-start', paddingLeft:10}} onPress={()=>this.stepNext(2)}>
                                <Image source={require("../../assets/img/join_icon_email.png")} resizeMode={'contain'} style={{width:18, height:18}} />
                                <Text style={{marginLeft:10}}>이메일 계정 찾기</Text>
                            </Button>
                            <Button bordered full style={{borderColor:"#979797", backgroundColor:"#ffffff", justifyContent:'flex-start', paddingLeft:10, marginTop:11 }} onPress={()=>this.stepNext(3)}>
                                <Image source={require("../../assets/img/join_icon_pw.png")} resizeMode={'contain'} style={{width:18, height:18}} />
                                <Text style={{marginLeft:10}}>비밀번호 찾기</Text>
                            </Button>
                        </View>
                    )}
                    {renderIf(this.state.stepView == 2)(
                        <View>
                            <View style={AccountFormStyle.contentsLayout}>
                                <View>
                                    <Text style={AccountFormStyle.contentsSize}><Text style={AccountFormStyle.boldFont}>가입된 이메일 계정</Text>을 찾기 위해 가입시 인증하신 <Text style={AccountFormStyle.boldFont}>핸드폰 번호</Text>를 입력해주세요.</Text>
                                </View>

                            </View>

                            <View style={{padding:20}}>
                                <Item regular style={{backgroundColor:"#ffffff"}}>
                                    <Image source={require('../../assets/img/join_icon_phone.png')} resizeMode={'contain'} style={{width:16, height:13, marginTop:5, marginLeft:10}} />
                                    <Input placeholder='핸드폰번호입력' style={AccountFormStyle.input} value={this.state.phoneNumber} onChangeText={(text) => this.setState({phoneNumber: text})} keyboardType="numeric"/>
                                </Item>
                            </View>
                        </View>
                    )}
                    {renderIf(this.state.stepView == 3)(
                        <View>
                            <View style={AccountFormStyle.contentsLayout}>
                                <View>
                                    <Text style={AccountFormStyle.contentsSize}><Text style={AccountFormStyle.boldFont}>비밀번호</Text>를 찾기 위해 가입시 인증하신 <Text style={AccountFormStyle.boldFont}>이메일 주소</Text> 와 <Text style={AccountFormStyle.boldFont}>핸드폰 번호</Text>를 입력해주세요.</Text>
                                </View>

                            </View>
                            <View style={{paddingLeft:20,paddingRight:20,paddingTop:20,paddingBottom:10}}>
                                <Item regular style={{backgroundColor:"#ffffff"}}>
                                    <Image source={require('../../assets/img/join_icon_email.png')} resizeMode={'contain'} style={{width:16, height:13, marginTop:5, marginLeft:10}} />
                                    <Input placeholder='이메일 계정 입력' style={AccountFormStyle.input} value={this.state.emailText} onChangeText={(text) => this.setState({emailText: text})} keyboardType="email-address"/>
                                </Item>
                            </View>
                            <View style={{paddingLeft:20,paddingRight:20}}>
                                <Item regular style={{backgroundColor:"#ffffff"}}>
                                    <Image source={require('../../assets/img/join_icon_phone.png')} resizeMode={'contain'} style={{width:16, height:13, marginTop:5, marginLeft:10}} />
                                    <Input placeholder='핸드폰번호 입력' style={AccountFormStyle.input} value={this.state.phoneNumber} onChangeText={(text) => this.setState({phoneNumber: text})} keyboardType="numeric"/>
                                </Item>
                            </View>
                        </View>
                    )}
                    {renderIf(this.state.stepView == 4)(
                        <View>
                            <View style={AccountFormStyle.contentsLayout}>
                                <View>
                                    <Text style={AccountFormStyle.contentsSize}>가입하신 이메일 주소는 <Text style={AccountFormStyle.boldFont}>{this.state.returnEmail}</Text>입니다.</Text>
                                </View>

                            </View>

                            <View style={{padding:20}}>
                                <Button bordered full style={{borderColor:"#979797", backgroundColor:"#DA4211", justifyContent: 'flex-start', paddingLeft:10}} onPress={() => this.emailCopy()}>
                                    <Image source={require("../../assets/img/join_icon_email_on2.png")} resizeMode={'contain'} style={{width:18, height:18}} />
                                    <Text style={{marginLeft:10, color:"#ffffff"}}>이메일 계정 주소 복사하기</Text>
                                </Button>
                            </View>
                        </View>
                    )}
                    {renderIf(this.state.stepView == 5)(
                        <View>
                            <View style={AccountFormStyle.contentsLayout}>
                                <View>
                                    <Text style={AccountFormStyle.contentsSize}>SMS가 발송되었습니다. 비밀번호를 변경하기 위해  <Text style={AccountFormStyle.boldFont}>인증번호</Text>를 입력해주세요</Text>
                                </View>

                            </View>

                            <View style={{padding:20}}>
                                <Item regular style={{backgroundColor:"#ffffff"}}>
                                    <Image source={require('../../assets/img/join_icon_check.png')} resizeMode={'contain'} style={{width:16, height:13, marginTop:5, marginLeft:10}} />
                                    <Input placeholder='인증번호 입력' style={AccountFormStyle.input} value={this.state.checkNumber} onChangeText={(text) => this.setState({checkNumber: text})} keyboardType="numeric"/>
                                </Item>
                            </View>
                        </View>
                    )}
                    {renderIf(this.state.stepView == 6)(
                        <View>
                            <View style={AccountFormStyle.contentsLayout}>
                                <View>
                                    <Text style={AccountFormStyle.contentsSize}><Text style={AccountFormStyle.boldFont}>영문</Text>이나 <Text style={AccountFormStyle.boldFont}>숫자</Text> 그리고 <Text style={AccountFormStyle.boldFont}>특수문자</Text>를 사용하여 <Text style={AccountFormStyle.boldFont}>6~16자리</Text>의 <Text style={AccountFormStyle.boldFont}>새로운 비밀번호</Text>를 입력해주세요. 사용가능한 특수문자는 <Text style={AccountFormStyle.boldFont}>!@#$%^&*</Text> 입니다.</Text>
                                </View>

                            </View>
                            <View style={{paddingLeft:20,paddingRight:20,paddingTop:20,paddingBottom:10}}>
                                <Item regular style={{backgroundColor:"#ffffff"}}>
                                    <Image source={require('../../assets/img/join_icon_pw.png')} resizeMode={'contain'} style={{width:16, height:13, marginTop:5, marginLeft:10}} />
                                    <Input placeholder='새로운 비밀번호 입력' style={AccountFormStyle.input} value={this.state.newPw} onChangeText={(text) => this.setState({newPw: text})} keyboardType="default" secureTextEntry={true}/>
                                </Item>
                            </View>
                            <View style={{paddingLeft:20,paddingRight:20}}>
                                <Item regular style={{backgroundColor:"#ffffff"}}>
                                    <Image source={require('../../assets/img/join_icon_pw.png')} resizeMode={'contain'} style={{width:16, height:13, marginTop:5, marginLeft:10}} />
                                    <Input placeholder='다시 입력' style={AccountFormStyle.input} value={this.state.re_newPw} onChangeText={(text) => this.setState({re_newPw: text})} keyboardType="default" secureTextEntry={true}/>
                                </Item>
                            </View>


                        </View>
                    )}
                    {renderIf(this.state.stepView == 7)(
                        <View>
                            <View style={AccountFormStyle.contentsLayout}>
                                <View>
                                    <Text style={AccountFormStyle.contentsSize}>비밀번호 변경이 완료되었습니다.</Text>
                                </View>

                            </View>

                        </View>
                    )}
                </Content>
                {renderIf(this.state.stepView == 2)(
                <Footer style={{backgroundColor:"#222222", width:"100%", height:44, justifyContent: 'center', alignItems: 'center'}}>


                        <TouchableOpacity style={{width:"100%", height:"100%", justifyContent: 'center', alignItems: 'center'}} onPress={()=>this.phoneCheck()}>
                            <View>
                                <Text style={{color:"#ffffff" }}>이메일 계정 주소 찾기</Text>
                            </View>
                        </TouchableOpacity>
                </Footer>
                )}

                {renderIf(this.state.stepView == 3)(
                <Footer style={{backgroundColor:"#222222", width:"100%", height:44, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity style={{width:"100%", height:"100%", justifyContent: 'center', alignItems: 'center'}} onPress={()=>this.pwCheck()} >
                        <View>
                            <Text style={{color:"#ffffff" }}>비밀번호 찾기</Text>
                        </View>
                    </TouchableOpacity>
                </Footer>
                )}

                {renderIf(this.state.stepView == 4 || this.state.stepView == 7)(
                    <Footer style={{backgroundColor:"#222222", width:"100%", height:44, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity style={{width:"100%", height:"100%", justifyContent: 'center', alignItems: 'center'}} onPress={Actions.root} >
                            <View>
                                <Text style={{color:"#ffffff" }}>이메일 로그인</Text>
                            </View>
                        </TouchableOpacity>
                    </Footer>
                )}
                {renderIf(this.state.stepView == 5)(
                    <Footer style={{backgroundColor:"#222222", width:"100%", height:44, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity style={{width:"100%", height:"100%", justifyContent: 'center', alignItems: 'center'}} onPress={()=>this.numberCheck()}>
                            <View>
                                <Text style={{color:"#ffffff" }}>인증번호 입력</Text>
                            </View>
                        </TouchableOpacity>
                    </Footer>
                )}
                {renderIf(this.state.stepView == 6)(
                    <Footer style={{backgroundColor:"#222222", width:"100%", height:44, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity style={{width:"100%", height:"100%", justifyContent: 'center', alignItems: 'center'}} onPress={()=>this.newPwCheck()}>
                            <View>
                                <Text style={{color:"#ffffff" }}>비밀번호 변경</Text>
                            </View>
                        </TouchableOpacity>
                    </Footer>
                )}

            </Container>
        );
    }
}



const AccountFormStyle = StyleSheet.create({
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
    ,input: {
        fontSize:12
        ,paddingTop:13
        ,paddingLeft:11
        ,paddingBottom:12
        ,height:38
    }
    ,buttonStyle: {
        fontSize:15
        ,borderWidth:1
        ,borderColor:"#979797"
    }


})