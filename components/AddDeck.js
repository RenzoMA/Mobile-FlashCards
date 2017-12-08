import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput, KeyboardAvoidingView } from 'react-native'
import { blue, white, gray } from './../utils/colors'
import { connect } from 'react-redux'
import { addDeck } from './../actions'
import { saveDeckTitle } from './../utils/api'

class AddDeck extends Component {
    state = {
        title: ''
    }
    addDeck = () => {
        const { title } = this.state
        if (title) {
            const deck = {
                title: title,
                questions: []
            }
            saveDeckTitle(deck)
            this.props.addDeck(deck)
            this.props.goBack()
            this.setState({
                title: ''
            })
        }

    }
    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <Text style={styles.textLabel}>
                    What is the title of your new deck?
                </Text>
                <TextInput
                    value={this.state.title}
                    style={styles.textInput}
                    placeholder="Deck Title"
                    onChangeText={(title) => this.setState({ title })}
                />
                <TouchableOpacity onPress={this.addDeck} style={styles.submitButton}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}
function mapDispatchToProps(dispatch, { navigation }) {
    return {
        addDeck: (deck) => dispatch(addDeck(deck)),
        goBack: () => navigation.goBack()
    }
}
function mapStateToProps(state) {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddDeck)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    textLabel: {
        fontSize: 40,
        textAlign: 'center'
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