import { useState } from "react";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city) return;

    try {
      setLoading(true);
      setError("");

      const apiKey =  import.meta.env.VITE_API_KEY;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();

      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-700 flex items-center justify-center px-4">
      <div className="bg-white/20 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-md text-white">
        <h1 className="text-4xl font-bold text-center mb-6">Weather App</h1>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getWeather();
              }
            }}
            className="flex-1 px-4 py-3 rounded-xl outline-1 text-white"
          />

          <button
            onClick={getWeather}
            className="bg-white text-blue-600 px-5 py-3 rounded-xl font-semibold hover:bg-blue-100 transition"
          >
            Search
          </button>
        </div>
        {loading && (
            <p className="text-center text-lg font-semibold">Loading...</p>
          )}
        {error && (
          <p className="text-center text-red-300 font-semibold">{error}</p>
        )}
        {weather && weather.main && (
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">{weather.name}</h2>

            <h3 className="text-5xl font-extrabold">
              {Math.round(weather.main.temp)}°C
            </h3>

            <p className="text-xl">{weather.weather[0].main}</p>

            <div className="flex justify-between mt-6 text-lg">
              <div>
                <p className="font-semibold">Humidity</p>
                <p>{weather.main.humidity}%</p>
              </div>

              <div>
                <p className="font-semibold">Wind</p>
                <p>{weather.wind.speed} km/h</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
