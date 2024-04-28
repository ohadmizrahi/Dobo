import { ScrollView, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import InvoiceComponent from '@Components/ItemPayment';
import YourAccountButton from '@Components/YourAccountButton';
import PaymentForm from '@Components/PaymentForm';
import ExitSign from '@Components/ExitSign';
import LineAcross from '@Components/LineAcross';
import HeaderImage from '@Components/HeaderImage';

// Define the invoice data
const invoicesData = [
    {
      id: '1',
      item: 'Classic Burger',
      price: 10,
      payers: ['John', 'Alice']
    },
    {
      id: '2',
      item: 'Pizza Margarita',
      price: 12,
      payers: ['Bob', 'Alice', 'Emily']
    },
];

export default function PayScreen({ navigation }) {
  const [invoices, setInvoices] = useState(invoicesData);

  const handleRemoveItem = (id) => {
    setInvoices(prevInvoices => prevInvoices.filter(item => item.id !== id));
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} style={{flex : 1}}>
    <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
      <StatusBar barStyle="light-content" />
      <HeaderImage />
      <ExitSign />
      <InvoiceComponent invoiceList={invoices} onRemoveItem={handleRemoveItem} />
      <YourAccountButton invoices={invoices} />
      <LineAcross text='Payment Method' />
      <PaymentForm submitTitle="Pay" edit={true}/>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}
