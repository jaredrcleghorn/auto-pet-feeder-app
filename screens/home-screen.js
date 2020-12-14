import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Welcome</Text>
			<Button
				title="Log Out"
				onPress={() => navigation.navigate('Initial')}
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
