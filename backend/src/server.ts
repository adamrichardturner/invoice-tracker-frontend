import express from 'express';
import passport from 'passport';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
