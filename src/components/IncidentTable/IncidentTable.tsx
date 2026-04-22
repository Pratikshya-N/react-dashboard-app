import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    TableSortLabel,
} from "@mui/material";

const getColor = (status: string) => {
    if (status === "Open") return "error";
    if (status === "Resolved") return "success";
    return "default";
};

type Props = {
    data: any[];
    order: "asc" | "desc";
    orderBy: string;
    setOrder: any;
    setOrderBy: any;
    onRowClick: (item: any) => void;
};

const IncidentTable = ({
    data,
    order,
    orderBy,
    setOrder,
    setOrderBy,
    onRowClick,
}: Props) => {

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
                            onClick={() => {
                                setOrderBy("severity");
                                setOrder(order === "asc" ? "desc" : "asc");
                            }}
                        >
                            Severity
                        </TableSortLabel>
                    </TableCell>

                    <TableCell>Status</TableCell>

                    <TableCell>
                        <TableSortLabel
                            active={orderBy === "createdAt"}
                            direction={order}
                            onClick={() => {
                                setOrderBy("createdAt");
                                setOrder(order === "asc" ? "desc" : "asc");
                            }}
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