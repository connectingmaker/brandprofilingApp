import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Item, Icon, Input, Button, Tab, Tabs, TabHeading } from 'native-base';
import surveyList from '../components/surveyList';
import mySurvey from '../components/mySurvey'
import pointHistory from '../components/pointHistory'
import myPage from '../components/myPage'
import renderIf from 'render-if'



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
        } else if(this.state.index == 4) {
            AppComponent = myPage;
        }
        return (
            <Container>
                <Header style={MainFormStyle.headerLayout}>
                    <View style={{flex:.1, alignItems: 'center'}}>
                        <Image source={require('../../assets/img/header_icon_alarm.png')} resizeMode={'contain'} style={{width:15, height:15, marginTop:5, marginLeft:10}}/>
                    </View>
                    {renderIf(this.state.index == 0)(
                    <View style={{flex:.8, alignItems: 'center'}}>
                        <Image source={require('../../assets/img/header_icon_logo.png')} resizeMode={'contain'} style={{width:140, height:30, marginTop:5, marginLeft:10}}/>
                    </View>
                    )}
                    {renderIf(this.state.index == 1)(
                        <View style={{flex:.8, alignItems: 'center'}}>
                            <Text style={{fontSize:16}}>나의설문</Text>
                        </View>
                    )}
                    {renderIf(this.state.index == 3)(
                        <View style={{flex:.8, alignItems: 'center'}}>
                            <Text style={{fontSize:16}}>포인트</Text>
                        </View>
                    )}
                    {renderIf(this.state.index == 4)(
                        <View style={{flex:.8, alignItems: 'center'}}>
                            <Text style={{fontSize:16}}>마이페이지</Text>
                        </View>
                    )}
                    <View style={{flex:.1, alignItems: 'center'}}>
                        <Image source={require('../../assets/img/header_icon_set.png')} resizeMode={'contain'} style={{width:15, height:15, marginTop:5, marginLeft:10}}/>
                    </View>
                </Header>
                <Content style={{padding:10}}>
                    <AppComponent />



                </Content>
                <Footer>
                    <FooterTab>
                        <Button onPress={() => this.switchScreen(0) }>
                            <Image source={require('../../assets/img/surveyList_icon_on.png')} resizeMode={'contain'} style={{width:30,height:30, marginTop:5}}/><Text style={{color:"#DA4211"}}>설문목록</Text>
                        </Button>
                        <Button onPress={() => this.switchScreen(1) }>
                            <Image source={require('../../assets/img/mySurvey_icon_off.png')} resizeMode={'contain'} style={{width:30,height:30, marginTop:5}}/><Text>나의설문</Text>
                        </Button>
                        <Button onPress={() => this.switchScreen(3) }>
                            <Image source={require('../../assets/img/point_icon_off.png')} resizeMode={'contain'} style={{width:30,height:30, marginTop:5}}/><Text>포인트</Text>
                        </Button>
                        <Button onPress={() => this.switchScreen(4) }>
                            <Image source={require('../../assets/img/myPage_icon_off.png')} resizeMode={'contain'} style={{width:30,height:30, marginTop:5}}/><Text>마이페이지</Text>
                        </Button>
                    </FooterTab>
                </Footer>

            </Container>
        );
    }
}

const MainFormStyle = StyleSheet.create({
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
