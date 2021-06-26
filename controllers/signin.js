const handleSignin = (req, res, db, bcrypt) => {  
//Modification 1: 
//const handleSignin = (db, bcrypt) => (req, res) => {
    const {email, password } = req.body;
    if (!email || !password)
    {
        return res.status(400).json('Incorrect form submission');
    }
    db.select('email', 'hash') // or just: db('users').where(...)
        .from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            if (bcrypt.compareSync(req.body.password, data[0].hash))
            {
                return db.select('*').from('users').where('email', '=', req.body.email) // return so that the first db.select function knows about it. Otherwise you will get headers error
                .then(user => {
                    res.json(user[0])
                })
                .catch(err =>  res.status(400).json('Unable to get user.'))                
            }
            else {
                res.status(400).json('Wrong credentials.');
            }
        })
        .catch(err => res.status(400).json('Wrong credentials.')) // No need to use a transaction because we're just checking stuff, not modifying db items.
}

module.exports = {
    handleSignin
}