import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import diacritics from 'diacritic';

function MainScreen({ navigation }) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [costumes, setCostumes] = useState([]);

  //lấy dữ liệu từ web
  const fetchCostumes = async () => {
    try {
      const response = await fetch('http://ec2-13-215-140-47.ap-southeast-1.compute.amazonaws.com:8080/api/clothes/getAll');
      const json = await response.json();
      setCostumes(json);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ItemDetailScreen', { link: 'http://ec2-13-215-140-47.ap-southeast-1.compute.amazonaws.com:8080/api/clothes/' + item.id })}
      style={styles.item}
    >
      {item.image && Array.isArray(item.image) && item.image.length > 0 ? (
        <Image style={styles.itemImage} source={{ uri: item.image[0].imageUrl }} />
      ) : (
        <Image style={styles.itemImage} source={{ uri: item.imageUrl }} />
      )}
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text
          numberOfLines={3} ellipsizeMode='tail'
          style={styles.itemDetails}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    fetchCostumes();
  }, []);

  //Xử lý tìm kiếm
  const filterCostumes = (costumes, keyword) => {
    return costumes.filter((costume) =>
      diacritics.clean(costume.name.toLowerCase()).includes(diacritics.clean(keyword.toLowerCase()))
    );
  };

  //Main Screen
  return (
    <View style={{
      flex: 1,
    }}>
      <View style={{
        height: 20,
      }} />

      {/* header */}
      <View style={{
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 10,
      }}>
        <Text style={styles.header}>AR clothes</Text>
        <View>
          <Image
            source={require('../assets/image/logo-non.png')}
            style={styles.logo} />
          <Image
            source={require('../assets/image/logo-ao-dai.png')}
            style={styles.logo} />
        </View>
      </View>

      {/* search bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          onChangeText={(text) => setSearchKeyword(text)}
          value={searchKeyword}
          placeholder="Tìm kiếm trang phục"
          placeholderTextColor='#645CBB'
        />
        <View style={styles.searchIcon}>
          <Icon name="search" size={20} color="#645CBB" />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('QRScanner')}
          style={styles.button}
        >
          <Image
            style={styles.qrIcon}
            source={require('../assets/image/scanner.png')}
          />
        </TouchableOpacity>
      </View>

      {/* danh sách trang phục */}
      <FlatList
        data={filterCostumes(costumes, searchKeyword)}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
export default MainScreen

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#5D3B78',
    marginRight: 10,
  },
  logo: {
    height: 20,
    width: 20,
    tintColor: '#5D3B78',
  },
  searchBar: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: '#F9F5EB',
    borderColor: '#ccc',
    borderWidth: 1,
    borderColor: '#897CFF',
    borderRadius: 20,
    paddingHorizontal: 10,
    borderWidth: 2,
    marginHorizontal: 5,
    marginBottom: 5,
    alignItems: 'center',
  },
  scanner: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  searchInput: {
    color: '#0C134F',
    flex: 1,
  },
  item: {
    backgroundColor: '#E3DFFD',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 3,
  },
  itemImage: {
    width: 60,
    height: 100,
    marginRight: 10,
    objectFit: 'cover',
    alignItems: 'center',
  },
  itemDetails: {
    color: '#0C134F',
    fontSize: 16,
    flex: 1,
  },
  itemName: {
    color: '#0C134F',
    fontSize: 16,
    fontWeight: 600,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#645CBB',
    marginBottom: 10,
  },
  searchIcon: {
    marginLeft: 20,
  },
  button: {
    paddingLeft: 5,
    marginLeft: 5,
    borderLeftWidth: 1,
    borderLeftColor: '#645CBB',
    flexDirection: 'row',
    alignItems: 'center',
  },
  qrIcon: {
    width: 20,
    height: 20,
    tintColor: '#645CBB',
  },
});