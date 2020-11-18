import * as React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import colors from '../lib/colors';

function ButtonGroup({items, selectedItem, onChange, height}) {
  const [selected, setSelected] = React.useState(selectedItem);
  const handleChange = item => {
    setSelected(item);
    onChange(item);
  };
  const styledContainer = {
    ...styles.container,
    height,
  };

  return (
    <View style={styledContainer}>
      {items.map((item, x) => {
        let styledItem = styles.item;
        let styledText = styles.text;
        if (item === selected) {
          styledItem = {...styledItem, ...styles.selectedItem};
          styledText = {...styledText, ...styles.selectedText};
        }
        return (
          <TouchableOpacity
            onPress={() => handleChange(item)}
            activeOpacity={0.75}
            key={item}
            style={styledItem}>
            <Text style={styledText}>{item}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = {
  container: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 2,
    borderColor: colors.grey,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  text: {
    color: 'black',
  },
  selectedItem: {
    backgroundColor: colors.purple,
  },
  selectedText: {
    color: 'white',
  },
};

export default ButtonGroup;
