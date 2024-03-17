/**
 * @swagger
 * /api/auth/signin:
 *     post:
 *      summary: Authenticate user
 *      tags: [Auth]
 *      description: Receive username and password, check if they are correct, and return token and refresh token
 *      requestBody:
 *         required: true
 *         content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          200:
 *              description: Authentication successful
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              authenticated:
 *                                  type: boolean
 *                              token:
 *                                  type: string
 *                                  description: JWT token
 *                              tokenForRefresh:
 *                                  type: string
 *                                  description: JWT token for refresh
 *                              message:
 *                                  type: string
 *          401:
 *             description: Unauthorized - Authentication failed
 *             content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              authenticated:
 *                                  type: boolean
 *                              message:
 *                                  type: string
 *          500:
 *             description: An error occurred during authentication
 *             content:
 *                  application/json:
*                       schema:
 *                          type: object
 *                          properties:
 *                             error:
 *                                 type: string
 */