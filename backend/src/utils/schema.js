function validateSchema(schema, data) {
    const invalidFields = [];
    Object.keys(data).forEach(key => {
        if (!(schema.includes(key))) {
            invalidFields.push(key);
        }
    });
    return invalidFields;
}

module.exports = {
    validateSchema
}