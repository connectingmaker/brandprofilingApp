import React from 'react';
import { Actions } from 'react-native-router-flux';
import { StyleSheet,View,Text,Image,Dimensions, Platform, NativeModules} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

import renderIf from 'render-if'
import I18n from 'react-native-i18n';

var langRegionLocale = "en_US";
if (Platform.OS === "android") {
    langRegionLocale = NativeModules.I18nManager.localeIdentifier || "";
} else if (Platform.OS === "ios") {
    langRegionLocale = NativeModules.SettingsManager.settings.AppleLocale || "";
}

var languageLocale = langRegionLocale.substring(0, 2);
languageLocale = "zh";

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

var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor:'white'
    },
    image:{
        width:width/1.2,
        height:height/2.5,
        justifyContent:'center',
        alignItems: 'center',
        marginBottom:16,
    },
    text: {
        fontSize: 12,
        color: 'rgba(40, 40, 40, 0.8)',
        backgroundColor: 'transparent',
        textAlign:'left',
        paddingHorizontal: 16,
        lineHeight:24,
        letterSpacing:-1.2
    },
    title: {
        fontSize: 18,
        color: 'rgba(0, 0, 0, 0.8)',
        backgroundColor: 'transparent',
        textAlign: 'center',
        lineHeight:24,
        letterSpacing:-1.2,
        marginBottom: 16,
    }
});


const slides = [

    {
        key: 'intro01',
        title: I18n.t("intro01_title"),
        text: I18n.t("intro01_text"),
        image: require('../../assets/img/intro01.png'),
        imageStyle: styles.image,
    },
    {
        key: 'intro02',
        title: I18n.t("intro02_title"),
        text: I18n.t("intro02_text"),
        image: require('../../assets/img/intro02.png'),
        imageStyle: styles.image,
    },
    {
        key: 'intro03',
        title: I18n.t("intro03_title"),
        text: I18n.t("intro03_text"),
        image: require('../../assets/img/intro03.png'),
        imageStyle: styles.image,
    },
    {
        key: 'intro04',
        title: I18n.t("intro04_title"),
        text: I18n.t("intro04_text"),
        image: require('../../assets/img/intro04.png'),
        imageStyle: styles.image,
    },
    {
        key: 'intro05',
        title: I18n.t("intro05_title"),
        text: I18n.t("intro05_text"),
        image: require('../../assets/img/intro05.png'),
        imageStyle: styles.image,
    }

];


export default class Intro extends React.Component {
    _onDone = () => {
        Actions.Login();
    }
    _onSkip = () =>{
        Actions.Login();
    }
    _renderItem = props => (
        <View style={[styles.mainContent, {
            paddingTop: props.topSpacer,
            paddingBottom: props.bottomSpacer,
            width: props.width,
            height: props.height,
        }]}>

            <View style={{justifyContent:'center',alignItems:'center'}}>
                <Image source={props.image} style={styles.image} resizeMode={'contain'}></Image>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.text}>{props.text}</Text>
            </View>

        </View>
    );
    _renderNextButton = () => {
        return (
            <View style={{backgroundColor:'#e5551f', justifyContent:'center',alignItems:'center',paddingTop:20, paddingBottom:20, marginLeft:80, marginRight:80}}>

                    {renderIf(languageLocale == "ko") (
                        <Text style={{color:'#fff', fontSize:18, fontWeight:'bold'}}> 다음</Text>
                    )}
                    {renderIf(languageLocale == "en") (
                        <Text style={{color:'#fff', fontSize:18, fontWeight:'bold'}}> next</Text>
                    )}
                    {renderIf(languageLocale == "zh") (
                        <Text style={{color:'#fff', fontSize:18, fontWeight:'bold'}}>下一页</Text>
                    )}


            </View>
        );
    }
    _renderDoneButton = () => {
        return (
            <View style={{backgroundColor:'#e5551f', justifyContent:'center',alignItems:'center',paddingTop:20, paddingBottom:20, marginLeft:80, marginRight:80}}>

                    {renderIf(languageLocale == "ko") (
                        <Text style={{color:'#fff', fontSize:18, fontWeight:'bold'}}>완료</Text>
                    )}
                    {renderIf(languageLocale == "en") (
                        <Text style={{color:'#fff', fontSize:18, fontWeight:'bold'}}> Complete</Text>
                    )}
                    {renderIf(languageLocale == "zh") (
                        <Text style={{color:'#fff', fontSize:18, fontWeight:'bold'}}> 已完成</Text>
                    )}

            </View>
        );
    }
    _renderSkipButton = () =>{
        return (
            <View style={{backgroundColor:'#fff', justifyContent:'center',alignItems:'center',paddingTop:30}}>

                {renderIf(languageLocale == "ko") (
                    <Text style={{color: '#e5551f',fontSize:10}}>건너뛰기</Text>
                )}
                {renderIf(languageLocale == "en") (
                    <Text style={{color: '#e5551f',fontSize:10}}>skip</Text>
                )}
                {renderIf(languageLocale == "zh") (
                    <Text style={{color: '#e5551f',fontSize:10}}>跳跃</Text>
                )}

                <Image source={require('../../assets/img/intro_logo.png')} resizeMode="contain" style={{width:100,marginBottom:30}}/>
            </View>
        );
    }
    render() {
        return (
            <AppIntroSlider
                slides={slides}
                onDone={this._onDone}
                onSkip={this._onSkip}
                renderItem={this._renderItem}
                bottomButton={true}
                renderNextButton={this._renderNextButton}
                renderDoneButton={this._renderDoneButton}
                showSkipButton={true}
                renderSkipButton = {this._renderSkipButton}
                nextLabel = '다음'
                skipLabel = '건너뛰기'
                doneLabel ='완료'
                dotColor = 'rgba(255,204,153,1)'
                activeDotColor = 'rgba(226,67,7,1)'
            />
        );
    }
}