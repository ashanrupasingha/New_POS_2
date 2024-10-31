$(document).ready(function() {
    // Function to clear form fields
    function clearForm() {
        $('#customerId').val('');
        $('#contactNo').val('');
        $('#customerName').val('');
        $('#nicNo').val('');
        $('#address').val('');
    }

    // Add Button Click
    $('.btn:contains("Add")').click(function() {
        let customerId = $('#customerId').val();
        let customerName = $('#customerName').val();
        let address = $('#address').val();
        let contactNo = $('#contactNo').val();
        let nicNo = $('#nicNo').val();

        if (customerId && customerName && address && contactNo && nicNo) {
            // Add new row to the table
            $('table tbody').append(`
                <tr>
                    <td>${customerId}</td>
                    <td>${customerName}</td>
                    <td>${address}</td>
                    <td>${contactNo}</td>
                    <td>${nicNo}</td>
                </tr>
            `);
            clearForm();
        } else {
            alert('Please fill all fields to add a customer.');
        }
    });

    // Update Button Click
    $('.btn:contains("Update")').click(function() {
        let customerId = $('#customerId').val();
        let customerName = $('#customerName').val();
        let address = $('#address').val();
        let contactNo = $('#contactNo').val();
        let nicNo = $('#nicNo').val();

        if (customerId) {
            // Find the row with matching Customer ID
            let row = $('table tbody tr').filter(function() {
                return $(this).find('td:first').text() === customerId;
            });

            if (row.length) {
                // Update row data
                row.find('td:eq(1)').text(customerName);
                row.find('td:eq(2)').text(address);
                row.find('td:eq(3)').text(contactNo);
                row.find('td:eq(4)').text(nicNo);
                clearForm();
            } else {
                alert('Customer ID not found.');
            }
        } else {
            alert('Please enter Customer ID to update.');
        }
    });

    // Delete Button Click
    $('.btn:contains("Delete")').click(function() {
        let customerId = $('#customerId').val();

        if (customerId) {
            // Find and remove the row with matching Customer ID
            $('table tbody tr').filter(function() {
                return $(this).find('td:first').text() === customerId;
            }).remove();
            clearForm();
        } else {
            alert('Please enter Customer ID to delete.');
        }
    });

    // Clear Button Click
    $('.btn:contains("Clear")').click(function() {
        clearForm();
    });

    // Search Button Click
    $('.btn:contains("Search")').click(function() {
        let customerId = $('#customerId').val();Item
        let customerName = $('#customerName').val();

        if (customerId || customerName) {
            // Filter rows based on Customer ID or Customer Name
            $('table tbody tr').each(function() {
                let rowCustomerId = $(this).find('td:eq(0)').text();
                let rowCustomerName = $(this).find('td:eq(1)').text();

                if ((customerId && rowCustomerId === customerId) || (customerName && rowCustomerName === customerName)) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        } else {
            alert('Please enter Customer ID or Name to search.');
        }
    });
});
