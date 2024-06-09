import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Realtime = () => {
    const [messageReturn, setMessageReturn] = useState(null);

    useEffect(() => {
        let connection;

        const startConnection = async () => {
            try {
                const user = await AsyncStorage.getItem("staff");
                if (user !== null) {
                    let staffInfo = JSON.parse(user);

                    const URL = "https://e-tailorapi.azurewebsites.net/chatHub";
                    const accessToken = staffInfo?.token;

                    if (accessToken) {
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

                        try {
                            await connection.start();
                            console.log('Connection started!');
                        } catch (err) {
                            console.error('Error starting connection: ', err);
                        }
                    }
                }
            } catch (err) {
                await startConnection();
                console.error('Error starting connection: ', err);
            }
        };

        startConnection();

        return () => {
            if (connection) {
                connection.stop()
                    .then(async () => {
                        console.log("Connection stopped")
                        console.log("--------------------------------------")
                        await startConnection();
                        console.log("--------------------------------------")
                    })
                    .catch(err => {
                        console.error('Error stopping connection: ', err)
                    });
            }
        };
    }, []);

    return messageReturn;
};