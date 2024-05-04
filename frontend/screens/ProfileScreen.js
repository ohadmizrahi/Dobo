import { useState, useEffect } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform,StatusBar } from 'react-native';
import { globalStyles } from '@Root/globalStyles';
import { sendGetRequest } from '@Utils/request/send';
import { handleResponse } from '@Utils/response/handler';
import { storeData, getData, removeMulti, getAllData } from '@Utils/storage/asyncStorage';
import {
  CustomButton,
  ProfilePicture,
  AccountInfoForm,
  PasswordForm,
  PaymentDetails,
  DoboLogo,
  LoadingIcon,
} from '@Components';

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

                const account = await getData('account');
                const parsedAccount = JSON.parse(account);
                await storeData('account', { ...parsedAccount, ...newAccount, imageurl: parsedAccount.imageurl});
                newAccount.imageurl = parsedAccount.imageurl || null

                const newProfile = {
                    ...profile,
                    account: newAccount,
                    paymentsMethod: accountData.paymentsMethod,
                };
                setProfile(newProfile);
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
            'clientRefreshToken',
            'client',
            'businessInfo',
            'virtualTable',
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
      <ProfilePicture name={profile.account.fullname} imageurl={profile.account.imageurl} handleUpdateProfile={setProfile}/>
      <AccountInfoForm data={profile.account} handleUpdateProfile={setProfile} />
      <PasswordForm />
      <PaymentDetails data={profile.paymentsMethod}/>
      <CustomButton handlePress={handleLogOut} title={'Log out'} buttonStyle={{backgroundColor: 'red'}}/>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}