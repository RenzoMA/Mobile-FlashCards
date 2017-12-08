import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { blue } from './utils/colors'
import FlashCardsStatusBar from './components/FlashCardsStatusBar'
import { FlashCardsTabNavigator } from './components/FlashCardsTabNavigator'
import { FlashCardStackNavigator } from './components/FlashCardStackNavigator'
import { setLocalNotification } from './utils/helpers'

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <FlashCardsStatusBar backgroundColor={blue} barStyle='light-content' />
          <FlashCardStackNavigator />
        </View>
      </Provider>
    );
  }
}
