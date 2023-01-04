import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';



var yourPicture = require('./assets/splash.png');



const App = () => {
  const [progressValue, setProgressValue] = useState(0);

  const _onLongPress = () => {
    if (progressValue !== 100) {
      setProgressValue(progressValue + 10);
    }
  }

  return (
    <View style={styles.container}>

    <TouchableWithoutFeedback
      style={styles.container}
      onPressIn={_onLongPress}
    >
      <View style={styles.container}>

        <CircularProgress
          value={progressValue}
          duration={1000}
          title={<>
            <Text

            >sdsd
              <Image
              source={yourPicture} />

              
            </Text>
          </>}
          strokeColorConfig={[
            { color: 'red', value: 0 },
            { color: 'skyblue', value: 50 },
            { color: 'yellowgreen', value: 100 },
          ]}

        />
      </View>
    </TouchableWithoutFeedback>

    </View>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 4,
    justifyContent: "center",
  },
  text: {
    fontSize: 16
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6
  },
  logBox: {
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9'
  }
});

export default App;