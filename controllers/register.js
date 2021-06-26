const handleRegister = (req, res, db, bcrypt) => {
    const { name, email, password } = req.body;
    if (!email || !name || !password)
    {
        return res.status(400).json('Incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);

    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*') // Will return all the columns. Instead of doing a select statement later to return the new user.
                    .insert({
                        name: name,
                        email: loginEmail[0],
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0]);
                    })
            })
            .then(trx.commit) // Send the translations trhough
            .catch(trx.rollback); // Rollback all changes
    })
        .catch(err => res.status(400).json(err)); // Don't return the actuall 'err', because it gives too much info to hackers

}

module.exports = {
    handleRegister
}