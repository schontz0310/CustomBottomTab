/* eslint-disable no-nested-ternary */
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {Svg, Rect, Defs, Path, ClipPath, Circle} from 'react-native-svg';

export default function MyTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps): JSX.Element {
  const {width} = Dimensions.get('window');
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          height: 60,
          backgroundColor: '#f2f',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 8,
          position: 'relative',
        }}>
        <Svg
          style={{
            position: 'absolute',
            bottom: 59,
            left: width / 2 - 52,
          }}
          width={25}
          height={25}
          viewBox="0 0 1 1">
          <Rect
            x={0}
            y={0}
            width={28}
            height={28}
            fill={'#f2f'}
            clipPath="url(#clip)"
          />
          <Defs>
            <ClipPath id="clip">
              <Path d="M 0 1 A 0 0, 0, 0, 0, 1 0 L 1 1" fill={'#f2f'} />
            </ClipPath>
          </Defs>
        </Svg>
        <Svg
          rotation={90}
          style={{
            position: 'absolute',
            bottom: 59,
            left: width / 2 + 26,
          }}
          width={25}
          height={25}
          viewBox="0 0 1 1">
          <Rect
            x={0}
            y={0}
            width={28}
            height={28}
            fill={'#f2f'}
            clipPath="url(#clip)"
          />
          <Defs>
            <ClipPath id="clip">
              <Path d="M 0 1 A 0 0, 0, 0, 0, 1 0 L 1 1" fill={'#f2f'} />
            </ClipPath>
          </Defs>
        </Svg>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

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

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                backgroundColor: '#fff',
                height: 44,
                marginHorizontal: 4,
              }}>
              <Text style={{color: isFocused ? '#673ab7' : '#222'}}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
}
