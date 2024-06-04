import axios from "axios";

export const userRequest = axios.create({
  baseURL: "https://upskilling-egypt.com:3000/api/v0",
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjU3ODFjYzZlYmJiZWZiYzFhM2YxMmIiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcxNzE0NDQxNCwiZXhwIjoxNzE4MzU0MDE0fQ.t38jpq9EiyVtFHiyBjXsl4h4gICzWm8IvCaic9tdLrw`,
  }
});

// console.log(userRequest);
