import { useState, useEffect } from 'react'
import { Text, TextInput, StyleSheet } from 'react-native'

const CustomInput = (props) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props

  console.log('CustomInput', props.field);

  const hasError = errors[name] && touched[name]

  const handleDatesChange = (text) => {
    if (text.length === 2 && value.length === 1 && name === 'expirationDate') {
      // Automatically add '/' after the user enters two numbers
      onChange(name)(text + '/');
    }
    else if ((text.length === 2 || text.length === 5) && name === 'birthday') {
      onChange(name)(text + '/');
    }
    else {
      onChange(name)(text);
    }
  };

  return (
    <>
      <TextInput
        style={[
          styles.textInput,
          hasError && styles.errorInput
        ]}
        value={value}
        onChangeText={handleDatesChange}
        onBlur={() => {
          setFieldTouched(name)
          onBlur(name)
        }}
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </>
  )
}

const styles = StyleSheet.create({
  textInput: {
    height: 25,
    width: '82%',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 20,
    maxWidth: '50%',
    padding: 5,

  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
  errorInput: {
    borderColor: 'red',
  }
})

export default CustomInput;