import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CountrySelector.css'; 

interface CovidTimeline {
    cases: Record<string, number>;
    deaths: Record<string, number>;
    recovered: Record<string, number>;
}

interface ApiResponse {
    country: string;
    province: string[];
    timeline: CovidTimeline;
}

const fetchCovidData = async (country: string): Promise<CovidTimeline> => {
    const response = await axios.get<ApiResponse>(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=all`);
    return response.data.timeline;
};

const CountrySelector: React.FC = () => {
    const [countries] = useState<string[]>(['India', 'China', 'Sri Lanka','Bangladesh','Nepal']);
    const [selectedCountry, setSelectedCountry] = useState<string>('India');
    const [timelineData, setTimelineData] = useState<CovidTimeline | null>(null);

    useEffect(() => {
        const loadCovidData = async () => {
            try {
                const data = await fetchCovidData(selectedCountry);
                setTimelineData(data);
            } catch (error) {
                console.error('Error fetching COVID data:', error);
            }
        };
        loadCovidData();
    }, [selectedCountry]);

    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(event.target.value);
    };

    return (
        <div className="country-selector">
            <label htmlFor="country-select">Select Country: </label>
            <select id="country-select" value={selectedCountry} onChange={handleCountryChange}>
                {countries.map((country) => (
                    <option key={country} value={country}>
                        {country}
                    </option>
                ))}
            </select>
            {timelineData && (
                <table className="covid-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Cases</th>
                            <th>Deaths</th>
                            <th>Recovered</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(timelineData.cases).map((date) => (
                            <tr key={date}>
                                <td>{date}</td>
                                <td>{timelineData.cases[date]}</td>
                                <td>{timelineData.deaths[date]}</td>
                                <td>{timelineData.recovered[date]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CountrySelector;
