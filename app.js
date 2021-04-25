// Дэлгэцтэй ажиллах контроллер --------------------------------------------------------------------------------------------------------
var uiController = (function () {

    var DOMStrings = { // html - с утгуудыг барьж авч тусдаа нэг ОБ - д хийж байна
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn"

    };

    return { // Энэ бол PUBLIC SERVICE юм
        getInput: function () {
            return {
                // type: document.querySelector(".add__type").value, 
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            };
        },

        getDOMstrings: function () {
            return DOMStrings;
        }
    }
})();

// Санхүүтэй ажиллах контроллер -----------------------------------------------------------------------------------------------------------
var financeController = (function () {

})();

// Программын холбогч контроллер --------------------------------------------------------------------------------------------------------------------
var appController = (function (uiController, financeController) {

    var DOM = uiController.getDOMstrings();

    var ctrlAddItem = function () {
        // 1. Оруулах өгөгдлийг дэлгэцээс олж авна.
        console.log(uiController.getInput())
        // 2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална.
        // 3. Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана. 
        // 4. Төсвийг тооцоолно.
        // 5. Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана. 
    }

    document.querySelector(DOM.addBtn).addEventListener("click", function () {
        ctrlAddItem();
    });

    document.addEventListener("keypress", function (event) {
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });


})(uiController, financeController);
