import React, { Component } from 'react';
import {
  ViroARScene,
  ViroText,
  ViroARSceneNavigator,
  ViroConstants,
  ViroBox,
  Viro3DObject,
  ViroMaterials,
  ViroAnimations,
  ViroAmbientLight,
} from '@viro-community/react-viro';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const InitialScene = () => {
  ViroMaterials.createMaterials({
    aodai: {
      diffuseTexture: require('../assets/3d-model/aodai_Base_color.jpg'),
      metalnessTexture: require('../assets/3d-model/aodai_Metallic.jpg'),
      normalTexture: require('../assets/3d-model/aodai_Normal.jpg'),
      roughnessTexture: require('../assets/3d-model/aodai_Roughness.jpg'),
    },
    quanvai: {
      diffuseTexture: require('../assets/3d-model/quanvai_Base_color.jpg'),
      metalnessTexture: require('../assets/3d-model/quanvai_Metallic.jpg'),
      normalTexture: require('../assets/3d-model/quanvai_Normal.jpg'),
      roughnessTexture: require('../assets/3d-model/quanvai_Roughness.jpg'),
    }
  })

  ViroAnimations.registerAnimations({
    rotate: {
      duration: 1500,
      properties: {
        rotateY: '+=90',
      }
    }
  })

  return (
    <ViroARScene>
      <Viro3DObject
        source={require('../assets/3d-model/aodai.obj')}
        position={[0, 0.5, 0]}
        scale={[1.5, 1.5, 1.5]}
        type='OBJ'
        animation={{ name: 'rotate', loop: true, run: true }}
        materials={['aodai', 'quanvai']}
      />
    </ViroARScene>
  );
}

const ARScreen = () => {


  return (
    <View style={styles.mainView}>
      <ViroARSceneNavigator
        initialScene={{ scene: InitialScene }}
        style={{ flex: 1 }}
      />

      <View style={styles.controlsView}>
        <TouchableOpacity>
          <Text style={styles.text}>Xem trang phục</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>Mặc thử</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  controlsView: {
    width: '100%',
    height: 100,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    margin: 20,
    backgroundColor: '#9d9d9d',
    padding: 10,
    fontWeight: 'bold',
  }
})

export default ARScreen;