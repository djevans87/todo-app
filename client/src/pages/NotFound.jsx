import { Link } from "react-router-dom";
import robot404Img  from "../images/404_Robot.jpg";
import robot404Img2  from "../images/404_Robot2.png";

const notFoundPhotos = [
  robot404Img, robot404Img2
];

const i = Math.floor(Math.random() * notFoundPhotos.length);

export default function NotFound() {
  return (
    <div className="not-found-container">
      <img
        className="not-found__img"
        src={notFoundPhotos[i]}
        alt="robot"
      />
      <h2 className="not-found__title">Page not found!</h2>
      <p className="not-found__link">
        Go to the <Link to="/">Homepage</Link>
      </p>
    </div>
  );
}