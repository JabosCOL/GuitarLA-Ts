import { db } from "../data/db"
import type { CartItem, Guitar } from "../types"

export type CartActions =
    { type: 'add-to-cart', payload: { item : Guitar} } |
    { type: 'remove-from-cart', payload: { id : Guitar['id']} } |
    { type: 'decrease-quantity', payload: { id : Guitar['id']} } |
    { type: 'increase-quantity', payload: { id : Guitar['id']} } |
    { type: 'clear-cart' }

export type CartState = {
    data: Guitar[]
    cart: CartItem[]
}

const initialCart = () : CartItem[] => {
    const cartItems = localStorage.getItem('cartItems')
    return cartItems ? JSON.parse(cartItems) : []
}

export const initialState : CartState = {
    data: db,
    cart: initialCart()
}

const MIN_QUANTITY = 1
const MAX_QUANTITY = 5


export const cartReducer = (
    state: CartState = initialState,
    actions: CartActions
) => {

    if (actions.type === 'add-to-cart') {

            const itemExists = state.cart.find(cartItem => cartItem.id === actions.payload.item.id)
            let updatedCart : CartItem[] = []

            if (!itemExists) {
                const newItem = {...actions.payload.item, quantity: 1}
                updatedCart = [...state.cart, newItem]
            } else {
                const itemsUpdated = state.cart.map(cartItem =>
                    cartItem.id === itemExists.id && cartItem.quantity < MAX_QUANTITY ?
                    {...cartItem, quantity: cartItem.quantity + 1} : cartItem
                )

                updatedCart = itemsUpdated
            }

        return {
            ...state,
            cart: updatedCart
        }
    }

    if (actions.type === 'remove-from-cart') {


        const updatedCart =  state.cart.filter(cartItem => cartItem.id !== actions.payload.id )


        return {
            ...state,
            cart: updatedCart
        }
    }

    if (actions.type === 'decrease-quantity') {
        const updatedCart = state.cart.map(cartItem =>
            cartItem.id === actions.payload.id && cartItem.quantity > MIN_QUANTITY ?
            {...cartItem, quantity: cartItem.quantity - 1} : cartItem
        )

        return {
            ...state,
            cart: updatedCart
        }
    }


    if (actions.type === 'increase-quantity') {
        const updatedCart = state.cart.map(cartItem =>
            cartItem.id === actions.payload.id && cartItem.quantity < MAX_QUANTITY ?
            {...cartItem, quantity: cartItem.quantity + 1} : cartItem
        )


        return {
            ...state,
            cart: updatedCart
        }
    }

    if (actions.type === 'clear-cart') {
        return {
            ...state,
            cart: []
        }
    }

    return state
}