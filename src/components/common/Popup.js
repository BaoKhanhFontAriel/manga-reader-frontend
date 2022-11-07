import { Navigate } from "react-router";
import { history } from "../../helper/history";

export function Popup(props) {

  function handleNotifyClick() {
    history.push(props.linkTo);
    window.location.reload();
  }

  return (
    <div
      className="popup position-absolute"
      style={{
        width: "100%",
        top: "0",
        left: "0",
        marginTop: "40vh",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-4"></div>
          <div className="col-4">
            {props.type == "notify" && (
              <div
                className="bg-white rounded d-flex flex-column align-items-center m-2 justify-content-center"
                style={{ minHeight: "200px" }}
              >
                <div className="message my-3">{props.message}</div>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => handleNotifyClick()}
                >
                  Đóng
                </button>
              </div>
            )}
            {props.type == "confirm" && (
              <div
                className="border  shadow-sm bg-white rounded d-flex flex-column align-items-center m-2 justify-content-center p-5"
                style={{ minHeight: "200px" }}
              >
                <div className="message mb-4 fs-5">{props.message}</div>
                {props.error}
                <div className="comfirm-buttons d-flex">
                  <button
                    className="btn btn-danger me-5"
                    type="button"
                    onClick={() => props.confirmAction()}
                  >
                    Xóa
                  </button>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => props.closePopup()}
                  >
                    Hủy
                  </button>
                </div>
              </div>
            )}

          </div>
          <div className="col-4"></div>
        </div>
      </div>
    </div>
  );
}
