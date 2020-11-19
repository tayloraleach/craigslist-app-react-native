import * as React from 'react';
import {FlatList, View} from 'react-native';
import Loader from '../components/Loader';
import SearchResultItem from '../components/SearchResultItem';
import fetcher from '../lib/fetcher';

function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function SearchResults({payload, onResultsLoad, results}) {
  const {
    searchTerm,
    location,
    hasImages,
    postedToday,
    searchTitlesOnly,
    minPrice,
    maxPrice,
    ownerType,
  } = payload;
  const prevPayload = usePrevious(payload);
  const [loading, setLoading] = React.useState(false);

  const getResults = async () => {
    setLoading(true);
    let url = `http://192.168.1.73:5000/search?location=${location}`;
    url += `&searchTerm=${searchTerm}`;
    url += `&hasImages=${hasImages}`;
    url += `&postedToday=${postedToday}`;
    url += `&searchTitlesOnly=${searchTitlesOnly}`;
    url += `&ownerType=${ownerType}`;
    url += `&minPrice=${minPrice}`;
    url += `&maxPrice=${maxPrice}`;
    const data = await fetcher(url);
    onResultsLoad(data);
    setLoading(false);
  };

  React.useEffect(
    () => {
      if (!prevPayload || prevPayload !== payload) {
        (async () => {
          await getResults();
        })();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [payload, prevPayload],
  );

  const renderItem = ({item}) => <SearchResultItem item={item} />;

  return (
    <View style={styles.root}>
      {loading ? (
        <Loader />
      ) : (
        <FlatList
          style={styles.results}
          data={results}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
}

const styles = {
  root: {
    flex: 1,
  },
  results: {
    marginTop: 10,
  },
};

export default SearchResults;
