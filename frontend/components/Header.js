import {View, Image, StatusBar, ScrollView} from 'react-native';
import {globalStyles} from '../globalStyles';

const logoImg = require('../assets/logo.png');
const profileImg = require('../assets/profile.png');

export default function Header() {
    return (
        <View style={globalStyles.container}>
            <StatusBar barStyle="light-content" />
                <Image source={profileImg} />
            <ScrollView> 
                <Image source={logoImg} style={globalStyles.image} />
            </ScrollView>

        </View>
    )
}
