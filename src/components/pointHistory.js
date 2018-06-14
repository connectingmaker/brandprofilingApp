import React, { Component } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text ,ScrollView, ListView, AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Footer, Item, Icon, Input, Button ,ActionSheet, Spinner} from 'native-base';
import Moment from 'moment';
import config from '../../src/config';
import renderIf from 'render-if'


export default class pointHistory extends Component {

    constructor(props){
        super(props);
        this.state = {
            loaded: false
            ,myPoint:0
            ,dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
            ,BankdataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
            ,bankstats:true
            ,historystats:true

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


    componentWillReceiveProps(nextProps)
    {
        console.log("데이터 로드");
        this.mounted = true;
        this.setState({loaded:false,bankstats:true, historystats:true});
        this.loadJSONData();
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
            var json = eval("(" + value + ")");
            var uid = json.SESS_UID;

            fetch(config.SERVER_URL+"/api/pointHistory/"+uid, object)
                .then((response) => response.json())
                .then((responseData) =>
                {


                    if(this.mounted) {
                        var data = eval("(" + responseData.inPointList + ")");
                        var Bankdata = eval("(" + responseData.bankPointList + ")");


                        //this.setState({loaded:true, myPoint:responseData.userPoint, dataSource:this.state.dataSource.cloneWithRows(data), BankdataSource:this.state.BankdataSource.cloneWithRows(Bankdata)});
                        if(data.length > 0) {
                            this.setState({dataSource:this.state.dataSource.cloneWithRows(data)});
                        }

                        if(Bankdata.length > 0) {
                            this.setState({BankdataSource:this.state.BankdataSource.cloneWithRows(Bankdata)});
                        }

                        this.setState({loaded:true, myPoint:responseData.userPoint});
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

        }).then(res => {

            this.setState({loaded:true})
        });




    }



    myPointRender()
    {
        return (
            <View style={SurveyFormStyle.contentsLayout}>
                <View style={{flex:1, flexDirection: 'row', paddingTop:10, paddingBottom:5}}>
                    <View style={{flex:0.4,alignItems:'flex-start',justifyContent:'center'}}>
                        <Text style={{color:'#4D4D4D',fontSize:15,fontWeight: 'bold'}}>나의 포인트</Text>
                    </View>
                    <View style={{flex:0.6,alignItems:'flex-end'}}>
                        <Text style={SurveyFormStyle.boldFont}>52,300P</Text>
                    </View>
                </View>
                <View style={SurveyFormStyle.lingBg}></View>
                <Button bordered full style={{borderColor:"#979797", backgroundColor:"#DA4211", justifyContent: 'center', paddingLeft:10}} onPress={Actions.Payment}>
                    <Text style={{marginLeft:10, color:"#ffffff"}} >환급신청</Text>
                </Button>
            </View>
        );
    }

    pointHistory_Bank(obj)
    {
        return (
            <View>
                <View style={{flex:1, flexDirection: 'row', paddingBottom:5}}>
                    <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center'}}>
                        <Text style={SurveyFormStyle.contentsSize}><Text style={{color:'#979797',fontSize:13}}>{obj.CODE_NAME}</Text></Text>
                    </View>
                    <View style={{flex:0.4,alignItems:'flex-end'}}>
                        <Text style={SurveyFormStyle.boldFont}>{obj.POINT}P</Text>
                    </View>
                </View>
                <View style={{flex:1, flexDirection: 'row'}}>
                    {renderIf(obj.CODE_POINT == 5)(
                    <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center'}}>
                        <Text style={{color:'#979797',fontSize:11}}>신청일 {obj.INSERT_DATETIME}</Text>
                    </View>
                    )}

                    {renderIf(obj.CODE_POINT == 6)(
                        <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={{color:'#979797',fontSize:11}}>환급완료 {obj.UPDATE_DATETIME}</Text>
                        </View>
                    )}

                    {renderIf(obj.CODE_POINT == 7)(
                        <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={{color:'#979797',fontSize:11}}>신청일 {Moment(obj.INSERT_DATETIME).format('YYYY-MM-DD HH:mm:ss')}</Text>
                        </View>
                    )}
                    <View style={{flex:0.4,alignItems:'flex-end'}}>
                        <Text style={{color:'#979797',fontSize:11}}>{obj.USERNAME} {obj.BANK_NAME} {obj.BANK_NUM}</Text>
                    </View>
                </View>
                <View style={SurveyFormStyle.lingBg}></View>
            </View>
        );
    }

    pointHistory_IN(obj)
    {
        return (
            <View>
                <View style={{flex:1, flexDirection: 'row', paddingTop:5, paddingBottom:5}}>
                    <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center'}}>
                        <Text style={SurveyFormStyle.contentsSize}><Text style={{color:'#979797',fontSize:13}}>{obj.CAMPAIGN_TITLE}</Text></Text>
                    </View>

                    {renderIf(obj.CODE_TYPE == "IN")(
                    <View style={{flex:0.4,alignItems:'flex-end'}}>
                        <Text style={SurveyFormStyle.boldFont}>{obj.POINT}P</Text>
                    </View>
                    )}

                    {renderIf(obj.CODE_TYPE == "OUT")(
                        <View style={{flex:0.4,alignItems:'flex-end'}}>
                            <Text style={SurveyFormStyle.boldFont_blue}>{obj.POINT}P</Text>
                        </View>
                    )}
                </View>
                <View style={{flex:1, flexDirection: 'row'}}>
                    {renderIf(obj.CODE_TYPE == "IN")(
                    <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center'}}>
                        <Text style={{color:'#979797',fontSize:11}}>적립일 {Moment(obj.INSERT_DATETIME).format('YYYY-MM-DD HH:mm:ss')}</Text>

                    </View>

                    )}

                    {renderIf(obj.CODE_TYPE == "OUT")(
                        <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={{color:'#979797',fontSize:11}}>회수일 {Moment(obj.INSERT_DATETIME).format('YYYY-MM-DD HH:mm:ss')}</Text>

                        </View>
                    )}


                    {renderIf(obj.CODE_TYPE == "IN")(
                    <View style={{flex:0.4,alignItems:'flex-end'}}>
                        <Text style={{color:'#979797',fontSize:11}}>{obj.QUEST_NUM}차</Text>
                    </View>
                    )}

                </View>
                <View style={SurveyFormStyle.lingBg}></View>
            </View>
        );
    }

    bankStats()
    {
        if(this.state.bankstats == true) {
            this.setState({bankstats:false});
        } else {
            this.setState({bankstats:true});
        }
    }
    historyStats()
    {
        if(this.state.historystats == true) {
            this.setState({historystats:false});
        } else {
            this.setState({historystats:true});
        }
    }



    render() {
        if(this.state.loaded == true) {
            return (
                <View>
                    <View style={SurveyFormStyle.contentsLayout}>
                        <View style={{flex:1, flexDirection: 'row', paddingTop:10, paddingBottom:5}}>
                            <View style={{flex:0.4,alignItems:'flex-start',justifyContent:'center'}}>
                                <Text style={{color:'#4D4D4D',fontSize:15,fontWeight: 'bold'}}>나의 포인트</Text>
                            </View>
                            <View style={{flex:0.6,alignItems:'flex-end'}}>
                                <Text style={SurveyFormStyle.boldFont}>{this.state.myPoint}P</Text>
                            </View>
                        </View>
                        <View style={SurveyFormStyle.lingBg}></View>
                        <Button bordered full style={{borderColor:"#979797", backgroundColor:"#DA4211", justifyContent: 'center', paddingLeft:10}} onPress={Actions.Payment}>
                            <Text style={{marginLeft:10, color:"#ffffff"}} >환급신청</Text>
                        </Button>
                    </View>

                    <View style={SurveyFormStyle.contentsLayout2}>

                        <View style={{flex:1, flexDirection: 'row', paddingTop:10, paddingBottom:5}}>
                            <TouchableOpacity style={{flexDirection: 'row', width:"100%", height:"100%"}} onPress={()=>this.bankStats()}>
                            <View style={{flex:0.4,alignItems:'flex-start',justifyContent:'center'}}>
                                <Text style={{color:'#4D4D4D',fontSize:15,fontWeight: 'bold'}}>포인트 환급 내역</Text>
                            </View>

                            <View style={{flex:0.6,alignItems:'flex-end'}}>
                                {renderIf(this.state.bankstats == false)(
                                <Image source={require("../../assets/img/down_arrow_img.png")} resizeMode={'contain'} style={{width:18, height:18}} />
                                )}

                                {renderIf(this.state.bankstats == true)(
                                    <Image source={require("../../assets/img/up_arrow_img.png")} resizeMode={'contain'} style={{width:18, height:18}} />
                                )}
                            </View>
                            </TouchableOpacity>

                        </View>

                        <View style={SurveyFormStyle.lingBg}></View>
                    </View>
                    {renderIf(this.state.bankstats == true)(
                    <View>
                        <ListView style={SurveyFormStyle.inPointLayout} dataSource={this.state.BankdataSource}
                                  renderRow={(rowData) => this.pointHistory_Bank(rowData) }>
                        </ListView>
                    </View>
                    )}


                    <View style={SurveyFormStyle.contentsLayout2}>
                        <View style={{flex:1, flexDirection: 'row', paddingTop:10, paddingBottom:5}}>
                            <TouchableOpacity style={{flexDirection: 'row', width:"100%", height:"100%"}} onPress={()=>this.historyStats()}>
                                <View style={{flex:0.4,alignItems:'flex-start',justifyContent:'center'}}>
                                    <Text style={{color:'#4D4D4D',fontSize:15,fontWeight: 'bold'}}>포인트 적립 내역</Text>
                                </View>
                                <View style={{flex:0.6,alignItems:'flex-end'}}>
                                    {renderIf(this.state.historystats == false)(
                                        <Image source={require("../../assets/img/down_arrow_img.png")} resizeMode={'contain'} style={{width:18, height:18}} />
                                    )}

                                    {renderIf(this.state.historystats == true)(
                                        <Image source={require("../../assets/img/up_arrow_img.png")} resizeMode={'contain'} style={{width:18, height:18}} />
                                    )}
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={SurveyFormStyle.lingBg}></View>
                    </View>
                    {renderIf(this.state.historystats == true)(
                    <View style={{marginBottom:20}}>
                        <ListView style={SurveyFormStyle.inPointLayout} dataSource={this.state.dataSource}
                                  renderRow={(rowData) => this.pointHistory_IN(rowData) }>
                        </ListView>
                    </View>
                    )}

                </View>
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
                    <View style={{flex:1, flexDirection: 'row', paddingTop:10, paddingBottom:5}}>
                        <View style={{flex:0.4,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={{color:'#4D4D4D',fontSize:15,fontWeight: 'bold'}}>나의 포인트</Text>
                        </View>
                        <View style={{flex:0.6,alignItems:'flex-end'}}>
                            <Text style={SurveyFormStyle.boldFont}>52,300P</Text>
                        </View>
                    </View>
                    <View style={SurveyFormStyle.lingBg}></View>
                    <Button bordered full style={{borderColor:"#979797", backgroundColor:"#DA4211", justifyContent: 'center', paddingLeft:10}} onPress={Actions.Payment}>
                        <Text style={{marginLeft:10, color:"#ffffff"}} >환급신청</Text>
                    </Button>
                </View>

                <View style={SurveyFormStyle.contentsLayout2}>
                    <View style={{flex:1, flexDirection: 'row', paddingTop:10, paddingBottom:5}}>
                        <View style={{flex:0.4,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={{color:'#4D4D4D',fontSize:15,fontWeight: 'bold'}}>포인트 환급 내역</Text>
                        </View>
                        <View style={{flex:0.6,alignItems:'flex-end'}}>
                            <Image source={require("../../assets/img/up_arrow_img.png")} resizeMode={'contain'} style={{width:18, height:18}} />
                        </View>
                    </View>
                    <View style={SurveyFormStyle.lingBg}></View>

                    <View style={{flex:1, flexDirection: 'row', paddingTop:5, paddingBottom:5}}>
                        <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={{color:'#979797',fontSize:13}}>신청 완료 - 접수대기중</Text>
                        </View>
                        <View style={{flex:0.4,alignItems:'flex-end'}}>
                            <Text style={{color:'#979797',fontSize:13}}>5,000P</Text>
                        </View>
                    </View>
                    <View style={{flex:1, flexDirection: 'row'}}>
                        <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={{color:'#979797',fontSize:10}}>신청일 2017-08-19 13:30:21</Text>
                        </View>
                        <View style={{flex:0.4,alignItems:'flex-end'}}>
                            <Text style={{color:'#979797',fontSize:10}}>류* 농협 301************</Text>
                        </View>
                    </View>
                    <View style={SurveyFormStyle.lingBg}></View>

                    <View style={{flex:1, flexDirection: 'row', paddingTop:5, paddingBottom:5}}>
                        <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={{color:'#979797',fontSize:13}}>접수 완료 - 환급진행중</Text>
                        </View>
                        <View style={{flex:0.4,alignItems:'flex-end'}}>
                            <Text style={{color:'#979797',fontSize:13}}>5,100P</Text>
                        </View>
                    </View>
                    <View style={{flex:1, flexDirection: 'row'}}>
                        <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={{color:'#979797',fontSize:10}}>신청일 2017-08-19 13:30:21</Text>
                        </View>
                        <View style={{flex:0.4,alignItems:'flex-end'}}>
                            <Text style={{color:'#979797',fontSize:10}}>류* 농협 301************</Text>
                        </View>
                    </View>
                    <View style={SurveyFormStyle.lingBg}></View>

                    <View style={{flex:1, flexDirection: 'row', paddingTop:5, paddingBottom:5}}>
                        <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={SurveyFormStyle.contentsSize}><Text style={SurveyFormStyle.boldFont}>New</Text><Text style={{color:'#979797',fontSize:13}}>환급완료 </Text></Text>
                        </View>
                        <View style={{flex:0.4,alignItems:'flex-end'}}>
                            <Text style={SurveyFormStyle.boldFont}>8,900P</Text>
                        </View>
                    </View>
                    <View style={{flex:1, flexDirection: 'row'}}>
                        <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={{color:'#979797',fontSize:10}}>신청일 2017-08-19 13:30:21</Text>
                        </View>
                        <View style={{flex:0.4,alignItems:'flex-end'}}>
                            <Text style={{color:'#979797',fontSize:10}}>류* 농협 301************</Text>
                        </View>
                    </View>
                    <View style={SurveyFormStyle.lingBg}></View>

                    <View style={{flex:1, flexDirection: 'row', paddingTop:5, paddingBottom:5}}>
                        <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={{color:'#979797',fontSize:13}}>교환 취소 - 은행계좌 오류</Text>
                        </View>
                        <View style={{flex:0.4,alignItems:'flex-end'}}>
                            <Text style={{color:'#979797',fontSize:13}}>12,900P(취소</Text>
                        </View>
                    </View>
                    <View style={{flex:1, flexDirection: 'row'}}>
                        <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={{color:'#979797',fontSize:10}}>신청일 2017-08-19 13:30:21</Text>
                        </View>
                        <View style={{flex:0.4,alignItems:'flex-end'}}>
                            <Text style={{color:'#979797',fontSize:10}}>류* 농협 301************</Text>
                        </View>
                    </View>
                </View>

                <View style={SurveyFormStyle.contentsLayout3}>
                    <View style={{flex:1, flexDirection: 'row', paddingTop:10, paddingBottom:5}}>
                        <View style={{flex:0.4,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={{color:'#4D4D4D',fontSize:15,fontWeight: 'bold'}}>포인트 적립 내역</Text>
                        </View>
                        <View style={{flex:0.6,alignItems:'flex-end'}}>
                            <Image source={require("../../assets/img/up_arrow_img.png")} resizeMode={'contain'} style={{width:18, height:18}} />
                        </View>
                    </View>
                    <View style={SurveyFormStyle.lingBg}></View>

                    <View style={{flex:1, flexDirection: 'row', paddingTop:5, paddingBottom:5}}>
                        <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={SurveyFormStyle.contentsSize}><Text style={SurveyFormStyle.boldFont}>New</Text><Text style={{color:'#979797',fontSize:13}}>2017 맥주 브랜드에 관한 ... </Text></Text>
                        </View>
                        <View style={{flex:0.4,alignItems:'flex-end'}}>
                            <Text style={SurveyFormStyle.boldFont}>500P</Text>
                        </View>
                    </View>
                    <View style={{flex:1, flexDirection: 'row'}}>
                        <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={{color:'#979797',fontSize:10}}>적립일 2017-08-19 13:30:21</Text>
                        </View>
                        <View style={{flex:0.4,alignItems:'flex-end'}}>
                            <Text style={{color:'#979797',fontSize:10}}>3차</Text>
                        </View>
                    </View>
                    <View style={SurveyFormStyle.lingBg}></View>

                    <View style={{flex:1, flexDirection: 'row', paddingTop:5, paddingBottom:5}}>
                        <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={SurveyFormStyle.contentsSize}><Text style={{color:'#979797',fontSize:13}}>2017 맥주 브랜드에 관한 이미지 조사 </Text></Text>
                        </View>
                        <View style={{flex:0.4,alignItems:'flex-end'}}>
                            <Text style={SurveyFormStyle.boldFont}>300P</Text>
                        </View>
                    </View>
                    <View style={{flex:1, flexDirection: 'row'}}>
                        <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={{color:'#979797',fontSize:10}}>적립일 2017-08-19 13:30:21</Text>
                        </View>
                        <View style={{flex:0.4,alignItems:'flex-end'}}>
                            <Text style={{color:'#979797',fontSize:10}}>2차</Text>
                        </View>
                    </View>
                    <View style={SurveyFormStyle.lingBg}></View>
                    <View style={{flex:1, flexDirection: 'row', paddingTop:5, paddingBottom:5}}>
                        <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={SurveyFormStyle.contentsSize}><Text style={{color:'#979797',fontSize:13}}>2017 맥주 브랜드에 관한 조사 </Text></Text>
                        </View>
                        <View style={{flex:0.4,alignItems:'flex-end'}}>
                            <Text style={SurveyFormStyle.boldFont}>200P</Text>
                        </View>
                    </View>
                    <View style={{flex:1, flexDirection: 'row'}}>
                        <View style={{flex:0.6,alignItems:'flex-start',justifyContent:'center'}}>
                            <Text style={{color:'#979797',fontSize:10}}>적립일 2017-08-19 13:30:21</Text>
                        </View>
                        <View style={{flex:0.4,alignItems:'flex-end'}}>
                            <Text style={{color:'#979797',fontSize:10}}>1차</Text>
                        </View>
                    </View>
                    <View style={SurveyFormStyle.lingBg}></View>
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
    }
    ,contentsLayout2: {
        width: "100%"
        ,marginTop:10
        ,paddingTop:10
        ,paddingBottom:10
        ,paddingLeft:20
        ,paddingRight:20
        ,backgroundColor:"#fff"
    }
    ,inPointLayout: {
        width: "100%"
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

    ,boldFont_blue: {
        color:"#117eda"
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
        ,marginTop:15

    }

})