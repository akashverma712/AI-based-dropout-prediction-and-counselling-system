import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, BarChart, ClipboardCheck, Send } from "lucide-react";

export default function StudentList({ students, onSelect }) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const getStatus = (attendance, assessment) => {
    if (attendance < 60 && assessment < 60)
      return {
        color: "bg-red-100 border-red-400 text-red-700",
        label: "⚠️ At Risk",
      };
    if (attendance < 75 || assessment < 70)
      return {
        color: "bg-yellow-100 border-yellow-400 text-yellow-700",
        label: "⚡ Needs Attention",
      };
    return {
      color: "bg-green-100 border-green-400 text-green-700",
      label: "✅ Good Standing",
    };
  };

  const sendCollectiveMessage = () => {
    if (!title.trim() || !message.trim()) return;
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
    setTitle("");
    setMessage("");
  };

  return (
    <div>
      {/* Messaging Panel */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          📢 Send Collective Message
        </h2>
        <input
          type="text"
          placeholder="Enter message title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <textarea
          placeholder="Enter message content"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full mb-3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={3}
        ></textarea>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={sendCollectiveMessage}
          className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-xl shadow hover:bg-indigo-700 transition"
        >
          <Send className="w-4 h-4" /> Send to All
        </motion.button>
      </div>

      {/* Student Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {students.map((s, i) => {
          const status = getStatus(s.attendance, s.assessment);
          return (
            <motion.div
              key={s.regNo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => onSelect(s)}
              className={`p-5 rounded-2xl shadow-lg border cursor-pointer hover:shadow-xl hover:-translate-y-1 transition ${status.color}`}
            >
              {/* Header with Avatar */}
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow text-lg font-bold text-gray-700">
                  {s.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{s.name}</h3>
                  <p className="text-sm opacity-80">Reg No: {s.regNo}</p>
                </div>
              </div>

              {/* Details */}
              <p className="text-sm">
                🎓 Section: {s.section} | Year: {s.year}
              </p>

              {/* Stats */}
              <div className="flex justify-between items-center mt-4 text-sm">
                <span className="flex items-center gap-1">
                  <BarChart className="w-4 h-4" /> {s.attendance}%
                </span>
                <span className="flex items-center gap-1">
                  <ClipboardCheck className="w-4 h-4" /> {s.assessment}%
                </span>
              </div>

              {/* Status Badge */}
              <div className="mt-3">
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full border">
                  {status.label}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Success Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg"
          >
            ✅ Message Sent Successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
