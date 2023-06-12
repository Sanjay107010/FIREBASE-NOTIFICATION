import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';

type Props = {title: any; body: any; data: any};

const FireBase = (props: Props) => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log('hhhhhhhhhhh::::::::::', remoteMessage);

      // const onDisplayNotification = async () => {
      // Request permissions (required for iOS)
      await notifee.requestPermission();

      // Create a channel (required for Android)
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });

      // Display a notification
      await notifee.displayNotification({
        // title: remoteMessage.notiftitle,
        // body: remoteMessage.notification?.body,
        // body: remoteMessage.data ? remoteMessage.data : null,ication?.
        android: {
          channelId,
          // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
          // pressAction is needed if you want the notification to open the app when pressed
          pressAction: {
            id: 'default',
          },
        },
      });
      // };
    });

    return unsubscribe;
  }, []);

  const onDisplayRemoteNotification = async () => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      await messaging()
        .getToken()
        .then(fcmToken => {
          console.log('FCM Token -> ', fcmToken);
        });
    } else {
      console.log('Not Authorization status:', authStatus);
    }
  };
  const onDisplayNotification = async () => {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title FRENIL',
      body: 'Main  cnotification',
      android: {
        channelId,
        // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: '50%',
      }}>
      <Button
        title="Display Local Notification"
        onPress={() => onDisplayNotification()}
      />
      <Button
        title="Display Remote Notification"
        onPress={() => onDisplayRemoteNotification()}
      />
      <Text>hhhh</Text>
    </View>
  );
};

export default FireBase;

const styles = StyleSheet.create({});
