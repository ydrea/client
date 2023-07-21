import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getPhotos = createAsyncThunk('getphotos', async () => {
  const res = await fetch(
    // 'https://picsum.photos/v2/list?page=2&limit=6'
    'http://localhost:3500/photos'
  );
  const result = await res.json();
  console.log(result);
  return result;
});
//
const initialState = {
  //   photos: 0,
  photos: [],
  loading: false,
  error: null,
};

export const gallerySlice = createSlice({
  name: 'galery',
  initialState,
  reducers: {
    // increment: state => (state.photos += 1),
    // decrement: state => (state.photos -= 1),
  },
  extraReducers: {
    [getPhotos.pending]: state => {
      state.loading = true;
    },
    [getPhotos.fulfilled]: (state, action) => {
      state.photos = action.payload;
      state.loading = false;
    },

    [getPhotos.rejected]: (state, action) => {
      state.status = 'reject';
      state.error = action.error.message;
    },
  },
});

// export const { increment, decrement } = gallerySlice.actions;

export const selectPhotos = state => state.galery.photos;

export default gallerySlice.reducer;

//
