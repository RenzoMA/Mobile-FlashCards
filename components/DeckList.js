import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, FlatList } from 'react-native'
import { Deck } from './Deck'
import { blue } from './../utils/colors'
import { connect } from 'react-redux'
import { getDecks } from './../utils/api'
import { receiveDecks } from './../actions'
import { MaterialIcons } from '@expo/vector-icons'

class DeckList extends Component {

    componentDidMount() {
        getDecks().then((result) => {
            this.props.receiveDecks(result);
        })

    }
    renderItem = ({ item }) => {
        const cardCount = item.questions ? item.questions.length : 0;
        return (
            <View>
                <MaterialIcons
                    style={{ position: 'absolute' }}
                    name='folder-special'
                    size={30}
                />
                <Deck
                    cardCount={cardCount} {...item}
                    onPress={() => this.onDeckPress(item.title)} /></View>)
    }

    onDeckPress = (title) => {
        this.props.navigation.navigate(
            'DeckDetail',
            { deckTitle: title }
        )
    }

    _keyExtractor = (item, index) => item.title;

    render() {
        const { decks } = this.props;
        let result = Object.keys(decks).map((key) => decks[key]);


        return (
            <View style={styles.container}>
                <FlatList
                    data={result}
                    renderItem={this.renderItem}
                    keyExtractor={this._keyExtractor}
                />
            </View>)

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
})
function mapDispatchToProps(dispatch) {
    return {
        receiveDecks: (decks) => dispatch(receiveDecks(decks))
    }
}
function mapStateToProps(state) {
    return {
        decks: state
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)