import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function InitialScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Auto Pet Feeder</Text>
			<View style={styles.buttonsContainer}>
				<Button
					title="Create New Account"
					onPress={() => navigation.navigate('Enter Email')}
				/>
				<Button
					title="Log In"
					onPress={() => navigation.navigate('Log In')}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
	},
	title: {
		fontSize: 30,
	},
	buttonsContainer: {
		marginTop: 10,
	},
});
