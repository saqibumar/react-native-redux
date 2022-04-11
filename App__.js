import * as React from 'react';
import { Pressable, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Signup from './screens/Signup';

const Stack = createStackNavigator();

function App() {
  return (
     <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ title: 'Login screen' }} />
        <Stack.Screen name="Signup" component={Signup} options={{ title: 'Signup screen' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
