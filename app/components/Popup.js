import React from "react";
import { View, Modal, Text, Animated, TouchableOpacity, Dimensions, StyleSheet } from "react-native";

class Popup extends React.Component {

  constructor() {
    super();
    this.state = { move: new Animated.Value(500), scale: new Animated.Value(1) }
  }

	togglePopup = () => {
		Animated.timing(this.state.move, {
      useNativeDriver: true,
      toValue: 0,
      duration: 1000
    }).start(() => {
      Animated.timing(this.state.scale, {
        useNativeDriver: true,
        toValue: 1.4,
        duration: 250
      }).start(() => {
        Animated.timing(this.state.scale, {
          useNativeDriver: true,
          toValue: 1,
          duration: 250
        }).start();
      });
    });
		
	}

	render() {
    if (this.props.visible) {
        this.togglePopup();
    }

    const transformStyle = {
      transform : [{ 
        scale: this.state.scale,
        translateY: this.state.move,
      }]
    };

		return (
      <Modal
        visible={this.props.visible} 
        transparent={true}
        animationType={'fade'}>
        <Animated.View style={[ styles.mainContainer, transformStyle ]}>
          <View style={ styles.container }>
            <Text style={ styles.text }>{ this.props.message }</Text>
            <TouchableOpacity onPress={ this.props.validateAction }>
              <Text style={ styles.button }>{ this.props.buttonText}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Modal>
		)
	}
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'column',
    width: '80%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccccccee',
    padding: 6,
  },
  button: {
    padding: 14,
    backgroundColor: 'white',
  },
  text: {
    padding: 30,
  },
});

export default Popup;