module.exports = {
    formatDate: function(timestamp) {
        var d = new Date(timestamp + "UTC")
        var formattedDate = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
        var am_pm = (d.getHours() > 11) ? "PM" : "AM"
        var hours = (d.getHours() < 1) ? "12" : d.getHours();
        hours = (hours > 12 ) ? hours - 12 : hours;
        var minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
        var formattedTime = hours + ":" + minutes + " " + am_pm;
        return (formattedDate + " " + formattedTime);
    }
}