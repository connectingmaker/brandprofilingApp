import React, { Component } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text ,ScrollView, ListView, AsyncStorage,Platform,NativeModules} from 'react-native';
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




export default class surveyList extends Component {

    constructor(props){
        super(props);
        this.state = {
            loaded: false
            ,uid : ""
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
        //console.log(this.props);
        this.loadJSONData();
    }



    componentWillUnmount() {
        this.mounted = false;
    }








    componentWillReceiveProps(nextProps)
    {
        //this.setState({loaded:false})
        //this.loadJSONData();
    }




    loadJSONData() {




        AsyncStorage.getItem(config.STORE_KEY).then((value) => {
            var json = eval("("+value+")");
            var uid = json.SESS_UID;
            var lang = json.lang;
            this.setState({languageLocale : lang});
            I18n.locale = lang;
            I18n.fallbacks = true;

            console.log("언어 => " + lang);

            var object = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'text/html'
                }
            }




            fetch(config.SERVER_URL+"/api/campaignList/"+uid+"?lang="+lang, object)
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
                        this.mounted = false;




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

        return (
            <View style={SurveyFormStyle.contentsLayout}>
                <View>
                    <View style={{flex:1, flexDirection: 'row', paddingTop:5, paddingBottom:5}}>
                        <View style={{flex:0.1}}>
                            <Image source={require('../../assets/img/main_icon_logo_on.png')} resizeMode={'contain'} style={{width:20,height:20}}/>
                        </View>
                        <View style={{flex:0.4,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={SurveyFormStyle.boldFont}>{obj.POINT}P</Text>
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
                        <Text style={SurveyFormStyle.boldFont}>{obj.POINT}P</Text>
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


                        {renderIf(this.state.languageLocale == "ko" && obj.JOIN_CNT == 0) (
                            <Text style={{color:'#919191',fontSize:12}}>무제한 ({obj.TOTAL_CNT}명 참여)</Text>
                            )}

                        {renderIf(this.state.languageLocale == "en" && obj.JOIN_CNT == 0) (
                            <Text style={{color:'#919191',fontSize:12}}>{obj.TOTAL_CNT} people participated</Text>
                            )}

                        {renderIf(this.state.languageLocale == "zh" && obj.JOIN_CNT == 0) (
                            <Text style={{color:'#919191',fontSize:12}}>{obj.TOTAL_CNT} 名 参与</Text>
                            )}


                        {renderIf(this.state.languageLocale == "ko" && obj.JOIN_CNT != 0) (
                            <Text style={{color:'#919191',fontSize:12}}>{obj.JOIN_CNT}명 ({obj.TOTAL_CNT}명 참여)</Text>
                        )}

                        {renderIf(this.state.languageLocale == "en" && obj.JOIN_CNT != 0) (
                            <Text style={{color:'#919191',fontSize:12}}>{obj.JOIN_CNT} people ({obj.TOTAL_CNT} people participated)</Text>
                            )}

                        {renderIf(this.state.languageLocale == "zh" && obj.JOIN_CNT != 0) (
                            <Text style={{color:'#919191',fontSize:12}}>{obj.JOIN_CNT} 名  ({obj.TOTAL_CNT} 名 参与)</Text>
                            )}

                    </View>

                </View>




                <View style={SurveyFormStyle.lingBg}></View>
                <View style={{flex:1, flexDirection: 'row', paddingTop:5, paddingBottom:5}}>
                    <View style={{flex:0.70, justifyContent:'center'}}>
                        {renderIf(obj.CAMPAIGN_STARTDATE !="0" && obj.CAMPAIGN_ENDDATE !="0")(
                        <Text style={{fontSize:12}}>{obj.CAMPAIGN_STARTDATE} ~ {obj.CAMPAIGN_ENDDATE}</Text>
                        )}
                    </View>
                    <View style={{flex:0.30}}>
                        <Button bordered full style={{borderColor:"#979797", backgroundColor:"#DA4211", justifyContent: 'center', height:40}} onPress={() => Actions.Survey({campaign_code: obj.CAMPAIGN_CODE, point: obj.POINT, quest_num: obj.QUEST_NUM, uid: obj.UID})}>
                            {renderIf(this.state.languageLocale =="ko")(
                                <Text style={{color:"#ffffff"}}>참여하기</Text>
                            )}
                            {renderIf(this.state.languageLocale =="en")(
                                <Text style={{color:"#ffffff"}}>Join</Text>
                            )}
                            {renderIf(this.state.languageLocale =="zh")(
                                <Text style={{color:"#ffffff"}}>参与</Text>
                            )}

                        </Button>
                    </View>
                </View>
            </View>
        );
    }



    render() {
        if(this.state.loaded == true) {
            return (
                <ListView
                    style={{marginBottom:10}}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => this.renderSurveyView(rowData) }
                />
            );
        } else {
            return (
                <View><Spinner size="small" color="red" /></View>
            );
        }

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