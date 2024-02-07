const express = require('express')
const router = express.Router()
const {registerUser, getMe, loginUser} = require('../controllers/userController')


// router.route('/').get(getGoals).post(setGoal)
// router.route('/:id').delete(deleteGoal).put(updateGoal)


// router.get('/', getGoals)
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', getMe)

// router.put('/:id', updateGoal)
// router.delete('/:id', deleteGoal)

module.exports = router