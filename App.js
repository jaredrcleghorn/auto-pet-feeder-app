import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens.
import InitialScreen from './screens/initial-screen';
import EnterEmailScreen from './screens/enter-email-screen';
import EnterConfirmationCodeScreen from './screens/enter-confirmation-code-screen';
import CreateAPasswordScreen from './screens/create-a-password-screen';
import HomeScreen from './screens/home-screen';

const Stack = createStackNavigator();

export default function App() {
  return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					component={InitialScreen}
					name="Initial"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					component={EnterEmailScreen}
					name="Enter Email"
					options={{
						headerBackTitleVisible: false,
						headerTitle: '',
						headerTransparent: true,
					}}
				/>
				<Stack.Screen
					component={EnterConfirmationCodeScreen}
					name="Enter Confirmation Code"
					options={{
						headerBackTitleVisible: false,
						headerTitle: '',
						headerTransparent: true,
					}}
				/>
				<Stack.Screen
					component={CreateAPasswordScreen}
					name="Create a Password"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					component={HomeScreen}
					name="Home"
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
			<StatusBar style="auto" />
		</NavigationContainer>
  );
};
