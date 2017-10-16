import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Item, Icon, Input, Button, Tab, Tabs, TabHeading } from 'native-base';
import surveyList from '../components/surveyList';
import mySurvey from '../components/mySurvey'
import pointHistory from '../components/pointHistory'




export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {index: 0} // default screen index
    }

    switchScreen(index) {
        this.setState({index: index})
    }


    render() {
        var AppComponent = null;
        if (this.state.index == 0) {
            AppComponent = surveyList;
        } else if(this.state.index == 1) {
            AppComponent = mySurvey;
        } else if(this.state.index == 3) {
            AppComponent = pointHistory;
        }
        return (
            <Container>
                <Header style={preSurveyFormStyle.headerLayout}>
                    <View style={{flex:.1, alignItems: 'center'}}>
                        <Image source={require('../../assets/img/header_icon_alarm.png')} resizeMode={'contain'} style={{width:15, height:15, marginTop:5, marginLeft:10}}/>
                    </View>
                    <View style={{flex:.8, alignItems: 'center'}}>
                        <Image source={require('../../assets/img/header_icon_logo.png')} resizeMode={'contain'} style={{width:140, height:30, marginTop:5, marginLeft:10}}/>
                    </View>
                    <View style={{flex:.1, alignItems: 'center'}}>
                        <Image source={require('../../assets/img/header_icon_set.png')} resizeMode={'contain'} style={{width:15, height:15, marginTop:5, marginLeft:10}}/>
                    </View>
                </Header>
                <Content>
                    <AppComponent />
                </Content>
                <Footer>
                    <FooterTab>
                        <Button onPress={() => this.switchScreen(0) }>
                            <Text>설문목록</Text>
                        </Button>
                        <Button onPress={() => this.switchScreen(1) }>
                            <Text>나의설문</Text>
                        </Button>
                        <Button onPress={() => this.switchScreen(2) }>
                            <Text>소개</Text>
                        </Button>
                        <Button onPress={() => this.switchScreen(3) }>
                            <Text>포인트</Text>
                        </Button>
                        <Button onPress={() => this.switchScreen(4) }>
                            <Text>마이페이지</Text>
                        </Button>
                    </FooterTab>
                </Footer>

            </Container>
        );
        /*
        return (
            <Container>
                <Header style={preSurveyFormStyle.headerLayout}>
                    <View style={{flex:.1, alignItems: 'center'}}>
                        <Image source={require('../../assets/img/header_icon_alarm.png')} resizeMode={'contain'} style={{width:15, height:15, marginTop:5, marginLeft:10}}/>
                    </View>
                    <View style={{flex:.8, alignItems: 'center'}}>
                        <Image source={require('../../assets/img/header_icon_logo.png')} resizeMode={'contain'} style={{width:140, height:30, marginTop:5, marginLeft:10}}/>
                    </View>
                    <View style={{flex:.1, alignItems: 'center'}}>
                        <Image source={require('../../assets/img/header_icon_set.png')} resizeMode={'contain'} style={{width:15, height:15, marginTop:5, marginLeft:10}}/>
                    </View>
                </Header>
                <Content style={{padding:10}}>
                    <View>
                        <View style={preSurveyFormStyle.contentsLayout}>
                            <View style={{flex:1, flexDirection: 'row', paddingTop:5, paddingBottom:5}}>
                                <View style={{flex:0.25}}>
                                    <Image source={require('../../assets/img/main_icon_logo_on.png')} resizeMode={'contain'} style={{width:30,height:30, marginTop:5}}/><Text style={preSurveyFormStyle.boldFont}>200P</Text>
                                </View>
                                <View style={{flex:0.65}}>
                                    <Text style={preSurveyFormStyle.title}>설문 참여를 위한 사전 조사</Text>
                                </View>
                                <View style={{flex:0.1}}>
                                    <Text>기본</Text>
                                </View>
                            </View>
                            <View style={preSurveyFormStyle.lingBg}>
                            </View>

                            <View>
                                <Text style={preSurveyFormStyle.contentsSize}>사전조사를 통해 입력하는 추가정보에 따라 참여할 수 있는 설문이 달라지며 잘못된 정보 입력으로 인해 설문보상 패널티를 받지 않게 주의하여 입력해주세요. 완료 이후 추가정보는 <Text style={preSurveyFormStyle.boldFont}>수정 불가능</Text>하며, 통계를 분석하는 용도로 활용됩니다.</Text>
                            </View>
                            <View style={{flexDirection: 'row', paddingLeft: 20,paddingTop:10}}>

                                <View style={{backgroundColor: '#f6f6f6', flex: 0.3,padding:10,borderWidth:1,borderColor:"#d0d0d0",borderBottomColor:"#f6f6f6",borderRightColor:"#f6f6f6"}} >
                                    <Text style={{color:'#919191',fontSize:13}}>포인트적립</Text>
                                </View>
                                <View style={{borderColor: '#d0d0d0', flex: 0.5,padding:10,borderWidth:1,borderColor:"#d0d0d0",borderBottomColor:"#f6f6f6"}}>
                                    <Text style={preSurveyFormStyle.boldFont}>200P</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row',paddingLeft:20,paddingBottom:10}}>
                                <View style={{backgroundColor: '#f6f6f6', flex: 0.3,padding:10,borderWidth:1,borderColor:"#d0d0d0",borderRightColor:"#f6f6f6"}} >
                                    <Text style={{color:'#919191',fontSize:13}}>응답시간</Text>
                                </View>
                                <View style={{borderColor: '#d0d0d0', flex: 0.5,padding:10,borderWidth:1,borderColor:"#d0d0d0"}}>
                                    <Text style={{color:'#919191',fontSize:13}}>2분</Text>
                                </View>
                            </View>

                            <View style={preSurveyFormStyle.lingBg}></View>
                            <Button bordered full style={{borderColor:"#979797", backgroundColor:"#DA4211", justifyContent: 'center', paddingLeft:10}}>
                                <Text style={{marginLeft:10, color:"#ffffff"}}>참여하기</Text>
                            </Button>



                        </View>

                    </View>
                </Content>

            </Container>

        );
        */
    }
}

const preSurveyFormStyle = StyleSheet.create({
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
    ,title: {
        fontSize:15
        ,fontWeight: 'bold'
        ,paddingTop:5
        ,paddingBottom:5
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
