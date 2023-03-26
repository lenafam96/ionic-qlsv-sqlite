import UIKit
import Capacitor
import SQLite3

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        openDatabase()
        query()
        return true
    }

    func applicationWillResignActive(_ application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    }

    func applicationWillTerminate(_ application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    }

    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        // Called when the app was launched with a url. Feel free to add additional processing here,
        // but if you want the App API to support tracking app url opens, make sure to keep this call
        return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
    }

    func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        // Called when the app was launched with an activity, including Universal Links.
        // Feel free to add additional processing here, but if you want the App API to support
        // tracking app url opens, make sure to keep this call
        return ApplicationDelegateProxy.shared.application(application, continue: userActivity, restorationHandler: restorationHandler)
    }
    
    func openDatabase(){
        var db: OpaquePointer?
        let path = NSSearchPathForDirectoriesInDomains(.libraryDirectory, .userDomainMask, true).first!.appending("/CapacitorDatabase")
        if sqlite3_open("\(path)/db_issue9SQLite.db", &db) == SQLITE_OK {
            print("Successfully opened connection to database.")
            // Create the table if it does not already exist
            let createTableStatement = """
                CREATE TABLE IF NOT EXISTS uneti_online_config (
                      id TEXT PRIMARY KEY NOT NULL,
                      fcm_token TEXT NOT NULL
                    );
                """
            if sqlite3_exec(db, createTableStatement, nil, nil, nil) == SQLITE_OK {
                // The table was created successfully or already exists
                print("Table created or already exists")
            } else {
                // There was an error creating the table
                let errorMessage = String(cString: sqlite3_errmsg(db))
                print("Error creating table: (errorMessage)")
            }

            // Close the database connection
            sqlite3_close(db)
        } else {
            print("Unable to open database.")
        }
        print(path)
    }
    
    func insert() {
        var db: OpaquePointer?
        let path = NSSearchPathForDirectoriesInDomains(.libraryDirectory, .userDomainMask, true).first!.appending("/CapacitorDatabase")
        if sqlite3_open("\(path)/db_issue9SQLite.db", &db) == SQLITE_OK {
            let insertStatementString = "INSERT INTO uneti_online_config (id, fcm_token) VALUES (?, ?);"
            var insertStatement: OpaquePointer?
            // 1
            if sqlite3_prepare_v2(db, insertStatementString, -1, &insertStatement, nil) ==
                SQLITE_OK {
                let id: NSString = "19103100162"
                let name: NSString = "Tống Bá Quang Anh"
                // 2
                sqlite3_bind_text(insertStatement, 1, id.utf8String, -1, nil)
                // 3
                sqlite3_bind_text(insertStatement, 2, name.utf8String, -1, nil)
                // 4
                if sqlite3_step(insertStatement) == SQLITE_DONE {
                    print("\nSuccessfully inserted row.")
                } else {
                    print("\nCould not insert row.")
                }
            } else {
                print("\nINSERT statement is not prepared.")
            }
            // 5
            sqlite3_finalize(insertStatement)
            
            // Close the database connection
            sqlite3_close(db)
        }
        else {
            print("Unable to open database.")
        }
    }

    func query() {
        var db: OpaquePointer?
        let path = NSSearchPathForDirectoriesInDomains(.libraryDirectory, .userDomainMask, true).first!.appending("/CapacitorDatabase")
        if sqlite3_open("\(path)/db_issue9SQLite.db", &db) == SQLITE_OK {
            let queryStatementString = "SELECT * FROM uneti_online_config;"
            var queryStatement: OpaquePointer?
            // 1
            if sqlite3_prepare_v2(db, queryStatementString, -1, &queryStatement, nil) == SQLITE_OK {
                // 2
                print("\nQuery Result:")
                while (sqlite3_step(queryStatement) == SQLITE_ROW) {
                    // 3
                    guard let queryResultCol0 = sqlite3_column_text(queryStatement, 0) else {
                        print("Query result is nil")
                        return
                    }
                    let id = String(cString: queryResultCol0)
                    // 4
                    guard let queryResultCol1 = sqlite3_column_text(queryStatement, 1) else {
                        print("Query result is nil")
                        return
                    }
                    let fcm_token = String(cString: queryResultCol1)
                    // 5
                    print("\(id) | \(fcm_token)")
                    }
                } else {
                // 6
                let errorMessage = String(cString: sqlite3_errmsg(db))
                print("\nQuery is not prepared \(errorMessage)")
                }
                // 7
                sqlite3_finalize(queryStatement)
            
            // Close the database connection
            sqlite3_close(db)
        }
        else {
            print("Unable to open database.")
        }
    }

}
