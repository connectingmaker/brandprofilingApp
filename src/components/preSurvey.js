import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, StyleSheet, TouchableOpacity,Alert } from 'react-native';
import { Container, Header, Body, Content, Footer,Item, Icon, Input,Button } from 'native-base';
import renderIf from 'render-if';


export default class PreSurvey extends Component {


    constructor(){
        super();
        this.state ={
            stepView:1
            ,selectBool:false
            ,select1_Bool:false
            ,select2_Bool:false
            ,userName:""
            ,userBirth:""
        }
    }
    select1_Btn()
    {
        if(this.state.select1_Bool == false) {
            this.setState({select1_Bool : true});
        } else {
            this.setState({selectBool : true});
            this.setState({select1_Bool : false});
        }

    }
    select2_Btn()
    {
        if(this.state.select2_Bool == false) {
            this.setState({select2_Bool : true});
        } else {
            this.setState({selectBool : true});
            this.setState({select2_Bool : false});
        }

    }
    /**** 사전조사 Q1 확인 *******/
    preQ1_Check(){
        if(this.state.userName == "") {
            Alert.alert(
                'Error',
                '성명을 입력해주세요.',
                [
                    {text: '확인', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false}
            )
            return;
        }

        this.stepNext(3);
    }
    preQ2_Check() {
        if(this.state.selectBool == false) {
            Alert.alert(
                'Error',
                '성별을 선택해주세요.',
                [
                    {text: '확인', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            )
            return;
        }

        this.stepNext(4);
    }
    preQ3_Check() {
        if(this.state.userBirth == "") {
            Alert.alert(
                'Error',
                '성명을 입력해주세요.',
                [
                    {text: '확인', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false}
            )
            return;
        }

        this.stepNext(5);
    }
    preQ4_Check() {

        this.stepNext(6);
    }
    preEnd_Check() {
        Alert.alert(
            '답변을 제출하시겠습니까?',
            '답변 제출시 수정이 불가능 합니다. 불량 답변시 패널활동 및 포인트 사용이 제한될 수 있음을 알려드립니다.',
            [
                {text: '취소', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: '확인', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false}
        )
    }

    stepNext(value){

        this.setState({stepView: value});
        console.log(value);
    }

    render() {


        return (

            <Container>
                {renderIf(this.state.stepView == 1)(
                <Header style={preSurveyFormStyle.headerLayout2}>
                    <View style={{flex:.1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize:12,color:'#fff'}} onPress={Actions.pop}>나가기</Text>
                    </View>
                    <View style={{flex:.8, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize:16,color:'#fff'}}>사전조사</Text>
                    </View>
                    <View style={{flex:.1, justifyContent: 'center', alignItems: 'center'}}>
                    </View>
                </Header>
                )}
                {renderIf(this.state.stepView > 1 )(
                    <Header style={preSurveyFormStyle.headerLayout}>
                        <View style={{flex:.1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize:12,color:'#fff'}} onPress={Actions.pop}>나가기</Text>
                        </View>
                        <View style={{flex:.8, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize:16,color:'#fff'}}>사전조사</Text>
                        </View>
                        <View style={{flex:.1, justifyContent: 'center', alignItems: 'center'}}>
                        </View>
                    </Header>
                )}
                <Content style={{padding:10}}>
                    {renderIf(this.state.stepView == 1)(
                        <View>
                            <View style={preSurveyFormStyle.contentsLayout}>
                                <View>
                                    <View style={{padding:10,alignItems:'center'}}>
                                        <Image source={require('../../assets/img/presurvey_icon_list.png')} resizeMode={'contain'} style={{width:30,height:30}}/>
                                    </View>
                                    <View style={{padding:10,alignItems:'center'}}>
                                        <Text style={{fontSize:12}}>추가정보 입력 전에 꼭 확인해주세요!</Text>
                                    </View>
                                </View>
                                <View style={preSurveyFormStyle.lingBg}></View>
                                <View>
                                    <Text style={preSurveyFormStyle.contentsSize}>추가정보를 모두 입력하신 경우에는 <Text style={preSurveyFormStyle.boldFont}>200P</Text>가 지급됩니다.</Text>
                                </View>
                                <View style={preSurveyFormStyle.lingBg}></View>
                                <View>
                                    <Text style={preSurveyFormStyle.contentsSize}>추가정보에 따라 참여할 수 있는 설문이 달라지며, 잘못된 정보 입력으로 인해 패널티를 받지 않게 주의하여 입력해주세요.</Text>
                                </View>
                                <View style={preSurveyFormStyle.lingBg}></View>
                                <View>
                                    <Text style={preSurveyFormStyle.contentsSize}>추가정보는 통계를 분석하는 용도로 활용되며, 제출 후 <Text style={preSurveyFormStyle.boldFont}>변경이 불가능</Text>합니다.</Text>
                                </View>
                                <View style={preSurveyFormStyle.lingBg}></View>
                                <Button bordered full style={{borderColor:"#979797", backgroundColor:"#DA4211", justifyContent: 'center', paddingLeft:10}}>
                                    <Text style={{marginLeft:10, color:"#ffffff"}} onPress={()=>this.stepNext(2)}>네, 확인했습니다.</Text>
                                </Button>



                            </View>

                        </View>
                    )}
                    {renderIf(this.state.stepView == 2)(
                        <View>
                            <View>
                                <View style={preSurveyFormStyle.contentsLayout}>
                                    <View>
                                        <Text style={preSurveyFormStyle.contentsSize}>1. <Text style={preSurveyFormStyle.boldFont}>성명</Text>을 입력해주세요. <Text style={preSurveyFormStyle.boldFont}>포인트 환급시 예금주</Text>(받으시는분) 용도로만 사용됩니다. 제출 이후 <Text style={preSurveyFormStyle.boldFont}>변경이 불가능</Text>하니 신중하게 입력해주세요. </Text>
                                    </View>
                                </View>

                                <View style={{padding:20}}>
                                    <Item regular style={{backgroundColor:"#ffffff"}}>
                                        <Input placeholder='성명을 입력해주세요.' style={preSurveyFormStyle.input} value={this.state.userName} onChangeText={(text) => this.setState({userName: text})} keyboardType="default"/>
                                    </Item>
                                </View>
                            </View>
                        </View>
                    )}
                    {renderIf(this.state.stepView == 3)(
                        <View>
                            <View>
                                <View style={preSurveyFormStyle.contentsLayout}>
                                    <View>
                                        <Text style={preSurveyFormStyle.contentsSize}>2. <Text style={preSurveyFormStyle.boldFont}>성별</Text>을 선택해주세요. 설문을 추천하거나 통계를 분석할 때 활용됩니다.</Text>
                                    </View>
                                </View>
                                <View style={preSurveyFormStyle.contentsLayout2}>

                                    <Button bordered full style={{borderColor:"#979797", backgroundColor:"#ffffff", justifyContent:'flex-start', paddingLeft:10}} onPress={()=>this.select1_Btn()}>
                                        <Image source={require("../../assets/img/select_icon_off.png")} resizeMode={'contain'} style={{width:18, height:18}} />
                                        <Text style={{marginLeft:10}}>남자</Text>
                                    </Button>


                                    <Button bordered full style={{borderColor:"#979797", backgroundColor:"#ffffff", justifyContent:'flex-start', paddingLeft:10}} onPress={()=>this.select2_Btn()}>
                                        <Image source={require("../../assets/img/select_icon_off.png")} resizeMode={'contain'} style={{width:18, height:18}} />
                                        <Text style={{marginLeft:10}}>여자</Text>
                                    </Button>

                                </View>


                            </View>
                        </View>
                    )}
                    {renderIf(this.state.stepView == 4)(
                        <View>
                            <View>
                                <View style={preSurveyFormStyle.contentsLayout}>
                                    <View>
                                        <Text style={preSurveyFormStyle.contentsSize}>3. <Text style={preSurveyFormStyle.boldFont}>출생연도</Text> 입력해주세요. 설문을 추천하거나 통계를 분석할 때 활용됩니다.</Text>
                                    </View>
                                </View>

                                <View style={{padding:20}}>
                                    <Item regular style={{backgroundColor:"#ffffff"}}>
                                        <Input placeholder='출생연도를 입력해주세요.' style={preSurveyFormStyle.input} value={this.state.userBirth} onChangeText={(text) => this.setState({userBirth: text})} keyboardType="numeric"/>
                                    </Item>
                                </View>
                            </View>
                        </View>
                    )}
                    {renderIf(this.state.stepView == 5)(
                        <View>
                            <View>
                                <View style={preSurveyFormStyle.contentsLayout}>
                                    <View>
                                        <Text style={preSurveyFormStyle.contentsSize}>4. <Text style={preSurveyFormStyle.boldFont}>거주지역</Text>을 선택해주세요. 설문을 추천하거나 통계를 분석할 때 활용됩니다.</Text>
                                    </View>
                                </View>

                                    <View style={preSurveyFormStyle.contentsLayout2}>

                                        <Button bordered full style={{borderColor:"#979797", backgroundColor:"#ffffff", justifyContent:'flex-start', paddingLeft:10}} onPress={()=>this.select1_Btn()}>
                                            <Image source={require("../../assets/img/select_icon_off.png")} resizeMode={'contain'} style={{width:18, height:18}} />
                                            <Text style={{marginLeft:10}}>서울특별시</Text>
                                        </Button>


                                        <Button bordered full style={{borderColor:"#979797", backgroundColor:"#ffffff", justifyContent:'flex-start', paddingLeft:10}} onPress={()=>this.select2_Btn()}>
                                            <Image source={require("../../assets/img/select_icon_off.png")} resizeMode={'contain'} style={{width:18, height:18}} />
                                            <Text style={{marginLeft:10}}>부산광역시</Text>
                                        </Button>

                                    </View>

                            </View>
                        </View>
                    )}
                    {renderIf(this.state.stepView == 6)(
                        <View>
                            <View>
                                <View style={preSurveyFormStyle.contentsLayout}>
                                    <View>
                                        <Text style={preSurveyFormStyle.contentsSize}>5. <Text style={preSurveyFormStyle.boldFont}>월평균 소비금액</Text>을 선택해주세요. 설문을 추천하거나 통계를 분석할 때 활용됩니다.</Text>
                                    </View>
                                </View>

                                <View style={preSurveyFormStyle.contentsLayout2}>

                                    <Button bordered full style={{borderColor:"#979797", backgroundColor:"#ffffff", justifyContent:'flex-start', paddingLeft:10}} onPress={()=>this.select1_Btn()}>
                                        <Image source={require("../../assets/img/select_icon_off.png")} resizeMode={'contain'} style={{width:18, height:18}} />
                                        <Text style={{marginLeft:10}}>25만원 미만</Text>
                                    </Button>


                                    <Button bordered full style={{borderColor:"#979797", backgroundColor:"#ffffff", justifyContent:'flex-start', paddingLeft:10}} onPress={()=>this.select2_Btn()}>
                                        <Image source={require("../../assets/img/select_icon_off.png")} resizeMode={'contain'} style={{width:18, height:18}} />
                                        <Text style={{marginLeft:10}}>25만원 이상 50만원 미만</Text>
                                    </Button>

                                </View>

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
                    {renderIf(this.state.stepView == 3)(

                        <TouchableOpacity style={{width:"100%", height:"100%", justifyContent: 'flex-end', alignItems: 'flex-end'}} onPress={()=>this.preQ2_Check()}>
                            <View>
                                <Text style={{color:"#ffffff", paddingRight:20,paddingBottom:20}}>다음단계</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    {renderIf(this.state.stepView == 4)(

                        <TouchableOpacity style={{width:"100%", height:"100%", justifyContent: 'flex-end', alignItems: 'flex-end'}} onPress={()=>this.preQ3_Check()}>
                            <View>
                                <Text style={{color:"#ffffff", paddingRight:20,paddingBottom:20}}>다음단계</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    {renderIf(this.state.stepView == 5)(

                        <TouchableOpacity style={{width:"100%", height:"100%", justifyContent: 'flex-end', alignItems: 'flex-end'}} onPress={()=>this.preQ4_Check()}>
                            <View>
                                <Text style={{color:"#ffffff", paddingRight:20,paddingBottom:20}}>다음단계</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    {renderIf(this.state.stepView == 6)(

                        <TouchableOpacity style={{width:"100%", height:"100%", justifyContent: 'flex-end', alignItems: 'flex-end'}} onPress={()=>this.preEnd_Check()}>
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