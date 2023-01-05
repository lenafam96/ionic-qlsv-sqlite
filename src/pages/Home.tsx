import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import axios from "axios";
import { useEffect, useState } from "react";
import ExploreContainer from "../components/ExploreContainer";
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
      // await db.run(
      //   `INSERT INTO students (id,name,address,avatar,score) VALUES ('1','Hải','Thái Bình','localhost',10)`
      // );
      let res: any = await db.query("SELECT * FROM students");
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
    // await axios
    //   .post(`${proxy}students/create`, data)
    //   .then((response) => {
    //     console.log(response.data);
    //     // setData(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const putData = async (id: string, data: any) => {
    // await axios
    //   .put(`${proxy}students/` + id, data)
    //   .then((response) => {
    //     console.log(response.data);
    //     // setData(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const deleteData = async (id: string) => {
    // await axios
    //   .delete(`${proxy}students/` + id)
    //   .then((response) => {
    //     console.log(response.data);
    //     // setData(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const addStudent = async () => {
    try {
      let db: SQLiteDBConnection = await sqlite.createConnection("db_issue9");
      await db.open();
      await db.run(
        `INSERT INTO students (id,name,address,avatar,score) VALUES ('2','Thảo','Thái Bình','localhost',9)`
      );
      let res: any = await db.query("SELECT * FROM students");
      setData(res.values);
      await db.close();
      sqlite.closeConnection("db_issue9");
      return;
    } catch (err) {
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
        <IonButton onClick={addStudent}>Thêm</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
