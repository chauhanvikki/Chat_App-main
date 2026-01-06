import React from "react";
import { FaPenAlt, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
			<div className="max-w-7xl mx-auto px-4 py-12">
				{/* Header */}
				<div className="text-center mb-12">
					<div className="flex items-center justify-center gap-3 mb-4">
						<div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
							<FaPenAlt className="h-5 w-5 text-white" />
						</div>
						<h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
							Chat Application
						</h1>
					</div>
					<p className="text-gray-400 max-w-2xl mx-auto">
						Connect with friends and family through our modern, secure chat platform. 
						Built with cutting-edge technology for seamless communication.
					</p>
				</div>

				{/* Content Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
					{/* Contact Information */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-white mb-4 flex items-center">
							<FaEnvelope className="mr-2 text-blue-400" />
							Contact Information
						</h3>
						<div className="space-y-3 text-gray-300">
							<div className="flex items-center">
								<FaMapMarkerAlt className="mr-3 text-blue-400 flex-shrink-0" />
								<div>
									<p className="font-medium text-white">Vishvendra Singh</p>
									<p>Jhajjar, Haryana - 124103</p>
								</div>
							</div>
							<div className="flex items-center">
								<FaPhone className="mr-3 text-blue-400 flex-shrink-0" />
								<span>+91 8708405362</span>
							</div>
							<div className="flex items-center">
								<FaEnvelope className="mr-3 text-blue-400 flex-shrink-0" />
								<Link
									to="mailto:singhvikki870@gmail.com"
									className="hover:text-blue-400 transition-colors duration-200"
								>
									singhvikki870@gmail.com
								</Link>
							</div>
						</div>
					</div>

					{/* Quick Links */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
						<div className="space-y-2">
							{[
								{ name: "Chat App", path: "/" },
								{ name: "Sign In", path: "/signin" },
								{ name: "Sign Up", path: "/signup" },
								{ name: "Home", path: "/home" }
							].map((link) => (
								<Link
									key={link.name}
									to={link.path}
									className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 py-1"
								>
									{link.name}
								</Link>
							))}
						</div>
					</div>

					{/* Social Links */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-white mb-4">Connect With Me</h3>
						<div className="space-y-2">
							{[
								{ name: "LinkedIn", url: "https://www.linkedin.com/in/vishvendra-singh-/" },
								{ name: "GitHub", url: "https://github.com/chauhanvikki" },
								{ name: "Instagram", url: "https://www.instagram.com/chauhan_vikki__/" },
								{ name: "Email", url: "mailto:singhvikki870@gmail.com" }
							].map((social) => (
								<a
									key={social.name}
									href={social.url}
									target="_blank"
									rel="noreferrer"
									className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 py-1"
								>
									{social.name}
								</a>
							))}
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="border-t border-gray-700 pt-8">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<p className="text-gray-400 text-sm mb-4 md:mb-0">
							© 2024 ChatApp. All rights reserved. Built with ❤️ by Vishvendra Singh
						</p>
						<div className="flex space-x-6 text-sm text-gray-400">
							<Link to="#" className="hover:text-blue-400 transition-colors duration-200">
								Privacy Policy
							</Link>
							<Link to="#" className="hover:text-blue-400 transition-colors duration-200">
								Terms of Service
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
