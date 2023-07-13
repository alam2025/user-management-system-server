const express = require("express");
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const users = require('./data/users.json')
const port = process.env.PORT | 3000;


// midleware 
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
      res.send('USER MANAGEMENT SERVER IS RUNNING ...')
})



//mongoDB


console.log(process.env.DB_USER);
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nfkbd0s.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
      serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
      }
});

async function run() {
      try {
            // Connect the client to the server	(optional starting in v4.7)
            //await client.connect();

            const usersCollection = client.db("UserManagementSystem").collection("users");


            // users api 
            app.get('/users', async (req, res) => {
                  const result = await usersCollection.find().toArray();

                  res.send(result)
            })

            // get single user by id 
            app.get('/users/:id', async (req, res) => {
                  const { id } = req.params;
                  const query = { _id: new ObjectId(id) };
                  const result = await usersCollection.findOne(query);
                  res.send(result)
            })

            app.post('/users', async (req, res) => {
                  const user = req.body;
                  const result = await usersCollection.insertOne(user);
                  res.send(result)
            })

            app.delete('/users/:id', async (req, res) => {
                  const { id } = req.params;
                  const query = { _id: new ObjectId(id) };
                  const result = await usersCollection.deleteOne(query);
                  res.send(result)
            })

            app.patch('/users/:id', async (req, res) => {
                  const { id } = req.params;
                  const data = req.body;
                

                  const filter = { _id: new ObjectId(id) };
                  const updateDoc = {
                        $set: {
                              name:data.name,
                              email:data.email,
                              phoneNumber: data.phoneNumber
                        }
                  };
                  console.log(updateDoc);

                 const result= await usersCollection.updateOne(filter, updateDoc);
                 console.log(result);
                 res.send(result)
            });




            // Send a ping to confirm a successful connection
            await client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
      } finally {
            // Ensures that the client will close when you finish/error
            // await client.close();
      }
}
run().catch(console.dir);



//mongoDB

app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
})