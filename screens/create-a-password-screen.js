import React, { useState } from 'react'
import { ActivityIndicator, Button, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

// Config.
import config from '../config.json';

// Constants.
import constants from '../constants.json';

// Components.
import PasswordInput from '../components/password-input';

export default function CreateAPasswordScreen({ route, navigation }) {
	// State.
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessageText, setErrorMessageText] = useState(null);

	const handleNext = () => {
		setErrorMessageText(null);

		if (password.length >= 6) {
			setIsLoading(true);

			fetch(`${config.autoPetFeederApiBaseUrl}/users`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					...route.params,
					password,
				}),
			})
				.then(response => response.ok ? navigation.navigate('Home') : null)
				.catch(() => setErrorMessageText(constants.registrationNetworkingErrorMessageText))
				.then(() => setIsLoading(false));
		} else {
			setErrorMessageText('Passwords must be at least 6 characters.');
		}
	};
	const [textInputStyle, errorMessage] = errorMessageText === null ? [
		null,
		null,
	] : [
		errorStyles.textInput,
		<Text style={styles.errorMessage}>{errorMessageText}</Text>,
	];

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.container}>
				<Text style={styles.title}>Create a Password</Text>
				<View style={styles.passwordInputAndErrorMessageContainer}>
					<View style={styles.passwordInputContainer}>
						<PasswordInput
							autoFocus={true}
							returnKeyType="next"
							textInputStyle={textInputStyle}
							onChangeText={text => {
								setPassword(text);
								setErrorMessageText(null);
							}}
							onFocus={() => setErrorMessageText(null)}
							onSubmitEditing={handleNext}
						/>
					</View>
					{errorMessage}
				</View>
				<View style={styles.nextButtonContainer}>
					{isLoading ? <ActivityIndicator /> : <Button
						disabled={password === ''}
						title="Next"
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
	passwordInputAndErrorMessageContainer: {
		alignSelf: 'stretch',
		marginHorizontal: 30,
		marginTop: 20,
	},
	passwordInputContainer: {
		flexDirection: 'row',
	},
	errorMessage: {
		color: 'red',
		marginTop: 5,
	},
	nextButtonContainer: {
		marginTop: 10,
	},
});
const errorStyles = StyleSheet.create({
	textInput: {
		borderColor: 'red',
	},
});
