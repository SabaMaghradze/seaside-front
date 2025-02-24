import moment from 'moment/moment'
import React from 'react'
import { useState } from 'react'
import { getAvailableRooms } from '../utils/ApiFunctions'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import RoomTypeSelector from './RoomTypeSelector'
import RoomSearchResult from './RoomSearchResult'


const RoomSearch = () => {

    const [searchQuery, setSearchQuery] = useState({
        checkInDate: "",
        checkOutDate: "",
        roomType: ""
    })

    const [errorMessage, setErrorMessage] = useState("")
    const [availableRooms, setAvailableRooms] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    function handleSearch(e) {

        e.preventDefault();

        const checkInMoment = moment(searchQuery.checkInDate);
        const checkOutMoment = moment(searchQuery.checkOutDate);

        if (!checkInMoment.isValid() || !checkOutMoment.isValid()) {
            setErrorMessage("Please provide valid dates");
            return;
        }

        if (checkOutMoment.isSameOrBefore(checkInMoment)) {
            setErrorMessage("Check-out date must not precede check-in date");
            return;
        }

        setIsLoading(true);

        console.log("test");

        getAvailableRooms(searchQuery.checkInDate, searchQuery.checkOutDate, searchQuery.roomType)
            .then((result) => {
                setAvailableRooms(result.data);
                console.log(result.data);
                setIsLoading(false);
                setErrorMessage("");
            })
            .catch((error) => {
                setErrorMessage(error.message);
                setIsLoading(false);
            })
    }

    function handleInputChange(e) {

        const { name, value } = e.target;
        setSearchQuery({...searchQuery, [name]: value});

        const checkInMoment = moment(searchQuery.checkInDate);
        const checkOutMoment = moment(searchQuery.checkOutDate);

        if (checkInMoment.isValid() && checkOutMoment.isValid()) {
            setErrorMessage("");
        }        
    }

    function handleClearSearch() {
        setSearchQuery({
            checkInDate: "",
            checkOutDate: "",
            roomType: ""
        })
        setAvailableRooms([]);
    }

    return (
        <>
        <Container className="shadow mt-n5 mb-5 py-5">
            <Form onSubmit={handleSearch}>
                <Row className="justify-content-center">
                    <Col xs={12} md={3}>
                        <Form.Group controlId="checkInDate" className='text-start'>
                            <Form.Label>Check-in Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="checkInDate"
                                value={searchQuery.checkInDate}
                                onChange={handleInputChange}
                                min={moment().format("YYYY-MM-DD")}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={3}>
                        <Form.Group controlId="checkOutDate" className='text-start'>
                            <Form.Label>Check-out Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="checkOutDate"
                                value={searchQuery.checkOutDate}
                                onChange={handleInputChange}
                                min={moment().format("YYYY-MM-DD")}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={3}>
                        <Form.Group controlId="roomType" className='text-start'>
                            <Form.Label>Room Type</Form.Label>
                            <div className="d-flex">
                                <RoomTypeSelector
                                    handleRoomInputChange={handleInputChange}
                                    newRoom={searchQuery}
                                />
                                <Button variant="secondary" type="submit" className="ml-2 btn-hotel">
                                    Search
                                </Button>
                            </div>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>

            {isLoading ? (
                <p className="mt-4">Finding availble rooms....</p>
            ) : availableRooms ? (
                <RoomSearchResult results={availableRooms} onClearSearch={handleClearSearch} />
            ) : (
                <p className="mt-4">No rooms available for the selected dates and room type.</p>
            )}
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </Container>
    </>
    )
}

export default RoomSearch