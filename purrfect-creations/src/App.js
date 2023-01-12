import "./App.css";
import "antd/dist/reset.css";

import {
  Row,
  Col,
  Table,
  Statistic,
  Card,
  Typography,
  ConfigProvider,
  theme,
  Spin,
} from "antd";
import {
  useEffect,
  useState,
} from "react";
import {
  formatter,
  money_formatter,
  monthComparison,
} from "./util"

import axios from "axios"
import ColumnScheme from "./table"
import DayNightToggle from "react-day-and-night-toggle"


const client = axios.create({
  baseURL: "http://localhost:3001/",
});

function App() {
  const [info, setInfo] = useState(null);
  const [orders, setOrders] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    client.get("/general-info").then((response) => {
      setInfo(response.data);
    });
    client.get("last-orders").then((response) => {
      setOrders(response.data);
    });
  }, []);

  return (
    <div className={isDarkMode ? "dark" : "light"}>
      <div className={`header ${isDarkMode ? "header-light" : "header-light"}`}>
        <div className="text">Purrfect Creations</div>
        <DayNightToggle
          className="button"
          onChange={() => setIsDarkMode(!isDarkMode)}
          checked={isDarkMode}
        />
      </div>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        <Row>
          <Col span={16} offset={4}>
            <Row style={{ minHeight: "20vh" }}>
              <Col span={6} className="center">
                <Card bordered>
                  {
                    info
                    ? <Statistic
                      title="Total Orders"
                      value={info.totalOrderCount}
                      formatter={formatter}
                    />
                    : <Spin/>
                  }
                </Card>
              </Col>
              <Col span={6} className="center">
                <Card bordered>
                  {
                    info
                    ? monthComparison(info.lastMonthCount, info.prevMonthCount)
                    :<Spin/>
                  }
                </Card>
              </Col>
              <Col span={6} className="center">
                <Card bordered>
                  {
                    info
                    ? <Statistic
                      title="Orders in Progress"
                      value={info.inProgressCount}
                      formatter={formatter}
                    />
                    : <Spin/>
                  }
                </Card>
              </Col>
              <Col span={6} className="center">
                <Card bordered>
                  {
                    info
                    ? <Statistic
                      title="Revenue"
                      value={info.totalRev}
                      formatter={money_formatter}
                    />
                    : <Spin/>
                  }
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col span={24} className="center">
            <Typography.Title>Last Orders</Typography.Title>{" "}
          </Col>
          <Col span={24} className="center">
            <Table
              bordered
              dataSource={orders}
              columns={ColumnScheme}
              rowKey="orderId"
              pagination={false}
              loading={{ indicator: <Spin/>, spinning:!orders}}
            />
          </Col>
        </Row>
      </ConfigProvider>
    </div>
  );
}

export default App;
