import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, StyleSheet, TouchableOpacity,AlertIOS,Alert,Platform,ListView,NativeModules} from 'react-native';
import { Container, Header, Left,Body,Right, Content, Footer,Item, Icon, Input,Button } from 'native-base';

import config from '../config';
import renderIf from 'render-if'

import I18n from 'react-native-i18n';
var langRegionLocale = "en_US";
if (Platform.OS === "android") {
    langRegionLocale = NativeModules.I18nManager.localeIdentifier || "";
} else if (Platform.OS === "ios") {
    langRegionLocale = NativeModules.SettingsManager.settings.AppleLocale || "";
}

var languageLocale = langRegionLocale.substring(0, 2);
if(languageLocale != "ko" && languageLocale != "en" && languageLocale != "zh") {
    languageLocale = "en";
}

import en from '../lang/en';
import zh from '../lang/zh';
import ko from '../lang/ko';

I18n.fallbacks = true;
I18n.locale = languageLocale;
I18n.translations = {
    en,
    zh,
    ko
};

export default class Notice extends Component {

    constructor(){
        super();
        this.state = {
            loaded: false
            ,seq:""
            ,dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        }

        this.loadJSONData();
    }

    componentDidMount(){
        this.mounted = true;
        //console.log(this.props);
        this.loadJSONData();
    }



    componentWillUnmount() {
        this.mounted = false;
    }

    _noticeView(seq)
    {
        this.setState({
            seq: seq
        });
        console.log(seq);
    }

    loadJSONData() {

        var object = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'text/html'
            }
        }


            fetch(config.SERVER_URL+"/api/notice", object)
                .then((response) => response.json())
                .then((responseData) =>
                {
                    console.log(responseData.list);

                    if(this.mounted) {
                        if(responseData.list.length == 0) {
                            this.setState({loaded:true});
                        } else {
                            this.setState({loaded:true, dataSource:this.state.dataSource.cloneWithRows(responseData.list)});
                        }
                        this.mounted = false;
                    }


                })
                .catch((err) => {
                    console.log(err);
                });


    }

    _noticeList(obj) {
        return (
        <View style={noticeFormStyle.contentsLayout}>
            <View>
                <View style={{flex:1, flexDirection: 'row', paddingTop:10, paddingBottom:5}}>
                    <TouchableOpacity style={{flexDirection: 'row', width:"100%", height:"100%"}} onPress={() => this._noticeView(obj.SEQ)}>
                        <View style={{flex:0.8,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={{color:'#4D4D4D',fontSize:15,fontWeight: 'bold'}}>{obj.SUBJECT}</Text>
                        </View>

                        <View style={{flex:0.2,alignItems:'flex-end'}}>
                            {renderIf(this.state.seq == obj.SEQ)(
                            <Image source={require("../../assets/img/up_arrow_img.png")} resizeMode={'contain'} style={{width:18, height:18}} />
                            )}

                            {renderIf(this.state.seq != obj.SEQ)(
                                <Image source={require("../../assets/img/down_arrow_img.png")} resizeMode={'contain'} style={{width:18, height:18}} />
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
                {renderIf(this.state.seq == obj.SEQ)(
                <View style={noticeFormStyle.lingBg}></View>
                )}

                {renderIf(this.state.seq == obj.SEQ)(
                <View style={{paddingTop:20,paddingBottom:20}}>
                    <Text style={{fontSize:13, color:"rgb(79,79,79)"}}>{obj.CONTENTS}</Text>
                </View>
                )}
            </View>
        </View>
        );
    }

    render() {


        return (

            <Container>



                <Header style={noticeFormStyle.headerLayout}>

                <Left style={{flex:1}}>
                    <TouchableOpacity onPress={Actions.pop} style={{width:50, height:50, justifyContent:'center', alignItems:'center'}}>
                        {renderIf(languageLocale=="ko")(
                            <Text style={{fontSize:12,color:'#fff'}} onPress={Actions.pop}>나가기</Text>
                        )}
                        {renderIf(languageLocale=="en")(
                            <Text style={{fontSize:12,color:'#fff'}} onPress={Actions.pop}>Leave</Text>
                        )}
                        {renderIf(languageLocale=="zh")(
                            <Text style={{fontSize:12,color:'#fff'}} onPress={Actions.pop}>退出</Text>
                        )}
                    </TouchableOpacity>
                </Left>
                <Body style={{flex:1}}>
                    {renderIf(languageLocale=="ko")(
                        <Text style={{fontSize:16,color:'#fff'}}>공지사항</Text>
                    )}
                    {renderIf(languageLocale=="en")(
                        <Text style={{fontSize:16,color:'#fff'}}>NOTICE</Text>
                    )}
                    {renderIf(languageLocale=="zh")(
                        <Text style={{fontSize:16,color:'#fff'}}>注意</Text>
                    )}

                </Body>
                <Right tyle={{flex:1, width:50, height:50, justifyContent:'center', alignItems:'center'}}>
                </Right>
                </Header>




                <Content style={{padding:10}}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) => this._noticeList(rowData) }
                    />


                </Content>


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
        ,paddingTop:10
        ,paddingBottom:10
        ,paddingLeft:20
        ,paddingRight:20
        ,backgroundColor:"#fff"
        ,shadowColor: "rgba(0,0,0,23)"
        ,shadowOffset: { width: 0, height: 1 }
        ,shadowOpacity: 0.1
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
