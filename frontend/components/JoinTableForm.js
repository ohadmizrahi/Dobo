import { useState } from 'react';
import Form from '@Components/Form';


const JoinTableForm = ({ qrData, joined, handleSubmit }) => {
  const [initialValues, setInitialValues] = useState({location: '', table: ''});
  const [qrObject, setQrObject] = useState(qrData ? qrData : null);

  const fields = [
    { name: 'location', label: 'Location', iconName: 'map-marker', placeholder: 'Business Name' },
    { name: 'table', label: 'Table Code', iconName: 'cutlery', placeholder: 'Table Code' },
  ];

  if (qrObject) {
    const business = qrObject.business.toString()
    const table = qrObject.table.toString()
    setInitialValues({location: business, table: table});
    setQrObject(null);
  }

  const onSubmit = async (values) => {
    handleSubmit(values.location, values.table);
  }


  if (joined) {
    return (
      <Form
        initialValues={initialValues}
        fields={[]}
        submitTitle="Joined !"
        formName="Welcome to your table!"
        editable={false}
      />
    
    );
  }

  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      fields={fields}
      submitTitle="Join"
      formName="Join Table"
      editable={true}
    />
  );
};

export default JoinTableForm;
