import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default function PasswordInput(props) {
	const textInputStyle = StyleSheet.compose(styles.textInput, props.textInputStyle);

	return (
		<TextInput
			autoCapitalize="none"
			autoCompleteType="password"
			autoCorrect={false}
			autoFocus={props.autoFocus}
			blurOnSubmit={false}
			clearButtonMode="while-editing"
			placeholder="Password"
			ref={props._ref}
			returnKeyType={props.returnKeyType}
			secureTextEntry={true}
			style={textInputStyle}
			onChangeText={props.onChangeText}
			onFocus={props.onFocus}
			onSubmitEditing={props.onSubmitEditing}
		/>
	);
}

const styles = StyleSheet.create({
	textInput: {
		borderColor: 'gray',
		borderWidth: 1,
		flex: 1,
		height: 40,
		padding: 10,
	},
});
