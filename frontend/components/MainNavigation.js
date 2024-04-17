import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileLogo from '@Components/ProfileLogo';
// import ExitSign from '@Components/ExitSign';
import withFocusHandler from '@Components/withFocusHandler';
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
  gestureEnabled: true
};



export default function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Nav">
        <Stack.Screen name="Nav" component={withFocusHandler(Navscreen)} options={MainHeaderOptions}/>
        <Stack.Screen name="Home" component={withFocusHandler(HomeScreen)} options={MainHeaderOptions}/>
        <Stack.Screen name="Item" component={withFocusHandler(ItamScreen)} options={{ headerShown: false }}/>
        <Stack.Screen name="BusinessInfo" component={withFocusHandler(BusinessInfoScreen)} options={{ headerShown: false }}/>
        <Stack.Screen name="JoinTable" component={withFocusHandler(JoinTableScreen)} options={MainHeaderOptions}/>
        <Stack.Screen name="Order" component={withFocusHandler(OrderScreen)} options={{ headerShown: false }} />
        <Stack.Screen name="Pay" component={withFocusHandler(PayScreen)} options={{ headerShown: false }}/>
        <Stack.Screen name="Menu" component={withFocusHandler(MenuScreen)} options={{ headerShown: false }}/>
        <Stack.Screen name="OrderCart" component={withFocusHandler(OrderCartScreen)} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={withFocusHandler(ProfileScreen)} options={MainHeaderOptions}/>
        <Stack.Screen name="SignIn" component={withFocusHandler(SignInScreen)} options={MainHeaderOptions}/>
        <Stack.Screen name="SignUp" component={withFocusHandler(SignUpScreen)} options={MainHeaderOptions}/>
        <Stack.Screen name="TableReservation" component={withFocusHandler(TableReservationScreen)} options={{ headerShown: false }}/>
        <Stack.Screen name="TableStatus" component={withFocusHandler(TableStatusScreen)} options={MainHeaderOptions}/>
        <Stack.Screen name='QRScanner' component={withFocusHandler(ScanQRScreen)} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}



