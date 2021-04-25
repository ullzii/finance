// Дэлгэцтэй ажиллах контроллер
var uiController = (function () {

})();

// Санхүүтэй ажиллах контроллер
var financeController = (function () {

})();

// Программын холбогч контроллер
var appController = (function (uiController, financeController) {

    var ctrlAddItem = function () {
        // 1. Оруулах өгөгдлийг дэлгэцээс олж авна.
        console.log("Дэлгэцээс өгөгдлөө олж авах хэсэг");
        // 2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална.
        // 3. Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана. 
        // 4. Төсвийг тооцоолно.
        // 5. Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана. 
    }

    document.querySelector(".add__btn").addEventListener("click", function () {
        ctrlAddItem();
    });

    document.addEventListener("keypress", function (event) {
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });


})(uiController, financeController);
