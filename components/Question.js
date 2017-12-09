import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput, KeyboardAvoidingView, Animated } from 'react-native'
import { blue, white, gray } from './../utils/colors'
import { connect } from 'react-redux'
import { addDeck } from './../actions'

export default class Question extends Component {

    constructor(props) {
        super(props)
        this.state = {
            flipValue: new Animated.Value(0),
            fadeAnim: new Animated.Value(1),
            widthAnim: new Animated.Value(300),
            widthAnimBack: new Animated.Value(300),
            flipped: false
        }
        this.frontCardAnimation = [{
            rotateY: this.state.flipValue.interpolate({
                inputRange: [0, 180],
                outputRange: ['0deg', '180deg'],
            })
        }]
    }

    flipCard = () => {
        const { flipValue } = this.state;
        Animated.timing(
            this.state.widthAnim,
            {
                toValue: 0,
                duration: 800
            }
        ).start();
        Animated.timing(
            flipValue, {
                toValue: 180,
                duration: 800
            }).start();
        this.setState({ flipped: true });

    }

    setCorrectAnswer = () => {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 0,
                duration: 800,
            }
        ).start(() => {
            this.props.onNextQuestion(true)
        });
    }
    setWrongAnswer = () => {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 0,
                duration: 800,
            }
        ).start(() => {
            this.props.onNextQuestion(false)
        });
    }
    render() {
        const frontAnimatedStyle = {
            transform: this.frontCardAnimation
        }
        const { fadeAnim, widthAnim, flipped, widthAnimBack } = this.state;
        const { card } = this.props;
        return (
            <View style={styles.container}>
                {flipped &&
                    <Animated.View style={[styles.flipCard, { width: widthAnimBack, opacity: fadeAnim }]}>
                        <Text style={styles.textContent}>{card.answer}</Text>
                        <TouchableOpacity onPress={this.setCorrectAnswer} style={[styles.button, { backgroundColor: 'green' }]}>
                            <Text style={styles.buttonText}>Correct</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.setWrongAnswer} style={[styles.button, { backgroundColor: 'red' }]}>
                            <Text style={styles.buttonText}>Incorrect</Text>
                        </TouchableOpacity>
                    </Animated.View>
                }
                <Animated.View style={[styles.flipCard, frontAnimatedStyle, { width: widthAnim }]}>
                    <Text style={styles.textContent}>{card.question}</Text>
                    <TouchableOpacity style={{ marginTop: 10 }} onPress={this.flipCard}>
                        <Text style={{ color: blue, fontSize: 18 }}>Answer</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    flipCard: {
        width: 300,
        height: 400,
        backgroundColor: white,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'
    },
    flipText: {
        width: 90,
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    buttonText: {
        color: white,
        fontSize: 20,
    },
    button: {
        borderWidth: 1,
        borderRadius: 3,
        padding: 5,
        paddingLeft: 25,
        paddingRight: 25,
        margin: 20
    },
    textContent: {
        margin: 10,
        fontSize: 25,
        textAlign: 'center'
    }
});