/**
* @swagger
* /api/auth/signup:
*    post:
*      summary: Create user account
*      tags: [Auth]
*      description: Create a new user account with the provided details
*      requestBody:
*          required: true
*          content:
*             application/json:
*                 schema:
*                    type: object
*                    properties:
*                       name:
*                             type: string
*                       email:
*                             type: string
*                       phone:
*                             type: string
*                       address:
*                            type: string
*                       birthday:
*                            type: string
*                       password:
*                            type: string
*      responses:
*          201:
*              description: Signup successful - Account created
*              content:
*                  application/json:
*                      schema:
*                          type: object
*                          properties:
*                              success:
*                                  type: boolean
*                              token:
*                                  type: string
*                                  description: JWT token
*                              tokenForRefresh:
*                                  type: string
*                                  description: JWT token for refresh
*                              message:
*                                  type: string
*          400:
*             description: Invalid input
*             content:
*                  application/json:
*                      schema:
*                          type: object
*                          properties:
*                              error:
*                                  type: string
*                              input:
*                                  type: object
*          409:
*             description: Signup failed - Account already exists
*             content:
*                  application/json:
*                      schema:
*                          type: object
*                          properties:
*                              success:
*                                  type: boolean
*                              username:
*                                  type: string
*                              message:
*                                  type: string
*          500:
*             description: An error occurred during signup
*             content:
*                  application/json:
*                      schema:
*                          type: object
*                          properties:
*                              error:
*                                  type: string
*/