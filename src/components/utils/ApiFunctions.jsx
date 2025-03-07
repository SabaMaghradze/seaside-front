import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080"
});


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

export async function getAllBookings() {
    try {
        const result = await api.get(`/bookings/all-bookings`);
        return result.data;
    } catch (error) {
        throw new Error(`Failed to fetch all bookings: ${error.message}`);
    }
}

export async function saveBooking(roomId, booking) {
    try {
        const response = await api.post(`/bookings/room/${roomId}/booking`, booking);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to book room ${roomId}: ${error.response?.data}`);
    }
}

export async function getBookingByConfirmationCode(confirmationCode) {
    try {
        const result = await api.get(`/bookings/confirmation/${confirmationCode}`);
        return result.data;
    } catch (error) {
        throw new Error(`Failed to fetch the booking with confirmation code of ${confirmationCode}`);
    }
}

export async function deleteBooking(bookingId) {
    try {
        const response = await api.delete(`/bookings/${bookingId}/delete`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to cancel booking with id ${bookingId}: ${error.message}`);
    }
}

export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
    try {
        const result = await api.get(`/rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`);
        return result;
    } catch (error) {
        throw new Error(`Failed to send request to /rooms/available-rooms: ${error.message}`);
    }
}

export async function register(registrationData) {
    try {
        const response = await api.post("/auth/register", registrationData);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(`Failed to register user: ${error?.response.data}`);
    }
}

export function getHeader() {
    const token = localStorage.getItem("token");
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    }
}

export async function loginUser(userData) {
    try {
        const response = await api.post("/auth/login", userData);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to log in: ${error.message}`);
    }
}

export async function getUser(email, token) {
    try {
        const response = await api.get(`/users/${email}`, { headers: getHeader() });
        return response.data;
    } catch (error) {
        throw new Error(error?.response.data || error.message);
    }
}

export async function deleteUserById(userId) {
    try {
        const response = await api.delete(`/users/delete/${userId}`, { headers: getHeader() });
        return response.data;
    } catch (error) {
        throw new Error(error?.response.data || error.message);
    }
}

export async function getBookingsByUserId(userEmail) {
    try {
        const response = await api.get(`/bookings/user/${userEmail}/bookings`, { headers: getHeader() });
        return response.data;
    } catch (error) {
        throw new Error(error?.response.data || error.message);
    }
}