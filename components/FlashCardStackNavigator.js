
import React from 'react'
import { StackNavigator } from 'react-navigation'
import { FlashCardsTabNavigator } from './FlashCardsTabNavigator'
import DeckDetail from './DeckDetail'
import AddCard from './AddCard'
import Quiz from './Quiz'
import { white, purple, blue } from './../utils/colors'


export const FlashCardStackNavigator = StackNavigator({
    Home: {
        screen: FlashCardsTabNavigator,
    },
    DeckDetail: {
        screen: DeckDetail,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: blue
            }
        }
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: blue
            },
            title: 'Add Card'
        },

    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: blue
            },
            title: 'Quiz'
        },
    }
})