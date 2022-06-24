module.exports = function (req, res, next) {
  if(req.method !== 'GET') {
    next();
    return;
  }

  req.paginate = {
    skip: req.query.skip,
    limit: req.query.limit || req.query.take
  };
  
  next();
}