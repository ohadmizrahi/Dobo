import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { paymentValidationSchema } from '@Schemas/paymentSchema';
import Form from '@Components/Form';
import { getData } from '@Utils/storage/asyncStorage';
import { sendPostRequest } from '@Utils/request/send.js';
import { handleResponse } from '@Utils/response/handler';
import { formatDate } from '@Utils/dates';

const PaymentForm = ({ paymentDetails, submitTitle, edit, formName='Payment' }) => {
  const [editable, setEditable] = useState(edit);
  const navigation = useNavigation();

  const fields = [
    { name: 'cardNumber', label: 'Card Number', iconName: 'cc-visa', placeholder: 'Enter card number', keyboardType: 'numeric', secureTextEntry: true },
    { name: 'expirationDate', label: 'Expiration Date', iconName: 'calendar', placeholder: 'MM/YY', keyboardType: 'numeric' },
    { name: 'cvv', label: 'CVV', iconName: 'lock', placeholder: 'Enter CVV', keyboardType: 'numeric', secureTextEntry: true },
    { name: 'ID', label: 'ID', iconName: 'id-card-o', placeholder: 'Enter ID', keyboardType: 'numeric' },
  ];

  const onSubmit = async (values) => {

    const paymentInfo = {
      cardNumber: values.cardNumber,
      experationDate: `01/${values.expirationDate}`.replace(/\//g, '-').split('-').reverse().join('-'),
      cvv: values.cvv,
      citizenId: values.ID,
    };

    const [day, month, year] = values.expirationDate.split("/"); // Format needs change to month,year
    const formattedDate = `${year}-${month}-${day}`; // Format needs change to YY-MM
    paymentInfo["experationdate"] = formattedDate;
    if (submitTitle != "pay") {
    try {
      const userToken = await getData('userToken');
      const response = await sendPostRequest('api/profile/update/payment-method', paymentInfo, { userToken });
      await handleResponse(
        response,
        navigation,
        async (data, error) => {
          if (response.success && response.success.data.success) {
            Alert.alert('Success', 'Your payment information has been updated successfully.');
          }
          navigation.navigate('Profile');
        }
      );
    } catch (error) {
      const errorMessage = error.response?.data?.error?.message || 'There was an error. Please try again.';
      Alert.alert('Error', errorMessage);
    }
  }
    else {
      Alert.alert('Succsess', "payment is done successfully");
      navigation.navigate('OrderCart');
      // add function to send  to backend and delete item from cart
    }
  }

  return (
    <Form
      initialValues={
        paymentDetails ? {
          cardNumber: paymentDetails.cardnumber,
          expirationDate: formatDate(paymentDetails.experationdate, withoutDay=true),
          cvv: paymentDetails.cvv,
          ID: paymentDetails.citizenid,

        } : {}
      }
      validationSchema={paymentValidationSchema}
      onSubmit={onSubmit}
      fields={fields}
      submitTitle={submitTitle}
      formName={formName}
      editable={editable}
    />
  );
};

export default PaymentForm;
