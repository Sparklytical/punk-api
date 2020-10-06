export const initialState = {
  loading: true,
  beers: [],
  errorMessage: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_BEER_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null,
      };
    case "SEARCH_BEER_SUCCESS":
      return {
        ...state,
        loading: false,
        beers: action.payload,
      };
    case "SEARCH_BEER_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };

    default:
      return state;
  }
};
