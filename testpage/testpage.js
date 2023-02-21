var debugFlag = true;

function isCheckWebStorage() {
    document.write("test code.<br>");
    document.write( "localStorage:", localStorage, "<br>");

    if (!localStorage) {
        document.write("このブラウザではlocalStorageは使用できません<br>");

    } else if (localStorage && debugFlag) {
        document.write("このブラウザでは、localStorageを使用できます<br>");
    }
    if (!sessionStorage) {
        document.write("このブラウザでは、sessionStorageは使用できません<br>");
    } else if (sessionStorage && debugFlag) {
        document.write("このブラウザでは、sessionStorageを使用できます<br>");
    }
    document.write("debug,,,<br>");
}


