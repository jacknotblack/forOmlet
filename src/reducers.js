const initState = {
  menuItems: [],
  hallItems: [],
  selectedMenuItem: 0,
};
const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'STORE_HALL_CATEGORIES':
      return Object.assign({}, state, { menuItems: action.payload });
    case 'SELECT_MENU_ITEM':
      return Object.assign({}, state, { selectedMenuItem: action.payload });
    case 'STORE_HALL_ITEMS':
      return Object.assign({}, state, { hallItems: action.payload });
    default:
      return state;
  }
};

console.log(reducer)

export default reducer;
