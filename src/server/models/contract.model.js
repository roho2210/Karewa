const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {check, validationResult} = require('express-validator/check');

const pluginCreatedUpdated = require('mongoose-createdat-updatedat');
const mongoosePagination = require('mongoose-paginate');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const utils = require('../components/utils');
const permissions = require('./../components/permissions');
const logger = require('./../components/logger').instance;

// const importLazy = require('import-lazy')(require);

var valdateTotalOrMaxAmount = function() {
    let contractId = "";
    return {
        validator: function (v) {
            contractId = this.contractId
            if (this.contractType == 'OPEN') {
                return this.maxAmount ? this.maxAmount == v : true;
            } else if (this.contractType == 'NORMAL') {
                return this.totalAmount ? this.totalAmount == v : true;
            }
            return true;
        },
        message: props => `El valor del campo Monto total es incorrrecto. Por favor, verifica los montos y el tipo de contrato, ID del contrato: `+ contractId
    }
}

const procedureTypesEnumDict = {
    'PUBLIC': [
        {
            regexStr: utils.toAccentsRegex('licitacion', null, true),
            flags: 'gi'
        },
        {
            regexStr: utils.toAccentsRegex('public(a|o)', null, true),
            flags: 'gi'
        },
        // utils.toAccentsRegex('publico', 'gi')
    ],
    'NO_BID': [
        {
            regexStr: utils.toAccentsRegex('adj\.?( directa)?', null, true),
            flags: 'gi'
        },
        {
            regexStr: utils.toAccentsRegex('adjudicacion( directa)?', null, true),
            flags: 'gi'
        },
        // utils.toAccentsRegex('adj\.?( directa)?', 'gi'),
        // utils.toAccentsRegex('adjudicacion( directa)?', 'gi')
    ],
    'INVITATION': [
        {
            regexStr: utils.toAccentsRegex('invitacion', null, true),
            flags: 'gi'
        },
        {
            regexStr: utils.toAccentsRegex('proveedores', null, true),
            flags: 'gi'
        },
        // utils.toAccentsRegex('invitacion', 'gi'),
        // utils.toAccentsRegex('proveedores', 'gi')
    ]
};

// const procedureTypesEnum = [
//     'PUBLIC',
//     'NO_BID',
//     'INVITATION'
// ];
const procedureTypesEnum = Object.keys(procedureTypesEnumDict);


const categoryEnumDict = {
    'EXTENSION': [
        {
            regexStr: utils.toAccentsRegex('extension', null, true),
            flags: 'gi'
        },
        {
            regexStr: utils.toAccentsRegex('ampliacion', null, true),
            flags: 'gi'
        },
    ],
    'MODIFICACION': [
        {
            regexStr: utils.toAccentsRegex('modifica(torio(s)?|cion(es)?)', null, true),
            flags: 'gi'
        },
    ],
    'ADENDUM': [
        {
            regexStr: utils.toAccentsRegex('adendum', null, true),
            flags: 'gi'
        },
    ],
    'ACQUISITION': [
        {
            regexStr: utils.toAccentsRegex('adquisicion(es)?', null, true),
            flags: 'gi'
        },
    ],
    'SERVICES': [
        {
            regexStr: utils.toAccentsRegex('servicio(s)?', null, true),
            flags: 'gi'
        },
    ],
    'LEASE': [
        {
            regexStr: utils.toAccentsRegex('arrendamiento(s)?', null, true),
            flags: 'gi'
        },
    ],
    'PUBLIC_WORKS': [
        {
            regexStr: utils.toAccentsRegex('obra(s)? publica(s)?', null, true),
            flags: 'gi'
        },
    ],
    'NULL': [
        {
            regexStr: utils.toAccentsRegex('^(null)?(undefined)?$', null, true),
            flags: 'gi'
        },
    ]
};

// const categoryEnum = [
//     'EXTENSION',
//     'MODIFICACION',
//     'ADENDUM',
//     'ACQUISITION',
//     'SERVICES',
//     'LEASE',
//     'PUBLIC_WORKS'
// ];
const categoryEnum = Object.keys(categoryEnumDict);


// const procedureStateEnum = [
//     'CONCLUDED',
//     'CANCELED',
//     'DESERTED',
//     'IN_PROGRESS',
// ];

const procedureStateEnumDict = {
    'CONCLUDED': [
        {
            regexStr: utils.toAccentsRegex('concluido(s)?', null, true),
            flags: 'gi'
        },
        {
            regexStr: utils.toAccentsRegex('finalizado(s)?', null, true),
            flags: 'gi'
        },
        {
            regexStr: utils.toAccentsRegex('terminado(s)?', null, true),
            flags: 'gi'
        },
    ],
    'CANCELED': [
        {
            regexStr: utils.toAccentsRegex('cancelado(s)?', null, true),
            flags: 'gi'
        },
        {
            regexStr: utils.toAccentsRegex('abortado(s)?', null, true),
            flags: 'gi'
        },
    ],
    'DESERTED': [
        {
            regexStr: utils.toAccentsRegex('desertado(s)?', null, true),
            flags: 'gi'
        },
        {
            regexStr: utils.toAccentsRegex('desierto', null, true),
            flags: 'gi'
        },
        {
            regexStr: utils.toAccentsRegex('abandonado(s)?', null, true),
            flags: 'gi'
        },
    ],
    'IN_PROGRESS': [
        {
            regexStr: utils.toAccentsRegex('en (proceso|progreso)', null, true),
            flags: 'gi'
        },
    ],
    'NULL': [
        {
            regexStr: utils.toAccentsRegex('^(null)?(undefined)?$', null, true),
            flags: 'gi'
        },
    ]
};


// const procedureStateEnum = [
//     'CONCLUDED',
//     'CANCELED',
//     'DESERTED',
//     'IN_PROGRESS',
// ];
const procedureStateEnum = Object.keys(procedureStateEnumDict);


const administrativeUnitTypeEnumDict = {
    'DESCENTRALIZED': [
        {
            regexStr: utils.toAccentsRegex('(no |des)centralizad(a|o)', null, true),
            flags: 'gi'
        },
    ],
    'CENTRALIZED': [
        {
            regexStr: utils.toAccentsRegex('centralizad(a|o)', null, true),
            flags: 'gi'
        },
    ],
};

// const administrativeUnitTypeEnum = [
//     'CENTRALIZED',
//     'DESCENTRALIZED'
// ];
const administrativeUnitTypeEnum = Object.keys(administrativeUnitTypeEnumDict);


// const limitExceededEnum = [
//     'NOT_EXCEEDED',
//     'LIMIT_EXCEEDED'
// ];
const limitExceededEnumDict = {
    'NOT_EXCEEDED': [
        {
            regexStr: utils.toAccentsRegex('no|no excede( el limite)?', null, true),
            flags: 'gi'
        },
    ],
    'LIMIT_EXCEEDED': [
        {
            regexStr: "^[\s]*" + utils.toAccentsRegex('si|excede( el limite)?', null, true),
            flags: 'gi'
        },
    ],
    'NOT_APPLICABLE': [
        {
            regexStr: utils.toAccentsRegex('N(/)?A|no aplicable|no aplica', null, true),
            flags: 'gi'
        },
    ]
};
const limitExceededEnum = Object.keys(limitExceededEnumDict);


const contractTypeEnumDict = {
    'OPEN': [
        {
            regexStr: utils.toAccentsRegex('abiert(o|a)', null, true),
            flags: 'gi'
        },
    ],
    'NORMAL': [
        {
            regexStr: utils.toAccentsRegex('normal|(cerrad(o|a))', null, true),
            flags: 'gi'
        },
    ]
};

// const contractTypeEnum = [
//     'OPEN',
//     'NORMAL'
// ];

const contractTypeEnum = Object.keys(contractTypeEnumDict);

/**
 * Schema de Mongoose para el modelo Contract.
 * @type {mongoose.Schema}
 */



function getProcedureTypesEnumObject(procedureType) {
    switch (procedureType) {
        case 'PUBLIC':
            return {description: "Público", key: "PUBLIC"};
        case 'NO_BID':
            return {description: "Adjudicación directa", key: "NO_BID"};
        case 'INVITATION':
            return {description: "Por Invitación", key: "INVITATION"};
    }
}

getCategoryEnumObject = function (category) {
    switch (category) {
        case 'EXTENSION':
            return {description: "Ampliación", key: "EXTENSION"};
        case 'MODIFICATION':
            return {description: "Modificación", key: "MODIFICATION"};
        case 'ADENDUM':
            return {description: "Adendum", key: "ADENDUM"};
        case 'ACQUISITION':
            return {description: "Adquisición", key: "ACQUISITION"};
        case 'SERVICES':
            return {description: "Servicios", key: "SERVICES"};
        case 'LEASE':
            return {description: "Arrendamiento", key: "LEASE"};
        case 'PUBLIC_WORKS':
            return {description: "Obra Pública", key: "PUBLIC_WORKS"};
        default:
            return {}
    }
}
getProcedureStateEnumObject = function (procedureState) {
    switch (procedureState) {
        case 'CONCLUDED':
            return {description: "Concluído", key: "CONCLUDED"};
        case 'CANCELED':
            return {description: "Cancelado", key: "CANCELED"};
        case 'DESERTED':
            return {description: "Desierto", key: "DESERTED"};
        case 'IN_PROGRESS':
            return {description: "En progreso", key: "IN_PROGRESS"};
    }
}
getAdministrativeUnitTypeEnumObject = function (administrativeUnitType) {
    switch (administrativeUnitType) {
        case 'CENTRALIZED':
            return {description: "Centralizado", key: "CENTRALIZED"};
        case 'DESCENTRALIZED':
            return {description: "Descentralizado", key: "DESCENTRALIZED"};
    }
}
getLimitExceededEnumObject = function (limitExceeded) {
    if (limitExceeded) {
        return {description: "Límite Excedido", key: "LIMIT_EXCEEDED"};
    }
    return {description: "No excedido", key: "NOT_EXCEEDED"};
}
getContractTypeEnumObject = function (contractType) {
    switch (contractType) {

        case 'OPEN':
            return {description: "Abierto", key: "OPEN"};
        case 'NORMAL':
            return {description: "Normal", key: "NORMAL"};
    }
};


const CONTRACT_VALIDATION_REGEX_DICT = {
    ADMINISTRATION: "^[12][0-9]{3}-[12][0-9]{3}$",
    FISCAL_YEAR: "^[12][0-9]{3}$",
    PERIOD: "^[1234]o\\s2[0-9]{3}$",
    URL: "((https?|ftps?)://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|(https?|ftps?)://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})",
};
let contract_working = '';
let ContractSchema = new Schema({

    isEmpty : {
        type : Boolean,
        required : true,
        default : false
    },

    organization: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
    backedUp: {
        type: Boolean,
        required: function(value) {
            return !this.isEmpty;
        },
        default: false
    },
    /* Tipo de procedimiento */
    procedureType: {
        type: String,
        enum: procedureTypesEnum,
        required: [true, "El campo Tipo de procedimiento es requerido"],
        uppercase: true
    },
    /* Materia */
    category: {
        type: String,
        enum: categoryEnum,
        required: [function (value) {
            // console.log('this.empty --> ' + this.empty);
            // console.log('value --> ' + value);
            if(!this.empty){
                return false;
            }
            let descriptionRegExp = utils.toAccentsRegex(this.servicesDescription.toUpperCase(), 'gi');
            return descriptionRegExp.test(this.category);
        }, "El campo Materia es un campo requerido"],
        uppercase: true
    },
    /* Administracion */
    administrationPeriod: {
        type: String,
        required: [true, "El campo Administración es requerido"],
        match: [new RegExp(CONTRACT_VALIDATION_REGEX_DICT.ADMINISTRATION), 'El campo Administración no cumple con el formato esperado. Ejemplo: 2017-2019'],
        default: '2016-2018'
    },
    administrationPeriodFromYear: {
        type: Number,
        required: true,
        default: 2016
    },
    administrationPeriodToYear: {
        type: Number,
        required: true,
        default: 2018
    },
    /* Ejercicio */
    fiscalYear: {
        type: String,
        required: [true, "El campo Ejercicio es requerido"],
        match: [new RegExp(CONTRACT_VALIDATION_REGEX_DICT.FISCAL_YEAR), 'El campo Ejercicio no cumple con el formato esperado. Ejemplo: 2019'],
        //Issue fixed: Eliminar validación de fecha del ejercicio fiscal vs fecha del contrato
        // validate: {
        //     validator: function () {
        //         let yearContractDate = new Date(this.contractDate).getFullYear();
        //         return Number(this.fiscalYear) === yearContractDate
        //     },
        //     message: props => "La Fecha del contrato no corresponde con el Ejercicio"
        // }
    },
    /* Periodo que se reporta */
    period: {
        type: String,
        required: [true, "El campo Periodo es requerido"],
        match: [new RegExp(CONTRACT_VALIDATION_REGEX_DICT.PERIOD), 'El campo Periodo no cumple con el formato esperado. Ejemplo: 1o 2019'],
        //Issue fixed: Eliminar validación de fecha del ejercicio fiscal vs fecha del periodo
        // validate: {
        //     validator: function () {
        //         let yearContractDate = new Date(this.contractDate).getFullYear();
        //         return this.period.includes(String(yearContractDate));
        //     },
        //     message: props => "La Fecha del contrato no corresponde con el Periodo"
        // }
    },
    /* ID / Número de Folio o Nomenclatura / Identificador */
    contractId: {
        type: String,
        //TODO:Definir otro Id aparte que sea karewaId(Pendiente)
        //TODO:Definir el formato que debe llevar el ID(Dejarlo Libre)
    },
    /* Partida */
    partida: {
        type: String
    },
    /* Estado del procedimiento */
    procedureState: {
        type: String,
        enum: procedureStateEnum,
        // required:true,
        required: [ function () {
            if(this.isEmpty){return false}
            let values = Object.values(procedureStateEnumDict);
            let valuesFlat = [];
            values.forEach((value) => {
                let innerValues = [...value];
                innerValues.forEach((item) => {
                    valuesFlat.push(item.regexStr);
                });
            });
            for (let i = 0; i < valuesFlat.length; i++) {
                let isIncluded = new RegExp(valuesFlat[i]).test(this.notes);
                if (isIncluded) {
                    return true;
                }
            }
            return false;

        }, "Este campo es requerido debido a que se indicó un estado de procedimiento en las notas del contrato."],
        // validate: {
        //     validator:function(v){

        //         if(this.isEmpty){
        //             return true
        //         }

        //         if (this.notes && this.notes.length) {
        //             for (let item in procedureStateEnumDict) {
        //                 for (let i = 0; i < procedureStateEnumDict[item].length; i++) {
        //                     let isIncluded = new RegExp(procedureStateEnumDict[item][i].regexStr).test(this.notes);
        //                     if (isIncluded) {
        //                         return item == v;
        //                     }
        //                 }
        //             }
        //         }
        //         return true;
        //     },
        //     message: props => `El valor de este campo no coincide con el estado de procedimiento indicado en las notas del contrato.`

        // },
        uppercase: true
    },
    /*Hipervínculo a la convocatoria o invitaciones*/
    announcementUrl: {
        type: String,
        match: [new RegExp(CONTRACT_VALIDATION_REGEX_DICT.URL), 'El campo Hipervínculo a la convocatoria o invitaciones no cumple con el formato esperado. Ejemplo: www.ejemplo.com']
    },
    announcementUrlBackup: {
        type: Schema.Types.ObjectId,
        ref: 'File'
    },
    /* Fecha de la convocatoria o invitación */
    announcementDate: {
        type: Date
    },
    /* Descripción de las obras, bienes o servicios */
    servicesDescription: {
        type: String,
        required: [function(value) {
            return !this.isEmpty
        },"El campo Descripción de las obras es requerido"]
    },
    /* Fecha en la que se celebró la junta de aclaraciones */
    clarificationMeetingDate: {
        type: Date,
    },
    /* Hipervínculo al fallo de Junta de Aclaraciones */
    clarificationMeetingJudgmentUrl: {
        type: String,
        match: [new RegExp(CONTRACT_VALIDATION_REGEX_DICT.URL), 'El campo Hipervínculo al fallo de Junta de Aclaraciones no cumple con el formato esperado. Ejemplo: www.ejemplo.com']
    },
    clarificationMeetingJudgmentUrlBackup: {
        type: Schema.Types.ObjectId,
        ref: 'File'
    },
    /* Hipervínculo al documento de la Presentación de Propuestas */
    presentationProposalsDocUrl: {
        type: String,
        match: [new RegExp(CONTRACT_VALIDATION_REGEX_DICT.URL), 'El campo Hipervínculo al documento de la Presentación de Propuestas no cumple con el formato esperado . Ejemplo: www.ejemplo.com']
    },
    presentationProposalsDocUrlBackup: {
        type: Schema.Types.ObjectId,
        ref: 'File'
    },
    /* Proveedor */
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'Supplier',
        // required: [true, "El campo Proveedor es requerido"],
    },
    /* Unidad administrativa convocante */
    organizerAdministrativeUnit: {
        type: Schema.Types.ObjectId,
        ref: 'AdministrativeUnit',
        required: [true, "El campo U. administrativa convocante es requerido"],
        validate: {
            validator: function () {
                return this.administrativeUnitType === 'DESCENTRALIZED' ? String(this.organizerAdministrativeUnit) === String(this.applicantAdministrativeUnit) : true
            },
            message: props => "Si el Tipo de U. Administrativa es DESCENTRALIZADA la U. administrativa solicitante y convocante deben ser la misma"
        }
    },
    /* Unidad administrativa solicitante */
    applicantAdministrativeUnit: {
        type: Schema.Types.ObjectId,
        ref: 'AdministrativeUnit',
        required: [true, "El campo U. administrativa solicitante es requerido"],
    },
    /* Centralizada/Descentralizada */
    administrativeUnitType: {
        type: String,
        enum: administrativeUnitTypeEnum,
        required: [true, "El campo Tipo de U. Administrativa es requerido"],
        uppercase: true
    },
    /* Número que identifique al contrato */
    contractNumber: {
        type: String,
        // unique: true,
        required: false
    },
    /* Fecha del contrato */
    contractDate: {
        type: Date,
        required: false
    },
    /* Tipo de Contrato */
    contractType: {
        type: String,
        enum: contractTypeEnum,
        required: [function(value) {
          return !this.isEmpty
      }, "El campo Tipo de contrato es requerido"],
    },
    /* Monto total del contrato con impuestos incluidos */
    totalAmount: {
        type: Number,
        required: [function () {
            if (this.isEmpty) {
                return false;
            }
            return this.contractType == 'NORMAL';
        }, "El campo Monto total es requerido al ser un contrato normal"]
    },
    /* Monto mínimo, en su caso */
    minAmount: {
        type: Number,
        required:[ function () {
            if (this.isEmpty) {
                return false;
            }
             return this.contractType == 'OPEN';
        }, "El campo Monto mínimo es requerido al ser un contrato abierto"]
    },
    /* Monto máximo, en su caso */
    maxAmount: {
        type: Number,
        required: [function () {
            if (this.isEmpty) {
                return false;
            }
            return this.contractType == 'OPEN';
        }, "El campo Monto máximo es requerido al ser un contrato abierto"]
    },

    /* Monto total o Monto máximo, en su caso */
    totalOrMaxAmount: {
        type: Number,
        required: [function(){
            return !this.isEmpty;
        }, "El campo Monto total o Máximo es requerido"],
        validate: valdateTotalOrMaxAmount()
        // Si es NORMAL - es el monto total
        // Si es ABIERTO - es el monto máximo
    },
    /*Hipervínculo al documento del contrato y anexos*/
    contractUrl: {
        type: String,
        match: [new RegExp(CONTRACT_VALIDATION_REGEX_DICT.URL), 'El campo Hipervínculo al documento del contrato y anexos no cumple con el formato esperado. Ejemplo: www.ejemplo.com']
        // required:true
    },
    contractUrlBackup: {
        type: Schema.Types.ObjectId,
        ref: 'File'
    },
    /*Área responsable de la información*/
    areaInCharge: {
        type: String,
        // ref: 'AdministrativeUnit',
        required: [true, "El campo Área responsable de la información es requerido"],
    },
    /*Fecha de actualización*/
    updateDate: {
        type: Date,
        // required: [true, "El campo Fecha de actualización es requerido"],
        // default: Date.new
    },
    /*Notas*/
    notes: {
        type: String
    },
    /*Notas Karewa*/
    karewaNotes: {
        type: String
    },
    /*Fecha de obtención de los datos*/
    informationDate: {
        type: Date,
        // required: [true, "El campo Fecha de obtención de datos es requerido"],
    },
    /*Adjudicaciones Directas que exceden el límite*/
    limitExceeded: {
        type: Boolean,
        // required: function(value) {
        //     return !this.isEmpty;
        // },
        //Simulate a "N/A" value with null
        required: false,
        default: false
    },
    /*Monto que excede el límite de la Adjudicación Directa*/
    amountExceeded: {
        type: Number
    },
    deleted: require("./schemas/deleted.schema").Deleted,


});


// ContractSchema.virtual('procedureTypeEnumObject').get(getProcedureTypesEnumObject);
ContractSchema.virtual('procedureTypeEnumObject').get(function () {
    return getProcedureTypesEnumObject(this.procedureType);
});
ContractSchema.virtual('procedureStateEnumObject').get(function () {
    return getProcedureStateEnumObject(this.procedureState);
});
ContractSchema.virtual('administrativeUnitTypeEnumObject').get(function () {
    return getAdministrativeUnitTypeEnumObject(this.administrativeUnitType);
});
ContractSchema.virtual('contractTypeEnumObject').get(function () {
    return getContractTypeEnumObject(this.contractType);
});
ContractSchema.virtual('categoryEnumObject').get(function () {
    return getCategoryEnumObject(this.category);
});

ContractSchema.pre('save', function (next) {
    if (!this.contractId) {
        this.contractId = undefined;
    }

    if (!this.presentationProposalsDocUrl) {
        this.presentationProposalsDocUrl = undefined
    }

    if (!this.announcementUrl) {
        this.announcementUrl = undefined;
    }

    if (!this.contractUrl) {
        this.contractUrl = undefined;
    }

    if (!this.informationDate) {
        this.informationDate = undefined;
    }

    if (!this.clarificationMeetingJudgmentUrl) {
        this.clarificationMeetingJudgmentUrl = undefined;
    }

    next();
});

ContractSchema.set('toObject', {virtuals: true});
ContractSchema.set('toJSON', {virtuals: true});


//Agregar createdAt, modifiedAt automáticamente
ContractSchema.plugin(pluginCreatedUpdated);

//Paginación
ContractSchema.plugin(mongoosePagination);

//Paginación con aggregates
ContractSchema.plugin(mongooseAggregatePaginate);

//Clase del modelo Contract.
class ContractClass {
    constructor() {

    }
}

//Cargar class en Schema
ContractSchema.loadClass(ContractClass);

ContractSchema.statics.permission = permissions.getDefault("Contract");

ContractSchema.statics.expressValidator = function () {

    //For a list of available validators, check:
    //https://github.com/chriso/validator.js#validators

    //For more information about express-validator:
    //https://express-validator.github.io/docs/

    return [
        //TODO change this
        // check('supplier').isLength({
        //     min: 2,
        //     max: 100
        // })
        //Some examples:
        // check('email').isEmail(),
        // check('type').isIn(allowedTypes),
        // check('url').isUrl()
    ]
};

ContractSchema.statics.parseAdministrationPeriodFromYear = function (administrationPeriod) {
    let fromYearAsStr = '2016';
    if (administrationPeriod && administrationPeriod.match(new RegExp(CONTRACT_VALIDATION_REGEX_DICT.ADMINISTRATION))) {
        fromYearAsStr = administrationPeriod.substr(0, 4);
    }
    return Number(fromYearAsStr);
};

ContractSchema.statics.parseAdministrationPeriodToYear = function (administrationPeriod) {
    let toYearAsStr = '2018';
    if (administrationPeriod && administrationPeriod.match(new RegExp(CONTRACT_VALIDATION_REGEX_DICT.ADMINISTRATION))) {
        toYearAsStr = administrationPeriod.substr(5, administrationPeriod.length - 1);
    }
    return Number(toYearAsStr);
};

ContractSchema.statics.qProcedureStateConcluded = function (skipFilterByCategory = false, skipFilterByProcedureState = false) {
    const query = {};
    if (!skipFilterByProcedureState) {
        query.procedureState = "CONCLUDED";
    }

    if (!skipFilterByCategory) {
        query.$and = [
            { category: { $ne : 'MODIFICACION'} },
            { category: { $ne : 'ADENDUM'} },
            { category: { $ne : 'EXTENSION'} },
        ];
    }

    return query;
};

ContractSchema.statics.aggregateCondProcedures = function (procedureType, procedureState, skipFilterByCategory = false) {

    if (skipFilterByCategory) {
        if(procedureType && procedureState){
            return {
                $and: [
                    { $eq: ["$procedureType", procedureType] },
                    { $eq: ["$procedureState", procedureState] },
                    ]}
        } else if(procedureType) {
            return {$and: [
                {$eq: ["$procedureType", procedureType]},
            ]}
        } else {
            return { $and:[
                {$eq: ["$procedureState", procedureState]},
            ]}
        }
    } else {
        if(procedureType && procedureState){
            return {
                $and: [
                    { $eq: ["$procedureType", procedureType] },
                    { $eq: ["$procedureState", procedureState] },
                    { $ne:["$category","MODIFICACION"] },
                    { $ne:["$category","ADENDUM"] },
                    { $ne:["$category","EXTENSION"] }
                    ]}
        } else if(procedureType) {
            return {$and: [
                {$eq: ["$procedureType", procedureType]},
                {$ne:["$category","MODIFICACION"]},
                {$ne:["$category","ADENDUM"]},
                {$ne:["$category","EXTENSION"]}
            ]}
        } else {
            return { $and:[
                {$eq: ["$procedureState", procedureState]},
                {$ne:["$category","MODIFICACION"]},
                {$ne:["$category","ADENDUM"]},
                {$ne:["$category","EXTENSION"]}
            ]}
        }
    }

};


let postInsertMany = function (docs) {

    jobManager.runTask(jobManager.TASKS.BACKUP_CONTRACT_URLS, {contracts: docs})
        .then((job) => {
            logger.info(null, null, 'contract.model#post-insertMany', 'Task creation finished [%s]', jobManager.TASKS.BACKUP_CONTRACT_URLS);
        })
        .catch((err) => {
            logger.error(err, null, 'contract.model#post-insertMany', 'Error trying to create task [%s]', jobManager.TASKS.BACKUP_CONTRACT_URLS);
        });

};

let postSave = function (doc) {
    jobManager.runTask(jobManager.TASKS.BACKUP_CONTRACT_URLS, {contracts: [doc]})
        .then((job) => {
            logger.info(null, null, 'contract.model#post-postSave', 'Task creation finished [%s]', jobManager.TASKS.BACKUP_CONTRACT_URLS);
        })
        .catch((err) => {
            logger.error(err, null, 'contract.model#post-postSave', 'Error trying to create task [%s]', jobManager.TASKS.BACKUP_CONTRACT_URLS);
        });
};

ContractSchema.post('insertMany', postInsertMany);
ContractSchema.post('save', postSave);

ContractSchema.index({contractNumber: 1, organization: 1, deleted: 1}, {unique: true});

const Contract = mongoose.model('Contract', ContractSchema);


module.exports = {
    Contract,

    procedureTypesEnumDict,
    procedureTypesEnum,
    getProcedureTypesEnumObject,

    categoryEnumDict,
    categoryEnum,
    getCategoryEnumObject,

    procedureStateEnumDict,
    procedureStateEnum,
    getProcedureStateEnumObject,

    administrativeUnitTypeEnumDict,
    administrativeUnitTypeEnum,
    getAdministrativeUnitTypeEnumObject,

    limitExceededEnumDict,
    limitExceededEnum,
    getLimitExceededEnumObject,

    contractTypeEnumDict,
    contractTypeEnum,
    getContractTypeEnumObject,

    CONTRACT_VALIDATION_REGEX_DICT
};

const jobManager = require('./../components/jobManager');
// const jobManager = importLazy('./../components/jobManager');
