import { Box, TextField, MenuItem } from "@mui/material";

type Props = {
  search: string;
  setSearch: (val: string) => void;
  status: string;
  setStatus: (val: string) => void;
};

const Filters = ({ search, setSearch, status, setStatus }: Props) => {
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
      <TextField
        label="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <TextField
        select
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        sx={{ width: 200 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Open">Open</MenuItem>
        <MenuItem value="Resolved">Resolved</MenuItem>
      </TextField>
    </Box>
  );
};

export default Filters;