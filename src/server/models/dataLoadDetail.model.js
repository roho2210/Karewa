const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pluginCreatedUpdated = require('mongoose-createdat-updatedat');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const Contract = require('./contract.model').Contract;

/**
 * Schema de Mongoose para el modelo DataLoadDetail.
 * @type {mongoose.Schema}
 */
let DataLoadDetailSchema = new Schema({
    dataLoad: {
        type: Schema.Types.ObjectId,
        ref: 'DataLoad'
    },
    confirmed: {
        type: Boolean,
        default: false,
        required: true
    },
    data: {},
    rowIndex:{
        type:Number,
        required:true
    }
});

//Agregar createdAt, modifiedAt automáticamente
DataLoadDetailSchema.plugin(pluginCreatedUpdated);

//Paginación con aggregates
DataLoadDetailSchema.plugin(mongooseAggregatePaginate);

//Clase del modelo DataLoadDetail.
class DataLoadDetailClass {
    constructor() {

    }
}

DataLoadDetailSchema.statics.toContractObj = function (dataLoad, detailObj) {
    //Actual detail
    let detail = detailObj.data;
    
    if (detail.summary.hasErrors || detail.summary.skipRow) {
        return null;
    }

    let currentDate = new Date();

    return {
        detail: detail,
        // supplierId: 
        contract: {
            organization: dataLoad.organization,
            
            //enum
            procedureType: detail.procedureType.valueToSaveOverride,
            
            //enum
            category : detail.category.valueToSaveOverride || "NULL",
            
            //Someone renamed the model name
            // administrationPeriod : detail.administrationPeriod.value,
            administrationPeriod : detail.administration.value,

            administrationPeriodFromYear: Contract.parseAdministrationPeriodFromYear(detail.administration.value),
            administrationPeriodToYear: Contract.parseAdministrationPeriodToYear(detail.administration.value),
            
            fiscalYear : detail.fiscalYear.value,
            period : detail.period.value,
            contractId : detail.contractId.value ? detail.contractId.value : undefined,
            partida : detail.partida.value,
            
            //enum
            procedureState : detail.procedureState.valueToSaveOverride || "NULL" ,
            
            announcementUrl : detail.announcementUrl.value ? detail.announcementUrl.value : undefined,
            announcementDate : detail.announcementDate.value,
            servicesDescription : detail.servicesDescription.value,
            clarificationMeetingDate : detail.clarificationMeetingDate.value,
            clarificationMeetingJudgmentUrl : detail.clarificationMeetingJudgmentUrl.value ? detail.clarificationMeetingJudgmentUrl.value : undefined,
            presentationProposalsDocUrl : detail.presentationProposalsDocUrl.value ? detail.presentationProposalsDocUrl.value : undefined,
            
            
            //ref
            supplier: detail.supplierRfc.valueToSaveOverride,
            //ref
            organizerAdministrativeUnit: detail.organizerAdministrativeUnit.valueToSaveOverride,
            //ref
            applicantAdministrativeUnit:  detail.applicantAdministrativeUnit.valueToSaveOverride,

            //enum
            administrativeUnitType : detail.administrativeUnitType.valueToSaveOverride,
            
            contractNumber : detail.contractNumber.value,
            contractDate : detail.contractDate.value,
            
            //enum
            contractType : detail.contractType.valueToSaveOverride,
            // contractType : 'NORMAL',
            
            totalAmount : detail.totalAmount.value,
            minAmount : detail.minAmount.value,
            maxAmount : detail.maxAmount.value,
            totalOrMaxAmount : detail.totalOrMaxAmount.value,
            contractUrl : detail.contractUrl.value ? detail.contractUrl.value : undefined,
            
            //ref
            areaInCharge : detail.areaInCharge.valueToSaveOverride,
            
            // updateDate : detail.updateDate.value,
            updateDate : detail.actualizationDate.value,
            notes : detail.notes.value,
            karewaNotes : detail.karewaNotes.value,
            informationDate : detail.informationDate.value ? detail.informationDate.value : undefined,

            //enum -> boolean
            // limitExceeded : !!/no/gi.test(detail.limitExceeded.valueToSaveOverride),
            limitExceeded : detail.limitExceeded.valueToSaveOverride === "LIMIT_EXCEEDED",
            
            amountExceeded : detail.amountExceeded.value || 0,

            isEmpty : detail.isEmpty && detail.isEmpty.valueToSaveOverride,
            
            deleted: {isDeleted: false},
            createdAt: currentDate,
            updatedAt: currentDate,
        }
    };
};

DataLoadDetailSchema.statics.toSuppliersArray = function (dataLoad, detailObj) {
    //Actual detail
    let detail = detailObj.data;
    // console.debug("Datos reales");
    if (detail.summary.hasErrors || detail.summary.skipRow) {
        return null;
    }
    
    
    //Match already found, no need to create
    if (!detail.supplierRfc.shouldCreateDoc) {
        return null;
    }
    
    return [
        {
            organization: dataLoad.organization,
            name: detail.supplierName.value,
            rfc: detail.supplierRfc.value,
            deleted: {isDeleted: false},
        }
    ]
};

DataLoadDetailSchema.statics.toAdministrativeUnitsArray = function (dataLoad, detailObj) {
    //Actual detail
    let detail = detailObj.data;
    
    if (detail.summary.hasErrors || detail.summary.skipRow) {
        return null;
    }
    
    let administrativeUnits = [];
    
    if (detail.organizerAdministrativeUnit.shouldCreateDoc) {
        administrativeUnits.push({
            organization: dataLoad.organization,
            name: detail.organizerAdministrativeUnit.value,
            deleted: {isDeleted: false},
        });
    }
    
    if (detail.applicantAdministrativeUnit.shouldCreateDoc) {
        administrativeUnits.push({
            organization: dataLoad.organization,
            name: detail.applicantAdministrativeUnit.value,
            deleted: {isDeleted: false},
        });
    }
    
    // if (detail.areaInCharge.shouldCreateDoc) {
    //     administrativeUnits.push({
    //         organization: dataLoad.organization,
    //         name: detail.areaInCharge.value,
    //         deleted: {isDeleted: false},
    //     });
    // }
    
    return administrativeUnits;
};

//Cargar class en Schema
DataLoadDetailSchema.loadClass(DataLoadDetailClass);

//Indexes
DataLoadDetailSchema.index({dataLoad: 1}, {unique: false});

const DataLoadDetail = mongoose.model('DataLoadDetail', DataLoadDetailSchema);

module.exports = {
    DataLoadDetail
};
