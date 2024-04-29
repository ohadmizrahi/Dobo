import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const InvoiceComponent = ({ onRemoveItem, check }) => {
    console.log('Item Payment check', check);

    const handleRemoveItem = (id) => {
        Alert.alert(
            'Confirm',
            'Are you sure you want to remove this item?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => onRemoveItem(id),
                },
            ],
            { cancelable: false }
        );
    };

    const renderItem = ({ item }) => {
        console.log('order', item);
        return (
        <View style={styles.invoiceItem}>
            <TouchableOpacity onPress={() => handleRemoveItem(item.orderid)}>
                <Icon name="minus-circle" size={24} color="red" />
            </TouchableOpacity>
            <View style={styles.invoiceDetails}>
                <Text style={styles.invoiceText}>{item.itemname}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.invoiceText}>${item.clientcost}</Text>
                    <Text style={styles.invoiceText}>Out of</Text>
                    <Text style={styles.invoiceText}>${item.totalprice}</Text>
                </View>
                <Text style={styles.invoiceText}>{item.clientcost === item.totalprice ? 'Me' : 'Table'}</Text>
            </View>
        </View>
    )};

    return (
        <View style={styles.container}>
            <Text style={styles.header}>You pay on</Text>
            <FlatList
                data={check}
                keyExtractor={(item) => item.orderid}
                renderItem={renderItem}
                style={{padding: 10}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10,
    },
    total: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    invoiceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingHorizontal: 10,
    },
    removeButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    removeButtonText: {
        color: 'red',
        fontSize: 20,
        fontWeight: 'bold',
    },
    invoiceDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        padding: 10,
    },
    invoiceText: {
        alignItems: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    priceContainer: {
        alignItems: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
});

export default InvoiceComponent;
