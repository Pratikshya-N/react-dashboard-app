import { useEffect, useState } from "react";
import IncidentTable from "../../components/IncidentTable/IncidentTable";
import { fetchIncidents } from "../../services/incidentService";

const Dashboard = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const res: any = await fetchIncidents();
            setData(res);
            setLoading(false);
        };

        loadData();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Incidents</h2>
            <IncidentTable data={data} />
        </div>
    );
};

export default Dashboard;