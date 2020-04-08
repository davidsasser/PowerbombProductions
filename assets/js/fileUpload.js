$(document).ready(function(){
    $("input#imageFile").change(function () {
        if ($("input#imageFile").val() == "") {
            return;
        }
        // your ajax submit
        $("label#fileNameLabel").text($('input#imageFile')[0].files[0].name);
    });
});