import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  feeds: [], // Add this line to store the feeds in the state
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    addAttendance: (state, action) => {
      // Find the feed with the given ID
      const feed = state.feeds.find(
        (feed) => feed._id === action.payload.feedId
      );

      // If the feed exists and the user's ID is not already in the attendances array, push it
      if (feed && !feed.attendances.includes(action.payload.userId)) {
        feed.attendances.push(action.payload.userId);
      }
    },
    // ...other reducers...
  },
});

export const { addAttendance } =
  feedSlice.actions;

export default feedSlice.reducer;
