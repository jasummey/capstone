export async function basicProtectedRoute (req,res,next) {
try {
    res.send("You've been granted access to a protected route.")
} catch (error) {
    console.log (error)
    res.sendStatus(500)
}
}

export async function roleProtectedRoute(req,res,next){
    try {
        res.send ("If you can see this, you are allowed to see it")
    } catch (error) {
        res.sendStatus (500);
    }
}