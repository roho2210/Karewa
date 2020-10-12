const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const async = require('async');

const DataLoadDetail = require('./dataLoadDetail.model').DataLoadDetail;
const Supplier = require('./supplier.model').Supplier;
const AdministrativeUnit = require('./administrativeUnit.model').AdministrativeUnit;
const Contract = require('./contract.model').Contract;

const pluginCreatedUpdated = require('mongoose-createdat-updatedat');

const logger = require('./../components/logger').instance;

const _ = require('underscore');

/**
 * Schema de Mongoose para el modelo DataLoad.
 * @type {mongoose.Schema}
 */
let DataLoadSchema = new Schema({
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
    uploadedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // required: true
        required: false
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    confirmedAt: {
        type: Date
    },
    filename: {
        
    },
    // details: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'DataLoadDetail'
    // }],
    summary: {
        newContractsCount: {
            type: Number,
            default: 0
        },
        newSuppliersCount: {
            type: Number,
            default: 0
        },
        newAdministrativeUnitsCount: {
            type: Number,
            default: 0
        },
        skippedContractsCount: {
            type: Number,
            default: 0
        },
        skippedSuppliersCount: {
            type: Number,
            default: 0
        },
        skippedAdministrativeUnitsCount: {
            type: Number,
            default: 0
        },
        errorsCount: {
            type: Number,
            default: 0
        },
    },
    deleted: require("./schemas/deleted.schema").Deleted
});

//Agregar createdAt, modifiedAt automáticamente
DataLoadSchema.plugin(pluginCreatedUpdated);

//Clase del modelo DataLoad.
class DataLoadClass {
    constructor() {
        
    }
}

DataLoadSchema.statics.toJson = function (dataLoad) {
    let uploadedBy = dataLoad.uploadedBy || {};
    return {
        _id: dataLoad._id,
        filename: dataLoad.filename,
        // details: dataLoad.details,
        uploadedBy: `${uploadedBy.name} ${uploadedBy.lastName}`,
        createdAt: dataLoad.createdAt
    };
};

DataLoadSchema.statics.getSummary = function (dataLoad, details) {
    //TODO: Calculate summary

    let newContractsCount = 0;
    let newSuppliersCount = 0;
    let newAdministrativeUnitsCount = 0;
    
    let skippedContractsCount = 0;
    let skippedSuppliersCount = 0;
    let skippedAdministrativeUnitsCount = 0;
    
    let errorsCount = 0;
    
    let addedSuppliers = {};
    let addedAdministrativeUnits = {};

    details.forEach((dataLoadDetail) => {

        let rowInfo = dataLoadDetail.data;
        if (rowInfo.summary.hasErrors) {
            errorsCount++;
        }
        
        if (rowInfo.summary.skipRow) {
            skippedContractsCount++;
        } else {
            if (!rowInfo.summary.hasErrors) {
                newContractsCount++;
            }

            if (rowInfo.supplierRfc && rowInfo.supplierRfc.shouldCreateDoc) {
                if (!addedSuppliers[rowInfo.supplierRfc.value]) {
                    addedSuppliers[rowInfo.supplierRfc.value] = true;
                    newSuppliersCount++;
                }
            } else {
                skippedSuppliersCount++;
            }
    
            if (rowInfo.organizerAdministrativeUnit && rowInfo.organizerAdministrativeUnit.shouldCreateDoc) {
                if (!addedAdministrativeUnits[rowInfo.organizerAdministrativeUnit.value]) {
                    addedAdministrativeUnits[rowInfo.organizerAdministrativeUnit.value] = true;
                    newAdministrativeUnitsCount++;
                }
            } else {
                skippedAdministrativeUnitsCount++;
            }
    
            if (rowInfo.applicantAdministrativeUnit && rowInfo.applicantAdministrativeUnit.shouldCreateDoc) {
                if (!addedAdministrativeUnits[rowInfo.applicantAdministrativeUnit.value]) {
                    addedAdministrativeUnits[rowInfo.applicantAdministrativeUnit.value] = true;
                    newAdministrativeUnitsCount++;
                }
            } else {
                skippedAdministrativeUnitsCount++;
            }
    
            // if (rowInfo.areaInCharge.shouldCreateDoc) {
            //     if (!addedAdministrativeUnits[rowInfo.areaInCharge.value]) {
            //         addedAdministrativeUnits[rowInfo.areaInCharge.value] = true;
            //         newAdministrativeUnitsCount++;
            //     }
            // } else {
            //     skippedAdministrativeUnitsCount++;
            // }
        }

    });
    
    return {
        newContractsCount: newContractsCount,
        newSuppliersCount: newSuppliersCount,
        newAdministrativeUnitsCount: newAdministrativeUnitsCount,
        skippedContractsCount: skippedContractsCount,
        skippedSuppliersCount: skippedSuppliersCount,
        skippedAdministrativeUnitsCount: skippedAdministrativeUnitsCount,
        errorsCount: errorsCount
    };
};

DataLoadSchema.statics.dataLoadInfo = function (currentOrganizationId, callback) {

    this
        .findOne({

            organization: currentOrganizationId,
            confirmed: false,
            'deleted.isDeleted': {'$ne': true}
        })
        .populate({
            path: 'uploadedBy',
            model: 'User',
            select: 'name lastName'
        })
        .select({
            data: 0
        })
        .exec((err, currentDataLoad) => {
            if (err) {
                logger.error(err, req, 'dataLoad.model#dataLoadInfo', 'Error trying to fetch current DataLoad info');
            }

            this
                .findOne({
                    organization: currentOrganizationId,
                    confirmed: true,
                    'deleted.isDeleted': {'$ne': true}
                })
                .populate({
                    path: 'uploadedBy',
                    model: 'User',
                    select: 'name lastName'
                })
                .sort({
                    modifiedAt: -1
                })
                .select({
                    uploadedBy: 1,
                    confirmedAt: 1
                })
                .exec((err, recentDataLoad) => {

                    let dataLoadInfo = {};
                    

                    if (currentDataLoad) {
                        let currentUploadedBy = currentDataLoad.uploadedBy || {};
                        dataLoadInfo.current = {
                            _id: currentDataLoad._id,
                            summary: currentDataLoad.summary,
                            uploadedBy: `${currentUploadedBy.name || ''} ${currentUploadedBy.lastName || ''}`,
                            createdAt: currentDataLoad.createdAt,
                            fileName :currentDataLoad.filename
                        };
                    }
                    

                    if (recentDataLoad) {
                        let recentUploadedBy = recentDataLoad.uploadedBy || {};
                        dataLoadInfo.recent = {
                            recentUploadedBy: `${recentUploadedBy.name || ''} ${recentUploadedBy.lastName || ''}`,
                            recentConfirmedAt: recentDataLoad.confirmedAt
                        };
                    }
                    
                    callback(null, dataLoadInfo);
                });

        });
};

DataLoadSchema.statics.confirm = function (dataLoad, details, confirmCallback) {
    details = details || [];
    async.map(details, (detail, callback) => {
        
        //TODO: Save Contact, Suppliers, AdministrativeUnits, etc
        
        let mappedValue =  {
            contractInfo: DataLoadDetail.toContractObj(dataLoad, detail),
            suppliers: DataLoadDetail.toSuppliersArray(dataLoad, detail),
            administrativeUnits: DataLoadDetail.toAdministrativeUnitsArray(dataLoad, detail)
        };
        return callback(null, mappedValue);
    }, (err, mappedDetails) => {
        //Each mappedDetail has the form:
        // {
        //     contractInfo: {detail: {...}, contract: {...}},
        //     suppliersInfo: {detail: {...}, suppliers: [...]},
        //     administrativeUnitsInfo: {detail: {...}, administrativeUnits: [...]}
        // }
        async.waterfall([
            //Save all new Suppliers
            function (waterfallCallback) {
                let seenSupplierNames = {};
                let seenSupplierRfcs = {};
                let suppliersArrayOfArrays = _.flatten(mappedDetails
                //Filter only valid supplier arrays (defined and not empty)
                    .filter(detailObj => detailObj.suppliers && detailObj.suppliers.length)
                    .map(detailObj => detailObj.suppliers));
                    //Flatmap; all supplier arrays as one single array
                    // .flatMap(detailObj => detailObj.suppliers);

                let supplierObjsToSave = suppliersArrayOfArrays
                    //Remove duplicates
                    .filter(supplier => {
                        // Only if not already seen; do not duplicate Suppliers to save
                        if (seenSupplierNames[supplier.name] && seenSupplierRfcs[supplier.rfc]) {
                            return false;
                        } else {
                            //Mark as "seen"
                            seenSupplierNames[supplier.name] = true;
                            seenSupplierRfcs[supplier.rfc] = true;
                            return true;
                        }
                    });

                Supplier
                    .insertMany(supplierObjsToSave, (err, savedSuppliers) => {
                        if (err) {
                            logger.error(err, null, 'dataLoad.model#confirm', 'Error trying to save Suppliers on waterfall step #1');
                            //Stop waterfall right now
                            if(err.code === 11000)
                                err.user_message = "No coincide la rfc con el nombre de una Organización ya creada: " +
                                    "<br> Nombre organizacion: "+ err.op.name +
                                    "<br> RFC Organizacion: "+ err.op.rfc;
                            else {
                                if(err.errors) {
                                    for(key in err.errors) {
                                        err.user_message = " "+ ( err.errors[key].message ? err.errors[key].message : '' )
                                    }
                                } else
                                    err.user_message = "Existe un error en los datos del Excel";
                            }
                                // err.user_message = err.errors ? err.errors.name.message : "Existe un error en los datos del Excel";

                            return waterfallCallback(err);
                        }
                        let suppliersMapIdByRfc = {};
                        if (!savedSuppliers || !savedSuppliers.length) {
                            logger.warn(err, null, 'dataLoad.model#confirm', 'No Suppliers saved on waterfall step #1');
                            return waterfallCallback(null, suppliersMapIdByRfc);
                        }
                        
                        savedSuppliers.forEach((supplier) => {
                            suppliersMapIdByRfc[supplier.rfc] = supplier._id;
                        });
                        
                        return waterfallCallback(null, suppliersMapIdByRfc);
                    });
            },
            //Save all new AdministrativeUnits
            function (suppliersMapIdByRfc, waterfallCallback) {
                let seenAdministrativeUnitNames = {};
                let administrativeUnitsArrayOfArrays = _.flatten(mappedDetails
                //Filter only valid administrative unit arrays (defined and not empty)
                    .filter(detailObj => detailObj.administrativeUnits && detailObj.administrativeUnits.length)
                    .map(detailObj => detailObj.administrativeUnits));
                    //Flatmap; all administrative units arrays as one single array
                    // .flatMap(detailObj => detailObj.administrativeUnits);
                let administrativeUnitObjsToSave = administrativeUnitsArrayOfArrays
                    //Remove duplicates
                    .filter(administrativeUnit => {
                        //Only if not already seen; do not duplicate Suppliers to save
                        if (seenAdministrativeUnitNames[administrativeUnit.name]) {
                            return false;
                        } else {
                            //Mark as "seen"
                            seenAdministrativeUnitNames[administrativeUnit.name] = true;
                            return true;
                        }
                    });

                AdministrativeUnit
                    .insertMany(administrativeUnitObjsToSave, (err, savedAdministrativeUnits) => {
                        if (err) {
                            logger.error(err, null, 'dataLoad.model#confirm', 'Error trying to save AdministrativeUnits on waterfall step #2');
                            //Stop waterfall right now
                            if(err.errors) {
                                for(key in err.errors) {
                                    err.user_message = " "+ ( err.errors[key].message ? err.errors[key].message : '' )
                                }
                            } else
                                err.user_message = "Existe un error en los datos del Excel";

                            return waterfallCallback(err);
                        }

                        let administrativeUnitsMapIdByName = {};

                        if (!savedAdministrativeUnits || !savedAdministrativeUnits.length) {
                            logger.warn(err, null, 'dataLoad.model#confirm', 'No AdministrativeUnits saved on waterfall step #2');
                            return waterfallCallback(null, suppliersMapIdByRfc, administrativeUnitsMapIdByName);
                        }

                        savedAdministrativeUnits.forEach((administrativeUnit) => {
                            administrativeUnitsMapIdByName[administrativeUnit.name] = administrativeUnit._id;
                        });

                        return waterfallCallback(null, suppliersMapIdByRfc, administrativeUnitsMapIdByName);
                    });
            },
            function (suppliersMapIdByRfc, administrativeUnitsMapIdByName, waterfallCallback) {


                let seenContractContractIds = {};
                let contractObjsToSave = mappedDetails
                    //Filter only valid contracts (defined)
                    .filter(detailObj => detailObj.contractInfo && detailObj.contractInfo.contract)
                    // .map(detailObj => detailObj.contract)
                    //Remove duplicates
                    .filter(detailObj => {
                        
                        let contract = detailObj.contractInfo.contract;
                        
                        //Only if not already seen; do not duplicate Suppliers to save
                        if (seenContractContractIds[contract.contractNumber]) {
                            return false;
                        } else {
                            //Mark as "seen"
                            seenContractContractIds[contract.contractNumber] = true;
                            return true;
                        }
                    })
                    //Fill the id gaps (Supplier and Administrative Unit ids)
                    .map((detailObj) => {
                    
                        let detail = detailObj.contractInfo.detail;
                        let contract = detailObj.contractInfo.contract;
                        
                        //supplier
                        if (!detail.supplierRfc.valueToSaveOverride) {
                            // contract.supplier = suppliersMapIdByName[detail.supplierName.value];
                            contract.supplier = suppliersMapIdByRfc[detail.supplierRfc.value];
                        }
                        //organizerAdministrativeUnit
                        if (!detail.organizerAdministrativeUnit.valueToSaveOverride) {
                            contract.organizerAdministrativeUnit = administrativeUnitsMapIdByName[detail.organizerAdministrativeUnit.value];
                        }
                        //applicantAdministrativeUnit
                        if (!detail.applicantAdministrativeUnit.valueToSaveOverride) {
                            contract.applicantAdministrativeUnit = administrativeUnitsMapIdByName[detail.applicantAdministrativeUnit.value];
                        }
                        //areaInCharge
                        if (!detail.areaInCharge.valueToSaveOverride) {
                            contract.areaInCharge = detail.areaInCharge.value;
                        }
                        
                        return contract;
                    });
                // return waterfallCallback(new Error('NO'));

                Contract
                    .insertMany(contractObjsToSave, (err, savedContracts) => {
                        if (err) {
                            logger.error(err, null, 'dataLoad.model#confirm', 'Error trying to save Contracts on waterfall step #3');
                            //Stop waterfall right now

                            if(err.errors) {
                                for(key in err.errors) {
                                    err.user_message = " "+ ( err.errors[key].message ? err.errors[key].message : '' )
                                }
                            } else
                                err.user_message = "Existe un error en los datos del Excel";

                            return waterfallCallback(err);
                        }

                        let administrativeUnitsMapIdByName = {};

                        if (!savedContracts || !savedContracts.length) {
                            logger.warn(err, null, 'dataLoad.model#confirm', 'No Contracts saved on waterfall step #3');
                        }
                        
                        let results = {
                            suppliersMapIdByRfc: suppliersMapIdByRfc,
                            administrativeUnitsMapIdByName: administrativeUnitsMapIdByName,
                            savedContracts: savedContracts
                        };

                        return waterfallCallback(null, results);
                    });

            }
        ], (err, waterfallResults) => {
            //All details confirmed
            if (err) {

                logger.error(err, null, 'dataLoad.model#confirm', 'Error trying to confirm DataLoad');
                return confirmCallback(err);
            }
            
            
            let confirmResults = {
                suppliersSavedCount: 0,
                administrativeUnitsSavedCount: 0,
                contractsSavedCount: 0,
            };
            if (waterfallResults) {
                confirmResults.suppliersSavedCount = Object.keys(waterfallResults.suppliersMapIdByRfc).length;
                confirmResults.administrativeUnitsSavedCount = Object.keys(waterfallResults.administrativeUnitsMapIdByName).length;
                confirmResults.contractsSavedCount = waterfallResults.savedContracts.length;
            }
            
            
            dataLoad.confirmed = true;
            dataLoad.confirmedAt = new Date();

            dataLoad.save((err) => {
                if (err) {
                    logger.error(err, null, 'dataLoad.model#confirm', 'Error trying to update DataLoad with confirmation params');
                    return confirmCallback(err);
                }
                
                return confirmCallback(null, confirmResults);
            });
            
        });
    })
};

//Cargar class en Schema
DataLoadSchema.loadClass(DataLoadClass);

//Indexes
DataLoadSchema.index({organization: 1, confirmed: 1, deleted: 1}, {unique: false});

const DataLoad = mongoose.model('DataLoad', DataLoadSchema);

module.exports = {
    DataLoad
};
