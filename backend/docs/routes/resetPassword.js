/**
* @swagger
* /api/auth/token/reset-password:
*   get:
*       summary: Generate reset password token
*       tags: [Auth]
*       description: Generate a token for reset password
*       parameters:
*           - in: header
*             name: Authorization
*             required: true
*             description: Account JWT Token received after logged in
*             schema:
*                 type: string
*                 format: JWT
*             example: Bearer <token>
*       security:
*           - $ref: '#/components/securitySchemes/bearerAuth'
*       responses:
*           200:
*               description: Token creation successful
*               content:
*                   application/json:
*                       schema:
*                           type: object
*                           properties:
*                               success:
*                                   type: boolean
*                               token:
*                                   type: string
*                                   description: JWT token
*                               message:
*                                   type: string
*
*           401:
*               description: Token creation failed
*               content:
*                   application/json:
*                       schema:
*                           type: object
*                           properties:
*                               success:
*                                   type: boolean
*                               message:
*                                   type: string
*           403:
*               description: Invalid client token
*               content:
*                   application/json:
*                       schema:
*                           type: object
*                           properties:
*                               message:
*                                   type: string
*           500:
*               description: An error occurred during token creation
*               content:
*                   application/json:
*                       schema:
*                           type: object
*                           properties:
*                               error:
*                                   type: string
*/