// components/CustomBottomNavBar.tsx

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

        if (route.name === 'Home') {
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
                color={isFocused ? 'white' : '#848484'}
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
    height: Platform.OS === 'android' ? verticalScale(60) : verticalScale(80),
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    borderTopColor: '#d1d1d1',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginTop: 4,
    fontSize: 12,
  },
  focusedLabel: {
    color: '#1c1b20',
  },
  unfocusedLabel: {
    color: '#848484',
  },
  focusedIcon: {
    backgroundColor: '#848484',
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
    width: scale(60),
  },
});

export default CustomBottomNavBar;
