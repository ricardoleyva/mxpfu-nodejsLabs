const express = require("express");
const router = express.Router();

let users = [
  {
    firstName: "John",
    lastName: "wick",
    email: "johnwick@gamil.com",
    DOB: "22-01-1990",
  },
  {
    firstName: "John",
    lastName: "smith",
    email: "johnsmith@gamil.com",
    DOB: "21-07-1983",
  },
  {
    firstName: "Joyal",
    lastName: "white",
    email: "joyalwhite@gamil.com",
    DOB: "21-03-1989",
  },
];

// GET request: Retrieve all users
router.get("/", (req, res) => {
  //res.send(users);
  res.send(JSON.stringify({users}, null, 4));
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email", (req, res) => {
  //Extract email parameter from the request URL
  const email = req.params.email;
  //Filter users arrau to find wmail that matches extracter email parameter
  let filtered_user = users.filter((user) => user.email === email);
  //Send the filtered_user array as ther response to the client
  res.send(filtered_user);
});
// POST request: Create a new user
router.post("/", (req, res) => {
  //Extract data parameters from request URL
  const firstName = req.query.firstName;
  const lastName = req.query.lastName;
  const email = req.query.email;
  const DOB = req.query.DOB;
  const userExists = users.find((user) => user.firstName === firstName);
  if (!userExists) {
    users.push({
      firstName: firstName,
      lastName: lastName,
      email: email,
      DOB: DOB,
    });
    res.send("The user " + req.query.firstName + " has been added!");
  } else {
    res.send("The user " + req.query.firstName + " already exists.");
  }
});

// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  // Extract email parameter and find users with matching email
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email === email);

  if (filtered_users.length > 0) {
    // Select the first matching user and update attributes if provided
    let filtered_user = filtered_users[0];

    // Extract and update data if provided
    let firstName = req.query.firstName;
    let lastName = req.query.lastName;
    let DOB = req.query.DOB;
    if (firstName) {
      filtered_user.firstName = firstName;
    }
    if (lastName) {
      filtered_user.lastName = lastName;
    }
    if (DOB) {
      filtered_user.DOB = DOB;
    }

    // Replace old user entry with updated user
    users = users.filter((user) => user.email != email);
    users.push(filtered_user);

    // Send success message indicating the user has been updated
    res.send(`User with the email ${email} updated.`);
  } else {
    // Send error message if no user found
    res.send("Unable to find user!");
  }
});

// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  // Extract the email parameter from the request URL
  const email = req.params.email;
  // Filter the users array to exclude the user with the specified email
  users = users.filter((user) => user.email != email);
  // Send a success message as the response, indicating the user has been deleted
  res.send(`User with the email ${email} deleted.`);
});

module.exports = router;
