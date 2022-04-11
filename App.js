import React, { useState } from 'react';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Panels from './screens/Panels';
import TodoApp from './screens/TodoApp';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Provider } from 'react-redux';
import store from './redux/store';
// import store from 'utils/store';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// const store = configureStore();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="TodoApp" component={TodoApp} />
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Signup" component={Signup} />
      <Tab.Screen name="Panels" component={Panels} />
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store = { store }>
      <NavigationContainer>
        <MyTabs />
        {/* <Stack.Navigator screenOptions={{headerShown: true}}>
          <Stack.Screen name="TodoApp" component={TodoApp} options={{ title: 'Todo screen' }} />
          <Stack.Screen name="Login" component={Login} options={{ title: 'Login screen' }} />
          <Stack.Screen name="Signup" component={Signup} options={{ title: 'Signup screen' }} />
          <Stack.Screen name="MyTabs" component={MyTabs} options={{ title: 'MyTabs screen' }} />
        </Stack.Navigator> */}
      </NavigationContainer>
    </Provider>
  );
}