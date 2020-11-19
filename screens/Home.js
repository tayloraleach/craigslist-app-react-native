import * as React from 'react';
import {Text, View, Keyboard} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../lib/colors';
import {Picker} from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import ButtonGroup from '../components/ButtonGroup';
import SearchResults from './SearchResults';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CATEGORIES, OWNER_TYPE} from '../lib/constants';

function HomeScreen({navigation}) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [location, setLocation] = React.useState('vancouver');
  const [category, setCategory] = React.useState(CATEGORIES[0]);
  const [hasImages, setHasImages] = React.useState(false);
  const [postedToday, setPostedToday] = React.useState(false);
  const [searchTitlesOnly, setSearchTitlesOnly] = React.useState(false);
  const [ownerType, setOwnerType] = React.useState(OWNER_TYPE.ALL);
  const [minPrice, setMinPrice] = React.useState(null);
  const [maxPrice, setMaxPrice] = React.useState(null);
  const [searchPayload, setSearchPayload] = React.useState(null);
  const [results, setResults] = React.useState(null);

  const resetInputs = () => {
    setSearchTerm('');
    setResults(null);
    setHasImages(false);
    setPostedToday(false);
    setSearchTitlesOnly(false);
    setOwnerType(OWNER_TYPE.ALL);
    setMaxPrice(null);
    setMinPrice(null);
    setSearchPayload(null);
    setCategory(CATEGORIES[0]);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <Icon
            size={22}
            style={{marginRight: 15}}
            onPress={() => alert('save to searches')}
            name={'favorite'}
            color={colors.pink}
          />
          <Icon
            size={22}
            style={{marginRight: 15}}
            onPress={() => resetInputs()}
            name={'delete'}
            color={'white'}
          />
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <View style={styles.pickerContainer}>
          <Picker
            dropdownIconColor={colors.purple}
            selectedValue={location}
            style={styles.locationPicker}
            onValueChange={itemValue => setLocation(itemValue)}>
            <Picker.Item label="Vancouver" value="vancouver" />
            <Picker.Item label="Comox Valley" value="comoxvalley" />
          </Picker>
        </View>
        <View style={styles.categoryPickerContainer}>
          <Picker
            dropdownIconColor={colors.purple}
            selectedValue={category}
            style={styles.locationPicker}
            onValueChange={cat => setCategory(cat)}>
            {CATEGORIES.map(cat => {
              return <Picker.Item label={cat} value={cat} key={cat} />;
            })}
          </Picker>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.priceContainer}>
          <TextInput
            keyboardType="numeric"
            placeholder="$ min"
            onChangeText={val => setMinPrice(val)}
            value={minPrice}
            style={styles.price}
          />
          <TextInput
            keyboardType="numeric"
            placeholder="$ max"
            onChangeText={val => setMaxPrice(val)}
            value={maxPrice}
            style={styles.maxPrice}
          />
        </View>
        <View style={styles.buttonGroupContainer}>
          <ButtonGroup
            height={30}
            items={[OWNER_TYPE.ALL, OWNER_TYPE.OWNER, OWNER_TYPE.DEALER]}
            selectedItem={OWNER_TYPE.ALL}
            onChange={value => setOwnerType(value)}
          />
        </View>
      </View>

      <View style={styles.togglesContainer}>
        <View style={styles.checkBoxContainer}>
          <CheckBox
            tintColors={{
              true: colors.purple,
              false: colors.grey,
            }}
            disabled={false}
            value={hasImages}
            onValueChange={newValue => setHasImages(newValue)}
          />
          <Text>Has Image</Text>
        </View>
        <View style={styles.checkBoxContainer}>
          <CheckBox
            tintColors={{
              true: colors.purple,
              false: colors.grey,
            }}
            disabled={false}
            value={postedToday}
            onValueChange={newValue => setPostedToday(newValue)}
          />
          <Text>Posted Today</Text>
        </View>
        <View style={styles.checkBoxContainer}>
          <CheckBox
            tintColors={{
              true: colors.purple,
              false: colors.grey,
            }}
            disabled={false}
            value={searchTitlesOnly}
            onValueChange={newValue => setSearchTitlesOnly(newValue)}
          />
          <Text>Titles Only</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          autoFocus
          placeholder="Search..."
          onChangeText={term => setSearchTerm(term)}
          value={searchTerm}
          style={styles.searchBar}
        />
        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.cancelButton}
          onPress={() => {
            setSearchTerm('');
          }}>
          <Icon name={'close'} size={22} color={colors.grey} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.searchButton}
          onPress={() => {
            Keyboard.dismiss();
            if (searchTerm) {
              setSearchPayload({
                minPrice,
                maxPrice,
                searchTerm,
                location,
                hasImages,
                postedToday,
                searchTitlesOnly,
                ownerType,
              });
            }
          }}>
          <Icon name={'search'} size={20} color={colors.grey} />
        </TouchableOpacity>
      </View>

      {results && searchPayload && <Text>{results.length} Results</Text>}

      {searchPayload && (
        <SearchResults
          results={results}
          onResultsLoad={data => {
            setResults(data);
          }}
          payload={searchPayload}
        />
      )}
    </View>
  );
}

const styles = {
  root: {
    flex: 1,
    margin: 10,
  },
  pickerContainer: {
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 2,
    marginBottom: 5,
    flex: 1,
    height: 30,
  },
  categoryPickerContainer: {
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 2,
    marginBottom: 5,
    flex: 1,
    height: 30,
    marginLeft: 5,
  },
  row: {flexDirection: 'row'},
  locationPicker: {height: 30, flex: 1},
  buttonGroupContainer: {height: 30, flex: 1},
  togglesContainer: {flexDirection: 'row', flexWrap: 'wrap'},
  checkBoxContainer: {flexDirection: 'row', alignItems: 'center'},
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 5,
  },
  searchBar: {
    height: 40,
    borderColor: colors.grey,
    paddingLeft: 10,
    borderWidth: 1,
    borderRightWidth: 0,
    borderRadius: 2,
    flex: 1,
  },
  searchButton: {
    width: 60,
    height: 40,
    borderRadius: 2,
    backgroundColor: colors.purple,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    height: 40,
    width: 40,
    alignItems: 'center',
    borderBottomRightRadius: 2,
    borderTopRightRadius: 2,
    borderColor: colors.grey,
    borderWidth: 1,
    borderLeftWidth: 0,
    marginRight: 5,
    justifyContent: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
  },
  price: {
    height: 30,
    padding: 0,
    width: 80,
    paddingLeft: 10,
    borderRadius: 2,
    borderColor: colors.grey,
    borderWidth: 1,
  },
  maxPrice: {
    height: 30,
    padding: 0,
    width: 80,
    paddingLeft: 10,
    borderRadius: 2,
    borderColor: colors.grey,
    borderWidth: 1,
    marginHorizontal: 5,
  },
};

export default HomeScreen;
