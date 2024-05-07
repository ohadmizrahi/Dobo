import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getData, storeData } from '@Utils/storage/asyncStorage';

const TableHeader = ({ title, showPencilButton, style }) => {
  const [tableName, setTableName] = useState(title);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const fetchTableName = async () => {
      if (title) {
        setTableName(title);
      } else {
        let virtualTable = await getData('virtualTable');
        if (typeof virtualTable === 'string') {
          virtualTable = JSON.parse(virtualTable);
          setTableName(virtualTable.virtualTableName);
      }
    };
  }

    fetchTableName();
  }, []);

  async function storeNewName() {
    let virtualTable = await getData('virtualTable');
    if (typeof virtualTable === 'string') {
      virtualTable = JSON.parse(virtualTable);
      await storeData('virtualTable', { ...virtualTable, virtualTableName: tableName });
    }
  }
  
  const handleIconPress = () => {
    if (edit) {
      storeNewName();
    }
    setEdit(!edit);
  };

  return (
    <View style={[styles.head, style]}>
      {showPencilButton && (
        <TouchableOpacity onPress={handleIconPress}>
          <View style={styles.iconContainer}>
            <Icon name={edit ? "check-circle" : "pencil"} size={30} color="#333" />
          </View>
        </TouchableOpacity>
      )}
      <TextInput
        style={styles.text}
        value={tableName}
        onChangeText={setTableName}
        editable={edit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  head: {
    justifyContent: 'center',
    width: '80%',
    height: '65%',
    alignSelf: 'center',
    backgroundColor: '#97DECC',
    marginTop: '10%',
    marginBottom: '15%',
    borderRadius: 50,
    maxHeight: 80,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    maxWidth: '60%',
    alignSelf: 'center',
  },
  iconContainer: {
    position: 'absolute',
    right: '12%'

  },
});

export default TableHeader;
