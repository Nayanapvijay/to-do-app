import { useState } from 'react';

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState<string>('');
  const [age, setAge] = useState<string>('');

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }

    if (days < 0) {
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
      months--;
    }

    setAge(`${years} years, ${months} months, ${days} days`);
  };

  const clear = () => {
    setBirthDate('');
    setAge('');
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Age Calculator</h1>

      <input
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
      />

      <div className="flex justify-center gap-4">
        <button
          onClick={calculateAge}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Calculate
        </button>
        <button
          onClick={clear}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
        >
          Clear
        </button>
      </div>

      {age && (
        <div className="mt-4 text-lg font-medium text-gray-700">
          Your Age: {age}
        </div>
      )}
    </div>
  );
};

export default AgeCalculator;
