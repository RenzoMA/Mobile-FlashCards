import { View, StyleSheet, AsyncStorage } from 'react-native'

const STORAGE_KEY = 'MobileFlashcards:deckStorage'

const fakeData = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    }

}

export async function getDecks() {
    try {
        let results = await AsyncStorage.getItem(STORAGE_KEY)
        return results ? JSON.parse(results) : fakeData;
    }
    catch (error) {
        console.log(error);
    }
}

export function getDeck() {
}

export async function saveDeckTitle(deck) {
    await AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
        [deck.title]: deck
    }))
}

export async function addCardToDeck({ deck, card }) {
    deck.questions.push(card)
    await AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
        [deck.title]: deck
    }))
}