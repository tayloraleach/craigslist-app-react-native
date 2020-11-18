import * as React from 'react';
import {Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../lib/colors';
import {Picker} from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import ButtonGroup from '../components/ButtonGroup';

const OWNER_TYPE = {
  ALL: 'All',
  OWNER: 'Owner',
  DEALER: 'Dealer',
};

function HomeScreen({navigation}) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [location, setLocation] = React.useState('vancouver');
  const [hasImages, setHasImages] = React.useState(false);
  const [postedToday, setPostedToday] = React.useState(false);
  const [searchTitlesOnly, setSearchTitlesOnly] = React.useState(false);
  const [ownerType, setOwnerType] = React.useState(OWNER_TYPE.ALL);

  return (
    <View style={styles.root}>
      <View style={styles.locationPickerContainer}>
        <Picker
          dropdownIconColor={colors.purple}
          selectedValue={location}
          style={styles.locationPicker}
          onValueChange={itemValue => setLocation(itemValue)}>
          <Picker.Item label="Vancouver" value="vancouver" />
          <Picker.Item label="Comox Valley" value="comoxvalley" />
        </Picker>
      </View>

      <View style={styles.buttonGroupContainer}>
        <ButtonGroup
          items={[OWNER_TYPE.ALL, OWNER_TYPE.OWNER, OWNER_TYPE.DEALER]}
          selectedItem={OWNER_TYPE.ALL}
          onChange={value => setOwnerType(value)}
        />
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
          placeholder="Search..."
          onChangeText={term => setSearchTerm(term)}
          value={searchTerm}
          style={styles.searchBar}
        />
        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.searchButton}
          onPress={() =>
            navigation.navigate('SearchResults', {
              searchTerm,
              location,
              hasImages,
              postedToday,
              searchTitlesOnly,
              ownerType,
            })
          }>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
  root: {
    flex: 1,
    margin: 20,
  },
  locationPickerContainer: {
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 2,
    marginBottom: 10,
  },
  locationPicker: {height: 40, width: '100%'},
  buttonGroupContainer: {marginBottom: 10},
  togglesContainer: {flexDirection: 'row', flexWrap: 'wrap'},
  checkBoxContainer: {flexDirection: 'row', alignItems: 'center'},
  searchContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchBar: {
    height: 40,
    borderColor: colors.grey,
    paddingLeft: 15,
    borderWidth: 1,
    borderRightWidth: 0,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
    flex: 1,
  },
  searchButton: {
    width: 100,
    height: 40,
    borderBottomRightRadius: 2,
    borderTopRightRadius: 2,
    backgroundColor: colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonText: {
    color: 'white',
  },
};

export default HomeScreen;
