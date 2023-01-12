import { FallOutlined, RiseOutlined } from "@ant-design/icons";
import { Statistic } from "antd";
import CountUp from "react-countup";

const formatter = (value) => <CountUp duration={1} end={value} separator="," />;
const money_formatter = (value) => (
  <CountUp duration={1} end={value} separator="," prefix={"£"} />
);

function monthComparison(thisMonthOrder, lastMonthOrder) {
  let arrow = '='
  let color = { color : "#e8a547" }
  if(thisMonthOrder > lastMonthOrder) {
    arrow = <RiseOutlined />
    color = { color: "#3f8600" }
  }
  else if(thisMonthOrder < lastMonthOrder) {
    arrow = <FallOutlined />
    color = { color: "#cf1322" }
  }

  return (
    <Statistic
      title="Orders this Month"
      value={thisMonthOrder}
      formatter={formatter}
      valueStyle={color}
      suffix={
        <small>
          {arrow}
          {Math.abs(thisMonthOrder-lastMonthOrder)}
        </small>
      }
    />
  )
}

export { formatter, money_formatter, monthComparison };
