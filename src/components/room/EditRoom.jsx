import React, { useEffect } from 'react'
import { useState } from 'react';
import { getRoomById, updateRoom } from '../utils/ApiFunctions';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import RoomTypeSelector from '../common/RoomTypeSelector';

// resembles AddRoom component to a large extent, so most code pieces are copied from there.

const EditRoom = () => {

    const [room, setRoom] = useState({
        photo: null,
        roomType: "",
        roomPrice: ""
    });

    const[imagePreview, setImagePreview] = useState("");
    const[successMessage, setSuccessMessage] = useState("");
    const[errorMessage, setErrorMessage] = useState("");

    const { roomId } = useParams();

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setRoom({ ...room, [name]: value });
    }

    const fetchRoom = async () => {
        try {
            const roomData = await getRoomById(roomId);
            setRoom(roomData);
            setImagePreview(roomData.photo);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchRoom();
    }, [roomId]);

    const handleImage = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            setRoom({ ...room, photo: selectedImage });
            setImagePreview(URL.createObjectURL(selectedImage));
        }
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const response = await updateRoom(roomId, room);
            if (response.status === 200) {
                setSuccessMessage("Room updated successfully");
                const updatedRoomData = await getRoomById(roomId);
                setRoom(updatedRoomData);
                setImagePreview(updatedRoomData.photo);
                setErrorMessage("");
            } else {
                setErrorMessage("Failed to update room");
            }
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
        }

        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);
    }

    return (
        <>
            <section className="container mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col col-lg-4">
                        <h2 className="mt-5 mb-2">Add a new room</h2>
                        {successMessage && (
                            <div className="alert alert-success fade show">
                                The room has been successfully updated!
                            </div>
                        )}
                        {errorMessage && (
                            <div className="alert alert-danger fade show">
                                Failed to update the room.
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label htmlFor="roomType" className="form-label">Room Type</label>
                                <div>
                                    <RoomTypeSelector handleRoomInputChange={handleInputChange} newRoom={room} />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="roomPrice" className="form-label">Room Price</label>
                                <input type="number" className="form-control" required id="roomPrice" name="roomPrice"
                                    value={room.roomPrice} onChange={handleInputChange} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="picture" className="form-label">Photo</label>
                                <input type="file" id="picture" name="picture" className="form-control" onChange={handleImage} />
                                {imagePreview && (
                                    <img src={imagePreview} alt="Preview Room Photo" style={{ maxWidth: "400px", maxHeight: "400px" }} className="mb-3" />
                                )}
                            </div>
                            <div className='d-md-flex mt-2'>
                                <Link to={"/existing-rooms"} className='btn btn-outline-info ml-5'>Back</Link>
                            </div>
                            <button type='submit' className='btn btn-outline-warning'>
                                Edit Room
                            </button>

                        </form>

                    </div>
                </div>
            </section>
        </>
    )
  
}

export default EditRoom









