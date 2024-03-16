/**
* @swagger
* /api/profile:
*   get:
*     summary: Get profile information
*     tags: [Profile]
*     description: Get profile information by username
*     parameters:
*           - in: header
*             name: Authorization
*             required: true
*             description: Account JWT Token received after logged in
*             schema:
*                 type: string
*                 format: JWT
*             example: Bearer <token>
*     security:
*           - $ref: '#/components/securitySchemes/bearerAuth'
*     responses:
*       200:
*         description: Profile retrieved successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Profile'
*
*       401:
*         description: Unauthorized - Invalid account token
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*       403:
*         description: Forbbiden - Invalid account token
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*       404:
*         description: Account not found
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*       500:
*         description: Internal server error
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*/

/**
* @swagger
* /api/profile/update/account:
*   post:
*     summary: Update account details
*     tags: [Profile]
*     description: Update account details by username
*     parameters:
*           - in: header
*             name: Authorization
*             required: true
*             description: Account JWT Token received after logged in
*             schema:
*                 type: string
*                 format: JWT
*             example: Bearer <token>
*     security:
*           - $ref: '#/components/securitySchemes/bearerAuth'
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               fullName:
*                 type: string
*               phoneNumber:
*                 type: string
*               address:
*                 type: string
*               birthDate:
*                 type: string
*                 format: date
*     responses:
*       200:
*         description: Account updated successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                 updatedFields:
*                   type: object
*       400:
*         description: Bad request - Invalid fields
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                 invalidFields:
*                   type: object
*       401:
*         description: Unauthorized - Invalid account token
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*       403:
*         description: Forbbiden - Invalid account token
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*       404:
*         description: Account not found
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*       500:
*         description: Internal server error
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*/

/**
* @swagger
* /api/profile/update/payment-method:
*   post:
*     summary: Update or create payment method
*     tags: [Profile]
*     description: Update or create payment method by username
*     parameters:
*           - in: header
*             name: Authorization
*             required: true
*             description: Account JWT Token received after logged in
*             schema:
*                 type: string
*                 format: JWT
*             example: Bearer <token>
*     security:
*           - $ref: '#/components/securitySchemes/bearerAuth'
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               cardNumber:
*                 type: string
*               experationDate:
*                 type: string
*                 format: date
*               cvv:
*                 type: string
*               citizenId:
*                 type: string
*               type:
*                 type: string
*     responses:
*       200:
*         description: Payment method updated successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                 updatedFields:
*                   type: object
*       400:
*         description: Invalid fields
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                 invalidFields:
*                   type: object
*       401:
*         description: Unauthorized - Invalid account token
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*       403:
*         description: Forbbiden - Invalid account token
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*       404:
*         description: Payment Method not found
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*       409:
*         description: Payment method for this user already exists
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*       500:
*         description: Internal server error
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*/

/**
* @swagger
* /api/profile/update/password:
*   post:
*     summary: Update user password
*     tags: [Profile]
*     description: Update user password by username
*     parameters:
*           - in: header
*             name: Authorization
*             required: true
*             description: Account JWT Token received after logged in
*             schema:
*                 type: string
*                 format: JWT
*             example: Bearer <token>
*     security:
*           - $ref: '#/components/securitySchemes/bearerAuth'
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               password:
*                 type: string
*               resetPasswordToken:
*                 type: string
*                 description: Token received after reset password request
*                 format: JWT
*     responses:
*       200:
*         description: Password updated successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                 updatedFields:
*                   type: object
*       400:
*         description: Invalid fields
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                 invalidFields:
*                   type: object
*       401:
*         description: Unauthorized - Invalid account token
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*       403:
*         description: Forbbiden - Invalid account token
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*       404:
*         description: Account not found
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*       500:
*         description: Internal server error
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*/