import React, {useState, useEffect} from "react";
import axios from "axios";

const UserInfo = () => {
    const [UserDataJSON, setUserDataJSON] = useState('');
    const [userInfos, setUserInfos] = useState([]);
    const [newUserData,setnewUserData] = useState(1);

    const GetnewUserData = () =>{
        GetUserData(newUserData).then(userdata => {
            setUserDataJSON(JSON.stringify(userdata, null, 2));
            setUserInfos(userdata.results);
            setnewUserData(userdata.info.page + 1);
        })
    }
    useEffect(() => {
        GetnewUserData();
        }, []
    );
    const GetUserData = () => {
        return axios
            .get('https://randomuser.me/api')
            .then(({data}) => data)
            .catch((err) => {
                console.error(err);
            });
    }
    const getFullName = (userInfo) => {
        return userInfo.name.first + " " + userInfo.name.last;
    }
    return (
        <>
            <div>
                <h1>https://randomuser.me/api</h1>
                <button onClick={() => {
                    GetnewUserData()
                }}>Get User Data
                </button>
                {
                    userInfos.map((userInfo, index) => (
                        <div key={index}>
                            <p>{getFullName(userInfo)}</p>
                        </div>
                    ))
                }
                <pre>{UserDataJSON}</pre>
            </div>
        </>
    );
}
export default UserInfo