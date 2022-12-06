import React, { Component } from "react";
import { Text, Image, View, ScrollView, StyleSheet, Dimensions} from "react-native";

export default function HomeScreen2 () {
    return (
        <View style = {styles.container}>
            <View style = {styles.header}> 
                <Image source = {require('./Assests/mehive_logo.png')} style = {styles.hiveLogo}></Image>
                <Image source = {require('./Assests/search_icon.png')} style = {styles.searchLogo}></Image>
            </View>
            <View style = {styles.middle}>
                <View style = {styles.sideColumn}>
                    <Text style = {styles.columnTitles}>GROUPS</Text>
                    <Image source = {require('./Assests/group.png')} style = {styles.groups}></Image>
                </View>
                <View style = {styles.contactColumn}>
                    <Text style = {styles.columnTitles}>CONNECTIONS</Text>
                </View>
                <View style = {styles.sideColumn}>
                    <Text style = {styles.columnTitles}>INTERACTIONS</Text>
                    <Image source = {require('./Assests/interact_lg_group.png')} style = {styles.interactions}></Image>
                    <Image source = {require('./Assests/interact_email_social.png')} style = {styles.interactions}></Image>
                    <Image source = {require('./Assests/interact_sm_group.png')} style = {styles.interactions}></Image>
                    <Image source = {require('./Assests/interact_phone.png')} style = {styles.interactions}></Image>
                    <Image source = {require('./Assests/interact_direct_contact.png')} style = {styles.interactions}></Image>
                </View>
            </View>
            <View style = {styles.actions}>
                <Image source = {require('./Assests/nav_contacts_selected.png')} style = {styles.quickAction}/>
                <Image source = {require('./Assests/nav_add_selected.png')} style = {styles.quickAction}/>
                <Image source = {require('./Assests/nav_import_selected.png')} style = {styles.quickAction}/>
                <Image source = {require('./Assests/nav_settings_selected.png')} style = {styles.quickAction}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
        display: 'flex',
        backgroundColor: 'rgba(128, 128, 128, 1)',
    },
    header: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'rgba(256, 128, 56, 1)',
    },
    hiveLogo: {
        flex: 1,
        alignContent: 'center',
        marginLeft: 50,
    },
    searchLogo: {
        aspectRatio: .85,
        marginTop: 40,
        marginRight: 20,
    },
    middle: {
        flex: 6,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'rgba(128, 128, 128, 1)',
    },
    sideColumn: {
        flex: 1,
        backgroundColor: 'rgba(196, 196, 196, 1)',
    },
    groups: {
        alignSelf: 'center',
        aspectRatio: 1.15,
        display: 'flex',
        flexDirection: 'row',
    },
    interactions: {
        aspectRatio: .9,
        marginBottom: 10,
        flex: 1,
        alignSelf: 'center',
        resizeMode: "contain",
    },       
    contactColumn:{
        flex: 2,
        backgroundColor: 'rgba(256, 256, 256, 1)',
    },
    columnTitles: {
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        fontSize: 12,
        marginTop: 10,
        marginBottom: 10,
    },
    actions: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'rgba(256, 128, 56, 1)',
    },
    quickAction: {
       flex: 1, 
       marginBottom: 10,
       aspectRatio: 1,
    },
});