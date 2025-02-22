import React, { useEffect, useState } from 'react'
import BookingForm from './BookingForm'
import { getRoomById } from '../utils/ApiFunctions';
import { useParams } from 'react-router-dom';
import RoomCarousel from '../common/RoomCarousel';
import { FaWifi, FaParking, FaCar, FaTshirt, FaWineGlassAlt, FaTv, FaUtensils } from 'react-icons/fa';

const Checkout = () => {

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [roomInfo, setRoomInfo] = useState({
        photo: null,
        roomType: "",
        roomPrice: ""
    });

    const { roomId } = useParams();

    useEffect(() => {
        getRoomById(roomId)
            .then((data) => {
                setRoomInfo(data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(`Error occurred while fetching the room with id ${roomId}`);
                console.log(error);
            })
    }, [roomId])

    return (
        <div>
            <section className='container'>
                <div className='row'>
                    <div className='col-md-4 mt-5 mb-5'>
                        {isLoading ? (
                            <p>Loading room information...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : (
                            <div className='room-info'>
                                <img src={`data:image/png;base64,${roomInfo.photo}`} style={{ width: "100%", height: "200px" }} />

                                <table className='table table-bordered text-start'>
                                    <tbody>
                                        <tr>
                                            <th>Room Type:</th>
                                            <td>{roomInfo.roomType}</td>
                                        </tr>
                                        <tr>
                                            <th>Room Price:</th>
                                            <td>${roomInfo.roomPrice}</td>
                                        </tr>
                                        <tr>
                                            <th>Room Service: </th>
                                            <td>
                                            <ul className="list-unstyled">
													<li>
														<FaWifi /> Wifi
													</li>
													<li>
														<FaTv /> Netfilx Premium
													</li>
													<li>
														<FaUtensils /> Breakfast
													</li>
													<li>
														<FaWineGlassAlt /> Mini bar refreshment
													</li>
													<li>
														<FaCar /> Car Service
													</li>
													<li>
														<FaParking /> Parking Space
													</li>
													<li>
														<FaTshirt /> Laundry
													</li>
												</ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                    <div className='col-md-8'>
                        <BookingForm />
                    </div>
                </div>
            </section>
            <div className='container'> 
                <RoomCarousel />
            </div>
        </div>
    )
}

export default Checkout