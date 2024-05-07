import { useState, useEffect } from 'react';

import { ScrollView, KeyboardAvoidingView, Platform,StatusBar ,Modal,StyleSheet, View } from 'react-native';
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
                const parsedAccount = account ? JSON.parse(account) : {};
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
            'businessInfo',
            'account',
        ];
        await removeMulti(keysToRemove);
        navigation.navigate('SignIn');
    }

    if (loading) {
        return <LoadingIcon backgroundColor={'#3D3D3D'}/>;
    }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} style={globalStyles.screenColor}>
    <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
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

const styles = StyleSheet.create({
  loadingOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});