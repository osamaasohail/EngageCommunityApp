import React from 'react'
import { createStackNavigator } from '@react-navigation/stack' 
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Screen1 from '../screens/Screen1';
import Screen2 from '../screens/Screen2';
import Screen3 from '../screens/Screen3';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import CompleteProfileScreen from '../screens/CompleteProfileScreen';
import HomeScreen from '../screens/HomeScreen';  //this shold be in bottom navigation bar
// import MenuScreen from '../screens/MenuScreen';


function AuthNavigation() {
    const AuthStack = createNativeStackNavigator();
    return (
        <AuthStack.Navigator
            screenOptions={{
                headerShown:false
            }
        }
        >
        <AuthStack.Screen name="Screen1" component={Screen1} />
        <AuthStack.Screen name="Screen2" component={Screen2} />
        <AuthStack.Screen name="Screen3" component={Screen3} />
        <AuthStack.Screen name="SignupScreen" component={SignupScreen} />
        <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
        <AuthStack.Screen
          name="CompleteProfileScreen"
          component={CompleteProfileScreen}
        />
        {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}

        {/* <Stack.Screen name="MenuScreen" component={MenuScreen} /> */}
      </AuthStack.Navigator>
    );
}

export default AuthNavigation