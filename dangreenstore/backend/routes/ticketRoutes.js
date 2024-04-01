const express = require('express')
const router = express.Router()
const {getTickets, getAllTickets, deleteTicket, updateTicket, getTicket, createTicket} = require('../controllers/ticketController')


const {protect} = require('../middleware/authMiddleware')
router.route('/getAll/').get(getAllTickets)

router.route('/').get(protect, getTickets).post(protect, createTicket)

router.route('/:id').get(protect, getTicket).delete(protect, deleteTicket).put(protect, updateTicket)

module.exports = router