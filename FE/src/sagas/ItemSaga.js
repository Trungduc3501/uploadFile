import callAPI from "../fetchAPIs/ItemAPI";
import * as actions from "../actions/ItemAction";
import * as types from "../constants";
import { put, select, takeEvery } from "redux-saga/effects";

function* Get() {
  try {
    const res = yield callAPI("GET", "");
    yield put(actions.getSuccess(res.listData));
  } catch (error) {
    yield put(actions.getFailure(error));
  }
}

function* Add(action) {
  try {
    const store = yield select((state) => state.items)
    let formData = new FormData();
    for (let i = 0; i < action.payload.img.length; i++) {
      formData.append("img", action.payload.img[i]);
    }
    formData.append("name", action.payload.name);
    console.log(formData, "formData");
    yield callAPI("POST", "", formData);
    yield put(actions.addSuccess());
    const res = yield callAPI('GET' , `/paginate?activePage=${store}&limit=${types.LIMIT}` )
    yield put(actions.paginateRequest(res.totalPage))
  } catch (error) {
    yield put(actions.addFailure(error));
  }
}

function* Delete(action) {
  try {
    const store = yield select((state) => state.items)
    yield callAPI('DELETE' , `/${action.payload.id}` , '' )
    yield put(actions.deleteSuccess())
    if(store.listItem.length === 1 && store.activePage === 1 ){
      yield put(actions.paginateRequest(
          store.activePage = 1
      ))
  }else if (store.listItem.length <=1) {
      yield put(actions.paginateRequest(
          store.totalPage -=1
      ))
  }else {
      yield put(actions.paginateRequest(
          store.activePage
      ))
  }

  } catch (error) {
    yield put(actions.deleteFailure(error));
  }
}

function* DeleteOne(action) {
  try {
    yield callAPI("DELETE", `?id=${action.payload.id}&index=${action.payload.index}`);
    yield put(actions.deleteOneSuccess());
    yield put(actions.paginateRequest(1));
  } catch (error) {
    yield put(actions.deleteFailure(error));
  }
}

function* Update(action) {
  try {
    let formData = new FormData();
    for (let i = 0; i < action.payload.img.length; i++) {
      formData.append("img", action.payload.img[i]);
    }
    formData.append("name", action.payload.name);
    yield callAPI("PUT", `/${action.payload.id}`, formData);
    yield put(actions.updateSuccess());
    yield put(actions.paginateRequest(1));
  } catch (error) {
    yield put(actions.updateFailure(error));
  }
}

function* Paginate(action) {
  try {
    const res = yield callAPI(
      "GET",
      `/paginate?activePage=${action.payload}&limit=${types.LIMIT}`
    );
    if (res.totalPage === 0) {
      res.totalPage = 1;
    }
    yield put(
      actions.paginateSuccess({
        listData: res.listData,
        totalPage: res.totalPage,
        activePage: action.payload,
      })
    );
  } catch (error) {
    yield put(actions.paginateFailure(error));
  }
}

function* Search(action) {
  try {
    const res = yield callAPI(
      "GET",
      `/search?activePage=${action.payload.activePage}&limit=${types.LIMIT}&textSearch=${action.payload.textSearch}`
    );
    if (res.totalPage === 0) {
      res.totalPage = 1;
    }
    yield put(
      actions.searchSuccess({
        listData: res.listData,
        totalPage: res.totalPage,
        activePage: action.payload.activePage,
        textSearch: action.payload.textSearch,
      })
    );
  } catch (error) {
    yield put(actions.searchFailure(error));
  }
}



const ItemSaga = [
  takeEvery(types.GET_ITEMS_REQUEST, Get),
  takeEvery(types.ADD_ITEMS_REQUEST, Add),
  takeEvery(types.DELETE_ITEMS_REQUEST, Delete),
  takeEvery(types.UPDATE_ITEMS_REQUEST, Update),
  takeEvery(types.PAGINATE_ITEMS_REQUEST, Paginate),
  takeEvery(types.SEARCH_ITEMS_REQUEST, Search),
  takeEvery(types.DELETE_ONE_REQUEST, DeleteOne),
];

export default ItemSaga;
