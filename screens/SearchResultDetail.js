import * as React from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import colors from '../lib/colors';
import fetcher from '../lib/fetcher';
import HTML from 'react-native-render-html';
import Loader from '../components/Loader';
import moment from 'moment-mini';
import Badge from '../components/Badge';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SearchResultDetail({route}) {
  // TODO: This might break for expired listings
  const {
    title,
    images,
    price,
    hood,
    datePosted,
    url: listingURL,
  } = route.params;

  const [listingData, setListingData] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      if (!listingData) {
        let url = `http://192.168.1.73:5000/listing?url=${listingURL}`;
        try {
          const data = await fetcher(encodeURI(url));
          setListingData(data);
        } catch (e) {
          console.log('Maybe it was deleted or expired?', url, e);
        }
      }
    })();
  }, [listingData, listingURL]);

  const contentWidth = useWindowDimensions().width;

  return (
    <View style={styles.root}>
      <View style={styles.head}>
        <View style={styles.meta}>
          {hood ? <Text style={styles.hood}>{hood} - </Text> : null}
          <Text>({moment(datePosted).fromNow()})</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {price ? <Badge text={price} size={16} /> : null}
          <TouchableOpacity
            onPress={async () => {
              try {
                // Get all saved listings, if any
                // await AsyncStorage.clear();
                let savedListings = await AsyncStorage.getItem('listings');

                const listing = {
                  ...route.params,
                };

                let newListings = [listing];

                if (JSON.parse(savedListings)) {
                  newListings = [listing, ...JSON.parse(savedListings)];
                }

                await AsyncStorage.setItem(
                  'listings',
                  JSON.stringify(newListings),
                );
              } catch (e) {
                // saving error
                console.log(e, '=====)');
              }
            }}>
            <Icon style={{marginLeft: 10}} name="favorite" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      {listingData ? (
        <ScrollView style={styles.outerScrollView}>
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
    flex: 1,
  },
  head: {
    padding: 10,
    paddingBottom: 0,
  },
  meta: {flexDirection: 'row', alignItems: 'center'},
  outerScrollView: {
    padding: 10,
    flex: 1,
    marginTop: 10,
    borderTopColor: colors.grey,
    borderTopWidth: 1,
    paddingTop: 10,
  },
  scrollView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginVertical: 20,
  },
  image: {
    height: 200,
    marginTop: 5,
  },
  title: {fontSize: 22, fontWeight: 'bold', marginBottom: 5},
  hood: {fontSize: 14, color: colors.purple},
  hoodText: {fontSize: 14, color: colors.purple},
};
export default SearchResultDetail;
