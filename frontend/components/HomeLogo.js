import { View, Pressable } from 'react-native';
import { globalStyles } from '@Root/globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function HomeLogo() {
    const navigation = useNavigation(); 
    return (
        <View>
            <Pressable onPress={() => navigation.navigate('Nav')}>
                <Icon name="home" style={[globalStyles.headerIconLeft, globalStyles.icons]} />
            </Pressable>
        </View>
    );
}
