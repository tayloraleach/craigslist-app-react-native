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
    <View
      style={{
        flex: 1,
        margin: 20,
      }}>
      <View
        style={{
          borderColor: colors.purple,
          borderWidth: 1,
          borderRadius: 2,
          marginBottom: 20,
        }}>
        <Picker
          dropdownIconColor={colors.purple}
          selectedValue={location}
          style={{height: 40, width: '100%'}}
          onValueChange={itemValue => setLocation(itemValue)}>
          <Picker.Item label="Vancouver" value="vancouver" />
          <Picker.Item label="Comox Valley" value="comoxvalley" />
        </Picker>
      </View>

      <View style={{marginBottom: 20}}>
        <ButtonGroup
          items={[OWNER_TYPE.ALL, OWNER_TYPE.OWNER, OWNER_TYPE.DEALER]}
          selectedItem={OWNER_TYPE.ALL}
          onChange={value => setOwnerType(value)}
        />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <CheckBox
          tintColors={{
            true: colors.purple,
            false: colors.grey,
          }}
          disabled={false}
          value={searchTitlesOnly}
          onValueChange={newValue => setSearchTitlesOnly(newValue)}
        />
        <Text>Search Titles Only</Text>
      </View>
      <View
        style={{
          marginTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <TextInput
          placeholder="Search..."
          onChangeText={term => setSearchTerm(term)}
          value={searchTerm}
          style={{
            height: 40,
            borderColor: colors.grey,
            paddingLeft: 15,
            borderWidth: 1,
            borderRightWidth: 0,
            borderTopLeftRadius: 2,
            borderBottomLeftRadius: 2,
            flex: 1,
          }}
        />
        <TouchableOpacity
          activeOpacity={0.75}
          style={{
            width: 100,
            height: 40,
            borderBottomRightRadius: 2,
            borderTopRightRadius: 2,
            backgroundColor: colors.purple,
            alignItems: 'center',
            justifyContent: 'center',
          }}
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
          <Text style={{color: 'white'}}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomeScreen;
