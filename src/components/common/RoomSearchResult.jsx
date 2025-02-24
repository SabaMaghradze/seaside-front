import React, { useState } from 'react'
import RoomCard from '../room/RoomCard'
import { Row, Button } from 'react-bootstrap';
import RoomPaginator from '../common/RoomsPaginator';

const RoomSearchResult = ({ results, onClearSearch }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 3;
    const totalResults = results.length;
    const totalPages = Math.ceil(totalResults / resultsPerPage);

    function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
    }

    const startIndex = (currentPage - 1) * resultsPerPage;
    const endingIndex = startIndex + resultsPerPage;
    const paginatedResults = results.slice(startIndex, endingIndex);

    return (
        <>
			{results.length > 0 ? (
				<>
					<h5 className="text-center mt-5">Search Results</h5>
					<Row>
						{paginatedResults.map((room) => (
							<RoomCard key={room.id} room={room} />
						))}
					</Row>
					<Row>
						{totalResults > resultsPerPage && (
							<RoomPaginator
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={handlePageChange}
							/>
						)}
						<Button variant="secondary" onClick={onClearSearch} className='btn-hotel'>
							Clear Search
						</Button>
					</Row>
				</>
			) : (
				<p></p>
			)}
		</>
    )
}

export default RoomSearchResult








