import React, { useEffect, useState } from 'react'
import { deleteRoom, getAllRooms } from '../utils/ApiFunctions';
import RoomsPaginator from '../common/RoomsPaginator';
import { Col, Row } from 'react-bootstrap';
import RoomFilter from '../common/RoomFilter';
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

const ExistingRooms = () => {

    const [rooms, setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage, setRoomsPerPage] = useState(8);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchRooms();
    }, []);

    async function fetchRooms() {
        setIsLoading(true);
        try {
            const result = await getAllRooms();
            setRooms(result);
            setIsLoading(false);
        } catch (error) {
            setErrorMessage(error);
        }
    }

    useEffect(() => {
        if (selectedRoomType === "") {
            setFilteredRooms(rooms);
        } else {
            const filtered = rooms.filter((room) => room.roomType = selectedRoomType);
            setFilteredRooms(filtered);
        }
        setCurrentPage(1);
    }, [rooms, selectedRoomType]);

    function calculateTotalPages(rooms, filteredRooms, roomsPerPage) {
        const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
        return Math.ceil(totalRooms / roomsPerPage);
    }

    function handlePaginationClick(pageNumber) {
        setCurrentPage(pageNumber);
    }

    async function handleDelete(roomId) {
        try {
            const result = await deleteRoom(roomId);

            if (result?.message === "success") { // we will not be returning anything from the back-end so it should be empty string.
                setSuccessMessage(`Room with ID ${roomId} has been successfully deleted`);
                await fetchRooms();
            } else {
                console.error(`Unexpected response while deleting room: ${result}`);
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000)
    }

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

    // console.log("current rooms: " + currentRooms);

    return (
        <>
            <div className='container col-md-8 col-lg-6'>
                {successMessage && <p className='alert alert-success mt-5'>{successMessage}</p>}
                {errorMessage && <p className='alert alert-danger mt-5'>{errorMessage}</p>}
            </div>
            {isLoading ? (
                <p>Loading existing rooms...</p>
            ) : (
                <>
                    <section className='mt-5 mb-5 container'>
                        <div className='d-flex justify-content-between mb-3 mt-5'>
                            <h2>Rooms</h2>
                        </div>
                            <Row>
                                <Col md={6} className='mb-3 mb-md-0'>
                                    <RoomFilter data={rooms} setFilteredData={setFilteredRooms} />
                                </Col>
                                <Col md={6} className='d-flex justify-content-end' >
                                    <Link to={"/add-room"}>
                                        <FaPlus /> Add Room
                                    </Link>
                                </Col>
                            </Row>
                        <table className='table table-bordered table-hover'>
                            <thead>
                                <tr className='text-center'>
                                    <th>ID</th>
                                    <th>Room Type</th>
                                    <th>Room Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRooms.map((room) => (
                                    <tr key={room.id} className='text-center'>
                                        <td>{room.id}</td>
                                        <td>{room.roomType}</td>
                                        <td>{room.roomPrice}$</td>
                                        <td className='gap-2'>
                                            <Link to={`/edit-room/${room.id}`}>
                                                <span className='btn btn-info btn-sm'>
                                                    <FaEye />
                                                </span>
                                                <span className='btn btn-warning btn-sm'>
                                                    <FaEdit />
                                                </span>
                                            </Link>
                                            <button className='btn btn-danger btn-sm'
                                                onClick={() => handleDelete(room.id)}>
                                                <FaTrashAlt />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <RoomsPaginator currentPage={currentPage} totalPages={calculateTotalPages(rooms, filteredRooms, roomsPerPage)} onPageChange={handlePaginationClick} />
                    </section>
                </>
            )}
        </>
    )
}

export default ExistingRooms;











