import React, {useState, memo, forwardRef} from 'react';
import {Keyboard, Platform, View} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';
import style from './FormInputStyles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Colors} from '../../assets/Colors';
import {useTheme} from '@react-navigation/native';

const FormInput = forwardRef(
  (
    {
      type = 'text', // text, password, date
      value = null,
      onChangeText = null,
      onDateConfirm = null,
      placeholder = '',
      errorMessage = null,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showDatepicker, setShowDatepicker] = useState(false);

    const {colors} = useTheme();

    const inputTheme = {
      colors: {
        ...colors,
        primary: Colors.blue,
        placeholder: Colors.blue,
        onSurfaceVariant: 'gray',
      },
      roundness: 10,
    };

    const handlePasswordPress = () => {
      setShowPassword(prev => !prev);
    };

    const handleDatePress = () => {
      setShowDatepicker(true);
      Keyboard.dismiss();
    };

    const handleDateConfirm = date => {
      if (!onChangeText) {
        console.log('onChangeText is not defined');
        return;
      }

      const confirmed = onDateConfirm && onDateConfirm(date);

      if (confirmed !== false || !onDateConfirm) {
        onChangeText(date.toISOString().split('T')[0]);
      }
      setShowDatepicker(false);
    };

    const renderErrorMessages = () => {
      if (!errorMessage) {
        return null;
      }

      // Note: Each error message is an array
      return errorMessage.map((message, index) => (
        <HelperText key={index} type={'error'} visible={message}>
          {message}
        </HelperText>
      ));
    };

    return (
      <>
        <View
          style={{
            ...style.inputContainer,
            ...(errorMessage && {marginBottom: 4}),
          }}>
          <TextInput
            ref={ref}
            theme={inputTheme}
            mode={'outlined'}
            value={value}
            onChangeText={onChangeText}
            label={placeholder}
            secureTextEntry={type === 'password' && !showPassword}
            outlineColor={errorMessage ? 'red' : null}
            textColor={colors.text}
            right={
              type !== 'text' && (
                <TextInput.Icon
                  icon={
                    type === 'password'
                      ? showPassword
                        ? 'eye'
                        : 'eye-off'
                      : 'calendar'
                  }
                  onPress={
                    type === 'password' ? handlePasswordPress : handleDatePress
                  }
                />
              )
            }
            {...props}
          />
          {renderErrorMessages()}
        </View>
        {type === 'date' && showDatepicker && (
          <DateTimePickerModal
            mode={'date'}
            isVisible={showDatepicker}
            onCancel={() => setShowDatepicker(false)}
            onConfirm={handleDateConfirm}
            date={
              value && !isNaN(Date.parse(value)) ? new Date(value) : new Date()
            }
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
          />
        )}
      </>
    );
  },
);

export default memo(FormInput);
