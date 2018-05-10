
export const FETCH_CLASSES_REQUEST = 'FETCH_CLASSES_REQUEST';
export const FETCH_CLASSES_FAILURE = 'FETCH_CLASSES_FAILURE';
export const FETCH_CLASSES_SUCCESS = 'FETCH_CLASSES_SUCCESS';

export const fetchClassesReq = () => ({ type: FETCH_CLASSES_REQUEST });
export const fetchClassesFail = () => ({ type: FETCH_CLASSES_FAILURE,
										  error: 'Ooopsiedaisy' });
export const fetchClassesSuccess = (json) => ({ type: FETCH_CLASSES_SUCCESS,
											classes: json });

function fetchClasses() {
	return function (dispatch) {
	    dispatch(fetchClassesReq())
	    return fetch(`https://customerrest.herokuapp.com/api/customers`)
	      .then(
	        response => response.json(),
	        error => console.log('An error occurred.', error)
	      )
	      .then(json =>	 dispatch(fetchClassesSuccess(json)))
  }
}

function shouldFetchClasses(state) {
	const items = state.classList;
	  if (!items) {
	    return true
	  } else if (items.isFetching) {
	    return false
	  } else {
	    return false
	  }
}

export function fetchClassesIfNeeded(){
	return (dispatch, getState) => {
    if (shouldFetchClasses(getState())) {
      return dispatch(fetchClasses())
    }
  }
}