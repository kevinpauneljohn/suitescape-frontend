import React, {useState, memo, forwardRef} from 'react';
import {View} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';
import style from './FormInputStyles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Colors} from '../../assets/Colors';

const theme = {
  colors: {
    primary: Colors.blue,
    background: 'white',
    text: 'black',
    placeholder: Colors.blue,
    onSurfaceVariant: 'gray',
  },
  roundness: 10,
};

const FormInput = forwardRef(
  (
    {
      type = 'text', // text, password, date
      value = null,
      onChangeText = null,
      placeholder = '',
      errorMessage = null,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showDatepicker, setShowDatepicker] = useState(false);

    const handlePasswordPress = () => {
      setShowPassword(prev => !prev);
    };

    const handleDatePress = () => {
      setShowDatepicker(true);
    };

    const handleDateConfirm = date => {
      if (!onChangeText) {
        console.log(
          'onChangeText is not defined',
          date.toISOString().split('T')[0],
        );
        return;
      }
      onChangeText(date.toISOString().split('T')[0]);
      setShowDatepicker(false);
    };

    const renderErrorMessages = () => {
      if (!errorMessage) {
        return null;
      }

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
            {...props}
            theme={theme}
            mode={'outlined'}
            value={value}
            onChangeText={onChangeText}
            label={placeholder}
            secureTextEntry={type === 'password' && !showPassword}
            outlineColor={errorMessage ? 'red' : null}
            ref={ref}
            right={
              type !== 'text' && (
                <TextInput.Icon
                  icon={
                    type === 'password'
                      ? showPassword
                        ? 'eye-off'
                        : 'eye'
                      : 'calendar'
                  }
                  onPress={
                    type === 'password' ? handlePasswordPress : handleDatePress
                  }
                />
              )
            }
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
          />
        )}
      </>
    );
  },
);

export default memo(FormInput);
