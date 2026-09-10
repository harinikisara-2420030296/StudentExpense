import sqlite3
from werkzeug.security import generate_password_hash


DATABASE = "students.db"


def get_connection():
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    return connection


def create_database():
    connection = get_connection()

    connection.execute("""
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    """)

    connection.commit()
    connection.close()


def create_student(name, email, password):
    connection = get_connection()


#here manam we used hashed password so that manam every password no need to save so we use the hased version so the stronger the passwrod the saferrrr andukuu guyss!!..
   
    hashed_password = generate_password_hash(password)

    try:
        connection.execute(
            """
            INSERT INTO students (name, email, password)
            VALUES (?, ?, ?)
            """,
            (name, email, hashed_password)
        )

        connection.commit()
        return True

    except sqlite3.IntegrityError:
        return False

    finally:
        connection.close()


def get_student_by_email(email):
    connection = get_connection()

    student = connection.execute(
        """
        SELECT * FROM students
        WHERE email = ?
        """,
        (email,)
    ).fetchone()

    connection.close()

    return student