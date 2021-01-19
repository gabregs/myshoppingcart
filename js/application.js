var sum = function (total, x) {
  return total + x;
};

var updateSubtotalAndTotalPrice = function () {
  var total = [];

  $("tbody tr").each(function (i, ele) {
    //get the price
    var price = parseFloat($(ele).children(".price").text());
    //get the qty value inside input
    var quantity = parseFloat($(ele).find(".quantity input").val());
    //update subtotal section
    var subtotal = price * quantity;
    $(ele).children(".subtotal").html(subtotal);

    total.push(subtotal);
  });

  var totalPrice = total.reduce(sum);
  $("#totalPrice").html(totalPrice);
};

$(document).ready(function () {
  updateSubtotalAndTotalPrice();

  $(document).on("click", ".btn.remove", function (event) {
    $(this).closest("tr").remove();
    updateSubtotalAndTotalPrice();
  });

  var timeout;

  $(document).on("input", ".quantity input", function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      updateSubtotalAndTotalPrice();
    }, 1000);
  });

  $("#addItem").on("submit", function (event) {
    event.preventDefault();
    var item = $(this).children("[name=item]").val();
    var price = $(this).children("[name=price]").val();
    var quantity = $(this).children("[name=quantity]").val();

    $("tbody").append(`<tr>
    <td class="item">${item}</td>
    <td class="price">${price}</td>
    <td class="quantity"><input type="number" value="${quantity}"><button class="btn btn-warning btn-sm remove ">Cancel</button></td>
    <td class="subtotal"></td>
  </tr>`);

    updateSubtotalAndTotalPrice();
    $(this).children("[name=item]").val("");
    $(this).children("[name=price]").val("");
    $(this).children("[name=quantity]").val("");
  });
});
