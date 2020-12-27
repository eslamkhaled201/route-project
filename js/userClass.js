import { users } from "./main.js";
import { URLOrigin } from "./variables.js";
class User {
    currentUser = null;

    saveToLocalStorage() {
        localStorage.setItem("Users", JSON.stringify(users))
    }

    // method to check from entered user data if it is saved for pervious user at global users array  
    IsSavedUser(name, email, pass) {
        for (let i = 0; i < users.length; i++) {
            if (name == users[i].name || email == users[i].email) {
                alert("You already have an account");
                return true;
            } else if (pass == users[i].password) {
                alert("Enter different password");
                return true;
            } else {
                return false;
            }
        }
    }

    singUp(name, email, pass) {
        // first , we check if the entered data is saved or not 
        let IsSavedUser;
        if (users.length >= 1) {
            IsSavedUser = this.IsSavedUser(name, email, pass)
        }
        // here if users array is empaty or no user saved with entered user data 
        if (users.length < 1 || IsSavedUser == false) {
            // then we start to save new user
            let newUser = {
                name: name, email: email, password: pass, isSignedIn: false
            }
            $('.alert-box').text("New user added").addClass("text-success");//success feedback to user
            users.push(newUser);// add new user to the global users array
            this.saveToLocalStorage();
            // redirect user to sign in page 
            window.location.replace( `${URLOrigin}/index.html`);
        }
    }

    signIn(email, pass) {
        // fisrt , we check if no user saved at users global array 
        if (users.length < 1) {
        // here case of no user saved then send alert feedback,
            $('.alert-box').text("You don't have an account").addClass("text-danger");
            return;// exit from this function
        }
        // here case there are users saved in global array 
        // then get all users saved 
        for (let i = 0; i < users.length; i++) {
        // strat to check if entered email and pass are saved to user in global array  
            if (email == users[i].email && pass == users[i].password) {
                // here case true then : 
                users[i].isSignedIn = true; // change sign In state , 
                this.saveToLocalStorage(); // update the local storage , 
                this.currentUser = users[i]; // save this user as current user of User class instance obj 
                $('.alert-box').text("Success Sign In")
                .removeClass("text-danger")
                .addClass("text-success"); //  displar success feedback 
                window.location.replace(`${URLOrigin}/Home.html`); // redrict user to Home page
                break;// stop loop iterations from checking other users and exist from this function 
            } else {
                // here case that we don't get user with the same entered email and password
                $('.alert-box').text("Wrong password or email").addClass("text-danger");
            }
        }
    }

    SignOut() {
        this.currentUser.isSignedIn = false;
        this.saveToLocalStorage();
        this.currentUser = null;
        location.replace(`${URLOrigin}/index.html`);
    }
}

export default User;