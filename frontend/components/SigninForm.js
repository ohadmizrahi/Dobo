import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Button } from 'react-native';
import { Formik, Field } from 'formik';
import CustomInput from './CustomInput';
import { signinValidationSchema } from '../schemas/signupSchema';
import Icon from 'react-native-vector-icons/FontAwesome';

// same structure as the signup form, but with different validation schema
// and the same style.
// needs to change style names to abstract the styles and reuse them


const SigninForm = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
      <View style={styles.signupContainer}>
          <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={values => console.log(values)}
          validationSchema={signinValidationSchema}

        >
   {({handleSubmit,isValid,}) => (
     <>
      <View style={styles.infoRow}>
        <Icon name="envelope" size={24} color="black" style={styles.icon} />
        <Text>Email</Text>
        <Field component={CustomInput} name="email"keyboardType="email-address" />
      </View>
      <View style={styles.infoRow}>
          <Icon name="lock" size={24} color="black" style={styles.icon} />
          <Text>Password</Text>
          <Field component={CustomInput} name="password" secureTextEntry />
      </View>
              <Button onPress={handleSubmit} title="LOGIN" disabled={!isValid}/>
              </>
              )}
            </Formik>
          </View>
        </SafeAreaView>
    </>
    
  )
}

export default SigninForm



const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  signupContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 100, 
    borderWidth: 5,
    borderColor: 'gray',
    margin: 10,
    padding: 20, 
    maxWidth: '95%', 
    paddingHorizontal: 30,

  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    marginBottom: -5,
    
  },
  icon: {
    marginRight: 10, 
  },
});


