$(document).ready(function() {
    let itemArray = [];

    // Function to clear form fields
    function clearForm() {
        $('#itemCode').val('');
        $('#itemName').val('');
        $('#description').val('');
        $('#unitPrice').val('');
        $('#qtyOnHand').val('');
    }

    // Function to update the item table based on the array
    function updateItemTable() {
        $('.table-striped-item tbody').empty();
        itemArray.forEach(item => {
            $('.table-striped-item tbody').append(`
                <tr>
                    <td>${item.itemCode}</td>
                    <td>${item.itemName}</td>
                    <td>${item.description}</td>
                    <td>${item.unitPrice}</td>
                    <td>${item.qtyOnHand}</td>
                </tr>
            `);
        });
    }

    // Add Button Click
    $('.btn:contains("Add")').click(function() {
        let itemCode = $('#itemCode').val();
        let itemName = $('#itemName').val();
        let description = $('#description').val();
        let unitPrice = $('#unitPrice').val();
        let qtyOnHand = $('#qtyOnHand').val();

        if (itemCode && itemName && description && unitPrice && qtyOnHand) {
            // Add item to the array
            itemArray.push({ itemCode, itemName, description, unitPrice, qtyOnHand });

            // Update the table
            updateItemTable();

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
            // Find the item in the array and update details
            let item = itemArray.find(i => i.itemCode === itemCode);
            if (item) {
                item.itemName = itemName;
                item.description = description;
                item.unitPrice = unitPrice;
                item.qtyOnHand = qtyOnHand;

                // Update the table
                updateItemTable();

                clearForm();
            }
        }
    });

    // Delete Button Click
    $('.btn:contains("Delete")').click(function() {
        let itemCode = $('#itemCode').val();

        if (itemCode) {
            // Remove the item from the array
            itemArray = itemArray.filter(i => i.itemCode !== itemCode);

            // Update the table
            updateItemTable();

            clearForm();
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
            $('.table-striped-item tbody tr').each(function() {
                let rowItemCode = $(this).find('td:eq(0)').text();
                let rowItemName = $(this).find('td:eq(1)').text();

                if ((itemCode && rowItemCode === itemCode) || (itemName && rowItemName === itemName)) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        }
    });
});
