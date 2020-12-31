import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'

function App() {
  const [loading, setLoading]= useState(true);
  const [tours, setTours]= useState([]);

  const removeTour = (id) => {
    // filter is a method
    const newTours = tours.filter((tour) => tour.id !== id);
    // set tours (setTours) into the newTours
    setTours(newTours);
  }

  const fetchTours= async () => {
    setLoading(true);

    try {
      const response= await fetch(url);
      const tours= await response.json();
      console.log(tours);
      setLoading(false);
      setTours(tours);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  // if loading is true
  if(loading){
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if(tours.length === 0){
    return (
      <main>
        <div className ="title">
          <h2>no tours left</h2>
          {/* <button 
            onClick ={() => fetchTours()}
            className ="btn"
          >
            refresh
          </button> */}
          {/* involved it as reference */}
          <button 
            onClick ={fetchTours}
            className ="btn"
          >
            refresh
          </button>
        </div>
      </main>
    )
  }

  return (
    <main>
      <Tours 
        tours ={tours}
        // past removeTour down as a prop === removeTour props and removeTour function 
        removeTour ={removeTour}
      />
    </main>
  );
}

export default App
