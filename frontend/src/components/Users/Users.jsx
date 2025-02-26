import React, { useEffect, useState } from "react";
import { fetchData } from "../../Api/api";
import { Link } from "react-router-dom";

export const Users = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuVisible, setMenuVisible] = useState(null);

  useEffect(() => {
    fetchData("getusers")
      .then((data) => {
        setData(data);
        console.log(data);
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

  const headers = Object.keys(data[0]).filter(
    (key) => key !== "_id" && key !== "__v"
  );

  const toggleMenu = (id) => {
    setMenuVisible(menuVisible === id ? null : id);
  };

  return (
    <div
      className="table-responsive"
      style={{ maxWidth: "100%", overflow: "visible", maxHeight: "100%"}}
    >
      <table
        className="table table-striped table-bordered"
        style={{ width: "100%", tableLayout: "fixed", height: "100%"}}
      >
        <thead className="table-dark">
          <tr>
            {headers.map((header) => (
              <th key={header} className="text-capitalize text-center">
                {header}
              </th>
            ))}
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row._id}>
              {headers.map((key) => (
                <td key={key} className="text-center">
                  {Array.isArray(row[key])
                    ? row[key].map((pet) => `${pet.name}`).join(",  ")
                    : row[key]}
                </td>
              ))}
              <td className="text-center">
                <div className="dropdown" style={{ position: "relative" }}>
                  <button
                    className="btn btn-secondary dropdown-toggle-split"
                    type="button"
                    onClick={() => toggleMenu(row._id)}
                  >
                    <i className="bi bi-three-dots-vertical"></i>
                  </button>
                  {menuVisible === row._id && (
                    <ul
                      className="dropdown-menu show"
                      style={{ position: "absolute", zIndex: 1050 }}
                    >
                      <li>
                        <Link className="dropdown-item" to={`/user/${row._id}`}>ver</Link>
                      </li> 
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => console.log("Editar", row._id)}
                        >
                          Editar
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => console.log("Eliminar", row._id)}
                        >
                          Eliminar
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
