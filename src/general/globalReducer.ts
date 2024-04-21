
const globalReducer = (state: any, action: any) => {
    switch (action.type) {

        case 'ADD_TO_BASKET':
            return {
                ...state,
                currentBasket: [...state.currentBasket, action.payload]
            }

        case 'POST_LOGIN':
            const now = new Date();
            const expires = new Date(now.getTime() + 5 * 60 * 1000);

            document.cookie = `JONTIESREST=$${action.payload.sessionToken}; expires=${expires.toUTCString()}; path=/`;
            return {
                ...state,
                userId: action.payload.userId,
                sessionToken: action.payload.sessionToken
            }

        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.payload
            }

        case 'REMOVE_FROM_BASKET':
            //console.log(state.currentBasket.filter((product: any) => product.productId !== action.payload))
            let first = false;
            const temp = state.currentBasket.filter((product: any) => {
                if (product.productId == action.payload && !first) {
                    first = true;
                }
                else {
                    return product;
                }
            });
            return {
                ...state,
                currentBasket: temp//state.currentBasket.filter((product: any) => product.productId !== action.payload)
            }

        case 'CLEAR_BASKET':
            return {
                ...state,
                currentBasket: []
            };

        case 'LOGOUT':
            return {
                ...state,
                userId: "",
                sessionToken: ""
            }

        default:
            return state;
    }
};

export default globalReducer;