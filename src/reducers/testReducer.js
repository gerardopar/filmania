//default reducer state:
const testDefaultstate = {}

//test reducer:
const testReducer = (state = testDefaultstate, action) => {
    switch (action.type) {
      case 'SET_TEST':
        return {
            ...state,
            name: action.name
        };
      default:
        return state;
    }
  };

  export default testReducer;