
import mongoose from "mongoose";
import users from "../models/auth.js";
import { OAuth2Client } from 'google-auth-library';
import dotenv from "dotenv"
dotenv.config()

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await users.find();
    const allUserDetails = [];
    allUsers.forEach((user) => {
      allUserDetails.push({
        _id: user._id,
        name: user.name,
        about: user.about,
        tags: user.tags,
        joinedOn: user.joinedOn,
      });
    });
    res.status(200).json(allUserDetails);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProfile= async(req,res)=>{
  const {id:_id}=req.params;
  const {name,about,tags}=req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)){
    return res.status(404).send("question unavailable..")
  }
  try {
    const updatedProfile = await users.findByIdAndUpdate(
      _id,
      { $set: { 'name': name, 'about': about, 'tags': tags } },
      { new: true }
    );
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
}
export const google = async(req,res,next)=>{
  res.header('Access-Control-Allow-Origin','http://localhost:3000')
  res.header('Referrer-Policy','no-referrer-when-downgrade')

  const redirectUrl='http://127.0.0.1:3000/oauth'

  const OAuth2Client=new OAuth2Client (
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectUrl
  )
  const authorized =OAuth2Client.genrateAuthUrl(
      {
          access_type:'offline',
          scope:'https"//www.googleapis.com/auth/userinfo.profile openid',
          prompt:'consent'
      }
  )
  res.json({url:authorized})

}


async function getUserData(access_token) {

  const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
  
  //console.log('response',response);
  const data = await response.json();
  console.log('data',data);
}




export const gett = async (req, res, next)=> {

    const code = req.query.code;

    console.log(code);
    try {
        const redirectURL = "http://127.0.0.1:3000/oauth"
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectURL
          );
        const r =  await oAuth2Client.getToken(code);
        // Make sure to set the credentials on the OAuth2 client.
        await oAuth2Client.setCredentials(r.tokens);
        console.info('Tokens acquired.');
        const user = oAuth2Client.credentials;
        console.log('credentials',user);
        await getUserData(oAuth2Client.credentials.access_token);

      } catch (err) {
        console.log('Error logging in with OAuth2 user', err);
    }


    res.redirect(303, 'http://localhost:3000/');
  


};



