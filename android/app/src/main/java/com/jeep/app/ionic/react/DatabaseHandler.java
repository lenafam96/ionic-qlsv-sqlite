package com.jeep.app.ionic.react;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteDatabase.CursorFactory;
import android.database.sqlite.SQLiteOpenHelper;

public class DatabaseHandler extends SQLiteOpenHelper{
    private static final String DATABASE_NAME = "db_issue9";
    private static final int DATABASE_VERSION = 1;
    private static final String TABLE_NAME = "uneti_online_config";

    private static final String KEY_ID = "id";
    private static final String KEY_FCM_TOKEN = "fcm_token";


    public DatabaseHandler(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        String create_students_table = String.format("CREATE TABLE IF NOT EXISTS %s(%s TEXT PRIMARY KEY NOT NULL, %s TEXT NOT NULL)", TABLE_NAME, KEY_ID, KEY_FCM_TOKEN);
        db.execSQL(create_students_table);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        String drop_students_table = String.format("DROP TABLE IF EXISTS %s", TABLE_NAME);
        db.execSQL(drop_students_table);

        onCreate(db);
    }

    void insert(){
        SQLiteDatabase db = getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put(KEY_ID, "19103100165");
        values.put(KEY_FCM_TOKEN, "student.getAddress()");
        db.insert(TABLE_NAME, null, values);
        db.close();
        System.out.println("insert thành công!");
    }

    void select(){
        String query = "SELECT * FROM " + TABLE_NAME;

        SQLiteDatabase db = this.getReadableDatabase();
        Cursor cursor = db.rawQuery(query, null);
        cursor.moveToFirst();
        System.out.println("Select all!");
        while(cursor.isAfterLast() == false) {
            System.out.println(cursor.getString(0)+" - "+cursor.getString(1));
            cursor.moveToNext();
        }
    }
}