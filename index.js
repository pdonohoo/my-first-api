const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(require('./headers'));

let items = [
  {
          item: 'Rzr xp41000',
          price: '$15,000',
          photo: 'https://www.bertsmegamall.com/images/pages/2014-polaris/5.jpg'
        },
        {
          item: 'Trip to Hawaii',
          price: '$5,000',
          photo: 'data:image/jpeg;base64,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'
        },
        {
          item: 'Dream Tech Job',
          price: 'Hard work',
          photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGx_rxXjUu4Qz6VHqzguFCvUNpQ85njjA4xoH1cd34mQRQpJ5i'
        },
        {
          item: 'Yacht',
          price: '$1,000,000',
          photo: 'http://luxurylaunches.com/wp-content/uploads/2012/12/Ferretti-Custom-Line-100-Yacht.jpg'
        },
        {
          item: 'Helicopter',
          price: '$500,000',
          photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_uhalqfp-tLcUQLSK473Es1963PhNt1-m0wfyljqR0Em68fkX'
        },
        {
          item: 'Dream House',
          price: '$1,500,000',
          photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-UMNPDwr4YgA7W7HJ6gU-4KrvEFM9bManMgUyBTVMaGvnqi1v'
        },
        {
          item: 'Iceland Vacation',
          price: '$15,000',
          photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzslZhzRF9FCyxaNdZbQWdr2NuvuT1ogbDHQfEcKyirXMRnBRpOg'
        },
        {
          item: 'Europe Vacation',
          price: '$10,000',
          photo: 'https://www.gannett-cdn.com/-mm-/31367d329636d17a6db6ab9062fb410f0666249c/c=0-0-1702-1280/local/-/media/2018/04/03/USATODAY/USATODAY/636583697069176857-Ireland.jpg?width=534&height=401&fit=crop'
        },
        {
          item: 'Tesla Sportster',
          price: '$200,000',
          photo: 'https://cdn.motor1.com/images/mgl/ZZmLr/s3/2020-tesla-roadster.jpg'
        },
        {
          item: 'Lambogini Hurican',
          price: '300,000',
          photo: 'https://imgnooz.com/sites/default/files/wallpaper/vehicles/65351/lamborghini-huracan-wallpapers-65351-7819554.jpg'
        },
        {
          item: 'Farrari',
          price: '250,000',
          photo: 'https://cnet1.cbsistatic.com/img/wMYaKKLde-AsjxWcjr3FbsgTBm4=/936x527/2017/08/23/2f800fb9-9ae1-4e65-a1e2-bc743affa69b/2018-ferrari-portofino-1.jpg'
        },
        {
          item: 'Cabin',
          price: '500,000',
          photo: 'https://cdn.pixabay.com/photo/2015/09/18/11/37/rustic-945421__340.jpg'
        }
];

let cart = [
  {
    item: 'dog',
    price: '$1',
    photo: 'https://cdn.pixabay.com/photo/2015/09/18/11/37/rustic-945421__340.jpg' 
  },
  {
    item: 'dog',
    price: '$1',
    photo: 'https://cdn.pixabay.com/photo/2015/09/18/11/37/rustic-945421__340.jpg' 
  }
];

app.get('/items', (req, res) => {
  res.send(items)
});

app.get('/cart', (req, res) => {
  res.send(cart)
});

app.post('/cart', (req, res) => {
  console.log(req.body)
  cart.push(req.body)
  res.send(cart)
})

app.delete('/cart', (req, res) => {
  cart.delete(req.body)
  res.send(cart)
})
    
app.get('/kitchen',(req, res) => {
  res.send({  text: 'Taco'  })
});


app.listen(5000, (err) => {
  if(err){ throw err }
  console.log('Server up and running on port 5000')
}) 