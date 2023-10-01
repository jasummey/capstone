// import { Router } from "express";

// const router = Router();

// const users = [];

// // User registration route
// router.post("/register", (req, res) => {
//   const { username, email, password } = req.body;

//   // Check if the username or email is already in use
//   const existingUser = users.find(
//     (user) => user.username === username || user.email === email
//   );

//   if (existingUser) {
//     return res
//       .status(400)
//       .json({ message: "Username or email already in use" });
//   }

//   // New user object
//   const newUser = { username, email, password };
//   users.push(newUser);

//   res.status(201).json({ message: "User registered successfully" });
// });

// // User login route
// router.post("/login", (req, res) => {
//   const { username, password } = req.body;

//   const user = users.find((user) => user.username === username);

//   if (!user) {
//     return res.status(401).json({ message: "Invalid credentials" });
//   }

//   res.status(200).json({ message: "Login successful", user });
// });

// router.get("/profile", requireAuth, (req, res) => {
//   const userProfile = req.user;
//   res.status(200).json(userProfile);
// });

// function requireAuth(req, res, next) {
//   const authenticatedUser = {
//     username: "authenticatedUser",
//     email: "user@example.com",
//   };

//   if (authenticatedUser) {
//     req.user = authenticatedUser;
//     next();
//   } else {
//     res.status(401).json({ message: "Authentication required" });
//   }
// }

// export default router;
