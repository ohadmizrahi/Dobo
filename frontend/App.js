import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileLogo, withFocusHandler, HomeLogo } from '@Components';
import {
  HomeScreen,
  ItemScreen,
  BusinessInfoScreen,
  JoinTableScreen,
  OrderScreen,
  PayScreen,
  MenuScreen,
  OrderCartScreen,
  ProfileScreen,
  SignInScreen,
  SignUpScreen,
  TableReservationScreen,
  TableStatusScreen,
  ScanQRScreen
} from '@Screens';

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
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  headerRight: ({ navigation }) => <HeaderRightComponent navigation={navigation} />,
  headerLeft: ({ navigation }) => <HeaderLeftComponent navigation={navigation} />,
  gestureEnabled: true
};



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={withFocusHandler(HomeScreen)} options={{...MainHeaderOptions,title: ""}}/>
        <Stack.Screen name="Item" component={withFocusHandler(ItemScreen)} options={{ headerShown: false }}/>
        <Stack.Screen name="BusinessInfo" component={withFocusHandler(BusinessInfoScreen)} options={{ headerShown: false }}/>
        <Stack.Screen name="JoinTable" component={withFocusHandler(JoinTableScreen)} options={{...MainHeaderOptions,title: ""}}/>
        <Stack.Screen name="Order" component={withFocusHandler(OrderScreen)} options={{ headerShown: false }} />
        <Stack.Screen name="Pay" component={withFocusHandler(PayScreen)} options={{ headerShown: false }}/>
        <Stack.Screen name="Menu" component={withFocusHandler(MenuScreen)} options={{ headerShown: false }}/>
        <Stack.Screen name="OrderCart" component={withFocusHandler(OrderCartScreen)} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={withFocusHandler(ProfileScreen)} options={{...MainHeaderOptions,title: ""}}/>
        <Stack.Screen name="SignIn" component={withFocusHandler(SignInScreen)} options={{...MainHeaderOptions,title: ""}}/>
        <Stack.Screen name="SignUp" component={withFocusHandler(SignUpScreen)} options={{...MainHeaderOptions,title: ""}}/>
        <Stack.Screen name="TableReservation" component={withFocusHandler(TableReservationScreen)} options={{ headerShown: false }}/>
        <Stack.Screen name="TableStatus" component={withFocusHandler(TableStatusScreen)} options={{...MainHeaderOptions,title: ""}}/>
        <Stack.Screen name='QRScanner' component={withFocusHandler(ScanQRScreen)} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
