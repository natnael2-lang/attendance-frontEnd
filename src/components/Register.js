import "../CSS/Register.css";
import { useState } from "react";
import RegisterPop from "./RegisterPop";

const Register = () => {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [age, setAge] = useState("");
    const [sex, setSex] = useState("");
    const [image, setImage] = useState("");
    const [phone, setPhone] = useState("");
    const [networkError, setNetworkError] = useState(null);
    const [somethingWentWrong, setSomethingWentWrong] = useState("");
    const [loading, setLoading] = useState(false);
    const [success,setSuccess]=useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        const newForm = new FormData();
        newForm.append("firstName", fname);
        newForm.append("lastName", lname);
        newForm.append("age", age);
        newForm.append("sex", sex);
        newForm.append("phone", phone);
        newForm.append("image", image);

        fetch("https://attendance-server-buy0.onrender.com/register", {
            method: 'POST',
            body: newForm
        })
        .then((res) => {
            setLoading(false); 
            if (!res.ok) {
                
                throw new Error("Failed to load to database");
            }
            return res.json();
        })
        .then((data) => {
            console.log(data); 
            // Reset form fields
            setFname("");
            setLname("");
            setAge("");
            setSex("");
            setPhone("");
            setImage("");

            setSomethingWentWrong("");
            setSuccess(true)
            setTimeout(()=>setSuccess(false),1000)
        })
        .catch((err) => {
            setLoading(false);
            const errorMessage = err.message.includes("Failed to load") 
                ? "Something went wrong with the system upload." 
                : "There is a network problem!";
            setSomethingWentWrong(errorMessage);
            setTimeout(() => setSomethingWentWrong(""), 3000); 
        }).finally(
            setSuccess(false)
        );
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    return (
        <>
            <RegisterPop somethingWentWrong={somethingWentWrong} networkError={networkError} loading={loading} success={success}/>
            <div className="registerContainer">
                <form onSubmit={handleSubmit}>
                    <h1 style={{ textAlign: "center", color: "black" }}>Register</h1>
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
                    <input style={{ paddingLeft: "0", backgroundColor: "rgb(68, 250, 68)" }} type="submit" />
                </form>
            </div>
        </>
    );
};

export default Register;