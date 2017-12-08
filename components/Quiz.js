import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput, KeyboardAvoidingView } from 'react-native'
import { blue, white, gray } from './../utils/colors'
import { connect } from 'react-redux'
import { addDeck } from './../actions'
import Question from './Question';
import { clearLocalNotification } from './../utils/helpers'

class Quiz extends Component {
    state = {
        currentQuestionIndex: 0,
        correctAnswers: 0,
        quizCompleted: false
    }

    onNextQuestion = (result) => {
        if (result) {
            const { correctAnswers } = this.state;
            this.setState({ correctAnswers: correctAnswers + 1 })
        }
        const { currentQuestionIndex } = this.state;
        const { deck } = this.props
        if ((currentQuestionIndex + 1) === deck.questions.length) {
            this.setState({ quizCompleted: true })
        } else {
            this.setState({ currentQuestionIndex: currentQuestionIndex + 1 });
        }

    }
    deleteTodaysNotification = () => {
        clearLocalNotification();
        return true;
    }
    render() {
        const { deck } = this.props;
        const { currentQuestionIndex, quizCompleted, correctAnswers } = this.state;
        return (
            <View style={styles.container}>
                {
                    quizCompleted && this.deleteTodaysNotification() ?
                        <View style={styles.container}>
                            <Text style={styles.quizCompletedText}>Quiz completed</Text>
                            <Text style={styles.resultsText}>{(correctAnswers / deck.questions.length) * 100}% correct answers</Text>
                        </View>
                        :
                        <View style={styles.container}>
                            <Text style={{ fontSize: 30 }}>{currentQuestionIndex + 1}/{deck.questions.length}</Text>
                            {
                                deck.questions.map((question, index) => {
                                    if (index === currentQuestionIndex) {
                                        return (
                                            <Question key={index} onNextQuestion={this.onNextQuestion} card={deck.questions[currentQuestionIndex]} />
                                        )
                                    }
                                })
                            }

                        </View>
                }

            </View>
        )

    }
}
function mapDispatchToProps(dispatch) {
    return {

    }
}
function mapStateToProps(state, { navigation }) {
    const { deckTitle } = navigation.state.params
    return {
        deck: { ...state[deckTitle] }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5,
        alignItems: 'center'
    },
    quizCompletedText: {
        fontSize: 20
    },
    resultsText: {
        fontSize: 25,
        color: gray
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Quiz)