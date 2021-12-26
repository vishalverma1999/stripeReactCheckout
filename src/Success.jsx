import React from 'react'

const Success = () => {
    return (
        <div style={{height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: "18px"}}>
            {/* <img src="https://cdn.dribbble.com/users/6192700/screenshots/14682400/media/895972e3e8316a62c6eee7b13a4421e2.png?compress=1&resize=400x300" /> */}
            <img src="https://cdn.dribbble.com/users/6192700/screenshots/14682400/media/895972e3e8316a62c6eee7b13a4421e2.png?compress=1&resize=400x300" alt="alternate" style={{width:"150px"}} />
            <button style={{border: "none", width:200, borderRadius: 5, padding: "20px", backgroundColor: "teal", color:"white", fontWeight: "600", cursor: "pointer", fontSize: "24px", margin: "20px 0px" }}>
                Successfull!
            </button>
                Your Order is being prepared. Thank for choosing Us.
        </div>
    )
}

export default Success