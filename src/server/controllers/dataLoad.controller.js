const mongoose = require('mongoose');
const Supplier = require('./../models/supplier.model').Supplier;
const ContractExcelReader = require('./../components/dataLoader').ContractExcelReader;
const ContractExcelWriter = require('./../components/dataLoader').ContractExcelWriter;
const DataLoad = require('./../models/dataLoad.model').DataLoad;
const DataLoadDetail = require('./../models/dataLoadDetail.model').DataLoadDetail;
const Organization = require('./../models/organization.model').Organization;
const Notification = require('./../models/notification.model').Notification;

const {

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
} = require('./../models/contract.model');

const logger = require('./../components/logger').instance;
const utils = require('./../components/utils');


function _getPageFromReq(req) {
    return Number(req.query.page) || 1;
}

/**
 * Carga un archivo con información a ser procesada.
 * @param req
 * @param res
 * @param next
 */
exports.upload = (req, res, next) => {

    let currentOrganizationId = Organization.currentOrganizationId(req);

    let currentUserId = req.user._id;
    
    //Optional id, received when reuploading corrections to the data previously uploaded
    let idDataLoad = null;
    if (req.body.idDataLoad) {
        idDataLoad = mongoose.Types.ObjectId(req.body.idDataLoad);
    }

    DataLoad
        .findOne({
            organization: currentOrganizationId,
            confirmed: false,
            'deleted.isDeleted': {'$ne': true}
        })
        // .count()
        .exec((err, dataLoadInProgress) => {
            if (err) {
                logger.error(err, req, 'dataLoad.controller#upload', 'Error trying to count current DataLoad');
                return res.json({

                    "error": true,
                    "message": req.__('data-load.error.upload.check-in-progress')
                });
                //TODO: Error
            }

            //If a DataLoad is currently in progress, and it's not a reupload of corrections to the data
            if (dataLoadInProgress && dataLoadInProgress._id.toString() !== (idDataLoad || '').toString()) {
                //DataLoad in progress; error!
                return res.json({
                    "error": true,
                    "message": req.__('data-load.error.upload.data-load-in-progress'),
                    data: DataLoad.toJson(dataLoadInProgress)
                });
            }
            
            // paymentExcelReader.readObject(excelObject, req, (err, result) => {
            
            let reader = new ContractExcelReader(currentOrganizationId, idDataLoad);
            
            try {
                reader.readBuffer(req.file.buffer)
                    .then(({dataLoad, details}) => {
                        // console.log('dataLoad', dataLoad);
                        //Assign filename
                        dataLoad.organization = currentOrganizationId,
                        dataLoad.filename = req.file.originalname;
                        //Assign current user
                        dataLoad.uploadedBy = currentUserId;
                        
                        dataLoad.summary = DataLoad.getSummary(dataLoad, details);
                        
                        dataLoad.save((err) => {
                            if (err) {
                                //TODO: Handle err
                                console.log('save err', err);
                                // return res.json(...);
                                return res.json({
                                    "error": true,
                                    "message": req.__('data-load.error.upload')
                                    // "data": savedOrganization
                                });
                            }


                            DataLoad.dataLoadInfo(currentOrganizationId, (err, dataLoadInfo) => {
                                let notification = new Notification();
                                notification.organization = currentOrganizationId;
                                notification.createdUser = currentUserId;
                                notification.message = req.__('data-load-notification.start');
                                notification.seenUsers.push(currentUserId);
                                notification.status = 'blue';
                                notification.save();
                                return res.json({
                                    error: false,
                                    //TODO: Success message
                                    // "message": "Success!",
                                    data: dataLoadInfo
                                });
                            });
                            
                        });
                        // console.log('reader.readBuffer result', result);
                    })
                    .catch((err) => {
                        console.log('reader.readBuffer err', err);
                        return res.json({
                            "error": true,
                            "message": req.__('data-load.error.upload')
                            // "data": savedOrganization
                        });
                    
                    })
            } catch (err) {
                console.log('err in try', err);
                return res.json({
                    "error": true,
                    "message": req.__('data-load.error.upload')
                    // "data": savedOrganization
                });
            }
            
            
            //TODO: Read file
            //TODO: Validate file extension
            
            //"Processing"
            // setTimeout(function () {
            //     return res.json({
            //         "error": true,
            //         "message": req.__('data-load.error.upload')
            //         // "data": savedOrganization
            //     });
            // }, 2000);
        });
};

/**
 * Download an Excel file with annotations to fix them.
 * @param req
 * @param res
 * @param next
 */
exports.downloadValidations = (req, res, next) => {

    let currentOrganizationId = Organization.currentOrganizationId(req);
    
    DataLoad
        .findOne({
            organization: currentOrganizationId,
            confirmed: false,
            'deleted.isDeleted': {'$ne': true}
        })
        .populate({
            path: 'details',
            model: 'DataLoadDetail'
        })
        .exec((err, dataLoad) => {
            if (err) {
                logger.error(err, req, 'dataLoad.controller#download', 'Error trying to fetch current DataLoad info');
            }

            if (!dataLoad) {
                return res.json({
                    error: true,
                    data: null
                });
            }

            DataLoadDetail.find({dataLoad: dataLoad._id})
                .exec((err, details) => {
                    details = details || [];
                    
                    let dataLoadObj = dataLoad.toObject();
                    dataLoadObj.details = details;
                    
                    new ContractExcelWriter(dataLoadObj)
                        .sendFileAsDownload(req, res);
                });

            // return res.json({
            //     error: false,
            //     data: /*{
            //      filename: dataLoad.filename,
            //      data: dataLoad.data,
            //      uploadedBy: `${dataLoad.uploadedBy.name} ${dataLoad.uploadedBy.lastName}`,
            //      createdAt: dataLoad.createdAt
            //      }*/DataLoad.toJson(dataLoad)
            // });
        }); 
    
};


var multer  = require('multer');
var upload = multer();

exports.beforeUpload = upload.single('file');

exports.current = (req, res, next) => {
    let currentOrganizationId = Organization.currentOrganizationId(req);

    let page = _getPageFromReq(req);
    let search = req.query.search;

    let showNoIssues = req.query.showNoIssues === 'true';
    let showSkipped = req.query.showSkipped === 'true';
    let showErrors = req.query.showErrors === 'true';
    
    let paginateOptions = {
        page: page,
        limit: 10,
        // sortBy: {
        //     total: -1
        // }
    };

    DataLoad
        .findOne({
            organization: currentOrganizationId,
            confirmed: false,
            'deleted.isDeleted': {'$ne': true}
        })
        .exec((err, currentDataLoad) => {
            if (err) {
                logger.error(err, req, 'dataLoad.controller#currentInfo', 'Error trying to fetch current DataLoad');
            }

            if (!currentDataLoad) {
                return res.json({
                    error: false,
                    data: null
                });
            }


            let query = {};
            let orBuilder = [];
            let andBuilder = [];
            let orArray = [];


            if (search) {
                let queryAsRegex = utils.toAccentsRegex(search, "gi");

                orArray = [
                    {'data.administration.value': queryAsRegex},
                    {'data.fiscalYear.value': queryAsRegex},
                    {'data.period.value': queryAsRegex},
                    {'data.contractId.value': queryAsRegex},
                    {'data.partida.value': queryAsRegex},
                    {'data.announcementUrl.value': search}, //non-regex for urls
                    {'data.servicesDescription.value': queryAsRegex},
                    {'data.clarificationMeetingJudgmentUrl.value': search}, //non-regex for urls
                    {'data.presentationProposalsDocUrl.value': search}, //non-regex for urls
                    {'data.supplierName.value': queryAsRegex},
                    {'data.supplierRfc.value': queryAsRegex},
                    {'data.organizerAdministrativeUnit.value': queryAsRegex},
                    {'data.applicantAdministrativeUnit.value': queryAsRegex},
                    {'data.contractNumber.value': queryAsRegex},
                    {'data.contractUrl.value': search}, //non-regex for urls
                    {'data.areaInCharge.value': queryAsRegex},
                    {'data.notes.value': queryAsRegex},
                    {'data.karewaNotes.value': queryAsRegex},
                    
                    
                    //Also try search in original value for enum fields (input by user)
                    {'data.procedureType.value': queryAsRegex},
                    {'data.category.value': queryAsRegex},
                    {'data.procedureState.value': queryAsRegex},
                    {'data.administrativeUnitType.value': queryAsRegex},
                    {'data.contractType.value': queryAsRegex},
                    {'rowIndex': isNaN(search) ? '' : Number(search)},
                ];


                let procedureTypeEnumQueryAsRegexStr = utils.enumSearchRegexString(search, procedureTypesEnum, procedureTypesEnumDict);
                if (procedureTypeEnumQueryAsRegexStr && procedureTypeEnumQueryAsRegexStr.length) {
                    orArray.push(
                        {'data.procedureType.valueToSaveOverride': new RegExp(procedureTypeEnumQueryAsRegexStr)}
                    );
                }

                let categoryEnumQueryAsRegexStr = utils.enumSearchRegexString(search, categoryEnum, categoryEnumDict);
                if (categoryEnumQueryAsRegexStr && categoryEnumQueryAsRegexStr.length) {
                    orArray.push(
                        {'data.category.valueToSaveOverride': new RegExp(categoryEnumQueryAsRegexStr)}
                    );
                }

                let procedureStateEnumQueryAsRegexStr = utils.enumSearchRegexString(search, procedureStateEnum, procedureStateEnumDict);
                if (procedureStateEnumQueryAsRegexStr && procedureStateEnumQueryAsRegexStr.length) {
                    orArray.push(
                        {'data.procedureState.valueToSaveOverride': new RegExp(procedureStateEnumQueryAsRegexStr)}
                    );
                }

                let administrativeUnitTypeEnumQueryAsRegexStr = utils.enumSearchRegexString(search, administrativeUnitTypeEnum, administrativeUnitTypeEnumDict);
                if (administrativeUnitTypeEnumQueryAsRegexStr && administrativeUnitTypeEnumQueryAsRegexStr.length) {
                    orArray.push(
                        {'data.administrativeUnitType.valueToSaveOverride': new RegExp(administrativeUnitTypeEnumQueryAsRegexStr)}
                    );
                }

                let contractTypeTypeEnumQueryAsRegexStr = utils.enumSearchRegexString(search, contractTypeEnum, contractTypeEnumDict);
                if (contractTypeTypeEnumQueryAsRegexStr && contractTypeTypeEnumQueryAsRegexStr.length) {
                    orArray.push(
                        {'data.contractType.valueToSaveOverride': new RegExp(contractTypeTypeEnumQueryAsRegexStr)}
                    );
                }

            }
            
            //Note: complex filter logic ahead


            if (showSkipped && showErrors && showNoIssues) {
                //Show all
            } else {
                if (showSkipped) {
                    //Show means do not filter in this case
                    // query = {...query, 'data.summary.skipRow': true};
                    orArray.push({'data.summary.skipRow': true});
                } else {
                }
    
                if (showErrors) {
                    //Show means do not filter in this case
                    // query = {...query, 'data.summary.hasErrors': true};
                    orArray.push({'data.summary.hasErrors': true});
                } else {
                }
    
                if (showNoIssues) {
                    if (!showSkipped && !showErrors) {
                        orArray.push({$and: [
                            {'data.summary.skipRow': false},
                            {'data.summary.hasErrors': false},
                            {'data.summary.hasInfos': false},
                        ]})
                    } else {
                        // if (!showSkipped) {
                            orArray.push({'data.summary.skipRow': false});
                        // }
                        // if (!showErrors) {
                            orArray.push({'data.summary.hasErrors': false});
                        // }
                        orArray.push({'data.summary.hasInfos': false});
                    }
                    //Show means do not filter in this case
                } else {
                    //Hide contracts without issues, i.e. show contracts with issues
                    //So we filter contracts with at least one issue-related field with true
                    // orArray.push({'data.summary.skipRow': true});
                    // orArray.push({'data.summary.hasErrors': true});
                    // orArray.push({'data.summary.hasInfos': true});
                }
            }


            //$or requires a non-empty array
            if (orArray.length) {
                query = {
                    ...query,
                    $or: orArray,
                };
                
            }

            query = {dataLoad: currentDataLoad._id, ...query};

            let aggregate = DataLoadDetail.aggregate([
                {
                    $match: query
                }
            ]);
            
            
            DataLoadDetail.aggregatePaginate(aggregate, paginateOptions, (err, dataLoadDetails, pageCount, itemCount) => {
                if (err) {
                    logger.error(err, req, 'dataLoad.controller#currentInfo', 'Error trying to fetch current DataLoad info');
                }
        
                if (!dataLoadDetails) {
                    return res.json({
                        error: false,
                        data: null
                    });
                }

                let dataLoadWithDetails = DataLoad.toJson(currentDataLoad);
                dataLoadWithDetails.details = dataLoadDetails;
                
                return res.json({
                    error: false,
                    data: /*{
                     filename: dataLoad.filename,
                     data: dataLoad.data,
                     uploadedBy: `${dataLoad.uploadedBy.name} ${dataLoad.uploadedBy.lastName}`,
                     createdAt: dataLoad.createdAt
                     }*/{
                        doc: dataLoadWithDetails,
                        pagination: {
                            total: itemCount,
                            page: page,
                            pages: pageCount 
                        }
                    }
                });
            });
        });


    // DataLoad
    //     .findOne({
    //         organization: currentOrganizationId,
    //         confirmed: false,
    //         'deleted.isDeleted': {'$ne': true}
    //     })
    //     .populate({
    //         path: 'uploadedBy',
    //         model: 'User',
    //         select: 'name lastName'
    //     })
    //     .populate({
    //         path: 'details',
    //         model: 'DataLoadDetail'
    //     })
    //     .exec((err, dataLoad) => {
    //         if (err) {
    //             logger.error(err, req, 'dataLoad.controller#currentInfo', 'Error trying to fetch current DataLoad info');
    //         }
    //
    //         if (!dataLoad) {
    //             return res.json({
    //                 error: false,
    //                 data: null
    //             });
    //         }
    //
    //         return res.json({
    //             error: false,
    //             data: /*{
    //                 filename: dataLoad.filename,
    //                 data: dataLoad.data,
    //                 uploadedBy: `${dataLoad.uploadedBy.name} ${dataLoad.uploadedBy.lastName}`,
    //                 createdAt: dataLoad.createdAt
    //             }*/DataLoad.toJson(dataLoad)
    //         });
    //     });
};


exports.currentInfo = (req, res, next) => {
    let currentOrganizationId = Organization.currentOrganizationId(req);

    DataLoad.dataLoadInfo(currentOrganizationId, (err, dataLoadInfo) => {
        return res.json({
            error: false,
            data: dataLoadInfo
        });
    });
};

exports.cancelCurrent = (req, res, next) => {

    let currentOrganizationId = Organization.currentOrganizationId(req);
    let currentUserId = req.user._id;
    
    DataLoad
        .findOne({
            organization: currentOrganizationId,
            confirmed: false,
            'deleted.isDeleted': {'$ne': true}
        })
        .exec((err, dataLoad) => {
            if (err) {
                logger.error(err, req, 'dataLoad.controller#currentInfo', 'Error trying to fetch current DataLoad info');
            }

            if (!dataLoad) {
                return res.json({
                    error: true,
                    message: req.__('data-load.cancel.error.no-data-load-in-progress'),
                    data: null
                });
            }

            dataLoad.deleted = {
                isDeleted: true,
                user: currentUserId,
                date: new Date()
            };
            
            dataLoad.save((err) => {
                if (err) {
                    logger.error(err, req, 'dataLoad.controller#cancelCurrent', 'Ocurrió un error inesperado al borrar el DataLoad con id [%j]', dataLoad._id);
                    return res.json({
                        error: false,
                        message: req.__('data-load.cancel.error.unexpected'),
                        data: null
                    });
                }
                
                DataLoad.dataLoadInfo(currentOrganizationId, (err, dataLoadInfo) => {
                    //We just canceled/deleted the current DataLoad. To avoid race conditions, we ensure that the dataLoadInfo returned has no "current" value
                    logger.warn(null, req, 'dataLoad.controller#cancelCurrent', 'We just canceled/deleted the current DataLoad. To avoid race conditions, we ensure that the dataLoadInfo returned has no "current" value');
                    dataLoadInfo.current = null;
                    let notification = new Notification();
                    notification.organization = currentOrganizationId;
                    notification.createdUser = currentUserId;
                    notification.message = req.__('data-load-notification.cancel') + req.user.fullName;
                    notification.status = 'red';
                    notification.seenUsers.push(currentUserId);
                    notification.save();
                    return res.json({
                        error: false,
                        message: req.__('data-load.cancel.success'),
                        data: dataLoadInfo
                    });
                });
                
            });

        });
};

exports.confirmCurrent = (req, res, next) => {
    let currentOrganizationId = Organization.currentOrganizationId(req);
    let currentUserId = req.user._id;

    DataLoad
        .findOne({
            organization: currentOrganizationId,
            confirmed: false,
            'deleted.isDeleted': {'$ne': true}
        })
        .populate({
            path: 'details',
            model: 'DataLoadDetail'
        })
        .exec((err, dataLoad) => {
            if (err) {
                logger.error(err, req, 'dataLoad.controller#currentInfo', 'Error trying to fetch current DataLoad info');
            }

            if (!dataLoad) {
                return res.json({
                    error: true,
                    message: req.__('data-load.confirm.error.no-data-load-in-progress'),
                    data: null
                });
            }


            DataLoadDetail.find({dataLoad: dataLoad._id})
                .exec((err, details) => {
                    details = details || [];

                    DataLoad.confirm(dataLoad, details, (err, confirmResults) => {
                        console.log('confirmResults', confirmResults);

                        if (err) {
                            return res.json({
                                error: true,
                                data: err.user_message ? err.user_message : "Existe un error en los datos del Excel"
                            });
                        }
                        DataLoad.dataLoadInfo(currentOrganizationId, (err, dataLoadInfo) => {
                            if (err) {
                                logger.error(err, req, 'dataLoad.controller#currentInfo', 'Error trying to fetch current DataLoad info');
                            }
                            
                            //To ensure no race conditions from reloading from the database, the current DataLoad is forced as undefined
                            dataLoadInfo.current = null;
                            return res.json({
                                error: false,
                                data: dataLoadInfo
                            });
                        });
                    });
                });
        });
};

let appRoot = require('app-root-path');

exports.downloadPlantilla = (req, res, next) => {
    let file = appRoot.path + '/src/server/public/sources/plantilla.xlsx';
    res.download(file);
};
