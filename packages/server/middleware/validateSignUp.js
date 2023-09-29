export default function validateSignUp (req,res,next){
    const {username, password, confirmPassword, email} = req.body;
    const errors = {};
    if (!username) {
        errors.username = "Username is required";
    } 
    if (!password) {
        errors.password = "Password is required"
    }

  if (!confirmPassword){

    errors.confirmPassword = "Must confirm password"
    }
    else if (password !== confirmPassword)
    { errors.password = "Passwords must match"}
    if (Object.keys(errors).length > 0) {
        return res.status (422).json(errors);
    } else {
        next();
    }
  }
