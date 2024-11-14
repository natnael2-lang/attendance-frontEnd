import "../CSS/Register.css";
import { useState } from "react";

const Register = () => {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [age, setAge] = useState("");
    const [sex, setSex] = useState("");
    const [image, setImage] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const newForm = new FormData();
        newForm.append("firstName", fname);
        newForm.append("lastName", lname);
        newForm.append("age", age);
        newForm.append("sex", sex);
        newForm.append("phone", phone);
        newForm.append("image", image);
      
        fetch("https://attendance-server-buy0.onrender.com/register", {
            method: 'POST',
            body:newForm
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(newForm) // Log the response from the server
            setFname("");
            setLname("");
            setAge("");
            setSex("");
            setPhone("");
            setImage("");
        })
        .catch((err) => console.log("Posting error", err));
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    return (
        <div className="registerContainer">
            <form onSubmit={handleSubmit}>
                <h1 style={{ textAlign: "center" ,color:"black"}}>Register</h1>
                <div>
                    <input
                        id="fname"
                        type="text"
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                        required
                    />
                    <label htmlFor="fname">First Name</label>
                </div>
                <div>
                    <input
                        id="lname"
                        type="text"
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                        required
                    />
                    <label htmlFor="lname">Last Name</label>
                </div>
                <div>
                    <input
                        id="age"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                    <label htmlFor="age">Age</label>
                </div>
                <div>
                    <select
                       required
                        id="sex"
                        value={sex}
                        onChange={(e) => setSex(e.target.value)}
                        style={{ padding: "0.6rem", width: "100%", outline: "none", border: "1px solid lightGrey", textAlign: "center" }}
                    >
                        <option style={{ color: "lightGrey" }} value="" disabled>Select Sex</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div>
                    <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <label htmlFor="phone">Phone Number</label>
                </div>
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImage}
                        required
                    />
                </div>
                <input style={{ paddingLeft: "0" ,backgroundColor:"rgb(68, 250, 68)"}} type="submit" />
            </form>
        </div>
    );
};

export default Register;