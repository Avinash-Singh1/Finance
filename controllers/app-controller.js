import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// import bodyParser from 'body-parser';
import { jk_finance_db } from "../models/app-models.js";
import { jk_finance_User } from "../models/app-models.js";


export const rootFun = (req, res) => {
  console.log("/ api called");
  res.status(200).json({ Status: "Success" });
};

export const registerfun = async (req, res) => {
  const { name, email, password } = req.body;

  // Generate salt and hash the password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }

      const usersdata = {
        name: name,
        email: email,
        password: hash,
        salt: salt,
      };
      console.log("user: ", usersdata);
      // Store username, salt, and hash in the 'users' array (replace with database storage)
      var queryData =
        '"'.replace(/"/g, "'") +
        JSON.stringify(usersdata) +
        '"'.replace(/"/g, "'");

      const results = await jk_finance_db.query(
        "CALL insert_in_register(" + queryData + ");"
      );
      res.status(201).json({ message: "User registered successfully" });
    });
  });
  
};

export const loginfun = async (req, res) => {
  console.log("INside loginfun");
  const { email, password } = req.body;

  try {
    // Find the user in the 'users' array (replace with database retrieval)
    const user = await jk_finance_User.findOne({
      where: {
        email: email,
      },
    });

    console.log("User Found: ", user.dataValues);
    // Verify the password using stored hash
    const IsvalidUser = user.dataValues;

    if (!IsvalidUser) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    // Verify the password using stored hash
    const result = await bcrypt.compare(password, user.password);
    console.log("Result: ", result);

    // if (!result) {
    //   return res
    //     .status(401)
    //     .json({ error: "Authentication failed", status: -1 });
    // }

    // Generate a JWT token
    const token = jwt.sign({ _id: user.id }, "your_secret_key"); // Replace 'your_secret_key' with your actual secret key

    console.log("Token: ", token);

    // Store the token in cookies
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 1000),
      // secure: true, // Uncomment this line for production if your site is served over HTTPS
    });

    res.status(200).json({
      message: "Login successful",
      token: token,
      user: user.dataValues,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const cookieval = async (res, req) => {
  console.log("I am inside cookie");
  // Retrieve a specific cookie
  const myCookieValue = req.cookies.token;

  if (myCookieValue) {
    //  res.send(`Value of myCookieName: ${myCookieValue}`);
    res.status(200).json({ token: myCookieValue });
  } else {
    res.send("Cookie not found");
  }
};

export const GetTransections = async (req, res) => {
  console.log("Transaction");
  // Generate salt and hash the password

  var queryData =
    '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");

  const results = await jk_finance_db.query("CALL GetTransactionDetails();");
  //   res.status(200).json({ "Register": "register Success" });
  res.status(201).json(results);
};

export const Getloanreport = async (req, res) => {
  console.log("Transaction");
  // Generate salt and hash the password
  var queryData =
    '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");

  const results = await jk_finance_db.query("CALL Getloanreport();");
  //   res.status(200).json({ "Register": "register Success" });
  res.status(201).json(results);
};

export const postpaymentdetails = async (req, res) => {
  console.log("postpaymentdetails", req.body);
  // Generate salt and hash the password
  var queryData =
    '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
  const results = await jk_finance_db.query(
    "CALL postpaymentdetails(" + queryData + ");"
  );
  //   res.status(200).json({ "Register": "register Success" });
  res.status(201).json(results);
};
