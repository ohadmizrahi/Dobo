import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Formik, Field } from 'formik';
import CustomInput from './CustomInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import FormContainer from '@Components/FormContainer';

const Form = ({ initialValues, validationSchema, onSubmit, fields, error, submitTitle, formName, editable }) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [isEditMode, setIsEditMode] = useState(editable);

  useEffect(() => {
    setFormValues(initialValues);
  }, [initialValues]);

  const handleSubmit = async (values, actions) => {
    await onSubmit(values, actions);
    setIsEditMode(editable);
  };

  return (
    <FormContainer formName={formName}>
        <Formik
          initialValues={formValues}
          onSubmit={handleSubmit} 
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
                    editable={isEditMode} 
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
    </FormContainer>
  );
};

export default Form;

const styles = StyleSheet.create({
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
