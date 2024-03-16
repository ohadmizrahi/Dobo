/**
* @swagger
* /api/business/info:
*   post:
*     summary: Get business info
*     tags: [Business]
*     description: Get business info by business id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               businessId:
*                 type: string
*     responses:
*       200:
*         description: Business info retrieved successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Business'

*       404:
*         description: Business not found
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                 businessId:
*                   type: string
*       500:
*         description: Internal server error
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*/

/**
* @swagger
* /api/business/reservation:
*   post:
*     summary: Reserve a table
*     tags: [Business]
*     description: Reserve a table in a business
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
*               businessId:
*                 type: string
*               date:
*                 type: string
*                 format: date
*               time:
*                 type: string
*                 format: time
*               numOfPeople:
*                 type: number
*               preference:
*                 type: string
*               specialRequests:
*                 type: string
*     responses:
*       200:
*         description: Table reserved successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                 reservation:
*                   type: object
*                   properties:
*                     reservationId:
*                       type: string
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
*         description: Table reservation failed - No available tables
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                 request:
*                   $ref: '#/components/schemas/ReservationReq'
*       500:
*         description: Internal server error
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*/