import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function Leaderboard() {
  return (
    <View style={styles.container}>
      <Text>Leaderboard</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
