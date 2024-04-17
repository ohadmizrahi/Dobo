import React from 'react';
import { ScrollView } from 'react-native';
import MoveScreenBtn from '@Components/MoveScreenBtn';
import { globalStyles } from '@Root/globalStyles';
import ProfilePicture from '@Components/ProfilePic';
import DoboLogo from '@Components/DoboLogo';
import AccountInfoForm from '@Components/AccountInfoForm';
import PasswordForm from '@Components/PasswordForm';
import PaymentDetails from '@Components/PaymentDetails';
import { sendGetRequest } from '@Utils/request/send';
import { handleResponse } from '@Utils/response/handler';
import { storeData, getData } from '@Utils/storage/asyncStorage';
import { useState, useEffect } from 'react';

export default function ProfileScreen({ navigation }) {
  const [profile, setProfile] = useState({account: {}, paymentsMethod: {}})

    useEffect(() => {
    const fetchData = async () => {
        const userToken = await getData('userToken');
        const response = await sendGetRequest('api/profile', { userToken });

        await handleResponse(response, async (data, error) => {
        const { data: accountData } = data;

        const newAccount = { ...accountData.account };
        delete newAccount.password;

        const newProfile = {
            ...profile,
            account: newAccount,
            paymentsMethod: accountData.paymentsMethod,
        };
        setProfile(newProfile);

        await storeData('account', JSON.stringify(newAccount));
        });
    };

    fetchData()
    
    }, []);


  return (
    <ScrollView style={globalStyles.screenColor}>
      <DoboLogo />
      <ProfilePicture />
      <AccountInfoForm data={profile.account}/>
      <PasswordForm />
      <PaymentDetails data={profile.paymentsMethod}/>
      <MoveScreenBtn navigation={navigation} screen={'SignIn'} title={'Log out'} backgroundColor={'red'}/>
    </ScrollView>
  );
}