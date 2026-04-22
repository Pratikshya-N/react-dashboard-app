import { useEffect, useState } from "react";
import IncidentTable from "../../components/IncidentTable/IncidentTable";
import { fetchIncidents } from "../../services/incidentService";
import Filters from "../../components/Filters/Filters";
import { useDebounce } from "../../hooks/useDebounce";
import { TablePagination } from "@mui/material";
import IncidentDrawer from "../../components/IncidentDrawer/IncidentDrawer";

const Dashboard = () => {
    const [data, setData] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [orderBy, setOrderBy] = useState<"createdAt" | "severity">("createdAt");
    const [order, setOrder] = useState<"asc" | "desc">("desc");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);
    const [selectedIncident, setSelectedIncident] = useState<any>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        const loadData = async () => {
            const res: any = await fetchIncidents();
            setData(res);
        };

        loadData();
    }, []);

    const filteredData = data.filter((item) => {
        const searchText = debouncedSearch.toLowerCase();

        return (
            item.title.toLowerCase().includes(searchText) &&
            (status ? item.status === status : true)
        );
    });

    const priority: Record<string, number> = {
        Critical: 3,
        High: 2,
        Medium: 1,
    };

    const sortedData = [...filteredData].sort((a, b) => {
        if (orderBy === "createdAt") {
            return order === "asc"
                ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }

        if (orderBy === "severity") {
            return order === "asc"
                ? (priority[a.severity] || 0) - (priority[b.severity] || 0)
                : (priority[b.severity] || 0) - (priority[a.severity] || 0);
        }

        return 0;
    });

    const paginatedData = sortedData.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const handleRowClick = (item: any) => {
        setSelectedIncident(item);
        setDrawerOpen(true);
    };

    console.log("DATA:", data);
    console.log("SELECTED:", selectedIncident);
    return (
        <div>
            <h2>Incidents</h2>

            <Filters
                search={search}
                setSearch={setSearch}
                status={status}
                setStatus={setStatus}
            />

            <IncidentTable
                data={paginatedData}
                order={order}
                orderBy={orderBy}
                setOrder={setOrder}
                setOrderBy={setOrderBy}
                onRowClick={handleRowClick}
            />

            <IncidentDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                incident={selectedIncident}
            />

            <TablePagination
                component="div"
                count={sortedData.length}
                page={page}
                onPageChange={(_, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(e) => {
                    setRowsPerPage(parseInt(e.target.value, 10));
                    setPage(0);
                }}
            />
        </div>
    );
};

export default Dashboard;