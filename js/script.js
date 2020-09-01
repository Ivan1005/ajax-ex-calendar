$(document).ready(function(){

    var Today = moment("2018-01-01");

    days(Today);
    Holidays(Today);

    $("#next").click(function(){
        if (Today.format("M")!= 12) {
            $("ul.month-list").empty();
            Today.add(1, "months");
            days(Today);
            Holidays(Today);
        }else {
            alert("NON PUOI");
        }
    });
    $("#prev").click(function(){
        if (Today.format("M")!= 1) {
            $("ul.month-list").empty();
            Today.subtract(1, "months");
            days(Today);
            Holidays(Today);
        }else {
            alert("NON PUOI !");
        }
    });
});


function days(data){

    $(".month").text(data.format("MMMM") + " " + data.format("YYYY"));
    var daysInMonth = data.daysInMonth();
    for (var i = 1; i <= daysInMonth; i++) {
        var li = {
            "day": addZero(i),
            "month":data.format("MMMM"),
            "year":data.format("YYYY"),
            "numeri" : data.format("YYYY") + "-" + data.format("MM") + "-" + addZero(i)
        }

        var source = $("#days-template").html();
        var template = Handlebars.compile(source);
        var html = template(li);

        $(".month-list").append(html);
    }


}

function addZero(n){
    if (n<10) {
        return "0"+n;
    }
    return n;
}

function Holidays(date){
    $.ajax ({
        url: "https://flynn.boolean.careers/exercises/api/holidays",
        method: "GET",
        data: {
            year: date.year(),
            month: date.month()
        },
        success: function (risposta){
            for (var i = 0; i < risposta.response.length; i++) {
                var list = $('li[data-complete-date="' + risposta.response[i].date + '"]');
                list.append("- " + risposta.response[i].name);
                list.addClass("holiday");
            }
        }

    })
}
