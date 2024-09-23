import React from 'react';
import {View, Text, TouchableOpacity, Platform, StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomBottomNavBar = ({state, descriptors, navigation}: any) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        let iconName = 'help-outline';

        if (route.name === 'HomeScreen') {
          iconName = isFocused ? 'heart-outline' : 'heart-outline';
        } else if (route.name === 'Settings') {
          iconName = isFocused ? 'settings-sharp' : 'settings-outline';
        } else if (route.name === 'Leaderboard') {
          iconName = isFocused ? 'cellular' : 'cellular-outline';
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity key={index} onPress={onPress} style={styles.tab}>
            <View style={isFocused ? styles.focusedIcon : undefined}>
              <Icon
                name={iconName}
                size={28}
                color={isFocused ? 'white' : 'black'}
              />
            </View>

            <Text
              style={[
                styles.label,
                isFocused ? styles.focusedLabel : styles.unfocusedLabel,
              ]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderColor: '#f3f3f3',
    borderWidth: 15,
    // borderWidth: 0.2,
    height: Platform.OS === 'android' ? verticalScale(60) : verticalScale(80),
    borderTopRightRadius: scale(24),
    borderTopLeftRadius: scale(24),
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginTop: scale(4),
    fontSize: scale(10),
  },
  focusedLabel: {
    color: 'black',
  },
  unfocusedLabel: {
    color: 'black',
  },
  focusedIcon: {
    backgroundColor: 'black',
    padding: scale(7),
    borderRadius: scale(20),
    alignItems: 'center',
    width: scale(60),
  },
});

export default CustomBottomNavBar;
