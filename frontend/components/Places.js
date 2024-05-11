import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL, BE_PORT } from '@env';

const Places = ({ title, data }) => {
    const navigation = useNavigation();
    const [selectedBusinessId, setSelectedBusinessId] = useState(null);
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        if (!data) {
            return;
        }
        const mappedPlaces = data.map((item) => {
            return {
                businessId: item.businessid,
                name: item.name,
                shortdesc: item.shortdesc,
                image: `${BASE_URL}:${BE_PORT}/assets/${item.imageurl}`
                }
            });
        setPlaces(mappedPlaces);
    }, [data]);


    const handleBusinessPress = async (businessId) => {
        setSelectedBusinessId(businessId);
        navigation.navigate('BusinessInfo', { businessId });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <FlatList
                data={ places }
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleBusinessPress(item.businessId)}>
                        <View style={styles.place}>
                            <Image style={styles.image} source={{ uri: item.image }} resizeMode='cover' />
                            <Text style={styles.title}>{item.name}</Text>
                            <Text style={styles.type}>{item.shortdesc}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.businessId.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
                ListEmptyComponent={() => <Text>No places found</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        margin:5,
        marginTop: 10,
        overflow: 'hidden',
        width: '100%',
        height: '100%',
    },
    place: {
        width: 130,
        height: 130,
        borderRadius: 15,
        backgroundColor: '#fff',
        shadowColor: '#333',
        
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginLeft: 4,
    },
    type: {
        fontSize: 13,
        color: '#666',
        alignSelf: 'flex-start',
        marginLeft: 4,
    },
    image: {
        width: 130,
        height: 80,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        alignSelf: 'center',
    },
    sectionTitle: {
        fontSize: 20,
        color: '#EFEFEF',
        alignSelf: 'center',
        marginBottom: 10,
    },
});

export default Places;