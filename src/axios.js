import axios from 'axios';
import { getJwtFromCookie } from './cookie';


export let Http = axios.create({
	// baseURL: keys.API_URL,
	headers: {
		'content-type': 'application/json',
	}
});

// auth calls 
if (getJwtFromCookie('devJwt')) {
	 Http = axios.create({
		// baseURL: keys.API_URL,
		headers: {
			'content-type': 'application/json',
			'Authorization': getJwtFromCookie('devJwt')
		}
	});

}


export const HttpView = axios.create({
	// baseURL: keys.API_URL,
	headers: {
		'content-type': 'application/json',
		'Authorization': "view"
	}
});

export const HttpFormdata = axios.create({
	// baseURL: keys.API_URL,
	headers: {
		'content-type': 'multipart/form-data',
		'Authorization': getJwtFromCookie('devJwt')
	}
});