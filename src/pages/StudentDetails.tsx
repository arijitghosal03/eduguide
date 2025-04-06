import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight } from "lucide-react";

const StudentDetails = () => {
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    classGrade: "",
    school: "",
    academicYear: "",
    subjects: "",
    notes: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Save data locally for this example (in real apps, you'd send it to a server)
    const fileData = JSON.stringify(formData, null, 2);
    const blob = new Blob([fileData], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "student.json";
    a.click();

    // Navigate to Home after submission
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <aside className="hidden lg:block w-64 border-r border-gray-200 bg-white">
          <Sidebar />
        </aside>

        <main className="flex-1 px-6 py-10">
          <div className="max-w-3xl mx-auto">
            <Card className="shadow-md">
              <CardContent className="p-6">
                <h1 className="text-2xl font-semibold mb-6 text-gray-800">Student Profile Setup</h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
                    <Input
                      type="text"
                      name="rollNumber"
                      value={formData.rollNumber}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Class / Grade</label>
                      <Input
                        type="text"
                        name="classGrade"
                        value={formData.classGrade}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
                      <Input
                        type="text"
                        name="academicYear"
                        placeholder="e.g., 2024-2025"
                        value={formData.academicYear}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
                    <Input
                      type="text"
                      name="school"
                      value={formData.school}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subjects (comma-separated)</label>
                    <Input
                      type="text"
                      name="subjects"
                      placeholder="e.g., Math, Science, English"
                      value={formData.subjects}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                    <Textarea
                      name="notes"
                      rows={4}
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Anything else you'd like to add..."
                    />
                  </div>

                  <div className="pt-4">
                    <Button type="submit" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
                      Save & Continue
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDetails;
