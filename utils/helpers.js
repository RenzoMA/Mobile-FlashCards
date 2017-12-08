import { Notifications, Permissions } from 'expo'
import { View, StyleSheet, AsyncStorage } from 'react-native'

const NOTIFICATION_KEY = 'MobileFlashcards:notifications'

function createNotification() {
    return {
        title: 'Study!',
        body: "👋 don't forget to study today! 👋",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}

export const clearLocalNotification = async () => {
    try {
        await AsyncStorage.removeItem(NOTIFICATION_KEY);
        await Notifications.cancelAllScheduledNotificationsAsync();
        await setLocalNotification();
    }
    catch (error) {
        console.log(error);
    }
}

export const setLocalNotification = async () => {
    try {
        await AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
        const result = await AsyncStorage.getItem(NOTIFICATION_KEY)
        let data = JSON.parse(result)
        if (data === true) {
            Permissions.askAsync(Permissions.NOTIFICATIONS)
                .then(({ status }) => {
                    if (status === 'granted') {
                        Notifications.cancelAllScheduledNotificationsAsync()
                        let tomorrow = new Date()
                        tomorrow.setDate(tomorrow.getDate() + 1)
                        tomorrow.setHours(16)
                        tomorrow.setMinutes(0)
                        Notifications.scheduleLocalNotificationAsync(
                            createNotification(),
                            {
                                time: tomorrow,
                                repeat: 'day'
                            });
                    }
                })
        }
    }
    catch (error) {
        console.log(error);
    }
}

