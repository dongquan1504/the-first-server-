const handleProfile=(req, res, db) => {
    const { id } = req.params;
    let found = false;
    // database.users.forEach((user) => {
    //   if (user.id === id) {
    //     found = true;
    //     return res.json(user);
    //   }
    // });
    db.select("*")
      .from("users")
      .where({ id: id })
      .then((user) => {
        if (user.length) {
          res.json(user);
        } else {
          res.status(400).json("not found");
        }
      })
  
      .catch((err) => res.status(400).json("no such userID like that."));
  }

module.exports={
    handleProfile:handleProfile
}