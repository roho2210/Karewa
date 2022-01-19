/*

--------------Guía de contribución al i18n---------------

La estructura general es simple:

{{clasificación}}.{{sub-clasificación}}[.{{llave-del-mensaje}}][.{{llave-del-mensaje}}]


Reglas generales:
    - No se permiten mayúsculas.
    - Todos los segmentos de la llave se separan con punto (.)
    - No se permiten mensajes sin clasificación

        ej.
            x incorrecto:
                "name": "Name"
                "email": "Email"

            ✓ correcto:
                "users.name": "Name"
                "users.email": "Email"

    - Si un segmento tiene más de una palabra, deben separarse con guión (-).
    - No duplicar mensajes para plurales. Se debe usar la pluralización de vue-i18n
        (http://kazupon.github.io/vue-i18n/guide/pluralization.html)

        ej.
            x incorrecto:
                "users.user": "User"
                "users.users": "Users"

            ✓ correcto:
                "users.user": "User | Users"

    - No se permiten acentos, así que de preferencia utiliza "hacks" para palabras que no suenen bien:
        ej. año => anio

    - Como se usa inglés, por favor verifica que lo que escribas es correcto.

        ej.
            x incorrecto:
                clasification
            ✓ correcto:
                classification (doble 's')

            x incorrecto:
                wizzard
            ✓ correcto:
                wizard (una sola 'z')

    - Si ya existe una internacionalización que corresponde a lo que deseas usar, verifica que tenga sentido reutilizarla.

        ej. Si quieres colocar "Email" para user.email y ya existe la siguiente internacionalización:

                "supplier.email": "Email"

            Es tentador usarla, ¿pero que pasa si en un futuro se cambia el valor de la siguiente manera?

                "supplier.email": "Email del Supplier"

            Este uso es incorrecto, por reutilizar el i18n de una llave existente, pero que no corresponde a la misma propiedad,

            Aunque tenga el mismo valor, conceptualmente la i18n puede ser distinta

    - Mantén las clasificaciones juntas y ordenadas. Es tentador agregar tus i18ns al final, pero ayuda a mantener el orden de la aplicación.

            x incorrecto:
                users.foo.1
                suppliers.foo
                users.bar
                users.foo.2
                comparations.baz
                users.baz
                suppliers.bar
                users.foo.3
                comparations.foo
                comparations.bar


            ✓ correcto:
                users.foo.1
                users.foo.2
                users.foo.3
                users.bar
                users.baz
                suppliers.foo
                suppliers.bar
                comparations.foo
                comparations.bar
                comparations.baz


¿Inglés o español?
    Siempre en inglés, salvo por términos que no tiene sentido traducir, o que pierden completamente el significado al ser traducidos.

        Ej.
            x incorrecto:
                fcr (iniciales de Federal Contributor Registry)

            ✓ correcto:
                rfc (iniciales de Registro Federal de Contribuyentes)

 Se prefiere inglés para términos de sistemas.
        Ej. error, info, validations, warning, required

    Si tienes dudas, o ambos lenguajes son viables, puedes basarte en un uso similar que ya exista, o confiar en tu corazón.


--------Clasificaciones (procesos)-------
general
users
suppliers
administrative-units
resources
contracts
calculations
comparations


--------Subclasificaciones (partes de los procesos anteriores)-------
error
success
info
warning
[name-de-propiedad]
[name-de-accion] (ejemplos: "save", "delete")

    --------- Sub-sub-clasificaciones de [name-de-propiedad] ---------

    validations
    status
    [sub-propiedades-de-la-propiedad]



--------Ejemplos-------

"general.app-name": "Monitor Karewa"
"general.copyright": "Black Labs 2019"
"general.error.load-docs": "No fue posible cargar los registros. Por favor recarga la página e intenta nuevamente."
"general.info.loading": "Cargando..."

"users.user": "User"
"users.email": "Email"
"users.email.description": "El email que utilizará el user para acceder a la plataforma."
"users.email.placeholder": "Introduce el email del user."
"users.email.validations.required": "El email del User es requerido."
"users.email.validations.invalid": "Por favor introduce un email válido para el User."
"users.email.status": "Estatus del email"
"users.email.status.pendiente-validacion": "Pendiente de validar"
"users.email.status.validado": "Validado"

"suppliers.error.duplicated": "El Supplier ya se encuentra registrado."
"suppliers.warning.inconsistent-rfc": "El RFC registrado para este Supplier corresponde a una persona moral, pero el Supplier es persona física."
"suppliers.rfc": "RFC del Supplier"
"suppliers.rfc.validations.required": "El RFC del Supplier es requerido."

 */

export default {
    "general.hello-world": "Hello world",
    "general.welcome-to": "Bienvenido a",
    "general.app.name": "Monitor Karewa",
    "general.app.description": "Aquí podrás obtener información sobre los procedimientos de licitaciones para consultar la compra, renta y contratación de servicios que se realizan en el Municipio.",
    "general.app.name.html-strong": "Monitor <strong>Karewa</strong>",
    "general.back": "Atrás",
    "general.close": "Cerrar",
    "general.created-at": "Fecha de creación",
    "general.modal-editable-table.title":"Guardar Registros",
    "general.modal-editable-table.message":"Se modificaran {docsUpdatedLength} registros",
    "general.modal-editable-table.confirmation-question":"¿Estás seguro de guardar los registros modificados?",
    "general.modal-editable-table.cancel-button":"CANCELAR",
    "general.modal-editable-table.ok-button":"GUARDAR",
    "general.card-uploading.loading":"Cargando...",
    "general.card-uploading.might-take-a-while":"Esto proceso puede demorar unos minutos…",
    "general.catalog.update.success":"El registro se ha actualizado exitosamente.",
    "general.files.documents.download":"Descargar",
    "general.files.documents.download-unavailable":"Documento no disponible",
    "general.files.documents.download-document":"Descargar documento",
    "general.files.backup.description":"Puedes descargar el archivo desde la fuente original o utilizar el respaldo de Monitor Karewa.",
    "general.files.backup.original-unavailable":"Enlace original no disponible",
    "general.files.backup.original-download":"Descargar (original)",
    "general.files.backup.backup-unavailable":"Respaldo no disponible",
    "general.files.backup.backup-download":"Descargar (respaldo)",
    "general.modal-alert.download.title":"Descargar datos",
    "general.modal-alert.download.message":"Estás a punto de descargar los datos aplicando los filtros seleccionados.",
    "general.modal-alert.download.question":"¿Estás seguro de continuar con esta acción?",
    "general.modal-alert.download.all":"Descargar lista completa",
    "general.modal-alert.download.filtered":"Descargar datos filtrados",
    "general.modal.wait.message":"Tu documento se descargará en un momento...",

    "calculations.calculation": "Cálculo| Cálculos",


    //Accounts
    "accounts.login.error": "Usuario o contraseña incorrectos. Por favor intenta nuevamente.",
    "accounts.login.info.redirecting": "Por favor inicia sesión para continuar.",
    "accounts.organization.info.redirecting": "Por favor selecciona una Organización para continuar.",
    "accounts.logout.success": "Tu sesión se ha cerrado correctamente.",
    "accounts.password.updated.error": "No fue posible restablecer tu contraseña. Por favor intenta nuevamente.",
    "accounts.password.updated.token-invalid": "Este enlace ha expirado o no es válido. Por favor intenta recuperar tu contraseña nuevamente.",
    "accounts.password.updated.success": "Tu contraseña se ha actualizado correctamente. Por favor inicia sesión nuevamente.",
    
    //Suppliers
    "suppliers.supplier": "Proveedor | Proveedores",
    "suppliers.new.name.label": "Nombre o razón social",
    "suppliers.new.name.sub-label": "A contninuación escribe el nombre o la razón social del proveedor",
    "suppliers.new.name.placeholder": "Introduce el nombre o razón social",
    "suppliers.new.rfc.label": "RFC",
    "suppliers.new.rfc.sub-label": "El RFC del proveedor",
    "suppliers.new.rfc.placeholder": "Introduce el RFC",
    "suppliers.new.notes.label": "Notas adicionales",
    "suppliers.new.notes.sub-label": "Aquí puedes agregar notas adicionales al registro del proveedor",
    "suppliers.new.notes.placeholder": "Introduce notas adicionales",
    "suppliers.name": "Nombre o razón social",
    "suppliers.rfc": "RFC",
    "suppliers.notes": "Notas",
    "suppliers.public.load.error": "La información de Proveedores no se encuentra disponible en este momento.",
    "suppliers.detail.description": "Aquí podrás encontrar la lista de todos los contratos del proveedor ",


    //Organizations
    "organizations.organization": "Organización | Organizaciones",
    "organizations.name" : "Nombre",
    "organizations.short-name" : "Nombre corto",
    "organizations.validation.required":"El campo {field} de la Organización es requerido",
    "organizations.validation.max.name":"El nombre excede los {maxLength} caracteres permitidos",
    "organizations.validation.max.short-name":"El nombre corto excede los {maxLength} caracteres permitidos",
    "organizations.validation.min.short-name":"El nombre corto no cumple con los {minLength} caracteres mínimos",
    "organizations.public.load.error": "La información de Organizaciones no se encuentra disponible en este momento.",

    //Adminsitrative Units
    "administrativeUnits.administrativeUnit": "Unidad administrativa | Unidades administrativas",
    "administrativeUnits.name" : "Nombre",
    "administrativeUnits.notes" : "Notas Adicionales",

    "administrativeUnits.new.name.label": "Nombre",
    "administrativeUnits.new.name.sub-label": "A continuación escribe el nombre de la Unidad Administrativa",
    "administrativeUnits.new.name.placeholder": "Introduce el nombre",
    "administrativeUnits.new.notes.label": "Notas Adicionales",
    "administrativeUnits.new.notes.sub-label": "Aquí puedes escribir notas sobre el usuario",
    "administrativeUnits.new.notes.placeholder": "Introduce las notas adicionales",
    "administrativeUnits.validation.required": "El campo {field} de la U. Administrativa es requerido",


    //Users
    "users.user": "Usuario | Usuarios",
    "users.validation.required":"El campo {field} del Usuario es requerido",
    "users.validation.email":"El correo electronico introducido no tiene un formato válido",
    "users.validation.min.password":"La contraseña debe tener mínimo {minLength} caracteres",
    "users.name" : "Nombre",
    "users.lastName" : "Apellido",
    "users.email" : "Correo Electrónico",
    "users.new.name.label": "Nombre",
    "users.new.name.sub-label": "A continuación escribe el nombre o la razón social del usuario",
    "users.new.name.placeholder": "Introduce el nombre",
    "users.new.last-name.label": "Apellido",
    "users.new.last-name.sub-label": "A continuación escribe el apellido del usuario",
    "users.new.last-name.placeholder": "Introduce el apellido",
    "users.new.email.label": "Correo electrónico",
    "users.new.email.sub-label": "El email del Usuario",
    "users.new.email.placeholder": "Introduce el email del Usuario",
    "users.new.enabled.label": "Habilitado",
    "users.new.enabled.checkbox-label": "Habilitar acceso a la plataforma",
    "users.new.admin-type.label": "Tipo de administrador",
    "users.new.admin-type.sub-label": "Al seleccionar General se tendrá acceso total a la plataforma",
    "users.new.admin-type.radio-button.general": "General",
    "users.new.admin-type.radio-button.custom": "Personalizado",
    "users.new.notes.label": "Notas Adicionales",
    "users.new.notes.sub-label": "Aquí puedes escribir notas sobre el usuario",
    "users.new.notes.placeholder": "Introduce las notas adicionales",

    "users.new.admin-type.radio-button.custom.users": "Usuarios",
    "users.new.admin-type.radio-button.custom.suppliers": "Proveedores",
    "users.new.admin-type.radio-button.custom.organizations": "Organizaciones",
    "users.new.admin-type.radio-button.custom.administrative-units": "Unidades Administrativas",
    "users.new.admin-type.radio-button.custom.contracts": "Contratos",
    "users.new.admin-type.radio-button.custom.resources": "Recursos",
    "users.new.admin-type.radio-button.custom.calculations": "Cálculos",
    "users.new.admin-type.radio-button.custom.settings": "Configuración",


    //Contracts
    "contracts.doc-name": "Contrato | Contratos",
    "contracts.contract": "Contrato",
    "contracts.supplier" : "Proveedor",
    "contracts.administrativeUnit" : "Unidad Administrativa",
    "contracts.amount" : "Cantidad",
    "contracts.category" : "Materia",
    "contracts.administrationPeriod" : "Administración",
    "contracts.fiscalYear" : "Ejercicio",
    "contracts.period" : "Periodo de admin.",
    "contracts.contractId " : "Contrato ID",
    "contracts.partida" : "Partida",
    "contracts.procedureState" : "Estado",
    "contracts.announcementUrl" : "Enlace convocatoria",
    "contracts.announcementDate" : "Fecha convocatoria",
    "contracts.servicesDescription" : "Descripción de obra",
    "contracts.clarificationMeetingDate" : "Junta de aclaraciones",
    "contracts.clarificationMeetingJudgmentUrl" : "URL Junta Aclaraciones",
    "contracts.presentationProposalsDocUrl" : "Documento de Propuesta",
    "contracts.organizerAdministrativeUnit" : "Unidad convocante",
    "contracts.applicantAdministrativeUnit" : "Unidad solicitante",
    "contracts.administrativeUnitType" : "Tipo de Unidad Admin.",
    "contracts.contractNumber" : "Número Contrato",
    "contracts.contractDate" : "Fecha",
    "contracts.contractType" : "Tipo",
    "contracts.totalAmount" : "Cantidad Total",
    "contracts.minAmount" : "Cantidad Mínima",
    "contracts.maxAmount" : "Cantidad Máxima",
    "contracts.totalOrMaxAmount" : "Cantidad Total o Máxima",
    "contracts.contractUrl" : "Enlace Contrato",
    "contracts.areaInCharge" : "Unidad Responsable",
    "contracts.updateDate" : "Fecha de actualización",
    "contracts.isEmpty" : "No se llevaron a cabo procedimientos",





    "contracts.procedureType" : "Tipo de Procedimiento",
    "contracts.validation.required": "El campo {field} del Contrato es requerido",


    "contracts.new.procedure-type.placeholder" : "Selecciona el tipo de procedimiento",
    "contracts.new.category.placeholder" : "Selecciona la materia",
    "contracts.procedure-type.public" : "Público",
    "contracts.procedure-type.no-bid" : "Adjudicación directa",
    "contracts.procedure-type.invitation" : "Por invitación",
    "contracts.new.procedure-type.label" : "Tipo de Procedimiento",
    "contracts.new.category.label" : "Materia",
    "contracts.procedure-type.extension" : "Extensión",
    "contracts.procedure-type.modification" : "Modificación",
    "contracts.procedure-type.adendum" : "Addendum",
    "contracts.procedure-type.adquisition" : "Adquisición",
    "contracts.procedure-type.services" : "Servicios",
    "contracts.procedure-type.lease" : "Arrendamiento",
    "contracts.procedure-type.public-works" : "Obras públicas",
    "contracts.new.administration-period.placeholder" : "Ejemplo. 2017-2019",
    "contracts.new.administration-period.label" : "Administración",
    "contracts.new.administration-period.sub-label" : "A continuación escribe el periodo de administración",
    "contracts.new.fiscal-year.placeholder" : "2009",
    "contracts.new.fiscal-year.label" : "Ejercicio",
    "contracts.new.fiscal-year.sub-label" : "Año fiscal o ejercicio",
    "contracts.new.period.placeholder" : "1o 2011",
    "contracts.new.period.label" : "Periodo",
    "contracts.new.period.sub-label" : "Introduce el periodo que se reporta",
    "contracts.new.contract-id.label" : "ID",
    "contracts.new.contract-id.sub-label" : "Identificador del contrato",
    "contracts.new.contract-id.placeholder" : "XX000/00",
    "contracts.new.partida.placeholder" : "Ejemplo. 'UNICA'",
    "contracts.new.partida.label" : "Partida",
    "contracts.new.partida.sub-label" : "Partida del contrato",
    "contracts.new.procedure-state.placeholder" : "Selecciona el estado",
    "contracts.procedure-state.concluded" : "Concluido",
    "contracts.procedure-state.canceled" : "Cancelado",
    "contracts.procedure-state.deserted" : "Desierto",
    "contracts.procedure-state.in-progress" : "En progreso",
    "contracts.new.procedure-state.label" : "Estado del procedimiento",
    "contracts.new.announcementUrl.placeholder" : "Introduce la url de la convocatoria",
    "contracts.new.announcementUrl.label" : "Hipervínculo a la convocatoria",
    "contracts.new.announcementUrl.sub-label" : "Aquí puedes agregar en enlace de convocatoria o invitación",
    "contracts.new.announcementDate.placeholder" : "Selecciona la fecha",
    "contracts.new.announcementDate.label" : "Fecha de convocatoria",
    "contracts.new.announcementDate.convocatoria.placeholder" : "Selecciona la fecha de convocatoria",
    "contracts.new.announcementDate.sub-label" : "Indica la fecha de convocatoria o invitación",
    "contracts.new.servicesDescription.placeholder" : "Introduce la descripción",
    "contracts.new.servicesDescription.label" : "Descripción de obra",
    "contracts.new.servicesDescription.sub-label" : "Indica la descripción de las obras, bienes o servicios",
    "contracts.new.clarificationMeetingDate.placeholder" : "Selecciona la fecha",
    "contracts.new.clarificationMeetingDate.label" : "Fecha de junta de aclaraciones",
    "contracts.new.clarificationMeetingDate.sub-label" : "Celebración de la junta de aclaraciones",
    "contracts.new.clarificationMeetingJudgmentUrl.placeholder" : "Introduce la dirección",
    "contracts.new.clarificationMeetingJudgmentUrl.label" : "Url de la Presentación de Propuestas",
    "contracts.new.clarificationMeetingJudgmentUrl.sub-label" : "Indica la dirección al documento",
    "contracts.new.presentationProposalsDocUrl.placeholder" : "Introduce la url",
    "contracts.new.presentationProposalsDocUrl.label" : "Enlace a la presentación de la propuesta",
    "contracts.new.presentationProposalsDocUrl.sub-label" : "Indica en enlace a la presentación de la propuesta",
    "contracts.new.supplier.placeholder" : "Selecciona el proveedor",
    "contracts.new.supplier.label" : "Proveedor",
    "contracts.new.organizer-administrative-unit.placeholder" : "Selecciona la unidad",
    "contracts.new.organizer-administrative-unit.label" : "Unidad convocante",
    "contracts.new.applicant-administrative-unit.placeholder" : "Indica la unidad administrativa convocante",
    "contracts.new.applicant-administrative-unit.label" : "Unidad administrativa solicitante",
    "contracts.new.administrative-unit-type.placeholder" : "Selecciona el tipo de unidad",
    "contracts.administrative-unit-type.centralized" : "Centralizada",
    "contracts.administrative-unit-type.descentralized" : "Descentralizada",
    "contracts.new.administrative-unit-type.label" : "Tipo de Unidad administrativa",
    "contracts.new.contract-number.placeholder" : "Introduce el número de contrato",
    "contracts.new.contract-number.label" : "Número de contrato",
    "contracts.new.contract-number.sub-label" : "Indica el número que identifica al contrato",
    "contracts.new.contract-date.placeholder" : "Selecciona la fecha de contrato",
    "contracts.new.contract-date.label" : "Fecha de contrato",
    "contracts.new.contract-date.sub-label" : "Indica la fecha de realización del contrato",
    "contracts.new.contract-type.placeholder" : "Selecciona el tipo",
    "contracts.contract-type.open" : "Abierto",
    "contracts.contract-type.normal" : "Cerrado",
    "contracts.new.contract-type.label" : "Tipo de contrato",
    "contracts.new.min-amount.placeholder" : "Ingresa el monto mínimo",
    "contracts.new.min-amount.label" : "Monto mínimo",
    "contracts.new.min-amount.sub-label" : "Indica el monto mínimo de ser necesario",
    "contracts.new.max-amount.placeholder" : "Ingresa el monto máximo",
    "contracts.new.max-amount.label" : "Monto máximo",
    "contracts.new.max-amount.sub-label" : "Indica el monto máximo de ser necesario",
    "contracts.new.total-or-max-amount.placeholder" : "Ingresa el monto total",
    "contracts.new.total-or-max-amount.label" : "Monto total",
    "contracts.new.total-or-max-amount.sub-label" : "Monto total o Monto máximo, en su caso",
    "contracts.new.total-amount.placeholder" : "Ingresa el monto con impuestos",
    "contracts.new.total-amount.label" : "Monto total c/impuestos",
    "contracts.new.total-amount.sub-label" : "Monto total con impuestos incluidos",
    "contracts.new.contract-url.placeholder" : "Ingresa la url",
    "contracts.new.contract-url.label" : "Enlace a Contrato",
    "contracts.new.contract-url.sub-label" : "Hipervínculo al documento del contrato y anexos",
    "contracts.new.responsible-administrative-unit.placeholder" : "Escribe el nombre del área responsable",
    "contracts.new.responsible-administrative-unit.label" : "Área responsable de la información",
    "contracts.new.update-date.placeholder" : "Selecciona la fecha de actualización",
    "contracts.new.update-date.label" : "Fecha de actualización",
    "contracts.new.update-date.sub-label" : "Indica la fecha en la que ha actualizado el contrato",
    "contracts.new.notes.placeholder" : "Ingresa las notas",
    "contracts.new.notes.label" : "Notas",
    "contracts.new.notes.sub-label" : "Aquí puedes agregar notas adicionales al contrato",
    "contracts.new.karewa-notes.placeholder" : "Ingresa las notas Karewa",
    "contracts.new.karewa-notes.label" : "Notas Karewa",
    "contracts.new.karewa-notes.sub-label" : "Aquí puedes agregar las notas por parte de Karewa",
    "contracts.new.information-date.placeholder" : "Selecciona la fecha de obtención",
    "contracts.new.information-date.label" : "Fecha de obtención de datos",
    "contracts.new.information-date.sub-label" : "Indica la Fecha de obtención de los datos",
    "users.new.limit-exceeded.checkbox-label" : "Exceso en el límite",
    "users.new.limit-exceeded.label" : "Se ha excedido el límite",
    "contracts.new.amount-exceeded.placeholder" : "Ingresa la cantidad",
    "contracts.new.amount-exceeded.label" : "Cantidad excedida",
    "contracts.new.amount-exceeded.sub-label" : "Indica cuál es la cantidad en exceso",
    "contracts.validation.regex.message" : "El campo {field} no tiene el formato correcto.\nEjemplo: {example}",

    //Resources
    "resources.resource": "Recurso | Recursos",
    "resources.title": "Título",
    "resources.classification": "Clasificación",
    "resources.url": "URL",
    "resources.validation.required":"El campo {field} del Recurso es requerido",
    "resources.validation.url":"La Url no tiene el formato correcto",
    "resources.validation.classification":"El valor para la Clasificación del Recurso no es válido",
    "resources.placeholder.classification":"Selecciona clasificación",
    "resources.resource-type.marco-legal":"Marco Legal",
    "resources.resource-type.articulo":"Artículo",
    "resources.resource-type.notas":"Nota",
    "resources.resource-type.website":"Sitio Web",
    "LEGAL_FRAMEWORK":"Marco Legal",
    "ARTICLE":"Artículo",
    "NOTES":"Nota",
    "WEBSITE":"Sitio Web",
    "resources.resource-type.label":"Clasificación",
    "resources.public.load.error":"La información de Recursos no se encuentra disponible en este momento",


    //Calculations

    "calculations.name" : "Nombre",
    "calculations.type" : "Tipo",
    "calculations.description" : "Descripción",
    "calculations.enabled" : "Mostrar resultado",
    "calculations.enabled.label" : "Mostrar resultado a usuarios",
    "calculations.locked" : "Corresponde a Índice de Riesgo",
    "calculations.notes" : "Notas",
    "calculation.new.calculation-type.label": "Tipo de cálculo",
    "calculation.new.calculation-type.sub-label": "Selecciona el tipo de Cálculo",
    "calculation.new.calculation-type.radio-button.general": "General (global)",
    "calculation.new.calculation-type.radio-button.contract": "Contratos de la organización actual (filtrado)",
    "calculation.validation.required":"El campo {field} del Cálculo es requerido",
    "calculations.validation.classification":"El valor para la Clasificación del Recurso no es válido",
    "calculations.validation.abbreviation":"Debe comenzar con $$, ser valores alfanúmericos y tener mínimo 3 y máximo 8 caractéres",
    "calculations.validation.administrationPeriod":"Debe seguir el formato ####-####",
    "calculations.administration-period.placeholder" : "2016-2018",
    "calculations.administration-period.label" : "Periodo de Administración",
    "calculations.administration-period.sub-label" : "A continuación escribe el periodo de administración",
    "GENERAL" : "General",
    "CONTRACT" : "Contrato",
    "PERCENTAGE" : "Porcentaje",
    "AMOUNT" : "Cantidad",


    //DataLoad
    "data-load.title-strong": "Carga de <strong>Datos</strong>",
    "data-load.title.description": "Puedes cargar una plantilla de excel o realizar una carga manual para cada dato.",
    "data-load.title.current-description": "EL archivo <strong class='f-12 c-accent'>{fileName}</strong> se ha subido correctamente, a continuación puedes ver los resultados de los datos.",
    "data-load.data-load": "Carga Rápida",
    "data-load.data-load.recommended-for": "Recomendada para 20 o más registros",
    "data-load.manual-capture": "Carga Manual",
    "data-load.manual-capture.recommended-for": "Recomendada para 1 o 20 registros",
    "data-load.manual-capture.go-to-catalog": "Ir al catálogo",
    "data-load.upload-file": "Cargar archivo",
    "data-load.download-template": "Descargar la plantilla",
    "data-load.download-template.link": "Descarga la plantilla aquí",
    "data-load.error.upload.check-in-progress": "Ocurrió un error inesperado al verificar que no exista una carga de datos. Por favor intenta de nuevo más tarde.",
    "data-load.error.upload.data-load-in-progress": "Ya existe una carga de datos en progreso. Por favor continúa o cancela esa carga antes de cargar otro archivo.",
    "data-load.cancel.error.no-data-load-in-progress": "La carga de datos no se encuentra disponible. Por favor recarga la página para actualizar la información.",
    "data-load.cancel.error.unexpected": "Ocurrió un error inesperado al intentar cancelar la carga de datos. Por favor intenta de nuevo más tarde.",
    "data-load.cancel.success": "Se ha cancelado la carga de datos correctamente.",
    "data-load.review.columns.no-issues": "Sin anotaciones",
    "data-load.review.columns.skipped": "Omitidos",
    "data-load.review.columns.errors": "Errores",
    "data-load.confirm.modal.title": "Confirmar operación",
    "data-load.confirm.modal.confirm-operation": "Estás a punto de confirmar la información cargada de Contratos yey2.",
    "data-load.confirm.modal.confirm-operation-ignore-errors": "Estás a punto de confirmar la información cargada de Contratos, y se ignorarán aquellos Contratos que tienen errores.",
    "data-load.confirm.modal.confirm-operation.question": "¿Deseas continuar y guardar los registros? Esta operación no se puede revertir.",
    "data-load.confirm.success": "Se ha confirmado la carga de datos correctamente.",
    "data-load.confirm.error.unexpected": "Ocurrió un error inesperado al intentar confirmar la carga de datos.",
    "data-load.confirm.error.no-data-load-in-progress": "La carga de datos no se encuentra disponible. Por favor recarga la página para actualizar la información.",
    "data-load.back.button": "Volver a Resultados de Validación",


    //Calculations
    "calculations.formula.expression" : "Fórmula",


    //Enums
    "PUBLIC" :  "Pública",
    "NO_BID" :  "Adjudicación Directa",
    "INVITATION" : "Por invitación",
    "EXTENSION" : "Extensión",
    "MODIFICACION" : "Modificación",
    "ADENDUM" : "Adendum",
    "ACQUISITION" : "Adquisición",
    "SERVICES" : "Servicios",
    "LEASE" : "Arrendamiento",
    "PUBLIC_WORKS" : "Obras públicas",
    "CONCLUDED" : "Concluído",
    "CANCELED" : "Cancelado",
    "DESERTED" : "Desierto",
    "IN_PROGRESS" : "En progreso",
    "CENTRALIZED" : "Centralizado",
    "DESCENTRALIZED" : "Descentralizado",
    "NOT_EXCEEDED" : "Excedido",
    "LIMIT_EXCEEDED" : "No excedido",
    "OPEN" : "Abierto",
    "NORMAL" :  "Normal",

    
    //Comparations

    "comparations.public.load.error": "La información de Comparativas no se encuentra disponible en este momento.",
    "comparations.public.load.corruption-index.error": "La información del Índice de Riesgo de Corrupción no se encuentra disponible en este momento.",
    
    //Settings

    "settings.load-settings.error": "La información general no se encuentra disponible en este momento.",
    "settings.change-cover.update.success": "Se ha actualizado la imagen correctamente.",
    "settings.change-cover.update.error": "No fue posible actualizar la imágen. Por favor intenta de nuevo más tarde",
    "settings.change-settings.update.success": "Se ha actualizado la información general correctamente",
    "settings.change-settings.update.error": "No fue posible actualizar la información general. Por favor intenta de nuevo más tarde",
    "settings.change-theme.update.success": "Se ha actualizado el tema correctamente",
    "settings.change-theme.update.error": "No fue posible actualizar el tema. Por favor intenta de nuevo más tarde",


}
