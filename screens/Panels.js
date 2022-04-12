import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, FlatList } from 'react-native';
// import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio } from 'native-base';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { alignContent, flex, flexDirection, width } from 'styled-system';

import { useSelector, useDispatch } from 'react-redux'
import { Title, Paragraph, Card, TextInput } from 'react-native-paper';
import Spacer from '../components/Spacer';
import ButtonIcon from '../components/ButtonIcon';

import { FontAwesome as Icon } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { deleteTodo } from '../redux/actions/todoapp/actions';
import { DELETE_TODO } from '../redux/actions/todoapp/actionTypes';
import { SAVE_LOGGEDIN_USER } from '../redux/actions/login/actionTypes';

export default function Panels() {
  const [isLoggedIn, setLogin] = useState(false);
  const selectedData = useSelector(state => state.todos.todo_list);
  
  const user_name = useSelector(state => `${state.login.first_name} ${state.login.last_name}` );
 
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const user_info = await AsyncStorage.getItem('@user_info')
      console.log(`user_info: ${user_info}`)
      return user_info != null ? JSON.parse(user_info) : null;
    } catch(e) {
      console.log('error on getData()', e)
      // error reading value
    }
  }
  const logout = async () => {
    try {
      const dd = await getData();
      console.log('logout', JSON.stringify(dd))
      await AsyncStorage.removeItem('@user_info')
      console.log('logout success')
      dispatch({
        type: SAVE_LOGGEDIN_USER,
        payload: { 
          user_info: {
            user: {
              user_id: '',
              first_name: '',
              last_name: '',
              email: '',
              phone: ''
            }
          }
        }
      });
      return null
    } catch(e) {
      console.log('error on logout()', e)
      // remove error
    }
  
    console.log('Done.')
  }

  // console.log('>>>>>',selectedData || selectedData[0].id)
  const handleDeleteTodo = (id) => {
    // console.log(`id = ${id}`)
    dispatch({
      type: DELETE_TODO, 
      payload: { id } 
    })
  }
    // const Panels = () => {
  const navigation = useNavigation();
  const [count, setCount] = useState(0);

  // console.log('**++', user_name.trim().length);
  useEffect(async() => {
    const user = await getData();
    console.log(`++++++++++++user = ${JSON.stringify(user)}`);
    if (user) {
      dispatch({
        type: SAVE_LOGGEDIN_USER,
        payload: { 
          user_info: {
            user: user.user
          }
        }
      })
    }
    /* else
    dispatch({
        type: SAVE_LOGGEDIN_USER,
        payload: { 
          user_info: {
            user: {
              user_id: '',
              first_name: '',
              last_name: '',
              email: '',
              phone: ''
            }
          }
        }
      }); */
  });
  return (
    <View style={styles.container}>
      <View style={styles.Middle}>
        {user_name.trim().length>0 ? (<Text style={styles.LoginText}>Panels for {user_name}</Text>): (<></>)}
      </View>
    
      <View style={styles.text2}>
        {user_name.trim().length>0 ? 
          (
            <TouchableOpacity onPress={async() => {
              await logout()
            } } ><Text style={styles.signupText}> Logout {user_name}</Text></TouchableOpacity>
          ):
          (
            <>
            <Text>Already have account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")} ><Text style={styles.signupText}> Login </Text></TouchableOpacity>
            </>
          )
        }
      
        
      </View>
     
      {/* Line */}
      <View style={styles.lineStyle}>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        {/* <View>
          <Text style={{width: 50, textAlign: 'center'}}>Or</Text>
        </View> */}
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        <Button
            title="increment"
            onPress={() => setCount(count+1)}
            />
            <Text>{count}</Text>
            <Button
            title="decrement"
            onPress={() => setCount(count-1)}
            />
      </View>
      <View>
        <FlatList
          data={selectedData}
          keyExtractor={(item) => item.id}
          renderItem={({item, index}) => {
            return (
              <>
              <Card>
                <Card.Title
                  title={`Task #: ${item.id}`}
                  left={(props) => <Icon name="tasks" size={24} color="black" />}
                  right={(props) => <ButtonIcon iconName="close" color="red" onPress={() => handleDeleteTodo(item.id)} />}
                />
                <Card.Content>
                  <Paragraph>{item.task}</Paragraph>
                </Card.Content>
              </Card>
              <Spacer />
              </>
            );
          }}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

/* export default () => {
  return (
    <NativeBaseProvider>
     
        <Panels />
      
    </NativeBaseProvider>
  )
} */


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  LoginText: {
    marginTop:100,
    fontSize:30,
    fontWeight:'bold',
  },
  Middle:{
    alignItems:'center',
    justifyContent:'center',
  },
  text2:{
    flexDirection:'row',
    justifyContent:'center',
    paddingTop:5
  },
  signupText:{
    fontWeight:'bold'
  },

  lineStyle:{
    flexDirection:'row',
    marginTop:30,
    marginLeft:15,
    marginRight:15,
    alignItems:'center'
  },
});
