
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Shield, Users } from "lucide-react";

export default function Landing() {
  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-primary-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Support Sustainable Projects
                <span className="text-primary-600"> on Web3</span>
              </h1>
              <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                Join our decentralized platform to discover, fund, and govern
                sustainable projects that make a real impact on our planet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/projects">
                  <Button size="lg" className="bg-primary-600 hover:bg-primary-700">
                    Explore Projects <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <Link to="/dao">
                  <Button size="lg" variant="outline" className="border-primary-600 text-primary-600">
                    Join DAO <Users className="ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">Why Choose GreenStake?</h2>
              <p className="mt-4 text-lg text-gray-600">
                We combine blockchain technology with environmental sustainability
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
              >
                <Leaf className="w-12 h-12 text-primary-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Sustainable Impact</h3>
                <p className="text-gray-600">
                  Support projects that make a real difference in environmental conservation and sustainability.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
              >
                <Shield className="w-12 h-12 text-primary-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Transparent & Secure</h3>
                <p className="text-gray-600">
                  All transactions and project details are recorded on the blockchain for full transparency.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
              >
                <Users className="w-12 h-12 text-primary-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Community Governed</h3>
                <p className="text-gray-600">
                  Join our DAO to participate in project approval and platform governance.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">GreenStake</h3>
              <p className="text-gray-600">
                Empowering sustainable initiatives through blockchain technology.
              </p>
            </div>
            <div>
              <h4 className="text-base font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/projects" className="text-gray-600 hover:text-primary-600">Projects</Link></li>
                <li><Link to="/dao" className="text-gray-600 hover:text-primary-600">DAO</Link></li>
                <li><Link to="/profile" className="text-gray-600 hover:text-primary-600">Profile</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-primary-600">Documentation</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary-600">FAQ</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary-600">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-primary-600">Twitter</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary-600">Discord</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary-600">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-gray-600">
            <p>© 2024 GreenStake. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
