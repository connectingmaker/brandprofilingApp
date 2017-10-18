import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, StyleSheet, TouchableOpacity,AlertIOS,Alert,Platform } from 'react-native';
import { Container, Header, Body, Content, Footer,Item, Icon, Input,Button } from 'native-base';


import renderIf from 'render-if'


export default class Payment extends Component {



    constructor(){
        super();
        this.state ={
            stepView:1
            ,cashBackPoint:""
            ,cashBackAccount:""
            ,bank:""
            ,message:""
            ,promptVisible:false
        }
    }

    check(){
        if (Platform.OS === 'ios') {
            AlertIOS.prompt(
                '비밀번호 입력',
                '계정 보호를 위해 비밀번호를 입력해주세요.',
                [

                    {text: '최소', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: '확인', onPress: password => this.stepNext(2)},
                ],
                'secure-text'
            );
        } else {
            Alert.alert(
                '비밀번호 입력',
                '계정 보호를 위해 비밀번호를 입력해주세요.',
                [

                    {text: '최소', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: '확인', onPress: password => this.stepNext(2)},
                ],
                'secure-text'
            );
        }



    }

    Endcheck(){
        Alert.alert(
            '환급 신청을 제출하시겠습니까?',
            '제출 시 수정이 불가능합니다. 본인 통장으로만 신청이 가능하며, 잘못 신청시 환급 신청이 취소되며 포인트는 다시 적립됩니다.',
            [

                {text: '최소', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: '확인', onPress: () => this.stepNext(3)},
            ],
            { cancelable: false }
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
                    <Header style={paymentFormStyle.headerLayout2}>
                        <View style={{flex:.1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize:12,color:'#fff'}} onPress={Actions.pop}>나가기</Text>
                        </View>
                        <View style={{flex:.8, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize:16,color:'#fff'}}>환급신청</Text>
                        </View>
                        <View style={{flex:.1, justifyContent: 'center', alignItems: 'center'}}>
                        </View>
                    </Header>
                )}
                {renderIf(this.state.stepView == 2 )(
                    <Header style={paymentFormStyle.headerLayout}>
                        <View style={{flex:.1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize:12,color:'#fff'}} onPress={Actions.pop}>나가기</Text>
                        </View>
                        <View style={{flex:.8, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize:16,color:'#fff'}}>환급신청</Text>
                        </View>
                        <View style={{flex:.1, justifyContent: 'center', alignItems: 'center'}}>
                        </View>
                    </Header>
                )}
                {renderIf(this.state.stepView == 3 )(
                    <Header style={paymentFormStyle.headerLayout}>
                        <View style={{flex:.1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize:12,color:'#fff'}} onPress={Actions.pop}>닫기</Text>
                        </View>
                        <View style={{flex:.8, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize:16,color:'#fff'}}>환급 신청 완료</Text>
                        </View>
                        <View style={{flex:.1, justifyContent: 'center', alignItems: 'center'}}>
                        </View>
                    </Header>
                )}
                <Content style={{padding:10}}>
                    {renderIf(this.state.stepView == 1)(
                    <View>
                        <View style={paymentFormStyle.contentsLayout}>
                            <View>
                                <View style={{padding:10,alignItems:'center'}}>
                                    <Image source={require('../../assets/img/point_icon_off.png')} resizeMode={'contain'} style={{width:30,height:30}}/>
                                </View>
                                <View style={{alignItems:'center'}}>
                                    <Text style={{fontSize:12}}>환급신청을 통해 포인트를 통장으로 입금받으실 수 있습니다.</Text>
                                </View>
                            </View>
                            <View style={paymentFormStyle.lingBg}></View>

                            <View style={{flex:1, flexDirection: 'row', paddingTop:10, paddingBottom:5}}>
                                <View style={{flex:0.4,alignItems:'flex-start',justifyContent:'center'}}>
                                    <Text style={{color:'#4D4D4D',fontSize:15,fontWeight: 'bold'}}>포인트 환급 비율</Text>
                                </View>
                                <View style={{flex:0.6,alignItems:'flex-end'}}>
                                    <Text style={paymentFormStyle.boldFont}>1P 당 1원</Text>
                                </View>
                            </View>
                            <View style={paymentFormStyle.lingBg}></View>

                            <View style={{flex:1, flexDirection: 'row', paddingTop:10, paddingBottom:5}}>
                                <View style={{flex:0.4,alignItems:'flex-start',justifyContent:'center'}}>
                                    <Text style={{color:'#4D4D4D',fontSize:15,fontWeight: 'bold'}}>최소 환급 포인트</Text>
                                </View>
                                <View style={{flex:0.6,alignItems:'flex-end'}}>
                                    <Text style={paymentFormStyle.boldFont}>5,000P</Text>
                                </View>
                            </View>
                            <View style={paymentFormStyle.lingBg}></View>

                            <View style={{flex:1, flexDirection: 'row', paddingTop:10, paddingBottom:5}}>
                                <View style={{flex:0.4,alignItems:'flex-start',justifyContent:'center'}}>
                                    <Text style={{color:'#4D4D4D',fontSize:15,fontWeight: 'bold'}}>환급방법</Text>
                                </View>
                                <View style={{flex:0.6,alignItems:'flex-end'}}>
                                    <Text style={paymentFormStyle.boldFont}>본인 명의 통장으로 입금</Text>
                                </View>
                            </View>
                            <View style={paymentFormStyle.lingBg}></View>

                            <View style={{flex:1, flexDirection: 'row', paddingTop:10, paddingBottom:5}}>
                                <View style={{flex:0.4,alignItems:'flex-start',justifyContent:'center'}}>
                                    <Text style={{color:'#4D4D4D',fontSize:15,fontWeight: 'bold'}}>환급시기</Text>
                                </View>
                                <View style={{flex:0.6,alignItems:'flex-end'}}>
                                    <Text style={paymentFormStyle.boldFont}>접수완료 5~10일 후</Text>
                                </View>
                            </View>

                        </View>
                        <View style={paymentFormStyle.contentsLayout2}>
                            <View>
                                <Text style={{color:'#4D4D4D',fontSize:15,fontWeight: 'bold'}}>포인트 환급 신청시 주의사항</Text>
                            </View>
                            <View style={paymentFormStyle.lingBg}></View>
                            <View style={{paddingBottom:5}}>
                                <Text style={paymentFormStyle.contentsSize}>포인트 환급 신청 후에는 신청 내역을 변경하거나 취소할 수 없습니다. <Text style={paymentFormStyle.boldFont}>잘못된 계좌 번호</Text> 또는 <Text style={paymentFormStyle.boldFont}>타인의 계좌번호</Text>를 입력할 경우, 포인트 <Text style={paymentFormStyle.boldFont}>환급 신청이 취소</Text>가 되고, 환급 신청이 취소된 포인트는 <Text style={paymentFormStyle.boldFont}>다시 적립</Text>됩니다.</Text>
                            </View>
                            <Button bordered full style={{borderColor:"#979797", backgroundColor:"#DA4211", justifyContent: 'center', paddingLeft:10}} onPress={()=>this.check()}>
                                <Text style={{marginLeft:10, color:"#ffffff"}}>네, 확인했습니다.</Text>

                            </Button>

                        </View>

                    </View>
                )}
                {renderIf(this.state.stepView == 2)(
                    <View>
                        <View style={paymentFormStyle.contentsLayout}>

                            <View style={{flex:1, flexDirection: 'row', paddingTop:10, paddingBottom:5}}>
                                <View style={{flex:0.4,alignItems:'flex-start',justifyContent:'center'}}>
                                    <Text style={{color:'#4D4D4D',fontSize:15,fontWeight: 'bold'}}>예금주(받으시는 분)</Text>
                                </View>
                                <View style={{flex:0.6,alignItems:'flex-end'}}>
                                    <Text style={{color:'#4D4D4D',fontSize:15,fontWeight: 'bold'}}>류성재</Text>
                                </View>
                            </View>
                            <View style={paymentFormStyle.lingBg}></View>

                            <View style={{flex:1, flexDirection: 'row', paddingTop:10, paddingBottom:5}}>
                                <View style={{flex:0.4,alignItems:'flex-start',justifyContent:'center'}}>
                                    <Text style={{color:'#4D4D4D',fontSize:15,fontWeight: 'bold'}}>나의 포인트</Text>
                                </View>
                                <View style={{flex:0.6,alignItems:'flex-end'}}>
                                    <Text style={paymentFormStyle.boldFont}>32,900P</Text>
                                </View>
                            </View>
                            <View style={paymentFormStyle.lingBg}></View>

                            <View style={{flex:1, flexDirection: 'row', paddingTop:10, paddingBottom:5}}>
                                <View style={{flex:0.4,alignItems:'flex-start',justifyContent:'center'}}>
                                    <Text style={{color:'#4D4D4D',fontSize:15,fontWeight: 'bold'}}>최소 환급 포인트</Text>
                                </View>
                                <View style={{flex:0.6,alignItems:'flex-end'}}>
                                    <Text style={{color:'#4D4D4D',fontSize:15,fontWeight: 'bold'}}>5,000P</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <View style={{paddingTop:20,paddingLeft:20,paddingRight:20,paddingBottom:5}}>
                                <Item regular style={{backgroundColor:"#ffffff"}}>
                                    <Input placeholder='환급 받으실 금액 입력' style={paymentFormStyle.input} value={this.state.cashBackPoint} onChangeText={(text) => this.setState({cashBackPoint: text})} keyboardType="numeric"/>
                                </Item>
                            </View>

                            <View style={{flex:1,flexDirection: 'row',paddingLeft:20,paddingRight:20,paddingBottom:5}}>
                                <Item regular style={{backgroundColor:"#ffffff"}}>
                                    <Input placeholder='은행 선택' style={paymentFormStyle.input} value={this.state.bank} onChangeText={(text) => this.setState({bank: text})} keyboardType="default"/>
                                </Item>
                            </View>

                            <View style={{paddingLeft:20,paddingRight:20,paddingBottom:20}}>
                                <Item regular style={{backgroundColor:"#ffffff"}}>
                                    <Input placeholder='계좌번호 입력' style={paymentFormStyle.input} value={this.state.cashBackAccount} onChangeText={(text) => this.setState({cashBackAccount: text})} keyboardType="numeric"/>
                                </Item>
                            </View>
                            <Button bordered full style={{borderColor:"#979797", backgroundColor:"#DA4211", justifyContent: 'center', paddingLeft:10}}>
                                <Text style={{marginLeft:10, color:"#ffffff"}} onPress={()=>this.Endcheck()}>신청하기</Text>
                            </Button>
                            <View style={{alignItems:'center',justifyContent:'flex-end',paddingTop:100}}>
                                <Image source={require('../../assets/img/point_bg.png')} resizeMode={'contain'} style={{width:200,height:200}}/>
                            </View>
                        </View>


                    </View>
                )}
                {renderIf(this.state.stepView == 3)(
                    <View>
                        <View style={paymentFormStyle.contentsLayout}>
                            <View>
                                <View style={{padding:10,alignItems:'center'}}>
                                    <Image source={require('../../assets/img/presurvey_icon_list.png')} resizeMode={'contain'} style={{width:30,height:30}}/>
                                </View>
                                <View style={{alignItems:'center'}}>
                                    <Text style={{fontSize:12}}>환급 신청이 성공적으로 제출 되었습니다.</Text>
                                </View>
                            </View>
                            <View style={paymentFormStyle.lingBg}></View>
                            <View style={{paddingBottom:5}}>
                                <Text style={paymentFormStyle.contentsSize}><Text style={paymentFormStyle.boldFont}>32,910P</Text>가 류성재님의 <Text style={paymentFormStyle.boldFont}>농협 30123456789</Text> 계좌로 환급 신청되었습니다.</Text>
                            </View>
                            <View style={paymentFormStyle.lingBg}></View>
                            <View style={{paddingBottom:5}}>
                                <Text style={paymentFormStyle.contentsSize}>입금까지 접수완료 시점으로부터 5~10일이 소요됩니다.</Text>
                            </View>
                            <Button bordered full style={{borderColor:"#979797", backgroundColor:"#DA4211", justifyContent: 'center', paddingLeft:10}}>
                                <Text style={{marginLeft:10, color:"#ffffff"}} onPress={Actions.pop}>포인트 내역으로 이동</Text>
                            </Button>

                        </View>
                        <View style={{alignItems:'center',justifyContent:'flex-end',paddingTop:230}}>
                            <Image source={require('../../assets/img/point_bg.png')} resizeMode={'contain'} style={{width:200,height:200}}/>
                        </View>

                    </View>
                )}

                </Content>
                <Footer style={{backgroundColor:"#222222", width:"100%", height:44, justifyContent: 'flex-end', alignItems: 'flex-end'}}>

                </Footer>

            </Container>
        );
    }
}



const paymentFormStyle = StyleSheet.create({
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
