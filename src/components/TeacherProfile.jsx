import { useState } from "react";
import { Award, BookOpen, Users, Loader2 } from "lucide-react";

export default function TeacherProfile() {
  const [showMore, setShowMore] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [teacher, setTeacher] = useState({
    name: "Dr. Tapan Kumar",
    role: "Professor, Data Visualization & Processing",
    experience: "10+ Years Exp",
    papers: "15+",
    courses: "8",
    students: "500+",
    bio: "Dr. Tapan Kumar specializes in Data Visualization and Processing with a decade of teaching and research experience. He has guided numerous projects and published papers in top journals.",
    officeHours: "Mon - Fri, 10 AM - 2 PM",
    achievements: "Best Researcher Award 2023",
  });

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setIsEditing(false);
    }, 2000); // fake save delay
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
      {/* Profile Header */}
      <div className="flex items-center space-x-6">
        <img
          src="tapan.png"
          alt="Teacher"
          className="w-24 h-24 rounded-full border-4 border-white shadow-lg hover:scale-105 transition"
        />
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">
            {teacher.name}
          </h2>
          <p className="text-sm opacity-90 mt-1">{teacher.role}</p>

          {/* Tags */}
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="bg-white/20 text-xs px-3 py-1 rounded-full">
              🎓 Mentor
            </span>
            <span className="bg-white/20 text-xs px-3 py-1 rounded-full">
              ⏳ {teacher.experience}
            </span>
            <span className="bg-white/20 text-xs px-3 py-1 rounded-full">
              📊 Researcher
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/30 my-6"></div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-white/10 rounded-xl p-4">
          <Award className="w-6 h-6 mx-auto mb-2" />
          <p className="text-lg font-bold">{teacher.papers}</p>
          <p className="text-xs opacity-80">Research Papers</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4">
          <BookOpen className="w-6 h-6 mx-auto mb-2" />
          <p className="text-lg font-bold">{teacher.courses}</p>
          <p className="text-xs opacity-80">Courses Taught</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4">
          <Users className="w-6 h-6 mx-auto mb-2" />
          <p className="text-lg font-bold">{teacher.students}</p>
          <p className="text-xs opacity-80">Students Mentored</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        {!isEditing ? (
          <>
            <button
              onClick={() => setShowMore(!showMore)}
              className="flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-xl font-semibold shadow hover:bg-gray-100 transition"
            >
              {showMore ? "Hide Details" : "View More"}
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl font-semibold shadow hover:bg-white/30 transition"
            >
              Edit Info
            </button>
          </>
        ) : (
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded-xl font-semibold shadow hover:bg-green-600 transition disabled:opacity-70"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Saving...
              </>
            ) : (
              "Save"
            )}
          </button>
        )}
      </div>

      {/* More Info Section */}
      {showMore && (
        <div className="mt-6 bg-white/10 rounded-xl p-6 space-y-3 text-sm">
          {isEditing ? (
            <>
              <div>
                <label className="block mb-1 text-gray-200">Bio</label>
                <textarea
                  value={teacher.bio}
                  onChange={(e) =>
                    setTeacher({ ...teacher, bio: e.target.value })
                  }
                  className="w-full p-2 rounded-lg text-gray-800"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-200">Office Hours</label>
                <input
                  value={teacher.officeHours}
                  onChange={(e) =>
                    setTeacher({ ...teacher, officeHours: e.target.value })
                  }
                  className="w-full p-2 rounded-lg text-gray-800"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-200">Achievements</label>
                <input
                  value={teacher.achievements}
                  onChange={(e) =>
                    setTeacher({ ...teacher, achievements: e.target.value })
                  }
                  className="w-full p-2 rounded-lg text-gray-800"
                />
              </div>
            </>
          ) : (
            <>
              <p>
                <span className="font-semibold">📖 Bio:</span> {teacher.bio}
              </p>
              <p>
                <span className="font-semibold">🕒 Office Hours:</span>{" "}
                {teacher.officeHours}
              </p>
              <p>
                <span className="font-semibold">🏅 Achievements:</span>{" "}
                {teacher.achievements}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
