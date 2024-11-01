$(document).ready(function() {
    let itemArray = [];

    // Validation functions
    const validateItemCode = (itemCode) => {
        const itemCodeRegex = /^I\d{3}$/i; // Item code starting with 'I' followed by 3 digits
        return itemCodeRegex.test(itemCode);
    };

    const validateUnitPrice = (unitPrice) => {
        const unitPriceRegex = /^\d+(\.\d{1,2})?$/; // Allows numbers with up to two decimal places
        return unitPriceRegex.test(unitPrice);
    };

    const validateQtyOnHand = (qtyOnHand) => {
        const qtyOnHandRegex = /^[1-9]\d*$/; // Positive integers only
        return qtyOnHandRegex.test(qtyOnHand);
    };

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
        let itemCode = $('#itemCode').val().trim();
        let itemName = $('#itemName').val().trim();
        let description = $('#description').val().trim();
        let unitPrice = $('#unitPrice').val().trim();
        let qtyOnHand = $('#qtyOnHand').val().trim();

        // Validation part
        if (!validateItemCode(itemCode)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid item code! Should start with 'I' followed by 3 digits.",
            });
        } else if (itemName.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please fill in the item name!",
            });
        } else if (!validateUnitPrice(unitPrice)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid unit price! Use a valid number, e.g., 25.99.",
            });
        } else if (!validateQtyOnHand(qtyOnHand)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid quantity! Enter a positive integer.",
            });
            }   else if (description.length === 0) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Please fill in the Description!",
                });
        } else {
            itemArray.push({ itemCode, itemName, description, unitPrice, qtyOnHand });
            updateItemTable();
            clearForm();
        }
    });

    // Update Button Click
    $('.btn:contains("Update")').click(function() {
        let itemCode = $('#itemCode').val().trim();
        let itemName = $('#itemName').val().trim();
        let description = $('#description').val().trim();
        let unitPrice = $('#unitPrice').val().trim();
        let qtyOnHand = $('#qtyOnHand').val().trim();

        if (itemCode) {
            let item = itemArray.find(i => i.itemCode === itemCode);
            if (item) {
                item.itemName = itemName;
                item.description = description;
                item.unitPrice = unitPrice;
                item.qtyOnHand = qtyOnHand;

                updateItemTable();
                clearForm();
            }
        }
    });

    // Delete Button Click
    $('.btn:contains("Delete")').click(function() {
        let itemCode = $('#itemCode').val().trim();

        if (itemCode) {
            itemArray = itemArray.filter(i => i.itemCode !== itemCode);
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
        let itemCode = $('#itemCode').val().trim();
        let itemName = $('#itemName').val().trim();

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