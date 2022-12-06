import React, { Component } from "react";
import { Text, Image, View, ScrollView, StyleSheet, Dimensions} from "react-native";

export default function HomeScreen () {
    return (
        <View style = {styleSheet.styleHomePage} >
            <View style = {styleSheet.styleRectangle2} ></View>
            <Image style = {styleSheet.styleDefaultContact1} source = {require('./Assests/default_contact.png')} ></Image>
            <Image style = {styleSheet.styleDefaultContact2} source = {require('./Assests/default_contact.png')} ></Image>
            <Image style = {styleSheet.styleDefaultContact3} source = {require('./Assests/default_contact.png')} ></Image>
            <Image style = {styleSheet.styleDefaultContact4} source = {require('./Assests/default_contact.png')} ></Image>
            <Image style = {styleSheet.styleDefaultContact5} source = {require('./Assests/default_contact.png')} ></Image>
            <Image style = {styleSheet.styleDefaultContact6} source = {require('./Assests/default_contact.png')} ></Image>
            <Image style = {styleSheet.styleMehiveLogo1} source = {require('./Assests/mehive_logo.png')}></Image>
            <View style = {styleSheet.styleRectangle3}></View>
            <Image style = {styleSheet.styleInteractLgGroup1} source = {require('./Assests/interact_lg_group.png')}></Image>
            <Image style = {styleSheet.styleInteractEmailSocial1} source = {require('./Assests/interact_email_social.png')}></Image>
            <Image style = {styleSheet.styleInteractPhone1} source = {require('./Assests/interact_phone.png')}></Image>
            <Image style = {styleSheet.styleInteractSmGroup2x1} source = {require('./Assests/interact_sm_group.png')}></Image>
            <Image style = {styleSheet.styleInteractDirectContact} source = {require('./Assests/interact_direct_contact.png')}></Image>
            <Image style = {styleSheet.styleSearchIcon} source = {require('./Assests/search_icon.png')}></Image>
            <View style = {styleSheet.styleRectangle4}></View>
            <Text style = {styleSheet.styleInteractions}>
                Interactions
            </Text>
            <Text style = {styleSheet.styleGroups}> Groups </Text> 
            <Image style = {styleSheet.styleGroupSelected1} source = {require('./Assests/group_selected.png')}></Image>
            <Image style = {styleSheet.styleGroup1} source = {require('./Assests/group.png')}></Image>
            <Text style = {styleSheet.styleAllContacts}>
                Group Name
            </Text>
            <Image style = {styleSheet.styleAddNewContact1} source = {require('./Assests/add_new_contact.png')}></Image>
            <Image style = {styleSheet.styleAddNewContact2} source = {require('./Assests/add_new_contact.png')}></Image>
            <View style = {styleSheet.styleStatusConnected2} ></View>
            <View style = {styleSheet.styleStatusConnnected1}></View>
            <View style = {styleSheet.styleStatusCaution1}></View>
            <View style = {styleSheet.styleStatusCaution1Copy1}></View>
            <Image style = {styleSheet.styleStatuesSevere1} source = {require('./Assests/status_severe.png')}/>
            <Image style = {styleSheet.styleStatuesSevere2} source = {require('./Assests/status_severe.png')}/>
            <View style = {styleSheet.styleComponent2} >
                <View style = {styleSheet.styleRectangle1}></View>
                <Image style = {styleSheet.styleNavAddSelected1} source = {require('./Assests/nav_add_selected.png')}></Image>
                <Image style = {styleSheet.styleNavImportSelected1} source = {require('./Assests/nav_import_selected.png')}></Image>
                <Image style = {styleSheet.styleNavSettingsSelected1} source = {require('./Assests/nav_settings_selected.png')}></Image>
                <Image style = {styleSheet.styleNavContacts1} source = {require('./Assests/nav_contacts_selected.png')}></Image>
            </View>
            <Text style = {styleSheet.styleConnections}>
                Connections
            </Text>
            <View style = {styleSheet.styleRectangle22}></View>            
            <Text style = {styleSheet.styleMulti}>
                Multi
            </Text>
        </View>
    )
}

const stylesheet = StyleSheet.create({
    styleRectangle2: {
        // position: 'absolute',
        left: 0,
        top: 0,
        width: 360,
        height: 52,
    },
    styleDefaultContact1: {
        // postion: 'absolute',
        left: 91,
        top: 104,
        borderRadius: null,
        width: 40,
        height: 38,
        // resizeMode: contain,
    },
    styleDefaultContact2: {
        // position: 'absolute',
        left: 91,
        top: 207,
        borderRadius: null,
        width: 40,
        height: 38,
        aspectRatio: 1,
    },
    styleDefaultContact3: {
        // position: 'absolute',
        left: 183,
        top: 207,
        borderRadius: null,
        width: 40,
        height: 38,
        aspectRatio: 1,
    },
    styleDefaultContact6: {
        // position: 'absolute',
        left: 183,
        top: 104,
        borderRadius: null,
        width: 40,
        height: 38,
        aspectRatio: 1,
    },
    styleDefaultContact5: {
        // position: 'absolute',
        left: 91,
        top: 307,
        borderRadius: null,
        width: 40,
        height: 38,
        aspectRatio: 1,
    },
    styleDefaultContact4: {
        // position: 'absolute',
        left: 183,
        top: 307,
        borderRadius: null,
        width: 40,
        height: 38,
        aspectRatio: 1,
    },
    styleMehiveLogo1: {
        // position: 'absolute',
        left: 62,
        top: 0,
        borderRadius: null,
        width: 229,
        height: 58,
    },
    styleRectangle3: {
        // position: 'absolute',
        left: 278,
        top: 52,
        width: 82,
        height: 479,
    },
    styleInteractLgGroup1: {
        // position: 'absolute',
        left: 289,
        top: 83,
        borderRadius: null,
        width: 60,
        height: 60,
    },
    styleInteractEmailSocial1: {
        // position: 'absolute',
        left: 289,
        top: 168,
        borderRadius: null,
        width: 60,
        height: 60,
    },
    styleInteractSmGroup2x1: {
        // position: 'absolute',
        left: 289,
        top: 253,
        borderRadius: null,
        width: 60,
        height: 60,
    },
    styleInteractPhone1: {
    //    position: 'absolute',
       left: 289,
       top: 338,
       borderRadius: null,
       width: 60,
       height: 60, 
    },
    styleInteractDirectContact: {
        // position: 'absolute',
        left: 289,
        top: 423,
        borderRadius: null,
        width: 60,
        height: 60,
    },
    styleSearchIcon: {
        // position: 'absolute',
        left: 305,
        top: 12,
        borderRadius: null,
        width: 32,
        height: 34,
    },
    styleRectangle4: {
        // position: 'absolute',
        left: 0,
        top: 52,
        width: 82,
        height: 479,
    },
    styleInteractions: {
        // position: 'absolute',
        left: 278,
        top: 60,
        width: 84,
        color: 'rgba(0, 0, 0, 1)',
        fontSize: 11,
        fontFamily: 'Roboto_600',
        letterSpacing: 0,
        fontStyle: 'normal',
        textAlign: 'center',
    },
    styleGroups: {
        // position: 'absolute',
        left: 3,
        top: 60,
        width: 84,
        color: 'rgba(0, 0, 0, 1)',
        fontSize: 11,
        fontFamily: 'Roboto',
        letterSpacing: 0,
        fontStyle: 'normal',
        textAlign: 'center',
    },
    styleGroupSelected1: {
        // position: 'absolute',
        left: 6,
        top: 83,
        borderRadius: null,
        width: 70,
        height: 42,
    },
    styleGroup1: {
        // position: 'absolute',
        left: 6,
        top: 143,
        borderRadius: null,
        width: 70,
        height: 42,
    },
    styleAllContacts: {
        // position: 'absolute',
        left: 12,
        top: 95,
        width: 60,
        color: 'rgba(0, 0, 0, 1)',
        fontSize: 11,
        fontFamily: 'Roboto_600',
        letterSpacing: 0,
        fontStyle: 'normal',
        textAlign: 'center',
    },
    styleGroupname: {
        // position: 'absolute',
        left: 5,
        top: 152,
        width: 78,
        color: 'rgba(0, 0, 0, 1)',
        fontSize: 11,
        fontFamily: 'Roboto_600',
        letterSpacing: 0,
        fontStyle: 'normal',
        textAlign: 'center',
    },
    styleRectangle1: {
        // position: 'absolute',
        left: 0,
        top: 0,
        width: 360,
        height: 61,
    },
    styleNavAddSelected1: {
        // position: 'absolute',
        left: 100,
        top: 6,
        borderRadius: null,
        width: 67,
        height: 50,
    },
    styleNavImportSelected1Copy1: {
        // position: 'absolute',
        left: 205,
        top: 6,
        borderRadius: null,
        width: 57,
        height: 50,
    },
    styleNavSettingsSelected1Copy1: {
        // position: 'absolute',
        left: 301,
        top: 6,
        borderRadius: null,
        width: 57,
        height: 50,
    },
    styleNavContacts1: {
        // position: 'absolute',
        left: 5,
        top: 6,
        borderRadius: null,
        width: 57,
        height: 50,
    },
    styleComponent1: {
        // position: 'absolute',
        left: 1,
        top: 531,
        width: 360,
        height: 61,
    },
    styleHomePage: {
        // postion: 'relative',
        left: 0,
        top: 0,
        width: 360,
        height: 592,
        backgroundColor: 'rgba(256,0,0,1)',
    },
    styleConnections: {
        // position: 'absolute',
        left: 139,
        top: 60,
        width: 84,
        color: 'rgba(0,0,0,1)',
        fontSize: 11,
        fontFamily: 'Roboto_600',
        letterSpacing: 0,
        fontStyle: 'normal',
        textAlign: 'left',
    },
    styleRectangle22: {
        // postion: 'absolute',
        left: 221,
        top: 73,
        width: 39,
        height: 14,
    },
    styleMulti: {
        position: 'absolute',
        left: 226,
        top: 72,
        width: 41,
        color: "rgba(0,0,0,1)",
        fontSize: 12,
        fontFamily: 'Roboto_400',
        letterSpacing: 0,
        fontStyle: 'normal',
        textAlign: 'left',
    },
    styleStyleName: {
        position: 'relative',
        width: Dimensions.get('window').width,
        height: 591,
        backgroundColor: 'rgba(241,242,243,1)',
    },
})