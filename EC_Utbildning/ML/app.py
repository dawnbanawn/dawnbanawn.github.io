
#app/Scripts/activate
#streamlit run app.py

# Problem with resizing, it turns out as a completely black square.
# The solution was cv2´s own resize method
# Solution was made with image already available (image open),
# image capture does not provide the same type of format ..
# image np array is width height AND CHANNELS! 

#pip install scikit-learn==1.2.2 

#pip uninstall Pillow
#pip install Pillow==9.5.0
# pip3 install opencv-python
# pip install pillow
# pip install streamlit
# pip install -U scikit-learn
import streamlit as st
# Import OpenCV and Pillow
import cv2 
import pickle
from PIL import Image
import sklearn
import joblib
import numpy as np
from sklearn.preprocessing import StandardScaler
# Load the model
pickled_model = pickle.load(open('./picklemodel.pkl', 'rb'))
#pickled_model = joblib.load(open('./joblibmodelRFC.pkl', 'rb'))

# https://stackoverflow.com/questions/63011282/how-to-display-image-from-a-folder-using-button-with-streamlit
uploaded_picture= st.file_uploader("Choose a image file", type="jpg")

# https://docs.streamlit.io/library/api-reference/widgets/st.camera_input
picture = st.camera_input("Take a picture")

# Function to analyze the image
def analyze_uploaded_image():
    st.success('Working on it ...')

    #img2 = Image.open(picture)
    #st.write(img2)

    #img2.convert('RGB')
    #open_cv_image = np.array(img2)
    # Convert RGB to BGR
    #img2 = open_cv_image[:, :, ::-1].copy()

    # https://stackoverflow.com/questions/63011282/how-to-display-image-from-a-folder-using-button-with-streamlit
    # Convert the file to an opencv image.
    file_bytes = np.asarray(bytearray(uploaded_picture.read()), dtype=np.uint8)
    opencv_image = cv2.imdecode(file_bytes, 1)
    #opencv_image = cv2.imdecode(np.frombuffer(opencv_image, np.uint8), cv2.IMREAD_GRAYSCALE)
    #print(opencv_image)
    #print(opencv_image.shape)

    im = Image.open(uploaded_picture)
    image = np.array(im)    
    img2 = image[:, :, ::-1].copy()

    #img2 = Image.open(picture)
    

    #img2.convert('RGB')
    #open_cv_image = np.array(img2)
    # Convert RGB to BGR
    #img2 = open_cv_image[:, :, ::-1].copy()

    # https://stackoverflow.com/questions/63011282/how-to-display-image-from-a-folder-using-button-with-streamlit
    # Convert the file to an opencv image.
    #file_bytes = np.asarray(bytearray(uploaded_img.read()), dtype=np.uint8)
    #opencv_image = cv2.imdecode(file_bytes, 1)
    # print(opencv_image)
    #print(img2.shape)


    #img2 = picture.getvalue()
    #img3 = cv2.imdecode(np.frombuffer(img2, np.uint8), cv2.IMREAD_GRAYSCALE)
    # Image is resized to 28x28 pixels
    #st.write(img3.shape)
    #(528, 704)
    #crop = img3[0:528, 100:628] 
    #st.write(crop.shape)
    #img3 = crop
    #st.write(img3)

    # https://datascience.stackexchange.com/questions/48946/typeerror-tuple-object-cannot-be-interpreted-as-an-integer
    img4 = cv2.resize(img2, (28,28)) 
    #img4.reshape(1, -1)
    # width, heigh and channels
    
    # Convert the image into binary, with threshold values somewhere
    # in the middle of the color/light scale
    # https://www.geeksforgeeks.org/image-thresholding-in-python-opencv/
    ret, bw_img = cv2.threshold(img4, 127, 255, cv2.THRESH_BINARY) 
    #st.write(bw_img.shape)
    # New empty array 
    
    newRow = []
    #tmp=[]
    #for b in bus:
        
    
    # Nested for loops to push all row values to the array.
    # Value 255 is pushed as 1.
    for row in bw_img:
        for pixel in row:
            if pixel[0] == 255:
                #pixel = 1
                newRow.append(1)
                #tmp.append(pixel)
            else:
                #pixel = 0
                newRow.append(0)
                #tmp.append(pixel)
    #bus=tmp            
    st.write("Predicting ...")
    st.write(newRow)
    print(newRow)
    #st.write(newRow)
    newRow2 = np.array(newRow, dtype=np.int32)
    b = newRow2.reshape(1, -1) 
    c = list(b) 
    #st.write(np.shape(c))
    #st.write(c)
    #st.write(newRow)
    #st.write(newRow.shape)

    #c = b.tolist()
    #st.write(c.__hash__)
    #frozen_item = frozenset(c)
    #st.write(frozen_item.__hash__)

    #prediction = pickled_model.predict(c)   
    st.success(pickled_model.predict(c))         


# Function to analyze the image
def analyze_camera():
    st.success('Working on it ...')

    #img2 = Image.open(picture)
    #st.write(img2)

    #img2.convert('RGB')
    #open_cv_image = np.array(img2)
    # Convert RGB to BGR
    #img2 = open_cv_image[:, :, ::-1].copy()

    # https://stackoverflow.com/questions/63011282/how-to-display-image-from-a-folder-using-button-with-streamlit
    # Convert the file to an opencv image.
    #file_bytes = np.asarray(bytearray(uploaded_img.read()), dtype=np.uint8)
    #opencv_image = cv2.imdecode(file_bytes, 1)
    # print(opencv_image)
    #print(img2.shape)


    #img2 = Image.open(picture)
    #st.write(img2)

    #img2.convert('RGB')
    #open_cv_image = np.array(img2)
    # Convert RGB to BGR
    #img2 = open_cv_image[:, :, ::-1].copy()

    # https://stackoverflow.com/questions/63011282/how-to-display-image-from-a-folder-using-button-with-streamlit
    # Convert the file to an opencv image.
    #file_bytes = np.asarray(bytearray(uploaded_img.read()), dtype=np.uint8)
    #opencv_image = cv2.imdecode(file_bytes, 1)
    # print(opencv_image)
    #print(img2.shape)


    img2 = picture.getvalue()
    img3 = cv2.imdecode(np.frombuffer(img2, np.uint8), cv2.IMREAD_GRAYSCALE)
    # Image is resized to 28x28 pixels
    #st.write(img3.shape)
    #(528, 704)
    crop = img3[0:528, 100:628] 
    st.write(crop.shape)
    #img3 = crop
    #st.write(img3)

    # https://datascience.stackexchange.com/questions/48946/typeerror-tuple-object-cannot-be-interpreted-as-an-integer
    img4 = cv2.resize(crop , (28,28)) 
    #img4.reshape(1, -1)
    # width, heigh and channels
    #st.write(img4.shape)
    # Convert the image into binary, with threshold values somewhere
    # in the middle of the color/light scale
    # https://www.geeksforgeeks.org/image-thresholding-in-python-opencv/
    ret, bw_img = cv2.threshold(img4, 127, 255, cv2.THRESH_BINARY) 
    #st.write(bw_img.shape)
    # New empty array 
    newRow = []
    #tmp=[]
    #for b in bus:
        
    
    # Nested for loops to push all row values to the array.
    # Value 255 is pushed as 1.
    for row in bw_img:
        for pixel in row:
            if pixel == 255:
                pixel = 1
                newRow.append(1)
                #tmp.append(pixel)
            else:
                pixel = 0
                newRow.append(0)
                #tmp.append(pixel)
    #bus=tmp            
    st.write("Predicting ...")
    #print(bw_img)
    newRow2 = np.array(newRow, dtype=np.int32)
    b = newRow2.reshape(1, -1) 
    c = list(b) 
    #st.write(np.shape(c))
    #st.write(c)
    #st.write(newRow)
    #c = b.tolist()
    #st.write(c.__hash__)
    #frozen_item = frozenset(c)
    #st.write(frozen_item.__hash__)

    #prediction = pickled_model.predict(c)   
    st.success(pickled_model.predict(c))         

# Button to trigger the analyze function
if st.button('Analyze Camera'):
    if picture is not None:
        analyze_camera()
    else:     
        st.error('Please take an image.')

# Button to trigger the analyze function
if st.button('Analyze Uploaded Image'):
    if uploaded_picture is not None:
        analyze_uploaded_image()
    else:     
        st.error('Please upload an image.')




# Function to analyze the image
def analyze_uploaded_image_v2():
    #img2 = cv2.imdecode(np.frombuffer(uploaded_picture, np.uint8), cv2.IMREAD_GRAYSCALE)
    # Load image using OpenCV
    img = cv2.imdecode(np.fromstring(uploaded_picture.read(), np.uint8), 1)

    # Convert image to YSBCR color space
    img = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    #scaler = StandardScaler()
    # standardize the input data
    #std_data = scaler.fit_transform(img)
    #img = cv2.imread(img_ysbcr, 0) 
    img2 = cv2.resize(img , (28,28))
    ret, bw_img = cv2.threshold(img2, 127, 255, cv2.THRESH_BINARY) 
    newRow = []
    for row in bw_img:
        for pixel in row:
            if pixel == 255:
                newRow.append(1)
            else:
                newRow.append(0)
            
    print(newRow)
    print(len(newRow))
    newRow2 = np.array(newRow, dtype=np.int32)
    b = newRow2.reshape(1, -1) 
    c = list(b) 
    st.success(pickled_model.predict(c)) 
# Button to trigger the analyze function
if st.button('Analyze Uploaded Image2'):
    if uploaded_picture is not None:
        analyze_uploaded_image_v2()
    else:     
        st.error('Please upload an image.')









        








## OLD TEST AND UNUSED CODE ##

# Load a test image.
# img = cv2.imread('./7.jpg', 0) 
# print(newRow)
# print(len(newRow))
# Save image
# cv2.imwrite('./image.png',bw_img)

# Function to load the image
#def loadImage():
    # https://stackoverflow.com/questions/63011282/how-to-display-image-from-a-folder-using-button-with-streamlit
#    uploaded_file = st.file_uploader("Choose a image file", type="jpg")

# Button to trigger the analyze function
#if st.button('Load Image'):
#    loadImage()

# st.write("Hello world")
#img = Image.open('./image7.png')
#img.thumbnail((28, 28), Image.ANTIALIAS)
#img.resize((28, 28),Image.ANTIALIAS)
# image.save('/some/path/thumb.jpg', 'JPEG', quality=88)
# read the image file 
#img = cv2.imread('image7.png', 2) 
# ret, bw_img = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY) 
# converting to its binary form 
# bw = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY) 
#print(bw_img[10][15])
#cv2.imshow("Binary", bw_img) 
#cv2.waitKey(0) 
#cv2.destroyAllWindows() 
# Display the image
#cv2.imshow("Image", bw_img)

