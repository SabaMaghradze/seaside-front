import React, { useState } from "react";
import { addRoom } from "../utils/ApiFunctions";
import RoomTypeSelector from "../common/RoomTypeSelector";

const AddRoom = () => {

    const[newRoom, setNewRoom] = useState({
        photo: null,
        roomType: "",
        roomPrice: ""
    })

    const[imagePreview, setImagePreview] = useState("");
    const[successMessage, setSuccessMessage] = useState("");
    const[errorMessage, setErrorMessage] = useState("");

    const handleInputChange = (e) => {

        if (e.target.name === "roomPrice") {
            if (!isNaN(e.target.value)) {
                e.target.value = parseInt(e.taget.value);
            } else {
                e.taget.value = "";
            }
        }
        setNewRoom({ ...newRoom, [e.target.name]: e.target.value });

    };

    const handleImage = (e) => {
        const selectedImage = e.target.files[0];
        setNewRoom({...newRoom, photo: selectedImage});
        setImagePreview(URL.createObjectURL(selectedImage));
    }

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
    }

    return (
        <>
        <section className="container, mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <h2 className="mt-5 mb-2">Add a new room</h2>
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
                            <label htmlFor="picture" className="form-label">Room Type</label>
                            <input type="file" id="picture" name="picture" className="form-control" onChange={handleImage} />
                            {imagePreview && (
                                <img src={imagePreview} alt="Preview Room Photo" style={{ maxWidth: "400px", maxHeight: "400px"}} className="mb-3" />
                            )}
                        </div>
                        <div className="d-grid d-md-flex mt-2">
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