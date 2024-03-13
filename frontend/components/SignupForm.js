import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Button } from 'react-native';
import { Formik, Field } from 'formik';
import CustomInput from './CustomInput';
import { signUpValidationSchema } from '../schemas/signupSchema';
import Icon from 'react-native-vector-icons/FontAwesome';

// same structure as the signin form, but with different validation schema
// and the same style.
// needs to change style names to abstract the styles and reuse them


const SignUp = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.signupContainer}>
          <Formik 
            initialValues={{fullName: '',email: '',phoneNumber: '',address: '',birthday: '',password: '',confirmPassword: ''}}
            onSubmit={values => console.log(values)}
            validationSchema={signUpValidationSchema}
          >
            {({ handleSubmit, isValid }) => (
              <>
                <View style={styles.infoRow}>
                  <Icon name="user" size={24} color="black" style={styles.icon} />
                  <Text>Full Name</Text>
                  <Field component={CustomInput} name="fullName" />
                </View>
                <View style={styles.infoRow}>
                  <Icon name="envelope" size={24} color="black" style={styles.icon} />
                  <Text>Email</Text>
                  <Field component={CustomInput} name="email" keyboardType="email-address" />
                </View>
                <View style={styles.infoRow}>
                  <Icon name="mobile" size={24} color="black" style={styles.icon} />
                  <Text>Phone</Text>
                  <Field component={CustomInput} name="phoneNumber" keyboardType="numeric" />
                </View>
                <View style={styles.infoRow}>
                  <Icon name="home" size={24} color="black" style={styles.icon} />
                  <Text>Address</Text>
                  <Field component={CustomInput} name="address" />
                </View>
                <View style={styles.infoRow}>
                  <Icon name="gift" size={24} color="black" style={styles.icon} />
                  <Text>Birthday</Text>
                  <Field component={CustomInput} name="birthday" keyboardType="numeric" />
                </View>
                <View style={styles.infoRow}>
                  <Icon name="lock" size={24} color="black" style={styles.icon} />
                  <Text>Password</Text>
                  <Field component={CustomInput} name="password" secureTextEntry />
                </View>
                <View style={styles.infoRow}>
                  <Icon name="lock" size={24} color="black" style={styles.icon} />
                  <Text>Confirm Password</Text>
                  <Field component={CustomInput} name="confirmPassword" secureTextEntry />
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
    justifyContent: 'center',
    alignItems: 'center',

  },
  signupContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 100, // Reduced border radius to keep the container within bounds
    borderWidth: 5,
    borderColor: 'gray',
    margin: 10,
    padding: 20, // Added padding to keep content within the container
    maxWidth: '95%', // Added maxWidth to limit the width of the container
    paddingHorizontal: 30,

  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Adjusted to space between icons and input fields
    marginBottom: -5,
    
  },
  icon: {
    marginRight: 10, // Adjusted marginRight for better spacing between icon and input field
  },
});

