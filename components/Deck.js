import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, FlatList } from 'react-native'
import { gray } from './../utils/colors'
import { Ionicons } from '@expo/vector-icons'

export function Deck({ title, cardCount, onPress }) {

    return (
        <View>
            <TouchableOpacity onPress={onPress} style={styles.center}>
                <Text style={styles.titleText}> {title} </Text>
                <Text style={styles.cardCountText}> {cardCount} cards</Text>
            </TouchableOpacity>
            <View style={{ borderBottomColor: gray, borderBottomWidth: 1, height: 1, marginLeft: 10, marginRight: 10 }}>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 100
    },
    titleText: {
        fontSize: 18
    },
    cardCountText: {
        fontSize: 14,
        color: gray
    }
})