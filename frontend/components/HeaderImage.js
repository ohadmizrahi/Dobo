import { Image, View } from 'react-native';
import { BASE_URL, BE_PORT } from '@env';

const HeaderImage = ({ data }) => {
  const image = data ? `${BASE_URL}:${BE_PORT}/assets/${data}` : 'https://www.collinsdictionary.com/images/full/restaurant_135621509.jpg';
    return (
      <View style={styles.shadow}>
      <Image
        style={styles.image}
        source={{ uri: image }}
      />
      </View>
    );
  }
  const styles = ({
    image: {
      width: '100%',
      height: 250 ,
      marginBottom: 20,
    },
    shadow: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.8,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });
  
  
export default HeaderImage;