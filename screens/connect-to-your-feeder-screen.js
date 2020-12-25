import React, { useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';

export default function ConnectToYourFeederScreen({ navigation }) {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessageText, setErrorMessageText] = useState(null);

	const handleNext = () => {
		setErrorMessageText(null);
		setIsLoading(true);

		fetch('http://192.168.4.1/networks')
			.then(response => response.ok ? navigation.navigate('Home') : null)
			.catch(error => setErrorMessageText('Sorry, we couldn\'t connect to your feeder. Please confirm you are connected to "Auto Pet Feeder" and try again in a moment.'))
			.then(() => setIsLoading(false));
	};
	const errorMessage = errorMessageText === null ? null : <Text style={styles.errorMessage}>{errorMessageText}</Text>;

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Connect to Your Feeder</Text>
			<Text style={styles.text}>Plug in your feeder, and connect this device to the Wi&#8209;Fi network "Auto Pet Feeder".</Text>
			{errorMessage}
			<View style={styles.nextButtonContainer}>
				{isLoading ? <ActivityIndicator /> : <Button
					title="Next"
					onPress={handleNext}
				/>}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
		marginHorizontal: 30,
	},
	title: {
		fontSize: 30,
	},
	text: {
		marginTop: 20,
		textAlign: 'center',
	},
	errorMessage: {
		color: 'red',
		marginTop: 10,
		textAlign: 'center',
	},
	nextButtonContainer: {
		marginTop: 10,
	},
});
