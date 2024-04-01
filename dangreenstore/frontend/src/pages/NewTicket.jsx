import React from 'react'
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { createTicket, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'


function NewTicket() {
  const {user} = useSelector((state) => state.auth)
  const {isLoading, isError, isSuccess, message} = useSelector((state) => state.tickets)
  console.log(isSuccess)
  
  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [product, setProduct] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)


  const dispatch = useDispatch()
  const navigate = useNavigate()
  // let ticketMade = false;

  useEffect(() => {
    // if (ticketMade) {
      if(isError) {
        toast.error(message)
      }
      if(isSuccess) {
        dispatch(reset())
        navigate('/tickets')
      }
    // }


  }, [dispatch, isError, isSuccess, navigate, message])

  const onSubmit = (e => {
    // ticketMade = true;

    e.preventDefault()
    dispatch(createTicket({product, description, price, email, image}))
    // if(isError) {
    //   toast.error(message)
    // }
    // console.log(isSuccess, "loook")
    // if(isSuccess) {
    //   dispatch(reset())
    //   navigate('/tickets')
    // }
  })


  function encodeImageFileAsURL() {

    var filesSelected = document.getElementById("inputFileToLoad").files;
    if (filesSelected.length > 0) {
      var fileToLoad = filesSelected[0];

      var fileReader = new FileReader();

      fileReader.onload = function(fileLoadedEvent) {
        var srcData = fileLoadedEvent.target.result; // <--- data: base64

        //var newImage = document.createElement('img');
        //newImage.src = {image};
        // stores image as text
        
        console.log(srcData)
        //document.getElementById("imgTest").innerHTML = newImage.outerHTML;
        setImage(srcData)
        //alert("Converted Base64 version is " + document.getElementById("imgTest").innerHTML);
        //console.log("Converted Base64 version is " + document.getElementById("imgTest").innerHTML);
      }
      fileReader.readAsDataURL(fileToLoad);
    }
  }

  if(isLoading){
    return <Spinner/>
  }

  return (
    <>
    <BackButton url='/tickets'></BackButton>
    <section className="heading">
      <h1>Create New Ticket</h1>
      <p>Please fill out the form below</p>
    </section>

    <section className="form">
      <div className="form-group">
        <label htmlFor="name">Customer Name</label>
        <input type="text" className="form-control" value={name} disabled/>
      </div>
      <div className="form-group">
        <label htmlFor="email">Customer Email</label>
        <input type="text" className="form-control" value={email} disabled/>
      </div>

      <form onSubmit={onSubmit}>
        <div className="form-group">
        <label htmlFor="product">Product</label>
        <input name="product" id="product" className='form-control' placeholder='' value={product} onChange={(e) => setProduct(e.target.value)}></input>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
        <textarea name="description" id="description" className='form-control' placeholder='' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        
        </div>
        <div className="form-group">
        <label htmlFor="price">Price</label>
        <input name="price" id="price" className='form-control' placeholder='' value={price} onChange={(e) => setPrice(e.target.value)}></input>
        </div>
        <input id="inputFileToLoad" type="file" onChange={encodeImageFileAsURL} />
        <div id='newImageDiv'>
          <img src={image} alt="" />
        </div>
        <div className="form-group">
          <button className="btn btn-block">Submit</button>
        </div>
      </form>

    </section>




        {/* <div id="imgTest"></div> */}
    </>
  )
}

export default NewTicket