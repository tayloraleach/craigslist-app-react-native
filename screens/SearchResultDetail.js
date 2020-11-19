import * as React from 'react';
import {Image, Text, View, ScrollView, useWindowDimensions} from 'react-native';
import colors from '../lib/colors';
import fetcher from '../lib/fetcher';
import HTML from 'react-native-render-html';
import Loader from '../components/Loader';

function SearchResultDetail({route}) {
  // TODO: This might break for expired listings
  const {title, images, price, hood, url: listingURL} = route.params;

  const [listingData, setListingData] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      if (!listingData) {
        let url = `http://192.168.1.73:5000/listing?url=${listingURL}`;
        try {
          const data = await fetcher(encodeURI(url));
          setListingData(data);
        } catch (e) {
          console.log('Maybe it was delted or expired?', url, e);
        }
      }
    })();
  }, [listingData, listingURL]);

  const contentWidth = useWindowDimensions().width;

  return (
    <View style={styles.root}>
      {hood ? <Text style={styles.hood}>{hood}</Text> : null}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>{price}</Text>
      {listingData ? (
        <ScrollView style={{flex: 1}}>
          <HTML
            classesStyles={{
              'print-qrcode-container': {
                display: 'none',
              },
              root: {
                color: 'black',
              },
            }}
            html={`<div class="root">${listingData.data.contentBody}</div>`}
            contentWidth={contentWidth}
          />
          {console.log(listingData.data.contentBody)}
          <ScrollView contentContainerStyle={styles.scrollView}>
            {images.map(uri => {
              return (
                <Image
                  key={uri}
                  resizeMode={'cover'}
                  style={{...styles.image, width: contentWidth / 2 - 12.5}}
                  source={{
                    uri,
                  }}
                />
              );
            })}
          </ScrollView>
        </ScrollView>
      ) : (
        <Loader />
      )}
    </View>
  );
}

const styles = {
  root: {
    padding: 10,
    flex: 1,
  },
  scrollView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  image: {
    height: 200,
    marginTop: 5,
  },
  price: {fontSize: 20, color: colors.purple, marginBottom: 20},
  title: {fontSize: 28, fontWeight: 'bold', marginBottom: 10},
  hood: {fontSize: 14, color: colors.purple},
};
export default SearchResultDetail;
