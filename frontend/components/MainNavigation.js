import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileLogo from '../components/ProfileLogo';
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

const Stack = createStackNavigator();

const HeaderRightComponent = ({ navigation }) => {
  return <ProfileLogo navigation={navigation} />;
};

const HeaderLeftComponent = ({ navigation }) => {
  return <HomeLogo navigation={navigation} />;
};

export default function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerStyle: {
          backgroundColor: "#3D3D3D",
          contentcolor: "#97DECC",
        },
        headerRight: ({ navigation }) => <HeaderRightComponent navigation={navigation} />,
        headerLeft: ({ navigation }) => <HeaderLeftComponent navigation={navigation} />,
      }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Item" component={ItamScreen} />
        <Stack.Screen name="BusinessInfo" component={BusinessInfoScreen} />
        <Stack.Screen name="JoinTable" component={JoinTableScreen} />
        <Stack.Screen name="Order" component={OrderScreen} />
        <Stack.Screen name="Pay" component={PayScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="OrderCart" component={OrderCartScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="TableReservation" component={TableReservationScreen} />
        <Stack.Screen name="TableStatus" component={TableStatusScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
