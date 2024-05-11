import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FormContainer from '@Components/FormContainer';

const LastOrders = ({ orders }) => {
    const [showClients, setShowClients] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [containerHeight, setContainerHeight] = useState(null);

    const handlePress = (order) => {
        setSelectedOrder(order);
        setShowClients(true);
    };
    
    useEffect(() => {
        let length = orders.length;
        if (length<=4) length=4;
        let contentHeight = length * 50; 
        const screenHeight = Dimensions.get('window').height;
        const maxContainerHeight = screenHeight * 0.6; // 60% of screen height
        setContainerHeight(Math.min(contentHeight, maxContainerHeight));
    }, [orders]);


    const newDetailsContainerStyle = {
        ...styles.detailsContainer,
        margin: 0,
        padding: 10,
        paddingHorizontal: 50,
        maxWidth: '100%',
      };

    return (
        <View style={{ height: containerHeight, marginTop: 40 }}>
            <FormContainer formName='Latest Orders' style={newDetailsContainerStyle}>
            <ScrollView>
            {orders.length > 0 ? orders.map(order => (
                <View key={order.orderid} style={styles.orderItem}>
                    <Text style={[styles.orderText, { flex: 1 }]}> {order.itemname}</Text> 
                    <Text style={[styles.orderText, { flex: 1 }]}> {order.itemprice}$</Text>
                    <Text style={[styles.orderText, { flex: 1 }]}> {order.status}</Text>
                    <TouchableOpacity style={styles.iconButton} onPress={() => handlePress(order)}>
                        <Icon name='users' size={20} color="#97DECC" />
                    </TouchableOpacity>
                </View>
            )) : <Text style={styles.noOrders}>No Orders Yet</Text>}
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={showClients}
                onRequestClose={() => {
                    setShowClients(!showClients);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {selectedOrder && selectedOrder.clients.map((client, index) => (
                            <Text key={index}>{client.clientName}</Text>
                        ))}
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setShowClients(!showClients)}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </FormContainer>
        </View>
    );
};

const styles = StyleSheet.create({
    orderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        width: '100%',
        
    },
    orderText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        
    },
    bold: {
        fontWeight: 'bold',
    },
    noOrders: {
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        padding: 10,
        margin: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#97DECC",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    iconButton: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LastOrders;
