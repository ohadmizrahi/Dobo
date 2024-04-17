import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileLogo from '@Components/ProfileLogo';
import HomeLogo from './HomeLogo';
import HomeScreen from '@Screens/HomeScreen';
import ItamScreen from '@Screens/ItemScreen';
import BusinessInfoScreen from '@Screens/BusinessInfoScreen';
import JoinTableScreen from '@Screens/JoinTableScreen';
import OrderScreen from '@Screens/OrderScreen';
import PayScreen from '@Screens/PayScreen';
import MenuScreen from '@Screens/MenuScreen';
import OrderCartScreen from '@Screens/OrderCartScreen';
import ProfileScreen from '@Screens/ProfileScreen';
import SignInScreen from '@Screens/SignInScreen';
import SignUpScreen from '@Screens/SignUpScreen';
import TableReservationScreen from '@Screens/TableReservationScreen';
import TableStatusScreen from '@Screens/TableStatusScreen';
import ScanQRScreen from '@Screens/ScanQRScreen';
import Navscreen from '@Screens/NavScreen';

const Stack = createStackNavigator();

const HeaderRightComponent = ({ navigation }) => {
  return <ProfileLogo navigation={navigation} />;
};

const HeaderLeftComponent = ({ navigation }) => {
  return <HomeLogo navigation={navigation} />;
};



const MainHeaderOptions = {
  headerStyle: {
    backgroundColor: "#3D3D3D",
  },
  headerRight: ({ navigation }) => <HeaderRightComponent navigation={navigation} />,
  headerLeft: ({ navigation }) => <HeaderLeftComponent navigation={navigation} />,
};



export default function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Nav">
        <Stack.Screen name="Nav" component={Navscreen} options={MainHeaderOptions}/>
        <Stack.Screen name="Home" component={HomeScreen} options={MainHeaderOptions}/>
        <Stack.Screen name="Item" component={ItamScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="BusinessInfo" component={BusinessInfoScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="JoinTable" component={JoinTableScreen} options={MainHeaderOptions}/>
        <Stack.Screen name="Order" component={OrderScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Pay" component={PayScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Menu" component={MenuScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="OrderCart" component={OrderCartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={MainHeaderOptions}/>
        <Stack.Screen name="SignIn" component={SignInScreen} options={MainHeaderOptions}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={MainHeaderOptions}/>
        <Stack.Screen name="TableReservation" component={TableReservationScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="TableStatus" component={TableStatusScreen} options={MainHeaderOptions}/>
        <Stack.Screen name='QRScanner' component={ScanQRScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}



