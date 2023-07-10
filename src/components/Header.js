import {
  SolutionOutlined,
  UserOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { Steps } from "antd";
import { useSelector } from "react-redux";

const Header = () => {
  const currentStep = useSelector((state) => state.stepper.currentStep);
  return (
    <Steps
      className="header"
      size="medium"
      current={currentStep - 1}
      items={[
        {
          title: "Druh a výška pomoci",
          icon: <WalletOutlined />,
        },
        {
          title: "Informácie o Vás",
          icon: <UserOutlined />,
        },
        {
          title: "Zhrnutie",
          icon: <SolutionOutlined />,
        },
      ]}
    />
  );
};

export default Header;
