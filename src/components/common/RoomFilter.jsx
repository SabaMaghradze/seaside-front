import { set } from 'mongoose';
import React, { useState } from 'react'

const RoomFilter = ({data, setFilteredData}) => {

    const[filter, setFilter] = useState("");

    function handleChange(e) {
        const selectedRoomType = e.target.value;
        setFilter(selectedRoomType);

        const filteredRooms = data.filter((room) => room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase()));

        setFilteredData(filteredRooms);
    }

    function clearFilter() {
        setFilter("");
        setFilteredData(data);
    }

    const roomTypes = [...new Set(data.map((room) => room.roomType))];

    return (
        <div className='input-group mb-3'>
            <span className='input-group-text' id='room-type-filter'>
                Filter rooms by type
            </span>
            <select className='form-select' value={filter} onChange={handleChange}>
                <option value={""}>Select a room type to filter...</option>
                {roomTypes.map((type, value) => {
                    <option key={index} value={type}>
                        {type}
                    </option>
                })}
            </select>
            <button className='btn btn-hotel' type='button' onClick={clearFilter}>Clear Filter</button>
        </div>
    )

}

export default RoomFilter;









