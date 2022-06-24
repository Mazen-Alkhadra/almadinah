module.exports = function (req, res, next) {
  if(req.method !== 'GET') {
    next();
    return;
  }

  let {filter, searchExpr, searchOperation, searchValue} = req.query;
  
  req.filters = [];

  if (filter)
    try {
      req.filters = JSON.parse(filter);
    } catch (err) {}
   
  if(req.filters[0] && !Array.isArray(req.filters[0]))
    req.filters = [req.filters];
    
  if(searchExpr && searchOperation && searchValue) {
    if(req.filters.length)
      req.filters.push("and");

    let searchExprs = searchExpr.split(',');
   
    searchExprs.forEach( (searchExpr, index) => {
      if(index > 0) 
        req.filters.push("or");
      
      searchExpr = searchExpr.replace('"', '');
      searchOperation = searchOperation[0] === '"' ?
        searchOperation.substr(1, searchOperation.length - 2) : searchOperation;
      searchValue = searchValue[0] === '"' ?
        searchValue.substr(1, searchValue.length - 2) : searchValue;

      req.filters.push([searchExpr, searchOperation, searchValue]);
    })
  }
  next();
}

/* middleware output 
req.filters = [
  ["key", "operation", "value"],
  "and",
  ["key", "operation", "value"],
  "or",
  [["key", "operation", "value"], "and", ["key", "operation", "value"]]
]
*/