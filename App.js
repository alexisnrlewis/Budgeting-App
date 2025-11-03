import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import InvalidLogin from './InvalidLogin';
import ResetPassword from './ResetPassword';
import Expenses from './Expenses';
import Reports from './Reports';
import AccountSettings from './AccountSettings';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="InvalidLogin" component={InvalidLogin} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="Expenses" component={Expenses} />
        <Stack.Screen name="Reports" component={Reports} />
        <Stack.Screen name="AccountSettings" component={AccountSettings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}