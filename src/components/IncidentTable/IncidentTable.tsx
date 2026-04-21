import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const IncidentTable = ({ data }: any) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Severity</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Created At</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {data.map((item: any) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.severity}</TableCell>
            <TableCell>{item.status}</TableCell>
            <TableCell>{item.createdAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default IncidentTable;