import Form from '@Components/Form';
import { useNavigation } from '@react-navigation/native';
import { getData } from '@Utils/storage/asyncStorage';
import { sendPostRequest } from '@Utils/request/send.js';
import { handleResponse } from '@Utils/response/handler';
import { Alert } from 'react-native';
import { sendGetRequest } from '@Utils/request/send.js';
import {passwordValidationSchema} from '@Schemas/passwordSchema';

const PasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [dummyPassword,setdummyPassword] = useState('123456789')

  const fields = [
    { name: 'password', label: 'Password', iconName: 'lock', placeholder: 'Enter password', secureTextEntry: true },
  ];

    const onSubmit = async (values) => {
      const confirmChangePassword = async () => {
        setIsLoading(true);

        const passwordInfo = {
          password: dummyPassword,
        };

        try {
          const userToken = await getData('userToken');
          const getResponse = await sendGetRequest('api/auth/token/reset-password', { userToken });
          console.log('getResponse:', getResponse);
          await handleResponse(
            getResponse,
            navigation,
            async (data, error) => {
              if (getResponse.success && getResponse.success.data.token) {
                try {
                  const reset = {
                    resetPasswordToken: getResponse.success.data.token,
                    password: values.password,
                  };
                  const postResponse = await sendPostRequest('api/profile/update/password', reset, { userToken });
                  console.log('postResponse:', postResponse);
                  await handleResponse(
                    postResponse,
                    navigation,
                    async (data, error) => {
                      if (postResponse.success && postResponse.success.data.success) {
                        Alert.alert('Success', 'Your password has been updated successfully.');
                      }
                    }
                  );
                } catch (error) {
                  const errorMessage = error.postResponse?.data?.error?.message || 'There was an error. Please try again.';
                  Alert.alert('Error', errorMessage);
                } finally {
                  setIsLoading(false);
                }
              }
              navigation.navigate('Profile');
            }
          );
        } catch (error) {
          const errorMessage = error.getResponse?.data?.error?.message || 'There was an error. Please try again.';
          Alert.alert('Error', errorMessage);
        } finally {
          setIsLoading(false);
        }
      };
    
      Alert.alert(
        'Confirmation',
        'Are you sure you want to change the password?',
        [
          {
            text: "No",
            onPress: () => {
              Alert.alert('Password has not been changed');
            },
            style: "cancel"
          },
          {
            text: "I'm sure",
            onPress: () => {
              setIsLoading(true);
              confirmChangePassword();
            }
          }
        ]
      );
    };



  return (
    <Form
      initialValues={{ password: dummyPassword }}
      onSubmit={onSubmit}
      validationSchema={passwordValidationSchema}
      fields={fields}
      submitTitle="Submit"
      isLoading={isLoading}
      formName="Password"
      editable={false}
    />
  );
};

export default PasswordForm;
