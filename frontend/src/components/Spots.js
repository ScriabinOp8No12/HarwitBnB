import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpots } from "../store/spots"; // grab fetchSpots thunk

function Spots() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.all);

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  return (
    <div>
      {spots.map((spot) => (
        <div key={spot.id}>
          <img src={spot.imageUrl} alt={spot.name}/>
          <h3>{spot.name}</h3>
          {/* more spot details here */}
        </div>
      ))}
    </div>
  );
}

export default Spots;
