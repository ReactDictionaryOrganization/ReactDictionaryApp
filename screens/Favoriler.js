import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Button, SafeAreaView,TouchableOpacity,Text,Image,FlatList,ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {InputGroup,Input,List,ListItem, Left, Body, Right} from "native-base";
import * as firebase from 'firebase';
import HeaderComponent from "../components/Header";
import useStatusBar from '../hooks/useStatusBar';
import { logout } from '../components/Firebase/firebase';

export default function HomeScreen({navigation}) {
  useStatusBar('light-content');
  const [list,setList] = useState([]);

  function removeFavori (del) {
    var User = firebase.auth().currentUser;
    firebase.database().ref('Users/'+ User.uid +('/Favoriler/') + del).remove()
  }

  useEffect(() => {
    var user = firebase.auth().currentUser;
    const li = []; 
    firebase.database().ref('Users/'+ user.uid +'/Favoriler').on('value',function (data) {
          data.forEach((child)=>{               
              li.push({
                  arama:child.val().arama,
                  cevap:child.val().cevap,
                  image:child.val().image,
                  key: child.val().arama,
              });   
            });
            setList(li); 
      });
}, []);


  return (
  <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <HeaderComponent navigation={navigation}/>  
      <FlatList
      data={list}
      renderItem={({ item }) => (
      <View style={styles.searchStyle}>
        <View style={{flexDirection:"row"}}>
          <Body style={{flexDirection:"column",marginHorizontal:10,marginTop:5,alignItems:"flex-start"}}>
              <Text style={styles.textStyle}>{item.arama}</Text>                           
              <TouchableOpacity >
                <Ionicons
                name="ios-heart"
                color="black"
                size={30}
                onPress={() => removeFavori(item.cevap)}
                />
                <Text style={styles.textStyle}>{item.cevap}</Text> 
              </TouchableOpacity>             
          </Body>
          <Right style={styles.profileImage}>
            <Image source={{uri:item.image}} style={styles.imageStyle}></Image> 
          </Right>
        </View>
      </View>
      )}
    />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputSearch:{
    fontSize:18,
    textTransform: "capitalize",
    flex:1,
  },
  searchStyle:{
    marginHorizontal:"2%",
    marginTop:"2%",
    padding:"1%",
    justifyContent:"center",
    borderWidth:2,
    borderRadius:15,
    backgroundColor:"#E1E2E6",
    alignSelf:'auto', 
    alignItems:"stretch",
  },
  imageStyle:{
    width:150,
    height:150,
    resizeMode:'contain',
    alignSelf:"center"
  },
  textStyle:{
    fontSize:20,
    color: "black",
    textTransform: "capitalize",
    fontWeight: "bold"
  },
  profileImage: {
    overflow: "hidden",
    alignItems:"stretch",
    justifyContent:'center',
},
});

/* 
  async function handleSignOut() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }
  */