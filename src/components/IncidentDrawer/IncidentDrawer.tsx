import {
  Drawer,
  Box,
  Typography,
  Chip,
  Divider,
} from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  incident: any;
};

const getColor = (status: string) => {
  if (status === "Open") return "error";
  if (status === "Resolved") return "success";
  return "default";
};

const IncidentDrawer = ({ open, onClose, incident }: Props) => {
  if (!incident) return null;

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 350, p: 3 }}>
        <Typography variant="h6">{incident.title}</Typography>

        <Divider sx={{ my: 2 }} />

        <Typography><strong>ID:</strong> {incident.id}</Typography>
        <Typography><strong>Severity:</strong> {incident.severity}</Typography>

        <Box sx={{ mt: 1 }}>
          <Chip label={incident.status} color={getColor(incident.status)} />
        </Box>

        <Typography sx={{ mt: 2 }}>
          <strong>Created At:</strong> {incident.createdAt}
        </Typography>

        <Typography sx={{ mt: 2 }}>
          <strong>Description:</strong> {incident.description || "No description available"}
        </Typography>
      </Box>
    </Drawer>
  );
};

export default IncidentDrawer;