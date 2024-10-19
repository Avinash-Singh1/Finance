import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// import bodyParser from 'body-parser';
import { jk_finance_db } from "../models/app-models.js";
import { jk_finance_User } from "../models/app-models.js";


// app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));




function generateToken(user) {
    return jwt.sign({ username: user.username }, 'your_secret_key', { expiresIn: '1h' });
  }

export const rootFun= (req,res)=>{
    console.log("/ api called");
    res.status(200).json({"Status":"Success"});
}

export const registerfun = async (req, res) => {

    const { name,email, password } = req.body;

  // Generate salt and hash the password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    bcrypt.hash(password, salt, async(err, hash) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }

     const usersdata={ name:name,email:email,  password:hash ,salt:salt};
      console.log("user: ",usersdata);
      // Store username, salt, and hash in the 'users' array (replace with database storage)
      var queryData = '"'.replace(/"/g, "'") + JSON.stringify(usersdata) + '"'.replace(/"/g, "'");

      const results= await jk_finance_db.query('CALL jk_finance.insert_in_register(' + queryData + ');');
  
    //   res.status(200).json({ "Register": "register Success" });
   

      res.status(201).json({ message: 'User registered successfully' });
    });
  });











//   try {
//     const { name, email, password } = req.body;

//     console.log("'/api/register' called", req.body);

//     // Generate a salt
//     const saltRounds = 10;
//     const salt = await bcrypt.genSalt(saltRounds);

//     // Hash the password with the generated salt
//     const hashedPassword = await bcrypt.hash(password, salt);
//     console.log("Hashed password: ", hashedPassword);
//     const data ={
//         name:name,
//         email:email,
//         password:hashedPassword,
//         salt: salt
//     };

//     console.log("Data: ",data);
    // Assuming you have a stored procedure called 'insert_in_register' in your MySQL database
//         var queryData = '"'.replace(/"/g, "'") + JSON.stringify(usersdata) + '"'.replace(/"/g, "'");

//     const results= await jk_finance_db.query('CALL jk_finance.insert_in_register(' + queryData + ');');

//     res.status(200).json({ "Register": "register Success" });
//   } catch (error) {
//     console.error("Error", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
};

export const loginfun = async (req, res) => {
    const { email, password } = req.body;

    // Find the user in the 'users' array (replace with database retrieval)
    const user = await jk_finance_User.findOne({ where: {
            email: email,
          }});

          console.log("User Found: ",user);
  
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
  
    // Verify the password using stored salt and hash
    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        return res.status(401).json({ error: 'Authentication failed' });
      }

            // Generate a JWT token
            const tokenObj={
                email:user.email,
                password:user.password,
              
            }
            console.log("Users: ",tokenObj);
            // Store the token in session storage
            const token = generateToken(tokenObj);
            console.log("Token:",token);
            res.cookie("token", token, {
                httpOnly: true,
                expires: new Date(Date.now() + 60 * 1000),
              });
    
    res.status(200).json({ message: 'Login successful', token });

  
    //   res.status(200).json({ message: 'Login successful' });
    });




    // const {email,password}= req.body;
    // console.log("email", email);
    // console.log("password", password);

    
    // let jkUser = await jk_finance_User.findOne({ where: {
    //     email: email,
    //   }});

    // //   console.log("This is User Data: ",jkUser);
    // //   if (!jkUser) return res.redirect("/dashboared");
    // const isMatch = await bcrypt.compare(password, jkUser.password);
    //   console.log("isMatched: ",isMatch);
    // res.status(200).json({"status":"Success"});

      

};
