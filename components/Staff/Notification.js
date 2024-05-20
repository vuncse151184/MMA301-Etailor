import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Realtime } from './Realtime'
import { Notifications } from 'expo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Divider, Text, Appbar,
  ActivityIndicator,
} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

const WIDTH = Dimensions.get('window').width;

function getHoursDifference(startDate) {
  const currentDateUTC = new Date();
  const startMillis = startDate.getTime();
  const currentMillisUTC7 = currentDateUTC.getTime();
  const millisDiff = currentMillisUTC7 - startMillis;
  const hoursDiff = millisDiff / (1000 * 60 * 60);

  return hoursDiff <= 0 ? `Ngay bây giờ` : hoursDiff < 1 ? `${Math.floor(hoursDiff * 60)} phút trước` : hoursDiff < 24 ? `${Math.floor(hoursDiff)} giờ trước` : `${Math.floor(hoursDiff / 24)} ngày trước`;
}


function filterByTime(startDate) {
  const currentDateUTC = new Date();
  const millisDiff = currentDateUTC.getTime() - startDate.getTime();
  const dayDiff = millisDiff / (1000 * 60 * 60 * 24);
  if (dayDiff < 3) return 'Mới';
  if (dayDiff < 7) return 'Tuần này';
  if (dayDiff < 30) return 'Tháng này';
  return null;
}
const Notification = ({ navigation, route }) => {
  const { notification } = route.params;
  const [staffInfo, setStaffInfo] = useState(null);
  const [notifications, setNotifications] = useState(notification)
  React.useEffect(() => {
    const retrieveStaffItem = async () => {
      AsyncStorage.getItem("staff")
        .then((user) => {
          setStaffInfo(JSON.parse(user));
        })
        .catch((error) => {
          console.error("Error retrieving staff data:", error);
        });
    };
    retrieveStaffItem();
  }, []);

  const chatNotification = Realtime()

  const fetchStaffNotification = async () => {
    console.log("fetching notification")
    const URL = `https://e-tailorapi.azurewebsites.net/api/notification/get-notification`
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${staffInfo.token}`
      }
    });
    if (response.ok && response.status === 200) {
      const responseData = await response.json();
      setNotifications(responseData);
    }

  }
  useEffect(() => {
    if (chatNotification) {
      fetchStaffNotification()
      console.log("Có Chat Notification", chatNotification);
    }
  }, [chatNotification,navigation]);
  const [loading, setLoading] = useState(false);
  const _goBack = () => navigation.navigate("Staff-Tasks");
  const handleNavigateNotification = (title, id) => {
    async function markAsRead() {
      const URL = `https://e-tailorapi.azurewebsites.net/api/notification/get-notification/${id}`
      const response = await fetch(URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${staffInfo.token}`
        }
      });

    }
    markAsRead();
    console.log("Title", title)
    const taskId = title.split(" ")[2];
    console.log("Task ID", taskId)
    navigation.navigate("Staff-Task-Detail", { id: taskId, staffInfo: staffInfo });

  }
  const renderNotifications = () => {
    const categories = ['Mới', 'Tuần này', 'Tháng này'];
    return categories.map((category) => (
      <View key={category}>
        {notifications.data.some((item) => filterByTime(new Date(item.sendTime)) === category) && (
          <>
            <Text style={styles.categoryHeader}>{category}</Text>
            {notifications.data
              .filter((item) => filterByTime(new Date(item.sendTime)) === category)
              .map((item, index) => (
                <View key={index} style={styles.notificationContainer}>
                  {item.isRead ?
                    <TouchableOpacity onPress={() => handleNavigateNotification(item.content, item.id)}>
                      <View style={styles.notificationContent}>

                        <View>
                          <Text style={styles.read_title}>{item.title}</Text>
                          <Text style={styles.read_content}>{item.content} . {getHoursDifference(new Date(item.sendTime))}</Text>
                        </View>

                      </View>
                    </TouchableOpacity>
                    : <TouchableOpacity onPress={() => handleNavigateNotification(item.content, item.id)}>
                      <View style={styles.notificationContent}>

                        <View>
                          <Text style={styles.title}>{item.title}</Text>
                          <Text style={styles.content}>{item.content} . {getHoursDifference(new Date(item.sendTime))}</Text>
                        </View>
                        <View style={styles.dot_noti}>
                          <Text style={styles.dot}>{'\u2B24'}</Text>
                        </View>

                      </View>
                    </TouchableOpacity>
                  }
                  <Divider />
                </View>
              ))}
          </>
        )}
      </View>
    ));
  };

  return (
    <>

      <Appbar.Header style={{ height: 40 }} statusBarHeight={0}>
        <View style={styles.headerContent}>
          <Appbar.BackAction onPress={_goBack} style={styles.backAction} />
          <Appbar.Content
            title="Thông báo"
            titleStyle={styles.appbar_title}
          />
        </View>
      </Appbar.Header>
      <ScrollView style={styles.container}>

        {notifications ? renderNotifications() : <Text>Không có thông báo</Text>}
      </ScrollView>
    </>
  )
}

export default Notification

const styles = StyleSheet.create({
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 0,
    paddingTop: 0,
  },
  read_title: {
    fontSize: 17,
    fontWeight: '800',
    color: '#747677',
    width: WIDTH - 50,
  },
  read_content: {
    fontSize: 12,
    color: '#747677',
    width: WIDTH - 70,
  },
  header: {
    height: 40,
  },
  backAction: {
    marginTop: 0,
  },
  appbar_title: {
    flex: 1,
    marginTop: 5,
    marginLeft: 20
  },
  dot_noti: {
    position: 'absolute',
    right: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  categoryHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 10,
    marginTop: 10,
  },
  notificationContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationContent: {
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    width: WIDTH - 10,
    paddingVertical: 7,
  },
  dot: {
    color: '#BF2188',
    marginRight: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: 'black',
    width: WIDTH - 50,
  },
  content: {
    fontSize: 12,
    width: WIDTH - 70,
  },
});