// create a registration component to register a new user

function registration() {
    return (
        <div>
            <h1>Registration</h1>
            <form>
                <label>Username</label>
                <input type="text" name="username" />
                <label>Password</label>
                <input type="password" name="password" />
                <label>Confirm Password</label>
                <input type="password" name="confirm password" />
            </form>
        </div>
    );
}

export default registration;