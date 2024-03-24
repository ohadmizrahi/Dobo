import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Button } from 'react-native';
import { Formik, Field } from 'formik';
import CustomInput from './CustomInput';
import Icon from 'react-native-vector-icons/FontAwesome';

const Form = ({ initialValues, validationSchema, onSubmit, fields, error, submitTitle }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.signupContainer}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ handleSubmit, isValid }) => (
            <>
              {fields.map((field, index) => (
                <View key={index} style={styles.infoRow}>
                  <Icon name={field.iconName} size={24} color="black" style={styles.icon} />
                  <Text>{field.label}</Text>
                  <Field
                    component={CustomInput}
                    name={field.name}
                    placeholder={field.placeholder}
                    keyboardType={field.keyboardType}
                    secureTextEntry={field.secureTextEntry}
                  />
                </View>
              ))}
              <Button
                onPress={handleSubmit}
                title={submitTitle || 'Submit'} // If fields.submitTitle is not defined, 'Submit' will be used as the title
                disabled={!isValid}
              />
              {error && <Text style={styles.error}>{error}</Text>}
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default Form;

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
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});
