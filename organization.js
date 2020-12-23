const Organization = require('../models/organizations.model')
const emailer = require('../middleware/emailer')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const ContentManagemnt = require('../models/content_management.model')
const TopicList = require('../models/topic_list.model')
const UserAccess = require('../models/userAccess')
const ForgotPassword = require('../models/forgotPassword')
const SubscriptionPlan = require('../models/subscription-manage.model')
const OrganizationBuyPlan = require('../models/organization_buy_subscription')
const BuyPlan = require('../models/buy_plans.model')
const CreditTransfer = require('../models/credit_transfers.model')
const Contact_Us = require('../models/contact_us.model')
const FAQ = require('../models/faq')

var stripe = require('stripe')(process.env.STRIPE_API_KEY)

const utils = require('../middleware/utils')
const uuid = require('uuid')
const { addHours } = require('date-fns')
const { matchedData } = require('express-validator')
const auth = require('../middleware/auth')
const HOURS_TO_BLOCK = 2
const LOGIN_ATTEMPTS = 5
const db = require('../middleware/db')

var moment = require('moment');
moment().format();

 
/*********************
 * Private functions *
 *********************/

/**
 * Creates a new item in database
 * @param {Object} req - request object
 */
 
 const passwordsDoNotMatch = async user => {
  user.loginAttempts += 1
  //await saveLoginAttemptsToDB(user)
  return new Promise((resolve, reject) => {
    if (user.loginAttempts <= LOGIN_ATTEMPTS) {
      resolve(utils.buildErrObject(409, 'WRONG_PASSWORD'))
    } else {
      resolve(blockUser(user))
    }
    reject(utils.buildErrObject(422, 'ERROR'))
  })
}
 
  const getUserIdFromToken = async token => {
	  // console.log('token = ', token)
	return new Promise((resolve, reject) => {
		// Decrypts, verifies and decode token
		jwt.verify(auth.decrypt(token), process.env.JWT_SECRET, (err, decoded) => {
			// console.log('decodeeed *******', decoded);
			if (err) {
				console.log(err);
				reject(utils.buildErrObject(409, 'BAD_TOKEN'))
			}
			resolve(decoded.data._id)
		})
	})
}

 const findOrgOtp = async obj => {
  return new Promise((resolve, reject) => {
    Organization.findOne(
      {
        phone: obj.phone,
		otp:obj.otp,
        otp_status: 'unused'
      },
      (err, item) => {
        utils.itemNotFound(err, item, reject, 'NOT_FOUND_OR_ALREADY_USED')
        resolve(item)
      }
    )
  })
}

const findUserById = async userId => {
	return new Promise((resolve, reject) => {

		Organization.findOne({
			_id:userId
		}).then(item => {
			var err = null;
			utils.itemNotFound(err, item, reject, 'USER DOES NOT EXIST')
			resolve(item)
		}).catch(err => {
			var item = null;
			utils.itemNotFound(err, item, reject, 'ERROR')
			resolve(item)
		})

	})
}

const orgIsVerified = async org =>{
	return new Promise((resolve, reject)=>{
		if (!org.verified) {
			reject(utils.buildErrObject(409, 'please verify your email'))
		}
    resolve(true)
	});
}
const findOrg = async email => {
  return new Promise((resolve, reject) => {
    Organization.findOne(
      {
        email
      },
      'organization_name  password loginAttempts blockExpires  email role verified verification phone settings profileImage',
      (err, item) => {
        utils.itemNotFound(err, item, reject, 'ORGANIZATION_DOES_NOT_EXIST')
        resolve(item)
      }
    )
  })
}

const findOrgEmail = async email => {
  return new Promise((resolve, reject) => {
    Organization.findOne(
      {
        email
      },
      'organization_name  password loginAttempts blockExpires  email role verified verification phone settings profileImage',
      (err, item) => {
    //    utils.itemNotFound(err, item, reject, 'ORGANIZATION_DOES_NOT_EXIST')
		if(item){
			resolve({'response':false, 'message':'email already in use.'});
		}else{
			resolve({'response':true, 'message':'new email'});
		}   
	   
      }
    )
  })
}

const findOrgByPhone = async phone => {
  return new Promise((resolve, reject) => {
    Organization.findOne(
      {
        phone:phone
      },
      'organization_name  password loginAttempts blockExpires  email role verified verification phone settings profileImage',
      (err, item) => {
		  if(item){
			  resolve({'response':false, message:'phone number already in use.'})
		  }else{
			  resolve({'response':true, message:'new phone number.'})
		  }
        //utils.itemNotFound(err, item, reject, 'ORGANIZATION_DOES_NOT_EXIST')
       // resolve(item)
      }
    )
  })
}
const getOrgObj= async id => {
 return new Promise((resolve, reject) => {
    Organization.findOne(
      {
        _id:id
      },
      'organization_name  profile_picture password loginAttempts blockExpires name email role verified verification mobile_number settings',
      (err, item) => {
        utils.itemNotFound(err, item, reject, 'USER_DOES_NOT_EXIST')
        resolve(item)
      }
    )
  })	
}
const findOrgById = async id => {
  return new Promise((resolve, reject) => {
    Organization.findOne(
      {
        _id:id
      },
      'organization_name  password loginAttempts blockExpires  email role verified verification phone settings profileImage',
      (err, item) => {
        utils.itemNotFound(err, item, reject, 'ORGANIZATION_DOES_NOT_EXIST')
        resolve(item)
      }
    )
  })
}
 const generateToken = org => {
  // Gets expiration time
  const expiration =
    Math.floor(Date.now() / 1000) + 60 * process.env.JWT_EXPIRATION_IN_MINUTES

  // returns signed and encrypted token
  return auth.encrypt(
    jwt.sign(
      {
        data: {
          _id: org
        },
        exp: expiration
      },
      process.env.JWT_SECRET
    )
  )
}

 const setOrgInfo = req => {
  let org = {
    _id: req._id,
    organization_name: req.organization_name,
    email: req.email,
    role: req.role,
    verified: req.verified,
    phone: req.phone

  }
  // Adds verification for testing purposes
  if (process.env.NODE_ENV !== 'production') {
    org = {
      ...org,
      verification: req.verification
    }
  }
  console.log('hereeeeeeeeeeeeeeeee', org);
  return org
}



const sendOTPForVerification = async (req, otp) => {
	console.log('efe', req);
	return new Promise((resolve, reject) => {
		var requestify = require('requestify');
		requestify.request('https://rest.clicksend.com/v3/sms/send', {
    method: 'POST',
    body: {
        
		  "messages": [
			{
			  "body":"Your One Time Password For Your Account on HablaNow (Organisation) is: "+otp,
			  "to": req.phone,
			  "from": "HABLANOW"
			}
		  ]
		
    },
    auth: {
			username: 'promatics.divanshi@gmail.com',
			password: 'SaagPaneer1!'
		},
		dataType: 'json'		
	})
	.then(function(err, response) {
		if(err){
			console.log(err);
		}
		console.log(response)
		resolve(response)
	}).fail(function(response) {
		console.log(response);
        response.getCode(); // Some error code such as, for example, 404
    });
		
	})
}

const setUserInfo = req => {
  console.log('259========================',req)
  let user = {
    _id: req._id,
    first_name: req.first_name,
    last_name: req.last_name,
    email: req.email,
    profile_picture:req.profile_picture,
    mobile_number:req.mobile_number,
      role: req.role,
    settings:{'notifications':1},
    churro_points: {'points': 0},
    subscription_plans:{'plan':'Trial'},
      verified: req.verified,
    organization_id:req.organization_id
    }
  // Adds verification for testing purposes
  if (process.env.NODE_ENV !== 'production') {
    user = {
      ...user,
      verification: req.verification
    }
  }
  var obj = {
    response:true,
    user:user
  }
  return obj
}
const returnOrgTokenUser = async (req, user) => {
  return new Promise((resolve, reject) => {
   // const userInfo = setUserInfo(user)
      // Returns data with access token
      resolve({
        token: generateToken(user._id),
        user: user,
		response: true
      })
    })
}
const returnOrgToken = async (req, user) => {
  return new Promise((resolve, reject) => {
   // const userInfo = setUserInfo(user)
      // Returns data with access token
      resolve({
        token: generateToken(user._id),
        user: user,
		response: true
      })
    })
}
 const createOrganization= async req => {
	 var otp = Math.floor((Math.random() * 9999) + 1);
            if(otp < 1000 ){
                otp = otp + 1000;
            }

	return new Promise ((resolve, reject)=> {
		const org= new Organization({
		  organization_name: req.organization_name,
		  email: req.email,
		  password: req.password,
		  phone: req.phone,
		  verification: uuid.v4(),
		  otp:otp,
		  role:req.role
		});
		console.log('Reached here');
		 org.save((err, item) => {
		  if (err) {
			if(err.message.includes('phone_1 dup key')){
				resolve({'response':false, message:'Mobile Number Already Registered With Another Organization'});
			}
			console.log('error is :', err);
			reject(utils.buildErrObject(422, err.message))
		  }

		  resolve({response:true, data:item})
		})
		});
}
const registerUser= async req => {
  // var otp = Math.floor((Math.random() * 9999) + 1);
  //          if(otp < 1000 ){
  //              otp = otp + 1000;
  //          }
  console.log('req ======================339',req)
 return new Promise ((resolve, reject)=> {
   const user= new User({
      first_name: req.first_name,
      last_name: req.last_name,
      email: req.email,
      password: req.password,
      decoded_password: req.decoded_password,
      verified: req.verified,
      mobile_number: req.mobile_number,
      verification: uuid.v4(),
      role:req.role,
      settings:req.settings,
      churro_points: req.churro_points,
      subscription_plans: req.subscription_plans,
      organization_id:req.organization_id
   });
   console.log('Reached here');
   user.save((err, item) => {
     if (err) {
     if(err.message.includes('phone_1 dup key')){
       resolve({'response':false, message:'Mobile Number Already Registered With Another User'});
     }
     console.log('error is :', err);
     reject(utils.buildErrObject(422, err.message))
     }

     resolve({response:true, data:item})
   })
   });
}
/********************
 * Public functions *
 ********************/

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

exports.createOrganization= async (req, res) =>{
	 try {
    // Gets locale from header 'Accept-Language'
    const locale = req.getLocale()
    req = matchedData(req)
	console.log('dataaa===', req);
	 const doesOrgExists = await emailer.orgExists(req.email)
    if (!doesOrgExists) {
	console.log('here is the data', req);
      const item = await createOrganization(req)
	  if(item.response){
	   const orgInfo =  setOrgInfo(item)
       const response = await returnOrgToken(item, orgInfo)
      emailer.sendRegistrationEmailToOrganization(locale, item.data)
	  
      res.status(201).json(response)
	  }else{
		  res.status(422).json(item)
	  }
	}else{
		res.status(422).json({response:false, message:'Email address already registered'})
	}
  } catch (error) {
    utils.handleError(res, error)
  }
}

exports.verifyOtp = async (req, res) => {
	console.log(req.body);
  try {
    const data = matchedData(req)
    const otp = await findOrgOtp(data)
    res.status(200).json(otp)
  } catch (error) {
    utils.handleError(res, error)
  }
}

exports.login = async (req, res) => {
  try {
    const data = matchedData(req)
	console.log(data);
	
    const org =  await findOrg(data.email)
	console.log('Org found', org);
    //await userIsBlocked(user)
	
   // await checkLoginAttemptsAndBlockExpires(user)
    const isPasswordMatch = await auth.checkPassword(data.password, org)
    if (!isPasswordMatch) {
      utils.handleError(res, await passwordsDoNotMatch(org))
    } else {
      await orgIsVerified(org)
      // all ok, register access and return token
      org.loginAttempts = 0
      //await saveLoginAttemptsToDB(org)
      res.status(200).json(await returnOrgToken(req, org))
    }
  } catch (error) {
    utils.handleError(res, error)
  }
}

exports.verifyEmail = async (req,res) => {

    jwt.verify(req.params.token, process.env.JWT_SECRET, function(err, decoded) {
      if (err) {
        console.log(err);
        res.status(422).send("<h1> Token has been expired or invalid </h1>")
        //utils.handleError(res, err)
      }else{
        console.log(decoded);
		Organization.updateOne({_id: decoded.data}, {
			verified: true, 
		}, function(err, affected, resp) {
		   
			   res.status(201).send("<h1> Email Verified Successfully </h1>")

		}).catch(err => {
            console.log(err);
            res.status(201).send("<h1 style='color:red'> Something Went Wrong </h1>")

        })
        
      }
    });
}

exports.verifyUserEmail = async (req,res) => {

  jwt.verify(req.params.token, process.env.JWT_SECRET, function(err, decoded) {
    if (err) {
      console.log(err);
      res.status(422).send("<h1> Token has been expired or invalid </h1>")
      //utils.handleError(res, err)
    }else{
      console.log(decoded);
  User.updateOne({_id: decoded.data}, {
    verified: true, 
  }, function(err, affected, resp) {
     
       res.status(201).send("<h1> Email Verified Successfully </h1>")

  }).catch(err => {
          console.log(err);
          res.status(201).send("<h1 style='color:red'> Something Went Wrong </h1>")

      })
      
    }
  });
}
exports.editProfileOrg = async (req, res) => {
	try {
		console.log("body==", req.body)
		console.log("files==", req.files)

	 const tokenEncrypted = req.headers.authorization
		 	.replace('Bearer ', '')
			.trim()
    let userId = await getUserIdFromToken(tokenEncrypted)
    //let userId = req.body._id
    var doesuserExists = await findUserById(userId)
    console.log(userId,'userId')
		if (doesuserExists) {
			var resp = await db.editProfileOrg(Organization, userId, req.body, req.files)
			res.status(200).json(resp);
		}
	} catch (error) {
		console.log(error);
		utils.handleError(res, error)
	}
}
exports.changePassword = async (req, res) => {
  try {
	  console.log(req.body);
    const data = matchedData(req)
	console.log('=======================', data);
	const tokenEncrypted = req.headers.authorization
			.replace('Bearer ', '')
			.trim()
	console.log(tokenEncrypted);
   let userId = await getUserIdFromToken(tokenEncrypted)
   console.log('here: ', userId);
 // let userId = req.body._id
	const userObj= await getOrgObj(userId);
	console.log('userfound', userObj);
	const isPasswordMatch = await auth.checkPassword(data.oldpassword, userObj);
	if (!isPasswordMatch) {
		res.status(404).json({'response':false, message:'incorrect old password'})
	}else{
		const user= await findUserById(userId);
		user.password = data.password
		user.save((err, item) => {
		if(err) res.status(200).json({'response':false, message:'something went wrong'});
		
		res.status(200).json({'response':true, message:'password updated successfully'})
		})
	}
  }	catch (error) {
    utils.handleError(res, error)
  }
}


/**
 * create content management function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.contentManagement = async (req, res) => {
  try {
    // Gets locale from header 'Accept-Language'
    const locale = req.getLocale()
    req = matchedData(req)
      const item = await createContentManagement(req)
      res.status(201).json(item)

  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * craete content management a new user in database
 * @param {Object} req - request object
 */
const createContentManagement = async req => {
  return new Promise((resolve, reject) => {
    const contentData = new ContentManagemnt({
      content: req.content,
      content_type: req.content_type
    })
    contentData.save((err, item) => {
      if (err) {
        reject(utils.buildErrObject(422, err.message))
      }
      resolve(item)
    })
  })
}

/**
 * Get single item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getContentData = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await utils.isIDGood(req.id)
    res.status(200).json(await db.getItem(id, model))
  } catch (error) {
    utils.handleError(res, error)
  }
}


/**
 * Get all items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getAllContentData = async (req, res) => {
  try {
    const query = await db.checkQueryString(req.query)
    res.status(200).json(await db.getItems(req, ContentManagemnt, query))
  } catch (error) {
    utils.handleError(res, error)
  }
}

exports.prepareOrganization = async (req, res) => {
	 try {
    // Gets locale from header 'Accept-Language'
    const locale = req.getLocale()
    req = matchedData(req)
	console.log('dataaa===', req);
	
	 const doesOrgExists = await findOrgEmail(req.email);
	 const doesPhoneExists = await findOrgByPhone(req.phone);
	 if(doesOrgExists.response && doesPhoneExists.response){
		 var otp = Math.floor((Math.random() * 9999) + 1);

            if(otp < 1000 ){
                otp = otp + 1000;
            }
	 const sendOTP= await sendOTPForVerification(req, otp);
	  res.status(201).json({'response': true, 'otp':otp, data: req, 'sms':sendOTP});
	 }else{
		 if(!doesOrgExists.response){
		res.status(201).json({'response': false, 'message':'Email address already registered with another account'});
		 }else if(!doesPhoneExists.response){
			 res.status(201).json({'response': false, 'message':'Phone number already registered with another account'});
		 }
	 }
    
	}
	catch (error) {
    utils.handleError(res, error)
  }
}
/**
 * create content management function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.CreateTopicList = async (req, res) => {
  try {
    // Gets locale from header 'Accept-Language'
    const locale = req.getLocale()
    req = matchedData(req)
      const item = await db.createItem(req,TopicList)
      res.status(201).json(item)

  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * create user function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

exports.registerUser= async (req, res) =>{
  try {
   // Gets locale from header 'Accept-Language'
   const locale = req.getLocale()
  //  req = matchedData(req)
  const tokenEncrypted = req.headers.authorization
  .replace('Bearer ', '')
 .trim()
let userId = await getUserIdFromToken(tokenEncrypted)
  const doesuserExistsEmail = await emailer.userExists(req.body.email)
   if (!doesuserExistsEmail) {
    const doesUserExistsPhone = await emailer.userExistsPhone(req.body.mobile_number)
    if(!doesUserExistsPhone){

      req.body.settings={'notifications':true};
      req.body.churro_points= {'points': 0};
      req.body.subscription_plans={'plan':'Trial'};
      const password = await db.randPass(2,3,1)
      req.body.password = password;
      req.body.decoded_password = password;
      req.body.verified = true;
      req.body.organization_id = userId
      const item = await registerUser(req.body)
    if(item.response){
     const userInfo =  setUserInfo(item.data)
      emailer.sendRegistrationEmailToUser(locale, item.data,password)
    
      res.status(201).json(userInfo)
    }else{
      res.status(422).json(item)
    }
    }else{
      res.status(422).json({response:false, message:'Phone number already registered'})
    }

 }else{
   res.status(422).json({response:false, message:'Email address already registered'})
 }
 } catch (error) {
   utils.handleError(res, error)
 }
}

exports.registerUserCSV= async (req, res) =>{
    try {
        // Gets locale from header 'Accept-Language'
        const locale = req.getLocale()
        //  req = matchedData(req)
        var data = req.body;
        const tokenEncrypted = req.headers.authorization
            .replace('Bearer ', '')
            .trim()
        let userId = await getUserIdFromToken(tokenEncrypted)
        data.user_id = userId;
        var emails = data.users.map(val => {return val.email});
        var mobiles = data.users.map(val => {return val.email});
        const doesuserExistsEmail = await emailer.userExistsMultiple(emails)
        const doesuserExistsPhone = await emailer.userExistsPhoneMultiple(mobiles)
        console.log(emails);
        console.log(mobiles);


        await db.registerUserMultiple({
            User : User,
        },data)
        
        console.log(data)
        res.status(200).json({
            code : 200,
        })

    } catch (error) {
        console.log(error);
       utils.handleError(res, error)
    }
}

/**
 * Get all user function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.GetAllUser = async (req, res) => {
  try {
       // Gets locale from header 'Accept-Language'
   const locale = req.getLocale()
   //  req = matchedData(req)
   console.log('req.body--------------------',req.body)
   const tokenEncrypted = req.headers.authorization
   .replace('Bearer ', '')
  .trim()
  console.log(tokenEncrypted);
 let userId = await getUserIdFromToken(tokenEncrypted)
    var obj = {
      organization_id : userId
    }
    res.status(200).json(await db.getItems(req, User, obj))
  } catch (error) {
    utils.handleError(res, error)
  }
}

exports.GetAllUserWithOutPagination = async (req, res) => {
  try {
       // Gets locale from header 'Accept-Language'
   const locale = req.getLocale()
   var data = req.body;
   //  req = matchedData(req)
   console.log('req.body--------------------',req.body)
   const tokenEncrypted = req.headers.authorization
   .replace('Bearer ', '')
  .trim()
   let userId = await getUserIdFromToken(tokenEncrypted)
   data.organization_id = userId
    var obj = {
      organization_id : userId
    }
    res.status(200).json(await db.GetAllUserWithOutPagination({
        User : User
    },data))
  } catch (error) {
    console.log(error);
    utils.handleError(res, error)
  }
}
exports.GetSubscriptionPlan = async (req, res) => {
  try {
   console.log('req.body--------------------',req.body)
   const tokenEncrypted = req.headers.authorization
   .replace('Bearer ', '')
  .trim()
 let userId = await getUserIdFromToken(tokenEncrypted)
    var obj = {
      package_type: "organization_license"
    }
    res.status(200).json(await db.getItems(req, SubscriptionPlan, obj))
  } catch (error) {
    utils.handleError(res, error)
  }
}

exports.stripeWebhooks = async (req, res) => {
    try {
        var data = req.body;
        console.log('req.body--------------------',req.body)

        var flag = await db.updateSubscription({
            OrganizationBuyPlan : OrganizationBuyPlan
        },data)

        res.status(200).json({
            success : true
        })
        
    } catch (error) {
        utils.handleError(res, error)
    }
}

exports.aboutUs = async (req, res) => {
    try {
        var data = req.body;
        console.log('req.body--------------------',req.body)
        data.type = "about_us";
/*
        new FAQ({
            question : data.question,
            answer : data.answer,
        }).save().then(r => console.log(r)).catch(err => console.error(err));*/


        var response = await db.getContentManagement({
            ContentManagemnt : ContentManagemnt
        },data)

        res.status(200).json({
            code : 200,
            data : response,
        })
        
    } catch (error) {
        console.log(error);
        utils.handleError(res, error)
    }
}

exports.faq = async (req, res) => {
    try {
        var data = req.body;
        console.log('req.body--------------------',req.body)
        // data.type = "about_us";


        var response = await db.getFaq({
            FAQ : FAQ
        },data)

        res.status(200).json({
            code : 200,
            data : response,
        })
        
    } catch (error) {
        console.log(error);
        utils.handleError(res, error)
    }
}

exports.howItsWorks = async (req, res) => {
    try {


        var data = req.body;
        console.log('req.body--------------------',req.body)
        data.type = "how_its_works";

        var response = await db.getContentManagement({
            ContentManagemnt : ContentManagemnt
        },data)

        res.status(200).json({
            code : 200,
            data : response,
        })
        
    } catch (error) {
        console.log(error);
        utils.handleError(res, error)
    }
}

exports.homeContent = async (req, res) => {
    try {


        var data = req.body;
        console.log('req.body--------------------',req.body)
        // data.type = "how_its_works";

        var response = await db.getAllContentManagement({
            ContentManagemnt : ContentManagemnt
        },data)

        res.status(200).json({
            code : 200,
            data : response,
        })
        
    } catch (error) {
        console.log(error);
        utils.handleError(res, error)
    }
}
exports.terms = async (req, res) => {
    try {
        var data = req.body;
        console.log('req.body--------------------',req.body)
        data.type = "terms_conditions";

        var response = await db.getContentManagement({
            ContentManagemnt : ContentManagemnt
        },data)

        res.status(200).json({
            code : 200,
            data : response,
        })
        
    } catch (error) {
        utils.handleError(res, error)
    }
}
exports.buyOrganizationSubscription = async (req,res)=>{
    try{
        var data = req.body;
        console.log(data);

        const tokenEncrypted = req.headers.authorization
           .replace('Bearer ', '')
          .trim()
        let userId = await getUserIdFromToken(tokenEncrypted)
        data.organization_id = userId;
        var sub_plan = await db.getSubPlanDetails({
            SubscriptionPlan : SubscriptionPlan
        },data);
        if(sub_plan.recurring){ //if autorenew ON
             // create product and price
            var product_id = "";
            var price_id = "";

            // calculate start date and end date
            var start_date = moment();
            var end_date = moment().add(sub_plan.time, sub_plan.time_type+"s");

            data.start_date = start_date;
            data.end_date = end_date;

           // console.log(data)
            //return

            if(!sub_plan.product_id){
                // Create Product here
                product = await stripe.products.create({
                    name: sub_plan.plan_name,
                });
                sub_plan.product_id = product.id;
                sub_plan.save();
                product_id = product.id;
                // console.log(product);
            }else{
                product_id = sub_plan.product_id;            
            }

            if(!sub_plan.price_id){
                const price = await stripe.prices.create({
                  unit_amount: sub_plan.subscription_price,
                  currency: 'usd',
                  recurring: {
                    interval: sub_plan.time_type, // month/year/week/day
                    interval_count : sub_plan.time, //  interval 2, that would be 2 month/year/week/day
                  },
                  product: product_id,
                });

                sub_plan.price_id = price.id;
                sub_plan.save();
                price_id = price.id
                console.log(price);
            }else{
                price_id = sub_plan.price_id;
            }

            // now its time to create customer
            const customer = await stripe.customers.create({
                description: 'HablaNow subscription.',
                source : data.token
            });

            console.log(customer);

            // now create Subscription
            const subscription = await stripe.subscriptions.create({
                customer: customer.id,
                items: [
                    {
                        price: price_id
                    }
                ],
                metadata:{
                    sub_plan_id : sub_plan._id.toString(),
                    organization_id : userId.toString(),
                }
            });
            data.subscription = subscription; 
            data.sub_plan = sub_plan; 
            console.log(subscription)

            if(subscription.status == "active"){

                // cancel prev subscriptions
                var prev_plan = await db.cancelPrevSubscription({
                    OrganizationBuyPlan : OrganizationBuyPlan
                },data)

                data.got_total_credit = data.sub_plan.total_credit;

                if(prev_plan){
                    data.sub_plan.total_credit = data.sub_plan.total_credit + prev_plan.no_of_credits
                }

                await db.saveSubscription({
                    OrganizationBuyPlan : OrganizationBuyPlan
                },data)

                res.status(200).json({
                    code : 200
                })
            }else{
                 res.status(422).json({
                    code : 422,
                    errors:{
                        msg : "Payment Failed."
                    }
                })
            }
        }else{ // One time payment
            const charge = await stripe.charges.create({
                amount: sub_plan.subscription_price * 100, //convert $ to cents
                currency: 'usd',
                source: data.token,
                description: 'Hablow Payment.',
            });

            if(charge.paid){
                data.balance_transaction = charge.balance_transaction;

                var prev_plan = await db.cancelPrevSubscription({
                    OrganizationBuyPlan : OrganizationBuyPlan
                },data)

                data.got_total_credit = data.sub_plan.total_credit;

                if(prev_plan){
                    data.sub_plan.total_credit = data.sub_plan.total_credit + prev_plan.no_of_credits
                }

                await db.saveSubscription({
                    OrganizationBuyPlan : OrganizationBuyPlan
                },data)

                res.status(200).json({
                    code : 200
                })
            }else{
                res.status(422).json({
                    code : 422,
                    errors:{
                        msg : "Payment Failed."
                    }
                })
            }
        }
           
    } catch (error) {
        console.log(error)
        res.status(422).json({
            code : 422,
            errors:{
                msg : "Payment Failed."
            }
        })
        // utils.handleError(res, error)
    }
}
/**
 * Get single item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getSingleUser = async (req, res) => {
  try {
    // req = matchedData(req)
    // const id = await utils.isIDGood(req.params._id)
    const id = req.params._id
    var data = {
      id : id
    }
    res.status(200).json(await db.getSingleUser({
      User : User,
      BuyPlan : BuyPlan
    },data))
  } catch (error) {
    utils.handleError(res, error)
  }
}/**
 * Get single item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.GetOrganizationSubscription = async (req, res) => {
  try {
    // req = matchedData(req)
    // const id = await utils.isIDGood(req.params._id)
    console.log("sdfdsffdsf");
    const id = req.params._id
    res.status(200).json(await db.GetOrganizationSubscription(id, OrganizationBuyPlan))
  } catch (error) {
    utils.handleError(res, error)
  }
}
exports.GetAllUserCredits = async (req, res) => {
  try {
    // req = matchedData(req)
    // const id = await utils.isIDGood(req.params._id)
    const id = req.params._id
    res.status(200).json(await db.GetAllUserCredits(id, OrganizationBuyPlan))
  } catch (error) {
    utils.handleError(res, error)
  }
}

exports.Contact_Us = async (req, res) => {
    try {
        var data = req.body;
        await db.Contact_Us({
            Contact_Us : Contact_Us,
        },data)

        res.status(200).json({
            code : 200,
        })
    } catch (error) {
        console.log(error);
        utils.handleError(res, error)
    }
}

exports.transferCredits = async (req, res) => {
  try {
    var data = req.body;
    const tokenEncrypted = req.headers.authorization
       .replace('Bearer ', '')
      .trim()
    let userId = await getUserIdFromToken(tokenEncrypted)
    data.organization_id = userId;

    if(data.transferBy == "organization"){ //organization or Organization_user

        await db.transferCreditsFromOrga({
            User : User,
            Organization : Organization,
            OrganizationBuyPlan : OrganizationBuyPlan,
            CreditTransfer : CreditTransfer,
        },data)

        res.status(200).json({
            code : 200,
        })

    }else if(data.transferBy == "organization_user"){ // if Organization_user
        await db.transferCreditsFromOrgaUser({
            User : User,
            Organization : Organization,
            OrganizationBuyPlan : OrganizationBuyPlan,
            CreditTransfer : CreditTransfer,
        },data);

        res.status(200).json({
            code : 200,
        })

    }else{
        res.status(404).json({
            errors : {
                msg : "Type not matched"
            }
        })
    }

    /*await db.transferCredits({
        User : User,
        Organization : Organization,
    },data)*/

  } catch (error) {
    console.log(error);
    utils.handleError(res, error)
  }
}
