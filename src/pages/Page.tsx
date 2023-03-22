import { useEffect, useState } from "react";
import app from "../firebase";
import { SQLiteDBConnection } from "react-sqlite-hook";
import { sqlite } from "../App";

interface ContainerProps {
  data: any;
}

const Page: React.FC<ContainerProps> = ({ data }) => {
  return (
    <div className="container">
      <h1>Màn hình nhận Data</h1>
      <p>{data}</p>
    </div>
  );
};
export default Page;
