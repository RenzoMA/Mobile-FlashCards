import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, FlatList } from 'react-native'
import { gray, white, blue } from './../utils/colors'
import { Deck } from './Deck'
import { connect } from 'react-redux'

class DeckDetail extends Component {

    static navigationOptions = ({ navigation }) => {
        const { deckTitle } = navigation.state.params
        return {
            title: deckTitle
        }
    }
    goToAddCard = (title) => {
        this.props.navigation.navigate(
            'AddCard',
            { deckTitle: title }
        )
    }
    goToQuiz = (title) => {
        this.props.navigation.navigate(
            'Quiz',
            { deckTitle: title }
        )
    }
    render() {
        const { deck } = this.props
        return (
            <View style={styles.center}>
                <View style={styles.textContainer}>
                    <Text style={styles.titleText}> {deck.title} </Text>
                    <Text style={styles.cardCountText}> {deck.questions.length} cards</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => { this.goToAddCard(deck.title) }} style={styles.submitButton}>
                        <Text style={styles.buttonText}>Add Card</Text>
                    </TouchableOpacity>
                    {
                        deck.questions.length > 0 &&
                        <TouchableOpacity onPress={() => { this.goToQuiz(deck.title) }} style={[styles.submitButton, {backgroundColor:'black'}]}>
                            <Text style={styles.buttonText}>Start Quiz</Text>
                        </TouchableOpacity>
                }

                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 100
    },
    titleText: {
        fontSize: 28
    },
    cardCountText: {
        fontSize: 24,
        color: gray
    },
    textContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    buttonText: {
        color: white,
        fontSize: 20,
    },
    submitButton: {
        backgroundColor: blue,
        borderColor: gray,
        borderWidth: 1,
        borderRadius: 3,
        padding: 5,
        paddingLeft: 25,
        paddingRight: 25,
        margin: 20
    }
})

function mapStateToProps(state, { navigation }) {
    const { deckTitle } = navigation.state.params
    return {
        deck: { ...state[deckTitle] }
    }
}

export default connect(mapStateToProps)(DeckDetail)