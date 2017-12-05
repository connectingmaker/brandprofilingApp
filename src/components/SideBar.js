import React from "react";
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, StyleSheet, TouchableOpacity,AppRegistry,StatusBar,AsyncStorage } from 'react-native';
import { Container, Header, Body, Content, List, ListItem,Footer,Item, Icon, Input,Button } from 'native-base';
import Switch from 'react-native-switch-pro'
import config from '../config';
import renderIf from 'render-if'

const routes = ["home", "business", "tech", "profile"];

export default class SideBar extends React.Component {
    constructor(){
        super();
        this.state ={
            allpush:true
            ,surveypush:true
        }



    }

    componentWillMount()
    {
        /*
        AsyncStorage.getItem(config.STORE_KEY).then((value) => {
            var json = eval("("+value+")");
            var all_push_yn = json.SESS_ALL_PUSH_YN;

            var survey_push_yn = json.SESS_SURVEY_PUSH_YN;


            var dataObject = {
                "SESS_UID" : json.SESS_UID
                ,"SESS_USEREMAIL" : json.SESS_USEREMAIL
                , "SESS_ALL_PUSH_YN": this.state.allpush
                , "SESS_SURVEY_PUSH_YN": this.state.surveypush
            };

            this.setState({allpush:true}, () => {
                AsyncStorage.setItem(config.STORE_KEY, JSON.stringify(dataObject), () => {});
            });






        }).then(res => {

        });
        */
    }

    _allPush()
    {
        /*
        if(this.state.allpush == true) {
            this.setState({allpush:false});

        } else {
            this.setState({allpush:true});
        }

        AsyncStorage.getItem(config.STORE_KEY).then((value) => {
            var json = eval("("+value+")");
            var all_push_yn = json.SESS_ALL_PUSH_YN;

            var survey_push_yn = json.SESS_SURVEY_PUSH_YN;





            var dataObject = {
                "SESS_UID" : json.SESS_UID
                ,"SESS_USEREMAIL" : json.SESS_USEREMAIL
                , "SESS_ALL_PUSH_YN": this.state.allpush
                , "SESS_SURVEY_PUSH_YN": this.state.surveypush
            };

            AsyncStorage.setItem(config.STORE_KEY, JSON.stringify(dataObject));


        }).then(res => {

        });
        */
    }

    _surveyPush()
    {
        /*
        if(this.state.surveypush == true) {
            this.setState({surveypush:false});
        } else {
            this.setState({surveypush:true});
        }

        AsyncStorage.getItem(config.STORE_KEY).then((value) => {
            var json = eval("("+value+")");
            var all_push_yn = json.SESS_ALL_PUSH_YN;

            var survey_push_yn = json.SESS_SURVEY_PUSH_YN;





            var dataObject = {
                "SESS_UID" : json.SESS_UID
                ,"SESS_USEREMAIL" : json.SESS_USEREMAIL
                , "SESS_ALL_PUSH_YN": this.state.allpush
                , "SESS_SURVEY_PUSH_YN": this.state.surveypush
            };

            AsyncStorage.setItem(config.STORE_KEY, JSON.stringify(dataObject));


        }).then(res => {

        });
        */
    }

    render() {

        return (

            <Container>
                <Header style={sideBarFormStyle.headerLayout2}>
                    <View style={{flex:.8, justifyContent: 'center', alignItems: 'flex-start'}}>
                        <Text style={{fontSize:16,color:'#fff'}}>어플리케이션 설정 및 소개</Text>
                    </View>
                    <View style={{flex:.1, justifyContent: 'center', alignItems: 'flex-end'}}>
                        <Text style={{fontSize:12,color:'#fff'}} onPress={Actions.pop}></Text>
                    </View>
                </Header>
                <Content style={{backgroundColor:"#fff"}}>
                    <View style={sideBarFormStyle.contentsLayout}>
                        <TouchableOpacity onPress={() => this._allPush()}>
                        <View style={{flex:1, flexDirection: 'row'}}>
                            <View style={{flex:0.7,alignItems:'flex-start',justifyContent:'center'}}>
                                <Text style={sideBarFormStyle.contentsSize}>전체알람</Text>
                            </View>
                            <View style={{flex:0.3,alignItems:'flex-end',paddingTop:5}}>
                                {renderIf(this.state.allpush == true)(
                                <Image source={require('../../assets/img/switch_on.png')} resizeMode={'contain'} style={{width:50,height:35}}/>
                                )}

                                {renderIf(this.state.allpush == false)(
                                    <Image source={require('../../assets/img/switch_off.png')} resizeMode={'contain'} style={{width:50,height:35}}/>
                                )}
                            </View>
                        </View>
                        </TouchableOpacity>
                        <View style={sideBarFormStyle.lingBg}></View>
                        <TouchableOpacity onPress={() => this._surveyPush()}>
                        <View style={{flex:1, flexDirection: 'row'}}>
                            <View style={{flex:0.7,alignItems:'flex-start',justifyContent:'center'}}>
                                <Text style={sideBarFormStyle.contentsSize}>설문 관련 알람</Text>
                            </View>
                            <View style={{flex:0.3,alignItems:'flex-end',paddingTop:5}}>
                                {renderIf(this.state.surveypush == true)(
                                <Image source={require('../../assets/img/switch_on.png')} resizeMode={'contain'} style={{width:50,height:35}}/>
                                )}

                                {renderIf(this.state.surveypush == false)(
                                    <Image source={require('../../assets/img/switch_off.png')} resizeMode={'contain'} style={{width:50,height:35}}/>
                                )}
                            </View>
                        </View>
                        </TouchableOpacity>
                        <View style={sideBarFormStyle.lingBg}></View>


                    </View>

                </Content>

            </Container>
        );
    }
}


const sideBarFormStyle = StyleSheet.create({
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