import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, StyleSheet, TouchableOpacity,AlertIOS,Alert,Platform,NativeModules,AsyncStorage } from 'react-native';
import { Container, Header, Body, Content, Footer,Item, Icon, Input,Button } from 'native-base';
import renderIf from 'render-if';
import I18n from 'react-native-i18n';
import config from '../../src/config';


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

export default class Privacy extends Component {
    constructor(){
        super();
        this.state ={
            languageLocale : "ko"
        }
    }


    componentDidMount(){

        this.loadJSONData();
    }

    loadJSONData() {


        AsyncStorage.getItem(config.STORE_KEY).then((value) => {
            var json = eval("("+value+")");
            var lang = json.lang;
            this.setState({languageLocale :lang});
            I18n.locale = lang;
            I18n.fallbacks = true;

        }).then(res => {

        });

    }

    render() {

        return (

            <Container>

                <Header style={noticeFormStyle.headerLayout}>
                    <View style={{flex:.1, justifyContent: 'center', alignItems: 'center'}}>
                        {renderIf(this.state.languageLocale=="ko")(
                            <Text style={{fontSize:12,color:'#fff'}}>나가기</Text>
                        )}
                        {renderIf(this.state.languageLocale=="en")(
                            <Text style={{fontSize:12,color:'#fff'}}>Leave</Text>
                        )}
                        {renderIf(this.state.languageLocale=="zh")(
                            <Text style={{fontSize:12,color:'#fff'}}>退出</Text>
                        )}
                    </View>
                    <View style={{flex:.8, justifyContent: 'center', alignItems: 'center'}}>

                        {renderIf(this.state.languageLocale=="ko")(
                            <Text style={{fontSize:16,color:'#fff'}}>개인정보취급방침</Text>
                        )}
                        {renderIf(this.state.languageLocale=="en")(
                            <Text style={{fontSize:16,color:'#fff'}}>Privacy Policy</Text>
                        )}
                        {renderIf(this.state.languageLocale=="zh")(
                            <Text style={{fontSize:16,color:'#fff'}}>服务隐私政策</Text>
                        )}
                    </View>
                    <View style={{flex:.1, justifyContent: 'center', alignItems: 'center'}}>
                    </View>
                </Header>

                <Content style={{padding:10}}>
                    <View style={noticeFormStyle.contentsLayout}>
                        <View style={{paddingTop:5, paddingBottom:5}}>
                            <Text style={noticeFormStyle.title}>(주)퍼셉션 BrandProfiling 서비스 개인정보처리방침</Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                (주)퍼셉션(이하 ‘회사’라 한다)는 “정보통신망 이용촉진 및 정보보호 등에 관한 법률” 및 “개인정보보호법”을 비롯한 모든 개인정보보호 관련 법령을 준수하고 있습니다.
                                회사는 개인정보처리방침에 따라 이용자의 개인정보를 보호하고, 이용자가 안심하고 BrandProfiling 서비스를 이용할 수 있도록 다음과 같이 개인정보 처리지침을 준수하고 있습니다.
                            </Text>

                            <Text style={noticeFormStyle.contentsSize2}>1. 개인정보의 수집</Text>

                            <Text style={noticeFormStyle.contentsSize}>회사는 회원가입, 상담, 서비스 이용 등을 위해 아래와 같은 개인정보를 수집하고 있으며, 이용자가 회사의 개인정보 취급방침 또는 이용약관의 내용에 대해 ‘동의함’을 선택할 수 있는 절차를 마련하여 '동의함'을 선택하면 개인정보 수집에 동의한 것으로 봅니다. </Text>

                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>① 수집 항목</Text>
                                <Text>• 필수항목: 이름, 생년월일, 성별, 아이디, 비밀번호, 이메일 주소, 이동전화번호</Text>
                                <Text>• 모바일기기 설치 시 필수항목: 이름, 생년월일, 성별, 아이디, 비밀번호, 이메일 주소, 이동전화번호, 단말기 기종, 단말기 OS 정보</Text>
                                <Text>• 선택항목: 결혼여부, 직업, 은행계좌 정보</Text>
                            </Text>

                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>② 서비스 이용과정에서 아래와 같은 정보들이 자동으로 생성되어 수집될 수 있습니다.</Text>
                                <Text>• 서비스 이용 기록, 불량 이용 기록, IP ADDRESS, 쿠키, 방문 일시</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>③ 수집 방법 : 서비스(회원가입, 홈페이지 게시판) 및 전화, 온라인 상담</Text>
                            </Text>

                            <Text style={noticeFormStyle.contentsSize2}>2. 개인정보의 수집 및 이용목적 </Text>

                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>회사는 수집한 개인정보를 다음의 목적을 위해 활용하며, 이용자가 제공한 정보를 다음의 용도 이외로는 사용하지 않으며, 이용 목적이 변경될 시에는 사전 동의를 받을 것입니다.</Text>
                            </Text>

                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>① 서비스 제공에 관한 계약 이행 및 본인인증 등</Text>
                            </Text>

                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>② 설문조사 진행 안내</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>③ 회원제 서비스 이용에 따른 본인확인, 불량회원의 부정 이용 방지, 가입 의사 확인, 연령확인, 불만처리 등 민원처리, 고지사항 전달</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text> ④ 마케팅 및 광고에 활용. 인구통계학적 특성에 따른 서비스 제공 및 광고 게재, 접속 빈도 파악, 이벤트 및 광고성 정보 제공 및 참여기회 제공, 회원의 서비스 이용에 대한 통계</Text>
                                <Text>• 전화 및 온라인 상담과정에서 개인정보가 수집될 수 있습니다.</Text>
                                <Text>- 성명, 생년월일, 성별, 아이디, 이메일 주소, 이동전화번호</Text>
                            </Text>

                            <Text style={noticeFormStyle.contentsSize2}> 3. 개인정보의 보유 및 이용기간</Text>
                                <Text style={noticeFormStyle.contentsSize}>
                                    <Text>회원 가입일로부터 이용자의 개인정보를 보유하고 이용합니다.</Text>
                                    <Text> 회원 탈퇴를 요청하거나 개인정보의 수집 및 이용에 대한 동의를 철회하는 경우, 수집 및 이용목적이 달성된 후에는 지체 없이 해당 정보를 파기합니다.</Text>
                                    <Text>단, 회원의 별도 동의를 받은 경우 또는 아래와 같은 경우 약속한 기간 동안 개인정보를 보유합니다.</Text>
                                </Text>
                                <Text style={noticeFormStyle.contentsSize}>
                                    <Text>① 보존항목: 이름, 생년월일, 성별, 조사사례비(적립금) 지급 내역</Text>
                                    <Text>보존근거: 대금결제 및 재화 등의 공급에 관한 기록, 전자상거래 등에서의 소비자보호에 관한 법률</Text>
                                    <Text>보존기간: 5년</Text>
                                </Text>

                                <Text style={noticeFormStyle.contentsSize}>
                                    <Text>② 본인확인에 관한 기록</Text>
                                    <Text>보존근거: 정보통신망 이용촉진 및 정보보호 등에 관한 법률</Text>
                                    <Text>보존기간: 6개월</Text>
                                </Text>

                                <Text style={noticeFormStyle.contentsSize}>
                                    <Text>③ 소비자 불만 또는 분쟁처리에 관한 기록</Text>
                                    <Text>보존근거: 전자상거래 등에서의 소비자보호에 관한 법률</Text>
                                    <Text>보존기간: 3년</Text>
                                </Text>

                            <Text style={noticeFormStyle.contentsSize2}>4. 개인정보의 파기절차 및 방법 </Text>
                                <Text style={noticeFormStyle.contentsSize}>
                                    <Text>회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 파기절차 및 방법은 다음과 같습니다.</Text>
                                </Text>
                                <Text style={noticeFormStyle.contentsSize}>
                                    <Text>① 파기절차</Text>
                                    <Text>• 회원가입 등을 위해 입력한 정보는 목적이 달성된 후 별도의 DB로 옮겨져 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라(보유 및 이용 기간 참조) 일정 기간 저장된 후 파기됩니다.</Text>
                                    <Text> •별도 DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 보유되는 이외의 다른 목적으로 이용되지 않습니다.</Text>
                                </Text>
                                <Text style={noticeFormStyle.contentsSize}>
                                    <Text>② 파기방법</Text>
                                    <Text> •전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.</Text>
                                    <Text>•종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.</Text>
                                </Text>

                            <Text style={noticeFormStyle.contentsSize2}>5. 개인정보의 제공 </Text>

                                <Text style={noticeFormStyle.contentsSize}>
                                    <Text>회사는 이용자의 개인정보를 "2. 개인정보의 수집 및 이용목적"에서 고지한 범위 내에서만 사용하며, 이용자의 사전 동의 없이 이용하거나 이용자의 개인정보를 외부에 공개하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.</Text>
                                </Text>

                                <Text style={noticeFormStyle.contentsSize}>
                                    <Text>① 이용자가 개인정보의 제3자 제공에 대해 사전 동의한 경우</Text>
                                </Text>
                                <Text style={noticeFormStyle.contentsSize}>
                                    <Text>② 법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</Text>
                                </Text>

                            <Text style={noticeFormStyle.contentsSize2}> 6. 수집한 개인정보의 위탁 </Text>

                                <Text style={noticeFormStyle.contentsSize}>
                                    <Text>① 회사는 원활한 서비스 제공을 위하여 포인트 적립금 지급 시 이용자의 개인정보 처리업무를 위탁합니다.</Text>
                                    <Text>•위탁하는 업무의 내용 : 설문조사에 응한 이용자 대상 포인트 적립금(현금 등) 지급</Text>
                                </Text>
                                <Text style={noticeFormStyle.contentsSize}>
                                    <Text>② 회사는 개인정보 처리업무의 위탁에 대해 이용자의 동의를 얻은 후에 개인정보를 제3자(위탁받는 업체)에 제공하여 포인트 적립금을 지급하고 있습니다.</Text>
                                </Text>
                                <Text style={noticeFormStyle.contentsSize}>
                                    <Text>③ 회사는 위탁받는 업체가 관계 법령을 위반하지 않도록 관리·감독하고 있습니다.</Text>
                                </Text>
                                <Text style={noticeFormStyle.contentsSize}>
                                    <Text>④ 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체 없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다. </Text>
                                </Text>

                            <Text style={noticeFormStyle.contentsSize2}> 7. 개인정보 자동수집 장치의 설치, 운영 및 그 거부에 관한 사항</Text>
                                <Text style={noticeFormStyle.contentsSize}>
                                    <Text>① PC 기반 서비스의 제공을 위하여 쿠키를 이용하는 경우가 있습니다.</Text>
                                </Text>
                                <Text style={noticeFormStyle.contentsSize}>
                                    <Text>② 회사는 이용자의 접속이나 방문시간, 행동 등을 분석하여 개인에게 맞춤화된 서비스를 제공하기 위해 쿠키를 사용합니다. </Text>
                                </Text>
                                <Text style={noticeFormStyle.contentsSize}>
                                    <Text>③ 이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서 이용자는 웹 브라우저 설정에서 쿠키를 허용하거나 저장을 거부할 수 있습니다. </Text>
                                </Text>
                                <Text style={noticeFormStyle.contentsSize}>
                                    <Text>④ 쿠키 사용 목적</Text>
                                </Text>
                                <Text style={noticeFormStyle.contentsSize}>
                                    <Text>•회원과 비회원의 접속 빈도나 방문 시간 등을 분석, 이용자의 취향과 관심 분야를 파악 및 자취 추적, 각종 이벤트 참여 정도 및 방문 횟수 파악 등을 통한 타겟 마케팅 및 개인 맞춤 서비스 제공</Text>
                                </Text>
                                <Text style={noticeFormStyle.contentsSize}>
                                        <Text>•광고 효과 측정을 목적으로 하여, 타겟 광고를 발송</Text>
                                </Text>
                                <Text style={noticeFormStyle.contentsSize}>
                                        <Text> •이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서, 이용자는 웹 브라우저에서 옵션 설정 또는 모바일 애플리케이션의 설정에서 쿠키를 허용하거나 저장을 거부할 수 있습니다.</Text>
                                </Text>
                                <Text style={noticeFormStyle.contentsSize}>
                                        <Text> 설정 방법의 예</Text>
                                </Text>
                                <Text style={noticeFormStyle.contentsSize}>
                                        <Text> 1) Internet Explorer의 경우</Text>
                                </Text>
                                <Text style={noticeFormStyle.contentsSize}>
                                        <Text> 웹 브라우저 상단의 도구 메뉴 > 인터넷 옵션 > 개인정보 > 설정</Text>
                                </Text>
                                <Text style={noticeFormStyle.contentsSize}>

                                        <Text> 2) Chrome의 경우</Text>
                                </Text>
                                <Text style={noticeFormStyle.contentsSize}>
                                        <Text>웹 브라우저 우측의 설정 메뉴 > 화면 하단의 고급 설정 표시 > 개인정보의 콘텐츠 설정 버튼 > 쿠키</Text>
                                </Text>

                            <Text style={noticeFormStyle.contentsSize2}>8. 개인정보의 기술적, 관리적 대책</Text>
                                <Text style={noticeFormStyle.contentsSize}>
                                    <Text>회사는 이용자가 제공한 개인정보에 대하여 훼손, 침해, 누설, 변조 되지 않도록 하기 위한 안전성 확보를 위해서 기술적, 관리적 대책을 마련하고 있습니다.</Text>
                                </Text>
                                    <Text style={noticeFormStyle.contentsSize}>
                                        <Text>① 개인정보에 대한 암호화</Text>
                                    </Text>
                                    <Text style={noticeFormStyle.contentsSize}>
                                        <Text>② 해킹이나 컴퓨터 바이러스 방지 장치</Text>
                                    </Text>
                                    <Text style={noticeFormStyle.contentsSize}>
                                        <Text>③ 개인정보 접근 권한 부여 후 확인 절차 마련</Text>
                                    </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                    <Text>④ 개인정보 데이터와 일반 데이터의 혼합관리 금지</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                    <Text>⑤ 개인정보관리책임자 및 담당자 대상 개인정보보호 교육 실시</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                    <Text>• 아이디와 비밀번호 관리</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                    <Text>회사는 이용자의 부주의로 아이디, 비밀번호가 유출되어 발생한 문제와 기본적인 인터넷의 위험성으로 일어나는 일들에 대해 책임을 지지 않습니다.    비밀번호를 자주 변경하며 로그인 시 개인정보가 유출되지 않도록 각별한 주의를 기울여 주시기 바랍니다.</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize2}> 9. 개인정보에 관한 민원서비스</Text>
                                <Text style={noticeFormStyle.contentsSize}>
                                    <Text>회사는 이용자의 개인정보를 보호하고 개인정보와 관련한 사항을 처리하기 위하여 아래와 같이 관련 부서 및 개인정보관리책임자를 지정하고 있습니다.</Text>
                                </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>•개인정보관리부서 : 경영지원실</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>•개인정보관리책임자 성명 : 임동원</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>•전화 : 02-541-7871</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>•이메일 : eastflowlim@perception.co.kr</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>이용자는 회사의 서비스를 이용하며 발생하는 모든 개인정보보호 관련 민원을 개인정보관리책임자 혹은 담당 부서로 신고하실 수 있습니다.
                                    기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다. </Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>1. 개인정보침해신고센터- http://privacy.kisa.or.kr (국번 없이 118)</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>2. 개인정보 분쟁조정위원회-http://www.kopico.go.kr(국번없이 1833-6972)</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>3. 대검찰청 사이버수사과-http://www.spo.go.kr (02-3480-3573)</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>4. 경찰청 사이버안전국-http://cyberbureau.police.go.kr (국번 없이 182)</Text>
                            </Text>

                            <Text style={noticeFormStyle.contentsSize2}> 10. 개인정보 처리방침 변경</Text>

                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>① 이 개인정보 처리방침은 2017년 12월 26일 부터 적용됩니다.</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                    <Text>② 회사는 개인정보취급방침을 개정하는 경우 http://brandprofiling.co.kr/
                                        또는 모바일 앱의 ‘공지사항’(또는 개별공지)을 통하여 공지할 것입니다.</Text>
                            </Text>

                        </View>
                    </View>

                </Content>


            </Container>
        );
    }
}



const noticeFormStyle = StyleSheet.create({
    headerLayout: {
        justifyContent: 'center', alignItems: 'center', backgroundColor: "#222222"
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
        ,marginBottom:20
        ,backgroundColor:"#fff"
        ,shadowColor: "rgba(0,0,0,23)"
        ,shadowOffset: { width: 0, height: 1 }
        ,shadowOpacity: 0.3
    }

    ,contentsSize: {
        fontSize:11
        ,lineHeight:25
    }
    ,contentsSize2: {
        fontSize:11
        ,lineHeight:25
        ,paddingTop:10
        ,fontWeight:'bold'
    }
    ,boldFont: {
        color:"#DA4211"
        ,fontWeight: 'bold'
    }
    ,title: {
        fontSize:15
        ,fontWeight: 'bold'
        ,paddingTop:5
        ,paddingBottom:5
    }
    ,subtitle: {
        fontSize:15
        ,fontWeight: 'bold'
        ,paddingTop:20
        ,paddingBottom:5
    }

    ,lingBg: {
        backgroundColor:"rgba(127,127,127,0.3)"
        ,height:1
        ,marginTop:10
        ,marginBottom:10

    }


})
