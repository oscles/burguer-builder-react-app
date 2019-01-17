export const updateObject = (oldState, updateProps,) => {
    return {
        ...oldState,
        ...updateProps
    }
};