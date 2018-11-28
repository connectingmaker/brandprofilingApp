import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, StyleSheet, TouchableOpacity,AlertIOS,Alert,Platform,NativeModules,AsyncStorage } from 'react-native';
import {Container, Header, Body, Content, Footer, Item, Icon, Input, Button, Left, Right} from 'native-base';
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

    langContents() {
        if(this.state.languageLocale == "ko") {
            return (
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
                                    기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다. *한국의 경우만 해당합니다. </Text>
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

            );
        }

        if(this.state.languageLocale == "zh") {
            return (
                <Content style={{padding:10}}>
                    <View style={noticeFormStyle.contentsLayout}>
                        <View style={{paddingTop:5, paddingBottom:5}}>
                            <Text style={noticeFormStyle.title}>服务隐私政策</Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                "Perception"（以下简称“公司”）遵守与个人信息保护相关的所有法律和法规，包括“信息和通信网络利用和信息保护促进法”和“个人信息保护法”。
                                根据个人信息处理政策，公司保护用户的个人信息并遵守以下个人信息处理指南，以便用户可以放心地使用BrandProfiling服务。
                            </Text>

                            <Text style={noticeFormStyle.contentsSize2}>1.收集个人信息</Text>

                            <Text style={noticeFormStyle.contentsSize}>公司收集以下个人信息，用于会员，咨询和使用服务，并安排一个程序，用户可以选择就公司的个人信息政策或使用条款达成一致。 如果您选择“我同意”，公司会认为您同意收集个人信息。</Text>

                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>①收集的项目</Text>
                                <Text>•所需信息：姓名，出生日期，性别，身份证，密码，电子邮件地址，手机号码</Text>
                                <Text>•在移动设备上安装时必须提供：姓名，出生日期，性别，ID，密码，电子邮件地址，手机号码，终端型号，终端操作系统信息</Text>
                                <Text>•可选信息：婚姻状况，职业，银行账户信息</Text>
                            </Text>

                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>②在服务使用过程中，可以自动生成和收集以下信息。</Text>
                                <Text>•服务使用历史记录，错误的使用历史记录，IP地址，cookie，访问日期和时间</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>③收集方式：服务（会员注册，主页），电话，在线咨询</Text>
                            </Text>

                            <Text style={noticeFormStyle.contentsSize2}>2.收集和使用个人信息的目的</Text>

                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>本公司将收集的个人信息用于以下目的，并且不将用户提供的信息用于除以下目的之外的任何目的，并且在使用目的发生变更时将事先获得同意。</Text>
                            </Text>

                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>①实施服务提供和个人认证合同</Text>
                            </Text>

                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>②调查进度指南</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>③使用会员服务，防止非法使用不良会员，确认会员资格，年龄验证，投诉处理等确认身份</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>④用于营销和广告。 根据人口特征，访问频率的识别，活动和广告信息的提供以及参与机会提供服务和广告，关于会员服务利用的统计</Text>
                                <Text>•在电话和在线咨询期间可能会收集个人信息。</Text>
                                <Text>- 姓名，出生日期，性别，身份证，电子邮件地址，手机号码</Text>
                            </Text>

                            <Text style={noticeFormStyle.contentsSize2}>3.个人信息的保留和使用期限</Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>从会员登记之日起持有，使用用户的个人信息。</Text>
                                <Text>如果您要求撤销会员资格或撤回您对收集和使用您的个人信息的同意，我们将立即销毁所收集的信息。</Text>
                                <Text>但是，如果会员另有约定，我们将在我们同意的时间段内保留个人信息，或者：</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>①保存项目：姓名，出生日期，性别，调查费用（押金）支付历史</Text>
                                <Text>保存理由：货物和用品支付记录，电子商务中消费者保护法等。</Text>
                                <Text>保留期：5年</Text>
                            </Text>

                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>②身份验证记录</Text>
                                <Text>保护地：促进信息网络使用和信息保护等行为</Text>
                                <Text>保留期：6个月</Text>
                            </Text>

                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>③消费者投诉或纠纷的记录</Text>
                                <Text>保护地：电子商务中的消费者保护法</Text>
                                <Text>保留期：3年</Text>
                            </Text>

                            <Text style={noticeFormStyle.contentsSize2}>4.销毁个人信息的程序和方法</Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>原则上，在收集和使用个人信息的目的实现后，公司将立即销毁该信息。 破坏的程序和方法如下。</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>①销毁程序</Text>
                                <Text>•根据内部政策和其他相关法律法规（参见拥有和使用期限），在完成目的并存储一段时间后，为会员注册输入的信息将被转移到单独的数据库中。</Text>
                                <Text>•转移到单独数据库的个人信息不得用于法律规定以外的任何其他目的，除非法律规定。</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>②破坏方法</Text>
                                <Text>•使用无法重现记录的技术方法删除存储在电子文件中的个人信息。</Text>
                                <Text>•印在纸上的个人信息被破碎机压碎或被焚烧破坏。</Text>
                            </Text>

                            <Text style={noticeFormStyle.contentsSize2}>5.提供个人信息</Text>

                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>本公司仅在“2.收集和使用个人信息的目的”范围内使用用户的个人信息，未经用户事先同意不得使用或向外部披露用户的个人信息，除非 如下。</Text>
                            </Text>

                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>①如果用户事先同意向第三方提供个人信息</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>②按照法律法规的规定，当调查机构要求按照法案规定的程序和方法进行调查时</Text>
                            </Text>

                            <Text style={noticeFormStyle.contentsSize2}>6.寄售收集的个人信息</Text>

                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>①为了提供顺畅的服务，公司在支付积分储备时委托用户的个人信息处理职责。</Text>
                                <Text>•委托工作的内容：为回复调查的用户支付积分（现金等）</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>②公司获得用户关于委托个人信息处理业务的同意，然后向第三方（委托公司）提供个人信息以支付积分。</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>③公司管理和监督委托公司不违反相关法律法规。</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>④如果寄售服务或收货人的内容发生变化，我们将立即通过本个人信息处理政策予以披露。</Text>
                            </Text>

                            <Text style={noticeFormStyle.contentsSize2}>7.关于个人信息自动收集装置的安装，操作和拒收的事项</Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>①Cookies可用于提供基于PC的服务。</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>②公司通过分析用户的访问时间，访问时间和行为，使用cookies为个人提供个性化服务。</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>③用户可以选择安装cookies。 因此，用户可以接受cookies或拒绝将其存储在Web浏览器设置中。 </Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>④使用cookies的目的</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>•通过分析访问者的频率和非会员的访问频率和访问时间，识别用户的品味和兴趣，跟踪可追溯性，评估各种活动的参与程度和访问频率，提供有针对性的营销和个性化服务</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>•发送有针对性的广告来衡量您的广告效果</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>•您可以选择安装cookies。 因此，用户可以从Web浏览器中的选项设置或移动应用程序设置接受或拒绝cookies。</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text> 设置示例</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>1）对于Internet Explorer</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>Web浏览器顶部的“工具”菜单>“Internet选项”>“隐私”>“设置”</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>

                                <Text>2）对于Chrome</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>网络浏览器右侧的“设置”菜单>在屏幕底部显示高级设置>个人信息的内容设置按钮> Cookie</Text>
                            </Text>

                            <Text style={noticeFormStyle.contentsSize2}>8.个人信息的技术和行政措施</Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>公司已制定技术和管理措施，以确保用户提供的个人信息的安全，以防止任何损害，侵权，泄漏或更改。</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>①加密个人信息</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>②黑客和计算机病毒预防装置</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>③授予个人信息访问权限后，建立确认程序</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>④禁止混合管理个人数据和一般数据。</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>⑤为个人信息管理员和负责人进行个人信息保护培训</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>•ID和密码管理</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>由于用户的疏忽和基本互联网的风险，公司不对因用户ID和密码泄露引起的任何问题负责。 确保经常更改密码，并注意在登录时不要泄露个人信息。</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize2}> 9.个人信息公务员</Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>为了保护用户的个人信息并处理与个人信息有关的事项，公司指定了相关部门和个人信息管理负责人如下。</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>•个人信息管理部门：管理支持办公室</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>•个人信息管理负责人姓名：Lim Dong-won</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>•电话：02-541-7871</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>•电子邮件：eastflowlim@perception.co.kr</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>您可以将与使用公司服务产生的个人信息相关的所有投诉报告给个人信息管理负责人或主管部门。 如果您需要报告或咨询其他隐私侵权行为，请联系以下组织。*仅适用于韩国。</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>1.个人信息侵权报告中心 - http://privacy.kisa.or.kr（无118号）</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>2.个人信息争议解决委员会 - http://www.kopico.go.kr（无号码1833-6972）</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>3.最高检察官办公室网络调查部-http：//www.spo.go.kr(02-3480-3573）</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>4.国家警察局网络安全局-http：//cyberbureau.police.go.kr（无国家编号182）</Text>
                            </Text>

                            <Text style={noticeFormStyle.contentsSize2}> 10.个人信息处理政策的变更</Text>

                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>①本个人信息处理政策将于2017年12月26日起生效。</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>②在修改隐私政策时，公司将通过http://bp1.brandprofiling.co.kr/或移动应用程序的“通知”（或个人通知）通知您。</Text>
                            </Text>

                        </View>
                    </View>

                </Content>


            );
        }
        if(this.state.languageLocale == "en"){
            return(
                <Content style={{padding:10}}>
                    <View style={noticeFormStyle.contentsLayout}>
                        <View style={{paddingTop:5, paddingBottom:5}}>
                            <Text style={noticeFormStyle.title}>BrandProfiling Service Privacy Policy</Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                "Perception" (hereinafter referred to as "Company") complies with all laws and regulations related to personal information protection, including the Act on the Promotion of Information and Communication Network Utilization and Information Protection, and the Personal Information Protection Act.
                                In accordance with the Personal Information Processing Policy, the company protects the user's personal information and adheres to the following personal information processing guidelines so that users can use the BrandProfiling service with confidence.
                            </Text>

                            <Text style={noticeFormStyle.contentsSize2}>1. Collection of personal information</Text>

                            <Text style={noticeFormStyle.contentsSize}>The company collects the following personal information for members, consulting and use of the service, and arranges a program where the user can choose to agree on the company's personal information policy or terms of use. If you choose "I agree", the company will consider that you agree to collect personal information.</Text>

                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>① Collected information</Text>
                                <Text>• Information required: name, date of birth, gender, ID, password, email address, mobile phone number</Text>
                                <Text>• When installing on a mobile device, you must provide: name, date of birth, gender, ID, password, email address, mobile number, terminal model, terminal operating system information</Text>
                                <Text>• Optional information: marital status, occupation, bank account information</Text>
                            </Text>

                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>② The following information can be automatically generated and collected during the service use process.</Text>
                                <Text>• Service usage history, bad use history, IP ADDRESS, cookie, visit date and time</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>③ Collection method: Service (membership registration, homepage board), telephone, online consultation</Text>
                            </Text>

                            <Text style={noticeFormStyle.contentsSize2}>2. Purposes of collection and use of personal information</Text>

                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>The Company uses the collected personal information for the following purposes, and does not use the information provided by the user for any purpose other than the following purposes, and will receive prior consent when the purpose of use is changed.</Text>
                            </Text>

                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>① Implementation of contract on service provision and personal authentication</Text>
                            </Text>

                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>② Survey progress guide</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>③ Confirmation of identity by using membership service, prevention of illegal use of bad member, confirmation of membership, age verification, complaint handling, etc.</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>④ Use in marketing and advertising. Providing services and advertising according to demographic characteristics, identification of access frequency, provision of event and advertisement information and participation opportunity, statistics on member's service utilization</Text>
                                <Text>• Personal information may be collected during telephone and online consultations</Text>
                                <Text>- Name, date of birth, gender, ID, email address, mobile phone number</Text>
                            </Text>

                            <Text style={noticeFormStyle.contentsSize2}>3. Retention and use period of personal information</Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>We hold and use personal information of a user from the date of member registration.</Text>
                                <Text>If you request cancellation of membership or withdrawal of your consent to the collection and use of your personal information, we will immediately destroy the information collected.</Text>
                                <Text>However, we will retain personal information for the period of time that we have agreed to, if the member has agreed otherwise, or if:</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>① Preservation items: name, date of birth, sex, survey expenses (deposit) payment history</Text>
                                <Text>Preservation grounds: records on the payment of goods and supplies, laws on consumer protection in electronic commerce, etc.</Text>
                                <Text>Retention period: 5 years</Text>
                            </Text>

                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>② Record of identity verification</Text>
                                <Text>Conservation grounds: Act on promotion of information network use and information protection, etc.</Text>
                                <Text>Retention period: 6 months</Text>
                            </Text>

                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>③ Records of consumer complaints or disputes</Text>
                                <Text>Conservation grounds: Act on consumer protection in e-commerce</Text>
                                <Text>Retention period: 3 years</Text>
                            </Text>

                            <Text style={noticeFormStyle.contentsSize2}>4. Procedures and methods of destroying personal information</Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>In principle, after the purpose of collecting and using personal information is achieved, the company will immediately destroy the information. The procedure and method of destruction are as follows.</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>① Destruction procedure</Text>
                                <Text>• Information entered for membership registration is transferred to a separate DB after the purpose is accomplished and stored for a certain period of time according to the internal policy and other relevant laws and regulations (refer to the period of possession and use).</Text>
                                <Text>• Personal information transferred to a separate database is not used for any purpose other than those held by law unless it is provided for by law.</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>② Destruction method</Text>
                                <Text>• Personal information stored in an electronic file is deleted using a technical method that cannot reproduce the record.</Text>
                                <Text>• Personal information printed on paper is crushed by a crusher or destroyed by incineration.</Text>
                            </Text>

                            <Text style={noticeFormStyle.contentsSize2}>5. Providing Personal Information</Text>

                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>The Company shall use the personal information of the user only within the scope of "2. Purposes of collection and use of personal information" and shall not use it without prior consent of the user or disclose the user's personal information to the outside, except as follows.</Text>
                            </Text>

                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>① If the user has agreed in advance to provide the third party with personal information</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>② In accordance with the provisions of laws and ordinances, when there is a request from the investigation agency in accordance with the procedures and methods prescribed in the Act for the purpose of investigation</Text>
                            </Text>

                            <Text style={noticeFormStyle.contentsSize2}>6. Consignment of collected personal information</Text>

                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>① In order to provide smooth service, the company entrusts user's personal information processing duties when paying the point reserve.</Text>
                                <Text>• Contents of commissioned work: Payment of points (cash, etc.) for users who have responded to the survey</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>② The company obtains the consent of the user about the entrustment of the personal information processing business, and then provides personal information to a third party (entrusted company) to pay points.</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>③ The company manages and supervises the entrusted companies not to violate related laws and regulations.</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>④ If the contents of the consignment service or the consignee change, we will disclose it through this personal information processing policy without any delay.</Text>
                            </Text>

                            <Text style={noticeFormStyle.contentsSize2}>7. Matters concerning the installation, operation and rejection of the automatic collection device of personal information</Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>① Cookies may be used to provide PC-based services.</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>② The company uses cookies to provide personalized service to the individual by analyzing the user's access time, visit time, and behavior.</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>③ The user has the option to install cookies. As a result, the user can either accept cookies or refuse to store them in the web browser settings. </Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>④ Purpose of using cookies</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>• Provide targeted marketing and personalized services by analyzing the frequency of visitors and non-members' access frequency and time of visit, identifying user's taste and interests, tracking traceability, assessing the degree of participation in various events and visiting frequency</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>• Send targeted ads to measure your advertising effectiveness</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>• You have the option of installing cookies. As a result, the user can either accept or decline cookies from the options settings or mobile application settings in the web browser.</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>Example of setting</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>1) For Internet Explorer</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>Tools menu at the top of your web browser> Internet Options> Privacy> Settings</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>

                                <Text>2) For Chrome</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>Settings menu on the right side of the web browser> Show advanced settings at the bottom of the screen> Content setting button for personal information> Cookies</Text>
                            </Text>

                            <Text style={noticeFormStyle.contentsSize2}>8. Technical and administrative measures of personal information</Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>The Company has established technical and administrative measures to ensure the safety of the personal information provided by the users in order to prevent any damage, infringement, leakage or alteration.</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>① Encryption of personal information</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>② Hacking and computer virus prevention device</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>③ Establish a confirmation procedure after granting access to personal information</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>④ Mixed management of personal data and general data is prohibited</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>⑤ Conduct personal information protection training for personal information manager and person in charge</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>• ID and password management</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>The Company shall not be held responsible for any problems arising from the leakage of the user's ID and password due to the user's carelessness and the risk of the basic Internet. Make sure you change your password frequently and be careful not to leak personal information when you log in.</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize2}>9. Civil Service on Personal Information</Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>In order to protect the personal information of the user and to deal with matters related to the personal information, the Company has designated the related department and the person in charge of personal information management as follows.</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>• Personal Information Management Department: Management Support Office</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>• Person in Charge of Personal Information Management Name: Lim Dong-won</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>• Phone: 02-541-7871</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>• Email: eastflowlim@perception.co.kr</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>You can report all complaints related to the use of personal information generated by the company's services to the person in charge of personal information management or the competent authority. If you need to report or consult other privacy infringements, please contact the organization below. *Only available in Korea</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>1. Personal Information Infringement Reporting Center - http://privacy.kisa.or.kr (without the number 118)</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>2. Personal Information Dispute Settlement Committee - http://www.kopico.go.kr (without the number 1833-6972)</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>3. Cyber Investigation Department of Supreme Prosecutors' Office-http: //www.spo.go.kr (02-3480-3573)</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>4. National Police Agency Cyber Security Bureau -http: //cyberbureau.police.go.kr (without state number 182)</Text>
                            </Text>

                            <Text style={noticeFormStyle.contentsSize2}> 10. Change of personal information processing policy</Text>

                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>① This personal information processing policy will be effective from December 26, 2017.</Text>
                            </Text>
                            <Text style={noticeFormStyle.contentsSize}>
                                <Text>② When revising the privacy policy, the company will notify you through http://bp1.brandprofiling.co.kr/ or the "Notification" (or individual notice) of the mobile app.</Text>
                            </Text>

                        </View>
                    </View>

                </Content>


            );
        }

    }

    render() {

        return (

            <Container>

                <Header style={noticeFormStyle.headerLayout}>
                    <Left style={{flex:1}}>
                    <TouchableOpacity onPress={() => Actions.pop()} style={{width:50, height:50, justifyContent:'center', alignItems:'center'}}>
                        <View style={{flex:1,justifyContent: 'center', alignItems: 'flex-start'}}>
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
                    </TouchableOpacity>
                    </Left>
                    <Body>
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>

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
                    </Body>
                    <Right>
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    </View>
                    </Right>
                </Header>

                {this.langContents()}


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
