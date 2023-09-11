import React, {useRef, useState} from 'react';
import {TextInput, View} from 'react-native';
import style from './OTPBoxesStyles';

const OTPBoxes = ({size = 6}) => {
  const [OTP, setOTP] = useState(Array(size).fill(''));
  const inputRefs = useRef(Array(size).fill(null));

  const renderOTPBoxes = () => {
    let OTPInputs = [];

    for (let i = 0; i < size; i++) {
      OTPInputs.push(
        <TextInput
          key={i}
          ref={ref => (inputRefs.current[i] = ref)}
          maxLength={1}
          keyboardType={'numeric'}
          value={OTP[i]}
          onChangeText={value => {
            let newOTP = [...OTP];
            newOTP[i] = value;
            setOTP(newOTP);
            if (value && i < size - 1) {
              inputRefs.current[i + 1].focus();
            }
          }}
          onKeyPress={({nativeEvent: {key}}) => {
            if (key === 'Backspace' && !OTP[i] && i > 0) {
              inputRefs.current[i - 1].focus();
            }
          }}
          style={{
            ...style.input,
            ...(OTP[i] && {borderColor: 'black'}),
          }}
        />,
      );
    }

    return OTPInputs;
  };

  return <View style={style.container}>{renderOTPBoxes()}</View>;
};

export default OTPBoxes;
