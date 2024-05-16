import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Realtime } from './Realtime'
import { Notifications } from 'expo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Divider, Text, Appbar,
  ActivityIndicator,
} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

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
  const startMillis = startDate.getTime();
  const currentMillisUTC7 = currentDateUTC.getTime();
  const millisDiff = currentMillisUTC7 - startMillis;
  const dayDiff = millisDiff / (1000 * 60 * 60 * 24);
  return dayDiff < 3 ? "Mới" : dayDiff < 7 ? "Tuần này" : dayDiff < 30 ? "Tháng này" : null
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
  }, [chatNotification]);
  const [loading, setLoading] = useState(false);
  const _goBack = () => navigation.navigate("Staff-Tasks");
  return (
    <>
      <Appbar.Header style={{ height: 40 }} statusBarHeight={0}>
        <View style={styles.headerContent}>
          <Appbar.BackAction onPress={_goBack} style={styles.backAction} />
          <Appbar.Content
            title={`Thông báo ${notifications?.data.length}`}
            titleStyle={styles.title}
          />
        </View>
      </Appbar.Header>
      <ScrollView>

        <View style={{ flex: 1, backgroundColor: '#fff' }}>


          <Text style={{ fontSize: 20, fontWeight: "bold", paddingLeft: 10 }}>Mới</Text>
          {notifications ? notifications?.data.map((item, index) => (

            <>
              {filterByTime(new Date(item.sendTime)) === "Mới" && (
                <>
                  <View style={{ padding: 10, flexDirection: 'row', alignItems: "center" }} key={index}>
                    <View>
                      <View>
                        <Text>{'\u2B24'}</Text>
                      </View>
                    </View>
                    <View>
                      <View>
                        <Text style={[styles.tittleText, { color: "green" }]}>{item.title}</Text>
                      </View>
                      <View style={{ paddingRight: 5 }}>
                        <Text style={styles.normalText}>{item.content}  .{getHoursDifference(new Date(item.sendTime))}</Text>
                      </View>
                    </View>
                  </View>
                  <Divider />
                </>
              )}

              {filterByTime(new Date(item.sendTime)) === "Tuần này" && (
                <>
                  <View style={{ padding: 10, flexDirection: 'row', alignItems: "center" }} key={index}>

                    <View>
                      <View>
                        <Text style={[styles.tittleText, { color: "green" }]}>{item.title}</Text>
                      </View>
                      <View>
                        <Text style={styles.normalText}>{item.content}  .{getHoursDifference(new Date(item.sendTime))}</Text>
                      </View>
                    </View>
                  </View>
                  <Divider />
                </>
              )}
              {filterByTime(new Date(item.sendTime)) === "Tháng này" && (
                <>
                  <View style={{ padding: 10, flexDirection: 'row', alignItems: "center" }} key={index}>

                    <View>
                      <View>
                        <Text style={[styles.tittleText, { color: "green" }]}>{item.title}</Text>
                      </View>
                      <View>
                        <Text style={styles.normalText}>{item.content}  .{getHoursDifference(new Date(item.sendTime))}</Text>
                      </View>
                    </View>
                  </View>
                  <Divider />
                </>
              )}
            </>
          )) : (
            <Text>Không có thông báo</Text>
          )}

        </View >
      </ScrollView >
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
  title: {
    flex: 1,
    marginTop: 5,
    marginLeft: 20,
  },
  tittleText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 5
  },
  normalText: {
    fontSize: 12,
    marginLeft: 15,
    marginBottom:5
  }
})