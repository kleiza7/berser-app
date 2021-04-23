import jwt from 'jsonwebtoken';

const auth = async(req, res, next) => {
    
    try{
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if(token && isCustomAuth){
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData.id; //burayı ?. olarak koymuştu
        }else{
            decodedData = jwt.decode(token);

            req.userId = decodedData.sub; //burayı ?. olarak koymuştu
        }

        next();
    }catch(error){
        console.log(error);
    }
}

export default auth;