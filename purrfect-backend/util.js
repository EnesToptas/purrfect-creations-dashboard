module.exports = {
  getDataFromRecord: function(record) {
    return {
      orderId: record.get("order_id"),
      customerName: `${record.get("first_name")}  ${record.get("last_name")}`,
      orderStatus: record.get("order_status"),
      email: record.get("email"),
      address: record.get("address"),
      price: record.get("price"),
      productName: record.get("product_name"),
      orderPlaced: record.get("order_placed"),
    };
  },

  getOrderCountBetween: function(records, lastDate, firstDate) {
    checkDate = (date, lastDate, firstDate) => date > firstDate && date <= lastDate
    return records.filter((record) => checkDate(new Date(record.get("order_placed")), lastDate, firstDate)).length
  },

  getInProgressCount: function(records) {
    return records.filter((record) => record.get("order_status") === "in_progress").length
  },

  getTotalRevenue: function(records) {
    return records.reduce((runningSum, record) => runningSum + record.get("price"), 0)
  },

  getOneMonthPrior: function(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth();
    date.setMonth(date.getMonth() - 1);

    while (date.getMonth() === month) {
      date.setDate(date.getDate() - 1);
    }

    return date
  },
}
