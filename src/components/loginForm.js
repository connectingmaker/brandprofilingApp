import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert, AsyncStorage, Platform } from 'react-native';
import { Container, Header, Body, Footer, Item, Icon, Input, Toast } from 'native-base';
import FCM from "react-native-fcm";
import config from '../../src/config';



export default class LoginForm extends Component {
    constructor(){
        super();
        this.state = {
            emailText: ""
            ,passPw: ""
            ,loginBool:false
            ,networkState:true
            ,showToast:false
            ,token: ""
        }


        //AsyncStorage.clear();
    }

    componentWillUpdate()
    {
        console.log(this.state.networkState);
    }
    componentDidUpdate() {
        if (this.state.loginBool == true) {
            //console.log("로그인 성공");
            Actions.Main();
            //Actions.pop({ refresh: { someProp: 'new Value'}});
        }
    }

    _loadInitalState = async() => {
        try {
            var value = await AsyncStorage.getItem(config.STORE_KEY)
            if (value != null) {
                this.setState({products: value.SESS_UID});
            }
        } catch (error) {
            console.log("error setting product list");
        }
    }

    loginCheck()
    {
        if(this.state.emailText == ""){
            Alert.alert(
                '',
                '이메일정보를 입력해주세요.',
                [
                    {text: '확인', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            )
            return;
        }

        if(this.state.passPw == ""){
            Alert.alert(
                '',
                '패스워드를 입력해주세요.',
                [
                    {text: '확인', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            )
            return;
        }

        FCM.requestPermissions();

        FCM.getFCMToken().then(token => {
            var userToken = token;
            var object = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'useremail': this.state.emailText
                    ,'userpasswd': this.state.passPw
                    ,'userToken': userToken
                    ,"os" : Platform.OS
                    ,"version" : Platform.Version

                })
            };

            fetch(config.SERVER_URL + '/api/memberSelect', object)
                .then((response) => response.text())
                .then((responseJson) => {
                    //console.log(responseJson);
                    var data = eval("(" + responseJson + ")");
                    switch (data[0].ERR_CODE) {
                        case "000":
                            try {
                                /*
                                 AsyncStorage.setItem("SESS_EMAIL", data[0].USEREMAIL);
                                 AsyncStorage.setItem("SESS_UID", data[0].UID);
                                 */

                                var dataObject = {
                                    "SESS_UID": data[0].UID
                                    , "SESS_USEREMAIL": data[0].USEREMAIL
                                    , "SESS_ALL_PUSH_YN": data[0].ALL_PUSH_YN
                                    , "SESS_SURVEY_PUSH_YN": data[0].SURVEY_PUSH_YN
                                };

                                this.setState({loginBool: true}, () => {
                                    AsyncStorage.setItem(config.STORE_KEY, JSON.stringify(dataObject));

                                });


                            } catch (err) {
                                console.log(err);
                            }
                            break;
                        case "101":
                            Alert.alert(
                                'Error',
                                '가입된 이력이 존재하지 않습니다.',
                                [
                                    {text: '확인', onPress: () => console.log('OK Pressed')},
                                ],
                                {cancelable: false}
                            )
                            return;
                            break;
                        case "102":
                            Alert.alert(
                                'Error',
                                '패스워드가 일치하지 않습니다.',
                                [
                                    {text: '확인', onPress: () => console.log('OK Pressed')},
                                ],
                                {cancelable: false}
                            )
                            return;
                            break;
                    }

                })
                .catch((error) => {
                    Alert.alert(
                        'Error',
                        'Network Error',
                        [
                            {text: '확인', onPress: () => console.log('OK Pressed')},
                        ],
                        {cancelable: false}
                    )
                    return;
                });
        });
    }

    /*
     <TouchableOpacity onPress={() => this.loginCheck()} style={{alignSelf: 'stretch', alignItems:'center', justifyContent:'center'}}>
     <Footer style={LoginFormStyle.loginBg}>
     <Text style={{color:"#ffffff"}} >로그인</Text>
     </Footer>
     </TouchableOpacity>
     */

    render() {
        return (
            <Container>
                <Header style={LoginFormStyle.headerLayoyt}>
                    <View style={{flex:.15, alignItems: 'center',justifyContent:'flex-start'}}>
                        <TouchableOpacity onPress={Actions.pop} style={{alignSelf: 'stretch', alignItems:'center', justifyContent:'center'}}>
                        <Text style={{color:"#ffffff"}}>뒤로</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:.7, alignItems: 'center'}}>
                        <Text style={{color:"#ffffff"}}>이메일로 로그인</Text>
                    </View>
                    <View style={{flex:.15, alignItems: 'center',justifyContent:'flex-end'}}>
                        <TouchableOpacity onPress={() => this.loginCheck()} style={{alignSelf: 'stretch', alignItems:'center', justifyContent:'center'}}>
                        <Text style={{color:"#ffffff"}}>로그인</Text>
                        </TouchableOpacity>
                    </View>
                </Header>
                <Body style={LoginFormStyle.viewLayout}>
                <Item regular>
                    <Image source={require('../../assets/img/join_icon_email.png')} resizeMode={'contain'} style={{width:16, height:13, marginTop:5, marginLeft:10}} />
                    <Input placeholder='이메일' style={LoginFormStyle.input} onChangeText={(text) => this.setState({emailText: text})} keyboardType="email-address"/>
                </Item>
                <Item regular style={{marginTop:10}}>
                    <Image source={require('../../assets/img/join_icon_pw.png')} resizeMode={'contain'} style={{width:13, height:16, marginTop:3, marginLeft:13}} />
                    <Input placeholder='비밀번호' style={LoginFormStyle.inputPw} onChangeText={(text) => this.setState({passPw: text})} keyboardType="default" secureTextEntry={true}/>
                </Item>
                </Body>


            </Container>

        );
    }
}

const LoginFormStyle = StyleSheet.create({
    headerLayoyt: {
        justifyContent: 'center', alignItems: 'center', backgroundColor: "#222222"
    }
    ,viewLayout: {
        flex: 1
        ,backgroundColor: "#F6F6F6"
        ,paddingTop: 40
        ,paddingLeft: 30
        ,paddingRight: 30
        ,paddingBottom: 40
    }
    ,input: {
        fontSize:12
        ,paddingTop:13
        ,paddingLeft:11
        ,paddingBottom:12
        ,height:38
    }

    ,inputPw: {
        fontSize:12
        ,paddingTop:13
        ,paddingLeft:11
        ,paddingBottom:12
        ,height:38
    }
    ,loginBg: { backgroundColor:"#222222", width:"100%", height:44, justifyContent: 'center', alignItems: 'center'}

})