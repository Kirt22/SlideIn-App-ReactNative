import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, TextInputProps, ViewStyle, StyleProp } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface CustomTextInputProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  error?: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({ containerStyle, error, secureTextEntry, ...props }) => {
  const [showPassword, setShowPassword] = useState(secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle, isFocused && styles.focused]}>
      <TextInput
        {...props}
        style={styles.input}
        secureTextEntry={showPassword}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconContainer}>
          <Icon name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="gray" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f5f3',
    borderRadius: 30,
    paddingHorizontal: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
    marginLeft: 10
  },
  iconContainer: {
    padding: 10,
  },
  focused: {
    borderWidth: 1,
    borderColor: '#bbb',
  },
});

export default CustomTextInput;
