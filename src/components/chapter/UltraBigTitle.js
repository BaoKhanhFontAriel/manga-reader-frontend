export default function UltraBigTitle(props) {
  return (
    <div className="title">
      <div class="fs-1 mb-5">
        {props.actionName}
        <span style={{ color: "var(--red-lipstick)", fontWeight:"bolder" }}> {props.object}</span>
      </div>
    </div>
  );
}
