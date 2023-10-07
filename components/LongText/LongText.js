import React, {memo, useState} from 'react';
import {Text} from 'react-native';
import style from './LongTextStyles';

const LongText = ({children, textStyle, charLimit = 200}) => {
  const [isDetailed, setIsDetailed] = useState(false);

  return (
    <>
      {children.length < charLimit ? (
        <Text style={textStyle}>{children}</Text>
      ) : (
        <Text style={textStyle}>
          {children.slice(0, isDetailed ? children.length : charLimit) + ' '}
          <Text
            style={{...textStyle, ...style.readMore}}
            onPress={() => setIsDetailed(prevState => !prevState)}>
            {isDetailed ? ' Show Less' : '...Read More'}
          </Text>
        </Text>
      )}
    </>
  );
};

export default memo(LongText);
