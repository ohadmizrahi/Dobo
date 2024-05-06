import { ScrollView, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import {
  TableReservationForm,
  BussinesHeader,
  ExitSign,
  HeaderImage,
  CustomButton,
  FormHeadLine
} from '@Components';



export default function TableReservationScreen({ navigation, route }) {
  const { businessId = '', imageurl = '', name = '' } = route.params || {};
  const [formData, setFormData] = useState({}); // State to store form data
  const [specialRequest, setSpecialRequest] = useState('');


  const handleFormChange = (values) => {
    setFormData(values); // Update the form data in the state
  };

  const handleSubmit = async () => {
    console.log('Submitting reservation:', formData);
    console.log('Special request check:', specialRequest);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} style={{ flex: 1 }}>
      <ScrollView>
        <StatusBar barStyle="light-content" />
        <ExitSign />
        <HeaderImage data={imageurl} />
        <FormHeadLine data={name} />
        <BussinesHeader />
        <TableReservationForm data={businessId}/>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
