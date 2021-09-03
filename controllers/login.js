const handleLogin = (db, bcrypt) => (req, res)=> {
    const { password, email} = req.body;
  if(!email||!password){
    return res.status(400).json('incorrect form submit')
  }
  //   bcrypt.compare("lemongrass", '$2a$10$ZZOhBVWPcg9V/wawy1/HTuI6OlEA5m9Qy3gnXAhtmUFvF4Z6gfFX2', function(err, result) {
  //     console.log('first guess', result);
  // });
  // bcrypt.compare("bananas", '$2a$10$ZZOhBVWPcg9V/wawy1/HTuI6OlEA5m9Qy3gnXAhtmUFvF4Z6gfFX2', function(err, result) {
  //     console.log('second guess', result);
  // });
  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then((user) => {
            console.log(user);
            res.json(user[0]);
          });
      } else {
        res.status(400).json("wrong credential");
      }
    })
    .catch((err) => res.status(400).json("wrong credential"));
};

module.exports = {
  handleLogin: handleLogin,
};
