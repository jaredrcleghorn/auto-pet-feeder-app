import React, { useState } from 'react';
import { ActivityIndicator, Button, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';

// Config.
import config from '../config.json';

export default function AddAFeederScreen({ route, navigation }) {
	// State.
	const [name, setName] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessageText, setErrorMessageText] = useState(null);

	const handleNext = () => {
		setErrorMessageText(null);
		setIsLoading(true);

		fetch(`${config.autoPetFeederApiBaseUrl}/feeders`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${route.params.token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name }),
		})
			.then(response => response.ok ? navigation.navigate('Connect to Your Feeder') : null)
			.catch(() => setErrorMessageText("Sorry, we couldn't add your feeder. Please confirm you have an internet connection and try again in a moment."))
			.then(() => setIsLoading(false));
	};
	const [nameInputStyle, errorMessage] = errorMessageText === null ? [
		styles.nameInput,	
		null,
	] : [
		errorStyles.nameInput,
		<Text style={styles.errorMessage}>{errorMessageText}</Text>,
	];

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.container}>
				<Text style={styles.title}>Add a Feeder</Text>
				<View style={styles.nameInputAndErrorMessageContainer}>
					<View style={styles.nameInputContainer}>
						<TextInput
							autoCapitalize="words"
							autoCorrect={true}
							autoFocus={true}
							blurOnSubmit={false}
							clearButtonMode="while-editing"
							placeholder="Name"
							returnKeyType="go"
							style={styles.nameInput}
							onChangeText={text => {
								setName(text);
								setErrorMessageText(null);
							}}
							onFocus={() => setErrorMessageText(null)}
							onSubmitEditing={name !== '' ? handleNext : null}
						/>
					</View>
					{errorMessage}
				</View>
				<View style={styles.addButtonContainer}>
					{isLoading ? <ActivityIndicator /> : <Button
						disabled={name === ''}
						title="Add"
						onPress={handleNext}
					/>}
				</View>
			</View>
		</TouchableWithoutFeedback>
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
	nameInputAndErrorMessageContainer: {
		alignSelf: 'stretch',
		marginHorizontal: 30,
		marginTop: 20,
	},
	nameInputContainer: {
		flexDirection: 'row',
	},
	nameInput: {
		borderColor: 'gray',
		borderWidth: 1,
		flex: 1,
		height: 40,
		padding: 10,
	},
	errorMessage: {
		color: 'red',
		marginTop: 5,
	},
	addButtonContainer: {
		marginTop: 10,
	},
});
const errorStyles = StyleSheet.create({
	nameInput: {
		borderColor: 'red',
	},
});
