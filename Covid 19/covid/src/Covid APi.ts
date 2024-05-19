import axios from "axios";

export interface CovidTimeline {
    cases: { [date: string]: number };
    deaths: { [date: string]: number };
    recovered: { [date: string]: number };
}

export interface DiseaseDetails {
    country: string;
    timeline: CovidTimeline;
}

export const Disease = async (location: string): Promise<DiseaseDetails> => {
    const response = await axios.get(`https://disease.sh/v3/covid-19/historical/${location}?lastdays=30`);
    return response.data;
};