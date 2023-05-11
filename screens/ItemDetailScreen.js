import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, BackHandler } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from '@react-navigation/native';
import LinearGradient from "react-native-linear-gradient";

const ItemDetailScreen = ({ navigation }) => {
  const route = useRoute();
  const link = route.params?.link ?? '';
  const [costume, setCostume] = useState([]);

  useEffect(() => {
    const onBackPress = () => {
      navigation.navigate('MainScreen');
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, [navigation]);

  //lấy dữ liệu từ web
  const fetchCostume = async () => {
    try {
      const response = await fetch(link);
      const json = await response.json();
      setCostume(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCostume();
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#B9B1FF',
        flex: 1,
        alignItems: 'center',
      }}
    >
      {costume.image && Array.isArray(costume.image) && costume.image.length > 0 && (
        <Image
          style={styles.detailImg}
          source={{ uri: costume.image[0].imageUrl }} />
      )}
      <View style={styles.rectangleTop}>
        <LinearGradient
          // Background Linear Gradient
          colors={['rgba(255,255,255,0.6)', 'transparent']}
          style={{ height: '70%', width: '100%' }}
        />
      </View>
      <View style={styles.rectangleBottom}>
        <View style={styles.col}>
          <View style={{ width: '65%' }}>
            <Text style={styles.textItem}>
              {costume.name}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('ARScreen')}
            style={styles.ar_button}
          >
            <Image
              source={require('../assets/ar-icon.png')}
              style={styles.ar_image} />
            <View style={{ backgroundColor: '#B9B1FF', borderRadius: 10 }}>
              <Text
                style={styles.ar_text}>
                Thử đồ
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.description}>
          <Text
            style={{ color: '#0C134F', fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
            Mô tả trang phục:
          </Text>
          <ScrollView style={{ height: 210, marginTop: 5 }}>
            <Text
              style={{ color: '#0C134F', fontSize: 18, marginRight: 15, textAlign: 'justify' }}>
              {costume.description}
            </Text>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  detailImg: {
    position: 'absolute',
    top: 15,
    width: 360,
    height: 500,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  rectangleTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '20%',
    opacity: 1,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35
  },
  rectangleBottom: {
    position: 'absolute',
    top: 400,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    opacity: 1,
    borderTopLeftRadius: 31,
    borderTopRightRadius: 31,
  },
  col: {
    flexDirection: 'row',
    marginLeft: 20,
    justifyContent: 'space-between',
  },
  textItem: {
    color: '#5C469C',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20
  },
  ar_button: {
    backgroundColor: '#fff',
    width: 100,
    height: 120,
    marginRight: 20,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDDED9',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ar_image: {
    width: 90,
    height: 90,
    backgroundColor: '#fff',
  },
  ar_text: {
    width: '100%',
    color: 'white',
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 22,
  },
  description: {
    marginTop: 30,
    marginLeft: 20,
    marginBottom: 10,
  },
});

export default ItemDetailScreen;