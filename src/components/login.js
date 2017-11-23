import React, { Component } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, ActionSheet } from 'native-base';
import { AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk';
import config from '../config'



export default class Login extends Component {

    constructor(){
        super();
        this.state = {
            loginBool:false
        }


        //AsyncStorage.clear();
    }





    _fbAuth() {
        LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(function(result) {
            console.log(result);
            if (result.isCancelled) {
                console.log("Login Cancelled");
            } else {
                AccessToken.getCurrentAccessToken().then(
                    (data) => {
                        var accessToken = data.accessToken;

                        const responseInfoCallback = (error, result) => {
                            if (error) {
                                console.log(error)
                            } else {
                                console.log(result)


                                var object = {
                                    method: 'POST',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body:JSON.stringify( {
                                        'useremail': result.email
                                        ,'username': result.name
                                        ,'facebook_id': result.id

                                    })
                                };

                                fetch(config.SERVER_URL+'/api/memberFaceBook', object)
                                    .then((response) => response.text())
                                    .then((responseJson) => {

                                        var data = eval("("+responseJson+")");

                                        var dataObject = {
                                            "SESS_UID" : data[0].UID
                                            ,"SESS_USEREMAIL" : data[0].USEREMAIL
                                        };

                                        console.log(dataObject);

                                        AsyncStorage.setItem(config.STORE_KEY, JSON.stringify(dataObject), () => {
                                            Actions.Main();
                                        });





                                    })
                                    .catch((error) => {
                                        console.log("오류");
                                    });
                            }
                        }



                        const infoRequest = new GraphRequest(
                            '/me',
                            {
                                accessToken: accessToken,
                                parameters: {
                                    fields: {
                                        string: 'id,email,name'
                                    }
                                }
                            },
                            responseInfoCallback
                        );

                        // Start the graph request.
                        new GraphRequestManager().addRequest(infoRequest).start();


                    })

            }
        }, function(error) {
            console.log("some error occurred!!");
        })
    }



    render() {
        return (
            <Container style={LoginStyle.wrapper}>

                <Body style={{alignItems:'center', justifyContent:'center', alignSelf: 'stretch'}}>
                    <View style={{flex:.7, alignItems:'center', justifyContent:'center', alignSelf: 'stretch', paddingTop:100}}>

                        <Image source={require('../../assets/img/login_logo.png')} resizeMode={'contain'} style={LoginStyle.logo}></Image>
                        <Text style={LoginStyle.logoTitle}>
                            브랜드 프로파일링 서베이 패널
                        </Text>
                    </View>
                    <View style={{flex:.3, alignItems:'center', justifyContent:'center', alignSelf: 'stretch', paddingBottom: 20}}>
                        <TouchableOpacity onPress={Actions.LoginForm} style={{alignSelf: 'stretch', alignItems:'center', justifyContent:'center'}}>
                            <Image source={require('../../assets/img/login_emailBtn.png')} resizeMode={'contain'} style={LoginStyle.btn} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this._fbAuth()} style={{alignSelf: 'stretch', alignItems:'center', justifyContent:'center'}}>
                            <Image source={require('../../assets/img/login_facebookBtn.png')} resizeMode={'contain'} style={LoginStyle.btn} />
                        </TouchableOpacity>
                    </View>
                </Body>
                <Footer style={{backgroundColor:"#222222", width:"100%", justifyContent: 'center', alignItems: 'center', flexDirection:'row'}}>
                    <View style={LoginStyle.footerViewLeft}>
                        <Text style={LoginStyle.footerViewLeftFont} onPress={Actions.Account}>계정/비번 찾기</Text>
                    </View>

                    <View style={LoginStyle.footerViewCenter}>
                        <Text style={LoginStyle.footerViewCenterFont}>|</Text>
                    </View>



                    <View style={LoginStyle.footerViewRight}>
                        <Text style={LoginStyle.footerViewRightFont} onPress={Actions.JoinForm}>회원가입</Text>
                    </View>

                </Footer>
            </Container>
        );
    };
}

const LoginStyle = StyleSheet.create({
    wrapper: {
        backgroundColor: '#ffffff'
        ,flex: 1
        ,justifyContent: 'center'
        ,alignItems: 'center'
    }
    ,logo: {
        width:"50%"

    }
    ,btn: {
        width:"85%"
        ,height:50
    }
    ,logoTitle: {
        fontSize: 13
        ,marginTop: -10
        ,color:"#4F4F4F"
    }
    ,footerView: {
        flex:.1
        , flexDirection:'row'
        , alignItems:'center'
        , justifyContent:'center'
        , alignSelf: 'stretch'
        , width:"100%"
        , backgroundColor:"rgba(34,34,34,0.5)"
    }
    ,footerViewLeft: {
        flex: 4.5
        , alignItems:'center'
        , justifyContent:'center'
    }
    ,footerViewLeftFont: {
        color:"#ffffff"
        ,fontSize:15
        ,paddingLeft: 20
    }
    ,footerViewCenter: {
        flex: 1
        , alignItems:'center'
        , justifyContent:'center'
    }

    ,footerViewCenterFont: {
        color: "rgba(255,255,255,0.5)"
    }

    ,footerViewRight: {
        flex: 4.5
        , alignItems:'center'
        , justifyContent:'center'
    }
    ,footerViewRightFont: {
        color:"#ffffff"
        ,fontSize:15
        ,paddingRight: 20
    }
});