
// Import the necessary components from React and react-spinners
import React, { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';

const SpinnerComponent = () => {
  const [loading, setLoading] = useState(true);

  // Simulate a loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Change the time as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="spinner-container ">
      {loading ? (
        <ClipLoader color={"#123abc"} loading={loading} size={150} />
      ) : (
        <div>Content loaded!</div>
      )}
    </div>
  );
};

export default SpinnerComponent;
