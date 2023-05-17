import React, { Component, useState, useRef, useEffect, useCallback } from 'react';
import {
  ViroARScene,
  ViroARSceneNavigator,
  Viro3DObject,
  ViroMaterials,
  ViroAnimations,
  ViroAmbientLight,
  ViroDirectionalLight,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroNode,
  ViroSpotLight,
} from '@viro-community/react-viro';
import { StyleSheet, View, Text, TouchableOpacity, PanResponder, BackHandler } from "react-native";

const InitialScene = () => {
  const ref = useRef(null);

  ViroARTrackingTargets.createTargets({
    aodai: {
      source: require('../assets/QR.png'),
      orientation: 'Up',
      physicalWidth: 0.2,
    }
  })

  ViroMaterials.createMaterials({
    base: {
      diffuseTexture: require('../assets/3d-model/Base_color.jpg'),
    },
    metallic: {
      diffuseTexture: require('../assets/3d-model/Metallic.jpg'),
    },
    normal: {
      diffuseTexture: require('../assets/3d-model/Normal.jpg'),
    },
    opacity: {
      diffuseTexture: require('../assets/3d-model/Opacity.jpg'),
    },
    roughness: {
      diffuseTexture: require('../assets/3d-model/Roughness.jpg'),
    },
  })

  ViroAnimations.registerAnimations({
    rotate: {
      duration: 2500,
      properties: {
        rotateY: '+=90'
      }
    }
  })

  const anchorFound = () => {
    console.log("Anchor/Imgae detected");
  }

  return (
    <ViroARScene >
      <ViroARImageMarker target='aodai' onAnchorFound={anchorFound}>
        <ViroDirectionalLight color="#ffffff" direction={[0, -1, -.2]} />
        <ViroAmbientLight color="#ffffff" intensity={2000} />
        <ViroNode position={[0, 0, 0]} dragType="FixedToWorld" onDrag={() => { }}>
          <ViroSpotLight
            innerAngle={5}
            outerAngle={25}
            direction={[0, -1, 0]}
            position={[0, 5, 0]}
            color="#ffffff"
            castsShadow={true}
            shadowMapSize={2048}
            shadowNearZ={2}
            shadowFarZ={7}
            shadowOpacity={.7}
          />
          <Viro3DObject
            ref={ref}
            source={require('../assets/3d-model/aodai.obj')}
            lightReceivingBitMask={3}
            resources={[
              require('../assets/3d-model/aodai.mtl'),
              // require('../assets/3d-model/Base_color.jpg'),
              // require('../assets/3d-model/Metallic.jpg'),
              // require('../assets/3d-model/Normal.jpg'),
              // require('../assets/3d-model/Opacity.jpg'),
              // require('../assets/3d-model/Roughness.jpg')
            ]}
            scale={[1.5, 1.5, 1.5]}
            type='OBJ'
            position={[0, -0.5, -2]}
            materials={['base', 'metallic', 'normal', 'opacity', 'roughness']}
            animation={{ name: 'rotate', loop: true, run: true }}
          />
        </ViroNode>

      </ViroARImageMarker>

    </ViroARScene >
  );
}

const ARScreen = ({ navigation }) => {
  useEffect(() => {
    const onBackPress = () => {
      navigation.navigate('ItemDetailScreen');
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, [navigation]);

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
    backgroundColor: '#E3DFFD',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
    margin: 20,
    backgroundColor: '#937DC2',
    padding: 10,
    fontWeight: 'bold',
    borderRadius: 10,
  }
})

export default ARScreen;