const chcekHttmMethod=(req,resp,next)=>{
  if (req.method === 'GET') {
    resp.setHeader('Cache-Control', 'no-cache');
    resp.header('Cache-Control', 'no-cache');
        next();
      }
      else{
        resp.setHeader('Cache-Control', 'no-cache')
        resp.header('Cache-Control', 'no-cache');
        return resp.status(405).send();
      }
  }

  const checkUrlz = (req, resp, next) => {
    if (req.url === '/healthz') {
      console.log("checkUrl correct");
      next();
    } else {
      console.log("checkUrl Not correct");
      resp.status(400).send();
    }
  };
  const checkRequestBody = (req, resp, next) => {
    if (req.headers['content-length'] && parseInt(req.headers['content-length']) > 0) {
      return resp.status(400).send();
    }
      console.log("req.body");
      next();
  };  


module.exports = {checkRequestBody, checkUrlz,chcekHttmMethod}