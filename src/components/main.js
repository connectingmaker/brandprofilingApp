import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, StyleSheet, TouchableOpacity,Easing, BackAndroid, BackHandler, Platform, ToastAndroid, AppState,AsyncStorage,NativeModules} from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Item, Icon, Input, Button, Tab, Tabs, TabHeading,Left,Body,Right,Title} from 'native-base';
import Drawer from 'react-native-drawer'
import config from '../config';

import surveyList from '../components/surveyList';
import mySurvey from '../components/mySurvey'
import pointHistory from '../components/pointHistory'
import myPage from '../components/myPage'
import SideBar from '../components/SideBar';
import contentsView from '../components/contentsView';
import contentsMain from '../components/contentsMain';
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

I18n.fallbacks = true;
I18n.locale = languageLocale;
I18n.translations = {
    en,
    zh,
    ko
};

export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {index: 0, allpush_yn: false, surveypush_yn: false, contentsMain: false, padding:{padding:0}} // default screen index
        this.lastBackButtonPress = null;


    }


    switchScreen(index) {
        if(index == 6) {
            this.setState({index: index, padding:{padding:0}})
        } else {
            this.setState({index: index, padding:{padding:10}})
        }



    }

    componentWillMount()
    {

    }

    componentDidMount() {
        Actions.refresh({key: 'drawer', ref: this.refs.navigationDrawer});

        AsyncStorage.getItem(config.STORE_KEY).then((value) => {
            var json = eval("(" + value + ")");
            var uid = json.SESS_UID;

            if(json.contentMain == true) {
                this.setState({index: 0, contentsMain: true, padding: {padding:10}});
            } else {
                this.setState({index: 5, contentsMain: false, padding: {padding:0}});
            }



        }).then(res => {
            // this.setState({loaded:true, username: "", email: "", sex: "", age: "", brithday: ""})
        });

    }



    closeControlPanel = () => {
        this._drawer.close()
    };
    openControlPanel = () => {
        //this._drawer.root.open()
        this._drawer.open()
    };

    handleBackButton() {

        return true;
    }





    render() {

        var AppComponent = null;
        // if(this.state.contentsMain == false) {
        //     AppComponent = contentsMain;
        // } else {
        //     if (this.state.index == 0) {
        //         AppComponent = surveyList;
        //     } else if(this.state.index == 1) {
        //         AppComponent = mySurvey;
        //     } else if(this.state.index == 2) {
        //         AppComponent = contentsView;
        //     } else if(this.state.index == 3) {
        //         AppComponent = pointHistory;
        //     } else if(this.state.index == 4) {
        //         AppComponent = myPage;
        //     }
        // }

        if (this.state.index == 0) {
            AppComponent = surveyList;
        } else if(this.state.index == 1) {
            AppComponent = mySurvey;
        } else if(this.state.index == 2) {
            AppComponent = contentsView;
        } else if(this.state.index == 3) {
            AppComponent = pointHistory;
        } else if(this.state.index == 4) {
            AppComponent = myPage;
        } else if(this.state.index == 5) {
            AppComponent = contentsMain;
        }






        return (

            <Drawer
                type={'overlay'}
                ref={(ref) => { this._drawer = ref; }}
                content={<SideBar navigator={this._navigator} />}
                close={() => this.closeControlPanel()}
                tapToClose={true}
                openDrawerOffset={0.3} // 20% gap on the right side of drawer
                panCloseMask={0.2}
                styles={drawerStyles}
                closedDrawerOffset={-3}
                tweenHandler={(ratio) => ({
                    main: { opacity:(2-ratio)/2 }
                })}
                side="right"
            >


            <Container style={{marginLeft:-5}}>
                <Header style={MainFormStyle.headerLayout}>
                <Left style={{flex:1}}>
                    <TouchableOpacity onPress={Actions.Notice} style={{width:30, height:50, justifyContent:'center', alignItems:'center'}}>
                        <View>
                            <Image source={require('../../assets/img/header_icon_alarm.png')} resizeMode={'contain'} style={{width:15, height:15}}/>
                        </View>
                    </TouchableOpacity>
                </Left>
                <Body style={{flex:1}}>
                <View style={{alignItems: 'center',justifyContent:'center'}}>
                    <Image source={require('../../assets/img/header_icon_logo.png')} resizeMode={'contain'} style={{width:140, height:30}}/>
                </View>
                </Body>
                <Right style={{flex:1}}>
                    <TouchableOpacity onPress={() => this.openControlPanel()} style={{width:30, height:50, justifyContent:'center', alignItems:'center'}}>
                        <View>
                            <Image source={require('../../assets/img/header_icon_set.png')} resizeMode={'contain'} style={{width:15, height:15}}/>
                        </View>
                    </TouchableOpacity>
                </Right>
            </Header>

                <Content style={this.state.padding}>
                    <AppComponent uid={this.props.uid} />
                </Content>



                <Footer>
                    {renderIf(this.state.index == 0)(
                    <FooterTab style={{backgroundColor:"#fff"}}>
                        <Button onPress={() => this.switchScreen(0) }>
                            <Image source={require('../../assets/img/surveyList_icon_on.png')} resizeMode={'contain'} style={{width:25,height:25}}/><Text style={{color:"#DA4211", fontSize:12, paddingTop:5}}>{I18n.t('tab1')}
                        </Text>
                        </Button>
                        <Button onPress={() => this.switchScreen(1) }>
                            <Image source={require('../../assets/img/mySurvey_icon_off.png')} resizeMode={'contain'} style={{width:25,height:25}}/><Text style={{fontSize:12, paddingTop:5}}>{I18n.t('tab2')}</Text>
                        </Button>
                        <Button onPress={() => this.switchScreen(2) }>
                            <Image source={require('../../assets/img/contents_icon_off.png')} resizeMode={'contain'} style={{width:25,height:25}}/><Text style={{fontSize:12, paddingTop:5}}>{I18n.t('tab3')}</Text>
                        </Button>
                        <Button onPress={() => this.switchScreen(3) }>
                            <Image source={require('../../assets/img/point_icon_off.png')} resizeMode={'contain'} style={{width:25,height:25}}/><Text style={{fontSize:12, paddingTop:5}}>{I18n.t('tab4')}</Text>
                        </Button>
                        <Button onPress={() => this.switchScreen(4) }>
                            <Image source={require('../../assets/img/myPage_icon_off.png')} resizeMode={'contain'} style={{width:25,height:25}}/><Text style={{fontSize:12, paddingTop:5}}>{I18n.t('tab5')}</Text>
                        </Button>

                    </FooterTab>
                    )}
                    {renderIf(this.state.index == 1)(
                        <FooterTab style={{backgroundColor:"#fff"}}>
                            <Button onPress={() => this.switchScreen(0) }>
                                <Image source={require('../../assets/img/surveyList_icon_off.png')} resizeMode={'contain'} style={{width:25,height:25}}/><Text style={{fontSize:12, paddingTop:5}}>{I18n.t('tab1')}</Text>
                            </Button>
                            <Button onPress={() => this.switchScreen(1) }>
                                <Image source={require('../../assets/img/mySurvey_icon_on.png')} resizeMode={'contain'} style={{width:25,height:25}}/><Text style={{color:"#DA4211", fontSize:12, paddingTop:5}}>{I18n.t('tab2')}</Text>
                            </Button>
                            <Button onPress={() => this.switchScreen(2) }>
                                <Image source={require('../../assets/img/contents_icon_off.png')} resizeMode={'contain'} style={{width:25,height:25}}/><Text style={{fontSize:12, paddingTop:5}}>{I18n.t('tab3')}</Text>
                            </Button>
                            <Button onPress={() => this.switchScreen(3) }>
                                <Image source={require('../../assets/img/point_icon_off.png')} resizeMode={'contain'} style={{width:25,height:25}}/><Text style={{fontSize:12, paddingTop:5}}>{I18n.t('tab4')}</Text>
                            </Button>
                            <Button onPress={() => this.switchScreen(4) }>
                                <Image source={require('../../assets/img/myPage_icon_off.png')} resizeMode={'contain'} style={{width:25,height:25}}/><Text style={{fontSize:12, paddingTop:5}}>{I18n.t('tab5')}</Text>
                            </Button>

                        </FooterTab>
                    )}
                    {renderIf(this.state.index == 2)(
                        <FooterTab style={{backgroundColor:"#fff"}}>
                            <Button onPress={() => this.switchScreen(0) }>
                                <Image source={require('../../assets/img/surveyList_icon_off.png')} resizeMode={'contain'} style={{width:25,height:25}}/><Text style={{fontSize:12, paddingTop:5}}>{I18n.t('tab1')}</Text>
                            </Button>
                            <Button onPress={() => this.switchScreen(1) }>
                                <Image source={require('../../assets/img/mySurvey_icon_off.png')} resizeMode={'contain'} style={{width:25,height:25}}/><Text style={{fontSize:12, paddingTop:5}}>{I18n.t('tab2')}</Text>
                            </Button>
                            <Button onPress={() => this.switchScreen(2) }>
                                <Image source={require('../../assets/img/contents_icon_on.png')} resizeMode={'contain'} style={{width:25,height:25}}/><Text style={{color:"#DA4211", fontSize:12, paddingTop:5}}>{I18n.t('tab3')}</Text>
                            </Button>
                            <Button onPress={() => this.switchScreen(3) }>
                                <Image source={require('../../assets/img/point_icon_off.png')} resizeMode={'contain'} style={{width:25,height:25}}/><Text style={{fontSize:12, paddingTop:5}}>{I18n.t('tab4')}</Text>
                            </Button>
                            <Button onPress={() => this.switchScreen(4) }>
                                <Image source={require('../../assets/img/myPage_icon_off.png')} resizeMode={'contain'} style={{width:25,height:25}}/><Text style={{fontSize:12, paddingTop:5}}>{I18n.t('tab5')}</Text>
                            </Button>

                        </FooterTab>
                    )}
                    {renderIf(this.state.index == 3)(
                        <FooterTab style={{backgroundColor:"#fff"}}>
                            <Button onPress={() => this.switchScreen(0) }>
                                <Image source={require('../../assets/img/surveyList_icon_off.png')} resizeMode={'contain'} style={{width:25,height:25}}/><Text style={{fontSize:12, paddingTop:5}}>{I18n.t('tab1')}</Text>
                            </Button>
                            <Button onPress={() => this.switchScreen(1) }>
                                <Image source={require('../../assets/img/mySurvey_icon_off.png')} resizeMode={'contain'} style={{width:25,height:25}}/><Text style={{fontSize:12, paddingTop:5}}>{I18n.t('tab2')}</Text>
                            </Button>
                            <Button onPress={() => this.switchScreen(2) }>
                                <Image source={require('../../assets/img/contents_icon_off.png')} resizeMode={'contain'} style={{width:25,height:25}}/><Text style={{fontSize:12, paddingTop:5}}>{I18n.t('tab3')}</Text>
                            </Button>
                            <Button onPress={() => this.switchScreen(3) }>
                                <Image source={require('../../assets/img/point_icon_on.png')} resizeMode={'contain'} style={{width:25,height:25}}/><Text style={{color:"#DA4211", fontSize:12, paddingTop:5}}>{I18n.t('tab4')}</Text>
                            </Button>
                            <Button onPress={() => this.switchScreen(4) }>
                                <Image source={require('../../assets/img/myPage_icon_off.png')} resizeMode={'contain'} style={{width:25,height:25}}/><Text style={{fontSize:12, paddingTop:5}}>{I18n.t('tab5')}</Text>
                            </Button>

                        </FooterTab>
                    )}
                    {renderIf(this.state.index == 4)(
                        <FooterTab style={{backgroundColor:"#fff"}}>
                            <Button onPress={() => this.switchScreen(0) }>
                                <Image source={require('../../assets/img/surveyList_icon_off.png')} resizeMode={'contain'} style={{width:25,height:25}}/><Text style={{fontSize:12, paddingTop:5}}>{I18n.t('tab1')}</Text>
                            </Button>
                            <Button onPress={() => this.switchScreen(1) }>
                                <Image source={require('../../assets/img/mySurvey_icon_off.png')} resizeMode={'contain'} style={{width:25,height:25}}/><Text style={{fontSize:12, paddingTop:5}}>{I18n.t('tab2')}</Text>
                            </Button>
                            <Button onPress={() => this.switchScreen(2) }>
                                <Image source={require('../../assets/img/contents_icon_off.png')} resizeMode={'contain'} style={{width:25,height:25}}/><Text style={{fontSize:12, paddingTop:5}}>{I18n.t('tab3')}</Text>
                            </Button>
                            <Button onPress={() => this.switchScreen(3) }>
                                <Image source={require('../../assets/img/point_icon_off.png')} resizeMode={'contain'} style={{width:25,height:25}}/><Text style={{fontSize:12, paddingTop:5}}>{I18n.t('tab4')}</Text>
                            </Button>
                            <Button onPress={() => this.switchScreen(4) }>
                                <Image source={require('../../assets/img/myPage_icon_on.png')} resizeMode={'contain'} style={{width:25,height:25}}/><Text  style={{color:"#DA4211", fontSize:12, paddingTop:5}}>{I18n.t('tab5')}</Text>
                            </Button>

                        </FooterTab>
                    )}

                    {renderIf(this.state.index == 5)(
                        <FooterTab style={{backgroundColor:"#fff"}}>
                            <Button onPress={() => this.switchScreen(0) }>
                                <Image source={require('../../assets/img/surveyList_icon_off.png')} resizeMode={'contain'} style={{width:25,height:25}}/><Text style={{fontSize:12, paddingTop:5}}>{I18n.t('tab1')}</Text>
                            </Button>
                            <Button onPress={() => this.switchScreen(1) }>
                                <Image source={require('../../assets/img/mySurvey_icon_off.png')} resizeMode={'contain'} style={{width:25,height:25}}/><Text style={{fontSize:12, paddingTop:5}}>{I18n.t('tab2')}</Text>
                            </Button>
                            <Button onPress={() => this.switchScreen(2) }>
                                <Image source={require('../../assets/img/contents_icon_off.png')} resizeMode={'contain'} style={{width:25,height:25}}/><Text style={{fontSize:12, paddingTop:5}}>{I18n.t('tab3')}</Text>
                            </Button>
                            <Button onPress={() => this.switchScreen(3) }>
                                <Image source={require('../../assets/img/point_icon_off.png')} resizeMode={'contain'} style={{width:25,height:25}}/><Text style={{fontSize:12, paddingTop:5}}>{I18n.t('tab4')}</Text>
                            </Button>
                            <Button onPress={() => this.switchScreen(4) }>
                                <Image source={require('../../assets/img/myPage_icon_off.png')} resizeMode={'contain'} style={{width:25,height:25}}/><Text  style={{fontSize:12, paddingTop:5}}>{I18n.t('tab5')}</Text>
                            </Button>

                        </FooterTab>
                    )}
                </Footer>

                </Container>
            </Drawer>
        );
    }
}

const drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
    main: {paddingLeft: 3},
}
const MainFormStyle = StyleSheet.create({
    headerLayout: {
        justifyContent: 'center', alignItems: 'center', backgroundColor: "#ffffff"
    }
    ,bodyLayout : {
        width: "100%"
    }
    ,bodyPadding: {
        padding:10
    }
    ,bodyNotPadding: {
        padding:10
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
