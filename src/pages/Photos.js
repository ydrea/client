import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  getPhotos,
  increment,
  decrement,
  selectPhotos,
  selectPhotoIndex,
  selectSelectedPhotoIndex,
  selectAPhoto,
} from '../redux/rtk/gallerySlice';
import { Card } from '../comps/Card';
import './Photos.css';
//
function Photos() {
  const dispatch = useDispatch();
  const photos = useSelector(selectPhotos);
  const selectedPhotoIndex = useSelector(selectSelectedPhotoIndex);
  const selectedPhoto = photos[selectedPhotoIndex];
  const { popUp, signatura } = useParams(); // Get both parameters from the URL

  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  useEffect(() => {
    // Find the index of the selected photo based on the popUp parameter if available,
    // otherwise use the signatura parameter
    const index = photos.findIndex(
      photo => photo.popUp === popUp || photo.signatura === signatura
    );
    if (index !== -1) {
      dispatch(selectPhotoIndex(index)); // Set the selectedPhotoIndex in the store
    }
  }, [dispatch, photos, popUp, signatura]);

  // useEffect(() => {
  //   console.log(photos);
  //   const index = photos.findIndex(photo => {
  //     console.log(
  //       'Signatura:',
  //       photo.signatura,
  //       'URL Signatura:',
  //       signatura
  //     );
  //     return photo.signatura === signatura;
  //   });
  //   // ...
  //   console.log('Index:', index); //
  //   if (index !== -1) {
  //     console.log('Dispatching selectPhotoIndex'); //
  //     dispatch(selectPhotoIndex(index)); //
  //   }
  // }, [dispatch, photos, signatura]);

  const handleNextPhoto = () => {
    dispatch(increment());
  };

  const handlePreviousPhoto = () => {
    dispatch(decrement());
  };

  return (
    <div>
      <div>
        <button onClick={handlePreviousPhoto}>Previous Photo</button>
        <button onClick={handleNextPhoto}>Next Photo</button>
      </div>
      {selectedPhoto && <Card photo={selectedPhoto} />}

      {/* Render the list of photos as links */}
      <div>
        {photos.map(photo => (
          <Link to={`/photos/${photo.signatura}`} key={photo.id}>
            <img
              src={
                process.env.REACT_APP_SERVER_PUB +
                `/${photo.signatura}`
              }
              alt={photo.naziv}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
export default Photos;
