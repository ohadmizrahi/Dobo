import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

const withFocusHandler = (Component) => {
  return (props) => {
    const [key, setKey] = useState(Math.random());
    const isFocused = useIsFocused();

    useEffect(() => {
      if (isFocused) {
        setKey(Math.random());
      }
    }, [isFocused]);

    return <Component key={key} {...props} />;
  };
};

export default withFocusHandler;