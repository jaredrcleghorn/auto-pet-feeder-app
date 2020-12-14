import React, { useRef, useState } from 'react';
import { ActivityIndicator, Alert, Button, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import sendConfirmationCode from '../functions/sendConfirmationCode';

// Config.
import config from '../config.json';

// Constants.
import constants from '../constants.json';

// Components.
import EmailInput from '../components/email-input';
import PasswordInput from '../components/password-input';

export default function LogInScreen({ navigation }) {
	// State.
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	// Refs.
	const passwordInput = useRef(null);

	const handleNext = async () => {
		setIsLoading(true);

		fetch(`${config.autoPetFeederApiBaseUrl}/tokens`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email,
				password,
			}),
		})
			.then(response => response.ok ? navigation.navigate('Home') : Alert.alert(`Incorrect password for ${email}`, 'The password you entered is incorrect. Please try again.', [{ text: 'Try Again' }]))
			.catch(() => Alert.alert('Error', 'Please check your internet connection and try again later.'))
			.then(() => setIsLoading(false));
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.container}>
				<Text style={styles.title}>Auto Pet Feeder</Text>
				<View style={styles.inputsContainer}>
					<EmailInput
						onChangeText={text => setEmail(text)}
						onSubmitEditing={() => passwordInput.current.focus()}
					/>
					<View style={styles.passwordInputContainer}>
						<PasswordInput
							_ref={passwordInput}
							returnKeyType="go"
							onChangeText={text => setPassword(text)}
							onSubmitEditing={handleNext}
						/>
					</View>
				</View>
				<View style={styles.logInButtonContainer}>
					{isLoading ? <ActivityIndicator /> : <Button
						disabled={email === '' || password === ''}
						title="Log In"
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
	inputsContainer: {
		alignSelf: 'stretch',
		marginHorizontal: 30,
		marginTop: 20,
	},
	passwordInputContainer: {
		flexDirection: 'row',
		marginTop: 10,
	},
	logInButtonContainer: {
		marginTop: 10,
	},
});
