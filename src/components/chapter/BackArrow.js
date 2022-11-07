import { Link } from "react-router-dom";
export default function BackArrow(props) {
  return (
    <div className="back-to-manga align-self-start mb-5">
      <Link to={props.link} className="btn btn-warning d-flex align-items-center">
        <span class="material-symbols-outlined">arrow_back</span>
        {props.title}
      </Link>
    </div>
  );
}
