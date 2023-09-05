import React, {useState} from 'react';
import {Pressable, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import style from './FormInputStyles';

const FormInput = ({password = false, ...props}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={style.container}>
      <TextInput
        {...props}
        secureTextEntry={password && !showPassword}
        style={{
          ...style.textInput,
          ...{paddingVertical: password ? 20 : 16},
        }}
      />
      {password && (
        <Pressable
          onPress={() => setShowPassword(!showPassword)}
          style={style.eyeContainer}>
          {showPassword ? (
            <Icon name={'eye-slash'} size={20} color={'gray'} />
          ) : (
            <Icon name={'eye'} size={20} color={'gray'} />
          )}
        </Pressable>
      )}
    </View>
  );
};

export default FormInput;
