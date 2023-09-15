import React from 'react';
import {Checkbox} from 'react-native-paper';
import {Text, View} from 'react-native';
import Link from '../Link/Link';
import style from './AgreementBoxStyles';
import {Colors} from '../../assets/Colors';
import {useTheme} from '@react-navigation/native';

const AgreementBox = ({checked, setChecked}) => {
  const {colors} = useTheme();

  return (
    <View style={style.container}>
      <Checkbox.Android
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => setChecked(!checked)}
        color={Colors.blue}
      />
      <Text
        style={{
          color: colors.text,
          ...style.textContainer,
        }}>
        I have agreed to the{' '}
        <Link
          type={'text'}
          onPress={() => console.log('Terms and Conditions')}
          textStyle={style.text}>
          {'Terms and Conditions'}
        </Link>{' '}
        and{' '}
        <Link
          type={'text'}
          onPress={() => console.log('Privacy Policy')}
          textStyle={style.text}>
          {'Privacy Policy'}
        </Link>{' '}
        of Suitescape.
      </Text>
    </View>
  );
};

export default AgreementBox;
