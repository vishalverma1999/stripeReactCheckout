// https://www.npmjs.com/package/react-stripe-checkout , npm i react-stripe-checkout
import React from 'react'
import { useState, useEffect } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Publishable_Key = `pk_test_51KAcNdSCSjhmXZtkL8IDtXcFNPTCVxiSEtocVESvob4j2WBAyQAh2b1WkPoI7T3fWjJRP7hixlCR0YQckhU1qpEm00kYj2GM7X`;

const Pay = () => {

    const [stripeToken, setstripeToken] = useState(null);   // initially token will be null
    const navigate = useNavigate();


    // let's create our function onToken and of course it's gonna return us token so we can console it to dee client side token
    const onToken = (token) => {
        console.log(token);    // After getting the client side token, payment is still not completed that's because we didn't send this information to our backend and we didn't make any payment so how we are gonna do that, so basically i can create a use effect and whenever we have a client side token we can just make backend server request and hence backend will also generate a token which will finally complete the payment
        setstripeToken(token);
    }

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await axios.post("http://localhost:5000/api/checkout/payment",
                    {
                        tokenId: stripeToken.id,
                        amount: 2000,
                    }
                );

                console.log(res.data);
                navigate("/success");     // of course you can pass your data here also like, navigate("/success", {res.dat})

                // fetch method instead of axios
                //             const response = await fetch(`http://localhost:5000/api/checkout/payment`, {
                //     method: "POST",
                //     headers: {
                //       'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify({ 
                //         tokenId: stripeToken.id,
                //                 amount: 2000,
                //     })
                //   });

                //   const json = await response.json();
                //   console.log(json);

            } catch (error) {
                console.log(error);
            }
        };
        stripeToken && makeRequest();  // calling our makeRequests function, if stripeToken just run this function
    }, [stripeToken, navigate])  //dependency 

    return (
        <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>


            {/* maybe we can make our application a little bit fancier i can say here if there is a stripeToken then processing....  and if we don't have token we can just return our button */}
            {/* remember this token is being returned after client payment and after this token we are sending our back-end server request and after that it returns us a data so what else we can do i can use use history hook(navigate hook) and we can go to success page*/}
            {stripeToken ? (<span>Processing.... Please Wait</span>) : ( 

                // {/* we are gonna have just onToken function, basically when we make any payment in our client side the stripe is gonna return us a token and with this token we are gonna make payment requests to our node.js server */ }
                // {/* it's really easy and it's really secured that because you can't do any payment by using only client sides you have to create your server and verify your payment */}
            // {/* only thing we should do is using StripeCheckout component. We can pass many props to this component listed on npm stripe, but we are gonna use some of them and like token which is really important that because as i said it's gonna return us a token and we are gonna use it by creating a function onToken */}

            <StripeCheckout name='MUnnuDada'
                image='https://cdn.dribbble.com/users/6192700/screenshots/14682400/media/895972e3e8316a62c6eee7b13a4421e2.png?compress=1&resize=50x50'
                billingAddress
                shippingAddress
                description='Your total is INR 20'
                amount={2000}    // it's going to be 20 but stripe working on cents so you should add here two more zero that is 20.00
                token={onToken}
                stripeKey={Publishable_Key}

            >

                <button style={{ border: "none", width: 120, borderRadius: 5, padding: "20px", backgroundColor: "black", color: "white", fontWeight: "600", cursor: "pointer" }}>
                    Pay Now
                </button>

            </StripeCheckout>
                )}
        </div>
    )
}

export default Pay

/*
 */
