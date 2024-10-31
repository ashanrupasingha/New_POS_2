$(document).ready(function() {
    // Function to clear form fields
    function clearForm() {
        $('#itemCode').val('');
        $('#unitPrice').val('');
        $('#itemName').val('');
        $('#qtyOnHand').val('');
        $('#description').val('');
    }

    // Add Button Click
    $('.btn:contains("Add")').click(function() {
        let itemCode = $('#itemCode').val();
        let itemName = $('#itemName').val();
        let description = $('#description').val();
        let unitPrice = $('#unitPrice').val();
        let qtyOnHand = $('#qtyOnHand').val();

        if (itemCode && itemName && description && unitPrice && qtyOnHand) {
            // Add new row to the table
            $('.table-striped-item').append(`
                <tr>
                    <td>${itemCode}</td>
                    <td>${itemName}</td>
                    <td>${description}</td>
                    <td>${unitPrice}</td>
                    <td>${qtyOnHand}</td>
                </tr>
            `);
            clearForm();
        }
    });

    // Update Button Click
    $('.btn:contains("Update")').click(function() {
        let itemCode = $('#itemCode').val();
        let itemName = $('#itemName').val();
        let description = $('#description').val();
        let unitPrice = $('#unitPrice').val();
        let qtyOnHand = $('#qtyOnHand').val();

        if (itemCode) {
            // Find the row with matching Item Code
            let row = $('.table-striped-item').filter(function() {
                return $(this).find('td:first').text() === itemCode;
            });

            if (row.length) {
                // Update row data
                row.find('td:eq(1)').text(itemName);
                row.find('td:eq(2)').text(description);
                row.find('td:eq(3)').text(unitPrice);
                row.find('td:eq(4)').text(qtyOnHand);
                clearForm();
            } else {
                alert('Item Code not found.');
            }
        } else {
            alert('Please enter Item Code to update.');
        }
    });

    // Delete Button Click
    $('.btn:contains("Delete")').click(function() {
        let itemCode = $('#itemCode').val();

        if (itemCode) {
            // Find and remove the row with matching Item Code
            $('.table-striped-item').filter(function() {
                return $(this).find('td:first').text() === itemCode;
            }).remove();
            clearForm();
        } else {
            alert('Please enter Item Code to delete.');
        }
    });

    // Clear Button Click
    $('.btn:contains("Clear")').click(function() {
        clearForm();
    });

    // Search Button Click
    $('.btn:contains("Search")').click(function() {
        let itemCode = $('#itemCode').val();
        let itemName = $('#itemName').val();

        if (itemCode || itemName) {
            // Filter rows based on Item Code or Item Name
            $('.table-striped-item').each(function() {
                let rowItemCode = $(this).find('td:eq(0)').text();
                let rowItemName = $(this).find('td:eq(1)').text();

                if ((itemCode && rowItemCode === itemCode) || (itemName && rowItemName === itemName)) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        } else {
            alert('Please enter Item Code or Name to search.');
        }
    });
});
