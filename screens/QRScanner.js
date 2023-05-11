import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const QRScanner = ({ navigation }) => {
  // xử lý dữ liệu sau khi quét
  onSuccess = (e) => {
    navigation.navigate('ItemDetailScreen', { link: e.data });
  };

  //giao diện máy quét QR
  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={this.onSuccess}
        topContent={
          <Text style={styles.QRtext}>
            Quét mã QR để xem chi tiết trang phục:
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#E3DFFD',
  },
  QRtext: {
    color: 'black',
    fontSize: 20,
    fontWeight: 500,
  },
});

export default QRScanner;
