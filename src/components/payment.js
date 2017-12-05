import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, StyleSheet, TouchableOpacity,AlertIOS,Alert,Platform, AsyncStorage } from 'react-native';
import { Container, Header, Body, Content, Footer, Icon, Input,Button, Form, Picker, Item as FormItem } from 'native-base';
import config from '../config';
import renderIf from 'render-if'
const Item = Picker.Item;
export default class Payment extends Component {



    constructor(){
        super();
        this.state ={
            stepView:1
            ,cashBackPoint:""
            ,cashBackAccount:""
            ,bank:""
            ,message:""
            ,username:""
            ,point: ""
            ,promptVisible:false
            ,banklist:[{code : "", bank_name:""}]
            ,selected2: undefined
            ,requestBankName : ""
            ,requestBankAccount : ""
            ,requestPoint : ""
            ,promptVisible:false
        }
    }


    check(){
        /*
        if (Platform.OS === 'ios') {
            AlertIOS.prompt(
                '비밀번호 입력',
                '계정 보호를 위해 비밀번호를 입력해주세요.',
                [

                    {text: '최소', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: '확인', onPress: password => this.stepNext(2, password)},
                ],
                'secure-text'
            );
        } else {
            prompt_android(
                '비밀번호 입력',
                '계정 보호를 위해 비밀번호를 입력해주세요.',
                [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => console.log("OK")},
                ],
                {
                    type: 'secure-text',
                    cancelable: false,
                    defaultValue: 'test',
                    placeholder: 'placeholder'
                }
            );
        }
        */

        this.stepNext(2)



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
        //console.log(passwd);
        switch(value) {
            case 2:

                AsyncStorage.getItem(config.STORE_KEY).then((value) => {
                    var json = eval("(" + value + ")");
                    var email = json.SESS_USEREMAIL;
                    var uid = json.SESS_UID;
                    console.log(json);

                    var object = {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body:JSON.stringify( {
                            'uid': uid


                        })
                    };


                    fetch(config.SERVER_URL+"/api/memberSelectBank", object)
                        .then((response) => response.json())
                        .then((responseData) =>
                        {
                            var ERR_CODE = responseData.user[0].ERR_CODE;
                            var BANK_LIST = responseData.bank;

                            for(var i = 0; i<BANK_LIST.length; i++) {

                            }


                            var POINT = responseData.user[0].POINT;
                            //var POINT = 3000;
                            var USERNAME = responseData.user[0].USERNAME;

                            if(POINT < 5000) {
                                Alert.alert(
                                    'Error',
                                    '포인트가 부족합니다.',
                                    [
                                        {text: '확인', onPress: () => Actions.pop({})},
                                    ],
                                    { cancelable: false }
                                )
                                return;
                            }


                            this.setState({stepView: 2});
                            this.setState({point:POINT, username: USERNAME});

                            /*
                            switch(ERR_CODE) {
                                case "000":
                                    var POINT = responseData.user[0].POINT;
                                    //var POINT = 3000;
                                    var USERNAME = responseData.user[0].USERNAME;

                                    if(POINT < 5000) {
                                        Alert.alert(
                                            'Error',
                                            '포인트가 부족합니다.',
                                            [
                                                {text: '확인', onPress: () => Actions.pop({})},
                                            ],
                                            { cancelable: false }
                                        )
                                        return;
                                    }


                                    this.setState({stepView: 2});
                                    this.setState({point:POINT, username: USERNAME});
                                    break;
                                default:
                                    Alert.alert(
                                        'Error',
                                        '패스워드가 일치하지 않습니다',
                                        [
                                            {text: '확인', onPress: () => ""},
                                        ],
                                        { cancelable: false }
                                    )
                                    return;
                                    break;
                            }
                            */

                        })
                        .catch((err) => {
                            console.log(err);
                        });


                }).then(res => {
                    console.log("ERR");
                });


                break;
        }



        //this.setState({stepView: value});
        //console.log(value);
    }

    onValueChange2(value: string) {
        this.setState({
            selected2: value
        });
    }


    bankSubmit()
    {

        if(this.state.cashBackPoint == ""){
            Alert.alert(
                '',
                '환급받으실 포인트를 입력해주세요.',
                [
                    {text: '확인', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            )
            return;
        }


        if(this.state.selected2 == undefined){
            Alert.alert(
                '',
                '환급받으실 은행을 선택해주세요.',
                [
                    {text: '확인', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            )
            return;
        }

        if(this.state.cashBackAccount == ""){
            Alert.alert(
                '',
                '계좌번호를 입력해주세요.',
                [
                    {text: '확인', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            )
            return;
        }


        AsyncStorage.getItem(config.STORE_KEY).then((value) => {
            var json = eval("("+value+")");
            var uid = json.SESS_UID;
            var object = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
                ,body: JSON.stringify({
                    cashBankPoint : this.state.cashBackPoint
                    , bankSelect : this.state.selected2
                    , cashBankAccount: this.state.cashBackAccount
                    , uid : uid})
            }
            fetch(config.SERVER_URL+"/api/pointSend", object)
                .then((response) => response.text())
                .then((responseData) =>
                {

                    var json = eval("(" + responseData + ")");
                    switch(json.ERR_CODE) {
                        case "000":
                            this.setState({
                                requestBankName : json.BANK_NAME
                                ,requestBankAccount : json.BANK_ACCOUNT
                                ,requestPoint : json.POINT
                                ,stepView:3
                            });
                            break;
                        default:
                            Alert.alert(
                                'Error',
                                json.ERR_MSG,
                                [
                                    {text: '확인', onPress: () => Actions.pop({ refresh: {stepView: 2}})},
                                ],
                                { cancelable: false }
                            )
                            break;
                    }


                })
                .catch((err) => {
                    console.log(err);
                });
        }).then(res => {

        });
    }



    render() {

        return (

            <Container>

                {renderIf(this.state.stepView == 1)(
                    <Header style={paymentFormStyle.headerLayout2}>
                        <View style={{flex:.2, justifyContent: 'center', alignItems: 'flex-start'}}>
                            <Text style={{fontSize:12,color:'#fff'}} onPress={Actions.pop}>나가기</Text>
                        </View>
                        <View style={{flex:.6, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize:16,color:'#fff'}}>환급신청</Text>
                        </View>
                        <View style={{flex:.2, justifyContent: 'center', alignItems: 'flex-end'}}>
                        </View>
                    </Header>
                )}
                {renderIf(this.state.stepView == 2 )(
                    <Header style={paymentFormStyle.headerLayout}>
                        <View style={{flex:.2, justifyContent: 'center', alignItems: 'flex-start'}}>
                            <Text style={{fontSize:12,color:'#fff'}} onPress={Actions.pop}>나가기</Text>
                        </View>
                        <View style={{flex:.6, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize:16,color:'#fff'}}>환급신청</Text>
                        </View>
                        <View style={{flex:.2, justifyContent: 'center', alignItems: 'flex-end'}}>
                        </View>
                    </Header>
                )}
                {renderIf(this.state.stepView == 3 )(
                    <Header style={paymentFormStyle.headerLayout}>
                        <View style={{flex:.2, justifyContent: 'center', alignItems: 'flex-start'}}>
                            <Text style={{fontSize:12,color:'#fff'}} onPress={Actions.pop}>닫기</Text>
                        </View>
                        <View style={{flex:.6, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize:16,color:'#fff'}}>환급 신청 완료</Text>
                        </View>
                        <View style={{flex:.2, justifyContent: 'center', alignItems: 'flex-end'}}>
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
                                    <Text style={{color:'#4D4D4D',fontSize:15,fontWeight: 'bold'}}>{this.state.username}</Text>
                                </View>
                            </View>
                            <View style={paymentFormStyle.lingBg}></View>

                            <View style={{flex:1, flexDirection: 'row', paddingTop:10, paddingBottom:5}}>
                                <View style={{flex:0.4,alignItems:'flex-start',justifyContent:'center'}}>
                                    <Text style={{color:'#4D4D4D',fontSize:15,fontWeight: 'bold'}}>나의 포인트</Text>
                                </View>
                                <View style={{flex:0.6,alignItems:'flex-end'}}>
                                    <Text style={paymentFormStyle.boldFont}>{this.state.point}P</Text>
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
                                    <Input placeholder='환급 받으실 금액 입력' style={paymentFormStyle.input} value={this.state.cashBackPoint} onChangeText={(text) => this.setState({cashBackPoint: text})} keyboardType="numeric"/>

                            </View>

                            <View style={{paddingLeft:20,paddingRight:20,paddingBottom:5}}>
                                <Form>
                                    <Picker
                                        mode="dropdown"
                                        placeholder="은행을 선택해주세요."
                                        iosHeader="은행을 선택해주세요."
                                        selectedValue={this.state.selected2}
                                        onValueChange={this.onValueChange2.bind(this)}
                                        style={{backgroundColor:"#fff", width:"100%"}}
                                    >
                                        <Item label="산업은행" value="002" />
                                        <Item label="기업은행" value="003" />
                                        <Item label="외환은행" value="005" />
                                        <Item label="수협은행" value="007" />
                                        <Item label="농협은행" value="011" />
                                        <Item label="우리은행" value="020" />
                                        <Item label="SC제일은행" value="023" />
                                        <Item label="씨티은행" value="027" />
                                        <Item label="대구은행" value="031" />
                                        <Item label="부산은행" value="032" />
                                        <Item label="광주은행" value="034" />
                                        <Item label="제주은행" value="035" />
                                        <Item label="전북은행" value="037" />
                                        <Item label="경남은행" value="039" />
                                        <Item label="국민은행" value="044" />
                                        <Item label="새마을금고" value="045" />
                                        <Item label="신협" value="048" />
                                        <Item label="상호저축은행" value="050" />
                                        <Item label="HSBC" value="054" />
                                        <Item label="도이치" value="055" />
                                        <Item label="우체국" value="071" />
                                        <Item label="하나은행" value="081" />
                                        <Item label="신한은행" value="088" />

                                    </Picker>
                                </Form>
                            </View>

                            <View style={{paddingLeft:20,paddingRight:20,paddingBottom:20}}>
                                    <Input placeholder='계좌번호 입력' style={paymentFormStyle.input} value={this.state.cashBackAccount} onChangeText={(text) => this.setState({cashBackAccount: text})} keyboardType="numeric"/>
                            </View>
                            <Button bordered full style={{borderColor:"#979797", backgroundColor:"#DA4211", justifyContent: 'center', paddingLeft:10}} onPress={() => this.bankSubmit()}>
                                <Text style={{marginLeft:10, color:"#ffffff"}}>신청하기</Text>
                            </Button>
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
                                <Text style={paymentFormStyle.contentsSize}><Text style={paymentFormStyle.boldFont}>{this.state.requestPoint}P</Text>가 <Text style={paymentFormStyle.boldFont}>{this.state.requestBankName} {this.state.requestBankAccount}</Text> 계좌로 환급 신청되었습니다.</Text>
                            </View>
                            <View style={paymentFormStyle.lingBg}></View>
                            <View style={{paddingBottom:5}}>
                                <Text style={paymentFormStyle.contentsSize}>입금까지 접수완료 시점으로부터 5~10일이 소요됩니다.</Text>
                            </View>
                            <Button bordered full style={{borderColor:"#979797", backgroundColor:"#DA4211", justifyContent: 'center', paddingLeft:10}} onPress={() => Actions.pop({refresh:{data:true}})}>
                                <Text style={{marginLeft:10, color:"#ffffff"}}>포인트 내역으로 이동</Text>
                            </Button>

                        </View>
                        <View style={{alignItems:'center',justifyContent:'flex-end',paddingTop:230}}>
                            <Image source={require('../../assets/img/point_bg.png')} resizeMode={'contain'} style={{width:200,height:200}}/>
                        </View>
                    </View>
                )}

                </Content>

                {renderIf(this.state.stepView == 2)(

                )}

                {renderIf(this.state.stepView == 1)(
                    <Footer style={{backgroundColor:"#222222", width:"100%", height:44, justifyContent: 'flex-end', alignItems: 'flex-end'}}>

                    </Footer>
                )}

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
        fontSize:15
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
