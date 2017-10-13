import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Body, Content, Footer,  Item, Icon, Input } from 'native-base';

import layout from '../../assets/style/layout';
import renderIf from 'render-if'


export default class JoinForm extends Component {
    constructor(){
        super();
        this.state ={
            stepView:1

        }
    }

    stepBtn(value){
        switch(value) {
            case 1:
                this.setState({
                    step1View:false
                    ,step2View:true
                });
                break;
        }
        /*
        this.setState({
            step1View:false
            ,step2View:true
        });
        */
    }



    emailCheck()
    {

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
                    {renderIf(this.state.step1View)(
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


                            <View style={{flex:1, flexDirection: 'row'}}>
                                <View style={{flex:0.45}}>

                                </View>

                                <View style={{flex:0.1}}>

                                </View>

                                <View style={{flex:0.45}}>
                                </View>
                            </View>
                        </View>
                    )}

                    {renderIf(this.state.step2View)(
                        <View>
                            <View style={JoinFormStyle.contentsLayout}>
                                <View>
                                    <Text style={JoinFormStyle.contentsSize}><Text style={JoinFormStyle.boldFont}>계정</Text>으로 사용될 이메일 주소를 입력해주세요.</Text>
                                </View>




                            </View>
                            <View style={{padding:20}}>
                                <Item regular style={{backgroundColor:"#ffffff"}}>
                                    <Image source={require('../../assets/img/join_icon_email.png')} resizeMode={'contain'} style={{width:16, height:13, marginTop:5, marginLeft:10}} />
                                    <Input placeholder='이메일' style={JoinFormStyle.input} keyboardType="email-address"/>
                                </Item>
                            </View>
                        </View>
                    )}

                    {renderIf(this.state.step3View)(
                        <View style={JoinFormStyle.contentsLayout}>
                            <View>
                                <Text style={JoinFormStyle.contentsSize}><Text style={JoinFormStyle.boldFont}>khjung@c-maker.co.kr</Text>으로 인증번호가 포함된 이메일이 발송되었습니다. 아래 입력한에 인증번호를 입력해주세요.</Text>
                            </View>

                        </View>
                    )}


                </Content>
                <Footer style={{backgroundColor:"#222222", width:"100%", height:44, justifyContent: 'center', alignItems: 'center'}}>
                    {renderIf(this.state.stepView == 1)(
                    <Text style={{color:"#ffffff"}} onPress={()=>this.stepBtn(1)}>다음</Text>
                    )}

                    {renderIf(this.state.stepView == 2)(
                        <Text style={{color:"#ffffff"}} onPress={()=>this.stepBtn(2)}>다음</Text>
                    )}

                    {renderIf(this.state.stepView == 3)(
                        <Text style={{color:"#ffffff"}} onPress={()=>this.stepBtn(3)}>다음</Text>
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
        ,shadowOffset: { width: 0, height: 2 }
        ,shadowOpacity: 0.5
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
})