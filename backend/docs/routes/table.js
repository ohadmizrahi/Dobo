/**
* @swagger
* /api/table:
*   get:
*     summary: Get virtual table information
*     tags: [Table]
*     parameters:
*           - in: header
*             name: Authorization
*             required: true
*             description: Account JWT Token received after logged in
*             schema:
*                 type: string
*                 format: JWT
*             example: Bearer <token>
*
*           - in: header
*             name: clienttoken
*             required: true
*             description: Client JWT Token received after join to virtual table
*             schema:
*                 type: string
*                 format: JWT
*             example: <token>
*     security:
*           - $ref: '#/components/securitySchemes/bearerAuth'
*     responses:
*       200:
*         description: Virtual table information
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                 virtualTable:
*                   type: object
*                 orders:
*                   type: array
*                   items:
*                     type: object
*                 clients:
*                   type: array
*                   items:
*                     type: object
*       400:
*         description: Bad request - Client token is required
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*       401:
*         description: Unauthorized
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*       403:
*         description: Forbidden
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*       404:
*         description: Virtual table not found
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*       500:
*         description: An error occurred during searching table
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
* /api/table/join:
*   post:
*     summary: Open a new table or join an existing table
*     tags: [Table]
*     description: Open a new table or join an existing table with the provided details
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
*         required: true
*         content:
*             application/json:
*                 schema:
*                    type: object
*                    properties:
*                       businessId:
*                             type: string
*                       tableId:
*                             type: string
*     responses:
*         200:
*             description: Table opened or joined successfully
*             content:
*                 application/json:
*                     schema:
*                         type: object
*                         properties:
*                             success:
*                                 type: boolean
*                             message:
*                                 type: string
*                             operation:
*                                 type: string
*                             virtualTable:
*                                 type: object
*                             client:
*                                 type: object
*                             menu:
*                                 type: array
*                                 items:
*                                     type: object
*         400:
*             description: Bad request - Account is already logged in to an existing table
*             content:
*                 application/json:
*                     schema:
*                         type: object
*                         properties:
*                             success:
*                                 type: boolean
*                             message:
*                                 type: string
*                             virtualTableId:
*                                 type: string
*         401:
*             description: Unauthorized
*             content:
*                 application/json:
*                     schema:
*                         type: object
*                         properties:
*                             message:
*                                 type: string
*         403:
*             description: Forbidden
*             content:
*                 application/json:
*                     schema:
*                         type: object
*                         properties:
*                             message:
*                                 type: string
*         500:
*             description: An error occurred during open or join table
*             content:
*                 application/json:
*                     schema:
*                         type: object
*                         properties:
*                             error:
*                                 type: string
*/

/**
* @swagger
* /api/table/auth/refresh:
*   get:
*     summary: Refresh client token
*     tags: [Table]
*     description: Refresh client token with the token for refresh
*     parameters:
*           - in: header
*             name: Authorization
*             required: true
*             description: Client JWT Token received after joined table
*             schema:
*                 type: string
*                 format: JWT
*             example: Bearer <token
*           - in: header
*             name: clienttoken
*             required: true
*             description: Client JWT Token received after join to virtual table
*             schema:
*                 type: string
*                 format: JWT
*             example: <token>
*     security:
*           - $ref: '#/components/securitySchemes/bearerAuth'
*     responses:
*         200:
*             description: Token refresh successful
*             content:
*                 application/json:
*                     schema:
*                         type: object
*                         properties:
*                             success:
*                                 type: boolean
*                             token:
*                                 type: string
*                             tokenForRefresh:
*                                 type: string
*                             message:
*                                 type: string
*         400:
*             description: Client token is required
*             content:
*                 application/json:
*                     schema:
*                         type: object
*                         properties:
*                             message:
*                                 type: string
*         401:
*             description: Token refresh failed
*             content:
*                 application/json:
*                     schema:
*                         type: object
*                         properties:
*                             success:
*                                 type: boolean
*                             message:
*                                 type: string
*         403:
*             description: Invalid client token
*             content:
*                 application/json:
*                     schema:
*                         type: object
*                         properties:
*                             message:
*                                 type: string
*         500:
*             description: An error occurred during token refresh
*             content:
*                 application/json:
*                     schema:
*                         type: object
*                         properties:
*                             error:
*                                 type: string
*/

/**
* @swagger
* /api/table/order:
*   post:
*     summary: Receieve orders for sending to business
*     description: Receieve orders for sending to business
*     tags: [Table]
*     security:
*       - $ref: '#/components/securitySchemes/bearerAuth'
*     parameters:
*       - in: header
*         name: Authorization
*         required: true
*         description: Client JWT Token received after joining table
*         schema:
*           type: string
*           format: JWT
*         example: Bearer <token>
*       - in: header
*         name: clienttoken
*         required: true
*         description: Client JWT Token received after join to virtual table
*         schema:
*           type: string
*           format: JWT
*         example: <token>
*     requestBody:
*         required: true
*         content:
*             application/json:
*                 schema:
*                    type: object
*                    properties:
*                       orders:
*                         type: array
*                         items:
*                           properties:
*                             itemId:
*                               type: string
*                             itemName:
*                               type: string
*                             clients:
*                               type: array
*                               items:
*                                 type: string
*                             price:
*                               type: number
*     responses:
*       200:
*         description: Order added to table queu
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                 virtualTable:
*                   type: string
*                 message:
*                   type: string
*       400:
*         description: Bad Request
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                 message:
*                   type: string
*         401:
*             description: Unauthorized
*             content:
*                 application/json:
*                     schema:
*                         type: object
*                         properties:
*                             message:
*                                 type: string
*       403:
*         description: Client is forbidden
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*       500:
*         description: An error occurred during retrieving client check.
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
* /api/table/check/calculate:
*   get:
*     summary: Calculate check for client
*     description: Calculate check for client
*     tags: [Table]
*     security:
*       - $ref: '#/components/securitySchemes/bearerAuth'
*     parameters:
*       - in: header
*         name: Authorization
*         required: true
*         description: Client JWT Token received after joining table
*         schema:
*           type: string
*           format: JWT
*         example: Bearer <token>
*       - in: header
*         name: clienttoken
*         required: true
*         description: Client JWT Token received after join to virtual table
*         schema:
*           type: string
*           format: JWT
*         example: <token>
*     responses:
*       200:
*         description: Client check retrieved successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                 clientBalance:
*                   type: number
*                 clientOrders:
*                   type: array
*                   items:
*                     $ref: '#/components/schemas/Order'
*                 message:
*                   type: string
*       400:
*         description: Insufficient balance
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                 clientBalance:
*                   type: number
*                 message:
*                   type: string
*       403:
*         description: Client is forbidden
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*       404:
*         description: No orders
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                 ordersCount:
*                   type: number
*                 message:
*                   type: string
*       500:
*         description: An error occurred during retrieving client check.
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
* /api/table/check/recalculate:
*   post:
*     summary: Update check calculation for client
*     description: Update check calculation for client after removing orders
*     tags: [Table]
*     security:
*       - $ref: '#/components/securitySchemes/bearerAuth'
*     parameters:
*       - in: header
*         name: Authorization
*         required: true
*         description: Client JWT Token received after joining table
*         schema:
*           type: string
*           format: JWT
*         example: Bearer <token>
*       - in: header
*         name: clienttoken
*         required: true
*         description: Client JWT Token received after join to virtual table
*         schema:
*           type: string
*           format: JWT
*         example: <token>
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               orders:
*                 type: array
*                 items:
*                   $ref: '#/components/schemas/Order'
*     responses:
*       200:
*         description: Client check retrieved successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                 clientBalance:
*                   type: number
*                 clientOrders:
*                   type: array
*                   items:
*                     $ref: '#/components/schemas/Order'
*                 message:
*                   type: string
*       400:
*         description: Insufficient balance
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                 failedOrders:
*                   type: number
*                 message:
*                   type: string
*       403:
*         description: Client is forbidden
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*       404:
*         description: No orders
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                 ordersCount:
*                   type: number
*                 message:
*                   type: string
*       500:
*         description: An error occurred during retrieving client check.
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
* /api/table/check/pay:
*   post:
*     summary: Pay client check
*     description: Pay client check and update client balance and orders in virtual table and client account and close virtual table if last client
*     tags: [Table]
*     security:
*       - $ref: '#/components/securitySchemes/bearerAuth'
*     parameters:
*       - in: header
*         name: Authorization
*         required: true
*         description: Client JWT Token received after joining table
*         schema:
*           type: string
*           format: JWT
*         example: Bearer <token>
*       - in: header
*         name: clienttoken
*         required: true
*         description: Client JWT Token received after join to virtual table
*         schema:
*           type: string
*           format: JWT
*         example: <token>
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               orders:
*                 type: array
*                 items:
*                   $ref: '#/components/schemas/Order'
*     responses:
*       200:
*         description: Client check paid successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                 clientBalance:
*                   type: number
*                 clientOrders:
*                   type: array
*                   items:
*                     $ref: '#/components/schemas/Order'
*                 message:
*                   type: string
*       400:
*         description: Some of the client orders cant be paid - client not found
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                 message:
*                   type: string
*                 failedOrders:
*                   type: array
*                   items:
*                       $ref: '#/components/schemas/Order'

*       403:
*         description: Client is forbidden
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*       404:
*         description: No orders
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                 ordersCount:
*                   type: number
*                 message:
*                   type: string
*       500:
*         description: An error occurred during retrieving client check.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*/