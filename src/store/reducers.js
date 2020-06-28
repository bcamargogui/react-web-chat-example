import { actionTypes } from './actions';
import { combineReducers } from 'redux';
import { AvatarGenerator } from 'random-avatar-generator';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
// const randomName = 'clean_white_lizard';
const generator = new AvatarGenerator();


const initialState = {
    username: randomName,
    avatar: generator.generateRandomAvatar(),
    users: [],
    messages: []
}

function core(state = initialState, action) {
    const { type, payload } = action;
    const { ADD_USER, ADD_MESSAGE } = actionTypes;

    switch (type) {
        case ADD_USER: {
            const { user } = payload;
            const { users } = state;
            return {
                ...state,
                users: [ ...users, user ]
            };
        }

        case ADD_MESSAGE: {
            const { message } = payload;
            const { messages } = state;
            return {
                ...state,
                messages: [ ...messages, message ]
            };
        }
    
        default:
            return state;
    }
};

export default combineReducers({ core })