from flask import Flask, render_template, request, redirect, url_for, session, flash
from werkzeug.security import check_password_hash

from database import (
    create_database,
    create_student,
    get_student_by_email
)


app = Flask(__name__)

app.secret_key = "student-expense-tracker-secret-key"


create_database()


@app.route("/")
def home():
    return redirect(url_for("login"))


@app.route("/register", methods=["GET", "POST"])
def register():

    if request.method == "POST":

        name = request.form["name"]
        email = request.form["email"]
        password = request.form["password"]

        if not name or not email or not password:
            flash("Please fill in all fields.")
            return redirect(url_for("register"))

        if len(password) < 6:
            flash("Password must contain at least 6 characters.")
            return redirect(url_for("register"))

        student_created = create_student(
            name,
            email,
            password
        )

        if student_created:
            flash("Account created successfully. Please sign in.")
            return redirect(url_for("login"))

        else:
            flash("An account with this email already exists.")
            return redirect(url_for("register"))

    return render_template("register.html")


@app.route("/login", methods=["GET", "POST"])
def login():

    if request.method == "POST":

        email = request.form["email"]
        password = request.form["password"]

        student = get_student_by_email(email)

        if student and check_password_hash(
            student["password"],
            password
        ):

            session["student_id"] = student["id"]
            session["student_name"] = student["name"]
            session["student_email"] = student["email"]

            return redirect(url_for("dashboard"))

        else:
            flash("Invalid email or password.")
            return redirect(url_for("login"))

    return render_template("login.html")


@app.route("/dashboard")
def dashboard():
#if student did not login or create a file they should not see dashboard page so this condition if he is not created nor logiined his account .
    if "student_id" not in session:
        flash("Please sign in to access your dashboard.")
        return redirect(url_for("login"))

    return render_template(
        "dashboard.html",
        student_name=session["student_name"],
        student_email=session["student_email"]
    )


@app.route("/logout")
def logout():

    session.clear()

    flash("You have been logged out successfully.")

    return redirect(url_for("login"))


if __name__ == "__main__":
    app.run(debug=True)