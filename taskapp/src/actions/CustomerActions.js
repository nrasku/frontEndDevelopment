export const FETCH_CUSTOMERS_REQUEST = 'FETCH_CUSTOMERS_REQUEST';
export const FETCH_CUSTOMERS_FAILURE = 'FETCH_CUSTOMER_FAILURE';
export const FETCH_CUSTOMERS_SUCCESS = 'FETCH_CUSTOMERS_SUCCESS';
 

export const fetchCustomersReq = () => ({ type: FETCH_CUSTOMERS_REQUEST });
export const fetchCustomersFail = () => ({ type: FETCH_CUSTOMERS_FAILURE,
											error: 'Ooopsiedaisy' });
export const fetchCustomersSuccess = (json) => ({ type: FETCH_CUSTOMERS_SUCCESS,
											  customers: json });


function fetchCustomers() {
  return function (dispatch) {
    dispatch(fetchCustomersReq())
    return fetch(`https://customerrest.herokuapp.com/api/customers`)
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json => dispatch(fetchCustomersSuccess(json)))
  }
}

function shouldFetchCustomers(state) {
  const items = state.customers;
  if (!items) {
    return true
  } else if (items.isFetching) {
    return false
  } else {
    return false
  }
}
 
export function fetchCustomersIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchCustomers(getState())) {
      return dispatch(fetchCustomers())
    }
  }
}