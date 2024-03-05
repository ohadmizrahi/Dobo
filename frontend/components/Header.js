import {View, Image, StatusBar, ScrollView} from 'react-native';
import {globalStyles} from '../globalStyles';
import {profileImg,logoImg} from './Image'


export default function Header() {
    return (
        <View style={globalStyles.container}>
            <StatusBar barStyle="light-content" />
                 <Image source={profileImg}/>
            <ScrollView>
                 <Image source={logoImg}/>
            </ScrollView>
        </View>
    )
}
