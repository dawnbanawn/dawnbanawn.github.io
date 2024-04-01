import {createSlice, createAsyncThunk} from '@reduxjs/toolkit' 
import ticketService from './ticketService'

const initialState = {
    tickets: [],
    ticket: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    isDeleted: false,
    message: ''
}

// delete  ticket
export const deleteTicket = createAsyncThunk(
    'tickets/delete', async (id, thunkAPI) => {
    try {

        const token = thunkAPI.getState().auth.user.token

        return await ticketService.deleteTicket(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString()
        // this rejected message can be picled up in addCase rejected below
        return thunkAPI.rejectWithValue(message)
    }
})

// Create new ticket
export const createTicket = createAsyncThunk(
    'tickets/create', async (ticketData, thunkAPI) => {
    try {

        const token = thunkAPI.getState().auth.user.token

        return await ticketService.createTicket(ticketData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString()
        // this rejected message can be picled up in addCase rejected below
        return thunkAPI.rejectWithValue(message)
    }
})

// Get user tickets
export const getTickets = createAsyncThunk(
    'tickets/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token

        return await ticketService.getTickets(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString()
        // this rejected message can be picled up in addCase rejected below
        return thunkAPI.rejectWithValue(message)
    }
})

// Get all tickets
export const getAllTickets = createAsyncThunk(
    'tickets/getEverything', async (_, thunkAPI) => {
    try {

        //const token = thunkAPI.getState().auth.user.token
        console.log("ddrrr")
        return await ticketService.getAllTickets()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString()
        // this rejected message can be picled up in addCase rejected below
        return thunkAPI.rejectWithValue(message)
    }
})

// Get user ticket
export const getTicket = createAsyncThunk(
    'tickets/get', async (ticketId, thunkAPI) => {
    try {

        const token = thunkAPI.getState().auth.user.token

        return await ticketService.getTicket(ticketId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString()
        // this rejected message can be picled up in addCase rejected below
        return thunkAPI.rejectWithValue(message)
    }
})

export const ticketSlice = createSlice({
    // name of the slice
    name: 'tickets',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(createTicket.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createTicket.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
        })
        .addCase(createTicket.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getTickets.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getTickets.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.tickets = action.payload
        })
        .addCase(getTickets.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })        
        .addCase(getTicket.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getTicket.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.ticket = action.payload
        })
        .addCase(getTicket.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })       
        .addCase(getAllTickets.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getAllTickets.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.tickets = action.payload
            console.log("nu")
        })
        .addCase(getAllTickets.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            console.log("nej")
        })      
        .addCase(deleteTicket.pending, (state) => {
            state.isLoading = true
            state.isDeleted = false
        })
        .addCase(deleteTicket.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            //state.message = action.payload
            state.tickets = state.tickets.filter((ticket) => ticket._id !== action.payload.id)
            console.log("nu")
            state.isDeleted = true
            console.log(state.tickets, "fffff")
        })
        .addCase(deleteTicket.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            console.log("nej")
            state.isDeleted = false

        })
    }
})

export const {reset} = ticketSlice.actions
export default ticketSlice.reducer