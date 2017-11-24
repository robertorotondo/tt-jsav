// APP
var storage;
const HOST = "http://demo9792543.mockable.io/api/v1";

window.onload = function () {
    storage = window.localStorage;
    var usuario,
        sendForm = document.getElementById("sendForm"),
        formulario = document.getElementById("formulario");

    try {
        $GET(HOST + "/usuario", function ($return) {
            var lista = JSON.parse($return);
            usuario = new Usuario( lista || []);
            usuario.showUsuario("tabela_usuarios", lista);
        });
    } catch (exec) {
        console.log(exec);
    }

    sendForm.addEventListener("mousedown", function () {
        if (formulario.reportValidity()) {
            var form_usuario = {
                nome: formulario.nome.value,
                email: formulario.email.value,
                tel: formulario.tel.value
            };
            usuario.addUsuario(form_usuario);

            alertVibrate(100);
            formulario.nome.value = "";
            formulario.email.value = "";
            formulario.tel.value = "";

        } else {
            alertVibrate(1000);
        };

        console.log(usuario.cadastrados);
    });

    var searchUsuario = document.getElementById("searchUsuario"),
        formulario_search = document.getElementById("form_search");

    searchUsuario.addEventListener("mousedown", function () {
        var filtrados = usuario.searchUsuario(formulario_search.search.value);
        usuario.showUsuario("tabela_usuarios", filtrados);

    });


}

