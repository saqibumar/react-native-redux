import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { 
    StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Keyboard, 
    KeyboardAvoidingView, TouchableWithoutFeedback, ActivityIndicator,
  } from 'react-native';
import axios from 'axios';
import { useNavigation, createNavigationContainerRef } from '@react-navigation/native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Import Redux and React Redux Dependencies
import { connect } from 'react-redux';
import { loginUser, logoutUser, userInfo } from '../redux/actions/login/actions';

export default function Login({ userInfo, loginUser, logoutUser }) {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [isLoggedIn, setLogin] = useState(false);
    const [user_info, setUserInfo] = useState(null);

    const handleLogin = () => {
      setLoading(true);
      const url = `${Constants.manifest.extra.CURRNT_API_URL}/api/ks/mobile/v1/login`;
      console.log(`url -> ${url}`)
      axios.post(
          url,
          {
              uni_email: email, //'saqib@logicloud.mx',
              uni_password: password, //</View>'70ee07'
          }
      )
      // .then((response) => response.json())
      .then(async(response) => {
          setLoading(false)
          if (response.data.status === 'ok') {
            console.log(`response -> ${JSON.stringify(response.data.payload)}`)
            const user_info = {
              token: response.data.payload.token,
              user_email: email
            }
            await AsyncStorage.setItem('@user_info', JSON.stringify(user_info))
            setLogin(true);
            userInfo(user_info)
            return navigation.navigate("Panels", { from: 'Login', data: JSON.stringify(response) })
          }
          else {
            throw new Error('Unauthorized login attempt')
          }
          // return json;
      })
      .catch((error) => {
          setLoading(false)
          console.error(error);
      })
      .finally(() => setLoading(false));
      // return navigation.navigate("Signup", { from: 'Login' })
    }

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboard_container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            
            <View style={styles.Middle}>
                <Text style={styles.LoginTextLabel}>Login</Text>
            </View>

            {/* <Image source = {require("./assets/icon.png")}/>  */}
            <StatusBar style="auto" />
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Email address"
                placeholderTextColor="#003f5c"
                onChangeText={(email) => setEmail(email)}
              />
            </View>
            
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Password"
                placeholderTextColor="#003f5c"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
              />
            </View>
            <TouchableOpacity>
              <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <TouchableOpacity style={styles.loginBtn} 
                    onPress={handleLogin}
                    >
                    <Text style={styles.LoginText}>LOGIN</Text>
                </TouchableOpacity>
            )}
          </View>

        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
}
 
const styles = StyleSheet.create({
  keyboard_container: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image :{
    marginBottom: 40
 
  },
  inputView: {
    backgroundColor: "#FFFF4F",
    borderColor: "#336688",
    borderWidth:1,
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 0,
  },
  loginBtn:
  {
    width:"80%",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
    backgroundColor:"#336699",
    tintColor: "#fff",
    overlayColor: '#fff',
    color: '#fff',
  },
  LoginText: {
    marginTop:0,
    fontSize:20,
    fontWeight:'bold',
    color: '#fff',
  },
  LoginTextLabel: {
    marginTop:0,
    fontSize:30,
    fontWeight:'bold',
    color: '#000'
  },
  Middle:{
    alignItems:'center',
    justifyContent:'center',
  },
});

/* const mapStateToProps = (state, ownProps) => {
  console.log(state.todos.todo_list)
return {
  todo_list: state.todos.todo_list,
}
}

const mapDispatchToProps = { userInfo, loginUser, logoutUser }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login) */
