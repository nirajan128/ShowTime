//1 import axios and express
import express from "express";
import axios from "axios"

//2 set up express app and port
const app = express();
const port = 3000;
const show= []

//5 date function
function currentDate(){
const currentDate = new Date()
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because getMonth() returns zero-based month
const day = String(currentDate.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`
return formattedDate

}

 function removeHtmlTags(html) {
    // Use regular expression to remove HTML tags
    return html.replace(/<[^>]*>/g, '');
  }
//4 render index.ejs
app.get("/", async (req,res)=>{
    const country = 'CA';
    const response = await axios.get(`https://api.tvmaze.com/schedule?country=${country}&date=${currentDate()}`); 
    res.render('index.ejs', { 
         info: response.data,
         image: response.data,
         type: response.data,
         language: response.data,
         status: response.data,
         schedule: response.data,
         country:country,
         search_result:'',
         index :response.data
    });
     console.log(response.data.image)
})

//5  get show list according to the region 
app.get('/getData', async (req, res) => {
    //gets the input of button clicked
    //use query to get input for buttons and body for forms and labels
   const country = req.query.country;
  try {
    const response = await axios.get(`https://api.tvmaze.com/schedule?country=${country}&date=${currentDate()}`);
     res.render("result.ejs", { 
         info: response.data,
         image: response.data,
         type: response.data,
         language: response.data,
         status: response.data,
         schedule: response.data,
         country:country,
        
    });

         
  } catch (error) {
    console.error('Error fetching shows:', error);
    res.status(500).send('Error fetching shows');
  }
});


//6 search, get user input from user from search form and show the search result in search button
app.get("/search", async(req,res) =>{
  try {
    //get user input
    const user_input = req.query.entry

    //embbed the input into url
    const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${user_input}`) 

    //rerout the result to search_result.ejs
    res.render("search_result.ejs", {
        search_result : response.data,
        user_input: user_input
    })
    console.log(response)
  } catch (error) {
    console.error('Error fetching shows:', error);
    res.status(500).send('Error fetching shows');
  }
}) 

//7 get single show information shown in single
app.get("/getSingleShow", async(req,res) => {
   
   
    try {
      //get single show id
       const show_id = req.query.id
       console.log(show_id)
       const response = await axios.get(`https://api.tvmaze.com/shows/${show_id}`)
     
       console.log(response.data)
       res.render("single_show.ejs", {
          single_show: response.data,
          summary: removeHtmlTags(response.data.summary),
          
        
         
       })

    } catch (error) {
      
    }
    
     
})

//3 making the app live in port 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});