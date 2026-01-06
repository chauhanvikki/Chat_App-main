import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { checkValidSignUpFrom } from "../utils/validate";
import { PiEye, PiEyeClosedLight } from "react-icons/pi";
import { FaUserPlus, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { BACKEND_URL } from "../config/environment";

const SignUp = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [load, setLoad] = useState("");
	const [isShow, setIsShow] = useState(false);
	const navigate = useNavigate();

	const signUpUser = (e) => {
		// Signup ---
		toast.loading("Creating your account...");
		e.target.disabled = true;
		fetch(`${BACKEND_URL}/api/auth/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: password,
			}),
		})
			.then((response) => response.json())
			.then((json) => {
				setLoad("");
				e.target.disabled = false;
				toast.dismiss();
				if (json.token) {
					navigate("/signin");
					toast.success(json?.message);
				} else {
					toast.error(json?.message);
				}
			})
			.catch((error) => {
				console.error("Error:", error);
				setLoad("");
				toast.dismiss();
				toast.error("Error : " + error.code);
				e.target.disabled = false;
			});
	};
	const handleSignup = (e) => {
		if (firstName && lastName && email && password) {
			const validError = checkValidSignUpFrom(
				firstName,
				lastName,
				email,
				password
			);
			if (validError) {
				toast.error(validError);
				return;
			}
			setLoad("Creating account...");
			signUpUser(e);
		} else {
			toast.error("All fields are required");
		}
	};
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div className="text-center">
					<div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4">
						<FaUserPlus className="h-8 w-8 text-white" />
					</div>
					<h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
					<p className="text-gray-600">Join our community and start chatting</p>
				</div>
				
				<div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
					<form className="space-y-6">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									First Name
								</label>
								<div className="relative">
									<FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
									<input
										className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
										type="text"
										placeholder="John"
										name="firstName"
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
										required
									/>
								</div>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Last Name
								</label>
								<div className="relative">
									<FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
									<input
										className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
										type="text"
										placeholder="Doe"
										name="lastName"
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
										required
									/>
								</div>
							</div>
						</div>
						
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Email Address
							</label>
							<div className="relative">
								<FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
								<input
									className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
									type="email"
									placeholder="john@example.com"
									name="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
						</div>
						
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Password
							</label>
							<div className="relative">
								<FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
								<input
									className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
									type={isShow ? "text" : "password"}
									placeholder="••••••••"
									name="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<button
									type="button"
									onClick={() => setIsShow(!isShow)}
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
								>
									{isShow ? (
										<PiEyeClosedLight className="h-5 w-5" />
									) : (
										<PiEye className="h-5 w-5" />
									)}
								</button>
							</div>
						</div>
						
						<button
							onClick={(e) => {
								handleSignup(e);
								e.preventDefault();
							}}
							className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
							disabled={load !== ""}
						>
							{load === "" ? (
								<span className="flex items-center justify-center">
									<FaUserPlus className="mr-2 h-4 w-4" />
									Create Account
								</span>
							) : (
								<span className="flex items-center justify-center">
									<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
									{load}
								</span>
							)}
						</button>
						
						<div className="text-center">
							<span className="text-gray-600">Already have an account? </span>
							<Link 
								to="/signin" 
								className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
							>
								Sign In
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
