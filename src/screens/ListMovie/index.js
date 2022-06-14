/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import gs from '../../styles/globalStyles';
import v from '../../styles/styleVariables';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Feather';
import MonthFilter from '../../components/MonthFilter';
import MovieCard from '../../components/MovieCard';
import Footer from '../../components/Footer';

export default function ListMovie(props) {
  const sortOptions = ['A-Z', 'Z-A'];
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  return (
    <ScrollView
      style={{backgroundColor: v.color.backgroundLight}}
      showsVerticalScrollIndicator={false}>
      <View style={gs.container}>
        <Text style={gs.h2}>List Movies</Text>
        <View style={{flexDirection: 'row', marginBottom: 16}}>
          <SelectDropdown
            data={sortOptions}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={selectedItem => selectedItem}
            rowTextForSelection={item => item}
            buttonStyle={{
              backgroundColor: v.color.white,
              borderColor: v.color.line,
              borderWidth: 1,
              borderRadius: 16,
              width: 'auto',
              height: 'auto',
              paddingVertical: 12,
              flex: 1,
              marginStart: 8,
            }}
            buttonTextStyle={{...gs.p, marginBottom: 0}}
            renderDropdownIcon={() => <Icon name="chevron-down" size={16} />}
            defaultButtonText="Sort"
          />
          <TextInput
            style={{
              ...gs.textInput,
              backgroundColor: v.color.white,
              borderRadius: 16,
              paddingVertical: 8,
              flex: 3,
            }}
            placeholder="Search movie..."
          />
        </View>

        <MonthFilter month={month} setMonth={setMonth} />

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
          <View style={{marginBottom: 16, marginEnd: 16}}>
            <MovieCard {...props} />
          </View>
          <View style={{marginBottom: 16, marginEnd: 0}}>
            <MovieCard {...props} />
          </View>
          <View style={{marginBottom: 16, marginEnd: 16}}>
            <MovieCard {...props} />
          </View>
          <View style={{marginBottom: 16, marginEnd: 0}}>
            <MovieCard {...props} />
          </View>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
}
