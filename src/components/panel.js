/**
 * Created by jccho on 2017. 12. 11..
 */
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, StyleSheet, TouchableOpacity,AlertIOS,Alert,Platform,TextInput,AsyncStorage} from 'react-native';
import { Container, Header, Body, Content, Footer,Item, Icon, Input,Button } from 'native-base';
import config from '../../src/config';

import renderIf from 'render-if'


export default class BP extends Component {
    constructor(){
        super();
        this.state = {
            q1: ""
            ,q2: ""
            ,q3: ""
            ,q4: ""
        }


        //AsyncStorage.clear();
    }

    panelCheck()
    {
        if(this.state.q1 == ""){
            Alert.alert(
                '',
                '자기소개 내용을 입력해주세요.',
                [
                    {text: '확인', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            )
            return;
        }

        if(this.state.q2 == ""){
            Alert.alert(
                '',
                '흥미있는 브랜드 카테고리를 입력해주세요.',
                [
                    {text: '확인', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            )
            return;
        }
        if(this.state.q3 == ""){
            Alert.alert(
                '',
                '브랜드 관련 전문을 입력해주세요.',
                [
                    {text: '확인', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            )
            return;
        }
        if(this.state.q4 == ""){
            Alert.alert(
                '',
                '현재 운영 중인 블로그 또는 SNS를 소개해주세요.',
                [
                    {text: '확인', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            )
            return;
        }

        AsyncStorage.getItem(config.STORE_KEY).then((value) => {
            var json = eval("(" + value + ")");
            var uid = json.SESS_UID;
            var object = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'uid' : uid
                    , 'q1': this.state.q1
                    , 'q2': this.state.q2
                    , 'q3': this.state.q3
                    , 'q4': this.state.q4

                })
            };

            fetch(config.SERVER_URL + '/api/panelInsert', object)
                .then((response) => response.json())
                .then((responseJson) => {
                    switch(responseJson.ERR_CODE) {
                        case "000":
                            Alert.alert(
                                '',
                                '정상적으로 신청되었습니다',
                                [
                                    {text: '확인', onPress: () => Actions.pop()},
                                ],
                                { cancelable: false }
                            )
                            break;
                        default:
                            Alert.alert(
                                '',
                                '오류가 발생되었습니다',
                                [
                                    {text: '확인', onPress: () => Actions.pop()},
                                ],
                                { cancelable: false }
                            )
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

    render() {


        return (

            <Container>



                <Header style={PanelFormStyle.headerLayout}>
                    <TouchableOpacity onPress={Actions.pop} style={{flex:.2, alignItems: 'flex-start'}}>
                        <View style={{flex:.2, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize:12,color:'#fff'}}>나가기</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{flex:.6, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize:16,color:'#fff'}}>전문 패널 신청서</Text>
                    </View>
                    <View style={{flex:.2, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => this.panelCheck()} style={{alignSelf: 'stretch', alignItems:'flex-end', justifyContent:'center'}}>
                            <Text style={{fontSize:12,color:'#f2e311',fontWeight: 'bold'}}>신청</Text>
                        </TouchableOpacity>
                    </View>
                </Header>

                <Content style={{padding:10}}>
                    <View style={PanelFormStyle.contentsLayout3}>
                        <View style={{paddingTop:5, paddingBottom:5}}>
                            <Text style={PanelFormStyle.title}>브랜드 프로파일링 앱의 전문 패널이 되시면 기업체가 의뢰하는 패널 전문 리서치에 참여 하실 수 있도록 회원등급이 업그레이드되며 일반 리서치에 비해 포인트가 3배~5배 정도 더 지급됩니다. </Text>
                        </View>
                    </View>
                    <View style={PanelFormStyle.contentsLayout2}>
                        <View style={{paddingTop:5, paddingBottom:5}}>
                            <Text style={PanelFormStyle.title}>1. 간단한 자기소개서를 작성해주세요.(본인의 장점, 전문패널로서의 강점 등) (500자 이내)</Text>
                        </View>
                        <View style={PanelFormStyle.lingBg}></View>
                        <View style={{paddingTop:5, paddingBottom:5}}>
                            <TextInput multiline = {true} numberOfLines = {4}  style={PanelFormStyle.textLayout} editable={true} maxLength={500} onChangeText={(text) => this.setState({q1: text})} keyboardType="default"></TextInput>
                        </View>
                    </View>

                    <View style={PanelFormStyle.contentsLayout2}>
                        <View style={{paddingTop:5, paddingBottom:5}}>
                            <Text style={PanelFormStyle.title}>2. 흥미 있는 브랜드 카테고리가 무엇이며,이유를 작성해주세요.(800자 이내)</Text>
                        </View>
                        <View style={PanelFormStyle.lingBg}></View>
                        <View style={{paddingTop:5, paddingBottom:5}}>
                            <TextInput multiline = {true} numberOfLines = {4} style={PanelFormStyle.textLayout} editable={true} maxLength={800} onChangeText={(text) => this.setState({q2: text})} keyboardType="default"></TextInput>
                        </View>
                    </View>

                    <View style={PanelFormStyle.contentsLayout2}>
                        <View style={{paddingTop:5, paddingBottom:5}}>
                            <Text style={PanelFormStyle.title}>3. 브랜드 관련 전문성(학위,업무 종사 경력 및 경험 등)에 대해 구체적으로 작성해주세요.(1500자 이내)</Text>
                        </View>
                        <View style={PanelFormStyle.lingBg}></View>
                        <View style={{paddingTop:5, paddingBottom:5}}>
                            <TextInput multiline = {true} numberOfLines = {4} style={PanelFormStyle.textLayout} editable={true} maxLength={1500} onChangeText={(text) => this.setState({q3: text})} keyboardType="default"></TextInput>
                        </View>
                    </View>
                    <View style={PanelFormStyle.contentsLayout3}>
                        <View style={{paddingTop:5, paddingBottom:5}}>
                            <Text style={PanelFormStyle.title}>4. 브랜드와 관련하여 운영 중인 블로그 및 SNS가 있다면, 간단히 소개해주세요.(800자 이내)</Text>
                        </View>
                        <View style={PanelFormStyle.lingBg}></View>
                        <View style={{paddingTop:5, paddingBottom:5}}>
                            <TextInput multiline = {true} numberOfLines = {4} style={PanelFormStyle.textLayout} editable={true} maxLength={800} onChangeText={(text) => this.setState({q4: text})} keyboardType="default"></TextInput>
                        </View>
                    </View>


                </Content>


            </Container>
        );
    }
}



const PanelFormStyle = StyleSheet.create({
    headerLayout: {
        justifyContent: 'center', alignItems: 'center', backgroundColor: "#222222"
    }
    ,headerLayout2: {
        justifyContent: 'center', alignItems: 'center', backgroundColor: "#DA4211"

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
    ,contentsLayout2: {
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
    ,contentsLayout3: {
        width: "100%"
        ,marginBottom:20
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
    ,textLayout: {

        fontSize:12
        ,height:100
        ,paddingTop:13
        ,paddingLeft:11
        ,paddingBottom:12
        ,lineHeight:10
        ,borderColor: '#4d4d4d'
        ,borderWidth: 1
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

    ,lingBg: {
        backgroundColor:"rgba(127,127,127,0.3)"
        ,height:1
        ,marginTop:10
        ,marginBottom:10

    }


})
