import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Button } from 'react-native';
import { Formik, Field } from 'formik';
import { paymentValidationSchema } from '../schemas/paymentSchema';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomInput from './CustomInput';


const PaymentComponent = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.signupContainer}>
          <Formik 
            initialValues={{ cardNumber: '', expirationDate: '', cvv: '', ID: '' }}
            onSubmit={values => console.log(values)}
            validationSchema={paymentValidationSchema}
          >
            {({ handleSubmit, isValid }) => (
              <>
                <View style={styles.infoRow}>
                  <Icon name="cc-visa" size={24} color="black" style={styles.icon} />
                  <Text>Card Number</Text>
                  <Field component={CustomInput} name="cardNumber" placeholder="Enter card number" keyboardType="numeric" />
                </View>
                <View style={styles.infoRow}>
                  <Icon name="calendar" size={24} color="black" style={styles.icon} />
                  <Text>Expiration Date</Text>
                  <Field component={CustomInput} name="expirationDate" placeholder="MM/YY" keyboardType="numeric"  />
                </View>
                <View style={styles.infoRow}>
                  <Icon name="lock" size={24} color="black" style={styles.icon} />
                  <Text>CVV</Text>
                  <Field component={CustomInput} name="cvv" placeholder="Enter CVV" keyboardType="numeric" />
                  <Icon name="id-card-o" size={24} color="black" style={styles.icon} />
                  <Text>ID</Text>
                  <Field component={CustomInput} name="ID" placeholder="Enter ID" keyboardType="numeric" />
                </View>
                <Button onPress={handleSubmit} title="Pay" disabled={!isValid} />
              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </>
  );
};

export default PaymentComponent;

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
