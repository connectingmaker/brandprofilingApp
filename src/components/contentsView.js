import React, { Component } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text ,ScrollView, AsyncStorage,Alert, Platform, NativeModules, ListView} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Item, Icon, Input, Button ,ActionSheet, Spinner} from 'native-base';
import config from '../config'



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
import renderIf from "render-if";

I18n.fallbacks = true;
I18n.locale = languageLocale;
I18n.translations = {
    en,
    zh,
    ko
};



export default class contentsView extends Component {
    constructor(props){
        super(props);
        this.state = {
            loaded: false
            ,uid : ""
            ,dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        };

    }

    componentWillMount()
    {

    }

    componentDidMount(){
        this.mounted = true;
        //console.log(this.props);
        this.loadJSONData();
    }



    componentWillUnmount() {
        this.mounted = false;
    }


    logout()
    {
        AsyncStorage.clear(() => Actions.root({type:"reset", refresh: true})); // to clear the token

    }

    _contentsViewSub(seq)
    {
        // Actions.contentsViewSub;
    }

    loadJSONData() {
        var object = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'text/html'
            }
        }

        fetch(config.SERVER_URL+"/api/contents", object)
            .then((response) => response.json())
            .then((responseData) =>
            {
                if(this.mounted) {
                    if (responseData.list.length == 0) {
                        this.setState({loaded: true});
                    } else {
                        console.log(responseData);
                        this.setState({
                            loaded: true,
                            dataSource: this.state.dataSource.cloneWithRows(responseData.list)
                        });
                    }
                    this.mounted = false;
                }

            })
            .catch((err) => {
                console.log(err);
            });


    }

    backgroundImgReName(img) {
        console.log(config.SERVER_URL + "/uploads/" + img);
        return config.SERVER_URL + "/uploads/" + img;
    }

    contentsList(obj)
    {
        return (
            <View style={myPageFormStyle.contentsLayout}>
                <View style={{paddingLeft:15,paddingRight:15}}>
                    <View style={{flex:1, flexDirection: 'row', paddingBottom:5}}>
                        <TouchableOpacity  style={{flexDirection: 'row', width:"100%", height:"100%"}}  onPress={() => Actions.ContentsViewSub({seq: obj.SEQ})}>
                            <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center'}}>
                                {renderIf(languageLocale == "ko") (
                                    <View>
                                        <Text style={myPageFormStyle.TitleSize}>{obj.SUBJECT}</Text>

                                        <Text style={myPageFormStyle.contentsSize}>{obj.MAIN_CONTENTS}</Text>
                                    </View>

                                )}


                                {renderIf(languageLocale == "en") (

                                    <View>
                                        <Text style={myPageFormStyle.TitleSize} numberOfLines={1}>{obj.SUBJECT_EN}</Text>

                                        <Text style={myPageFormStyle.contentsSize}>{obj.MAIN_CONTENTS_EN}</Text>
                                    </View>
                                )}

                                {renderIf(languageLocale == "zh") (
                                    <View>
                                        <Text style={myPageFormStyle.TitleSize}>{obj.SUBJECT_CN}</Text>

                                        <Text style={myPageFormStyle.contentsSize}>{obj.MAIN_CONTENTS_CN}</Text>
                                    </View>
                                )}
                            </View>

                            <View style={{flex:0.4,alignItems:'flex-end'}}>
                                <View>
                                    <Image source={{uri:this.backgroundImgReName(obj.FILEIMG)}} style={{width:100, height:100,resizeMode:'contain'}}/>
                                </View>
                                {/*{renderIf(this.state.seq == obj.SEQ)(*/}
                                    {/*<Image source={require("../../assets/img/up_arrow_img.png")} resizeMode={'contain'} style={{width:15, height:15}} />*/}
                                {/*)}*/}

                                {/*{renderIf(this.state.seq != obj.SEQ)(*/}
                                    {/*<Image source={require("../../assets/img/down_arrow_img.png")} resizeMode={'contain'} style={{width:15, height:15}} />*/}
                                {/*)}*/}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );


    }

    render() {
        /*
        return (
        <View style={{marginBottom:10}}>
            <View style={myPageFormStyle.contentsLayout2}>
                <TouchableOpacity>
                    <View style={{flex: 1, flexDirection: 'row', paddingTop: 5, paddingBottom: 5}}>
                        <View style={{flex: 0.7, alignItems: 'flex-start', justifyContent: 'center'}}>
                            <Text style={myPageFormStyle.contentsSize}>컨텐츠 내용</Text>
                        </View>

                        <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>




        </View>
        );
        */
        if(this.state.loaded == true) {
            return (
                <ListView
                    style={{marginBottom:10}}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => this.contentsList(rowData) }
                />
            );
        } else {
            return (
                <View><Spinner size="small" color="red" /></View>
            );
        }

    }
}

const myPageFormStyle = StyleSheet.create({
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
        // ,paddingLeft:20
        // ,paddingRight:20
        ,backgroundColor:"#fff"
        ,shadowColor: "rgba(0,0,0,23)"
        ,shadowOffset: { width: 0, height: 1 }
        ,shadowOpacity: 0.1
        ,borderBottomWidth:1
        ,borderBottomColor:'#f1f1f1'
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
        ,marginTop:10
        ,marginBottom: 10
        ,paddingTop:10
        ,paddingBottom:10
        ,paddingLeft:20
        ,paddingRight:20
        ,backgroundColor:"#fff"
        ,shadowColor: "rgba(0,0,0,23)"
        ,shadowOffset: { width: 0, height: 1 }
        ,shadowOpacity: 0.3
    }

    ,contentsLayout4: {
        width: "100%"
        ,marginBottom: 10
        ,paddingTop:10
        ,paddingBottom:10
        ,paddingLeft:20
        ,paddingRight:20
        ,backgroundColor:"#fff"
        ,shadowColor: "rgba(0,0,0,23)"
        ,shadowOffset: { width: 0, height: 1 }
        ,shadowOpacity: 0.3
    }
    ,TitleSize: {
        fontSize:14
        ,color:'#DA4211'
        ,fontWeight:'bold'
    }
    ,contentsSize: {
        fontSize:11
        ,marginTop:5
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
    ,title: {
        fontSize:15
        ,fontWeight: 'bold'
        ,paddingTop:5
        ,paddingBottom:5
    }
    ,input: {
        fontSize:12
        ,paddingTop:13
        ,paddingLeft:11
        ,paddingBottom:12
        ,height:38
        ,backgroundColor: "#ffffff"
    }
    ,btnStyle: {
        borderWidth:1
        ,borderColor:"#979797"
        ,color:"#000"
    }
})

