/**
* @swagger
* /api/home/:
*   post:
*     summary: Get businesses data forh home page
*     tags: [Home]
*     description: Get businesses data splitted to groups of sections for home page
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               groups:
*                 type: array
*                 description: Array of sections names to group by
*                 enum: [recommend, name, new]
*                 items:
*                   type: string
*               order:
*                 type: string
*               limit:
*                 type: number
*               offset:
*                 type: number
*     responses:
*       200:
*         description: Businesses data retrieved successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                 groups:
*                   type: object
*                   properties:
*                     recommend:
*                       type: array
*                       items:
*                         $ref: '#/components/schemas/Business'
*                     name:
*                       type: array
*                       items:
*                         $ref: '#/components/schemas/Business'
*                     new:
*                       type: array
*                       items:
*                         $ref: '#/components/schemas/Business'
*       400:
*         description: Invalid input - groups are invalid
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                 failedGroups:
*                   type: array
*                   items:
*                     type: string
*                 groups:
*                   type: object
*                   properties:
*                     recommend:
*                       type: array
*                       items:
*                         $ref: '#/components/schemas/Business'
*                     name:
*                       type: array
*                       items:
*                         $ref: '#/components/schemas/Business'
*                     new:
*                       type: array
*                       items:
*                         $ref: '#/components/schemas/Business'
*       500:
*         description: An error occurred during businesses data retrieval
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*/