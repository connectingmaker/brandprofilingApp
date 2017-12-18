import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, StyleSheet, TouchableOpacity,AlertIOS,Alert,Platform } from 'react-native';
import { Container, Header, Body, Content, Footer,Item, Icon, Input,Button } from 'native-base';


export default class Privacy extends Component {


    render() {

        return (

            <Container>

                <Header style={noticeFormStyle.headerLayout}>
                    <View style={{flex:.1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize:12,color:'#fff'}} onPress={Actions.pop}>나가기</Text>
                    </View>
                    <View style={{flex:.8, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize:16,color:'#fff'}}>개인정보취급방침</Text>
                    </View>
                    <View style={{flex:.1, justifyContent: 'center', alignItems: 'center'}}>
                    </View>
                </Header>

                <Content style={{padding:10}}>
                    <View style={noticeFormStyle.contentsLayout}>
                        <View style={{paddingTop:5, paddingBottom:5}}>
                            <Text style={noticeFormStyle.title}>BrandProfiling 개인정보취급방침</Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                (주)퍼셉션 ('BrandProfiling')은(는)
                                개인정보보호법에 따라 이용자의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다.

                                BrandProfiling는 개인정보취급방침을 개정하는 경우 http://brandprofiling.co.kr/ 또는 모바일 앱의 ‘공지사항’(또는 개별공지)을 통하여 공지할 것입니다.

                                ○ 본 방침은 2017년 10월 1일부터 시행됩니다.
                            </Text>

                            <Text style={noticeFormStyle.contentsSize2}>제1조(개인정보의 수집 및 이용목적)</Text>

                            <Text style={noticeFormStyle.contentsSize}>BrandProfiling는 개인정보를 다음의 목적을 위해 처리합니다. 처리한 개인정보는 다음의 목적 이외의 용도로는 사용되지 않으며 이용 목적이 변경될 시에는 사전동의를 구할 예정입니다.</Text>

                            <Text style={noticeFormStyle.contentsSize}>
                                가. 홈페이지 회원가입 및 관리
                                회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별•인증, 회원자격 유지•관리, 제한적 본인확인제 시행에 따른 본인확인, 서비스 부정이용 방지, 각종 고지• 통지 등을 목적으로 개인정보를 처리합니다.
                            </Text>

                            <Text style={noticeFormStyle.contentsSize}>
                                나. 서비스 제공
                                서비스 제공, 콘텐츠 제공, 맞춤 서비스 제공을 목적으로 개인정보를 처리합니다.
                            </Text>

                            <Text style={noticeFormStyle.contentsSize2}>제2조(수집하는 개인정보 항목 및 수집방법)</Text>

                            <Text style={noticeFormStyle.contentsSize}>
                                가. BrandProfiling 이용자는 회원가입을 위해 다음의 정보를 입력해 주셔야 합니다.
                                - 입력항목 : 이메일, 핸드폰 번호, 비밀번호
                            </Text>

                            <Text style={noticeFormStyle.contentsSize}>
                                나. 또한 서비스 이용과정이나 처리 과정에서 아래와 같은 정보들이 생성되어 수집될 수 있습니다.
                                - 수집항목 : 성명, 성별, 출생연도, 거주지역, 월 평균 지출금액, 은행계좌 정보, 단말기 기종, 단말기 OS 정보
                            </Text>

                            <Text style={noticeFormStyle.contentsSize}>
                                다. 개인정보 수집에 대한 동의
                                BrandProfiling는 귀하께서 개인정보처리방침 및 이용약관의 내용에 대해「이용약관 동의」선택 상자와 「개인정보취급방침 동의」선택 상자에 체크할 수 있는 절차를 마련하여, 「이용약관 동의」선택 상자와 「개인정보취급방침 동의」선택 상자에 체크하면 개인정보 수집에 대해 동의한 것으로 봅니다.
                            </Text>

                            <Text style={noticeFormStyle.contentsSize2}> 제3조(개인정보의 처리 및 보유기간)</Text>

                                <Text style={noticeFormStyle.contentsSize}>
                                    가. BrandProfiling는 원칙적으로 제1조의 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 파기 시점은 다음과 같습니다.

                                    1)회원가입정보의 경우 : 회원 탈퇴할 때
                                    2)이벤트 등 일시적 목적을 위하여 수집한 경우 : 당해 이벤트 등이 종료한 때
                                </Text>

                                <Text style={noticeFormStyle.contentsSize}>
                                    나. 파기절차 및 방법
                                    회사는 수집된 개인정보를 안전하게 처리하며, 유출의 방지를 위하여 다음과 같은 방법으로 개인정보를 파기합니다.
                                    ① 용지에 기재된 개인정보는 소각하거나 파쇄기를 이용하여 파기한다.
                                    ② 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 영구 삭제한다.
                                </Text>

                            <Text style={noticeFormStyle.contentsSize2}>제4조(개인정보의 제3자 제공에 관한 사항)</Text>
                                <Text style={noticeFormStyle.contentsSize}>
                                    원칙적으로 회사는 이용자의 개인정보를 수집 및 이용목적에 한해서만 이용하며 타인 또는 타기업•기관에 공개하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.
                                    1)이용자들이 사전에 동의한 경우
                                    정보수집 또는 정보제공 이전에 이용자께 비즈니스 파트너가 누구인지, 어떤 정보가 왜 필요한지, 그리고 언제까지 어떻게 보호/관리되는지 알려드리고 동의를 구하는 절차를 거치게 되며, 이용자께서 동의하지 않는 경우에는 추가적인 정보를 수집하거나 비즈니스 파트너와 공유하지 않습니다.
                                    2)법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우
                                </Text>

                            <Text style={noticeFormStyle.contentsSize2}>제5조(개인정보 자동 수집 장치의 설치•운영 및 거부에 관한 사항)</Text>

                                <Text style={noticeFormStyle.contentsSize}>
                                    이용자 개개인에게 개인화되고 맞춤화된 서비스를 제공하기 위해서 회사는 이용자의 정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다.
                                    쿠키는 웹사이트를 운영하는데 이용되는 서버가 사용자의 브라우저에게 보내는 조그마한 데이터 꾸러미로 이용자 컴퓨터의 하드디스크에 저장됩니다.
                                    1)쿠키의 사용 목적
                                    회원과 비회원의 접속 빈도나 방문 시간 등의 분석, 이용자의 취향과 관심분야의 파악 및 자취 추적, 각종 이벤트 참여 정도 및 방문 회수 파악 등을 통한 개인 맞춤 서비스 제공
                                    2)쿠키 설정 거부 방법
                                    이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서, 이용자는 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다.
                                </Text>

                                <Text style={noticeFormStyle.contentsSize}>
                                    * 설정방법 예(인터넷 익스플로러의 경우)
                                    : 웹 브라우저 상단의 도구 > 인터넷 옵션 > 개인정보 (단, 쿠키 설치를 거부하였을 경우 로그인이 필요한 일부 서비스의 이용이 어려울 수 있습니다.)
                                </Text>

                            <Text style={noticeFormStyle.contentsSize2}> 제6조(개인정보의 기술적, 관리적 대책)</Text>

                                <Text style={noticeFormStyle.contentsSize}>
                                    BrandProfiling는 회원이 제공한 개인정보에 대하여 훼손, 침해, 누설, 변조 되지 않도록 하기 위한 안전성 확보를 위해서 기술적, 관리적 대책을 마련하고 있습니다
                                    1)기술적 대책
                                    - 해킹이나 컴퓨터 바이러스 방지 장치
                                    - 보안프로그램 설치
                                    - 개인정보에 대한 암호화
                                    - 기타 안전성 확보를 위한 기술적 장치
                                    2) 관리적 대책
                                    - 개인정보 접근 권한 부여 후 확인 절차 마련
                                    - 개인정보 데이터와 일반 데이터의 혼합관리 금지
                                    - 년 2회 직원대상 개인정보보호 교육 실시
                                    - 서버실 출입제한
                                </Text>

                            <Text style={noticeFormStyle.contentsSize2}> 제7조(이용자의 권리와 그 행사방법)</Text>
                                <Text style={noticeFormStyle.contentsSize}>
                                이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며 가입해지를 요청할 수도 있습니다.
                                이용자의 개인정보 조회•수정을 위해서는 '내 정보'의 '조회/수정'을 통하여 가능하며, 가입해지 시에는 ‘내 정보'의 '해지신청'버튼을 클릭하여 본인 확인 절차를 거치신 후 직접 열람, 정정 또는 탈퇴가 가능합니다. 혹은 개인정보 보호책임자에게 서면, 전화 또는 이메일로 연락하시면 지체 없이 조치하겠습니다.

                                이용자가 개인정보의 오류에 대한 정정을 요청하신 경우에는 정정을 완료하기 전까지 당해 개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된 개인정보를 제3자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체 없이 통지하여 정정이 이루어지도록 하겠습니다.
                                BrandProfiling는 이용자의 요청에 의해 해지 또는 삭제된 개인정보는 "BrandProfiling가 수집하는 개인정보의 보유 및 이용기간"에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.
                                </Text>

                            <Text style={noticeFormStyle.contentsSize2}>제8조(개인정보 침해 방지를 위한 선언)</Text>
                                <Text style={noticeFormStyle.contentsSize}>
                                BrandProfiling의 개인정보관련 취급자들은 위 사항을 준수하면서 다음과 같이 선언합니다.
                                    (1)이용자의 동의 없는 개인정보를 수집하지 않습니다.
                                    (2)과도한 개인정보를 수집하지 않습니다.
                                    (3)고지, 명시한 범위를 초과하는 목적 외 이용 또는 제3자에게 제공을 하지 않습니다.
                                    (4)개인정보에 대한 훼손, 침해, 누설 행위를 하지 않습니다.
                                    (5)개인정보에 대한 동의 철회, 열람, 정정 요구에 불응하는 행위를 하지 않습니다.
                                    (6)타인의 개인정보를 훼손, 침해, 도용하지 않습니다.
                                    (7)개인정보를 수집, 제공 받은 목적 달성 후에도 보관하는 행위를 하지 않습니다.
                                </Text>

                            <Text style={noticeFormStyle.contentsSize2}> 제9조(개인정보 보호 책임자)</Text>
                                <Text style={noticeFormStyle.contentsSize}>
                                BrandProfiling는 개인정보보호를 위해서 항상 노력을 하고 있으며, 책임자와 담당부서를 지정하여 회원 여러분의 의견을 청취하고 민원 사항을 처리하고 있습니다.

                                    <Text> 가. 개인정보 보호 책임자</Text>.
                                    <Text> 성명 : 임동원</Text>
                                    <Text> 직책 : 경영지원실장</Text>
                                    <Text>연락처 : eastflowlim@perception.co.kr | 82-10-6338-8464</Text>

                                    <Text> 나. 개인정보 보호 담당부서</Text>
                                    <Text>부서명 : 경영지원팀</Text>
                                    <Text> 담당자 : 임동원</Text>
                                    <Text>연락처 : eastflowlim@perception.co.kr | 82-10-6338-8464</Text>
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
