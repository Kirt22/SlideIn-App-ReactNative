import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Progress from 'react-native-progress';
import React, {useEffect, useState} from 'react';

import SlideInLogo from '../../assets/images/svj/slidein title.svg';
import HomeCard from '../../components/HomeCard.components';
import {scale, verticalScale} from 'react-native-size-matters';
import {strings} from '../../assets/strings/strings';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../../../application/redux/Store.redux';
import {GetThreads} from '../../../application/redux/asyncThunk/Thread.asyncThunk';
import {Snackbar} from 'react-native-paper';

export default function Home({navigation}: any) {
  const [loaderVisiblity, setLoaderVisiblity] = useState(false);
  const [snackbarVisibility, setSnackbarVisibility] = useState(false);

  const {loader, threads, errorStr} = useSelector(
    (state: RootState) => state.thread,
  );
  const dispatch = useDispatch<AppDispatch>();

  const onDismissSnackBar = () => setSnackbarVisibility(false);

  useEffect(() => {
    dispatch(GetThreads());
  }, []);

  useEffect(() => {
    setLoaderVisiblity(loader);
  }, [loader]);

  useEffect(() => {
    if (errorStr) {
      setSnackbarVisibility(true);
    }
  }, [errorStr]);

  const handleGetStartedBtn = () => {
    navigation.navigate('GenerateLine');
  };

  const renderItem = ({item}: any) => <HomeCard data={item} />;

  return (
    <View style={styles.container}>
      <View
        style={{
          alignSelf: 'center',
          marginBottom: verticalScale(20),
          marginTop: verticalScale(45),
        }}>
        <SlideInLogo
          style={{alignSelf: 'center'}}
          width={scale(300)}
          height={verticalScale(70)}
        />

        <Text style={[{alignSelf: 'flex-end'}, styles.welcomeTextScaling]}>
          {strings.HomeScreen.welcomeMsg1}
        </Text>
        <Text style={[{alignSelf: 'flex-end'}, styles.welcomeTextScaling]}>
          {strings.HomeScreen.welcomeMsg2}
        </Text>
      </View>

      <Progress.Bar
        style={[{opacity: loaderVisiblity ? 1 : 0}, styles.loaderScaling]}
        borderWidth={0}
        indeterminate={true}
        width={null}
        color="black"
        borderRadius={0}
      />

      <Text style={styles.thread}>{strings.HomeScreen.thread}</Text>

      {threads.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.empty}>You got no threads 🫣</Text>
        </View>
      ) : (
        <FlatList
          data={threads}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.recyclerView}
        />
      )}

      <TouchableOpacity onPress={handleGetStartedBtn}>
        <View style={styles.btnContainer}>
          <Text style={styles.btnLable}>{strings.HomeScreen.btnText}</Text>
        </View>
      </TouchableOpacity>

      <Snackbar visible={snackbarVisibility} onDismiss={onDismissSnackBar}>
        {errorStr}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  welcomeTextScaling: {
    fontSize: scale(22),
    opacity: 0.5,
    fontFamily: 'Roboto-Medium',
  },
  loaderScaling: {
    marginBottom: verticalScale(20),
  },
  thread: {
    alignSelf: 'center',
    fontFamily: 'Roboto-Bold',
    fontSize: scale(40),
    marginBottom: verticalScale(10),
  },
  recyclerView: {
    paddingTop: verticalScale(10),
    width: '95%',
    alignSelf: 'center',
  },
  empty: {
    color: 'red',
    alignSelf: 'center',
    fontSize: scale(20),
    fontFamily: 'Roboto-Bold',
    letterSpacing: 1,
  },
  emptyContainer: {
    width: '95%',
    height: verticalScale(260),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    width: '60%',
    height: verticalScale(45),
    marginTop: verticalScale(20),
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    backgroundColor: 'black',
  },
  btnLable: {
    color: 'white',
    alignSelf: 'center',
    fontSize: scale(18),
    fontFamily: 'Roboto-Bold',
  },
});
