import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Formik, Field } from 'formik';
import CustomInput from './CustomInput';
import Icon from 'react-native-vector-icons/FontAwesome';

const Form = ({ initialValues, validationSchema, onSubmit, fields, error, submitTitle, formName, editable }) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [isEditMode, setIsEditMode] = useState(editable);

  useEffect(() => {
    setFormValues(initialValues);
  }, [initialValues]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.detailsContainer}>
        <View style={[styles.formHeadLine, styles.shadowBottom]}>
          <Text style={styles.formHeadLineText}>{formName}</Text>
        </View>
        <Formik
          initialValues={formValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          enableReinitialize
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
                    editable={isEditMode} // Pass editable prop to CustomInput
                  />
                </View>
              ))}
              <TouchableOpacity
                onPress={isEditMode ? handleSubmit : () => setIsEditMode(true)}
                style={styles.confirmButton}
                disabled={!isValid}>
                <Text style={styles.confirmButtonText}>
                  {isEditMode ? (submitTitle || 'Submit') : (editable ? submitTitle || 'Submit' : 'Edit')}
                </Text>
              </TouchableOpacity>
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
    marginTop: 25,
  },
  detailsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    borderWidth: 5,
    borderColor: '#EFEFEF',
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
  formHeadLine: {
    width: 300,
    height: 50,
    alignSelf: 'center',
    backgroundColor: '#97DECC',
    borderRadius: 50,
    marginTop: -40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formHeadLineText: {
    fontSize: 20,
    color: '#000',
  },
  shadowBottom: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  confirmButton: {
    backgroundColor: '#D9D9D9',
    borderRadius: 50,
    width: 150,
    height: 30,
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'black',
    fontSize: 16,
  },
  editButtonText: {
    color: 'blue',
    fontSize: 16,
  },
});
