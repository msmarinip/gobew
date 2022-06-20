import { createReducer } from "@reduxjs/toolkit"

import { GET_CATEGORIES, GET_PRODUCTS, SEARCH_PRODUCT, ORDER_PRODUCTS, GET_PRODUCTS_BYCATEGORY, GET_HIGHLIGHTED, GET_PRODUCT_BY_ID, CLEAN_UP_DETAILS, REMOVE_ONE_CART, ADD_ONE_CART, CLEAN_CART, REMOVE_FROM_CART, SET_TOTAL, SET_CART, ADD_TO_CART, CLEAN_USER_RESPONSE, CREATION_USER_LOGIN, CREATION_USERFORM, CHECK_LOGIN, CREATE_USER_CART, GET_USER_CART, DELETE_USER_CART, LOG_OUT, LOG_IN_USER, POST_USER_ADDRESS, GET_FAQS, SEARCH_BY_ID, SEARCH_DIRECTION_BY_ID, GET_WISHES,CHANGE_NAME, CHANGE_DIRECTION, CHECK_GOOGLE_MAIL } from "./actions"


const initialState = {
    products: [],
    productsToFilter: [],
    product: {},
    categories: [],
    cart: [],
    addressId: {},
    orderId: "",
    totalCart: 0,
    isFiltered: false,
    userId: "",
    userFirstName: "",
    userResponse: { ok: '' },
    faqs: [],
    userAllInfo: {},
    userDirection:[],
    productHighlight: [],
    wishes:[]
}

export const clientReducer = createReducer(initialState, (builder) => {
    builder.addCase(GET_PRODUCT_BY_ID.fulfilled, (state, action) => {
        state.product = action.payload.productList
    })
    builder.addCase(GET_PRODUCTS.fulfilled, (state, action) => {
        state.products = action.payload.productList
        state.productsToFilter = action.payload.productList
        state.isFiltered = false
    })
    builder.addCase(SEARCH_PRODUCT.fulfilled, (state, action) => {
        state.products = action.payload
        state.isFiltered = true
    })
    builder.addCase(GET_CATEGORIES.fulfilled, (state, action) => {
        state.categories = action.payload
    })
    builder.addCase(GET_HIGHLIGHTED.fulfilled, (state, action) => {
        state.productHighlight = action.payload
    })
    builder.addCase(GET_PRODUCTS_BYCATEGORY, (state, action) => {
        state.products = action.payload
        state.isFiltered = true
    })
    builder.addCase(ORDER_PRODUCTS, (state, action) => {
        state.products = action.payload
    })
    builder.addCase(CLEAN_UP_DETAILS, (state, action) => {
        state.product = action.payload
    })
    //*CART

    builder.addCase(SET_TOTAL, (state, action) => {
        state.totalCart = action.payload
    })
    builder.addCase(ADD_TO_CART, (state, action) => {
        let prod = state.cart.find(e => e._id === action.payload.product._id)
        if (prod) {
            prod.quantity = prod.quantity + action.payload.quantity
        } else {
            let obj = { ...action.payload.product }
            obj.quantity = action.payload.quantity
            state.cart.push(obj)
        }
    })
    builder.addCase(SET_CART, (state, action) => {
        state.cart = action.payload
    })
    builder.addCase(REMOVE_FROM_CART, (state, action) => {
        let tempCart = [...state.cart]
        let index = tempCart.findIndex(e => e._id === action.payload)
        tempCart.splice(index, 1)
        state.cart = tempCart
    })
    builder.addCase(ADD_ONE_CART, (state, action) => {
        let tempCart = [...state.cart]
        let index = tempCart.findIndex(e => e._id === action.payload)
        tempCart[index].quantity = tempCart[index].quantity + 1
        state.cart = tempCart
    })
    builder.addCase(REMOVE_ONE_CART, (state, action) => {
        let tempCart = [...state.cart]
        let index = tempCart.findIndex(e => e._id === action.payload)
        if (tempCart[index].quantity === 1) {
            tempCart.splice(index, 1)
        } else {
            tempCart[index].quantity--
        }
        state.cart = tempCart
    })
    builder.addCase(CLEAN_CART, (state, action) => {
        state.cart = action.payload
        state.totalCart = 0
    })
    builder.addCase(CREATE_USER_CART.fulfilled, (state, action) => {
        state.orderId = action.payload.orderId
    })
    builder.addCase(GET_USER_CART.fulfilled, (state, action) => {
        state.cart = action.payload?.obj?.cart ? action.payload?.obj?.cart.map(e => ({ quantity: e.productCant, productName: e.productName, productPrice: e.productPrice, _id: e.productId, productStock: e.productStock, images: e.images })) : []
        state.totalCart = action.payload?.obj?.orderTotal
        state.orderId = action.payload?.obj?.orderId
    })
    builder.addCase(DELETE_USER_CART.fulfilled, (state, action) => {
        state.cart = []
        state.totalCart = 0
        state.orderId = ""
    })
    //*LOGINS
    builder.addCase(LOG_IN_USER.fulfilled, (state, action) => {
        state.userResponse = { ...action.payload }
        state.userId = action.payload.userId
        state.userFirstName = action.payload.userFirstName
    })
    builder.addCase(CLEAN_USER_RESPONSE, (state, action) => {
        state.userResponse = action.payload
    })
    builder.addCase(CREATION_USER_LOGIN.fulfilled, (state, action) => {
        state.userResponse = { ...action.payload, ok: true }
        state.userId = action.payload.userId
        state.userFirstName = action.payload.userFirstName
    })
    builder.addCase(CREATION_USERFORM.fulfilled, (state, action) => {
        state.userResponse = { ...action.payload }
        state.userId = action.payload.userId
        state.userFirstName = action.payload.userFirstName
    })
    builder.addCase(CHECK_LOGIN.fulfilled, (state, action) => {
        state.userResponse = { ...action.payload }
        state.userId = action.payload.userId
        state.userFirstName = action.payload.userFirstName
    })
    //*ADDRESS
    builder.addCase(LOG_OUT, (state, action) => {
        state.userResponse = { ...action.payload }
        state.userId = ""
        state.userFirstName = ""
        state.orderId = ""
        state.cart = []
        state.totalCart = 0
    })
    builder.addCase(POST_USER_ADDRESS.fulfilled, (state, action) => {
        state.addressId = action.payload.newAddress
    })
    builder.addCase(GET_FAQS.fulfilled, (state, action) => {
        state.faqs = action.payload
    })
    builder.addCase(SEARCH_BY_ID.fulfilled, (state, action)=>{
        state.userAllInfo= action.payload
        console.log(action.payload)
        state.userFirstName = action.payload.userFirstName
    })
    builder.addCase(SEARCH_DIRECTION_BY_ID.fulfilled, (state, action)=>{
        state.userDirection = action.payload
    })
    builder.addCase(CHANGE_NAME.fulfilled, (state, action)=>{
        console.log(action.payload.user.userFirstName)
        state.userFirstName = action.payload.user.userFirstName
        console.log(state.userFirstName)
        state.userResponse = action.payload.ok
    })
    builder.addCase(CHANGE_DIRECTION.fulfilled,(state,action)=>{
    state.userResponse = action.payload.ok
    })
    builder.addCase(CHECK_GOOGLE_MAIL.fulfilled,(state,action)=>{
        state.userResponse = action.payload
    })
    builder.addCase(GET_WISHES.fulfilled, (state, action)=>{
        state.wishes = action.payload.wishList
    })
})
