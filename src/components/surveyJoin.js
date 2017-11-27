import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, StyleSheet, TouchableOpacity,AlertIOS,Alert,Platform,WebView,AsyncStorage } from 'react-native';
import { Container, Header, Body, Content, Footer,Item, Icon, Input,Button } from 'native-base';
import config from '../../src/config';

export default class SurveyJoin extends Component {
    constructor(props){
        super(props);

    }

    complateSurvey()
    {
        Actions.pop({ refresh: {stepView: 1}})
    }


    respondToOnMessage = e =>{
        var data = eval("("+e.nativeEvent.data+")");
        if(data.SURVEY_TYPE == "END") {
            switch (data.ERR_CODE) {
                case "000":
                    Alert.alert(
                        '',
                        '설문이 완료되었습니다.',
                        [
                            {text: '확인', onPress: () => Actions.pop({ refresh: {stepView: 2}})},
                        ],
                        {cancelable: false}
                    )


                    break;
                default:
                    Alert.alert(
                        '',
                        '참여이력이 존재합니다.',
                        [
                            {text: '확인', onPress: () => Actions.pop({ refresh: {stepView: 2}})},
                        ],
                        {cancelable: false}
                    )
                    break;
            }
        } else {
            switch (data.ERR_CODE) {
                case "999":
                    Alert.alert(
                        '',
                        '참여이력이 존재합니다.',
                        [
                            {text: '확인', onPress: () => Actions.pop({ refresh: {stepView: 2}})},
                        ],
                        {cancelable: false}
                    )

                    //Actions.Survey({type:"reset"});

                    break;

            }
        }

        
        //console.log(data.ERR_CODE);
    };

    render() {

        return (

            <Container>

                <Header style={noticeFormStyle.headerLayout}>
                    <TouchableOpacity onPress={() => Actions.pop()} style={{flex:.2, alignItems: 'flex-start'}}>
                    <View style={{flex:.2, justifyContent: 'center', alignItems: 'flex-start'}}>
                        <Text style={{fontSize:12,color:'#fff'}}>나가기</Text>
                    </View>
                    </TouchableOpacity>
                    <View style={{flex:.6, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize:16,color:'#fff'}}>설문참여</Text>
                    </View>
                    <View style={{flex:.2, justifyContent: 'center', alignItems: 'flex-end'}}>
                    </View>
                </Header>

                <WebView style={noticeFormStyle.contentsLayout} source={{uri: config.SERVER_URL+'/survey/start?campaign_code='+this.props.campaign_code+'&quest_num='+this.props.quest_num+'&uid='+this.props.uid}} onMessage={this.respondToOnMessage}>

                </WebView>


            </Container>
        );
    }
}



const noticeFormStyle = StyleSheet.create({
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
    }
    ,contentsLayout2: {
        width: "100%"
        ,marginTop:10
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

    ,lingBg: {
        backgroundColor:"rgba(127,127,127,0.3)"
        ,height:1
        ,marginTop:10
        ,marginBottom:10

    }


})
