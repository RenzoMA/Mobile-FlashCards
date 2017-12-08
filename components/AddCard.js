import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput, KeyboardAvoidingView, Image } from 'react-native'
import { connect } from 'react-redux'
import { blue, white, gray } from './../utils/colors'
import { addCard } from './../actions'
import { addCardToDeck } from './../utils/api'

class AddCard extends Component {

    state = {
        question: '',
        answer: ''
    }

    addCard = () => {
        const { question, answer } = this.state;
        if (question && answer) {
            const { deck } = this.props
            const param = {
                deck: deck,
                card: this.state
            }
            this.props.addCard(param)
            addCardToDeck(param);
            this.props.goBack()
        }

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <KeyboardAvoidingView style={styles.container}>
                    <TextInput
                        value={this.state.question}
                        style={styles.textInput}
                        placeholder="Question"
                        onChangeText={(question) => this.setState({ question })}
                    />
                    <TextInput
                        value={this.state.answer}
                        style={styles.textInput}
                        placeholder="Answer"
                        onChangeText={(answer) => this.setState({ answer })}
                    />
                    <TouchableOpacity onPress={this.addCard} style={styles.submitButton}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-start',
        alignItems: 'center'

    },
    textInput: {
        marginTop: 20,
        padding: 15,
        borderColor: blue,
        borderWidth: 1,
        borderRadius: 3,
        alignSelf: 'stretch',
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

function mapDispatchToProps(dispatch, { navigation }) {
    return {
        addCard: (param) => dispatch(addCard(param)),
        goBack: () => navigation.goBack()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)