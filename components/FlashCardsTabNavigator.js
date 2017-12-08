import { blue, white } from './../utils/colors'
import { TabNavigator, StackNavigator } from 'react-navigation'
import DeckList from './DeckList'
import AddDeck from './AddDeck'

export const FlashCardsTabNavigator = TabNavigator({
    DeckList: {
        screen: DeckList,
        navigationOptions: {
            tabBarLabel: 'Decks'
        },
    },
    AddDeck: {
        screen: AddDeck,
        navigationOptions: {
            tabBarLabel: 'New Deck'
        },
    }
}, {
        navigationOptions: {
            header: null
        },
        tabBarOptions: {
            activeTintColor: white,
            style: {
                height: 56,
                backgroundColor: blue,
                shadowColor: 'rgba(0, 0, 0, 0.24)',
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 6,
                shadowOpacity: 1
            }
        }
    })