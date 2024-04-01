import React from 'react'
import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { getAllTickets, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import TicketItem from '../components/TicketItem'
import "./AllTickets.css"
function Tickets() {
    const {tickets, isLoading, isSuccess} = useSelector((state) => 
    state.tickets)

    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            if(isSuccess) {
                dispatch(reset())
            }
        }
    }, [dispatch, isSuccess])

    useEffect(() => {
        // get tickets
        dispatch(getAllTickets())

    }, [dispatch])

    if(isLoading){
        return <Spinner />
    }

  return (
    <>
        {/* <BackButton url='/'></BackButton> */}
        <h1 className='kalam'>All Ads</h1>
        <div className="tickets">
            <div className="ticket-headings">
                <div>Image</div>
                <div>Product</div>
                <div>Description</div>

            </div>
            {tickets.map((ticket) => (
                <TicketItem key={ticket._id} ticket={ticket} mainPage={true}/>
            ))}
        </div>
    </>
  )
}

export default Tickets