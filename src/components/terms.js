import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, StyleSheet, TouchableOpacity,AlertIOS,Alert,Platform,NativeModules,AsyncStorage } from 'react-native';
import {Container, Header, Body, Content, Footer, Item, Icon, Input, Button, Left, Right} from 'native-base';
import I18n from 'react-native-i18n';
import config from '../../src/config';
import renderIf from 'render-if'

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

export default class Terms extends Component {
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
            this.setState({languageLocale : lang});
            I18n.locale = lang;
            I18n.fallbacks = true;

        }).then(res => {

        });

    }

    langContents() {
        if(this.state.languageLocale == "ko") {
            return (
                <Content style={{padding:10}}>
                    <View style={TermsFormStyle.contentsLayout}>
                        <View style={{paddingTop:5, paddingBottom:5}}>
                            <Text style={TermsFormStyle.title}><Text style={TermsFormStyle.boldFont}>Brand Profiling</Text> 이용약관</Text>

                            <Text style={TermsFormStyle.subtitle}> 제 1장 총칙</Text>

                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>제1조 목적</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>본 약관은 (주)퍼셉션(이하 "회사"라 한다)과 회원 가입자(이하 ‘회원’이라고 하며, 본 약관에 동의하고 회원등록을 완료한 이용자)간의 서비스(이하 ‘서비스’라고 하며, 오프라인 및 접속 가능한 각종 유무선 단말기를 통한 온라인을 포함, 회사가 제공하는 모든 ‘서비스’를 의미) 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</Text>
                           </Text>
                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>제2조 효력의 발생 및 변경</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>(1) 약관은 회원에게 온라인을 통하여 공시함으로써 효력을 발생합니다.</Text>
                                <Text>(2) 회사는 약관의 규제에 관한 법률, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 관계 법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.</Text>
                                <Text>(3) 회사가 약관을 개정할 경우에는 적용 일자 및 개정사유를 상당한 기간 해당 공지하여야 합니다.</Text>
                                <Text>(4) 회원은 변경된 약관에 대해 거부할 권리가 있습니다. 회원은 변경된 약관이 공지된 뒤 7일 이내에 거부 의사를 표명할 수 있으며, 회원이 거부하는 경우 회사는 7일의 기간을 정하여 회원에게 사전 통지 후 당해 회원과의 계약을 해지할 수 있습니다. 만약, 회원이 거부 의사를 표시하지 않고 서비스를 계속 이용하는 경우에는 변경된 약관에 동의하는 것으로 간주합니다.</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>제3조 약관 외 준칙</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>이 약관에 명시되지 않은 사항은 관계 법령의 규정에 따릅니다.</Text>
                            </Text>


                            <Text style={TermsFormStyle.subtitle}> 제 2장 회원가입과 서비스이용</Text>
                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>제4조 회원계약의 성립</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>(1) 이용계약은 가입자의 약관내용에 대한 동의와 가입자의 이용 신청에 대한 회사의 이용승낙으로 성립됩니다.</Text>
                                <Text>(2) 회사는 가입 신청자가 이용계약을 신청한 시점에서 본 약관의 내용을 수락했다고 간주하며, 회사는 이용계약 신청에 대하여 필요한 절차 등을 거친 뒤 이를 승낙할 수 있습니다. 다만, 회사는 신청자가 다음 각 호에 해당하는 경우, 해당 회원계약 신청을 승낙하지 않을 수도 있습니다.</Text>
                                <Text> ① 실명이 아니거나 타인의 명의를 이용한 경우</Text>
                                <Text> ② 가입신청서의 내용을 허위로 기재하여 가입신청을 하는 경우</Text>
                                <Text>③ 기재한 정보를 타인이 이용하거나 확인이 되지 않는 경우</Text>
                                <Text> ④ 만 14세 미만의 아동이 법정대리인의 동의를 얻지 못한 경우</Text>
                                <Text> ⑤ 서비스 관련 설비의 여유가 없거나, 기술상 또는 업무상 문제가 있는 경우</Text>
                                <Text> ⑥ 제4장 제9조 의하여 회사가 계약을 해지했던 회원이 다시 회원 신청을 하는 경우</Text>
                                <Text>(3) 개인 위치정보서비스는 위치정보를 이용할 수 있는 통신단말 장치의 소유자 본인이어야 이용할 수 있습니다.</Text>
                                <Text>(4) 회사가 전항을 승낙한 시점에서 회원계약이 성립됩니다.</Text>

                            </Text>

                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>제5조 서비스 이용 및 변경</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>(1) 본 서비스는 회사의 업무상 또는 기술상 특별한 지장이 없는 한, 원칙적으로 하루 24시간 운영합니다.</Text>
                                <Text>(2) 본 서비스는 만 14세 이상인 분에 한하여 이용할 수 있습니다. 만 14세 미만인 경우에는 부모님이나 기타 법정대리인의 동의가 있어야만 본 서비스를 이용할 수 있습니다.</Text>
                                <Text>(3) 회사는 타당한 이유가 있는 경우에 운영상, 기술상의 필요에 따라 제공하고 있는 전부 또는 일부 서비스를 변경할 수 있습니다.
                                    서비스의 내용, 이용방법, 이용시간에 대하여 변경이 있는 경우에는 변경사유, 변경될 서비스의 내용 및 제공 일자 등은 사전 또는 사후에 이를 공지할 수 있습니다.</Text>
                                <Text>(4) 일부 서비스 이용 시 적합하지 않다고 인정된 회원은 조사 참여에 제한을 받을 수 있습니다.</Text>
                                <Text>(5) 회사가 제공하는 서비스의 일부 또는 전부를 회사의 정책 및 운영의 필요 상 수정, 중단, 변경할 수 있으며, 이에 대하여 관련법에 특별한 규정이 없는 한 회원에게 별도의 보상을 하지 않습니다.</Text>
                            </Text>


                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>제6조 지적재산권</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>조사를 통하여 습득한 모든 정보에 대한 지적재산권은 회사 및 조사 의뢰사에 있으며, 아래와 같이 사용한 경우 이용 계약을 해지하고 법적 불이익을 받을 수 있습니다.</Text>
                                <Text> (1) 조사 내용과 관련하여 회사의 허락 없이 조사 화면을 저장하거나 복사하여 유포한 경우</Text>
                                <Text> (2) 조사와 관련한 내용을 정리하여 제3자에게 발설하고, 관련 자료를 제공한 경우</Text>
                                <Text>※ 부정경쟁방지 및 영업비밀보호에 관한 법률 (약칭: 부정경쟁방지법)</Text>
                                <Text> 부정한 이익을 얻거나 영업비밀 보유자에게 손해를 입힐 목적으로 그 영업비밀을 취득ㆍ사용하거나 제3자에게 누설한 자는 5년 이하의 징역 또는 5천만원 이하의 벌금에 처한다. 다만, 벌금형에 처하는 경우 위반행위로 인한 재산상 이득액의 10배에 해당하는 금액이 5천만원을 초과하면 그 재산상 이득액의 2배 이상 10배 이하의 벌금에 처한다 (제18조 2항)</Text>
                            </Text>

                            <Text style={TermsFormStyle.subtitle}> 제 3장 의무 및 권리</Text>
                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>제7조 회사의 의무</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>(1) 회사는 본 약관의 규정에 따라 계속적, 안정적으로 서비스를 제공합니다.</Text>
                                <Text>(2) 회사는 회원에게 등록된 전자적 전송 매체를 통해 조사 참여를 요청하는 메일, 문자 등을 전송할 수 있습니다.</Text>
                                <Text>(3) 회사는 회원의 개인 정보를 본인의 승낙 없이 타인에게 누설, 배포하지 않으며, 이를 보호하기 위해 노력합니다. 회원의 개인정보보호에 관한 기타 사항은 정보통신망법 및 회사가 별도로 정한 "개인정보취급방침"에 따릅니다.</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>제8조 회원의 의무</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>(1) 회원은 사용자 아이디 및 비밀번호에 관하여 모든 관리 책임이 있습니다. 회사는 회원 계정, 사용자 이름 및 비밀번호를 제3자(가족 등도 포함한 사람을 지칭합니다)가 이용 또는 변경함으로써 해당 회원이 입은 손해에 대하여 해당 회원의 고의, 과실 유무에 상관없이 어떠한 책임도 지지 않습니다.</Text>
                                <Text>(2) 회원은 회사에 등록한 내용 중 변경된 사항이 있는 경우, 즉시 회사에 변경 신고를 해야 합니다.</Text>
                                <Text>(3) 회원은 회사가 실시하는 조사에 성실한 자세로 정확하게 응답하여야 하며 설문항목에 허위사실에 근거하여 응답하지 않아야 합니다.</Text>
                                <Text>(4) 회원은 회사가 실시하는 조사에 대한 사항(예: 고객 회사명, 조사종류, 조사내용, 조사기법, 조사결과, 위와 관련한 사진과 동영상 등)을 제3자에게 제공 또는 유출하거나 SNS, 블로그, 카페 등 인터넷 상에 게재하지 않아야 합니다.</Text>
                                <Text>(5) 회원은 본 약관 및 관계 법령이 규정하는 사항을 준수해야 합니다.</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>제4장 서비스의 이용제한,해지 및 종료</Text>
                            </Text>

                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>제9조 서비스 이용제한 및 계약 해지</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>회원은 본 서비스를 이용하여 아래에 열거한 행위를 하는 것을 금지하며, 다음 각 호에 해당하는 사실이 발생했을 경우 사전 통지 또는 통지 없이 이용 계약을 해지하거나 기간을 정하여 서비스 이용을 중지할 수 있습니다.
                                </Text>
                            </Text>


                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>(1) 공공질서 및 사회적 통념에 반하는 행위</Text>
                                <Text>(2) 사회적 공익을 저해할 목적을 갖고 서비스이용을 계획 또는 실행하는 행위</Text>
                                <Text>(3) 법률, 조례, 기타 법규를 위반하는 행위</Text>
                                <Text>(4) 협박, 중상, 외설, 추문, 선동적인 소재를 게재하는 행위</Text>
                                <Text>(5) 다른 회원 또는 제3자의 명예를 훼손하거나 불이익을 주는 행위</Text>
                                <Text>(6) 조사업무를 방해하는 행위</Text>
                                <Text>(7) 광고메일 또는 컴퓨터바이러스를 발송하는 행위</Text>
                                <Text> (8) 타인의 명예를 손상시키거나 불이익을 주는 행위</Text>
                                <Text>(9) 같은 사람이 중복으로 가입하거나 다른 실명으로 이중 가입을 하는 행위</Text>
                                <Text>(10) 조사내용, 로그, 상표, 기타 본 서비스와 관련한 정보를 제3자에게 개시, 누설하는 행위</Text>
                                <Text>(11) 계정, 비밀번호를 도용하는 행위</Text>
                                <Text>(12) 조사에 3회 이상 불성실하게 응답한 행위</Text>
                                <Text> (13) 회원 계정을 매매 또는 대여하는 행위</Text>
                                <Text>(14) 포인트를 매매하는 행위</Text>
                                <Text>(15) 저작권 보호자료를 게재하는 행위</Text>
                                <Text>(16) 개인정보에 기재된 우편, 전자메일, 전화 등 모든 연락방법을 이용해도 연락을 취할 수 없는 경우</Text>
                                <Text>(17) 기타 관련 법령이나 회사가 정한 이용조건에 위배되는 행위</Text>
                                <Text>(18) 위의 각호 이외에 회사가 해당 회원의 이용을 시급히 제한할 필요가 있다고 판단한 경우</Text>
                                <Text>회사가 전항에 기재된 조치를 취함으로써 해당 회원이 본 서비스를 이용하지 못하여 이로 인해 손해가 발생하더라도 회사는 책임을 지지 않습니다.</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>제10조 회원의 권리 및 책임</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>(1) 회원은 언제든지 본 약관에 대한 동의를 철회하고, 제11조에 규정된 절차에 따라 회원계약을 해지할 수 있습니다.</Text>
                                <Text>(2) 회원은 언제든지 자신의 개인정보에 대한 열람을 요구할 수 있으며, 자신의 개인정보에 오류가 있는 경우, 이를 정정하도록 요구할 수 있습니다.</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>제11조 해지</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>회원이 회원계약을 해지할 때는 회원 본인이 회사가 규정한 탈퇴절차를 통하여 해지신청을 해야 합니다. 회사는 법령 등의 규정에 따라 이를 처리합니다. 또한, 회사는 서비스 운영 원칙에 따라 일정 기간 재가입을 제한할 수 있습니다.

                                </Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>제제12조 서비스의 일시적 중단</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>회사는 아래의 열거한 사유에 해당하는 경우, 회원에게 사전 연락 없이 일시적으로 본 서비스를 중단할 수 있습니다. 이 경우 회사는 회원 또는 제3자가 본 서비스의 중단으로 인해 입게 된 손해에 대하여 어떠한 책임도 지지 않습니다.
                                </Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>(1) 본 서비스 시스템을 정기적 또는 긴급 보수, 점검, 수리, 변경하는 경우</Text>
                                <Text>(2) 화재, 정전 등으로 본 서비스를 제공하지 못하게 된 경우</Text>
                                <Text>(3) 지진, 분화, 홍수, 지진해일 등 천재지변으로 본 서비스를 제공할 수 없게 된 경우</Text>
                                <Text>(4) 전쟁, 변란, 폭동, 소란, 노동쟁의 등으로 본 서비스를 제공할 수 없게 된 경우</Text>
                                <Text> (5) 기타 운용적 또는 기술적으로 회사가 본 서비스를 일시적으로 중단할 필요가 있다고 판단한 경우</Text>
                            </Text>

                            <Text style={TermsFormStyle.subtitle}> 제5장 포인트</Text>
                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>제13조 포인트</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>(1) 회원이 조사에 참여하거나 기타 소정의 활동을 한 경우에 회사는 이에 대하여 포인트를 적립해 드립니다. 포인트의 적립 기간, 적립방법, 적립수, 금액 등에 대해서는 회사의 판단에 따라 별도 규정합니다.</Text>
                                <Text>(2) 회사는 회원 본인의 포인트 적립금 내역을 공지합니다.</Text>
                                <Text>(3) 회원은 포인트 적립금이 1만원 이상 되었을 때, 1만원 단위로 본인 통장으로 자동이체를 신청할 수 있습니다.</Text>
                                <Text>(4) 회사는 다음의 경우에는 적립금을 지급하지 않습니다.</Text>
                                <Text>① 실명정보가 타인이나 허위인 것으로 판명되었을 경우</Text>
                                <Text> ② 타인이 적립금을 신청한 경우</Text>
                                <Text> ③ 회원 본인 명의의 계좌가 아니거나 개인정보로 등록된 이메일, 이동전화번호가 아닌 경우</Text>
                                <Text> ④ 회원의 정보가 불명확한 경우</Text>
                                <Text>⑤ 개인정보처리방침에서 명시하고 있는 개인정보 필수항목이 누락된 경우</Text>
                                <Text> ⑥ 지급일 기준 회원 자격이 유지되지 않은 경우</Text>
                                <Text>(5) 회원이 획득한 포인트에서 발생하는 세금, 계좌이체에 소요되는 수수료는 회사가 부담합니다.</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>제14조 포인트의 소멸</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>(1) 사용자가 허위, 부정 또는 오래된 정보를 제공한 경우에는 회사의 판단 하에 포인트의 적립 또는 소유한 포인트를 취소, 몰수할 수 있습니다.</Text>
                                <Text>(2) 회원이 포인트를 획득하고 6개월 이상 활동하지 않을 경우 (조사 참가, 사이트 로그인 등이 이루어지지 않거나 3회 이상 연속적으로 메일이 도착하지 않는 경우가 지속되는 상태를 말합니다)에는 소멸됩니다.</Text>
                                <Text>(3) 회원이 획득한 포인트는 회원자격의 상실과 동시에 소멸되며 재적립되지 않습니다.</Text>
                                <Text>(4) 회원 포인트 적립금의 유효기간은 조사참여일 기준 3년입니다.</Text>
                                <Text>(5) 본 서비스가 종료되면 획득한 포인트도 동시에 소멸됩니다. 다만, 회사는 회원이 획득한 포인트를 보상금과 교환할 수 있는 기간을 설정할 수 있습니다.</Text>
                            </Text>

                            <Text style={TermsFormStyle.subtitle}> 제6장 기타</Text>
                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>제15조 책임제한</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>(1) 콘텐츠 이용을 포함한 본 서비스 이용은 회원 본인의 책임 하에 이루어집니다.</Text>
                                <Text>(2) 본 서비스 및 모든 콘텐츠는 현상 유지된 상태 및 제공이 가능한 한도 내에서 제공하며, 이에 대한 내용 및 수준을 보장하지는 않습니다.</Text>
                                <Text>(3) 회사는 본 서비스 이용에 관련하여 개인정보 보호방침이 규정하는 내용에 대응하지 않는 사항에 대해서는 손해가 발생하더라도 책임을 지지 않습니다.</Text>
                                <Text>(4) 본 서비스를 통해 회원 간에 주고받은 정보 및 그에 따라 이루어진 행위에 대하여 회사는 책임지지 않습니다.</Text>
                                <Text>(5) 회사는 본 서비스를 이용해 발생한 회원의 모든 손해에 대하여 회사의 고의 또는 중과실에 의한 경우를 제외하고 어떠한 책임도 해당 손해배상 의무도 갖지 않습니다.</Text>
                                <Text>(6) 포인트 서비스 제휴 사이트에 관하여 회사는 해당 사이트에 대한 안정성, 정확성, 적법성, 목적 적합성 등에 관하여 보증도 책임도 지지 않습니다.</Text>
                                <Text>(7) 회사가 회원이 등록 또는 게재한 정보를 삭제해 해당 회원의 회원자격 정지ㆍ말소로 인해 본 서비스가 정지, 중단, 중지 등이 된 경우, 회사는 이유 여하를 불문하고 일체의 손해배상 의무를 지지 않습니다.</Text>
                                <Text>(8) 회사가 설정한 포인트, 포인트의 종류, 내용 및 포인트 수 등에 대하여 회사는 언제든지 신규 설정, 변경 또는 종료할 수 있습니다.</Text>
                                <Text>(9) 적립금으로 교환한 포인트의 분실 및 도난에 대하여 회사는 일체의 책임을 지지 않습니다.</Text>
                                <Text>(10) 적립금으로 교환한 포인트를 이용하지 못한 경우, 해당 적립금에 상당하는 포인트를 회원의 포인트 잔액으로 환불하거나 다른 적립금으로 변경할 수 없습니다. 회사는 이용하지 않은 적립금에 대해 보상의 책임을 지지 않습니다.</Text>
                                <Text>(11) 적립금의 배송 중 또는 송금 중에 발생한 지연, 분실, 도난, 손해, 파손 등의 사고에 대하여, 회사는 회사의 귀책사유로 인한 경우를 제외하고 일체의 책임을 지지 않습니다. 이 경우, 회사는 그에 대한 재발송, 재발행, 환불 또는 회원의 포인트 잔액으로 포인트 환급 등을 행하지 않습니다.</Text>
                                <Text>(12) 회원의 등록정보 미비 등의 원인으로 회사의 연락 및 적립금 등의 도착 지연, 배송오류가 발생한 경우에는, 회사의 귀책사유로 인한 경우를 제외하고 회사는 회원 앞으로 통상적으로 배송이 완료될 시기에 도착한 것으로 간주하며, 이로 인하여 회원에게 불이익이 발생하더라도 회사는 책임을 지지 않습니다.</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>제16조 지적 재산권 등의 귀속</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>회원은 사용자 콘텐츠를 제공함과 동시에 저작권 등에 대하여 사용료의 발생 불가, 비독점적, 영속적, 취소불능, 완전하게 서브라이센스할 수 있는 권리(해당 회원의 개별 승인 및 해당 회원에게 보상할 필요 없이 회사가 전 세계의 모든 매체상에서 사용자 콘텐츠를 사용, 복제, 수정, 변경, 발표, 번역 또는 파생저작권을 제작, 발신, 실행, 게시할 수 있는 권리를 포함)를 회사 및 관계회사에 대하여 제공했다고 간주합니다.
                                </Text>
                            </Text>

                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>제17조 관할법원</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>본 약관에 관한 소송의 관할법원은 (주)퍼셉션의 소재지를 관할하는 법원으로 합니다.
                                </Text>
                            </Text>

                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>부칙</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>본 약관은 <Text style={TermsFormStyle.boldFont}> 2017년 12월 26일</Text>부터 적용됩니다.</Text>
                            </Text>


                        </View>
                    </View>

                </Content>
            );
        }

        if(this.state.languageLocale == "zh") {
            return (
                <Content style={{padding:10}}>
                    <View style={TermsFormStyle.contentsLayout}>
                        <View style={{paddingTop:5, paddingBottom:5}}>
                            <Text style={TermsFormStyle.title}><Text style={TermsFormStyle.boldFont}>Brand Profiling</Text> 使用条款</Text>

                            <Text style={TermsFormStyle.subtitle}>第1章一般规定</Text>

                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>第1条目的</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>本协议旨在定义Perception及其成员在使用服务方面的权利，义务和责任。 会员是加入此应用程序并同意使用条款的人。</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>第二条效力的产生和变化</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>（1）条款和条件在通过网络向会员披露后生效。</Text>
                                <Text>（2）公司可以在不违反相关法律法规的前提下修改本条款和条件，如“条款管理法”，“信息促进法”，“通信网络利用法”和“信息保护法”。</Text>
                                <Text>（3）当公司修改本条款时，公司应在相当长的一段时间内通知适用的修改日期和原因。</Text>
                                <Text>（4）会员有权拒绝更改的条款。 会员可在通知变更协议后7天内表示有意拒绝变更。 如果会员拒绝，公司可以在预先通知会员7天后终止与会员的合同。 如果该成员继续使用该服务而未表达其拒绝的意图，则他/她同意更改的条款。</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>第3条外部条款和条件</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>本条款和条件中未规定的事项应受相关法律法规的管辖。</Text>
                            </Text>


                            <Text style={TermsFormStyle.subtitle}>第2章成员资格和服务使用</Text>
                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>第四条会员合同的设立</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>（1）使用合同应在订户条款和条件的同意下并经公司同意使用订户时确定。</Text>
                                <Text>（2）本公司认为申请人在申请人提交合同时已接受本协议的条款，公司可在合同适用的必要程序后批准申请。 但是，如果申请人属于以下任何一项，公司可能不接受会员申请。</Text>
                                <Text>①如果它不是真名或使用某人的名字</Text>
                                <Text>②如果您填写申请表的内容为虚假申请会员资格</Text>
                                <Text>③如果所列信息未被他人使用或确认</Text>
                                <Text>④如果14岁以下的儿童未能获得法定代表人的同意</Text>
                                <Text>⑤如果没有与服务相关的设施的空间，或者存在技术或业务问题</Text>
                                <Text>⑥如果根据第4章第9条终止合同的会员再次申请会员资格</Text>
                                <Text>（3）个人位置信息服务必须是可以使用位置信息的通信终端设备的所有者。</Text>
                                <Text>（4）公司同意前款规定的成员合同。</Text>

                            </Text>

                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>第5条服务使用和变更</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>（1）通常，该服务每天24小时运营，除非公司的业务或技术存在特殊障碍。</Text>
                                <Text>（2）此服务适用于14岁及以上的人士。 如果您未满14岁，您只能在父母或其他法律代表的同意下使用此服务。</Text>
                                <Text>（3）如有充分理由，公司可以更改为其运营和技术需求提供的全部或部分服务。 如果服务的内容，使用或使用时间有任何变化，则可以提前或之后宣布改变的原因，要改变的服务的内容和服务日期。</Text>
                                <Text>（4）被发现不适合某些服务的会员可能被限制参加调查。</Text>
                                <Text>（5）公司提供的任何部分或全部服务可根据公司的政策和运营要求进行修改，暂停或修改，除非相关部门有特殊规定，否则不得对会员进行赔偿。法律。</Text>
                            </Text>


                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>第6条知识产权</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>通过调查获得的所有信息的知识产权属于Perception和委托的客户，如果您使用以下，您可以终止使用合同并在法律上处于劣势。</Text>
                                <Text>（1）如果未经公司许可而对调查内容保存或复制调查屏幕</Text>
                                <Text>（2）如果将与调查有关的内容汇总并披露给第三方并提供相关材料</Text>
                                <Text>※防止不正当竞争和商业秘密保护法（缩写：不正当竞争预防法）</Text>
                                <Text>获取或使用商业秘密或者向第三方披露以获取不公平利润或损害商业秘密所有人的人，应处以不超过5年的监禁或不超过50的罚款。 百万韩元。 但是，在罚款的情况下，如果相当于违法所得财产收益金额的10倍以上的金额超过5000万韩元，则应处以2倍以上10倍以上的罚款金额。 财产（第18（2）条）</Text>
                            </Text>

                            <Text style={TermsFormStyle.subtitle}>第三章义务和权利</Text>
                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>第7条公司的义务</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>（1）公司应继续按照本协议的规定提供服务。</Text>
                                <Text>（2）公司可以通过在会员注册的电子传输媒体发送请求参与调查的电子邮件，文本等。</Text>
                                <Text>（3）公司未经其同意不向他人披露或分发会员的个人信息，并努力予以保护。 与保护会员个人信息有关的其他事项应受信息网络法和公司制定的“隐私政策”的约束。</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>第8条会员义务</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>（1）会员对用户ID和密码负全部行政责任。 对于会员因第三方（包括家庭成员）使用或更改会员帐户，用户名和密码而导致的任何损害，本公司概不负责，无论会员的意图或过失如何。</Text>
                            <Text>（2）会员必须立即通知公司公司注册内容的任何变更。</Text>
                            <Text>（3）会员必须以诚实的态度准确回应公司的调查，不得以虚假事实回应调查项目。</Text>
                            <Text>（4）会员应向第三方提供或披露公司进行的调查的详细信息（如客户公司名称，调查类型，调查内容，调查技术，调查结果，博客，咖啡馆等）。</Text>
                            <Text>（5）会员必须遵守这些条款和条件的规定。</Text>
                        </Text>
                        <Text style={TermsFormStyle.contentsSize2}>
                            <Text>第4章使用，终止和终止服务的限制</Text>
                        </Text>

                        <Text style={TermsFormStyle.contentsSize2}>
                            <Text>第9条使用服务和终止合同的限制</Text>
                        </Text>
                        <Text style={TermsFormStyle.contentsSize}>
                            <Text>使用此服务，会员禁止从事以下任何活动。 如果出现以下任何情况，用户可以终止服务合同或终止服务，恕不另行通知或通知。                                </Text>
                        </Text>


                        <Text style={TermsFormStyle.contentsSize}>
                            <Text>（1）违反公共秩序和社会奇迹</Text>
                            <Text>（2）为破坏社会公共利益而计划或实施服务的使用</Text>
                            <Text>（3）违反法律，法令或其他法律的行为</Text>
                            <Text>（4）采取恐吓，诽谤，淫秽，丑闻，煽动性材料</Text>
                            <Text>（5）诽谤或不利于其他成员或第三方。</Text>
                            <Text>（6）干扰调查服务</Text>
                            <Text>（7）发送广告邮件或计算机病毒</Text>
                            <Text>（8）损害或损害他人的荣誉</Text>
                            <Text>（9）同一人以副本或双重成员加入另一名称</Text>
                            <Text>（10）向第三方发布或披露与此服务相关的调查，徽标，商标或其他信息的内容。</Text>
                            <Text>（11）窃取账号和密码</Text>
                            <Text>（12）以不忠实的方式对调查作出三次以上回应的行为</Text>
                            <Text>（13）购买或借出会员账户</Text>
                            <Text>（14）出售积分的行为</Text>
                            <Text>（15）发布受版权保护的材料</Text>
                            <Text>（16）即使公司使用邮件，电子邮件，电话等所有通信方式，也未能联系会员。</Text>
                            <Text>（17）任何违反公司规定的其他适用法律或使用条件的行为。</Text>
                            <Text>（18）如果公司确定除上述各项外，有必要限制会员的使用，公司应采取前款规定的措施。 对于因会员未能使用本服务而造成的任何损害，本公司概不负责。</Text>
                        </Text>
                        <Text style={TermsFormStyle.contentsSize2}>
                            <Text>第10条成员的权利和责任</Text>
                        </Text>
                        <Text style={TermsFormStyle.contentsSize}>
                            <Text>（1）会员可随时撤销对本条款的同意，并按照第11条规定的程序终止会员协议。</Text>
                            <Text>（2）会员可以随时要求访问其个人信息，并可能要求更正其个人信息中的任何错误。</Text>
                        </Text>
                        <Text style={TermsFormStyle.contentsSize2}>
                            <Text>第11条终止</Text>
                        </Text>
                        <Text style={TermsFormStyle.contentsSize}>
                            <Text>会员取消会员合同时，会员本人必须通过公司规定的提款程序申请终止。 公司应当依照法律法规进行处理。 此外，公司可能会根据服务运营原则限制重新进入一段时间。

                            </Text>
                        </Text>
                        <Text style={TermsFormStyle.contentsSize2}>
                            <Text>第12条暂停服务</Text>
                        </Text>
                        <Text style={TermsFormStyle.contentsSize}>
                            <Text>如果原因属于下列原因，公司可以在不事先通知会员的情况下暂停服务。 在这种情况下，公司对因服务中断而导致的会员或第三方损失不承担任何责任。</Text>
                        </Text>
                        <Text style={TermsFormStyle.contentsSize}>
                            <Text>（1）对本服务系统进行定期或紧急维修，检查，维修或修改。</Text>
                            <Text>（2）因火灾，停电等原因未能提供此项服务。</Text>
                            <Text>（3）如果由于地震，火山爆发，洪水，海啸等自然灾害而无法提供服务。</Text>
                            <Text>（4）如因战争，骚乱，骚乱，动乱，劳资纠纷等原因无法提供服务。</Text>
                            <Text>（5）公司被要求暂时停止服务的任何其他运营或技术决策。</Text>
                        </Text>

                        <Text style={TermsFormStyle.subtitle}> 第五章点</Text>
                        <Text style={TermsFormStyle.contentsSize2}>
                            <Text>第13条点</Text>
                        </Text>
                        <Text style={TermsFormStyle.contentsSize}>
                            <Text>（1）如果会员参加调查或其他规定的活动，会员将获得积分。 积分的累积时间，收入的方法，积分的数量和金额由公司自行决定。</Text>
                            <Text>（2）公司公布会员自己的积分储备历史。</Text>
                            <Text>（3）当积分超过10,000韩元时，会员可以申请自动转账到他/她的银行存折10,000韩元。</Text>
                            <Text>（4）在下列情况下，公司不会支付准备金。</Text>
                            <Text>①当发现姓名信息是他人或虚假时</Text>
                            <Text>②当别人申请储备金时</Text>
                            <Text>③如果不是会员姓名的帐号，或者不是注册为个人信息的电子邮件或手机号码</Text>
                            <Text>④如果会员的信息不清楚</Text>
                            <Text>⑤如果缺少个人信息处理政策要求的个人信息</Text>
                            <Text>⑥如果在付款之日不保留会员身份</Text>
                            <Text>⑦在韩国境外使用本服务时</Text>
                            <Text>（5）公司应承担会员所赚取的积分以及转帐费用。</Text>
                        </Text>
                        <Text style={TermsFormStyle.contentsSize2}>
                            <Text>第14条终止雇佣关系</Text>
                        </Text>
                        <Text style={TermsFormStyle.contentsSize}>
                            <Text>（1）如果用户提供虚假，欺诈或过时的信息，公司可以取消或没收由公司酌情决定累积或拥有的积分。</Text>
                            <Text>（2）如果会员已获得积分并且活动时间超过6个月（即，如果用户未参与调查，则登录该网站，或者如果该电子邮件未连续到达超过3个 时间），积分将到期。</Text>
                            <Text>（3）会员赚取的积分将在失去会员资格的同时到期，不会重新入账。</Text>
                            <Text>（4）截至调查参与日期，会员积分储备有效期为3年。</Text>
                            <Text>（5）当服务终止时，获得的积分也将同时到期。 但是，公司可以建立一个期限，在此期间，会员可以获得积分以获得补偿。</Text>
                        </Text>

                        <Text style={TermsFormStyle.subtitle}>第六章其他</Text>
                        <Text style={TermsFormStyle.contentsSize2}>
                            <Text>第15条责任限制</Text>
                        </Text>
                        <Text style={TermsFormStyle.contentsSize}>
                            <Text>（1）使用此服务，包括使用内容，由会员自行负责。</Text>
                            <Text>（2）服务和所有内容均在维护和可用性范围内提供。 我们不保证其内容和级别。</Text>
                            <Text>（3）对于与使用服务有关的隐私政策所提供内容不符的损害，公司不承担任何责任。</Text>
                            <Text>（4）公司不对通过本服务的成员之间交换的任何信息以及为响应此类信息而采取的任何行动负责。</Text>
                            <Text>（5）除非本公司故意或重大过失，否则公司没有义务赔偿使用本服务的会员所造成的任何损害。</Text>
                            <Text>（6）关于点服务关联网站公司不保证也不对相关网站的稳定性，准确性，合法性，目的适用性承担责任。</Text>
                            <Text>（7）如果由于公司删除了会员注册或发布的信息而停止，暂停或终止本服务，公司不对任何损害承担责任。</Text>
                            <Text>（8）公司可随时设定，更改或终止公司设定的积分，积分类型，积分数和积分数。</Text>
                            <Text>（9）公司对交换保留的丢失或被盗积分不承担责任。</Text>
                            <Text>（10）如果您不能使用兑换储备金的积分，您不能将与储备金相对应的积分退还给会员的积分余额或将其更改为其他储备金。 公司不负责未使用储备的补偿。</Text>
                            <Text>（11）除公司业务外，公司对交付或汇款等延误，丢失，被盗，损坏或破损等事故概不负责。 在这种情况下，公司不得为会员的积分余额重新发行，退款或补偿积分。</Text>
                            <Text>（12）因公司缺乏注册信息而导致公司交付延迟或错误的情况除外，公司存在过错的原因除外。 对于会员的任何不利条件，公司不承担任何责任。</Text>
                        </Text>
                        <Text style={TermsFormStyle.contentsSize2}>
                            <Text>第16条知识产权的归属</Text>
                        </Text>
                        <Text style={TermsFormStyle.contentsSize}>
                            <Text>公司假定如果会员提供用户内容，会员已向本公司及其关联公司提供以非独占，非排他性，永久性，不可撤销和完全从属许可权使用版权的权利。 从属许可证是指在世界任何媒体上使用，复制，修改，更改，发布，翻译或创建用户内容的衍生作品，或传输或发布用户内容，而无需成员的个人批准和成员的补偿。</Text>
                        </Text>

                        <Text style={TermsFormStyle.contentsSize2}>
                            <Text>第17条主管法院</Text>
                        </Text>
                        <Text style={TermsFormStyle.contentsSize}>
                            <Text>与本协议有关的诉讼的有管辖权的法院应是对Perception所在地具有管辖权的法院。</Text>
                        </Text>

                        <Text style={TermsFormStyle.contentsSize2}>
                            <Text>附录</Text>
                        </Text>
                        <Text style={TermsFormStyle.contentsSize}>
                            <Text><Text style={TermsFormStyle.boldFont}>这些条款将于2017年12月26日生效。</Text></Text>
                        </Text>


                    </View>
                </View>

            </Content>

            );
        }
        if(this.state.languageLocale == "en"){
           return(
            <Content style={{padding:10}}>
            <View style={TermsFormStyle.contentsLayout}>
            <View style={{paddingTop:5, paddingBottom:5}}>
            <Text style={TermsFormStyle.title}><Text style={TermsFormStyle.boldFont}>Brand Profiling</Text> Terms of use</Text>

            <Text style={TermsFormStyle.subtitle}> Chapter 1  General Provisions</Text>

            <Text style={TermsFormStyle.contentsSize2}>
            <Text>Article 1  Purpose</Text>
            </Text>
            <Text style={TermsFormStyle.contentsSize}>
            <Text>This agreement is intended to define the rights, obligations and responsibilities of Perception(Hereinafter referred to as "Company") and its members regarding the use of the services. Members are the ones who join this app and agree to the Terms of use.</Text>
            </Text>
            <Text style={TermsFormStyle.contentsSize2}>
            <Text>Article 2 Generation and change of effect</Text>
            </Text>
            <Text style={TermsFormStyle.contentsSize}>
            <Text>(1) Terms of use shall be effective upon disclosure to members through online.</Text>
            <Text>(2) The Company may revise these Terms of use to the extent that it does not violate the relevant laws and regulations, such as the Act on Regulation of Terms, Promotion of Information and Communication Network Utilization and Information Protection.</Text>
            <Text>(3) When the Company revises the Terms, the Company shall notify the applicable date and reason for the revision for a considerable period of time.</Text>
            <Text>(4) Members have the right to refuse the changed terms. The member may express his intention to refuse the change within 7 days after notification of the changed agreement. If the member refuses, the company may terminate the contract with the member after preliminary notice to the member by setting a period of 7 days. If the member continues to use the service without expressing his intention to refuse, he or she agrees to the changed terms.</Text>
            </Text>
            <Text style={TermsFormStyle.contentsSize2}>
            <Text>Article 3 Outside Terms of use</Text>
            </Text>
            <Text style={TermsFormStyle.contentsSize}>
            <Text>The matters not specified in these Terms of use shall be governed by the relevant laws and regulations.</Text>
            </Text>


            <Text style={TermsFormStyle.subtitle}> Chapter 2 Membership and Service Usage</Text>
            <Text style={TermsFormStyle.contentsSize2}>
            <Text>Article 4 Establishment of Membership Contract</Text>
            </Text>
            <Text style={TermsFormStyle.contentsSize}>
            <Text>(1) The contract of use shall be established with the consent of the subscriber's Terms of Use and with the consent of the company to use the subscriber.</Text>
            <Text>(2) The Company considers that the applicant has accepted the terms of this Agreement at the time the applicant submits the contract, and the Company may approve the application after the necessary procedures for the application of the contract. However, if the applicant falls under any of the following subparagraphs, the Company may not accept the application for membership.</Text>
            <Text> ① If it is not a real name or uses someone's name</Text>
            <Text> ② If you apply for membership by filling in the contents of the application form as false</Text>
            <Text>③ If the information listed is not used or confirmed by others</Text>
            <Text> ④ If a child under 14 years of age can not obtain the consent of the legal representative</Text>
            <Text> ⑤ If there is no room for service-related facilities, or if there is a technical or business problem</Text>
            <Text> ⑥ If the member who has terminated the contract by Chapter 4 Article 9, applies for membership again</Text>
            <Text>(3) The personal location information service must be the owner of the communication terminal device that can use the location information.</Text>
            <Text>(4) A member contract is established when the company agrees to the preceding paragraph.</Text>

            </Text>

            <Text style={TermsFormStyle.contentsSize2}>
            <Text>Article 5 Service Use and Change</Text>
            </Text>
            <Text style={TermsFormStyle.contentsSize}>
            <Text>(1) As a rule, this service operates 24 hours a day, unless there is a special obstacle in business or technology of the company.</Text>
            <Text>(2) This service is available for persons aged 14 and over. If you are under the age of 14, you may only use this service with the consent of your parents or other legal representative.</Text>
            <Text>(3) The Company may change all or some of the services provided for its operational and technological needs, if there are good reasons. If there is any change in the content, usage, or usage time of the service, the reason for the change, the content of the service to be changed, and the date of service may be announced in advance or after.</Text>
            <Text>(4) Members who are found not to be suitable for some services may be restricted from participating in the survey.</Text>
            <Text>(5) Any part or all of the services provided by the Company may be amended, suspended or modified in accordance with the policy and operation requirements of the Company, and no compensation shall be made to the members unless there are special regulations in the relevant laws.</Text>
            </Text>


            <Text style={TermsFormStyle.contentsSize2}>
            <Text>Article 6 Intellectual Property Rights</Text>
            </Text>
            <Text style={TermsFormStyle.contentsSize}>
            <Text>The intellectual property rights of all the information acquired through the investigation are in Perception and the clients who commission, and if you use the following, you may terminate the use contract and get a legal disadvantage.</Text>
            <Text> (1) In case the survey screen is saved or copied without permission of the company in relation to the contents of investigation</Text>
            <Text> (2) If the contents related to the investigation are summarized and disclosed to a third party and provided with related materials</Text>
            <Text>※ Act on Prevention of Unfair Competition and Protection of Trade Secret (abbreviation: Unfair Competition Prevention Act)</Text>
            <Text> A person who obtains or uses the trade secret or discloses it to a third party for the purpose of obtaining unfair profits or damages the owner of the trade secret shall be liable to imprisonment for not more than 5 years or a fine of not more than 50 million won. However, in the case of a fine, if the amount equivalent to 10 times the amount of the property gain due to the violation is more than 50 million won, it shall be fined more than 2 times and 10 times the amount of the benefit of the property (Article 18 (2))</Text>
            </Text>

            <Text style={TermsFormStyle.subtitle}> Chapter 3 Obligations and Rights</Text>
            <Text style={TermsFormStyle.contentsSize2}>
            <Text>Article 7 Obligations of the Company</Text>
            </Text>
            <Text style={TermsFormStyle.contentsSize}>
            <Text>(1) The Company shall continue to provide services in accordance with the provisions of this Agreement.</Text>
            <Text>(2) The Company may transmit e-mails, texts, etc. requesting to participate in the survey through the electronic transmission medium registered with the member.</Text>
            <Text>(3) The Company does not disclose or distribute the personal information of members to others without their consent and strives to protect them. Other matters related to the protection of members' personal information shall be governed by the Information Network Law and the "Privacy Policy" set by the Company.</Text>
            </Text>
            <Text style={TermsFormStyle.contentsSize2}>
            <Text>Article 8 Membership Obligations</Text>
            </Text>
            <Text style={TermsFormStyle.contentsSize}>
            <Text>(1) Members have all administrative responsibility for user ID and password. The Company shall not be liable for any damages incurred by the member by using or changing the member account, user name and password by a third party (including a family member) regardless of the member's intention or fault.</Text>
            <Text>(2) The member must notify the company immediately of any change in the registered contents of the company. </Text>
            <Text>(3) The member must respond accurately to the survey conducted by the company in a sincere manner and shall not respond to the survey items based on false facts. </Text>
            <Text>(4) A member shall provide or disclose to the third party the details of the survey conducted by the company (eg, customer company name, type of survey, investigation contents, survey technique, survey results, Blogs, cafes, etc. </Text>
            <Text>(5) Members are required to comply with the provisions of these Terms of Use. </Text>
            </Text>
            <Text style={TermsFormStyle.contentsSize2}>
            <Text>Chapter 4 Restrictions on use, termination and an end of services </Text>
            </Text>

            <Text style={TermsFormStyle.contentsSize2}>
            <Text>Article 9 Restrictions on Use of Services and Termination of Contracts </Text>
            </Text>
            <Text style={TermsFormStyle.contentsSize}>
            <Text>By using this service, members are prohibited from doing any of the following activities. In the event of any of the following, the user may terminate the service contract or terminate the service without notice or notice.</Text>
            </Text>


            <Text style={TermsFormStyle.contentsSize}>
            <Text>(1) Act against public order and social wonders </Text>
            <Text>(2) to plan or implement the use of the service for the purpose of undermining social public interest </Text>
            <Text>(3) Acts that violate laws, ordinances or other laws </Text>
            <Text>(4) Acting on intimidation, slander, obscenity, scandal, inflammatory material </Text>
            <Text>(5) To defame or disadvantage other members or third parties. </Text>
            <Text>(6) Interfering with the investigation service </Text>
            <Text>(7) Sending advertising mail or computer viruses </Text>
            <Text>(8) To impair or disadvantage others' honor </Text>
            <Text>(9) The same person joins as a duplicate or a dual member with another name </Text>
            <Text>(10) Launching or disclosing the contents of investigation, logo, trademark, or other information related to this service to a third party</Text>
            <Text>(11) Stealing accounts and passwords </Text>
            <Text>(12) Acts that responded to the investigation more than three times in an unfaithful manner </Text>
            <Text>(13) Buying or lending a member account</Text>
            <Text>(14) Act to sell points </Text>
            <Text>(15) Posting copyrighted material </Text>
            <Text>(16) Failure to contact a member even if the Company uses all methods of communication such as postal mail, e-mail, telephone, etc. </Text>
            <Text>(17) Any act that violates other applicable laws or conditions of use set by the company</Text>
            <Text>(18) If the company determines that it is necessary to limit the use of members in addition to the above, the company shall take the measures prescribed in the preceding paragraph. The company is not responsible for any damage caused by the member's failure to use the service. </Text>
            </Text>
            <Text style={TermsFormStyle.contentsSize2}>
            <Text>Article 10 Rights and Responsibilities of Members </Text>
            </Text>
            <Text style={TermsFormStyle.contentsSize}>
            <Text>(1) Members may at any time withdraw their consent to the Terms and terminate the Membership Agreement in accordance with the procedures set forth in Article 11. </Text>
            <Text>(2) Members may request access to their personal information at any time, and may ask to correct any errors in their personal information. </Text>
            </Text>
            <Text style={TermsFormStyle.contentsSize2}>
            <Text>Article 11 Termination </Text>
            </Text>
            <Text style={TermsFormStyle.contentsSize}>
            <Text>When a member cancels a membership contract, the member himself / herself must apply for termination through the withdrawal procedure stipulated by the company. The Company shall deal with it in accordance with the laws and regulations. In addition, the Company may restrict re-entry for a certain period of time in accordance with the service operating principles.
            </Text>
            </Text>
            <Text style={TermsFormStyle.contentsSize2}>
            <Text>Article 12 Temporary suspension of services </Text>
            </Text>
            <Text style={TermsFormStyle.contentsSize}>
            <Text>The Company may temporarily suspend the Service without prior notice to the Member if the reason falls under the reasons listed below. In this case, the Company shall have no liability whatsoever for damages incurred by members or third parties resulting from the interruption of the Service. </Text>
            </Text>
            <Text style={TermsFormStyle.contentsSize}>
            <Text>(1) Regular or emergency repair, inspection, repair, or modification of this Service System</Text>
            <Text>(2) Failure to provide this service due to fire, power outage, etc. </Text>
            <Text>(3) If the service becomes unavailable due to natural disasters such as earthquakes, eruptions, floods, tsunamis, etc. </Text>
            <Text>(4) If the service cannot be provided due to war, disturbance, riot, turmoil, labor dispute, etc. </Text>
            <Text>(5) Any other operational or technological decision that the Company is required to temporarily suspend the Service </Text>
            </Text>

            <Text style={TermsFormStyle.subtitle}>Chapter 5 Points </Text>
            <Text style={TermsFormStyle.contentsSize2}>
            <Text>Article 13 Points </Text>
            </Text>
            <Text style={TermsFormStyle.contentsSize}>
            <Text>(1) In the event that a member participates in an investigation or other prescribed activities, the member will earn points for this. The period of accumulation of points, the method of earning, the number of credits, and the amount of money are separately determined at the discretion of the company. </Text>
            <Text>(2) The company announces the member's own point reserve history. </Text>
            <Text>(3) When the point reserve is over KRW 10,000, the member can apply for automatic transfer to his / her bankbook in KRW 10,000. </Text>
            <Text>(4) The Company will not pay the reserve in the following cases. </Text>
            <Text>① When the name information is found to be other person or false</Text>
            <Text>② When someone else applied for a reserve </Text>
            <Text>③ If it is not an account of the member's name, or is not an email or mobile phone number registered as personal information </Text>
            <Text>④ If the member's information is unclear </Text>
            <Text>⑤ If the personal information required by the personal information processing policy is missing </Text>
            <Text>⑥ If membership status is not maintained on the date of payment </Text>
            <Text>⑦ When using this service outside of Korea</Text>
            <Text>(5) The company shall bear the tax that arises from the points earned by the member, and the fee for the account transfer.</Text>
            </Text>
            <Text style={TermsFormStyle.contentsSize2}>
            <Text>Article 14 Termination of Points</Text>
            </Text>
            <Text style={TermsFormStyle.contentsSize}>
            <Text>(1) In the event that a user provides false, fraudulent or outdated information, the Company may cancel or confiscate points accumulated or owned at the discretion of the Company.</Text>
            <Text>(2) If a member has earned points and is not active for more than 6 months (ie, if the user does not participate in the survey, log in to the site, or if the e-mail does not arrive consecutively more than 3 times), the points will expire.</Text>
            <Text>(3) Points earned by a member will expire at the same time as loss of membership and will not be re-credited.</Text>
            <Text>(4) The membership point reserve is valid for 3 years as of the survey participation date.</Text>
            <Text>(5) When the service is terminated, the acquired points will also expire at the same time. However, the Company may establish a period during which the points earned by members can be exchanged for compensation.</Text>
            </Text>

            <Text style={TermsFormStyle.subtitle}> Chapter 6 Other</Text>
            <Text style={TermsFormStyle.contentsSize2}>
            <Text>Article 15 Limitation of Liability</Text>
            </Text>
            <Text style={TermsFormStyle.contentsSize}>
            <Text>(1) The use of this service, including the use of the content, is the sole responsibility of the member.</Text>
            <Text>(2) Services and all content are provided within the scope of maintenance and availability. We do not guarantee its content and level.</Text>
            <Text>(3) The Company shall not be liable for damages that do not correspond to the contents provided by the Privacy Policy in connection with the use of the Service.</Text>
            <Text>(4) The Company shall not be responsible for any information exchanged between members through the Service and any actions taken in response to such information.</Text>
            <Text>(5) The Company shall have no obligation to compensate for any damages incurred by members using this service, except in case of intentional or gross negligence of the Company.</Text>
            <Text>(6) About the point service affiliation site the Company does not guarantee nor assume responsibility for stability, accuracy, legality, suitability of purpose for the site concerned.</Text>
            <Text>(7) If this service is stopped, suspended or terminated due to the fact that the Company deletes the information registered or postered by the member, the Company shall not be liable for any damages caused.</Text>
            <Text>(8) The Company may set, change or terminate the points set by the Company, the types of points, the number of points and the number of points at any time.</Text>
            <Text>(9) The Company shall not be held responsible for lost or stolen points exchanged for the reserve.</Text>
            <Text>(10) If you cannot use the point exchanged for the reserve, you cannot refund the points corresponding to the reserve to the point balance of the member or change it to another reserve. The company is not responsible for compensation for unused reserves.</Text>
            <Text>(11) The Company shall not be held responsible for accidents such as delays, loss, theft, damage or breakage during delivery or remittance of the reserve, except for the cause of the company. In this case, the Company shall not reissue, refund or reimburse points for the member's point balance.</Text>
            <Text>(12) In case of delay or mistake in delivery of the company due to lack of registration information of the member, etc., except for the reason of the company's fault. And the Company shall not be held responsible for any disadvantage to the Member.</Text>
            </Text>
            <Text style={TermsFormStyle.contentsSize2}>
            <Text>Article 16. Attribution of Intellectual Property Right</Text>
            </Text>
            <Text style={TermsFormStyle.contentsSize}>
            <Text>The company assumes that if a member provides user content, the member has provided the company and its affiliates with the right to use the copyright in a non-exclusive, non-exclusive, permanent, irrevocable and fully sublicensed license. A sublicense is a derivative work that is used, copied, modified, altered, published, translated, or created in any media in the world, or transmitted or published as user content, without the individual approval of the member and the compensation of the member.</Text>
            </Text>

            <Text style={TermsFormStyle.contentsSize2}>
            <Text>Article 17 Competent Court</Text>
            </Text>
            <Text style={TermsFormStyle.contentsSize}>
            <Text>The court of competent jurisdiction of the lawsuits related to this agreement shall be the court which has jurisdiction over the place of Perception.                                </Text>
            </Text>

            <Text style={TermsFormStyle.contentsSize2}>
            <Text>Addendum</Text>
            </Text>
            <Text style={TermsFormStyle.contentsSize}>
            <Text>These Terms<Text style={TermsFormStyle.boldFont}> will be effective December 26, 2017.</Text>
            </Text>
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

                <Header style={TermsFormStyle.headerLayout}>
                    <Left style={{flex:1}}>
                    <TouchableOpacity onPress={() => Actions.pop()} style={{width:50, height:50, justifyContent:'center', alignItems:'center'}}>
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-start'}}>
                            {renderIf(this.state.languageLocale=="ko")(
                                <Text style={{fontSize:12,color:'#fff', justifyContent: 'center', alignItems: 'flex-start'}}>나가기</Text>
                            )}
                            {renderIf(this.state.languageLocale=="en")(
                                <Text style={{fontSize:12,color:'#fff', justifyContent: 'center', alignItems: 'flex-start'}}>Leave</Text>
                            )}
                            {renderIf(this.state.languageLocale=="zh")(
                                <Text style={{fontSize:12,color:'#fff', justifyContent: 'center', alignItems: 'flex-start'}}>退出</Text>
                            )}

                        </View>
                    </TouchableOpacity>
                    </Left>
                    <Body>
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                        {renderIf(this.state.languageLocale=="ko")(
                            <Text style={{fontSize:16,color:'#fff', justifyContent: 'center', alignItems: 'center'}}>이용약관</Text>
                        )}
                        {renderIf(this.state.languageLocale=="en")(
                            <Text style={{fontSize:16,color:'#fff', justifyContent: 'center', alignItems: 'center'}}>Terms of use</Text>
                        )}
                        {renderIf(this.state.languageLocale=="zh")(
                            <Text style={{fontSize:16,color:'#fff', justifyContent: 'center', alignItems: 'center'}}>使用条款</Text>
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



const TermsFormStyle = StyleSheet.create({
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
