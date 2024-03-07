/**
 * @openapi
 * components:
 *  schemas:
 *    SignUpUserInput:
 *      type: object
 *      required:
 *        - firstname
 *        - surname
 *        - email
 *        - password
 *        - phonenumber
 *      properties:
 *        firstname:
 *          type: string
 *          default: Jane
 *        surname:
 *          type: string
 *          default: Doe
 *        email:
 *          type: string
 *          default: janedoe@gmail.com
 *        password:
 *          type: string
 *          default: jJD79r4norgDo489nbo4-
 *        phonenumber:
 *          type: string
 *          default: 0245193416
 *    SignUpResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          default: "wallet user created"
 *        status:
 *          type: string
 *          default: "success"
 *        data:
 *          type: string
 *          default:
 *    UserExistsResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          default: "user already exists!"
 *        status:
 *          type: string
 *          default: "error"
 *          data:
 *            type: object
 *            default:
 *    BadRequestResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          default: "Invalid input!"
 *        status:
 *          type: string
 *          default: "error"
 *          data:
 *            type: object
 *            default:
 *    ServerErrorResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          default: "An Error has Occurred!"
 *        status:
 *          type: string
 *          default: "error"
 *          data:
 *            type: object
 *            default:
 *    LogInUserInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: janedoe@gmail.com
 *        password:
 *          type: string
 *          default: jJD79r4norgDo489nbo4-
 *    LogInUserResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          default: "login success"
 *        status:
 *          type: string
 *          default: "success"
 *          data:
 *            type: object
 *            default:
 *    BadLogInRequestResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          default: "Invalid email or password!"
 *        status:
 *          type: string
 *          default: "error"
 *          data:
 *            type: object
 *            default: 
 */

