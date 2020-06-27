export const actionTypes = {
    ADD_USER: 'ADD_USER',
    ADD_MESSAGE: 'ADD_MESSAGE',

}

export const addUser = user => ({
    type: actionTypes.ADD_USER,
    payload: {
        user
    }
});

export const addMessage = message => ({
    type: actionTypes.ADD_MESSAGE,
    payload: {
        message
    }
});
