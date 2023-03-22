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
  const [click, setClick] = useState<any>(0);

  const getData = async () => {
    try {
      let db: SQLiteDBConnection = await sqlite.createConnection("db_issue9");
      await db.open();
      let query = "SELECT * FROM uneti_online_config";

      let res: any = await db.query(query);
      setData(res.values);
      console.log(res.values);

      // await db.close();
      // sqlite.closeConnection("db_issue9");
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
      await db.run(
        `INSERT INTO uneti_online_config (id,fcm_token) VALUES ('${data.id}','${data.fcm_token}')`
      );
      await db.close();
      sqlite.closeConnection("db_issue9");
      return;
    } catch (err) {
      alert(`Error: ${err}`);
      console.log(`Error: ${err}`);
      return;
    }
  };

  const putData = async (id: string, data: any) => {
    try {
      let db: SQLiteDBConnection = await sqlite.createConnection("db_issue9");
      await db.open();
      await db.run(
        `UPDATE students SET id = '${data.id}', name = '${data.name}', address = '${data.address}', avatar = '${data.avatar}', score = ${data.score} WHERE id = '${id}'`
      );
      await db.close();
      sqlite.closeConnection("db_issue9");
      return;
    } catch (err) {
      alert(`Error: ${err}`);
      console.log(`Error: ${err}`);
      return;
    }
  };

  const deleteData = async (id: string) => {
    try {
      let db: SQLiteDBConnection = await sqlite.createConnection("db_issue9");
      await db.open();
      await db.run(`DELETE FROM students WHERE id = '${id}'`);
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
          onClick={() => {
            postData({
              id: Date.now(),
              fcm_token: "jkasdkjfdnksjfnkasdjnfjkas",
            });
            setClick(click + 1);
          }}
        >
          Add
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
