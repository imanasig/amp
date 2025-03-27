import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, CheckCircle, Brain, ChevronRight, ArrowUpRight } from "lucide-react";

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] rounded-full bg-blue-500/5"></div>
          <div className="absolute top-20 right-0 w-80 h-80 rounded-full bg-gradient-to-br from-blue-500/10 to-transparent blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-6">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
              Revolutionizing Education Assessment
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">AMPLIFY</span> Your 
              <span className="relative ml-2">
                Evaluation!
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 20" preserveAspectRatio="none">
                  <path d="M0,10 Q40,5 80,10 Q120,15 160,10 Q200,5 200,10" stroke="#3b82f6" strokeWidth="4" fill="none"/>
                </svg>
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Smart answer sheet evaluation powered by AI that analyzes student responses based on textbook content for accurate, consistent, and efficient assessment.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/upload-pdf" 
                className="flex items-center justify-center px-8 py-3.5 text-base font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 group"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href="/Evaluation" 
                className="flex items-center justify-center px-8 py-3.5 text-base font-medium text-blue-600 bg-white border border-blue-200 rounded-full hover:bg-blue-50 transition-colors"
              >
                See How It Works
                <ChevronRight className="ml-1 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-50 to-white"></div>
        
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-4">
              Simple 3-Step Process
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">How AMPLIFY Works</h2>
            <p className="text-lg text-gray-600">
              Our intelligent system streamlines the evaluation process, making assessment more efficient and accurate.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection lines between steps (only on md+ screens) */}
            <div className="hidden md:block absolute top-24 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600"></div>
            <div className="hidden md:block absolute top-24 left-2/3 w-1/3 h-0.5 bg-gradient-to-r from-blue-600 to-blue-700"></div>
            
            {[
              {
                icon: <BookOpen className="h-8 w-8 text-white" />,
                title: "Upload Answer Sheets",
                description: "Simply upload student answer sheets in PDF format through our intuitive interface",
                step: "01"
              },
              {
                icon: <Brain className="h-8 w-8 text-white" />,
                title: "AI-Powered Analysis",
                description: "Our system compares answers with university textbook content using advanced AI",
                step: "02"
              },
              {
                icon: <CheckCircle className="h-8 w-8 text-white" />,
                title: "Detailed Evaluation",
                description: "Receive comprehensive reports with accurate scoring and feedback for improvement",
                step: "03"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="relative p-8 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div className="absolute -top-6 left-8 w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  {feature.icon}
                </div>
                <div className="absolute top-4 right-4 text-4xl font-bold text-gray-100 group-hover:text-blue-100 transition-colors">
                  {feature.step}
                </div>
                <div className="pt-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="w-12 h-1 bg-blue-600 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-4">
              Key Advantages
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Choose AMPLIFY</h2>
            <p className="text-lg text-gray-600">
              Our platform offers numerous benefits for educators and institutions looking to streamline their assessment process.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Time-Efficient",
                description: "Reduce grading time by up to 80% with our automated evaluation process",
                icon: "⏱️"
              },
              {
                title: "Unbiased Assessment",
                description: "Ensure consistent and fair grading across all student submissions",
                icon: "⚖️"
              },
              {
                title: "Detailed Feedback",
                description: "Provide students with comprehensive feedback for improvement",
                icon: "📝"
              },
              {
                title: "Textbook Alignment",
                description: "Evaluations based directly on course material for accurate scoring",
                icon: "📚"
              },
              {
                title: "Scalable Solution",
                description: "Handle large volumes of submissions without compromising quality",
                icon: "📈"
              },
              {
                title: "Easy Integration",
                description: "Seamlessly fits into your existing educational workflow and LMS",
                icon: "🔄"
              }
            ].map((benefit, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all hover:border-blue-200 flex flex-col"
              >
                <div className="text-3xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600 text-sm flex-grow">{benefit.description}</p>
                <div className="mt-4 h-1 w-12 bg-blue-100 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-blue-600 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('/globe.svg')] bg-no-repeat bg-center opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Evaluation Process?</h2>
            <p className="text-xl text-blue-100 mb-10">
              Join hundreds of institutions already using AMPLIFY to save time and improve assessment quality.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/upload-pdf"
                className="flex items-center justify-center px-8 py-3.5 text-base font-medium text-blue-600 bg-white rounded-full hover:bg-blue-50 transition-colors shadow-lg shadow-blue-700/20 group"
              >
                Start Using AMPLIFY
                <ArrowUpRight className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
              
              <Link 
                href="/ModalAnswer"
                className="flex items-center justify-center px-8 py-3.5 text-base font-medium text-white bg-transparent border border-white/30 rounded-full hover:bg-white/10 transition-colors"
              >
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
