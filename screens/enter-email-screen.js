import React, { useState } from 'react';
import { Button, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';

export default function EnterEmailScreen() {
	// State.
	const [email, setEmail] = useState('');
	const [emailIsValid, setEmailIsValid] = useState(null);

	const handleNext = () => setEmailIsValid(/^\S+@\S+.\S+$/.test(email));
	const [emailInputStyle, invalidEmailMessage] = emailIsValid === false ? [
		invalidEmailInputStyles,
		<Text style={styles.invalidEmailMessage}>Please enter a valid email.</Text>,
	] : [
		styles.emailInput,
		null,
	];

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.container}>
				<Text style={styles.title}>Enter Email</Text>
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
							setEmailIsValid(null);
						}}
						onFocus={() => setEmailIsValid(null)}
						onSubmitEditing={handleNext}
					/>
				</View>
				{invalidEmailMessage}
				<View style={styles.nextButtonContainer}>
					<Button
						disabled={email === ''}
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
	emailInputContainer: {
		flexDirection: 'row',
		marginHorizontal: 30,
		marginTop: 20,
	},
	emailInput: {
		borderColor: 'gray',
		borderWidth: 1,
		flex: 1,
		height: 40,
		padding: 10,
	},
	invalidEmailInput: {
		borderColor: 'red',
		borderWidth: 2,
	},
	invalidEmailMessage: {
		color: 'red',
		marginTop: 5,
	},
	nextButtonContainer: {
		marginTop: 10,
	},
});
const invalidEmailInputStyles = StyleSheet.compose(styles.emailInput, styles.invalidEmailInput);
