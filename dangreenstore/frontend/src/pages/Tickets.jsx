import React from 'react'
import {useEffect} from 'react'
import {FaQuestionCircle, FaTicketAlt} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { getTickets, reset, deleteTicket } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import TicketItem from '../components/TicketItem'
import {useNavigate} from 'react-router-dom'


function Tickets() {
    const {tickets, isLoading, isDeleted, isSuccess} = useSelector((state) => 
    state.tickets)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const resetIsSuccess = () => {
        dispatch(reset())
    }

    useEffect(() => {
        return () => {
            if(isSuccess) {
                dispatch(reset())
            }
        }
    }, [dispatch, isSuccess])

    useEffect(() => {
        // return () => {
            if(isDeleted) {
        dispatch(getTickets())

                dispatch(reset())
            // }
        }
    }, [dispatch, isDeleted])

    useEffect(() => {
        // get tickets
        dispatch(getTickets())

    }, [dispatch])
    
    const deleteFunction = (id) => {
        console.log(tickets)

        dispatch(deleteTicket(id))
        console.log(tickets)
        dispatch(getTickets())
        dispatch(reset())
        navigate('/tickets')
        dispatch(getTickets())
      }
      
  // let ticketMade = false;

//   useEffect(() => {
//     // if (ticketMade) {

//       if(isSuccess) {
//         dispatch(reset())
//         navigate('/tickets')
//       }
//     // }


//   }, [dispatch, isSuccess, navigate])  

    if(isLoading){
        return <Spinner />
    }

  return (
    <>
        <Link to="/new-ticket" onClick={resetIsSuccess} className='btn btn-reverse btn-block'>
        Create New
    </Link>
        {/* <BackButton url='/'></BackButton> */}
        <h1 className='kalam'>Your ads</h1>
        <div className="tickets">
            <div className="ticket-headings">
                <div>Image</div>
                <div>Product</div>
                <div>Description</div>
                <div>Delete</div>


            </div>
            {tickets.map((ticket) => (
                <TicketItem key={ticket._id} deleteFunction={deleteFunction} ticket={ticket} />
            ))}
        </div>



    </>
  )
}

export default Tickets