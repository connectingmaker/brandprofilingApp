import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, StyleSheet, TouchableOpacity,AlertIOS,Alert,Platform } from 'react-native';
import { Container, Header, Body, Content, Footer,Item, Icon, Input,Button } from 'native-base';


export default class Terms extends Component {


    render() {

        return (

            <Container>

                <Header style={TermsFormStyle.headerLayout}>
                    <View style={{flex:.1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize:12,color:'#fff'}} onPress={Actions.pop}>나가기</Text>
                    </View>
                    <View style={{flex:.8, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize:16,color:'#fff'}}>이용약관</Text>
                    </View>
                    <View style={{flex:.1, justifyContent: 'center', alignItems: 'center'}}>
                    </View>
                </Header>

                <Content style={{padding:10}}>
                    <View style={TermsFormStyle.contentsLayout}>
                        <View style={{paddingTop:5, paddingBottom:5}}>
                            <Text style={TermsFormStyle.title}><Text style={TermsFormStyle.boldFont}>Brand Profiling</Text> 이용약관</Text>

                            <Text style={TermsFormStyle.subtitle}> 제 1장 총칙</Text>

                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>제1조 목적</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>본 약관은 <Text style={TermsFormStyle.boldFont}>Perception Inc. (이하, "회사"라 한다) 가 소유하고 온라인상에서 운영하는 어플리케이션 Brand Profiling </Text>"본 서비스" 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>제2조 효력의 발생 및 변경</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>약관은 회원에게 온라인을 통하여 공시함으로써 효력을 발생합니다.
                                    회사는 약관의 규제에 관한 법률, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 관계 법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
                                    회사가 약관을 개정할 경우에는 적용 일자 및 개정사유를 상당한 기간 해당 사이트에 공지하여야 합니다.
                                    회원은 변경된 약관에 대해 거부할 권리가 있습니다. 회원은 변경된 약관이 공지된 뒤 7일 이내에 거부 의사를 표명할 수 있으며, 회원이 거부하는 경우 회사는 7일의 기간을 정하여 회원에게 사전 통지 후 당해 회원과의 계약을 해지할 수 있습니다. 만약, 회원이 거부 의사를 표시하지 않고 서비스를 계속 이용하는 경우에는 변경된 약관에 동의하는 것으로 간주합니다.</Text>
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
                                <Text>본 서비스 이용을 희망하시는 분은 회사가 지정한 절차에 따라 회원계약을 신청합니다.
                                    회원계약을 신청하신 분 (이하, "신청자"라 한다) 은 회원계약을 신청한 시점에서 본 약관의 내용을 수락했다고 간주합니다.
                                    회사는 회원계약 신청에 대하여, 필요한 절차 등을 거친 뒤, 이를 승낙할 수 있습니다. 다만, 회사는 신청자가 다음 각호에 해당하는 경우, 해당 회원계약 신청을 승낙하지 않을 수도 있습니다.
                                    실명이 아니거나 타인의 명의를 이용한 경우
                                    가입신청서의 내용을 허위로 기재하여 가입신청을 하는 경우
                                    기재한 정보를 타인이 이용하거나 확인이 되지 않는 경우
                                    만 14세 미만의 아동이 법정대리인의 동의를 얻지 못한 경우
                                    서비스 관련 설비의 여유가 없거나, 기술상 또는 업무상 문제가 있는 경우
                                </Text>
                            </Text>

                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>제5조 서비스 이용 및 변경</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>본 서비스는 회사의 업무상 또는 기술상 특별한 지장이 없는 한, 원칙적으로 하루 24시간 운영합니다.
                                    본 서비스는 비영리 목적과 개인 이용에 한정하여 이용합니다.
                                    본 서비스는 만 14세 이상인 분에 한하여 이용할 수 있습니다. 만 14세 미만인 경우에는 부모님이나 기타 법정대리인의 동의가 있어야만 본 서비스를 이용할 수 있습니다.
                                    회사는 타당한 이유가 있는 경우에 운영상, 기술상의 필요에 따라 제공하고 있는 전부 또는 일부 서비스를 변경할 수 있습니다.
                                    서비스의 내용, 이용방법, 이용시간에 대하여 변경이 있는 경우에는 변경사유, 변경될 서비스의 내용 및 제공 일자 등은 그 변경 전에 미리 내용을 공지해야 합니다.
                                    회사는 무료로 제공되는 서비스의 일부 또는 전부를 회사의 정책 및 운영의 필요 상 수정, 중단, 변경할 수 있으며, 이에 대하여 관련법에 특별한 규정이 없는 한 회원에게 별도의 보상을 하지 않습니다.
                                </Text>
                            </Text>

                            <Text style={TermsFormStyle.subtitle}> 제 3장 의무 및 권리</Text>
                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>제6조 회사의 의무</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>회사는 본 약관의 규정에 따라 계속적, 안정적으로 서비스를 제공합니다.
                                    회사는 회원에게 등록된 전자적 전송 매체를 통해 조사 참여를 요청하는 메일, 문자, 전화 등을 전송할 수 있습니다.
                                    회사는 회원의 개인 정보를 본인의 승낙 없이 타인에게 누설, 배포하지 않으며, 이를 보호하기 위해 노력합니다. 회원의 개인정보보호에 관한 기타 사항은 정보통신망법 및 회사가 별도로 정한 "개인정보취급방침"에 따릅니다.
                                </Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>제7조 회원의 의무</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>회원은 사용자 ID 및 비밀번호에 관하여 모든 관리 책임이 있습니다. 회사는 회원 계정, 사용자 이름 및 비밀번호를 제3자 (가족 등도 포함한 사람을 지칭합니다) 가 이용 또는 변경함으로써 해당 회원이 입은 손해에 대하여 해당 회원의 고의, 과실 유무에 상관없이 어떠한 책임도 지지 않습니다.
                                    회원은 회사에 등록한 내용 중 변경된 사항이 있는 경우, 즉시 회사에 소정 변경 신고를 해야 합니다.
                                    회원은 회사가 실시하는 조사에 성실한 자세로 정확하게 응답해야 합니다. 또한, 회원은 허위 데이터 또는 혼란을 야기하는 데이터 (예를 들어 이전 응답과 모순되는 조사 응답, 통계적으로 불가능한 응답 등을 포함한 내용을 칭합니다) 를 제공해서는 안 됩니다.
                                    회원은 본 약관 및 관계 법령이 규정하는 사항을 준수해야 합니다.
                                    회원은 조사, 프로젝트 및 본 서비스에 관련된 기타 마케팅리서치 활동에 참여하여 취득하게 된 정보 및 콘텐츠에 대한 기밀을 유지해야 하며, 어떤 상황에도 제3자에게 공개해서는 안 됩니다.
                                </Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>제8조 금지사항</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>회원은 본 서비스를 이용하여 아래에 열거한 행위를 하는 것을 금지하며, 다음 각호에 해당하는 사실이 발생했을 경우 사전 통지 또는 통지 없이 이용 계약을 해지하거나 기간을 정하여 서비스 이용을 중지할 수 있습니다.

                                    공공질서 및 사회적 통념에 반하는 행위
                                    사회적 공익을 저해할 목적을 갖고 서비스이용을 계획 또는 실행하는 행위
                                    법률, 조례, 기타 법규를 위반하는 행위
                                    협박, 중상, 외설, 추문, 선동적인 소재를 게재하는 행위
                                    다른 회원 또는 제3자의 명예를 훼손하거나 불이익을 주는 행위
                                    조사업무를 방해하는 행위
                                    광고메일 또는 컴퓨터바이러스를 발송하는 행위
                                    복수등록
                                    조사내용, 로그, 상표, 기타 본 서비스에 관련된 정보를 제3자에게 개시, 누설하는 행위
                                    계정, 비밀번호를 도용하는 행위
                                    불성실한 응답
                                    회원 계정을 매매 또는 대여하는 행위
                                    포인트를 매매하는 행위
                                    저작권 보호자료를 게재하는 행위
                                    기타 관련 법령이나 회사가 정한 이용조건에 위배되는 행위

                                </Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>제9조 회원의 권리 및 책임</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>회원은 언제든지 본 약관에 대한 동의를 철회하고, 제11조에 규정된 절차에 따라 회원계약을 해지할 수 있습니다.
                                    회원은 언제든지 자신의 개인정보에 대한 열람을 요구할 수 있으며, 자신의 개인정보에 오류가 있는 경우, 이를 정정하도록 요구할 수 있습니다.
                                </Text>
                            </Text>

                            <Text style={TermsFormStyle.subtitle}> 제4장 서비스의 이용제한, 해지 및 종료</Text>
                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>제10조 이용제한</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>회사는 회원이 아래의 각호에 해당 사항이 있는 경우 또는 회사가 해당 사항이 발생할 가능성이 있다고 판단한 경우, 해당 회원의 승낙 없이 해당 회원이 본 서비스를 이용하는 것을 제한할 수 있습니다.
                                    회사가 요청한 개인정보에 허위가 있다고 판명된 경우
                                    개인정보에 기재된 우편, 전자메일, 전화 등 모든 연락방법을 이용해도 연락을 취할 수 없는 경우
                                    이용 상황, 회사가 입수한 정보 등을 고려하여 해당 회원의 회원계정, 사용자명, 비밀번호 등이 제3자에게 무단 사용되었다고 추측되는 경우
                                    기타 관련 법령과 본 약관을 위반한다고 사료되는 행위를 한 경우
                                    위의 각호 이외에 회사가 해당 회원의 이용을 시급히 제한할 필요가 있다고 판단한 경우
                                    회사가 전항에 기재된 조치를 취함으로써 해당 회원이 본 서비스를 이용하지 못하여 이로 인해 손해가 발생하더라도 회사는 책임을 지지 않습니다.
                                </Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>제11조 해지</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>회원이 회원계약을 해지할 때는 회원 본인이 회사가 규정한 탈퇴절차를 통하여 해지신청을 해야 합니다. 회사는 법령 등의 규정에 따라 이를 처리합니다. 또한, 회사는 서비스 운영 원칙에 따라 일정 기간 재가입을 제한할 수 있습니다.

                                </Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>제12조 서비스의 일시적 중단</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>회사는 아래의 열거한 사유에 해당 사항이 있는 경우, 회원에게 사전 연락 없이 일시적으로 본 서비스를 중단할 경우가 있습니다. 이 경우, 회사는 회원 또는 제3자가 본 서비스의 중단으로 인해 입게 된 손해에 대하여 어떠한 책임도 지지 않습니다.
                                    본 서비스 시스템을 정기적 또는 긴급 보수, 점검, 수리, 변경하는 경우
                                    화재, 정전 등으로 본 서비스를 제공하지 못하게 된 경우
                                    지진, 분화, 홍수, 지진해일 등 천재지변으로 본 서비스를 제공할 수 없게 된 경우
                                    전쟁, 변란, 폭동, 소란, 노동쟁의 등으로 본 서비스를 제공할 수 없게 된 경우
                                    기타 운용적 또는 기술적으로 회사가 본 서비스를 일시적으로 중단할 필요가 있다고 판단한 경우

                                </Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>제4장 제11조 의하여 회사가 계약을 해지했던 회원이 다시 회원 신청을 하는 경우</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>개인 위치정보서비스는 위치정보를 이용할 수 있는 통신단말 장치의 소유자 본인이어야 이용할 수 있습니다.
                                    회사가 전항을 승낙한 시점에서 회원계약이 성립됩니다.
                                </Text>
                            </Text>

                            <Text style={TermsFormStyle.subtitle}> 제5장 포인트</Text>
                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>제13조 포인트・특전</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>회원이 조사에 참여하거나 기타 소정의 활동을 한 경우에는, 회사는 이에 대하여 포인트를 적립해 드립니다. 포인트의 적립 기간, 적립방법, 적립수, 금액 등에 대해서는 회사의 판단에 따라 별도 규정합니다.
                                    회원은 일정 금액 이상 적립된 포인트를 회사가 지정한 특전과 교환하도록 신청할 수 있습니다.
                                    (고의, 과실의 유무와 상관없이) 회원등록정보 누설, 실수 등의 원인으로 인하여 포인트 적립 또는 전항의 소정 특전과 교환할 수 없게 된 경우, 회사는 책임을 지지 않습니다.
                                    회원이 획득한 포인트에서 발생하는 세금, 특전과 교환하는 데 소요되는 수수료는 회사가 부담합니다. 단, 포인트로 구입한 제품 또는 서비스에 부과되는 세금, 기타 비용은 회원이 부담합니다.
                                </Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>제14조 포인트의 소멸</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>사용자가 허위, 부정 또는 오래된 정보를 제공한 경우에는 회사의 판단 하에 포인트의 적립 또는 소유한 포인트를 취소, 몰수할 수 있습니다.
                                    회원이 포인트를 획득하고 6개월 이상 활동하지 않을 경우 (조사참가, 사이트 로그인 등이 이루어지지 않거나 3회 이상 연속적으로 메일이 도착하지 않는 경우가 지속되는 상태를 말합니다)에는 소멸됩니다.
                                    회원이 획득한 포인트는 회원자격의 상실과 동시에 소멸됩니다.
                                    본 서비스가 종료되면 획득한 포인트도 동시에 소멸됩니다. 다만, 회사는 회원이 획득한 포인트를 특전과 교환할 수 있는 기간을 설정할 수 있습니다.
                                </Text>
                            </Text>

                            <Text style={TermsFormStyle.subtitle}> 제6장 기타</Text>
                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>제15조 책임제한</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>콘텐츠 이용을 포함한 본 서비스 이용은 회원 본인의 책임하에 이루어집니다. 본 서비스 및 모든 콘텐츠는 현상 유지된 상태 및 제공이 가능한 한도 내에서 제공하며, 이에 대한 내용 및 수준을 보장하지는 않습니다.
                                    회사는 본 서비스 이용에 관련하여 개인정보 보호방침이 규정하는 내용에 대응하지 않는 사항에 대해서는 손해가 발생하더라도 책임을 지지 않습니다.
                                    본 서비스를 통해 회원 간에 주고받은 정보 및 그에 따라 이루어진 행위에 대하여 회사는 책임지지 않습니다.
                                    회사는 본 서비스를 이용해 발생한 회원의 모든 손해에 대하여 회사의 고의 또는 중과실에 의한 경우를 제외하고 어떠한 책임도 해당 손해배상 의무도 갖지 않습니다.
                                    포인트 서비스 제휴 사이트에 관하여 회사는 해당 사이트에 대한 안정성, 정확성, 적법성, 목적 적합성 등에 관하여 보증도 책임도 지지 않습니다.
                                    회사가 회원이 등록 또는 게재한 정보를 삭제해 해당 회원이 회원자격 정지ㆍ말소로 인해 본 서비스가 정지, 중단, 중지 등이 된 경우, 회사는 이유 여하를 불문하고 일체의 손해배상 의무를 지지 않습니다.
                                    회사가 설정한 특전, 특전의 종류, 내용 및 포인트 수 등에 대하여 회사는 언제든지 신규 설정, 변경 또는 종료할 수 있습니다.
                                    포인트로 교환한 특전의 분실 및 도난에 대하여 회사는 일체의 책임을 지지 않습니다.
                                    포인트로 교환한 특전을 이용하지 못한 경우, 해당 특전에 상당하는 포인트를 회원의 포인트 잔액으로 환불하거나 다른 특전으로 변경할 수 없습니다. 회사는 이용하지 않은 특전에 대해 보상의 책임을 지지 않습니다.
                                    특전의 배송 중 또는 송금 중에 발생한 지연, 분실, 도난, 손해, 파손 등의 사고에 대하여, 회사는 회사의 귀책사유로 인한 경우를 제외하고 일체의 책임을 지지 않습니다. 이 경우, 회사는 그에 대한 재발송, 재발행, 환불 또는 회원의 포인트 잔액으로 포인트환급 등을 행하지 않습니다.
                                    회원의 등록정보 미비 등의 원인으로 회사의 연락 및 특전 등의 도착 지연, 배송오류가 발생한 경우에는, 회사의 귀책사유로 인한 경우를 제외하고 회사는 회원앞으로 통상적으로 배송이 완료될 시기에 도착한 것으로 간주하며, 이로 인하여 회원에게 불이익이 발생하더라도 회사는 책임을 지지 않습니다.
                                    회사는 가맹사이트가 규정한 기준에 대하여 책임을 지지 않습니다. 해당 기준에 의하여 회원의 성과가 승인되지 않거나 취소 또는 조정되는 등 회원에게 어떠한 손해, 비용 등이 발생하더라도, 회사는 이를 보상하지 않습니다.
                                </Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>제16조 지적 재산권 등의 귀속</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>회원은 사용자 콘텐츠를 제공함과 동시에 저작권 등에 대하여 사용료가 발생 불가, 비독점적, 영속적, 취소불능, 완전하게 서브라이센스할 수 있는 권리 (해당 회원의 개별 승인 및 해당 회원에게 보상할 필요 없이 회사가 전 세계의 모든 매체상에서 사용자 콘텐츠를 사용, 복제, 수정, 변경, 발표, 번역 또는 파생저작권을 제작, 발신, 실행, 게시할 수 있는 권리를 포함합니다) 를 회사 및 관계회사에 대하여 제공했다고 간주합니다.
                                </Text>
                            </Text>

                            <Text style={TermsFormStyle.contentsSize2}>
                                <Text>부칙</Text>
                            </Text>
                            <Text style={TermsFormStyle.contentsSize}>
                                <Text>본 약관은 <Text style={TermsFormStyle.boldFont}> 2017년 10월 1일</Text>부터 적용됩니다.</Text>
                            </Text>


                        </View>
                    </View>

                </Content>


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
