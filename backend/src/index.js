import dotenv from 'dotenv';
import connectdb from './db/index.js';
import app from './app.js';

dotenv.config({ path: './.env' });

const post = [
  {
    username: "user1",
    title: "title1"
  },
  {
    username: "user2",
    title: "title2"
  }
]
app.get('/',(req, res)=>{
  res.json(post);
})

connectdb()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server running on port: ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log("Database connection failed:", err);
  });


