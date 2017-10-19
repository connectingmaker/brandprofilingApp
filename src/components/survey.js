import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, StyleSheet, TouchableOpacity,Alert } from 'react-native';
import { Container, Header, Body, Content, Footer,Item, Icon, Input,Button } from 'native-base';
import renderIf from 'render-if'


export default class Survey extends Component {


    constructor(){
        super();
        this.state ={
            stepView:1
        }
    }

    stepNext(value){

        this.setState({stepView: value});
        console.log(value);
    }

    render() {


        return (

            <Container>
                {renderIf(this.state.stepView == 1)(
                    <Header style={SurveyFormStyle.headerLayout2}>
                        <View style={{flex:.1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize:12,color:'#fff'}} onPress={Actions.pop}>나가기</Text>
                        </View>
                        <View style={{flex:.8, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize:16,color:'#fff'}}>설문하기</Text>
                        </View>
                        <View style={{flex:.1, justifyContent: 'center', alignItems: 'center'}}>
                        </View>
                    </Header>
                )}
                
                <Content style={{padding:10}}>
                    {renderIf(this.state.stepView == 1)(
                        <View>
                            <View style={SurveyFormStyle.contentsLayout}>
                                <View>
                                    <View style={{padding:10,alignItems:'center'}}>
                                        <Image source={require('../../assets/img/presurvey_icon_list.png')} resizeMode={'contain'} style={{width:30,height:30}}/>
                                    </View>
                                    <View style={{padding:10,alignItems:'center'}}>
                                        <Text style={{fontSize:12}}>설문 참여하기 전에 꼭 확인해주세요!</Text>
                                    </View>
                                </View>
                                <View style={SurveyFormStyle.lingBg}></View>
                                <View>
                                    <Text style={SurveyFormStyle.contentsSize}>이 설문조사는 응답하신 문항에 따라 포인트가 달라집니다.</Text>
                                </View>
                                <View>
                                    <Text style={SurveyFormStyle.contentsSize}>설문을 끝까지 완료하신 경우에는 <Text style={SurveyFormStyle.boldFont}>800P</Text>를 설문대상자가 아니거나 초과된 경우에는 <Text style={SurveyFormStyle.boldFont}>최소 10P</Text>를 받으실 수 있습니다.</Text>
                                </View>
                                <View style={SurveyFormStyle.lingBg}></View>
                                <View>
                                    <Text style={SurveyFormStyle.contentsSize}>본 설문조사는 시작 시 지적 재산권/정보 기물 유지에 대한 동의를 필요로 하며, 동의하지 않으실 경우 설문이 종료되어 포인트가 지급되지 않을 수 있습니다.</Text>
                                </View>
                                <View style={SurveyFormStyle.lingBg}></View>


                                <Button bordered full style={{borderColor:"#979797", backgroundColor:"#DA4211", justifyContent: 'center', paddingLeft:10}} onPress={()=>this.stepNext(2)}>
                                    <Text style={{marginLeft:10, color:"#ffffff"}}>네, 확인했습니다.</Text>
                                </Button>

                            </View>

                        </View>
                    )}
                    
                </Content>
                <Footer style={{backgroundColor:"#222222", width:"100%", height:44, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                    {renderIf(this.state.stepView == 2)(
                        <TouchableOpacity style={{width:"100%", height:"100%", justifyContent: 'flex-end', alignItems: 'flex-end'}} onPress={()=>this.preQ1_Check()}>
                            <View>
                                <Text style={{color:"#ffffff", paddingRight:20,paddingBottom:20}}>다음단계</Text>
                            </View>
                        </TouchableOpacity>
                    )}

                </Footer>
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

const styles = StyleSheet.create({
    radio: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    }
})