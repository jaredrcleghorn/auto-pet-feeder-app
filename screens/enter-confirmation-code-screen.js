import React, { useState } from 'react';
import { ActivityIndicator, Animated, Button, Keyboard, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import sendConfirmationCode from '../functions/sendConfirmationCode';

// Config.
import config from '../config.json';

// Constants.
import constants from '../constants.json';

export default function EnterConfirmationCodeScreen({ route, navigation }) {
	// State.
	const [confirmationCode, setConfirmationCode] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [resendCodeTextIsResponding, setResendCodeTextIsResponding] = useState(false);
	const [errorMessageText, setErrorMessageText] = useState(null);

	const handleNext = () => {
		setIsLoading(true);

		const user = {
			...route.params,
			confirmationCode,
		};

		fetch(`${config.autoPetFeederApiBaseUrl}/verifyConfirmationCode`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(user),
		})
			.then(response => response.ok ? navigation.navigate('Create a Password', user) : setErrorMessageText("That code isn't valid. You can request a new one."))
			.catch(() => setErrorMessageText(constants.registrationNetworkingErrorMessageText))
			.then(() => setIsLoading(false));
	};
	const confirmationCodeIsValid = /^\d{6}$/.test(confirmationCode);
	const [confirmationCodeInputStyle, errorMessage] = errorMessageText === null ? [
		styles.confirmationCodeInput,
		null,
	] : [
		confirmationCodeInputErrorStyle,
		<Text style={styles.errorMessage}>{errorMessageText}</Text>
	];

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.container}>
				<Text style={styles.title}>Enter Confirmation Code</Text>
				<Text style={styles.caption}>
					Enter the confirmation code we sent to {route.params.email}. <Text
						style={resendCodeTextIsResponding ? resendCodeTextRespondingStyle : styles.resendCodeText}
						onPress={async () => {
							try {
								const response = await sendConfirmationCode(route.params.email);
							} catch {
								setErrorMessageText(constants.registrationNetworkingErrorMessageText);
							}
						}}
						onResponderGrant={() => setResendCodeTextIsResponding(true)}
						onResponderRelease={() => setResendCodeTextIsResponding(false)}
					>Resend Code</Text>.
				</Text>
				<View style={styles.confirmationCodeAndErrorMessageContainer}>
					<View style={styles.confirmationCodeInputContainer}>
						<TextInput
							autoFocus={true}
							clearButtonMode="while-editing"
							keyboardType="number-pad"
							placeholder="Confirmation Code"
							style={confirmationCodeInputStyle}
							onChangeText={text => {
								setConfirmationCode(text);
								setErrorMessageText(null);
							}}
							onFocus={() => setErrorMessageText(null)}
							onSubmitEditing={confirmationCodeIsValid ? handleNext : null}
						/>
					</View>
					{errorMessage}
				</View>
				<View style={styles.nextButtonContainer}>
					{isLoading ? <ActivityIndicator /> : <Button
						disabled={!confirmationCodeIsValid}
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
	caption: {
		marginTop: 10,
		textAlign: 'center',
	},
	resendCodeText: {
		color: 'blue',
		fontWeight: 'bold',
	},
	confirmationCodeAndErrorMessageContainer: {
		alignSelf: 'stretch',
		marginHorizontal: 30,
		marginTop: 20,
	},
	confirmationCodeInputContainer: {
		flexDirection: 'row',
	},
	confirmationCodeInput: {
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
const respondingStyles = StyleSheet.create({
	resendCodeText: {
		color: 'gray',
	},
});
const errorStyles = StyleSheet.create({
	confirmationCodeInput: {
		borderColor: 'red',
	},
});
const resendCodeTextRespondingStyle = StyleSheet.compose(styles.resendCodeText, respondingStyles.resendCodeText);
const confirmationCodeInputErrorStyle = StyleSheet.compose(styles.confirmationCodeInput, errorStyles.confirmationCodeInput);
