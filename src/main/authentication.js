const jwt = require('jsonwebtoken');
const Role = require('../_helper/role');

exports.generateToken = (id, role, key, accessTokenExpiration, refreshTokenExpiration) => {
    try {

    const refreshToken = jwt.sign({},key,{expiresIn: '24hr'});
    const token = jwt.sign({
            id,
            role,
            refreshToken
            },
            key,
            {
                expiresIn: expiration
    });
    const tokenResponse = {
        "token": token,
        "refreshToken": refreshToken 
    }

    return tokenResponse;
    } catch(err){
        return (undefined);
    }
};

exports.verify = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.status(403).json({ status: "401" , message: 'Not Authenticated' });
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {

      decodedToken = jwt.verify(token, "supersecretkey");
      return decodedToken;
    } catch (err) {
        return res.status(403).json({ status: "401" , message: 'Not Authenticated' });
    }
    };
