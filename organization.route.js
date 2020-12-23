const controller = require('../controllers/organizations')
const validate = require('../controllers/organizations.validate')
const AuthController = require('../controllers/auth')
const express = require('express')
const router = express.Router()
require('../../config/passport-organization')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

/*
 * Organizations routes
 */

/*
 * Get items route
 */

router.post(
  '/onboard-organization',
  trimRequest.all,
  validate.validateOrganization,
  controller.createOrganization
)

router.post(
  '/prepare-organization',
  trimRequest.all,
  validate.validateOrganization,
  controller.prepareOrganization
)

router.post(
  '/organization-login',
  trimRequest.all,
  validate.validateLogin,
  controller.login
)
router.post(
  '/edit-org-profile',
  // // *requireAuth,
  // //AuthController.rolleAuthorizationOrganization(['organization']),
  trimRequest.all,
  controller.editProfileOrg
)
router.post(
  '/verify-org-otp',
  trimRequest.all,
  validate.validateOtp,
  controller.verifyOtp
)
router.get(
  '/verify_org/email/:token',
  trimRequest.all,
  // validate.register,
  controller.verifyEmail
)

router.post(
  '/change-password',
  trimRequest.all,
  validate.changePassword,
  controller.changePassword,

)

/*
 * content management route
 */
router.post('/create-content', trimRequest.all, validate.contentManagement, controller.contentManagement)


/*
 * Get content management data with id route getAllContentData
 */
router.get('/get-content/:_id', trimRequest.all, validate.getContentData, controller.getContentData)

/*
 * Get all content management data with id route getAllContentData
 */
router.get('/get-allcontent', trimRequest.all, controller.getAllContentData)

/*
 * content management route
 */
router.post('/create-topic-list', trimRequest.all, validate.CreateTopicList, controller.CreateTopicList)

router.post(
  '/add-user',
  // *requireAuth,
  //AuthController.rolleAuthorizationOrganization(['organization']),
  trimRequest.all,
  validate.register,
  controller.registerUser
)

router.post(
  '/add-user-csv',
  // *requireAuth,
  //AuthController.rolleAuthorizationOrganization(['organization']),
  trimRequest.all,
  // validate.register,
  controller.registerUserCSV
)

router.get(
  '/verify_user/email/:token',
  trimRequest.all,
  // validate.register,
  controller.verifyUserEmail
)

router.get(
  '/get-all-user',
  // *requireAuth,
  // //AuthController.rolleAuthorizationOrganization(['organization']),
  trimRequest.all,
  controller.GetAllUser
)

router.get(
  '/get-subscription-plan',
  // *requireAuth,
  // //AuthController.rolleAuthorizationOrganization(['organization']),
  trimRequest.all,
  controller.GetSubscriptionPlan
)

router.post(
  '/stripe-webhooks',
  trimRequest.all,
  controller.stripeWebhooks
)

router.post(
  '/buy-subscription-plan',
  //// *requireAuth,
  // //AuthController.rolleAuthorizationOrganization(['organization']),
  trimRequest.all,
  controller.buyOrganizationSubscription
)
router.get('/get-single-user/:_id',
  // *requireAuth,
  //AuthController.rolleAuthorizationOrganization(['organization']),
  trimRequest.all,
  controller.getSingleUser
)
router.get('/get-organization-subscription/:_id',
  // // *requireAuth,
  // //AuthController.rolleAuthorizationOrganization(['organization']),
  trimRequest.all,
  controller.GetOrganizationSubscription
)
router.get('/get-all-user-credits/:_id',
  // *requireAuth,
  //AuthController.rolleAuthorizationOrganization(['organization']),
  trimRequest.all,
  controller.GetAllUserCredits
)

router.get('/get-all-users',
  // *requireAuth,
  //AuthController.rolleAuthorizationOrganization(['organization']),
  trimRequest.all,
  controller.GetAllUserWithOutPagination
)

router.get('/about-us',
  trimRequest.all,
  controller.aboutUs
)

router.get('/how-its-works',
  trimRequest.all,
  controller.howItsWorks
)

router.get('/terms',
  trimRequest.all,
  controller.terms
)
router.post('/home/content',
  trimRequest.all,
  controller.homeContent
)
router.get('/faq',
  trimRequest.all,
  controller.faq
)


router.post('/transfer/credits/to/users',
  // *requireAuth,
  //AuthController.rolleAuthorizationOrganization(['organization']),
  trimRequest.all,
  controller.transferCredits
)
router.post('/contact-us',
  // // *requireAuth,
  // //AuthController.rolleAuthorizationOrganization(['organization']),
  trimRequest.all,
  controller.Contact_Us
)



module.exports = router
