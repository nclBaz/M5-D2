export const errorHandler = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send(err.message);
  } else if (err.status === 401) {
    res.status(400).send(err.errorList);
  } else {
    console.log("from errorHandler: ", err);
    res.status(500).send("generic server error!");
  }
};
