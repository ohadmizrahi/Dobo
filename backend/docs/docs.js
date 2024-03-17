require('dotenv').config();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const PORT = process.env.BE_PORT

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'API for Dobo Mobile App',
      description: 'This is a REST API application for supporting the Dobo Mobile App',
      version: '1.0.0',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server',
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Business: {
          type: 'object',
          properties: {
            businessId: {
              type: 'string'
            },
            name: {
              type: 'string'
            },
            address: {
              type: 'string'
            },
            city: {
              type: 'string'
            },
            rank: {
              type: 'number'
            },
            description: {
              type: 'string'
            },
            imageUrl: {
              type: 'string'
            }
          }
        },
        ReservationReq: {
          type: 'object',
          properties: {
            businessId: {
              type: 'string'
            },
            date: {
              type: 'string',
              format: 'date'
            },
            time: {
              type: 'string',
              format: 'time'
            },
            numOfPeople: {
              type: 'number'
            },
            type: {
              type: 'string'
            },
            specialRequests: {
              type: 'string'
            }
          }
      },
      Profile: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              account: {
                type: 'object',
                properties: {
                  accountid: {
                    type: 'string'
                  },
                  fullname: {
                    type: 'string'
                  },
                  phonenumber: {
                    type: 'string'
                  },
                  address: {
                    type: 'string'
                  },
                  birthdate: {
                    type: 'string',
                    format: 'date'
                  },
                  email: {
                    type: 'string'
                  },
                  password: {
                    type: 'string'
                  },
                  imageUrl: {
                    type: 'string'
                  }
                }
              },
              paymentsMethod: {
                type: 'object',
                properties: {
                  cardNumber: {
                    type: 'string'
                  },
                  experationDate: {
                    type: 'string',
                    format: 'date'
                  },
                  cvv: {
                    type: 'string'
                  },
                  citizenId: {
                    type: 'string'
                  },
                  type: {
                    type: 'string'
                  }
                }
              },
              reservations: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    reservationid: {
                      type: 'string'
                    },
                    reservationdate: {
                      type: 'string',
                      format: 'date'
                    },
                    reservationtime: {
                      type: 'string',
                      format: 'time'
                    },
                    numberofpeople: {
                      type: 'number'
                    },
                    type: {
                      type: 'string'
                    },
                    businessname: {
                      type: 'string'
                    },
                    businesscity: {
                      type: 'string'
                    },
                    businessaddress: {
                      type: 'string'
                    },
                  }
                }
              }
            }
          }
        }
      },
      Order: {
  
    }
  }
    }
  };
  
  const options = {
    swaggerDefinition,
    apis: [
      './docs/routes/*.js'
    ]
  };
  
  const swaggerSpec = swaggerJSDoc(options);

  module.exports = {
    swaggerUi,
    swaggerSpec
  }