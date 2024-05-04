import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { globalStyles } from "@Root/globalStyles";
import PaymentForm from "./PaymentForm";

export default function PaymentDetails({ data }) {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(data);

  useEffect(() => {
    setPaymentDetails(data);
  }, [data]);

  const handleAddPaymentMethod = () => {
    setShowPaymentForm(true);
  };

  if (showPaymentForm || (paymentDetails && Object.keys(paymentDetails).length > 0)) {
    return <PaymentForm paymentDetails={paymentDetails} submitTitle="Submit" edit={false} />;
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
    height: 250,
    borderRadius: 90,
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 10,
  },
  text: {
    fontSize: 40,
    color: globalStyles.darkGrey,
  },
  confirmBotton: {
    backgroundColor: '#D9D9D9',
    borderRadius: 50,
    width: 100,
    height: 30,
    alignSelf: 'center',
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'black',
    fontSize: 16, 
  },
});
