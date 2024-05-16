// import React, { useEffect, useState } from "react";
// import * as signalR from "@microsoft/signalr";
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const Realtime = () => {
//     const [messageReturn, setMessageReturn] = useState(null); // State to hold the message
//     const [staffInfo, setStaffInfo] = useState(null);

//     React.useEffect(() => {
//         const retrieveStaffItem = async () => {
//             AsyncStorage.getItem("staff")
//                 .then((user) => {
//                     setStaffInfo(JSON.parse(user));
//                 })
//                 .catch((error) => {
//                     console.error("Error retrieving staff data:", error);
//                 });
//         };
//         retrieveStaffItem();
//     }, []);

//     useEffect(() => {
//         console.log('---------------------------------------')
//         console.log('run into realtime 0')
//         let connection; // Declare the connection variable

//         if (staffInfo) {
//             console.log('run into realtime 1')

//             const connectionInit = async () => {
//                 const URL = "https://e-tailorapi.azurewebsites.net/chatHub"; // Replace with your signalR hub URL

//                 console.log('run into realtime 2')
//                 // Create a new signalR connection
//                 // let connection = new signalR.HubConnectionBuilder()
//                 //     .withUrl(URL, {
//                 //         accessTokenFactory: () => staffInfo?.token
//                 //     })
//                 //     .configureLogging(signalR.LogLevel.Information)
//                 //     .build();

//                 console.log('run into realtime 3')

//                 // // Define event handler for incoming notifications
//                 // connection.on("Notification", (message) => {
//                 //     console.log('run intoconnection.on("Notification", (message)')
//                 //     setMessageReturn(message);
//                 //     console.log("message", message);
//                 // });

//                 // // // Define event handler for connection close
//                 // connection.onclose(() => {
//                 //     console.log("Connection closed");
//                 // });
//                 // console.log('run into realtime 4')

//                 // connection.on("Notification", message => {
//                 //     console.log('run intoconnection.on("Notification", (message)')
//                 //     setMessageReturn(message);
//                 //     console.log("message", message);
//                 // });

//                 // try {
//                 //     console.log('run into realtime 5')
//                 //     // Start the signalR connection
//                 //     await connection.start();
//                 //     console.log("Connected to signalR hub");
//                 // } catch (error) {
//                 //     console.error("Error connecting to signalR hub:", error);
//                 // }
//                 const accessToken =  staffInfo?.token;
//                 const connection = new signalR.HubConnectionBuilder()
//                     .withUrl(URL, {
//                         accessTokenFactory: () => accessToken,
//                         transport: signalR.HttpTransportType.WebSockets,
//                         skipNegotiation: true,
//                         headers: {
//                             'Authorization': `Bearer ${accessToken}`,
//                         },
//                     })
//                     .withAutomaticReconnect()
//                     .configureLogging(signalR.LogLevel.Information)
//                     .build();

//                 connection.onreconnecting(error => {
//                     console.log('Connection lost due to error', error);
//                 });

//                 connection
//                     .start()
//                     .then(() => {
//                         console.log('Connection started!');
//                         // connection.on('Notification', (message) => {
//                         //     console.log(`Received message from: ${message}`);
//                         // });
//                     })
//                     .catch((err) => console.error('Connection failed: ', err));
//             };


//             try {
//                 connectionInit();
//                 console.log('run into realtime 6')
//             } catch (error) {
//                 console.log('error', error)
//             }

//             // Cleanup function to close the connection when the component unmounts
//             return () => {
//                 // Ensure connection is closed when component unmounts
//                 if (connection) {
//                     connection.stop().then(() => console.log("Connection stopped"));
//                 }
//             };
//         };
//     }, [staffInfo]); // Dependency array ensures useEffect runs when staffInfo changes

//     return messageReturn;
// };
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
            console.log("accessToken",accessToken)
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
                console.log("message", message);
            });

            connection.start()
                .then(() => console.log('Connection started!'))
                .catch(err => console.error('Connection failed: ', err)); // Add error handling here
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
