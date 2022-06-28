/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {TextInput} from 'react-native';
import gs from '../styles/globalStyles';
import v from '../styles/styleVariables';

export default function SearchBar(props) {
  const [search, setSearch] = useState(props.search);

  return (
    <TextInput
      style={{
        ...gs.textInput,
        backgroundColor: v.color.white,
        borderRadius: 16,
        paddingVertical: 8,
        flex: 3,
      }}
      placeholder="Search movie..."
      returnKeyType="search"
      value={search}
      onChangeText={text => setSearch(text)}
      onSubmitEditing={() => props.handleSearch(search)}
    />
  );
}
