import React, { Component } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text ,ScrollView, ListView, AsyncStorage, Platform, NativeModules} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Item, Icon, Input, Button ,ActionSheet, Spinner} from 'native-base';
import config from '../../src/config';

import renderIf from 'render-if'
import I18n from 'react-native-i18n';

var langRegionLocale = "en_US";
if (Platform.OS === "android") {
    langRegionLocale = NativeModules.I18nManager.localeIdentifier || "";
} else if (Platform.OS === "ios") {
    langRegionLocale = NativeModules.SettingsManager.settings.AppleLocale || "";
}

var languageLocale = langRegionLocale.substring(0, 2);

import en from '../lang/en';
import zh from '../lang/zh';
import ko from '../lang/ko';

if(languageLocale != "ko" && languageLocale != "en" && languageLocale != "zh") {
    languageLocale = "en";
}

I18n.fallbacks = true;
I18n.locale = languageLocale;
I18n.translations = {
    en,
    zh,
    ko
};

export default class mySurvey extends Component {

    constructor(props){
        super(props);
        this.state = {
            loaded: false
            ,languageLocale : "ko"
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
        this.loadJSONData();
    }

    componentWillUnmount() {
        this.mounted = false;
    }




    loadJSONData() {

        var object = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'text/html'
            }
        }


        AsyncStorage.getItem(config.STORE_KEY).then((value) => {
            var json = eval("("+value+")");
            var uid = json.SESS_UID;
            var lang = json.lang;
            this.setState({languageLocale :lang});
            I18n.locale = lang;
            I18n.fallbacks = true;

            fetch(config.SERVER_URL+"/api/mycampaignList/"+uid, object)
                .then((response) => response.json())
                .then((responseData) =>
                {
                    console.log(responseData);
                    if(this.mounted) {
                        if(responseData.length == 0) {
                            this.setState({loaded:true});
                        } else {
                            this.setState({loaded:true, dataSource:this.state.dataSource.cloneWithRows(responseData)});
                        }

                    }
                })
                .catch((err) => {
                    console.log(err);
                });


        }).then(res => {

        });
    }

    renderSurveyView(obj)
    {

        const renderResultView = (obj) => {

            if(obj.CATEGORY_NAME_EN == "IMAGE SURVEY") {
                var resultText = "";
                if(this.state.languageLocale == "ko") {
                    resultText = "결과보기";
                } else if(this.state.languageLocale == "en") {
                    resultText = "View results";
                } else {
                    resultText = "查看結果";
                }
                return (
                    <View>
                        <View style={SurveyFormStyle.lingBg}></View>

                        <View style={{flex:1, flexDirection: 'row', paddingTop:5, paddingBottom:5}}>
                            <Button bordered full style={{borderColor:"#979797", backgroundColor:"#DA4211", justifyContent: 'center', height:40, width:'100%'}} onPress={() => Actions.SurveyResult({campaign_code: obj.CAMPAIGN_CODE, lang:this.state.languageLocale})}>
                                <Text style={{color:"#ffffff"}}>{resultText}</Text>
                            </Button>
                        </View>
                    </View>
                );
            } else {
                return (
                    <View><Text>1111</Text></View>
                );
            }
        }


        return (
            <View style={SurveyFormStyle.contentsLayout}>
                <View>
                    <View style={{flex:1, flexDirection: 'row', paddingTop:5, paddingBottom:5}}>
                        <View style={{flex:0.1}}>
                            <Image source={require('../../assets/img/main_icon_logo_off.png')} resizeMode={'contain'} style={{width:20,height:20}}/>
                        </View>
                        <View style={{flex:0.4,alignItems:'flex-start',justifyContent:'center'}}>
                            {renderIf(this.state.languageLocale == "ko") (
                            <Text style={SurveyFormStyle.boldFont}>완료</Text>
                            )}
                            {renderIf(this.state.languageLocale == "en") (
                                <Text style={SurveyFormStyle.boldFont}>Complete</Text>
                            )}
                            {renderIf(this.state.languageLocale == "zh") (
                                <Text style={SurveyFormStyle.boldFont}>已完成</Text>
                            )}
                        </View>
                        <View style={{flex:0.5, alignItems:'flex-end'}}>
                            {renderIf(this.state.languageLocale == "ko") (
                                <Text style={{fontSize:11, alignItems:'flex-end'}}>{obj.CATEGORY_NAME_KO}</Text>
                            )}
                            {renderIf(this.state.languageLocale == "en") (
                                <Text style={{fontSize:11, alignItems:'flex-end'}}>{obj.CATEGORY_NAME_EN}</Text>
                            )}
                            {renderIf(this.state.languageLocale == "zh") (
                                <Text style={{fontSize:11, alignItems:'flex-end'}}>{obj.CATEGORY_NAME_CN}</Text>
                            )}
                        </View>
                    </View>
                    <View>
                        {renderIf(this.state.languageLocale == "ko") (
                        <Text style={SurveyFormStyle.title}>{obj.CAMPAIGN_TITLE}</Text>
                        )}

                        {renderIf(this.state.languageLocale == "en") (
                            <Text style={SurveyFormStyle.title}>{obj.CAMPAIGN_TITLE_EN}</Text>
                        )}

                        {renderIf(this.state.languageLocale == "zh") (
                            <Text style={SurveyFormStyle.title}>{obj.CAMPAIGN_TITLE_CN}</Text>
                        )}
                    </View>
                    <View style={SurveyFormStyle.lingBg}>
                    </View>

                    <View>
                        {renderIf(this.state.languageLocale == "ko") (
                        <Text>{obj.CAMPAIGN_DESC}</Text>
                        )}

                        {renderIf(this.state.languageLocale == "en") (
                            <Text>{obj.CAMPAIGN_DESC_EN}</Text>
                        )}

                        {renderIf(this.state.languageLocale == "zh") (
                            <Text>{obj.CAMPAIGN_DESC_CN}</Text>
                        )}
                    </View>
                </View>


                <View style={{flexDirection: 'row', width:"100%", paddingTop:10}}>
                    <View style={{backgroundColor: '#f6f6f6', flex: 0.3,padding:5,borderWidth:1,justifyContent:'center',borderColor:"#d0d0d0",borderBottomColor:"#f6f6f6",borderRightColor:"#f6f6f6"}} >
                        {renderIf(this.state.languageLocale == "ko") (
                        <Text style={{color:'#919191',fontSize:12, textAlign:"center"}}>포인트적립</Text>
                        )}
                        {renderIf(this.state.languageLocale == "en") (
                            <Text style={{color:'#919191',fontSize:12, textAlign:"center"}}>Earn points</Text>
                        )}

                        {renderIf(this.state.languageLocale == "zh") (
                            <Text style={{color:'#919191',fontSize:12, textAlign:"center"}}>可获积分</Text>
                        )}
                    </View>
                    <View style={{borderColor: '#d0d0d0', flex: 0.7,justifyContent:'center',padding:5,borderWidth:1,borderBottomColor:"#f6f6f6"}}>
                        <Text>{obj.POINT}P</Text>
                    </View>

                </View>

                <View style={{flexDirection: 'row', width:"100%"}}>
                    <View style={{backgroundColor: '#f6f6f6', flex: 0.3,padding:5,borderWidth:1,justifyContent:'center',borderColor:"#d0d0d0",borderBottomColor:"#f6f6f6",borderRightColor:"#f6f6f6"}} >
                        {renderIf(this.state.languageLocale == "ko") (
                        <Text style={{color:'#919191',fontSize:12, textAlign:"center"}}>응답시간</Text>
                        )}

                        {renderIf(this.state.languageLocale == "en") (
                            <Text style={{color:'#919191',fontSize:12, textAlign:"center"}}>Response time</Text>
                        )}

                        {renderIf(this.state.languageLocale == "zh") (
                            <Text style={{color:'#919191',fontSize:12, textAlign:"center"}}>所需时间</Text>
                        )}
                    </View>
                    <View style={{borderColor: '#d0d0d0', flex: 0.7,padding:5,borderWidth:1,borderBottomColor:"#f6f6f6"}}>
                        {renderIf(this.state.languageLocale == "ko") (
                        <Text style={{color:'#919191',fontSize:13}}>{obj.SURVEY_TIME}분</Text>
                        )}

                        {renderIf(this.state.languageLocale == "en") (
                            <Text style={{color:'#919191',fontSize:13}}>{obj.SURVEY_TIME}min</Text>
                        )}

                        {renderIf(this.state.languageLocale == "zh") (
                            <Text style={{color:'#919191',fontSize:13}}>{obj.SURVEY_TIME}分钟</Text>
                        )}
                    </View>

                </View>
                <View style={{flexDirection: 'row', width:"100%"}}>
                    <View style={{backgroundColor: '#f6f6f6', flex: 0.3,padding:5,borderWidth:1,justifyContent:'center',borderColor:"#d0d0d0",borderBottomColor:"#d0d0d0",borderRightColor:"#f6f6f6"}} >
                        {renderIf(this.state.languageLocale == "ko") (
                        <Text style={{color:'#919191',fontSize:12, textAlign:"center"}}>모집인원</Text>
                        )}

                        {renderIf(this.state.languageLocale == "en") (
                            <Text style={{color:'#919191',fontSize:12, textAlign:"center"}}>Recruitment number</Text>
                        )}

                        {renderIf(this.state.languageLocale == "zh") (
                            <Text style={{color:'#919191',fontSize:12, textAlign:"center"}}>招募人数</Text>
                        )}
                    </View>
                    <View style={{borderColor: '#d0d0d0', flex: 0.7,padding:5,borderWidth:1,borderBottomColor:"#d0d0d0"}}>
                        {renderIf(this.state.languageLocale == "ko") (
                        <Text style={{color:'#919191',fontSize:12}}>{obj.JOIN_CNT}명 ({obj.TOTAL_CNT}명 참여)</Text>
                        )}

                        {renderIf(this.state.languageLocale == "en") (
                            <Text style={{color:'#919191',fontSize:10}}>{obj.JOIN_CNT} people ({obj.TOTAL_CNT} people participated)</Text>
                        )}

                        {renderIf(this.state.languageLocale == "zh") (
                            <Text style={{color:'#919191',fontSize:12}}>{obj.JOIN_CNT} 名  ({obj.TOTAL_CNT} 名 参与)</Text>
                        )}
                    </View>

                </View>




                <View style={SurveyFormStyle.lingBg}></View>
                <View style={{flex:1, flexDirection: 'row', paddingTop:5, paddingBottom:5}}>
                    <View style={{flex:0.60, justifyContent:'center'}}>
                        {renderIf(obj.CAMPAIGN_STARTDATE !="1970-01-01" && obj.CAMPAIGN_ENDDATE !="1970-01-01")(
                        <Text style={{fontSize:12}}>{obj.CAMPAIGN_STARTDATE} ~ {obj.CAMPAIGN_STARTDATE}</Text>
                        )}
                    </View>
                    <View style={{flex:0.40}}>
                        {renderIf(this.state.languageLocale == "ko")(
                            <Text style={SurveyFormStyle.boldFont2}>{obj.POINT}P 획득</Text>
                        )}
                        {renderIf(this.state.languageLocale == "en")(
                            <Text style={SurveyFormStyle.boldFont2}>{obj.POINT}P <Text style={{fontSize:10}}>acquisition</Text></Text>
                        )}
                        {renderIf(this.state.languageLocale == "zh")(
                            <Text style={SurveyFormStyle.boldFont2}>获得 {obj.POINT}P 积分</Text>
                        )}

                    </View>
                </View>

                {renderResultView(obj)}
            </View>
        );
    }



    render() {
        if(this.state.loaded == true) {
            return (
                <ListView
                    dataSource={this.state.dataSource}
                    style={{marginBottom:10}}
                    renderRow={(rowData) => this.renderSurveyView(rowData) }
                />
            );
        } else {
            return (
                <View><Spinner size="small" color="red" /></View>
            );
        }
        /*
         return (
         <ScrollView>

         <View style={SurveyFormStyle.contentsLayout}>
         <View style={{flex:1, flexDirection: 'row', paddingTop:5, paddingBottom:5}}>
         <View style={{flex:0.1}}>
         <Image source={require('../../assets/img/main_icon_logo_on.png')} resizeMode={'contain'} style={{width:30,height:30}}/>
         </View>
         <View style={{flex:0.4,alignItems:'flex-start',justifyContent:'center'}}>
         <Text style={SurveyFormStyle.boldFont}>200P</Text>
         </View>
         <View style={{flex:0.4}}></View>
         <View style={{flex:0.1}}>
         <Text>기본</Text>
         </View>
         </View>
         <View>
         <Text style={SurveyFormStyle.title}>설문 참여를 위한 사전 조사</Text>
         </View>
         <View style={SurveyFormStyle.lingBg}>
         </View>

         <View>
         <Text style={SurveyFormStyle.contentsSize}>사전조사를 통해 입력하는 추가정보에 따라 참여할 수 있는 설문이 달라지며 잘못된 정보 입력으로 인해 설문보상 패널티를 받지 않게 주의하여 입력해주세요. 완료 이후 추가정보는 <Text style={SurveyFormStyle.boldFont}>수정 불가능</Text>하며, 통계를 분석하는 용도로 활용됩니다.</Text>
         </View>
         <View style={{flexDirection: 'row', paddingLeft: 20,paddingTop:10}}>

         <View style={{backgroundColor: '#f6f6f6', flex: 0.3,padding:10,borderWidth:1,borderColor:"#d0d0d0",borderBottomColor:"#f6f6f6",borderRightColor:"#f6f6f6"}} >
         <Text style={{color:'#919191',fontSize:13}}>포인트적립</Text>
         </View>
         <View style={{borderColor: '#d0d0d0', flex: 0.5,padding:10,borderWidth:1,borderColor:"#d0d0d0",borderBottomColor:"#f6f6f6"}}>
         <Text style={SurveyFormStyle.boldFont}>200P</Text>
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

         <View style={SurveyFormStyle.lingBg}></View>
         <Button bordered full style={{borderColor:"#979797", backgroundColor:"#DA4211", justifyContent: 'center', paddingLeft:10}}>
         <Text style={{color:"#ffffff"}} onPress={Actions.PreSurvey}>참여하기</Text>
         </Button>
         </View>

         <View style={SurveyFormStyle.contentsLayout}>
         <View style={{flex:1, flexDirection: 'row', paddingTop:10, paddingBottom:5}}>
         <View style={{flex:0.1}}>
         <Image source={require('../../assets/img/main_icon_logo_on.png')} resizeMode={'contain'} style={{width:30,height:30}}/>
         </View>
         <View style={{flex:0.4,alignItems:'flex-start',justifyContent:'center'}}>
         <Text style={SurveyFormStyle.boldFont}>500P 추가 획득 가능</Text>
         </View>
         <View style={{flex:0.4}}></View>
         <View style={{flex:0.1}}>
         <Text>맥주</Text>
         </View>
         </View>
         <View>
         <Text style={SurveyFormStyle.title}>2017 맥주 브랜드에 대한 이미지 조사</Text>
         </View>
         <View style={SurveyFormStyle.lingBg}>
         </View>
         <View>
         <Text style={SurveyFormStyle.contentsSize}>본 설문조사는 회원님의 소중한 의견을 듣고자 진행하는 일반적인 설문조사입니다.</Text>
         </View>
         <View style={{flexDirection: 'row', paddingLeft: 20,paddingTop:10}}>

         <View style={{backgroundColor: '#f6f6f6', flex: 0.3,padding:10,borderWidth:1,borderColor:"#d0d0d0",borderBottomColor:"#f6f6f6",borderRightColor:"#f6f6f6"}} >
         <Text style={{color:'#919191',fontSize:13}}>포인트적립</Text>
         </View>
         <View style={{borderColor: '#d0d0d0', flex: 0.5,padding:10,borderWidth:1,borderColor:"#d0d0d0",borderBottomColor:"#f6f6f6"}}>
         <Text style={SurveyFormStyle.boldFont}>10~800P</Text>
         </View>
         </View>
         <View style={{flexDirection: 'row',paddingLeft:20}}>
         <View style={{backgroundColor: '#f6f6f6', flex: 0.3,padding:10,borderWidth:1,borderColor:"#d0d0d0",borderRightColor:"#f6f6f6",borderBottomColor:"#f6f6f6"}} >
         <Text style={{color:'#919191',fontSize:13}}>응답시간</Text>
         </View>
         <View style={{borderColor: '#d0d0d0', flex: 0.5,padding:10,borderWidth:1,borderColor:"#d0d0d0",borderBottomColor:"#f6f6f6"}}>
         <Text style={{color:'#919191',fontSize:13}}>10분</Text>
         </View>
         </View>
         <View style={{flexDirection: 'row',paddingLeft:20,paddingBottom:10}}>
         <View style={{backgroundColor: '#f6f6f6', flex: 0.3,padding:10,borderWidth:1,borderColor:"#d0d0d0",borderRightColor:"#f6f6f6"}} >
         <Text style={{color:'#919191',fontSize:13}}>모집인원</Text>
         </View>
         <View style={{borderColor: '#d0d0d0', flex: 0.5,padding:10,borderWidth:1,borderColor:"#d0d0d0"}}>
         <Text style={{color:'#919191',fontSize:13}}>5000명 (1238명 참여)</Text>
         </View>
         </View>
         <View style={SurveyFormStyle.lingBg}></View>
         <View style={{flex:1, flexDirection: 'row', paddingTop:5, paddingBottom:5}}>
         <View style={{flex:0.65}}>
         <Text>2017.10.21 ~ 완료시까지</Text>
         </View>
         <View style={{flex:0.35}}>
         <Button bordered full style={{borderColor:"#979797", backgroundColor:"#DA4211", justifyContent: 'center', paddingLeft:10}}>
         <Text style={{color:"#ffffff"}} onPress={Actions.Survey}>참여하기</Text>
         </Button>
         </View>
         </View>

         </View>

         </ScrollView>
         );
         */
    };
}

const SurveyFormStyle = StyleSheet.create({
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
        ,marginBottom:10
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
        color:"#7f7f7f"
        ,fontWeight: 'bold'
        ,fontSize:18
    }

    ,boldFont2: {
        color:"#da4211"
        ,fontWeight: 'bold'
        ,fontSize:13
        ,textAlign: 'right'
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