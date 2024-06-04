import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import ChatBot from 'react-chatbotify'
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import { useState } from "react";


function App() {
  let hasError = false;
  const call_my_api = async (params) => {
		try {
			const response = await fetch('http://127.0.0.1:5000/message', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ message: params.userInput })
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();
			await params.injectMessage(data.response);
		} catch (error) {
			await params.injectMessage("Unable to load response from API.");
			hasError = true;
		}
	}
  const flow = {
		start: {
      
			message: "Welcome there 👋! It's nice to meet you, How can I help you?",
			path: "loop"
		},
		loop: {
			message: async (params) => {
				await call_my_api(params);
			},
			path: () => {
				if (hasError) {
					return "start"
				}
				return "loop"
			}
		}
	}
  const option = {
    header:{
      title:"SageBOT"
    },
    footer: {
      text: (
        <div style={{cursor: "pointer"}}
        >
          <span>Powered By </span>
          <span style={{fontWeight: "bold"}}>
            {/* <img style={{width: 10, height: 10}} src={logo}></img> */}
            <span> SageBOT</span>
          </span>
        </div>
      ),
    },
    
  }

  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          {/* <Route
            path="/emp-form"
            element={user ? <CrudForm /> : <Navigate to="/sign-in" />}
          /> */}
          {/* <Route
            path="/event-form"
            element={user ? <EventForm /> : <Navigate to="/sign-in" />}
          /> */}
          {/* <Route
            path="/product-form"
            element={user ? <ProductForm /> : <Navigate to="/sign-in" />}
          />*/}
          <Route
            path="/home"
            element={user ? <Home /> : <Navigate to="/" />}
          /> 
          <Route path="/" element={<SignIn userToken={setUser} />} />
        </Routes>
        <ChatBot flow={flow} options={option} />
      </>
    </div>
  );
}

export default App;
