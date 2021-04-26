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
    var Income = function (id, description, value) { // Байгуулагч функц  --- /Ерөнхий ОБ-н орлого зарлагыг үүсгээд тэдгээрийг хадгалах массивыг үүсгэв/
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };


    var data = {     // var incomes = [];  var expences = []; var totalIncomes = 0; var totalExpences = 0; гэж байна гэсэн үг
        allItems: {
            inc: [],
            exp: []
        },

        totals: {
            inc: 0,
            exp: 0
        }
    };

})();

// Программын холбогч контроллер --------------------------------------------------------------------------------------------------------------------
var appController = (function (uiController, financeController) {
    var ctrlAddItem = function () { // Private function
        // 1. Оруулах өгөгдлийг дэлгэцээс олж авна.
        console.log(uiController.getInput())
        // 2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална.
        // 3. Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана. 
        // 4. Төсвийг тооцоолно.
        // 5. Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана. 
    }

    var setUpEventListeners = function () { // Private function
        var DOM = uiController.getDOMstrings();

        document.querySelector(DOM.addBtn).addEventListener("click", function () {
            ctrlAddItem();
        });

        document.addEventListener("keypress", function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };

    return { // Энэ бол PUBLIC SERVICE юм 
        init: function () {
            console.log("app started");
            setUpEventListeners();
        }
    }

})(uiController, financeController);

appController.init();
