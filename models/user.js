module.exports = db => {
  // model is exported as a function, db instance is passed in
  // as the parameter

  let User = db.createModel("User", {
    // creating a user db model, which is a definition of what a
    // particular data type will look like

    // db.createModel takes in 3 params, 1 is optional
    // createModel(modelName, modelSchema, modelOptions(optional))
    // modelName - name of the db table/collection
    // the record will be stored in
    // modelSchema - the shape/definition of what the data
    // will look like
    // modelOptions - alternate settings to change the behavior
    // of how our data is validated, saved or queried (optional)

    email: db.type.string().required(),
    password: db.type.string().required()
  });

  return User;
};
// return the model from the function
