import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function InitialScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Auto Pet Feeder</Text>
			<Button
				title="Create New Account"
				onPress={() => navigation.navigate('Enter Email')}
			/>
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
});
