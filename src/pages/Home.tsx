import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import ListStudent from "../components/ListStudent";
import AddStudent from "../components/AddStudent";
import EditStudent from "../components/EditStudent";
import "./Home.css";
import { SQLiteDBConnection } from "react-sqlite-hook";
import { sqlite } from "../App";

const Home: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const [addPageActive, setAddPageActive] = useState(false);
  const [editPageActive, setEditPageActive] = useState(false);
  const [currentId, setCurrentId] = useState("");

  const getData = async (sort: string = "", search: string = "") => {
    try {
      let db: SQLiteDBConnection = await sqlite.createConnection("db_issue9");
      await db.open();
      let query = "SELECT * FROM students";
      if (search !== "") {
        query += ` WHERE name LIKE '%${search}%'`;
      }
      if (sort !== "") {
        query += " ORDER BY score " + sort;
      }

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
      await db.run(
        `INSERT INTO students (id,name,address,avatar,score) VALUES ('${data.id}','${data.name}','${data.address}','${data.avatar}',${data.score})`
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
  }, [editPageActive]);

  const updateCurrentId = (id: string) => {
    setCurrentId(id);
  };

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
        {addPageActive || editPageActive ? (
          ""
        ) : (
          <ListStudent
            data={data}
            getData={getData}
            addPageActive={addPageActive}
            setAddPageActive={setAddPageActive}
            editPageActive={editPageActive}
            setEditPageActive={setEditPageActive}
            setId={updateCurrentId}
          />
        )}
        {addPageActive ? (
          <AddStudent
            postData={postData}
            addPageActive={addPageActive}
            setAddPageActive={setAddPageActive}
          />
        ) : (
          ""
        )}
        {editPageActive ? (
          <EditStudent
            putData={putData}
            deleteData={deleteData}
            editPageActive={editPageActive}
            setEditPageActive={setEditPageActive}
            currentId={currentId}
          />
        ) : (
          ""
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
