import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, StatusBar, Button } from 'react-native';
import { Formik, Field } from 'formik';
import CustomInput from './CustomInput';
import { signUpValidationSchema } from '../schemas/signupSchema';
import Icon from 'react-native-vector-icons/FontAwesome';

const SignUp = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.signupContainer}>
          <Formik
            initialValues={{
              fullName: '',
              email: '',
              phoneNumber: '',
              address: '',
              birthday: '',
              password: '',
              confirmPassword: ''
            }}
            onSubmit={values => console.log(values)}
            validationSchema={signUpValidationSchema}
          >
            {({ handleSubmit, isValid }) => (
              <>
  <View style={styles.infoRow}>
    <Icon name="user" size={24} color="black" style={styles.icon} />
    <Field component={CustomInput} name="fullName" placeholder="Full Name" />
  </View>
  <View style={styles.infoRow}>
    <Icon name="envelope" size={24} color="black" style={styles.icon} />
    <Field component={CustomInput} name="email" placeholder="Email Address" keyboardType="email-address" />
  </View>
  <View style={styles.infoRow}>
    <Icon name="mobile" size={24} color="black" style={styles.icon} />
    <Field component={CustomInput} name="phoneNumber" placeholder="Phone Number" keyboardType="numeric" />
  </View>
  <View style={styles.infoRow}>
    <Icon name="home" size={24} color="black" style={styles.icon} />
    <Field component={CustomInput} name="address" placeholder="Address" />
  </View>
  <View style={styles.infoRow}>
    <Icon name="gift" size={24} color="black" style={styles.icon} />
    <Field component={CustomInput} name="birthday" placeholder="Birthday" />
  </View>
  <View style={styles.infoRow}>
    <Icon name="lock" size={24} color="black" style={styles.icon} />
    <Field component={CustomInput} name="password" placeholder="Password" secureTextEntry />
  </View>
  <View style={styles.infoRow}>
    <Icon name="lock" size={24} color="black" style={styles.icon} />
    <Field component={CustomInput} name="confirmPassword" placeholder="Confirm Password" secureTextEntry />
  </View>
  <Button onPress={handleSubmit} title="SIGN UP" disabled={!isValid} />
</>

            )}
          </Formik>
        </View>
      </SafeAreaView>
    </>
  );
};

export default SignUp;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',

  },
  signupContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 100,
    borderWidth: 5,
    borderColor: 'gray',
    margin: 10,
    justifyContent: 'space-evenly',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',

  },
  icon: {
    marginLeft: 10,
    marginRight: 10,
  
  },
});
