import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import "./Home.css";
import { SQLiteDBConnection } from "react-sqlite-hook";
import { sqlite } from "../App";

const Home: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const [click, setClick] = useState<any>(true);

  const getData = async () => {
    try {
      let db: SQLiteDBConnection = await sqlite.createConnection("db_issue9");
      await db.open();
      let query = "SELECT * FROM uneti_online_config";

      let res: any = await db.query(query);
      setData(res.values);
      await db.close();
      sqlite.closeConnection("db_issue9");

      return;
    } catch (err) {
      console.log(`Error: ${err}`);
      return;
    }
  };

  const postData = async (data: any) => {
    try {
      let db: SQLiteDBConnection = await sqlite.createConnection("db_issue9");
      await db.open();
      const query = `INSERT INTO uneti_online_config (id,fcm_token) VALUES ('${data.id}','${data.fcm_token}')`;
      await db.run(query);

      await db.close();
      sqlite.closeConnection("db_issue9");
      return;
    } catch (err) {
      alert(`Error: ${err}`);
      console.log(`Error: ${err}`);
      return;
    }
  };

  const deleteData = async () => {
    try {
      let db: SQLiteDBConnection = await sqlite.createConnection("db_issue9");
      await db.open();
      await db.run(`DELETE FROM uneti_online_config`);
      await db.close();
      sqlite.closeConnection("db_issue9");
      return;
    } catch (err) {
      alert(`Error: ${err}`);
      console.log(`Error: ${err}`);
      return;
    }
  };

  useEffect(() => {
    getData();
    console.log(click);
  }, [click]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Quản lý sinh viên</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" className="title">
              Quản lý sinh viên
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        {data.map((item: any) => (
          <div key={item.id}>
            {item.id} - {item.fcm_token}
          </div>
        ))}
        <IonButton
          onClick={async () => {
            await postData({
              id: Date.now(),
              fcm_token: "jkasdkjfdnksjfnkasdjnfjkas",
            });
            setClick(!click);
          }}
        >
          Add
        </IonButton>
        <IonButton
          onClick={async () => {
            await deleteData();
            setClick(!click);
          }}
        >
          Clear data
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
