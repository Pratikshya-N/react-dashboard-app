import { useEffect, useState } from "react";
import IncidentTable from "../../components/IncidentTable/IncidentTable";
import { fetchIncidents } from "../../services/incidentService";
import Filters from "../../components/Filters/Filters";
import { useDebounce } from "../../hooks/useDebounce";
import { TablePagination } from "@mui/material";
import IncidentDrawer from "../../components/IncidentDrawer/IncidentDrawer";
import { Skeleton, Box } from "@mui/material";
import { Incident } from "../../types/incident";
import { SEVERITY_PRIORITY } from "../../constants/constants";

const Dashboard = () => {
    const [data, setData] = useState<Incident[]>([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [orderBy, setOrderBy] = useState<"createdAt" | "severity">("createdAt");
    const [order, setOrder] = useState<"asc" | "desc">("desc");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);
    const [selectedIncident, setSelectedIncident] = useState<any>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        const loadData = async () => {
            try {
                const res: any = await fetchIncidents();
                setData(res);
            } catch (err) {
                setError("Failed to load incidents");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    useEffect(() => {
        setPage(0);
    }, [debouncedSearch, status]);

    const filteredData = data.filter((item) => {
        const searchText = debouncedSearch.toLowerCase();

        const matchesSearch =
            item.title.toLowerCase().includes(searchText) ||
            item.id.toLowerCase().includes(searchText) ||
            item.severity.toLowerCase().includes(searchText);

        const matchesStatus = status ? item.status === status : true;

        return matchesSearch && matchesStatus
    });

    const sortedData = [...filteredData].sort((a, b) => {
        if (orderBy === "severity") {
            return order === "asc"
                ? (SEVERITY_PRIORITY[a.severity] || 0) -
                (SEVERITY_PRIORITY[b.severity] || 0)
                : (SEVERITY_PRIORITY[b.severity] || 0) -
                (SEVERITY_PRIORITY[a.severity] || 0);
        }
    });

    const paginatedData = sortedData.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const handleRowClick = (item: any) => {
        setSelectedIncident(item);
        setDrawerOpen(true);
    };



    if (loading) {
        return (
            <Box sx={{ p: 2 }}>
                {[...Array(5)].map((_, i) => (
                    <Skeleton
                        key={i}
                        variant="rectangular"
                        height={40}
                        sx={{ mb: 1 }}
                    />
                ))}
            </Box>
        );
    }


    if (error) return <div>{error}</div>;

    return (
        <div style={{ padding: "16px" }}>
            <h2>Incidents</h2>

            <Filters
                search={search}
                setSearch={setSearch}
                status={status}
                setStatus={setStatus}
            />

            {filteredData.length === 0 ? (
                < Box sx={{ textAlign: "center", mt: 4 }}>
                    <Typography>No incidents found</Typography>
                </Box>
            ) : (
                <IncidentTable
                    data={paginatedData}
                    order={order}
                    orderBy={orderBy}
                    setOrder={setOrder}
                    setOrderBy={setOrderBy}
                    onRowClick={handleRowClick}
                />
            )}

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