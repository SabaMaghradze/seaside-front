import React, { useEffect, useState } from "react";
import { addRoom } from "../utils/ApiFunctions";
import RoomTypeSelector from "../common/RoomTypeSelector";
import { Link } from "react-router-dom";

const AddRoom = () => {

    const [newRoom, setNewRoom] = useState({
        photo: null,
        roomType: "",
        roomPrice: ""
    });

    const [imagePreview, setImagePreview] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = (e) => {

        let name = e.target.name;
        let value = e.target.value

        if (name === "roomPrice") {
            if (!isNaN(value)) {
                value = parseInt(value);
            } else {
                value = "";
            }
        }

        setNewRoom((prev) => ({ ...prev, [name]: value }));

    };

    const handleImage = (e) => {
        const selectedImage = e.target.files[0];
        setNewRoom({ ...newRoom, photo: selectedImage });
        setImagePreview(URL.createObjectURL(selectedImage));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice);
            if (success !== undefined) {
                setSuccessMessage("Room has been successfully persisted in the database");
                setNewRoom({ photo: null, roomType: "", roomPrice: "" });
                setImagePreview("");
                setErrorMessage("");
            } else {
                setErrorMessage("Error persiting the room to the database");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }

        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000); // in order to fade away in adherence with the className 
    };

    return (
        <>
            <section className="container mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col col-lg-4">
                        <h2 className="mt-5 mb-2">Add a new room</h2>
                        {successMessage && (
                            <div className="alert alert-success fade show">
                                New room has been successfully added!
                            </div>
                        )}
                        {errorMessage && (
                            <div className="alert alert-danger fade show">
                                Failed to save the room.
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label htmlFor="roomType" className="form-label">Room Type</label>
                                <div>
                                    <RoomTypeSelector handleRoomInputChange={handleInputChange} newRoom={newRoom} />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="roomPrice" className="form-label">Room Price</label>
                                <input type="number" className="form-control" required id="roomPrice" name="roomPrice"
                                    value={newRoom.roomPrice} onChange={handleInputChange} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="picture" className="form-label">Photo</label>
                                <input type="file" id="picture" name="picture" className="form-control" onChange={handleImage} />
                                {imagePreview && (
                                    <img src={imagePreview} alt="Preview Room Photo" style={{ maxWidth: "400px", maxHeight: "400px" }} className="mb-3" />
                                )}
                            </div>

                            <div className="d-grid gap-2 d-md-flex mt-2">
                                <Link to={'/existing-rooms'} className="btn btn-outline-info ml-2">Back</Link>
                                <button className="btn btn-outline-primary ml-5">Save</button>
                            </div>

                        </form>

                    </div>
                </div>
            </section>
        </>
    )

};

export default AddRoom;