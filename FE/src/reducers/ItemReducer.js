import * as t from "../constants";

const DEFAULT_STATE = {
  listItem: [],
  isFetching: false,
  dataFetched: false,
  error: false,
  errorMessage: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case t.ADD_ITEMS_REQUEST:
    case t.UPDATE_ITEMS_REQUEST:
    case t.DELETE_ITEMS_REQUEST:
    case t.SEARCH_ITEMS_REQUEST:
    case t.DELETE_ONE_REQUEST:
    case t.PAGINATE_ITEMS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
        dataFetched: false,
        errorMessage: null,
      };
    case t.ADD_ITEMS_SUCCESS:
    case t.DELETE_ITEMS_SUCCESS:
    case t.UPDATE_ITEMS_SUCCESS:
    case t.DELETE_ONE_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };

    case t.PAGINATE_ITEMS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dataFetched: true,
        listItem: action.payload.listData,
        totalPage: action.payload.totalPage,
        activePage: action.payload.activePage,
      };

    case t.SEARCH_ITEMS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dataFetched: true,
        listItem: action.payload.listData,
        totalPage: action.payload.totalPage,
        activePage: action.payload.activePage,
        textSearch: action.payload.textSearch,
      };

    case t.ADD_ITEMS_FAILURE:
    case t.DELETE_ITEMS_FAILURE:
    case t.UPDATE_ITEMS_FAILURE:
    case t.SEARCH_ITEMS_FAILURE:
    case t.DELETE_ONE_FAILURE:
    case t.PAGINATE_ITEMS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMessage: action.payload.errorMessage,
        dataFetched: false,
      };

    default:
      return state;
  }
};
