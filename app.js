// Дэлгэцтэй ажиллах контроллер --------------------------------------------------------------------------------------------------------
var uiController = (function () {

    var DOMStrings = { // html - с утгуудыг барьж авч тусдаа нэг ОБ - д хийж байна
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn",
        incomeList: ".income__list",
        expenseList: ".expenses__list",
        tusuvLabel: ".budget__value",
        incomeLabel: ".budget__income--value",
        expenseLabel: ".budget__expenses--value",
        percentageLabel: ".budget__expenses--percentage",
        divContainer: ".container"
    };

    return { // Энэ бол PUBLIC SERVICE юм
        getInput: function () {
            return {
                // type: document.querySelector(".add__type").value, 
                type: document.querySelector(DOMStrings.inputType).value, // exp, inc
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseInt(document.querySelector(DOMStrings.inputValue).value)
            };
        },

        getDOMstrings: function () {
            return DOMStrings;
        },

        clearFields: function () {
            var fields = document.querySelectorAll(DOMStrings.inputDescription + "," + DOMStrings.inputValue);

            // Convert list to array 
            var fieldsArr = Array.prototype.slice.call(fields); // filedArr = [цалин, 50000]
            fieldsArr.forEach(function (el, index, array) {
                el.value = "";
            });
            fieldsArr[0].focus();

            // for (var i = 0; i < fieldsArr.length; i++) {
            //     fieldsArr[i].value = "";
            // }
        },


        tusviigUzuuleh: function (tusuv) {
            document.querySelector(DOMStrings.tusuvLabel).textContent = tusuv.tusuv;
            document.querySelector(DOMStrings.incomeLabel).textContent = tusuv.totalInc;
            document.querySelector(DOMStrings.expenseLabel).textContent = tusuv.totalExp;

            if (tusuv.huvi !== 0) {
                document.querySelector(DOMStrings.percentageLabel).textContent = tusuv.huvi + "%";
            } else {
                document.querySelector(DOMStrings.percentageLabel).textContent = tusuv.huvi;
            }


        },

        deleteListItem: function (id) { // id -р нь inc-1, exp-3 г.м орж ирнэ
            var el = document.getElementById(id) // тухайн id-р ДОМ-с selectleed авчина.  
            el.parentNode.removeChild(el); // el -н parent-г олоод буцаагаад el-ээ устгана гэсэн үг. 
        },

        addListItem: function (item, type) {
            // Орлого зарлагын эле-г агуулсан HTML-г бэлтгэнэ.
            var html, list;
            if (type === "inc") {
                list = DOMStrings.incomeList
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else {
                list = DOMStrings.expenseList
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
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
        this.percentage = -1; // энэ бол тус бүрийн хувийг хадгалах -1 бол одоо хувийг бодоогүй байгаа гэсэн үг. 
    };

    Expense.prototype.calcPercentage = function (totalIncome) { // Санхүүгийн модуль нийт totalIncome буюу data.totals.inc нийт бүх орлогийг дамжуулж өгнө гэсэн үг. 
        if (totalIncome > 0)
            this.percentage = Math.round((this.value / totalIncome) * 100); // this.value бол орж ирсэн зардал гэсэн үг жишээ нь гутал 15000 ч гэдэг юм уу. 
        else this.percentage = 0
    };

    // ОБ болгоноос өөрийнхөө эзлэх хувийг санхүүгийн модуль асуух юм бол хэлж өгнө. 
    Expense.prototype.getPercentage = function () {
        return this.percentage;
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
        },

        tusuv: 0,

        huvi: 1,
    };

    var calculateTotal = function (type) {
        var sum = 0;
        data.items[type].forEach(function (el) { // [цалин, 20]
            sum = sum + el.value;
        })

        data.totals[type] = sum;

    };

    return { // Энэ бол PUBLIC SERVICE юм
        tusuvTootsooloh: function () {
            // Нийт орлогын нийлбэрийг тооцолно.
            calculateTotal("inc");

            // Нийт зарлагын нийлбэрийг тооцолно.
            calculateTotal("exp");

            // Төсвийг шинээр тооцоолно.
            data.tusuv = data.totals.inc - data.totals.exp;

            // Орлого зарлагын хувийг тооцоолно.
            if (data.totals.inc > 0) {
                data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else
                data.huvi = 0;
        },

        calculatePercentages: function () {
            data.items.exp.forEach(function (el) { // el буюу тус аргументаар нь тухайн exp дотор байгаа яг давталтан дээр явж байгаа тэр элем-г өгдөг гэсэн үг.
                el.calcPercentage(data.totals.inc);
            }) // data.exp дотор зөндөө олон зардалууд байж байгаа Об болгон өөрийн хувийг тооцолно. 
        },

        getPercentages: function () { // exp дотор давталт хийгээд бүх зарлагын ОБ-уудаас хувиа надаа өг гэнэ. Авсан хувинуудаа нэг массивт хийгээд тэр массиваа нэхэж буй газарт нь дамжуулна гэсэн үг. 
            var allPercentages = data.items.exp.map(function (el) { // тухайн массивыг гадна талд нь хүлээж авна байна. 
                return el.getPercentage();
            });
            return allPercentages;
        },

        tusviigAvah: function () {
            return {
                tusuv: data.tusuv,
                huvi: data.huvi,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp
            }
        },

        deleteItem: function (type, id) { //type - inc, exp-р    id - г дэлгэцнээс олж авна
            var ids = data.items[type].map(function (el) {  // Бүх id цуглуулах массив хэрэгтэй. id нуудыг цуглуулахын тулд map ФУ ашиглана. Аргумент el нь var Expense, Income construion function-р үүссэн description: "lizing" id: 7 value: 300 юм.
                return el.id;
            });

            var index = ids.indexOf(id);  //  Устгах гэж буй index -г олно.  id нь гаднаас дамжууулсан id гэсэн үг.  Жишээ нь id -д 7 гэж дамжуулсан 7 гэдэг id ids дотор хэддүгээр index- д байна гэдгийг олоод var index -д хийнэ. 


            if (index !== - 1) {
                data.items[type].splice(index, 1);
            }
        },

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

        if (input.description !== "" && input.value !== "") {
            // 2. Олж авсан өгөгдлүsүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална.
            var item = financeController.addItem(input.type, input.description, input.value);

            // 3. Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана. 
            uiController.addListItem(item, input.type);
            uiController.clearFields();

            // Төсвийг шинээр тооцоолоод дэлгэцэнд үзүүлнэ.  
            updateTusuv();
        }
    };

    var updateTusuv = function () {
        // 4. Төсвийг тооцоолно.
        financeController.tusuvTootsooloh();

        // 5. Эцсийн үлдэгдэл.
        var tusuv = financeController.tusviigAvah();

        // 6. Тооцоог дэлгэцэнд гаргана.
        uiController.tusviigUzuuleh(tusuv);
        console.log(tusuv);

        // 7. Элементүүдийн хувийг тооцоолно.
        financeController.calculatePercentages();

        // 8. Элементүүдийн тооцоолсон хувийг хүлээж авна. 
        var allPercentages = financeController.getPercentages();

        // 9. Эдгээр хувийг дэлгэцэнд гаргана.
        console.log(allPercentages);
    };

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

        document.querySelector(DOM.divContainer).addEventListener("click", function (event) {
            var id = event.target.parentNode.parentNode.parentNode.parentNode.id;  // class="item clearfix" id="inc-1" эндээс яг inc-1 гэж хэсгийг авч байна гэсэн үг. 
            if (id) { // Гэхдээ зарим эле-үүд бол id гүй тухайн container-н хаана нь ч бид дарж болно. Өөрөөр хэлбэл бөөрөнхий X -с бусад газар гэсэн үг. Тэр тохиолдол бидэнд хоосон ирээд байгаа. Тиймээс id тай тохиолдолд л гэж нөхцөл шалгана.
                var arr = id.split("-"); // inc-2 -->  ["inc", "2"] 
                var type = arr[0];
                var itemId = parseInt(arr[1]); // split - р салсан ч тус тоо нь string байгаа учир ("2" --> 2)

                // console.log(type + ": " + itemId)

                // 1. Санхүүгийн модулиас type, id ашиглаад устгана. 
                financeController.deleteItem(type, itemId);

                // 2. Дэлгэцнээс энэ эле-г устгана. 
                uiController.deleteListItem(id); // id - г дамжуулах буюу inc-1, exp-5 гэх мэт 

                // 3. Үлдэгдэл тооцоог шинэчилж харуулна. 
                // Төсвийг шинээр тооцоолоод дэлгэцэнд үзүүлнэ.  
                updateTusuv();
            }
        });
    };

    return { // Энэ бол PUBLIC SERVICE юм 
        init: function () {
            console.log("app started");
            uiController.tusviigUzuuleh({
                tusuv: 0,
                huvi: 0,
                totalInc: 0,
                totalExp: 0
            })
            setUpEventListeners();
        }
    }

})(uiController, financeController);

appController.init();
