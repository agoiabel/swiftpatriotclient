import { getStorage } from './storage.js';

// http://swiftpatriotapi.test/api/
// http://api.hezedgetest.com.ng/api/
export const post = async (formData, end_point) => {

    const AuthToken = await getStorage('DayStar:auth_token');

    return fetch('http://api.hezedgetest.com.ng/api/' + end_point, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'AuthToken': AuthToken
        },
        body: JSON.stringify(formData)
    });

}


export const get = async end_point => {

    const AuthToken = await getStorage('DayStar:auth_token');

    return fetch('http://api.hezedgetest.com.ng/api/' + end_point, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'AuthToken': AuthToken
        },
    });

}


export const postWithImage = async (formData, end_point) => {

    const AuthToken = await getStorage('DayStar:auth_token');

    let allFormData = new FormData();
    allFormData.append('image', formData.image);
    allFormData.append('data', JSON.stringify(formData.data));

    return fetch('http://api.hezedgetest.com.ng/api/' + end_point, {
        method: 'POST',
        body: allFormData,
        headers: {
            'AuthToken': AuthToken
        }
    });

}