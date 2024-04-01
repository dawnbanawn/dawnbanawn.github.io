import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import "./TicketItem.css"
import { useNavigate } from "react-router-dom";
import { deleteTicket } from '../features/tickets/ticketSlice';
import { getTickets, reset } from '../features/tickets/ticketSlice'

function TicketItem({ ticket, deleteFunction, mainPage }) {
  const dispatch = useDispatch()
// Delete user ticket
// const deleteTicket = async (id) => {


// const deleteFunction = (id) => {
//   dispatch(deleteTicket(id))
// }



// }

  const formatTimestamp = (timestamp) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      //   hour: "2-digit",
      //   minute: "2-digit",
      hour12: true,
    };
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString("en-US", options);
    return formattedDate;
  };

  return (
    <div className="ticket">
      <div id="ticketImageDate">
        <img id="ticketImage" src={ticket.image} alt="" />
      </div>
      <div id="ticketInfo">
        {ticket.product}
        <br></br>
        <br></br>
        <p>{ticket.price} coins</p>
        <p>{ticket.email}</p>

        <br />
        {formatTimestamp(ticket.createdAt)}
        {/* {new Date(ticket.createdAt).toLocaleString('en-US')} */}
      </div>
      <div >{ticket.description}</div>
      {mainPage ? (<></>) : (
              <div className='buttonDiv'>
              <button className='deleteButton' onClick={() => deleteFunction(ticket._id)}>Delete</button>
            </div>
      )}


      {/* <Link to={`/ticket/${ticket._id}`} className='btn btn-reverse btn-sm'>
            View
        </Link> */}
    </div>
  );
}

export default TicketItem;
