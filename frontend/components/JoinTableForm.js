import { useEffect } from 'react';
import Form from '@Components/Form';
import FormContainer from '@Components/FormContainer';
import { Text, StyleSheet } from 'react-native';

const JoinTableForm = ({ qrData, joined, handleSubmit }) => {

  const fields = [
    { name: 'location', label: 'Location', iconName: 'map-marker', placeholder: 'Business Name' },
    { name: 'table', label: 'Table Code', iconName: 'cutlery', placeholder: 'Table Code' },
  ];

  useEffect(() => {
    if (qrData) {
      const {business, table} = qrData
      handleSubmit(business, table);
    }
  }, []);

  const onSubmit = async (values) => {
    handleSubmit(values.location, values.table);
  }


  if (joined) {
    return (
      <FormContainer formName="Welcome to your table!">
        <Text style={styles.joinedText}>You have successfully joined the table.</Text>
      </FormContainer>
    
    );
  }

  return (
    <Form
      initialValues={{location: '', table: ''}}
      onSubmit={onSubmit}
      fields={fields}
      submitTitle="Join"
      formName="Join Table"
      editable={true}
    />
  );
};

export default JoinTableForm;


const styles = StyleSheet.create({
  joinedText: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
  },
});