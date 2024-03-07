import {View, Pressable} from 'react-native';
import {globalStyles} from '../globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HomeLogo( {navigation} ) {
    return (
        <View>
            <Pressable onPress={() => navigation.navigate('Home')}>
            <Icon name="user" style={[globalStyles.headerIconRight,globalStyles.icons]} />
            </Pressable>
        </View>
    )
}