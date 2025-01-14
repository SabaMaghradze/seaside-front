import React from "react";
import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080"
});

// adds a new room to the database
export async function addRoom(photo, roomType, roomPrice) {

    const formData = new FormData();
    
    formData.append("picture", photo);
    formData.append("roomType", roomType);
    formData.append("roomPrice", roomPrice);

    const response = await api.post("/rooms/add/new-room", formData);

    if (response.status === 201) {
        return true; 
    } else {
        return false;
    }
}

// fetches all room types from the database
export async function getAllRoomTypes() {
    try {
        const response = await api.get("/rooms/room-types");
        return response.data;
    } catch (error) {
        throw new Error("Error fetching room types");
    };
};