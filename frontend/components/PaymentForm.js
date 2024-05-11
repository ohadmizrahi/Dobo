import { useState } from 'react';
import { Alert, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { paymentValidationSchema } from '@Schemas/paymentSchema';
import Form from '@Components/Form';
import { getData, storeData } from '@Utils/storage/asyncStorage';
import { sendPostRequest } from '@Utils/request/send.js';
import { handleResponse } from '@Utils/response/handler';
import { formatDate } from '@Utils/dates';
import LoadingIcon from '@Components/LoadingIcon';

const PaymentForm = ({ paymentDetails, submitTitle, edit, formName='Payment', handlePayment }) => {
  const [editable, setEditable] = useState(edit);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const fields = [
    { name: 'cardNumber', label: 'Card Number', iconName: 'cc-visa', placeholder: 'Enter card number', keyboardType: 'numeric', secureTextEntry: true },
    { name: 'expirationDate', label: 'Expiration Date', iconName: 'calendar', placeholder: 'MM/YYYY', keyboardType: 'numeric' },
    { name: 'cvv', label: 'CVV', iconName: 'lock', placeholder: 'Enter CVV', keyboardType: 'numeric', secureTextEntry: true },
    { name: 'ID', label: 'ID', iconName: 'id-card-o', placeholder: 'Enter ID', keyboardType: 'numeric' },
  ];

  const onSubmit = async (values) => {
    setIsLoading(true);

    const paymentInfo = {
      cardNumber: values.cardNumber,
      experationDate: `01/${values.expirationDate}`.replace(/\//g, '-').split('-').reverse().join('-'),
      cvv: values.cvv,
      citizenId: values.ID,
      type: "visa",
    };

    if (submitTitle != "Pay") {
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
   finally {
    setIsLoading(false);
    }
  }
    else {
      const paidForm = true
      handlePayment(paidForm);
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <View style={{marginTop : "10%"}}>
        <LoadingIcon />
      </View>
      )
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
