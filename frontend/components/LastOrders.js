import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FormContainer from '@Components/FormContainer';
import { ScrollView } from 'react-native-gesture-handler';

const LastOrders = ({ orders }) => {
    const [showClients, setShowClients] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [containerHeight, setContainerHeight] = useState(null);

    const handlePress = (order) => {
        setSelectedOrder(order);
        setShowClients(true);
    };
    
    useEffect(() => {
        let nOrders = orders.length || 1;
        const screenHeight = Dimensions.get('window').height;
        const currentHeight =  nOrders * 130;
        console.log('ORDER', currentHeight, screenHeight * 0.7);
        setContainerHeight(Math.min(currentHeight, screenHeight * 0.5));
    }, [orders]);


    const newDetailsContainerStyle = {
        paddingHorizontal: '9%',
        height: containerHeight,
        marginTop: 40
      };

    return (
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
    );
};

const styles = StyleSheet.create({
    orderItem: {
        flex: 1, 
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        width: '100%',
        height: 75,
        
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
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
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
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LastOrders;
