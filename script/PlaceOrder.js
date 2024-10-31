$(document).ready(function() {
    let orderItems = [];
    let totalAmount = 0;

    // Function to clear item selection fields
    function clearItemForm() {
        $('.item-select input').val('');
    }

    // Add Item Button Click Event
    $('.item-select .btn').click(function() {
        let itemCode = $('.item-select input[placeholder="Item Code"]').val();
        let itemName = $('.item-select input[placeholder="Item Name"]').val();
        let unitPrice = parseFloat($('.item-select input[placeholder="Unit Price"]').val());
        let qty = parseInt($('.item-select input[placeholder="Qty"]').val());
        let qtyOnHand = parseInt($('.item-select input[placeholder="Qty On Hand"]').val());

        // Validate input
        if (!itemCode || !itemName || !unitPrice || !qty || qty > qtyOnHand) {
            alert("Please enter valid item details and ensure quantity does not exceed stock.");
            return;
        }

        let itemTotal = unitPrice * qty;

        // Add item to order items list
        orderItems.push({ itemCode, itemName, unitPrice, qty, itemTotal });
        totalAmount += itemTotal;

        // Update Order Summary Table
        $('.table tbody').append(`
            <tr>
                <td>${itemCode}</td>
                <td>${itemName}</td>
                <td>${unitPrice.toFixed(2)}</td>
                <td>${qty}</td>
                <td>${itemTotal.toFixed(2)}</td>
            </tr>
        `);

        // Update totals in Order Summary
        $('.order-summary p:contains("Total:")').text(`Total: ${totalAmount.toFixed(2)}`);
        $('.order-summary p:contains("Sub Total:")').text(`Sub Total: ${totalAmount.toFixed(2)}`);

        // Clear item selection form
        clearItemForm();
    });

    // Balance Calculation on Cash or Discount Change
    $('.order-summary input[placeholder="Cash"], .order-summary input[placeholder="Discount"]').on('input', function() {
        let cash = parseFloat($('.order-summary input[placeholder="Cash"]').val()) || 0;
        let discount = parseFloat($('.order-summary input[placeholder="Discount"]').val()) || 0;
        let balance = cash - (totalAmount - discount);

        $('.order-summary input[placeholder="Balance"]').val(balance.toFixed(2));
    });

    // Purchase Button Click Event
    $('.order-summary .btn').click(function() {
        let cash = parseFloat($('.order-summary input[placeholder="Cash"]').val());
        let discount = parseFloat($('.order-summary input[placeholder="Discount"]').val()) || 0;
        let balance = cash - (totalAmount - discount);

        if (balance >= 0) {
            alert("Transaction successful!");

            // Optionally save transaction details or clear data
            orderItems = [];
            totalAmount = 0;
            $('.table tbody').empty();
            $('.order-summary p:contains("Total:")').text('Total: 0.00');
            $('.order-summary p:contains("Sub Total:")').text('Sub Total: 0.00');
            $('.order-summary input').val('');
        } else {
            alert("Insufficient cash amount.");
        }
    });
});
