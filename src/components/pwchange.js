import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, StyleSheet, TouchableOpacity,Alert } from 'react-native';
import { Container, Header, Body, Content, Footer,Item, Icon, Input,Button } from 'native-base';
import renderIf from 'render-if'
import config from '../config';



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
        }


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
                                'Error',
                                '정보가 일치하지 않습니다.',
                                [
                                    {text: '확인'},
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
                'Error',
                '이메일형식이 올바르지 않습니다.',
                [
                    {text: '확인'},
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

        if(!/^[a-zA-Z0-9]{6,16}$/.test(this.state.newPw)){
            Alert.alert(
                '',
                '숫자와 영문자 조합으로 6~16자리 그리고 특수문자를 사용해야 합니다.',
                [
                    {text: '확인', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            );
            return;
        } else {
            if(this.state.newPw != this.state.re_newPw) {
                Alert.alert(
                    '',
                    '패스워드를 확인해주세요.',
                    [
                        {text: '확인', onPress: () => console.log('OK Pressed')},
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
                                '오류가 발생되었습니다.',
                                [
                                    {text: '확인', onPress: () => console.log('OK Pressed')},
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


    render() {
        return (
            <Container>
                <Header style={PwFormStyle.headerLayout}>
                    <View style={{flex:.1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize:12}} onPress={Actions.pop}>나가기</Text>
                    </View>
                    <View style={{flex:.8, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize:16}}>비밀번호 변경</Text>
                    </View>
                    <View style={{flex:.1, justifyContent: 'center', alignItems: 'center'}}>

                    </View>
                </Header>
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
                                    <Input placeholder='이메일 계정 입력' style={PwFormStyle.input} value={this.state.emailText} onChangeText={(text) => this.setState({emailText: text})} keyboardType="email-address"/>
                                </Item>
                            </View>
                            <View style={{paddingLeft:20,paddingRight:20}}>
                                <Item regular style={{backgroundColor:"#ffffff"}}>
                                    <Image source={require('../../assets/img/join_icon_phone.png')} resizeMode={'contain'} style={{width:16, height:13, marginTop:5, marginLeft:10}} />
                                    <Input placeholder='핸드폰번호 입력' style={PwFormStyle.input} value={this.state.phoneNumber} onChangeText={(text) => this.setState({phoneNumber: text})} keyboardType="numeric"/>
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
                                    <Input placeholder='인증번호 입력' style={PwFormStyle.input} value={this.state.checkNumber} onChangeText={(text) => this.setState({checkNumber: text})} keyboardType="numeric"/>
                                </Item>
                            </View>
                        </View>
                    )}
                    {renderIf(this.state.stepView == 3)(
                        <View>
                            <View style={PwFormStyle.contentsLayout}>
                                <View>
                                    <Text style={PwFormStyle.contentsSize}><Text style={PwFormStyle.boldFont}>영문</Text>이나 <Text style={PwFormStyle.boldFont}>숫자</Text> 그리고 <Text style={PwFormStyle.boldFont}>특수문자</Text>를 사용하여 <Text style={PwFormStyle.boldFont}>6~16자리</Text>의 <Text style={PwFormStyle.boldFont}>새로운 비밀번호</Text>를 입력해주세요. </Text>
                                </View>

                            </View>
                            <View style={{paddingLeft:20,paddingRight:20,paddingTop:20,paddingBottom:10}}>
                                <Item regular style={{backgroundColor:"#ffffff"}}>
                                    <Image source={require('../../assets/img/join_icon_pw.png')} resizeMode={'contain'} style={{width:16, height:13, marginTop:5, marginLeft:10}} />
                                    <Input placeholder='새로운 비밀번호 입력' style={PwFormStyle.input} value={this.state.newPw} onChangeText={(text) => this.setState({newPw: text})} keyboardType="default" secureTextEntry={true}/>
                                </Item>
                            </View>
                            <View style={{paddingLeft:20,paddingRight:20}}>
                                <Item regular style={{backgroundColor:"#ffffff"}}>
                                    <Image source={require('../../assets/img/join_icon_pw.png')} resizeMode={'contain'} style={{width:16, height:13, marginTop:5, marginLeft:10}} />
                                    <Input placeholder='다시 입력' style={PwFormStyle.input} value={this.state.re_newPw} onChangeText={(text) => this.setState({re_newPw: text})} keyboardType="default" secureTextEntry={true}/>
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
                <Footer style={{backgroundColor:"#222222", width:"100%", height:44, justifyContent: 'center', alignItems: 'center'}}>


                    {renderIf(this.state.stepView == 1)(
                        <TouchableOpacity style={{width:"100%", height:"100%", justifyContent: 'center', alignItems: 'center'}} onPress={()=>this.pwCheck()} >
                            <View>
                                <Text style={{color:"#ffffff" }}>비밀번호 변경</Text>
                            </View>
                        </TouchableOpacity>
                    )}

                    {renderIf(this.state.stepView == 2)(
                        <TouchableOpacity style={{width:"100%", height:"100%", justifyContent: 'center', alignItems: 'center'}} onPress={()=>this.numberCheck()}>
                            <View>
                                <Text style={{color:"#ffffff" }}>인증번호 입력</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    {renderIf(this.state.stepView == 3)(
                        <TouchableOpacity style={{width:"100%", height:"100%", justifyContent: 'center', alignItems: 'center'}} onPress={()=>this.newPwCheck()}>
                            <View>
                                <Text style={{color:"#ffffff" }}>변경 확인</Text>
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
    ,input: {
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