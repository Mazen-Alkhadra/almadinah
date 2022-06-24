module.exports = function (req, res, next) {
  if(req.method !== 'GET') {
    next();
    return;
  }

  const {sort} = req.query;
  
  req.sorts = [];

  if (sort)
    try {
      req.sorts = JSON.parse(sort);
    } catch (err) {}
     
  next();
}


/* middleware output 
req.sorts = [{selector: "key", desc: false}, {selector: "key", desc: true}]
*/