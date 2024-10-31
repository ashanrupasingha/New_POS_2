$(document).ready(function() {
    let customerArray = [];

    // Function to clear form fields
    function clearForm() {
        $('#customerId').val('');
        $('#customerName').val('');
        $('#address').val('');
        $('#contactNo').val('');
        $('#nicNo').val('');
    }

    // Function to update the customer array table
    function updateCustomerTable() {
        $('.table-striped-customer tbody').empty();
        customerArray.forEach(customer => {
            $('.table-striped-customer tbody').append(`
                <tr>
                    <td>${customer.customerId}</td>
                    <td>${customer.customerName}</td>
                    <td>${customer.address}</td>
                    <td>${customer.contactNo}</td>
                    <td>${customer.nicNo}</td>
                </tr>
            `);
        });
    }

    // Add Button Click
    $('.btn:contains("Add")').click(function() {
        let customerId = $('#customerId').val();
        let customerName = $('#customerName').val();
        let address = $('#address').val();
        let contactNo = $('#contactNo').val();
        let nicNo = $('#nicNo').val();

        if (customerId && customerName && address && contactNo && nicNo) {
            // Add customer to array
            customerArray.push({ customerId, customerName, address, contactNo, nicNo });

            // Update table
            updateCustomerTable();

            clearForm();
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
            // Find the customer in the array and update details
            let customer = customerArray.find(c => c.customerId === customerId);
            if (customer) {
                customer.customerName = customerName;
                customer.address = address;
                customer.contactNo = contactNo;
                customer.nicNo = nicNo;

                // Update table
                updateCustomerTable();

                clearForm();
            }
        }
    });

    // Delete Button Click
    $('.btn:contains("Delete")').click(function() {
        let customerId = $('#customerId').val();

        if (customerId) {
            // Filter out the customer from the array
            customerArray = customerArray.filter(c => c.customerId !== customerId);

            // Update table
            updateCustomerTable();

            clearForm();
        }
    });

    // Clear Button Click
    $('.btn:contains("Clear")').click(function() {
        clearForm();
    });

    // Search Button Click
    $('.btn:contains("Search")').click(function() {
        let customerId = $('#customerId').val();
        let customerName = $('#customerName').val();

        if (customerId || customerName) {
            $('.table-striped-customer tbody tr').each(function() {
                let rowCustomerId = $(this).find('td:eq(0)').text();
                let rowCustomerName = $(this).find('td:eq(1)').text();

                if ((customerId && rowCustomerId === customerId) || (customerName && rowCustomerName === customerName)) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        }
    });
});
