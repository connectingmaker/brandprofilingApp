import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, StyleSheet, TouchableOpacity,Alert } from 'react-native';
import { Container, Header, Body, Content, Footer,Item, Icon, Input,Button } from 'native-base';
import renderIf from 'render-if'


export default class Survey extends Component {


    constructor(props){
        super(props);
        this.state ={
            stepView:1
        }


    }

    componentWillReceiveProps(nextProps)
    {
        this.setState({stepView: nextProps.stepView});
    }

    stepNext(value){

        this.setState({stepView: value});
    }

    render() {


        return (

            <Container>
                    <Header style={SurveyFormStyle.headerLayout2}>
                        <TouchableOpacity onPress={() => Actions.Main({type:"reset", refresh: true})} style={{flex:.2, justifyContent: 'flex-start', alignItems: 'center'}}>
                        <View style={{flex:.2, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize:12,color:'#fff'}}>나가기</Text>
                        </View>
                        </TouchableOpacity>
                        <View style={{flex:.6, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize:16,color:'#fff'}}>설문하기</Text>
                        </View>
                        <View style={{flex:.2, justifyContent: 'center', alignItems: 'center'}}>
                        </View>
                    </Header>

                <Content style={{padding:10}}>
                    {renderIf(this.state.stepView == 1)(
                        <View>
                            <View style={SurveyFormStyle.contentsLayout}>
                                <View>
                                    <View style={{padding:10,alignItems:'center'}}>
                                        <Image source={require('../../assets/img/presurvey_icon_list.png')} resizeMode={'contain'} style={{width:30,height:30}}/>
                                    </View>
                                    <View style={{padding:10,alignItems:'center'}}>
                                        <Text style={{fontSize:12}}>설문에 참여하기 전에 꼭 확인해주세요!</Text>
                                    </View>
                                </View>
                                <View style={SurveyFormStyle.lingBg}></View>
                                <View>
                                    <Text style={SurveyFormStyle.contentsSize}>이 설문조사는 응답하신 문항에 따라 포인트가 다르게 적립됩니다.</Text>
                                </View>
                                <View>
                                    <Text style={SurveyFormStyle.contentsSize}>완료하신 경우에는 <Text style={SurveyFormStyle.boldFont}>{this.props.point}P</Text>를,  설문대상자가 아니거나 <Text style={SurveyFormStyle.boldFont}>설문모집인원이 초과된 경우</Text>에는 최소 10P를 받으실 수 있습니다.</Text>
                                </View>
                                <View style={SurveyFormStyle.lingBg}></View>
                                <View>
                                    <Text style={SurveyFormStyle.contentsSize}>본 설문조사는 설문참여 시 지적 재산권 보호 및 정보 비밀 유지에 동의한 것으로 간주됩니다. 동의하지 않을 경우 화면 상단의 '나가기'를 눌러주세요.</Text>
                                </View>
                                <View style={SurveyFormStyle.lingBg}></View>


                                <Button bordered full style={{borderColor:"#979797", backgroundColor:"#DA4211", justifyContent: 'center', paddingLeft:10}} onPress={()=>Actions.SurveyJoin({campaign_code:this.props.campaign_code, quest_num:this.props.quest_num, uid:this.props.uid})}>
                                    <Text style={{marginLeft:10, color:"#ffffff"}}>네, 확인했습니다.</Text>
                                </Button>

                            </View>

                        </View>
                    )}
                    {renderIf(this.state.stepView == 2)(
                    <View>
                        <View style={preSurveyFormStyle.contentsLayout}>
                            <View>
                                <View style={{padding:10,alignItems:'center'}}>
                                    <Image source={require('../../assets/img/presurvey_icon_list.png')} resizeMode={'contain'} style={{width:30,height:30}}/>
                                </View>
                                <View style={{padding:10,alignItems:'center'}}>
                                    <Text style={{fontSize:12}}>설문 응답이 성공적으로 제출되었습니다.</Text>
                                </View>
                            </View>
                            <View style={preSurveyFormStyle.lingBg}></View>
                            <View>
                                <Text style={preSurveyFormStyle.contentsSize}><Text style={preSurveyFormStyle.boldFont}>{this.props.point}P</Text>를 회원님의 적립함에 넣어드렸어요! 소중한 참여에 다시 한번 감사드립니다.</Text>
                            </View>
                            <View style={preSurveyFormStyle.lingBg}></View>
                            <View>
                                <Text style={preSurveyFormStyle.contentsSize}>이제 새로운 설문에 참여해보세요!</Text>
                            </View>
                            <View style={{flex:1, flexDirection: 'row', paddingTop:5, paddingBottom:5}}>


                                <View style={{flex:1}}>
                                    <Button bordered full style={{borderColor:"#979797",backgroundColor:"#DA4211"}} onPress={() => Actions.Main({type:"reset", refresh: true})}>
                                        <Text style={{color:"#fff"}}>참여가능  설문</Text>
                                    </Button>
                                </View>
                            </View>



                        </View>
                    </View>
                        )}
                    
                </Content>

            </Container>
        );
    }
}



const SurveyFormStyle = StyleSheet.create({
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
        ,shadowOpacity: 0.3
    }
    ,contentsLayout2: {
        width: "100%"
        ,paddingTop:10
        ,paddingBottom:10
        ,paddingLeft:20
        ,paddingRight:20
        ,backgroundColor:"#f6f6f6"
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


const preSurveyFormStyle = StyleSheet.create({
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
        ,shadowOpacity: 0.3
    }
    ,contentsLayout2: {
        width: "100%"
        ,paddingTop:10
        ,paddingBottom:10
        ,paddingLeft:20
        ,paddingRight:20
        ,backgroundColor:"#f6f6f6"
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


const styles = StyleSheet.create({
    radio: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    }
})