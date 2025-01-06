import React, { useEffect, useState } from 'react'
import { getAllRoomTypes } from '../utils/ApiFunctions';

const RoomTypeSelector = ({handleRoomInputChange, newRoom}) => {

    const[roomTypes, setRoomTypes] = useState([]);
    const[showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
    const[newRoomType, setNewRoomType] = useState("");

    useEffect(() => {
        getAllRoomTypes().then((data) => {
            setRoomTypes(data);
        }) 
    }, []);

    function handleNewRoomTypeInputChange(e) {
        setNewRoomType(e.target.value);
    };

    function handleAddition() {
        if (newRoomType !== "") {
            setRoomTypes([...roomTypes, newRoomType]);
            setNewRoomType("");
            setShowNewRoomTypeInput(false);
        }
    };

    return (
        <>
        {roomTypes.length > 0 && (
            <div>
                <select name="roomTypes" id="roomTypes" value={newRoom.roomType}
                onChange={(e) => {
                    if (e.target.value === "Add New") {
                        setShowNewRoomTypeInput(true);
                    } else {
                        handleRoomInputChange(e);
                    }
                }}>
                    <option value={""}>Select room type</option>
                    <option value={"Add New"}>Add New</option>
                    {roomTypes.map((type, index) => {
                        <option key={index} value={type}>
                            {type}
                        </option>
                    })}
                    
                </select>
            </div>
        )}
        {showNewRoomTypeInput && (
            <div className='input-group'>
                <input type="text" className='form-control' placeholder='Enter a new room type' onChange={handleNewRoomTypeInputChange} />
                <button className='btn btn-hotel' type='button' onClick={handleAddition}>Add</button>
            </div>
        )}
        </>
    )
}

export default RoomTypeSelector;













