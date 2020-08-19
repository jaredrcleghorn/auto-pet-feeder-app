import React, { useState } from 'react'
import { Button, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';

export default function CreateAPasswordScreen() {
	// State.
	const [password, setPassword] = useState('');
	const [passwordIsValid, setPasswordIsValid] = useState(null);

	const handleNext = () => setPasswordIsValid(password.length >= 6);
	const [passwordInputStyle, invalidPasswordMessage] = passwordIsValid === false ? [
		invalidPasswordInputStyles,
		<Text style={styles.invalidPasswordMessage}>Passwords must be at least 6 characters.</Text>,
	] : [
		styles.passwordInput,
		null
	];

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.container}>
				<Text style={styles.title}>Create a Password</Text>
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
							setPasswordIsValid(null);
						}}
						onFocus={() => setPasswordIsValid(null)}
						onSubmitEditing={handleNext}
					/>
				</View>
				{invalidPasswordMessage}
				<View style={styles.nextButtonContainer}>
					<Button
						disabled={password === ''}
						title="Next"
						onPress={handleNext}
					/>
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
	passwordInputContainer: {
		flexDirection: 'row',
		marginHorizontal: 30,
		marginTop: 20,
	},
	passwordInput: {
		borderColor: 'gray',
		borderWidth: 1,
		flex: 1,
		height: 40,
		padding: 10,
	},
	invalidPasswordInput: {
		borderColor: 'red',
		borderWidth: 2,
	},
	invalidPasswordMessage: {
		color: 'red',
		marginTop: 5,
	},
	nextButtonContainer: {
		marginTop: 10,
	},
});
const invalidPasswordInputStyles = StyleSheet.compose(styles.passwordInput, styles.invalidPasswordInput);
