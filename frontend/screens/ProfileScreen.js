import { ScrollView, KeyboardAvoidingView, Platform,StatusBar } from 'react-native';
import CustomButton from '@Components/CustomButton';
import { globalStyles } from '@Root/globalStyles';
import ProfilePicture from '@Components/ProfilePic';
import DoboLogo from '@Components/DoboLogo';
import AccountInfoForm from '@Components/AccountInfoForm';
import PasswordForm from '@Components/PasswordForm';
import PaymentDetails from '@Components/PaymentDetails';
import { sendGetRequest } from '@Utils/request/send';
import { handleResponse } from '@Utils/response/handler';
import { storeData, getData, removeMulti, getAllData } from '@Utils/storage/asyncStorage';
import { useState, useEffect } from 'react';
import LoadingIcon from '@Components/LoadingIcon';

export default function ProfileScreen({ navigation }) {
  const [profile, setProfile] = useState({ account: {}, paymentsMethod: {} })
  const [loading, setLoading] = useState(true); 

    useEffect(() => {
    const fetchData = async () => {
        const userToken = await getData('userToken');
        const response = await sendGetRequest('api/profile', { userToken });

        await handleResponse(
            response,
            navigation,
            async (data, error) => {
                setLoading(false);
                const { data: accountData } = data;

                const newAccount = { ...accountData.account };
                delete newAccount.password;

                const newProfile = {
                    ...profile,
                    account: newAccount,
                    paymentsMethod: accountData.paymentsMethod,
                };
                setProfile(newProfile);

                await storeData('account', newAccount);
            }
        );
    };

    fetchData()
    }, []);

    async function handleLogOut() {
        const keysToRemove = [
            'userToken',
            'userRefreshToken',
            'clientToken',
            'account',
            'FriendsData',
            'cart'
        ];
        await removeMulti(keysToRemove);
        navigation.navigate('SignIn');
        const data2 = await getAllData()
        console.log('after', data2);
    }

  if (loading) { 
    return <LoadingIcon />;
  }
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} style={globalStyles.screenColor}>
    <ScrollView>
      <StatusBar barStyle="light-content" />
      <DoboLogo />
      <ProfilePicture name={profile.account.fullname} imageurl={profile.account.imageurl}/>
      <AccountInfoForm data={profile.account}/>
      <PasswordForm />
      <PaymentDetails data={profile.paymentsMethod}/>
      <CustomButton handlePress={handleLogOut} title={'Log out'} backgroundColor={'red'}/>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}