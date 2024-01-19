import express, {Express,Request,Response} from 'express'
import mongoose from 'mongoose'
const app = express();
import config from './config';


app.get('/',(req,res)=>{
    console.log(`Welcome Message`)
})

app.use((req, res) => res.status(404).json({
    message: "Not found",
  }));

  const PORT:number= config.PORT as unknown as number || 8000
   mongoose.connect(config.MONGO_DB as string)
   .then(()=>{
    app.listen(PORT,()=>{
        console.log(`Mongo DB connected Successfully`)
        console.log(`Server started on http://localhost:${PORT}`);
    })
   }).catch((err:any)=>{
   console.log(err);
   process.exit(1);
})