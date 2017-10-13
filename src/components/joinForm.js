import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
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
        }
    }



    agreeBtn()
    {
        if(this.state.agreeBool == false) {
            this.setState({agreeBool : true});
        } else {
            this.setState({agreeBool : false});
        }

        console.log(this.state.agreeBool);
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


        if (reg.test(this.state.emailText) === true){
            fetch(config.SERVER_URL+'/api/userEmailCheck', {
                    body: JSON.stringify({
                        emailString: this.state.emailText
                    })
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    //return responseJson.movies;
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        else{
            this.setState({emailText:""})
            Alert.alert(
                'Error',
                '이메일형식이 올바르지 않습니다.',
                [
                    {text: '확인'},
                ],
                { cancelable: false }
            )
        }

    }



    step1Btn()
    {
        if(this.state.agreeBool == false) {
            Alert.alert(
                'Error',
                '이용약관 동의는 필수입니다',
                [
                    {text: '확인', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            )
            return;
        }

        if(this.state.privateBool == false) {
            Alert.alert(
                'Error',
                '개인정보취급방침 동의(필수)',
                [
                    {text: '확인', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            )
            return;
        }

        this.stepNext(2);

    }

    stepNext(value){
        switch(value) {
            case 1:
                this.setState({
                    step1View:false
                    ,step2View:true
                    ,
                });
                break;
        }

        console.log(value);

        this.setState({stepView: value});
    }


    render() {


        return (



            <Container>
                <Header style={JoinFormStyle.headerLayoyt}>
                    <View style={{flex:.1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize:12}} onPress={Actions.pop}>나가기</Text>
                    </View>
                    <View style={{flex:.8, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize:16}}>회원가입</Text>
                    </View>
                    <View style={{flex:.1, justifyContent: 'center', alignItems: 'center'}}>

                    </View>
                </Header>
                <Content style={{padding:10}}>
                    {renderIf(this.state.stepView == 1)(
                        <View>
                            <View style={JoinFormStyle.contentsLayout}>
                                <View style={{paddingTop:10}}>
                                    <Text style={JoinFormStyle.contentsSize}><Text style={JoinFormStyle.boldFont}>Brand Profiling</Text>은 브랜드 포지셔닝에 특화된 툴로써, 리서치를 통해 <Text style={JoinFormStyle.boldFont}>브랜드 이미지에 대하여 분석함을 목표</Text>로 하고 있습니다.</Text>
                                </View>

                                <View style={JoinFormStyle.lingBg}>
                                </View>

                                <View>
                                    <Text style={JoinFormStyle.contentsSize}>회원가입을 통해<Text style={JoinFormStyle.boldFont}>설문</Text>에 <Text style={JoinFormStyle.boldFont}>참여</Text>하여 <Text style={JoinFormStyle.boldFont}>포인트</Text>를 <Text style={JoinFormStyle.boldFont}>보상</Text>받으실 수 있습니다. 포인트 정책에 따라 포인트를 <Text style={JoinFormStyle.boldFont}>현금으로 환급</Text>받으실 수 있습니다. 많은 이용 부탁드립니다.</Text>
                                </View>

                                <View style={JoinFormStyle.lingBg}>
                                </View>


                                <View style={{flex:1, flexDirection: 'row', paddingTop:5, paddingBottom:5}}>
                                    <View style={{flex:0.45}}>

                                        <Button bordered full style={{borderColor:"#979797"}}>
                                            <Text>이용약관</Text>
                                        </Button>
                                    </View>

                                    <View style={{flex:0.1}}>

                                    </View>

                                    <View style={{flex:0.45}}>
                                        <Button bordered full style={{borderColor:"#979797"}}>
                                            <Text>개인정보취급방침</Text>
                                        </Button>
                                    </View>
                                </View>

                            </View>

                            <View style={{paddingTop:30, paddingLeft:20, paddingRight:20}}>
                                {renderIf(this.state.agreeBool == false) (


                                    <Button bordered full style={{borderColor:"#979797", backgroundColor:"#ffffff", justifyContent: 'flex-start', paddingLeft:10}} onPress={()=>this.agreeBtn()}>
                                        <Image source={require("../../assets/img/icon_checkbox_off.png")} resizeMode={'contain'} style={{width:18, height:18}} />
                                        <Text style={{marginLeft:10}}>이용약관 동의(필수)</Text>
                                    </Button>


                                )}

                                {renderIf(this.state.agreeBool == true) (

                                    <Button bordered full style={{borderColor:"#979797", backgroundColor:"#DA4211", justifyContent: 'flex-start', paddingLeft:10}} onPress={()=>this.agreeBtn()}>
                                        <Image source={require("../../assets/img/icon_checkbox_on.png")} resizeMode={'contain'} style={{width:18, height:18}} />
                                        <Text style={{marginLeft:10, color:"#ffffff"}}>이용약관 동의(필수)</Text>
                                    </Button>


                                )}


                                {renderIf(this.state.privateBool == false) (
                                    <Button bordered full style={{marginTop:10, borderColor:"#979797", backgroundColor:"#ffffff", justifyContent: 'flex-start', paddingLeft:10}} onPress={()=>this.privateBtn()}>
                                        <Image source={require("../../assets/img/icon_checkbox_off.png")} resizeMode={'contain'} style={{width:18, height:18}} />
                                        <Text style={{marginLeft:10}}>개인정보취급방침 동의(필수)</Text>
                                    </Button>
                                )}

                                {renderIf(this.state.privateBool == true) (
                                    <Button bordered full style={{marginTop:10, borderColor:"#979797", backgroundColor:"#DA4211", justifyContent: 'flex-start', paddingLeft:10}} onPress={()=>this.privateBtn()}>
                                        <Image source={require("../../assets/img/icon_checkbox_on.png")} resizeMode={'contain'} style={{width:18, height:18}} />
                                        <Text style={{marginLeft:10, color:"#ffffff"}}>개인정보취급방침 동의(필수)</Text>
                                    </Button>
                                )}

                            </View>
                        </View>
                    )}

                    {renderIf(this.state.stepView == 2)(
                        <View>
                            <View style={JoinFormStyle.contentsLayout}>
                                <View>
                                    <Text style={JoinFormStyle.contentsSize}><Text style={JoinFormStyle.boldFont}>계정</Text>으로 사용될 이메일 주소를 입력해주세요.</Text>
                                </View>




                            </View>
                            <View style={{padding:20}}>
                                <Item regular style={{backgroundColor:"#ffffff"}}>
                                    <Image source={require('../../assets/img/join_icon_email.png')} resizeMode={'contain'} style={{width:16, height:13, marginTop:5, marginLeft:10}} />
                                    <Input placeholder='이메일' style={JoinFormStyle.input} value={this.state.emailText} onChangeText={(text) => this.setState({emailText: text})} keyboardType="email-address"/>
                                </Item>
                            </View>
                        </View>
                    )}

                    {renderIf(this.state.stepView == 3)(
                        <View style={JoinFormStyle.contentsLayout}>
                            <View>
                                <Text style={JoinFormStyle.contentsSize}><Text style={JoinFormStyle.boldFont}>khjung@c-maker.co.kr</Text>으로 인증번호가 포함된 이메일이 발송되었습니다. 아래 입력한에 인증번호를 입력해주세요.</Text>
                            </View>

                        </View>
                    )}


                </Content>
                <Footer style={{backgroundColor:"#222222", width:"100%", height:44, justifyContent: 'center', alignItems: 'center'}}>
                    {renderIf(this.state.stepView == 1)(
                        <TouchableOpacity style={{width:"100%", height:"100%", justifyContent: 'center', alignItems: 'center'}} onPress={()=>this.step1Btn()}>
                            <View>
                                <Text style={{color:"#ffffff" }}>다음</Text>
                            </View>
                        </TouchableOpacity>
                    )}

                    {renderIf(this.state.stepView == 2)(
                        <Text style={{color:"#ffffff", width:"100%"}} onPress={()=>this.emailCheck()}>다음</Text>
                    )}

                    {renderIf(this.state.stepView == 3)(
                        <Text style={{color:"#ffffff", width:"100%"}} onPress={()=>this.stepBtn(4)}>다음</Text>
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
    ,btnStyle: {
        borderWidth:1
        ,borderColor:"#979797"
        ,color:"#000"
    }
})