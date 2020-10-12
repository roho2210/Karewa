var express = require('express');
var router = express.Router();
var contractController = require('./../controllers/contract.controller');
var Contract = require('./../models/contract.model').Contract;
var securityController = require('./../controllers/security.controller');

/**
 * GET /
 * Renderizar vista principal
 */
router.get('/', securityController.checkPermission(Contract.permission, 'read'), contractController.index);

/**
 * GET /list
 * Consulta de registros
 */
router.get('/list', securityController.checkPermission(Contract.permission, 'read'), contractController.list);

/**
 * POST /save
 * Guardar un registro
 */
router.post('/save', securityController.checkPermission(Contract.permission, 'edit'), contractController.save);

/**
 * POST /save-updated-docs
 * Actualiza la información de varios registros
 */
router.post('/save-updated-docs', securityController.checkPermission(Contract.permission, 'edit'), contractController.saveUpdatedDocs);


/**
 * POST /delete
 * Borrar un registro
 */
router.post('/delete', securityController.checkPermission(Contract.permission, 'delete'), contractController.delete);


/**
 * GET /delete
 * Obtains the suppliers available for this contract
 */
router.get('/retrieve/suppliers', securityController.checkPermission(Contract.permission, 'edit'), contractController.retrieveSuppliers);

/**
 * GET /delete
 * Obtains the suppliers available for this contract
 */
router.get('/retrieve/administrative-units', securityController.checkPermission(Contract.permission, 'edit'), contractController.retrieveAdministrativeUnits);

module.exports = router;
