import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

function WelcomeScreen({ navigation }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible(prevState => !prevState);
    }, 500);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('MainScreen')}
        style={styles.button}
      >
        <View
          style={{
            marginTop: 220,
          }}>
          <Text style={styles.text}>
            Welcome to AR clothes!
          </Text>

          <Text style={styles.text}>
            A product of Group 14.
          </Text>
        </View>

        <View
          style={{
            marginTop: 60,
          }}>
          <Image
            source={require('../assets/image/logo-non.png')}
            style={{
              alignSelf: 'center',
              height: 50,
              width: 50,
              tintColor: '#3D1766',
            }} />
          <Image
            source={require('../assets/image/logo-ao-dai.png')}
            style={{
              alignSelf: 'center',
              height: 70,
              width: 70,
              tintColor: '#3D1766',
            }} />
        </View>
        <Text style={[styles.buttonText, isVisible && styles.visibleText]}>
          Tap anywhere to continue
        </Text>
      </TouchableOpacity>

    </View>

  );
}
export default WelcomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
  },
  text: {
    alignSelf: 'center',
    fontSize: 25,
    color: '#A084DC',
    fontWeight: 600,
    marginTop: 10,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 20,
    color: '#A084DC',
    marginTop: 50,
  },
  visibleText: {
    color: 'transparent',
  },
});