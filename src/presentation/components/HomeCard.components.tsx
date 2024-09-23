import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import {thread} from '../../domain/models/thread.models';
import {RootState, AppDispatch} from '../../application/redux/Store.redux';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteThread } from '../../application/redux/asyncThunk/Thread.asyncThunk';

export default function HomeCard({data}: {data: thread}) {
  
  // const {loader, threads, errorStr} = useSelector(
  //   (state: RootState) => state.thread,
  // );

  const dispatch = useDispatch<AppDispatch>();

  const handleLongPress = () => {
    dispatch(DeleteThread(data._id));
  };

  return (
    <TouchableOpacity
      onLongPress={handleLongPress}
      style={{
        height: scale(45),
        width: '80%',
        alignSelf: 'center',
        marginBottom: verticalScale(15),
      }}>
      <View style={styles.container}>
        <Text style={styles.text}>{data.shortenedInputPrompt}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: scale(45),
    width: '100%',
    backgroundColor: 'white',
    borderRadius: scale(25),
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: scale(1),
    elevation: 5,
    borderColor: 'black',
    borderWidth: 0.5,
  },
  text: {
    fontSize: scale(14),
    color: 'black',
    fontFamily: 'Roboto-Regular',
    letterSpacing: 1,
  },
});
