import { Tag } from 'antd';

const getColorProduct = (product) => {
  const colorScheme = {
    "bowtie": "#cfdfff",
    "bow": "#d0f0fd",
    "fish necklace": "#c1f6e9",
    "mouse earrings": "#d0f7c3",
    "i heart milk brooch": "#feeab6",
    "fishbone necklace": "#fee2d5",
  }
  return colorScheme[product];
}

const getColorStatus = (orderState) => {
  const colorScheme = {
    "in_progress": "#d0f7c3",
    "placed": "#c1f6e9",
    "shipped": "#d0f0fd",
    "cancelled": "#cfdfff"
  }
  return colorScheme[orderState];
}

const ColumnScheme = [
  {
    key: "orderId",
    title: "Order ID",
    render: (_, row) => {
      return row.orderId;
    }
  },
  {
    key: "productName",
    title: "Product Name",
    render: (_, row) => {
      return <Tag color={getColorProduct(row.productName)} style={{ color: "black" }}>{row.productName}</Tag>
    }
  },
  {
    key: "customerName",
    title: "Customer Name",
    render: (_, row) => {
      return row.customerName;
    }
  },
  {
    key: "email",
    title: "Email",
    render: (_, row) => {
      return row.email;
    }
  },
  {
    key: "address",
    title: "Address",
    render: (_, row) => {
      return row.address;
    }
  },
  {
    key: "price",
    title: "Price",
    render: (_, row) => {
      return "£"+row.price;
    }
  },
  {
    key: "orderStatus",
    title: "Status",
    render: (_, row) => {
      return <Tag color={getColorStatus(row.orderStatus)} style={{ color: "black" }}>{row.orderStatus}</Tag>
    }
  },
]

export default ColumnScheme;
