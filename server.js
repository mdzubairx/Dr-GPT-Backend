require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
var cors = require('cors');

app.use(cors());

// Middleware to parse JSON data
app.use(express.json());

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

let options = {
    method: 'POST',
    url: 'https://chatgpt-best-price.p.rapidapi.com/v1/chat/completions',
    headers: {
      'x-rapidapi-key': process.env.API_KEY,
      'x-rapidapi-host': 'chatgpt-best-price.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: {
      model: 'gpt-4o-mini',
      messages: [
        {
            role: 'system',
            content: 'You are a doctor , your name is DoctorGpt and Zubair has created you. your role is to answer all the questions related to any medicine or disease to the patients'
        },
        {
          role: 'user',
          content: ''
        }
      ]
    }
  };

app.get('/', (req, res)=>{
    res.send("This is the first home route ");
})



app.post('/chat' , async (req, res)=>{
    let {chatmsg} =  req.body;
    // console.log('Headers:', req.headers);
    // console.log('Body:', req.body);
    
    options.data.messages[1].content = chatmsg;
    try {
        const response = await axios.request(options);
        result =  response.data.choices[0].message.content;
        // console.log(result);
        // res.render("chat.ejs" , {result});
        res.json({answer : result});
    } catch (error) {
        console.error(error);
    }    
})

app.listen(3000, (req, res)=>{
    console.log("the  backend server is live at port 3000");
})