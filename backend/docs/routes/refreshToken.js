/**
* @swagger
* /api/auth/token/refresh:
*   get:
*       summary: Refresh Token when exisiting expired
*       tags: [Auth]
*       description: Receive token verify it and return new token and refresh token
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
*               description: Token refresh successful
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
*                               tokenForRefresh:
*                                   type: string
*                                   description: JWT token for refresh
*                               message:
*                                   type: string
*
*           401:
*               description: Token refresh failed
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
*               description: An error occurred during token refresh
*               content:
*                   application/json:
*                       schema:
*                           type: object
*                           properties:
*                               error:
*                                   type: string
*/