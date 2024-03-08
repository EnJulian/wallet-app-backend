/**
 * @openapi
 * components:
 *  schemas:
 *    AccountBalanceResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          default: "current account balance"
 *        status:
 *          type: string
 *          default: "success"
 *        data:
 *          type: object
 *          properties:
 *              dollars:
 *                type: interger
 *                default: 0
 *              naira:
 *                type: integer
 *                default: 0
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
 *    UnauthorizedErrorResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          default: "Kindly log in!"
 *        status:
 *          type: string
 *          default: "error"
 *          data:
 *            type: object
 *            default:
 *    AuthenticationSchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *        
 * 
 * 
 */


