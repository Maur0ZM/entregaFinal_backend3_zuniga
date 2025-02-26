import { Link } from "react-router-dom";

export const Main = () => {
  return (
    <>
      <Link to={"/users"}> Users </Link>
      <Link to={"/pets"}> Pets </Link>
    </>
  );
};
