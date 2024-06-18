const sessions = ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];
const totalSeats = 30;
const archiveDepth = 7;
const maxBookingPeriod = 7;

$(document).ready(function() {
    initializeDates();
    $('#date').change(updateSessions);
    $('#session').change(updateSeatingChart);
    loadFromLocalStorage();

    function initializeDates() {
        let today = new Date();
        for (let i = -archiveDepth; i <= maxBookingPeriod; i++) {
            let date = new Date();
            date.setDate(today.getDate() + i);
            let dateString = date.toISOString().split('T')[0];
            $('#date').append(`<option value="${dateString}">${dateString}</option>`);
        }
        updateSessions();
    }

    function updateSessions() {
        let selectedDate = $('#date').val();
        $('#session').empty();
        sessions.forEach(session => {
            let sessionDateTime = new Date(`${selectedDate}T${session}`);
            let now = new Date();
            let isPast = sessionDateTime < now;
            let optionText = isPast ? `${session} (архив)` : session;
            $('#session').append(`<option value="${session}" ${isPast ? 'disabled' : ''}>${optionText}</option>`);
        });
        updateSeatingChart();
    }

    function updateSeatingChart() {
        let selectedDate = $('#date').val();
        let selectedSession = $('#session').val();
        $('#seats').empty();
        if (!selectedSession) return;

        let bookingData = getBookingData(selectedDate, selectedSession);

        for (let i = 0; i < totalSeats; i++) {
            let seatClass = bookingData[i] ? 'booked' : '';
            $('#seats').append(`<div class="seat ${seatClass}" data-seat="${i}"></div>`);
        }

        $('.seat').click(function() {
            if ($(this).hasClass('booked')) return;
            $(this).toggleClass('reserved');
        });
    }

    function getBookingData(date, session) {
        let bookings = JSON.parse(localStorage.getItem('bookings')) || {};
        let dateSessionKey = `${date}-${session}`;
        return bookings[dateSessionKey] || Array(totalSeats).fill(false);
    }

    function loadFromLocalStorage() {
        let today = new Date().toISOString().split('T')[0];
        let bookings = JSON.parse(localStorage.getItem('bookings')) || {};
        for (let key in bookings) {
            let [date, session] = key.split('-');
            if (new Date(date) < new Date(today)) {
                $('#date option[value="' + date + '"]').append(' (архив)');
            }
        }
    }

    function saveToLocalStorage(date, session, data) {
        let bookings = JSON.parse(localStorage.getItem('bookings')) || {};
        let dateSessionKey = `${date}-${session}`;
        bookings[dateSessionKey] = data;
        localStorage.setItem('bookings', JSON.stringify(bookings));
    }

    $(window).on('beforeunload', function() {
        let selectedDate = $('#date').val();
        let selectedSession = $('#session').val();
        let bookingData = getBookingData(selectedDate, selectedSession);
        $('.seat').each(function() {
            let seatIndex = $(this).data('seat');
            bookingData[seatIndex] = $(this).hasClass('booked') || $(this).hasClass('reserved');
        });
        saveToLocalStorage(selectedDate, selectedSession, bookingData);
    });
});
