import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, BarChart3, Send, Leaf } from "lucide-react";

export default function PeerPulseLanding() {
  return (
    <div className="min-h-screen bg-[#FFF6E0] text-gray-800 font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-[#C3D6A1] px-8 py-4 shadow-sm">
        <h1 className="text-lg font-semibold text-gray-900">PeerPulse</h1>
        <div className="space-x-3">
          <Button variant="outline" className="rounded-full bg-white px-5">
            Login
          </Button>
          <Button className="rounded-full bg-yellow-400 hover:bg-yellow-500 px-5 text-gray-900">
            Register
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-full max-w-3xl rounded-xl overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1603570417039-f1d44c9a85c6?auto=format&fit=crop&w=1000&q=80"
            alt="feedback"
            className="w-full h-72 object-cover"
          />
        </div>
        <div className="relative -mt-32 text-white">
          <h2 className="text-3xl font-bold">
            Collect Honest Feedback — 100% Anonymous
          </h2>
          <div className="mt-6 space-x-4">
            <Button className="bg-yellow-400 text-black hover:bg-yellow-500 px-6">
              Give Feedback
            </Button>
            <Button variant="secondary" className="bg-gray-800 hover:bg-gray-700 text-white px-6">
              Admin Login
            </Button>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="max-w-5xl mx-auto px-6 mt-20">
        <h3 className="text-xl font-bold mb-2">About PeerPulse</h3>
        <p className="text-gray-700">
          PeerPulse offers a secure and anonymous platform for collecting and analyzing feedback,
          making it easy to gather honest insights.
        </p>
      </section>

      {/* Key Benefits */}
      <section className="max-w-5xl mx-auto px-6 mt-10">
        <h3 className="text-2xl font-extrabold mb-6">Key Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="flex flex-col items-center text-center p-5">
              <Send className="w-10 h-10 mb-3 text-blue-500" />
              <h4 className="font-semibold mb-2">Anonymous</h4>
              <p className="text-sm text-gray-600">
                Ensure honest feedback with complete anonymity.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center text-center p-5">
              <Leaf className="w-10 h-10 mb-3 text-green-500" />
              <h4 className="font-semibold mb-2">Fast & Simple</h4>
              <p className="text-sm text-gray-600">
                Quickly set up and share feedback forms.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center text-center p-5">
              <BarChart3 className="w-10 h-10 mb-3 text-indigo-500" />
              <h4 className="font-semibold mb-2">Insightful Dashboard</h4>
              <p className="text-sm text-gray-600">
                Visualize and analyze feedback with ease.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center text-center p-5">
              <Lock className="w-10 h-10 mb-3 text-yellow-600" />
              <h4 className="font-semibold mb-2">Secure</h4>
              <p className="text-sm text-gray-600">
                Protect sensitive data with robust security measures.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-20">
        <h2 className="text-2xl font-extrabold mb-4">Ready to Get Started?</h2>
        <p className="text-gray-700 mb-6">
          Join PeerPulse today and start collecting valuable feedback.
        </p>
        <Button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg text-white">
          Get Started
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t mt-10 py-6 text-center text-sm text-gray-500">
        <div className="flex justify-center space-x-4 mb-3">
          <a href="#" className="hover:text-gray-800">🐦</a>
          <a href="#" className="hover:text-gray-800">📸</a>
          <a href="#" className="hover:text-gray-800">🔗</a>
        </div>
        <p>© 2024 PeerPulse. All rights reserved.</p>
      </footer>
    </div>
  );
}
