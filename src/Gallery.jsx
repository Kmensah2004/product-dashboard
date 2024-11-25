import React, { useState, useEffect } from 'react';

function Gallery() {
    const [tours, setTours] = useState([]); //sets tours as our initial variable
    const [loading, setLoading] = useState(true); 
    const notInterested = (id) => {
        setTours((prevTours) => prevTours.filter((tour) => tour.id !== id)) //when selecting this button underneath the tour associated by ID, it will filter out and remove from the  list.
    };

    const toggleExpanded = (id) => {
        setTours((prevTours) =>
            prevTours.map((tour) =>
                tour.id === id ? { ...tour, expanded: !tour.expanded } : tour //ternary operator to either show expanded tour 
            )
        );
    };


    useEffect(() => {
        setLoading(true); //displays loading message at this time
        fetch('https://www.course-api.com/react-tours-project') //fetch tours from API
            .then(response => response.json()) 
            .then(data => {
                setTours(data.map((tour) => ({ ...tour, expanded: false}))); //add tours to the tours array 
                setLoading(false);
            })
            .catch(error => {
                console.error('Error Fetching Tours:', error);
                setLoading(false);
            });
        }, []);

    if (loading) { //this is what will display when fetching tours
        return <div>Loading Tours Now...</div>
    }

    return (
        <div>
            <h1>Tours</h1>
            <ul>
                {tours.map(tour => (
                    <li key={tour.id}>
                        {tour.name} - ${tour.price}
                        <br></br>
                        <br></br>
                        <button onClick={() => toggleExpanded(tour.id)}>{tour.expanded ?'Show Less':'Read More'}</button>
                        {tour.expanded && (  
                            <>
                                <p>{tour.info}</p>
                                <img src={tour.image}></img>
                            </>
                        )}
                        <br></br>
                        <br></br>
                        <button onClick={() => notInterested(tour.id)}>Not Interested</button>
                        <p></p>
                        <br></br>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Gallery;