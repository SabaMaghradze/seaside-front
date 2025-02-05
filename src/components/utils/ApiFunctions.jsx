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

export async function getAllRooms() {
    try {
        const response = await api.get("/rooms/all-rooms");
        return response.data;
    } catch (error) {
        throw new Error("Error fetching rooms");
    }
}

export async function deleteRoom(roomId) {
    try {
        const response = await api.delete(`/rooms/deleteRoom/${roomId}`);
        console.log(response);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw new Error("Error deleting room");
    }
}

export async function getRoomById(roomId) {
    try {
        const result = await api.get(`/rooms/room/${roomId}`);
        return result.data;
    } catch (error) {
        throw new Error("Error fetching room with id " + roomId);
    }
}

export async function updateRoom(roomId, roomData) {
    const formData = new FormData();
    formData.append("roomType", roomData.roomType);
    formData.append("roomPrice", roomData.roomPrice);
    formData.append("picture", roomData.photo);
    const result = await api.put(`/rooms/update/${roomId}`, formData);
    return result;
}