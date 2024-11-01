$(document).ready(function() {
    let customerArray = [];

    // Validation functions
    const validateMobile = (mobile) => {
        const sriLankanMobileRegex = /^(?:\+94|0)?7[0-9]{8}$/;
        return sriLankanMobileRegex.test(mobile);
    };

    function validateNIC(nic) {
        const sriLankanNICRegex = /^(?:\d{9}[vV]|\d{12})$/;
        return sriLankanNICRegex.test(nic);
    }

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
        let customerId = $('#customerId').val().trim();
        let customerName = $('#customerName').val().trim();
        let address = $('#address').val().trim();
        let contactNo = $('#contactNo').val().trim();
        let nicNo = $('#nicNo').val().trim();

        //validation part
        if (customerName.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please fill in the name!",
            });
        } else if (!validateNIC(nicNo)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Incorrect NIC format!",
            });
        } else if (!validateMobile(contactNo)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Incorrect mobile number!",
            });
        } else if (address.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please fill in the address!",
            });
        } else {
            customerArray.push({ customerId, customerName, address, contactNo, nicNo });
            updateCustomerTable();
            clearForm();
        }
    });

    // Update Button Click
    $('.btn:contains("Update")').click(function() {
        let customerId = $('#customerId').val().trim();
        let customerName = $('#customerName').val().trim();
        let address = $('#address').val().trim();
        let contactNo = $('#contactNo').val().trim();
        let nicNo = $('#nicNo').val().trim();

        if (customerId) {
            let customer = customerArray.find(c => c.customerId === customerId);
            if (customer) {
                customer.customerName = customerName;
                customer.address = address;
                customer.contactNo = contactNo;
                customer.nicNo = nicNo;

                updateCustomerTable();
                clearForm();
            }
        }
    });

    // Delete Button Click
    $('.btn:contains("Delete")').click(function() {
        let customerId = $('#customerId').val().trim();

        if (customerId) {
            customerArray = customerArray.filter(c => c.customerId !== customerId);
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
        let customerId = $('#customerId').val().trim();
        let customerName = $('#customerName').val().trim();

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