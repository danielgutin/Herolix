
// --------- Actions Related to Movies Section ----------- //
import axios from 'axios';
import swal from 'sweetalert';
import { 
    GET_MOVIES_FROM_API,
    TOGGLE_MOVIE_API,
    EDIT_MODAL_TOGGLE,
    GET_MOVIE_EDIT_INFO,
    EDIT_MODAL_CHANGE,
    REMOVE_GENRE_BY_ID,
    NEW_GENRE_INPUT_CHANGE,
    SUBMIT_NEW_GENRE } from './constants';

// this function calls the TMDB api & recieve list of 20 random movies.
// second api call is with each movie id that recived for extra information about the movie.
export const GetMoviesFromApi = () => {
    return dispatch => {
        // Toggle the Loader while processing Api.
        // first call retrieve random list of movies.
        axios.get('https://api.themoviedb.org/3/discover/movie?api_key=02a35c5cbc417952eab0267826fb4b58')
        .then((res) => {
            //looping through movies and call the second api for Detailed movie obj.
            //passing the new movie Obj to the movies reducer.
            res.data.results.forEach((movie, i) => {
                axios.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=02a35c5cbc417952eab0267826fb4b58`)
                .then((res) => {
                    dispatch( {type: GET_MOVIES_FROM_API, payload: res.data})
                })
                .catch((err) => swal( "Oops" ,  "Error Reading Details About Specific movie" ,  "error" ))
            })
            // disable the abillity to use api on next ComponentDidUpdate.
            //limiting the user to single call on enter.
            dispatch( {type: TOGGLE_MOVIE_API});
         })
        .catch((err) => {
            swal( "Oops" ,  "Failed to retrive movies Data" ,  "error" );
        });
    }
}


// Toggle editModal Action.
export const toggleEditModal = () => ({ type: EDIT_MODAL_TOGGLE });


// Responsible for edit modal display, 
// passing the current movie id to get the relevant data.
export const editModal = id => {
    return dispatch => {
        // toggle the modal 
        dispatch(toggleEditModal());
        // gathering the relevant data to specific movie by id.
        dispatch({type: GET_MOVIE_EDIT_INFO, payload: id});
    }
}



// Handle EditModal input Changes.
// function recieve 2 values
// 1. the field ( ex. title )
// 2. the content ( ex. Inception )
export const editModalChange = (field, content) => {
    return { type: EDIT_MODAL_CHANGE, payload : { field, content }}
}


// Remove specific genre By ID.
export const editModalremoveGenre = genreID => {
    return { type : REMOVE_GENRE_BY_ID, payload: genreID }
}

// input change to new genre field.
export const editModalNewGenreInput = content => {
    return { type: NEW_GENRE_INPUT_CHANGE, payload : content }
}

// creating new genre.
export const editModalSubmitNewGenre = () => {
    return { type : SUBMIT_NEW_GENRE }
}