const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const monk = require('monk')
const url = 'mongodb://pdonohoo:KillerZ18!!@cluster0-shard-00-00-frryf.mongodb.net:27017,cluster0-shard-00-01-frryf.mongodb.net:27017,cluster0-shard-00-02-frryf.mongodb.net:27017/StoreDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 5000;
const headers = (require('./headers'))

app.use(cookieParser())
app.use(bodyParser.json())
app.use(require('./headers'));

const db = monk(url) 

db.then(() => {
  console.log('connected to IT')
})

const items = db.get('ItemsDB')

const cart = db.get('cartDB')

const users = db.get('Users')
    
 
app.get('/items', (req, res) => {
  items.find({}).then(results => res.send(results))
});   
  
app.get('/items/:_id', async (req, res) => {
   res.send(await items.findOne({_id: req.params._id})
  )});

// app.get('/items/:id', (req, res) => {
//   items.findOne({id:req.params.id}).then(result => res.send(result))
// });

app.post('/cart', async (req, res) => {
  res.send(await cart.insert(req.body))
});

// app.post('/cart',(req, res) => {
//    cart.insert(req.body).then(result => res.send(result))
// });

app.get('/cart', async (req, res) =>
  res.send(await cart.find({}))
)

// app.get('/cart', (req, res) => {
//   cart.find({}).then(result => res.send(result))
// }); 

app.post('/items', async (req, res) => {
  res.send(await items.insert(req.body))
}) 

app.post('/login', (req, res) => {
 if (users.findOne(req.body)) {
   res.send(req.body) 
 } else {
   res.send(err)
 }
})



 
// app.post('/items', (req, res) => {
//   items.insert(req.body).then(item => 
//       res.send(item)
//     )
//   })  

app.post('/users', async (req, res) => {
  res.send(await users.insert(req.body))
})

app.delete('/cart/:_id', async (req, res) => {
  res.send(await cart.findOneAndDelete({_id:req.params._id}))
})

// app.delete('/items/:id', async (req, res) => {
//   res.send(await items.findOneAndDelete({id: req.params.id}))
// })

app.delete('/items/:_id', (req, res) => {
  items.findOneAndDelete({_id:req.params._id})
  .then(result => res.send(result))
})
  
// app.delete('/cart/:id', (req, res) => { 
//   console.log('the id of item to delete: ', req.params.id)
//    let filteredCart = cart.filter((item) => {
//     return item.id != req.params.id
//   }) 
//   console.log('what i am getting: ', filteredCart)
//   cart = filteredCart
//   res.send(cart)
// });   
    
app.get('/kitchen',(req, res) => { 
  res.send({  text: 'Taco'  })
}); 

app.listen(port, (err) => {
  if(err){ throw err }
  console.log('Server up and running on port 5000')
});