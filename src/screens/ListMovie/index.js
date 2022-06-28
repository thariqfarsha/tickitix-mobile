/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import gs from '../../styles/globalStyles';
import v from '../../styles/styleVariables';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Feather';
import MonthFilter from '../../components/MonthFilter';
import MovieCard from '../../components/MovieCard';
import Footer from '../../components/Footer';
import axios from '../../utils/axios';
import SearchBar from '../../components/SearchBar';

export default function ListMovie(props) {
  const sortOptions = ['A-Z', 'Z-A'];
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const limit = 4;
  const [sort, setSort] = useState('name asc');
  const [search, setSearch] = useState('');
  const [month, setMonth] = useState(new Date().getMonth());
  const [refresh, setRefresh] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [last, setLast] = useState(false);

  useEffect(() => {
    // sortMonth(props.route.params);
    getMovies();

    return () => {
      setMovies([]);
    };
  }, []);

  useEffect(() => {
    getMovies();
  }, [page]);

  useEffect(() => {
    setPage(1);
    getMovies();

    return () => {
      setMovies([]);
    };
  }, [month, sort, search]);

  const sortMonth = data => {
    setMonth(data);
    setSearch('');
    setPage(1);
  };

  const getMovies = async () => {
    try {
      setRefresh(false);
      setLoading(false);
      setLoadMore(false);
      if (page <= totalPage || totalPage === 0) {
        const result = await axios.get(
          `movie?page=${page}&limit=${limit}&searchName=${search}&sort=${sort}&searchRelease=${month}`,
        );
        if (page === 1) {
          setMovies(result.data.data);
        } else {
          setMovies([...movies, ...result.data.data]);
        }
        setTotalPage(result.data.pagination.totalPage);
      } else {
        setLast(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRefresh = () => {
    console.log('REFRESH SCREEN');
    setPage(1);
    setLast(false);
    if (page !== 1) {
      setRefresh(true);
    } else {
      getMovies();
    }
  };

  const handleLoadMore = () => {
    console.log('LOAD MORE DATA');
    if (!loadMore) {
      const newPage = page + 1;
      setLoadMore(true);
      if (newPage <= totalPage + 1) {
        setLoading(true);
        setPage(newPage);
      } else {
        setLoading(false);
      }
    }
  };

  const handleSearch = dataSearch => {
    console.log('dataSearch', dataSearch);
    setSearch(dataSearch);
    setPage(1);
    setMonth('');
  };

  const ListHeader = () => {
    return (
      <>
        <View style={{flexDirection: 'row', marginBottom: 16}}>
          <SelectDropdown
            data={sortOptions}
            onSelect={selectedItem => {
              setSort(selectedItem === 'Z-A' ? 'name desc' : 'name asc');
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
          <SearchBar handleSearch={handleSearch} search={search} />
        </View>

        <MonthFilter
          month={month}
          setMonth={sortMonth}
          firstMonth={new Date().getMonth()}
        />
      </>
    );
  };

  return (
    <View style={{...gs.container, flex: 1}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={movies}
        numColumns={2}
        ListHeaderComponent={ListHeader}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={{marginBottom: 20, marginHorizontal: 8}}>
            <MovieCard {...props} data={item} />
          </View>
        )}
        onRefresh={handleRefresh}
        refreshing={refresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() =>
          last ? (
            <View>
              <Text style={{...gs.h5, textAlign: 'center'}}>.</Text>
              {/* <Footer /> */}
            </View>
          ) : loading ? (
            <ActivityIndicator size="large" color={v.color.primary} />
          ) : null
        }
      />
    </View>
  );
}
