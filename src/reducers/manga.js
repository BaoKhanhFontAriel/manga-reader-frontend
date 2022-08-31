import { SELECT_MANGA, UNSELECT_MANGA } from "../actions/types";
const initialState = {};
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SELECT_MANGA:
      return { manga: payload };
    case UNSELECT_MANGA:
      return {};
    default:
      return state;
  }
}
