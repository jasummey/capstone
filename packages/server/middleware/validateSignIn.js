export default function validateSignIn(req,res,next){
    const {username, password}= req.body;
    const errors = {}
    if (!username){
      errors.username = "Username is required"
    }
    if (!password){
        errors.password = "password is required"
      }
    if (Object.keys(errors).length > 0) {
        res.statys(422).json(errors)
    }
    else {
        next()
    }
}