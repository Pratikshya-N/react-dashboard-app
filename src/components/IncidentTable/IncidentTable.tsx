import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    TableSortLabel,
} from "@mui/material";
import { Incident } from "../../types/incident";


const getColor = (status: string) => {
    if (status === "Open") return "error";
    if (status === "Resolved") return "success";
    return "default";
};

type Props = {
  data: Incident[];
  order: "asc" | "desc";
  orderBy: string;
  setOrder: (val: "asc" | "desc") => void;
  setOrderBy: (val: string) => void;
  onRowClick: (item: Incident) => void;
};

const IncidentTable = ({
    data,
    order,
    orderBy,
    setOrder,
    setOrderBy,
    onRowClick,
}: Props) => {

    const handleSort = (field: "createdAt" | "severity") => {
        const isAsc = orderBy === field && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(field);
    };

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Title</TableCell>

                    <TableCell>
                        <TableSortLabel
                            active={orderBy === "severity"}
                            direction={order}
                            onClick={() => handleSort("severity")}
                        >
                            Severity
                        </TableSortLabel>
                    </TableCell>

                    <TableCell>Status</TableCell>

                    <TableCell>
                        <TableSortLabel
                            active={orderBy === "createdAt"}
                            direction={order}
                            onClick={() => handleSort("createdAt")}
                        >
                            Created At
                        </TableSortLabel>
                    </TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {data.map((item: any) => (
                    <TableRow
                        key={item.id}
                        hover
                        onClick={() => onRowClick(item)}
                        sx={{ cursor: "pointer" }}
                    >
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.severity}</TableCell>
                        <TableCell>
                            <Chip label={item.status} color={getColor(item.status)} />
                        </TableCell>
                        <TableCell>{item.createdAt}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default IncidentTable;