$(document).ready(function () {

    $("#btn-submit").click(function (e) {
        e.preventDefault();

        var totalBusinessValue = $("#totalbusinessvalue").val();
        var age = $("#age").val();
        var gender = $("#gender").val();
        var city = $("#city").val();
        var educationLevel = $("input[name='education']:checked").val();  
        var salary = $("#salary").val();
        var joiningDesignation = $("#joiningdesignation").val();
        var designation = $("#designation").val();
        var quarterlyRating = $("input[name='qrating']:checked").val();  

        setTimeout(function () {
            try {
                $.ajax({
                    url: "/api/predict",
                    type: "POST",
                    data: {
                        "totalbusinessvalue": totalBusinessValue,
                        "age": age,
                        "gender": gender,
                        "city": city,
                        "education": educationLevel,
                        "salary": salary,
                        "joiningdesignation": joiningDesignation,
                        "designation": designation,
                        "qrating": quarterlyRating,
                    },
                    success:function(res) {
                        res_status_result = res['prediksi'][0];  
                        console.log(res_status_result);
                        generate_status(res_status_result);
                    }
                });
            } catch (e) {
                console.log("Failed!");
                console.log(e);
            }
        }, 1000)

    })

    function generate_status(status_result) {
        var resultText = (status_result === 1) ? "Stay" : "Not Stay";
        $("#predictionResult").val(resultText);
    }  
})
