const handleProfile = (req, res, db) => {
    const { id } = req.params;
    console.log(req.params.id);
    db.select('*')
        .from('users')
        .where({ id }) // shorthand for { id: id }
        .then(user => {  // Note, if there is no user with that id, it will return an empty array, which is technically true. So:
            if (user.length) { // user.length will be 'true' if it is greater than 0
                res.json(user[0]);
            } else {
                res.status(400).json('Not found')
            }
        })
        .catch(err => res.status(400).json('Error getting user'))
}

module.exports = {
    handleProfile // same as handleProfile : handleProfile
}