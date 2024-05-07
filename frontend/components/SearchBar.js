import { View, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { globalStyles } from '@Root/globalStyles';


export default function SearchBar() {

    return (
        <View style={globalStyles.searchContain}>
            <TextInput style={globalStyles.textInput}/>
            <TouchableOpacity onPress={
                () => Alert.alert('Search', 'This functionality is not part of the POC')
            }>
                <Icon name="search" style={globalStyles.searchIcon}/>
            </TouchableOpacity>
        </View>
    );
}
