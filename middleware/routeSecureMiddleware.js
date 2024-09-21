const authToken = process.env.AUTH_TOKEN;

// authorization middleware
function secureRouteMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('basic ')) {
    req.flash('error', 'Request unauthorized, you have no permission');
    return res.redirect('/');
  }
  const authHeaderValue = authHeader.split(' ')[1];
  console.log(authHeaderValue);
  const credentials = Buffer.from(authHeaderValue, 'base64').toString('ascii');
  console.log(credentials);

  if (credentials === authToken) {
    return next();
  } else {
    req.flash('error', 'Request unauthorized, token Invalid');
    return res.redirect('/');
  }
}

module.exports = { secureRouteMiddleware };
