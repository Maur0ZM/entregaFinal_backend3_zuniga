import React, { useEffect, useState } from "react";
import { fetchData } from "../../Api/api";

export const Pets = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData("getpets")
      .then((data) => {
        setData(data);
        // console.log(data);   
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Pets</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}> {item.name} </li>
        ))}
      </ul>
    </div>
  );
}

export default Pets;
