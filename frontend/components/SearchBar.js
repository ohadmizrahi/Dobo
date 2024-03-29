import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {globalStyles} from '../globalStyles';


export default function SearchBar() {
    const [search, setSearch] = useState('');

    const handleInputChange = (event) => {
        setSearch(event.target.value);
    }

    return (
        <View style={globalStyles.searchContain}>
            <TextInput style={globalStyles.textInput} onChange={handleInputChange}/>
            <Icon name="search" style={globalStyles.searchIcon}/>
        </View>
    );
}
