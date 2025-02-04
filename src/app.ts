import express from 'express';


export const app = express();

app.use(express.json());



app.listen(3000, () => console.log("Running on 300"));