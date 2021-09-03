const handleRegister = (req, res, db, bcrypt) => {
  const { password, email, name } = req.body;
  //   bcrypt.hash(password, null, null, function(err, hash) {
  //     console.log(hash)
  // });
  if(!name||!email||!password){
    return res.status(400).json('incorrect form submit')
  }
  const hash = bcrypt.hashSync(password);
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            name: name,
            email: loginEmail[0],
            joined: new Date(),
          })
          .then((user) => {
            res.json(user);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => {
    res.status(400).json("unable to register");
  });
  // database.users.push();
};

module.exports = { handleRegister: handleRegister };
