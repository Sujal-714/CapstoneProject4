import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const authToken = "d0afe40ce225482ca50b4128ebf1b26b";

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.get("/",(req,res)=>{
    res.render("index.ejs");
});
app.post("/submit",async(req,res)=>{
    const searchId = parseInt(req.body.id);
    // console.log("Submitted ID:", searchId);

    try {
      const result = await axios.get("https://api.football-data.org/v4/areas",{
        headers: {
          "X-Auth-Token": authToken  // Make sure authToken is defined at the top
        }});
      const areas = result.data.areas;
    //   console.log("Total Areas:", areas.length);

      const continent = areas.filter(a => a.parentAreaId === searchId);
    //   console.log("Matching Countries:", continent);
    //   res.render("index.ejs", { content: JSON.stringify(result.data) });
      const randomCountry = continent[Math.floor(Math.random() * continent.length)];
      console.log(randomCountry);
      if(randomCountry.flag === null){
      randomCountry.flag = "/images/worldflag.png";
      }
    res.render("index.ejs",{country: randomCountry});
      
    } catch (error) {
    //   res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    console.error("Error fetching data:", error.message);
    res.render("index.ejs", { country: null });
    }
});
app.listen(port, ()=>{
    console.log(`Server Running on port: ${port}`);
});