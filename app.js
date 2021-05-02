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
                type: document.querySelector(DOMStrings.inputType).value, // exp, inc
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            };
        },

        getDOMstrings: function () {
            return DOMStrings;
        },

        addListItem: function (item, type) {
            // Орлого зарлагын эле-г агуулсан HTML-г бэлтгэнэ.
            var html, list;
            if (type === "inc") {
                list = ".income__list"
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else {
                list = ".expenses__list"
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            // Тэр html дотроо орлого зарлагын утгуудыг REPLACE ашиглаж өөрчилж өгнө.
            html = html.replace("%id%", item.id);
            html = html.replace("$$DESCRIPTION$$", item.description);
            html = html.replace("$$VALUE$$", item.value);

            // Бэлтгэсэн HTML ээ DOM руу хийж өгнө. 
            document.querySelector(list).insertAdjacentHTML("beforeend", html);
        }
    }
})();

// Санхүүтэй ажиллах контроллер -----------------------------------------------------------------------------------------------------------
var financeController = (function () {
    // private data
    var Income = function (id, description, value) { // Байгуулагч функц  --- /Ерөнхий ОБ-н орлого зарлагыг үүсгээд тэдгээрийг хадгалах массивыг үүсгэв/
        this.id = id;
        this.description = description;
        this.value = value;
    };
    // private data
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // private data
    var data = {     // var incomes = [];  var expences = []; var totalIncomes = 0; var totalExpences = 0; гэж байна гэсэн үг
        items: {
            inc: [],
            exp: []
        },

        totals: {
            inc: 0,
            exp: 0
        }
    };

    return { // Энэ бол PUBLIC SERVICE юм
        addItem: function (type, desc, val) {
            var item, id;

            if (data.items[type].length === 0) id = 1;
            else {
                id = data.items[type][data.items[type].length - 1].id + 1
            }

            if (type === "inc") {
                item = new Income(id, desc, val);
            } else {
                item = new Expense(id, desc, val);
            }

            data.items[type].push(item);

            return item;
        },

        seeData: function () {
            return data;
        }
    };

})();

// Программын холбогч контроллер --------------------------------------------------------------------------------------------------------------------
var appController = (function (uiController, financeController) {
    var ctrlAddItem = function () { // Private function
        // 1. Оруулах өгөгдлийг дэлгэцээс олж авна.
        var input = uiController.getInput();

        // 2. Олж авсан өгөгдлүsүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална.
        var item = financeController.addItem(input.type, input.description, input.value);

        // 3. Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана. 
        uiController.addListItem(item, input.type);
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
