import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

const FilterPlaces = () => {
    const filters = ['Late Night', 'Happy Hour', 'Breakfast'];

    return (
        <View style={styles.rowContainer}>
            {filters.map((filter, index) => (
                <TouchableOpacity key={index} style={styles.container} onPress={
                    () => Alert.alert('Filters', 'This functionality is not part of the POC')}>
                    <Text style={styles.text}>{filter}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    container: {
        backgroundColor: "#97DECC",
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 5,
        minWidth: 120,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        color: "black",
    },
});

export default FilterPlaces;
