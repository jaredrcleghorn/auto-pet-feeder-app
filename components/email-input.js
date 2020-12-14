import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default function EmailInput(props) {
	const textInputStyle = StyleSheet.compose(styles.textInput, props.textInputStyle);

	return (
		<View style={styles.container}>
			<TextInput
				autoCapitalize="none"
				autoCorrect={false}
				autoFocus={true}
				blurOnSubmit={false}
				clearButtonMode="while-editing"
				placeholder="Email"
				returnKeyType="next"
				style={textInputStyle}
				onChangeText={props.onChangeText}
				onFocus={props.onFocus}
				onSubmitEditing={props.onSubmitEditing}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
	textInput: {
		borderColor: 'gray',
		borderWidth: 1,
		flex: 1,
		height: 40,
		padding: 10,
	},
});
