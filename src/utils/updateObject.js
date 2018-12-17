/**
 * A universal method for updating objects
 * 
 * @param {*} oldObject 
 * @param {*} newValues 
 */
export const updateObject = (oldObject, newValues) => {
    return Object.assign({}, oldObject, newValues);
}