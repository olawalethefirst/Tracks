import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';

const trackReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_tracks':
            return action.payload;
        default:
            return state;
    }
};

const fetchTracks = (dispatch) => async () => {
    const response = await trackerApi.get('/tracks');
    if (response) {
        dispatch({
            type: 'fetch_tracks',
            payload: response.data,
        });
    }
};

const createTrack = (dispatch) => async (name, locations) => {
    try {
        console.log('trying');
        await trackerApi.post('/tracks', { name, locations });
        console.log('done');
    } catch (err) {
        console.log('failed', err);
    }
};

export const { Provider, Context } = createDataContext(
    trackReducer,
    { fetchTracks, createTrack },
    []
);
