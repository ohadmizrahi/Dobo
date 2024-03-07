import { View, Pressable } from 'react-native';
import { globalStyles } from '../globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HomeLogo({ navigation }) {
    return (
        <View>
            <Pressable onPress={() => navigation.navigate('Home')}>
                <Icon name="home" style={[globalStyles.headerIconLeft, globalStyles.icons]} />
            </Pressable>
        </View>
    );
}
