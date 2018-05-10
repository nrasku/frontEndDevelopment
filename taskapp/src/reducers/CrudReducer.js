import {combineReducers} from 'redux';

import { PUT, POST, DELETE  } from '../actions/CrudActions';

import { FETCH_CUSTOMERS_REQUEST, FETCH_CUSTOMERS_FAILURE, 
		FETCH_CUSTOMERS_SUCCESS } from '../actions/CustomerActions';

import {FETCH_CLASSES_REQUEST, FETCH_CLASSES_FAILURE, 
	FETCH_CLASSES_SUCCESS } from '../actions/ClassActions';


const initialState = { customers: [], classes: [], 
						isFetching: false, error: ''};


const crudReducer = (state = initialState, action) => {
	switch (action.type) {
		case POST: 
			return state
		case PUT:
			return state
		case DELETE: 
			return state
		default:
			return state
	}
};

const customers = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_CUSTOMERS_REQUEST:
			return Object.assign({}, state, {
				isFetching: true,
			})
		case FETCH_CLASSES_FAILURE: 
			return Object.assign({}, state, {
				isFetching: false
			})
		case FETCH_CUSTOMERS_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				customers: action.content
			})
		default:
			return state
	}
}

const classes = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_CLASSES_REQUEST:
			return Object.assign({}, state, {
				isFetching: true
			})
		case FETCH_CLASSES_FAILURE:
			return Object.assign({}, state, {
				isFetching: false
			})
		case FETCH_CLASSES_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				classes: action.content
			})
		default:
			return state
	}
}

function classList (state = {}, action) {
	switch (action.type) {
	    case FETCH_CLASSES_REQUEST:
	    case FETCH_CLASSES_FAILURE:
	    case FETCH_CLASSES_SUCCESS:
	      return Object.assign({}, state, {
	        [action.req]: classes(state[action.subreddit], action)
	      })
	    default:
	      return state
	  }
}

function customerList (state = {}, action) {
	switch (action.type) {
	    case FETCH_CUSTOMERS_REQUEST:
	    case FETCH_CUSTOMERS_FAILURE:
	    case FETCH_CUSTOMERS_SUCCESS:
	      console.log("action.req: " + toString(action.req));
	      return Object.assign({}, state, {
	        [action.req]: customers(state[action.subreddit], action)
	      })
	    default:
	      return state
	  }
}

const rootReducer = combineReducers({
	customerList,
	classList,
	crudReducer
})


export default rootReducer;