import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Realtime = () => {
    const [messageReturn, setMessageReturn] = useState(null);
    const [staffInfo, setStaffInfo] = useState(null);

    useEffect(() => {
        const retrieveStaffItem = async () => {
            try {
                const user = await AsyncStorage.getItem("staff");
                if (user !== null) {
                    setStaffInfo(JSON.parse(user));
                }
            } catch (error) {
                console.error("Error retrieving staff data:", error);
            }
        };
        retrieveStaffItem();
    }, []);

    useEffect(() => {
        let connection;

        if (staffInfo) {
            const URL = "https://e-tailorapi.azurewebsites.net/chatHub";

            const accessToken = staffInfo?.token;
            console.log("accessToken", accessToken)
            connection = new signalR.HubConnectionBuilder()
                .withUrl(URL, {
                    withCredentials: true,
                    accessTokenFactory: () => accessToken,
                    transport: signalR.HttpTransportType.WebSockets,
                    skipNegotiation: true,
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                })
                .configureLogging(signalR.LogLevel.Information)
                .build();

            connection.on("Notification", message => {
                setMessageReturn(message);

               
            });

            connection.start()
                .then(() => console.log('Connection started!'))
                .catch(err => { }); // Add error handling here
        }

        return () => {
            if (connection) {
                connection.stop()
                    .then(() => console.log("Connection stopped"))
                    .catch(err => console.error('Error stopping connection: ', err));
            }
        };
    }, [staffInfo]);

    return messageReturn;
};
