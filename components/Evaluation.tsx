'use client'
import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import LoadingSpinner from './LoadingSpinner'
import { CheckCircle, FileType, BarChart, ChevronRight, ArrowRight } from 'lucide-react'

export default function Evaluation() {
  const [result, setResult] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const handleConversion = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:8000/converttext', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      console.log(data);
      
      setResult(data)
    } catch (error) {
      console.error('Error:', error)
      setResult('Error occurred while processing the request')
    } finally {
      setLoading(false)
    }
  }

  

  return (
    <div className="container mx-auto pt-32 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Answer Evaluation</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Review the evaluation results from our AI-powered assessment system. The analysis compares student answers with textbook content.
          </p>
        </div>

        {/* Evaluation Actions */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Generate Evaluation</h2>
              <p className="text-gray-600 mt-1">
                Process the uploaded answer sheet and compare with textbook content
              </p>
            </div>
            
            <Button 
              onClick={handleConversion}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              {loading ? <LoadingSpinner /> : (
                <>
                  Evaluate Answer Sheet
                  <ChevronRight className="h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Results Section */}
        {loading ? (
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col items-center justify-center min-h-[400px]">
            <LoadingSpinner size={60} />
            <p className="mt-6 text-lg font-medium text-gray-700">Processing Evaluation</p>
            <p className="text-gray-500 mt-2">This may take a few moments as we analyze the content...</p>
          </div>
        ) : result ? (
          <div className="space-y-8">
            {/* Evaluation Summary */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Evaluation Summary
              </h2>
              
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-green-800 flex items-start gap-3">
                <div className="mt-1">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Evaluation Completed Successfully</p>
                  <p className="text-sm mt-1">The answer sheet has been processed and scored based on textbook content.</p>
                </div>
              </div>
            </div>
            
            {/* Detailed Results */}
            <Card className="overflow-hidden shadow-lg border-gray-100">
              <CardHeader className="bg-gray-50 border-b border-gray-100">
                <CardTitle className="flex items-center gap-2">
                  <FileType className="h-5 w-5 text-blue-600" />
                  Detailed Evaluation Results
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <pre className="whitespace-pre-wrap text-sm">{result}</pre>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button className="flex items-center gap-2 bg-transparent text-blue-600 hover:bg-blue-50 border border-blue-200">
                    <BarChart className="h-4 w-4" />
                    View Full Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Action Button */}
            <div className="text-center mt-10">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto">
                Download Evaluation Report
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col items-center justify-center min-h-[400px] text-center">
            <div className="w-20 h-20 mb-6 rounded-full bg-blue-50 flex items-center justify-center">
              <BarChart className="h-10 w-10 text-blue-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Evaluation Results Yet</h3>
            <p className="text-gray-500 max-w-md mb-6">
              Click the "Evaluate Answer Sheet" button above to process the uploaded document and generate results.
            </p>
            <Button 
              onClick={handleConversion}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              Start Evaluation
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
