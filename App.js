import React from 'react';
import { StyleSheet, Text, PanResponder, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFingerprint } from '@fortawesome/free-solid-svg-icons/faFingerprint'
export default class App extends React.Component {
  state = {
    isMoving: false,
    pointsDelta: 0,
    progressValue: 0
  };

  _panResponder;
  _circularProgressRef;

  constructor(props) {
    super(props);
    this._circularProgressRef = React.createRef();
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        this.setState({ isMoving: true, pointsDelta: 0 });
      },

      onPanResponderMove: (evt, gestureState) => {
        if (this._circularProgressRef.current) {
          this._circularProgressRef.current.animate(0, 0);
        }
        // For each 2 pixels add or subtract 1 point
        this.setState({ pointsDelta: Math.round(-gestureState.dy / 2) });
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (this._circularProgressRef.current) {
          this._circularProgressRef.current.animate(100, 3000);
        }
        if (this.state.progressValue !== 100) {
          this.setState({
            isMoving: false,
            pointsDelta: 0,
            progressValue: this.state.progressValue + 10
          });
        }

        if (this.state.progressValue === 100) {
          alert('Authentication complete');
          this.setState({
            progressValue: 0
          })
        }
      },
    });
  }

  render() {
    return (
      <View style={styles.container} {...this._panResponder.panHandlers}>
        <AnimatedCircularProgress
          size={120}
          width={8}
          backgroundWidth={5}
          fill={this.state.progressValue}
          tintColor="#00ff00"
          tintColorSecondary="#ff0000"
          backgroundColor="#3d5875"
          lineCap="round"
          onPress={() => console.log('Plz work')}
        >
          {
            (fill) => (
              <Text>
                <FontAwesomeIcon icon={faFingerprint}
                  size={80}
                />
              </Text>
            )
          }
        </AnimatedCircularProgress>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  points: {
    textAlign: 'center',
    color: '#7591af',
    fontSize: 50,
    fontWeight: '100',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 50,
    top: '65%'
  },
  pointsDelta: {
    color: '#4c6479',
    fontSize: 50,
    fontWeight: '100',
  },
  pointsDeltaActive: {
    color: '#fff',
  },
});