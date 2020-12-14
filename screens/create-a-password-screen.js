import React, { useState } from 'react'
import { ActivityIndicator, Button, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';

// Config.
import config from '../config.json';

// Constants.
import constants from '../constants.json';

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
	const [passwordInputStyle, errorMessage] = errorMessageText === null ? [
		styles.passwordInput,
		null,
	] : [
		passwordInputErrorStyle,
		<Text style={styles.errorMessage}>{errorMessageText}</Text>,
	];

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.container}>
				<Text style={styles.title}>Create a Password</Text>
				<View style={styles.passwordInputAndErrorMessageContainer}>
					<View style={styles.passwordInputContainer}>
						<TextInput
							autoCapitalize="none"
							autoCompleteType="password"
							autoCorrect={false}
							autoFocus={true}
							blurOnSubmit={false}
							clearButtonMode="while-editing"
							placeholder="Password"
							returnKeyType="next"
							secureTextEntry={true}
							style={passwordInputStyle}
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
	passwordInput: {
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
	nextButtonContainer: {
		marginTop: 10,
	},
});
const errorStyles = StyleSheet.create({
	passwordInput: {
		borderColor: 'red',
	},
});
const passwordInputErrorStyle = StyleSheet.compose(styles.passwordInput, errorStyles.passwordInput);
