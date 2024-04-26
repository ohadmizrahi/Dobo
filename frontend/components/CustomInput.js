import { useState, useEffect } from 'react'
import { Text, TextInput, StyleSheet, View } from 'react-native'

const CustomInput = (props) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props

  const hasError = errors[name] && touched[name]

  const handleDatesChange = (text = '') => {
    if (value && text.length < value.length) {
      if (text.endsWith('/') || text.endsWith(':')) {
        onChange(name)(text.slice(0, -1));
        return;
      }
    }
    if (text.length === 2 && name === 'expirationDate') {
      onChange(name)(text + '/');
    }
    else if (text.length === 2 && name === 'hour') {
      onChange(name)(text + ':');
    }
    else if ((text.length === 2 || text.length === 5) && (name === 'birthday' || name === 'date' || name === 'expirationDate')) {
      // || name === 'expirationDate' needs to be deleted
      onChange(name)(text + '/');
    }
    else {
      onChange(name)(text);
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={handleDatesChange}
        onBlur={() => {
          setFieldTouched(name)
          onBlur(name)
        }}
        {...inputProps}
      />
      {hasError && (
        <View>
          <Text style={styles.errorText}>{errors[name]}</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '82%',
    maxWidth: '50%',
    margin: 10,
    position: 'relative',

  },
  textInput: {
    height: 25,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 20,
    padding: 5,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
    position: 'absolute',
    bottom: -13,
    left: 5,
  },
})

export default CustomInput;