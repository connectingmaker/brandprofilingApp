import { StyleSheet } from 'react-native';

const layoutStyle = StyleSheet.create({
    footerBg_blank: {
        backgroundColor:"#222222", width:"100%", height:44, justifyContent: 'center', alignItems: 'center'
    }
    ,footerViewLeft: {
        flex: 4.5
            , alignItems:'center'
            , justifyContent:'center'
    }
    ,footerViewLeftFont: {
        color:"#ffffff"
            ,fontSize:15
            ,paddingLeft: 20
    }
    ,footerViewCenter: {
        flex: 1
            , alignItems:'center'
            , justifyContent:'center'
    }

    ,footerViewConterFont: {
        color: "rgba(255,255,255,0.5)"
    }

    ,footerViewRight: {
        flex: 4.5
            , alignItems:'center'
            , justifyContent:'center'
    }
    ,footerViewRightFont: {
        color:"#ffffff"
            ,fontSize:15
            ,paddingRight: 20
    }
});

