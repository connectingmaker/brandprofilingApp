import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Body, Content, Footer,Item, Icon, Input,Button } from 'native-base';
import renderIf from 'render-if'



export default class Account extends Component {

    constructor(){
        super();
        this.state ={
            stepView:1
            ,emailBool:false
            ,pwBool: false
            ,phoneNumber:""
            ,emailText:""
            ,checkNumber:""
            ,newPw:""
            ,re_newPw:""
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
        this.stepNext(4);

    }
    /**** 이메일 계정과 핸드폰번호 확인 *******/
    pwCheck() {
        this.stepNext(5);

    }
    /**** 인증 번호 체크 *****/
    numberCheck(){
        this.stepNext(6);
    }

    /**** 새로운 비밀 번호 체크 *****/
    newPwCheck(){
        this.stepNext(7);
    }


    stepNext(value){

        this.setState({stepView: value});

        console.log(value);
    }


    render() {
        return (
            <Container>
                <Header style={AccountFormStyle.headerLayout}>
                    <View style={{flex:.1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize:12}} onPress={Actions.pop}>나가기</Text>
                    </View>
                    <View style={{flex:.8, justifyContent: 'center', alignItems: 'center'}}>
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
                    <View style={{flex:.1, justifyContent: 'center', alignItems: 'center'}}>

                    </View>
                </Header>
                <Content style={{padding:10}}>
                    {renderIf(this.state.stepView == 1)(
                        <View style={{paddingTop:30, paddingLeft:20, paddingRight:20}}>
                            <Button bordered full style={{borderColor:"#979797", backgroundColor:"#ffffff", justifyContent:'flex-start', paddingLeft:10}} onPress={()=>this.stepNext(2)}>
                                <Image source={require("../../assets/img/join_icon_email.png")} resizeMode={'contain'} style={{width:18, height:18}} />
                                <Text style={{marginLeft:10}}>이메일 계정 찾기</Text>
                            </Button>
                            <Button bordered full style={{borderColor:"#979797", backgroundColor:"#ffffff", justifyContent:'flex-start', paddingLeft:10}} onPress={()=>this.stepNext(3)}>
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
                                    <Text style={AccountFormStyle.contentsSize}>가입하신 이메일 주소는 <Text style={AccountFormStyle.boldFont}>perception@perception.co.kr</Text>입니다.</Text>
                                </View>

                            </View>

                            <View style={{padding:20}}>
                                <Button bordered full style={{borderColor:"#979797", backgroundColor:"#DA4211", justifyContent: 'flex-start', paddingLeft:10}}>
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
                                    <Text style={AccountFormStyle.contentsSize}>이메일이 발송되었습니다. 비밀번호를 변경하기 위해  <Text style={AccountFormStyle.boldFont}>인증번호</Text>를 입력하여 변경하거나 이메일 링크를 통해 비밀번호를 변경해주세요.</Text>
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
                                    <Text style={AccountFormStyle.contentsSize}><Text style={AccountFormStyle.boldFont}>영문</Text>이나 <Text style={AccountFormStyle.boldFont}>숫자</Text>를 사용하여 <Text style={AccountFormStyle.boldFont}>6~16자리</Text>의 <Text style={AccountFormStyle.boldFont}>새로운 비밀번호</Text>를 입력해주세요. 사용 가능한 특수 문자는 <Text style={AccountFormStyle.boldFont}>!@#$%^&*</Text>입니다.</Text>
                                </View>

                            </View>
                            <View style={{paddingLeft:20,paddingRight:20,paddingTop:20,paddingBottom:10}}>
                                <Item regular style={{backgroundColor:"#ffffff"}}>
                                    <Image source={require('../../assets/img/join_icon_pw.png')} resizeMode={'contain'} style={{width:16, height:13, marginTop:5, marginLeft:10}} />
                                    <Input placeholder='새로운 비밀번호 입력' style={AccountFormStyle.input} value={this.state.newPw} onChangeText={(text) => this.setState({newPw: text})} keyboardType="default"/>
                                </Item>
                            </View>
                            <View style={{paddingLeft:20,paddingRight:20}}>
                                <Item regular style={{backgroundColor:"#ffffff"}}>
                                    <Image source={require('../../assets/img/join_icon_pw.png')} resizeMode={'contain'} style={{width:16, height:13, marginTop:5, marginLeft:10}} />
                                    <Input placeholder='다시 입력' style={AccountFormStyle.input} value={this.state.re_newPw} onChangeText={(text) => this.setState({re_newPw: text})} keyboardType="default"/>
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
                <Footer style={{backgroundColor:"#222222", width:"100%", height:44, justifyContent: 'center', alignItems: 'center'}}>

                    {renderIf(this.state.stepView == 2)(
                        <TouchableOpacity style={{width:"100%", height:"100%", justifyContent: 'center', alignItems: 'center'}} onPress={()=>this.phoneCheck()}>
                            <View>
                                <Text style={{color:"#ffffff" }}>이메일 계정 주소 찾기</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    {renderIf(this.state.stepView == 3)(
                        <TouchableOpacity style={{width:"100%", height:"100%", justifyContent: 'center', alignItems: 'center'}} onPress={()=>this.pwCheck()} >
                            <View>
                                <Text style={{color:"#ffffff" }}>비밀번호 찾기</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    {renderIf(this.state.stepView == 4 || this.state.stepView == 7)(
                        <TouchableOpacity style={{width:"100%", height:"100%", justifyContent: 'center', alignItems: 'center'}} onPress={Actions.PreSurveyList} >
                            <View>
                                <Text style={{color:"#ffffff" }}>이메일 로그인</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    {renderIf(this.state.stepView == 5)(
                        <TouchableOpacity style={{width:"100%", height:"100%", justifyContent: 'center', alignItems: 'center'}} onPress={()=>this.numberCheck()}>
                            <View>
                                <Text style={{color:"#ffffff" }}>인증번호 입력</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    {renderIf(this.state.stepView == 6)(
                    <TouchableOpacity style={{width:"100%", height:"100%", justifyContent: 'center', alignItems: 'center'}} onPress={()=>this.newPwCheck()}>
                        <View>
                            <Text style={{color:"#ffffff" }}>비밀번호 변경</Text>
                        </View>
                    </TouchableOpacity>
                )}
                </Footer>
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
        ,backgroundColor: "#ffffff"
    }
    ,buttonStyle: {
        fontSize:15
        ,borderWidth:1
        ,borderColor:"#979797"
    }


})