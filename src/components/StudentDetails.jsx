import { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";

export default function StudentDetails({ student }) {
  const [showPopup, setShowPopup] = useState(false);
  const [smsTitle, setSmsTitle] = useState("Academic Alert");
  const [smsDescription, setSmsDescription] = useState(
    "Your ward has low attendance and needs mentoring support."
  );

  // Weekly attendance trend (example data)
  const attendanceTrend = [
    { week: "W1", attendance: student.attendance - 10 },
    { week: "W2", attendance: student.attendance - 5 },
    { week: "W3", attendance: student.attendance - 8 },
    { week: "W4", attendance: student.attendance },
  ];

  // Assessment breakdown
  const assessments = [
    { type: "Practical", score: student.assessment - 5 },
    { type: "Internals", score: student.assessment - 10 },
    { type: "Mid Sem", score: student.assessment - 15 },
    { type: "End Sem", score: student.assessment },
  ];

  // Dropout risk % (fixed to 70%)
  const dropoutPercent = 70;

  // SMS send handler
  const sendNotification = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000); // auto-close after 2 sec
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 mt-6 relative overflow-hidden">
      <h2 className="text-2xl font-bold mb-2">{student.name} - Full Report</h2>
      <p className="text-sm text-gray-600">Reg No: {student.regNo}</p>
      <p className="text-sm text-gray-600 mb-4">
        Section: {student.section} | Year: {student.year}
      </p>

      {/* Attendance */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-indigo-600 mb-2">
          📊 Attendance Overview
        </h3>
        <p className="text-sm">Overall Attendance: {student.attendance}%</p>

        <div className="h-64 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={attendanceTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="attendance"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Assessment */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-green-600 mb-2">
          📝 Assessment Performance
        </h3>
        <p className="text-sm">Overall Assessment Score: {student.assessment}%</p>

        <div className="h-64 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={assessments}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="score" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Dropout Risk */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-red-600 mb-4">
          ⚠️ Dropout Risk Analysis
        </h3>
        <div className="flex items-center justify-center">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="#e5e7eb"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="#ef4444"
                strokeWidth="12"
                fill="none"
                strokeDasharray={2 * Math.PI * 70}
                strokeDashoffset={
                  2 * Math.PI * 70 - (dropoutPercent / 100) * (2 * Math.PI * 70)
                }
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-bold text-xl text-red-600">
              {dropoutPercent}%
            </div>
          </div>
        </div>
        <p className="text-center text-sm mt-2 text-gray-600">
          Higher dropout probability indicates immediate mentoring required.
        </p>
      </div>

      {/* Mentor Suggestion */}
      {student.attendance < 60 && student.assessment < 60 && (
        <div className="mt-6 p-4 bg-red-50 border border-red-300 rounded-xl">
          <h3 className="font-bold text-red-600">⚠️ Mentor Session Needed</h3>
          <p className="text-sm mt-2">
            This student has consistently low attendance and assessments. Please
            schedule a mentor session and provide extra support.
          </p>
        </div>
      )}

      {/* Send Notification */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold text-indigo-600 mb-2">
          📩 Send SMS Notification
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Enter the SMS title and description to notify the student/guardian.
        </p>

        {/* Title Input */}
        <input
          type="text"
          value={smsTitle}
          onChange={(e) => setSmsTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:ring focus:ring-indigo-300"
          placeholder="Enter SMS Title"
        />

        {/* Description Input */}
        <textarea
          value={smsDescription}
          onChange={(e) => setSmsDescription(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:ring focus:ring-indigo-300"
          rows="3"
          placeholder="Enter SMS Description"
        />

        <div className="flex justify-center">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={sendNotification}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-xl shadow hover:bg-indigo-700 transition"
          >
            <Send className="w-4 h-4" /> Send SMS Notification
          </motion.button>
        </div>
      </div>

      {/* Success Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="absolute bottom-6 right-6 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg"
          >
            ✅ SMS Sent: <span className="font-bold">{smsTitle}</span> <br />
            <span className="text-sm">{smsDescription}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
