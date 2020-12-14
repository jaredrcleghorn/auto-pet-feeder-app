import React, { useState } from 'react';
import { ActivityIndicator, Button, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import sendConfirmationCode from '../functions/sendConfirmationCode';

// Constants.
import constants from '../constants.json';

export default function EnterEmailScreen({ navigation }) {
	// State.
	const [email, setEmail] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessageText, setErrorMessageText] = useState(null);

	const handleNext = () => {
		setErrorMessageText(null);

		if (/^\S+@\S+.\S+$/.test(email) === true) {
			setIsLoading(true);

			sendConfirmationCode(email)
				.then(response => response.ok ? navigation.navigate('Enter Confirmation Code', { email }) : setErrorMessageText('This email is on another account.'))
				.catch(() => setErrorMessageText(constants.registrationNetworkingErrorMessageText))
				.then(() => setIsLoading(false));
		} else {
			setErrorMessageText('Please enter a valid email.');
		}
	}
	const [emailInputStyle, errorMessage] = errorMessageText === null ? [
		styles.emailInput,
		null
	] : [
		emailInputErrorStyle,
		<Text style={styles.errorMessage}>{errorMessageText}</Text>,
	];

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.container}>
				<Text style={styles.title}>Enter Email</Text>
				<View style={styles.emailInputAndErrorMessageContainer}>
					<View style={styles.emailInputContainer}>
						<TextInput
							autoCapitalize="none"
							autoCompleteType="email"
							autoCorrect={false}
							autoFocus={true}
							blurOnSubmit={false}
							clearButtonMode="while-editing"
							keyboardType="email-address"
							placeholder="Email"
							returnKeyType="next"
							style={emailInputStyle}
							onChangeText={text => {
								setEmail(text);
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
						disabled={email === ''}
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
	emailInputAndErrorMessageContainer: {
		alignSelf: 'stretch',
		marginHorizontal: 30,
		marginTop: 20,
	},
	emailInputContainer: {
		flexDirection: 'row',
	},
	emailInput: {
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
	emailInput: {
		borderColor: 'red',
	},
});
const emailInputErrorStyle = StyleSheet.compose(styles.emailInput, errorStyles.emailInput);
