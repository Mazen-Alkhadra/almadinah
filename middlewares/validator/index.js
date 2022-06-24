module.exports = (validatorFunction) => {
  return (req, res, next) => {
    let validRes = validatorFunction(req.body);
    if(!validRes.valid) {
      res.status(400).json(validRes.error);
			return;
    }

    next();
  }  
}


