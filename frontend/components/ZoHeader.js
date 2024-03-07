import {View, StatusBar} from 'react-native';
import {globalStyles} from '../globalStyles';
import { LogoImage  } from './Image';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Header() {
    return (
        <View style={globalStyles.container}>
            <StatusBar barStyle="light-content" />
            <Icon name="home" style={[globalStyles.headerIconLeft,globalStyles.icons]} />
            <Icon name="user" style={[globalStyles.headerIconRight,globalStyles.icons]} />
            <LogoImage />
        </View>
    )
}