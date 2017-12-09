import { ADD_CARD, ADD_DECK, RECEIVE_DECKS } from './types'

export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}
export function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck
    }
}

export function addCard({ deck, card }) {
    return {
        type: ADD_CARD,
        deck,
        card
    }
}