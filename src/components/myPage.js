import React, { Component } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import surveyList from '../components/surveyList';
import mySurvey from '../components/mySurvey'
import pointHistory from '../components/pointHistory'

export default class myPage extends Component {

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
                <Header style={MypageFormStyle.headerLayout}>
                    <View style={{flex:.1, alignItems: 'center'}}>
                        <Image source={require('../../assets/img/header_icon_alarm.png')} resizeMode={'contain'} style={{width:15, height:15, marginTop:5, marginLeft:10}}/>
                    </View>
                    <View style={{flex:.8, alignItems: 'center'}}>
                        <Text>나의 설문</Text>
                    </View>
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
const MypageFormStyle = StyleSheet.create({
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