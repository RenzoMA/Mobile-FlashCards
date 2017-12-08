import { ADD_CARD, ADD_DECK, RECEIVE_DECKS } from '../actions'

function reducer(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS: {
            return {
                ...action.decks
            }
        }
        case ADD_DECK: {
            const key = action.deck.title
            return {
                ...state,
                [key]: action.deck
            }
        }
        case ADD_CARD: {
            const key = action.deck.title;
            let test = {
                ...state,
                [key]: {
                    ...state[key],
                    questions: [...state[key].questions, action.card]
                }
            }
            return {
                ...state,
                [key]: {
                    ...state[key],
                    questions: [...state[key].questions, action.card]
                }
            }
        }
        default:
            return state;
    }
}


export default reducer;