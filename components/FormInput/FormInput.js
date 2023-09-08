import React, {useState} from 'react';
import {View} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';
import {Colors} from '../../assets/Colors';
import style from './FormInputStyles';

const FormInput = ({
  password = false,
  errorMessage = null,
  placeholder = '',
  ...props
}) => {
  const theme = {
    colors: {
      primary: 'gray',
      secondary: Colors.gray,
      background: 'white',
    },
  };

  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={style.container}>
      <TextInput
        theme={theme}
        {...props}
        mode={'outlined'}
        label={placeholder}
        secureTextEntry={password && !showPassword}
        right={
          password && (
            <TextInput.Icon
              icon={showPassword ? 'eye' : 'eye-off'}
              onPress={() => setShowPassword(!showPassword)}
            />
          )
        }
      />
      <HelperText
        type={'error'}
        visible={errorMessage}
        style={errorMessage && style.errorText}>
        {errorMessage}
      </HelperText>
    </View>
  );
};

export default FormInput;
