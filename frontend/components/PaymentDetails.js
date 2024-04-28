import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { globalStyles } from "@Root/globalStyles";
import PaymentForm from "./PaymentForm";

export default function PaymentDetails({ data, navigation }) {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(data);

  useEffect(() => {
    setPaymentDetails(data);
  }, [data]);

  const handleAddPaymentMethod = () => {
    setShowPaymentForm(true);
  };

  if (paymentDetails && Object.keys(paymentDetails).length > 0) {
    return <PaymentForm paymentDetails={paymentDetails} submitTitle="Submit" edit={false} />;
  }
    if (showPaymentForm) {
    return <PaymentForm paymentDetails={paymentDetails} submitTitle="Submit" edit={true} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>No Payment Method</Text>
      <View style={styles.confirmBotton}>
        <TouchableOpacity
                onPress={handleAddPaymentMethod}
                >
          <Text style={styles.confirmButtonText}>Set</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    width: "95%",
    height: 230,
    borderRadius: 90,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 25,
  },
  text: {
    fontSize: 40,
    color: globalStyles.darkGrey,
    textAlign: "center",
    marginBottom: 30,
  },
  confirmBotton: {
    backgroundColor: '#D9D9D9',
    borderRadius: 50,
    width: 100,
    height: 30,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: -100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'black',
    fontSize: 16, 
  },
});
