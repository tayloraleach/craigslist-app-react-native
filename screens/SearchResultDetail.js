import * as React from 'react';
import {Image, Text, View, ScrollView} from 'react-native';
import colors from '../lib/colors';
import fetcher from '../lib/fetcher';

function SearchResultDetail({route}) {
  const {title, images, price, hood, url: listingURL} = route.params;

  const [listingData, setListingData] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      let url = `http://192.168.1.73:5000/listing?url=${listingURL}`;
      const data = await fetcher(encodeURI(url));
      console.log(data);
    })();
  }, [listingURL]);

  return (
    <View style={styles.root}>
      <Text style={styles.hood}>{hood}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>{price}</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {images.map(uri => {
          return (
            <Image
              key={uri}
              resizeMode={'cover'}
              style={styles.image}
              source={{
                uri,
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = {
  root: {
    padding: 10,
    flex: 1,
  },
  scrollView: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  image: {
    width: '47%',
    height: 200,
    margin: 5,
  },
  price: {fontSize: 20, color: colors.purple, marginBottom: 20},
  title: {fontSize: 28, fontWeight: 'bold', marginBottom: 10},
  hood: {fontSize: 14, color: colors.purple},
};
export default SearchResultDetail;
