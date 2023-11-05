import { Spin } from "antd";

export const Loader = (
    <div className="loadingComponent" style={{width:"100%", height: "100vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
      <Spin size="large" />
    </div>
  );