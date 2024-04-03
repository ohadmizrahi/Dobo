import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileLogo from '../components/ProfileLogo';
// import ExitSign from '../components/ExitSign';
import HomeLogo from './HomeLogo';
import HomeScreen from '../screens/HomeScreen';
import ItamScreen from '../screens/ItemScreen';
import BusinessInfoScreen from '../screens/BusinessInfoScreen';
import JoinTableScreen from '../screens/JoinTableScreen';
import OrderScreen from '../screens/OrderScreen';
import PayScreen from '../screens/PayScreen';
import MenuScreen from '../screens/MenuScreen';
import OrderCartScreen from '../screens/OrderCartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import TableReservationScreen from '../screens/TableReservationScreen';
import TableStatusScreen from '../screens/TableStatusScreen';
import ScanQRScreen from '../screens/ScanQRScreen';

const Stack = createStackNavigator();

const HeaderRightComponent = ({ navigation }) => {
  return <ProfileLogo navigation={navigation} />;
};

const HeaderLeftComponent = ({ navigation }) => {
  return <HomeLogo navigation={navigation} />;
};

// const ExitSignComponent = ({ navigation }) => {
//   return <ExitSign navigation={navigation} />;
// };

const MainHeaderOptions = {
  headerStyle: {
    backgroundColor: "#3D3D3D",
  },
  headerRight: ({ navigation }) => <HeaderRightComponent navigation={navigation} />,
  headerLeft: ({ navigation }) => <HeaderLeftComponent navigation={navigation} />,
};

// const ExitSignOptions = {
//   headerStyle: {
//     backgroundColor: "#3D3D3D",
//   },
//   headerRight: ({ navigation }) => <ExitSignComponent navigation={navigation} />,
// };

export default function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
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



