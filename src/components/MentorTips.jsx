export default function MentorTips({ student, onMentor }) {
    return (
      <div className="mt-4 bg-red-50 p-4 rounded-lg border border-red-300">
        <h3 className="font-semibold text-red-600">⚠️ Mentor Session Needed</h3>
        <ul className="list-disc ml-5 text-sm text-gray-700 mt-2">
          <li>Attend all upcoming classes regularly.</li>
          <li>Focus on weak topics with extra practice.</li>
          <li>Schedule 1:1 with mentor for guidance.</li>
        </ul>
        <button
          onClick={() => onMentor(student)}
          className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Send Mentor Notification
        </button>
      </div>
    );
  }
  