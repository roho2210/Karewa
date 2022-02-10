const utils = require('./../testUtils');


module.exports = {
    before: utils.middlewares.before,
    beforeEach: utils.middlewares.beforeEach,


    'Settings': function (browser) {

        browser

            .click('//a[contains(text(), " Configuración ")]')
            .assert.containsText(utils.xpath.body(), "Imagen de portada")

            .assert.visible(utils.xpath.elementWithText("a", "Cambiar Imagen"))
            .setValue(utils.xpath.elementWithId("input","file"),require('path').resolve(__dirname + '/monitorTest.png'))

            .pause(1000)
            .assert.visible(utils.xpath.elementWithText("a", " Editar"))
            .execute(function(){

                document.querySelectorAll('a.btn-raised.button-accent.b-shadow-none.p-t-5.p-b-5.m-l-15')[0].click()

            })

            .assert.visible(utils.xpath.elementWithPlaceholder("input","Titulo"))
            .clearValue(utils.xpath.elementWithPlaceholder("input","Titulo"))
            .setValue(utils.xpath.elementWithPlaceholder("input","Titulo"), " 2.0")

            .assert.visible(utils.xpath.elementWithPlaceholder("textarea", "Aquí podrás obtener información sobre los procedimientos de licitaciones para comparar la compra, renta y contratación de serviciosque se realizan en el Monitor Karewa."))
            .clearValue(utils.xpath.elementWithPlaceholder("textarea","Aquí podrás obtener información sobre los procedimientos de licitaciones para comparar la compra, renta y contratación de serviciosque se realizan en el Monitor Karewa."))
            .setValue(utils.xpath.elementWithPlaceholder("textarea","Aquí podrás obtener información sobre los procedimientos de licitaciones para comparar la compra, renta y contratación de serviciosque se realizan en el Monitor Karewa."), "Aquí podras obtener información sobre los procedimientos de contrataciones públicas, incluyendo la compra, renta y contratación de servicios que se realizan")

            .pause(1000)
            .assert.visible(utils.xpath.elementWithText("a", "Guardar"))
            .execute(function(){

                document.querySelectorAll('a.btn-raised.button-accent.b-shadow-none.p-t-5.p-b-5.m-l-15')[1].click()

            })

            .pause(500)
            .assert.visible(utils.xpath.elementWithText("a","Personalización de la plataforma"))
            .execute(function(){

                document.querySelectorAll('a#material-tab')[1].click()

            })

            .assert.visible(utils.xpath.elementWithText("a", " Editar"))
            .execute(function(){
                //Click en el boton , se usa este metodo ya que como son varios de la otra forma se interceptan entre ellos
                document.querySelectorAll('a.btn-raised.button-accent.b-shadow-none.p-t-5.p-b-5')[2].click()

            })

            .assert.visible(utils.xpath.elementWithText("li", "Morado"))
            .execute(function(){
                //Click en el boton , se usa este metodo ya que como son varios de la otra forma se interceptan entre ellos
                document.querySelectorAll('button.controls')[2].click()

            })

            .pause(1000)
            .end();
    }



};
