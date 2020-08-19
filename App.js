import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens.
import InitialScreen from './screens/initial-screen';
import EnterEmailScreen from './screens/enter-email-screen';

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
			</Stack.Navigator>
			<StatusBar style="auto" />
		</NavigationContainer>
  );
};
