"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, FileText, CheckCircle, BookOpen, ArrowRight, LoaderCircle } from "lucide-react";

interface Subpart {
  A?: string;
  B?: string;
  C?: string;
}

interface Question {
  question_id: string;
  instruction: string;
  subparts: Subpart;
}

interface QuestionPaper {
  questions: Question[];
}

export default function ModalAnswer() {
  const [questions, setQuestions] = useState<Question[]>([
    { question_id: "Q1", instruction: "", subparts: { A: "", B: "", C: "" } },
  ]);
  const [answers, setAnswers] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question_id: `Q${questions.length + 1}`, instruction: "", subparts: { A: "", B: "", C: "" } },
    ]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const updateQuestion = (
    index: number,
    field: "question_id" | "instruction" | "subparts",
    value: string,
    subpartKey?: "A" | "B" | "C"
  ) => {
    const updatedQuestions = [...questions];
    if (field === "subparts" && subpartKey) {
      updatedQuestions[index].subparts[subpartKey] = value;
    } else if (field !== "subparts") {
      updatedQuestions[index][field] = value;
    }
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const questionPaper: QuestionPaper = { questions };
      const response = await axios.post("http://localhost:8000/generate-answers/", questionPaper);
      setAnswers(response.data.answers);
    } catch (error) {
      console.error("Error generating answers:", error);
      setAnswers("An error occurred while generating answers.");
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto pt-32 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Model Answer Generation</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Create question papers and generate model answers based on textbook content to establish evaluation benchmarks.
          </p>
        </div>
        
        <div className="grid md:grid-cols-5 gap-8">
          {/* Form Section - 3 columns */}
          <div className="md:col-span-3">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Question Paper Setup
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {questions.map((question, index) => (
                  <Card key={index} className="overflow-hidden border-gray-200">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                      <h3 className="font-medium text-gray-700">Question {index + 1}</h3>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeQuestion(index)}
                        disabled={questions.length === 1}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                    
                    <CardContent className="p-5 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`question_id_${index}`} className="text-sm font-medium text-gray-700">
                            Question ID
                          </Label>
                          <Input
                            id={`question_id_${index}`}
                            value={question.question_id}
                            onChange={(e) => updateQuestion(index, "question_id", e.target.value)}
                            placeholder="e.g., Q1"
                            className="mt-1"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor={`instruction_${index}`} className="text-sm font-medium text-gray-700">
                            Instruction
                          </Label>
                          <Input
                            id={`instruction_${index}`}
                            value={question.instruction}
                            onChange={(e) => updateQuestion(index, "instruction", e.target.value)}
                            placeholder="e.g., Solve any 1 out of Q1 or Q2"
                            className="mt-1"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Subparts</h4>
                        <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                          {["A", "B", "C"].map((subpart) => (
                            <div key={subpart}>
                              <Label htmlFor={`subpart_${subpart}_${index}`} className="text-sm font-medium flex items-center gap-1">
                                <span className="inline-block w-5 h-5 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center font-bold">
                                  {subpart}
                                </span>
                                Subpart {subpart}
                              </Label>
                              <Input
                                id={`subpart_${subpart}_${index}`}
                                value={question.subparts[subpart as keyof Subpart] || ""}
                                onChange={(e) => updateQuestion(index, "subparts", e.target.value, subpart as "A" | "B" | "C")}
                                placeholder={`Enter subpart ${subpart} question`}
                                className="mt-1"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <div className="flex justify-between items-center">
                  <Button 
                    type="button" 
                    onClick={addQuestion} 
                    variant="outline"
                    className="flex items-center gap-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    <Plus className="h-4 w-4" />
                    Add Question
                  </Button>
                  
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        Generate Model Answers
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Results Section - 2 columns */}
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Generated Model Answers
              </h2>
              
              {loading ? (
                <div className="min-h-[400px] flex flex-col items-center justify-center">
                  <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
                  <p className="mt-6 text-gray-600 font-medium">Generating Answers...</p>
                  <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
                </div>
              ) : answers ? (
                <div>
                  <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200 text-green-800 flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 mt-0.5" />
                    <div>
                      <p className="font-medium">Model Answers Generated</p>
                      <p className="text-sm">Based on textbook content and best practices</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-[600px] overflow-auto">
                    <pre className="text-sm whitespace-pre-wrap">{answers}</pre>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2">
                      Download Answers
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-6">
                  <div className="w-20 h-20 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <FileText className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No Answers Generated Yet</h3>
                  <p className="text-gray-500 mb-4">
                    Fill out the question paper form and click "Generate Model Answers" to create example solutions.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}