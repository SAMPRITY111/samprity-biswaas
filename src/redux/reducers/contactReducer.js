const initialState= [
    {
    id:0,
    name:"rama sharma",
    number:12344567990,
    email:"rs@gmail.com",
    },
    {
        id:1,
        name:"test name",
        number:7896541232,
        email:"test@test.com",
    },
];
const contactReducer = (state=initialState, action) =>{
    switch (action.type){
        case "ADD_CONTACT":
        state = [

        ...state, action.payload];
        return state;
        default:
            return state;
            case "UPDATE_CONTACT":
               const updateState = state.map(contact=>contact.id === action.payload.id? action.payload : contact);
               state = updateState;
               return state;
               case "DELETE_CONTACT":
               const filterContacts = state.filter((contact)=>contact.id !== action.payload && contact);
               state= filterContacts;
               return state;
    }
};
export default contactReducer;