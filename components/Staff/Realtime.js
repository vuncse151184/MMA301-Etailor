import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
// import Swal from "sweetalert2";

export const Realtime = () => {
    const [messageReturn, setMessageReturn] = useState(null); // State to hold the message

    useEffect(() => {
        let connection; // Declare the connection variable

        const connectionInit = async () => {
            const URL = "https://e-tailorapi.azurewebsites.net/chatHub"; // Replace with your SignalR hub URL
            const manager = JSON.parse(localStorage.getItem("manager"));

            connection = new signalR.HubConnectionBuilder() // Assign value to connection variable
                .withUrl(URL, {
                    accessTokenFactory: () => manager?.token, // Function to retrieve JWT token
                })
                .configureLogging(signalR.LogLevel.Information)
                .build();

            connection.on("VNPayResult", (message) => {
                setMessageReturn(message);
                console.log("message", message);
            });

            connection.onclose(() => {
                console.log("Connection closed");
            });

            try {
                await connection.start();
                console.log("Connected to SignalR hub");
            } catch (error) {
                console.error("Error connecting to SignalR hub:", error);
            }
        };

        connectionInit();

        // Cleanup function to close the connection when the component unmounts
        return () => {
            // Ensure connection is closed when component unmounts
            if (connection) {
                connection.stop().then(() => console.log("Connection stopped"));
            }
        };
    }, []); // Empty dependency array ensures useEffect runs only once

    return messageReturn;
};