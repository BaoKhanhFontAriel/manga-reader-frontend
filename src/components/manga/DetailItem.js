export function DetailItem(props) {
    return (
      <div className="author" class="mb-3">
        <div class="row g-0">
          <div class="col-3">
            <div class="d-flex align-items-center">
              <span class="material-symbols-outlined me-2">{props.icon}</span>
              <span> {props.title}</span>
            </div>
          </div>
          <div class="col-9">{props.item}</div>
        </div>
      </div>
    );
  }