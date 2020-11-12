const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { check, validationResult } = require('express-validator/check');

const pluginCreatedUpdated = require('mongoose-createdat-updatedat');
const mongoosePagination = require('mongoose-paginate');

const permissions = require('./../components/permissions');

const SUPPLIER_VALIDATION_REGEX_DICT = {
    //Doesn't work for some RFCs
    // RFC: "^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$",
    
    //The regex that SAT uses on its site: https://portalsat.plataforma.sat.gob.mx/ConsultaRFC/
    RFC: "^(([A-ZÑ&]{3})([0-9]{2})([0][13578]|[1][02])(([0][1-9]|[12][\\d])|[3][01])([A-Z0-9]{3}))|"
    + "(([A-ZÑ&]{3})([0-9]{2})([0][13456789]|[1][012])(([0][1-9]|[12][\\d])|[3][0])([A-Z0-9]{3}))|"
    + "(([A-ZÑ&]{3})([02468][048]|[13579][26])[0][2]([0][1-9]|[12][\\d])([A-Z0-9]{3}))|"
    + "(([A-ZÑ&]{3})([0-9]{2})[0][2]([0][1-9]|[1][0-9]|[2][0-8])([A-Z0-9]{3}))|"
    + "(([A-ZÑ&]{4})([0-9]{2})([0][13578]|[1][02])(([0][1-9]|[12][\\d])|[3][01])([A-Z0-9]{3}))|"
    + "(([A-ZÑ&]{4})([0-9]{2})([0][13456789]|[1][012])(([0][1-9]|[12][\\d])|[3][0])([A-Z0-9]{3}))|"
    + "(([A-ZÑ&]{4})([02468][048]|[13579][26])[0][2]([0][1-9]|[12][\\d])([A-Z0-9]{3}))|"
    + "(([A-ZÑ&]{4})([0-9]{2})[0][2]([0][1-9]|[1][0-9]|[2][0-8])([A-Z0-9]{3}))$"

};

var optionalWithLength = function(minLength, maxLength) {
    minLength = minLength || 0;
    maxLength = maxLength || Infinity;
    let rfc = "";
    return {

        validator : function(value) {
            rfc = this.rfc;
            if (value === undefined) return true;
            return value.length >= minLength && value.length <= maxLength;
        },
        message :  props => 'El campo nombre de Proveedor debe tener caracteres como minimo: (' + minLength + ') y maximo: (' + maxLength + '), esta es la RFC: ' + rfc
    }
}

/**
 * Schema de Mongoose para el modelo Supplier.
 * @type {mongoose.Schema}
 */
let SupplierSchema = new Schema({
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        required: [true, "Falta la organización"]
    },
    name: {
        type: String,
        //required: [true, "Falta el nombre de la organización"],
        min: 2,
        max: 100,
        validate: optionalWithLength(2, 100)
    },
    rfc: {
        type: String,
        required: [true, "Falta la RFC"],
        min: 2,
        max: 100
    },
    notes: {
        type: String
    },
    deleted: require("./schemas/deleted.schema").Deleted
});

//Agregar createdAt, modifiedAt automáticamente
SupplierSchema.plugin(pluginCreatedUpdated);

//Paginación
SupplierSchema.plugin(mongoosePagination);

//Clase del modelo Supplier.
class SupplierClass {
    constructor() {

    }
}

//Cargar class en Schema
SupplierSchema.loadClass(SupplierClass);

//Indexes
SupplierSchema.index({name: 1, organization: 1, deleted: 1}, {unique: true});
// SupplierSchema.index({rfc: 1, organization: 1, deleted: 1}, {unique: true, partialFilterExpression: {rfc: {$exists:true }}});

SupplierSchema.statics.permission = permissions.getDefault("Supplier");

SupplierSchema.statics.expressValidator = function() {

    //For a list of available validators, check:
    //https://github.com/chriso/validator.js#validators

    //For more information about express-validator:
    //https://express-validator.github.io/docs/

    return [
        // check('rfc').matches(/^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/).withMessage('Verifica que el RFC es válido')
        // check('rfc', 'Verifica que el RFC es válido').optional({ checkFalsy: true }).matches(new RegExp(SUPPLIER_VALIDATION_REGEX_DICT.RFC))
        //Some examples:
        // check('email').isEmail(),
        // check('type').isIn(allowedTypes),
        // check('name').isEmpty()
    ]
};

const Supplier = mongoose.model('Supplier', SupplierSchema);

module.exports = {
    Supplier,
    SUPPLIER_VALIDATION_REGEX_DICT
};
